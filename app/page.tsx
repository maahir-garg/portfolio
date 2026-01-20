"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DATA } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";

export default function Home() {
  const featuredProjects = DATA.projects.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background text-primary selection:bg-accent/30">
      {/* High-End Hero Section */}
      <Hero />

      {/* EXPERIENCE TIMELINE - The "Goated" Version */}
      <ExperienceTimeline />

      {/* FEATURED PROJECTS - Large & Scattered */}
      <section className="py-24 pb-48">
        <Container>
          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-6 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Selected Works</h2>
              <p className="text-xl text-primary/60 font-light leading-relaxed">
                Highlights from my journey in Spatial Computing and AI.
              </p>
            </div>

            <div className="flex flex-col gap-32">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Image Area (Placeholder for now until photos provided) */}
                  <div className="w-full md:w-3/5 aspect-video bg-secondary/30 rounded-lg overflow-hidden relative group">
                    {/* Overlay */}
                    <Link href={`/projects/${project.slug}`} className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" data-hover />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                      <span className="bg-white/90 text-black px-6 py-3 rounded-full text-sm font-medium tracking-wide">View Project</span>
                    </div>
                    {/* Placeholder graphic if no image */}
                    <div className="w-full h-full bg-gradient-to-br from-secondary/10 to-accent/5" />
                  </div>

                  {/* Text Area */}
                  <div className="w-full md:w-2/5 flex flex-col items-start justify-center gap-6">
                    <span className="font-mono text-accent text-sm tracking-widest uppercase">0{index + 1}</span>
                    <h3 className="text-4xl font-bold tracking-tighter leading-tight">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="text-sm border border-primary/10 px-3 py-1 rounded-full text-primary/60">{tech}</span>
                      ))}
                    </div>
                    <p className="text-lg text-primary/60 font-light">{project.description}</p>
                    <Link href={`/projects/${project.slug}`}>
                      <Button variant="outline" className="rounded-full px-8 mt-4 border-primary/20 hover:bg-primary hover:text-white transition-colors duration-500" data-hover>
                        Explore Case Study
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-24">
              <Link href="/projects">
                <Button size="lg" className="rounded-full px-12 h-16 text-lg bg-surface text-primary border border-primary/10 hover:bg-primary hover:text-white transition-all duration-500" data-hover>
                  View Archive
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
