import { Reveal } from "@/components/ui/Reveal";
import { DATA } from "@/lib/data";
import { SingaporeClock } from "@/components/home/SingaporeClock";

export const metadata = {
  title: "Contact — Maahir Garg",
  description: "The shortest path to Maahir's inbox.",
};

export default function ContactPage() {
  const emailSubject = encodeURIComponent("Hello from your portfolio");
  const mailto = `mailto:${DATA.contact.email}?subject=${emailSubject}`;

  return (
    <div className="container-page pt-6 pb-10">
      <Reveal>
        <header className="grid grid-cols-1 gap-4 border-b border-[color:var(--color-rule)] pb-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><p className="meta">§ Contact</p></div>
          <div className="md:col-span-10">
            <h1 className="italic-serif" style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
              The <em className="italic-serif">shortest</em> way in.
            </h1>
            <p
              className="mt-6 max-w-2xl text-[color:var(--color-ink-dim)]"
              style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}
            >
              I tried having a contact form here. It made the page heavier and
              the replies worse. Email is better — it carries whatever context
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
              className="group inline-flex flex-wrap items-baseline gap-x-4"
            >
              <span
                className="italic-serif text-[color:var(--color-ink)] link-underline"
                style={{ fontSize: "var(--step-4)", lineHeight: 1.05 }}
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
          <div className="md:col-span-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <a
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col gap-2"
            >
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-faint)]">01</span>
              <span className="italic-serif text-[color:var(--color-ink)] group-hover:text-[color:var(--color-mark)]" style={{ fontSize: "var(--step-2)" }}>
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
              <span className="italic-serif text-[color:var(--color-ink)] group-hover:text-[color:var(--color-mark)]" style={{ fontSize: "var(--step-2)" }}>
                GitHub ↗
              </span>
              <span className="mono text-[11px] text-[color:var(--color-ink-dim)]">github.com/maahir-garg</span>
            </a>

            <a
              href="https://leetcode.com/u/maahir_garg/"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col gap-2"
            >
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-faint)]">03</span>
              <span className="italic-serif text-[color:var(--color-ink)] group-hover:text-[color:var(--color-mark)]" style={{ fontSize: "var(--step-2)" }}>
                LeetCode ↗
              </span>
              <span className="mono text-[11px] text-[color:var(--color-ink-dim)]">u/maahir_garg</span>
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
            <SingaporeClock />
            <a
              href={`tel:${DATA.contact.tel.replace(/\s+/g, "")}`}
              className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)] link-underline"
            >
              {DATA.contact.tel}
            </a>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
