/**
 * Shared motion vocabulary for the site. Every animated thing (Print,
 * JumpBar, ThemeToggle, the flights map, project transitions) pulls its
 * timing from here so nothing drifts into its own bespoke easing curve.
 *
 * Keep this file framework-light: plain numbers and objects only, so it
 * can be imported from both client components and plain CSS-adjacent
 * logic without dragging framer-motion into files that don't need it.
 */

/** The only bezier curve on the site. Matches app/globals.css's .reveal. */
export const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)" as const;

/** Same curve, as a cubic-bezier array for framer-motion's `ease` option. */
export const EASE_ARR: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

/** Durations in seconds (framer-motion) and the matching ms for CSS. */
export const DURATION = {
  micro: 0.12,
  fast: 0.22,
  base: 0.4,
  slow: 0.7,
  develop: 0.9,
} as const;

export const DURATION_MS = {
  micro: 120,
  fast: 220,
  base: 400,
  slow: 700,
  develop: 900,
} as const;

/** framer-motion spring presets. */
export const SPRINGS = {
  /** Quick, decisive - UI chrome snapping into place (JumpBar open). */
  snap: { type: "spring", stiffness: 500, damping: 30, mass: 0.8 } as const,
  /** A tossed object settling - prints, the theme toggle's cord. */
  toss: { type: "spring", stiffness: 260, damping: 20, mass: 1 } as const,
  /** Soft, unhurried - hover lifts, restacking. */
  gentle: { type: "spring", stiffness: 170, damping: 26 } as const,
  /** The home desk's deal-in: snappier than `toss` so a whole stack of
   * prints finishes settling quickly instead of trailing off. */
  deal: { type: "spring", stiffness: 340, damping: 26, mass: 0.7 } as const,
};

/**
 * A shared z-index stack for anything that can be "picked up" (Print and
 * friends). Calling bringToFront() hands out an ever-increasing z-index so
 * the most recently grabbed element renders above the rest of the pile,
 * regardless of DOM order. Module-scoped on purpose: it's one physical
 * desk for the whole page, not per-component state.
 */
let topZ = 10;
export function bringToFront(): number {
  topZ += 1;
  return topZ;
}
