"use client";

import SearchBox from "./SearchBox";

/**
 * Mobile home search bar: an inline autocomplete field (no redirect on tap).
 * Hidden on desktop (lg+) — the website uses DesktopHeader instead.
 */
export default function SearchHeader({ placeholder = "Search for products" }: { placeholder?: string }) {
  return (
    <header className="sticky top-0 z-30 bg-white px-3 py-2 lg:hidden">
      <SearchBox variant="mobile" placeholder={placeholder} />
    </header>
  );
}
