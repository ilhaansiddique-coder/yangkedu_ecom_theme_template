"use client";

import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";
import BackHeader from "@/components/BackHeader";
import LoginPrompt from "@/components/LoginPrompt";
import { useAuth } from "@/lib/auth";
import { useOrders, type OrderStatus } from "@/lib/orders";
import { money, formatDate } from "@/lib/format";

const STATUS_STYLE: Record<OrderStatus, string> = {
  "Group forming": "bg-pill text-brand",
  Shipped: "bg-[#fff4e5] text-[#b8650f]",
  Delivered: "bg-[#e8f6ee] text-[#1f9d55]",
};

export default function OrdersPage() {
  const { user } = useAuth();
  const { orders } = useOrders();

  return (
    <div className="min-h-screen bg-canvas lg:min-h-0 lg:bg-transparent">
      <BackHeader title="My Orders" />
      <h1 className="hidden pb-3 text-[22px] font-bold text-ink lg:block">My Orders</h1>

      {!user ? (
        <LoginPrompt next="/orders" message="Log in to see your order history." />
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <Package size={56} strokeWidth={1.3} className="text-line" />
          <p className="text-[14px] text-muted">You have no orders yet</p>
          <Link href="/shop" className="rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-6 py-2 text-[13px] font-semibold text-white">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-2 p-2 lg:p-0">
          {orders.map((o) => (
            <Link key={o.id} href={`/orders/${o.id}`} className="block rounded-[10px] bg-white p-3 lg:p-4">
              <div className="flex items-center justify-between border-b border-line pb-2">
                <span className="text-[13px] font-medium text-ink">{o.id}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[o.status]}`}>
                  {o.status}
                </span>
              </div>
              <div className="flex items-center gap-3 py-2.5">
                <div className="flex flex-1 gap-2 overflow-hidden">
                  {o.items.slice(0, 4).map((it, i) => (
                    <span key={i} className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={it.image} alt="" className="h-full w-full object-cover" />
                    </span>
                  ))}
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-muted">{o.items.reduce((n, it) => n + it.qty, 0)} items</p>
                  <p className="font-display text-[16px] font-bold text-price">{money(o.total)}</p>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </div>
              <p className="text-[11px] text-muted">{formatDate(o.createdAt)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
