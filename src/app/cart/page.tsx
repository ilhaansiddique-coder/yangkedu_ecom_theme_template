"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";

export default function CartPage() {
  const { lines, total, count, setQty, remove } = useCart();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-canvas lg:min-h-0 lg:bg-transparent">
      <header className="sticky top-0 z-30 flex h-11 items-center justify-center border-b border-line bg-white lg:hidden">
        <h1 className="text-[15px] font-semibold">Cart{count > 0 ? ` (${count})` : ""}</h1>
      </header>

      <h1 className="hidden pb-3 text-[22px] font-bold text-ink lg:block">Shopping Cart</h1>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
          <ShoppingCart size={56} strokeWidth={1.4} className="text-line" />
          <p className="text-[14px] text-muted">Your cart is empty</p>
          <Link href="/" className="rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-6 py-2 text-[13px] font-semibold text-white">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="lg:flex lg:items-start lg:gap-4">
          {/* items */}
          <div className="flex-1 space-y-2 p-2 pb-28 lg:p-0 lg:pb-0">
            {lines.map((l) => (
              <div key={l.id} className="flex gap-3 rounded-[10px] bg-white p-2 lg:p-3">
                <Link href={`/product/${l.id.split("::")[0]}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-line lg:h-24 lg:w-24">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.image} alt={l.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="line-clamp-2 text-[13px] leading-snug text-ink lg:text-[15px]">{l.name}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-display text-[16px] font-bold text-price">{money(l.price)}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQty(l.id, l.qty - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded border border-line text-[16px] leading-none text-muted"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-[13px]">{l.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(l.id, l.qty + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded border border-line text-[16px] leading-none text-muted"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button type="button" onClick={() => remove(l.id)} className="self-start text-[12px] text-muted hover:text-brand">
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* desktop summary sidebar */}
          <aside className="hidden w-[320px] shrink-0 rounded-[10px] bg-white p-4 lg:block">
            <h3 className="mb-3 text-[16px] font-semibold text-ink">Order Summary</h3>
            <div className="flex justify-between py-1 text-[14px] text-muted">
              <span>Items ({count})</span>
              <span>{money(total)}</span>
            </div>
            <div className="flex justify-between py-1 text-[14px] text-muted">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between border-t border-line pt-3">
              <span className="text-[14px] text-ink">Total</span>
              <span className="font-display text-[22px] font-bold text-price">{money(total)}</span>
            </div>
            <button
              type="button"
              onClick={() => router.push("/checkout")}
              className="mt-4 w-full rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] py-2.5 text-[15px] font-semibold text-white"
            >
              Checkout
            </button>
          </aside>

          {/* mobile checkout bar */}
          <div className="fixed inset-x-0 bottom-[56px] z-30 mx-auto flex max-w-[480px] items-center justify-between border-t border-line bg-white px-4 py-2.5 lg:hidden">
            <span className="text-[13px] text-ink">
              Total <span className="font-display text-[18px] font-bold text-price">{money(total)}</span>
            </span>
            <button
              type="button"
              onClick={() => router.push("/checkout")}
              className="rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-8 py-2 text-[14px] font-semibold text-white"
            >
              Checkout ({count})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
