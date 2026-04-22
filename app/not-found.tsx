import Link from "next/link";

export const metadata = {
  title: "404 · Not Found · Maahir Garg",
};

export default function NotFound() {
  return (
    <div className="container-page pt-10 pb-20">
      <header className="grid grid-cols-1 gap-4 border-b border-[color:var(--color-rule)] pb-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-2">
          <p className="meta">§ 404</p>
        </div>
        <div className="md:col-span-10">
          <h1 style={{ fontSize: "var(--step-5)", lineHeight: 1.03 }}>
            This page <em className="italic-serif">doesn&apos;t exist</em>.
          </h1>
          <p
            className="mt-6 max-w-2xl text-[color:var(--color-ink-dim)]"
            style={{ fontSize: "var(--step-1)", lineHeight: 1.6 }}
          >
            The frame you&apos;re looking for isn&apos;t on this roll. It may
            have been moved, renamed, or never developed.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[color:var(--color-ink)]"
              style={{ fontSize: "var(--step-1)" }}
            >
              <span className="link-underline">Back to the homepage</span>
              <span className="text-[color:var(--color-mark)] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/projects"
              className="mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-ink-dim)] link-underline self-center"
            >
              Browse projects ↗
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
