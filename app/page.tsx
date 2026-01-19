"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DATA } from "@/lib/data";
import { ProjectCard } from "@/components/feature/ProjectCard";

export default function Home() {
  const featuredProjects = DATA.projects.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="py-20 md:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 max-w-2xl"
          >
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="py-1 px-3 text-sm border-accent/30 text-accent bg-accent/5">
                Available for collaborations
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-ink">
              Building intelligent systems and immersive experiences.
            </h1>

            <p className="text-lg md:text-xl text-ink-muted leading-relaxed">
              I'm <span className="text-ink font-medium">{DATA.name}</span>, an AI Engineer and Computer Science Student at NUS.
              I specialize in <span className="text-ink decoration-accent/30 underline decoration-2 underline-offset-4">Large Language Models</span> and <span className="text-ink decoration-accent/30 underline decoration-2 underline-offset-4">Spatial Computing</span>.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/projects">
                <Button size="lg" className="group">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href={DATA.contact.social.GitHub.url} target="_blank">
                <Button variant="outline" size="lg">
                  GitHub Profile
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* RECENT WORK SECTION */}
      <section className="py-16 bg-card/30 border-y border-border/50">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Recent Experience</h2>
            <Link href="/experience" className="text-sm font-medium text-accent hover:text-accent-light flex items-center">
              View Full Timeline <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DATA.work.slice(0, 4).map((role, index) => (
              <div key={index} className="flex gap-4 p-4 border border-border/50 rounded-lg hover:bg-card/50 transition-colors">
                {/* We could use Next.js Image here if we had logos, using initials for now or skeleton */}
                <div className="h-12 w-12 rounded-full bg-ink/5 flex items-center justify-center text-xs font-bold shrink-0 border border-border">
                  {role.company.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-sm">{role.company}</h3>
                  <p className="text-xs text-ink-muted">{role.title}</p>
                  <p className="text-xs text-ink-muted mt-1">{role.start} - {role.end}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24">
        <Container>
          <div className="flex flex-col gap-12">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
              <p className="text-ink-muted">
                A selection of my recent work in AI, Swift development, and data engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  tags={project.technologies}
                  links={project.links}
                  href={`/projects/${project.slug}`}
                  dates={project.dates}
                  active={project.active}
                />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link href="/projects">
                <Button variant="outline" className="w-full md:w-auto">
                  View All Projects
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
