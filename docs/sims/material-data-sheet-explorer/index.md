---
title: Material Data Sheet Interactive Explorer
description: Students can identify and explain the purpose of each major section of a thermoplastic filament data sheet.
status: implemented
library: p5.js
bloom_level: Understand (L2)
---

# Material Data Sheet Interactive Explorer

## Learning Objective

Students can identify and explain the purpose of each major section of a thermoplastic filament data sheet.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Interpret
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: Materials Science for Additive Manufacturing](../../chapters/06-materials-science/index.md).

```text
Type: infographic
**sim-id:** material-data-sheet-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: Interpret
Learning Objective: Students can identify and explain the purpose of each major section of a thermoplastic filament data sheet.

Layout:
- Left panel (60% width): Annotated mockup of a one-page filament data sheet for a generic PLA. Use realistic section headers: Product Overview, Recommended Print Settings, Mechanical Properties (table with rows: Tensile Strength, Elongation at Break, Flexural Modulus, Heat Deflection Temperature), Chemical Resistance, Regulatory Information, Storage and Handling.
- Right panel (40% width): Info panel that displays a detailed explanation when a section is clicked.

Clickable regions with explanations:
- "Product Overview" → "This section identifies the material family, color, and general use case. It tells you whether this is an engineering-grade or hobby-grade product."
- "Recommended Print Settings" → "Nozzle temp, bed temp, enclosure requirements, and cooling settings. These are starting points — your specific printer may need tuning."
- "Tensile Strength" row → "Measured in MPa. Tells you the maximum pulling force the material withstands before breaking. Higher = stronger under tension."
- "Elongation at Break" row → "Percentage the sample stretches before fracturing. Low values (< 10%) = brittle. High values (> 100%) = flexible or ductile."
- "Flexural Modulus" row → "Stiffness under bending load, in GPa. Higher = stiffer. Not the same as strength — a stiff material can still fracture at low stress."
- "Heat Deflection Temperature" row → "Temperature at which the material deforms under a standard load. Related to Tg but measured under load — more useful for structural design."
- "Chemical Resistance" section → "Tells you whether the material survives exposure to fuels, solvents, UV light, moisture, or acids. Critical for outdoor or chemical-contact applications."
- "Regulatory Information" section → "Lists certifications such as FDA food-contact compliance, RoHS, REACH. Essential for medical, food, or electronic applications."
- "Storage and Handling" section → "Drying temperature and time recommendations. If a filament is hygroscopic, the data sheet will say so here."

Highlighted section uses a colored border and mild background tint when hovered; clicking locks the selection and fills the right panel.

Default state: "Mechanical Properties" section selected and its explanation visible.

Responsive behavior: Scales to fill iframe width; panels stack vertically on screens narrower than 600px.
```

## Related Resources

- [Chapter 6: Materials Science for Additive Manufacturing](../../chapters/06-materials-science/index.md)
