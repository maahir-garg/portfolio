import type { Metadata } from "next";
import Link from "next/link";
import { Skills } from "@/components/Skills";
import { PenCircle } from "@/components/ui/RedPen";
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

function honoursSentence(honours: readonly string[]): string {
  if (honours.length === 0) return "";
  if (honours.length === 1) return honours[0];
  return `${honours.slice(0, -1).join(", ")}, and ${honours[honours.length - 1]}`;
}

export default function AboutPage() {
  return (
    <div className="container-page pt-6 pb-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <header className="border-b border-[color:var(--color-rule)] pb-10">
        <h1 style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
          <span className="sr-only">About Maahir Garg. </span>
          The{" "}
          <PenCircle seed={1}>
            <em className="italic-serif">longer</em>
          </PenCircle>{" "}
          version.
        </h1>
      </header>

      <section className="mt-12 max-w-3xl space-y-6 text-[color:var(--color-ink)]" style={{ fontSize: "var(--step-1)", lineHeight: 1.7 }}>
        {ABOUT_PARAGRAPHS.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </section>

      <section className="mt-20 border-t border-[color:var(--color-rule)] pt-10">
        <h2 style={{ fontSize: "var(--step-3)" }}>Study</h2>
        <div className="mt-6 space-y-8">
          {DATA.education.map((education) => (
            <article key={education.school}>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 style={{ fontSize: "var(--step-2)" }}>{education.school}</h3>
                <span className="mono text-[0.8rem] text-[color:var(--color-ink-dim)]">{education.dates}</span>
              </div>
              <p className="mt-2 text-[color:var(--color-ink)]">{education.degree}</p>
              <ul className="mt-4 space-y-1 text-[color:var(--color-ink-dim)]">
                {education.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {DATA.honours.length > 0 && (
          <p className="mt-8 max-w-2xl text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)", lineHeight: 1.6 }}>
            Also: {honoursSentence(DATA.honours)}.
          </p>
        )}
      </section>

      <section className="mt-20">
        <details>
          <summary className="cursor-pointer text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-ink)]" style={{ fontSize: "var(--step-2)" }}>
            Toolkit
          </summary>
          <div className="mt-6 min-w-0">
            <Skills />
          </div>
        </details>
      </section>

      <section className="mt-20 border-t border-[color:var(--color-rule)] pt-10">
        <h2 style={{ fontSize: "var(--step-3)" }}>Teaching &amp; service</h2>
        <div className="mt-6 space-y-6">
          {DATA.leadership.map((item) => (
            <article key={`${item.org}-${item.role}`} className="border-b border-[color:var(--color-rule)] pb-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="italic-serif" style={{ fontSize: "var(--step-1)" }}>
                  {item.org} &middot; {item.role}
                </h3>
                <span className="mono text-[0.8rem] text-[color:var(--color-ink-dim)]">{item.dates}</span>
              </div>
              <p className="mt-2 max-w-3xl text-[color:var(--color-ink-dim)]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 style={{ fontSize: "var(--step-3)" }}>Routes</h2>
        <p className="mt-4 max-w-2xl text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}>
          Singapore is home, but I&apos;ve crossed enough of South and
          Southeast Asia to have opinions about airport lounges.
        </p>
        <div className="mt-8">
          <FlightsMap />
        </div>
      </section>

      <section className="mt-20 border-t border-[color:var(--color-rule)] pt-10">
        <p className="text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-2)", lineHeight: 1.35 }}>
          If this reads like someone you&apos;d want thinking about your
          problem, <Link href="/contact" className="link-underline text-[color:var(--color-ink)]">let&apos;s talk</Link>.
        </p>
      </section>
    </div>
  );
}
