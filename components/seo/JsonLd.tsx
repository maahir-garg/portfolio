import { DATA } from "@/lib/data";

export function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: DATA.name,
        url: "https://maahir-garg.vercel.app",
        sameAs: [
            DATA.contact.social.GitHub.url,
            DATA.contact.social.LinkedIn.url,
        ],
        jobTitle: "AI Engineer",
        worksFor: {
            "@type": "Organization",
            name: "GIC",
        },
        description: DATA.description,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
