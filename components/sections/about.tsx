"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { personalInfo, skills } from "@/lib/data";
import { motion } from "framer-motion";

export function About() {
    return (
        <section id="about" className="section-padding scroll-mt-20">
            <Container>
                <div className="grid md:grid-cols-[2fr,1fr] gap-12 items-start">
                    <div>
                        <SectionHeading>About Me</SectionHeading>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="prose prose-lg text-ink-muted leading-relaxed"
                        >
                            <p>{personalInfo.about}</p>
                        </motion.div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted mb-4">
                            Core Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Badge variant="default" className="text-sm py-1 px-3">
                                        {skill}
                                    </Badge>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
