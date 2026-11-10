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
  email: "maahirrgarg@gmail.com",
  // ISO date used as default lastModified across the site. Bumped manually
  // when content meaningfully changes so Google sees a real freshness signal
  // instead of a build-time `new Date()` that thrashes every deploy.
  lastModified: "2026-11-10",
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
 * Bump whenever the share cards in public/og/ are re-rendered
 * (node scripts/make-og.mjs). WhatsApp, Telegram, LinkedIn and Slack cache a
 * preview image by its URL, so without a new query string they keep showing
 * the old card for weeks.
 */
export const OG_VERSION = "2026-11-10";

/**
 * Share-card image for a page: `ogImage("about", ...)` points at
 * public/og/about.jpg, `ogImage("projects/pgpals", ...)` at
 * public/og/projects/pgpals.jpg. Every page that sets `openGraph` or
 * `twitter` must pass its own `images`: a page-level override replaces the
 * inherited object entirely, so a page that forgets unfurls with no image.
 */
export function ogImage(name: string, alt: string) {
  return [
    {
      url: `${SITE.baseUrl}/og/${name}.jpg?v=${OG_VERSION}`,
      width: 1200,
      height: 630,
      type: "image/jpeg",
      alt,
    },
  ];
}

/** The home-page card, also the fallback for the root layout. */
export const OG_IMAGE = ogImage(
  "home",
  'The words "I play blitz chess well", with "well" struck out in red pen and corrected to "fast", beside a photo of Maahir Garg.',
);

/**
 * Meta descriptions over about 160 characters get cut off mid-word in search
 * results and link previews. Keep whole sentences while they fit, and fall
 * back to a word boundary.
 */
export function clampDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  const sentences = text.split(/(?<=[.!?])\s+/);
  let out = "";
  for (const sentence of sentences) {
    const next = out ? `${out} ${sentence}` : sentence;
    if (next.length > max) break;
    out = next;
  }
  if (out.length >= 60) return out;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`;
}

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
