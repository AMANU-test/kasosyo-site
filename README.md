# KaSosyo · Usapang Pera: Unang Hakbang

This is a clickable, mobile-first prototype for MKTG 113 Group 4's SEDPI campaign. There's no backend. All state lives in localStorage, and the demo user is Bea.

```bash
npm install
npm run dev          # opens http://localhost:5173 (also reachable from a phone on the same Wi-Fi)
npm run screenshots  # exports every screen at 390×844 @2x into screenshots/taglish and screenshots/english
```

## Routes

| Frame | Route | Screen |
|---|---|---|
| A | `/` | Landing |
| B | `/hakbang` | Unang Hakbang hub |
| C | `/hakbang/lesson/:id` (`scam`, `emergency`, `impact`, `lago`; `?card=0–2`) | Lesson |
| D | `/sumali?step=1–4`, `/sumali/done` | Sign-up wizard |
| E | `/invest` (`?goal=near\|medium\|far`) | First JVS |
| F–H | `/app`, `/app/kwento`, `/app/maturity` | Investor dashboard |
| I | `/nudges` | Messenger follow-ups |
| J | `/compare` | Before / after |
| — | `/gallery` | Every screen in phone frames (for the deck) |

The gallery's frame list lives in `src/data/screens.json`. The screenshot script reads the same file.

## Brand tokens

All colours and fonts are CSS variables in `src/index.css` (`@theme`). The palette was sampled from SEDPI's Usapang Pera material: coral `#EE474E`, teal `#31838E` and yellow `#FFCE42`. The `-strong` shades are slightly deeper so white text on them stays readable.

## Placeholders

Anything SEDPI still has to confirm is shown in `[BRACKETS]`: payment channels, partner stories and photos, impact numbers, return figures, PMES scripts and the full T&C text. To find them all, search the code for `confirm with SEDPI`.

## Language

Every header has a Taglish / English toggle. The choice is remembered, and in `/gallery` it switches every frame at once. Copy lives next to the code as `t('Taglish', 'English')` pairs, and lesson content lives in `src/data/lessons.ts`.

## Hero video

The landing page uses Usapang Pera's "SEDPI social enterprise model" video as a placeholder. To swap it, change `HERO_VIDEO_URL` and `HERO_VIDEO_META` in `src/config.ts`. The YouTube thumbnail becomes the poster, and the video plays inline.

## Photos

Put SEDPI's photos in `public/photos/` using the file names listed in [public/photos/README.md](public/photos/README.md). Each one replaces its placeholder automatically. The slot list is in `src/data/photos.ts`.

## How it shows up

- **On a phone:** the full-screen site, the way a user would see it.
- **On a laptop:** the same site inside one phone frame, with a QR code that opens it on a phone, the language toggle, and a link to `/gallery`.

## Deploy (GitHub Pages)

1. Push this folder to a GitHub repo, on the `main` branch.
2. In the repo, go to **Settings → Pages → Source** and choose **GitHub Actions**.
3. Every push to `main` then builds and publishes the site to `https://<user>.github.io/<repo>/`. That's the link to share or turn into a QR code; the laptop view also shows its own QR.

`vercel.json` is included too, if you'd rather import the repo into Vercel. No other setup is needed there.
