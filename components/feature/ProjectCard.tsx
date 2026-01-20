"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, ExternalLink, Lock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface ProjectLink {
    type: string;
    href: string;
    icon: string;
}

interface ProjectCardProps {
    title: string;
    description: string;
    tags: readonly string[];
    links: readonly ProjectLink[];
    href: string;
    active?: boolean;
}

export function ProjectCard({
    title,
    description,
    tags,
    links,
    href,
    active,
}: ProjectCardProps) {
    const router = useRouter();

    return (
        <Card
            className="flex flex-col h-full group relative cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => href && router.push(href)}
            onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && href) {
                    e.preventDefault();
                    router.push(href);
                }
            }}
        >
            <div className="flex flex-col flex-1 gap-4 relative">
                <div className="space-y-2">
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-xl tracking-tight text-ink group-hover:text-accent transition-colors">
                            {title}
                        </h3>
                        {active && (
                            <span className="relative flex h-2 w-2 mt-2" title="Active Project">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="flex gap-3 mt-4 pt-4 border-t border-border/50">
                    {links.map((link, idx) => {
                        const icon =
                            link.icon === "github"
                                ? <Github size={14} />
                                : link.icon === "lock"
                                    ? <Lock size={14} />
                                    : <ExternalLink size={14} />;

                        if (!link.href) {
                            return (
                                <span
                                    key={`${link.type}-${idx}`}
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted/70 z-20 cursor-default"
                                    aria-label={link.type}
                                >
                                    {icon}
                                    {link.type}
                                </span>
                            );
                        }

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-accent transition-colors z-20"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {icon}
                                {link.type}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
}
