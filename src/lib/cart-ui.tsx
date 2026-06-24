"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface CartUI {
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const Ctx = createContext<CartUI | null>(null);

/** Holds the open/close state for the global cart drawer. */
export function CartUIProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const api = useMemo<CartUI>(
    () => ({ open, openCart: () => setOpen(true), closeCart: () => setOpen(false) }),
    [open],
  );
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCartUI(): CartUI {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCartUI must be used within <CartUIProvider>");
  return ctx;
}
