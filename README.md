# Let Them Eat Noodles

A global noodle encyclopedia, cultural atlas, kitchen studio, pairing guide, recipe collection, and personal noodle companion — the fourth app in the Let Them Eat family (after Cake, Ramen, and Cookies).

## Stack

React 19 + TypeScript + Vite 8 + React Router 7 + Capacitor 8 (iOS/Android scaffolding). No Tailwind — plain CSS custom properties, matching the family convention. `legacy-peer-deps=true` in `.npmrc` (needed for `react-simple-maps`' React 16/17/18 peer range, same as Ramen).

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint      # oxlint
node scripts/check-data-integrity.mjs   # duplicate-id / orphan-reference check
```

## Project Structure

```
src/
  types/       domain types (noodle.ts is the core relationship model)
  data/        canonical data — dishes, noodleTypes, geo, techniques, recipes, workshop, twirl, products, hubs
  lib/         data lookups, Sommelier scoring, My Noodles store, document-title hook
  components/  shared UI (nav, tiles, photo fallback, flavor bars, curated kitchen)
  pages/       one component per route, lazy-loaded
```

## Documentation

Start with `LET_THEM_EAT_NOODLES_MASTER_SPEC.md`. See also `NOODLE_DOMAIN_MODEL.md`, `DESIGN_SYSTEM.md`, `CONTENT_PLAN.md`, `PHOTOGRAPHY.md`, `ACCESSIBILITY.md`, `COMMERCE_PLAN.md`, `NOODLES_COMMERCE_GAP_ANALYSIS.md`, `FAMILY_ARCHITECTURE_REFERENCE.md`, `NATIVE_SETUP.md`.

## Status

Phase 2 (content saturation + recovery/completion pass) complete, building on the Phase 1 foundation: **51 canonical dishes**, **25 noodle types**, **51 structured recipes** (100% coverage), **51/51 dishes photographed** with verified, individually-checked Wikimedia Commons imagery (see `PHOTOGRAPHY.md` for the full license breakdown), **16-problem Troubleshooter**, **47 reused affiliate products**, zero data-integrity issues (`node scripts/check-data-integrity.mjs`). A real visual bug was found and fixed this pass: the shared `.tile` card component rendered as an inline element (not blockified) outside a CSS Grid context, causing its absolutely-positioned photo-caption text to overflow to full size instead of staying contained — this broke the Sommelier FIND results list specifically; fixed at the component level (`display: block`) plus a targeted refactor of that one usage. The hero photo scrim was also strengthened to stay legible against real photography of varying brightness, not just the flat gradient it was originally tuned against. Not yet started: pushing further toward the family's ~60-dish ceiling, noodle-type/scene-level photography, Sommelier CREATE/PAIR, Apple release resources.
