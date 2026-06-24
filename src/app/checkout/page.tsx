"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, CreditCard, Wallet, ChevronRight, Ticket, Check } from "lucide-react";
import BackHeader from "@/components/BackHeader";
import LoginPrompt from "@/components/LoginPrompt";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { useAddresses } from "@/lib/addresses";
import { useOrders, type Order } from "@/lib/orders";
import { money } from "@/lib/format";

const PAY_LABEL: Record<string, string> = {
  card: "Credit / Debit Card",
  paypal: "PayPal",
};

/** Returns the discount in dollars for a coupon code, or null if invalid. */
function couponDiscount(code: string, subtotal: number): number | null {
  switch (code.trim().toUpperCase()) {
    case "SAVE5":
      return subtotal >= 10 ? 5 : 0;
    case "GROUP10":
      return Math.round(subtotal * 10) / 100; // 10%
    case "WELCOME15":
      return Math.round(subtotal * 15) / 100; // 15%
    default:
      return null;
  }
}

export default function CheckoutPage() {
  const { lines, total, clear } = useCart();
  const { user } = useAuth();
  const { defaultAddress } = useAddresses();
  const { addOrder } = useOrders();
  const router = useRouter();

  const [pay, setPay] = useState("card");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen bg-canvas lg:min-h-0 lg:bg-transparent">
        <BackHeader title="Checkout" />
        <LoginPrompt next="/checkout" message="Log in to complete your purchase." />
      </div>
    );
  }

  const shipping = 0;
  const discount = coupon?.discount ?? 0;
  const grandTotal = Math.max(0, total - discount + shipping);

  function applyCoupon() {
    const d = couponDiscount(couponInput, total);
    if (d === null) {
      setCoupon(null);
      setCouponError("Invalid code. Try SAVE5, GROUP10 or WELCOME15.");
      return;
    }
    setCoupon({ code: couponInput.trim().toUpperCase(), discount: d });
    setCouponError("");
  }

  function placeOrder() {
    if (lines.length === 0) return;
    const id = `YKD${Date.now().toString().slice(-8)}`;
    const addr = defaultAddress
      ? `${defaultAddress.name} · ${defaultAddress.phone} — ${defaultAddress.line}, ${defaultAddress.city}`
      : "No address on file";
    const order: Order = {
      id,
      createdAt: Date.now(),
      items: lines,
      subtotal: total,
      discount,
      shipping,
      total: grandTotal,
      payment: PAY_LABEL[pay],
      couponCode: coupon?.code,
      address: addr,
      status: "Group forming",
    };
    addOrder(order);
    clear();
    router.push(`/thank-you?order=${id}`);
  }

  return (
    <div className="min-h-screen bg-canvas pb-20 lg:min-h-0 lg:bg-transparent lg:pb-0">
      <BackHeader title="Confirm Order" />
      <h1 className="hidden pb-3 text-[22px] font-bold text-ink lg:block">Checkout</h1>

      <div className="lg:flex lg:items-start lg:gap-4">
        <div className="lg:flex-1">
          {/* address */}
          <Link href="/addresses" className="mt-2 flex items-center gap-3 bg-white px-4 py-4 lg:mt-0 lg:rounded-lg">
            <MapPin size={20} className="shrink-0 text-brand" />
            <div className="flex-1">
              {defaultAddress ? (
                <>
                  <p className="text-[14px] font-semibold text-ink">
                    {defaultAddress.name} · {defaultAddress.phone}
                  </p>
                  <p className="text-[12px] text-muted">
                    {defaultAddress.line}, {defaultAddress.city}
                  </p>
                </>
              ) : (
                <p className="text-[14px] font-semibold text-brand">+ Add a shipping address</p>
              )}
            </div>
            <ChevronRight size={18} className="text-muted" />
          </Link>

          {/* items */}
          <div className="mt-2 bg-white px-4 py-3 lg:rounded-lg">
            {lines.length === 0 && <p className="py-6 text-center text-[13px] text-muted">No items to check out</p>}
            {lines.map((l) => (
              <div key={l.id} className="flex gap-3 py-2">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.image} alt={l.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="line-clamp-2 text-[13px] text-ink">{l.name}</p>
                  <div className="mt-auto flex justify-between">
                    <span className="font-display text-[14px] font-bold text-price">{money(l.price)}</span>
                    <span className="text-[12px] text-muted">x{l.qty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* coupon */}
          <div className="mt-2 bg-white px-4 py-3 lg:rounded-lg">
            <div className="flex items-center gap-2">
              <Ticket size={18} className="shrink-0 text-brand" />
              <input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Promo code (SAVE5, GROUP10, WELCOME15)"
                className="h-9 flex-1 rounded-lg border border-line px-3 text-[13px] text-ink outline-none focus:border-brand"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="rounded-full bg-ink/5 px-4 py-2 text-[13px] font-semibold text-ink hover:bg-ink/10"
              >
                Apply
              </button>
            </div>
            {coupon && coupon.discount > 0 && (
              <p className="mt-2 flex items-center gap-1 text-[12px] text-[#1f9d55]">
                <Check size={14} /> {coupon.code} applied — you save {money(coupon.discount)}
              </p>
            )}
            {coupon && coupon.discount === 0 && (
              <p className="mt-2 text-[12px] text-muted">{coupon.code} requires a higher subtotal.</p>
            )}
            {couponError && <p className="mt-2 text-[12px] text-brand">{couponError}</p>}
          </div>

          {/* payment */}
          <div className="mt-2 bg-white px-4 lg:rounded-lg">
            {[
              { id: "card", label: "Credit / Debit Card", Icon: CreditCard },
              { id: "paypal", label: "PayPal", Icon: Wallet },
            ].map((m) => (
              <label key={m.id} className="flex items-center gap-3 border-b border-line py-3 last:border-0">
                <m.Icon size={20} className="text-ink" />
                <span className="flex-1 text-[14px] text-ink">{m.label}</span>
                <input
                  type="radio"
                  name="pay"
                  checked={pay === m.id}
                  onChange={() => setPay(m.id)}
                  className="h-4 w-4 accent-[#e22e1f]"
                />
              </label>
            ))}
          </div>
        </div>

        {/* summary */}
        <div className="mt-2 bg-white px-4 py-3 text-[13px] lg:mt-0 lg:w-[320px] lg:shrink-0 lg:rounded-lg lg:py-4">
          <h3 className="mb-2 hidden text-[16px] font-semibold text-ink lg:block">Order Summary</h3>
          <div className="flex justify-between py-1 text-muted">
            <span>Subtotal</span>
            <span>{money(total)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between py-1 text-[#1f9d55]">
              <span>Discount ({coupon?.code})</span>
              <span>−{money(discount)}</span>
            </div>
          )}
          <div className="flex justify-between py-1 text-muted">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : money(shipping)}</span>
          </div>
          <div className="mt-2 hidden items-baseline justify-between border-t border-line pt-3 lg:flex">
            <span className="text-[14px] text-ink">Total</span>
            <span className="font-display text-[22px] font-bold text-price">{money(grandTotal)}</span>
          </div>
          <button
            type="button"
            disabled={lines.length === 0}
            onClick={placeOrder}
            className="mt-3 hidden w-full rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] py-2.5 text-[15px] font-semibold text-white disabled:opacity-50 lg:block"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* mobile place-order bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[480px] items-center justify-between border-t border-line bg-white px-4 py-2.5 pb-[calc(10px+var(--safe-bottom))] lg:hidden">
        <span className="text-[13px] text-ink">
          Total <span className="font-display text-[18px] font-bold text-price">{money(grandTotal)}</span>
        </span>
        <button
          type="button"
          disabled={lines.length === 0}
          onClick={placeOrder}
          className="rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-10 py-2 text-[14px] font-semibold text-white disabled:opacity-50"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
