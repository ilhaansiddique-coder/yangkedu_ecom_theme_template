"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Star, PackageCheck } from "lucide-react";
import SearchHeader from "@/components/SearchHeader";
import ProductCard from "@/components/ProductCard";
import { products, categories, productRating, productStock } from "@/lib/products";

const CHIPS = [
  { id: "all", name: "All" },
  ...categories.filter((c) => !["subsidy", "flash", "more"].includes(c.id)),
];

const SORTS: { id: string; label: string }[] = [
  { id: "reco", label: "Recommended" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "sold", label: "Best Selling" },
  { id: "rated", label: "Top Rated" },
  { id: "discount", label: "Biggest Discount" },
];

const PRICE_BANDS: { id: string; label: string; test: (p: number) => boolean }[] = [
  { id: "all", label: "Any price", test: () => true },
  { id: "lt10", label: "Under $10", test: (p) => p < 10 },
  { id: "10to25", label: "$10 – $25", test: (p) => p >= 10 && p <= 25 },
  { id: "gt25", label: "Over $25", test: (p) => p > 25 },
];

const PAGE_SIZE = 8;
const discount = (p: { price: number; singlePrice: number }) => 1 - p.price / p.singlePrice;

function ShopView() {
  const params = useSearchParams();
  const initial = params.get("cat") ?? "all";
  const [cat, setCat] = useState(CHIPS.some((c) => c.id === initial) ? initial : "all");
  const [sort, setSort] = useState("reco");

  // filters
  const [band, setBand] = useState("all");
  const [inStock, setInStock] = useState(false);
  const [topRated, setTopRated] = useState(false);

  // pagination
  const [visible, setVisible] = useState(PAGE_SIZE);

  const list = useMemo(() => {
    const priceTest = PRICE_BANDS.find((b) => b.id === band)!.test;
    let base = cat === "all" ? products : products.filter((p) => p.category === cat);
    base = base.filter((p) => priceTest(p.price));
    if (inStock) base = base.filter((p) => productStock(p) > 0);
    if (topRated) base = base.filter((p) => productRating(p) >= 4.8);

    const out = [...base];
    if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    else if (sort === "sold") out.sort((a, b) => b.sold - a.sold);
    else if (sort === "rated") out.sort((a, b) => productRating(b) - productRating(a));
    else if (sort === "discount") out.sort((a, b) => discount(b) - discount(a));
    return out;
  }, [cat, sort, band, inStock, topRated]);

  // reset pagination whenever the result set changes
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [cat, sort, band, inStock, topRated]);

  const shown = list.slice(0, visible);
  const hasMore = visible < list.length;

  return (
    <div className="bg-canvas lg:bg-transparent">
      <SearchHeader placeholder="Search all products" />

      <div className="hidden items-baseline justify-between pb-3 lg:flex">
        <h1 className="font-display text-[24px] font-extrabold text-ink">Shop All Products</h1>
        <span className="text-[15px] font-medium text-muted">{list.length} items</span>
      </div>

      {/* toolbar: category chips + sort */}
      <div className="sticky top-0 z-20 bg-canvas py-2 lg:static lg:rounded-lg lg:bg-white lg:px-3 lg:py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex flex-1 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {CHIPS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                  cat === c.id
                    ? "bg-gradient-to-r from-[#fb5621] to-[#e8290b] text-white"
                    : "bg-white text-ink lg:bg-canvas"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="shrink-0 rounded-full border border-line bg-white px-3 py-2 text-[14px] text-ink outline-none focus:border-brand"
            aria-label="Sort products"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* filter row */}
        <div className="mt-2 flex items-center gap-2 overflow-x-auto pb-0.5 [&::-webkit-scrollbar]:hidden">
          {PRICE_BANDS.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBand(b.id)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
                band === b.id ? "border-brand bg-pill text-brand" : "border-line bg-white text-muted lg:bg-canvas"
              }`}
            >
              {b.label}
            </button>
          ))}

          <span className="mx-0.5 h-5 w-px shrink-0 bg-line" />

          <button
            type="button"
            onClick={() => setTopRated((v) => !v)}
            className={`flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
              topRated ? "border-brand bg-pill text-brand" : "border-line bg-white text-muted lg:bg-canvas"
            }`}
          >
            <Star size={13} className={topRated ? "fill-[#ffb400] text-[#ffb400]" : ""} /> 4.8★ &amp; up
          </button>
          <button
            type="button"
            onClick={() => setInStock((v) => !v)}
            className={`flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
              inStock ? "border-brand bg-pill text-brand" : "border-line bg-white text-muted lg:bg-canvas"
            }`}
          >
            <PackageCheck size={14} /> In stock
          </button>
        </div>
      </div>

      {/* grid */}
      <div className="mt-2 lg:mt-3">
        {list.length === 0 ? (
          <p className="py-16 text-center text-[13px] text-muted">No products match these filters</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2 px-2 pb-2 sm:grid-cols-3 lg:grid-cols-5 lg:px-0">
              {shown.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center pb-6 pt-3">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="rounded-full border border-line bg-white px-8 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  Load more ({list.length - visible})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-muted">Loading…</div>}>
      <ShopView />
    </Suspense>
  );
}
