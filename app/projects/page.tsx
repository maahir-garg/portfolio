"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/feature/ProjectCard";
import { Button } from "@/components/ui/Button";
import { DATA } from "@/lib/data";

const categories = ["All", "AI/ML", "Swift", "Web Scraping", "Academic"];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = DATA.projects.filter((project) => {
        if (activeCategory === "All") return true;

        // Simple tagging logic based on keywords in technologies or description
        // In a real app, I'd add a 'category' field to the data. 
        // Inferring for now based on tech stack.
        const techString = project.technologies.join(" ").toLowerCase();
        const descString = project.description.toLowerCase();

        if (activeCategory === "AI/ML") return techString.includes("ai") || techString.includes("llm") || techString.includes("python");
        if (activeCategory === "Swift") return techString.includes("swift") || techString.includes("ios");
        if (activeCategory === "Web Scraping") return descString.includes("scraping") || techString.includes("scraping");
        if (activeCategory === "Academic") return descString.includes("study") || descString.includes("research") || techString.includes("jupyter");

        return true;
    });

    return (
        <div className="py-20 md:py-32">
            <Container>
                <div className="flex flex-col gap-12">
                    <div className="space-y-4 max-w-2xl">
                        <h1 className="text-4xl font-bold tracking-tight text-ink">All Projects</h1>
                        <p className="text-ink-muted text-lg">
                            A comprehensive collection of my engineering work, research, and experiments.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? "primary" : "outline"}
                                size="sm"
                                onClick={() => setActiveCategory(category)}
                                className="rounded-full"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ProjectCard
                                        title={project.title}
                                        description={project.description}
                                        tags={project.technologies}
                                        links={project.links}
                                        href={`/projects/${project.slug}`}
                                        active={project.active}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20 text-ink-muted">
                            No projects found in this category.
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
