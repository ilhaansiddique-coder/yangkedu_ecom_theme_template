"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchHeader from "@/components/SearchHeader";
import CategoryDrawer from "@/components/CategoryDrawer";
import CategoryRail from "@/components/CategoryRail";
import ProductCard from "@/components/ProductCard";
import { categories, productsByCategory, categoryName } from "@/lib/products";

function CategoryView() {
  const params = useSearchParams();
  const active = params.get("cat") ?? categories[0].id;
  const list = productsByCategory(active);

  return (
    <div className="bg-canvas lg:bg-transparent">
      <SearchHeader placeholder={`Search ${categoryName(active)}`} />

      {/* mobile: drawer trigger toolbar + off-canvas drawer */}
      <CategoryDrawer active={active} />

      <div className="flex lg:gap-4">
        {/* desktop: docked rail */}
        <aside className="hidden w-[180px] shrink-0 self-start rounded-lg bg-white lg:block">
          <CategoryRail active={active} />
        </aside>

        {/* product grid */}
        <div className="flex-1 p-2 lg:p-0">
          <h2 className="hidden pb-2 text-[20px] font-semibold text-ink lg:block">{categoryName(active)}</h2>
          {list.length === 0 ? (
            <p className="py-12 text-center text-[13px] text-muted">No products in this category</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-muted">Loading…</div>}>
      <CategoryView />
    </Suspense>
  );
}
