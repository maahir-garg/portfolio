"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import manifest from "@/lib/photos-manifest.json";

/**
 * A contact-sheet strip: four photos, each with an EXIF-style caption.
 * No masonry, no scatter — a curated reel like a photographer would lay
 * out on a light table.
 */

type Pick = { src: string; category: string; caption: string };

function pickOne(category: string, fallbackCategory: string): Pick | null {
  const cat = manifest.find((c) => c.category === category);
  const pool = cat?.images?.length ? cat.images : manifest.find((c) => c.category === fallbackCategory)?.images ?? [];
  const src = pool[0];
  if (!src) return null;
  return { src, category, caption: `${category} · film no. ${Math.floor(Math.random() * 36) + 1}/36` };
}

export function PhotographyStrip() {
  const picks: Pick[] = [
    { src: manifest[0]?.images[2] ?? "", category: "landscape", caption: "LANDSCAPE · 35mm · f/5.6" },
    { src: manifest[1]?.images[1] ?? "", category: "street",    caption: "STREET · 50mm · f/2" },
    { src: manifest[2]?.images[0] ?? "", category: "portrait",  caption: "PORTRAIT · 85mm · f/1.8" },
    { src: manifest[0]?.images[5] ?? "", category: "landscape", caption: "LANDSCAPE · 24mm · f/8" },
  ].filter((p) => p.src);

  return (
    <section className="container-page mt-32 md:mt-40">
      <Reveal>
        <header className="grid grid-cols-1 gap-4 pb-10 md:grid-cols-12 md:gap-8 border-b border-[color:var(--color-rule)]">
          <div className="md:col-span-2">
            <p className="meta">§ 03</p>
          </div>
          <div className="md:col-span-10 flex items-end justify-between gap-4">
            <h2 className="italic-serif" style={{ fontSize: "var(--step-4)" }}>
              A small contact sheet
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
