---
name: performance-lighthouse-audit
description: On-demand deep performance audit covering SVG rendering bottlenecks, memory leaks, paint cycles, and Core Web Vitals.
---

# Performance & Lighthouse Audit Skill (On-Demand)

## 1. Trigger & Scope
* **Path:** `.agents/skills-on-demand/performance-lighthouse-audit/SKILL.md`
* **Trigger:** **ON-DEMAND ONLY.** Requires explicit instruction from the user (e.g., "Run performance audit", "Analyze rendering bottlenecks", "Check Lighthouse score").

## 2. Practical Justification
Rendering 4 distinct SVG charts with 24 data points, multiple gradients, and hover tooltips on mobile devices can cause layout thrashing, excessive paint cycles, or memory consumption if nodes are repeatedly created without proper cleanup.

## 3. Key Deterministic Rules
1. **Layout Thrashing & Batch DOM Updates:** Audit DOM rendering functions to ensure read/write operations on layout properties (`offsetWidth`, `getBoundingClientRect`) are not interleaved in loops.
2. **SVG Node Recycling & Paint Optimization:** Inspect SVG string generation and CSS transitions to verify vector paths utilize hardware acceleration where applicable and avoid unnecessary DOM repaints.
3. **Memory Profile Verification:** Check that repeated day navigation (e.g., cycling between 7 forecast days) does not cause detached DOM nodes or memory accumulation in listener closures.
4. **Core Web Vitals Thresholds:** Enforce sub-second Largest Contentful Paint (LCP < 1.2s), zero Cumulative Layout Shift (CLS < 0.05), and First Input Delay under 50ms.

## 4. Absolute Prohibitions
* **NUNCA / IT IS STRICTLY FORBIDDEN** to execute this audit or bloat routine tasks with memory profiling unless explicitly triggered by the user.
* **É ESTRITAMENTE PROIBIDO** optimize performance by degrading the mathematical resolution or sampling interval of the solar forecast charts.
