"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

/**
 * Compact add-to-cart button used on product cards. Lives inside the card's
 * <Link>, so it stops the click from navigating and adds the item at the
 * group price. It does NOT open the cart drawer — the live count badges on the
 * header / bottom-nav cart icons are the feedback; the drawer opens only from
 * those cart buttons.
 */
export default function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <button
      type="button"
      aria-label={`Add ${product.name} to cart`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add({ id: product.id, name: product.name, image: product.image, price: product.price }, 1);
      }}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-[#fb5621] to-[#e8290b] text-white shadow-sm transition active:scale-90 active:brightness-95"
    >
      <ShoppingCart size={15} />
    </button>
  );
}
