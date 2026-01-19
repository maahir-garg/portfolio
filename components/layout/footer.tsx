import { Container } from "@/components/ui/container";
import { personalInfo } from "@/lib/data";

export function Footer() {
    return (
        <footer id="contact" className="py-12 border-t border-border mt-20">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h3 className="text-xl font-serif font-medium mb-2">Get in touch</h3>
                        <div className="space-y-1 text-sm text-ink-muted">
                            <p>
                                <a href={`mailto:${personalInfo.email}`} className="hover:text-ink transition-colors">
                                    {personalInfo.email}
                                </a>
                            </p>
                            <p>{personalInfo.phone}</p>
                        </div>
                    </div>
                    <div className="flex gap-6 text-sm">
                        <a
                            href={personalInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink-muted hover:text-ink transition-colors"
                        >
                            LinkedIn
                        </a>
                        <span className="text-gray-300">|</span>
                        <span className="text-ink-muted">© {new Date().getFullYear()} Maahir Garg</span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
