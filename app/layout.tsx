import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";
import { SITE, absoluteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0e0c" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: "Maahir Garg · AI Engineer at GIC · NUS Computer Science",
    template: "%s · Maahir Garg",
  },
  description:
    "Maahir Garg is an AI Engineer at GIC and a Computer Science & Quantitative Finance student at the National University of Singapore (NUS). Maahir builds agentic LLM tooling for classified-data environments and holds a patent-pending multimodal hand-tracking framework on Apple Vision Pro. Portfolio, projects, and photography.",
  applicationName: "Maahir Garg · Field Notebook",
  authors: [{ name: SITE.fullName, url: SITE.baseUrl }],
  creator: SITE.fullName,
  publisher: SITE.fullName,
  keywords: [
    "Maahir Garg",
    "Maahir",
    "Garg",
    "Maahir Garg portfolio",
    "Maahir Garg AI Engineer",
    "Maahir Garg NUS",
    "Maahir Garg GIC",
    "Maahir Garg Singapore",
    "AI Engineer Singapore",
    "LLM engineer Singapore",
    "agentic AI",
    "machine learning Singapore",
    "NUS Computer Science",
    "NUS Quantitative Finance",
    "GIC AI Engineer",
    "Apple Vision Pro developer",
    "spatial computing Singapore",
    "Maahir Garg software engineer",
  ],
  alternates: {
    canonical: absoluteUrl(),
    languages: {
      "en": absoluteUrl(),
      "x-default": absoluteUrl(),
    },
    types: {
      "application/rss+xml": [],
    },
  },
  openGraph: {
    title: "Maahir Garg · AI Engineer at GIC · NUS Computer Science",
    description:
      "AI Engineer at GIC. Agentic LLMs, model optimization, spatial computing. CS + Quant Finance at NUS.",
    type: "website",
    url: absoluteUrl(),
    siteName: SITE.fullName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maahir Garg · AI Engineer at GIC · NUS Computer Science",
    description:
      "AI Engineer at GIC. Agentic LLMs, model optimization, spatial computing. CS + Quant Finance at NUS.",
    creator: SITE.twitter,
    site: SITE.twitter,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  // Existing GSC verification is via the /google2504911a6657dea8.html file in
  // /public, which Google will fetch directly. Adding the meta-tag form below
  // belt-and-braces if/when the user pastes the verification token.
  verification: {
    // google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resource hints: tell the browser to warm up the connections we
            know we'll need before any HTML body parses. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        {/* LCP hint: the home hero photo. Browsers ignore it on routes that
            don't actually use it; on the homepage it lifts LCP measurably. */}
        <link rel="preload" as="image" href="/me.png" fetchPriority="high" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} relative flex min-h-screen flex-col`}
      >
        <a href="#main" className="skip-link">Skip to content</a>
        <ThemeProvider>
          <Header />
          <main id="main" className="relative z-[2] flex-1 pt-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <JsonLd />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
