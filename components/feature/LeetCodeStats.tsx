import { getLeetCodeStats } from "@/lib/leetcode";

export async function LeetCodeStats({ username }: { username: string }) {
  const stats = await getLeetCodeStats(username);

  if (!stats) {
    return (
      <p className="italic-serif text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)" }}>
        Live stats temporarily unreachable. They&apos;ll return.
      </p>
    );
  }

  const { totalSolved, easySolved, mediumSolved, hardSolved, ranking } = stats;
  const pct = (n: number) => (totalSolved > 0 ? (n / totalSolved) * 100 : 0);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {/* Solved ladder */}
      <div>
        <div className="flex items-baseline justify-between border-b border-[color:var(--color-rule)] pb-2">
          <p className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]">Solved</p>
          <p className="mono text-[color:var(--color-ink)]" style={{ fontSize: "var(--step-3)" }}>
            {totalSolved}
          </p>
        </div>

        <ul className="mt-4 space-y-4">
          {[
            { label: "Easy", value: easySolved },
            { label: "Medium", value: mediumSolved },
            { label: "Hard", value: hardSolved },
          ].map((row) => (
            <li key={row.label}>
              <div className="flex items-baseline justify-between mono text-[11px] uppercase tracking-[0.14em]">
                <span className="text-[color:var(--color-ink-dim)]">{row.label}</span>
                <span className="text-[color:var(--color-ink)]">{row.value}</span>
              </div>
              <div className="mt-2 h-px bg-[color:var(--color-rule)] relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-[color:var(--color-mark)]"
                  style={{ width: `${pct(row.value)}%`, height: "2px", top: "-0.5px" }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Ranking */}
      <div className="flex flex-col justify-between border-t border-[color:var(--color-rule)] pt-2 md:border-t-0 md:pt-0">
        <p className="mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-dim)]">Global rank</p>
        <p className="mono mt-2 text-[color:var(--color-ink)]" style={{ fontSize: "var(--step-5)", lineHeight: 1 }}>
          #{ranking.toLocaleString()}
        </p>
        <p className="mono mt-3 text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-faint)]">
          updates hourly
        </p>
      </div>
    </div>
  );
}
