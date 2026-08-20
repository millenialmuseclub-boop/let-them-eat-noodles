# LET THEM EAT NOODLES — MASTER SPEC

Status: Phase 1 foundation implemented and QA'd. This document describes the actual current state, not aspirational scope. See `CONTENT_PLAN.md` for the Phase 2 saturation plan (60-dish target), which has **not** been started.

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

## Implemented Phase 1 Systems

- App shell, routing (React Router v7, route-level `React.lazy` code splitting from the start), design tokens, typography, mobile-first responsive system, accessibility baseline
- Domain types and canonical data: 16 dishes, 14 noodle types, 8 techniques, 2 regions, 8 countries, 16 places, 16 complete structured recipes
- Encyclopedia (browse by region, preparation style, noodle type, A–Z via alphabetical sort)
- Atlas (global, list-first Region → Country → Place → Dish, no map yet — see gaps)
- Workshop (7 labs across Understand/Foundations/Form/Bowl groups, 11-problem Troubleshooter)
- Sommelier FIND (deterministic weighted scoring, no CREATE/PAIR)
- Twirl (6 original editorial stories, 6-term vocabulary)
- My Noodles (tri-state local library: want-to-try / tried / favorite, localStorage-backed)
- Curated Kitchen (24 products reused from the family affiliate master, zero new links sourced)
- Photography architecture (fully built; 0/16 dishes actually photographed — see `PHOTOGRAPHY.md`)

## Explicitly Not Built This Pass

Per the master brief: no 50–60 dish saturation, no Sommelier CREATE, no Pasta coverage, no accounts/social/UGC/restaurant features/subscriptions/commerce backend/affiliate API/cross-app framework, no Apple certificates or App Store Connect resources.

## Documents in This Set

`README.md`, `NOODLE_DOMAIN_MODEL.md`, `FAMILY_ARCHITECTURE_REFERENCE.md`, `DESIGN_SYSTEM.md`, `CONTENT_PLAN.md`, `PHOTOGRAPHY.md`, `ACCESSIBILITY.md`, `COMMERCE_PLAN.md`, `NOODLES_COMMERCE_GAP_ANALYSIS.md`, `NATIVE_SETUP.md`.
