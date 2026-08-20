# Noodle Domain Model

## The Core Relationship

```
NOODLE TYPE → NOODLE DISH → TECHNIQUE → PLACE → RECIPE
```

A **NoodleType** (`src/types/noodle.ts`) is the physical product: base (wheat/rice/buckwheat/starch/egg-wheat), form (strand/ribbon/vermicelli/sheet/hand-torn/extruded), and the technique(s) used to make it. A **NoodleDish** is what's actually eaten — it references a `noodleTypeId` rather than re-describing the noodle, and carries its own place, cultural/historical context, flavor profile, and recipe.

This prevents the mistake the master spec calls out explicitly: modeling every entry as simply "a noodle." Example proven in Phase 1 data: **Rice Vermicelli** (`rice-vermicelli`) is referenced by three separate dishes — Bún Chả (Vietnam), Pancit Bihon (Philippines), and Mohinga (Myanmar) — each with its own local name, place, and dish identity, related but not duplicated. `NoodleType.localNames[]` carries each culture's own name for closely-related noodle products, and `originNote` uses deliberately non-absolutist language ("associated with," not "invented by") for exactly this reason.

## Entities

| Entity | File | Count in Phase 1 |
|---|---|---|
| `NoodleType` | `src/data/noodleTypes.ts` | 14 |
| `NoodleDish` | `src/data/dishes.ts` | 16 |
| `Technique` | `src/data/techniques.ts` | 7 (`stir-fried` handled as a Workshop lab, not a `Technique` record, since it's a cooking method rather than a noodle-forming technique) |
| `Region` / `Country` / `Place` | `src/data/geo.ts` | 2 / 8 / 16 |
| `Recipe` | `src/data/recipes.ts` | 16 (1:1 with dishes) |

## Completeness Rule

Every seeded `NoodleDish` in Phase 1 has: canonical id, name, local name/romanization where applicable, place (region→country→city), noodle-type relationship, preparation style, primary technique(s), cultural context, historical context (with careful, hedged origin language), flavor profile (5 dimensions), flavor tags, broth/sauce relationship, related dishes, a 1:1 structured recipe, and source metadata. Verified by `scripts/check-data-integrity.mjs` — no orphan noodle types, no dangling `relatedDishIds`, no dish without a recipe or vice versa.

## What's Deliberately Not Modeled Yet

- A `NoodleImage` record for every dish (see `PHOTOGRAPHY.md` — architecture exists, content doesn't)
- Sommelier `CREATE`/`PAIR` fields
- Restaurant/place-level granularity beyond one representative city or province per dish
