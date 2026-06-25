"use client";

import Link from "next/link";
import SearchBox from "./SearchBox";

/**
 * Mobile/tablet home search bar: the "Y" brand tile (same as the favicon)
 * next to an inline autocomplete field. Hidden on desktop (lg+) — the website
 * uses DesktopHeader instead.
 */
export default function SearchHeader({ placeholder = "Search for products" }: { placeholder?: string }) {
  return (
    <header className="sticky top-0 z-30 bg-white px-3 py-2 lg:hidden">
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="Yangkedu home" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.svg" alt="Yangkedu" className="h-9 w-9" />
        </Link>
        <div className="min-w-0 flex-1">
          <SearchBox variant="mobile" placeholder={placeholder} />
        </div>
      </div>
    </header>
  );
}
