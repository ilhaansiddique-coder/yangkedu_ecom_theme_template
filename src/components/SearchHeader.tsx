"use client";

import Link from "next/link";
import { Search, Camera } from "lucide-react";

/**
 * Mobile home search bar (PDD style): neutral gray rounded pill with a
 * magnifier, a keyword placeholder, and a camera (visual search) icon.
 * Hidden on desktop (lg+) — the website uses DesktopHeader instead.
 */
export default function SearchHeader({ placeholder = "tool storage bag" }: { placeholder?: string }) {
  return (
    <header className="sticky top-0 z-30 bg-white px-3 py-2 lg:hidden">
      <Link href="/search" className="flex h-10 items-center gap-2 rounded-full bg-canvas px-4">
        <Search size={18} className="text-muted" />
        <span className="flex-1 truncate text-[13px] text-muted">{placeholder}</span>
        <Camera size={18} className="text-ink/70" />
      </Link>
    </header>
  );
}
