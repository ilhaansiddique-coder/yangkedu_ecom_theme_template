"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart, Zap } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useCartUI } from "@/lib/cart-ui";
import { useProductBuy, lineFor } from "@/lib/product-buy";
import { money } from "@/lib/format";
import type { Product } from "@/lib/products";

/** Sticky mobile footer bar (price + Add to Cart + Buy Now), pinned while scrolling. */
export default function AddToCartBar({ product }: { product: Product }) {
  const { add } = useCart();
  const { openCart } = useCartUI();
  const { qty, variantLabel } = useProductBuy();
  const router = useRouter();

  function addToCart() {
    add({ ...lineFor(product, variantLabel), price: product.price }, qty);
    openCart();
  }
  function buyNow() {
    add({ ...lineFor(product, variantLabel), price: product.price }, qty);
    router.push("/checkout");
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[480px] items-center gap-2 border-t border-line bg-white px-3 py-2 pb-[calc(8px+var(--safe-bottom))] lg:hidden">
      <div className="shrink-0 pr-1">
        <span className="block font-display text-[18px] font-extrabold leading-none text-price">{money(product.price)}</span>
        <span className="block text-[11px] text-muted line-through">{money(product.singlePrice)}</span>
      </div>
      <button
        type="button"
        onClick={addToCart}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-brand py-2.5 text-[14px] font-semibold text-brand"
      >
        <ShoppingCart size={16} /> Add to Cart
      </button>
      <button
        type="button"
        onClick={buyNow}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] py-2.5 text-[14px] font-bold text-white"
      >
        <Zap size={16} /> Buy Now
      </button>
    </div>
  );
}
