# Edmonton Multifamily Sales Map
### Greater Edmonton Region — 2016–2026 YTD

Interactive Leaflet map tracking apartment building sales across greater Edmonton (Edmonton proper, St. Albert, Sherwood Park, Leduc, Fort Saskatchewan, Spruce Grove, Stony Plain, and surrounding areas). Built for prospecting and market analysis.

---

## Features

- **Clustered circle markers** colour-coded by price per unit (blue = low, red = high)
- **Refi Window layer** — flags properties with mortgage maturity within ~18 months, useful for identifying motivated sellers
- **Heat map layer** — transaction density overlay
- **Sidebar with filters** — filter by sale date range, refi window, or search by address / buyer / seller / director
- **Fly-to** — click any card in the sidebar to zoom the map to that property

---

## Repo Structure

```
Refi-Map/
├── index.html          # Map UI — all HTML/CSS/JS, loads data from below
├── properties.js       # All sale records as a JS array (allProps)
└── README.md
```

---

## Adding New Transactions

All sale data lives in `properties.js`. Append a new object to the `allProps` array:

```js
{
  address: "10000 155 St",
  saleDate: "Feb 2026", saleDateIso: "2026-02-15",
  salePrice: "$1,800,000", totalUnits: "14", ppu: "$128,571", capRate: "5.5%",
  yearBuilt: "1972",
  buyer: "Buyer Corp.", buyerDir: "Jane Smith",
  seller: "Seller Ltd.", sellerDir: "John Doe",
  refiDate: "Feb 2031", monthsOut: "~60 months",
  isRefi: false,   // set true if mortgage matures within ~18 months
  lat: 53.5410, lng: -113.5890
}
```

Update `DATE_MAX` at the top of `properties.js` if the new record extends the date range.

---

## Refi Window Logic

`isRefi: true` flags a property as being within an approximate 12–18 month refinancing window based on a standard 5-year mortgage term from sale date. This is manually set at the time of data entry. Re-evaluate and update `isRefi` values periodically as time passes.

---

## Running Locally

Open `index.html` directly in a browser **or** serve with any static server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

> Note: The map depends on CDN-hosted libraries (Leaflet, D3, MarkerCluster, etc.) and requires an internet connection to render correctly.

---

## Coordinates

Coordinates (lat/lng) are WGS84. The map auto-fits to the bounds of all loaded properties on load. Use Google Maps or the City of Edmonton's SLIM Maps to look up coordinates for new properties.

---

## Dependencies (all CDN, no install required)

| Library | Version | Purpose |
|---|---|---|
| Leaflet | 1.9.3 | Base map |
| Leaflet.markercluster | 1.1.0 | Marker clustering |
| Leaflet.awesome-markers | 2.0.2 | Refi pin icons |
| Leaflet.heat | latest | Heat map layer |
| D3 | 3.5.5 | PPU colour scale |
| DM Sans | — | Typography |

---

*Source: Gettel. Internal use only.*
