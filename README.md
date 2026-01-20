# Portfolio

Modern, high-performance portfolio built with Next.js, TypeScript, and GSAP. Features smooth animations, custom cursor interactions, and a clean, minimalist design aesthetic.
🌐 **Live Site**: [https://website-delta-liard-64.vercel.app/](https://website-delta-liard-64.vercel.app/)
## Features

- **Smooth Animations**: GSAP-powered transitions and scroll-triggered animations
- **Custom Cursor**: Interactive cursor with magnetic hover effects
- **Interactive Timeline**: Animated progress bar and dynamic experience timeline
- **Photography Gallery**: Dedicated section with scattered and grid view layouts
- **Project Showcase**: Clean project cards with hover interactions
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Performance Optimized**: Static generation with ISR for optimal load times
- **SEO Ready**: Comprehensive meta tags, JSON-LD structured data, sitemap, and robots.txt

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
portfolio/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── experience/        # Experience timeline page
│   ├── photography/       # Photography gallery
│   ├── projects/          # Projects listing & detail pages
│   └── page.tsx           # Home page
├── components/
│   ├── feature/           # Feature components (ProjectCard, SplitText)
│   ├── home/              # Home page components (Hero, ExperienceTimeline)
│   ├── layout/            # Layout components (Header, Footer, CustomCursor)
│   ├── photography/       # Photography components
│   ├── seo/               # SEO components (JSON-LD)
│   └── ui/                # Reusable UI components
├── lib/
│   ├── data.ts            # Site content and configuration
│   ├── photos.json        # Photography metadata
│   └── utils.ts           # Utility functions
├── public/                # Static assets
│   └── photography/       # Photography images
└── scripts/
    └── generate-photos.js # Photo metadata generator
```

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [GSAP](https://greensock.com/gsap/) + [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## Content Management

All site content is centralized in `lib/data.ts`:

```typescript
export const DATA = {
  name: "Your Name",
  contact: { email, social },
  summary: "Your bio",
  work: [...],
  projects: [...],
  skills: {...}
}
```

Update this file to customize your portfolio content.

### Adding Photos

1. Add images to `public/photography/[category]/`
2. Run the photo generator:
   ```bash
   node scripts/generate-photos.js
   ```
3. This automatically updates `lib/photos.json` and `lib/photos-manifest.json`

## Key Components

### Hero Section
Animated hero with split-text reveal, status indicator, and smooth entrance transitions.

### Experience Timeline
Scroll-triggered timeline with animated progress bar and interactive cards.

### Skills Component
Interactive skill categories with smooth expand/collapse animations.

### Custom Cursor
Desktop-only custom cursor with hover state transformations.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

Built with modern web technologies and inspired by contemporary portfolio designs.
