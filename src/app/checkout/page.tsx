"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Wallet,
  Info,
  Check,
  ChevronRight,
  MapPin,
  Truck,
  Zap,
  Rocket,
  Clock,
  Store,
  Smartphone,
  Banknote,
  type LucideIcon,
} from "lucide-react";
import BackHeader from "@/components/BackHeader";
import LoginPrompt from "@/components/LoginPrompt";
import CountrySelect, { findCountry } from "@/components/CountrySelect";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { useAddresses } from "@/lib/addresses";
import { useOrders, type Order } from "@/lib/orders";
import { useToast } from "@/lib/toast";
import { money } from "@/lib/format";

const TAX_RATE = 0.05;
const round2 = (n: number) => Math.round(n * 100) / 100;

const SHIPPING_METHODS: { id: string; label: string; sub: string; cost: number; Icon: LucideIcon }[] = [
  { id: "standard", label: "Standard Shipping", sub: "5–7 business days", cost: 4.99, Icon: Truck },
  { id: "express", label: "Express Shipping", sub: "1–3 business days", cost: 9.99, Icon: Zap },
  { id: "nextday", label: "Next-Day Delivery", sub: "Next business day", cost: 19.99, Icon: Rocket },
  { id: "sameday", label: "Same-Day Delivery", sub: "Within hours · select cities", cost: 24.99, Icon: Clock },
  { id: "pickup", label: "Store Pickup", sub: "Ready in ~2 hours", cost: 0, Icon: Store },
];

