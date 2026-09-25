"use client";

import Image from "next/image";
import { PenStrike } from "@/components/ui/RedPen";

const HERO_PHOTO = "/me.jpg";

export function Hero() {
  return (
    <section className="container-page pt-10 md:pt-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
        {/* Portrait: a print on a desk. data-print-slot lets the tossable
            <Print> component (framer-motion, owned by the motion pass)
            take over this spot later without touching the layout. */}
        <div className="md:col-span-5 md:order-2" data-print-slot="hero">
          <div className="w-full" style={{ transform: "rotate(2deg)" }}>
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[color:var(--color-rule)]">
              <Image
                src={HERO_PHOTO}
                alt="Portrait of Maahir Garg"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover saturate-[0.92]"
                priority
                fetchPriority="high"
              />
              {/* sprocket edge, a single instance, not restyled elsewhere */}
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
        </div>

        {/* Statement */}
        <div className="md:col-span-7 md:order-1">
          <h1
            className="text-[color:var(--color-ink)]"
            style={{ fontSize: "var(--step-5)", lineHeight: 1.05, letterSpacing: "-0.015em" }}
          >
            I build{" "}
            <PenStrike seed={0} correction="tests that tell me when my models don't">
              models that work
            </PenStrike>
            .
          </h1>

          <p
            className="mt-8 max-w-[55ch] text-[color:var(--color-ink-dim)]"
            style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}
          >
            Most recently that meant proving a promising cheating detector at{" "}
            <a
              href="https://aicet.comp.nus.edu.sg/projects/"
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline text-[color:var(--color-ink)]"
            >
              AICET&apos;s Team Koditsu
            </a>{" "}
            was statistically indistinguishable from chance, and building the
            harness that caught it. Before that, agentic tooling at GIC;
            these days I also teach algorithms at{" "}
            <a
              href="https://nus.edu.sg"
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline text-[color:var(--color-ink)]"
            >
              NUS
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
