"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, X, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useCartUI } from "@/lib/cart-ui";
import { money } from "@/lib/format";
import { getProduct } from "@/lib/products";

/**
 * Global cart drawer — slides in from the right on both desktop and mobile.
 * Themed to the storefront (red/orange), with item rows, quantity steppers,
 * a savings callout, and a sticky checkout footer.
 */
export default function CartDrawer() {
  const { lines, total, count, setQty, remove } = useCart();
  const { open, closeCart } = useCartUI();
  const router = useRouter();

  // background scroll lock + Escape to close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeCart]);

  const savings = lines.reduce((s, l) => {
    const original = getProduct(l.id)?.singlePrice ?? l.price;
    return s + Math.max(0, original - l.price) * l.qty;
  }, 0);

  function goCheckout() {
    closeCart();
    router.push("/checkout");
  }

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close cart"
        tabIndex={open ? 0 : -1}
        onClick={closeCart}
        className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute bottom-3 right-3 top-3 flex w-[88%] max-w-[420px] flex-col overflow-hidden rounded-2xl bg-canvas shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-[calc(100%_+_0.75rem)]"
        }`}
      >
        {/* header */}
        <header className="flex items-center justify-between bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-4 py-3.5 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="text-[16px] font-bold">My Cart</h2>
            {count > 0 && <span className="rounded-full bg-white/25 px-2 py-0.5 text-[12px] font-semibold">{count}</span>}
          </div>
          <button type="button" onClick={closeCart} aria-label="Close" className="rounded-full p-1 hover:bg-white/20">
            <X size={20} />
          </button>
        </header>

        {lines.length === 0 ? (
          /* empty state */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-pill">
              <ShoppingBag size={36} strokeWidth={1.5} className="text-brand" />
            </span>
            <div>
              <p className="text-[15px] font-semibold text-ink">Your cart is empty</p>
              <p className="mt-1 text-[13px] text-muted">Find a great group-buy deal to get started.</p>
            </div>
            <Link
              href="/"
              onClick={closeCart}
              className="rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-8 py-2.5 text-[14px] font-semibold text-white"
            >
              Browse deals
            </Link>
          </div>
        ) : (
          <>
            {/* savings callout */}
            {savings > 0 && (
              <div className="flex items-center gap-1.5 bg-pill px-4 py-2 text-[12px] text-brand">
                <ShieldCheck size={14} />
                You&apos;re saving <span className="font-bold">{money(savings)}</span> with group prices
              </div>
            )}

            {/* items */}
            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {lines.map((l) => (
                <div key={l.id} className="flex gap-3 rounded-xl bg-white p-2.5 shadow-sm">
                  <Link
                    href={`/product/${l.id.split("::")[0]}`}
                    onClick={closeCart}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-line"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.image} alt={l.name} className="h-full w-full object-cover" />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start gap-2">
                      <Link
                        href={`/product/${l.id.split("::")[0]}`}
                        onClick={closeCart}
                        className="line-clamp-2 flex-1 text-[13px] leading-snug text-ink"
                      >
                        {l.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(l.id)}
                        aria-label="Remove item"
                        className="shrink-0 text-muted hover:text-brand"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-1">
                      <span className="font-display text-[17px] font-bold text-price">{money(l.price)}</span>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setQty(l.id, l.qty - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-line text-muted active:bg-line"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-5 text-center text-[13px] font-medium">{l.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(l.id, l.qty + 1)}
                          aria-label="Increase quantity"
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] text-white"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* footer */}
            <footer className="border-t border-line bg-white px-4 pb-[calc(12px+var(--safe-bottom))] pt-3">
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <p className="text-[12px] text-muted">Total ({count} item{count > 1 ? "s" : ""})</p>
                  <p className="font-display text-[24px] font-extrabold leading-tight text-price">{money(total)}</p>
                </div>
                <Link href="/cart" onClick={closeCart} className="pb-1 text-[12px] text-muted underline-offset-2 hover:text-brand hover:underline">
                  View full cart
                </Link>
              </div>
              <button
                type="button"
                onClick={goCheckout}
                className="w-full rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] py-3 text-[15px] font-bold text-white shadow-md shadow-brand/20 active:brightness-95"
              >
                Checkout · {money(total)}
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
