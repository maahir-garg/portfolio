import type { Metadata } from "next";
import { DATA } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: `A running archive of ${DATA.projects.length} projects — ML/LLM, spatial computing, data engineering, and more. Some shipped, some sat in a drawer, some became the curriculum.`,
  alternates: { canonical: "https://maahir-garg.vercel.app/projects" },
  openGraph: {
    title: "Projects · Maahir Garg",
    description: `A running archive of ${DATA.projects.length} projects — ML/LLM, spatial computing, data engineering, and more.`,
    url: "https://maahir-garg.vercel.app/projects",
    type: "website",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
