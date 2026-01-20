"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/home/Hero";
import Link from "next/link";
import { DATA } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-primary selection:bg-accent/30">
      {/* Hero Section */}
      <Hero />

      {/* About Snapshot */}
      <section id="about" className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">About</h2>
            <p className="mt-6 text-xl text-primary/60 font-light leading-relaxed">
              {DATA.summary}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/about">
                <Button variant="outline" className="rounded-full px-8" data-hover>
                  Read the full story
                </Button>
              </Link>
              <Link href="/projects">
                <Button className="rounded-full px-8" data-hover>
                  Browse projects
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl rounded-2xl border border-primary/10 bg-surface/40 p-10 md:p-14">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Let&apos;s build something</h2>
            <p className="mt-6 text-xl text-primary/60 font-light leading-relaxed">
              If you&apos;re hiring, collaborating, or want to talk ML, LLMs, or vision, drop me a note.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-10" data-hover>
                  Contact
                </Button>
              </Link>
              <a href={`mailto:${DATA.contact.email}`} data-hover>
                <Button size="lg" variant="outline" className="rounded-full px-10">
                  Email me
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
