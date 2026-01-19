"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { experience } from "@/lib/data";
import { motion, useScroll, useSpring } from "framer-motion";

export function Experience() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <section id="experience" className="section-padding relative">
            <Container>
                <SectionHeading>Work Experience</SectionHeading>
                <div ref={ref} className="space-y-12 relative pl-8 ml-4 md:ml-0 md:pl-0">
                    {/* Animated Line */}
                    <motion.div
                        style={{ scaleY }}
                        className="absolute left-[20px] top-2 bottom-2 w-0.5 bg-ink origin-top md:left-1/2 md:-translate-x-1/2"
                    />
                    {/* Static background line for reference */}
                    <div className="absolute left-[20px] top-2 bottom-2 w-0.5 bg-border -z-10 md:left-1/2 md:-translate-x-1/2" />

                    {experience.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            <div className="flex-1">
                                <Card className="flex flex-col gap-2 relative">
                                    {/* Dot */}
                                    <div className="absolute top-6 -left-[45px] w-4 h-4 rounded-full bg-canvas border-2 border-ink md:hidden" />

                                    {/* Desktop Dot */}
                                    <div className={`hidden md:block absolute top-6 w-4 h-4 rounded-full bg-canvas border-2 border-ink z-10 
                    ${index % 2 === 0 ? "-left-[calc(2rem_+_9px)]" : "-right-[calc(2rem_+_9px)]"}
                  `} />

                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-ink hover:text-accent transition-colors">
                                                {item.role}
                                            </h3>
                                            <p className="text-ink font-medium font-serif italic text-base">
                                                {item.company}
                                            </p>
                                        </div>
                                        <span className="text-xs font-mono text-ink-muted bg-gray-100 px-2 py-1 rounded-sm uppercase tracking-wide">
                                            {item.period}
                                        </span>
                                    </div>
                                    <p className="text-sm text-ink-muted leading-relaxed mt-2">
                                        {item.description}
                                    </p>
                                </Card>
                            </div>
                            <div className="flex-1 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
