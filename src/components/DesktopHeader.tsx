"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useCartUI } from "@/lib/cart-ui";
import SearchBox from "./SearchBox";
import UserMenu from "./UserMenu";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/category", label: "Categories" },
];

/** Website top bar — only visible on desktop (lg+). */
export default function DesktopHeader() {
  const pathname = usePathname();
  const { count } = useCart();
  const { openCart } = useCartUI();

  return (
    <header className="sticky top-0 z-40 hidden border-b border-line bg-white lg:block">
      <div className="mx-auto flex h-16 w-full max-w-[1450px] items-center px-4">
        {/* left: logo */}
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-[24px] font-extrabold leading-none text-brand">Yangkedu</span>
          <span className="text-[12px] text-muted">group-buy deals</span>
        </Link>

        {/* center: search + nav (mx-auto keeps this block centered) */}
        <div className="mx-auto flex items-center gap-6 px-6">
          <SearchBox variant="desktop" placeholder="Search for products, brands and more" />

          <nav className="flex items-center gap-6 text-[14px]">
            {NAV.map((n) => {
              const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
              return (
                <Link key={n.href} href={n.href} className={active ? "font-semibold text-brand" : "text-ink hover:text-brand"}>
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* right edge: cart + account */}
        <div className="flex shrink-0 items-center gap-5 text-[14px]">
          <button type="button" onClick={openCart} className="relative flex items-center gap-1 text-ink hover:text-brand">
            <ShoppingCart size={18} />
            <span>Cart</span>
            {count > 0 && (
              <span className="ml-0.5 min-w-[18px] rounded-full bg-brand px-1 text-center text-[11px] font-bold leading-[18px] text-white">
                {count}
              </span>
            )}
          </button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
