"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { findCountry, searchCountries } from "@/lib/countries";

export { findCountry } from "@/lib/countries";

/** Flag-based country picker with autocomplete search over every country. */
export default function CountrySelect({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const current = findCountry(value);

  const results = useMemo(() => searchCountries(query), [query]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
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

  function select(code: string) {
    onChange(code);
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-full items-center gap-1.5 rounded-l-lg px-3 text-[14px] text-ink transition-colors hover:bg-canvas"
      >
        <span className="text-[18px] leading-none">{current.flag}</span>
        <span className="font-medium">{current.code}</span>
        <ChevronDown size={15} className={`text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-72 overflow-hidden rounded-xl border border-line bg-white shadow-lg">
          {/* search box */}
          <div className="flex items-center gap-2 border-b border-line px-3 py-2">
            <Search size={15} className="text-muted" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code"
              className="h-7 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted"
            />
          </div>

          {/* results */}
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {results.length === 0 && <li className="px-3 py-4 text-center text-[13px] text-muted">No countries found</li>}
            {results.map((c) => {
              const active = c.code === value;
              return (
                <li key={c.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => select(c.code)}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left text-[14px] hover:bg-canvas ${
                      active ? "text-brand" : "text-ink"
                    }`}
                  >
                    <span className="text-[18px] leading-none">{c.flag}</span>
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-[13px] text-muted">{c.dial}</span>
                    {active && <Check size={15} className="shrink-0 text-brand" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
