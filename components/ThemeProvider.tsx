"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  set: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "mg-theme";

function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Lazy initializer - picks up whatever the inline `themeInitScript` already
  // applied to <html> before hydration, so React's state matches the DOM on
  // first paint. No cascading setState-in-effect.
  const [theme, setTheme] = useState<Theme>(resolveInitialTheme);

  useEffect(() => {
    // Keep the DOM in sync with React's notion of the theme on mount. (The
    // inline script already did this pre-hydration; this is belt-and-braces
    // for the SSR path where `resolveInitialTheme` returned the default.)
    applyTheme(theme);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        const next: Theme = e.matches ? "dark" : "light";
        setTheme(next);
        applyTheme(next);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, t);
  };

  const toggle = () => set(theme === "dark" ? "light" : "dark");

  return (
    <ThemeContext.Provider value={{ theme, toggle, set }}>
      {children}
    </ThemeContext.Provider>
  );
}

function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", t === "dark");
  root.style.colorScheme = t;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/* inline script. Runs before paint, avoids FOUC.
   Also flips an `html.js-active` class so progressive-enhancement CSS
   (e.g. the .reveal animation) can hide content only when JS is around
   to un-hide it. SSR HTML stays fully visible for crawlers. */
export const themeInitScript = `
(function(){try{
  var k='${STORAGE_KEY}';
  var s=localStorage.getItem(k);
  var d=window.matchMedia('(prefers-color-scheme: dark)').matches;
  var t=(s==='dark'||s==='light')?s:(d?'dark':'light');
  if(t==='dark') document.documentElement.classList.add('dark');
  document.documentElement.style.colorScheme=t;
  document.documentElement.classList.add('js-active');
}catch(e){}})();
`;
