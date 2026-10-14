import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SITE_BASE } from "./seo-constants.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appsData = JSON.parse(readFileSync(join(root, "apps/apps.json"), "utf8"));

const urls = new Set([`${SITE_BASE}/`, `${SITE_BASE}/index.html`]);

for (const app of appsData.apps) {
  for (const rel of Object.values(app.paths || {})) {
    urls.add(`${SITE_BASE}/${rel}`);
  }
}

const today = new Date().toISOString().slice(0, 10);
const body = [...urls]
  .sort()
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync(join(root, "sitemap.xml"), xml, "utf8");
console.log(`Wrote sitemap.xml with ${urls.size} URLs`);
