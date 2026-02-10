import { getLeetCodeStats } from "@/lib/leetcode";
import { Card } from "@/components/ui/Card";
import { Trophy, Activity } from "lucide-react";

export async function LeetCodeStats({ username }: { username: string }) {
    const stats = await getLeetCodeStats(username);

    if (!stats) {
        return (
            <Card className="p-6 bg-paper-light border-border/50">
                <div className="flex flex-col items-center justify-center text-center space-y-2 py-4">
                    <Activity className="h-8 w-8 text-ink-muted/50" />
                    <p className="text-ink-muted">Live stats currently unavailable.</p>
                </div>
            </Card>
        );
    }

    const { totalSolved, easySolved, mediumSolved, hardSolved, ranking } = stats;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-accent" />
                        Total Solved
                    </h3>
                    <span className="text-2xl font-bold text-ink">{totalSolved}</span>
                </div>

                <div className="space-y-3 pt-2">
                    {/* Easy */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-emerald-600 font-medium">Easy</span>
                            <span className="text-ink-muted">{easySolved}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${totalSolved > 0 ? (easySolved / totalSolved) * 100 : 0}%` }}
                            />
                        </div>
                    </div>

                    {/* Medium */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-amber-500 font-medium">Medium</span>
                            <span className="text-ink-muted">{mediumSolved}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-amber-500 rounded-full"
                                style={{ width: `${totalSolved > 0 ? (mediumSolved / totalSolved) * 100 : 0}%` }}
                            />
                        </div>
                    </div>

                    {/* Hard */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-rose-500 font-medium">Hard</span>
                            <span className="text-ink-muted">{hardSolved}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-rose-500 rounded-full"
                                style={{ width: `${totalSolved > 0 ? (hardSolved / totalSolved) * 100 : 0}%` }}
                            />
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                <div className="p-3 rounded-full bg-accent/10 text-accent mb-1">
                    <Activity size={32} />
                </div>
                <p className="text-sm font-medium text-ink-muted uppercase tracking-wider">Global Ranking</p>
                <p className="text-4xl font-bold text-ink tracking-tight">#{ranking.toLocaleString()}</p>
            </Card>
        </div>
    );
}
