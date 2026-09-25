"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Hand-drawn red-pen marks. The site's signature motif: Maahir is a TA who
 * marks algorithm proofs, so the marks read as an editor's pencil, not a
 * decoration system. Use sparingly, one or two per screen.
 *
 * Drawing mechanics: every path uses `pathLength={1}`, so `stroke-dasharray`
 * and `stroke-dashoffset` work in a normalised 0..1 range regardless of the
 * path's real geometry or how much `preserveAspectRatio="none"` stretches
 * it. That means the "undrawn" state needs no client-side measurement
 * (no `getTotalLength()`), so it can be expressed purely in CSS and stays
 * correct through hydration.
 *
 * SSR contract (mirrors components/ui/Reveal.tsx and .reveal in
 * globals.css): the class names below never change what the *server* HTML
 * looks like. A mark is drawn (dashoffset 0) by default. Only once the
 * inline theme script has added `js-active` to <html> - which only happens
 * client-side, before hydration - does the CSS in globals.css hide an
 * unentered mark and let `.pen-in` draw it back in. No-JS visitors and
 * crawlers simply see finished marks.
 */

const PATH_LENGTH = 1;

function useDrawIn<T extends Element>() {
  const ref = useRef<T>(null);
  // Lazy initial state, same reasoning as Reveal: avoid a cascading
  // setState-in-effect for environments with no IntersectionObserver.
  const [entered, setEntered] = useState(() => {
    if (typeof window === "undefined") return false;
    return !("IntersectionObserver" in window);
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setEntered(true);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return { ref, entered };
}

/* Hand-authored path variants. Deliberately irregular: uneven curvature,
   overshooting ends, no two anchors evenly spaced. Picked deterministically
   by `seed` so the same word always gets the same mark, never Math.random
   at render (that would change every server/client render and every scroll
   re-entry). */

const CIRCLE_PATHS = [
  "M14,24 C10,10 34,3 63,4 C93,5 112,13 108,26 C105,39 78,42 52,41 C27,40 9,37 12,28 C13,26 13,25 14,24",
  "M17,22 C22,8 48,2 74,5 C98,8 110,17 104,29 C99,40 68,44 43,40 C22,37 10,33 13,26 C14,24 15,23 17,22",
  "M12,27 C8,14 30,4 58,3 C88,2 111,11 110,24 C109,37 84,43 55,42 C31,41 11,39 10,31 C10,29 11,28 12,27",
];

const UNDERLINE_PATHS = [
  "M2,8 C18,4 30,10 46,6 C62,2 78,9 94,5 C104,3 112,7 118,5",
  "M2,6 C16,10 32,3 48,8 C64,12 80,4 96,8 C106,10 112,6 118,7",
  "M2,7 C20,5 34,11 50,4 C66,1 82,10 98,6 C106,4 112,8 118,6",
];

const STRIKE_PATHS = [
  "M2,6 C22,3 40,7 60,4 C80,2 98,6 118,4",
  "M2,4 C20,7 40,3 60,6 C80,8 100,4 118,6",
  "M2,5 C24,8 44,2 64,6 C84,3 102,7 118,5",
];

const NOTE_ARROWS = [
  { curve: "M50,6 C34,4 16,14 8,30", head: ["M8,30 L14,24", "M8,30 L15,33"] },
  { curve: "M50,8 C30,2 14,10 6,26", head: ["M6,26 L13,21", "M6,26 L12,31"] },
  { curve: "M52,10 C32,6 18,18 9,32", head: ["M9,32 L16,27", "M9,32 L14,36"] },
];

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[((seed % arr.length) + arr.length) % arr.length];
}

/** A loose circle drawn around short inline text, like a TA flagging a term. */
export function PenCircle({
  children,
  seed = 0,
  className = "",
}: {
  children: ReactNode;
  seed?: number;
  className?: string;
}) {
  const { ref, entered } = useDrawIn<HTMLSpanElement>();
  const d = pick(CIRCLE_PATHS, seed);

  return (
    <span
      ref={ref}
      className={`pen-mark pen-circle ${entered ? "pen-in" : ""} ${className}`.trim()}
    >
      <span className="pen-mark-content">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 120 44"
        preserveAspectRatio="none"
        className="pen-mark-svg"
      >
        <path
          d={d}
          fill="none"
          className="pen-path"
          pathLength={PATH_LENGTH}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/** A wobbly hand-drawn underline under inline text. */
export function PenUnderline({
  children,
  seed = 0,
  className = "",
}: {
  children: ReactNode;
  seed?: number;
  className?: string;
}) {
  const { ref, entered } = useDrawIn<HTMLSpanElement>();
  const d = pick(UNDERLINE_PATHS, seed);

  return (
    <span
      ref={ref}
      className={`pen-mark pen-underline ${entered ? "pen-in" : ""} ${className}`.trim()}
    >
      <span className="pen-mark-content">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 120 14"
        preserveAspectRatio="none"
        className="pen-mark-svg pen-mark-svg-under"
      >
        <path
          d={d}
          fill="none"
          className="pen-path"
          pathLength={PATH_LENGTH}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/**
 * A strike-through with a hand-written correction above it, like a proof
 * that got marked up. `correction` is real content (read by screen readers
 * with a "correction:" prefix), not decoration, so it stays in the normal
 * reading order; only the drawn line itself is aria-hidden.
 */
export function PenStrike({
  children,
  correction,
  seed = 0,
  placement = "above",
  className = "",
}: {
  children: ReactNode;
  correction: string;
  seed?: number;
  /** "below" suits big display type, where a correction above would collide with the previous line. */
  placement?: "above" | "below";
  className?: string;
}) {
  const { ref, entered } = useDrawIn<HTMLSpanElement>();
  const d = pick(STRIKE_PATHS, seed);
  const rotate = seed % 2 === 0 ? -2.5 : 2;

  return (
    <span
      ref={ref}
      className={`pen-mark pen-strike pen-strike-${placement} ${entered ? "pen-in" : ""} ${className}`.trim()}
    >
      <span className="pen-mark-content">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 120 10"
        preserveAspectRatio="none"
        className="pen-mark-svg pen-mark-svg-strike"
      >
        <path
          d={d}
          fill="none"
          className="pen-path"
          pathLength={PATH_LENGTH}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className="pen-correction italic-serif"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <span className="sr-only">correction: </span>
        {correction}
      </span>
    </span>
  );
}

/**
 * A margin note with a small curved arrow, pointing back at whatever it is
 * annotating. `children` is the note's own text, which is real content and
 * stays readable; only the arrow is decorative.
 */
export function PenNote({
  children,
  seed = 0,
  className = "",
}: {
  children: ReactNode;
  seed?: number;
  className?: string;
}) {
  const { ref, entered } = useDrawIn<HTMLSpanElement>();
  const arrow = pick(NOTE_ARROWS, seed);
  const rotate = seed % 2 === 0 ? -3 : 2.5;

  return (
    <span
      ref={ref}
      className={`pen-mark pen-note ${entered ? "pen-in" : ""} ${className}`.trim()}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 60 44"
        className="pen-mark-svg pen-note-svg"
      >
        <path
          d={arrow.curve}
          fill="none"
          className="pen-path"
          pathLength={PATH_LENGTH}
          vectorEffect="non-scaling-stroke"
        />
        {arrow.head.map((seg) => (
          <path
            key={seg}
            d={seg}
            fill="none"
            className="pen-path pen-path-head"
            pathLength={PATH_LENGTH}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <span
        className="pen-note-text italic-serif"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        {children}
      </span>
    </span>
  );
}
