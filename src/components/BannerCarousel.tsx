"use client";

import { useEffect, useState } from "react";
import { banners } from "@/lib/products";

export default function BannerCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % banners.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="px-3 pt-3 lg:px-0">
      <div className="relative h-32 w-full overflow-hidden rounded-xl lg:h-72">
        {banners.map((b, idx) => (
          <div
            key={b.id}
            className="absolute inset-0 flex flex-col justify-center px-5 text-white transition-opacity duration-500 lg:px-16"
            style={{
              opacity: idx === i ? 1 : 0,
              backgroundImage: `linear-gradient(120deg, ${b.from}, ${b.to})`,
            }}
          >
            <span className="font-display text-2xl font-extrabold drop-shadow lg:text-5xl">{b.title}</span>
            <span className="mt-1 text-sm opacity-90 lg:mt-3 lg:text-xl">{b.subtitle}</span>
          </div>
        ))}
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {banners.map((b, idx) => (
            <span
              key={b.id}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
