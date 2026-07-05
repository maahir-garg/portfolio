import { MetadataRoute } from "next";
import { DATA } from "@/lib/data";
import { SITE, absoluteUrl } from "@/lib/site";

/**
 * Stable per-resource lastModified. Avoid `new Date()` here, since that ties
 * lastmod to deploy time, which makes Google's crawler ignore the signal
 * (it rotates on every push regardless of whether the page changed).
 */
const lastMod = new Date(SITE.lastModified);

const staticRoutes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "",            changeFrequency: "weekly",  priority: 1.0 },
  { path: "/about",      changeFrequency: "monthly", priority: 0.9 },
  { path: "/experience", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects",   changeFrequency: "weekly",  priority: 0.9 },
  { path: "/photography",changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact",    changeFrequency: "yearly",  priority: 0.6 },
  { path: "/now",        changeFrequency: "weekly",  priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: lastMod,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = DATA.projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: lastMod,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Google indexes and ranks PDFs from sitemaps; "maahir garg resume" is a
  // query this file should own. Bump SITE.lastModified when it's replaced.
  const resumeEntry: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/maahir-garg-resume.pdf"),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticEntries, ...projectEntries, ...resumeEntry];
}
