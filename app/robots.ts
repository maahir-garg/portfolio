import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // Nothing is disallowed, on purpose. /_next/ holds the JavaScript,
        // CSS, fonts and optimised images every page is built from. Blocking
        // it (as this file did until Nov 2026) meant Googlebot could not
        // load a single script or stylesheet, so Search Console rendered
        // each page unstyled and reported the resources as "blocked by
        // robots.txt". There are no API routes or private paths to hide.
        allow: "/",
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
  };
}
