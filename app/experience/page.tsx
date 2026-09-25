import type { Metadata } from "next";
import { DATA } from "@/lib/data";
import { absoluteUrl, OG_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ExperienceRail } from "@/app/experience/ExperienceRail";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Maahir Garg's work experience: AI engineering at AICET and GIC, Apple Vision Pro research, and teaching at NUS.",
  alternates: { canonical: absoluteUrl("/experience") },
  openGraph: {
    title: "Experience · Maahir Garg",
    description:
      "Maahir Garg's work history: AI engineering at AICET and GIC, Apple Vision Pro research, and teaching at NUS.",
    url: absoluteUrl("/experience"),
    type: "profile",
    firstName: "Maahir",
    lastName: "Garg",
    username: "maahirgarg",
    siteName: "Maahir Garg",
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience · Maahir Garg",
    description: "AI engineering at AICET and GIC, Apple Vision Pro research, and teaching at NUS.",
    images: OG_IMAGE,
  },
};

export default function ExperiencePage() {
  const items = DATA.work;

  return (
    <div className="container-page pt-6 pb-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
        ]}
      />
      <header className="border-b border-[color:var(--color-rule)] pb-10">
        <h1 className="italic-serif" style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
          <span className="sr-only">Maahir Garg work experience. </span>
          What I&apos;ve worked on, <em className="italic-serif">roughly in order</em>.
        </h1>
        <p className="mt-6 max-w-2xl text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}>
          Newest first.
        </p>
      </header>

      <ExperienceRail items={items} />

      {/* Leadership & service */}
      <section className="mt-20">
        <h2 style={{ fontSize: "var(--step-3)" }}>Service</h2>
        <div className="mt-6">
          {DATA.leadership.map((l, i) => (
            <div key={i} className="mt-6 border-t border-[color:var(--color-rule)] pt-6 first:mt-0 first:border-0 first:pt-0">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="italic-serif" style={{ fontSize: "var(--step-1)" }}>
                  {l.org}
                </h3>
                <p className="text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)" }}>
                  &middot; {l.role}
                </p>
                <span className="mono ml-auto text-[0.8rem] text-[color:var(--color-ink-dim)]">
                  {l.dates.replace("Present", "now")}
                </span>
              </div>
              <p className="mt-2 max-w-3xl text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)", lineHeight: 1.65 }}>
                {l.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
