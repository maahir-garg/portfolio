// Renders the site icon from scripts/og/icon.html into every size the site
// serves:
//
//   node scripts/make-icons.mjs
//
//   app/icon.png        512, rounded corners (browser tabs, bookmarks)
//   app/favicon.ico     16, 32 and 48, rounded
//   app/apple-icon.png  180, full-bleed square (iOS rounds it itself)
//   public/icon-192.png, public/icon-512.png  full-bleed, for the manifest
//
// Needs Google Chrome installed and a network connection (for the web font).
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const template = pathToFileURL(path.join(root, "scripts/og/icon.html")).href;
const chrome =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!existsSync(chrome)) {
  console.error(`Chrome not found at ${chrome}. Set CHROME_PATH.`);
  process.exit(1);
}

const work = mkdtempSync(path.join(tmpdir(), "icons-"));
const shoot = (query, file) => {
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=512,512",
      "--default-background-color=00000000",
      "--virtual-time-budget=6000",
      `--user-data-dir=${path.join(work, "profile")}`,
      `--screenshot=${file}`,
      `${template}${query}`,
    ],
    { stdio: "ignore" },
  );
  return file;
};

// An .ico is a small directory followed by one PNG per size.
function ico(pngs, sizes) {
  const head = Buffer.alloc(6);
  head.writeUInt16LE(1, 2);
  head.writeUInt16LE(sizes.length, 4);
  let offset = 6 + 16 * sizes.length;
  const entries = sizes.map((size, i) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0);
    entry.writeUInt8(size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(pngs[i].length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += pngs[i].length;
    return entry;
  });
  return Buffer.concat([head, ...entries, ...pngs]);
}

try {
  const rounded = shoot("", path.join(work, "rounded.png"));
  const square = shoot("?round=0", path.join(work, "square.png"));
  const resize = (src, size) => sharp(src).resize(size, size).ensureAlpha().png().toBuffer();

  writeFileSync(path.join(root, "app/icon.png"), await resize(rounded, 512));
  writeFileSync(path.join(root, "app/apple-icon.png"), await resize(square, 180));
  writeFileSync(path.join(root, "public/icon-192.png"), await resize(square, 192));
  writeFileSync(path.join(root, "public/icon-512.png"), await resize(square, 512));
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map((size) => resize(rounded, size)));
  writeFileSync(path.join(root, "app/favicon.ico"), ico(pngs, sizes));
  console.log("Icons written.");
} finally {
  rmSync(work, { recursive: true, force: true });
}
