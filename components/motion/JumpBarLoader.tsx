"use client";

/**
 * Tiny client wrapper so app/layout.tsx (a server component) can mount the
 * jump bar without pulling framer-motion or its listeners into every
 * page's first-load bundle. `ssr: false` means the jump bar itself never
 * renders on the server - it has nothing to say until someone presses
 * a key, so there's no content to lose for crawlers or no-JS clients.
 */

import dynamic from "next/dynamic";

const JumpBar = dynamic(() => import("./JumpBar").then((m) => m.JumpBar), {
  ssr: false,
});

export function JumpBarLoader() {
  return <JumpBar />;
}
