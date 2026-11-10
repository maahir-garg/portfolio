// Renders the link-preview ("share") cards into public/og/.
//
//   node scripts/make-og.mjs
//
// One card per page, drawn from scripts/og/card.html in headless Chrome and
// saved as a 1200x630 JPEG. Run it after changing a page heading, adding a
// project, or changing the hero headline, then bump OG_VERSION in
// lib/site.ts so chat apps fetch the new images instead of their cached ones.
// Needs Google Chrome installed and a network connection (for the web font).
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import { DATA } from "../lib/data.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const template = pathToFileURL(path.join(root, "scripts/og/card.html")).href;
const outDir = path.join(root, "public/og");
const chrome =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!existsSync(chrome)) {
  console.error(`Chrome not found at ${chrome}. Set CHROME_PATH.`);
  process.exit(1);
}

// Card text for project pages defaults to the first sentence of the project
// description. These are shorter lines for the ones that run long.
const PROJECT_SUB = {
  "bert-qa-quant-prune":
    "How small a BERT question-answering model can get before it gets worse.",
  "3d-iphone":
    "iPhone and Apple Vision Pro as one tracking surface, for assessing movement after a stroke.",
  "stackexchange-scraping":
    "Built for a study on what makes a Stack Overflow answer good.",
  portfolio:
    "This site: paper, ink, and one red pen that marks things up as you scroll.",
};

const firstSentence = (text) => text.split(/(?<=[.!?])\s+/)[0];

const cards = [
  { name: "home", kind: "home", photo: pathToFileURL(path.join(root, "public/me.jpg")).href },
  { name: "about", label: "About", title: "The longer version.", sub: "Who I am, and where the red pen comes from." },
  { name: "experience", label: "Experience", title: "What I've worked on, roughly in order.", sub: "Newest first." },
  { name: "projects", label: "Projects", title: "Things I've built.", sub: "Some shipped, some stayed in a notebook." },
  { name: "now", label: "Now", title: "What I'm on, for now." },
  { name: "photography", label: "Photography", title: "A contact sheet, kept open.", sub: "Landscapes, streets, and portraits." },
  { name: "contact", label: "Contact", title: "The shortest way in.", sub: "Email is fastest. I reply." },
  ...DATA.projects.map((p) => ({
    name: `projects/${p.slug}`,
    label: "Project",
    title: p.title,
    sub: PROJECT_SUB[p.slug] ?? firstSentence(p.description),
  })),
];

const work = mkdtempSync(path.join(tmpdir(), "og-"));
try {
  for (const card of cards) {
    const { name, ...params } = card;
    const url = `${template}?${new URLSearchParams(params)}`;
    const png = path.join(work, `${name.replace("/", "-")}.png`);
    execFileSync(
      chrome,
      [
        "--headless=new",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        "--window-size=1200,630",
        "--allow-file-access-from-files",
        "--virtual-time-budget=8000",
        `--user-data-dir=${path.join(work, "profile")}`,
        `--screenshot=${png}`,
        url,
      ],
      { stdio: "ignore" },
    );
    const out = path.join(outDir, `${name}.jpg`);
    mkdirSync(path.dirname(out), { recursive: true });
    const info = await sharp(png)
      .resize(1200, 630, { fit: "cover" })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(out);
    console.log(`${name}.jpg  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
