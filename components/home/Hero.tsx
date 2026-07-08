"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SingaporeClock } from "@/components/home/SingaporeClock";
import { SITE } from "@/lib/site";

const HERO_PHOTO = "/me.jpg";

export function Hero() {
  // Derived from the manually-bumped SITE.lastModified, not new Date():
  // a self-freshening "Last updated" would contradict the sitemap lastmod
  // and JSON-LD dateModified (and hydration-mismatch at month boundaries).
  const mastheadDate = new Date(SITE.lastModified).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  return (
    <section className="container-page pt-10 md:pt-16">
      {/* masthead strip */}
      <Reveal as="div" className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-12 border-b border-[color:var(--color-rule)]">
        <p className="mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-faint)]">
          {mastheadDate} ·{" "}
          <span className="text-[color:var(--color-ink-dim)]">field notebook</span>
          {" · "}
          <span className="text-[color:var(--color-ink-dim)]">AI engineer · GIC, NUS</span>
        </p>
        <p className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)] hidden sm:block">
          Dispatch · 01°17′N 103°51′E
        </p>
        <SingaporeClock />
      </Reveal>

      {/* editorial statement */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-stretch">
          {/* Hero photo - right side card on desktop, top on mobile */}
          <Reveal as="div" className="md:col-span-5 md:order-2 flex md:h-full">
            <div
              className="w-full h-full"
              style={{ transform: "rotate(2deg)" }}
            >
              <div className="relative w-full h-full min-h-[320px] md:min-h-[520px] overflow-hidden border border-[color:var(--color-rule)]">
                <Image
                  src={HERO_PHOTO}
                  alt="Portrait of Maahir Garg, AI Engineer at GIC, in Singapore"
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover saturate-[0.92]"
                  priority
                  fetchPriority="high"
                />
                {/* sprocket edge */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-full w-[5px]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(0,0,0,0.4) 0 5px, transparent 5px 12px)",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
            </div>
          </Reveal>

          {/* Text content */}
          <div className="md:col-span-7 md:order-1 flex flex-col justify-center">
            <Reveal>
              <h1
                className="text-[color:var(--color-ink)]"
                style={{ fontSize: "var(--step-5)", lineHeight: 1.02, letterSpacing: "-0.015em" }}
              >
                I&apos;m <em className="italic-serif">Maahir Garg</em>, and I build{" "}
                <span className="mark-underline">careful systems</span> for{" "}
                <em className="italic-serif">unruly</em> data.
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p
                className="mt-8 max-w-[55ch] text-[color:var(--color-ink-dim)]"
                style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}
              >
                AI engineer at{" "}
                <a
                  href="https://www.gic.com.sg"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline text-[color:var(--color-ink)]"
                >
                  GIC
                </a>{" "}
                in Singapore. Computer Science &amp; Quantitative Finance at{" "}
                <a
                  href="https://nus.edu.sg"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline text-[color:var(--color-ink)]"
                >
                  NUS
                </a>
                . Right now: building an agentic CLI for classified-data
                environments.
              </p>

              {/* "Now" status strip */}
              <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
                <span className="inline-block size-1.5 rounded-full bg-[color:var(--color-mark)] relative self-center shrink-0">
                  <span className="absolute inset-0 rounded-full bg-[color:var(--color-mark)] motion-safe:animate-ping opacity-70" />
                </span>
                <span>
                  Currently:{" "}
                  <span className="text-[color:var(--color-ink-dim)]">
                    building Trader&apos;s Edge, my final-year project
                  </span>
                </span>
                <span className="text-[color:var(--color-rule)] hidden sm:inline">·</span>
                <span className="text-[color:var(--color-ink-faint)] basis-full sm:basis-auto">
                  Last updated {mastheadDate}
                </span>
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10">
                <Link
                  href="/experience"
                  className="group inline-flex items-center gap-3"
                >
                  <span
                    className="text-[color:var(--color-ink)] border-b-2 border-[color:var(--color-mark)] pb-0.5 transition-colors group-hover:text-[color:var(--color-mark)]"
                    style={{ fontSize: "var(--step-1)", fontWeight: 500 }}
                  >
                    Read the work
                  </span>
                  <span className="text-[color:var(--color-mark)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <p className="mt-4 mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
                  Or{" "}
                  <Link href="/projects" className="link-underline text-[color:var(--color-ink-dim)]">
                    see the projects
                  </Link>
                  {" · "}
                  <Link href="/photography" className="link-underline text-[color:var(--color-ink-dim)]">
                    look at the photos
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
      </div>
    </section>
  );
}
