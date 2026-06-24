"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "./cart";

export type OrderStatus = "Group forming" | "Shipped" | "Delivered";

export interface Order {
  id: string;
  createdAt: number; // epoch ms
  items: CartLine[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  payment: string;
  couponCode?: string;
  address: string;
  status: OrderStatus;
}

interface OrdersCtx {
  orders: Order[]; // newest first
  addOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
}

const Ctx = createContext<OrdersCtx | null>(null);
const STORAGE_KEY = "yangkedu_orders";

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      /* ignore */
    }
  }, [orders, hydrated]);

  const api = useMemo<OrdersCtx>(
    () => ({
      orders,
      addOrder: (order) => setOrders((prev) => [order, ...prev]),
      getOrder: (id) => orders.find((o) => o.id === id),
    }),
    [orders],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useOrders(): OrdersCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOrders must be used within <OrdersProvider>");
  return ctx;
}
