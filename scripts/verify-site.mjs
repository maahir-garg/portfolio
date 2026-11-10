const base = process.env.SITE_URL || "http://localhost:3000";
const emDash = String.fromCodePoint(0x2014);
const emDashForms = [emDash, "&" + "mdash;", "&#" + "8212;", "&#" + "x2014;"];

function getMeta(html, key, value) {
  const tags = html.match(/<meta\s+[^>]*>/gi) || [];
  const tag = tags.find((candidate) => {
    const keyMatch = candidate.match(new RegExp(`${key}=["']([^"']+)["']`, "i"));
    return keyMatch?.[1] === value;
  });
  return tag?.match(/content=["']([^"']*)["']/i)?.[1] || "";
}

function getLink(html, rel) {
  const tags = html.match(/<link\s+[^>]*>/gi) || [];
  const tag = tags.find((candidate) => new RegExp(`rel=["']${rel}["']`, "i").test(candidate));
  return tag?.match(/href=["']([^"']+)["']/i)?.[1] || "";
}

// Which paths robots.txt blocks for a generic crawler ("User-agent: *").
// Longest matching rule wins, and Allow wins a tie, as Google does it.
function robotsBlocks(robotsTxt, pathname) {
  const rules = [];
  let inStarGroup = false;
  let lastWasAgent = false;
  for (const raw of robotsTxt.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    const match = line.match(/^(user-agent|allow|disallow)\s*:\s*(.*)$/i);
    if (!match) continue;
    const field = match[1].toLowerCase();
    const value = match[2].trim();
    if (field === "user-agent") {
      if (!lastWasAgent) inStarGroup = false;
      if (value === "*") inStarGroup = true;
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (inStarGroup && value) rules.push({ allow: field === "allow", path: value });
  }
  const toRegex = (pattern) =>
    new RegExp(
      "^" +
        pattern
          .replace(/[.+?^{}()|[\]\\]/g, "\\$&")
          .replace(/\*/g, ".*")
          .replace(/\\?\$$/, "$"),
    );
  let best = null;
  for (const rule of rules) {
    if (!toRegex(rule.path).test(pathname)) continue;
    if (
      !best ||
      rule.path.length > best.path.length ||
      (rule.path.length === best.path.length && rule.allow)
    ) {
      best = rule;
    }
  }
  return best ? !best.allow : false;
}

const robotsResponse = await fetch(`${base}/robots.txt`);
if (!robotsResponse.ok) throw new Error(`robots.txt returned ${robotsResponse.status}`);
const robotsTxt = await robotsResponse.text();

const sitemapResponse = await fetch(`${base}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)]
  .map((match) => match[1] || "/")
  .filter((pathname) => !pathname.endsWith(".pdf"));

const required = ["/", "/now", "/experience", "/photography", "/projects", "/about", "/contact"];
for (const pathname of required) if (!paths.includes(pathname)) paths.push(pathname);

const failures = [];
const shareImages = new Set();
for (const pathname of [...new Set(paths)]) {
  const response = await fetch(new URL(pathname, base));
  const html = await response.text();
  if (robotsBlocks(robotsTxt, pathname)) failures.push(`${pathname}: blocked by robots.txt`);
  // A crawler that cannot fetch the page's scripts, styles and fonts cannot
  // render it. Every same-site resource the page loads must be crawlable.
  const resources = [...html.matchAll(/(?:src|href)=["'](\/[^"']+\.(?:js|css|woff2?|png|jpg|svg|ico)[^"']*)["']/g)]
    .map((match) => match[1].replace(/&amp;/g, "&"));
  for (const resource of new Set(resources)) {
    if (robotsBlocks(robotsTxt, resource.split("?")[0])) {
      failures.push(`${pathname}: resource blocked by robots.txt: ${resource}`);
    }
  }
  const shareImage = getMeta(html, "property", "og:image");
  if (!shareImage) failures.push(`${pathname}: missing og:image`);
  else shareImages.add(shareImage);
  if (!response.ok) failures.push(`${pathname}: HTTP ${response.status}`);
  if (emDashForms.some((form) => html.includes(form))) failures.push(`${pathname}: forbidden em dash form`);
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${pathname}: missing title`);
  if (!getMeta(html, "name", "description")) failures.push(`${pathname}: missing description`);
  if (!getLink(html, "canonical")) failures.push(`${pathname}: missing canonical`);
  for (const property of ["og:title", "og:description", "og:url"]) {
    if (!getMeta(html, "property", property)) failures.push(`${pathname}: missing ${property}`);
  }
  for (const name of ["twitter:card", "twitter:title", "twitter:description"]) {
    if (!getMeta(html, "name", name)) failures.push(`${pathname}: missing ${name}`);
  }
  if (!html.includes("application/ld+json")) failures.push(`${pathname}: missing JSON-LD`);
}

// The share cards are absolute production URLs; check the same path on the
// server under test so this also works against localhost.
for (const image of shareImages) {
  const { pathname, search } = new URL(image);
  const imageResponse = await fetch(new URL(pathname + search, base));
  const type = imageResponse.headers.get("content-type") || "";
  if (!imageResponse.ok) failures.push(`${pathname}: share image HTTP ${imageResponse.status}`);
  else if (!type.startsWith("image/")) failures.push(`${pathname}: share image served as ${type}`);
}

const llmsResponse = await fetch(`${base}/llms.txt`);
const llms = await llmsResponse.text();
if (!llmsResponse.ok) failures.push(`/llms.txt: HTTP ${llmsResponse.status}`);
if (emDashForms.some((form) => llms.includes(form))) failures.push("/llms.txt: forbidden em dash form");
if (!llms.includes("AICET") || !llms.includes("GIC")) failures.push("/llms.txt: missing current positioning");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `Verified ${new Set(paths).size} HTML routes, ${shareImages.size} share images, robots.txt and llms.txt at ${base}.`,
);
