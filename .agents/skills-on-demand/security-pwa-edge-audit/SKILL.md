---
name: security-pwa-edge-audit
description: On-demand security audit covering Content Security Policy (CSP), XSS surface, PWA cache integrity, and third-party API exposure.
---

# Security PWA & Edge Audit Skill (On-Demand)

## 1. Trigger & Scope
* **Path:** `.agents/skills-on-demand/security-pwa-edge-audit/SKILL.md`
* **Trigger:** **ON-DEMAND ONLY.** Requires explicit instruction from the user (e.g., "Run a full security audit", "Audit CSP and PWA security").

## 2. Practical Justification
Although SolMeteo has no custom backend, client-side exposure to third-party endpoints (`open-meteo.com`, `ipapi.co`) and service worker offline caching creates vectors for cache poisoning, malicious script injection via search queries, and CSP bypasses.

## 3. Key Deterministic Rules
1. **Input Sanitization & Output Encoding:** Audit all search inputs, geocoding display strings, and error message toasts to guarantee that arbitrary HTML cannot be injected via `innerHTML`.
2. **Strict Origin & Endpoint Validation:** Audit all outgoing `fetch` calls to ensure they target strictly approved HTTPS endpoints (`api.open-meteo.com`, `geocoding-api.open-meteo.com`, `air-quality-api.open-meteo.com`, `ipapi.co`).
3. **PWA Scope & Cache Integrity:** Inspect `sw.js` for cache poisoning vulnerabilities, cross-origin request interception risks, and unauthorized credential exposure.
4. **Content Security Policy (CSP) Compliance:** Ensure `index.html` and `manual.html` maintain headers/meta tags restricting scripts, styles, and fonts to self and declared CDNs without `unsafe-eval`.

## 4. Absolute Prohibitions
* **NUNCA / IT IS STRICTLY FORBIDDEN** to execute an on-demand audit workflow during routine development without explicit user request.
* **É ESTRITAMENTE PROIBIDO** disable or relax CSP headers or allow unencrypted HTTP calls across any part of the application.
