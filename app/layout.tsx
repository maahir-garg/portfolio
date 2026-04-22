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
    default: "Maahir Garg · Field Notebook",
    template: "%s · Maahir Garg",
  },
  description:
    "Maahir Garg. AI Engineer at GIC, building agentic LLM tooling for classified-data environments. Computer Science & Quantitative Finance at NUS. Patent-pending multimodal hand-tracking on Vision Pro. Also a photographer.",
  authors: [{ name: "Maahir Garg", url: BASE_URL }],
  creator: "Maahir Garg",
  keywords: [
    "Maahir Garg",
    "AI Engineer",
    "LLM",
    "agentic AI",
    "machine learning",
    "NUS",
    "GIC",
    "Apple Vision Pro",
    "spatial computing",
    "portfolio",
    "software engineer",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Maahir Garg · Field Notebook",
    description:
      "AI Engineer at GIC. Agentic LLMs, model optimization, spatial computing. CS + Quant Finance at NUS.",
    type: "website",
    url: BASE_URL,
    siteName: "Maahir Garg · Field Notebook",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maahir Garg · Field Notebook",
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
    },
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
