import Link from "next/link";
import { ChevronRight, Flame } from "lucide-react";
import SearchHeader from "@/components/SearchHeader";
import CategoryTabs from "@/components/CategoryTabs";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import CountdownTimer from "@/components/CountdownTimer";
import { products } from "@/lib/products";
import { money, soldLabel } from "@/lib/format";

export default function HomePage() {
  const superDeals = products.filter((p) => p.tags.includes("Super Deal")).slice(0, 8);
  const feed = products;

  return (
    <div className="bg-canvas lg:bg-transparent">
      <SearchHeader />
      <CategoryTabs />
      <BannerCarousel />

      <div className="mt-3">
        <CategoryGrid />
      </div>

      {/* Super Deals — branded card carousel */}
      <section className="mt-3 overflow-hidden rounded-2xl bg-gradient-to-b from-[#fff1ec] to-white ring-1 ring-[#ffd9cc]">
        {/* header — single row on all viewports */}
        <div className="flex items-center justify-between gap-2 px-3 pt-3.5 lg:gap-3 lg:px-5 lg:pt-4">
          <div className="flex min-w-0 items-center gap-2 lg:gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#fb5621] to-[#e8290b] text-white shadow-sm lg:h-12 lg:w-12">
              <Flame size={20} className="lg:hidden" />
              <Flame size={26} className="hidden lg:block" />
            </span>
            <div className="min-w-0 leading-tight">
              <span className="block font-display text-[20px] font-extrabold leading-none text-price lg:text-[26px]">
                Super Deals
              </span>
              <span className="mt-1 block truncate text-[11px] font-semibold text-brand/80 lg:text-[13px]">
                100% Authentic<span className="hidden sm:inline"> · Big brands</span>
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 lg:gap-2.5">
            <CountdownTimer />
            <Link
              href="/category?cat=subsidy"
              aria-label="View all super deals"
              className="flex shrink-0 items-center gap-0.5 rounded-full bg-white/70 px-2 py-1.5 text-[12px] font-medium text-brand ring-1 ring-[#ffd9cc] transition hover:bg-white sm:px-3 lg:text-[13px]"
            >
              <span className="hidden sm:inline">View all</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* card rail */}
        <div className="flex gap-3 overflow-x-auto px-3 pb-3 pt-2.5 lg:px-4 [&::-webkit-scrollbar]:hidden">
          {superDeals.map((p) => {
            const off = Math.round((1 - p.price / p.singlePrice) * 100);
            return (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="group flex w-[150px] shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-line/70 transition-shadow hover:shadow-md lg:w-[190px]"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-1.5 top-1.5 flex items-center gap-0.5 rounded-md bg-gradient-to-r from-[#ff7a00] to-[#e8290b] px-1.5 py-0.5 text-[10px] font-bold text-white">
                    <Flame size={10} />-{off}%
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-2">
                  <p className="line-clamp-1 text-[13px] leading-snug text-ink lg:text-[15px]">{p.name}</p>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-display text-[20px] font-extrabold leading-none text-price lg:text-[22px]">{money(p.price)}</span>
                    <span className="text-[12px] text-muted line-through">{money(p.singlePrice)}</span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="rounded-full bg-pill px-2 py-0.5 text-[11px] font-semibold text-brand">Group buy</span>
                    <span className="text-[11px] text-muted">{soldLabel(p.sold)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recommended feed */}
      <section className="mt-3">
        <div className="flex items-center justify-center gap-2 pt-2 pb-4 lg:pb-6">
          <span className="h-px w-8 bg-line" />
          <span className="font-display text-[20px] font-black text-ink lg:text-[24px]">Recommended for You</span>
          <span className="h-px w-8 bg-line" />
        </div>
        <div className="grid grid-cols-2 gap-2 px-2 pb-4 sm:grid-cols-3 lg:grid-cols-5 lg:px-0">
          {feed.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
