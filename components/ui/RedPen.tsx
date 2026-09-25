"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

// useLayoutEffect warns during SSR; every use below only ever measures
// layout client-side (after mount), so fall back to a no-op on the server.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Hand-drawn red-pen marks, v2. The site's signature motif: Maahir is a TA
 * who marks algorithm proofs, so the marks read as an editor's pen, not a
 * decoration system. Used sparingly, one or two active per screen.
 *
 * Ink: every mark draws two overlapping passes of the same path (a slightly
 * offset, softer "ghost" pass under a solid one) so it reads as ink laid
 * down by hand rather than a single vector stroke. Straight-ish marks
 * (underline, strike, tick) could taper at both ends through an SVG mask, the way
 * a pen lifts off the page. Stroke width is set in em in app/pen.css, so it
 * scales with whatever text it is marking.
 *
 * Drawing mechanics: a mark "draws in" via a clip-path reveal on its whole
 * SVG (see InkPass below for why not stroke-dasharray/dashoffset), the
 * same left-to-right technique the written correction uses on its text.
 *
 * SSR contract (mirrors components/ui/Reveal.tsx and .reveal in
 * globals.css): the class names below never change what the *server* HTML
 * looks like. A mark is drawn (fully revealed) by default. Only once the
 * inline theme script has added `js-active` to <html> - which only happens
 * client-side, before hydration - does app/pen.css hide an unentered mark
 * and let `.pen-in` draw it back in. No-JS visitors and crawlers simply see
 * finished marks, and so does everyone once `prefers-reduced-motion` is set.
 *
 * Triggers: "view" draws the first time the mark scrolls into view (the
 * default). "load" draws shortly after mount, for marks that play with the
 * page rather than waiting for a scroll (the hero headline). "manual" never
 * draws on its own - something else calls `replay()` via a ref or the
 * `play` prop. Every mark also re-inks itself (a clean replay, not a
 * reverse-animation) on hover from a fine pointer and on tap, unless
 * `prefers-reduced-motion` is set, in which case marks are simply static.
 */

export type PenTrigger = "load" | "view" | "scroll-scrub" | "manual";

export interface PenMarkHandle {
  replay: () => void;
}

