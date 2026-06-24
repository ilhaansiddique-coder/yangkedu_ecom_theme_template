"use client";

import { useRef, useState } from "react";

/**
 * Product gallery (Section 1, left side):
 *  - Mobile: swipeable scroll-snap strip with dots + counter.
 *  - Desktop: large main image with hover-to-zoom + a thumbnail rail.
 */
export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active) setActive(idx);
  }

  function goTo(i: number) {
    setActive(i);
    const el = trackRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  return (
    <div className="lg:flex lg:w-[480px] lg:shrink-0 lg:gap-3">
      {/* desktop thumbnail rail (vertical) */}
      {images.length > 1 && (
        <div className="hidden flex-col gap-2 lg:flex">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`h-16 w-16 overflow-hidden rounded-md border-2 ${i === active ? "border-brand" : "border-line"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${alt} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* desktop main image with hover-zoom */}
      <div className="hidden flex-1 lg:block">
        <div
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={onMove}
          className="relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-lg bg-line"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[active]}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-150"
            style={{ transform: zoom ? "scale(2)" : "scale(1)", transformOrigin: origin }}
          />
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/45 px-2 py-0.5 text-[11px] text-white">
            Hover to zoom
          </span>
        </div>
      </div>

      {/* mobile swipe strip */}
      <div className="lg:hidden">
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex aspect-square w-full snap-x snap-mandatory overflow-x-auto bg-line [&::-webkit-scrollbar]:hidden"
          >
            {images.map((src, i) => (
              <div key={i} className="aspect-square w-full shrink-0 snap-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${alt} — ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          {images.length > 1 && (
            <>
              <span className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[11px] text-white">
                {active + 1}/{images.length}
              </span>
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Image ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all ${i === active ? "w-4 bg-white" : "w-1.5 bg-white/60"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* mobile thumbnail strip */}
        {images.length > 1 && (
          <div className="mt-2 flex gap-2 overflow-x-auto px-1 [&::-webkit-scrollbar]:hidden">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-14 w-14 shrink-0 overflow-hidden rounded-md border-2 ${i === active ? "border-brand" : "border-line"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${alt} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
