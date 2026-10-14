# SEO bakımı

## Yeni uygulama veya yeni legal sayfa

1. `apps/apps.json` içine slug, paths, store, tagline ekleyin.
2. HTML sayfalarını `apps/<slug>/` altında oluşturun.
3. Çalıştırın:

```bash
node scripts/apply-seo.mjs
node scripts/generate-sitemap.mjs
```

4. Search Console’da sitemap’i yeniden gönderin (gerekirse “Request indexing” tek sayfa için).

## Sabitler

- Site base URL: `scripts/seo-constants.mjs`
- Head üretimi: `scripts/seo-head.mjs`, `scripts/apply-seo.mjs`
