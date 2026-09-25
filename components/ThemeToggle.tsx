"use client";

/**
 * The theme toggle: a tiny pull-cord, not a "Day / Night" text switch.
 * Click it and the cord gives a quick tug before springing back; you can
 * also grab the knob and drag it down past a small threshold to toggle,
 * same as pulling a real lamp cord. It's always a real <button> - the
 * cord is decorative and non-interactive on its own, drag is layered on
 * top of the same click target for the fun of it.
 */

import { useRef } from "react";
import { motion, useMotionValue, animate, useReducedMotion, type PanInfo } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { useMounted } from "@/components/motion/useMounted";
import { SPRINGS } from "@/components/motion/tokens";

const COMMIT_PX = 14;

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const isDark = mounted ? theme === "dark" : false;

  const pull = useMotionValue(0);
  const dragCommitted = useRef(false);

  function playTug() {
    if (reducedMotion) return;
    animate(pull, 9, { duration: 0.1, ease: [0.2, 0.8, 0.2, 1] }).then(() => {
      animate(pull, 0, SPRINGS.gentle);
    });
  }

  function handleClick() {
    if (dragCommitted.current) {
      dragCommitted.current = false;
      return;
    }
    playTug();
    toggle();
  }

  function handleDrag(_: unknown, info: PanInfo) {
    if (info.offset.y > 4) dragCommitted.current = false; // reset each drag; committed on end
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    animate(pull, 0, SPRINGS.gentle);
    if (info.offset.y > COMMIT_PX) {
      dragCommitted.current = true;
      toggle();
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isDark}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      className="theme-toggle group"
    >
      <span className="sr-only">Toggle lights</span>
      {/* A pendant lamp: lit (warm shade, glowing bulb) when the lights are on. */}
      <svg aria-hidden width="20" height="20" viewBox="0 0 20 20" className="theme-toggle__bulb">
        <path d="M10 1 V5" fill="none" stroke="currentColor" strokeWidth="1" />
        <path
          d="M4.5 11 L7 5 H13 L15.5 11 Z"
          fill={isDark ? "none" : "var(--color-mark-soft)"}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M8 11 a2 2 0 0 0 4 0"
          fill={isDark ? "none" : "var(--color-mark)"}
          stroke={isDark ? "currentColor" : "var(--color-mark)"}
          strokeWidth="1"
        />
        {!isDark && (
          <path
            d="M5.5 14.5 L4.5 16.5 M10 15 V17.5 M14.5 14.5 L15.5 16.5"
            fill="none"
            stroke="var(--color-mark)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        )}
      </svg>
      <motion.span
        aria-hidden
        className="theme-toggle__cord"
        drag={reducedMotion ? false : "y"}
        dragConstraints={{ top: 0, bottom: 16 }}
        dragElastic={0.15}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ y: pull }}
      >
        <span className="theme-toggle__knob" data-lit={isDark || undefined} />
      </motion.span>
    </button>
  );
}
