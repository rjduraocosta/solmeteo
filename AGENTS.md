# AGENTS.md — Agent Governance & Workspace Directives

> **Notice:** This document defines non-negotiable architectural conventions, code quality constraints, business rules, and operating procedures for AI agents and human contributors in this workspace.

---

## 1. Core Architecture Principles

1. **Zero-Dependency Vanilla Stack:**
   * Do NOT introduce npm dependencies, bundlers (Webpack, Vite, Rollup, Parcel), or UI frameworks (React, Vue, Svelte) to the runtime.
   * All application code must execute natively in modern evergreen browsers directly via `<script>` and `<link>` tags.
2. **Deterministic Mathematical Precision:**
   * Solar and PV calculations must strictly follow the isotropic transposition formula and astronomical equations implemented in `script.js`.
   * Never round intermediate astronomical steps (hour angle, solar elevation, solar azimuth, POA irradiance).
   * PV capacities (kWp) support up to 2 decimal places (`0.01` step); Tariffs (€/kWh) support up to 3 decimal places (`0.001` step).
3. **PWA & Offline Resilience:**
   * `sw.js` must maintain an updated cache key when core files (`index.html`, `styles.css`, `script.js`, `manual.html`) undergo functional revisions.
   * `localStorage` interactions must always be safely wrapped in defensive parsing (handle invalid JSON, schema migrations, and private browsing quota errors).

---

## 2. Mandatory Workflow & Governance Rules

At the conclusion of **every iteration, enhancement, or code modification prompt**, the agent MUST strictly execute and verify the following:

### Rule 1: Triad Documentation Maintenance
Always review and update:
* `progress.md`: Mark finished tasks, update the **Version Log**, and establish clear next steps.
* `AGENTS.md`: Update whenever a new business constraint, architectural decision, or prohibition is established.
* `README.md`: Update whenever external APIs, environment expectations, or structural layouts change.

### Rule 2: Strict Bilingual Synchronization (`index.html` & `manual.html`)
* Every new or altered UI element, label, tooltip, or informational message must be translated into both **Portuguese (PT)** and **English (EN)** in `I18N` dictionaries within `script.js`.
* Whenever a feature, calculation, or UI behavior is added or modified, `manual.html` must be updated simultaneously in both PT and EN.
* The translation key count in `manual.html` and `script.js` must maintain 100% key parity between PT and EN.

### Rule 3: Semantic Versioning (`X.Y.Z`) & Artifact Synchronization
Whenever a version bump occurs:
* Update `APP_VERSION` in `script.js`.
* Update `#appVersion` in `index.html`.
* Update `#manualVersion` in `manual.html`.
* Append the release notes to the top of `CHANGELOG.md`.
* Record the release under the **Version Log** in `progress.md`.

### Rule 4: Direct Main Workflow & Continuous Deployment
* All development, enhancements, and bugfixes occur directly on the `main` branch.
* **Do NOT create separate topic or feature branches** (`feat/*`, `fix/*`). Maintain a single, clean `main` branch locally and on remote.
* Because commits to `main` automatically publish to GitHub Pages, all pre-flight quality checks (Rule 5 and Rule 7) and bilingual synchronization (Rule 2 and Rule 6) must strictly pass prior to committing and pushing directly to `main`.

### Rule 5: Quality Assurance & Pre-Flight Verification
* Always execute `node --check script.js` (and `node --check sw.js`) before finalizing changes.
* Verify DOM element IDs referenced in `script.js` exist in `index.html`.
* Maintain CSS design integrity: Ensure glassmorphism, Aurora palettes, light/dark theme contrast, and mobile-first responsiveness (down to 320px).

### Rule 6: Mandatory Manual & Configuration Table Synchronization (Anti-Omission Rule)
* Whenever ANY setting, input parameter, form field, or calculation mode is added, removed, or modified in the application (such as in `#pvConfig` or global preferences), it is **STRICTLY MANDATORY** to immediately update the reference table in Section 5.3 of `manual.html` (and explanatory subsections such as 5.6) simultaneously in both Portuguese and English (`I18N.pt` and `I18N.en`).
* Never merge or present a feature where the user would have to discover UI fields without an explicit, matching row in `manual.html`.
* Maintain 100% translation key parity between `I18N.pt` and `I18N.en` across both `script.js` and `manual.html`.

### Rule 7: Pre-Flight Runtime Execution & Integrity Verification (Anti-Regression Rule)
* Syntax checking (`node --check`) is required but NOT sufficient. Agents MUST execute automated headless Node runtime tests asserting:
  1. All functions invoked across user flows (e.g., `getHourlyTariff`, `simulateBatteryAndConsumption`, `calculateHourlyPoa`, `renderPvWeekly`) are defined and do not throw `ReferenceError`.
  2. Calculation functions return valid non-`NaN` numerical values under standard and edge inputs (0 kWp, simple vs bi-hourly tariffs, zero battery capacity, leap years, DST shifts).
  3. All DOM IDs registered in the `els` object within `script.js` strictly exist in `index.html`.
  4. File modification scripts and regex matches MUST account for CRLF (`\r\n`) and LF (`\n`) to prevent silent replacement failures.

### Rule 8: Critical Setting Discoverability & Direct Access
* High-impact configuration states (e.g. Tariff Mode, Battery Presence, Thermal Model) that alter financial or energy figures MUST be clearly visible on primary cards and provide direct interactive shortcuts (e.g. interactive chip/pill or button) to their respective settings, avoiding hidden menus.


---

## 3. Absolute Prohibitions (Anti-Patterns)

* **NUNCA / IT IS STRICTLY FORBIDDEN** to introduce build systems, Babel transforms, TypeScript compilation steps, or external package dependencies for the client-side app.
* **NUNCA / IT IS STRICTLY FORBIDDEN** to create separate topic or feature branches without explicit user request — all work proceeds directly on `main`.
* **NUNCA / IT IS STRICTLY FORBIDDEN** to commit or push to `main` without running automated pre-flight syntax checks, DOM verification, and headless runtime tests.
* **NUNCA / IT IS STRICTLY FORBIDDEN** to update UI copy or behavior in Portuguese without providing the identical English translation, or vice-versa.
* **NUNCA / IT IS STRICTLY FORBIDDEN** to bypass or suppress mathematical boundaries (e.g., negative POA values, nighttime solar generation, or non-finite irradiance values).
* **NUNCA / IT IS STRICTLY FORBIDDEN** to introduce new configuration inputs or settings without documenting them in the Section 5.3 reference table and relevant subsections of manual.html in both Portuguese and English.
* **NUNCA / IT IS STRICTLY FORBIDDEN** to conclude a task or commit changes without automated headless runtime execution tests confirming that no functions evaluate to undefined and no calculations produce NaN.
