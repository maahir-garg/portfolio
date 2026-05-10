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
  lastModified: "2026-05-10",
} as const;

export function absoluteUrl(path: string = "/"): string {
  if (path === "" || path === "/") return SITE.baseUrl;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.baseUrl}${clean}`.replace(/\/+$/, "");
}
