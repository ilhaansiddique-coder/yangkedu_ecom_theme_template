"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { Check, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";
interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const Ctx = createContext<((message: string, type?: ToastType) => void) | null>(null);
let counter = 0;

/** Lightweight global toast notifications, themed to the storefront. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: ToastType = "success") => {
    const id = ++counter;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  return (
    <Ctx.Provider value={show}>
      {children}

      <div className="pointer-events-none fixed inset-x-0 top-3 z-[100] flex flex-col items-center gap-2 px-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex max-w-[90vw] items-center gap-2 rounded-full bg-ink/90 px-4 py-2 text-[13px] font-medium text-white shadow-lg backdrop-blur lg:text-[14px] [animation:toastIn_.2s_ease]"
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                t.type === "error" ? "bg-brand" : t.type === "info" ? "bg-brand-orange" : "bg-[#1f9d55]"
              }`}
            >
              {t.type === "error" ? (
                <X size={11} strokeWidth={3} />
              ) : t.type === "info" ? (
                <Info size={11} />
              ) : (
                <Check size={11} strokeWidth={3} />
              )}
            </span>
            {t.message}
          </div>
        ))}
      </div>

      <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}`}</style>
    </Ctx.Provider>
  );
}

export function useToast() {
  const show = useContext(Ctx);
  if (!show) throw new Error("useToast must be used within <ToastProvider>");
  return show;
}
