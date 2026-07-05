import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { DATA } from "@/lib/data";
import { absoluteUrl, OG_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Maahir Garg via email, GitHub, or LinkedIn. AI Engineer at GIC, based in Singapore.",
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    title: "Contact · Maahir Garg",
    description: "Email, GitHub, and LinkedIn for Maahir Garg, AI Engineer in Singapore.",
    url: absoluteUrl("/contact"),
    type: "website",
    siteName: "Maahir Garg",
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact · Maahir Garg",
    description: "Email, GitHub, and LinkedIn for Maahir Garg.",
    images: OG_IMAGE,
  },
};

export default function ContactPage() {
  const emailSubject = encodeURIComponent("[Portfolio] ");
  const mailto = `mailto:${DATA.contact.email}?subject=${emailSubject}`;

  return (
    <div className="container-page pt-6 pb-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <Reveal>
        <header className="grid grid-cols-1 gap-4 border-b border-[color:var(--color-rule)] pb-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><p className="meta">§ Contact</p></div>
          <div className="md:col-span-10">
            <h1 style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
              <span className="sr-only">Contact Maahir Garg. </span>
              The <em className="italic-serif">shortest</em> way in.
            </h1>
            <p
              className="mt-6 max-w-2xl text-[color:var(--color-ink-dim)]"
              style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}
            >
              I tried having a contact form here. It made the page heavier and
              the replies worse. Email is better. It carries whatever context
              you want to send with it.
            </p>
          </div>
        </header>
      </Reveal>

      {/* Primary: mailto, very large */}
      <Reveal delay={80}>
        <section className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><p className="meta">Write</p></div>
          <div className="md:col-span-10">
            <a
              href={mailto}
              className="group inline-flex flex-wrap items-baseline gap-x-4 max-w-full"
            >
              <span
                className="text-[color:var(--color-ink)] link-underline break-all"
                style={{ fontSize: "clamp(1.6rem, 1rem + 4vw, 3.4rem)", lineHeight: 1.05 }}
              >
                {DATA.contact.email}
              </span>
              <span
                className="text-[color:var(--color-mark)] transition-transform duration-300 group-hover:translate-x-1"
                style={{ fontSize: "var(--step-3)" }}
              >
                →
              </span>
            </a>
            <p className="mt-4 text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)" }}>
              Usual reply window: within a day or two, faster if it&apos;s
              urgent and you say so.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Where else */}
      <Reveal delay={140}>
        <section className="mt-20 grid grid-cols-1 gap-4 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><p className="meta">Elsewhere</p></div>
          <div className="md:col-span-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <a
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col gap-2"
            >
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-faint)]">01</span>
              <span className="text-[color:var(--color-ink)] group-hover:text-[color:var(--color-mark)]" style={{ fontSize: "var(--step-2)" }}>
                LinkedIn ↗
              </span>
              <span className="mono text-[11px] text-[color:var(--color-ink-dim)]">linkedin.com/in/maahir-garg</span>
            </a>

            <a
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col gap-2"
            >
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-faint)]">02</span>
              <span className="text-[color:var(--color-ink)] group-hover:text-[color:var(--color-mark)]" style={{ fontSize: "var(--step-2)" }}>
                GitHub ↗
              </span>
              <span className="mono text-[11px] text-[color:var(--color-ink-dim)]">github.com/maahir-garg</span>
            </a>
          </div>
        </section>
      </Reveal>

      {/* Coordinates */}
      <Reveal delay={200}>
        <section className="mt-20 grid grid-cols-1 gap-4 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><p className="meta">Coordinates</p></div>
          <div className="md:col-span-10 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]">
              01°17′N, 103°51′E · Singapore
            </span>
            <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]">
              UTC+8
            </span>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
