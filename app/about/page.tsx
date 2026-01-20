"use client";

import { Container } from "@/components/ui/Container";
import { DATA } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Skills } from "@/components/Skills";

export default function AboutPage() {
    return (
        <div className="py-20 md:py-32">
            <Container>
                <div className="flex flex-col gap-20 max-w-3xl mx-auto">
                    {/* Intro */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold tracking-tight text-ink">About Me</h1>
                        <div className="prose prose-invert max-w-none text-ink-muted text-lg leading-relaxed">
                            <p>{DATA.summary}</p>
                            <p>
                                I care about clear thinking, good engineering trade-offs, and shipping things that people
                                actually use. Outside of work, I spend time shooting photos, playing badminton and chess,
                                and watching way too much F1.
                            </p>
                        </div>

                        <div className="pt-8">
                            <Skills />
                        </div>
                    </div>

                    {/* Education */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-ink">Education</h2>
                        <div className="grid gap-6">
                            {DATA.education.map((edu, index) => (
                                <div key={index} className="flex flex-col sm:flex-row gap-4 p-6 bg-card rounded-xl border border-border">
                                    <div className="h-12 w-12 rounded bg-ink/5 flex items-center justify-center text-xs font-bold shrink-0 border border-border">
                                        MUS
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-ink">{edu.school}</h3>
                                            <span className="text-sm text-ink-muted">{edu.start} - {edu.end}</span>
                                        </div>
                                        <p className="text-accent">{edu.degree}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Connect CTA */}
                    <div className="p-8 bg-accent/5 rounded-2xl border border-accent/10 text-center space-y-4">
                        <h2 className="text-2xl font-bold text-ink">Let&apos;s connect</h2>
                        <p className="text-ink-muted">
                            I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>
                        <Link href="/contact">
                            <Button size="lg">Get in Touch</Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}
