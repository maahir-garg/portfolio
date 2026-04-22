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

  const prevProject = idx > 0 ? DATA.projects[idx - 1] : null;
  const nextProject = idx < DATA.projects.length - 1 ? DATA.projects[idx + 1] : null;

  const hasLiveStats = "liveStats" in project && project.liveStats === true;
  const notes = "notes" in project ? (project as { notes?: string }).notes : undefined;

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
            <h1 style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
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
              const label = link.href ? `${link.type} ↗` : "Private repo";
              return link.href ? (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-xl link-underline"
                >
                  {label}
                </a>
              ) : (
                <span key={i} className="text-xl text-[color:var(--color-ink-faint)]">
                  🔒 {label}
                </span>
              );
            })}
          </div>
        </section>
      </Reveal>

      {notes && (
        <Reveal delay={220}>
          <section className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-2">
              <p className="meta">Notes</p>
            </div>
            <div className="md:col-span-10 max-w-3xl">
              {notes.split(/\n\n+/).map((para, i) => (
                <p
                  key={i}
                  className="text-[color:var(--color-ink)] [&:not(:first-child)]:mt-5"
                  style={{ fontSize: "var(--step-1)", lineHeight: 1.7 }}
                >
                  {para}
                </p>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {hasLiveStats && (
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

      {/* prev / next navigation */}
      <Reveal delay={280}>
        <nav
          aria-label="Project navigation"
          className="mt-20 grid grid-cols-2 gap-4 border-t border-[color:var(--color-rule)] pt-10"
        >
          <div>
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col gap-1"
              >
                <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
                  ← Prev
                </span>
                <span
                  className="text-[color:var(--color-ink-dim)] group-hover:text-[color:var(--color-mark)] transition-colors"
                  style={{ fontSize: "var(--step-1)" }}
                >
                  {prevProject.title}
                </span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col gap-1 items-end"
              >
                <span className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
                  Next →
                </span>
                <span
                  className="text-[color:var(--color-ink-dim)] group-hover:text-[color:var(--color-mark)] transition-colors"
                  style={{ fontSize: "var(--step-1)" }}
                >
                  {nextProject.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </Reveal>
    </article>
  );
}

export async function generateStaticParams() {
  return DATA.projects.map((p) => ({ slug: p.slug }));
}
