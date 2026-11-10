import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.fullName,
    short_name: "Maahir",
    description: "Maahir Garg's personal site: work, projects, and photographs.",
    start_url: "/",
    display: "browser",
    background_color: "#f6f3ec",
    theme_color: "#f6f3ec",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