function usePointerFine() {
  const [fine, setFine] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(pointer: fine)").matches;
  });
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(pointer: fine)");
    const onChange = () => setFine(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return fine;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

interface UseInkMarkOptions {
  trigger?: PenTrigger;
  /** Grading marks draw as their row crosses the viewport's vertical
   *  middle, rather than the usual "50% into view" threshold. */
  centerCross?: boolean;
  play?: number;
}

/**
 * The engine shared by every mark: decides when it first draws, and how it
 * cleanly redraws on replay (reset dash state with transitions off for one
 * frame, then switch transitions back on and draw again, rather than
 * visibly animating backwards).
 *
 * trigger="load" marks never pass through `entered`/`pen-in` on first
 * paint - the `.pen-autoplay` class (set unconditionally below, see
 * app/pen.css) draws them via a CSS keyframe the instant the stylesheet
 * applies, independent of JS/hydration. `entered` only turns true here
 * once something calls `replay()` (hover on a fine pointer, tap, or a
 * `play` bump), at which point the ordinary `.pen-in` transition path
 * takes over from the CSS keyframe - both land on the same fully-drawn
 * end state, so there's no visible jump.
 */
function useInkMark<T extends HTMLElement>({
  trigger = "view",
  centerCross = false,
  play,
}: UseInkMarkOptions = {}) {
  const ref = useRef<T>(null);
  const reducedMotion = usePrefersReducedMotion();
  const pointerFine = usePointerFine();

  const [entered, setEntered] = useState(() => {
    if (typeof window === "undefined") return false;
    if (trigger === "load" || trigger === "manual") return false;
    return !("IntersectionObserver" in window);
  });
  const [resetting, setResetting] = useState(false);

  // View/grading marks that are already on screen at hydration draw right
  // away rather than waiting on the async IntersectionObserver callback
  // below: a layout effect runs before the browser paints the hydrated
  // commit, so there's no extra visible delay for content already in view.
  // Off-screen marks are untouched - they still wait for the observer.
  useIsoLayoutEffect(() => {
    if (trigger !== "view" && trigger !== "scroll-scrub") return;
    const node = ref.current;
    if (!node || typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    if (rect.top < vh && rect.bottom > 0 && rect.left < vw && rect.right > 0) {
      setEntered(true);
    }
  }, [trigger]);

  useEffect(() => {
    if (trigger !== "view" && trigger !== "scroll-scrub") return;
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setEntered(true);
            io.unobserve(entry.target);
          }
        }
      },
      centerCross
        ? // The top half of the viewport, not a hairline at its middle, so a
          // fast fling or jump that skips past the midpoint still marks the row.
          { threshold: 0, rootMargin: "0px 0px -50% 0px" }
        : { threshold: 0.5, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [trigger, centerCross]);

  const replay = useCallback(() => {
    if (reducedMotion) return;
    setResetting(true);
    setEntered(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setResetting(false);
        setEntered(true);
      });
    });
  }, [reducedMotion]);

  const playToken = useRef(play);
  useEffect(() => {
    if (play === undefined) return;
    if (playToken.current === play) return;
    playToken.current = play;
    const t = window.setTimeout(() => replay(), 0);
    return () => window.clearTimeout(t);
  }, [play, replay]);

  const bind = {
    onMouseEnter: pointerFine && !reducedMotion ? () => replay() : undefined,
    onClick: reducedMotion ? undefined : () => replay(),
  };

  // Wrap detection: marks like the hero's strike wrap an inline-block
  // around a whole phrase and position one SVG over its bounding box. If
  // that phrase line-wraps at a narrow viewport, the box turns multi-line
  // and one flat SVG can no longer trace it correctly (it'd only cross
  // whichever line its fixed top/height happens to land on). When that
  // happens, `wrapped` tells the mark to fall back to a plain CSS
  // text-decoration instead, which handles per-line wrapping natively.
  const contentRef = useRef<HTMLSpanElement>(null);
  const [wrapped, setWrapped] = useState(false);
  useIsoLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) return;
    const check = () => setWrapped(node.getClientRects().length > 1);
    check();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(check);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  return { ref, contentRef, entered, resetting, wrapped, replay, bind, reducedMotion, pointerFine };
}

/* Hand-authored path variants. Deliberately irregular: uneven curvature,
   overshooting ends, no two anchors evenly spaced. Picked deterministically
   by `seed` so the same word always gets the same mark, never Math.random
   at render (that would change every server/client render and every scroll
   re-entry). Circles and the tick deliberately don't close cleanly - the
   end point runs a little past the start, like a hand crossing over. */

const CIRCLE_PATHS = [
  "M14,24 C10,10 34,3 63,4 C93,5 112,13 108,26 C105,39 78,42 52,41 C27,40 9,37 12,28 C13,25 12,23 17,22",
  "M17,22 C22,8 48,2 74,5 C98,8 110,17 104,29 C99,40 68,44 43,40 C22,37 10,33 13,26 C13,23 15,20 20,20",
  "M12,27 C8,14 30,4 58,3 C88,2 111,11 110,24 C109,37 84,43 55,42 C31,41 11,39 10,31 C10,28 12,25 17,25",
];

const UNDERLINE_PATHS = [
  "M2,8 C18,4 30,10 46,6 C62,2 78,9 94,5 C104,3 112,7 118,5",
  "M2,6 C16,10 32,3 48,8 C64,12 80,4 96,8 C106,10 112,6 118,7",
  "M2,7 C20,5 34,11 50,4 C66,1 82,10 98,6 C106,4 112,8 118,6",
];

const STRIKE_PATHS = [
  "M2,7 C22,3 40,8 60,3 C80,-1 98,7 118,3",
  "M2,3 C20,8 40,2 60,7 C80,10 100,3 118,7",
  "M2,5 C24,9 44,1 64,7 C84,2 102,8 118,4",
];

const TICK_PATHS = [
  "M3,11 C5,13 7,16 8,17 C11,12 15,6 19,2",
  "M2,10 C5,13 7,15 9,18 C12,13 16,5 20,3",
  "M3,12 C5,14 8,17 9,17 C12,11 16,7 18,1",
];

