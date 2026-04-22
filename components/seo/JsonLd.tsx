import { DATA } from "@/lib/data";

const BASE_URL = "https://maahir-garg.vercel.app";

export function JsonLd() {
    const person = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: DATA.name,
        url: BASE_URL,
        sameAs: [
            DATA.contact.social.GitHub.url,
            DATA.contact.social.LinkedIn.url,
        ],
        jobTitle: "AI Engineer",
        worksFor: {
            "@type": "Organization",
            name: "GIC",
            url: "https://www.gic.com.sg",
        },
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "National University of Singapore",
            url: "https://www.nus.edu.sg",
        },
        knowsAbout: [
            "Large Language Models",
            "Agentic AI",
            "Machine Learning",
            "Spatial Computing",
            "Apple Vision Pro",
            "Data Engineering",
        ],
        description: DATA.description,
    };

    const website = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: `${DATA.name} · Field Notebook`,
        author: { "@id": `${BASE_URL}/#person` },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
            />
        </>
    );
}
