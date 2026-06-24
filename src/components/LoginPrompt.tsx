import Link from "next/link";
import { LogIn, Lock } from "lucide-react";

/** Shown on gated pages (orders, addresses) when the visitor isn't logged in. */
export default function LoginPrompt({ next, message }: { next: string; message?: string }) {
  return (
    <div className="mx-auto flex max-w-[420px] flex-col items-center gap-4 px-4 py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-muted">
        <Lock size={30} strokeWidth={1.6} />
      </span>
      <div>
        <p className="text-[16px] font-bold text-ink">Please log in</p>
        <p className="mt-1 text-[13px] text-muted">{message ?? "Log in to view this page."}</p>
      </div>
      <div className="flex w-full gap-2">
        <Link
          href={`/login?next=${encodeURIComponent(next)}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] py-2.5 text-[14px] font-semibold text-white"
        >
          <LogIn size={16} /> Log in
        </Link>
        <Link
          href={`/register?next=${encodeURIComponent(next)}`}
          className="flex flex-1 items-center justify-center rounded-full border border-brand py-2.5 text-[14px] font-semibold text-brand"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