const NOTE_ARROWS = [
  { curve: "M50,6 C34,4 16,14 8,30", head: ["M8,30 L14,24", "M8,30 L15,33"] },
  { curve: "M50,8 C30,2 14,10 6,26", head: ["M6,26 L13,21", "M6,26 L12,31"] },
  { curve: "M52,10 C32,6 18,18 9,32", head: ["M9,32 L16,27", "M9,32 L14,36"] },
];

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[((seed % arr.length) + arr.length) % arr.length];
}

/** Two overlapping passes of the same path: a soft offset "ghost" under a
 *  solid line, so it reads as ink rather than a single vector stroke.
 *  Straight-ish marks additionally taper at both ends through a mask.
 *
 *  The mark is "drawn in" with a clip-path reveal on the whole mark's SVG
 *  (see .pen-mark-svg in app/pen.css), the same left-to-right technique
 *  used for the written correction below, not stroke-dasharray/dashoffset:
 *  in testing, `pathLength`-normalised dasharray/dashoffset silently fails
 *  to hide the stroke in this Chrome build once `vector-effect:
 *  non-scaling-stroke` is on the same path (the dash pattern renders as if
 *  fully drawn regardless of dashoffset), and non-scaling-stroke is what
 *  keeps the stroke width constant in screen pixels across marks whose
 *  viewBox gets stretched non-uniformly (preserveAspectRatio="none") to
 *  fit whatever word or date they're marking. A clip reveal sidesteps the
 *  bug entirely and needs no client-side measurement. */
