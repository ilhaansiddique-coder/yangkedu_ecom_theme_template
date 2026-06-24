"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FiMinus, FiPlus } from "react-icons/fi";
import type { ProductPageProps } from "@/storefront-engine/types/pages";
import { useCart } from "@/lib/CartContext";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { trackAddToCart, trackInitiateCheckout, trackViewContent } from "@/lib/analytics";
import { Editable } from "@/storefront-engine/editor/Editable";
import { formatMoney, productImages, discountPercent } from "../components/helpers";
import "../styles.css";

export default function ProductPage({ product }: ProductPageProps) {
  const { addItem } = useCart();
  const settings = useSiteSettings();
  const currency = settings.currency_symbol || "৳";
  const variants = useMemo(() => product.hasVariations ? product.variants ?? [] : [], [product]);
  const [variantId, setVariantId] = useState<number | undefined>(variants[0]?.id);
  const selectedVariant = variants.find((v) => v.id === variantId);
  const images = productImages(product);
  const [mainImage, setMainImage] = useState(selectedVariant?.image || images[0]);
  const [quantity, setQuantity] = useState(1);
  const price = selectedVariant?.price ?? product.price;
  const originalPrice = selectedVariant?.original_price ?? product.originalPrice;
  const disc = discountPercent(price, originalPrice);
  const activeImage = selectedVariant?.image || product.image || "/placeholder.svg";

  useEffect(() => {
    trackViewContent({ content_ids: [product.id], content_name: product.name, value: price });
  }, [price, product.id, product.name]);

  function addToBag() {
    addItem({
      id: product.id,
      variantId: selectedVariant?.id,
      variantLabel: selectedVariant?.label,
      name: product.name,
      price,
      image: activeImage,
      stock: selectedVariant ? selectedVariant.stock : product.stock,
      unlimitedStock: selectedVariant ? selectedVariant.unlimited_stock : product.unlimitedStock,
    }, quantity);
    trackAddToCart({ content_ids: [product.id], content_name: product.name, value: price * quantity, quantity });
  }

  function buyNow() {
    addToBag();
    trackInitiateCheckout({ value: price * quantity, content_ids: [product.id], num_items: quantity });
    window.location.href = "/checkout";
  }

  return (
    <div className="tpl-page">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div>
          <div style={{ aspectRatio: "1 / 1", background: "var(--tpl-line)", overflow: "hidden", marginBottom: 8 }}>
            <Image
              src={mainImage}
              alt={product.name}
              width={600}
              height={600}
              priority
              unoptimized={mainImage.startsWith("/storage/") || mainImage.includes("://")}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {images.length > 1 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
              {images.slice(0, 4).map((img) => (
                <button key={img} type="button" onClick={() => setMainImage(img)} style={{ aspectRatio: "1 / 1", padding: 0, border: mainImage === img ? "2px solid var(--tpl-ink)" : "1px solid var(--tpl-line)", background: "transparent" }}>
                  <Image src={img} alt="" width={100} height={100} unoptimized={img.startsWith("/storage/") || img.includes("://")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <small style={{ color: "var(--tpl-muted)", textTransform: "uppercase", letterSpacing: ".1em", fontSize: 11 }}>
            {product.category || ""}
          </small>
          <h1 style={{ fontSize: 28, margin: "8px 0 16px" }}>{product.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, fontSize: 22, fontWeight: 600 }}>
            <span>{formatMoney(price, currency)}</span>
            {originalPrice && originalPrice > price && <s style={{ color: "var(--tpl-muted)", fontSize: 18, fontWeight: 400 }}>{formatMoney(originalPrice, currency)}</s>}
            {disc != null && <span style={{ background: "var(--tpl-sale)", color: "#fff", padding: "2px 8px", fontSize: 12 }}>-{disc}%</span>}
          </div>

          {product.description && (
            <p style={{ color: "var(--tpl-muted)", lineHeight: 1.7, marginBottom: 24 }}>{product.description}</p>
          )}

          {variants.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <b style={{ display: "block", fontSize: 12, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--tpl-muted)", marginBottom: 8 }}>{product.variationType || "Options"}</b>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    disabled={!v.unlimited_stock && v.stock <= 0}
                    onClick={() => { setVariantId(v.id); if (v.image) setMainImage(v.image); }}
                    style={{
                      padding: "8px 14px",
                      border: v.id === variantId ? "1px solid var(--tpl-ink)" : "1px solid var(--tpl-line)",
                      background: v.id === variantId ? "var(--tpl-ink)" : "transparent",
                      color: v.id === variantId ? "var(--tpl-bg)" : "var(--tpl-ink)",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <div style={{ display: "inline-flex", border: "1px solid var(--tpl-line)" }}>
              <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 40, height: 40, border: 0, background: "transparent", cursor: "pointer" }}><FiMinus size={12} /></button>
              <span style={{ minWidth: 30, textAlign: "center", lineHeight: "40px" }}>{quantity}</span>
              <button type="button" onClick={() => setQuantity(quantity + 1)} style={{ width: 40, height: 40, border: 0, background: "transparent", cursor: "pointer" }}><FiPlus size={12} /></button>
            </div>
            <button type="button" className="tpl-btn" style={{ flex: 1 }} onClick={addToBag}>
              <Editable section="product" field="addToBag" defaultValue="Add to bag" label="Add to bag CTA">
                {(v, ep) => <span {...ep}>{v}</span>}
              </Editable>
            </button>
          </div>
          <button type="button" className="tpl-btn tpl-btn--ghost" style={{ width: "100%" }} onClick={buyNow}>
            <Editable section="product" field="buyNow" defaultValue="Buy now" label="Buy now CTA">
              {(v, ep) => <span {...ep}>{v}</span>}
            </Editable>
          </button>
        </div>
      </div>
    </div>
  );
}
