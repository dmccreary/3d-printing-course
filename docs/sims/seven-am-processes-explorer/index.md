---
title: Seven Process Families Explorer
description: "Identify and explain each of the seven ISO/ASTM 52900 AM process categories by feedstock type, energy source, and representative technology (Bloom L1–L2: recall, classify)."
status: implemented
library: p5.js
bloom_level: Remember-Understand
---

# Seven Process Families Explorer

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Identify and explain each of the seven ISO/ASTM 52900 AM process categories by feedstock type, energy source, and representative technology (Bloom L1–L2: recall, classify).

- **Bloom Level:** TBD
- **Bloom Verb:** TBD
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="642" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: AM Standards, Process Families, and Industrial AM](../../chapters/02-standards-and-process-families/index.md).

```text
Type: interactive-infographic
**sim-id:** seven-am-processes-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Identify and explain each of the seven ISO/ASTM 52900 AM process categories by feedstock type, energy source, and representative technology (Bloom L1–L2: recall, classify).

**Description:** A radial hub-and-spoke infographic centered on a "ISO/ASTM 52900" hub node. Seven labeled spokes radiate outward to category nodes, each containing the category name and a small icon representing the feedstock type (filament spool, resin vat, powder bed, droplets, powder + binder, wire/powder nozzle, sheets stack).

**Layout (700 × 600 px, responsive):**
- Center hub: Dark circle labeled "AM Process Categories" (ISO/ASTM 52900)
- 7 category nodes arranged in a ring at radius ~220 px, evenly spaced
- Each node: Rounded rectangle with category name (bold), feedstock icon below
- Color coding: Each category has a distinct hue (Material Extrusion = blue, Vat Photo = purple, PBF = orange, Material Jetting = teal, Binder Jetting = green, DED = red, Sheet Lamination = brown)

**Interactions:**
- Clicking any category node expands a detail panel below the diagram (or to the right on wide screens) showing:
  - Category name and formal ISO/ASTM 52900 definition
  - How material is joined (one sentence)
  - Two representative technologies/machines
  - Typical materials
  - One-line description of best use case
- The selected node glows with a halo effect. Previous selection dims.
- A "Compare Two" mode: click one node, then shift-click another to view a side-by-side comparison of the two categories.

**Responsive behavior:** On narrow screens (< 500 px), the radial layout collapses to a vertical list with the same clickable detail panels.

**Color scheme:** Soft pastel node backgrounds with dark text; white center hub on dark background.
```

## Related Resources

- [Chapter 2: AM Standards, Process Families, and Industrial AM](../../chapters/02-standards-and-process-families/index.md)
