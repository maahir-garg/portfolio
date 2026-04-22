"use client";

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
};

type ManifestCategory = {
  category: string;
  images: ManifestImage[];
};

type Pick = {
  src: string;
  category: string;
  caption: string;
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

/**
 * Pick up to four frames across categories so the strip stays visually
 * mixed. Deterministic: takes the first image from each available
 * category, then rotates to the next frame of the first category to
 * fill to four.
 */
function buildPicks(): Pick[] {
  const out: Pick[] = [];
  for (const cat of CATEGORIES) {
    const first = cat.images[0];
    if (!first) continue;
    out.push({ src: first.src, category: cat.category, caption: exifCaption(first, cat.category) });
    if (out.length === 4) return out;
  }
  // top up from the earliest-populated category
  const firstCat = CATEGORIES.find((c) => c.images.length > 1);
  let idx = 1;
  while (out.length < 4 && firstCat && firstCat.images[idx]) {
    const img = firstCat.images[idx];
    out.push({ src: img.src, category: firstCat.category, caption: exifCaption(img, firstCat.category) });
    idx++;
  }
  return out;
}

const PICKS: Pick[] = buildPicks();

export function PhotographyStrip() {
  if (PICKS.length === 0) return null;

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
          {PICKS.map((p, i) => (
            <figure
              key={`${p.src}-${i}`}
              className="group flex flex-col gap-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-paper)]">
                <Image
                  src={p.src}
                  alt={`${p.category} photograph`}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.02] group-hover:saturate-100 saturate-[0.9]"
                  priority={i < 2}
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
                  {String(i + 1).padStart(2, "0")} / {String(PICKS.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
