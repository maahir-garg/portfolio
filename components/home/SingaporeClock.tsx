"use client";

import { useEffect, useState } from "react";

const SG_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Singapore",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatSG(now: Date) {
  return SG_FORMATTER.format(now);
}

export function SingaporeClock({ label = "Singapore" }: { label?: string }) {
  // Start with the placeholder on both server and first client paint to avoid
  // hydration mismatch, then update inside the effect.
  const [time, setTime] = useState<string>("··:··");

  useEffect(() => {
    const tick = () => setTime(formatSG(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-baseline gap-2 mono text-[0.78rem] text-[color:var(--color-ink-dim)]">
      <span className="inline-block size-1.5 rounded-full bg-[color:var(--color-mark)] relative">
        <span className="absolute inset-0 rounded-full bg-[color:var(--color-mark)] motion-safe:animate-ping opacity-70" />
      </span>
      <span className="uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
        {label}
      </span>
      <span aria-live="polite" className="caret" suppressHydrationWarning>
        {time}
      </span>
    </span>
  );
}
