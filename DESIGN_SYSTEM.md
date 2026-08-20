# Design System

## The Identity Check (done before writing component CSS)

Per the family's hardest-won lesson (documented in Let Them Eat Cookies' `DESIGN_SYSTEM.md`, which required three ground-up palette passes after "internally coherent" was repeatedly mistaken for "correct identity"): before any component was styled, the palette direction was checked against the identity question directly — does this read as sophisticated, global, editorial, premium, and photographic, and specifically *not* brown-dominated, not dark-heavy, not red-and-gold "takeout menu," not database/dashboard-like? The palette below was chosen to avoid both failure modes named in the master spec, not adjusted after the fact.

## Palette (`src/index.css`, plain CSS custom properties, no Tailwind)

| Token | Light | Role |
|---|---|---|
| `--ivory` | `#f7f2e7` | Rice-paper background |
| `--ink` | `#1c211d` | Primary text / dark mode background |
| `--jade` | `#2f6f62` | Primary accent — links, active states, primary buttons |
| `--lacquer` | `#a5342f` | Restrained secondary accent — eyebrows, small badges, spice tags |
| `--brass` / `--brass-strong` | `#b08d4f` / `#7c5f2e` | Decorative / small-text-safe champagne accent |
| `--bg-ceramic` | `#eee6d5` | Warm neutral for alternating sections and photo fallback |

All text-role tokens are contrast-checked against their background (`--jade` on `--ivory` ≈ 5.4:1, `--lacquer` ≈ 5.1:1, `--brass-strong` ≈ 4.7:1). Full `@media (prefers-color-scheme: dark)` palette defined alongside light, not bolted on later.

Typography: Fraunces (editorial serif, Google Fonts) for headings, `system-ui` stack for body — same "editorial serif + clean body" family principle as Cookies' Playfair Display, different actual typeface, since the family principle is the structure, not the specific font.

## The Cookies Lessons, Applied Directly

1. **Global link reset written first, before any component existed to accidentally rely on browser defaults.** `a { color: var(--jade-strong); text-decoration: none }` plus a pinned `a:visited` rule is in `src/index.css` from the first commit. Verified with an automated check (0/23 links on a sampled page matched browser-default blue/purple, see `ACCESSIBILITY.md`).
2. **One `index.css` file, not split per component**, specifically so a cross-cutting audit (like the one that caught Cookies' dead CSS block) stays possible.
3. **Photo-bleed hero** (negative margin against the page gutter + `overflow-x: hidden` on `body`) and **gradient-scrim tiles** are built into the base component set (`.hero-bleed`, `.tile__scrim`) from Phase 1, not retrofitted — these were Cookies' single highest-leverage "editorial vs. boxed-website" fixes.
4. **No default form control styling**: range inputs, buttons, and inputs are reset in the same first CSS pass (`src/index.css`), not left to browser defaults and patched later.

## What Wasn't Reused Verbatim

The specific hue family (celadon jade / lacquer red / brushed brass vs. Cookies' raspberry/plum/champagne) is Noodles' own — the family pattern is "one bg, one ink, one strong accent, one secondary accent," not a shared literal palette.
