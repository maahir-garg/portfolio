"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { PenStrike } from "@/components/ui/RedPen";
import { Print } from "@/components/motion/Print";

const HERO_PHOTO = "/me.jpg";
// Hidden under the portrait until someone moves it.
const UNDER_PHOTO = "/photography/landscape/IMG_6654.jpeg";

export function Hero() {
  const deskRef = useRef<HTMLDivElement>(null);
  // Bumped on click/tap to replay the headline's whole mark sequence
  // (strike, then the correction writing itself in, then the tick).
  const [playToken, setPlayToken] = useState(0);
  return (
    <section ref={deskRef} className="container-page pt-10 md:pt-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
        {/* Portrait: a print on a desk. On a mouse or trackpad it can be
            picked up and moved, which uncovers another print underneath. */}
        <div
          className="order-2 mx-auto w-[82%] max-w-sm md:mx-0 md:w-full md:max-w-none md:col-span-5"
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 overflow-hidden"
              style={{
                transform: "rotate(-4deg) translate(-3%, 2%)",
                background: "var(--color-paper)",
                boxShadow: "0 1px 2px rgba(20, 18, 15, 0.16), 0 8px 18px -10px rgba(20, 18, 15, 0.22)",
              }}
            >
              <Image
                src={UNDER_PHOTO}
                alt=""
                fill
                sizes="(min-width: 768px) 38vw, 80vw"
                className="object-cover"
              />
            </div>
            <Print
              src={HERO_PHOTO}
              alt="Portrait of Maahir Garg"
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              priority
              rotate={2}
              parallax
              constraintsRef={deskRef}
              className="aspect-[4/5]"
            >
              {/* sprocket edge */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-full w-[5px]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(0,0,0,0.4) 0 5px, transparent 5px 12px)",
                  mixBlendMode: "multiply",
                }}
              />
            </Print>
          </div>
        </div>

        {/* Statement */}
        <div className="order-1 md:col-span-7">
          <h1
            className="cursor-pointer text-[color:var(--color-ink)] pb-[1.5em] select-none md:pb-[1.35em]"
            style={{ fontSize: "var(--step-5)", lineHeight: 1.05, letterSpacing: "-0.015em" }}
            onClick={() => setPlayToken((t) => t + 1)}
            title="Tap to re-mark"
          >
            I build{" "}
            <PenStrike
              seed={0}
              placement="below"
              correction="tests that tell me when my models don't"
              trigger="load"
              play={playToken}
              delay={0}
              duration={380}
              writeDelay={430}
              writeDuration={550}
            >
              models that work.
            </PenStrike>
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
