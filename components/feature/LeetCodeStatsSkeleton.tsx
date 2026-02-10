import { Card } from "@/components/ui/Card";

export function LeetCodeStatsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
            <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-8 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>

                <div className="space-y-4 pt-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between">
                                <div className="h-3 w-10 bg-slate-200 dark:bg-slate-800 rounded" />
                                <div className="h-3 w-8 bg-slate-200 dark:bg-slate-800 rounded" />
                            </div>
                            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full" />
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="p-6 flex flex-col items-center justify-center space-y-4">
                <div className="h-14 w-14 bg-slate-200 dark:bg-slate-800 rounded-full" />
                <div className="space-y-2 flex flex-col items-center">
                    <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
            </Card>
        </div>
    );
}
