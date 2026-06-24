"use client";

/**
 * TEMPLATE HomePage — sections to start from:
 *   1. Hero (image + headline + CTAs)
 *   2. Category strip (dynamic from products)
 *   3. Featured product grid
 *   4. Editorial / story
 *
 * Required:
 *   - Wrap every visible heading + CTA in <Editable> for inline editing
 *   - Wrap editorial images in <Editable type="image">
 *   - Fire trackViewItemList on featured product list mount
 *   - Use ProductCard from ../components for product grid items
 */

import { useEffect, useMemo } from "react";
import Link from "next/link";
import type { HomePageProps } from "@/storefront-engine/types/pages";
import { Editable } from "@/storefront-engine/editor/Editable";
import { trackViewItemList } from "@/lib/analytics";
import ProductCard from "../components/ProductCard";
import { uniqueCategoriesFromProducts } from "../components/helpers";
import "../styles.css";

const DEFAULT_HERO_IMG = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80";

export default function HomePage({ products }: HomePageProps) {
  const featured = useMemo(() => products.slice(0, 8), [products]);
  const categories = useMemo(() => uniqueCategoriesFromProducts(products).slice(0, 4), [products]);

  useEffect(() => {
    if (!featured.length) return;
    trackViewItemList({
      item_list_id: "tpl_home_featured",
      item_list_name: "Home featured",
      items: featured.map((p) => ({ id: p.id, name: p.name, category: p.category, price: p.price })),
    });
  }, [featured]);

  return (
    <div>
      {/* Hero */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
        <div style={{ aspectRatio: "16 / 10", overflow: "hidden", background: "var(--tpl-line)" }}>
          <Editable section="home" field="heroImage" type="image" defaultValue={DEFAULT_HERO_IMG} label="Hero image">
            {(src, ep) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img {...ep} src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </Editable>
        </div>
        <div style={{ padding: "32px 20px", textAlign: "center" }}>
          <Editable section="home" field="heroTitle" defaultValue="A clean, modern store" label="Hero title">
            {(v, ep) => <h1 {...ep} style={{ fontSize: 32, margin: "8px 0" }}>{v}</h1>}
          </Editable>
          <Editable section="home" field="heroBody" defaultValue="Add your one-line pitch here. Tenants edit this in place." label="Hero body">
            {(v, ep) => <p {...ep} style={{ color: "var(--tpl-muted)", maxWidth: 480, margin: "0 auto 20px" }}>{v}</p>}
          </Editable>
          <Link href="/shop" className="tpl-btn">Shop now</Link>
        </div>
      </section>

      {/* Category strip — dynamic from tenant's catalogue, fallback to placeholders */}
      {categories.length > 0 && (
        <section className="tpl-section">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Editable section="home" field="catsTitle" defaultValue="Shop by category" label="Categories title">
              {(v, ep) => <h2 {...ep} style={{ fontSize: 24, margin: 0 }}>{v}</h2>}
            </Editable>
          </div>
          <div className="tpl-grid">
            {categories.map((c, i) => (
              <Link key={c.slug} href={`/shop?category=${encodeURIComponent(c.slug)}`} className="tpl-card">
                <div className="tpl-card__media">
                  <Editable section="home" field={`catImg${i + 1}`} type="image" defaultValue={c.image || "/placeholder.svg"} label={`Cat ${i + 1} image`}>
                    {(src, ep) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img {...ep} src={src} alt={c.name} />
                    )}
                  </Editable>
                </div>
                <h3 className="tpl-card__name">{c.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured grid */}
      <section className="tpl-section">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Editable section="home" field="featuredTitle" defaultValue="Featured" label="Featured title">
            {(v, ep) => <h2 {...ep} style={{ fontSize: 24, margin: 0 }}>{v}</h2>}
          </Editable>
        </div>
        <div className="tpl-grid">
          {featured.map((p) => <ProductCard product={p} key={p.id} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/shop" className="tpl-btn tpl-btn--ghost">View all</Link>
        </div>
      </section>
    </div>
  );
}
