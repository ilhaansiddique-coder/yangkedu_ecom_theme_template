"use client";

import { useMemo, useRef, useState } from "react";
import { Star, X, ImagePlus, BadgeCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";
import {
  type Product,
  type Review,
  productRating,
  productReviewCount,
  ratingDistribution,
  sampleReviews,
} from "@/lib/products";

function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= value ? "fill-[#ffb400] text-[#ffb400]" : "fill-line text-line"} />
      ))}
    </span>
  );
}

type Filter = "recent" | "top" | "images";

export default function ProductReviews({ product }: { product: Product }) {
  const { user } = useAuth();
  const rating = productRating(product);
  const baseCount = productReviewCount(product);
  const dist = ratingDistribution(product);
  const maxCount = Math.max(...dist.map((d) => d.count), 1);

  const [reviews, setReviews] = useState<Review[]>(() => sampleReviews(product));
  const [filter, setFilter] = useState<Filter>("recent");
  const [open, setOpen] = useState(false);

  const shown = useMemo(() => {
    const list = [...reviews];
    if (filter === "top") list.sort((a, b) => b.rating - a.rating);
    if (filter === "images") return list.filter((r) => r.images.length > 0);
    return list;
  }, [reviews, filter]);

  function addReview(r: Review) {
    setReviews((prev) => [r, ...prev]);
  }

  return (
    <div id="reviews" className="scroll-mt-16 bg-white px-4 py-5 lg:rounded-lg lg:px-6">
      <h2 className="text-[16px] font-bold text-ink lg:text-[20px]">Ratings &amp; Reviews</h2>

      {/* ── Tier A: scoreboard ── */}
      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-canvas px-6 py-4 text-center sm:w-44">
          <span className="font-display text-[44px] font-extrabold leading-none text-ink">{rating.toFixed(1)}</span>
          <div className="mt-1">
            <Stars value={Math.round(rating)} size={16} />
          </div>
          <span className="mt-1 text-[12px] text-muted">{baseCount.toLocaleString()} reviews</span>
        </div>

        <div className="flex-1">
          {dist.map((d) => (
            <div key={d.star} className="flex items-center gap-2 py-0.5">
              <span className="flex w-7 items-center gap-0.5 text-[12px] text-muted">{d.star}★</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-line">
                <span className="block h-full rounded-full bg-[#ffb400]" style={{ width: `${(d.count / maxCount) * 100}%` }} />
              </span>
              <span className="w-10 text-right text-[12px] text-muted">{d.count}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-5 py-2.5 text-[14px] font-semibold text-white"
        >
          Write a Review
        </button>
      </div>

      {/* ── Tier C: filters + feed ── */}
      <div className="mt-5 flex gap-2 border-t border-line pt-4">
        {([
          ["recent", "Most Recent"],
          ["top", "Highest Rated"],
          ["images", "With Images"],
        ] as [Filter, string][]).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium ${
              filter === id ? "bg-brand text-white" : "bg-canvas text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-2 divide-y divide-line">
        {shown.length === 0 && <p className="py-8 text-center text-[13px] text-muted">No reviews with photos yet.</p>}
        {shown.map((r, i) => (
          <div key={i} className="py-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pill text-[13px] font-bold text-brand">
                  {r.author.charAt(0)}
                </span>
                <span>
                  <span className="block text-[13px] font-medium text-ink">{r.author}</span>
                  {r.verified && (
                    <span className="flex items-center gap-1 text-[11px] text-[#1f9d55]">
                      <BadgeCheck size={12} /> Verified purchase
                    </span>
                  )}
                </span>
              </span>
              <span className="text-[11px] text-muted">{r.date}</span>
            </div>
            <div className="mt-2">
              <Stars value={r.rating} />
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted lg:text-[14px]">{r.text}</p>
            {r.images.length > 0 && (
              <div className="mt-2 flex gap-2">
                {r.images.map((src, k) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={k} src={src} alt="" className="h-16 w-16 rounded-md object-cover" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {open && <ReviewModal authorName={user?.name ?? "You"} onClose={() => setOpen(false)} onSubmit={addReview} />}
    </div>
  );
}

/* ── Tier B: write-a-review modal ── */
function ReviewModal({
  authorName,
  onClose,
  onSubmit,
}: {
  authorName: string;
  onClose: () => void;
  onSubmit: (r: Review) => void;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [files, setFiles] = useState<{ url: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ url: URL.createObjectURL(f) }));
    setFiles((prev) => [...prev, ...next].slice(0, 6));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit({
      author: authorName,
      rating,
      date: "Just now",
      text: text.trim() || "No comment provided.",
      verified: true,
      images: files.map((f) => f.url),
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] rounded-t-2xl bg-white p-5 sm:rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-ink">Write a Review</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="text-muted hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="mt-4 space-y-4">
          {/* star selector */}
          <div>
            <p className="mb-1.5 text-[13px] text-muted">Your rating</p>
            <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setHover(i)}
                  onClick={() => setRating(i)}
                  aria-label={`${i} star`}
                >
                  <Star
                    size={30}
                    className={i <= (hover || rating) ? "fill-[#ffb400] text-[#ffb400]" : "fill-line text-line"}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* text */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="What did you like or dislike?"
            className="w-full rounded-lg border border-line px-3 py-2.5 text-[14px] text-ink outline-none focus:border-brand"
          />

          {/* upload dropzone */}
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              addFiles(e.dataTransfer.files);
            }}
            className="cursor-pointer rounded-lg border-2 border-dashed border-line px-4 py-5 text-center"
          >
            <ImagePlus size={22} className="mx-auto text-muted" />
            <p className="mt-1 text-[12px] text-muted">Drag &amp; drop photos/videos, or tap to upload</p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>

          {files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {files.map((f, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={f.url} alt="" className="h-14 w-14 rounded-md object-cover" />
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={rating === 0}
            className="w-full rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] py-2.5 text-[15px] font-semibold text-white disabled:opacity-50"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
