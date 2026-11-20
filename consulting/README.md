# Nuriek AI Consulting (consulting.nuriek.com)

Separate Vite + React + Tailwind app that shares the visual system of `../client`
(paper `#f7f7f4`, ink `#111`, Playfair Display + Inter).

```bash
cd consulting
npm install
npm run dev
```

Content lives in `src/lib/content.js`. Pages are in `src/pages/`.

## Deploy (Vercel)

Create a second Vercel project from this repo with **Root Directory = `consulting`**
and attach the domain `consulting.nuriek.com`.

## Colour palette

| Token | Hex | Use |
| --- | --- | --- |
| `night` | `#12103a` | Hero, dark sections, footer |
| `iris` | `#4b3bea` | Primary buttons, links, accents |
| `coral` | `#ff5a3d` | Highlight cards, shapes |
| `teal` | `#0fb5a4` | Highlight cards, status dots |
| `amber` | `#ffbe3d` | Calls to action on dark, key words |
| `paper` | `#f7f7f4` | Page background |
| `ink` | `#111111` | Body text |

Soft tints (`iris-50`, `coral-50`, `teal-50`, `amber-50`) are used for card backgrounds.
Defined in `tailwind.config.js` and `src/lib/tones.js`.

## Hero videos

`public/videos/hero-{1,2,3}.{webm,mp4,jpg}`: generated seamless 6-second loops (20-80 KB each).

## Hero stock clips

`public/videos/stock/hero-{1,2,3}.mp4` come from Mixkit (free for commercial use under the Mixkit Free License): 46680, 46635, 23282. Run `./get-hero-videos.command` to download them. If a clip is missing the hero plays `hero-montage` instead.
