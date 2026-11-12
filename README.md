# 居家水培植物指南 / Home Hydroponic Guide

A static, trilingual (繁體 / 简体 / English) guide for **the Kai Tak Residents
Hydroponic Farming Project (ITS2028 Global Challenges II)**.

Residents scan the QR code printed on the bottle and land on this page. It
supports the printed instructions, hosts the Cantonese video guides, explains
troubleshooting, and points to where refills can be bought.

- **Live URL (the QR target):** <https://otters-ct.github.io/hydroponicguideforLPHresidents/?lang=zh-HK#hero>
- **Not** an online shop. No login, no payment, no backend, no app, no account.

---

## 1. Open it

Double-click `index.html`. Everything works offline, including from `file://`,
because translations are a plain `.js` file (not JSON + `fetch`).

---

## 2. Files

```
index.html                 the only page (single-page site with anchor links)
styles.css                 all styling (CSS variables, mobile-first, print sheet)
script.js                  language switching + transcript toggles (progressive enhancement)
i18n/translations.js       ALL text in all three languages  <- the file editors touch
assets/                    labelled placeholder images (see assets/README.md)
README.md                  this file
```

No build step, no dependencies, no CDN, no webfonts, no analytics, no cookies.

### Design tokens — "Premium Botanical"

A dark, elegant, nature-inspired theme that is still tuned for older eyes.
The whole palette lives in `:root` at the top of `styles.css`:

| Token | Value | Used for |
|---|---|---|
| `--bg-dark` | `#081A12` | page background |
| `--bg-card` | `#11291E` | cards, header language pill |
| `--bg-glass` | `rgba(255,255,255,.05)` | glass troubleshooting cards |
| `--text-main` | `#F5F5F5` | body text |
| `--text-muted` | `#C2D1C9` | secondary text (≥ 4.5:1 on the background) |
| `--accent-gold` | `#E8B85B` | buttons, step numbers, icons, links |
| `--border-subtle` | `#2A4535` | card and header borders |

- **Headings:** serif — `Georgia, "Noto Serif TC", "Noto Serif SC", serif`.
- **Body:** sans — `system-ui, -apple-system, "Noto Sans TC", "Noto Sans SC", sans-serif`.
- **Buttons:** pills (`border-radius: 999px`, `min-height: 48px`); primary is
  gold on dark green, secondary is a transparent white outline.
- **Cards:** `24px` radius, `1px` `--border-subtle` border, soft drop shadow.
- **Hero:** `assets/hero.jpg` is a CSS background image under a dark green
  gradient overlay, so white text never bleeds into a bright part of the photo.

To restyle the site, change the tokens in `:root` — no colour should need to be
edited anywhere else.

---

## 3. For the student editor — the 5 things to know

### 1) Change a shop or refill point

The `#buy` section has two halves: **網上購買** (online shops) and
**啟德及附近實體店** (physical stores). There are two kinds of data:

- **Names, descriptions, addresses, phone numbers, opening hours and
  `aria-label`s** live in `i18n/translations.js` under `data.online_shops.*`
  (7 shops, `o1`–`o7`) and `data.physical_shops.*` (6 shops, `s1`–`s6`). Each
  field appears **three times** — once per language — so change all three
  lines:

  ```js
  "data.online_shops.o1.name": "[店名]",      // zh-HK
  ...
  "data.online_shops.o1.name": "[店名]",      // zh-CN
  ...
  "data.online_shops.o1.name": "[Shop name]", // en
  ```

