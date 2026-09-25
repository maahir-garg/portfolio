"use client";

/**
 * Client enhancement layered over FlightsMap's server-rendered, static SVG
 * (passed in as `children` - the markup itself never depends on JS, so
 * crawlers and no-JS visitors still get the full map). This wrapper:
 *
 *  - flips a class on when the map scrolls into view, which app/motion.css
 *    uses to stagger each route's stroke-dashoffset draw-in;
 *  - listens for hover/focus/tap on any `[data-code]` group (delegated,
 *    so the SVG's own elements never need event-handler props) and dims
 *    every other city while highlighting the active one;
 *  - shows a small Print of a matching photo near the active city, when
 *    one of Maahir's photos is tagged with that city or country.
 *
 * Reduced motion: the route-drawing transition is disabled in CSS, but
 * the highlight/dim and the photo preview keep working - they're
 * information, not decoration.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Print } from "@/components/motion/Print";

export type FlightsMapDestination = {
  code: string;
  city: string;
  country: string;
  x: number;
  y: number;
  photo: { src: string; alt: string; width: number; height: number } | null;
};

export function FlightsMapEnhancer({
  destinations,
  children,
}: {
  destinations: FlightsMapDestination[];
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeCode, setActiveCode] = useState<string | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    function codeFromTarget(target: EventTarget | null): string | null {
      if (!(target instanceof Element)) return null;
      const el = target.closest<HTMLElement>("[data-code]");
      return el?.dataset.code ?? null;
    }

    function onPointerOver(e: PointerEvent) {
      setActiveCode(codeFromTarget(e.target));
    }
    function onPointerOut(e: PointerEvent) {
      const related = e.relatedTarget;
      if (related instanceof Element && related.closest("[data-code]")) return;
      setActiveCode(null);
    }
    function onFocusIn(e: FocusEvent) {
      setActiveCode(codeFromTarget(e.target));
    }
    function onFocusOut() {
      setActiveCode(null);
    }
    function onClick(e: MouseEvent) {
      const code = codeFromTarget(e.target);
      setActiveCode((prev) => (prev === code ? null : code));
    }

    node.addEventListener("pointerover", onPointerOver);
    node.addEventListener("pointerout", onPointerOut);
    node.addEventListener("focusin", onFocusIn);
    node.addEventListener("focusout", onFocusOut);
    node.addEventListener("click", onClick);
    return () => {
      node.removeEventListener("pointerover", onPointerOver);
      node.removeEventListener("pointerout", onPointerOut);
      node.removeEventListener("focusin", onFocusIn);
      node.removeEventListener("focusout", onFocusOut);
      node.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const groups = node.querySelectorAll<HTMLElement>("[data-code]");
    groups.forEach((g) => {
      const isActive = g.dataset.code === activeCode;
      g.classList.toggle("is-active", isActive);
      g.classList.toggle("is-dimmed", activeCode !== null && !isActive);
    });
  }, [activeCode]);

  const active = destinations.find((d) => d.code === activeCode) ?? null;

  return (
    <div ref={containerRef} className={`flights-map ${inView ? "is-in-view" : ""}`}>
      {children}
      {active?.photo && (
        <div
          className="flights-map__preview"
          style={{ left: `${(active.x / 420) * 100}%`, top: `${(active.y / 220) * 100}%` }}
        >
          <Print
            src={active.photo.src}
            alt={active.photo.alt}
            width={active.photo.width}
            height={active.photo.height}
            sizes="120px"
            draggable={false}
            className="w-[120px]"
          />
        </div>
      )}
    </div>
  );
}
