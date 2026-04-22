"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { label: "Work", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Photography", href: "/photography" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "bg-[color:var(--color-canvas)]/85 backdrop-blur-md border-b border-[color:var(--color-rule)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          className="group inline-flex items-baseline gap-2"
          aria-label="Home · Maahir Garg"
        >
          <span className="text-[color:var(--color-ink)] text-[1.05rem] leading-none">
            Maahir Garg
          </span>
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-faint)]">
            /mg
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="group relative inline-flex items-baseline gap-1.5 text-[0.92rem] text-[color:var(--color-ink-dim)] transition-colors hover:text-[color:var(--color-ink)]"
            >
              <span className="mono text-[10px] text-[color:var(--color-ink-faint)] tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`link-underline ${
                  isActive(item.href) ? "text-[color:var(--color-ink)]" : ""
                }`}
                style={
                  isActive(item.href)
                    ? { backgroundSize: "100% 1px", backgroundImage: "linear-gradient(var(--color-mark), var(--color-mark))", color: "var(--color-ink)" }
                    : undefined
                }
              >
                {item.label}
              </span>
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="mono inline-flex h-8 items-center gap-1.5 rounded-full border border-[color:var(--color-rule)] px-3 text-[11px] uppercase tracking-wider text-[color:var(--color-ink)]"
          >
            <span className="relative inline-block h-3 w-4" aria-hidden>
              <span
                className="absolute left-0 right-0 top-0.5 h-px bg-current transition-transform duration-300"
                style={open ? { transform: "translateY(5px) rotate(45deg)" } : undefined}
              />
              <span
                className="absolute left-0 right-0 bottom-0.5 h-px bg-current transition-transform duration-300"
                style={open ? { transform: "translateY(-5px) rotate(-45deg)" } : undefined}
              />
            </span>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden border-t border-[color:var(--color-rule)] transition-[max-height,opacity] duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-page flex flex-col py-4" aria-label="Mobile">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3 py-3 text-[color:var(--color-ink)]"
            >
              <span className="mono text-[11px] text-[color:var(--color-ink-faint)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-2xl">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
