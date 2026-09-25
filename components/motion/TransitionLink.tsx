"use client";

/**
 * A next/link that, when the browser supports the View Transitions API and
 * the visitor hasn't asked for reduced motion, wraps the navigation in
 * `document.startViewTransition()`. Give the project title matching
 * `view-transition-name` values on the list and the detail page (see
 * app/projects/page.tsx and app/projects/[slug]/page.tsx) and the browser
 * cross-fades/morphs between them automatically; app/motion.css sets the
 * shared timing for every `::view-transition-old/new` pair.
 *
 * Falls back to a completely ordinary Link navigation whenever the API is
 * missing, motion is reduced, or the click was a modified click (new tab,
 * middle click, etc.) - View Transitions never gets in the way of normal
 * browser behaviour.
 *
 * The transition's `update` callback (the promise passed to
 * `startViewTransition`) must not resolve until the NEW route has actually
 * committed to the DOM - resolving early (e.g. after a couple of
 * `requestAnimationFrame`s) makes the browser snapshot the still-current
 * page as both the "old" and "new" state, so the whole animation plays
 * against unchanged content and the real page swap happens afterwards,
 * un-animated. `TransitionResolver` (mounted once in app/layout.tsx) calls
 * `resolvePendingTransition()` from a `useLayoutEffect` keyed on
 * `usePathname()`, i.e. right after Next commits the new route's DOM and
 * before the browser paints - exactly when the "new" snapshot should be
 * taken. A short safety timeout resolves anyway if that never fires (a
 * failed/aborted navigation, or just a slow one) so a bad network can
 * never freeze the screen for the browser's default 4s update timeout.
 */

import { useRouter } from "next/navigation";
import Link, { type LinkProps } from "next/link";
import { useReducedMotion } from "framer-motion";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

/** Resolves once the route that started the in-flight transition commits. */
let pendingResolve: (() => void) | null = null;
let pendingTimeout: ReturnType<typeof setTimeout> | null = null;

function settlePending() {
  if (pendingTimeout !== null) {
    clearTimeout(pendingTimeout);
    pendingTimeout = null;
  }
  const resolve = pendingResolve;
  pendingResolve = null;
  resolve?.();
}

/**
 * Called by `TransitionResolver` (app/layout.tsx) whenever the route
 * actually changes. Resolves whatever transition is currently waiting on
 * a route commit; a no-op if nothing is pending.
 */
export function resolvePendingTransition() {
  settlePending();
}

function pathnameOf(url: string): string {
  try {
    return new URL(url, window.location.href).pathname;
  } catch {
    return url;
  }
}

/**
 * The same feature-detected, reduced-motion-aware `startViewTransition`
 * wrap that `TransitionLink` uses, exposed as a plain function for
 * programmatic navigation (the jump bar's router.push calls) rather than
 * a rendered `<a>`. Falls back to a bare `router.push` whenever the API
 * is missing or motion is reduced.
 */
export function navigateWithTransition(
  router: ReturnType<typeof useRouter>,
  url: string,
  reducedMotion: boolean | null = false,
) {
  const supportsViewTransitions =
    typeof document !== "undefined" &&
    typeof (document as Document & { startViewTransition?: unknown }).startViewTransition === "function";
  if (!supportsViewTransitions || reducedMotion) {
    router.push(url);
    return;
  }

  // Same-URL clicks (or a URL that only differs by query/hash) never
  // trigger a pathname change for TransitionResolver to observe, so
  // nothing would ever resolve the promise below - resolve right after
  // the next paint instead of waiting on a commit that isn't coming.
  const isSameRoute = pathnameOf(url) === window.location.pathname;

  (document as Document & { startViewTransition: (cb: () => Promise<void> | void) => void }).startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        // Only one navigation transition is ever in flight; a fresh one
        // supersedes whatever the last one was still waiting on.
        settlePending();
        router.push(url);

        if (isSameRoute) {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
          return;
        }

        pendingResolve = resolve;
        pendingTimeout = setTimeout(() => {
          if (pendingResolve === resolve) {
            pendingResolve = null;
            resolve();
          }
        }, 800);
      }),
  );
}

export function TransitionLink({ href, onClick, children, ...rest }: TransitionLinkProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const supportsViewTransitions =
      typeof document !== "undefined" &&
      typeof (document as Document & { startViewTransition?: unknown }).startViewTransition === "function";
    if (!supportsViewTransitions || reducedMotion) return;

    e.preventDefault();
    const url = typeof href === "string" ? href : href.pathname ?? String(href);
    navigateWithTransition(router, url, reducedMotion);
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
