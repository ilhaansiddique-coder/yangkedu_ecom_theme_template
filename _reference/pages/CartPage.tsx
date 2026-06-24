"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "@/lib/CartContext";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { trackRemoveFromCart } from "@/lib/analytics";
import { Editable } from "@/storefront-engine/editor/Editable";
import { formatMoney } from "../components/helpers";
import "../styles.css";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const settings = useSiteSettings();
  const currency = settings.currency_symbol || "৳";

  // GA4 view_cart event for GTM-driven audiences.
  useEffect(() => {
    if (!items.length || typeof window === "undefined") return;
    type Layer = { dataLayer?: Array<Record<string, unknown>> };
    const w = window as Window & Layer;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ ecommerce: null });
    w.dataLayer.push({
      event: "view_cart",
      ecommerce: {
        currency: settings.currency || "BDT",
        value: totalPrice,
        items: items.map((i) => ({
          item_id: String(i.id),
          item_name: i.name,
          item_variant: i.variantLabel || undefined,
          price: i.price,
          quantity: i.quantity,
        })),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const handleRemove = (item: typeof items[number]) => {
    trackRemoveFromCart({
      content_ids: [item.id],
      content_name: item.name,
      value: item.price * item.quantity,
      quantity: item.quantity,
    });
    removeItem(item.id, item.variantId);
  };

  return (
    <div className="tpl-page">
      <Editable section="cart" field="title" defaultValue="Your bag" label="Cart title">
        {(v, ep) => <h1 {...ep} style={{ fontSize: 28, textAlign: "center", margin: "24px 0 32px" }}>{v}</h1>}
      </Editable>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <p style={{ color: "var(--tpl-muted)", marginBottom: 20 }}>Your bag is empty.</p>
          <Link href="/shop" className="tpl-btn">Continue shopping</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32 }}>
          <div>
            {items.map((item) => (
              <div key={`${item.id}-${item.variantId || 0}`} style={{ display: "grid", gridTemplateColumns: "80px 1fr auto", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--tpl-line)" }}>
                <div style={{ aspectRatio: "1 / 1", background: "var(--tpl-line)", overflow: "hidden" }}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    unoptimized={item.image?.startsWith("/storage/") || item.image?.includes("://")}
                  />
                </div>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: 14 }}>{item.name}</h4>
                  {item.variantLabel && <small style={{ color: "var(--tpl-muted)" }}>{item.variantLabel}</small>}
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 8 }}>
                    <button type="button" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.variantId)} style={{ width: 28, height: 28, border: "1px solid var(--tpl-line)", background: "transparent", cursor: "pointer" }}><FiMinus size={12} /></button>
                    <span style={{ minWidth: 24, textAlign: "center" }}>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1, item.variantId)} style={{ width: 28, height: 28, border: "1px solid var(--tpl-line)", background: "transparent", cursor: "pointer" }}><FiPlus size={12} /></button>
                    <button type="button" onClick={() => handleRemove(item)} style={{ marginLeft: 6, background: "transparent", border: 0, color: "var(--tpl-muted)", cursor: "pointer" }} aria-label="Remove"><FiTrash2 size={14} /></button>
                  </div>
                </div>
                <div style={{ fontWeight: 500 }}>{formatMoney(item.price * item.quantity, currency)}</div>
              </div>
            ))}
          </div>

          <aside style={{ background: "#fafafa", padding: 20, border: "1px solid var(--tpl-line)", height: "fit-content" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 16 }}>Summary</h2>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14 }}>
              <span style={{ color: "var(--tpl-muted)" }}>Subtotal</span>
              <b>{formatMoney(totalPrice, currency)}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14 }}>
              <span style={{ color: "var(--tpl-muted)" }}>Shipping</span>
              <b>At checkout</b>
            </div>
            <Link href="/checkout" className="tpl-btn" style={{ width: "100%", marginTop: 16 }}>Checkout</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
