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

Start with `LET_THEM_EAT_NOODLES_MASTER_SPEC.md`. See also `NOODLE_DOMAIN_MODEL.md`, `DESIGN_SYSTEM.md`, `CONTENT_PLAN.md`, `PHOTOGRAPHY.md`, `ACCESSIBILITY.md`, `COMMERCE_PLAN.md`, `NOODLES_COMMERCE_GAP_ANALYSIS.md`, `FAMILY_ARCHITECTURE_REFERENCE.md`, `NATIVE_SETUP.md`, `APP_STORE_METADATA.md`, `APP_REVIEW_NOTES.md`, `GOOGLE_PLAY_METADATA.md`, `STORE_SCREENSHOT_PLAN.md`.

## Native

`ios/` and `android/` platform projects are generated and synced (`npx cap sync`) to the current build, with real app icon/splash artwork wired into both. See `NATIVE_SETUP.md` for exactly what's release-ready versus what still needs Apple Developer / Play signing resources the user hasn't provided yet.

## Status

Release-readiness pass complete, building on Phase 1 (`441881a`) and Phase 2 (`d336b73`, `be04a64`): **51 canonical dishes**, **25 noodle types**, **51 structured recipes** (100% coverage), **51/51 dishes photographed** with verified, individually-checked Wikimedia Commons imagery, **16-problem Troubleshooter**, **47 reused affiliate products**, zero data-integrity issues (`node scripts/check-data-integrity.mjs`). Both native platforms are generated, synced, and carry real icon/splash artwork (no default Capacitor placeholder left behind). App Store and Google Play metadata drafted; 16 deterministic Puppeteer screenshots captured (iPhone 1284×2778, iPad 2048×2732) and QA'd. Not yet started: pushing further toward the family's ~60-dish ceiling, noodle-type/scene-level photography, Sommelier CREATE/PAIR, and the Apple Developer account resources / Android signing keystore that block an actual store submission (see `NATIVE_SETUP.md`).
