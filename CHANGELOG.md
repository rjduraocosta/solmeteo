# Changelog — SolMeteo

The application version is displayed in the footer of both the app and the manual (**SolMeteo © 2026 · Version X.Y.Z**) and is incremented on every iteration. The top entry always corresponds to the current release.

Current Version: **2.12.0**

Format based on [Semantic Versioning](https://semver.org/):

- **MAJOR** — Structural architectural changes or core application behavioral breaks;
- **MINOR** — New features, modules, or capabilities;
- **PATCH** — Bug fixes, layout adjustments, and precision optimizations.

---

## [2.12.0] — 2026-11-06

### Added
- **Visual Celestial Sun Arc (`#sunArcCard`)**: Dynamic SVG celestial trajectory widget in the Hero card side area.
  - Real-time animated sun orb accurately positioned along the daytime elliptical path according to current time and solar elevation.
  - Progressive golden gradient active path indicating elapsed daylight percentage.
  - Solar noon apex marker with exact astronomical zenith time.
  - Nighttime mode with crescent moon indicator on twilight track and sunrise countdown.
  - Total daylight duration chip (`#heroDaylightVal`) and formatted hemispheric geographic coordinates chip (`#heroCoordsChip`).
  - Modernized Sunrise (🌅) and Sunset (🌇) cards with high-contrast typography and theme adaptation.

---

## [2.11.2] — 2026-11-06

### Improved & Hardened (Mobile, Contrast & PWA Audit)
- **Mobile Viewport Ergonomics (320px–480px)**: Tightened nested container paddings (`.app`, `.panel`, `.pv-config`, `.pv-compass-card`), gaining up to 68px of horizontal layout space on small mobile screens.
- **Fluid Visual Compass**: Added `aspect-ratio: 1 / 1` and `max-width: 100%` to `.pv-compass-svg` with responsive chip sizing for zero-overflow dial interaction across all smartphone form factors.
- **Light Theme WCAG AA Contrast**: Enforced calibrated deeper shades for energy balance metrics and chart highlights (`#047857`, `#0369a1`, `#b45309`, `#be123c`), increasing contrast ratios from ~1.9:1 to >5.0:1.
- **Resilient Storage Layer**: Wrapped all `localStorage` reads, writes, and deletions in defensive helpers (`safeStorageGet`, `safeStorageSet`, `safeStorageRemove`) to eliminate uncaught `SecurityError` exceptions in strict private browsing environments.
- **Responsive Manual Tables**: Added smooth touch horizontal scrolling container (`overflow-x: auto; -webkit-overflow-scrolling: touch`) with minimum readable column widths for the 15-parameter reference table in Section 5.3 of `manual.html`.

---

## [2.11.1] — 2026-11-06

### Fixed & Improved
- **Fixed Interactive Compass Initialization**: Resolved issue where `initPvCompass()` was not invoked during application boot (`init()`), causing tabs, presets, and pointer events to remain unbound.
- **Improved Pointer / Touch Dragging on Dial**: Attached global window pointer listeners during drag to ensure uninterrupted smooth rotation even when dragging outside the dial radius.
- **Solar PV Industry Terminology Alignment**: Renamed orientation tabs from "Painel 1..4" to **"String 1"**, **"String 2"**, **"String 3"**, **"String 4"** per solar PV engineering conventions.

---

## [2.11.0] — 2026-11-06

### Added
- **Interactive Visual Compass & Array Azimuth Alignment (`#pvCompassCard`)**:
  - Integrated an interactive SVG circular compass dial inside the *Painéis Solares & Orientações* configuration section.
  - Added orientation selector tabs for all 4 panel arrays with real-time degree readouts and palette colors (Array 1: Sky, Array 2: Indigo, Array 3: Emerald, Array 4: Rose).
  - Multi-needle visualization: displays active array pointer needle with draggable touch handle, alongside dashed ghost needles for all other configured orientations with active wattage.
  - Direct pointer drag & touch interaction on SVG dial calculating mathematical azimuth angles (0°–360°) via standard arctangent transposition.
  - One-click cardinal preset buttons: **N (0°)**, **NE (45°)**, **E (90°)**, **SE (135°)**, **S (180° ★)**, **SO/SW (225°)**, **O/W (270°)**, **NO/NW (315°)** with visual highlight when active.
  - Highlighted optimal solar azimuth zone (150°–210° South sector) indicating maximum Northern Hemisphere yield.
  - Seamless bidirectional synchronization between numeric input fields and visual compass needle.
  - User manual synchronization in Portuguese and English (Sections 5.2 & 5.3).

---

## [2.10.1] — 2026-11-06

### Changed
- **Removed Health/Medical Advisory & Protection Actions**:
  - Removed medical protection actions (sunscreen, sunglasses, clothing recommendations) and subjective health risk claims from the UV card.
  - Refocused the UV card strictly on objective meteorological information: the standard international WMO UV Index Scale (0–2 Baixo, 3–5 Moderado, 6–7 Elevado, 8–10 Muito Alto, 11+ Extremo), animated position meter pointer, peak UV forecast, and period of highest solar intensity.
  - Streamlined severe weather alert descriptions to convey purely meteorological data without behavioural/medical directives.
  - Updated Section 4.1 in `manual.html` to document the meteorological UV scale in both Portuguese and English.

---

## [2.10.0] — 2026-11-06

### Added
- **UV Index Health Advisory Card (WHO Standards)**:
  - Integrated 5-tier WHO UV risk classification (Baixo 0–2, Moderado 3–5, Elevado 6–7, Muito Alto 8–10, Extremo 11+).
  - Segmented visual risk meter with animated position pointer (`#uvMeterPointer`) reflecting peak daily solar radiation.
  - Calculated peak UV hour and protection window (e.g. UV $\ge 3$) indicating exact hours when sun protection is essential.
  - Actionable health recommendations based on risk tier (UV400 sunglasses, SPF 30+ / 50+ sunscreen, wide-brimmed hats, protective clothing, shade seeking).
- **Severe Weather Warnings Engine**:
  - Continuous automatic detection of high-impact atmospheric hazards from Open-Meteo hourly and daily data:
    - High wind gusts ($\ge 50$ km/h alert, $\ge 70$ km/h danger warning);
    - Heavy/torrential precipitation ($\ge 15$ mm warning, $\ge 30$ mm danger alert);
    - Thunderstorm & hail hazard (WMO codes 95, 96, 99);
    - Extreme heat ($\ge 33$ °C warning, $\ge 38$ °C danger alert);
    - Frost and sub-zero freeze ($\le 0$ °C warning, $\le -4$ °C danger alert).
  - Favorable conditions banner displayed when no severe thresholds are met.
- **Top Navigation Shortcuts & Interactive Scrolling**:
  - Interactive clickable UV stat card in hero (`#statUvBox`) and dynamic hero alert chip (`#heroAlertChip`) with smooth scrolling and highlight pulse animation on `#advisoryUvCard`.
  - Day navigation synchronization: updating health advice and severe alerts dynamically whenever the user selects any day from the 7-day forecast.
- **Documentation & User Manual Synchronization**:
  - Added Section 4.1 (*Saúde Solar & Índice UV*) and Section 4.2 (*Alertas Meteorológicos Severos*) in `manual.html` with 100% bilingual parity (PT/EN).
  - Synchronized Service Worker offline cache to `solmeteo-v2.10.0`.

---

## [2.9.2] — 2026-11-04

### Added
- **Cyclic Steady-State Convergence (Spin-up Loop for BESS)**: Implemented periodic boundary convergence for residential battery simulation based on the HTW Berlin / NREL SAM energy engineering standard. Instead of arbitrarily assuming a fixed cold-start state of charge (e.g. 25%), the model runs a 2-pass warm-up cycle across the forecast days to calculate the natural equilibrium state of charge with which the battery enters midnight of Day 1.
- **Elimination of Artificial Midnight Grid Imports**: High-capacity solar storage setups no longer experience phantom grid imports during early morning hours on sunny days; self-sufficiency and financial metrics now reflect realistic continuous operation.
- **Updated User Manual (Section 5.6)**: Documented the cyclic steady-state spin-up loop in Portuguese and English.

---

## [2.9.1] — 2026-11-04

### Added
- **Direct Tariff Access Chip**: Prominent interactive tariff badge (`#pvTariffChip`) in the solar panel actions bar displaying active tariff configuration (`Tarifa: Simples (0.182 €/kWh)` or `Tarifa: Bi-horária (0.210/0.115 € · Diário/Semanal)`) with one-click direct access that automatically opens, smoothly scrolls to, highlights, and focuses the tariff configuration section.
- **Structured Configuration Categories**: Reorganized the solar setup form (`#pvConfig`) into 4 clear visual semantic sections:
  1. *Painéis Solares & Orientações* (up to 4 orientations);
  2. *Tarifário de Eletricidade & Rede* (Tariff selector, simple/bi-hourly rates, ERSE cycles, feed-in price);
  3. *Bateria & Consumo Residencial* (capacity, DoD reserve limit, household daily load);
  4. *Rendimento & Modelo Térmico* (system efficiency and cell temperature derating model).
- **Comprehensive Bilingual User Manual Synchronization**: Fully updated Section 5.3 reference table in `manual.html` with all 15 configuration parameters and Section 5.6 with official Portuguese ERSE Daily & Weekly cycle schedules, maintaining 100% PT/EN key parity (185 keys).
- **Strict Governance Directives**: Codified Rule 6 (Mandatory Manual & Help Sync for any setting modification), Rule 7 (Automated Headless Runtime Execution Verification), and Rule 8 (Configuration Discoverability & Direct Access) in `AGENTS.md`.

### Fixed
- **Tariff UI Discoverability**: Resolved user confusion regarding tariff selection location by introducing the dedicated `#pvTariffChip` shortcut and categorized section layout.
- **Service Worker Cache Update**: Bumped cache to `solmeteo-v2.9.1` ensuring all browser clients receive updated shell assets.

---

## [2.9.0] — 2026-11-04

### Added
- **Bi-Hourly Electricity Tariff Modeling (ERSE)**: Selectable Flat (24h uniform) or Bi-hourly tariff schemes with support for official Portuguese ERSE **Daily Cycle** (off-peak 22:00–08:00) and **Weekly Cycle** (weekday nights 00:00–07:00, Saturday afternoons/nights, and 24h all-day Sunday off-peak).
- **Hourly Differentiated Economics**: Hourly evaluation applying respective Peak (Day) or Off-Peak (Night) rates to direct self-consumption savings, battery discharge value, and grid import costs.
- **Clarified Energy Balance Metrics**:
  - `AUTOCONSUMO TOTAL`: Explicitly itemizes solar self-consumption and battery discharge contributions (`X.X kWh solar direto + Y.Y kWh bateria · Z% autossuficiente`).
  - `BATERIA (DESCARGA)`: Explicitly itemizes daytime charging energy and final battery state of charge (`Carregou X.X kWh · SoC final: Y%`).
- **Bilingual User Manual Updates**: Documented bi-hourly tariff structures and enhanced dashboard metric clarity in Portuguese and English (`manual.html`).
- **Service Worker Cache Invalidation**: Updated cache identifier to `solmeteo-v2.9.0`.

---

## [2.8.0] — 2026-11-04

### Added
- **Residential Battery Storage & Self-Consumption Simulation**: Comprehensive physical simulation engine modeling solar production, daily household consumption (`dailyKwh`, in kWh/day), direct self-consumption, battery charge/discharge cycles (~92% roundtrip efficiency), grid export, and grid import.
- **Configurable Minimum Battery Reserve (DoD / 0% to 100%)**: Configurable threshold (`pvBattMinSoc`, default 20%) below which battery discharge ceases to protect cell chemistry and preserve emergency backup.
- **Continuous Multi-Day Battery State Chaining**: Continuous state of charge (SoC) modeling across the entire 7-day forecast, carrying over midnight battery charge into the next day without artificial resets.
- **Energy Balance Dashboard Card (`.pv-balance`)**: Displays direct self-consumption (kWh), self-sufficiency rate (%), battery cycle & final SoC (%), grid export revenue (+€), and grid import cost (€).
- **Segmented Energy Partition Bar**: Visual multi-segment progress bar showing the distribution between self-consumed solar, battery storage, and exported energy.
- **Bilingual User Manual Section 5.6**: Fully synchronized guide covering residential self-consumption, daily household consumption, battery sizing, minimum reserve, continuous multi-day cycles, and grid injection economics in Portuguese and English (`manual.html`).
- **Service Worker Cache Busting**: Updated cache identifier to `solmeteo-v2.8.0`.

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
