"use client";

import Link from "next/link";
import { DATA } from "@/lib/data";
import { GradeMark, type GradeKind } from "@/components/ui/RedPen";

type Grade = { kind: GradeKind; word?: string };

type Row =
  | { kind: "role"; key: string; title: string; sub: string; dates: string; href: string; description: string; grade: Grade }
  | { kind: "project"; key: string; title: string; sub: string; dates: string; href: string; description: string; grade: Grade };

const FEATURED_ROLES = [
  "AI Centre for Educational Technologies, Team Koditsu",
  "GIC",
  "Interactive 3D Lab, in collaboration with Apple",
  "NUS, School of Computing",
];

// Display names for the home list; the full names live on /experience.
const SHORT_NAMES: Record<string, string> = {
  "AI Centre for Educational Technologies, Team Koditsu": "AICET, Team Koditsu",
  "Interactive 3D Lab, in collaboration with Apple": "Interactive 3D Lab, with Apple",
  "NUS, School of Computing": "NUS Computing",
};

const FEATURED_PROJECTS = [
  "pgpals",
  "traders-edge",
  "prediction-market-arbitrage",
  "bert-qa-quant-prune",
];

/**
 * One editorial list mixing roles and projects, in place of the old
 * "Selected works" / "Projects, annotated" sections. Every row is a plain
 * link to the full write-up; no eyebrow labels, no arrows, no index
 * numbers. Dates stay mono (the one genuinely tabular thing here).
 */
export function WorkAndProjects() {
  const roles = FEATURED_ROLES
    .map((company) => DATA.work.find((r) => r.company === company && r.featured))
    .filter((r): r is (typeof DATA.work)[number] => Boolean(r));

  const projects = FEATURED_PROJECTS
    .map((slug) => DATA.projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof DATA.projects)[number] => Boolean(p));

  // Non-current roles alternate between a tick and a circled date, so the
  // list doesn't read as five margin notes in a row; current roles and
  // every project get a true, dry status word instead.
  let untickedCount = 0;
  const rows: Row[] = [];
  const max = Math.max(roles.length, projects.length);
  for (let i = 0; i < max; i++) {
    const role = roles[i];
    if (role) {
      const grade: Grade = role.current
        ? { kind: "note", word: "still going" }
        : { kind: untickedCount++ % 2 === 0 ? "tick" : "circle" };
      rows.push({
        kind: "role",
        key: `role-${role.company}`,
        title: SHORT_NAMES[role.company] ?? role.company,
        sub: role.title,
        dates: role.dates.replace("Present", "now"),
        href: "/experience",
        description: role.description,
        grade,
      });
    }
    const project = projects[i];
    if (project) {
      const word =
        project.slug === "pgpals" ? "offline now" : project.active ? "in progress" : "shipped";
      rows.push({
        kind: "project",
        key: `project-${project.slug}`,
        title: project.title,
        sub: project.technologies.slice(0, 3).join(", "),
        dates: project.dates,
        href: `/projects/${project.slug}`,
        description: project.description,
        grade: { kind: "note", word },
      });
    }
  }

  return (
    <section className="container-page mt-32 md:mt-40">
      <header className="border-b border-[color:var(--color-rule)] pb-8">
        <h2 style={{ fontSize: "var(--step-4)" }}>
          Things I&apos;ve been <em className="italic-serif">working on</em>
        </h2>
      </header>

      <ol>
        {rows.map((row, i) => (
          <li key={row.key} className="border-b border-[color:var(--color-rule)]">
            <Link
              href={row.href}
              className="group grid grid-cols-1 gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-9"
            >
              <div className="md:col-span-2 flex flex-col gap-1">
                <span className="italic-serif text-[color:var(--color-ink-faint)]" style={{ fontSize: "var(--step-0)" }}>
                  {row.kind === "role" ? "Role" : "Project"}
                </span>
                {row.grade.kind === "circle" ? (
                  <GradeMark kind="circle" seed={i}>
                    <span className="mono text-[0.8rem] text-[color:var(--color-ink-dim)]">
                      {row.dates}
                    </span>
                  </GradeMark>
                ) : (
                  <span className="mono text-[0.8rem] text-[color:var(--color-ink-dim)]">
                    {row.dates}
                  </span>
                )}
              </div>

              <div className="md:col-span-10">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3
                    className="text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-mark)]"
                    style={{ fontSize: "var(--step-3)" }}
                  >
                    {row.title}
                    {row.grade.kind === "tick" && <GradeMark kind="tick" seed={i} />}
                  </h3>
                  <p className="text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)" }}>
                    {row.sub}
                  </p>
                  {row.grade.kind === "note" && (
                    <GradeMark kind="note" seed={i} word={row.grade.word} className="ml-1" />
                  )}
                </div>
                <p
                  className="mt-3 max-w-2xl text-[color:var(--color-ink-dim)]"
                  style={{ fontSize: "var(--step-0)", lineHeight: 1.6 }}
                >
                  {row.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)" }}>
        <Link href="/experience" className="link-underline text-[color:var(--color-ink)]">
          the rest of the roles
        </Link>
        <Link href="/projects" className="link-underline text-[color:var(--color-ink)]">
          the rest of the projects
        </Link>
      </p>
    </section>
  );
}
