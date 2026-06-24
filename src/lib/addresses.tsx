"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface Address {
  id: string;
  name: string;
  phone: string;
  line: string;
  city: string;
  isDefault: boolean;
}

interface AddressCtx {
  addresses: Address[];
  defaultAddress: Address | null;
  add: (a: Omit<Address, "id" | "isDefault">) => void;
  remove: (id: string) => void;
  setDefault: (id: string) => void;
}

const Ctx = createContext<AddressCtx | null>(null);
const STORAGE_KEY = "yangkedu_addresses";

const SEED: Address[] = [
  {
    id: "seed",
    name: "Alex Carter",
    phone: "(555) 018-8888",
    line: "2500 Market Street, Suite 1001",
    city: "San Francisco, CA 94114",
    isDefault: true,
  },
];

let seq = 0;
const newId = () => `addr-${++seq}-${seq * 7 + 3}`;

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setAddresses(raw ? JSON.parse(raw) : SEED);
    } catch {
      setAddresses(SEED);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
    } catch {
      /* ignore */
    }
  }, [addresses, hydrated]);

  const api = useMemo<AddressCtx>(
    () => ({
      addresses,
      defaultAddress: addresses.find((a) => a.isDefault) ?? addresses[0] ?? null,
      add: (a) =>
        setAddresses((prev) => {
          const first = prev.length === 0;
          return [...prev, { ...a, id: newId(), isDefault: first }];
        }),
      remove: (id) =>
        setAddresses((prev) => {
          const next = prev.filter((a) => a.id !== id);
          // keep a default if we removed it
          if (next.length && !next.some((a) => a.isDefault)) next[0].isDefault = true;
          return next;
        }),
      setDefault: (id) =>
        setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id }))),
    }),
    [addresses],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAddresses(): AddressCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAddresses must be used within <AddressProvider>");
  return ctx;
}
