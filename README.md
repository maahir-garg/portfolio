# Maahir Garg - Personal Website

A premium, interaction-forward personal website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

-   **Single Page Scroll Architecture**: Smooth navigation between sections.
-   **Interactive Timeline**: Custom "connector" animation in the Experience section.
-   **Projects Section**: Selected work grid with hover effects.
-   **Design System**: Custom typography (Newsreader + Geist) and color tokens.
-   **Responsive & Accessible**: Optimized for all devices and inputs.

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Open** [http://localhost:3000](http://localhost:3000) with your browser.

## Editing Content

All content is managed in **`lib/data.ts`**.
-   Update `personalInfo` for contact details and bio.
-   Update `experience` array for the timeline.
-   Update `projects` array for the selected work grid.

## Deployment

The easiest way to deploy is using **Vercel**.

1.  Push this repository to GitHub.
2.  Import the project into Vercel.
3.  Deploy.

## Tech Stack

-   **Framework**: Next.js 16 (App Router)
-   **Styling**: Tailwind CSS v4
-   **Motion**: Framer Motion
-   **Icons**: Lucide React
