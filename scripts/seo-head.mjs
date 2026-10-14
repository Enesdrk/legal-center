import { DEFAULT_OG_IMAGE, ORG_NAME, SAME_AS, SITE_BASE, SUPPORT_EMAIL } from "./seo-constants.mjs";

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
}

export function buildSeoHead({
  title,
  description,
  canonical,
  iconHref,
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd = [],
}) {
  const ldScripts = jsonLd
    .filter(Boolean)
    .map((obj) => `  <script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n  </script>`)
    .join("\n");

  return `  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="icon" href="${escapeHtml(iconHref)}" type="image/png">
  <meta name="theme-color" content="#0b1020">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeHtml(ORG_NAME)} Legal Center">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(ogImage)}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(ogImage)}">
${ldScripts}`;
}

export function organizationGraph() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: ORG_NAME,
      url: `${SITE_BASE}/`,
      logo: DEFAULT_OG_IMAGE,
      email: SUPPORT_EMAIL,
      sameAs: SAME_AS,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${ORG_NAME} Legal Center`,
      url: `${SITE_BASE}/`,
      publisher: { "@type": "Organization", name: ORG_NAME },
    },
  ];
}

export function webPageLd({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: { "@type": "WebSite", url: `${SITE_BASE}/`, name: `${ORG_NAME} Legal Center` },
  };
}

export function softwareApplicationLd(app, hubUrl) {
  const stores = [];
  if (app.store?.ios) {
    stores.push(app.store.ios);
  }
  if (app.store?.android) {
    stores.push(app.store.android);
  }
  if (!stores.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: app.name,
    description: app.tagline || app.description,
    url: hubUrl,
    applicationCategory: "GameApplication",
    operatingSystem: "iOS, Android",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    downloadUrl: stores,
  };
}
