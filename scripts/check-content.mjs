import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const TARGETS = ["app", "components", "lib", "public", "scripts", "README.md"];
const TEXT_EXTENSIONS = new Set([".css", ".js", ".json", ".jsx", ".md", ".mjs", ".ts", ".tsx", ".txt"]);
const SKIP_DIRS = new Set([".git", ".next", "node_modules"]);
const forbidden = [
  { label: "Unicode U+2014", value: String.fromCodePoint(0x2014) },
  { label: "HTML named entity", value: "&" + "mdash;" },
  { label: "HTML decimal entity", value: "&#" + "8212;" },
  { label: "HTML hexadecimal entity", value: "&#" + "x2014;" },
];

async function collect(target) {
  const fullPath = path.join(ROOT, target);
  const stats = await import("node:fs/promises").then(({ stat }) => stat(fullPath));
  if (stats.isFile()) return [fullPath];
  const files = [];
  for (const entry of await readdir(fullPath, { withFileTypes: true })) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue;
    const relative = path.join(target, entry.name);
    if (entry.isDirectory()) files.push(...await collect(relative));
    else if (TEXT_EXTENSIONS.has(path.extname(entry.name))) files.push(path.join(ROOT, relative));
  }
  return files;
}

const files = (await Promise.all(TARGETS.map(collect))).flat();
const failures = [];

for (const file of files) {
  const content = await readFile(file, "utf8");
  for (const item of forbidden) {
    if (content.includes(item.value)) {
      failures.push(`${path.relative(ROOT, file)}: ${item.label}`);
    }
  }
}

if (failures.length) {
  console.error("Forbidden em dash forms found:\n" + failures.join("\n"));
  process.exit(1);
}

console.log(`Content check passed across ${files.length} authored text files.`);
