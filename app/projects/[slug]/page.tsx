import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Github, ExternalLink, ArrowLeft, Lock } from "lucide-react";
import { DATA } from "@/lib/data";

// Correct type for params in Next.js 15
export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = DATA.projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <article className="py-20 md:py-32">
            <Container>
                <div className="max-w-3xl mx-auto space-y-12">
                    {/* Header */}
                    <div className="space-y-6">
                        <Link href="/projects" className="inline-flex items-center text-sm text-ink-muted hover:text-accent transition-colors">
                            <ArrowLeft size={14} className="mr-1" />
                            Back to Projects
                        </Link>

                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink">
                            {project.title}
                        </h1>

                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <p className="text-xl text-ink-muted leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex gap-4 pt-4">
                            {project.links.map((link, idx) => {
                                const icon =
                                    link.icon === "github"
                                        ? <Github size={16} />
                                        : link.icon === "lock"
                                            ? <Lock size={16} />
                                            : <ExternalLink size={16} />;

                                if (!link.href) {
                                    return (
                                        <Button
                                            key={`${link.type}-${idx}`}
                                            variant="outline"
                                            className="gap-2"
                                            disabled
                                        >
                                            {icon}
                                            {link.type}
                                        </Button>
                                    );
                                }

                                return (
                                    <Link key={link.href} href={link.href} target="_blank">
                                        <Button variant="outline" className="gap-2">
                                            {icon}
                                            {link.type}
                                        </Button>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </Container>
        </article>
    );
}

// Generate static params for all projects
export async function generateStaticParams() {
    return DATA.projects.map((project) => ({
        slug: project.slug,
    }));
}
