# Commerce Plan

## Model

```
EDITORIAL ENTITY → PRODUCT → MERCHANT OFFER → AFFILIATE ROUTE
```

`AffiliateProduct` (`src/types/product.ts`) reuses the family's three-tier pattern (strongest version found in Ramen: product → single `AffiliateRoute` with `network`/`url`/`status`). A `needs-verification` or `pending` status never renders as a clickable link (`CuratedKitchenPage.tsx` gates on `status === 'active'`).

## Sourcing Rule Followed

Per the master spec: AFFILIATE MASTER → FILTER FOR NOODLES RELEVANCE → REUSE VERIFIED PRODUCTS → IDENTIFY GENUINE GAPS → (user sources new links, not done this pass) → UPDATE MASTER → USE CONTEXTUALLY.

`LET_THEM_EAT_AFFILIATE_MASTER.md` (living in `Let Them Eat Ramen/`) was read before sourcing anything. All **47 products** in `src/data/products.ts` are copied from Ramen's `src/data/products.json` (`noodle-tools`, `broth-essentials`, and `bowls-tableware`) with URLs preserved byte-for-byte — none regenerated, normalized, or fabricated. Phase 1 reused 24; Phase 2 pulled in the remaining 19 `bowls-tableware` items and 4 `broth-essentials` items (16-Quart Stockpot, Large Enameled Dutch Oven, Fine-Mesh Chinois, Fat Separator) that Phase 1's gap analysis had flagged as relevant-but-not-yet-reused. See `NOODLES_COMMERCE_GAP_ANALYSIS.md` for the full accounting.

## Curated Kitchen

Contextual, secondary, and reused: `ContextualCuratedKitchen.tsx` surfaces products tagged with a matching Workshop lab context (`dough-lab`, `shape-lab`, `broth-sauce-lab`) inline; `CuratedKitchenPage.tsx` is the full browsable catalog, grouped by category.

## Not Built This Pass

Commerce backend, affiliate API, cross-app product sync — none needed; the model stays deliberately file-based, matching the family's explicit "no admin dashboard, no backend until genuinely needed" rule.
