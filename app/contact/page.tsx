"use client";

import { Container } from "@/components/ui/Container";
import { DATA } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, Github, Linkedin, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="py-20 md:py-32">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight text-ink">Get in Touch</h1>
                            <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <a href={`mailto:${DATA.contact.email}`} className="flex items-center gap-4 text-ink hover:text-accent transition-colors p-4 border border-border rounded-lg bg-card">
                                <Mail className="h-6 w-6" />
                                <div>
                                    <div className="text-xs text-ink-muted">Email</div>
                                    <div className="font-medium">{DATA.contact.email}</div>
                                </div>
                            </a>

                            <a href={`tel:${DATA.contact.tel.replace(/\s+/g, '')}`} className="flex items-center gap-4 text-ink hover:text-accent transition-colors p-4 border border-border rounded-lg bg-card">
                                <Phone className="h-6 w-6" />
                                <div>
                                    <div className="text-xs text-ink-muted">Phone</div>
                                    <div className="font-medium">{DATA.contact.tel}</div>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 text-ink p-4 border border-border rounded-lg bg-card">
                                <MapPin className="h-6 w-6" />
                                <div>
                                    <div className="text-xs text-ink-muted">Location</div>
                                    <div className="font-medium">{DATA.location}</div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-border">
                            <h3 className="font-semibold mb-4">Socials</h3>
                            <div className="flex gap-4">
                                <a href={DATA.contact.social.GitHub.url} target="_blank" className="p-3 bg-card border border-border rounded-full hover:border-accent hover:text-accent transition-all">
                                    <Github size={20} />
                                </a>
                                <a href={DATA.contact.social.LinkedIn.url} target="_blank" className="p-3 bg-card border border-border rounded-full hover:border-accent hover:text-accent transition-all">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-8 h-fit">
                        <h2 className="text-xl font-bold mb-6">Send a Message</h2>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <input id="name" type="text" className="w-full bg-canvas border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <input id="email" type="email" className="w-full bg-canvas border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <textarea id="message" rows={4} className="w-full bg-canvas border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Hello..." />
                            </div>
                            <Button className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
}
