"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, User, type LucideIcon } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useCartUI } from "@/lib/cart-ui";

const TABS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/category", label: "Categories", icon: LayoutGrid },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/me", label: "Account", icon: User },
];

export default function BottomTab() {
  const pathname = usePathname();
  const { count } = useCart();
  const { open: cartOpen, openCart } = useCartUI();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[480px] border-t border-line bg-white pb-[var(--safe-bottom)] lg:hidden">
      {TABS.map((t) => {
        const isCart = t.href === "/cart";
        const active = isCart ? cartOpen : t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
        const Icon = t.icon;

        const inner = (
          <>
            <span className="relative">
              <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
              {isCart && count > 0 && (
                <span className="absolute -right-2 -top-1.5 min-w-[16px] rounded-full bg-brand px-1 text-center text-[10px] font-bold leading-[16px] text-white">
                  {count}
                </span>
              )}
            </span>
            <span>{t.label}</span>
          </>
        );

        const cls = `relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] ${
          active ? "text-brand" : "text-muted"
        }`;

        // Cart opens the drawer instead of navigating.
        return isCart ? (
          <button key={t.href} type="button" onClick={openCart} className={cls}>
            {inner}
          </button>
        ) : (
          <Link key={t.href} href={t.href} className={cls}>
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
