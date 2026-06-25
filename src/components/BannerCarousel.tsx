"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { banners } from "@/lib/products";

export default function BannerCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % banners.length), 3500);
    return () => clearInterval(t);
  }, []);

  const go = (dir: number) => setI((v) => (v + dir + banners.length) % banners.length);

  return (
    <div className="px-3 pt-3 lg:px-0">
      <div className="relative h-32 w-full overflow-hidden rounded-xl lg:h-72">
        {banners.map((b, idx) => (
          <Link
            key={b.id}
            href={b.href}
            aria-label={b.title}
            tabIndex={idx === i ? 0 : -1}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: idx === i ? 1 : 0, pointerEvents: idx === i ? "auto" : "none" }}
          >
            {/* exclusive banner artwork — mobile crop on small screens, wide on desktop */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.imageMobile} alt={b.title} className="absolute inset-0 h-full w-full object-cover lg:hidden" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.image} alt={b.title} className="absolute inset-0 hidden h-full w-full object-cover lg:block" />
            {/* left-darkening overlay keeps the text legible while the artwork shows through */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
            <div className="relative flex h-full flex-col justify-center px-5 text-white lg:px-16">
              <span className="font-display text-2xl font-extrabold drop-shadow lg:text-5xl">{b.title}</span>
              <span className="mt-1 text-sm opacity-95 drop-shadow lg:mt-3 lg:text-xl">{b.subtitle}</span>
              <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-[12px] font-semibold text-brand lg:mt-4 lg:px-4 lg:py-1.5 lg:text-[14px]">
                Shop now <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}

        {/* centered circular prev / next arrows */}
        {banners.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous banner"
              onClick={() => go(-1)}
              className="absolute left-1 top-1/2 z-20 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white/90 transition hover:bg-black/20 lg:left-4 lg:h-10 lg:w-10 lg:bg-white/80 lg:text-ink lg:shadow-md lg:backdrop-blur-sm lg:hover:bg-white"
            >
              <ChevronLeft size={18} className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] lg:drop-shadow-none" />
            </button>
            <button
              type="button"
              aria-label="Next banner"
              onClick={() => go(1)}
              className="absolute right-1 top-1/2 z-20 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white/90 transition hover:bg-black/20 lg:right-4 lg:h-10 lg:w-10 lg:bg-white/80 lg:text-ink lg:shadow-md lg:backdrop-blur-sm lg:hover:bg-white"
            >
              <ChevronRight size={18} className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)] lg:drop-shadow-none" />
            </button>
          </>
        )}

        {/* dots */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {banners.map((b, idx) => (
            <span
              key={b.id}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
