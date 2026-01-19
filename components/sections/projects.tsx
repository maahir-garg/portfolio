"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
    return (
        <section id="projects" className="section-padding bg-gray-50">
            <Container>
                <SectionHeading>Selected Work</SectionHeading>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={project.link} className="block h-full cursor-default group">
                                <Card className="h-full flex flex-col justify-between hover:shadow-md transition-all duration-300">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-medium font-serif group-hover:underline decoration-1 underline-offset-4">
                                                {project.title}
                                            </h3>
                                            {project.link !== "#" && (
                                                <ArrowUpRight className="h-5 w-5 text-ink-muted group-hover:text-ink transition-colors" />
                                            )}
                                        </div>
                                        <p className="text-sm text-ink-muted line-clamp-4 mb-6">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-[10px] uppercase tracking-wide">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
