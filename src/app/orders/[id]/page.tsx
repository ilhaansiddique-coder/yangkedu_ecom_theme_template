"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Package, CheckCircle2, Users, Truck, Home } from "lucide-react";
import BackHeader from "@/components/BackHeader";
import LoginPrompt from "@/components/LoginPrompt";
import { useAuth } from "@/lib/auth";
import { useOrders, type OrderStatus } from "@/lib/orders";
import { money, formatDate } from "@/lib/format";

const STEPS: { label: string; icon: typeof Home }[] = [
  { label: "Placed", icon: CheckCircle2 },
  { label: "Group forming", icon: Users },
  { label: "Shipped", icon: Truck },
  { label: "Delivered", icon: Home },
];

const STEP_INDEX: Record<OrderStatus, number> = {
  "Group forming": 1,
  Shipped: 2,
  Delivered: 3,
};

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const { getOrder } = useOrders();

  if (!user) {
    return (
      <div className="min-h-screen bg-canvas lg:min-h-0 lg:bg-transparent">
        <BackHeader title="Order Details" />
        <LoginPrompt next={`/orders/${params.id}`} message="Log in to view this order." />
      </div>
    );
  }

  const order = getOrder(params.id);

  if (!order) {
    return (
      <div className="min-h-screen bg-canvas lg:min-h-0 lg:bg-transparent">
        <BackHeader title="Order Details" />
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <Package size={56} strokeWidth={1.3} className="text-line" />
          <p className="text-[14px] text-muted">Order not found</p>
          <Link href="/orders" className="rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-6 py-2 text-[13px] font-semibold text-white">
            Back to orders
          </Link>
        </div>
      </div>
    );
  }

  const active = STEP_INDEX[order.status];

  return (
    <div className="min-h-screen bg-canvas pb-6 lg:min-h-0 lg:bg-transparent">
      <BackHeader title="Order Details" />

      <div className="mx-auto w-full max-w-[680px] space-y-2 p-2 lg:space-y-3 lg:p-0">
        {/* status timeline */}
        <div className="rounded-[10px] bg-white p-4 lg:p-5">
          <div className="flex items-start justify-between">
            {STEPS.map((s, i) => {
              const done = i <= active;
              return (
                <div key={s.label} className="relative flex flex-1 flex-col items-center text-center">
                  {i < STEPS.length - 1 && (
                    <span className={`absolute left-1/2 top-4 h-0.5 w-full ${i < active ? "bg-brand" : "bg-line"}`} />
                  )}
                  <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${done ? "bg-brand text-white" : "bg-canvas text-muted"}`}>
                    <s.icon size={16} />
                  </span>
                  <span className={`mt-1.5 text-[11px] ${done ? "font-medium text-ink" : "text-muted"}`}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* address */}
        <div className="flex items-start gap-3 rounded-[10px] bg-white p-4">
          <MapPin size={20} className="mt-0.5 shrink-0 text-brand" />
          <p className="text-[13px] text-ink">{order.address}</p>
        </div>

        {/* items */}
        <div className="rounded-[10px] bg-white px-4 py-1">
          {order.items.map((it) => (
            <Link key={it.id} href={`/product/${it.id.split("::")[0]}`} className="flex gap-3 border-b border-line py-3 last:border-0">
              <span className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt={it.name} className="h-full w-full object-cover" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="line-clamp-2 text-[13px] text-ink">{it.name}</p>
                <div className="mt-auto flex justify-between">
                  <span className="font-display text-[14px] font-bold text-price">{money(it.price)}</span>
                  <span className="text-[12px] text-muted">x{it.qty}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* summary */}
        <div className="rounded-[10px] bg-white p-4 text-[13px]">
          <Row label="Order number" value={order.id} />
          <Row label="Placed" value={formatDate(order.createdAt)} />
          <Row label="Payment" value={order.payment} />
          {order.couponCode && <Row label="Coupon" value={order.couponCode} />}
          <div className="my-2 border-t border-line" />
          <Row label="Subtotal" value={money(order.subtotal)} muted />
          {order.discount > 0 && <Row label="Discount" value={`−${money(order.discount)}`} muted />}
          <Row label="Shipping" value={order.shipping === 0 ? "Free" : money(order.shipping)} muted />
          <div className="mt-2 flex items-baseline justify-between border-t border-line pt-2.5">
            <span className="text-[14px] text-ink">Total</span>
            <span className="font-display text-[20px] font-bold text-price">{money(order.total)}</span>
          </div>
        </div>

        <Link href="/shop" className="block rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] py-2.5 text-center text-[14px] font-semibold text-white">
          Buy again
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={`flex justify-between py-1 ${muted ? "text-muted" : "text-ink"}`}>
      <span>{label}</span>
      <span className={muted ? "" : "font-medium"}>{value}</span>
    </div>
  );
}
