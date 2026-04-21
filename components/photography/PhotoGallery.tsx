"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import manifest from "@/lib/photos-manifest.json";

type ExifDisplay = {
  aperture: string | null;
  focalLength: string | null;
  shutter: string | null;
  iso: string | null;
};

type Exif = {
  takenAt: string | null;
  camera: string | null;
  lens: string | null;
  display: ExifDisplay;
};

type ManifestImage = {
  src: string;
  filename: string;
  exif: Exif | null;
};

type ManifestCategory = {
  category: string;
  images: ManifestImage[];
};

type Photo = {
  id: string;
  src: string;
  category: string;
  index: number;
  total: number;
  exif: Exif | null;
};

const CATEGORIES: ManifestCategory[] = manifest as ManifestCategory[];

const BUILT: Photo[] = CATEGORIES.flatMap((cat) =>
  cat.images.map((img, i, arr) => ({
    id: `${cat.category}-${i}`,
    src: img.src,
    category: cat.category,
    index: i + 1,
    total: arr.length,
    exif: img.exif,
  })),
);

/** "f/2.8 · 35mm · 1/250s · ISO 400" — only joins the parts that exist. */
function captionFromExif(exif: Exif | null): string | null {
  if (!exif) return null;
  const { aperture, focalLength, shutter, iso } = exif.display;
  const parts = [aperture, focalLength, shutter, iso].filter(
    (x): x is string => Boolean(x),
  );
  return parts.length ? parts.join(" · ") : null;
}

function yearFromIso(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return String(d.getFullYear());
}

export function PhotoGallery() {
  const [active, setActive] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const categories = useMemo(() => {
    const ids = CATEGORIES.map((c) => c.category).filter(
      (c) => (CATEGORIES.find((m) => m.category === c)?.images.length ?? 0) > 0,
    );
    return ["all", ...ids];
  }, []);

  const filtered = useMemo(
    () => (active === "all" ? BUILT : BUILT.filter((p) => p.category === active)),
    [active],
  );

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length],
  );
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? null : (i - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

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
  const currentCaption = captionFromExif(current?.exif ?? null);
  const currentYear = yearFromIso(current?.exif?.takenAt ?? null);

  return (
    <div className="mt-10">
      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[color:var(--color-rule)] pb-6">
        <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
          Roll:
        </span>
        {categories.map((c) => {
          const isActive = active === c;
          const count =
            c === "all" ? BUILT.length : BUILT.filter((p) => p.category === c).length;
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
                        backgroundImage:
                          "linear-gradient(var(--color-mark), var(--color-mark))",
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
        {filtered.map((photo, i) => {
          const caption = captionFromExif(photo.exif);
          return (
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
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-faint)]">
                    {photo.category}
                  </span>
                  <span className="mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-faint)]">
                    {String(photo.index).padStart(2, "0")} /{" "}
                    {String(photo.total).padStart(2, "0")}
                  </span>
                </div>
                {caption && (
                  <p className="mt-1 mono text-[10px] tracking-[0.14em] text-[color:var(--color-ink-dim)] line-clamp-1">
                    {caption}
                  </p>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p
          className="mt-16 italic-serif text-center text-[color:var(--color-ink-dim)]"
          style={{ fontSize: "var(--step-1)" }}
        >
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
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-mark)]"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
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
            <div className="mt-4 flex flex-col items-center gap-1">
              <p className="mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-dim)]">
                {current.category} · {String(current.index).padStart(2, "0")} /{" "}
                {String(current.total).padStart(2, "0")}
                {currentYear ? ` · ${currentYear}` : ""}
              </p>
              {currentCaption && (
                <p className="mono text-[10px] tracking-[0.18em] text-[color:var(--color-ink-faint)]">
                  {currentCaption}
                </p>
              )}
              {current.exif?.camera && (
                <p className="mono text-[10px] tracking-[0.18em] text-[color:var(--color-ink-faint)]">
                  {current.exif.camera}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
