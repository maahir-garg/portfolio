import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { DATA } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { LeetCodeStats } from "@/components/feature/LeetCodeStats";
import { LeetCodeStatsSkeleton } from "@/components/feature/LeetCodeStatsSkeleton";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idx = DATA.projects.findIndex((p) => p.slug === slug);
  const project = DATA.projects[idx];
  if (!project) notFound();

  return (
    <article className="container-page pt-6 pb-10">
      <Reveal>
        <Link
          href="/projects"
          className="mono inline-flex items-baseline gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)] hover:text-[color:var(--color-mark)] transition-colors"
        >
          ← Back to the archive
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <header className="mt-8 grid grid-cols-1 gap-4 border-b border-[color:var(--color-rule)] pb-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2">
            <p className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
              Entry {String(idx + 1).padStart(2, "0")} / {String(DATA.projects.length).padStart(2, "0")}
            </p>
            <p className="mono mt-2 text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]">
              {project.dates}
            </p>
          </div>
          <div className="md:col-span-10">
            <h1 className="italic-serif" style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
              {project.title}
            </h1>
            <p
              className="mt-6 max-w-3xl text-[color:var(--color-ink-dim)]"
              style={{ fontSize: "var(--step-2)", lineHeight: 1.5 }}
            >
              {project.description}
            </p>
          </div>
        </header>
      </Reveal>

      {/* meta grid */}
      <Reveal delay={140}>
        <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><p className="meta">Stack</p></div>
          <div className="md:col-span-10 flex flex-wrap gap-x-5 gap-y-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)] border-b border-[color:var(--color-rule)] pb-0.5"
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={200}>
        <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><p className="meta">Links</p></div>
          <div className="md:col-span-10 flex flex-wrap gap-x-6 gap-y-2">
            {project.links.map((link, i) => {
              const label = link.href ? `${link.type} ↗` : `${link.type} (private)`;
              return link.href ? (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="italic-serif text-xl link-underline"
                >
                  {label}
                </a>
              ) : (
                <span key={i} className="italic-serif text-xl text-[color:var(--color-ink-faint)]">
                  {label}
                </span>
              );
            })}
          </div>
        </section>
      </Reveal>

      {slug === "leetcoding" && (
        <Reveal delay={240}>
          <section className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-2"><p className="meta">Live ticker</p></div>
            <div className="md:col-span-10">
              <Suspense fallback={<LeetCodeStatsSkeleton />}>
                <LeetCodeStats username="maahir_garg" />
              </Suspense>
            </div>
          </section>
        </Reveal>
      )}
    </article>
  );
}

export async function generateStaticParams() {
  return DATA.projects.map((p) => ({ slug: p.slug }));
}
