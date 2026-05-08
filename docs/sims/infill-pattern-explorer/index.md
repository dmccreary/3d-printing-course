---
title: Infill Pattern Explorer
description: Students can compare infill patterns by their visual structure and predict which pattern is most appropriate for a given application based on strength profile and material use.
status: implemented
library: p5.js
bloom_level: Analyze (L4)
---

# Infill Pattern Explorer

## Learning Objective

Students can compare infill patterns by their visual structure and predict which pattern is most appropriate for a given application based on strength profile and material use.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Compare
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Slicing, G-code, and Toolpaths](../../chapters/07-slicing-and-toolpaths/index.md).

```text
Type: microsim
**sim-id:** infill-pattern-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Compare
Learning Objective: Students can compare infill patterns by their visual structure and predict which pattern is most appropriate for a given application based on strength profile and material use.

Instructional Rationale: A pattern explorer that renders patterns in real time is appropriate for Analyze-level because students need to visually distinguish patterns and make comparative judgments — not just remember names. Interactive density adjustment builds intuition about the infill density parameter before students use it in a real slicer.

Canvas layout:
- Left panel (65% width): Top-down view of a 100 mm × 100 mm square cross-section showing the selected infill pattern at the chosen density, with a solid perimeter wall (2 layers) visible around the edge.
- Right panel (35% width): Pattern selector (clickable buttons for: Lines, Grid, Honeycomb, Gyroid, Cubic, Lightning) + density slider (5%–100%, step 5%) + readout showing: selected pattern name, density %, estimated material coverage per layer (%).

Pattern rendering (2D approximations):
- Lines: Parallel horizontal lines spaced inversely proportional to density
- Grid: Two sets of perpendicular lines
- Honeycomb: Hexagonal grid, cell size inversely proportional to density
- Gyroid: Sinusoidal wave pattern in X offset by sinusoidal in Y (2D approximation of 3D gyroid cross-section)
- Cubic: 45° diagonal lines in alternating directions per simulated layer
- Lightning: Branching tree from center toward edges, minimal lines

Interaction:
- Clicking a pattern button immediately redraws the infill in the left panel.
- Moving the density slider redraws immediately.
- Hovering over the infill area reveals a tooltip: "Pattern: [Name] | Density: [X]% | Coverage: [Y]%"

Default: Grid pattern, 20% density.

Color scheme: Perimeter walls in dark blue; infill lines in medium blue; empty interior in off-white.
Responsive: Canvas fills iframe width; panels stack vertically on screens narrower than 600px.
```

## Related Resources

- [Chapter 7: Slicing, G-code, and Toolpaths](../../chapters/07-slicing-and-toolpaths/index.md)
