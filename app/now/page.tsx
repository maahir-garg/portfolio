import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Now · Maahir Garg",
  description:
    "What I'm building, reading, watching, and listening to right now.",
};

const lastUpdated = "Apr 2026";

const sections: {
  label: string;
  index: string;
  items: { primary: string; secondary?: string }[];
}[] = [
  {
    label: "Building",
    index: "01",
    items: [{ primary: "Anything that inspires me", secondary: "currently this news-journalesque website" }],
  },
  {
    label: "Reading",
    index: "02",
    items: [
      { primary: "Steve Jobs", secondary: "Walter Isaacson" }, 
      { primary: "Why Bharat Matters", secondary: "S Jaishankar" }
    ],
  },
  {
    label: "Watching",
    index: "03",
    items: [
      { primary: "Formula 1" },
      { primary: "The Boys", secondary: "S5" },
    ],
  },
  {
    label: "Listening",
    index: "04",
    items: [
      { primary: "Anything Spotify suggests" },
    ],
  },
];

export default function NowPage() {
  return (
    <div className="container-page pt-6 pb-10">
      <Reveal>
        <header className="grid grid-cols-1 gap-4 border-b border-[color:var(--color-rule)] pb-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2">
            <p className="meta">§ Now</p>
          </div>
          <div className="md:col-span-10">
            <h1 style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
              What I&apos;m <em className="italic-serif">on</em>, this week.
            </h1>
            <p
              className="mt-6 max-w-2xl text-[color:var(--color-ink-dim)]"
              style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}
            >
              A short answer to <em className="italic-serif">&ldquo;what are
              you up to?&rdquo;</em> Updated weekly-ish, or whenever I feel like it.
              .
            </p>
          </div>
        </header>
      </Reveal>

      <div className="mt-14 space-y-14 md:space-y-20">
        {sections.map((section, i) => (
          <Reveal key={section.label} delay={80 + i * 60}>
            <section className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-2 flex flex-col gap-1">
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-faint)]">
                  {section.index}
                </span>
                <p className="meta uppercase tracking-[0.16em]">
                  {section.label}
                </p>
              </div>
              <div className="md:col-span-10">
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-[color:var(--color-rule)] pb-3"
                    >
                      <span
                        className="text-[color:var(--color-ink)]"
                        style={{ fontSize: "var(--step-2)", lineHeight: 1.25 }}
                      >
                        {item.primary}
                      </span>
                      {item.secondary && (
                        <span
                          className="italic-serif text-[color:var(--color-ink-dim)]"
                          style={{ fontSize: "var(--step-1)" }}
                        >
                          / {item.secondary}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal delay={400}>
        <section className="mt-20 grid grid-cols-1 gap-4 border-t border-[color:var(--color-rule)] pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2">
            <p className="meta">Updated</p>
          </div>
          <div className="md:col-span-10 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-ink-dim)]">
              Last updated · {lastUpdated}
            </span>
            <Link
              href="/contact"
              className="mono text-[11px] uppercase tracking-[0.16em] link-underline"
            >
              Tell me what you&apos;re on ↗
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
