"use client";

/**
 * Mounted once in app/layout.tsx (inside ThemeProvider). Its only job is
 * telling `navigateWithTransition` (TransitionLink.tsx) when the route it
 * just pushed has actually committed, so the in-flight
 * `document.startViewTransition()` update callback resolves at the right
 * moment - after the new page's DOM is in place, not two animation frames
 * after the click.
 *
 * `usePathname()` only (no search params): reading `useSearchParams` in
 * the root layout would force the whole app into dynamic rendering. A
 * pathname change is also the right signal here - it's what actually
 * swaps the page content the view transition is meant to animate.
 *
 * `useLayoutEffect` runs synchronously after React commits the new
 * route's DOM but before the browser paints, which is exactly when the
 * view transition's "new" snapshot should be taken.
 */

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { resolvePendingTransition } from "./TransitionLink";

export function TransitionResolver() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    resolvePendingTransition();
  }, [pathname]);

  return null;
}
