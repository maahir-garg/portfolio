import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Skills } from "@/components/Skills";
import { FlightsMap } from "@/components/feature/FlightsMap";
import { ABOUT_PARAGRAPHS, DATA } from "@/lib/data";
import { absoluteUrl, OG_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const description =
  "About Maahir Garg, AI Engineer at AICET's Team Koditsu, former GIC AI Engineer, and Computer Science and Quantitative Finance student at NUS.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: "About · Maahir Garg",
    description,
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
    description,
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
          <div className="md:col-span-2"><p className="meta">§ About</p></div>
          <div className="md:col-span-10">
            <h1 style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
              <span className="sr-only">About Maahir Garg. </span>
              Work, study, and the <em className="italic-serif">questions between them</em>.
            </h1>
          </div>
        </header>
      </Reveal>

      <Reveal delay={80}>
        <section className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><h2 className="meta">§ Biography</h2></div>
          <div
            className="md:col-span-10 max-w-3xl space-y-6 text-[color:var(--color-ink)]"
            style={{ fontSize: "var(--step-1)", lineHeight: 1.7 }}
          >
            <p>{ABOUT_PARAGRAPHS[0]}</p>
            <p>{ABOUT_PARAGRAPHS[4]}</p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={100}>
        <section className="mt-20 grid grid-cols-1 gap-4 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><h2 className="meta">§ Engineering work</h2></div>
          <div className="md:col-span-10 max-w-3xl space-y-6 text-[color:var(--color-ink)]" style={{ fontSize: "var(--step-1)", lineHeight: 1.7 }}>
            <p>{ABOUT_PARAGRAPHS[1]}</p>
            <p>{ABOUT_PARAGRAPHS[3]}</p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={120}>
        <section className="mt-20 grid grid-cols-1 gap-4 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><h2 className="meta">§ Study</h2></div>
          <div className="md:col-span-10 space-y-8">
            {DATA.education.map((education) => (
              <article key={education.school}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 style={{ fontSize: "var(--step-2)" }}>{education.school}</h3>
                  <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]">{education.dates}</span>
                </div>
                <p className="mt-2 text-[color:var(--color-ink)]">{education.degree}</p>
                <ul className="colophon-list mt-4 space-y-2 text-[color:var(--color-ink-dim)]">
                  {education.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={160}>
        <section className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><h2 className="meta">§ Honours</h2></div>
          <ul className="md:col-span-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {DATA.honours.map((honour) => (
              <li key={honour} className="border-b border-[color:var(--color-rule)] pb-3 text-[color:var(--color-ink-dim)]">{honour}</li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal delay={200}>
        <section className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><h2 className="meta">§ Toolkit</h2></div>
          <div className="min-w-0 md:col-span-10"><Skills /></div>
        </section>
      </Reveal>

      <Reveal delay={240}>
        <section className="mt-20 grid grid-cols-1 gap-4 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><h2 className="meta">§ Teaching & service</h2></div>
          <div className="md:col-span-10 space-y-6">
            {DATA.leadership.map((item) => (
              <article key={`${item.org}-${item.role}`} className="border-b border-[color:var(--color-rule)] pb-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 style={{ fontSize: "var(--step-2)" }}>{item.org} / {item.role}</h3>
                  <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]">{item.dates}</span>
                </div>
                <p className="mt-2 max-w-3xl text-[color:var(--color-ink-dim)]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={280}>
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

      <Reveal delay={320}>
        <section className="mt-20 grid grid-cols-1 gap-4 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><h2 className="meta">§ Contact</h2></div>
          <div className="md:col-span-10">
            <p className="text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-2)", lineHeight: 1.35 }}>
              If this reads like someone you would want thinking about your problem, <Link href="/contact" className="link-underline text-[color:var(--color-ink)]">let&apos;s talk</Link>.
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
