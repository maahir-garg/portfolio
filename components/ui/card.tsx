"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "bg-white rounded-xl border border-border p-6 shadow-sm transition-colors hover:border-ink/20",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}
