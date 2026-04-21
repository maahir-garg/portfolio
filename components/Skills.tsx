"use client";

import { useMemo } from "react";
import { DATA } from "@/lib/data";

type SkillsByCategory = typeof DATA.skills;

export function Skills({ skills = DATA.skills }: { skills?: SkillsByCategory }) {
  const entries = useMemo(
    () => Object.entries(skills) as Array<[keyof SkillsByCategory, readonly string[]]>,
    [skills],
  );

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {entries.map(([category, items], i) => (
        <div key={String(category)}>
          <div className="flex items-baseline justify-between border-b border-[color:var(--color-rule)] pb-2">
            <h3 className="italic-serif text-[color:var(--color-ink)]" style={{ fontSize: "var(--step-2)" }}>
              {String(category)}
            </h3>
            <span className="mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
              {String(i + 1).padStart(2, "0")} · {String(items.length).padStart(2, "0")}
            </span>
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {items.map((s) => (
              <li
                key={s}
                className="text-[color:var(--color-ink-dim)]"
                style={{ fontSize: "var(--step-0)" }}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
