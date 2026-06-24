"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMinus, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { useCart } from "@/lib/CartContext";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { trackRemoveFromCart } from "@/lib/analytics";
import type { CartDrawerProps } from "@/storefront-engine/types/pages";
import { formatMoney } from "../components/helpers";
import "../styles.css";

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const settings = useSiteSettings();
  const currency = settings.currency_symbol || "৳";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleRemove = (item: typeof items[number]) => {
    trackRemoveFromCart({
      content_ids: [item.id],
      content_name: item.name,
      value: item.price * item.quantity,
      quantity: item.quantity,
    });
    removeItem(item.id, item.variantId);
  };

  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 60 }} />
      <aside style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 100vw)", background: "var(--tpl-bg)", zIndex: 65, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 20, borderBottom: "1px solid var(--tpl-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>Your bag</h2>
          <button type="button" onClick={onClose} className="tpl-nav__icon" aria-label="Close"><FiX size={18} /></button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {items.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--tpl-muted)", padding: "40px 0" }}>
              Your bag is empty.
            </p>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.variantId || 0}`} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--tpl-line)" }}>
                <div style={{ aspectRatio: "1 / 1", background: "var(--tpl-line)", overflow: "hidden" }}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    unoptimized={item.image?.startsWith("/storage/") || item.image?.includes("://")}
                  />
                </div>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: 13 }}>{item.name}</h4>
                  {item.variantLabel && <small style={{ color: "var(--tpl-muted)" }}>{item.variantLabel}</small>}
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 6 }}>
                    <button type="button" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.variantId)} style={{ border: "1px solid var(--tpl-line)", background: "transparent", width: 24, height: 24, cursor: "pointer" }}><FiMinus size={11} /></button>
                    <span style={{ minWidth: 20, textAlign: "center", fontSize: 13 }}>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1, item.variantId)} style={{ border: "1px solid var(--tpl-line)", background: "transparent", width: 24, height: 24, cursor: "pointer" }}><FiPlus size={11} /></button>
                    <button type="button" onClick={() => handleRemove(item)} style={{ marginLeft: 6, background: "transparent", border: 0, color: "var(--tpl-muted)", cursor: "pointer" }} aria-label="Remove"><FiTrash2 size={13} /></button>
                  </div>
                </div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{formatMoney(item.price * item.quantity, currency)}</div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: 20, borderTop: "1px solid var(--tpl-line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ color: "var(--tpl-muted)" }}>Subtotal</span>
              <b>{formatMoney(totalPrice, currency)}</b>
            </div>
            <Link href="/checkout" onClick={onClose} className="tpl-btn" style={{ width: "100%" }}>Checkout</Link>
          </div>
        )}
      </aside>
    </>
  );
}
