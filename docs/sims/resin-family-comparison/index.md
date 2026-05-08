---
title: Resin Family Property Comparison
description: Students can distinguish the three resin families (standard, tough/flexible, engineering) by their mechanical and thermal properties and match each to appropriate applications.
status: implemented
library: Chart.js
bloom_level: Understand (L2)
---

# Resin Family Property Comparison

## Learning Objective

Students can distinguish the three resin families (standard, tough/flexible, engineering) by their mechanical and thermal properties and match each to appropriate applications.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Compare
- **Library:** Chart.js

## Preview

<iframe src="main.html" width="100%" height="522" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: Materials Science for Additive Manufacturing](../../chapters/06-materials-science/index.md).

```text
Type: chart
**sim-id:** resin-family-comparison<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: Compare
Learning Objective: Students can distinguish the three resin families (standard, tough/flexible, engineering) by their mechanical and thermal properties and match each to appropriate applications.

Chart type: Horizontal grouped bar chart with a property toggle

Purpose: Allow students to compare the three resin families across four key dimensions and connect each family to real applications, reinforcing the trade-offs between cost, performance, and use case.

Properties (toggled via button row at top):
1. Tensile Strength (MPa)
2. Elongation at Break (%)
3. Heat Deflection Temperature (°C)
4. Relative Cost Index (1.0 = Standard baseline)

Data:
- Standard Resin (blue): Tensile 40 MPa, Elongation 5%, HDT 45°C, Cost 1.0
- Tough/Flexible Resin (teal): Tensile 50 MPa, Elongation 120%, HDT 55°C, Cost 2.5
- Engineering Resin (orange): Tensile 65 MPa, Elongation 25%, HDT 200°C, Cost 4.5

Interactive elements:
- Hovering any bar reveals a tooltip with exact value, units, and a one-sentence explanation.
- Toggle buttons at top switch the active property; bars update with a smooth transition.
- Clicking a bar selects that resin family and populates a side card with its typical applications.

Application summary cards (shown on click):
- Standard Resin: "Best for: miniatures, jewelry prototypes, dental study models, display objects. Not suitable for functional mechanical parts or outdoor use."
- Tough/Flexible Resin: "Best for: snap-fit enclosures, living hinges, protective cases, gaskets, compressible grips. A practical bridge between aesthetics and function."
- Engineering Resin: "Best for: high-temperature tooling, biocompatible dental or medical devices, investment casting patterns. Requires careful post-cure protocols and precise exposure settings."

Color scheme: Blue, teal, orange — consistent with the chapter's visual language.
Responsive: Canvas scales to iframe width on resize.
```

## Related Resources

- [Chapter 6: Materials Science for Additive Manufacturing](../../chapters/06-materials-science/index.md)
