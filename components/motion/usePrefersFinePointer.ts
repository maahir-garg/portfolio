"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Whether the current input is a fine pointer (mouse/trackpad), SSR-safe.
 * Server and pre-hydration renders always report `false` so drag-only
 * affordances never appear before we actually know - touch devices then
 * never see a flash of draggable UI they can't use.
 */
export function usePrefersFinePointer(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
