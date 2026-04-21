import { Reveal } from "@/components/ui/Reveal";
import { DATA } from "@/lib/data";

export const metadata = {
  title: "Work — Maahir Garg",
  description: "A chronological list of roles across AI engineering, research, data, and teaching.",
};

export default function ExperiencePage() {
  const items = DATA.work;

  return (
    <div className="container-page pt-6 pb-10">
      {/* Masthead */}
      <Reveal>
        <header className="grid grid-cols-1 gap-4 border-b border-[color:var(--color-rule)] pb-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2">
            <p className="meta">§ Work</p>
          </div>
          <div className="md:col-span-10">
            <h1 className="italic-serif" style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
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
                  {role.start} → {role.end === "Present" ? "now" : role.end}
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
                    — {role.title}
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

      {/* Education */}
      <Reveal>
        <section className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2">
            <p className="meta">§ Study</p>
          </div>
          <div className="md:col-span-10">
            {DATA.education.map((e, i) => (
              <div key={i} className="flex flex-wrap items-baseline gap-x-4 border-t border-[color:var(--color-rule)] pt-6">
                <h3 className="italic-serif" style={{ fontSize: "var(--step-2)" }}>
                  {e.school}
                </h3>
                <p className="text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)" }}>
                  — {e.degree}
                </p>
                <span className="mono ml-auto text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
                  {e.start} → {e.end}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
