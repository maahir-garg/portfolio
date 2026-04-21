import Link from "next/link";
import { DATA } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-[color:var(--color-rule)]">
      <div className="container-page grid grid-cols-1 gap-10 py-14 md:grid-cols-12 md:gap-8">
        {/* signature */}
        <div className="md:col-span-5">
          <p className="italic-serif text-[color:var(--color-ink)] text-2xl leading-[1.15]">
            Writing software,
            <br />
            sometimes reading light.
          </p>
          <p className="meta mt-4 max-w-sm">
            Built in Singapore · Next.js 16 · Typeset in Newsreader &amp; Geist
          </p>
        </div>

        {/* elsewhere */}
        <div className="md:col-span-3">
          <p className="meta mb-3">Elsewhere</p>
          <ul className="space-y-2 text-[0.95rem]">
            <li>
              <a
                href={DATA.contact.social.GitHub.url}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline"
              >
                GitHub ↗
              </a>
            </li>
            <li>
              <a
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline"
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a
                href="https://leetcode.com/u/maahir_garg/"
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline"
              >
                LeetCode ↗
              </a>
            </li>
          </ul>
        </div>

        {/* reach */}
        <div className="md:col-span-4">
          <p className="meta mb-3">Write to me</p>
          <a
            href={`mailto:${DATA.contact.email}`}
            className="group inline-flex items-baseline gap-2"
          >
            <span className="italic-serif text-2xl link-underline">
              {DATA.contact.email}
            </span>
            <span className="text-[color:var(--color-mark)]">→</span>
          </a>
          <p className="meta mt-6">
            <Link href="/contact" className="link-underline">
              Or see all the ways to reach me
            </Link>
          </p>
        </div>
      </div>

      {/* baseline */}
      <div className="border-t border-[color:var(--color-rule)]">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-5 text-[color:var(--color-ink-faint)] md:flex-row md:items-center">
          <p className="mono text-[11px] uppercase tracking-[0.12em]">
            © {year} Maahir Garg · v2 · no rights reserved, take what helps
          </p>
          <p className="mono text-[11px] uppercase tracking-[0.12em]">
            <Link
              href="https://github.com/maahir-garg/portfolio"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              View source ↗
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
