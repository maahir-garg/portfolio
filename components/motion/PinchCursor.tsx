"use client";

/**
 * A small nod for the Vision Pro project page: two dots that follow the
 * pointer with a gentle spring and pinch together on pointerdown, echoing
 * the visionOS pinch gesture. It's decoration layered over the system
 * cursor, not a replacement for it - `pointer-events: none` on the dots,
 * no `cursor: none` anywhere, and it never appears on a coarse pointer or
 * with reduced motion (there, children render plain).
 *
 * Wrap just the area where the nod makes sense (e.g. the hero/description
 * block), not the whole page - it should feel like a detail, not a gimmick
 * that follows you everywhere.
 */

import { useState, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { usePrefersFinePointer } from "./usePrefersFinePointer";
import { useMounted } from "./useMounted";
import { SPRINGS } from "./tokens";

export function PinchCursor({ children, className }: { children: ReactNode; className?: string }) {
  const mounted = useMounted();
  const fine = usePrefersFinePointer();
  const reducedMotion = useReducedMotion();
  const active = mounted && fine && !reducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spread = useMotionValue(9);
  const springX = useSpring(x, SPRINGS.gentle);
  const springY = useSpring(y, SPRINGS.gentle);
  const springSpread = useSpring(spread, SPRINGS.snap);
  const [visible, setVisible] = useState(false);

  const leftX = useTransform([springX, springSpread], ([sx, sp]: number[]) => sx - sp);
  const rightX = useTransform([springX, springSpread], ([sx, sp]: number[]) => sx + sp);

  if (!active) {
    return <div className={className}>{children}</div>;
  }

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <div
      className={className}
      style={{ position: "relative" }}
      onPointerEnter={() => setVisible(true)}
      onPointerLeave={() => setVisible(false)}
      onPointerMove={handleMove}
      onPointerDown={() => animate(spread, 2, SPRINGS.snap)}
      onPointerUp={() => animate(spread, 9, SPRINGS.gentle)}
    >
      {children}
      {visible && (
        <>
          <motion.span
            aria-hidden
            className="pinch-dot"
            style={{ x: leftX, y: springY }}
          />
          <motion.span
            aria-hidden
            className="pinch-dot"
            style={{ x: rightX, y: springY }}
          />
        </>
      )}
    </div>
  );
}
