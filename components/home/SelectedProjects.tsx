"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { DATA } from "@/lib/data";

const featured = [
  "bert-qa-quant-prune",
  "llm-reasoning-peft-bitfit",
  "3d-iphone",
  "llama2-finetuning",
];

export function SelectedProjects() {
  const items = featured
    .map((slug) => DATA.projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof DATA.projects)[number] => Boolean(p));

  return (
    <section className="container-page mt-32 md:mt-40">
      <Reveal>
        <header className="grid grid-cols-1 gap-4 pb-10 md:grid-cols-12 md:gap-8 border-b border-[color:var(--color-rule)]">
          <div className="md:col-span-2">
            <p className="meta">§ 02</p>
          </div>
          <div className="md:col-span-10 flex items-end justify-between gap-4">
            <h2 style={{ fontSize: "var(--step-4)" }}>
              Projects, <em className="italic-serif">annotated</em>
            </h2>
            <Link
              href="/projects"
              className="mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-ink-dim)] link-underline"
            >
              All projects ↗
            </Link>
          </div>
        </header>
      </Reveal>

      <ol>
        {items.map((project, i) => (
          <Reveal key={project.slug} delay={i * 60}>
            <li
              className="group relative border-b border-[color:var(--color-rule)]"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10"
              >
                <div className="md:col-span-2">
                  <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
                    {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                  <p className="mono mt-2 text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
                    {project.dates}
                  </p>
                </div>

                <div className="md:col-span-7">
                  <h3
                    className="text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-mark)]"
                    style={{ fontSize: "var(--step-3)" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="mt-3 max-w-2xl text-[color:var(--color-ink-dim)]"
                    style={{ fontSize: "var(--step-0)", lineHeight: 1.65 }}
                  >
                    {project.description}
                  </p>
                </div>

                <div className="md:col-span-3 flex flex-wrap items-start gap-x-3 gap-y-1 md:justify-end">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span
                  aria-hidden
                  className="mono absolute right-0 top-1/2 -translate-y-1/2 text-[color:var(--color-mark)] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 pr-2"
                >
                  →
                </span>
              </Link>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
