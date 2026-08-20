# Store Screenshot Plan

## Pipeline

`scripts/capture-screenshots.mjs` — deterministic Puppeteer capture against the production `vite preview` server (not a browser-extension screenshot save, per the Cookies lesson). Seeds `localStorage` for My Noodles with four sample entries and drives the Sommelier FIND slider before capturing, so no screenshot shows an empty or loading state. Real canonical content and real Wikimedia Commons photography throughout — nothing staged or faked.

**Real defect caught and fixed during this pass**: the first capture run pointed at a hardcoded `http://localhost:4173`, but that port was already occupied by an unrelated sibling project (`Rex - Living Screen`) running on this machine, so Vite's preview server silently fell back to port 4174 while the screenshot script kept hitting 4173. All 16 initial screenshots were of the wrong application entirely. Caught by inspecting file sizes (all 16 were byte-identical within each device group — a strong signal of a single repeated frame) and confirmed by opening one directly. Fixed by adding a `SCREENSHOT_BASE_URL` override and verifying the target port serves `<title>Let Them Eat Noodles</title>` before capturing. Recaptured set has varying, content-appropriate file sizes per surface. This is exactly the class of bug the deterministic-pipeline + QA-verification approach exists to catch.

## Devices & Dimensions

| Device class | Viewport (CSS px) | Scale | Output (px) | App Store size class |
|---|---|---|---|---|
| iPhone | 428×926 | 3x | 1284×2778 | 6.5"/6.7" iPhone display set |
| iPad | 1024×1366 | 2x | 2048×2732 | 12.9" iPad Pro display set |

## Surfaces Captured (8 per device, 16 total)

1. **Main** (`/`) — Discover hero with real Noodle-of-the-Day photography, Encyclopedia preview grid, Sommelier/Twirl entry cards
2. **Encyclopedia** (`/encyclopedia`) — the full 51-dish browsable grid with region/A–Z/preparation filters
3. **Dish Detail + Recipe** (`/encyclopedia/pho-bo`) — hero photo, cultural context, flavor profile, and the structured recipe below
4. **Atlas** (`/atlas`) — global Region → Country → Place → Dish browsing structure
5. **Workshop** (`/workshop`) — the Lab groups and Troubleshooter entry point
6. **Sommelier FIND** (`/sommelier`) — sliders moved and a real match result showing, with photography and match reasoning
7. **Twirl** (`/twirl`) — editorial story list and vocabulary
8. **My Noodles** (`/my-noodles`) — seeded with 4 sample entries across Want to Try / Tried / Favorites so the personal-library feeling is visible, not an empty state

## Recommended Final Store Order

1. Main (establishes "world of noodles" identity immediately)
2. Encyclopedia (breadth — 51 dishes)
3. Dish Detail + Recipe (depth — real recipe, not just a photo)
4. Sommelier FIND (the app's most interactive, differentiated feature)
5. Atlas (global geographic story)
6. Workshop (cooking-studio value)
7. Twirl (cultural/editorial dimension)
8. My Noodles (personal-library payoff, last since it's the most "after you've used the app" surface)

## QA Performed

- File existence: all 16 files present (`ls app-store-assets`, 16 entries)
- Dimensions: verified via the capture script's own logged output against each device's expected exact pixel size — 1284×2778 (iPhone) / 2048×2732 (iPad) for every file, matching Apple's accepted display-size screenshot dimensions
- No blank captures: the wrong-port defect above was caught by exactly this check (identical byte sizes flagged the failure); recaptured set has content-appropriate, varying file sizes per surface
- Visual spot-check: representative iPhone and iPad screenshots opened and reviewed directly — no clipping, no dev tools/scrollbars/browser chrome (Puppeteer captures the viewport only, no browser UI), real photography loads and displays correctly, no console errors during capture
