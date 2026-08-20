# Noodle Domain Model

## The Core Relationship

```
NOODLE TYPE → NOODLE DISH → TECHNIQUE → PLACE → RECIPE
```

A **NoodleType** (`src/types/noodle.ts`) is the physical product: base (wheat/rice/buckwheat/starch/egg-wheat), form (strand/ribbon/vermicelli/sheet/hand-torn/extruded), and the technique(s) used to make it. A **NoodleDish** is what's actually eaten — it references a `noodleTypeId` rather than re-describing the noodle, and carries its own place, cultural/historical context, flavor profile, and recipe.

This prevents the mistake the master spec calls out explicitly: modeling every entry as simply "a noodle." Example proven in Phase 1 data: **Rice Vermicelli** (`rice-vermicelli`) is referenced by three separate dishes — Bún Chả (Vietnam), Pancit Bihon (Philippines), and Mohinga (Myanmar) — each with its own local name, place, and dish identity, related but not duplicated. `NoodleType.localNames[]` carries each culture's own name for closely-related noodle products, and `originNote` uses deliberately non-absolutist language ("associated with," not "invented by") for exactly this reason.

## Entities

| Entity | File | Count (Phase 2) |
|---|---|---|
| `NoodleType` | `src/data/noodleTypes.ts` | 25 (14 from Phase 1 + 11 added in Phase 2) |
| `NoodleDish` | `src/data/dishes.ts` | 51 (16 from Phase 1 + 35 added in Phase 2) |
| `Technique` | `src/data/techniques.ts` | 7 (`stir-fried` handled as a Workshop lab, not a `Technique` record, since it's a cooking method rather than a noodle-forming technique) |
| `Region` / `Country` / `Place` | `src/data/geo.ts` | 2 / 8 / 26 |
| `Recipe` | `src/data/recipes.ts` | 51 (1:1 with dishes) |

## New Type-Sharing Examples Proven in Phase 2

Phase 2 substantially strengthened the core relationship model with more real cross-cultural reuse: **Cantonese Egg Noodle** is now shared by Chow Mein, Wonton Noodles, and Pancit Canton (China/Hong Kong and the Philippines); **Shahe Fen** is shared by Beef Chow Fun and Char Kway Teow (China/Hong Kong and Malaysia, the same wide rice noodle format under different regional names); **Laksa Noodle** is shared by Curry Laksa and Assam Laksa; **Somen** is shared across Japan's Somen and Korea's Bibim Guksu, Janchi Guksu, and Kongguksu (a closely related but independently developed product, documented with careful non-identical-origin language). **Rice Vermicelli** now connects five dishes across four countries (Bún Chả, Mohinga, Pancit Bihon from Phase 1, plus Bún Thịt Nướng and Pancit Palabok added in Phase 2).

## Completeness Rule

Every dish in the current 51-dish catalog has: canonical id, name, local name/romanization where applicable, place (region→country→city), noodle-type relationship, preparation style, primary technique(s), cultural context, historical context (with careful, hedged origin language — Phase 2 introduced phrases like "a common preparation," "widely told," "generally credited" for dishes with contested or legend-based histories, e.g. Crossing-the-Bridge Noodles), flavor profile (5 dimensions), flavor tags, broth/sauce relationship, related dishes, a 1:1 structured recipe, and source metadata. Verified by `scripts/check-data-integrity.mjs` — no orphan noodle types, no dangling `relatedDishIds`, no dish without a recipe or vice versa. Re-run after Phase 2: 51/51 dishes, 25/25 noodle types, 51/51 recipes, zero duplicates, zero orphans.

## What's Deliberately Not Modeled Yet

- A `NoodleImage` record for every dish (see `PHOTOGRAPHY.md` — architecture exists, content doesn't)
- Sommelier `CREATE`/`PAIR` fields
- Restaurant/place-level granularity beyond one representative city or province per dish
