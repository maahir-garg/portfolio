"use client";

import { TransitionLink } from "@/components/motion/TransitionLink";
import { DATA } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  function openJumpBar() {
    window.dispatchEvent(new CustomEvent("mg:open-jumpbar"));
  }

  return (
    <footer className="mt-32 border-t border-[color:var(--color-rule)]">
      <div className="container-page grid grid-cols-1 gap-10 py-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <p className="text-[color:var(--color-ink)] text-2xl leading-[1.15]">
            Maahir Garg, <em className="italic-serif">in Singapore</em>
          </p>
          <p className="mt-4 max-w-sm text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)" }}>
            Lost? Press <kbd className="mono text-[0.85em]">⌘K</kbd> on a keyboard, or{" "}
            <button
              type="button"
              onClick={openJumpBar}
              className="inline-flex min-h-11 items-center py-2 text-[color:var(--color-ink)]"
            >
              <span className="link-underline">jump to&hellip;</span>
            </button>{" "}
            on a phone.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[color:var(--color-ink-dim)] mb-3" style={{ fontSize: "var(--step-0)" }}>Read</p>
          <ul className="text-[0.95rem]">
            <li><TransitionLink href="/about" className="flex min-h-11 items-center py-1"><span className="link-underline">About</span></TransitionLink></li>
            <li><TransitionLink href="/experience" className="flex min-h-11 items-center py-1"><span className="link-underline">Work</span></TransitionLink></li>
            <li><TransitionLink href="/projects" className="flex min-h-11 items-center py-1"><span className="link-underline">Projects</span></TransitionLink></li>
            <li><TransitionLink href="/photography" className="flex min-h-11 items-center py-1"><span className="link-underline">Photography</span></TransitionLink></li>
            <li><TransitionLink href="/now" className="flex min-h-11 items-center py-1"><span className="link-underline">Now</span></TransitionLink></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[color:var(--color-ink-dim)] mb-3" style={{ fontSize: "var(--step-0)" }}>Elsewhere</p>
          <ul className="text-[0.95rem]">
            <li>
              <a href={`mailto:${DATA.contact.email}`} className="flex min-h-11 items-center py-1">
                <span className="link-underline break-all">{DATA.contact.email}</span>
              </a>
            </li>
            <li>
              <a href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center py-1">
                <span className="link-underline">GitHub</span>
              </a>
            </li>
            <li>
              <a href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center py-1">
                <span className="link-underline">LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="/maahir-garg-resume.pdf" target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center py-1">
                <span className="link-underline">Resume (PDF)</span>
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
