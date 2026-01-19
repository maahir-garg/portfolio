"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
            },
        }),
    };

    return (
        <section
            ref={ref}
            className="min-h-screen flex items-center pt-20 pb-20 md:pt-32"
        >
            <Container>
                <div className="max-w-3xl">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={fadeUpVariants}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight mb-6 text-balance text-ink">
                            {personalInfo.headline}
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={1}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={fadeUpVariants}
                    >
                        <p className="text-lg md:text-xl text-ink-muted mb-8 leading-relaxed max-w-2xl text-balance">
                            {personalInfo.subhead}
                        </p>
                    </motion.div>

                    <motion.div
                        custom={2}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={fadeUpVariants}
                        className="flex flex-wrap gap-4 items-center"
                    >
                        <Button asChild size="lg" className="rounded-full">
                            <Link href="#experience">
                                View Work
                                <ArrowDown className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="rounded-full">
                            <Link href="#contact">Contact Me</Link>
                        </Button>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
