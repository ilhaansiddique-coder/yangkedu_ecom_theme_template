"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCw, TriangleAlert } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // surface the error for debugging; wire to a logging service in production
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#fb5621] to-[#e8290b] text-white shadow-md">
        <TriangleAlert size={46} strokeWidth={1.7} />
      </span>

      <h1 className="mt-6 font-display text-[24px] font-extrabold text-ink lg:text-[30px]">Something went wrong</h1>
      <p className="mt-1 max-w-md text-[13px] text-muted lg:text-[15px]">
        An unexpected error occurred while loading this page. You can try again, or head back to the home page.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-6 py-2.5 text-[14px] font-semibold text-white"
        >
          <RotateCw size={16} /> Try again
        </button>
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-full border border-brand px-6 py-2.5 text-[14px] font-semibold text-brand hover:bg-pill"
        >
          <Home size={16} /> Back home
        </Link>
      </div>
    </div>
  );
}
