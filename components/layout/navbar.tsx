"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = React.useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const links = [
        { href: "#experience", label: "Work" },
        { href: "#about", label: "About" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <motion.header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
                isScrolled ? "bg-canvas/80 backdrop-blur-md border-b border-border/50" : "bg-transparent"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ stiffness: 100, damping: 20 }}
        >
            <Container className="flex items-center justify-between h-16">
                <Link
                    href="/"
                    className="text-lg font-serif font-medium tracking-tight hover:opacity-70 transition-opacity"
                >
                    Maahir Garg
                </Link>
                <nav className="flex gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </Container>
        </motion.header>
    );
}
