---
name: dom-harness-testing
description: Pre-flight syntax validation, DOM ID integrity verification, and hermetic headless regression testing.
---

# DOM Harness & Static Verification Skill

## 1. Trigger & Scope
* **Path:** `.agents/skills/dom-harness-testing/SKILL.md`
* **Trigger:** Activates before finalizing any code change, committing to Git, or closing an iteration prompt.

## 2. Practical Justification
Because the project does not use a bundler or TypeScript compiler, silent syntax errors or mismatched DOM IDs (`TypeError: Cannot read properties of null`) can break the entire initialization pipeline in production.

## 3. Key Deterministic Rules
1. **Mandatory Syntax Verification:** Always execute `node --check script.js` and `node --check sw.js` prior to finishing any task.
2. **DOM ID Concordance:** Verify that every ID registered in the `els` object within `script.js` has a corresponding element in `index.html`.
3. **Hermetic Render Testing:** When modifying data pipelines or rendering routines, simulate payloads using a headless DOM stub to ensure `renderDay()`, `renderPv()`, and `renderHourly()` execute without exceptions.
4. **Git Tree Cleanliness:** Ensure working trees have no lingering temporary scratch files prior to creating commits.

## 4. Absolute Prohibitions
* **NUNCA / IT IS STRICTLY FORBIDDEN** to declare an iteration complete if `node --check` returns any syntax error or warning.
* **É ESTRITAMENTE PROIBIDO** commit code referencing DOM elements without verifying their existence in `index.html`.

