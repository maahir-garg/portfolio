"use client";

/**
 * Print - a photograph rendered as a physical print left on a desk.
 *
 * On a fine pointer (mouse/trackpad) it can be picked up and tossed: grab
 * it and it lifts (scale up, deeper shadow, a slight tilt towards the
 * direction you're dragging), let go and it settles where you left it
 * with a springy toss. It also jumps to the top of a shared z-index
 * stack the moment you touch it, so the print you're holding is always
 * the one on top of the pile.
 *
 * Touch/coarse pointers never see the drag affordance - they get a plain
 * tap. A click/tap that didn't move more than a few pixels calls
 * `onOpen`; anything past that threshold is treated as a drag, not an
 * activation, so tossing a print never accidentally opens it. When
 * `onOpen` is provided the print is a real, focusable <button> (Enter/
 * Space activate it); without it, it's a plain, non-interactive <div>
 * that can still be dragged and hovered (e.g. lifted on hover in a grid).
 *
 * `prefers-reduced-motion` turns off the decorative bits - the lift
 * scale, the drag tilt, the spring-back toss - but dragging itself still
 * works, since repositioning is functional, not decorative.
 *
 * Used by the home "desk" (PhotographyStrip), the photo grid, and can be
 * reused anywhere else a physical print is wanted (e.g. a hero portrait).
 *
 * Pass a ref to reach `{ reset(): void }`, which springs the print back
 * to its starting position - used by "tidy up" controls that want to
 * restack a scattered pile without remounting anything.
 *
 * `parallax` (opt-in): on a fine pointer, with motion allowed, the print
 * tilts a few degrees toward the cursor (rotateX/rotateY around its own
 * center, via `transformPerspective`) with a matching slight shadow
 * shift, both eased by a soft spring so it settles rather than snapping.
 * It's a no-op on coarse pointers, under `prefers-reduced-motion`, and
 * while the print is being lifted/dragged (so the two tilts never
 * fight). Example: `<Print parallax src={...} .../>` for a portrait that
 * should feel like it's sitting under a lamp as the cursor moves.
 */

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  animate,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { SPRINGS, bringToFront } from "./tokens";
import { usePrefersFinePointer } from "./usePrefersFinePointer";

export type PrintHandle = {
  /** Spring the print back to its origin (x:0, y:0, base rotation). */
  reset: () => void;
};

export interface PrintProps {
  src: string;
  alt: string;
  /** Required unless `fill` is set. */
  width?: number;
  /** Required unless `fill` is set. */
  height?: number;
  /** Use next/image `fill` mode - the parent controls aspect ratio. */
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  /** Base rotation in degrees, before any drag tilt. */
  rotate?: number;
  caption?: string;
  onOpen?: () => void;
  className?: string;
  style?: CSSProperties;
  /** Disable drag even on fine pointers (e.g. a map-hover preview). */
  draggable?: boolean;
  /** Element drag is constrained to. Omit for an unconstrained toss. */
  constraintsRef?: RefObject<HTMLElement | null>;
  /** Opt-in fine-pointer tilt-toward-cursor with a slight shadow shift. See file header. */
  parallax?: boolean;
  children?: ReactNode;
}

