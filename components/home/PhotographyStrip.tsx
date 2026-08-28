"use client";

import { useMemo, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import manifest from "@/lib/photos-manifest.json";

/**
 * A contact-sheet strip: a few hand-picked frames with real EXIF captions
 * pulled from the photo manifest. No masonry, no scatter. A curated reel
 * like a photographer would lay out on a light table.
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
  exif: {
    display: ExifDisplay;
  } | null;
  meta?: { location?: string; caption?: string } | null;
};

type ManifestCategory = {
  category: string;
  images: ManifestImage[];
};

type Pick = {
  src: string;
  category: string;
  caption: string;
  location: string | null;
};

const CATEGORIES: ManifestCategory[] = manifest as ManifestCategory[];

function exifCaption(img: ManifestImage | undefined, category: string): string {
  const display = img?.exif?.display;
  const parts = [
    display?.aperture,
    display?.focalLength,
    display?.shutter,
    display?.iso,
  ].filter((x): x is string => Boolean(x));
  if (parts.length === 0) return category.toUpperCase();
  return `${category.toUpperCase()} · ${parts.slice(0, 2).join(" · ")}`;
}

function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Pick four frames deterministically so server and client render the same
 * strip during hydration.
 */
function buildDeterministicPicks(): Pick[] {
  const out: Pick[] = [];
  const cats = [...CATEGORIES].sort((a, b) => a.category.localeCompare(b.category));
  for (const cat of cats) {
    if (cat.images.length === 0) continue;
    const idx = hashString(cat.category) % cat.images.length;
    const img = cat.images[idx];
    out.push({ src: img.src, category: cat.category, caption: exifCaption(img, cat.category), location: img.meta?.location ?? null });
    if (out.length === 4) return out;
  }
  // top up from any category with remaining images
  const allImages: { img: ManifestImage; category: string }[] = CATEGORIES.flatMap((c) =>
    c.images.map((img) => ({ img, category: c.category }))
  );
  const ordered = [...allImages].sort((a, b) => a.img.src.localeCompare(b.img.src));
  for (const { img, category } of ordered) {
    if (out.some((p) => p.src === img.src)) continue;
    out.push({ src: img.src, category, caption: exifCaption(img, category), location: img.meta?.location ?? null });
    if (out.length === 4) return out;
  }
  return out;
}

/**
 * Randomized picks for post-hydration client render.
 */
function buildRandomPicks(): Pick[] {
  const out: Pick[] = [];
  const cats = shuffle(CATEGORIES);
  for (const cat of cats) {
    if (cat.images.length === 0) continue;
    const img = cat.images[Math.floor(Math.random() * cat.images.length)];
    out.push({ src: img.src, category: cat.category, caption: exifCaption(img, cat.category), location: img.meta?.location ?? null });
    if (out.length === 4) return out;
  }

  const allImages: { img: ManifestImage; category: string }[] = CATEGORIES.flatMap((c) =>
    c.images.map((img) => ({ img, category: c.category }))
  );
  for (const { img, category } of shuffle(allImages)) {
    if (out.some((p) => p.src === img.src)) continue;
    out.push({ src: img.src, category, caption: exifCaption(img, category), location: img.meta?.location ?? null });
    if (out.length === 4) return out;
  }
  return out;
}

const SSR_PICKS: Pick[] = buildDeterministicPicks();

export function PhotographyStrip() {
  // Guarantees identical SSR + first client render, then allows one-time
  // randomized picks after mount without hydration mismatch.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const picks = useMemo(() => (mounted ? buildRandomPicks() : SSR_PICKS), [mounted]);

  if (picks.length === 0) return null;

  return (
    <section className="container-page mt-32 md:mt-40">
      <Reveal>
        <header className="grid grid-cols-1 gap-4 pb-10 md:grid-cols-12 md:gap-8 border-b border-[color:var(--color-rule)]">
          <div className="md:col-span-2">
            <p className="meta">§ 03</p>
          </div>
          <div className="md:col-span-10 flex items-end justify-between gap-4">
            <h2 style={{ fontSize: "var(--step-4)" }}>
              A small <em className="italic-serif">contact sheet</em>
            </h2>
            <Link
              href="/photography"
              className="mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-ink-dim)] link-underline"
            >
              Full archive ↗
            </Link>
          </div>
        </header>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {picks.map((p, i) => (
            <figure
              key={`${p.src}-${i}`}
              className="group flex flex-col gap-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-paper)]">
                <Image
                  src={p.src}
                  alt={`${p.category === "portraits" ? "Portrait" : p.category.charAt(0).toUpperCase() + p.category.slice(1)} photograph${p.location ? ` in ${p.location}` : ""} by Maahir Garg`}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.02] group-hover:saturate-100 saturate-[0.9]"
                  priority={i < 2}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
                {/* sprocket-hole edge (subtle, left) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-full w-[6px]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(0,0,0,0.45) 0 6px, transparent 6px 14px)",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
              <figcaption className="mono text-[10px] tracking-[0.16em] text-[color:var(--color-ink-faint)]">
                {p.caption}
                <span className="mx-2">·</span>
                <span className="text-[color:var(--color-ink-dim)]">
                  {String(i + 1).padStart(2, "0")} / {String(picks.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
