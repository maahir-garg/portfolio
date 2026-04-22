"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { DATA } from "@/lib/data";

const categories = [
  { id: "all", label: "All" },
  { id: "ml",  label: "ML / LLM" },
  { id: "spatial", label: "Spatial" },
  { id: "data", label: "Data" },
  { id: "open", label: "Public" },
];

function classify(p: (typeof DATA.projects)[number]): string[] {
  const tech = p.technologies.join(" ").toLowerCase();
  const desc = p.description.toLowerCase();
  const tags: string[] = [];
  if (/(llm|bert|peft|fine|lora|llama|ai|ml|pytorch|nlp|few-shot|quantization|pruning|rag|vector|algorithm|leetcode|problem solving)/.test(tech + desc)) tags.push("ml");
  if (/(swift|vision|realitykit|visionpro|iphone|multimodal.*track|stroke)/.test(tech + desc)) tags.push("spatial");
  if (/(scraping|pipeline|etl|data engineering|sqlite|kafka|spark|snowflake|airflow)/.test(tech + desc)) tags.push("data");
  if (p.links.some((l) => Boolean(l.href))) tags.push("open");
  return tags;
}

export default function ProjectsPage() {
  const [active, setActive] = useState<string>("all");

  const projects = useMemo(() => {
    if (active === "all") return DATA.projects;
    return DATA.projects.filter((p) => classify(p).includes(active));
  }, [active]);

  return (
    <div className="container-page pt-6 pb-10">
      <Reveal>
        <header className="grid grid-cols-1 gap-4 border-b border-[color:var(--color-rule)] pb-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><p className="meta">§ Projects</p></div>
          <div className="md:col-span-10">
            <h1 style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
              Things I&apos;ve <em className="italic-serif">made, broken,</em> re-made.
            </h1>
            <p
              className="mt-6 max-w-2xl text-[color:var(--color-ink-dim)]"
              style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}
            >
              A running archive. Some shipped, some sat in a drawer, some
              became the curriculum. Click in for the notes.
            </p>
          </div>
        </header>
      </Reveal>

      {/* filter row. Editorial tabs. */}
      <Reveal delay={100}>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
            Filter:
          </span>
          {categories.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                aria-pressed={isActive}
                className="group relative inline-flex items-baseline gap-1.5 py-1 text-[0.95rem] transition-colors"
                style={{ color: isActive ? "var(--color-ink)" : "var(--color-ink-dim)" }}
              >
                <span
                  className="link-underline"
                  style={
                    isActive
                      ? {
                          backgroundImage: "linear-gradient(var(--color-mark), var(--color-mark))",
                          backgroundSize: "100% 2px",
                        }
                      : undefined
                  }
                >
                  {c.label}
                </span>
                <span className="mono text-[10px] text-[color:var(--color-ink-faint)]">
                  {c.id === "all"
                    ? String(DATA.projects.length).padStart(2, "0")
                    : String(DATA.projects.filter((p) => classify(p).includes(c.id)).length).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <ol className="mt-6">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 30}>
            <li className="group border-b border-[color:var(--color-rule)]">
              <Link
                href={`/projects/${p.slug}`}
                className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10"
              >
                <div className="md:col-span-2 flex flex-col gap-1">
                  <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                  <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]">
                    {p.dates}
                  </span>
                </div>

                <div className="md:col-span-7">
                  <h2
                    className="text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-mark)]"
                    style={{ fontSize: "var(--step-3)" }}
                  >
                    {p.title}
                  </h2>
                  <p
                    className="mt-3 max-w-2xl text-[color:var(--color-ink-dim)]"
                    style={{ fontSize: "var(--step-0)", lineHeight: 1.65 }}
                  >
                    {p.description}
                  </p>
                </div>

                <div className="md:col-span-3 flex flex-wrap gap-x-3 gap-y-1 md:justify-end">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          </Reveal>
        ))}

        {projects.length === 0 && (
          <li className="py-20 text-center italic-serif text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)" }}>
            Nothing in this category yet. Try another.
          </li>
        )}
      </ol>
    </div>
  );
}
