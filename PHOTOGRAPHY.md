# Photography

## Status: Architecture Complete, 0/51 Dishes Photographed (Honest, Deliberate Gap, Carried Through Phase 2)

The `NoodleImage` type (`src/types/photo.ts`), the `PhotoFrame` component (`src/components/PhotoFrame.tsx`), and the fallback rendering path are fully built and used consistently across Discover, Encyclopedia, Atlas tiles, Workshop, and dish detail pages. `src/data/images.ts` is currently an empty array — every one of the 51 dishes and 25 noodle types renders through the honest fallback (a branded emoji mark with a descriptive `aria-label` ending in "— photography pending"), not a possibly-mismatched or unverifiable photo.

This is a deliberate choice, not an oversight, reaffirmed in Phase 2 rather than revisited under time pressure. The master spec is explicit: "prefer honest fallback over an incorrect photo," and forbids AI-generated food imagery, scraped restaurant/platform imagery, and misleading substitute dishes. Sourcing and license-verifying real photography for 51 culturally-specific dishes accurately enough to trust is real editorial work — Cookies did it over 49/52 dishes and Ramen over 13/25 as their own dedicated passes, not folded into a content-saturation pass. Rushing verification now, with the catalog more than tripled in size, would have meant a materially higher risk of a wrong or mismatched photo — explicitly the thing to avoid. This remains the single largest genuine gap in the app, not disguised as complete, and is the top recommended focus for the next phase.

## What's Ready to Receive Real Photography

`NoodleImage` requires `creator`, `source` (`wikimedia-commons | unsplash | pexels | other`), `sourceUrl`, and `license` — matching the family's attribution requirements. Adding entries to `src/data/images.ts` lights up real photography with zero component changes; `PhotoFrame` already renders the credit pill (`.photo-credit`) when an image is present.

## Recommended Phase 2 Approach

Follow Ramen's model: source verified Wikimedia Commons (or a single consistent stock provider, deliberately different from Cake's Unsplash and Ramen's Pexels per the family's source-diversity pattern) images for the most visually unambiguous dishes first, track coverage honestly (e.g. "11/16 photographed"), and leave any dish without a confident match unphotographed rather than force a substitute.
