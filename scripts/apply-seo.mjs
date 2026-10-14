import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_BASE, DEFAULT_OG_IMAGE } from "./seo-constants.mjs";
import {
  buildSeoHead,
  organizationGraph,
  webPageLd,
  softwareApplicationLd,
} from "./seo-head.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appsData = JSON.parse(readFileSync(join(root, "apps/apps.json"), "utf8"));

const MARKER_START = "<!-- seo:begin -->";
const MARKER_END = "<!-- seo:end -->";

function upsertSeoBlock(html, block) {
  const wrapped = `${MARKER_START}\n${block}\n  ${MARKER_END}`;
  if (html.includes(MARKER_START)) {
    return html.replace(new RegExp(`${MARKER_START}[\\s\\S]*?${MARKER_END}`), wrapped);
  }
  return html.replace("</head>", `${wrapped}\n</head>`);
}

function pageMetaForApp(app, pageKey, relPath) {
  const canonical = `${SITE_BASE}/${relPath}`;
  const hubUrl = `${SITE_BASE}/${app.paths.home}`;

  const titles = {
    home: `${app.name} — Legal & Support`,
    privacy: `Privacy Policy — ${app.name}`,
    terms: `Terms of Service — ${app.name}`,
    disclaimer: `Legal Disclaimer — ${app.name}`,
  };

  const descriptions = {
    home: `${app.tagline || app.description} Official privacy, terms, and support for ${app.name} by FallenApps.`,
    privacy: `Read how ${app.name} collects, uses, and protects your data. Official privacy policy hosted on FallenApps Legal Center.`,
    terms: `Terms of service for ${app.name}. Rules, purchases, and usage guidelines from FallenApps.`,
    disclaimer: `Fan-made and legal disclaimers for ${app.name}. Advertising and third-party notices from FallenApps.`,
  };

  const title = titles[pageKey] || `${app.name} — FallenApps`;
  const description = descriptions[pageKey] || app.description;
  const ogImage = app.icon ? `${SITE_BASE}/${app.icon}` : DEFAULT_OG_IMAGE;

  const jsonLd = [
    webPageLd({ name: title, description, url: canonical }),
    pageKey === "home" ? softwareApplicationLd(app, hubUrl) : null,
  ];

  return { title, description, canonical, ogImage, jsonLd };
}

function patchRootIndex() {
  const path = join(root, "index.html");
  let html = readFileSync(path, "utf8");
  const canonical = `${SITE_BASE}/`;
  const title = "FallenApps Legal Center";
  const description =
    "Official privacy policies, terms, and support pages for FallenApps mobile games and apps.";
  const block = buildSeoHead({
    title,
    description,
    canonical,
    iconHref: "assets/fallen_apps_logo.png",
    jsonLd: organizationGraph(),
  });
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = upsertSeoBlock(html, block);
  writeFileSync(path, html, "utf8");
}

function patchAppPages() {
  for (const app of appsData.apps) {
    for (const [pageKey, relPath] of Object.entries(app.paths)) {
      const filePath = join(root, relPath);
      let html = readFileSync(filePath, "utf8");
      const meta = pageMetaForApp(app, pageKey, relPath);
      const block = buildSeoHead({
        ...meta,
        iconHref: "../../assets/fallen_apps_logo.png",
      });
      html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
      html = upsertSeoBlock(html, block);
      writeFileSync(filePath, html, "utf8");
    }
  }
}

function dedupeLegalScript() {
  const privacyPath = join(root, "apps/chesspuz/privacy.html");
  let html = readFileSync(privacyPath, "utf8");
  const scriptTag = '<script src="../../assets/legal-app.v2.js" defer></script>';
  const first = html.indexOf(scriptTag);
  const second = html.indexOf(scriptTag, first + 1);
  if (second !== -1) {
    html = html.slice(0, second) + html.slice(second + scriptTag.length);
    writeFileSync(privacyPath, html, "utf8");
  }
}

patchRootIndex();
patchAppPages();
dedupeLegalScript();
console.log("Applied SEO blocks to index and app legal pages.");
