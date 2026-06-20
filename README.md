# NOX — *clean pieces only.*

A modern, premium reselling storefront for curated **streetwear, vintage,
designer, football shirts, Y2K and second-hand grails**. Built mobile-first
with a luxury monochrome aesthetic and a **Shopify-ready architecture** — runs
on a bundled demo catalog out of the box, and switches to live Shopify data the
moment you add credentials.

> Quality level targeted: Represent / Corteiz / Stüssy / Fear of God.

---

## ✦ Live-Vorschau (1-Tipp Deploy)

Tippe den Button an — Vercel klont diesen Branch, baut ihn und gibt dir eine
echte `https://…vercel.app`-URL (läuft im Demo-Modus, **ohne** Konfiguration):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Din66w/Fivem-FREE-cheat/tree/claude/nox-reselling-website-zer1qh&project-name=nox-store&repository-name=nox-store)

Ablauf am iPhone: Button → mit GitHub einloggen → **Deploy** → nach ~1 Min die
`.vercel.app`-Adresse öffnen. Shopify-Token kannst du später in den Vercel
Project-Settings (Environment Variables) ergänzen, um live zu gehen.

---

## ✦ Tech stack

| | |
|---|---|
| Framework | **Next.js 14** (App Router, RSC, ISR) |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS** (custom monochrome design system) |
| Animation | **Framer Motion** |
| Commerce | **Shopify Storefront API** (GraphQL) with demo fallback |
| State | React Context + `localStorage` (cart, wishlist, recently viewed) |

No UI kit, no icon library — every component is bespoke to keep the bundle lean
and the look un-template-like.

---

## ✦ Quick start

```bash
# 1. Install
npm install

# 2. (optional) configure environment
cp .env.example .env.local      # leave Shopify blank to run in demo mode

# 3. Run
npm run dev                     # http://localhost:3000
```

Other scripts:

```bash
npm run build       # production build
npm run start       # serve production build
npm run lint        # eslint
npm run type-check  # tsc --noEmit
```

---

## ✦ Project structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout, SEO metadata, providers
│   ├── page.tsx                  # Home
│   ├── globals.css               # Tailwind + design tokens
│   ├── loading.tsx               # Global skeleton
│   ├── not-found.tsx             # 404
│   ├── sitemap.ts / robots.ts    # SEO
│   ├── shop/page.tsx             # Shop (search + filters + sort)
│   ├── product/[handle]/page.tsx # Product (gallery, zoom, related, JSON-LD)
│   ├── about/ contact/ faq/      # Content pages
│   ├── wishlist/ checkout/       # Saved items + checkout flow
│   └── api/                      # newsletter · contact · checkout · revalidate
│
├── components/
│   ├── layout/                   # AnnouncementBar, Header, MobileMenu, Footer, Logo
│   ├── home/                     # Hero, FeaturedProducts, NewArrivals, Trending, …
│   ├── product/                  # ProductCard, Grid, Rail, QuickView, ImageGallery,
│   │                             #   AddToCart, WishlistButton, RelatedProducts, …
│   ├── shop/                     # ShopClient, Filters, FilterGroup
│   ├── cart/                     # CartDrawer, CheckoutClient
│   ├── wishlist/                 # WishlistClient
│   ├── common/                   # Newsletter (form + popup), ContactForm, Accordion
│   ├── ui/                       # Button, Icons, Reveal, SectionHeading
│   └── providers/                # Providers (composes all contexts + overlays)
│
├── context/                      # Cart, Wishlist, RecentlyViewed, UI (drawers/modals)
├── hooks/                        # useLocalStorage (SSR-safe, cross-tab)
└── lib/
    ├── types.ts                  # Domain model (Shopify-shaped)
    ├── config.ts                 # Brand, nav, socials, announcement, drop date
    ├── utils.ts                  # cn, money/date formatting, discounts
    ├── products.ts               # ← single data-access layer (the app imports only this)
    ├── dummy-data.ts             # Demo catalog (16 pieces)
    └── shopify/
        ├── client.ts             # Storefront fetch wrapper + isShopifyConfigured
        ├── queries.ts            # GraphQL operations/fragments
        └── transforms.ts         # Shopify payload → NOX domain types
