# Akruthi Interior & Modular Studio website

This is a lightweight, static, multi-page website. Homepage and editorial pages are semantic HTML; supporting service, inspiration, journal, contact and policy routes are generated from `content.json` by `build.mjs`.

## Preview and build

Requires Node.js 18 or later; no package installation is needed.

```sh
node build.mjs
```

Serve the workspace with any static web server that maps directory URLs to `index.html` (for example, `npx serve .`). The generator writes one crawlable `index.html` into each route directory. The homepage is the root `index.html`.

## Owner setup before launch

1. Replace the text brand lockup with the supplied approved logo artwork when it is available. The provided attachment contained only the written brief, not the logo image. The favicon is a simple studio monogram, not a recreation of the supplied logo.
2. Replace illustrative Unsplash images with licensed Akruthi photography where available. Current imagery is illustrative and is not presented as completed Akruthi work.
3. Confirm which services are offered, the real areas served, the exact business address, phone, email, hours and social profiles. Add them consistently to the footer and contact page. Do not add a map until the exact public location is confirmed.
4. Configure a real form destination before launch. The form validates in the browser but currently has no backend and will not claim that an enquiry was sent. An optional verified email can be configured before `site.js` loads with `window.AKRUTHI_CONTACT_EMAIL = "..."`; this opens a prefilled email in the visitor's mail app, not a server submission. For reliable lead capture, connect a form provider or backend, add spam protection, privacy details and delivery monitoring.
5. If Akruthi has a verified WhatsApp contact number, configure `window.AKRUTHI_WHATSAPP_PHONE = "91..."` before `site.js` loads. Use digits only including country code. Until configured, the floating enquiry action takes visitors to the contact form. Do not enter a number that is not authorized for public enquiries.
6. Set the canonical website domain in page metadata and replace `YOUR-DOMAIN-HERE` in `robots.txt` and `sitemap.xml`. Regenerate after content changes with `node build.mjs`.
7. Review the proposed process and all legal page text before publication. There are no fabricated reviews, awards, guarantees, addresses, phone numbers, credentials or project claims.
8. Add Search Console, submit `/sitemap.xml`, configure GA4/Tag Manager IDs only when supplied, and track valid form submissions, WhatsApp actions and calls. The enquiry action is intentionally not a WhatsApp number link until a real number is supplied.

## Editorial and SEO

Edit `content.json` to maintain page titles, descriptions, copy and internal links. Each generated route contains static HTML and a unique title and description. Location content only identifies Bidarahalli as the studio base; other coverage must be confirmed before being advertised. Images use descriptive alt text, explicit dimensions and lazy loading below the homepage hero.

The site uses remotely hosted Unsplash images and Google Fonts. For production, self-host optimized licensed images and fonts if that better fits the deployment and performance budget. A CMS can be added later without changing the URL structure.
