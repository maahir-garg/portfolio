"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import manifest from "@/lib/photos-manifest.json";
import { Print } from "@/components/motion/Print";
import { useMounted } from "@/components/motion/useMounted";

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
  width?: number | null;
  height?: number | null;
  display: ExifDisplay;
};

type PhotoMeta = {
  location?: string;
  caption?: string;
  year?: number;
  gear?: string;
};

type ManifestImage = {
  src: string;
  filename: string;
  exif: Exif | null;
  meta?: PhotoMeta | null;
};

type ManifestCategory = {
  category: string;
  images: ManifestImage[];
};

type Photo = {
  id: string;
  src: string;
  filename: string;
  category: string;
  index: number;
  total: number;
  exif: Exif | null;
  meta: PhotoMeta | null;
};

const CATEGORIES: ManifestCategory[] = manifest as ManifestCategory[];

const BUILT: Photo[] = CATEGORIES.flatMap((cat) =>
  cat.images.map((img, i, arr) => ({
    id: `${cat.category}-${i}`,
    src: img.src,
    filename: img.filename,
    category: cat.category,
    index: i + 1,
    total: arr.length,
    exif: img.exif,
    meta: img.meta ?? null,
  })),
);

/** "f/2.8 · 35mm · 1/250s · ISO 400" - only joins the parts that exist. */
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

/**
 * Descriptive, per-photo alt text. Most photos have no caption, so without
 * location/year every frame in a category would share the identical alt,
 * useless to Google Images and to screen readers flipping through the grid.
 */
function altFor(photo: Photo): string {
  const year =
    photo.meta?.year != null
      ? String(photo.meta.year)
      : yearFromIso(photo.exif?.takenAt ?? null);
  const category = photo.category === "portraits"
    ? "Portrait"
    : photo.category.charAt(0).toUpperCase() + photo.category.slice(1);
  const cleanCaption = photo.meta?.caption?.replace(/[.]+$/, "");
  return [
    cleanCaption ? `${cleanCaption}.` : null,
    `${category} photograph`,
    photo.meta?.location ? `in ${photo.meta.location}` : null,
    year ? `(${year})` : null,
    "by Maahir Garg",
  ]
    .filter(Boolean)
    .join(" ");
}

function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  let m_w = hash + 1;
  let m_z = 123456;
  return function() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & 0xffffffff;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & 0xffffffff;
    let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
  };
}

function shuffleInPlace<T>(arr: T[], rng: () => number) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const SWIPE_THRESHOLD = 48;

