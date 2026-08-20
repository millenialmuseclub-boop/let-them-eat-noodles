import type { NoodleImage } from '../types/photo';

/* Photography — honest-gap state for this Phase 1 pass.
   Per the master spec: "prefer honest fallback over an incorrect photo." Every dish, noodle type,
   and scene in this Phase 1 build renders through the fallback path (see PhotoFrame component)
   rather than a possibly-mismatched or unverifiable image. This is a deliberate, documented
   choice — not an oversight — recorded honestly in PHOTOGRAPHY.md as 0/16 photographed, the
   single largest genuine gap in this pass, rather than risk an incorrect or unverifiable license
   attribution under time pressure. The type/rendering pipeline below is fully built and proven;
   only actual sourced photography is deferred to Phase 2.
   Populate this array with verified NoodleImage records (Wikimedia Commons / Unsplash / Pexels,
   with real creator/license/source-url attribution) to light up real photography — no component
   changes required. */
export const images: NoodleImage[] = [];

export function getImageFor(subjectId: string): NoodleImage | undefined {
  return images.find((img) => img.subjectId === subjectId);
}
