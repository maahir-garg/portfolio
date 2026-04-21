"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { DATA } from "@/lib/data";

export function Colophon() {
  return (
    <section className="container-page mt-32 md:mt-40">
      <Reveal>
        <header className="grid grid-cols-1 gap-4 pb-10 md:grid-cols-12 md:gap-8 border-b border-[color:var(--color-rule)]">
          <div className="md:col-span-2"><p className="meta">§ 04</p></div>
          <div className="md:col-span-10">
            <h2 className="italic-serif" style={{ fontSize: "var(--step-4)" }}>
              Currently
            </h2>
          </div>
        </header>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        <Reveal as="div" className="md:col-span-6" delay={60}>
          <p className="meta mb-3">On the desk</p>
          <ul className="space-y-2 text-[color:var(--color-ink)]" style={{ fontSize: "var(--step-1)" }}>
            <li>— fine-tuning a reasoning model on clause-extracted data</li>
            <li>— reading <em className="italic-serif">Designing Data-Intensive Applications</em></li>
            <li>— building this site, out loud</li>
            <li>— logging one LeetCode problem a day, give or take</li>
          </ul>
        </Reveal>

        <Reveal as="div" className="md:col-span-6" delay={120}>
          <p className="meta mb-3">Off the desk</p>
          <ul className="space-y-2 text-[color:var(--color-ink)]" style={{ fontSize: "var(--step-1)" }}>
            <li>— badminton on wednesdays</li>
            <li>— three F1 tabs open somewhere</li>
            <li>— chess, mostly blitz, losing honestly</li>
            <li>— photographing whatever the light does</li>
          </ul>
        </Reveal>
      </div>

      <Reveal delay={220}>
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><p className="meta">Letters</p></div>
          <div className="md:col-span-10">
            <p className="italic-serif text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-2)", lineHeight: 1.35 }}>
              If any of this reads like something you&apos;d want to talk about —
              models, optimization, pipelines, or a quiet photograph —{" "}
              <a href={`mailto:${DATA.contact.email}`} className="link-underline text-[color:var(--color-ink)]">
                write to me
              </a>
              . I reply.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/contact" className="mono text-[11px] uppercase tracking-[0.15em] link-underline">
                Start a letter ↗
              </Link>
              <a
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noreferrer noopener"
                className="mono text-[11px] uppercase tracking-[0.15em] link-underline"
              >
                Connect on LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
