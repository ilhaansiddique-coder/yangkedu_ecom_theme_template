"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/data/products";
import type { ShopPageProps } from "@/storefront-engine/types/pages";
import { Editable } from "@/storefront-engine/editor/Editable";
import { trackViewItemList, trackSearch } from "@/lib/analytics";
import ProductCard from "../components/ProductCard";
import "../styles.css";

function ShopContent({ products, categories }: { products: Product[]; categories: ShopPageProps["apiCategories"] }) {
  const params = useSearchParams();
  const [sort, setSort] = useState("featured");
  const rawSearch = params.get("search") || "";
  const search = rawSearch.toLowerCase();
  const activeCategory = params.get("category") || "";

  const categoryOptions = categories.length
    ? categories.map((c) => ({ id: c.slug || String(c.id), name: c.name }))
    : Array.from(new Set(products.map((p) => p.category).filter(Boolean))).map((name) => ({ id: name, name }));

  const filtered = useMemo(() => {
    const list = products.filter((product) => {
      if (search && !product.name.toLowerCase().includes(search)) return false;
      if (activeCategory && activeCategory !== product.category_slug && activeCategory !== product.category) return false;
      return true;
    });
    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [activeCategory, products, search, sort]);

  const title = activeCategory ? categoryOptions.find((c) => c.id === activeCategory)?.name || "Products" : "All products";

  // Search event — fires once per query when the shop is opened with a
  // ?search= term (the navbar search overlay lands here). Covers every
  // search regardless of where the box lives.
  useEffect(() => {
    const q = rawSearch.trim();
    if (q) trackSearch({ search_string: q });
  }, [rawSearch]);

  useEffect(() => {
    if (!filtered.length) return;
    trackViewItemList({
      item_list_id: `tpl_shop_${activeCategory || "all"}`,
      item_list_name: title,
      items: filtered.slice(0, 20).map((p) => ({ id: p.id, name: p.name, category: p.category, price: p.price })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, filtered.length]);

  return (
    <div className="tpl-page">
      <Editable section="shop" field="title" defaultValue={title} label="Shop title">
        {(v, ep) => <h1 {...ep} style={{ fontSize: 28, textAlign: "center", marginBottom: 8 }}>{v}</h1>}
      </Editable>
      <div style={{ textAlign: "center", color: "var(--tpl-muted)", marginBottom: 24, fontSize: 14 }}>
        {filtered.length} products
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24 }}>
        <aside>
          <h3 style={{ fontSize: 14, margin: "0 0 12px" }}>Categories</h3>
          <Link href="/shop" style={{ display: "block", padding: "6px 0", color: !activeCategory ? "var(--tpl-ink)" : "var(--tpl-muted)" }}>All</Link>
          {categoryOptions.map((c) => (
            <Link
              key={c.id}
              href={`/shop?category=${encodeURIComponent(c.id)}`}
              style={{ display: "block", padding: "6px 0", color: activeCategory === c.id ? "var(--tpl-ink)" : "var(--tpl-muted)" }}
            >
              {c.name}
            </Link>
          ))}
          <h3 style={{ fontSize: 14, margin: "16px 0 12px" }}>Sort</h3>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: "100%", padding: 6, border: "1px solid var(--tpl-line)", background: "transparent" }}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price low → high</option>
            <option value="price-desc">Price high → low</option>
            <option value="name-asc">Name A → Z</option>
          </select>
        </aside>
        <div className="tpl-grid">
          {filtered.map((p) => <ProductCard product={p} key={p.id} />)}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage(props: ShopPageProps) {
  return (
    <Suspense fallback={<div className="tpl-page" style={{ textAlign: "center" }}>Loading…</div>}>
      <ShopContent products={props.initialProducts} categories={props.apiCategories} />
    </Suspense>
  );
}
