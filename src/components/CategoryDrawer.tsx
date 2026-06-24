"use client";

import { useEffect, useState } from "react";
import { Menu, ChevronDown, X } from "lucide-react";
import CategoryRail from "./CategoryRail";
import { categoryName } from "@/lib/products";

/**
 * Mobile-only off-canvas category drawer. A toolbar button (showing the active
 * category) opens a left-sliding panel with a dimmed backdrop. Closes on
 * selection, backdrop tap, the X button, or Escape; locks background scroll
 * while open. Desktop uses the docked rail instead.
 */
export default function CategoryDrawer({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  // lock background scroll + close on Escape while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* trigger toolbar */}
      <div className="sticky top-[56px] z-20 flex items-center border-b border-line bg-white px-3 py-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-haspopup="dialog"
          className="flex items-center gap-1.5 rounded-full bg-canvas px-3 py-1.5 text-[13px] font-medium text-ink"
        >
          <Menu size={16} />
          {categoryName(active)}
          <ChevronDown size={14} className="text-muted" />
        </button>
      </div>

      {/* drawer overlay (constrained to the mobile frame width) */}
      <div
        className={`fixed inset-0 z-50 mx-auto max-w-[480px] ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close categories"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="All categories"
          className={`absolute inset-y-0 left-0 flex w-[76%] max-w-[300px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="text-[15px] font-semibold text-ink">All Categories</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-muted">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pb-[var(--safe-bottom)]">
            <CategoryRail active={active} onSelect={() => setOpen(false)} />
          </div>
        </aside>
      </div>
    </div>
  );
}
