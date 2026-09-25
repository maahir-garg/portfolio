import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 · Not Found",
  description: "The page you were looking for does not exist on Maahir Garg's site.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-page pt-10 pb-20">
      <header className="border-b border-[color:var(--color-rule)] pb-10">
        <h1 style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
          This page <em className="italic-serif">doesn&apos;t exist</em>.
        </h1>
        <p className="mt-6 max-w-2xl text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}>
          The frame you&apos;re looking for isn&apos;t on this roll. It may
          have been moved, renamed, or never developed.
        </p>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/" className="link-underline text-[color:var(--color-ink)]" style={{ fontSize: "var(--step-1)" }}>
            Back to the homepage
          </Link>
          <Link href="/projects" className="link-underline text-[color:var(--color-ink-dim)]" style={{ fontSize: "var(--step-0)" }}>
            Browse projects
          </Link>
        </div>
      </header>
    </div>
  );
}
