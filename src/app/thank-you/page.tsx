"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, Users, Truck, Home, MapPin } from "lucide-react";
import { useOrders } from "@/lib/orders";
import { money } from "@/lib/format";

const STEPS = [
  { label: "Order placed", icon: CheckCircle2, done: true },
  { label: "Group forming", icon: Users, done: false },
  { label: "Shipped", icon: Truck, done: false },
  { label: "Delivered", icon: Home, done: false },
];

function ThankYouView() {
  const params = useSearchParams();
  const id = params.get("order") ?? "";
  const { getOrder } = useOrders();
  const order = getOrder(id);

  return (
    <div className="min-h-screen bg-canvas pb-10 lg:min-h-0 lg:bg-transparent">
      <div className="mx-auto w-full max-w-[640px] px-3 py-6 lg:py-4">
        {/* hero */}
        <div className="rounded-xl bg-white p-6 text-center lg:p-10">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#fb5621] to-[#e8290b] text-white">
            <CheckCircle2 size={36} strokeWidth={2} />
          </span>
          <h1 className="mt-4 font-display text-[22px] font-extrabold text-ink lg:text-[26px]">Thank you for your order!</h1>
          <p className="mt-1.5 text-[13px] text-muted lg:text-[15px]">
            Your group buy has started — invite friends to complete it faster and lock in the deal.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-line text-left">
            <Fact label="Order number" value={order?.id ?? id ?? "—"} />
            <Fact label="Amount paid" value={money(order?.total ?? 0)} price />
            <Fact label="Payment" value={`${order?.payment ?? "Card"} · Paid`} />
            <Fact label="Estimated delivery" value="3–6 business days" />
          </div>
        </div>

        {/* items */}
        {order && order.items.length > 0 && (
          <div className="mt-3 rounded-xl bg-white p-5 lg:p-6">
            <h2 className="mb-3 text-[14px] font-semibold text-ink">Items in this order</h2>
            <div className="divide-y divide-line">
              {order.items.map((it) => (
                <div key={it.id} className="flex gap-3 py-2.5">
                  <span className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="line-clamp-2 text-[13px] text-ink lg:text-[14px]">{it.name}</p>
                    <div className="mt-auto flex justify-between">
                      <span className="font-display text-[14px] font-bold text-price">{money(it.price)}</span>
                      <span className="text-[12px] text-muted">x{it.qty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {order.address && (
              <p className="mt-3 flex items-start gap-2 border-t border-line pt-3 text-[12px] text-muted">
                <MapPin size={15} className="mt-0.5 shrink-0 text-brand" />
                {order.address}
              </p>
            )}
          </div>
        )}

        {/* progress timeline */}
        <div className="mt-3 rounded-xl bg-white p-5 lg:p-6">
          <h2 className="mb-4 text-[14px] font-semibold text-ink">Order status</h2>
          <div className="flex items-start justify-between">
            {STEPS.map((s, i) => (
              <div key={s.label} className="relative flex flex-1 flex-col items-center text-center">
                {i < STEPS.length - 1 && (
                  <span className={`absolute left-1/2 top-4 h-0.5 w-full ${s.done ? "bg-brand" : "bg-line"}`} />
                )}
                <span
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                    s.done ? "bg-brand text-white" : "bg-canvas text-muted"
                  }`}
                >
                  <s.icon size={16} />
                </span>
                <span className={`mt-1.5 text-[11px] ${s.done ? "font-medium text-ink" : "text-muted"}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* actions */}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link
            href={order ? `/orders/${order.id}` : "/orders"}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-brand py-2.5 text-[14px] font-semibold text-brand"
          >
            <Package size={16} /> View order
          </Link>
          <Link
            href="/shop"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] py-2.5 text-[14px] font-semibold text-white"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value, price }: { label: string; value: string; price?: boolean }) {
  return (
    <div className="bg-white p-3">
      <p className="text-[11px] text-muted">{label}</p>
      <p className={`mt-0.5 ${price ? "font-display text-[16px] font-bold text-price" : "text-[14px] font-semibold text-ink"}`}>
        {value}
      </p>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-muted">Loading…</div>}>
      <ThankYouView />
    </Suspense>
  );
}
