"use client";

/**
 * TEMPLATE — minimal product card with cart + analytics wiring.
 * Style the card via classes in styles.css (.tpl-card, .tpl-card__media,
 * .tpl-card__name, .tpl-card__price). Behaviour is correct as-is.
 */

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/CartContext";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { trackAddToCart, trackSelectItem } from "@/lib/analytics";
import { formatMoney, discountPercent } from "./helpers";

interface Props { product: Product }

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const settings = useSiteSettings();
  const currency = settings.currency_symbol || "৳";
  const disc = discountPercent(product.price, product.originalPrice);
  const slug = product.slug || String(product.id);
  const isExternal = product.image && (product.image.startsWith("/storage/") || product.image.includes("://"));

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "/placeholder.svg",
      stock: product.stock,
      unlimitedStock: product.unlimitedStock,
    }, 1);
    trackAddToCart({
      content_ids: [product.id],
      content_name: product.name,
      value: product.price,
      quantity: 1,
    });
  };

  const handleSelect = () => {
    trackSelectItem({
      item_list_id: "tpl_card",
      item: { id: product.id, name: product.name, category: product.category, price: product.price },
    });
  };

  return (
    <Link href={`/products/${slug}`} className="tpl-card" onClick={handleSelect}>
      <div className="tpl-card__media">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 25vw"
          unoptimized={!!isExternal}
        />
        {disc != null && (
          <span style={{ position: "absolute", top: 8, left: 8, background: "var(--tpl-sale)", color: "#fff", padding: "2px 8px", fontSize: 11 }}>
            -{disc}%
          </span>
        )}
        <button
          type="button"
          onClick={handleAdd}
          style={{ position: "absolute", bottom: 8, left: 8, right: 8, background: "var(--tpl-ink)", color: "var(--tpl-bg)", border: 0, padding: 8, fontSize: 12, cursor: "pointer" }}
        >
          Add to bag
        </button>
      </div>
      <h3 className="tpl-card__name">{product.name}</h3>
      <div className="tpl-card__price">
        {formatMoney(product.price, currency)}
        {product.originalPrice && product.originalPrice > product.price && (
          <s>{formatMoney(product.originalPrice, currency)}</s>
        )}
      </div>
    </Link>
  );
}
