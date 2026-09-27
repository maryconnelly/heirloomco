# Heirloom Co. — Shopify theme

*Curated vintage & modern goods with heirloom quality.*

This is the **`shopify` branch**: the Heirloom Co. site packaged as a Shopify Online Store 2.0 theme, ready to set up on the shop's Shopify account.

The plain HTML version of the site lives on the **`main`** branch. That's the place to try out design and wording changes locally; bring finished changes over to this branch when they're ready for the store (see [Keeping the two branches in step](#keeping-the-two-branches-in-step)).

---

## What's in the theme

| Page on the store | Shopify template | Sections |
|---|---|---|
| Home | `templates/index.json` | Hero, What we carry, New arrivals, Events |
| Shop (any collection) | `templates/collection.json` | Collection (item cards + category filter) |
| Product | `templates/product.json` | Product |
| Events & Pop-ups | `templates/page.events.json` | Page heading, Events, Call to action |
| Contact | `templates/page.contact.json` | Contact form (Shopify's built-in contact form) |
| Cart, search, 404, blog, article, collections list, password | `templates/*.json` | One `main-*` section each |

Every section's text can be edited in the Shopify theme editor (**Online Store → Themes → Customize**) without touching code.

## Theme structure

```
heirloomco/  (shopify branch)
├── assets/
│   ├── heirloom.css            All styles
│   ├── heirloom.js             Leaf icons + shop category filter
│   └── logo.jpg                Heirloom Co. seal (used when no logo is set in theme settings)
├── config/
│   ├── settings_schema.json    Theme settings: colors, logo, favicon, Instagram
│   └── settings_data.json      Saved setting values
├── layout/
│   ├── theme.liquid            Page shell: fonts, colors, header, footer
│   └── password.liquid         "Opening soon" page shell
├── locales/en.default.json
├── sections/
│   ├── header.liquid           Logo, shop name, menu, bag
│   ├── footer.liquid           Logo, menu, Instagram, tagline
│   ├── hero.liquid             Home: motto, text, button, logo
│   ├── carry.liquid            Home: What we carry (Clothing / Home Goods lists)
│   ├── new-arrivals.liquid     Home: item cards from a chosen collection
│   ├── events.liquid           Home + Events page: upcoming events list
│   ├── page-heading.liquid     Big heading at the top of a page
│   ├── call-to-action.liquid   "Want us at your event?" band
│   ├── main-contact.liquid     Contact page form
│   ├── main-collection.liquid  Shop page
│   └── main-*.liquid           Product, cart, search, 404, blog, article, page, password
├── snippets/
│   ├── logo.liquid             Logo image (theme setting or assets/logo.jpg)
│   ├── nav-links.liquid        Menu links, with default links if the menu is empty
│   ├── item-card.liquid        Product card: photo, type, name, description, price
│   └── item-card-placeholder.liquid  Placeholder card before products exist
└── templates/                  JSON templates listed above
```

## Setting up the Shopify store

### 1. Add the theme

**Option A: Shopify CLI (recommended while still making changes)**

Requires [Node.js](https://nodejs.org) and the Shopify CLI (`npm install -g @shopify/cli`). From this folder, on the `shopify` branch:

```sh
# Preview on the store without publishing (opens a local preview link)
shopify theme dev --store heirloomcoshop.myshopify.com

# Upload as a new, unpublished theme
shopify theme push --unpublished --store heirloomcoshop.myshopify.com
```

The first command opens a browser window to log in to Shopify.

**Option B: upload a zip**

```sh
shopify theme package
```

Or zip the `assets`, `config`, `layout`, `locales`, `sections`, `snippets` and `templates` folders together. Then in Shopify admin go to **Online Store → Themes → Add theme → Upload zip file**.

### 2. Create the pages

In **Online Store → Pages**, create:

| Page title | Theme template | Resulting address |
|---|---|---|
| Events & Pop-ups | `page.events` | `/pages/events` |
| Contact | `page.contact` | `/pages/contact` |

The URL handles must be `events` and `contact` for the built-in links to work. Page body text isn't used on these two pages; their content comes from the sections.

### 3. Set up products

- Add products with a **photo**, **title**, **description** (the first dozen words show on the card) and **price**.
- Set each product's **Product type** to `Clothing` or `Home`. The type is the small green label on each card and drives the **All / Clothing / Home** filter buttons on the Shop page.
- Since every piece is one of a kind, set inventory to 1. Sold-out products show "Sold" and fade out.
- Create a collection (e.g. **New arrivals**), then in the theme editor pick it in the home page's **New arrivals** section. Until a collection with products is chosen, placeholder cards are shown.

### 4. Set up navigation

In **Online Store → Navigation**:

- **Main menu:** Shop → `/collections/all`, Events & Pop-ups → the Events page, Contact → the Contact page.
- **Footer menu:** the same links, or whatever you'd like.

If a menu is left empty, the header and footer fall back to Shop, Events & Pop-ups and Contact automatically.

### 5. Theme settings

In the theme editor, open **Theme settings** (the gear icon):

- **Colors:** background, alternate background, text and accent (defaults match the site).
- **Logo:** optional. Leave blank to use the included seal, or upload a new one. Also set the **favicon** (browser tab icon) here.
- **Social:** Instagram link, which adds an Instagram link to the footer.

### 6. Events

Events are blocks in the **Events** section, on both the home page and the Events page. Each has:

- **Date** in year-month-day form, e.g. `2026-10-10` (shown as the Oct / 10 date box)
- **Event name**
- **Day, time & place**, e.g. `Saturday · 10:00 – 4:00 · Venue name, Omaha`
- **Description**

Past events hide themselves automatically once their date has passed. The home page shows the next 3, and the Events page shows up to 20.

> The home page and the Events page each have their own list of events, so add a new event to both.

### 7. Before launch

- [ ] Replace the three sample events (made-up dates and "Venue name, Omaha").
- [ ] Check the **What we carry** lists against what the shop actually carries.
- [ ] Contact form: send a test message and confirm it arrives at the store's email (**Settings → Store details**).
- [ ] Add the Instagram link and favicon.
- [ ] Remove the store password (**Online Store → Preferences**) when ready to open.

## Checking the theme

```sh
shopify theme check
```

Reports Liquid and schema problems. The only expected warnings are about Google Fonts loading from Google instead of Shopify's servers.

## Keeping the two branches in step

- **`main`**: plain HTML/CSS/JS site for editing and previewing locally.
- **`shopify`**: this theme.

The two share the same styles and design, but the page content is written differently: HTML files on `main`, and sections and templates here. When something changes on `main`:

- **Styles:** copy the changes from `main`'s `css/heirloom.css` into `assets/heirloom.css`. Leave out the four color values at the top, since the theme sets those from theme settings.
- **Wording:** update the matching section's defaults, the text in `templates/*.json`, or just edit it in the Shopify theme editor.
- **New sections or pages:** add a section in `sections/` and include it in a template.
