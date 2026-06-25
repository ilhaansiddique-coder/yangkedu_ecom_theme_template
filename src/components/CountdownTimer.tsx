"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

/** Seconds remaining until the next local midnight. */
function secondsToMidnight(): number {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  return Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
}

const pad = (n: number) => String(n).padStart(2, "0");

/** "Ends in HH:MM:SS" flash-sale countdown (resets daily at midnight). */
export default function CountdownTimer() {
  const [secs, setSecs] = useState<number | null>(null);

  useEffect(() => {
    setSecs(secondsToMidnight());
    const t = setInterval(() => setSecs(secondsToMidnight()), 1000);
    return () => clearInterval(t);
  }, []);

  const h = secs === null ? "--" : pad(Math.floor(secs / 3600));
  const m = secs === null ? "--" : pad(Math.floor((secs % 3600) / 60));
  const s = secs === null ? "--" : pad(secs % 60);

  const Box = ({ children }: { children: string }) => (
    <span className="inline-flex h-[18px] min-w-[20px] items-center justify-center rounded bg-ink px-1 font-display text-[12px] font-bold leading-none text-white tabular-nums lg:h-6 lg:min-w-[27px] lg:rounded-md lg:px-1.5 lg:text-[16px]">
      {children}
    </span>
  );
  const Colon = () => (
    <span className="inline-flex items-center font-display text-[12px] font-bold leading-none text-ink lg:text-[16px]">:</span>
  );

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/75 px-2.5 py-1 text-brand ring-1 ring-[#ffd9cc] lg:gap-2 lg:px-3">
      <Clock size={14} className="shrink-0" />
      <span className="hidden text-[12px] font-semibold sm:inline lg:text-[13px]">Ends in</span>
      <span className="flex items-center gap-0.5 lg:gap-1">
        <Box>{h}</Box>
        <Colon />
        <Box>{m}</Box>
        <Colon />
        <Box>{s}</Box>
      </span>
    </span>
  );
}
