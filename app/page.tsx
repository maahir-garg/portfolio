import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { SelectedProjects } from "@/components/home/SelectedProjects";
import { PhotographyStrip } from "@/components/home/PhotographyStrip";
import { Colophon } from "@/components/home/Colophon";
import { FaqJsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      {/* FAQ schema kept invisible on the home page so name-search SERPs
          can still surface a rich-result block. The visible FAQ lives on
          /about. */}
      <FaqJsonLd
        items={[
          {
            question: "Who is Maahir Garg?",
            answer:
              "Maahir Garg is an AI Engineer at GIC and a Computer Science & Quantitative Finance student at the National University of Singapore (NUS), based in Singapore.",
          },
          {
            question: "Where does Maahir Garg work?",
            answer:
              "Maahir Garg works as an AI Engineer at GIC in Singapore, building agentic LLM tooling for classified-data environments.",
          },
          {
            question: "What is Maahir Garg known for?",
            answer:
              "Co-inventing a patent-pending multimodal hand-tracking framework on Apple Vision Pro for stroke rehabilitation, and building agentic LLM systems and a Claude Code-style CLI agent at GIC.",
          },
        ]}
      />
      <Hero />
      <SelectedWork />
      <SelectedProjects />
      <PhotographyStrip />
      <Colophon />
    </>
  );
}
