import type { Metadata } from "next";
import { PenCircle } from "@/components/ui/RedPen";
import { DATA } from "@/lib/data";
import { absoluteUrl, OG_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

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

      <ol className="timeline-rail mt-4">
        {items.map((role, i) => (
          <li key={`${role.company}-${i}`} className="group border-b border-[color:var(--color-rule)] py-10 first:pt-8 md:py-12">
            <div className="flex flex-col gap-1 text-[color:var(--color-ink-dim)] md:flex-row md:items-baseline md:gap-4">
              <span className="mono text-[0.8rem]">{role.dates.replace("Present", "now")}</span>
              <span className="text-[0.8rem]">{role.location}</span>
            </div>

            <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2
                className="italic-serif text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-mark)]"
                style={{ fontSize: "var(--step-3)" }}
              >
                {role.company}
              </h2>
              <p className="text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)" }}>
                {role.title}
              </p>
              {role.current && (
                <PenCircle seed={i}>
                  <span className="italic-serif text-[color:var(--color-mark)]" style={{ fontSize: "var(--step-0)" }}>
                    now
                  </span>
                </PenCircle>
              )}
            </div>

            <p className="mt-4 max-w-3xl text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)", lineHeight: 1.7 }}>
              {role.description}
            </p>

            {role.href && (
              <a
                href={role.href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline mt-5 inline-flex text-[0.85rem] text-[color:var(--color-ink-faint)] hover:text-[color:var(--color-mark)]"
              >
                {new URL(role.href).hostname.replace(/^www\./, "")}
              </a>
            )}
          </li>
        ))}
      </ol>

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
