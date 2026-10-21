# vinit. — portfolio

Personal portfolio of **Vinit Khanvilkar**, AI / ML engineer from Vadodara.
A static site: plain HTML, CSS and vanilla JavaScript. No build step and no dependencies.

## Structure

```
.
├── index.html                    # the whole page
├── assets/
│   ├── css/style.css             # styles; theme tokens are at the top
│   ├── js/main.js                # clock, rotating role, pipeline trace, layers, accordion
│   ├── img/
│   │   ├── portrait-acc.png      # scanline portrait: accent layer (used as a CSS mask)
│   │   ├── portrait-ink.png      # scanline portrait: ink layer (used as a CSS mask)
│   │   ├── portrait-cutout.webp  # plain cut-out photo (spare, not used by default)
│   │   ├── og-image.png          # link-preview image for LinkedIn / WhatsApp / X
│   │   └── favicon.svg
│   └── Vinit_Khanvilkar_Resume.pdf
├── .nojekyll                     # tells GitHub Pages to serve files as-is
└── README.md
```

## Run locally

Open it through a local server. Opening `index.html` directly with `file://` makes some
browsers block the portrait masks.

```bash
python -m http.server 8000
# or
npx serve .
```

Then visit http://localhost:8000.

## Deploy

**GitHub Pages**
1. Push this folder to a repo (for example `portfolio`, or `<username>.github.io` for a root URL).
2. Go to Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
3. The site goes live at `https://<username>.github.io/<repo>/` within a minute or two.

**Vercel**
1. Import the repo at vercel.com/new.
2. Framework preset: **Other**. Leave the build command empty and the output directory as `.`.
3. Deploy.

**Netlify**
1. Add new site → Import from Git → pick the repo.
2. Leave the build command empty and set the publish directory to `.`.
3. Deploy.

## Before you go live

- [ ] Replace `YOUR-HANDLE` in the LinkedIn and GitHub links (footer of `index.html`).
- [ ] Point both **case study ↗** buttons at real repos or write-ups (search for `TODO` in `index.html`).
- [ ] Set `og:url` in the `<head>` to your final URL. For the best link previews, also make `og:image` an absolute URL, e.g. `https://your-domain/assets/img/og-image.png`.
- [ ] Check the résumé PDF. It's your current one and includes your phone number, which will be public.

## Customise

Every colour and font comes from the CSS variables at the top of `assets/css/style.css`.
The comment block there lists the alternatives explored in the design: accent colours,
paper tones, and the five display fonts with their matching size and weight values.
If you switch fonts, also update the Google Fonts `<link>` in `index.html`.

To use a different photo, regenerate `portrait-acc.png` and `portrait-ink.png` (800×1000,
white pixels with alpha = the scanlines). Or swap the two `.player` divs in the hero for
`<img src="assets/img/portrait-cutout.webp" alt="Portrait of Vinit Khanvilkar">`.

Motion respects the visitor's reduced-motion setting.
