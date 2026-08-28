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
    <div className="divide-y divide-[color:var(--color-rule)] border-y border-[color:var(--color-rule)]">
      {entries.map(([category, items]) => (
        <div key={String(category)} className="grid grid-cols-1 gap-2 py-5 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <h3 className="text-[color:var(--color-ink)]" style={{ fontSize: "var(--step-0)" }}>
              {String(category)}
            </h3>
          </div>
          <ul className="flex min-w-0 flex-wrap gap-x-2 gap-y-1 md:col-span-9">
            {items.map((s) => (
              <li
                key={s}
                className="break-words text-[color:var(--color-ink-dim)] after:ml-2 after:content-['·'] last:after:content-none"
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
