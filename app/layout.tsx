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

export const metadata: Metadata = {
  title: "Maahir Garg — Field Notebook",
  description:
    "Maahir Garg — AI engineer at GIC, Computer Science & Quantitative Finance at NUS. Working on LLMs, optimization, data pipelines, and the occasional Vision Pro experiment. Also a photographer.",
  authors: [{ name: "Maahir Garg" }],
  openGraph: {
    title: "Maahir Garg — Field Notebook",
    description:
      "AI engineer at GIC, CS student at NUS. LLMs, optimization, and spatial computing. Occasionally behind a camera.",
    type: "website",
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
