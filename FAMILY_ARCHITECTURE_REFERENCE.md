# Family Architecture Reference

Audited: Let Them Eat Cake, Let Them Eat Ramen, Let Them Eat Cookies (read-only; none modified).

## FAMILY-REUSABLE (adopted directly)

- Hub-array-driven navigation (`data/hubs.ts` + `BottomTabBar`), My-library reached via top-nav icon rather than a 5th tab (Cookies' locked Phase 1 decision)
- Flat-JSON-joined-by-id domain model, no ORM, no backend
- Deterministic weighted-scoring Sommelier with `explain*()`-style reasons in results, no LLM call
- Tri-state + note personal-library pattern via `useSyncExternalStore` + module-level pub-sub + localStorage (Ramen's strongest version, including its documented "referentially stable snapshot" gotcha)
- One shared Lab/LabExplorer component serving N labs via data (Ramen's Workshop pattern)
- Flat data-only Troubleshooter — zero branching decision code, all logic in data
- Three-tier commerce model (Editorial Product → Merchant Offer → Affiliate Route) with a `needs-verification` safety gate that blocks rendering as a clickable link
- `env(safe-area-inset-*)` mobile patterns, global `a`/button/input/range CSS reset written in the first pass, one `index.css` file (not split per component)
- `focus-visible` + `prefers-reduced-motion` + `aria-live` accessibility baseline
- Route-level `React.lazy` code splitting from the start (retrofit-avoidance lesson from Cookies)

## NOODLES-SPECIFIC (built fresh, not in any sibling app)

- The NOODLE TYPE vs. NOODLE DISH relationship model (`src/types/noodle.ts`) — no sibling app has a "same underlying product, many culturally distinct dishes" relationship; Ramen's closest analog (`bowlComponents`) is components-of-a-dish, not a shared-type-across-dishes
- A real structured `Recipe` type (`src/types/recipe.ts`) — Ramen has none (its `preparationOverview` is a single free-text string); this uses Cookies' `RecipeIngredientGroup`/`RecipeInstruction` shape as the template, extended with a `relatedLabSlug` cross-link back to Workshop
- A genuinely global (not single-country-hardcoded) Atlas structure

## DO NOT GENERALIZE YET

- OTA update pipeline (Cake-only, requires a private signing key + R2 bucket neither Ramen nor Noodles has)
- A real map layer for Atlas (Ramen's `react-simple-maps` + `world-atlas` approach is the right library, but its Japan-hardcoded `minZoom`/default-view logic doesn't transfer to a genuinely global view without its own design pass — documented, not built, this pass)
- Any shared multi-app framework, cross-app sync, or commerce backend/API
