"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchHeader from "@/components/SearchHeader";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/products";

const CHIPS = [
  { id: "all", name: "All" },
  ...categories.filter((c) => !["subsidy", "flash", "more"].includes(c.id)),
];

const SORTS: { id: string; label: string }[] = [
  { id: "reco", label: "Recommended" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "sold", label: "Best Selling" },
  { id: "discount", label: "Biggest Discount" },
];

const discount = (p: { price: number; singlePrice: number }) => 1 - p.price / p.singlePrice;

function ShopView() {
  const params = useSearchParams();
  const initial = params.get("cat") ?? "all";
  const [cat, setCat] = useState(CHIPS.some((c) => c.id === initial) ? initial : "all");
  const [sort, setSort] = useState("reco");

  const list = useMemo(() => {
    const base = cat === "all" ? products : products.filter((p) => p.category === cat);
    const out = [...base];
    if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    else if (sort === "sold") out.sort((a, b) => b.sold - a.sold);
    else if (sort === "discount") out.sort((a, b) => discount(b) - discount(a));
    return out;
  }, [cat, sort]);

  return (
    <div className="bg-canvas lg:bg-transparent">
      <SearchHeader placeholder="Search all products" />

      <div className="hidden items-baseline justify-between pb-3 lg:flex">
        <h1 className="font-display text-[24px] font-extrabold text-ink">Shop All Products</h1>
        <span className="text-[13px] text-muted">{list.length} items</span>
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
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
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
            className="shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-[13px] text-ink outline-none focus:border-brand"
            aria-label="Sort products"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* grid */}
      <div className="mt-2 lg:mt-3">
        {list.length === 0 ? (
          <p className="py-16 text-center text-[13px] text-muted">No products found</p>
        ) : (
          <div className="grid grid-cols-2 gap-2 px-2 pb-6 sm:grid-cols-3 lg:grid-cols-5 lg:px-0">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
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
