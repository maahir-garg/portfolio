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
    const svgRef = useRef<SVGSVGElement>(null);
    const lineRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const line = lineRef.current;
        if (!container || !line) return;

        // Calculate total height dynamically or use resize observer if needed
        // For now assuming the content dictates height.

        const ctx = gsap.context(() => {
            // 1. Draw the line as we scroll
            const totalHeight = container.scrollHeight;

            // Set initial path length
            const length = line.getTotalLength();
            gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

            gsap.to(line, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                    markers: false, // set to true for debugging
                },
            });

            // 2. Pulse nodes when they hit center
            const cards = gsap.utils.toArray(".timeline-card");
            cards.forEach((card: any) => {
                const dot = card.querySelector(".timeline-dot");

                gsap.to(dot, {
                    backgroundColor: "#6B8E78", // Active color
                    scale: 1.5,
                    boxShadow: "0 0 20px rgba(107, 142, 120, 0.6)",
                    duration: 0.3,
                    scrollTrigger: {
                        trigger: card,
                        start: "top center",
                        end: "bottom center",
                        toggleActions: "play reverse play reverse",
                    },
                });

                // Fade in card content
                gsap.from(card.querySelector(".timeline-content"), {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
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
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-24">Experience</h2>

                <div className="relative">
                    {/* The Vertical Line (SVG) */}
                    <div className="absolute left-4 md:left-[14rem] top-0 bottom-0 w-px h-full pointer-events-none hidden md:block">
                        <svg
                            ref={svgRef}
                            className="absolute top-0 left-[-2px] overflow-visible w-[5px] h-full"
                            preserveAspectRatio="none"
                        // We'll set height dynamically or just let it overflow
                        >
                            <path
                                ref={lineRef}
                                d="M 2 0 V 3000" // A long vertical line, strictly vertical for now
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-primary/20"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>

                    <div className="flex flex-col gap-24">
                        {DATA.work.map((role, index) => (
                            <div key={index} className="timeline-card relative grid grid-cols-1 md:grid-cols-12 gap-8 group">
                                {/* 1. Date (Left Side) */}
                                <div className="hidden md:flex col-span-3 justify-end items-start pt-2 pr-12 text-right">
                                    <span className="text-lg text-primary/40 font-mono tracking-tight group-hover:text-accent transition-colors">
                                        {role.start} — {role.end}
                                    </span>
                                </div>

                                {/* 2. The Dot (Center) */}
                                <div className="hidden md:flex absolute top-[14px] left-[14rem] -translate-x-1/2 items-start justify-center">
                                    <div className="timeline-dot w-3 h-3 rounded-full bg-primary/20 border border-background z-10 transition-colors" />
                                </div>

                                {/* 3. Content (Right Side) */}
                                <div className="col-span-1 md:col-start-4 md:col-span-8 px-4 md:px-0 timeline-content">
                                    {/* Mobile Date */}
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
