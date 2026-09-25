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
 */

import { useRouter } from "next/navigation";
import Link, { type LinkProps } from "next/link";
import { useReducedMotion } from "framer-motion";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

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

    (document as Document & { startViewTransition: (cb: () => Promise<void> | void) => void }).startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          router.push(url);
          // Next's router update lands over a couple of renders; two
          // animation frames is the pragmatic way to wait for the new
          // page's DOM before the transition captures its "after" state.
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        }),
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
