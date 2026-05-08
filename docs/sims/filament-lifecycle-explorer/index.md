---
title: Filament Lifecycle Explorer
description: Students examine the full lifecycle of a 3D-printed filament part — from raw material to end-of-life — and identify where waste and environmental impact occur.
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# Filament Lifecycle Explorer

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students examine the full lifecycle of a 3D-printed filament part — from raw material to end-of-life — and identify where waste and environmental impact occur.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Examine
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Safety, Ethics, and Sustainability in 3D Printing](../../chapters/09-safety-ethics-sustainability/index.md).

```text
Type: infographic
**sim-id:** filament-lifecycle-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Examine
Learning Objective: Students examine the full lifecycle of a 3D-printed filament part — from raw material to end-of-life — and identify where waste and environmental impact occur.

Layout:
- Circular flow diagram showing lifecycle stages: Raw Material → Pellet Production → Filament Extrusion → Spool → Printer → Finished Part → End of Life (branching to: Recycled / Landfill / Compost / Repurposed)
- Each stage is a labeled node on the circle
- Arrows between stages show material and energy flow

Interactive elements:
- Click any node: Expand an info panel with details — what happens at this stage, energy input, waste generated, and sustainability notes
- Hover any arrow: Show tooltip with "what's flowing here" (e.g., "PLA pellets", "waste prints", "extrusion heat")
- Filter toggle: "Show PLA", "Show PETG", "Show ABS" — each filter highlights the path and updates the info panel with material-specific data
- "Zoom to End of Life" button: expands the end-of-life branch to show the three disposal paths with their requirements and barriers

Color coding:
- Green: Sustainable / recyclable pathways
- Yellow: Conditionally sustainable
- Red: Landfill / non-recyclable pathways
- Blue: Process / energy inputs

Canvas:
- Main diagram: 600×400 area
- Info panel: right side, 200px wide

Responsive: reflows to vertical on narrow screens.
```

## Related Resources

- [Chapter 9: Safety, Ethics, and Sustainability in 3D Printing](../../chapters/09-safety-ethics-sustainability/index.md)
