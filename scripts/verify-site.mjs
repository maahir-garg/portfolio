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

const sitemapResponse = await fetch(`${base}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)]
  .map((match) => match[1] || "/")
  .filter((pathname) => !pathname.endsWith(".pdf"));

const required = ["/", "/now", "/experience", "/photography", "/projects", "/about", "/contact"];
for (const pathname of required) if (!paths.includes(pathname)) paths.push(pathname);

const failures = [];
for (const pathname of [...new Set(paths)]) {
  const response = await fetch(new URL(pathname, base));
  const html = await response.text();
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

const llmsResponse = await fetch(`${base}/llms.txt`);
const llms = await llmsResponse.text();
if (!llmsResponse.ok) failures.push(`/llms.txt: HTTP ${llmsResponse.status}`);
if (emDashForms.some((form) => llms.includes(form))) failures.push("/llms.txt: forbidden em dash form");
if (!llms.includes("AICET") || !llms.includes("GIC")) failures.push("/llms.txt: missing current positioning");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Verified ${new Set(paths).size} HTML routes plus llms.txt at ${base}.`);
