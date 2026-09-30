# Heirloom Co.

*Curated vintage & modern goods with heirloom quality.*

Website for Heirloom Co., a small Omaha, Nebraska business selling curated vintage and modern clothing, accessories and home goods. The shop is online-only and sells in person at markets and pop-up events around Omaha.

This repository holds a plain HTML, CSS and JavaScript version of the site. It needs no build step or server, which makes it easy to edit and preview while the design and wording are being worked out. It's written with a later move to a **Shopify** theme in mind (see [Moving to Shopify](#moving-to-shopify)).

---

## Pages

| Page | File | What's on it |
|---|---|---|
| Home | `index.html` | Hero with the motto and logo, **What we carry** (Clothing and Home Goods lists), **New this week** (6 item cards), and **Events & Pop-ups** (upcoming events). |
| Shop | `shop.html` | 12 item cards with **All / Clothing / Home** filter buttons. |
| Events & Pop-ups | `events.html` | Upcoming events list and a **Want us at your event?** section. |
| Contact | `contact.html` | Contact form (name, email, topic, message) and a note about finding the shop at pop-ups. |

Every page shares the same header (logo, shop name, Shop / Events & Pop-ups / Contact) and footer (logo, links, motto and location).

## Project structure

```
heirloomco/
├── index.html        Home page
├── shop.html         Shop page
├── events.html       Events & Pop-ups page
├── contact.html      Contact page
├── css/
│   └── heirloom.css  All styles for every page
├── js/
│   └── heirloom.js   Mobile menu, shop filter, contact form message
├── images/
│   ├── logo.jpg      Heirloom Co. seal logo
│   └── leaf.jpg      Leaf cut from the logo (What we carry headings)
├── .gitignore
└── README.md
```

## Previewing the site

**Quickest:** double-click `index.html` (or run `open index.html`) to open it in your browser. Refresh the page after saving a change.

**Live reload:** to have the browser refresh by itself whenever a file is saved, run this from the project folder:

```sh
npx -y live-server --port=8000
```

