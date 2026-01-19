import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export function SectionHeading({ children, className, ...props }: SectionHeadingProps) {
    return (
        <h2
            className={cn("text-2xl font-serif font-medium mb-8 text-ink/90", className)}
            {...props}
        >
            {children}
        </h2>
    );
}
