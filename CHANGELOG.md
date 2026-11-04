# Changelog — SolMeteo

The application version is displayed in the footer of both the app and the manual (**SolMeteo © 2026 · Version X.Y.Z**) and is incremented on every iteration. The top entry always corresponds to the current release.

Current Version: **2.7.0**

Format based on [Semantic Versioning](https://semver.org/):

- **MAJOR** — Structural architectural changes or core application behavioral breaks;
- **MINOR** — New features, modules, or capabilities;
- **PATCH** — Bug fixes, layout adjustments, and precision optimizations.

---

## [2.7.0] — 2026-11-04

### Added
- **Instantaneous Peak Power Curve (kW)**: Added continuous cubic Bézier power curve superimposed on the solar production chart with automated peak point annotation (halo, ring, and kW value).
- **Solar Visualization Switcher (Both / kWh / kW)**: Added compact view mode controls (`.pv-view-switch`) allowing users to toggle between energy accumulation bars (kWh), continuous power generation curve (kW), or a combined overlay view. State persists in `localStorage["skycast:pv_view"]`.
- **Peak Power Metric in Solar Header**: Integrated `#pvPeakPower` pill badge in the chart header indicating maximum instantaneous power (kW) and timestamp of the peak.
- **Individual Array Peak Power**: Extended multi-array mini-charts to display each orientation's individual peak power in kW alongside its daily kWh total.
- **Bilingual User Manual Section 5.5**: Documented power curves, inverter clipping prevention, and multi-orientation generation profiles in both Portuguese and English (`manual.html`).
- **Service Worker Cache Invalidation**: Incremented cache identifier to `solmeteo-v2.7.0`.

---

## [2.6.0] — 2026-11-04

### Added
- **System Theme Auto-Detection (`prefers-color-scheme`)**: SolMeteo now automatically matches the operating system's dark or light appearance on initial load and listens dynamically to system preference changes. The manual toggle button remains available and persists user overrides in `localStorage`.
- **Wind Speed Unit Switcher (km/h ↔ mph)**: Added dedicated unit selector in the top bar and made the hero wind stat card interactive (`tabindex="0"`, click/enter/space to toggle). State is saved under `skycast:wind_unit`.
- **Bilingual Documentation & Parity**: Synchronized user manual in both Portuguese and English (`manual.html`), adding guidance on auto-theme detection and dual unit controls.
- **Service Worker Cache Busting**: Updated cache identifier to `solmeteo-v2.6.0` to force immediate app shell update.

---

## [2.5.3] — 2026-09-24

### Changed
- **Manual: Device-Specific PWA Installation Guide (PT/EN)**: Clarified installation steps across Android, Desktop, and iOS — **Android/Desktop (Chrome/Edge)**: Browser menu → "Install application"; **iPhone/iPad (Safari)**: Share sheet → "Add to Home Screen" (automatic prompt unavailable). Maintained offline usage instructions. Added bilingual i18n keys `m.s7g.a`, `m.s7g.i`, and `m.s7g.o`.

---

## [2.5.2] — 2026-09-24

### Fixed
- **Header Logo Legacy Text ("Sky Cast")**: The logo in the top-left was structured as `Sky<span>Cast</span>` (duo-tone style), escaping earlier automated string replacements. Updated to `Sol<span>Meteo</span>` preserving identical CSS styling. Renamed exported CSV file prefix (`skycast_…` → `solmeteo_…`) and default city slug. Internal storage keys (`skycast:*`) remain unchanged to preserve existing user preferences.

---

## [2.5.1] — 2026-09-24

### Fixed
- **Stale PWA Service Worker Cache ("skycast-v1")**: The service worker retained the original `CACHE_NAME`, serving static assets with a **cache-first** strategy that caused browsers to serve outdated shells. Incremented cache key to **`solmeteo-v2`**: older caches are deleted during the `activate` event and the app shell is refreshed.

---

## [2.5.0] — 2026-09-24

### Changed
- **Application Rebranding: SkyCast → SolMeteo**: Prevented namespace collisions with existing store apps. Updated all brand touchpoints — `<title>`, `app.title` headers (PT/EN), PWA manifest (`name`/`short_name`), footers, manual copy, and internal documentation (`CHANGELOG.md`, `progress.md`). Publication repository aligned to `https://github.com/rjduraocosta/solmeteo`, hosted on GitHub Pages at `https://rjduraocosta.github.io/solmeteo/`.

---

## [2.4.10] — 2026-09-24

### Fixed
- **Redundant End-of-Day Boundary Label Cleaned Up**: Kept the **vertical boundary guideline** at the far right of all 4 charts while eliminating the duplicate `00h`/`24h` text label. The axis label cadence remains clean ($0, 2, \dots, 22\text{h}$) with the 13th line acting as the terminal day boundary.

---

## [2.4.9] — 2026-09-24

### Improved
- **Full-Day 24-Hour Timeline with End-of-Day Guideline (00h)**: Added a **13th vertical guideline at the right edge** indicating 00h of the next day, completing the 24-slot timeline into 12 equal 2-hour spans across solar, temperature, precipitation, and PV charts.

---

## [2.4.8] — 2026-09-24

### Fixed
- **Removed 23h Axis Label in Favor of Regular 2-Hour Grid**: Removed the 23h tick to maintain clean, equidistant 2-hour interval markers ($0, 2, \dots, 22\text{h}$) without cramped visual spacing near the right chart boundary.

---

## [2.4.7] — 2026-09-24

### Fixed
- **Uniform 24-Slot Guideline Spacing with Visible 23h Guide**: Standardized all 4 charts on a **uniform 24-slot domain** ($h/24$) with 13 equidistant vertical guidelines ($0, 2, 4, \dots, 22, 23\text{h}$). Simplified `axisLabels(times, w, pad)` and mapped line series points to fractional day slots.

---

## [2.4.6] — 2026-09-24

### Fixed
- **Uneven Spacing and Label Overlap at 22h/23h**: Kept the 23h guideline as the day boundary while reverting text labels to even hours ($0, 2, \dots, 22\text{h}$), eliminating overlapping text on small screens.

---

## [2.4.5] — 2026-09-24

### Fixed
- **Missing 23h Terminal Marker on Hourly Charts**: Extended guidelines and labels from 22h to include the **23h** boundary across solar, temperature, rain, and PV charts.

---

## [2.4.4] — 2026-09-24

### Fixed
- **Hourly Chart Axis Label Misalignment with SVG Guidelines**: Replaced `justify-content: space-between` with percentage-based absolute positioning (`left: gx/W %`) matching internal SVG chart padding (`padX`), ensuring labels align with vertical grid lines.

---

## [2.4.3] — 2026-09-24

### Fixed
- **Temperature Peak Halo Clipping at Viewport Edges**: Increased horizontal chart padding `padX` from 6px to 16px in `buildTempChart`, preventing the point glow halo ($r=9$) and text labels from clipping the SVG `viewBox`.

---

## [2.4.2] — 2026-09-24

### Fixed
- **Temperature Peak/Min Label Clipping**: Implemented dynamic text anchoring (`text-anchor="start"` near the left margin and `"end"` near the right margin) so peak and minimum temperature values stay inside the SVG canvas.

---

## [2.4.1] — 2026-09-24

### Fixed
- **Explicit kWh Unit on Weekly PV Bar Headers**: Added explicit unit labels above each weekly bar (e.g., `2.0 kWh` instead of `2.0`), matching the degrees symbol used on temperature widgets.

---

## [2.4.0] — 2026-09-24

### Improved
- **Daily PV Yield Above Weekly Bars**: Each of the 7 weekly forecast bars displays its daily yield in kWh above the column, with the total weekly yield in the header. Updated bilingual manual (`m.s7f.p`).

---

## [2.3.1] — 2026-09-24

### Fixed
- **Solar Panel Action Chips Viewport Overflow**: Enabled flex wrapping (`flex-wrap: wrap`) on `.panel__head` to keep "Configure system" and "Export CSV" buttons inside the card container on narrow mobile viewports.

---

## [2.3.0] — 2026-09-24

### Added
- **Accurate Reverse Geocoding**: Geolocation pin button now calls Open-Meteo `/v1/reverse` endpoint to retrieve exact municipality and administrative area names.
- **20-Minute Weather Cache**: Implemented in-memory/localStorage caching with 20-minute TTL (`skycast:wc`) to minimize redundant network traffic.
- **Temperature Units Toggle (°C / °F)**: Instant conversion across hero card, apparent temp, min/max, 24h timeline, 7-day forecast, and SVG charts.
- **Light & Dark Theme Switcher**: Toggle with persistence and dynamic `<meta name="theme-color">` updates.
- **Recent Locations Bar**: Quick-access chip list of the last 6 visited cities with the current city highlighted.
- **Fast Day Navigation**: Previous/Next arrows (‹ / ›) in the hourly header with boundary disabling.
- **European Air Quality Index (EAQI)**: Real-time AQI badge fetched from `air-quality-api.open-meteo.com`.
- **7-Day Weekly Solar Forecast Widget**: Interactive bar chart displaying daily generation and weekly total savings.
- **CSV Data Export**: One-click download of hourly solar irradiance, temperatures, rain, and per-array yields.
- **Installable PWA**: Offline app shell caching via `sw.js`.

### Fixed
- **Version Alignment**: Consolidated version numbering to **2.3.0** across `script.js`, `manual.html`, and documentation.

---

## [2.2.2] — 2026-09-24

### Improved
- **Economic Summary Highlight (PT/EN)**: Restored green bold visual emphasis for total `kWh` and estimated savings in `€` within the solar header using `innerHTML` with `<strong>`.

---

## [2.2.1] — 2026-09-24

### Fixed
- **Critical Initialization Crash**: Resolved variable shadowing in `renderHourly` where `const t = new Date(time)` shadowed the global translation helper `t()`, causing a `TypeError` and hiding all panels on day 0.
- **kWp Precision Formatter**: New `fmtDec()` helper formats capacities with up to 2 decimal places, trimming trailing zeros (e.g., `5`, `5.5`, `5.55`).

---

## [2.2.0] — 2026-09-23

### Added
- Application version displayed in app and manual footers.
- Initialized `CHANGELOG.md` for historical release tracking.

### Improved
- Stabilized manual header into two fixed rows to eliminate text wrapping discrepancies between Portuguese and English.

---

## [2.1.0] — 2026-09-23

- Added "Back to App" navigation link in `manual.html` header.
- Prevented layout shifting during language toggling in the manual header.

---

## [2.0.0] — 2026-09-22

### Added
- **Full Bilingual Internationalization (PT/EN)**: Shared language state via `localStorage["skycast:lang"]`.
- Complete localization for WMO weather codes, compass bearings (O ↔ W), hourly labels, charts, and PV configuration.
- Default locale set to Portuguese.

---

## [1.5.0] — 2026-09-21

- Created interactive bilingual manual (`manual.html`) featuring native SVG infographics for weather instruments, solar geometry, and array tilt.
- Added topbar navigation shortcut to user manual.

---

## [1.4.0] — 2026-09-20

- Interactive 7-day forecast cards: clicking any forecast day recalculates and renders hourly weather and solar projections for that date.

---

## [1.3.0] — 2026-09-19

- **Multi-Array Photovoltaic Support**: Configure up to 4 independent solar strings (capacity, tilt, azimuth).
- **Thermal Derating Modeling**: Toggle between fixed system efficiency and real-time cell temperature derating based on ambient temperature and NOCT formula.
- Added 3-decimal precision for tariffs and 2-decimal precision for kWp.

---

## [1.2.0] — 2026-09-18

- Estimated solar photovoltaic production panel with customizable kWp, tilt, azimuth, system efficiency, and energy tariffs.
- Hourly generation and economic savings projections.

---

## [1.1.0] — 2026-09-17

- Responsive native SVG charts for solar shortwave radiation, precipitation, and hourly temperature.

---

## [1.0.0] — 2026-09-16

- Initial production release with core Open-Meteo weather integration, geolocation, and current conditions.
