/**
 * TEMPLATE helpers — pure utility functions used by pages + components.
 * Extend as needed for your theme.
 */

import type { Product } from "@/data/products";

export function formatMoney(amount: number, symbol = "৳"): string {
  return `${symbol}${amount.toLocaleString()}`;
}

export function productImages(product: Product): string[] {
  const list: string[] = [];
  if (product.image) list.push(product.image);
  type WithImages = Product & { images?: string[] | string | null };
  const extra = (product as WithImages).images;
  if (Array.isArray(extra)) {
    for (const i of extra) if (typeof i === "string" && i && !list.includes(i)) list.push(i);
  } else if (typeof extra === "string" && extra) {
    try {
      const parsed = JSON.parse(extra) as unknown;
      if (Array.isArray(parsed)) {
        for (const i of parsed) if (typeof i === "string" && i && !list.includes(i)) list.push(i);
      }
    } catch { /* ignore */ }
  }
  return list.length ? list : ["/placeholder.svg"];
}

export function discountPercent(price: number, originalPrice?: number | null): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/** Derive a unique category list from a product array — used by HomePage
 *  to render a real category strip from the tenant's actual catalogue. */
export interface CategorySummary {
  id: string;
  name: string;
  slug: string;
  image: string | null;
}

export function uniqueCategoriesFromProducts(products: Product[]): CategorySummary[] {
  const seen = new Map<string, CategorySummary>();
  for (const p of products) {
    const name = (p.category || "").trim();
    if (!name) continue;
    const slug = p.category_slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (seen.has(slug)) continue;
    seen.set(slug, { id: slug, name, slug, image: p.image || null });
  }
  return Array.from(seen.values());
}