This needs [Node.js](https://nodejs.org). It opens the site at `http://127.0.0.1:8000`. Press `Ctrl+C` in the terminal to stop it.

## Making common changes

### Text

All wording is written directly in the HTML files. Open the page, find the text and edit it. Headings with a green italic ending wrap that part in `<em>`, for example:

```html
<h1>Curated vintage &amp; modern goods with <em>heirloom quality.</em></h1>
```

Use `&amp;` for an `&` inside HTML.

### Item cards (Home and Shop)

Each item is one `<article class="item">` block:

```html
<article class="item" data-kind="clothing">
  <div class="item-img"><span class="caps">Photo</span></div>
  <span class="caps kind">Clothing</span>
  <h3 class="name">Item name</h3>
  <p class="meta">Short description of the piece</p>
  <p class="price">$00</p>
</article>
```

- **Photo:** put the image in `images/`, then replace the `<span class="caps">Photo</span>` with an image tag, e.g. `<img src="images/wool-coat.jpg" alt="Olive wool chore coat">`. Photos are shown as squares and cropped to fit, so square photos work best.
- **Category:** `data-kind` must be `clothing` or `home` so the Shop page filter buttons work. Change the visible label (`Clothing` / `Home`) to match.
- **Name, description, price:** replace the placeholder text.

The homepage shows 6 cards and the Shop page shows 12. Add or remove whole `<article>` blocks to change that.

### Events

Each event is one `<li>` inside `<ul class="events">`:

```html
<li>
  <time class="date" datetime="2026-10-10"><span class="caps">Oct</span><b>10</b></time>
  <div>
    <h3>Fall Vintage Market</h3>
    <p class="muted">Saturday · 9:00 – 3:00 · Venue name, Omaha</p>
    <p>Short description of what we're bringing.</p>
  </div>
</li>
```

Set `datetime` to the full date (year-month-day), and the month and day inside the date box.

> **Note:** the events list appears in **two** places: `events.html` and the bottom of `index.html`. Update both when events change.

### Colors

Brand colors are defined at the top of `css/heirloom.css`:

| Name | Value | Used for |
|---|---|---|
| `--paper` | `#F8F8F4` | Page background |
| `--paper-2` | `#EFEFE8` | Alternate section background (New this week, pop-up section) |
| `--ink` | `#1D1E1A` | Main text |
| `--sage` | `#56654A` | Dark gray-green accent: buttons, link highlights, small headings, italic heading endings |

Lighter and darker shades (`--ink-soft`, `--rule`, `--sage-soft`, `--sage-deep`) are mixed from these automatically, so changing the four main colors updates the whole site.

**Dark mode:** when a visitor's device is set to dark mode, the site switches to a dark palette (defined in the `@media (prefers-color-scheme: dark)` block just below). To turn this off, remove `class="dark-ok"` from the `<html>` tag on each page.

### Fonts

Loaded from Google Fonts in each page's `<head>`:

| Font | Used for |
|---|---|
| **Newsreader** | Large headings and item names |
| **Marcellus** | Small all-caps labels, buttons, shop name |
| **Figtree** | Body text |

### Logo

The logo is `images/logo.jpg` (black line art on white). It's used in the header, the footer and the homepage hero. CSS blends away the white background so it sits on the page color, and inverts it to light lines in dark mode. To replace it, save a new file over `images/logo.jpg`, ideally square and tightly cropped.

## Still to do

Placeholder content that needs real information before launch:

- [ ] **Item cards:** photos, names, descriptions and prices on the Home and Shop pages.
- [ ] **Events:** the three events on the Events page and homepage are samples with made-up dates and "Venue name, Omaha".
- [ ] **What we carry lists:** the Home Goods rows (Decor & vessels, Tableware and their examples) were drafted and should be checked against what the shop actually carries.
- [ ] **Contact form:** it isn't connected to anything yet. Submitting shows a message saying the form isn't connected. It will be wired up during the Shopify move, or through a form service in the meantime.
- [ ] **Instagram and privacy links:** the footer and Contact page use `#` placeholders.
- [ ] **Favicon** (browser tab icon).
- [ ] **Spelling consistency:** "homegoods" in the homepage paragraph vs. "Home Goods" elsewhere.

## Moving to Shopify

The site began as a Shopify Online Store 2.0 theme and was turned into static pages so it could be designed and edited locally. When it's ready to go live on Shopify:

1. **Theme files:** each homepage section maps to a Shopify section (`sections/*.liquid`), and the shared header and footer become the `header` and `footer` sections in `layout/theme.liquid`. `css/heirloom.css` and `js/heirloom.js` move to the theme's `assets/` folder.
2. **Products:** the item cards become a product loop over a Shopify collection. The card's image, name, description and price map to `product.featured_media`, `product.title`, a short description and `product.price`. The category (`data-kind`) maps to `product.type`, and the Shop page becomes the collection page.
3. **Contact form:** Shopify's built-in `{% form 'contact' %}` replaces the placeholder form.
4. **Editable settings:** colors, the motto and section text can be exposed as theme settings so they can be changed in the Shopify theme editor without touching code.
5. **Previewing:** use the [Shopify CLI](https://shopify.dev/docs/storefronts/themes/tools/cli) (`shopify theme dev --store <store>.myshopify.com`) to preview the theme against the real store before publishing.

This conversion has been done on the **`shopify`** branch; its README covers setting up the store.

## Git workflow

- **`main`**: this plain HTML/CSS/JS site. Make and preview changes here.
- **`shopify`**: the same site packaged as a Shopify theme, with setup steps for the store in that branch's README. When changes on `main` are ready for the store, carry them over to the `shopify` branch.

Switch between them with `git checkout main` or `git checkout shopify`.
