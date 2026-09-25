"use client";

import { useSyncExternalStore } from "react";

/**
 * True only after hydration. Used throughout the codebase (this is the
 * same pattern PhotoGallery/PhotographyStrip already used inline) to keep
 * the server and first client render byte-identical, then unlock
 * client-only behaviour (randomness, matchMedia reads, portals) once it's
 * safe to diverge.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
