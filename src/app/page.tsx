import Link from "next/link";
import { Wallet } from "lucide-react";
import SearchHeader from "@/components/SearchHeader";
import CategoryTabs from "@/components/CategoryTabs";
import BannerCarousel from "@/components/BannerCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { money } from "@/lib/format";

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

      {/* Super Deals (百亿补贴) branded strip */}
      <section className="mt-3 overflow-hidden rounded-lg bg-white">
        <div className="flex items-stretch">
          <div className="flex w-[88px] shrink-0 flex-col items-center justify-center gap-1 px-2 py-3 text-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#fb5621] to-[#e8290b] text-white">
              <Wallet size={16} />
            </span>
            <span className="font-display text-[15px] font-extrabold leading-none text-price">Super Deals</span>
            <span className="text-[10px] text-muted">100% Authentic</span>
          </div>
          <div className="w-px shrink-0 bg-line" />
          <div className="flex flex-1 gap-3 overflow-x-auto px-3 py-3 [&::-webkit-scrollbar]:hidden">
            {superDeals.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="w-[84px] shrink-0 lg:w-[140px]">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <p className="mt-1 font-display text-[14px] font-bold leading-none text-price">{money(p.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended feed */}
      <section className="mt-3">
        <div className="flex items-center justify-center gap-2 py-2">
          <span className="h-px w-8 bg-line" />
          <span className="font-display text-[15px] font-extrabold text-ink lg:text-[20px]">Recommended for You</span>
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
