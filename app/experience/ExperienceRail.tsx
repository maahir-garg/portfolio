"use client";

import { useEffect, useRef, useState } from "react";
import type { WorkItem } from "@/lib/data";
import { GradeMark, type GradeKind } from "@/components/ui/RedPen";

type Grade = { kind: GradeKind; word?: string };

/**
 * The margin rail for /experience: a thicker red line that fills as you
 * scroll, with a pen-nib riding its tip and a small tick stamped at each
 * role as the tip passes. Native browsers drive the fill, nib and ticks
 * entirely off `animation-timeline: view()` (see app/pen.css); this
 * component only supplies the rAF + IntersectionObserver fallback for
 * Safari and Firefox, which don't support it yet, and is a no-op
 * everywhere else (including reduced motion, where the CSS fallback is
 * simply a full static line).
 *
 * Each role also gets one grading mark - a tick, a circled date range, or
 * an underlined title, cycling deterministically - except current roles,
 * which get a plain, true "still going".
 */
export function ExperienceRail({ items }: { items: WorkItem[] }) {
  const railRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const tickRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [needsFallback, setNeedsFallback] = useState(false);

  useEffect(() => {
    const nativeSupported =
      typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("animation-timeline: view()");
    setNeedsFallback(!nativeSupported);
  }, []);

  useEffect(() => {
    if (!needsFallback) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let inView = false;

    const step = () => {
      raf = 0;
      const rail = railRef.current;
      if (!rail) return;
      const rect = rail.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const start = rect.top - vh * 0.15;
      const end = rect.top + rect.height - vh * 0.85;
      const span = end - start || 1;
      const progress = Math.min(1, Math.max(0, (0 - start) / span));
      rail.style.setProperty("--rail-progress", progress.toFixed(4));

      const railHeight = rect.height || 1;
      itemRefs.current.forEach((el, i) => {
        const tickEl = tickRefs.current[i];
        if (!el || !tickEl) return;
        const passed = el.offsetTop / railHeight <= progress;
        tickEl.classList.toggle("is-stamped", passed);
      });

      if (inView) raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries.some((e) => e.isIntersecting);
        if (inView && !raf) raf = requestAnimationFrame(step);
      },
      { threshold: 0 },
    );
    if (railRef.current) io.observe(railRef.current);
    // Paint an initial value immediately, don't wait for the first scroll.
    raf = requestAnimationFrame(step);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [needsFallback]);

  let cycle = 0;

  return (
    <ol ref={railRef} className="timeline-rail mt-4">
      <span aria-hidden className="timeline-rail-nib" />
      {items.map((role, i) => {
        const grade: Grade = role.current
          ? { kind: "note", word: "still going" }
          : { kind: (["tick", "circle", "underline"] as const)[cycle++ % 3] };

        return (
          <li
            key={`${role.company}-${i}`}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="group relative border-b border-[color:var(--color-rule)] py-10 first:pt-8 md:py-12"
          >
            <span
              aria-hidden
              ref={(el) => {
                tickRefs.current[i] = el;
              }}
              className="timeline-rail-tick"
            />
            <div className="flex flex-col gap-1 text-[color:var(--color-ink-dim)] md:flex-row md:items-baseline md:gap-4">
              {grade.kind === "circle" ? (
                <GradeMark kind="circle" seed={i}>
                  <span className="mono text-[0.8rem]">{role.dates.replace("Present", "now")}</span>
                </GradeMark>
              ) : (
                <span className="mono text-[0.8rem]">{role.dates.replace("Present", "now")}</span>
              )}
              <span className="text-[0.8rem]">{role.location}</span>
            </div>

            <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2
                className="italic-serif text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-mark)]"
                style={{ fontSize: "var(--step-3)" }}
              >
                {role.company}
                {grade.kind === "tick" && <GradeMark kind="tick" seed={i} />}
              </h2>
              {grade.kind === "underline" ? (
                <GradeMark kind="underline" seed={i}>
                  <span className="text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)" }}>
                    {role.title}
                  </span>
                </GradeMark>
              ) : (
                <p className="text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)" }}>
                  {role.title}
                </p>
              )}
              {grade.kind === "note" && <GradeMark kind="note" seed={i} word={grade.word} />}
            </div>

            <p className="mt-4 max-w-3xl text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)", lineHeight: 1.7 }}>
              {role.description}
            </p>

            {role.href && (
              <a
                href={role.href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline mt-5 inline-flex text-[0.85rem] text-[color:var(--color-ink-faint)] hover:text-[color:var(--color-mark)]"
              >
                {new URL(role.href).hostname.replace(/^www\./, "")}
              </a>
            )}
          </li>
        );
      })}
    </ol>
  );
}
