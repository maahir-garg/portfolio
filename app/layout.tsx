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
    default: "Maahir Garg · AI Engineer · NUS Computer Science",
    template: "%s · Maahir Garg",
  },
  // Kept under ~160 chars so Google shows it whole instead of truncating
  // or rewriting; the long-form bio lives in the Person JSON-LD.
  description:
    "Maahir Garg is an AI Engineer at AICET's Team Koditsu and former GIC AI Engineer, studying Computer Science and Quantitative Finance at NUS.",
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
    "Maahir Garg AICET",
    "Maahir Garg Koditsu",
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
  // No `alternates` here on purpose: a root-layout canonical is inherited
  // by every page that forgets its own (incl. the 404), silently marking it
  // a duplicate of the homepage. The homepage canonical lives in app/page.tsx;
  // every route must declare its own.
  openGraph: {
    title: "Maahir Garg · AI Engineer · NUS Computer Science",
    description:
      "AI Engineer at AICET's Team Koditsu, former GIC AI Engineer, and CS plus Quantitative Finance student at NUS.",
    type: "website",
    url: absoluteUrl(),
    siteName: SITE.fullName,
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maahir Garg · AI Engineer · NUS Computer Science",
    description:
      "AI Engineer at AICET's Team Koditsu, former GIC AI Engineer, and CS plus Quantitative Finance student at NUS.",
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
    <html lang="en-SG" suppressHydrationWarning>
      <head>
        {/* Fonts are self-hosted at build time via next/font, so no
            connection hints to Google Fonts are needed. The hero photo's
            preload comes from next/image `priority` on the homepage, which
            points at the optimised /_next/image URL rather than the raw file. */}
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
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
