"use client";

/**
 * Renders the same markup as the server-fetched LeetCode stats, but the
 * numbers count up and the bars draw in once the block scrolls into view.
 *
 * The underlying motion value starts at 1 ("fully resolved"), so the very
 * first paint - server-rendered, no JS, or prefers-reduced-motion - always
 * shows the real final numbers. Only once (and if) an IntersectionObserver
 * confirms the block is on screen do we reset to 0 and animate back up to
 * 1; reduced motion skips that entirely and leaves the final values in
 * place throughout.
 */

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";
import { EASE_ARR } from "@/components/motion/tokens";

export type LeetCodeStatsValues = {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
};

export function LeetCodeStatsAnimated({ stats }: { stats: LeetCodeStatsValues }) {
  const reducedMotion = useReducedMotion();
  const progress = useMotionValue(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            progress.set(0);
            animate(progress, 1, { duration: 1.1, ease: EASE_ARR });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reducedMotion, progress]);

  const total = stats.totalSolved;
  const easyPct = total > 0 ? (stats.easySolved / total) * 100 : 0;
  const mediumPct = total > 0 ? (stats.mediumSolved / total) * 100 : 0;
  const hardPct = total > 0 ? (stats.hardSolved / total) * 100 : 0;

  const totalMV = useTransform(progress, (t) => Math.round(t * stats.totalSolved));
  const easyMV = useTransform(progress, (t) => Math.round(t * stats.easySolved));
  const mediumMV = useTransform(progress, (t) => Math.round(t * stats.mediumSolved));
  const hardMV = useTransform(progress, (t) => Math.round(t * stats.hardSolved));
  const rankMV = useTransform(progress, (t) => `#${Math.round(t * stats.ranking).toLocaleString("en-SG")}`);
  const easyW = useTransform(progress, (t) => `${t * easyPct}%`);
  const mediumW = useTransform(progress, (t) => `${t * mediumPct}%`);
  const hardW = useTransform(progress, (t) => `${t * hardPct}%`);

  const rows = [
    { label: "Easy", valueMV: easyMV, widthMV: easyW },
    { label: "Medium", valueMV: mediumMV, widthMV: mediumW },
    { label: "Hard", valueMV: hardMV, widthMV: hardW },
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {/* Solved ladder */}
      <div>
        <div className="flex items-baseline justify-between border-b border-[color:var(--color-rule)] pb-2">
          <p className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]">Solved</p>
          <motion.p className="mono text-[color:var(--color-ink)]" style={{ fontSize: "var(--step-3)" }}>
            {totalMV}
          </motion.p>
        </div>

        <ul className="mt-4 space-y-4">
          {rows.map((row) => (
            <li key={row.label}>
              <div className="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.14em]">
                <span className="text-[color:var(--color-ink-dim)]">{row.label}</span>
                <motion.span className="text-[color:var(--color-ink)]">{row.valueMV}</motion.span>
              </div>
              <div className="mt-2 h-px bg-[color:var(--color-rule)] relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[color:var(--color-mark)]"
                  style={{ width: row.widthMV, height: "2px", top: "-0.5px" }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Ranking */}
      <div className="flex flex-col justify-between border-t border-[color:var(--color-rule)] pt-2 md:border-t-0 md:pt-0">
        <p className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]">Global rank</p>
        <motion.p className="mono mt-2 text-[color:var(--color-ink)]" style={{ fontSize: "var(--step-5)", lineHeight: 1 }}>
          {rankMV}
        </motion.p>
        <p className="mono mt-3 text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
          updates hourly
        </p>
      </div>
    </div>
  );
}
