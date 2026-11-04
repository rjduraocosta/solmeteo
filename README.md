# SolMeteo — Solar & Weather Forecast Application

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status: Production](https://img.shields.io/badge/Status-Active-emerald.svg)](https://github.com/rjduraocosta/solmeteo)
[![Version](https://img.shields.io/badge/Version-2.7.0-blue)](CHANGELOG.md)

SolMeteo is a commercial-grade, zero-dependency Progressive Web Application (PWA) delivering real-time weather forecasts and precision solar photovoltaic (PV) yield estimations. It operates entirely client-side, integrating directly with Open-Meteo open APIs without requiring API keys or proprietary backend services.

---

## 1. Architecture & Technology Stack

* **Core Runtime:** Pure Vanilla JavaScript (ES6+), modern CSS3 with Aurora/Glassmorphic aesthetics, semantic HTML5.
* **No Build Tooling:** Native web modules and standards; instant loading with zero bundler overhead.
* **Data Providers:**
  * Open-Meteo Weather Forecast API (`api.open-meteo.com/v1/forecast`)
  * Open-Meteo Geocoding & Reverse Geocoding API (`geocoding-api.open-meteo.com/v1/`)
  * Open-Meteo Air Quality API (`air-quality-api.open-meteo.com/v1/air-quality`)
  * Client IP Fallback (`ipapi.co/json/`)
* **Storage & Caching:**
  * Browser `localStorage` for user preferences, PV configuration, and recent search history.
  * In-memory / localStorage 20-minute TTL response cache (`skycast:wc`).
  * CacheStorage API via Service Worker (`sw.js`) for full offline app-shell resilience.
* **Bilingual Support (i18n):** Native Portuguese (PT) and English (EN) dictionary engine with synchronous toggle in both the main app and interactive user manual (`manual.html`).

---

## 2. Solar Photovoltaic (PV) Calculation Engine

SolMeteo implements a rigorous astronomical and physical transposition model:

1. **Astronomical Solar Position:** Computes solar elevation ($\alpha$) and azimuth ($\gamma_s$) for any coordinate, day of year, and hour using the Equation of Time (EoT) and solar hour angle.
2. **Plane of Array (POA) Transposition:** Converts Global Horizontal Irradiance (GHI), Direct Normal Irradiance (DNI), and Diffuse Horizontal Irradiance (DHI) to total irradiance on the tilted collector surface based on customizable panel tilt ($\beta$) and surface azimuth ($\gamma$).
3. **Multi-Array Support:** Accommodates up to 4 distinct PV array strings with individual capacities (kWp), tilt angles, and azimuth orientations.
4. **Thermal Derating Model:** Real-time cell temperature estimation ($T_{\text{cell}} = T_{\text{amb}} + 25 \times \frac{\text{POA}}{800}$) with $-0.4\%/\text{°C}$ temperature loss coefficient relative to STC ($25\text{°C}$).
5. **Economic Return:** Hourly and 7-day cumulative yield estimation coupled with user-configured energy tariffs (€/kWh with 3-decimal precision).

---

## 3. Directory Layout

```
.
├── .agents/
│   ├── skills/                     # Active Core Skills for development
│   └── skills-on-demand/           # On-demand audit & deep testing skills
├── CHANGELOG.md                    # SemVer release history
├── AGENTS.md                       # Workspace governance & agent guardrails
├── progress.md                     # Iteration task log and roadmap (in English)
├── README.md                       # Project overview and technical specifications
├── index.html                      # Single-page application entry point
├── styles.css                      # Design tokens, Aurora themes, and layouts
├── script.js                       # Weather data pipeline, PV math, charts & DOM
├── manual.html                     # Bilingual user manual with SVG infographics
├── sw.js                           # Progressive Web App service worker
├── manifest.webmanifest            # Web application manifest
├── icon-192.svg                    # Vector icon 192x192
└── icon-512.svg                    # Vector icon 512x512
```

---

## 4. Local Development & Testing

Since SolMeteo uses web standards without a build step, any static HTTP server can run the application:

```bash
# Using Python 3:
python -m http.server 8080

# Using Node.js:
npx serve .
```

### Static Syntax & Integrity Checks
```bash
# Check JavaScript syntax
node --check script.js
node --check sw.js
```

---

## 5. CI/CD & Deployment Workflow

1. **Feature Branches:** All ongoing tasks, enhancements, and fixes must be developed on a dedicated feature branch created from an up-to-date `main`:
   ```bash
   git checkout -b feat/<topic>
   git push -u origin feat/<topic>
   ```
2. **Verification Prior to Merge:** Validate syntax (`node --check script.js`), inspect DOM IDs, and verify bilingual dictionary key parity before requesting approval.
3. **Production Merge (GitHub Pages):** GitHub Pages automatically deploys from the `main` branch. Merges to `main` occur only when explicitly authorized:
   ```bash
   git checkout main
   git merge --no-ff feat/<topic>
   git push origin main
   ```

---

## 6. Versioning & Governance

This project adheres strictly to **Semantic Versioning (`X.Y.Z`)**:
* **`X` (Major):** Architectural restructuring, data schema breaking changes.
* **`Y` (Minor):** New features, panels, calculation modes, or UI capabilities.
* **`Z` (Patch):** Bug fixes, visual polish, precision adjustments, or refactoring.

At every release, the version identifier must be synchronized across:
* `script.js` (`APP_VERSION`)
* `index.html` (Footer `#appVersion`)
* `manual.html` (Footer `#manualVersion`)
* `CHANGELOG.md` (Top-level entry)
* `progress.md` (Version Log)

