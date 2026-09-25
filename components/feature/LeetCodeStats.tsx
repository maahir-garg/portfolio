import { getLeetCodeStats } from "@/lib/leetcode";
import { LeetCodeStatsAnimated } from "./LeetCodeStatsAnimated";

export async function LeetCodeStats({ username }: { username: string }) {
  const stats = await getLeetCodeStats(username);

  if (!stats) {
    return (
      <p className="italic-serif text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)" }}>
        Live stats temporarily unreachable. They&apos;ll return.
      </p>
    );
  }

  return <LeetCodeStatsAnimated stats={stats} />;
}
