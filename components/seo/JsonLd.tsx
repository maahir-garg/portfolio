import { DATA } from "@/lib/data";

const BASE_URL = "https://maahir-garg.vercel.app";

export function JsonLd() {
    const person = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: DATA.name,
        givenName: "Maahir",
        familyName: "Garg",
        alternateName: ["Maahir", "M. Garg"],
        url: BASE_URL,
        image: `${BASE_URL}/me.png`,
        email: `mailto:${DATA.contact.email}`,
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
        address: {
            "@type": "PostalAddress",
            addressLocality: "Singapore",
            addressCountry: "SG",
        },
        homeLocation: {
            "@type": "Place",
            name: "Singapore",
        },
        knowsAbout: [
            "Large Language Models",
            "Agentic AI",
            "Machine Learning",
            "Spatial Computing",
            "Apple Vision Pro",
            "Data Engineering",
            "Quantitative Finance",
        ],
        knowsLanguage: ["English"],
        description: DATA.description,
    };

    const website = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: `${DATA.name} — Portfolio`,
        alternateName: `${DATA.name} · Field Notebook`,
        description: DATA.description,
        inLanguage: "en-US",
        author: { "@id": `${BASE_URL}/#person` },
        publisher: { "@id": `${BASE_URL}/#person` },
    };

    const profilePage = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${BASE_URL}/#profilepage`,
        url: BASE_URL,
        name: `${DATA.name} — AI Engineer`,
        about: { "@id": `${BASE_URL}/#person` },
        mainEntity: { "@id": `${BASE_URL}/#person` },
        isPartOf: { "@id": `${BASE_URL}/#website` },
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
            />
        </>
    );
}
