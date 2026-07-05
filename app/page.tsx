import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { SelectedProjects } from "@/components/home/SelectedProjects";
import { PhotographyStrip } from "@/components/home/PhotographyStrip";
import { Colophon } from "@/components/home/Colophon";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl() },
};

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <SelectedProjects />
      <PhotographyStrip />
      <Colophon />
    </>
  );
}
