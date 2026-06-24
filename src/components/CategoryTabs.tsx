"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * PDD-style horizontal category text-tabs that sit under the search bar on the
 * home page. The active tab is red with an underline. Mobile only.
 */
const TABS = [
  { label: "Recommended", href: "/" },
  { label: "Super Deals", href: "/category?cat=subsidy" },
  { label: "Flash", href: "/category?cat=flash" },
  { label: "Food", href: "/category?cat=food" },
  { label: "Fashion", href: "/category?cat=apparel" },
  { label: "Home", href: "/category?cat=home" },
  { label: "Electronics", href: "/category?cat=digital" },
  { label: "Beauty", href: "/category?cat=beauty" },
  { label: "Baby", href: "/category?cat=baby" },
  { label: "Sports", href: "/category?cat=sports" },
];

export default function CategoryTabs() {
  const pathname = usePathname();

  return (
    <div className="sticky top-[56px] z-20 flex gap-5 overflow-x-auto border-b border-line bg-white px-3 [&::-webkit-scrollbar]:hidden lg:hidden">
      {TABS.map((t) => {
        const active = t.href === "/" && pathname === "/";
        return (
          <Link
            key={t.label}
            href={t.href}
            className={`relative shrink-0 py-2.5 text-[14px] ${
              active ? "font-semibold text-brand" : "text-ink/80"
            }`}
          >
            {t.label}
            {active && <span className="absolute inset-x-0 -bottom-px mx-auto h-0.5 w-5 rounded-full bg-brand" />}
          </Link>
        );
      })}
    </div>
  );
}
