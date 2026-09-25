"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PenUnderline } from "@/components/ui/RedPen";

const nav = [
  { label: "Now", href: "/now" },
  { label: "Work", href: "/experience" },
  { label: "Photography", href: "/photography" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape and return focus to the toggle button.
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
        <Link href="/" className="text-[color:var(--color-ink)] text-[1.05rem] leading-none" aria-label="Home">
          Maahir Garg
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex lg:gap-8">
          {nav.map((item, i) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="text-[0.92rem] text-[color:var(--color-ink-dim)] transition-colors hover:text-[color:var(--color-ink)]"
                style={active ? { color: "var(--color-ink)" } : undefined}
              >
                {active ? <PenUnderline seed={i}>{item.label}</PenUnderline> : item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
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
      {open && (
        <div className="md:hidden overflow-hidden border-t border-[color:var(--color-rule)]">
          <nav id="mobile-navigation" className="container-page flex flex-col py-4" aria-label="Mobile">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                ref={i === 0 ? firstLinkRef : undefined}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="py-3 text-2xl text-[color:var(--color-ink)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
