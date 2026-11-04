# Refi Map: Filter and Interaction Breakdown

Purpose: hand this to another context window so it can map each feature to a new dataset (supply map) and decide what is usable.

## Stack
- Single `index.html` (about 1,870 lines), no build step. Leaflet 1.x, D3 v3 (color scale), SheetJS (xlsx export), Leaflet marker cluster and heat layers.
- Data: `properties.js` defines `allProps` (array of flat objects), `DATE_MIN`, `DATE_MAX`. 1,239 records, 2016-2026, Edmonton region.
- Every control calls `renderList()`, which re-filters `allProps` from scratch with chained `.filter()` calls, sorts, stores `filteredProps`, then redraws list, map markers, stats and trends. Filters are AND-combined.
- Ingest: `excel_to_properties.ipynb` converts an Excel export into `properties.js`.

## Source record schema (observed fill rates, n = 1,239)
Values are mostly **formatted strings**, parsed at filter time.

| Field | Example | Filled | Notes |
|---|---|---|---|
| address | "2510 104 St" | 100% | |
| saleDate / saleDateIso | "Jan 2016" / "2016-01-04" | 100% | ISO drives all date logic |
| salePrice | "$1,500,000" | 100% | parsed by stripping `$,` |
| totalUnits | "125" | 66% | "0" for land |
| ppu | "$1,020,408/Acre" | 100% | scale differs for land vs building |
| ppuMeasure | Suite / Acre / Sq Ft / Unit | 99% | |
| capRate | "5.5%" | 100% | "0.0%" means missing |
| yearBuilt | "2015" | 66% | blank for land |
| buyer, buyerDir | entity, director | 100%, 91% | |
| seller, sellerDir | entity, director | 100%, 80% | |
| refiDate, monthsOut | "Jan 2021", "Past due" or "14 mo" | 100% | assumes 5-yr mortgage from sale |
| lat, lng | WGS84 | 100% | required for polygon and map |
| landUse | "RA7", "DC1" | 100% | zoning |
| propType | Building / Land | 100% | |
| description | Walk-up, Row House, High-Rise | 66% | building subtype |
| subdivision | neighbourhood | 99% | |
| siteArea, siteUnits | 1.47, "Acres" | 99% | Sq Ft auto-converted to acres |
| propId | "30640" | 100% | |
| city | Edmonton, St. Albert | 100% | |
| legalDesc | "Pt A,B/3627ET" | 100% | |

## Filters

### Geographic
| Filter | How it works | Fields needed | Portability |
|---|---|---|---|
| **Polygon draw** | Custom Leaflet tool. Click vertices, double-click to close. Ray-casting point-in-polygon on `lat/lng`. Escape cancels, X clears. | lat, lng | Fully portable. Extracted to `draw-filter.js`. |
| **Rectangle draw** | Drag a box, uses `layer.getBounds().contains()`. | lat, lng | Fully portable. Same file. |

Only the single latest shape is kept. Rows with no coordinates are excluded while a shape is active.

### Range filters (min/max inputs, blank means no filter)
| Filter | Field | Parsing | Gotcha |
|---|---|---|---|
| Sale date range | saleDateIso | string compare on ISO | Defaults set from data min/max on load |
| Year built range | yearBuilt | parseInt | Missing parses to 0, so a "from" filter drops unknowns |
| Sale price | salePrice | strip `$,` | |
| Total units | totalUnits | parseInt | Land is 0 |
| Site area (acres) | siteArea + siteUnits | Sq Ft divided by 43,560 | Records with no area are excluded when filter is set |
| Cap rate | capRate | strip `%` | Missing is 0.0, so a min filter drops them |

### Categorical multi-select (searchable checklist with Select All)
Generic engine driven by `MS_FIELDS` and `msState` (a `Set` per key). Adding a new field is about 5 lines of config plus one HTML block. Options come from the distinct values in the dataset. Empty selection means no filter.
| Filter | Field |
|---|---|
| Zoning / Land Use | landUse |
| Description (building type) | description |
| Subdivision | subdivision |
| City | city |

### Toggles and checklists
| Filter | Field | Notes |
|---|---|---|
| Property type (All, Building, Land) | propType | Case-insensitive match |
| Unit price basis (Suite, Acre, Sq Ft, Unit) | ppuMeasure | Hardcoded list in `PPU_MEASURES` |
| Layer: All Sales vs Refi Window | monthsOut | Refi-specific, see below |

### Text filters (case-insensitive substring)
| Filter | Fields searched |
|---|---|
| Global search | address, buyer, seller, buyerDir, sellerDir, subdivision, landUse, description, propType, propId, city, legalDesc |
| Buyer | buyer, buyerDir |
| Seller | seller, sellerDir |
| Buyer + Seller together | Matches either direction (buyer and seller swapped), to find a specific trade |
| Legal description | legalDesc |

### Time controls
| Control | How it works |
|---|---|
| Year slider | Filters to one sale year (`saleDateIso` first 4 chars). Range auto-set from data. |
| Play button | Steps through years every 900 ms, re-rendering each step. |

### Other interactions
- **Sort** (14 options): date, year built, price, PPU, cap, units, area, each asc and desc.
- **Players tab:** buyer and seller leaderboards. Clicking a name fills the buyer or seller filter.
- **Trends tab:** SVG charts of volume, average PPU and count by year, computed from the currently filtered set.
- **Excel export:** exports `filteredProps`.
- **Map layers:** clustered markers, heatmap (transaction density), refi layer. Markers are colored by PPU (blue to red, land grey).
- **Reset all** clears every control.

## Refi-specific (probably drop for a supply map)
- `REFI_WINDOWS`: 0-6, 7-12, 13-18, 19-24 month buckets with colors, derived from `monthsOut`.
- `refiDate`, `monthsOut`, `isRefi` fields and the refi marker layer.
- Replace with a delivery or completion window if your supply data has expected completion dates. The bucket logic (`refiWindow()`) transfers directly.

## Usability checklist for a supply dataset
For each feature, check that the field exists and is populated.

- **Polygon and rectangle:** need numeric `lat`/`lng` on every row. Geocode first if you only have addresses.
- **Multi-selects:** need a categorical column. Good candidates are zoning, neighbourhood, building type, status (proposed, under construction, complete) and developer.
- **Range filters:** map to unit count, storeys, GFA, site area, year built, expected completion date. Cap rate and sale price likely do not apply.
- **Date filter and year slider:** need an ISO date. Use completion, permit or start date. The Play feature suits a supply-delivery timeline.
- **Buyer and seller:** rename to Developer or Owner. The either-direction match is probably not needed.
- **Players tab:** reuse as a developer leaderboard if you have a developer column.
- **Trends tab:** swap volume and PPU for units delivered and project count per year.
- **PPU color scale and unit price basis:** only if you have a price metric. Otherwise color by status or unit count.

## Known issues in the source map
1. ~~`resetAll()` referenced an undeclared `drawnItems` and threw a ReferenceError.~~ Fixed: it now calls `clearDraw()`, so Reset all also clears the drawn shape and resets the type toggle. (Not yet verified in a browser.)
2. Numbers are stored as formatted strings and re-parsed on every render. Fine at 1,239 rows. For a larger supply dataset, store numeric fields at ingest.
3. Missing values (cap rate 0.0, yearBuilt 0) are treated as 0, so range filters silently exclude them. Decide how unknowns should behave in the new tool.
4. Multi-select option lists are rebuilt from the full dataset, not the currently filtered rows, so counts and options do not cascade.
