"use client";

import { Container } from "@/components/ui/Container";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";

export default function ExperiencePage() {
  return (
    <div className="py-20 md:py-32">
      <Container>
        <div className="space-y-8 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink">Experience</h1>
          <p className="text-ink-muted text-lg">
            Roles across AI, data, and teaching that shaped how I build and ship.
          </p>
        </div>
      </Container>

      <ExperienceTimeline />
    </div>
  );
}

