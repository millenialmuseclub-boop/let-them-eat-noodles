# LET THEM EAT NOODLES — MASTER SPEC

Status: Phase 2 (content saturation) implemented and QA'd, building on the Phase 1 foundation (commit `441881a`). This document describes the actual current state, not aspirational scope. Phase 3 (deeper regional saturation toward the family's ~60-dish ceiling, real photography sourcing, Apple release resources) has **not** been started.

## Product Thesis

Let Them Eat Noodles is a global noodle encyclopedia, cultural atlas, kitchen studio, pairing/discovery guide, recipe collection, and personal noodle companion. It explores how noodles are made, shaped, pulled, rolled, cut, stretched, cooked, served, seasoned, and eaten across cultures.

It is NOT Ramen 2, a restaurant database, a recipe dump, a generic Asian-food app, a takeout finder, a social network, or a review platform.

## Scope Boundaries

- **Ramen**: Let Them Eat Ramen remains the deep specialist app for Japanese ramen. Noodles covers non-ramen Japanese traditions (udon, soba, somen, yakisoba, hoto) and does not duplicate Ramen's encyclopedia.
- **Pasta**: Italian pasta is explicitly out of scope, reserved for a future Let Them Eat Pasta.

## Critical Domain Rule

NOODLE TYPE ≠ NOODLE DISH. A noodle type (e.g. bánh phở, rice vermicelli) is the physical product — base, form, technique. A dish (e.g. phở bò) is what's actually eaten, and references a noodle type rather than re-describing it. Multiple dishes across different cuisines can share, or closely relate to, the same noodle type — this is modeled explicitly (see `NOODLE_DOMAIN_MODEL.md`), not duplicated.

## Information Architecture (locked)

```
DISCOVER → WORKSHOP → SOMMELIER (FIND) → TWIRL → MY NOODLES
```

"Twirl" was evaluated against alternatives during Phase 0 and kept — it reads as noodle-specific, editorial, and not database-like, matching Cake's "Pastry Notebook" / Ramen's "Slurp" naming pattern. My Noodles is reached via the top-nav icon, not a 5th bottom tab, following Cookies' explicit Phase-1-locked decision to keep the bottom tab bar to 4 items.

## Implemented Systems (Phase 1 + Phase 2)

- App shell, routing (React Router v7, route-level `React.lazy` code splitting from the start), design tokens, typography, mobile-first responsive system, accessibility baseline
- Domain types and canonical data: **51 dishes, 25 noodle types**, 8 techniques, 2 regions, 8 countries, 26 places, **51 complete structured recipes**
- Encyclopedia (browse by region, preparation style, noodle type, and a real A–Z letter filter added in Phase 2)
- Atlas (global, list-first Region → Country → Place → Dish, now spanning 26 places; real map layer still not built — see gaps)
- Workshop (8 labs across Understand/Foundations/Form/Bowl groups, **16-problem** Troubleshooter, up from 11)
- Sommelier FIND (deterministic weighted scoring, no CREATE/PAIR)
- Twirl (6 original editorial stories, 6-term vocabulary — unchanged in Phase 2, flagged as a gap below)
- My Noodles (tri-state local library: want-to-try / tried / favorite, localStorage-backed)
- Curated Kitchen (**47 products** reused from the family affiliate master — the original 24 plus 23 more bowls/tableware/broth-tool items pulled in during Phase 2 — zero new links sourced)
- Photography architecture (fully built; **0/51 dishes photographed** — still an honest, deliberate gap, see `PHOTOGRAPHY.md`)

## Explicitly Not Built This Pass

Per the master brief: no push past ~51 dishes toward the family's ~60-dish ceiling this pass, no Sommelier CREATE, no Pasta coverage, no accounts/social/UGC/restaurant features/subscriptions/commerce backend/affiliate API/cross-app framework, no Apple certificates or App Store Connect resources, no real photography sourcing (architecture only).

## Documents in This Set

`README.md`, `NOODLE_DOMAIN_MODEL.md`, `FAMILY_ARCHITECTURE_REFERENCE.md`, `DESIGN_SYSTEM.md`, `CONTENT_PLAN.md`, `PHOTOGRAPHY.md`, `ACCESSIBILITY.md`, `COMMERCE_PLAN.md`, `NOODLES_COMMERCE_GAP_ANALYSIS.md`, `NATIVE_SETUP.md`.
