# NZL — nzl.nepa-pro.com

Veteran-owned handyman PWA for Northeast Pennsylvania. Single CTA: **call 570-507-1188.**

## Deploy

Upload **everything in this folder** to the document root of `nzl.nepa-pro.com`. That's it. The site is static HTML — no build, no server runtime needed.

If you're using GitHub Pages: drop the files at the repo root and point the subdomain at the Pages host (CNAME file optional). If you're using Cloudflare Pages, Netlify, or Vercel: drag the folder into the dashboard. If you're hosting on your existing NEPA-PRO server: SFTP these files into the subdomain's web root.

## Required: HTTPS

The service worker (`sw.js`) and PWA install prompt only work over HTTPS. Most modern hosts give you HTTPS for free — just make sure the cert covers `nzl.nepa-pro.com`.

## File index

```
index.html              ← the page
manifest.webmanifest    ← PWA manifest (Add to Home Screen support)
sw.js                   ← service worker (offline cache)
robots.txt + sitemap.xml← SEO basics

og-card.png             ← 1200×630 unified social share card
og-card.svg             ← source (editable)
nzl-mark.svg            ← brand mark source

favicon.ico             ← legacy browser favicon
favicon-16/32/48.png    ← PNG favicons
icon-192/256/384/512.png← PWA icons
maskable-512.png        ← Android adaptive icon
apple-touch-icon*.png   ← iOS home-screen icons (152/167/180)
```

## Verify after deploy

1. Open `https://nzl.nepa-pro.com/` on a phone. Tap the orange CTA — your phone dialer should open with 570-507-1188.
2. Tap the click-to-call pill in the top right — same dialer.
3. Tap the bottom sticky bar — same dialer.
4. On iPhone Safari: Share → "Add to Home Screen". The NZL icon should appear, dark with the orange stripe under the letters.
5. On Android Chrome: three-dot menu → "Install app". Same icon.
6. Paste `https://nzl.nepa-pro.com/` into iMessage, WhatsApp, Facebook Messenger, or any group chat. The OG card should preview as a horizontal business card showing the phone number.
7. Search Google for "site:nzl.nepa-pro.com" after a few days; the favicon should appear next to the result.

## To change the phone number later

It appears in:
- 6 places in `index.html` (every CTA + structured data)
- The OG card image (`og-card.svg` → re-render to `og-card.png`)

Search-and-replace `570-507-1188` and `+15705071188` across the folder.

## What's intentionally NOT here

- No nav menu. The page is one scroll.
- No contact form, no booking widget, no email capture. The only conversion is the phone call.
- No social media links. Add later only if those accounts actually exist and are active.
- No fake testimonials. Add real ones only when you have them, with permission.
- No "Get a Quote" buttons that don't go anywhere. Every interactive element on this page does what it says.
