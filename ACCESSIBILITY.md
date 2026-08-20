# Accessibility

Target: WCAG 2.2 AA, built in from Phase 1, not deferred to release QA.

## Implemented

- Skip link (`.skip-link`, targets `#main-content`) in `App.tsx`
- Semantic landmarks: `<header>`/`<nav aria-label="Primary">`/`<main id="main-content">`
- `focus-visible` outline (2px jade) on every interactive element, `outline-offset: 2px`
- `prefers-reduced-motion` block disabling animation/transition duration globally
- All toggle groups (Encyclopedia filters, Sommelier tags/sliders, Lab option pickers, My Noodles save controls) use `role="group"` + `aria-pressed`, not color alone, to indicate state
- `aria-live="polite"` on Sommelier results, Lab selection output, Troubleshooter results, and the filtered Encyclopedia grid
- `NavLink`'s automatic `aria-current="page"` drives the active bottom-tab state, styled with both color and opacity (non-color-only)
- Recipe steps are a real ordered `<ol>` with CSS-counter badges, not visually-numbered `<div>`s
- Range inputs (Sommelier FIND sliders) have associated `<label>` elements and custom-styled thumbs/tracks (no raw browser slider)
- `PhotoFrame` fallback renders `role="img"` with a descriptive `aria-label` even with no image, so screen reader users get the same information sighted users get from the emoji + surrounding heading
- Touch targets: bottom-tab items and chips are ≥44px tall

## Verified This Pass

- **Zero default-blue/purple links**: automated check on the Atlas page found 0/23 rendered links matching browser-default colors (`rgb(0,0,238)` / `rgb(85,26,139)`)
- **Zero console errors** across all 15 routes exercised (Discover, Encyclopedia index, Noodle Type index + detail, Dish detail, Atlas, Workshop, Lab, Troubleshooter, Sommelier, Twirl index + story, My Noodles, Curated Kitchen, 404)
- **Zero horizontal overflow** at 375px, 390px, and 430px viewport widths, checked via `document.documentElement.scrollWidth === clientWidth` (Cookies' verification method, not visual inspection alone)
- Persistence (My Noodles tri-state save) verified end-to-end: toggling a state writes to `localStorage`, `aria-pressed` updates, and the entry appears in the correct My Noodles section on reload

## Not Yet Done

- No screen-reader (VoiceOver/TalkBack) manual pass — only automated/structural checks this pass
- No formal contrast-ratio audit tool run against every token pairing (ratios were calculated and documented in `DESIGN_SYSTEM.md` at token-authoring time, not independently re-verified with a tool)
