"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PenUnderline } from "@/components/ui/RedPen";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { SPRINGS } from "@/components/motion/tokens";

const nav = [
  { label: "Now", href: "/now" },
  { label: "Work", href: "/experience" },
  { label: "Photography", href: "/photography" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

const sheetVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: SPRINGS.gentle },
};

export function Header() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close on route change (covers link clicks and back/forward). Derived
  // during render rather than an effect, per React's "adjusting state
  // when a prop changes" pattern - no setState-in-effect cascade.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Focus trap + Escape-to-close. Focuses the first link on open, returns
  // focus to the toggle button on close.
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    if (!sheet) return;

    function focusables(): HTMLElement[] {
      if (!sheet) return [];
      return Array.from(
        sheet.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((el) => el.offsetParent !== null);
    }

    const raf = requestAnimationFrame(() => focusables()[0]?.focus());

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function openJumpBar() {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("mg:open-jumpbar"));
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "bg-[color:var(--color-canvas)]/85 backdrop-blur-md border-b border-[color:var(--color-rule)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-14 items-center justify-between gap-6">
        <TransitionLink
          href="/"
          className="flex min-h-11 items-center text-[color:var(--color-ink)] text-[1.05rem] leading-none"
          aria-label="Home"
        >
          Maahir Garg
        </TransitionLink>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex lg:gap-8">
          {nav.map((item, i) => {
            const active = isActive(item.href);
            return (
              <TransitionLink
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="text-[0.92rem] text-[color:var(--color-ink-dim)] transition-colors hover:text-[color:var(--color-ink)]"
                style={active ? { color: "var(--color-ink)" } : undefined}
              >
                {active ? <PenUnderline seed={i}>{item.label}</PenUnderline> : item.label}
              </TransitionLink>
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
            className="mono inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border border-[color:var(--color-rule)] px-3 text-[11px] uppercase tracking-wider text-[color:var(--color-ink)]"
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
    </header>

      {/* Mobile menu: a full-height paper sheet, not a dropdown. Rendered
          as a sibling of <header>, not inside it - once `open` is true
          the header picks up `backdrop-blur-md`, and `backdrop-filter`
          makes an element a new containing block for its `fixed`
          descendants, which would collapse this sheet's `inset-0` down
          to the header's own ~56px bar instead of the viewport. */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={sheetRef}
            id="mobile-navigation"
            className="md:hidden fixed inset-0 top-14 z-30 overflow-y-auto border-t border-[color:var(--color-rule)] bg-[color:var(--color-canvas)]"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            variants={reducedMotion ? undefined : sheetVariants}
            initial={reducedMotion ? { opacity: 1 } : "hidden"}
            animate={reducedMotion ? { opacity: 1 } : "visible"}
            exit={reducedMotion ? { opacity: 0 } : "hidden"}
            transition={reducedMotion ? { duration: 0 } : undefined}
          >
            <nav aria-label="Mobile" className="container-page flex flex-col py-6">
              {nav.map((item) => (
                <motion.div key={item.href} variants={reducedMotion ? undefined : rowVariants}>
                  <TransitionLink
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex min-h-11 items-center py-3 text-2xl text-[color:var(--color-ink)]"
                  >
                    {item.label}
                  </TransitionLink>
                </motion.div>
              ))}
              <motion.div variants={reducedMotion ? undefined : rowVariants} className="mt-3 border-t border-[color:var(--color-rule)] pt-3">
                <button
                  type="button"
                  onClick={openJumpBar}
                  className="flex min-h-11 w-full items-center gap-2 py-3 text-left italic-serif text-[color:var(--color-ink-dim)]"
                  style={{ fontSize: "var(--step-1)" }}
                >
                  Jump to&hellip;
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
