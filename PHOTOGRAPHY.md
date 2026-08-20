# Photography

## Status: Architecture Complete, 0/16 Dishes Photographed (Honest, Deliberate Gap)

The `NoodleImage` type (`src/types/photo.ts`), the `PhotoFrame` component (`src/components/PhotoFrame.tsx`), and the fallback rendering path are fully built and used consistently across Discover, Encyclopedia, Atlas tiles, Workshop, and dish detail pages. `src/data/images.ts` is currently an empty array — every dish and noodle type in this Phase 1 pass renders through the honest fallback (a branded emoji mark with a descriptive `aria-label` ending in "— photography pending"), not a possibly-mismatched or unverifiable photo.

This is a deliberate choice, not an oversight. The master spec is explicit: "prefer honest fallback over an incorrect photo," and forbids AI-generated food imagery, scraped restaurant/platform imagery, and misleading substitute dishes. Sourcing and license-verifying real photography for 16 culturally-specific dishes accurately enough to trust is real editorial work — Cookies did it over 49/52 dishes and Ramen over 13/25 as their own dedicated passes, not folded into their first Phase 1 commit. Doing it well here, under this pass's scope, would have meant either rushing verification (real risk of a wrong or mismatched photo — explicitly the thing to avoid) or skipping the rest of Phase 1 to do it. This is recorded as the single largest genuine gap in this pass, not disguised as complete.

## What's Ready to Receive Real Photography

`NoodleImage` requires `creator`, `source` (`wikimedia-commons | unsplash | pexels | other`), `sourceUrl`, and `license` — matching the family's attribution requirements. Adding entries to `src/data/images.ts` lights up real photography with zero component changes; `PhotoFrame` already renders the credit pill (`.photo-credit`) when an image is present.

## Recommended Phase 2 Approach

Follow Ramen's model: source verified Wikimedia Commons (or a single consistent stock provider, deliberately different from Cake's Unsplash and Ramen's Pexels per the family's source-diversity pattern) images for the most visually unambiguous dishes first, track coverage honestly (e.g. "11/16 photographed"), and leave any dish without a confident match unphotographed rather than force a substitute.
