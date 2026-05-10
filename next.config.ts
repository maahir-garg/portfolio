import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonical URL form: no trailing slash. Any /path/ is 301'd to /path by Next.
  trailingSlash: false,
  // We don't need x-powered-by exposed; one less fingerprint signal.
  poweredByHeader: false,
  // Strict mode catches state issues that can affect interactive content / SEO.
  reactStrictMode: true,
  // Compress images aggressively; the hero PNG is multi-MB on disk.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          // Tell crawlers explicitly that everything served is indexable.
          // Page-level <meta name="robots"> can still override per route.
          { key: "X-Robots-Tag", value: "index, follow, max-image-preview:large, max-snippet:-1" },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [{ key: "Content-Type", value: "application/xml; charset=utf-8" }],
      },
      {
        source: "/robots.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
    ];
  },
  async redirects() {
    return [
      // Force non-www. The canonical host is `maahir-garg.vercel.app`.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.maahir-garg.vercel.app" }],
        destination: "https://maahir-garg.vercel.app/:path*",
        permanent: true,
      },
      // Strip a known historical alias / casing variant if any was indexed.
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
