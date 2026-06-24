"use client";

import { useCart } from "@/lib/cart";
import { useCartUI } from "@/lib/cart-ui";
import { useProductBuy } from "@/lib/product-buy";
import { money } from "@/lib/format";
import type { Product } from "@/lib/products";

/** Fixed bottom action bar on the product page (mobile only). */
export default function AddToCartBar({ product }: { product: Product }) {
  const { add } = useCart();
  const { openCart } = useCartUI();
  const { qty, variantLabel } = useProductBuy();

  const suffix = variantLabel ? ` (${variantLabel})` : "";
  const id = product.id + (variantLabel ? `::${variantLabel}` : "");
  const base = { id, name: product.name + suffix, image: product.image };

  function buy(price: number) {
    add({ ...base, price }, qty);
    openCart();
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[480px] items-center gap-2 border-t border-line bg-white p-2 pb-[calc(8px+var(--safe-bottom))] lg:hidden">
      <button
        type="button"
        onClick={() => buy(product.singlePrice)}
        className="flex flex-1 flex-col items-center rounded-l-full bg-brand-orange py-2 text-white"
      >
        <span className="text-[15px] font-bold leading-none">{money(product.singlePrice)}</span>
        <span className="text-[11px] leading-tight">Buy alone</span>
      </button>
      <button
        type="button"
        onClick={() => buy(product.price)}
        className="flex flex-1 flex-col items-center rounded-r-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] py-2 text-white"
      >
        <span className="text-[15px] font-bold leading-none">{money(product.price)}</span>
        <span className="text-[11px] leading-tight">Start group buy</span>
      </button>
    </div>
  );
}
