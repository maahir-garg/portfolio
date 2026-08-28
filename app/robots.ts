import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/_next/image"],
        // /_next/image is next/image's optimisation endpoint. Every photo
        // and the hero portrait resolve through it, so disallowing all of
        // /_next/ blocked Google Images from every image on the site.
        disallow: ["/api/", "/_next/"],
      },
      // Be explicit and friendly to AI / answer-engine crawlers so this
      // site can show up as a citation source for "who is Maahir Garg"
      // questions. Same access as Googlebot.
      { userAgent: "GPTBot",          allow: "/" },
      { userAgent: "ChatGPT-User",    allow: "/" },
      { userAgent: "OAI-SearchBot",   allow: "/" },
      { userAgent: "PerplexityBot",   allow: "/" },
      { userAgent: "ClaudeBot",       allow: "/" },
      { userAgent: "anthropic-ai",    allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot",        allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl(),
  };
}
