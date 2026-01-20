import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Maahir Garg | AI Engineer",
  description: "AI Engineer at GIC. Computer Science student at NUS. Exploring the intersection of Large Language Models, Optimization, and Data Engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased font-sans bg-canvas text-ink flex flex-col min-h-screen`}
      >
        <Header />
        <SmoothScroll />
        <CustomCursor />
        <main className="flex-1 pt-24">
          {children}
        </main>
        <Footer />
        <JsonLd />
      </body>
    </html>
  );
}