const PAYMENTS: { id: string; label: string; sub?: string; Icon: LucideIcon }[] = [
  { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, Amex", Icon: CreditCard },
  { id: "paypal", label: "PayPal", Icon: Wallet },
  { id: "wallet", label: "Apple Pay / Google Pay", Icon: Smartphone },
  { id: "cod", label: "Cash on Delivery", sub: "Pay in cash when it arrives", Icon: Banknote },
];

const payLabel = (id: string) => PAYMENTS.find((p) => p.id === id)?.label ?? id;

/** Discount in dollars for a coupon code, or null if invalid. */
function couponDiscount(code: string, subtotal: number): number | null {
  switch (code.trim().toUpperCase()) {
    case "SAVE5":
      return subtotal >= 10 ? 5 : 0;
    case "GROUP10":
      return round2(subtotal * 0.1);
    case "WELCOME15":
      return round2(subtotal * 0.15);
    default:
      return null;
  }
}

/** Split "Name (Black / L)" → { title, variant }. */
function splitName(name: string): { title: string; variant: string } {
  const m = name.match(/^(.*) \((.*)\)$/);
  return m ? { title: m[1], variant: m[2] } : { title: name, variant: "" };
}

export default function CheckoutPage() {
  const { lines, total, clear } = useCart();
  const { user } = useAuth();
  const { defaultAddress } = useAddresses();
  const { addOrder } = useOrders();
  const router = useRouter();
  const toast = useToast();

  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [method, setMethod] = useState("standard");
  const [pay, setPay] = useState("card");

  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState("");

  // prefill from the saved default address / account
  const [first = "", last = ""] = (defaultAddress?.name ?? "").split(" ");
  const [form, setForm] = useState({
    first,
    last,
    email: user?.email ?? "",
    country: "IN",
    phone: defaultAddress?.phone ?? "",
    city: "",
    state: "",
    zip: "",
    description: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  if (!user) {
    return (
      <div className="min-h-screen bg-canvas lg:min-h-0 lg:bg-transparent">
        <BackHeader title="Checkout" />
        <LoginPrompt next="/checkout" message="Log in to complete your purchase." />
      </div>
    );
  }

  const subtotal = total;
  const discount = coupon?.discount ?? 0;
  const taxed = Math.max(0, subtotal - discount);
  const shippingCost = SHIPPING_METHODS.find((m) => m.id === method)!.cost;
  const estimatedTax = round2(taxed * TAX_RATE);
  const grandTotal = round2(taxed + shippingCost + estimatedTax);

  function applyCoupon() {
    const d = couponDiscount(couponInput, total);
    if (d === null) {
      setCoupon(null);
      setCouponError("Invalid code. Try SAVE5, GROUP10 or WELCOME15.");
      toast("Invalid coupon code", "error");
      return;
    }
    const code = couponInput.trim().toUpperCase();
    setCoupon({ code, discount: d });
    setCouponError("");
    toast(`Coupon ${code} applied — saved ${money(d)}`);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lines.length === 0) return;
    if (step === "shipping") {
      setStep("payment");
      window.scrollTo({ top: 0 });
      return;
    }
    placeOrder();
  }

  function placeOrder() {
    const dial = findCountry(form.country).dial;
    const addr = `${form.first} ${form.last} · ${dial} ${form.phone} — ${form.city}, ${form.state} ${form.zip}`;
    const id = `YKD${Date.now().toString().slice(-8)}`;
    const order: Order = {
      id,
      createdAt: Date.now(),
      items: lines,
      subtotal,
      discount,
      shipping: shippingCost,
      tax: estimatedTax,
      total: grandTotal,
      payment: payLabel(pay),
      couponCode: coupon?.code,
      address: addr,
      status: "Group forming",
    };
    addOrder(order);
    clear();
    router.push(`/thank-you?order=${id}`);
  }

  const inputCls =
    "h-11 w-full rounded-md border border-line bg-white px-3 text-[14px] text-ink outline-none focus:border-brand";
  const labelCls = "mb-1.5 block text-[12px] text-ink";

  return (
    <div className="min-h-screen bg-canvas pb-6 lg:min-h-0 lg:bg-transparent">
      <BackHeader title="Checkout" />

      {/* breadcrumb steps */}
      <nav className="mb-4 flex items-center gap-1.5 px-3 pt-3 text-[13px] lg:px-0">
        <Link href="/cart" className="text-muted hover:text-brand">
          Cart
        </Link>
        <ChevronRight size={14} className="text-muted" />
        <span className={step === "shipping" ? "font-semibold text-ink" : "text-muted"}>Shipping</span>
        <ChevronRight size={14} className="text-muted" />
        <span className={step === "payment" ? "font-semibold text-ink" : "text-muted"}>Payment</span>
      </nav>

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 px-3 lg:grid-cols-[1fr_360px] lg:px-0">
        {/* ───────────── left column ───────────── */}
        <div className="rounded-xl bg-white p-5 lg:p-7">
          {step === "shipping" ? (
            <>
              <h2 className="text-[20px] font-bold text-ink">Shipping Address</h2>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>First Name*</label>
                  <input required value={form.first} onChange={set("first")} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Last Name*</label>
                  <input required value={form.last} onChange={set("last")} className={inputCls} />
                </div>
              </div>

              <div className="mt-4">
                <label className={labelCls}>Email*</label>
                <input required type="email" value={form.email} onChange={set("email")} className={inputCls} />
              </div>

              <div className="mt-4">
                <label className={labelCls}>Phone number*</label>
                <div className="flex h-11 items-stretch rounded-lg border border-line bg-white transition-colors focus-within:border-brand">
                  <CountrySelect value={form.country} onChange={(id) => setForm((f) => ({ ...f, country: id }))} />
                  <span className="my-2 w-px bg-line" />
                  <span className="flex items-center pl-3 text-[14px] font-medium text-ink">{findCountry(form.country).dial}</span>
                  <input
                    required
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="(555) 018-8888"
                    className="h-full flex-1 rounded-r-lg bg-transparent px-2 text-[14px] text-ink outline-none placeholder:text-muted"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>City*</label>
                  <input required value={form.city} onChange={set("city")} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>State*</label>
                  <input required value={form.state} onChange={set("state")} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Zip Code*</label>
                  <input required value={form.zip} onChange={set("zip")} className={inputCls} />
                </div>
              </div>

              <div className="mt-4">
                <label className={labelCls}>Description*</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={set("description")}
                  placeholder="Enter a description..."
                  className="w-full rounded-md border border-line bg-white px-3 py-2.5 text-[14px] text-ink outline-none focus:border-brand"
                />
              </div>

              <h2 className="mt-8 text-[20px] font-bold text-ink">Delivery Method</h2>
              <div className="mt-4 grid grid-cols-1 gap-2.5">
                {SHIPPING_METHODS.map((m) => {
                  const active = method === m.id;
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left ${
                        active ? "border-brand bg-pill" : "border-line bg-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${active ? "border-brand" : "border-line"}`}>
                          {active && <span className="h-2 w-2 rounded-full bg-brand" />}
                        </span>
                        <m.Icon size={20} className={active ? "text-brand" : "text-muted"} />
                        <span>
                          <span className="block text-[14px] font-medium text-ink">{m.label}</span>
                          <span className="block text-[12px] text-muted">{m.sub}</span>
                        </span>
                      </span>
                      <span className="font-display text-[14px] font-bold text-price">{m.cost === 0 ? "Free" : money(m.cost)}</span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {/* payment step */}
              <h2 className="text-[20px] font-bold text-ink">Payment</h2>

              <div className="mt-4 flex items-start gap-3 rounded-lg bg-canvas p-4">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand" />
                <div className="flex-1 text-[13px]">
                  <p className="font-semibold text-ink">
                    {form.first} {form.last} · {findCountry(form.country).dial} {form.phone}
                  </p>
                  <p className="text-muted">
                    {form.city}, {form.state} {form.zip}
                  </p>
                  <p className="text-muted">{SHIPPING_METHODS.find((m) => m.id === method)?.label} · {form.email}</p>
                </div>
                <button type="button" onClick={() => setStep("shipping")} className="text-[13px] font-medium text-brand">
                  Edit
                </button>
              </div>

              <h3 className="mt-6 text-[15px] font-semibold text-ink">Payment Method</h3>
              <div className="mt-2">
                {PAYMENTS.map((m) => (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 ${
                      pay === m.id ? "border-brand bg-pill" : "border-transparent"
                    }`}
                  >
                    <m.Icon size={20} className={pay === m.id ? "text-brand" : "text-ink"} />
                    <span className="flex-1">
                      <span className="block text-[14px] text-ink">{m.label}</span>
                      {m.sub && <span className="block text-[12px] text-muted">{m.sub}</span>}
                    </span>
                    <input type="radio" name="pay" checked={pay === m.id} onChange={() => setPay(m.id)} className="h-4 w-4 accent-[#e22e1f]" />
                  </label>
                ))}
              </div>
              {pay === "cod" && (
                <p className="mt-2 flex items-start gap-2 rounded-lg bg-canvas p-3 text-[12px] text-muted">
                  <Info size={14} className="mt-0.5 shrink-0 text-brand" />
                  Pay with cash when your order is delivered. Please keep the exact amount ready for the courier.
                </p>
              )}
            </>
          )}
        </div>

        {/* ───────────── right column: cart summary ───────────── */}
        <aside className="h-fit rounded-xl bg-canvas p-5 lg:sticky lg:top-20">
          <h3 className="text-[18px] font-bold text-ink">Your Cart</h3>

          <div className="mt-4 space-y-3">
            {lines.length === 0 && <p className="py-4 text-center text-[13px] text-muted">Your cart is empty</p>}
            {lines.map((l) => {
              const { title, variant } = splitName(l.name);
              return (
                <div key={l.id} className="flex items-center gap-3">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.image} alt={title} className="h-full w-full object-cover" />
                    <span className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                      {l.qty}
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-ink">{title}</p>
                    {variant && <p className="truncate text-[11px] text-muted">{variant}</p>}
                  </div>
                  <span className="font-display text-[14px] font-bold text-price">{money(l.price * l.qty)}</span>
                </div>
              );
            })}
          </div>

          {/* discount code */}
          <div className="mt-4">
            <div className="flex items-center rounded-md border border-line bg-white px-3">
              <input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Discount code"
                className="h-11 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-muted"
              />
              <button type="button" onClick={applyCoupon} className="text-[13px] font-semibold text-brand">
                Apply
              </button>
            </div>
            {coupon && coupon.discount > 0 && (
              <p className="mt-1.5 flex items-center gap-1 text-[12px] text-[#1f9d55]">
                <Check size={13} /> {coupon.code} — saved {money(coupon.discount)}
              </p>
            )}
            {couponError && <p className="mt-1.5 text-[12px] text-brand">{couponError}</p>}
          </div>

          {/* totals */}
          <div className="mt-4 space-y-2 text-[13px]">
            <div className="flex justify-between text-ink">
              <span className="text-muted">Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#1f9d55]">
                <span>Discount</span>
                <span>−{money(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-ink">
              <span className="text-muted">Shipping</span>
              <span>{shippingCost === 0 ? "Free" : money(shippingCost)}</span>
            </div>
            <div className="flex justify-between text-ink">
              <span className="flex items-center gap-1 text-muted">
                Estimated taxes <Info size={13} className="text-muted" />
              </span>
              <span>{money(estimatedTax)}</span>
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
            <span className="text-[16px] font-bold text-ink">Total</span>
            <span className="font-display text-[22px] font-bold text-price">{money(grandTotal)}</span>
          </div>

          <button
            type="submit"
            disabled={lines.length === 0}
            className="mt-4 w-full rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] py-3 text-[15px] font-semibold text-white disabled:opacity-50"
          >
            {step === "shipping" ? "Continue to Payment" : "Place Order"}
          </button>
        </aside>
      </form>
    </div>
  );
}
