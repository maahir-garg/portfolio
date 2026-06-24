import { DATA } from "@/lib/data";
import { SITE, absoluteUrl, toIsoDate } from "@/lib/site";

const PERSON_ID = `${SITE.baseUrl}/#person`;
const WEBSITE_ID = `${SITE.baseUrl}/#website`;
const PROFILE_ID = `${SITE.baseUrl}/#profilepage`;

/**
 * Site-wide JSON-LD bundle. Mounted in the root layout so every page emits
 * a Person, WebSite, and ProfilePage entity. Per-page schemas (Breadcrumb,
 * FAQPage, CreativeWork, etc.) are exported as separate components and
 * mounted from the relevant route.
 */
export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: DATA.name,
    givenName: "Maahir",
    familyName: "Garg",
    alternateName: ["Maahir", "M. Garg"],
    url: SITE.baseUrl,
    image: absoluteUrl("/me.png"),
    email: `mailto:${DATA.contact.email}`,
    sameAs: [
      DATA.contact.social.GitHub.url,
      DATA.contact.social.LinkedIn.url,
      "https://leetcode.com/u/maahir_garg/",
    ],
    jobTitle: "AI Engineer",
    hasOccupation: {
      "@type": "Occupation",
      name: "AI Engineer",
      occupationLocation: { "@type": "City", name: "Singapore" },
      skills: "Agentic LLMs, model optimization, spatial computing, data engineering, quantitative finance",
    },
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
    nationality: { "@type": "Country", name: "India" },
    workLocation: {
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
      "Algorithms",
    ],
    knowsLanguage: ["English"],
    description: DATA.summary,
    seeks: {
      "@type": "Demand",
      name: "Research and engineering collaborations on agentic LLM systems and spatial computing",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.baseUrl,
    name: `${DATA.name} · Portfolio`,
    alternateName: `${DATA.name} · Field Notebook`,
    description: DATA.description,
    inLanguage: "en-US",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    copyrightHolder: { "@id": PERSON_ID },
    copyrightYear: 2026,
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": PROFILE_ID,
    url: SITE.baseUrl,
    name: `${DATA.name} · AI Engineer`,
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    dateModified: SITE.lastModified,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "main p:first-of-type"],
    },
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

/* ------------------------------------------------------------------ */
/*  Per-page schemas                                                   */
/* ------------------------------------------------------------------ */

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Project-level CreativeWork schema. We use SoftwareSourceCode when there's
 * a public source URL and CreativeWork otherwise. Google rewards specificity.
 */
export function ProjectJsonLd({ slug }: { slug: string }) {
  const project = DATA.projects.find((p) => p.slug === slug);
  if (!project) return null;

  const sourceLink = project.links.find((l) => l.type === "Source" && l.href)?.href;
  const baseType = sourceLink ? "SoftwareSourceCode" : "CreativeWork";
  const url = absoluteUrl(`/projects/${slug}`);

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": baseType,
    "@id": `${url}#${baseType.toLowerCase()}`,
    name: project.title,
    headline: project.title,
    description: project.description,
    url,
    inLanguage: "en-US",
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    keywords: project.technologies.join(", "),
    about: project.technologies,
    isPartOf: { "@id": WEBSITE_ID },
    dateModified: SITE.lastModified,
  };

  const isoDate = toIsoDate(project.dates);
  if (isoDate) {
    data.dateCreated = isoDate;
    data.datePublished = isoDate;
  }

  if (sourceLink) {
    data.codeRepository = sourceLink;
    data.programmingLanguage = project.technologies;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Schema.org CollectionPage / ItemList for the /projects index. Helps Google
 * group all projects under one canonical and avoid treating the list page
 * as a duplicate of project detail pages.
 */
export function ProjectsCollectionJsonLd() {
  const url = absoluteUrl("/projects");
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: "Projects · Maahir Garg",
    description: `A running archive of ${DATA.projects.length} projects by Maahir Garg.`,
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: DATA.projects.length,
      itemListElement: DATA.projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/projects/${p.slug}`),
        name: p.title,
      })),
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
