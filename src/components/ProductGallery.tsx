"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const AUTOPLAY_MS = 4000;

/**
 * Product gallery (Section 1, left side):
 *  - Auto-slides through images (pauses on hover / interaction / popup open).
 *  - Manual sliding: prev/next arrows, thumbnails, mobile swipe.
 *  - Desktop main image cross-fades on change + hover-to-zoom.
 *  - Click opens a full-screen lightbox that slides (swipe / arrows / keys /
 *    thumbnails) and supports double-tap-to-zoom with drag-to-pan.
 */
export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const trackRef = useRef<HTMLDivElement>(null); // mobile inline strip
  const lightRef = useRef<HTMLDivElement>(null); // lightbox strip
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [hovering, setHovering] = useState(false);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // lightbox zoom + pan
  const [lzoom, setLzoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const lastTap = useRef(0);

  const count = images.length;

  function pause() {
    setPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 6000);
  }
  useEffect(() => () => { if (pauseTimer.current) clearTimeout(pauseTimer.current); }, []);

  /* autoplay */
  useEffect(() => {
    if (count <= 1 || hovering || paused || lightbox) return;
    const t = setInterval(() => setActive((a) => (a + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [count, hovering, paused, lightbox]);

  /* keep the mobile inline strip scrolled to the active image */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const target = active * el.clientWidth;
    if (Math.abs(el.scrollLeft - target) > 4) el.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

  /* reset lightbox zoom whenever the image or popup state changes */
  useEffect(() => {
    setLzoom(1);
    setPan({ x: 0, y: 0 });
  }, [active, lightbox]);

  /* lightbox: lock scroll, sync strip to active, keyboard nav */
  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      const el = lightRef.current;
      if (el) el.scrollLeft = active * el.clientWidth;
    });
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(false);
      else if (e.key === "ArrowRight") lightScroll(1);
      else if (e.key === "ArrowLeft") lightScroll(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  function goTo(i: number) {
    pause();
    setActive((i + count) % count);
  }

  function onInlineScroll() {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active) setActive(idx);
  }

  function onLightScroll() {
    if (lzoom > 1) return; // swiping disabled while zoomed
    const el = lightRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active) setActive(idx);
  }
  function lightScroll(dir: number) {
    const el = lightRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    const n = Math.min(Math.max(idx + dir, 0), count - 1);
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  }
  function lightGoTo(i: number) {
    const el = lightRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setActive(i);
  }

  /* double-tap / double-click to toggle zoom; drag to pan while zoomed */
  function onTapZoom() {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setLzoom((z) => (z > 1 ? 1 : 2.5));
      setPan({ x: 0, y: 0 });
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  }
  function onPanStart(e: React.PointerEvent) {
    if (lzoom <= 1) return;
    drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }
  function onPanMove(e: React.PointerEvent) {
    if (!drag.current || lzoom <= 1) return;
    setPan({ x: drag.current.px + (e.clientX - drag.current.x), y: drag.current.py + (e.clientY - drag.current.y) });
  }
  function onPanEnd() {
    drag.current = null;
  }

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <div className="lg:flex lg:w-[480px] lg:shrink-0 lg:gap-3">
      <style>{`@keyframes galFade{from{opacity:.35}to{opacity:1}}`}</style>

      {/* desktop thumbnail rail */}
      {count > 1 && (
        <div className="hidden flex-col gap-2 lg:flex">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => goTo(i)}
              onClick={() => goTo(i)}
              className={`h-16 w-16 overflow-hidden rounded-md border-2 ${i === active ? "border-brand" : "border-line"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${alt} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* desktop main image: cross-fade + hover-zoom + arrows + click to enlarge */}
      <div className="hidden flex-1 lg:block">
        <div
          onMouseEnter={() => { setZoom(true); setHovering(true); }}
          onMouseLeave={() => { setZoom(false); setHovering(false); }}
          onMouseMove={onMove}
          onClick={() => setLightbox(true)}
          className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-lg bg-line"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={active}
            src={images[active]}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-150 [animation:galFade_220ms_ease]"
            style={{ transform: zoom ? "scale(2)" : "scale(1)", transformOrigin: origin }}
          />

          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => { e.stopPropagation(); goTo(active - 1); }}
                className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/85 p-1.5 text-ink shadow group-hover:flex"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => { e.stopPropagation(); goTo(active + 1); }}
                className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/85 p-1.5 text-ink shadow group-hover:flex"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <span className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/45 px-2 py-0.5 text-[11px] text-white">
            <ZoomIn size={12} /> Click to enlarge
          </span>
        </div>
      </div>

      {/* mobile swipe strip */}
      <div className="lg:hidden">
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={onInlineScroll}
            onTouchStart={pause}
            className="flex aspect-square w-full snap-x snap-mandatory overflow-x-auto bg-line [&::-webkit-scrollbar]:hidden"
          >
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightbox(true)}
                className="aspect-square w-full shrink-0 snap-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${alt} — ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          {count > 1 && (
            <>
              <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[11px] text-white">
                {active + 1}/{count}
              </span>
              <div className="pointer-events-none absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? "w-4 bg-white" : "w-1.5 bg-white/60"}`} />
                ))}
              </div>
            </>
          )}
        </div>

        {count > 1 && (
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

      {/* ── lightbox popup ── */}
      {lightbox && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-black/90" role="dialog" aria-modal="true" aria-label="Image viewer">
          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="text-[13px]">
              {active + 1} / {count}
              {lzoom > 1 && <span className="ml-2 text-white/60">· {lzoom.toFixed(1)}×</span>}
            </span>
            <button type="button" onClick={() => setLightbox(false)} aria-label="Close" className="rounded-full p-1 hover:bg-white/15">
              <X size={24} />
            </button>
          </div>

          <div className="relative flex-1">
            <div
              ref={lightRef}
              onScroll={onLightScroll}
              className={`flex h-full w-full [&::-webkit-scrollbar]:hidden ${
                lzoom > 1 ? "overflow-hidden" : "snap-x snap-mandatory overflow-x-auto"
              }`}
            >
              {images.map((src, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={i}
                    className="flex h-full w-full shrink-0 snap-center items-center justify-center overflow-hidden p-4"
                    onPointerDown={isActive ? onPanStart : undefined}
                    onPointerMove={isActive ? onPanMove : undefined}
                    onPointerUp={isActive ? onPanEnd : undefined}
                    onPointerCancel={isActive ? onPanEnd : undefined}
                    onClick={isActive ? onTapZoom : undefined}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${alt} — ${i + 1}`}
                      draggable={false}
                      className="max-h-full max-w-full select-none object-contain transition-transform duration-150"
                      style={
                        isActive
                          ? {
                              transform: `translate(${pan.x}px, ${pan.y}px) scale(${lzoom})`,
                              cursor: lzoom > 1 ? "grab" : "zoom-in",
                              touchAction: lzoom > 1 ? "none" : "auto",
                            }
                          : undefined
                      }
                    />
                  </div>
                );
              })}
            </div>

            {count > 1 && lzoom === 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() => lightScroll(-1)}
                  className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/15 p-2 text-white hover:bg-white/25 sm:block"
                >
                  <ChevronLeft size={26} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() => lightScroll(1)}
                  className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/15 p-2 text-white hover:bg-white/25 sm:block"
                >
                  <ChevronRight size={26} />
                </button>
              </>
            )}

            <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-[11px] text-white">
              {lzoom > 1 ? "Drag to pan · double-tap to reset" : "Double-tap to zoom"}
            </span>
          </div>

          {count > 1 && (
            <div className="flex justify-center gap-2 px-4 py-4">
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => lightGoTo(i)}
                  className={`h-12 w-12 shrink-0 overflow-hidden rounded-md border-2 ${i === active ? "border-white" : "border-white/30"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${alt} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
