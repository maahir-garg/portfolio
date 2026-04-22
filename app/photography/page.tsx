import { PhotoGallery } from "@/components/photography/PhotoGallery";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Photography · Maahir Garg",
  description: "A working contact sheet of landscapes, streets, and portraits.",
};

export default function PhotographyPage() {
  return (
    <div className="container-page pt-6 pb-10">
      <Reveal>
        <header className="grid grid-cols-1 gap-4 border-b border-[color:var(--color-rule)] pb-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-2"><p className="meta">§ Photography</p></div>
          <div className="md:col-span-10">
            <h1 style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
              A <em className="italic-serif">contact sheet</em>, kept open.
            </h1>
            <p
              className="mt-6 max-w-2xl text-[color:var(--color-ink-dim)]"
              style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}
            >
              I carry a camera the way most of my friends carry a notebook.
              The frames below are out of order and out of context. That&apos;s
              the point. Click any one to read it larger.
            </p>
          </div>
        </header>
      </Reveal>

      <PhotoGallery />
    </div>
  );
}
