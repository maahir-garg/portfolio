import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { DATA } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { WorkAndProjects } from "@/components/home/WorkAndProjects";
import { PhotographyStrip } from "@/components/home/PhotographyStrip";
import { Reveal } from "@/components/ui/Reveal";
import { PenNote } from "@/components/ui/RedPen";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl() },
};

export default function Home() {
  return (
    <>
      <Hero />
      <WorkAndProjects />
      <PhotographyStrip />

      {/* A short, warm close. Not a call to action, just a way out. */}
      <Reveal as="section" className="container-page mt-32 mb-16 md:mt-40">
        <div className="max-w-2xl border-t border-[color:var(--color-rule)] pt-10">
          <p
            className="text-[color:var(--color-ink-dim)]"
            style={{ fontSize: "var(--step-2)", lineHeight: 1.4 }}
          >
            If anything above is worth talking about,{" "}
            <a
              href={`mailto:${DATA.contact.email}`}
              className="link-underline text-[color:var(--color-ink)]"
            >
              {DATA.contact.email}
            </a>{" "}
            is the fastest way in.{" "}
            <PenNote seed={2}>I reply.</PenNote>
          </p>
          <p className="mt-6 text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)" }}>
            Otherwise, I&apos;m on{" "}
            <a
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline"
            >
              GitHub
            </a>{" "}
            and{" "}
            <a
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </Reveal>
    </>
  );
}
