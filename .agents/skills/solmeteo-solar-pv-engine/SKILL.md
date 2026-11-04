---
name: solmeteo-solar-pv-engine
description: Physics and astronomical calculation rules for SolMeteo solar irradiance and photovoltaic production modeling.
---

# SolMeteo Solar PV Engine Skill

## 1. Trigger & Scope
* **Path:** `.agents/skills/solmeteo-solar-pv-engine/SKILL.md`
* **Trigger:** Activates whenever modifications, additions, or bugfixes affect astronomical position formulas, POA transposition, PV multi-array generation, thermal derating, or tariff financial metrics in `script.js` or `manual.html`.

## 2. Practical Justification
SolMeteo delivers accurate solar yield estimations without a backend. Mathematical stability is critical: inaccuracies in trigonometric conversions, negative solar elevation handling, or improper unit transposition directly invalidate the user's energy and financial predictions.

## 3. Key Deterministic Rules
1. **Astronomical Elevation Threshold:** Always enforce `sun.elev <= 0.5` degrees as the strict cutoff where solar irradiance is 0 W/m² and output is 0 kWh.
2. **POA Isotropic Transposition:** Maintain the decomposition of POA irradiance into beam, diffuse, and ground-reflected components:
   $$\text{POA} = \text{DNI} \cdot \max(0, \cos\theta) + \text{DHI} \cdot \frac{1 + \cos\beta}{2} + \text{GHI} \cdot 0.2 \cdot \frac{1 - \cos\beta}{2}$$
3. **Multi-Array Aggregation & Decimal Precision:** Sum up to 4 array configurations independently before calculating total yield; enforce kWp formatting with up to 2 decimal places (`0.01` step) and electricity tariffs with 3 decimal places (`0.001` step).
4. **Thermal Derating Constraints:** If cell temperature modeling is active, apply $T_{\text{cell}} = T_{\text{amb}} + 25 \times \frac{\text{POA}}{800}$ and derate by $-0.4\%/\text{°C}$ relative to 25°C, clamping derating to non-negative values.

## 4. Absolute Prohibitions
* **NUNCA / IT IS STRICTLY FORBIDDEN** to allow negative or NaN irradiance/kWh values to propagate to charts or user totals.
* **É ESTRITAMENTE PROIBIDO** round or truncate intermediate trigonometric values (hour angles, solar declination, azimuth, elevation) prior to final display rendering.
