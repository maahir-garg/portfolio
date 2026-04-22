"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { DATA } from "@/lib/data";

export function SelectedWork() {
  const selected = DATA.work.slice(0, 4);

  return (
    <section className="container-page mt-32 md:mt-40">
      <Reveal>
        <header className="grid grid-cols-1 gap-4 pb-10 md:grid-cols-12 md:gap-8 border-b border-[color:var(--color-rule)]">
          <div className="md:col-span-2">
            <p className="meta">§ 01</p>
          </div>
          <div className="md:col-span-10 flex items-end justify-between gap-4">
            <h2 style={{ fontSize: "var(--step-4)" }}>
              Selected works
            </h2>
            <Link
              href="/experience"
              className="mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-ink-dim)] link-underline"
            >
              All roles ↗
            </Link>
          </div>
        </header>
      </Reveal>

      <ol className="mt-2">
        {selected.map((role, i) => (
          <Reveal key={`${role.company}-${i}`} delay={i * 60}>
            <li
              className="group grid grid-cols-1 gap-4 border-b border-[color:var(--color-rule)] py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <div className="md:col-span-2 flex items-start gap-3">
                <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]">
                  {role.start}
                  {" → "}
                  {role.end === "Present" ? "now" : role.end}
                </span>
              </div>

              <div className="md:col-span-10">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3
                    className="text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-mark)]"
                    style={{ fontSize: "var(--step-3)" }}
                  >
                    {role.company}
                  </h3>
                  <p className="text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)" }}>
                    {role.title}
                  </p>
                  {role.end === "Present" && (
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mark)] ml-auto">
                      ● now
                    </span>
                  )}
                </div>
                <p
                  className="mt-4 max-w-3xl text-[color:var(--color-ink-dim)]"
                  style={{ fontSize: "var(--step-0)", lineHeight: 1.65 }}
                >
                  {role.description}
                </p>
                {role.href && (
                  <a
                    href={role.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mono mt-4 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)] hover:text-[color:var(--color-mark)] transition-colors"
                  >
                    {new URL(role.href).hostname.replace(/^www\./, "")} ↗
                  </a>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