function InkPass({
  d,
  taper = false,
  className = "",
}: {
  d: string;
  taper?: boolean;
  className?: string;
}) {
  const uid = useId();
  const maskId = `pen-taper-${uid}`;
  const content = (
    <>
      <path
        d={d}
        fill="none"
        className={`pen-path pen-path-ghost ${className}`.trim()}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={d}
        fill="none"
        className={`pen-path ${className}`.trim()}
        vectorEffect="non-scaling-stroke"
      />
    </>
  );
  if (!taper) return content;
  return (
    <>
      <defs>
        <linearGradient id={maskId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="12%" stopColor="#fff" stopOpacity="1" />
          <stop offset="88%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.15" />
        </linearGradient>
        <mask id={`${maskId}-m`} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
          <rect x="0" y="0" width="1" height="1" fill={`url(#${maskId})`} />
        </mask>
      </defs>
      <g mask={`url(#${maskId}-m)`}>{content}</g>
    </>
  );
}

function timingStyle(delay?: number, duration?: number): CSSProperties {
  const style: Record<string, string> = {};
  if (delay !== undefined) style["--pen-delay"] = `${delay}ms`;
  if (duration !== undefined) style["--pen-duration"] = `${duration}ms`;
  return style as CSSProperties;
}

interface PenBaseProps {
  seed?: number;
  className?: string;
  trigger?: PenTrigger;
  /** Internal: used by GradeMark so a row's mark draws as it crosses the
   *  viewport's vertical middle, instead of the usual "scrolled into view". */
  centerCross?: boolean;
  /** Bump this number to replay the mark programmatically. */
  play?: number;
  /** ms before the draw starts (after the trigger fires). */
  delay?: number;
  /** ms the draw itself takes. */
  duration?: number;
}

/** A loose circle drawn around short inline text, like a TA flagging a term. */
export const PenCircle = forwardRef<PenMarkHandle, PenBaseProps & { children: ReactNode }>(
  function PenCircle(
    { children, seed = 0, className = "", trigger = "view", centerCross = false, play, delay, duration },
    handleRef,
  ) {
    const { ref, contentRef, entered, resetting, wrapped, replay, bind } = useInkMark<HTMLSpanElement>({
      trigger,
      centerCross,
      play,
    });
    useImperativeHandle(handleRef, () => ({ replay }), [replay]);
    const d = pick(CIRCLE_PATHS, seed);

    return (
      <span
        ref={ref}
        className={`pen-mark pen-circle ${trigger === "load" ? "pen-autoplay" : ""} ${entered ? "pen-in" : ""} ${resetting ? "pen-resetting" : ""} ${wrapped ? "pen-wrapped" : ""} ${className}`.trim()}
        style={timingStyle(delay, duration)}
        {...bind}
      >
        <span ref={contentRef} className="pen-mark-content">{children}</span>
        <svg aria-hidden="true" viewBox="0 0 120 44" preserveAspectRatio="none" className="pen-mark-svg">
          <InkPass d={d} />
        </svg>
      </span>
    );
  },
);

/** A wobbly hand-drawn underline under inline text. */
export const PenUnderline = forwardRef<PenMarkHandle, PenBaseProps & { children: ReactNode }>(
  function PenUnderline(
    { children, seed = 0, className = "", trigger = "view", centerCross = false, play, delay, duration },
    handleRef,
  ) {
    const { ref, contentRef, entered, resetting, wrapped, replay, bind } = useInkMark<HTMLSpanElement>({
      trigger,
      centerCross,
      play,
    });
    useImperativeHandle(handleRef, () => ({ replay }), [replay]);
    const d = pick(UNDERLINE_PATHS, seed);

    return (
      <span
        ref={ref}
        className={`pen-mark pen-underline ${trigger === "load" ? "pen-autoplay" : ""} ${entered ? "pen-in" : ""} ${resetting ? "pen-resetting" : ""} ${wrapped ? "pen-wrapped" : ""} ${className}`.trim()}
        style={timingStyle(delay, duration)}
        {...bind}
      >
        <span ref={contentRef} className="pen-mark-content">{children}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 120 14"
          preserveAspectRatio="none"
          className="pen-mark-svg pen-mark-svg-under"
        >
          <InkPass d={d} />
        </svg>
      </span>
    );
  },
);

/**
 * A strike-through with a hand-written correction beside it, like a proof
 * that got marked up. `correction` is real content (read by screen readers
 * with a "correction:" prefix), not decoration, so it stays in the normal
 * reading order; only the drawn line itself is aria-hidden. The correction
 * is revealed left-to-right, with a small travelling nib, rather than
 * faded in - and its box is reserved up front so nothing shifts layout
 * while it writes itself in.
 */
export const PenStrike = forwardRef<
  PenMarkHandle,
  PenBaseProps & {
    children: ReactNode;
    correction: string;
    /** "below" suits big display type, where a correction above would collide with the previous line. */
    placement?: "above" | "below";
    writeDelay?: number;
    writeDuration?: number;
  }
>(function PenStrike(
  {
    children,
    correction,
    seed = 0,
    placement = "above",
    className = "",
    trigger = "view",
    centerCross = false,
    play,
    delay,
    duration,
    writeDelay,
    writeDuration,
  },
  handleRef,
) {
  const { ref, contentRef, entered, resetting, wrapped, replay, bind } = useInkMark<HTMLSpanElement>({
    trigger,
    centerCross,
    play,
  });
  useImperativeHandle(handleRef, () => ({ replay }), [replay]);
  const d = pick(STRIKE_PATHS, seed);
  const rotate = seed % 2 === 0 ? -2.5 : 2;
  const style: Record<string, string> = { transform: `rotate(${rotate}deg)` } as never;

  const style2 = {
    ...timingStyle(delay, duration),
    ...(writeDelay !== undefined ? { "--pen-write-delay": `${writeDelay}ms` } : {}),
    ...(writeDuration !== undefined ? { "--pen-write-duration": `${writeDuration}ms` } : {}),
  } as CSSProperties;

  return (
    <span
      ref={ref}
      className={`pen-mark pen-strike pen-strike-${placement} ${trigger === "load" ? "pen-autoplay" : ""} ${entered ? "pen-in" : ""} ${resetting ? "pen-resetting" : ""} ${wrapped ? "pen-wrapped" : ""} ${className}`.trim()}
      style={style2}
      {...bind}
    >
      <span ref={contentRef} className="pen-mark-content">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 120 10"
        preserveAspectRatio="none"
        className="pen-mark-svg pen-mark-svg-strike"
      >
        <InkPass d={d} />
      </svg>
      <span className="pen-correction-wrap" style={style}>
        <span className="pen-correction italic-serif">
          <span className="sr-only">correction: </span>
          {correction}
        </span>
        <span aria-hidden className="pen-nib" />
      </span>
    </span>
  );
});

/** A small hand-drawn checkmark, like a TA ticking off a line. Standalone -
 *  it has no `children`, it just sits wherever it's placed. */
export const PenTick = forwardRef<PenMarkHandle, PenBaseProps>(function PenTick(
  { seed = 0, className = "", trigger = "view", centerCross = false, play, delay, duration },
  handleRef,
) {
  const { ref, entered, resetting, replay, bind } = useInkMark<HTMLSpanElement>({
    trigger,
    centerCross,
    play,
  });
  useImperativeHandle(handleRef, () => ({ replay }), [replay]);
  const d = pick(TICK_PATHS, seed);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pen-mark pen-tick ${trigger === "load" ? "pen-autoplay" : ""} ${entered ? "pen-in" : ""} ${resetting ? "pen-resetting" : ""} ${className}`.trim()}
      style={timingStyle(delay, duration)}
      {...bind}
    >
      <svg viewBox="0 0 22 20" className="pen-mark-svg pen-tick-svg">
        <InkPass d={d} />
      </svg>
    </span>
  );
});

/**
 * A margin note with a small curved arrow, pointing back at whatever it is
 * annotating. `children` is the note's own text, which is real content and
 * stays readable; only the arrow is decorative.
 */
export const PenNote = forwardRef<PenMarkHandle, PenBaseProps & { children: ReactNode }>(
  function PenNote(
    { children, seed = 0, className = "", trigger = "view", centerCross = false, play, delay, duration },
    handleRef,
  ) {
    const { ref, entered, resetting, replay, bind } = useInkMark<HTMLSpanElement>({
      trigger,
      centerCross,
      play,
    });
    useImperativeHandle(handleRef, () => ({ replay }), [replay]);
    const arrow = pick(NOTE_ARROWS, seed);
    const rotate = seed % 2 === 0 ? -3 : 2.5;

    return (
      <span
        ref={ref}
        className={`pen-mark pen-note ${trigger === "load" ? "pen-autoplay" : ""} ${entered ? "pen-in" : ""} ${resetting ? "pen-resetting" : ""} ${className}`.trim()}
        style={timingStyle(delay, duration)}
        {...bind}
      >
        <svg aria-hidden="true" viewBox="0 0 60 44" className="pen-mark-svg pen-note-svg">
          <InkPass d={arrow.curve} />
          {arrow.head.map((seg) => (
            <path
              key={seg}
              d={seg}
              fill="none"
              className="pen-path pen-path-head"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <span className="pen-note-text italic-serif" style={{ transform: `rotate(${rotate}deg)` }}>
          {children}
        </span>
      </span>
    );
  },
);

/**
 * Grading wrapper: one mark per row, drawn as the row crosses the middle
 * of the viewport, deterministic per `seed` (never random at render). Used
 * by the home "working on" list and /experience to mark up rows as you
 * scroll past them, like a TA grading down a list. `word` is a short, true,
 * dry margin note (e.g. "still going", "shipped", "offline now") for
 * kind="note"; `children` is the inline text to wrap for kind="circle" or
 * kind="underline". kind="tick" needs neither, it just sits beside a title.
 */
export type GradeKind = "tick" | "circle" | "underline" | "note";

export function GradeMark({
  kind,
  seed = 0,
  word,
  children,
  className = "",
}: {
  kind: GradeKind;
  seed?: number;
  word?: string;
  children?: ReactNode;
  className?: string;
}) {
  if (kind === "tick") {
    return <PenTick seed={seed} centerCross className={className} />;
  }
  if (kind === "note") {
    return (
      <PenNote seed={seed} centerCross className={className}>
        {word}
      </PenNote>
    );
  }
  if (kind === "circle") {
    return (
      <PenCircle seed={seed} centerCross className={className}>
        {children}
      </PenCircle>
    );
  }
  return (
    <PenUnderline seed={seed} centerCross className={className}>
      {children}
    </PenUnderline>
  );
}
