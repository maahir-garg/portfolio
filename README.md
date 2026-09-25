# Portfolio

My personal site: [maahir-garg.vercel.app](https://maahir-garg.vercel.app/).

Paper, ink, and one red pen. Headlines get marked up the way I mark algorithm proofs as a TA, photos behave like prints you can pick up and toss, and the flights I've taken draw themselves on a map. Press ⌘K (or `/`) anywhere to jump around.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # also regenerates the photo manifest (prebuild)
npm test             # content checks (no em dashes, etc.)
SITE_URL=http://localhost:3000 npm run verify:site   # SEO/meta checks against a running server
```

## Where things live

```
app/                      routes (App Router); app/motion.css holds interaction styles
components/
  home/                   Hero, WorkAndProjects, PhotographyStrip (the photo desk)
  motion/                 Print, JumpBar, TransitionLink, PinchCursor, motion tokens
  ui/RedPen.tsx           hand-drawn circle / underline / strike / margin note marks
  feature/                FlightsMap (+ client enhancer), LeetCode stats
  photography/            gallery + lightbox
  seo/JsonLd.tsx          structured data
lib/
  data.ts                 all the words: roles, projects, about, now
  site.ts                 URL, SEO defaults, SITE.lastModified
  flights.csv             airports for the routes map
  photos-meta.json        hand-written photo locations (manifest is generated)
```

## Notes to future me

- Copy lives in `lib/data.ts`. Numbers belong in a project's `evidence`, not its description.
- Bump `SITE.lastModified` in `lib/site.ts` when content changes; the sitemap and JSON-LD read it.
- Every page declares its own canonical, and interior pages pass `OG_IMAGE` in any `openGraph`/`twitter` override.
- Keep `public/llms.txt` in sync with what the pages say.
- next/font variables sit on `<html>`, not `<body>`, so `--font-serif` resolves at `:root`.
- Motion: one easing curve and three springs in `components/motion/tokens.ts`. Everything has a reduced-motion path, and dragging only happens on fine pointers.
- New photos: drop them in `public/photography/<category>/`, add a location to `lib/photos-meta.json`, then build.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, framer-motion. Deployed on Vercel.
