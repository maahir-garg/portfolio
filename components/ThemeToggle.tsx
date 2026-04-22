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
      className="group mono inline-flex items-baseline gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-ink-faint)] transition-colors hover:text-[color:var(--color-ink)]"
    >
      <span
        style={{
          color: isDark ? "var(--color-ink-faint)" : "var(--color-mark)",
          backgroundImage: isDark ? undefined : "linear-gradient(var(--color-mark), var(--color-mark))",
          backgroundSize: "100% 1px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 100%",
          paddingBottom: "1px",
        }}
      >
        Day
      </span>
      <span aria-hidden className="text-[color:var(--color-rule)]">/</span>
      <span
        style={{
          color: isDark ? "var(--color-mark)" : "var(--color-ink-faint)",
          backgroundImage: isDark ? "linear-gradient(var(--color-mark), var(--color-mark))" : undefined,
          backgroundSize: "100% 1px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 100%",
          paddingBottom: "1px",
        }}
      >
        Night
      </span>
    </button>
  );
}
