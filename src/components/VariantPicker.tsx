"use client";

import { Minus, Plus } from "lucide-react";
import { useProductBuy } from "@/lib/product-buy";

/** Variant option chips + quantity stepper. Shares state via ProductBuyProvider. */
export default function VariantPicker() {
  const { variants, selected, setOption, qty, setQty } = useProductBuy();

  return (
    <div className="space-y-3">
      {variants.map((v) => (
        <div key={v.label}>
          <p className="mb-1.5 text-[12px] text-muted">
            {v.label}: <span className="text-ink">{selected[v.label]}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {v.options.map((opt) => {
              const active = selected[v.label] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setOption(v.label, opt)}
                  className={`rounded-md border px-3 py-1.5 text-[13px] ${
                    active ? "border-brand bg-pill text-brand" : "border-line bg-white text-ink"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-3">
        <span className="text-[12px] text-muted">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQty(qty - 1)}
            aria-label="Decrease quantity"
            className="flex h-7 w-7 items-center justify-center rounded border border-line text-muted disabled:opacity-40"
            disabled={qty <= 1}
          >
            <Minus size={14} />
          </button>
          <span className="w-6 text-center text-[14px] text-ink">{qty}</span>
          <button
            type="button"
            onClick={() => setQty(qty + 1)}
            aria-label="Increase quantity"
            className="flex h-7 w-7 items-center justify-center rounded border border-line text-muted"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
