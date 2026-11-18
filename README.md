# EigenTech website · موقع آيجينتك

Company website for **EigenTech** (www.eigentech.ai), in English and Arabic.
Built with Next.js 15 (App Router, static export), React 19, Tailwind CSS 4 and TypeScript.
Hosted on GitHub Pages: every push to `main` builds and publishes the site automatically.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000  (opens /en/ or /ar/)
npm run build      # static site in ./out
npm run preview    # serve ./out locally
```

## Project structure

```
src/
  app/
    (root)/            "/" — picks /en/ or /ar/ from the visitor's saved choice or browser language
    [locale]/          English and Arabic pages (layout sets lang, dir="rtl" for Arabic, theme, SEO)
      page.tsx         Home: Hero, Focus (Warraq, the main project and current focus, with its video),
                       Projects (the other projects, in brief), Services, Platform, Edge, Industries,
                       About (with the team), Contact
      warraq/          The Warraq page: everything about Warraq, following the company profile (version 3)
      privacy/         Privacy policy
    sitemap.ts, robots.ts
  components/
    brand/             Logo (آيجينتك always under EigenTech), HeroMark (animated mark), MarkGlyph
    layout/            Header (mobile menu), Footer, FloatingCTA, ThemeToggle, LanguageSwitcher
    sections/          One file per home-page section, plus ContactForm
    warraq/            The sections of the Warraq page, and VideoPlayer (also used on the home page)
    ui/                Container, SectionHeading (numbered), Button, Tag, Icon
  i18n/
    config.ts          Locales and text direction
    dictionaries/      en.ts and ar.ts — ALL site text lives here
  lib/
    site.ts            Contact details, LinkedIn, URLs, the Warraq link and mediaVersion
    eigen-mark.ts      Geometry of the logo mark (used by the animated hero)
    warraq-video.ts    Details of the Warraq video for search engines
    validate-contact.ts
  styles/globals.css   Brand colours, light/dark theme tokens, fonts
public/                Logo files, icons, share image, CNAME (www.eigentech.ai), 404.html
  brand/, icons        After replacing any logo or icon file, change brandVersion in src/lib/site.ts (and the ?v=
                       dates in public/site.webmanifest and public/404.html) so visitors see the new files at once.
  brand/logo-on-*.svg  Header and footer logo. The name is drawn as outlines (Safari breaks the two-colour
                       Arabic name as live text); regenerate with ../brand-tools/make-logos.js
  media/               The Warraq videos (Arabic and English, about 15 MB each) with their posters and WebVTT
                       captions, stills of two video scenes, and two images from the company profile. Made by
                       ../Profile and contracts/video/source/web-media.py. After replacing any file here, change
                       mediaVersion in src/lib/site.ts. Not under /ocr: Cloudflare sends www.eigentech.ai/ocr* to
                       Warraq on the server.
```

## Editing content

- **Text** (both languages): `src/i18n/dictionaries/en.ts` and `ar.ts`. The Arabic file must keep the same structure as the English one; TypeScript checks this.
- **Contact details**: `src/lib/site.ts`.
- **Colours**: `src/styles/globals.css` (`@theme` block and the light/dark variables).
- **Adding a language**: add it to `src/i18n/config.ts`, create a dictionary file, register it in `get-dictionary.ts`.

## Contact form

The form validates in the browser. To receive messages without a server:

1. Create a free form at https://formspree.io (or any service that accepts a JSON POST) and copy its endpoint URL.
2. In GitHub: **Settings → Secrets and variables → Actions → Variables → New repository variable**,
   name `CONTACT_ENDPOINT`, value = the endpoint URL. The next deployment uses it.

Until an endpoint is set, the form opens the visitor's email app with the message addressed to ceo@eigentech.ai.

## Publishing (GitHub Pages + www.eigentech.ai)

One-time setup in the repository on github.com:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Pages → Custom domain:** `www.eigentech.ai`, then tick **Enforce HTTPS** once the certificate is ready.
3. At your domain registrar, add DNS records:
   - `www` — **CNAME** → `eigentech-ai.github.io`
   - `@` (eigentech.ai) — **A** records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

After that, pushing to `main` publishes the site within a couple of minutes (see the **Actions** tab).
