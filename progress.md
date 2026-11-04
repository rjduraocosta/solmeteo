# SolMeteo — Project Progress & Governance Log

## Current Status
* **Application:** SolMeteo (Solar & Meteorological Forecast PWA)
* **Architecture:** Static single-page application (Vanilla JS, CSS3, HTML5) with zero dependencies.
* **Data Sources:** Open-Meteo APIs (Forecast, Geocoding, Air Quality) + IP geolocation fallback.
* **Current Version:** `2.5.3` (Governance & Agent Skills Setup in progress on `feat/governance-and-skills-setup`)
* **Live Deployment:** GitHub Pages (`https://rjduraocosta.github.io/solmeteo/`) from `main` branch.

---

## ⚠️ Mandatory Governance Rules (Non-Negotiable)

1. **Triad Documentation Updates:** At the end of every task or iteration altering code or architecture, review and update:
   - `progress.md` (in English): Track completed tasks, update the **Version Log**, and outline next steps.
   - `AGENTS.md` (in English): Update whenever new business logic, constraints, or conventions are established.
   - `README.md` (in English): Update when dependencies, architecture, or environment configurations change.
2. **Strict Bilingual Synchronization (`manual.html` & `script.js`):**
   - The interactive visual manual (`manual.html`) must be kept in exact parity with application functionality.
   - All changes must be fully reflected in both **Portuguese (PT)** and **English (EN)** with 100% key parity across `I18N` dictionaries.
3. **Pre-flight QA & Static Checks:**
   - Always run `node --check script.js` and `node --check sw.js`.
   - Verify DOM element IDs and ensure no uncaught exceptions in UI render flow.
4. **Semantic Versioning & Multi-file Synchronization:**
   - Every version increment must be simultaneously recorded in `script.js` (`APP_VERSION`), `index.html` (`#appVersion`), `manual.html` (`#manualVersion`), `CHANGELOG.md` (top entry), and `progress.md` (Version Log).
5. **Git Branching & Release Pipeline (No Direct Main Deploys):**
   - Pull `main` before starting: `git pull origin main`.
   - Create a dedicated feature branch: `git checkout -b <branch-name>` and immediately publish remotely: `git push -u origin <branch-name>`.
   - Never push directly to `main`; GitHub Pages deploys automatically on `main` push.
   - Merge into `main` (`git merge --no-ff <branch-name>`) ONLY when explicitly instructed by the user.
   - Keep the feature branch active post-merge unless explicitly requested to prune.

---

## Version Log

| Version | Milestone Date | Summary of Changes |
| :--- | :--- | :--- |
| **v2.5.3** | 2026-09-24 | Device-specific PWA installation guide (Android, iOS Safari, Desktop) in bilingual manual. |
| **v2.5.2** | 2026-09-24 | Resolved remaining "Sky Cast" logo references, exported CSV prefix, and slug naming. |
| **v2.5.1** | 2026-09-24 | Cache busting for PWA service worker (`solmeteo-v2`) to prevent stale shell caching. |
| **v2.5.0** | 2026-09-24 | Commercial rebrand from SkyCast to **SolMeteo**; GitHub repository and Pages alignment. |
| **v2.4.10**| 2026-09-24 | Cleaned redundant 24h/00h boundary axis label while keeping the rightmost grid line. |
| **v2.4.9** | 2026-09-24 | Full-day 24-slot timeline alignment with terminal 00h vertical boundary guide. |
| **v2.4.8** | 2026-09-24 | Fixed 2-hour interval grid lines (0, 2, ..., 22h) aligning SVG guides with data points. |
| **v2.4.4** | 2026-09-24 | Percentage-based absolute positioning for chart axis labels matching SVG guidelines. |
| **v2.4.1** | 2026-09-24 | Added `kWh` unit labels to weekly solar forecast bar summits. |
| **v2.4.0** | 2026-09-24 | Daily total solar yields displayed above each bar in the 7-day forecast widget. |
| **v2.3.1** | 2026-09-24 | Flexbox wrapping fix for solar panel header chips on mobile viewports. |
| **v2.3.0** | 2026-09-24 | Major feature release: reverse geocoding, 20-min TTL cache, °C/°F, themes, recents, EAQI, weekly PV. |
| **v2.2.1** | 2026-09-24 | Critical fix for variable shadowing `t()` in `renderHourly`; kWp decimal formatter. |
| **v2.2.0** | 2026-09-24 | Synchronized app versioning in footer and manual; added `CHANGELOG.md`. |
| **v2.1.0** | 2026-09-24 | Full bilingual internationalization (PT/EN) across application and user manual. |
| **v2.0.0** | 2026-09-24 | Multi-orientation PV array engine (up to 4 groups), thermal derating (NOCT 45°C), interactive manual. |
| **v1.0.0** | 2026-09-24 | Initial production release with core Open-Meteo weather and single-orientation PV modeling. |
| **v0.1.0** | 2026-09-24 | Initial scaffolding, data model architecture, and project setup. |

---

## Tasks & Progress Tracking

### ✅ Completed Tasks
- [x] Static SPA infrastructure (`index.html`, `styles.css`, `script.js`, `manual.html`, `sw.js`).
- [x] Open-Meteo integration (Forecast, Geocoding, Air Quality EAQI).
- [x] Zero-dependency responsive SVG data visualization (Hourly Temp, Solar Irradiance, Rain, PV yields).
- [x] Multi-array solar calculation engine with astronomical position and POA transposition.
- [x] Thermal derating calculation based on ambient temperature and NOCT formula.
- [x] Bilingual engine (PT/EN) with persistent language state.
- [x] PWA offline caching strategy and web app manifest.
- [x] Dedicated topic branch workflow and GitHub Pages production separation.
- [x] Triad governance files created: `README.md` (EN), `AGENTS.md` (EN), `progress.md` (EN).
- [x] Dynamic Workspace Skills definitions structured under `.agents/skills/` and `.agents/skills-on-demand/`.

### ⏳ Pending & Upcoming Tasks
- [ ] Implement and verify workspace skill definitions (`.agents/skills/` and `.agents/skills-on-demand/`).
- [ ] User-driven enhancement implementation on feature branch.
- [ ] Cross-browser regression and mobile rendering audit.
- [ ] Optional: Wind speed unit toggle (km/h vs mph).
- [ ] Optional: Automated `prefers-color-scheme` detection on first visit.

---

## Active Skills & Tooling Configuration

* **Core Skills (`.agents/skills/`):**
  1. `solmeteo-solar-pv-engine` (Custom Domain Rule: Solar physics, transposition, multi-group array math)
  2. `web-standards-vanilla-core` (Zero-build, Vanilla ES6+, CSS3 Aurora, DOM optimization)
  3. `svg-dataviz-charts` (Custom SVG chart building, dynamic scales, axis guides, ARIA accessibility)
  4. `bilingual-i18n-sync` (PT/EN dictionary key parity and manual synchronization)
  5. `pwa-offline-storage` (Service worker lifecycle, cache invalidation, defensive `localStorage`)
  6. `dom-harness-testing` (Static `node --check` syntax validation and simulated DOM regression tests)

* **On-Demand Skills (`.agents/skills-on-demand/`):**
  1. `security-pwa-edge-audit` (Explicit order: Client-side XSS, CSP headers, cache poisoning, CORS)
  2. `performance-lighthouse-audit` (Explicit order: SVG repaint profiles, memory leak checks, CWV optimization)
