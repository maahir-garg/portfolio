import type { Metadata } from "next";
import Link from "next/link";
import { PenUnderline } from "@/components/ui/RedPen";
import { NOW } from "@/lib/data";
import { absoluteUrl, OG_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const description =
  "What Maahir Garg is building, teaching, learning, and doing off-screen in September 2026.";

export const metadata: Metadata = {
  title: "Now",
  description,
  alternates: { canonical: absoluteUrl("/now") },
  openGraph: {
    title: "Now · Maahir Garg",
    description,
    url: absoluteUrl("/now"),
    type: "website",
    siteName: "Maahir Garg",
    images: OG_IMAGE,
  },
  twitter: {
    card: "summary_large_image",
    title: "Now · Maahir Garg",
    description,
    images: OG_IMAGE,
  },
};

export default function NowPage() {
  return (
    <div className="container-page pt-6 pb-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Now", path: "/now" },
        ]}
      />
      <header className="border-b border-[color:var(--color-rule)] pb-10">
        <h1 style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
          <span className="sr-only">What Maahir Garg is doing now. </span>
          What I&apos;m <PenUnderline seed={2}>on</PenUnderline>, for now.
        </h1>
        <p className="mt-6 max-w-2xl text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}>
          A short answer to <em className="italic-serif">&ldquo;what are you up to?&rdquo;</em>
        </p>
      </header>

      <div className="mt-14 space-y-14 md:space-y-16">
        {NOW.sections.map((section) => (
          <section key={section.label} className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-2">
              <h2 style={{ fontSize: "var(--step-2)" }}>{section.label}</h2>
            </div>
            <div className="md:col-span-10">
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.primary} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-[color:var(--color-rule)] pb-3">
                    <span className="text-[color:var(--color-ink)]" style={{ fontSize: "var(--step-2)", lineHeight: 1.25 }}>
                      {item.primary}
                    </span>
                    {"secondary" in item && item.secondary && (
                      <span className="italic-serif text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)" }}>
                        {item.secondary}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-20 border-t border-[color:var(--color-rule)] pt-10">
        <p className="text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)" }}>
          Written {NOW.updated}.{" "}
          <Link href="/contact" className="link-underline">
            Get in touch
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
