"use client";

import { useState, useMemo } from "react";
import { DATA } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

type SkillsByCategory = typeof DATA.skills;

const CATEGORY_LABELS: Record<string, string> = {
  Programming: "Programming",
  "ML & AI": "ML & AI",
  "Data & Distributed": "Data & Distributed",
  "Cloud & DevOps": "Cloud & DevOps",
  "Web & DB": "Web & DB",
  Analysis: "Analysis",
  Tools: "Tools",
};

export function Skills({
  skills = DATA.skills,
}: {
  skills?: SkillsByCategory;
}) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const entries = useMemo(
    () => Object.entries(skills) as Array<[keyof SkillsByCategory, readonly string[]]>,
    [skills]
  );

  const visibleEntries =
    activeCategory === "All"
      ? entries
      : entries.filter(([category]) => String(category) === activeCategory);

  const categories = ["All", ...entries.map(([category]) => String(category))];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeCategory === category
                ? "bg-ink text-canvas border-ink"
                : "bg-card text-ink-muted border-border hover:border-ink/60"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills */}
      {activeCategory === "All" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {entries.map(([category, items]) => (
            <div
              key={String(category)}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">
                  {CATEGORY_LABELS[String(category)] ?? String(category)}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveCategory(String(category))}
                  className="text-xs text-ink-muted hover:text-ink transition-colors"
                >
                  View
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <Badge
                    key={`${String(category)}-${skill}`}
                    variant="secondary"
                    className="text-xs py-1 px-2"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">
              {CATEGORY_LABELS[activeCategory] ?? activeCategory}
            </h3>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="text-xs text-ink-muted hover:text-ink transition-colors"
            >
              Back to all
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(visibleEntries[0]?.[1] ?? []).map((skill) => (
              <Badge
                key={`${activeCategory}-${skill}`}
                variant="secondary"
                className="text-xs py-1 px-2"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


