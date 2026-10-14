# app-ads.txt konumu (AdMob)

## Repoda

- Dosya: [`app-ads.txt`](../app-ads.txt) (repo kökü)
- GitHub Pages yayını ile beklenen URL: `https://enesdrk.github.io/legal-center/app-ads.txt`

## Doğrulama (manuel)

1. AdMob → **Account** → **App-ads.txt** (veya uygulama ayarlarındaki site alanı).
2. Kayıtlı **developer website** alanını not et:
   - Eğer site `https://enesdrk.github.io/legal-center` ise → bu repodaki `app-ads.txt` doğru yerde.
   - Eğer site `https://enesdrk.github.io` (user/org site kökü) ise → aynı içerik **`enesdrk.github.io` kök repo** içinde de `app-ads.txt` olmalı (ayrı repo; store listing URL’lerinden bağımsız).

## Canlı kontrol (2026-03-29)

Komut örneği:

```bash
curl -sI "https://enesdrk.github.io/legal-center/app-ads.txt" | head -1
curl -sI "https://enesdrk.github.io/app-ads.txt" | head -1
```

Deploy sonrası HTTP 200 ve satır içeriğinin AdMob panelindeki publisher ID ile eşleşmesi gerekir.

**Not:** Mağaza privacy URL’lerini değiştirmek gerekmez; bu yalnızca reklam domain doğrulamasıdır.
