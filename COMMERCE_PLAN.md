# Commerce Plan

## Model

```
EDITORIAL ENTITY → PRODUCT → MERCHANT OFFER → AFFILIATE ROUTE
```

`AffiliateProduct` (`src/types/product.ts`) reuses the family's three-tier pattern (strongest version found in Ramen: product → single `AffiliateRoute` with `network`/`url`/`status`). A `needs-verification` or `pending` status never renders as a clickable link (`CuratedKitchenPage.tsx` gates on `status === 'active'`).

## Sourcing Rule Followed

Per the master spec: AFFILIATE MASTER → FILTER FOR NOODLES RELEVANCE → REUSE VERIFIED PRODUCTS → IDENTIFY GENUINE GAPS → (user sources new links, not done this pass) → UPDATE MASTER → USE CONTEXTUALLY.

`LET_THEM_EAT_AFFILIATE_MASTER.md` (living in `Let Them Eat Ramen/`) was read before sourcing anything. All 24 products in `src/data/products.ts` are copied from Ramen's `src/data/products.json` (`noodle-tools`, `broth-essentials`, and a slice of `bowls-tableware`) with URLs preserved byte-for-byte — none regenerated, normalized, or fabricated. See `NOODLES_COMMERCE_GAP_ANALYSIS.md` for the full accounting.

## Curated Kitchen

Contextual, secondary, and reused: `ContextualCuratedKitchen.tsx` surfaces products tagged with a matching Workshop lab context (`dough-lab`, `shape-lab`, `broth-sauce-lab`) inline; `CuratedKitchenPage.tsx` is the full browsable catalog, grouped by category.

## Not Built This Pass

Commerce backend, affiliate API, cross-app product sync — none needed; the model stays deliberately file-based, matching the family's explicit "no admin dashboard, no backend until genuinely needed" rule.
