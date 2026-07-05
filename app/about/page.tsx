import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Skills } from "@/components/Skills";
import { FlightsMap } from "@/components/feature/FlightsMap";
import { DATA } from "@/lib/data";
import { absoluteUrl, OG_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Maahir Garg. AI Engineer at GIC and a Computer Science & Quantitative Finance student at NUS in Singapore. Background, skills, and the throughlines across his projects.",
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: "About · Maahir Garg",
    description:
      "About Maahir Garg. AI Engineer at GIC, Computer Science & Quantitative Finance student at NUS, based in Singapore.",
    url: absoluteUrl("/about"),
    type: "profile",
    firstName: "Maahir",
    lastName: "Garg",
    username: "maahirgarg",
    siteName: "Maahir Garg",
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: "About · Maahir Garg",
    description:
      "AI Engineer at GIC, CS & Quant Finance at NUS, based in Singapore.",
    images: OG_IMAGE,
  },
};

export default function AboutPage() {
  return (
    <div className="container-page pt-6 pb-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <Reveal>
        <header className="grid grid-cols-1 gap-6 border-b border-[color:var(--color-rule)] pb-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2">
            <p className="meta">§ About</p>
          </div>
          <div className="md:col-span-10">
            <h1 style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
              <span className="sr-only">About Maahir Garg. </span>
              A <em className="italic-serif">short letter</em>, more or less.
            </h1>
          </div>
        </header>

      </Reveal>

      {/* The letter */}
      <Reveal delay={80}>
        <section className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><p className="meta">¶</p></div>
          <div
            className="md:col-span-10 space-y-6 max-w-3xl text-[color:var(--color-ink)]"
            style={{ fontSize: "var(--step-1)", lineHeight: 1.7 }}
          >
            <p>
              Hello. I&apos;m Maahir. I study Computer Science and
              Quantitative Finance at NUS, and I work as an AI engineer at{" "}
              <a className="link-underline" href="https://www.gic.com.sg" target="_blank" rel="noreferrer">GIC</a>.
              Right now I&apos;m building an internal{" "}
              <em className="italic-serif">agentic</em> CLI agent
              for classified-data environments &mdash; AI tooling for an
              11-person team where those constraints rule out something like
              Copilot &mdash; alongside agentic LLM pipelines that automate
              internal audit workflows end-to-end.
            </p>
            <p>
              Before GIC I was at Interactive 3D Lab, where I co-invented a{" "}
              multimodal tracking framework{" "}
              <em className="italic-serif">(patent application in progress)</em> that stitches iPhone and Apple Vision Pro
              into a single tracking surface for stroke rehabilitation, at
              89% cross-device accuracy, with a research paper in preparation. I also
              taught{" "}
              <em className="italic-serif">Algorithms</em>,{" "}
              <em className="italic-serif">Data Structures</em>, and{" "}
              <em className="italic-serif">Discrete Structures</em> at NUS
              across three semesters (4.8/5.0 rating), and shipped data
              infrastructure across a handful of earlier research and
              industry roles. Threads that keep recurring: measurement,
              constraint, trade-off.
            </p>
            <p>
              Outside work I carry a camera, play a lot of badminton, and keep
              at least three F1 tabs open. I love a clean chess blitz and I
              lose honestly.
            </p>
            <p className="text-[color:var(--color-ink-dim)]">
              <span className="mark-underline text-[color:var(--color-ink)]">
                What I care about in engineering
              </span>
              : making the tradeoff legible. If a model is 69% smaller, I want
              to know what the other 31% paid for it. If a pipeline runs in
              seconds, I want to know what it assumes. The small, specific
              numbers are usually where the interesting decisions live.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Education - anchoring context first */}
      <Reveal delay={160}>
        <section className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><h2 className="meta">§ Study</h2></div>
          <div className="md:col-span-10">
            {DATA.education.map((e, i) => (
              <div key={i} className="flex flex-wrap items-baseline gap-x-4 border-t border-[color:var(--color-rule)] pt-6">
                <h3 style={{ fontSize: "var(--step-2)" }}>{e.school}</h3>
                <p className="text-[color:var(--color-ink-dim)]">/ {e.degree}</p>
                <span className="mono ml-auto text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
                  {e.start} → {e.end}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Toolkit */}
      <Reveal delay={200}>
        <section className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><h2 className="meta">§ Toolkit</h2></div>
          <div className="md:col-span-10">
            <Skills />
          </div>
        </section>
      </Reveal>

      {/* Where I've been */}
      <Reveal delay={230}>
        <section className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2">
            <h2 className="meta">§ Routes</h2>
          </div>
          <div className="md:col-span-10">
            <p
              className="max-w-2xl text-[color:var(--color-ink-dim)]"
              style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}
            >
              Singapore is home, but I&apos;ve crossed enough of South and
              Southeast Asia to have opinions about airport lounges.
            </p>
            <div className="mt-8">
              <FlightsMap />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Reach */}
      <Reveal delay={300}>
        <section className="mt-20 grid grid-cols-1 gap-4 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><h2 className="meta">§ Reach</h2></div>
          <div className="md:col-span-10">
            <p className="text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-2)", lineHeight: 1.35 }}>
              If this reads like <em className="italic-serif">someone you&apos;d want</em> thinking about your problem,{" "}
              <Link href="/contact" className="link-underline text-[color:var(--color-ink)]">
                let&apos;s talk
              </Link>
              .
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
