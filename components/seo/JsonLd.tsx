import { DATA } from "@/lib/data";
import { SITE, absoluteUrl, toIsoDate, toIsoDateTime } from "@/lib/site";

const PERSON_ID = `${SITE.baseUrl}/#person`;
const WEBSITE_ID = `${SITE.baseUrl}/#website`;
const PROFILE_ID = `${SITE.baseUrl}/#profilepage`;

/**
 * JSON.stringify does not escape "<", so a content string containing
 * "</script" or "<!--" would terminate the inline script and drop every
 * JSON-LD block on the page. < is identical JSON, so parsers and
 * Google read it unchanged.
 */
function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

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
    image: absoluteUrl("/me.jpg"),
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
    // Current student (2023–2027), so memberOf rather than alumniOf —
    // alumniOf asserts a *completed* affiliation and would contradict the
    // visible copy ("I study ... at NUS"). Flip to alumniOf after graduation.
    memberOf: {
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
    dateCreated: toIsoDateTime(SITE.dateCreated),
    dateModified: toIsoDateTime(SITE.lastModified),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "main p:first-of-type"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(profilePage) }}
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
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

const PROGRAMMING_LANGUAGES = new Set([
  "Python", "Swift", "TypeScript", "JavaScript", "Java", "R", "Bash",
  "C", "C++", "C#", "Go", "Rust", "Kotlin", "Scala", "SQL", "MATLAB",
  "Julia", "HTML", "CSS",
]);

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
    dateModified: toIsoDateTime(SITE.lastModified),
  };

  const isoDate = toIsoDate(project.dates);
  if (isoDate) {
    data.dateCreated = toIsoDateTime(isoDate);
    data.datePublished = toIsoDateTime(isoDate);
  }

  if (sourceLink) {
    data.codeRepository = sourceLink;
    // technologies mixes languages with frameworks, models, and hardware
    // ("Vision Pro", "LoRA"); schema.org programmingLanguage must name an
    // actual language, so only emit the entries that are one.
    const languages = project.technologies.filter((t) =>
      PROGRAMMING_LANGUAGES.has(t)
    );
    if (languages.length > 0) data.programmingLanguage = languages;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
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
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
