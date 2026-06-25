"use client";

import { useRouter } from "next/navigation";
import { Star, ShoppingCart, Zap, ShieldCheck, Truck, Users, PackageX, Flame } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useCartUI } from "@/lib/cart-ui";
import { useProductBuy, lineFor } from "@/lib/product-buy";
import VariantPicker from "./VariantPicker";
import { money, soldLabel } from "@/lib/format";
import { type Product, productRating, productReviewCount, productStock, isLowStock } from "@/lib/products";

/** Smoothly scroll the reviews section into view. */
function scrollToReviews() {
  document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Right-side transaction panel (Sections 1 & 2). */
export default function ProductPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const { openCart } = useCartUI();
  const { qty, variants, variantLabel } = useProductBuy();
  const router = useRouter();

  const rating = productRating(product);
  const reviewCount = productReviewCount(product);
  const off = Math.round((1 - product.price / product.singlePrice) * 100);
  const stock = productStock(product);
  const soldOut = stock === 0;
  const lowStock = isLowStock(stock);

  function addToCart() {
    if (soldOut) return;
    add({ ...lineFor(product, variantLabel), price: product.price }, qty);
    openCart();
  }
  function buyNow() {
    if (soldOut) return;
    add({ ...lineFor(product, variantLabel), price: product.price }, qty);
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col gap-4">
      {/* title */}
      <h1 className="text-[20px] font-bold leading-snug text-ink lg:text-[26px]">{product.name}</h1>

      {/* review summary anchor */}
      <button type="button" onClick={scrollToReviews} className="flex w-fit items-center gap-2 text-[13px] lg:text-[14px]">
        <span className="inline-flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={16}
              className={i <= Math.round(rating) ? "fill-[#ffb400] text-[#ffb400]" : "fill-line text-line"}
            />
          ))}
        </span>
        <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
        <span className="text-brand underline-offset-2 hover:underline">({reviewCount.toLocaleString()} Reviews)</span>
        <span className="text-muted">· {soldLabel(product.sold)}</span>
      </button>

      {/* price */}
      <div className="flex items-baseline gap-3">
        <span className="font-display text-[34px] font-extrabold leading-none text-price lg:text-[40px]">
          {money(product.price)}
        </span>
        <span className="text-[16px] text-muted line-through">{money(product.singlePrice)}</span>
        <span className="rounded bg-pill px-2 py-0.5 text-[12px] font-semibold text-brand">-{off}%</span>
      </div>

      {/* tags */}
      <div className="flex flex-wrap gap-1.5">
        {product.tags.map((t) => (
          <span key={t} className="rounded-sm bg-pill px-2 py-0.5 text-[12px] text-brand lg:text-[13px]">
            {t}
          </span>
        ))}
      </div>

      {/* stock status */}
      {soldOut ? (
        <div className="flex items-center gap-2 rounded-lg bg-canvas px-3 py-2 text-[13px] font-semibold text-ink lg:text-[14px]">
          <PackageX size={16} className="text-muted" /> Out of stock — currently unavailable
        </div>
      ) : lowStock ? (
        <div className="flex items-center gap-2 text-[13px] font-semibold text-brand-orange lg:text-[14px]">
          <Flame size={16} /> Almost gone — only {stock} left in stock
        </div>
      ) : null}

      {/* variants */}
      {variants.length > 0 && (
        <div className="border-t border-line pt-4">
          <VariantPicker />
        </div>
      )}

      {/* dual CTAs (Section 2) */}
      {soldOut ? (
        <button
          type="button"
          disabled
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-line py-3 text-[15px] font-semibold text-muted"
        >
          <PackageX size={18} /> Sold Out
        </button>
      ) : (
        <div className="mt-1 flex gap-3">
          <button
            type="button"
            onClick={addToCart}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-brand bg-white py-3 text-[15px] font-semibold text-brand"
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>
          <button
            type="button"
            onClick={buyNow}
            className="flex flex-[1.3] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] py-3 text-[16px] font-bold text-white shadow-sm"
          >
            <Zap size={18} /> Buy Now
          </button>
        </div>
      )}

      {/* trust row */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted lg:text-[13px]">
        <span className="inline-flex items-center gap-1"><ShieldCheck size={14} className="text-brand" /> Buyer protection</span>
        <span className="inline-flex items-center gap-1"><Truck size={14} className="text-brand" /> Fast shipping</span>
        <span className="inline-flex items-center gap-1"><Users size={14} className="text-brand" /> 7-day returns</span>
      </div>
    </div>
  );
}
