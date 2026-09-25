"use client";

/**
 * The jump bar - a paper index card, not a fake terminal. Opens on
 * Cmd/Ctrl+K or "/" (when you're not already typing somewhere), and lets
 * you jump to a page, a project, or fire off a small action (toggle the
 * theme, email Maahir, grab the resume, open a random photo, or - on the
 * home page only - shuffle the desk).
 *
 * Implements the aria combobox-with-listbox pattern: the input is
 * role="combobox", the results are role="listbox"/"option", and
 * aria-activedescendant tracks the highlighted row instead of moving
 * real focus off the input. Escape closes and restores focus to whatever
 * was focused before the bar opened; Tab is trapped inside the dialog
 * while it's open.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { DATA } from "@/lib/data";
import { SITE } from "@/lib/site";
import { useTheme } from "@/components/ThemeProvider";
import { SPRINGS } from "./tokens";
import manifest from "@/lib/photos-manifest.json";

type ManifestImage = { src: string; filename: string };
type ManifestCategory = { category: string; images: ManifestImage[] };
const ALL_PHOTOS: ManifestImage[] = (manifest as ManifestCategory[]).flatMap((c) => c.images);

type Item = {
  id: string;
  kind: "page" | "project" | "action";
  label: string;
  sublabel?: string;
  run: () => void;
};

const PAGES: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Now", href: "/now" },
  { label: "Work", href: "/experience" },
  { label: "Photography", href: "/photography" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SEEN_KEY = "mg-jumpbar-seen";

/** Simple subsequence fuzzy score. Null = no match. Higher = better. */
function fuzzyScore(query: string, target: string): number | null {
  if (!query) return 0;
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  let qi = 0;
  let score = 0;
  let streak = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      qi += 1;
      streak += 1;
      score += streak;
    } else {
      streak = 0;
    }
  }
  if (qi < q.length) return null;
  const idx = t.indexOf(q[0]);
  return score - idx * 0.1;
}

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
}

export function JumpBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { toggle } = useTheme();
  const reducedMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  // This component only ever mounts on the client (see JumpBarLoader's
  // `ssr: false`), so reading localStorage in the initializer is safe -
  // there's no server render for it to mismatch against.
  const [seenHint, setSeenHint] = useState(() => {
    try {
      return window.localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      return true;
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const markSeen = useCallback(() => {
    setSeenHint(true);
    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    const target = previouslyFocused.current;
    if (target) requestAnimationFrame(() => target.focus());
  }, []);

  const openBar = useCallback(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    setOpen(true);
    markSeen();
  }, [markSeen]);

  // Global open shortcuts.
  useEffect(() => {
    function onKeyDown(e: globalThis.KeyboardEvent) {
      if (open) return;
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const isSlash = e.key === "/" && !isTypingTarget(e.target);
      if (isCmdK || isSlash) {
        e.preventDefault();
        openBar();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, openBar]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const items = useMemo<Item[]>(() => {
    const pageItems: Item[] = PAGES.map((p) => ({
      id: `page-${p.href}`,
      kind: "page",
      label: p.label,
      run: () => router.push(p.href),
    }));

    const projectItems: Item[] = DATA.projects.map((p) => ({
      id: `project-${p.slug}`,
      kind: "project",
      label: p.title,
      sublabel: p.dates,
      run: () => router.push(`/projects/${p.slug}`),
    }));

    const actionItems: Item[] = [
      {
        id: "action-lights",
        kind: "action",
        label: "Toggle lights",
        run: () => toggle(),
      },
      {
        id: "action-email",
        kind: "action",
        label: "Email Maahir",
        sublabel: SITE.email,
        run: () => {
          window.location.href = `mailto:${SITE.email}`;
        },
      },
      {
        id: "action-resume",
        kind: "action",
        label: "Open resume",
        run: () => window.open("/maahir-garg-resume.pdf", "_blank", "noopener"),
      },
      {
        id: "action-random-photo",
        kind: "action",
        label: "Random photo",
        run: () => {
          if (ALL_PHOTOS.length === 0) return;
          const pick = ALL_PHOTOS[Math.floor(Math.random() * ALL_PHOTOS.length)];
          router.push(`/photography?photo=${encodeURIComponent(pick.filename)}`);
        },
      },
    ];

    if (pathname === "/") {
      actionItems.push({
        id: "action-shuffle-desk",
        kind: "action",
        label: "Shuffle the desk",
        run: () => window.dispatchEvent(new CustomEvent("mg:shuffle-desk")),
      });
    }

    return [...pageItems, ...projectItems, ...actionItems];
  }, [router, toggle, pathname]);

  const results = useMemo(() => {
    if (!query) return items;
    return items
      .map((item) => ({ item, score: fuzzyScore(query, `${item.label} ${item.sublabel ?? ""}`) }))
      .filter((r): r is { item: Item; score: number } => r.score !== null)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.item);
  }, [items, query]);

  const activate = useCallback(
    (item: Item | undefined) => {
      if (!item) return;
      item.run();
      close();
    },
    [close],
  );

  function onInputKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      activate(results[activeIndex]);
    } else if (e.key === "Tab") {
      // Focus trap: the input is the only real focus stop in the dialog.
      e.preventDefault();
    }
  }

  function onOverlayKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") close();
  }

  const groups: { label: string; items: Item[] }[] = [
    { label: "Pages", items: results.filter((i) => i.kind === "page") },
    { label: "Projects", items: results.filter((i) => i.kind === "project") },
    { label: "Actions", items: results.filter((i) => i.kind === "action") },
  ].filter((g) => g.items.length > 0);

  const activeId = results[activeIndex] ? `jumpbar-option-${results[activeIndex].id}` : undefined;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="jumpbar-overlay"
            role="presentation"
            onClick={close}
            onKeyDown={onOverlayKeyDown}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.16 }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Jump to a page, project, or action"
              className="jumpbar-card"
              onClick={(e) => e.stopPropagation()}
              initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={reducedMotion ? { duration: 0 } : SPRINGS.snap}
            >
              <div className="jumpbar-inputrow">
                <span className="jumpbar-caret" aria-hidden>
                  &gt;
                </span>
                <input
                  ref={inputRef}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="jumpbar-listbox"
                  aria-activedescendant={activeId}
                  aria-autocomplete="list"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="Go to, or do something"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={onInputKeyDown}
                  className="jumpbar-input italic-serif"
                />
                <span className="jumpbar-esc mono" aria-hidden>
                  esc
                </span>
              </div>

              <div id="jumpbar-listbox" role="listbox" aria-label="Results" className="jumpbar-list">
                {groups.length === 0 && (
                  <p className="jumpbar-empty italic-serif">Nothing filed under that.</p>
                )}
                {groups.map((group) => (
                  <div key={group.label} className="jumpbar-group">
                    <p className="jumpbar-group-label mono">{group.label}</p>
                    {group.items.map((item) => {
                      const index = results.indexOf(item);
                      const isActive = index === activeIndex;
                      return (
                        <button
                          type="button"
                          key={item.id}
                          id={`jumpbar-option-${item.id}`}
                          role="option"
                          aria-selected={isActive}
                          className={`jumpbar-option ${isActive ? "is-active" : ""}`}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => activate(item)}
                        >
                          <span>{item.label}</span>
                          {item.sublabel && (
                            <span className="jumpbar-sublabel mono">{item.sublabel}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!open && (
        <button
          type="button"
          onClick={openBar}
          aria-label="Open jump bar"
          className={`jumpbar-hint mono ${seenHint ? "is-faded" : ""}`}
        >
          &#8984;K
        </button>
      )}
    </>
  );
}