export function PhotoGallery() {
  const [active, setActive] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const mounted = useMounted();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const consumedPhotoParam = useRef(false);

  const categories = useMemo(() => {
    const ids = CATEGORIES.map((c) => c.category).filter(
      (c) => (CATEGORIES.find((m) => m.category === c)?.images.length ?? 0) > 0,
    );
    return ["all", ...ids];
  }, []);

  const filtered = useMemo(() => {
    const arr = active === "all" ? [...BUILT] : BUILT.filter((p) => p.category === active);
    // Deterministic order for SSR + first client render; true random after mount.
    const rng = mounted ? Math.random : seededRandom(active);
    shuffleInPlace(arr, rng);
    return arr;
  }, [active, mounted]);

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

  // A jump-bar "Random photo" action lands here as /photography?photo=<filename>.
  // Read straight from window.location rather than useSearchParams so this
  // page keeps statically rendering - a plain post-mount effect has no
  // effect on the server render at all.
  useEffect(() => {
    if (!mounted || consumedPhotoParam.current) return;
    const photoParam = new URLSearchParams(window.location.search).get("photo");
    if (!photoParam) return;
    const idx = filtered.findIndex((p) => p.filename === photoParam);
    if (idx < 0) return;
    consumedPhotoParam.current = true;
    // Deferred a tick so the state update happens in a callback rather
    // than synchronously in the effect body.
    queueMicrotask(() => {
      setLightbox(idx);
      window.history.replaceState(null, "", "/photography");
    });
  }, [mounted, filtered]);

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

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function onTouchEnd(e: React.TouchEvent) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
  }

  const current = lightbox !== null ? filtered[lightbox] : null;
  const currentExifLine = captionFromExif(current?.exif ?? null);
  const currentYear =
    current?.meta?.year != null
      ? String(current.meta.year)
      : yearFromIso(current?.exif?.takenAt ?? null);
  const currentLocation = current?.meta?.location ?? null;
  const currentNote = current?.meta?.caption ?? null;
  const currentGear = current?.meta?.gear ?? current?.exif?.camera ?? null;

  return (
    <div className="mt-10">
      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[color:var(--color-rule)] pb-6">
        <span className="italic-serif text-[color:var(--color-ink-faint)]" style={{ fontSize: "var(--step-0)" }}>
          Filter
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
              className="inline-flex min-h-11 items-baseline gap-1.5 py-2 text-[0.95rem] transition-colors"
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
                {count}
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
          const caption = photo.meta?.caption ?? captionFromExif(photo.exif);
          const location = photo.meta?.location ?? null;
          return (
            <li key={photo.id} className="group">
              <Print
                src={photo.src}
                alt={altFor(photo)}
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                loading="lazy"
                draggable={false}
                className="aspect-[4/5]"
                onOpen={() => setLightbox(i)}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-full w-[6px]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(0,0,0,0.4) 0 6px, transparent 6px 14px)",
                    mixBlendMode: "multiply",
                  }}
                />
              </Print>
              <div className="mt-2">
                <span className="text-[11px] text-[color:var(--color-ink-faint)]">
                  {location ?? photo.category}
                </span>
              </div>
              {caption && (
                <p
                  className={
                    photo.meta?.caption
                      ? "mt-1 italic-serif text-[12px] text-[color:var(--color-ink-dim)] line-clamp-1"
                      : "mt-1 mono text-[10px] tracking-[0.14em] text-[color:var(--color-ink-dim)] line-clamp-1"
                  }
                >
                  {caption}
                </p>
              )}
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
      {mounted &&
        current &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${lightbox! + 1} of ${filtered.length}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--color-canvas)]/95 backdrop-blur-md p-4 md:p-10"
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-2 right-2 z-10 flex min-h-11 min-w-11 items-center justify-center text-[13px] text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-mark)]"
            >
              Close
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
              className="absolute left-0 top-1/2 z-10 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center text-[13px] text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-mark)]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
              className="absolute right-0 top-1/2 z-10 flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center text-[13px] text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-mark)]"
            >
              →
            </button>

            <div
              className="relative max-h-[82vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                key={current.id}
                className="develop flex items-center justify-center"
                style={{ maxHeight: "78vh", minHeight: "40vh" }}
              >
                {/* next/image with the manifest's intrinsic dimensions, so the
                    lightbox serves an optimised rendition instead of the raw
                    multi-megabyte original. */}
                <Image
                  src={current.src}
                  alt={altFor(current)}
                  width={current.exif?.width ?? 1600}
                  height={current.exif?.height ?? 1200}
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  style={{ maxHeight: "78vh", width: "auto", maxWidth: "100%", objectFit: "contain", display: "block" }}
                />
              </div>
              <div className="mt-4 flex flex-col items-center gap-1.5 text-center">
                <p className="mono text-[11px] tracking-[0.1em] text-[color:var(--color-ink-dim)]">
                  {currentLocation ?? current.category}
                  {currentYear ? ` · ${currentYear}` : ""}
                  {" · "}
                  {lightbox! + 1} of {filtered.length}
                </p>
                {currentNote && (
                  <p
                    className="italic-serif text-[color:var(--color-ink)]"
                    style={{ fontSize: "var(--step-1)", lineHeight: 1.4 }}
                  >
                    {currentNote}
                  </p>
                )}
                {currentExifLine && (
                  <p className="mono text-[10px] tracking-[0.18em] text-[color:var(--color-ink-faint)]">
                    {currentExifLine}
                  </p>
                )}
                {currentGear && (
                  <p className="mono text-[10px] tracking-[0.18em] text-[color:var(--color-ink-faint)]">
                    {currentGear}
                  </p>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
