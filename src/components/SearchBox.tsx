"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { products } from "@/lib/products";
import { money } from "@/lib/format";

/**
 * Autocomplete search field. Typing shows live product suggestions in a
 * dropdown; selecting one opens the product, while submitting (Enter / the
 * Search button / "Search for …" row) goes to the results page.
 *
 *  - variant="mobile"  → gray pill (used in the mobile header)
 *  - variant="desktop" → red-bordered pill with a Search button
 */
export default function SearchBox({
  variant = "mobile",
  placeholder = "Search for products",
}: {
  variant?: "mobile" | "desktop";
  placeholder?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1); // -1 = the "Search for …" row
  const boxRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter((p) => {
        const hay = [p.name, p.category, ...p.tags].join(" ").toLowerCase();
        return hay.includes(term);
      })
      .slice(0, 6);
  }, [q]);

  const showMenu = open && q.trim().length > 0;

  // close dropdown when clicking outside
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function goSearch(term: string) {
    const t = term.trim();
    if (!t) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(t)}`);
  }

  function goProduct(id: string) {
    setOpen(false);
    router.push(`/product/${id}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!showMenu) {
      if (e.key === "Enter") goSearch(q);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && suggestions[active]) goProduct(suggestions[active].id);
      else goSearch(q);
    }
  }

  const isDesktop = variant === "desktop";
  const shell = isDesktop
    ? "flex h-10 w-[440px] items-center gap-2 rounded-full border-2 border-brand bg-white pl-4 pr-1"
    : "flex h-10 items-center gap-2 rounded-full bg-canvas px-4";

  return (
    <div ref={boxRef} className="relative">
      <form onSubmit={(e) => { e.preventDefault(); goSearch(q); }} className={shell}>
        <Search size={18} className="shrink-0 text-muted" />
        <input
          name="q"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          role="combobox"
          aria-expanded={showMenu}
          aria-autocomplete="list"
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted"
        />
        {isDesktop && (
          <button type="submit" className="shrink-0 rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-6 py-1.5 text-[13px] font-semibold text-white">
            Search
          </button>
        )}
      </form>

      {/* suggestions dropdown */}
      {showMenu && (
        <ul className="absolute inset-x-0 top-[calc(100%+6px)] z-50 max-h-[60vh] overflow-y-auto rounded-xl border border-line bg-white py-1 shadow-xl">
          {/* "Search for q" row */}
          <li>
            <button
              type="button"
              onMouseEnter={() => setActive(-1)}
              onClick={() => goSearch(q)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] ${
                active === -1 ? "bg-pill" : ""
              }`}
            >
              <Search size={16} className="text-muted" />
              Search for <span className="font-semibold text-ink">“{q}”</span>
            </button>
          </li>

          {suggestions.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => goProduct(p.id)}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left ${active === i ? "bg-pill" : ""}`}
              >
                <span className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" className="h-full w-full object-cover" />
                </span>
                <span className="line-clamp-1 flex-1 text-[13px] text-ink">{p.name}</span>
                <span className="shrink-0 font-display text-[13px] font-bold text-price">{money(p.price)}</span>
              </button>
            </li>
          ))}

          {suggestions.length === 0 && (
            <li className="px-3 py-3 text-center text-[12px] text-muted">No matching products — press Enter to search</li>
          )}
        </ul>
      )}
    </div>
  );
}
