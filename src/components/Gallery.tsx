"use client";

import { useRef, useState } from "react";

/**
 * Swipeable product gallery: horizontal scroll-snap strip with a page counter,
 * dot indicators, and (on desktop) a clickable thumbnail rail.
 */
export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active) setActive(idx);
  }

  function goTo(i: number) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setActive(i);
  }

  return (
    <div className="lg:w-[460px] lg:shrink-0">
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex aspect-square w-full snap-x snap-mandatory overflow-x-auto bg-line lg:rounded-lg [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => (
            <div key={i} className="aspect-square w-full shrink-0 snap-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${alt} — ${i + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        {/* counter pill */}
        {images.length > 1 && (
          <span className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[11px] text-white lg:hidden">
            {active + 1}/{images.length}
          </span>
        )}

        {/* dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden">
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
        )}
      </div>

      {/* desktop thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 hidden gap-2 lg:flex">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={`h-16 w-16 overflow-hidden rounded-md border-2 ${i === active ? "border-brand" : "border-transparent"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${alt} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
