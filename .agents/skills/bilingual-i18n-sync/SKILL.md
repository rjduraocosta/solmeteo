---
name: bilingual-i18n-sync
description: Synchronization rules ensuring 100% parity between Portuguese and English dictionaries across the app and manual.
---

# Bilingual i18n & Manual Synchronization Skill

## 1. Trigger & Scope
* **Path:** `.agents/skills/bilingual-i18n-sync/SKILL.md`
* **Trigger:** Activates whenever text copy, labels, tooltips, units, or instructional content are added or edited in `script.js`, `index.html`, or `manual.html`.

## 2. Practical Justification
SolMeteo is strictly bilingual (PT/EN). Adding a translation key in Portuguese while omitting English causes runtime rendering failures, blank UI labels, or broken documentation parity in the visual user manual.

## 3. Key Deterministic Rules
1. **Dictionary Key Parity:** Every translation key added to `I18N.pt` must have a corresponding, culturally accurate entry in `I18N.en` within `script.js`.
2. **Dual Manual Maintenance:** Any behavioral, UI, or technical change must be immediately updated in `manual.html` in both Portuguese and English sections, keeping the translation key count identical.
3. **Data-Attribute Binding:** Use declarative attributes (`data-i18n`, `data-i18n-html`, `data-i18n-ph`, `data-i18n-title`, `data-i18n-aria`) to ensure clean programmatic language switching without full page reloads.
4. **Synchronous Language Persistence:** Ensure language selection is stored under `localStorage["skycast:lang"]` so both the main application and `manual.html` seamlessly share the user's active locale.

## 4. Absolute Prohibitions
* **NUNCA / IT IS STRICTLY FORBIDDEN** to commit changes where a UI string or manual section is available in one language but missing in the other.
* **É ESTRITAMENTE PROIBIDO** shadow or overwrite the internationalization helper function `t()` with local loop or time variables.
