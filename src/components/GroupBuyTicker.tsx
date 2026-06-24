"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";

const BUYERS = [
  { name: "Emma W.", color: "#e8290b", mins: 2 },
  { name: "Liam P.", color: "#fb7701", mins: 4 },
  { name: "Sophia R.", color: "#e2294f", mins: 6 },
  { name: "Noah K.", color: "#7b3ff2", mins: 9 },
  { name: "Olivia M.", color: "#1f9d55", mins: 12 },
  { name: "James T.", color: "#1f7ae0", mins: 15 },
];

/** Cycling "X started a group buy" activity strip (social proof). */
export default function GroupBuyTicker() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % BUYERS.length), 2600);
    return () => clearInterval(t);
  }, []);

  const b = BUYERS[i];

  return (
    <div className="flex items-center gap-2 overflow-hidden rounded-lg bg-pill px-3 py-2">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: b.color }}
      >
        <User size={15} strokeWidth={2.2} />
      </span>
      <div key={i} className="flex-1 animate-[fadeIn_0.4s_ease] text-[12px] leading-tight">
        <span className="font-semibold text-ink">{b.name}</span>
        <span className="text-muted"> just started a group buy · {b.mins} min ago</span>
      </div>
      <span className="shrink-0 rounded-full bg-gradient-to-r from-[#fb5621] to-[#e8290b] px-3 py-1 text-[11px] font-semibold text-white">
        Join
      </span>
      <style>{`@keyframes fadeIn{from{opacity:.2;transform:translateY(4px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
