"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import manifest from "@/lib/photos-manifest.json";
import { Print, type PrintHandle } from "@/components/motion/Print";
import { useMounted } from "@/components/motion/useMounted";

/**
 * The home page's photography strip, reimagined as a desk. On a fine
 * pointer, a handful of prints are scattered across a shelf and can be
 * picked up and tossed around; a "tidy up" control springs them back to
 * their slots. On touch it becomes a plain horizontal, scroll-snapping
 * strip - no drag to fight with a swipe.
 *
 * Positions are seeded from each photo's own path, so the scatter is
 * identical between server and first client render (no hydration
 * mismatch), then a fresh random arrangement is drawn after mount and
 * whenever the jump bar's "Shuffle the desk" action fires.
 */

type ExifDisplay = {
  aperture: string | null;
  focalLength: string | null;
  shutter: string | null;
  iso: string | null;
};

type ManifestImage = {
  src: string;
  filename: string;
  exif: { display: ExifDisplay } | null;
  meta?: { location?: string; caption?: string } | null;
};

type ManifestCategory = {
  category: string;
  images: ManifestImage[];
};

type Pick = {
  src: string;
  filename: string;
  category: string;
  location: string | null;
  left: number;
  top: number;
  rotate: number;
};

const CATEGORIES: ManifestCategory[] = manifest as ManifestCategory[];
const DESK_COUNT = 8;

function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Small deterministic PRNG so the SSR and first client pass agree. */
function seededRandom(seed: number): () => number {
  let state = seed || 1;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function scatterFrom(rng: () => number): { left: number; top: number; rotate: number } {
  return {
    left: 8 + rng() * 68,
    top: 6 + rng() * 58,
    rotate: rng() * 16 - 8,
  };
}

function flattenImages(): { img: ManifestImage; category: string }[] {
  return CATEGORIES.flatMap((c) => c.images.map((img) => ({ img, category: c.category })));
}

function buildPicks(count: number, deterministic: boolean): Pick[] {
  const all = flattenImages();
  const ordered = deterministic
    ? [...all].sort((a, b) => a.img.src.localeCompare(b.img.src))
    : [...all].sort(() => Math.random() - 0.5);

  const out: Pick[] = [];
  const seen = new Set<string>();
  for (const { img, category } of ordered) {
    if (seen.has(img.src)) continue;
    seen.add(img.src);
    const seed = hashString(img.src);
    const rng = deterministic ? seededRandom(seed) : Math.random;
    const scatter = scatterFrom(rng);
    out.push({
      src: img.src,
      filename: img.filename,
      category,
      location: img.meta?.location ?? null,
      ...scatter,
    });
    if (out.length === count) break;
  }
  return out;
}

const SSR_PICKS = buildPicks(DESK_COUNT, true);

function altForPick(p: Pick): string {
  const category = p.category === "portraits" ? "Portrait" : p.category.charAt(0).toUpperCase() + p.category.slice(1);
  return `${category} photograph${p.location ? ` in ${p.location}` : ""} by Maahir Garg`;
}

export function PhotographyStrip() {
  const mounted = useMounted();
  const router = useRouter();
  const [shuffleTick, setShuffleTick] = useState(0);
  const deskRef = useRef<HTMLDivElement>(null);
  const printRefs = useRef<PrintHandle[]>([]);

  const picks = useMemo(() => {
    if (!mounted) return SSR_PICKS;
    return buildPicks(DESK_COUNT, false);
    // shuffleTick is a deliberate re-run trigger, not a data dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, shuffleTick]);

  useEffect(() => {
    function onShuffle() {
      setShuffleTick((t) => t + 1);
    }
    window.addEventListener("mg:shuffle-desk", onShuffle);
    return () => window.removeEventListener("mg:shuffle-desk", onShuffle);
  }, []);

  function tidyUp() {
    printRefs.current.forEach((handle) => handle?.reset());
  }

  if (picks.length === 0) return null;

  return (
    <section className="container-page mt-32 md:mt-40">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[color:var(--color-rule)] pb-6">
        <h2 style={{ fontSize: "var(--step-4)" }}>
          A few frames from the <em className="italic-serif">roll</em>
          <span className="ml-3 hidden text-[color:var(--color-ink-faint)] italic-serif md:inline" style={{ fontSize: "var(--step-0)" }}>
            (they move)
          </span>
        </h2>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={tidyUp}
            className="hidden italic-serif text-[color:var(--color-ink-dim)] link-underline md:inline-flex"
            style={{ fontSize: "var(--step-0)" }}
          >
            Tidy up
          </button>
          <Link href="/photography" className="italic-serif text-[color:var(--color-ink-dim)] link-underline" style={{ fontSize: "var(--step-0)" }}>
            Full archive
          </Link>
        </div>
      </header>

      {/* Desktop desk: scattered, draggable prints. */}
      <div
        ref={deskRef}
        key={`desk-${shuffleTick}`}
        className="relative mt-10 hidden md:block"
        style={{ height: "460px" }}
      >
        {picks.map((p, i) => (
          <div
            key={`${p.src}-${i}`}
            className="absolute w-[190px]"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
          >
            <Print
              ref={(handle) => {
                if (handle) printRefs.current[i] = handle;
              }}
              src={p.src}
              alt={altForPick(p)}
              fill
              className="aspect-[4/5]"
              sizes="190px"
              priority={i < 2}
              loading={i < 2 ? "eager" : "lazy"}
              rotate={p.rotate}
              constraintsRef={deskRef}
              onOpen={() => router.push(`/photography?photo=${encodeURIComponent(p.filename)}`)}
            />
          </div>
        ))}
      </div>

      {/* Mobile: a horizontal, scroll-snapping contact strip. No drag. */}
      <div className="mt-10 flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] snap-x snap-mandatory md:hidden">
        {picks.map((p, i) => (
          <Link
            key={`${p.src}-mobile-${i}`}
            href={`/photography?photo=${encodeURIComponent(p.filename)}`}
            className="print w-[62vw] flex-none snap-start"
            aria-label={altForPick(p)}
          >
            <span className="print__frame">
              <span className="relative block aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={p.src}
                  alt={altForPick(p)}
                  fill
                  sizes="62vw"
                  loading={i < 2 ? "eager" : "lazy"}
                  className="print__img absolute inset-0 h-full w-full object-cover"
                />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
