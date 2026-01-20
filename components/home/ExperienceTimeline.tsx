"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DATA } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function ExperienceTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const progressBar = progressBarRef.current;
        if (!container || !progressBar) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                progressBar,
                { scaleY: 0, transformOrigin: "top" },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    },
                }
            );
            const cards = gsap.utils.toArray(".timeline-card");
            cards.forEach((card) => {
                const cardEl = card as HTMLElement;
                const dot = cardEl.querySelector(".timeline-dot");

                gsap.to(dot, {
                    backgroundColor: "#6B8E78",
                    scale: 1.5,
                    boxShadow: "0 0 20px rgba(107, 142, 120, 0.6)",
                    duration: 0.3,
                    scrollTrigger: {
                        trigger: cardEl,
                        start: "top center",
                        end: "bottom center",
                        toggleActions: "play reverse play reverse",
                    },
                });

                gsap.from(cardEl.querySelector(".timeline-content"), {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardEl,
                        start: "top 80%",
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="relative">
                    <div className="flex flex-col gap-24">
                        {DATA.work.map((role, index) => (
                            <div
                                key={index}
                                className="timeline-card group grid grid-cols-1 md:grid-cols-[12rem_2.5rem_1fr] gap-6 md:gap-10"
                            >
                                <div className="hidden md:flex justify-end items-start pt-2 text-right">
                                    <span className="text-lg text-primary/40 font-mono tracking-tight group-hover:text-accent transition-colors whitespace-nowrap">
                                        {role.start} — {role.end}
                                    </span>
                                </div>

                                <div className="hidden md:flex relative justify-center">
                                    <div className="absolute inset-y-0 w-px bg-gradient-to-b from-primary/10 via-primary/20 to-primary/5" />
                                    
                                    {index === 0 && (
                                        <div
                                            ref={progressBarRef}
                                            className="absolute inset-y-0 w-px bg-gradient-to-b from-accent/60 via-accent/40 to-accent/20"
                                            style={{ transformOrigin: "top" }}
                                        />
                                    )}
                                    
                                    <div className="timeline-dot mt-[14px] w-3 h-3 rounded-full bg-primary/20 border border-background z-10 transition-colors" />
                                </div>

                                <div className="timeline-content px-4 md:px-0">
                                    <span className="md:hidden block mb-2 text-sm text-primary/40 font-mono">
                                        {role.start} — {role.end}
                                    </span>

                                    <h3 className="text-3xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
                                        {role.company}
                                    </h3>
                                    <p className="text-xl mt-2 text-primary/60">{role.title}</p>

                                    <p className="mt-6 text-primary/70 leading-relaxed font-light text-lg max-w-2xl">
                                        {role.description}
                                    </p>

                                    {role.href && (
                                        <Link
                                            href={role.href}
                                            target="_blank"
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary/40 hover:text-accent transition-colors"
                                            data-hover
                                        >
                                            Visit <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
