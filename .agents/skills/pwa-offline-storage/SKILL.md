---
name: pwa-offline-storage
description: Management of Progressive Web App offline caching lifecycle, service worker cache bursting, and local storage state.
---

# PWA Offline & Storage Skill

## 1. Trigger & Scope
* **Path:** `.agents/skills/pwa-offline-storage/SKILL.md`
* **Trigger:** Activates whenever `sw.js`, `manifest.webmanifest`, or client-side caching mechanisms in `script.js` are altered.

## 2. Practical Justification
Stale service worker caches can permanently prevent users from receiving application updates. Improper storage handling can corrupt PV configurations, recent city histories, or offline cache states.

## 3. Key Deterministic Rules
1. **Cache Busting Strategy:** Increment `CACHE_NAME` (e.g., `solmeteo-v2`) in `sw.js` whenever structural updates to `index.html`, `styles.css`, or `script.js` occur.
2. **Cache Eviction in Activate:** Ensure the service worker `activate` event handler actively deletes obsolete caches matching older identifiers.
3. **Weather TTL Validation:** Maintain the 20-minute expiration window (`20 * 60 * 1000 ms`) for cached weather forecasts (`skycast:wc`) to avoid serving outdated atmospheric data.
4. **App Shell Pre-caching:** Guarantee all essential static assets (`./`, `index.html`, `styles.css`, `script.js`, `manual.html`, `manifest.webmanifest`, icons) are pre-cached in the `install` phase.

## 4. Absolute Prohibitions
* **NUNCA / IT IS STRICTLY FORBIDDEN** to cache dynamic Open-Meteo API requests inside the service worker cache without TTL checks.
* **É ESTRITAMENTE PROIBIDO** unregister or bypass service worker registration without a documented fallback mechanism.

