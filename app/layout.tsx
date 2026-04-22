import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const BASE_URL = "https://maahir-garg.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Maahir Garg — AI Engineer | Portfolio",
    template: "%s · Maahir Garg",
  },
  description:
    "Maahir Garg is an AI Engineer at GIC and a Computer Science & Quantitative Finance student at the National University of Singapore (NUS). Maahir builds agentic LLM tooling for classified-data environments and holds a patent-pending multimodal hand-tracking framework on Apple Vision Pro. Portfolio, projects, and photography.",
  applicationName: "Maahir Garg · Field Notebook",
  authors: [{ name: "Maahir Garg", url: BASE_URL }],
  creator: "Maahir Garg",
  publisher: "Maahir Garg",
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
    "LLM engineer",
    "agentic AI",
    "machine learning",
    "NUS Computer Science",
    "NUS Quantitative Finance",
    "GIC AI Engineer",
    "Apple Vision Pro developer",
    "spatial computing",
    "software engineer portfolio",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Maahir Garg — AI Engineer | Portfolio",
    description:
      "AI Engineer at GIC. Agentic LLMs, model optimization, spatial computing. CS + Quant Finance at NUS.",
    type: "website",
    url: BASE_URL,
    siteName: "Maahir Garg",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maahir Garg — AI Engineer | Portfolio",
    description:
      "AI Engineer at GIC. Agentic LLMs, model optimization, spatial computing. CS + Quant Finance at NUS.",
    creator: "@maahirgarg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  verification: {
    // Paste the Google Search Console verification token here after creating a property
    // at https://search.google.com/search-console (choose "URL prefix" → this site's URL).
    // google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
