"use client";

import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      className="group relative inline-flex h-7 w-12 items-center rounded-full border border-[color:var(--color-rule)] bg-[color:var(--color-paper)] transition-colors hover:border-[color:var(--color-ink-dim)]"
    >
      <span
        className="mono absolute left-1.5 text-[10px] uppercase tracking-wider text-[color:var(--color-ink-faint)] transition-opacity"
        style={{ opacity: isDark ? 0.4 : 1 }}
        aria-hidden
      >
        L
      </span>
      <span
        className="mono absolute right-1.5 text-[10px] uppercase tracking-wider text-[color:var(--color-ink-faint)] transition-opacity"
        style={{ opacity: isDark ? 1 : 0.4 }}
        aria-hidden
      >
        D
      </span>
      <span
        className="pointer-events-none absolute top-0.5 h-5 w-5 rounded-full bg-[color:var(--color-ink)] shadow-sm transition-transform duration-300 ease-out"
        style={{ transform: isDark ? "translateX(24px)" : "translateX(2px)" }}
        aria-hidden
      />
    </button>
  );
}
