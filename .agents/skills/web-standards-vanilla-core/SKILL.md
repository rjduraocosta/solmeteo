---
name: web-standards-vanilla-core
description: Enforcement of zero-dependency Vanilla JavaScript, semantic HTML5, and Aurora/glassmorphism CSS standards.
---

# Web Standards Vanilla Core Skill

## 1. Trigger & Scope
* **Path:** `.agents/skills/web-standards-vanilla-core/SKILL.md`
* **Trigger:** Activates during any refactoring, feature addition, or styling change affecting `index.html`, `styles.css`, or DOM manipulation in `script.js`.

## 2. Practical Justification
The application's core strength is zero build steps, instant load performance, and absence of external bundle vulnerabilities. Regressions that introduce bundler requirements, framework syntax, or unvalidated CSS overrides break the browser-native architecture.

## 3. Key Deterministic Rules
1. **Direct DOM & Event Binding:** Use native DOM APIs (`document.getElementById`, `addEventListener`, `hidden` attribute) without abstraction layers; always respect the global `[hidden]{display:none!important}` rule.
2. **Aurora Glassmorphism Consistency:** Maintain CSS variable tokens (`--bg`, `--card`, `--glass`, `--accent`) and fluid layout structures using Flexbox and CSS Grid with `min-width: 0` on flex items to prevent overflow.
3. **Responsive Breakpoint Hygiene:** All layouts must render cleanly across mobile (320px–480px), tablet (768px), and desktop (1024px+) viewports without horizontal scrollbars.
4. **Resilient Local State:** Wrap all `localStorage` access in defensive `try/catch` blocks to protect against private browsing limitations or quota exceedances.

## 4. Absolute Prohibitions
* **NUNCA / IT IS STRICTLY FORBIDDEN** to introduce npm packages, client-side build tools (Webpack/Vite), JSX, or framework runtime libraries.
* **É ESTRITAMENTE PROIBIDO** use `innerHTML` with unsanitized user or network inputs that could introduce cross-site scripting vulnerabilities.

