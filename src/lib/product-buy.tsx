"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Variant } from "./products";

interface ProductBuyCtx {
  variants: Variant[];
  selected: Record<string, string>;
  setOption: (label: string, option: string) => void;
  qty: number;
  setQty: (n: number) => void;
  variantLabel: string; // e.g. "Black / L" — "" when no variants
}

const Ctx = createContext<ProductBuyCtx | null>(null);

/** Per-product-page provider holding the chosen variant options + quantity. */
export function ProductBuyProvider({ variants, children }: { variants: Variant[]; children: ReactNode }) {
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(variants.map((v) => [v.label, v.options[0]])),
  );
  const [qty, setQty] = useState(1);

  const api = useMemo<ProductBuyCtx>(() => {
    const variantLabel = variants.map((v) => selected[v.label]).filter(Boolean).join(" / ");
    return {
      variants,
      selected,
      setOption: (label, option) => setSelected((prev) => ({ ...prev, [label]: option })),
      qty,
      setQty: (n) => setQty(Math.max(1, Math.min(99, n))),
      variantLabel,
    };
  }, [variants, selected, qty]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useProductBuy(): ProductBuyCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProductBuy must be used within <ProductBuyProvider>");
  return ctx;
}
