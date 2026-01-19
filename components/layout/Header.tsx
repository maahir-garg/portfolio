"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { DATA } from "@/lib/data";

const navItems = [
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-canvas/80 backdrop-blur-md border-b border-border/50 py-3"
                    : "bg-transparent py-5"
            )}
        >
            <Container className="flex items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-ink hover:text-accent transition-colors"
                >
                    {DATA.name.split(" ")[0]}
                    <span className="text-accent">.</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-accent",
                                pathname === item.href
                                    ? "text-accent"
                                    : "text-ink-muted"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-ink hover:text-accent"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </Container>


            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-canvas border-b border-border p-4 md:hidden shadow-2xl"
                    >
                        <Container className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "text-lg font-medium py-2 border-b border-border/10",
                                        pathname === item.href ? "text-accent" : "text-ink"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="flex gap-4 mt-4 pt-4 border-t border-border">
                                <a href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-accent">
                                    <Github size={20} />
                                </a>
                                <a href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="text-ink-muted hover:text-accent">
                                    <Linkedin size={20} />
                                </a>
                                <a href={DATA.contact.social.email.url} className="text-ink-muted hover:text-accent">
                                    <Mail size={20} />
                                </a>
                            </div>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