```

---

## ✦ Shopify integration architecture

The core idea: **the UI never talks to Shopify directly.** Everything funnels
through `src/lib/products.ts`, which serves either live Shopify data or the
bundled demo catalog — decided automatically by whether credentials exist.

```
            ┌─────────────────────────────────────────────┐
 UI / Pages │  getAllProducts() · getProductByHandle() …   │  ← only import
            └───────────────────────┬─────────────────────┘
                                    │  src/lib/products.ts
                  isShopifyConfigured ?  ──────────────┐
                         │ yes                          │ no
                         ▼                              ▼
        shopify/client → queries → transforms     dummy-data.ts
        (Storefront GraphQL, ISR-cached)          (offline demo)
                         │                              │
                         └────────────► NOX domain types (lib/types.ts)
```

**Why this is migration-proof**

- `lib/types.ts` is intentionally shaped to map 1:1 onto the Storefront API
  (`handle`, `vendor`→`brand`, variants, `priceRange`, etc.).
- `transforms.ts` is the *only* file that knows Shopify's payload shape.
- Filtering/sorting/faceting (`filterProducts`, `sortProducts`, `buildFacets`)
  are pure functions that run the same in both modes.

### Going live with Shopify

1. **Shopify Admin → Settings → Apps and sales channels → Develop apps →
   Create an app.**
2. Enable the **Storefront API** scopes (`unauthenticated_read_product_listings`,
   `unauthenticated_read_product_inventory`, `unauthenticated_write_checkouts`).
3. Copy the **Storefront access token** and store domain into `.env.local`:
   ```env
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxx
   SHOPIFY_STOREFRONT_API_VERSION=2024-07
   ```
4. Restart. The store now reads live products and **checkout creates a real
   Shopify cart** and redirects to Shopify's hosted, PCI-compliant checkout
   (`/api/checkout`).
5. Map merchandising metadata via Shopify **tags** so the rails/filters light up:
   - `featured`, `trending` → home-page rails
   - `condition:Deadstock`, `category:Y2K` → product condition/category
   - product `vendor` → brand · variant option `Size` → sizes

### On-demand revalidation (optional)

Set `SHOPIFY_REVALIDATION_SECRET`, then add a Shopify webhook
(`products/update`) pointing to `/api/revalidate?secret=...` to rebuild pages
when inventory changes — no redeploy needed.

### Migrating into a Shopify theme instead?

The component library is presentation-first and data-agnostic. To port into a
Liquid theme, the section components (`Hero`, `ProductGrid`, etc.) map directly
onto Shopify sections/blocks, and `transforms.ts` documents exactly which
Storefront fields each component needs.

---

## ✦ Features

**Pages** — Home · Shop · Product · About · Contact · FAQ (+ Wishlist, Checkout, 404)

**Commerce UX**
- 🛒 Cart drawer with quantity controls & live subtotal (persisted)
- ❤️ Wishlist (persisted, badge in header, dedicated page)
- 👁 Product quick view modal
- 🔍 Product image zoom + thumbnail gallery
- 🕑 Recently viewed rail (persisted)
- ✉️ Newsletter signup + timed popup (shown once)
- 📣 Announcement bar with **live countdown** to the NOX drop (01.01.2027)
- 🔎 Shop search + filters (Brand · Size · Category · Price · Condition) + sort

**Design / quality**
- Mobile-first, fully responsive
- Monochrome (black/white/gray) luxury system, dark by default
- Framer Motion reveals, hover states, drawers — all respect `prefers-reduced-motion`
- SEO: per-page metadata, OpenGraph/Twitter, JSON-LD product schema, sitemap, robots
- Fast: RSC + ISR, `next/image` (AVIF/WebP), no heavy dependencies

---

## ✦ Customising the brand

Everything brand-level lives in **`src/lib/config.ts`** (name, slogan, nav,
socials, announcement text, drop date) and the design tokens in
**`tailwind.config.ts`** + **`globals.css`**. Swap the wordmark in
`components/layout/Logo.tsx` for a real asset whenever you like.

The forms (`/api/newsletter`, `/api/contact`) are stubs with clear `TODO`s —
point them at Klaviyo / Mailchimp / Resend / Shopify Customers without touching
the UI.
