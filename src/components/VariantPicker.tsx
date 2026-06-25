"use client";

import { Minus, Plus, Check } from "lucide-react";
import { useProductBuy } from "@/lib/product-buy";

/** Named colors → swatch hex. Falls back to a neutral chip when unknown. */
const COLOR_HEX: Record<string, string> = {
  Black: "#222222",
  White: "#f3f3f3",
  Navy: "#1e2a4a",
  Beige: "#e3d4b8",
  Grey: "#9aa0a6",
  Blue: "#2f6fe0",
  Pink: "#f3a6c0",
  Green: "#3aa564",
};

/**
 * Variant selectors (Section 1): color as tappable swatch circles,
 * everything else (size, etc.) as box blocks — no dropdowns. Plus a qty stepper.
 */
export default function VariantPicker() {
  const { variants, selected, setOption, qty, setQty } = useProductBuy();

  return (
    <div className="space-y-4">
      {variants.map((v) => {
        const isColor = v.label.toLowerCase() === "color";
        return (
          <div key={v.label}>
            <p className="mb-2 text-[13px] text-muted lg:text-[14px]">
              {v.label}: <span className="font-medium text-ink">{selected[v.label]}</span>
            </p>

            {isColor ? (
              <div className="flex flex-wrap gap-2.5">
                {v.options.map((opt) => {
                  const active = selected[v.label] === opt;
                  const hex = COLOR_HEX[opt] ?? "#cccccc";
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setOption(v.label, opt)}
                      aria-label={opt}
                      aria-pressed={active}
                      title={opt}
                      className={`flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-offset-2 ${
                        active ? "ring-brand" : "ring-line"
                      }`}
                      style={{ backgroundColor: hex }}
                    >
                      {active && <Check size={16} className={opt === "White" || opt === "Beige" ? "text-ink" : "text-white"} />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {v.options.map((opt) => {
                  const active = selected[v.label] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setOption(v.label, opt)}
                      aria-pressed={active}
                      className={`min-w-[44px] rounded-md border px-3.5 py-2 text-[13px] font-medium lg:text-[14px] ${
                        active ? "border-brand bg-pill text-brand" : "border-line bg-white text-ink"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* quantity */}
      <div className="flex items-center gap-3">
        <span className="text-[13px] text-muted lg:text-[14px]">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQty(qty - 1)}
            aria-label="Decrease quantity"
            disabled={qty <= 1}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted disabled:opacity-40"
          >
            <Minus size={15} />
          </button>
          <span className="w-7 text-center text-[15px] text-ink">{qty}</span>
          <button
            type="button"
            onClick={() => setQty(qty + 1)}
            aria-label="Increase quantity"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
