# Photography

## Status: 51/51 Dishes Photographed with Verified, Attributed Wikimedia Commons Photography

`src/data/images.ts` now carries 51 `NoodleImage` records — one for every dish in `src/data/dishes.ts` — sourced entirely from Wikimedia Commons, the same primary source used elsewhere in the "Let Them Eat" family. Every single record was individually verified before being added: for each dish, the Commons file page was fetched live and read directly (not guessed from a filename or a search snippet) to confirm three things — that the photo actually depicts the named dish accurately (not a lookalike, not a generic bowl of noodles, not an unrelated regional variant sharing a name), the photographer/uploader's name, and the exact license terms shown on that page. No AI-generated imagery, no scraped restaurant/platform photography, and no dish was left with a substitute photo just to fill a slot — the master spec's rule ("prefer honest fallback over an incorrect photo") held throughout this pass; it simply never had to be invoked, because every one of the 51 dishes had a confidently matching, properly licensed Commons photo available.

Noodle-type-level and scene-level photography (`subjectKind: 'noodle-type' | 'scene'`) remains unsourced — this pass focused on dishes per the phase priority, and `getImageFor` / `PhotoFrame` are confirmed (via grep across the codebase) to be the only consumers of `images.ts`, so noodle-type photography can be added later with zero component changes.

## License Breakdown

Of the 51 sourced photos:
- 17 are CC BY 2.0
- 8 are CC BY-SA 2.0
- 8 are CC BY-SA 4.0
- 6 are CC BY-SA 3.0
- 3 are CC BY-SA 2.5
- 3 are CC0 1.0 (boat-noodles, bibim-guksu, kake-soba)
- 3 are public domain (bun-cha, bun-thit-nuong, mee-rebus)
- 2 are CC BY 3.0 (sanuki-udon, hu-tieu)
- 1 is CC BY 4.0 (beef-chow-fun)

All attribution (creator name, source URL, exact license string) is recorded per-record in `src/data/images.ts` and rendered by `PhotoFrame`'s credit pill.

## What's Ready to Receive More Photography

`NoodleImage` requires `creator`, `source` (`wikimedia-commons | unsplash | pexels | other`), `sourceUrl`, and `license`. Adding entries to `src/data/images.ts` lights up real photography with zero component changes — this was proven out across all 51 dishes in this pass without touching `PhotoFrame.tsx`, `getImageFor`, or the `NoodleImage` type.

## Recommended Next Phase

With dish-level photography complete, the next honest gap is noodle-type-level and scene-level imagery (`src/data/noodleTypes.ts`, 25 entries, currently 0 photographed). The same verification discipline used here — fetch the live Commons file page, confirm the photo matches the specific noodle type before adding it, record the real license — should carry forward rather than being relaxed for expediency.

## Family visual refinement pass (2026-08-20)

No new photography sourced this pass — still 51/51 dishes, 0/25 noodle types. Two reuse fixes closed real gaps against existing dish photography:

- **MainPage's "Featured Traditions" section** rendered `noodleTypes.slice(0, 6)` with a guaranteed emoji fallback (0/25 noodle types photographed) — the only place in the app where a broken-feeling fallback was reachable on first load. Replaced with a typographic rail (name + base/form + a link to the full noodle-type index) so the homepage never shows an emoji standing in for photography.
- **Twirl's 6 editorial stories** had zero imagery for 2 of 6 (`why-alkaline-noodles-behave-differently`, `rice-vs-wheat-noodles`) because they only referenced unphotographed `relatedNoodleTypeIds`. Added `relatedDishIds` pointing at the specific photographed dish each story is actually about — Lanzhou lamian (a real hand-pulled, kansui-treated noodle) for the alkaline story, and pho bo + lamian for the rice-vs-wheat pairing — rather than an unrelated stand-in. All 6 Twirl stories now carry real, accurate photography.

Also added a `.photo-medium` CSS tier (16:9, between the small tile and full-bleed hero) and applied it once, to the Hand-Pulled Lab's header (the only lab with a matching photographed dish). The other 7 labs remain text-only — no fabricated imagery.

Genuine remaining gap, unchanged: noodle-type and scene-level photography is still 0/25 and 0 respectively. Workshop labs beyond Hand-Pulled, Troubleshooter, Sommelier, and Curated Kitchen remain intentionally typographic since no licensed asset exists for those specific subjects yet.
