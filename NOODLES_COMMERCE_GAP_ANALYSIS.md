# Noodles Commerce Gap Analysis

Source: `Let Them Eat Ramen/src/data/products.json`, filtered against `LET_THEM_EAT_AFFILIATE_MASTER.md`.

**Phase 2 update**: all 19 remaining `bowls-tableware` items and the 4 remaining `broth-essentials` items flagged below as "partially covered" in the original Phase 1 pass have now been pulled into `src/data/products.ts`, exactly as recommended. The catalog is now 47 products, all real, all `active`. Verified category counts: Bowls (12), Prep Tools (11), Chopsticks & Spoons (9), Noodle-Making Equipment (7), Cookware (4), Serving (3), Storage (1), Pantry (0), Books & Gifts (0).

## Already Covered (47 products reused, all `active`, real URLs preserved exactly)

| Category | Products reused |
|---|---|
| Bowls (12) | Mora Ceramic Ramen Bowls, World Market Asian Dinnerware Collection, World Market Lucky Cat Porcelain Bowl, Black Pad Print Bowl, Blue Swirl Bowl, Red + Green Bowl Set, Yatai Keiji Japanese Noodle Set, Otemachi Bowl, Shigenobu 47-oz Bowl, Nissin Cup Noodles Bowl Set, Infuse Black Melamine Bowls, Cook With Color Bowl |
| Chopsticks & Spoons (9) | World Market Stripe Floral Noodle Bowl + Chopsticks, Traditional Wooden Spoons, Ceramic Chopstick Rests, Japanese Ceramic Soup Spoon, Long Japanese Chopsticks, Reusable Bamboo Chopsticks, Ironwood Chopsticks, Wooden Chopstick Rests, Japanese Spoon-and-Chopstick Set |
| Noodle-Making Equipment (7) | Marcato Atlas 150, KitchenAid Pasta Roller Attachment, KitchenAid Pasta Cutter Attachment, Manual Noodle Cutter, Japanese Noodle Knife, Noodle Drying Rack, Bamboo Noodle Tray |
| Prep Tools (11) | Noodle Strainer Basket, Bench Scraper, Dough Scraper, Large Wood Cutting Board, Precision Kitchen Scale, Instant-Read Thermometer, Fine-Mesh Stock Skimmer, Large Fine-Mesh Strainer, Spider Strainer, Fine-Mesh Chinois, Fat Separator |
| Serving (3) | Soup Ladle, Noodle Serving Tray, Japanese Lacquer-Style Serving Tray |
| Cookware (4) | 8-Quart Stockpot, 12-Quart Stockpot, 16-Quart Stockpot, Large Enameled Dutch Oven |
| Storage (1) | Reusable Broth/Stock Bags |

## Previously Partially Covered — Now Fully Reused in Phase 2

Phase 1 flagged Ramen's remaining ~19 `bowls-tableware` items and 4 `broth-essentials` items (16-Quart Stockpot, Large Enameled Dutch Oven, Fine-Mesh Chinois, Fat Separator) as relevant-but-not-pulled-in. All 23 are now in the table above. Two items remain deliberately not reused:

- Ramen's `Rolling Pin` and `Dough Proofing Box` — both `pending` (no URL yet) in the source catalog; not reused since they'd render as dead "Coming Soon" tiles. Genuinely useful for the Dough Lab once the user supplies links.
- Cake's baking-tool catalog (Digital Scale, Bench Scraper, Thermapen, etc.) — mostly near-duplicates of what Ramen already covers for noodle-making; not cross-pulled to avoid redundant near-duplicate listings.

## Two Existing `needs-verification` Items (not usable regardless)

`digital-kitchen-scale-broth` and `pressure-cooker-instant-pot` in Ramen's catalog both carry a URL that duplicates another product's URL and are flagged `needs-verification` in the source file. Not reused — carries no forward action for Noodles beyond what's already flagged in Ramen's own catalog.

## Genuine New-Link Gaps (nothing in the family catalog covers these)

- **Rice-noodle-specific tools**: a bamboo steamer tray or rolling pin sized for steaming/rolling fresh rice-noodle sheets (bánh phở, shahe fen, laksa noodles, mì Quảng noodle) — the family catalog is entirely wheat-noodle-tool-oriented (lamian/udon/soba context from Ramen).
- **A wok** — surprisingly absent from every sibling app's catalog despite wok cooking now being central to 9+ of the 51 dishes (chow fun, char kway teow, pancit bihon/canton, pad thai/see ew/kee mao, yakisoba, hokkien mee, and stir-fry technique broadly).
- **Rice paddles / noodle spiders sized for wide rice noodles specifically** — the existing strainer basket is ramen-strand-sized.
- **A mandoline or fine julienne tool** for the vegetable prep common to japchae, laksa, khao soi, and the several new banh-mi-adjacent Vietnamese dishes.
- **A pork-bone/dashi-appropriate small stockpot with a built-in strainer basket** for lighter Japanese/Korean broths (janchi guksu, kalguksu) where the family's stockpots (sized for ramen tonkotsu batches) are oversized.

These five categories are flagged for the user to source verified links for; none were fabricated or guessed.
