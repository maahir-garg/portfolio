"use client";

import { motion, Variants } from "framer-motion";

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export function SplitText({ text, className, delay = 0 }: SplitTextProps) {
    const words = text.split(" ");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay * i },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: 0.8
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
        },
    };

    return (
        <motion.span
            style={{ display: "inline-block", overflow: "hidden" }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                    key={index}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}
