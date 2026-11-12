# assets/ — inventory

Every photo here is a **labelled placeholder**. None of them is a real photo.
Replace them with real photos before launch, keeping the same filenames so
`index.html` needs no edits (except the `alt` text, which you update in
`i18n/translations.js`).

The site uses the "Premium Botanical" dark palette, so every placeholder is
drawn in it (`#081A12` background, `#11291E` card, `#E8B85B` gold,
`#F5F5F5` white, `#C2D1C9` muted, `#2A4535` border).

| File | What it should show | Recommended size | Where it appears |
|---|---|---|---|
| `hero.jpg` | A healthy basil plant growing from an opaque 2 L bottle on a windowsill in a small flat. Dark / low-key lighting. | 1600 × 900 (16:9) | Top of the page, behind the 《居家水培植物指南》 heading. **Used as a CSS background image** in `styles.css` (`.hero`), under a dark green gradient overlay — there is no `<img>` tag for it. |
| `video-1-poster.svg` | Step 1 — hands unboxing the kit: bottle, net pot, sponge, grow cube, seed packet, nutrient bottle. | 640 × 360 (16:9) | Video card 1 「開箱與組裝」. `alt` = `video.a1` |
| `video-2-poster.svg` | Step 2 — one or two seeds placed in a moist grow cube on a plate. Close-up. | 640 × 360 | Video card 2 「落種子及發芽」. `alt` = `video.a2` |
| `video-3-poster.svg` | Step 3 — nutrient measured with the bottle cap, poured into water in the bottle. | 640 × 360 | Video card 3 「開營養液及量度瓶蓋」. `alt` = `video.a3` |
| `video-4-poster.svg` | Step 4 — the net pot lowered so only its bottom 1 inch sits in the water, then the bottle left alone. | 640 × 360 | Video card 4 「底部 1 吋浸水與不要補水」. `alt` = `video.a4` |
| `video-5-poster.svg` | Step 5 — a weekly check: white roots, water level, bottle wrapped to block light. | 640 × 360 | Video card 5 「每週檢查及常見問題」. `alt` = `video.a5` |
| `video-6-poster.svg` | Step 6 — outer basil leaves picked with scissors, centre of the plant still growing. | 640 × 360 | Video card 6 「採收羅勒」. `alt` = `video.a6` |
| `favicon.svg` | Site icon: a gold leaf on a dark green rounded square. | 64 × 64 (SVG) | Browser tab, bookmarks |
| `og-image.png` | Social preview card. Already generated (1200 × 630): dark green background, gold title bar, the 繁體 title, the English subtitle and the two golden rules. Re-export if you change the project name or palette. | 1200 × 630 | Link previews (Open Graph) |

## Notes for whoever replaces the images

1. **Keep the filenames.** `index.html` and `styles.css` point at these exact
   paths (the hero image is referenced from `styles.css`, not from HTML).
2. **Keep the aspect ratio** (or update the `width` / `height` attributes on the
   `<img>` tags in `index.html`, otherwise the page will jump while loading).
3. **Do not add a photo with a real shop, logo or price** unless the project
   team has approved its use in writing.
4. **No webfonts, no icon libraries, no CDN copies.** Icons in the page are
   inline SVG inside `index.html`, so they add no extra requests.
5. If you add a new image, add `loading="lazy"` and explicit `width`/`height`
   if it is below the fold.
6. `og-image.png` must stay a PNG — most social platforms ignore SVG.
7. Images you might want instead of SVG placeholder files: use `.jpg` for
   photos, and remember to update the `src` in `index.html` **and** the table
   above.
8. **Hero image and contrast.** If you swap `hero.jpg`, keep it dark and
   low-key. The white heading sits on top of it; the gradient overlay in
   `styles.css` is the safety net, so do not lighten the photo too much.
