"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  Wallet,
  Ticket,
  Heart,
  Settings,
  LogOut,
  LogIn,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const MENU: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/me", label: "My Account", icon: User },
  { href: "/orders", label: "My Orders", icon: Package },
  { href: "/addresses", label: "Addresses", icon: Wallet },
  { href: "/me", label: "Coupons", icon: Ticket },
  { href: "/wishlist", label: "Favorites", icon: Heart },
  { href: "/me", label: "Settings", icon: Settings },
];

/** Profile avatar + dropdown for the desktop header: login form when logged out, account menu when logged in. */
export default function UserMenu() {
  const { user, hydrated, login, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    login(value);
    setEmail("");
    setOpen(false);
  }

  // ── Logged out (also the pre-hydration / SSR state) ──────────────────────
  if (!user) {
    return (
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-ink hover:text-brand"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-canvas text-muted">
            <User size={18} strokeWidth={2} />
          </span>
          <span className="text-[14px]">Log in</span>
        </button>

        {open && hydrated && (
          <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-72 overflow-hidden rounded-xl border border-line bg-white p-4 shadow-lg">
            <p className="text-[15px] font-bold text-ink">Welcome back</p>
            <p className="mb-3 text-[12px] text-muted">Log in to track orders and group buys.</p>
            <form onSubmit={submitLogin} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="h-10 w-full rounded-lg border border-line bg-white px-3 text-[14px] text-ink outline-none focus:border-brand"
              />
              <input
                type="password"
                placeholder="Password"
                className="h-10 w-full rounded-lg border border-line bg-white px-3 text-[14px] text-ink outline-none focus:border-brand"
              />
              <button
                type="submit"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#fb5621] to-[#e8290b] text-[14px] font-semibold text-white"
              >
                <LogIn size={16} /> Log in
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  // ── Logged in ────────────────────────────────────────────────────────────
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-ink hover:text-brand"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] text-[13px] font-bold text-white">
          {initial}
        </span>
        <span className="max-w-[120px] truncate text-[14px]">{user.name}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-60 overflow-hidden rounded-xl border border-line bg-white shadow-lg"
        >
          {/* profile summary */}
          <Link
            href="/me"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-4 py-3 text-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/25 text-[18px] font-bold">
              {initial}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-bold leading-tight">{user.name}</span>
              <span className="block truncate text-[11px] opacity-90">{user.email}</span>
            </span>
          </Link>

          {/* links */}
          <nav className="py-1">
            {MENU.map((m) => (
              <Link
                key={m.label}
                href={m.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-[14px] text-ink hover:bg-canvas hover:text-brand"
              >
                <m.icon size={18} strokeWidth={1.8} className="text-muted" />
                {m.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              logout();
              setOpen(false);
            }}
            role="menuitem"
            className="flex w-full items-center gap-3 border-t border-line px-4 py-2.5 text-[14px] text-ink hover:bg-canvas hover:text-brand"
          >
            <LogOut size={18} strokeWidth={1.8} className="text-muted" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
