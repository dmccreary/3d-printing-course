---
title: Layer Height Cross-Section Explorer
description: Students can predict how changing layer height affects layer count, surface finish, and relative print time for a given part height.
status: implemented
library: p5.js
bloom_level: Apply (L3)
---

# Layer Height Cross-Section Explorer

## Learning Objective

Students can predict how changing layer height affects layer count, surface finish, and relative print time for a given part height.

- **Bloom Level:** Apply (L3)
- **Bloom Verb:** Use
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Slicing, G-code, and Toolpaths](../../chapters/07-slicing-and-toolpaths/index.md).

```text
Type: microsim
**sim-id:** layer-height-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: Use
Learning Objective: Students can predict how changing layer height affects layer count, surface finish, and relative print time for a given part height.

Instructional Rationale: An interactive slider with live visual feedback is appropriate for an Apply-level objective — students are not just recalling a fact but actively manipulating a parameter and observing consequential changes, which builds the intuition needed to choose layer heights in practice.

Canvas layout:
- Left panel (60% width): Side-view cross-section of a 20 mm tall rectangular block, rendered as a stack of visible layer lines. Layer lines drawn as alternating bands in two shades of blue to make individual layers visible. Layers scale in thickness proportionally to the selected layer height.
- Right panel (40% width): Data readout showing:
  - Selected Layer Height (mm)
  - Total Layers (20 mm ÷ layer height, rounded up)
  - Relative Print Time (normalized: 0.20 mm = 1.0×)
  - Surface Smoothness rating (qualitative scale: Coarse / Draft / Standard / Fine / Very Fine)

Controls (below the panels):
- Horizontal slider: Layer Height — range 0.08 mm to 0.36 mm, step 0.04 mm
- Default: 0.20 mm

Interaction:
- Moving the slider immediately updates the cross-section drawing and all four data readout values.
- Hovering the cross-section reveals a tooltip with the exact layer height and layer count at that resolution.
- A thin red line on the cross-section marks the 0.4 mm nozzle diameter for reference (labeled "Nozzle diameter").

Data:
- Layer count = ceil(20 / layer_height)
- Relative print time = 0.20 / layer_height (simplified, assumes speed constant)
- Surface smoothness: 0.08–0.12 → "Very Fine", 0.16–0.20 → "Standard", 0.24–0.28 → "Draft", 0.32–0.36 → "Coarse"

Color scheme: Layer bands in two shades of navy blue; control panel in light gray; red reference line for nozzle diameter.
Responsive: Canvas fills iframe width; panels stack vertically on screens narrower than 600px.
```

## Related Resources

- [Chapter 7: Slicing, G-code, and Toolpaths](../../chapters/07-slicing-and-toolpaths/index.md)