- **The web links themselves** are plain `href`s in `index.html` inside the
  `#buy` section (each `data.online_shops.oN.aria` key only supplies that
  button's `aria-label`). Online buttons open in a new tab:
  `target="_blank" rel="noopener noreferrer"`.

Use the same shop for the same key in every language so the three versions
stay in step. **Shop names stay in English in every language** — only the
descriptive fields are translated. Addresses are romanised for `en`
(e.g. 九龍灣宏開道 20 號 → `20 Wang Hoi Road, Kowloon Bay`).

> Only nutrients and seeds need restocking. The bottle is reusable.
> Please call or check the website before you go — this is written on the page
> on purpose, so keep that sentence.

### 2) Add or change a video

The six cards live in `index.html` in the `#videos` section. Each card has a
poster image, a title, a duration, a written summary and a transcript.

- Drop the new poster into `assets/` and change the `<img src="...">`.
- Titles / summaries / transcripts are the `video.t1…t6`, `video.s1…s6` and
  `video.x1…x6` keys in `i18n/translations.js` (all three languages).
- **There is no video player yet.** If a video file does not exist, the card
  shows `影片準備中` plus the written summary — never a broken player. When
  the video is ready, add a `<video>` element or a link to the hosted file,
  then delete the `video.preparing` badge from that card.

### 3) Change a price-free product name

There are no prices anywhere, on purpose. To rename something (for example
"葉菜營養液" → another nutrient), edit `quick.kit6` in all three languages,
and any of the `trouble.*` / `faq.*` strings that mention it.

### 4) Change any other text

Find the key in `i18n/translations.js`, then edit **all three** language
objects. Keys look like `nav.start`, `hero.title`, `weekly.w2t`,
`trouble.c3a`, `faq.a2`, `footer.disclaimer`.

Rules that keep the page working:

- Do **not** rename or delete a key. `script.js` warns in the browser console
  (`[i18n] missing key "…"`) and falls back to 繁體, which hides mistakes.
- Keep the key sets of `zh-HK`, `zh-CN` and `en` **identical** (currently
  **261 keys** each, namespaces `meta.*`, `a11y.*`, `hero.*`, `quick.*`,
  `weekly.*`, `video.*`, `trouble.*`, `stats.*`, `harvest.*`, `buy.*`,
  `data.online_shops.*`, `data.physical_shops.*`, `data.contact.*`, `faq.*`,
  `contact.*`, `footer.*`, `print.*`).
- Write numbers with their units in one string: `"1 吋"` / `"1 英寸"` / `"1 inch"`.
- If you add a key, add it to all three languages and put the same key on the
  matching element in `index.html` as `data-i18n="your.new.key"`.
- The 繁體 text is also written inline in `index.html`. When you change a
  `zh-HK` string, change the copy inside `index.html` too, so people with
  JavaScript switched off still see the new wording. (Optional but good
  practice.)

### 5) Change the default language, the URL or the date

- Default language: `DEFAULT_LANG` in `script.js` (currently `zh-HK`).
- "Last updated": the `footer.updated` key, in all three languages.
- Contact details: the wording lives under `data.contact.*` in
  `i18n/translations.js` (`poi_info` = Pok Oi Centre, `whatsapp_group` = the
  student group). The `tel:21513931`, `wa.me/85298321426` and
  `chat.whatsapp.com/…` links are plain `href`s in the `#contact` section of
  `index.html` — change the number in **both** places or the dialler and the
  label will disagree.

---

## 4. How the language switcher works

| Where | What happens |
|---|---|
| Default | `zh-HK`, also baked into `index.html` |
| Priority on load | `?lang=` in the URL → `localStorage` key `lang` → `zh-HK` |
| On switch | text nodes swap instantly, no reload, no flash |
| Also updated | `<html lang>`, `<title>`, meta description, `og:title`, `og:description`, `og:locale`, the ✓ / `aria-current` marker, the URL (`?lang=`) |
| Announced | polite live region: `已切換至繁體中文` / `已切换至简体中文` / `Switched to English` |
| JavaScript off | full 繁體 content is readable and printable; the switcher is hidden instead of being a dead button |

Deep links:

- `?lang=zh-HK` — 繁體
- `?lang=zh-CN` — 简体
- `?lang=en` — English

---

## 5. Privacy

No analytics, no tracking, no third-party requests, no cookies. The only thing
stored on the device is the language choice, in `localStorage` under the key
`lang`. This is disclosed in the page footer in all three languages.

---

## 6. Print

`styles.css` contains a print stylesheet. `Ctrl/Cmd + P` produces a clean
one-page quick-start **in the language currently on screen**: the two golden
rules, the kit list and the 7 steps. Navigation, videos, FAQ and the footer are
hidden on paper.

---

## 7. Accessibility notes

- Skip link is the first focusable element.
- Tap targets ≥ 48 × 48 px; body text ≥ 18 px; secondary text ≥ 16 px in
  `--text-muted` — no small, low-contrast grey text anywhere.
- `:focus-visible` ring: `3px solid var(--accent-gold)` with a `4px` offset, so
  it is clearly visible on every dark surface.
- No complex hover states; every action also works with the keyboard alone.
- Language switcher: `role="group"` + `aria-label`, `aria-current="true"` and a
  visible ✓ on the active option, Left/Right arrow keys move between options.
- Every decorative icon is `aria-hidden="true"`; every content image has `alt`
  text in all three languages.
- No horizontal scrolling at 360 px in any language.

**Still to check before launch:** run Lighthouse (mobile) on the live URL in
繁體, 简体 and English — aim for Accessibility ≥ 90 and Best Practices ≥ 90.
Lighthouse cannot be run from this repo; do it in Chrome DevTools on the
deployed site.

---

## 8. Deploy to GitHub Pages

See the numbered steps in the project handover note, or in short:

```bash
git init
git add index.html styles.css script.js i18n/translations.js assets README.md
git commit -m "Add trilingual home hydroponics guide"
git branch -M main
git remote add origin https://github.com/idontknowar/home-hydroponic-for-its.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → `main` /
`/ (root)` → Save**. After about a minute the site is at
<https://otters-ct.github.io/hydroponicguideforLPHresidents/>.

Re-test after every edit: hard-refresh the live URL (or open it on a phone),
then scan the QR code on the bottle to confirm it still lands on the page.
