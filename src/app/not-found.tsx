import Link from "next/link";
import { Home, Search, PackageSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#fb5621] to-[#e8290b] text-white shadow-md">
        <PackageSearch size={48} strokeWidth={1.6} />
      </span>

      <h1 className="mt-6 font-display text-[44px] font-extrabold leading-none text-price lg:text-[64px]">404</h1>
      <p className="mt-2 text-[16px] font-semibold text-ink lg:text-[18px]">This page wandered off</p>
      <p className="mt-1 max-w-md text-[13px] text-muted lg:text-[15px]">
        The page or product you&apos;re looking for doesn&apos;t exist or may have sold out. Let&apos;s get you back to the deals.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-6 py-2.5 text-[14px] font-semibold text-white"
        >
          <Home size={16} /> Back home
        </Link>
        <Link
          href="/search"
          className="flex items-center gap-1.5 rounded-full border border-brand px-6 py-2.5 text-[14px] font-semibold text-brand hover:bg-pill"
        >
          <Search size={16} /> Search products
        </Link>
      </div>
    </div>
  );
}
