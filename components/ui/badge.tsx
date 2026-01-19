import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: "default" | "outline" | "secondary";
}

export function Badge({ children, className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "bg-accent/10 text-accent border-accent/20 hover:bg-accent/20",
        outline: "bg-transparent border-border text-ink-muted hover:text-ink hover:border-ink",
        secondary: "bg-card text-ink border-border hover:bg-card-hover",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
