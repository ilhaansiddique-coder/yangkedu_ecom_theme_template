"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { useSiteSettings } from "@/lib/SiteSettingsContext";
import { trackAddPaymentInfo, trackInitiateCheckout, trackPurchase } from "@/lib/analytics";
import { Editable } from "@/storefront-engine/editor/Editable";
import { api } from "@/lib/api";
import { formatMoney } from "../components/helpers";
import "../styles.css";

const DEFAULT_SHIPPING = 60;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const settings = useSiteSettings();
  const currency = settings.currency_symbol || "৳";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const shipping = items.length ? DEFAULT_SHIPPING : 0;
  const grandTotal = totalPrice + shipping;

  useEffect(() => {
    if (items.length) {
      trackInitiateCheckout({
        value: totalPrice,
        content_ids: items.map((i) => i.id),
        num_items: items.reduce((sum, item) => sum + item.quantity, 0),
      });
    }
  }, [items, totalPrice]);

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    setPaymentMethod(next);
    trackAddPaymentInfo({
      value: totalPrice,
      payment_type: next,
      content_ids: items.map((i) => i.id),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await api.createOrder({
        customer_name: name,
        customer_phone: phone,
        customer_email: email || undefined,
        customer_address: address,
        city,
        subtotal: totalPrice,
        shipping_cost: shipping,
        total: grandTotal,
        payment_method: paymentMethod,
        items: items.map((item) => ({
          product_id: item.id,
          product_name: item.name,
          variant_id: item.variantId || undefined,
          variant_label: item.variantLabel || undefined,
          quantity: item.quantity,
          price: item.price,
        })),
      });
      trackPurchase({
        content_ids: items.map((i) => i.id),
        content_name: items.map((i) => i.name).join(", "),
        num_items: items.reduce((s, i) => s + i.quantity, 0),
        value: res.total || grandTotal,
        order_id: String(res.id || ""),
        shipping,
      });
      clearCart();
      if (res.order_token) setTimeout(() => router.push(`/order/${res.order_token}`), 800);
    } catch (err) {
      const e = err as { message?: string };
      setError(e.message || "Could not place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tpl-page">
      <Editable section="checkout" field="title" defaultValue="Checkout" label="Checkout title">
        {(v, ep) => <h1 {...ep} style={{ fontSize: 28, textAlign: "center", margin: "24px 0 32px" }}>{v}</h1>}
      </Editable>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32 }}>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          {error && <div style={{ padding: 12, background: "#fee", color: "#c2410c", fontSize: 13 }}>{error}</div>}
          {[
            { name: "name",    type: "text",     label: "Full name", value: name,    set: setName    },
            { name: "phone",   type: "tel",      label: "Phone",     value: phone,   set: setPhone   },
            { name: "email",   type: "email",    label: "Email (optional)", value: email, set: setEmail },
            { name: "address", type: "textarea", label: "Address",   value: address, set: setAddress },
            { name: "city",    type: "text",     label: "City",      value: city,    set: setCity    },
          ].map((f) => (
            <label key={f.name} style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12 }}>
              <span style={{ color: "var(--tpl-muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>{f.label}</span>
              {f.type === "textarea" ? (
                <textarea value={f.value} onChange={(e) => f.set(e.target.value)} required rows={3} style={{ padding: 10, border: "1px solid var(--tpl-line)", fontFamily: "inherit", fontSize: 14 }} />
              ) : (
                <input type={f.type} value={f.value} onChange={(e) => f.set(e.target.value)} required={f.name !== "email"} style={{ padding: 10, border: "1px solid var(--tpl-line)", fontSize: 14 }} />
              )}
            </label>
          ))}
          <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12 }}>
            <span style={{ color: "var(--tpl-muted)", textTransform: "uppercase", letterSpacing: ".1em" }}>Payment</span>
            <select value={paymentMethod} onChange={handlePaymentChange} style={{ padding: 10, border: "1px solid var(--tpl-line)", fontSize: 14 }}>
              <option value="cod">Cash on delivery</option>
              <option value="bkash">bKash</option>
              <option value="nagad">Nagad</option>
            </select>
          </label>
          <button type="submit" className="tpl-btn" disabled={submitting || !items.length} style={{ width: "100%" }}>
            {submitting ? "Placing order…" : "Place order"}
          </button>
        </form>

        <aside style={{ background: "#fafafa", padding: 20, border: "1px solid var(--tpl-line)", height: "fit-content" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 16 }}>Your bag</h2>
          {items.length === 0 ? (
            <p style={{ color: "var(--tpl-muted)", fontSize: 14 }}>Empty. <Link href="/shop">Shop now →</Link></p>
          ) : (
            <>
              {items.map((item) => (
                <div key={`${item.id}-${item.variantId || 0}`} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13 }}>
                  <span>{item.name} × {item.quantity}</span>
                  <b>{formatMoney(item.price * item.quantity, currency)}</b>
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--tpl-line)", marginTop: 8, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span><b>{formatMoney(totalPrice, currency)}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span>Shipping</span><b>{formatMoney(shipping, currency)}</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid var(--tpl-line)", marginTop: 8, fontSize: 16 }}>
                <b>Total</b><b>{formatMoney(grandTotal, currency)}</b>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
