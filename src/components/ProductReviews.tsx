import { Star } from "lucide-react";
import { type Product, productRating, productReviewCount, sampleReviews } from "@/lib/products";

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? "fill-[#ffb400] text-[#ffb400]" : "fill-line text-line"}
        />
      ))}
    </span>
  );
}

export default function ProductReviews({ product }: { product: Product }) {
  const rating = productRating(product);
  const count = productReviewCount(product);
  const reviews = sampleReviews(product);

  return (
    <div className="mt-2 bg-white px-4 py-4 lg:mt-4 lg:rounded-lg lg:px-6 lg:py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] font-semibold text-ink lg:text-[18px]">Ratings &amp; Reviews</h2>
        <span className="text-[12px] text-muted">{count.toLocaleString()} reviews</span>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <span className="font-display text-[32px] font-extrabold leading-none text-ink">{rating.toFixed(1)}</span>
        <div>
          <Stars rating={rating} size={16} />
          <p className="mt-0.5 text-[11px] text-muted">Based on verified group-buy orders</p>
        </div>
      </div>

      <div className="mt-4 divide-y divide-line">
        {reviews.map((r, i) => (
          <div key={i} className="py-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pill text-[12px] font-bold text-brand">
                  {r.author.charAt(0)}
                </span>
                {r.author}
              </span>
              <span className="text-[11px] text-muted">{r.date}</span>
            </div>
            <div className="mt-1.5">
              <Stars rating={r.rating} />
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
