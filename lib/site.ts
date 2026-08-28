/**
 * Single source of truth for site URL, name, and SEO defaults.
 *
 * Canonical URL form (enforced everywhere):
 *   - https (Vercel terminates TLS automatically)
 *   - non-www
 *   - no trailing slash
 *   - host: maahir-garg.vercel.app
 *
 * Any non-canonical variant (http, with-www, with trailing slash) must
 * 301 redirect to the canonical form via vercel.json / next.config.
 */
export const SITE = {
  name: "Maahir Garg",
  shortName: "Maahir Garg",
  fullName: "Maahir Garg",
  jobTitle: "AI Engineer",
  longJobTitle: "AI Engineer · Computer Science & Quantitative Finance",
  locality: "Singapore",
  country: "SG",
  baseUrl: "https://maahir-garg.vercel.app",
  ogImagePath: "/opengraph-image",
  email: "maahirrgarg@gmail.com",
  twitter: "@maahirgarg",
  // ISO date used as default lastModified across the site. Bumped manually
  // when content meaningfully changes so Google sees a real freshness signal
  // instead of a build-time `new Date()` that thrashes every deploy.
  lastModified: "2026-08-28",
  // Site launch date (first commit / first deploy). Used as ProfilePage
  // dateCreated is one of Google's two recommended date properties there.
  dateCreated: "2026-01-19",
} as const;

export function absoluteUrl(path: string = "/"): string {
  if (path === "" || path === "/") return SITE.baseUrl;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.baseUrl}${clean}`.replace(/\/+$/, "");
}

/**
 * Shared OG image for page-level `openGraph`/`twitter` overrides. A page
 * that defines `openGraph` replaces the inherited object entirely, and the
 * root file-convention opengraph-image.tsx does not attach to segments
 * that do so. Without restating `images`, interior pages unfurl with no
 * card image on WhatsApp/LinkedIn/Slack/X.
 */
export const OG_IMAGE = [
  {
    url: `${SITE.baseUrl}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: "Maahir Garg, AI Engineer at AICET and CS plus Quantitative Finance student at NUS.",
  },
];

/**
 * Expand a YYYY-MM-DD date into a full ISO 8601 DateTime at midnight SGT.
 * Google's Search Console types ProfilePage dateCreated/dateModified (and
 * article:*_time OG tags) as DateTime and reports bare dates as
 * "Invalid datetime value". Every date that reaches JSON-LD or OG meta
 * must pass through here.
 */
export function toIsoDateTime(isoDate: string): string {
  return `${isoDate}T00:00:00+08:00`;
}

const MONTHS: Record<string, string> = {
  jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
  jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
};

/**
 * Convert a human-readable project date like "Nov 2025" or "Feb 2026 – Present"
 * into an ISO-8601 date (the start of the range). Structured-data fields
 * (article:published_time, datePublished, dateCreated) require ISO dates;
 * passing the raw display string makes Google drop the property. Returns
 * undefined when there's nothing parseable (e.g. "Ongoing").
 */
export function toIsoDate(dates: string): string | undefined {
  const start = dates.split(/[–-]/)[0].trim();
  const monthYear = start.match(/^([A-Za-z]{3,})\s+(\d{4})$/);
  if (monthYear) {
    const month = MONTHS[monthYear[1].slice(0, 3).toLowerCase()];
    if (month) return `${monthYear[2]}-${month}-01`;
  }
  const yearOnly = start.match(/^(\d{4})$/);
  if (yearOnly) return `${yearOnly[1]}-01-01`;
  return undefined;
}
