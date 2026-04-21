"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SingaporeClock } from "@/components/home/SingaporeClock";

export function Hero() {
  return (
    <section className="container-page pt-10 md:pt-16">
      {/* masthead strip */}
      <Reveal as="div" className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-12 border-b border-[color:var(--color-rule)]">
        <p className="mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-faint)]">
          Vol. 01 · Issue 04 · Apr 2026 ·{" "}
          <span className="text-[color:var(--color-ink-dim)]">field notebook</span>
        </p>
        <SingaporeClock />
      </Reveal>

      {/* editorial statement */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        <Reveal as="div" className="md:col-span-2">
          <p className="mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-faint)]">
            Dispatch
          </p>
          <p className="mono mt-2 text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
            from 01°17′N 103°51′E
          </p>
        </Reveal>

        <div className="md:col-span-10">
          <Reveal>
            <h1
              className="text-[color:var(--color-ink)]"
              style={{ fontSize: "var(--step-5)", lineHeight: 1.02, letterSpacing: "-0.015em" }}
            >
              I&apos;m <em className="italic-serif">Maahir</em>, and I build{" "}
              <span className="mark-underline">careful systems</span> for{" "}
              <em className="italic-serif">uncareful</em> data.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p
              className="mt-8 max-w-2xl text-[color:var(--color-ink-dim)]"
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
          </Reveal>

          <Reveal delay={240}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <li>
                <Link
                  href="/experience"
                  className="group inline-flex items-baseline gap-2 text-[color:var(--color-ink)]"
                >
                  <span className="mono text-[11px] text-[color:var(--color-ink-faint)] uppercase tracking-[0.15em]">
                    01
                  </span>
                  <span className="italic-serif text-xl link-underline">
                    Read the work
                  </span>
                  <span className="text-[color:var(--color-mark)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="group inline-flex items-baseline gap-2 text-[color:var(--color-ink)]"
                >
                  <span className="mono text-[11px] text-[color:var(--color-ink-faint)] uppercase tracking-[0.15em]">
                    02
                  </span>
                  <span className="italic-serif text-xl link-underline">
                    See the projects
                  </span>
                  <span className="text-[color:var(--color-mark)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/photography"
                  className="group inline-flex items-baseline gap-2 text-[color:var(--color-ink)]"
                >
                  <span className="mono text-[11px] text-[color:var(--color-ink-faint)] uppercase tracking-[0.15em]">
                    03
                  </span>
                  <span className="italic-serif text-xl link-underline">
                    Look at the photos
                  </span>
                  <span className="text-[color:var(--color-mark)] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
