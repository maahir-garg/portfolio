"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import manifest from "@/lib/photos-manifest.json";

type Photo = { src: string; category: string; id: string; index: number; total: number };

const BUILT: Photo[] = manifest.flatMap((cat) =>
  cat.images.map((src, i, arr) => ({
    id: `${cat.category}-${i}`,
    src,
    category: cat.category,
    index: i + 1,
    total: arr.length,
  })),
);

export function PhotoGallery() {
  const [active, setActive] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const categories = useMemo(() => {
    const ids = manifest.map((c) => c.category).filter((c) => manifest.find((m) => m.category === c)?.images.length);
    return ["all", ...ids];
  }, []);

  const filtered = useMemo(
    () => (active === "all" ? BUILT : BUILT.filter((p) => p.category === active)),
    [active],
  );

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => setLightbox((i) => (i === null ? null : (i + 1) % filtered.length)), [filtered.length]);
  const prev = useCallback(() => setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)), [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, close, next, prev]);

  const current = lightbox !== null ? filtered[lightbox] : null;

  return (
    <div className="mt-10">
      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[color:var(--color-rule)] pb-6">
        <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
          Roll:
        </span>
        {categories.map((c) => {
          const isActive = active === c;
          const count = c === "all" ? BUILT.length : BUILT.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={isActive}
              className="inline-flex items-baseline gap-1.5 text-[0.95rem] transition-colors"
              style={{ color: isActive ? "var(--color-ink)" : "var(--color-ink-dim)" }}
            >
              <span
                className="link-underline capitalize"
                style={
                  isActive
                    ? {
                        backgroundImage: "linear-gradient(var(--color-mark), var(--color-mark))",
                        backgroundSize: "100% 2px",
                      }
                    : undefined
                }
              >
                {c}
              </span>
              <span className="mono text-[10px] text-[color:var(--color-ink-faint)]">
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Contact-sheet grid */}
      <ul
        role="list"
        className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4"
      >
        {filtered.map((photo, i) => (
          <li key={photo.id} className="group">
            <button
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`Open photo ${photo.index} of ${photo.category}`}
              className="block w-full text-left"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-paper)]">
                <Image
                  src={photo.src}
                  alt={`${photo.category} ${photo.index}/${photo.total}`}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] saturate-[0.92]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-full w-[6px]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(0,0,0,0.4) 0 6px, transparent 6px 14px)",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-faint)]">
                  {photo.category}
                </span>
                <span className="mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-faint)]">
                  {String(photo.index).padStart(2, "0")} / {String(photo.total).padStart(2, "0")}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="mt-16 italic-serif text-center text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)" }}>
          Nothing on this roll yet.
        </p>
      )}

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${current.index} of ${current.total}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--color-canvas)]/95 backdrop-blur-md p-4 md:p-10"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-mark)]"
          >
            Close ✕
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-mark)]"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-mark)]"
          >
            Next →
          </button>

          <div
            className="relative max-h-[82vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto aspect-[3/2] max-h-[82vh] w-full">
              <Image
                src={current.src}
                alt={`${current.category} photograph`}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </div>
            <p className="mt-3 mono text-center text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-faint)]">
              {current.category} · {String(current.index).padStart(2, "0")} / {String(current.total).padStart(2, "0")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
