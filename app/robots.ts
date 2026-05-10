import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
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
