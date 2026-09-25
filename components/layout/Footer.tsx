import Link from "next/link";
import { DATA } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-[color:var(--color-rule)]">
      <div className="container-page grid grid-cols-1 gap-10 py-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <p className="text-[color:var(--color-ink)] text-2xl leading-[1.15]">
            Writing software. <em className="italic-serif">Reading light.</em>
          </p>
          <p className="mt-4 max-w-sm text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)" }}>
            Marked in red pen, mostly during TA office hours.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[color:var(--color-ink-dim)] mb-3" style={{ fontSize: "var(--step-0)" }}>Read</p>
          <ul className="space-y-2 text-[0.95rem]">
            <li><Link href="/about" className="link-underline">About</Link></li>
            <li><Link href="/experience" className="link-underline">Work</Link></li>
            <li><Link href="/projects" className="link-underline">Projects</Link></li>
            <li><Link href="/photography" className="link-underline">Photography</Link></li>
            <li><Link href="/now" className="link-underline">Now</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[color:var(--color-ink-dim)] mb-3" style={{ fontSize: "var(--step-0)" }}>Elsewhere</p>
          <ul className="space-y-2 text-[0.95rem]">
            <li>
              <a href={`mailto:${DATA.contact.email}`} className="link-underline break-all">
                {DATA.contact.email}
              </a>
            </li>
            <li>
              <a href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                GitHub
              </a>
            </li>
            <li>
              <a href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="/maahir-garg-resume.pdf" target="_blank" rel="noopener noreferrer" className="link-underline">
                Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-rule)]">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-5 text-[color:var(--color-ink-faint)] md:flex-row md:items-center">
          <p style={{ fontSize: "var(--step--1)" }}>&copy; {year} Maahir Garg</p>
        </div>
      </div>
    </footer>
  );
}
