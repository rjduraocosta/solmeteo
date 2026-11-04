---
name: svg-dataviz-charts
description: Guidelines for generating mathematical, accessible, and responsive SVG charts for temperature, solar irradiance, rain, and PV yield.
---

# SVG Data Visualization & Charts Skill

## 1. Trigger & Scope
* **Path:** `.agents/skills/svg-dataviz-charts/SKILL.md`
* **Trigger:** Activates whenever chart rendering functions (`buildTempChart`, `buildSolarChart`, `buildRainChart`, `buildPvChart`, `axisLabels`) or their CSS styling are modified.

## 2. Practical Justification
All data visualization in SolMeteo is rendered using native vector SVGs without external charting libraries. Edge-clipping bugs, misaligned time axis guides, or missing ARIA descriptions degrade the primary visualization experience.

## 3. Key Deterministic Rules
1. **Coordinate & Padding Discipline:** Maintain strict padding (`padX: 16px`, `padY`) within SVG viewBox definitions (`0 0 600 H`) so that peak points, halos ($r=9$), and value labels never clip the viewport boundaries.
2. **Axis Guide Synchronization:** Ensure the 12 two-hour intervals ($0, 2, \dots, 22\text{h}$) and the 24-slot domain match the percentage-based absolute positioning in `.chart__axis`.
3. **Adaptive Label Anchoring:** Dynamically set `text-anchor="start"` near the left margin and `text-anchor="end"` near the right margin to prevent text overflow.
4. **Accessible Semantics:** Every generated SVG element must include `role="img"` and an informative, localized `aria-label` generated via the `t()` internationalization helper.

## 4. Absolute Prohibitions
* **NUNCA / IT IS STRICTLY FORBIDDEN** to introduce heavy external charting libraries (such as Chart.js, D3, or Highcharts).
* **É ESTRITAMENTE PROIBIDO** hardcode fixed pixel widths on SVG chart roots; SVGs must adapt dynamically via `viewBox` and CSS `width: 100%`.

