# Public URL envanteri (domain / 301 hazırlığı)

Base: `https://enesdrk.github.io/legal-center`

| Path | Amaç |
|------|------|
| `/` | FallenApps Legal Center vitrin |
| `/index.html` | Aynı vitrin (canonical: `/`) |
| `/robots.txt` | Crawl + sitemap referansı |
| `/sitemap.xml` | Tüm legal sayfalar |
| `/app-ads.txt` | AdMob publisher doğrulama (bu repo kökü) |
| `/apps/<slug>/index.html` | Uygulama legal & support hub |
| `/apps/<slug>/privacy.html` | Store privacy URL (path sabit) |
| `/apps/<slug>/terms.html` | Terms (varsa) |
| `/apps/<slug>/legal-disclaimer.html` | Roll Eleven disclaimer |

Güncel tam liste: `sitemap.xml` (üretim: `node scripts/generate-sitemap.mjs`).

**Domain günü:** Her satır için `https://<yeni-domain>/...` karşılığı ve 301 kaynağı bu tabloya eklenir.
