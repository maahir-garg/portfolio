"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
}

export function Card({ children, className, onClick, ...props }: CardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={onClick}
            className={cn(
                "bg-card rounded-2xl border border-border/60 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-accent/40 cursor-pointer relative overflow-hidden",
                className
            )}
            {...props}
        >
            {/* Subtle warm glow on hover could be added here if needed, keeping it clean for now */}
            {children}
        </motion.div>
    );
}
