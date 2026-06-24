"use client";

import Link from "next/link";
import {
  ChevronRight,
  User,
  CreditCard,
  Users,
  Package,
  Truck,
  Star,
  Heart,
  Wallet,
  Ticket,
  History,
  RotateCcw,
  TrainFront,
  BadgePercent,
  Headphones,
  LogIn,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useOrders } from "@/lib/orders";
import { useFavorites } from "@/lib/favorites";
import { money } from "@/lib/format";

const ORDER_TABS: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "Unpaid", icon: CreditCard, href: "/orders" },
  { label: "Group buying", icon: Users, href: "/orders" },
  { label: "Packing", icon: Package, href: "/orders" },
  { label: "To receive", icon: Truck, href: "/orders" },
  { label: "Reviews", icon: Star, href: "/orders" },
];

const TOOLS: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "Favorites", icon: Heart, href: "/wishlist" },
  { label: "Wallet", icon: Wallet, href: "/me" },
  { label: "Coupons", icon: Ticket, href: "/me" },
  { label: "Orders", icon: History, href: "/orders" },
  { label: "Refunds", icon: RotateCcw, href: "/orders" },
];

const QUICK: { label: string; icon: LucideIcon; href: string }[] = [
  { label: "Train tickets", icon: TrainFront, href: "/shop" },
  { label: "Half-off first order", icon: BadgePercent, href: "/shop" },
  { label: "Support", icon: Headphones, href: "/contact" },
];

export default function MePage() {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const { count: favCount } = useFavorites();

  // ── Logged out ──
  if (!user) {
    return (
      <div className="min-h-screen bg-canvas lg:min-h-0 lg:bg-transparent">
        <div className="mx-auto flex max-w-[420px] flex-col items-center gap-4 px-4 py-20 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-muted">
            <User size={40} strokeWidth={1.5} />
          </span>
          <div>
            <p className="text-[17px] font-bold text-ink">You&apos;re not logged in</p>
            <p className="mt-1 text-[13px] text-muted">Log in to view orders, favorites and group buys.</p>
          </div>
          <div className="flex w-full gap-2">
            <Link
              href="/login?next=/me"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] py-2.5 text-[14px] font-semibold text-white"
            >
              <LogIn size={16} /> Log in
            </Link>
            <Link
              href="/register?next=/me"
              className="flex flex-1 items-center justify-center rounded-full border border-brand py-2.5 text-[14px] font-semibold text-brand"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Logged in ──
  const initial = user.name.charAt(0).toUpperCase();
  const saved = orders.reduce((s, o) => s + o.discount, 0);

  return (
    <div className="min-h-screen bg-canvas lg:min-h-0 lg:bg-transparent">
      {/* profile header */}
      <div className="bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-4 pb-6 pt-6 text-white lg:rounded-lg lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/25 text-[22px] font-bold lg:h-16 lg:w-16 lg:text-[26px]">
            {initial}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[18px] font-bold">{user.name}</p>
            <Link href="/addresses" className="mt-0.5 flex items-center gap-1 text-[12px] text-white/90">
              Shipping address
              <ChevronRight size={14} />
            </Link>
          </div>
          <button
            type="button"
            onClick={logout}
            aria-label="Sign out"
            className="rounded-full border border-white/40 px-3 py-1 text-[12px]"
          >
            <span className="flex items-center gap-1">
              <LogOut size={13} /> Sign out
            </span>
          </button>
        </div>
      </div>

      {/* savings card banner */}
      <Link href="/shop" className="mx-3 mt-3 flex items-center justify-between rounded-lg bg-pill px-4 py-3 lg:mx-0">
        <p className="text-[13px]">
          <span className="font-bold text-brand">Savings Card</span>
          <span className="ml-2 text-ink/70">
            {orders.length > 0 ? `You've saved ${money(saved)} so far` : "Grab coupons, then order"}
          </span>
        </p>
        <ChevronRight size={16} className="text-brand" />
      </Link>

      {/* my orders */}
      <div className="mx-3 mt-3 rounded-[10px] bg-white p-3 lg:mx-0 lg:p-5">
        <div className="flex items-center justify-between pb-3">
          <span className="text-[15px] font-semibold text-ink">My Orders</span>
          <Link href="/orders" className="flex items-center text-[12px] text-muted hover:text-brand">
            View all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-5">
          {ORDER_TABS.map((t) => (
            <Link key={t.label} href={t.href} className="flex flex-col items-center gap-1.5 py-1 text-ink">
              <t.icon size={24} strokeWidth={1.7} />
              <span className="text-center text-[11px] leading-tight">{t.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* recent orders */}
      {orders.length > 0 && (
        <div className="mx-3 mt-3 rounded-[10px] bg-white p-3 lg:mx-0 lg:p-5">
          <span className="mb-1 block text-[15px] font-semibold text-ink">Recent Orders</span>
          <div className="divide-y divide-line">
            {orders.slice(0, 3).map((o) => (
              <Link key={o.id} href={`/orders/${o.id}`} className="flex items-center gap-3 py-2.5">
                <div className="flex -space-x-3">
                  {o.items.slice(0, 3).map((it, i) => (
                    <span key={i} className="h-10 w-10 overflow-hidden rounded-md border-2 border-white bg-line">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={it.image} alt="" className="h-full w-full object-cover" />
                    </span>
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink">{o.id}</p>
                  <p className="text-[11px] text-muted">{o.status}</p>
                </div>
                <span className="font-display text-[14px] font-bold text-price">{money(o.total)}</span>
                <ChevronRight size={16} className="text-muted" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* tools grid */}
      <div className="mx-3 mt-3 rounded-[10px] bg-white p-3 lg:mx-0 lg:p-5">
        <div className="grid grid-cols-5 gap-y-4">
          {TOOLS.map((t) => (
            <Link key={t.label} href={t.href} className="relative flex flex-col items-center gap-1.5 text-ink">
              <t.icon size={24} strokeWidth={1.7} className="text-brand" />
              <span className="text-center text-[11px] leading-tight">{t.label}</span>
              {t.label === "Favorites" && favCount > 0 && (
                <span className="absolute -top-1.5 right-1 min-w-[16px] rounded-full bg-brand px-1 text-center text-[10px] font-bold leading-[16px] text-white">
                  {favCount}
                </span>
              )}
            </Link>
          ))}
        </div>
        <div className="mt-4 flex gap-5 border-t border-line pt-3">
          {QUICK.map((q) => (
            <Link key={q.label} href={q.href} className="flex items-center gap-1.5 text-[12px] text-ink/80">
              <q.icon size={16} className="text-brand-orange" />
              {q.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-3 py-4 text-center">
        <Link href="/shop" className="text-[13px] text-brand">
          Continue shopping — explore more deals ›
        </Link>
      </div>
    </div>
  );
}
