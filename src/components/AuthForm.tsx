"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/auth";

function AuthInner({ mode }: { mode: "login" | "register" }) {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/me";
  const [email, setEmail] = useState("");

  const isLogin = mode === "login";

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    login(value); // demo: any credentials succeed
    router.push(next);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-[420px] flex-col justify-center px-4 py-8">
      <div className="rounded-2xl bg-white p-6 shadow-sm lg:p-8">
        <div className="mb-6 text-center">
          <span className="font-display text-[26px] font-extrabold text-brand">Yangkedu</span>
          <p className="mt-1 text-[13px] text-muted">
            {isLogin ? "Welcome back — log in to continue" : "Create an account to start saving"}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-3">
          {!isLogin && (
            <input
              required
              placeholder="Full name"
              className="h-11 w-full rounded-lg border border-line bg-white px-3 text-[14px] text-ink outline-none focus:border-brand"
            />
          )}
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="h-11 w-full rounded-lg border border-line bg-white px-3 text-[14px] text-ink outline-none focus:border-brand"
          />
          <input
            required
            type="password"
            placeholder="Password"
            className="h-11 w-full rounded-lg border border-line bg-white px-3 text-[14px] text-ink outline-none focus:border-brand"
          />

          {isLogin && (
            <div className="flex justify-end">
              <span className="cursor-pointer text-[12px] text-muted hover:text-brand">Forgot password?</span>
            </div>
          )}

          <button
            type="submit"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#fb5621] to-[#e8290b] text-[15px] font-semibold text-white"
          >
            {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
            {isLogin ? "Log in" : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-[13px] text-muted">
          {isLogin ? (
            <>
              New to Yangkedu?{" "}
              <Link
                href={`/register${next !== "/me" ? `?next=${encodeURIComponent(next)}` : ""}`}
                className="font-semibold text-brand"
              >
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href={`/login${next !== "/me" ? `?next=${encodeURIComponent(next)}` : ""}`}
                className="font-semibold text-brand"
              >
                Log in
              </Link>
            </>
          )}
        </p>
      </div>

      <p className="mt-4 px-2 text-center text-[11px] leading-relaxed text-muted">
        Demo store — any email and password will log you in. By continuing you agree to our{" "}
        <Link href="/terms" className="underline">Terms</Link> and{" "}
        <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </p>
    </div>
  );
}

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  return (
    <Suspense fallback={<div className="p-10 text-center text-muted">Loading…</div>}>
      <AuthInner mode={mode} />
    </Suspense>
  );
}
