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

### Rule 4: Git Branching & Safe Deployment
* **Never commit new features or breaking changes directly to `main`**.
* Feature work must occur on a dedicated topic branch (e.g., `feat/<name>`), pushed immediately to remote (`git push -u origin <branch>`).
* GitHub Pages publishes exclusively from `main`. Merge to `main` (`git merge --no-ff`) is executed **only upon explicit user authorization**.
* Keep branches active after merge until the user explicitly requests their deletion.

### Rule 5: Quality Assurance & Pre-Flight Verification
* Always execute `node --check script.js` (and `node --check sw.js`) before finalizing changes.
* Verify DOM element IDs referenced in `script.js` exist in `index.html`.
* Maintain CSS design integrity: Ensure glassmorphism, Aurora palettes, light/dark theme contrast, and mobile-first responsiveness (down to 320px).

---

## 3. Absolute Prohibitions (Anti-Patterns)

* **NUNCA / IT IS STRICTLY FORBIDDEN** to introduce build systems, Babel transforms, TypeScript compilation steps, or external package dependencies for the client-side app.
* **NUNCA / IT IS STRICTLY FORBIDDEN** to push or merge to the `main` branch without explicit user approval, as this immediately triggers production GitHub Pages deployment.
* **NUNCA / IT IS STRICTLY FORBIDDEN** to update UI copy or behavior in Portuguese without providing the identical English translation, or vice-versa.
* **NUNCA / IT IS STRICTLY FORBIDDEN** to bypass or suppress mathematical boundaries (e.g., negative POA values, nighttime solar generation, or non-finite irradiance values).
