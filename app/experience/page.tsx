import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { DATA } from "@/lib/data";
import { absoluteUrl, OG_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Maahir Garg's work experience: AI engineering at GIC, Apple Vision Pro research at Interactive 3D Lab, teaching at NUS, and data/ML roles.",
  alternates: { canonical: absoluteUrl("/experience") },
  openGraph: {
    title: "Experience · Maahir Garg",
    description:
      "Maahir Garg's work history: AI engineering at GIC, Apple Vision Pro research, teaching at NUS, and data/ML roles.",
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
    description: "AI engineering, Apple Vision Pro research, teaching at NUS, and data/ML roles.",
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
      {/* Masthead */}
      <Reveal>
        <header className="grid grid-cols-1 gap-4 border-b border-[color:var(--color-rule)] pb-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2">
            <p className="meta">§ Work</p>
          </div>
          <div className="md:col-span-10">
            <h1 className="italic-serif" style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
              <span className="sr-only">Maahir Garg work experience. </span>
              Every role, <em className="italic-serif">in order</em>.
            </h1>
            <p
              className="mt-6 max-w-2xl text-[color:var(--color-ink-dim)]"
              style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}
            >
              A working list of places that have asked me to think about their
              problem long enough to learn something. Newest first.
            </p>
          </div>
        </header>
      </Reveal>

      <ol>
        {items.map((role, i) => (
          <Reveal key={`${role.company}-${i}`} delay={i * 40}>
            <li className="group grid grid-cols-1 gap-4 border-b border-[color:var(--color-rule)] py-10 md:grid-cols-12 md:gap-8 md:py-12">
              <div className="md:col-span-2 flex flex-col gap-1">
                <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]">
                  {role.start} → {String(role.end) === "Present" ? "now" : role.end}
                </span>
                <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
                  {role.location}
                </span>
              </div>

              <div className="md:col-span-10">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2
                    className="italic-serif text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-mark)]"
                    style={{ fontSize: "var(--step-3)" }}
                  >
                    {role.company}
                  </h2>
                  <p className="text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)" }}>
                    / {role.title}
                  </p>
                </div>

                <p
                  className="mt-4 max-w-3xl text-[color:var(--color-ink-dim)]"
                  style={{ fontSize: "var(--step-0)", lineHeight: 1.7 }}
                >
                  {role.description}
                </p>

                {role.href && (
                  <a
                    href={role.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mono mt-5 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-ink-faint)] hover:text-[color:var(--color-mark)] transition-colors"
                  >
                    {new URL(role.href).hostname.replace(/^www\./, "")} ↗
                  </a>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      {/* Leadership & Service */}
      <Reveal>
        <section className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2">
            <p className="meta">§ Service</p>
          </div>
          <div className="md:col-span-10">
            {DATA.leadership.map((l, i) => (
              <div
                key={i}
                className="mt-6 border-t border-[color:var(--color-rule)] pt-6 first:mt-0"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="italic-serif" style={{ fontSize: "var(--step-2)" }}>
                    {l.org}
                  </h3>
                  <p className="text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)" }}>
                    / {l.role}
                  </p>
                  <span className="mono ml-auto text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]">
                    {l.start} → {l.end === "Present" ? "now" : l.end}
                  </span>
                </div>
                <p
                  className="mt-2 max-w-3xl text-[color:var(--color-ink-dim)]"
                  style={{ fontSize: "var(--step-0)", lineHeight: 1.65 }}
                >
                  {l.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
