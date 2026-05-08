---
title: Exposure Setting Explorer
description: Students demonstrate the relationship between exposure time and layer cure depth/bleed by adjusting a slider and observing cross-section changes in a simulated layer.
status: implemented
library: p5.js
bloom_level: Apply (L3)
---

# Exposure Setting Explorer

## Learning Objective

Students demonstrate the relationship between exposure time and layer cure depth/bleed by adjusting a slider and observing cross-section changes in a simulated layer.

- **Bloom Level:** Apply (L3)
- **Bloom Verb:** Demonstrate
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: Resin Printing: SLA, MSLA, and DLP](../../chapters/10-resin-printing/index.md).

```text
Type: microsim
**sim-id:** resin-exposure-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate
Learning Objective: Students demonstrate the relationship between exposure time and layer cure depth/bleed by adjusting a slider and observing cross-section changes in a simulated layer.

Canvas layout:
- Top (80px): Two sliders — "Normal Layer Exposure (s)" range 0.5–6.0, and "Bottom Layer Exposure (s)" range 5–80
- Center (300px): Cross-section view of a resin layer being cured:
  - Shows LCD pixel column (light blue = UV passing through)
  - Shows resin layer as a horizontal rectangle
  - Shows cured zone expanding downward and outward as exposure increases
  - Annotates cure depth and bleed width in mm
- Bottom (100px): Status indicators: "Under-cured / Optimal / Over-cured" with color coding, plus dimensional error estimate for bottom layer elephant's foot

Visual elements:
- UV rays shown as short yellow vertical lines from LCD to resin surface
- Cured resin shown in a darker teal color filling from the top of the layer down to cure depth
- If over-exposed, cured zone bleeds sideways past the pixel boundary (shown in orange)
- Target cross-section outline shown in dashed line for reference
- Real-time label: "Cure depth: X µm, Bleed: Y µm"

Interactive controls:
- Normal exposure slider (primary)
- Bottom exposure slider
- Toggle: "Show bottom layer / normal layer" switches which scenario is visualized
- Button: "What happens to my print?" — shows a simplified cross-section of the base of a print using the current settings

Default parameters:
- Normal exposure: 2.0 s
- Bottom exposure: 30 s

Instructional Rationale: Parameter exploration is appropriate for Apply-level objectives. Students need to build physical intuition for how over- and under-exposure manifest in the printed part — this is difficult to convey through prose alone.

Responsive: scales to container; minimum 320px.
```

## Related Resources

- [Chapter 10: Resin Printing: SLA, MSLA, and DLP](../../chapters/10-resin-printing/index.md)
