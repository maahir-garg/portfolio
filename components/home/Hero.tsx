"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { HeroBackground } from "@/components/layout/HeroBackground";
import { Button } from "@/components/ui/Button";
import { ArrowDownRight } from "lucide-react";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.delay(0.2);

            tl.from(".title-line-1 .char", {
                y: 100,
                opacity: 0,
                stagger: 0.05,
                duration: 1,
                ease: "power4.out",
            });

            tl.from(
                ".title-line-2 .char",
                {
                    y: 100,
                    opacity: 0,
                    stagger: 0.05,
                    duration: 1,
                    ease: "power4.out",
                },
                "-=0.8"
            );

            tl.from(
                subRef.current,
                {
                    y: 20,
                    opacity: 0,
                    duration: 1,
                },
                "-=0.5"
            );

            tl.from(
                btnRef.current,
                {
                    y: 20,
                    opacity: 0,
                    duration: 1,
                },
                "-=0.8"
            );

            tl.from(
                ".status-dot",
                {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                },
                "-=0.5"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const splitText = (text: string, className: string) => (
        <span className={`inline-block overflow-hidden ${className}`}>
            {text.split("").map((char, i) => (
                <span key={i} className="char inline-block translate-y-0">
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden"
        >
            <HeroBackground />

            <div className="z-10 flex flex-col items-start select-none text-primary">
                <div className="relative">
                    <h1 className="text-[10vw] md:text-[7vw] lg:text-[5.5vw] font-bold leading-[0.9] tracking-tighter text-primary flex flex-col">
                        {splitText("MAAHIR", "title-line-1")}
                        {splitText("GARG", "title-line-2")}
                    </h1>
                    
                    {/* Green Status Dot */}
                    <span className="status-dot absolute -right-8 top-4 md:-right-12 md:top-6 flex h-3 w-3 md:h-4 md:w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-accent shadow-lg"></span>
                    </span>
                </div>

                <div
                    ref={subRef}
                    className="mt-6 md:mt-10 text-lg md:text-xl font-light text-primary/90 max-w-xl leading-relaxed"
                >
                    <p>
                        AI & ML engineer focused on LLMs, optimization, and vision.
                        <br />
                        I like building systems that are fast, reliable, and actually shippable.
                        <br />
                        <span className="text-accent/90">Capturing moments through the lens when I&apos;m not coding.</span>
                    </p>
                </div>

                <div ref={btnRef} className="mt-12 flex flex-wrap items-center gap-4 md:gap-6">
                    <Link href="/projects" data-hover>
                        <Button size="lg" className="rounded-full px-8 text-base md:text-lg h-12 md:h-14">
                            View Work
                        </Button>
                    </Link>
                    <Link
                        href="/photography"
                        className="text-base md:text-lg font-medium text-primary/80 hover:text-accent transition-colors"
                        data-hover
                    >
                        Photography
                    </Link>
                    <Link
                        href="/#about"
                        className="group flex items-center gap-2 text-base md:text-lg font-medium text-primary/80 hover:text-accent transition-colors"
                        data-hover
                    >
                        <span>About me</span>
                        <ArrowDownRight className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform duration-300" />
                    </Link>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-primary/30">
                <ArrowDownRight className="w-6 h-6 rotate-45" />
            </div>
        </section>
    );
}
