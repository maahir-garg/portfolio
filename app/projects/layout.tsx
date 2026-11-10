import type { Metadata } from "next";
import { DATA } from "@/lib/data";
import { absoluteUrl, ogImage } from "@/lib/site";

const images = ogImage("projects", "Things I've built. Projects by Maahir Garg.");

export const metadata: Metadata = {
  // A plain-string title here would replace the root layout's title OBJECT
  // for all child segments, so /projects/[slug] pages would lose the
  // "%s · Maahir Garg" template and render bare titles. Restate it.
  title: { default: "Projects", template: "%s · Maahir Garg" },
  description: `A running archive of ${DATA.projects.length} projects by Maahir Garg across ML/LLM, spatial computing, and data engineering. Some shipped, some stayed in a notebook.`,
  alternates: { canonical: absoluteUrl("/projects") },
  openGraph: {
    title: "Projects · Maahir Garg",
    description: `A running archive of ${DATA.projects.length} projects by Maahir Garg across ML/LLM, spatial computing, and data engineering.`,
    url: absoluteUrl("/projects"),
    type: "website",
    siteName: "Maahir Garg",
    locale: "en_SG",
    images,
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects · Maahir Garg",
    description: `A running archive of ${DATA.projects.length} projects by Maahir Garg across ML/LLM, spatial computing, and data engineering.`,
    images,
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
