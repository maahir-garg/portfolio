"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SingaporeClock } from "@/components/home/SingaporeClock";

const HERO_PHOTO = "/me.png";

export function Hero() {
  const now = new Date();
  const mastheadDate = now.toLocaleDateString("en-GB", {
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
        </p>
        <p className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)] hidden sm:block">
          Dispatch · 01°17′N 103°51′E
        </p>
        <SingaporeClock />
      </Reveal>

      {/* editorial statement */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-stretch">
          {/* Text content */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <Reveal>
              <h1
                className="text-[color:var(--color-ink)]"
                style={{ fontSize: "var(--step-5)", lineHeight: 1.02, letterSpacing: "-0.015em" }}
              >
                I&apos;m <em className="italic-serif">Maahir</em>, and I build{" "}
                <span className="mark-underline">careful systems</span> for{" "}
                <em className="italic-serif">unruly</em> data.
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p
                className="mt-8 text-[color:var(--color-ink-dim)]"
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
                </a>
                . Computer Science &amp; Quantitative Finance at{" "}
                <a
                  href="https://nus.edu.sg"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline text-[color:var(--color-ink)]"
                >
                  NUS
                </a>
                . I&apos;m building an internal Claude Code-style CLI agent for
                classified-data environments and agentic pipelines that automate
                audit workflows. Before that, a patent-pending multimodal
                hand-tracking framework on Vision Pro for stroke rehab. When
                I&apos;m not shipping, I&apos;m teaching algorithms, reading, or
                photographing whatever&apos;s in front of me.
              </p>

              {/* "Now" status strip */}
              <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
                <span className="inline-block size-1.5 rounded-full bg-[color:var(--color-mark)] relative self-center shrink-0">
                  <span className="absolute inset-0 rounded-full bg-[color:var(--color-mark)] motion-safe:animate-ping opacity-70" />
                </span>
                <span>
                  Currently:{" "}
                  <span className="text-[color:var(--color-ink-dim)]">
                    building a CLI agent at GIC
                  </span>
                </span>
                <span className="text-[color:var(--color-rule)] hidden sm:inline">·</span>
                <span className="text-[color:var(--color-ink-faint)] basis-full sm:basis-auto">
                  Last updated {mastheadDate}
                </span>
              </p>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                {/* Primary CTA */}
                <li>
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
                </li>
                {/* Secondary CTAs */}
                <li>
                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-2 text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-ink)] transition-colors"
                    style={{ fontSize: "var(--step-0)" }}
                  >
                    <span className="link-underline">See the projects</span>
                    <span className="text-[color:var(--color-mark)] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/photography"
                    className="group inline-flex items-center gap-2 text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-ink)] transition-colors"
                    style={{ fontSize: "var(--step-0)" }}
                  >
                    <span className="link-underline">Look at the photos</span>
                    <span className="text-[color:var(--color-mark)] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Hero photo - right side card */}
          <Reveal as="div" className="md:col-span-5 hidden md:flex md:h-full">
            <div
              className="w-full h-full"
              style={{ transform: "rotate(2deg)" }}
            >
              <div className="relative w-full h-full min-h-[520px] overflow-hidden border border-[color:var(--color-rule)]">
                <Image
                  src={HERO_PHOTO}
                  alt="Maahir Garg"
                  fill
                  sizes="280px"
                  className="object-cover saturate-[0.92]"
                  priority
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
      </div>
    </section>
  );
}
