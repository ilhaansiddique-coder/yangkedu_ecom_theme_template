"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-30 flex h-11 items-center border-b border-line bg-white px-2 lg:hidden">
      <button type="button" onClick={() => router.back()} aria-label="Back" className="flex w-10 justify-center">
        <ChevronLeft size={24} />
      </button>
      <h1 className="flex-1 truncate text-center text-[15px] font-semibold">{title}</h1>
      <span className="w-10" />
    </header>
  );
}
