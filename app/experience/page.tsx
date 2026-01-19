"use client";

import { Container } from "@/components/ui/Container";
import { DATA } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";

export default function ExperiencePage() {
    return (
        <div className="py-20 md:py-32">
            <Container>
                <div className="flex flex-col gap-12 max-w-3xl mx-auto">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-ink">Experience</h1>
                        <p className="text-ink-muted text-lg">
                            My professional journey in engineering, research, and teaching.
                        </p>
                    </div>

                    <div className="relative border-l border-border ml-3 md:ml-6 space-y-12">
                        {DATA.work.map((role, index) => (
                            <div key={index} className="relative pl-8 md:pl-12">
                                {/* Timeline Dot */}
                                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-canvas"></span>

                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                        <h2 className="text-xl font-semibold text-ink">{role.company}</h2>
                                        <span className="text-xs font-mono text-ink-muted bg-card px-2 py-1 rounded border border-border">{role.start} - {role.end}</span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-accent font-medium">{role.title}</span>
                                        <span className="text-ink-muted text-sm">• {role.location}</span>
                                    </div>

                                    <p className="text-ink-muted leading-relaxed">
                                        {role.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}