export const Print = forwardRef<PrintHandle, PrintProps>(function Print(
  {
    src,
    alt,
    width,
    height,
    fill = false,
    sizes,
    priority,
    loading,
    rotate = 0,
    caption,
    onOpen,
    className = "",
    style,
    draggable = true,
    constraintsRef,
    parallax = false,
    children,
  },
  ref,
) {
  // Callers should always pass an accurate `sizes` (a print is rarely
  // full-bleed), but next/image silently falls back to treating `fill`
  // images as 100vw when `sizes` is omitted - quietly requesting the
  // largest device-width rendition for whatever's actually a small print.
  // A modest default here just caps the damage if a future caller forgets.
  const resolvedSizes = sizes ?? (fill ? "50vw" : undefined);
  const fine = usePrefersFinePointer();
  const reducedMotion = useReducedMotion();
  const canDrag = draggable && fine;
  const canParallax = parallax && fine && !reducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateMV = useMotionValue(rotate);
  const scaleMV = useMotionValue(1);
  const [lifted, setLifted] = useState(false);
  const [z, setZ] = useState(1);
  const movedRef = useRef(0);

  // Parallax tilt: raw pointer position drives the target, a soft spring
  // drives the actual rotation so it settles instead of snapping.
  const tiltXTarget = useMotionValue(0);
  const tiltYTarget = useMotionValue(0);
  const tiltX = useSpring(tiltXTarget, SPRINGS.gentle);
  const tiltY = useSpring(tiltYTarget, SPRINGS.gentle);
  const shadowDx = useTransform(tiltY, (v) => v * 0.8);
  const shadowDy = useTransform(tiltX, (v) => v * -0.8);
  const parallaxShadow = useMotionTemplate`drop-shadow(${shadowDx}px ${shadowDy}px 10px rgba(20, 18, 15, 0.22))`;

  function handleParallaxMove(e: ReactPointerEvent<HTMLElement>) {
    if (!canParallax || lifted) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltYTarget.set(px * 8);
    tiltXTarget.set(py * -8);
  }

  function handleParallaxLeave() {
    tiltXTarget.set(0);
    tiltYTarget.set(0);
  }

  useImperativeHandle(
    ref,
    () => ({
      reset() {
        if (reducedMotion) {
          x.set(0);
          y.set(0);
          rotateMV.set(rotate);
        } else {
          animate(x, 0, SPRINGS.toss);
          animate(y, 0, SPRINGS.toss);
          animate(rotateMV, rotate, SPRINGS.toss);
        }
      },
    }),
    [reducedMotion, rotate, x, y, rotateMV],
  );

  function claimTop() {
    setZ(bringToFront());
  }

  function handleDragStart() {
    movedRef.current = 0;
    setLifted(true);
    claimTop();
    if (canParallax) handleParallaxLeave();
    if (!reducedMotion) animate(scaleMV, 1.03, SPRINGS.snap);
  }

  function handleDrag(_: unknown, info: PanInfo) {
    movedRef.current += Math.hypot(info.delta.x, info.delta.y);
    if (!reducedMotion) {
      const tilt = Math.max(-8, Math.min(8, info.offset.x * 0.05));
      rotateMV.set(rotate + tilt);
    }
  }

  function handleDragEnd() {
    setLifted(false);
    if (!reducedMotion) {
      animate(scaleMV, 1, SPRINGS.toss);
      animate(rotateMV, rotate, SPRINGS.toss);
    } else {
      rotateMV.set(rotate);
    }
  }

  function handleClick() {
    // A toss that moved more than a few px isn't an activation.
    if (movedRef.current > 6) return;
    onOpen?.();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!onOpen) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  }

  const frame = (
    <>
      <span className="print__frame">
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={resolvedSizes}
            priority={priority}
            loading={priority ? undefined : loading}
            draggable={false}
            className="print__img"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={resolvedSizes}
            priority={priority}
            loading={priority ? undefined : loading}
            draggable={false}
            className="print__img print__img--natural"
          />
        )}
        {children}
      </span>
      {caption && <span className="print__caption italic-serif">{caption}</span>}
    </>
  );

  const sharedProps = {
    className: `print ${fill ? "print--fill" : ""} ${canDrag ? "print--draggable" : ""} ${className}`.trim(),
    style: {
      x,
      y,
      rotate: rotateMV,
      scale: scaleMV,
      ...(canParallax
        ? { rotateX: tiltX, rotateY: tiltY, transformPerspective: 600, filter: parallaxShadow }
        : null),
      zIndex: z,
      touchAction: canDrag ? ("none" as const) : undefined,
      ...style,
    },
    drag: canDrag ? true : false,
    dragElastic: 0.12,
    dragMomentum: !reducedMotion,
    dragTransition: reducedMotion
      ? { power: 0 }
      : { power: 0.3, timeConstant: 200 },
    dragConstraints: constraintsRef,
    onDragStart: canDrag ? handleDragStart : undefined,
    onDrag: canDrag ? handleDrag : undefined,
    onDragEnd: canDrag ? handleDragEnd : undefined,
    onPointerDown: claimTop,
    onPointerMove: canParallax ? handleParallaxMove : undefined,
    onPointerLeave: canParallax ? handleParallaxLeave : undefined,
    onClick: handleClick,
    "data-lifted": lifted || undefined,
  };

  if (onOpen) {
    return (
      <motion.button type="button" aria-label={alt} onKeyDown={handleKeyDown} {...sharedProps}>
        {frame}
      </motion.button>
    );
  }

  return <motion.div {...sharedProps}>{frame}</motion.div>;
});
