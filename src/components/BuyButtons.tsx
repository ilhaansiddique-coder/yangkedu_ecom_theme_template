"use client";

import { useCart } from "@/lib/cart";
import { useCartUI } from "@/lib/cart-ui";
import { useProductBuy } from "@/lib/product-buy";
import { money } from "@/lib/format";
import type { Product } from "@/lib/products";

/** Inline buy buttons used in the desktop product layout's info column. */
export default function BuyButtons({ product }: { product: Product }) {
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
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => buy(product.singlePrice)}
        className="flex flex-col items-center rounded-lg border-2 border-brand-orange px-8 py-2.5 text-brand-orange"
      >
        <span className="text-[18px] font-bold leading-none">{money(product.singlePrice)}</span>
        <span className="text-[12px]">Buy alone</span>
      </button>
      <button
        type="button"
        onClick={() => buy(product.price)}
        className="flex flex-col items-center rounded-lg bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-10 py-2.5 text-white"
      >
        <span className="text-[18px] font-bold leading-none">{money(product.price)}</span>
        <span className="text-[12px]">Start group buy</span>
      </button>
    </div>
  );
}
