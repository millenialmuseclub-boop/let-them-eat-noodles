# Noodles Commerce Gap Analysis

Source: `Let Them Eat Ramen/src/data/products.json`, filtered against `LET_THEM_EAT_AFFILIATE_MASTER.md`.

## Already Covered (24 products reused, all `active`, real URLs preserved exactly)

| Category | Products reused |
|---|---|
| Bowls | Mora Ceramic Ramen Bowls, World Market Asian Dinnerware Collection, World Market Lucky Cat Porcelain Bowl |
| Chopsticks & Spoons | World Market Stripe Floral Noodle Bowl + Chopsticks |
| Noodle-Making Equipment | Marcato Atlas 150, KitchenAid Pasta Roller Attachment, KitchenAid Pasta Cutter Attachment, Manual Noodle Cutter, Japanese Noodle Knife, Noodle Drying Rack, Bamboo Noodle Tray |
| Prep Tools | Noodle Strainer Basket, Bench Scraper, Dough Scraper, Large Wood Cutting Board, Precision Kitchen Scale, Instant-Read Thermometer, Fine-Mesh Stock Skimmer, Large Fine-Mesh Strainer, Spider Strainer |
| Serving | Soup Ladle |
| Cookware | 8-Quart Stockpot, 12-Quart Stockpot |
| Storage | Reusable Broth/Stock Bags |

## Partially Covered (exists in family catalog, not reused this pass)

- Ramen's remaining ~19 `bowls-tableware` items (Black Pad Print Bowl, Blue Swirl Bowl, and others) — genuinely relevant, simply not all pulled in to keep Phase 1 bounded; a straightforward Phase 2 addition, no new links needed.
- Ramen's `16-Quart Stockpot`, `Large Enameled Dutch Oven`, `Fine-Mesh Chinois`, `Fat Separator` — relevant to larger-batch broth dishes (phở, mohinga, curry laksa); not pulled in this pass, no new sourcing needed.
- Ramen's `Rolling Pin` and `Dough Proofing Box` — both `pending` (no URL yet) in the source catalog; not reused since they'd render as dead "Coming Soon" tiles. Genuinely useful for the Dough Lab once the user supplies links.
- Cake's baking-tool catalog (Digital Scale, Bench Scraper, Thermapen, etc.) — mostly near-duplicates of what Ramen already covers for noodle-making; not cross-pulled to avoid redundant near-duplicate listings.

## Two Existing `needs-verification` Items (not usable regardless)

`digital-kitchen-scale-broth` and `pressure-cooker-instant-pot` in Ramen's catalog both carry a URL that duplicates another product's URL and are flagged `needs-verification` in the source file. Not reused — carries no forward action for Noodles beyond what's already flagged in Ramen's own catalog.

## Genuine New-Link Gaps (nothing in the family catalog covers these)

- **Rice-noodle-specific tools**: a bamboo steamer tray or rolling pin sized for steaming/rolling fresh rice-noodle sheets (bánh phở, shahe fen, laksa noodles) — the family catalog is entirely wheat-noodle-tool-oriented (lamian/udon/soba context from Ramen).
- **A wok** — surprisingly absent from every sibling app's catalog despite wok cooking being central to 5 of 16 Phase 1 dishes (chow fun, pancit bihon, pad thai, yakisoba, and stir-fry technique broadly).
- **Rice paddles / noodle spiders sized for wide rice noodles specifically** — the existing strainer basket is ramen-strand-sized.
- **A mandoline or fine julienne tool** for the vegetable prep common to japchae, laksa, and khao soi.

These four categories are flagged for the user to source verified links for; none were fabricated or guessed.
