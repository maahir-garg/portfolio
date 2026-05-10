import type { Metadata } from "next";
import { DATA } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `A running archive of ${DATA.projects.length} projects by Maahir Garg across ML/LLM, spatial computing, and data engineering. Some shipped, some sat in a drawer, some became the curriculum.`,
  alternates: { canonical: absoluteUrl("/projects") },
  openGraph: {
    title: "Projects · Maahir Garg",
    description: `A running archive of ${DATA.projects.length} projects by Maahir Garg across ML/LLM, spatial computing, and data engineering.`,
    url: absoluteUrl("/projects"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects · Maahir Garg",
    description: `A running archive of ${DATA.projects.length} projects by Maahir Garg across ML/LLM, spatial computing, and data engineering.`,
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
