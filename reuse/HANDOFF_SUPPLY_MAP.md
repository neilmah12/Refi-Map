# Handoff: evaluate Refi Map features for my Supply Map

Paste this whole file into the other Claude session.

## Context
I built an Edmonton multifamily sales map (the "Refi Map") and want to borrow its best features for a new multifamily **supply map**. Your job: audit my supply dataset against the Refi Map's feature set and tell me what is usable, what needs data prep, and what to skip. Then help me build the usable parts.

## Reference material (GitHub: neilmah12/Refi-Map)
Branch `claude/wonderful-pasteur-x9dnac` (PR #3 into main). Read these first if you have repo access, otherwise I will paste them:
- `reuse/FILTER_BREAKDOWN.md`: every filter, the data schema with fill rates, refi-specific parts, known issues.
- `reuse/draw-filter.js`: standalone Leaflet rectangle and polygon draw filter. API: `createDrawFilter(map, { onChange })`, then `drawFilter.contains(lat, lng)`.
- `reuse/draw-filter-demo.html`: working demo.
- `index.html` (lines about 440-720 for the sidebar UI, 1200-1360 for `renderList()`, 1465-1610 for multi-select logic).

## Architecture to mirror
- Single `index.html`, no build step. Leaflet, D3 v3, SheetJS for xlsx export.
- Data is a flat array `allProps` in `properties.js`, generated from Excel by a Colab notebook.
- One `renderList()` function re-filters the full array on every control change (AND logic), then sorts and redraws list, map markers, stats and trend charts.

## Features to evaluate (in my priority order)
1. **Polygon and rectangle draw filter.** Needs numeric `lat` and `lng` on every row. My top priority.
2. **Multi-select searchable checklists** (generic engine: `MS_FIELDS` plus a `Set` per field, with Select All). Candidates: zoning, neighbourhood, building type, project status, developer.
3. **Range filters** (min/max, blank means off): units, storeys, site area, year built, GFA, completion date. Note: unknowns are parsed as 0 and silently dropped, so I must decide how to treat missing values.
4. **Date range plus year slider with Play** (steps through years every 900 ms). Candidate date: expected completion, permit or start date.
5. **Text filters:** global search across many fields, plus owner/developer search (Refi Map has buyer/seller with either-direction matching, probably not needed).
6. **Players tab** (leaderboards, click a name to filter). Candidate: developer or owner leaderboard.
7. **Trends tab** (SVG charts by year of volume, average PPU, count). Candidate: units delivered and project count per year.
8. **Refi window buckets** (0-6, 7-12, 13-18, 19-24 months, color-coded). Candidate: delivery-window buckets from expected completion date.
9. **Marker styling and layers:** clustering, heatmap, color by a metric. Candidate: color by status or unit count.
10. **Sort (asc/desc) and Excel export** of the filtered set.

## Source schema (Refi Map), for field mapping
address, saleDate, saleDateIso, salePrice, totalUnits, ppu, ppuMeasure, capRate, yearBuilt, buyer, buyerDir, seller, sellerDir, refiDate, monthsOut, isRefi, lat, lng, landUse, propType, description, subdivision, siteArea, siteUnits, propId, city, legalDesc. Values are mostly formatted strings ("$1,500,000", "5.5%") parsed at filter time. For a larger supply dataset, store numerics at ingest.

## What I need from you
1. Inspect my supply dataset (I will upload it) and list its columns with fill rates and data types.
2. Produce a **feature fit table**: for each feature above, mark Usable now / Needs prep / Not applicable, name the column that maps to it, and give a one-line reason.
3. Flag data prep needed: geocoding missing lat/lng, parsing dates, normalising categories, handling unknowns.
4. Recommend the build order, starting with the polygon filter and the multi-selects.
5. Then implement the usable features in my supply map, reusing `draw-filter.js` as is.

## Known pitfalls from the Refi Map
- A stale `drawnItems` reference in `resetAll()` threw an error (fixed in PR #3). Call `clearDraw()` on reset, and clear the shape in any "Reset all".
- Playwright's synthetic double-click does not fire a native `dblclick` in headless Chromium, so test polygon close by dispatching a `dblclick` event directly.
- Multi-select options are built from the full dataset, not the filtered rows, so options do not cascade. Decide whether you want cascading counts.
- Esri Light Gray Canvas is the basemap (free, keyless). CARTO now needs a key and raw OSM tiles can be blocked by Referer policy.

## Style
Concise and direct. No em dashes. I work in Edmonton (CoStar, SLIM Maps, Excel, Python/Colab), so Edmonton-specific data sources and zoning codes (RA7, RM, DC1, etc.) are familiar to me.
