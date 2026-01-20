import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DATA } from "@/lib/data";

export function Footer() {
    return (
        <footer className="py-8 mt-20 border-t border-border">
            <Container className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ink-muted">
                <div>
                    &copy; {new Date().getFullYear()} {DATA.name}. All rights reserved.
                </div>
                <div className="flex gap-4">
                    <Link href={DATA.contact.social.GitHub.url} target="_blank" className="hover:text-accent transition-colors">
                        GitHub
                    </Link>
                    <Link href={DATA.contact.social.LinkedIn.url} target="_blank" className="hover:text-accent transition-colors">
                        LinkedIn
                    </Link>
                    <Link href="/contact" className="hover:text-accent transition-colors">
                        Contact
                    </Link>
                </div>
            </Container>
        </footer>
    );
}
