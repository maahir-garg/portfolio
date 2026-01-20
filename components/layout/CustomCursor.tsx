"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname(); // Reset on route change if needed

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
        const followerXTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
        const followerYTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            followerXTo(e.clientX);
            followerYTo(e.clientY);
        };

        const onMouseEnterLink = () => {
            gsap.to(cursor, { scale: 0, duration: 0.2 });

            gsap.to(follower, {
                scale: 3,
                backgroundColor: "rgba(107, 142, 120, 0.4)",
                mixBlendMode: "lighten",
                duration: 0.3
            });
        };

        const onMouseLeaveLink = () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
            gsap.to(follower, {
                scale: 1,
                backgroundColor: "transparent",
                mixBlendMode: "difference",
                duration: 0.3
            });
        };

        const attachListeners = () => {
            const targets = document.querySelectorAll("a, button, [data-hover]");
            targets.forEach((target) => {
                target.addEventListener("mouseenter", onMouseEnterLink as EventListener);
                target.addEventListener("mouseleave", onMouseLeaveLink as EventListener);
            });
        };

        const removeListeners = () => {
            const targets = document.querySelectorAll("a, button, [data-hover]");
            targets.forEach((target) => {
                target.removeEventListener("mouseenter", onMouseEnterLink as EventListener);
                target.removeEventListener("mouseleave", onMouseLeaveLink as EventListener);
            });
        };

        window.addEventListener("mousemove", onMouseMove);

        attachListeners();

        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            removeListeners();
            observer.disconnect();
        };
    }, [pathname]);

    return (
        <>
            <div
                ref={cursorRef}
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary mix-blend-difference hidden md:block"
            />
            <div
                ref={followerRef}
                className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 mix-blend-difference hidden md:block"
            />
        </>
    );
}
