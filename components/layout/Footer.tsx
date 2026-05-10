import Link from "next/link";
import { DATA } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-[color:var(--color-rule)]">
      <div className="container-page grid grid-cols-1 gap-10 py-14 md:grid-cols-12 md:gap-8">
        {/* signature */}
        <div className="md:col-span-4">
          <p className="text-[color:var(--color-ink)] text-2xl leading-[1.15]">
            Writing software.{" "}
            <em className="italic-serif">Reading light.</em>
          </p>
          <p className="meta mt-4 max-w-sm">
            By Maahir Garg · Built in Singapore · Next.js 16 · Typeset in Newsreader &amp; Geist
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="meta mb-3">Read</p>
          <ul className="space-y-2 text-[0.95rem]">
            <li>
              <Link href="/about" className="link-underline">
                About Maahir Garg
              </Link>
            </li>
            <li>
              <Link href="/experience" className="link-underline">
                Work experience
              </Link>
            </li>
            <li>
              <Link href="/projects" className="link-underline">
                Projects archive
              </Link>
            </li>
            <li>
              <Link href="/photography" className="link-underline">
                Photography
              </Link>
            </li>
            <li>
              <Link href="/now" className="link-underline">
                What I&apos;m on now
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="meta mb-3">Elsewhere</p>
          <ul className="space-y-2 text-[0.95rem]">
            <li>
              <a
                href={DATA.contact.social.GitHub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                GitHub ↗
              </a>
            </li>
            <li>
              <a
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a
                href="/maahir-garg-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>

        {/* reach */}
        <div className="md:col-span-3">
          <p className="meta mb-3">Write to me</p>
          <div className="flex flex-col gap-3">
            <Link href="/contact" className="group inline-flex items-baseline gap-2">
              <span className="text-2xl link-underline">Contact</span>
              <span className="text-[color:var(--color-mark)]">→</span>
            </Link>
            <a
              href={`mailto:${DATA.contact.email}`}
              className="group inline-flex items-baseline gap-2"
            >
              <span className="text-2xl link-underline">
                {DATA.contact.email}
              </span>
              <span className="text-[color:var(--color-mark)]">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* baseline */}
      <div className="border-t border-[color:var(--color-rule)]">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-5 text-[color:var(--color-ink-faint)] md:flex-row md:items-center">
          <p className="mono text-[11px] uppercase tracking-[0.12em]">
            © {year} Maahir Garg · v2 · no rights reserved, take what helps
          </p>
          <p className="mono text-[11px] uppercase tracking-[0.12em]">
            <a
              href="https://github.com/maahir-garg/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              View source ↗
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
