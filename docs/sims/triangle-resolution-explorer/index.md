---
title: Triangle Resolution Explorer
description: Students can adjust chord deviation and angular tolerance to achieve the appropriate mesh resolution for a given print resolution, and explain the trade-off between quality and file size.
status: implemented
library: p5.js
bloom_level: Apply
---

# Triangle Resolution Explorer

## Learning Objective

Students can adjust chord deviation and angular tolerance to achieve the appropriate mesh resolution for a given print resolution, and explain the trade-off between quality and file size.

- **Bloom Level:** Apply
- **Bloom Verb:** use, demonstrate
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: 3D File Formats and Mesh Geometry](../../chapters/05-file-formats-and-mesh/index.md).

```text
Type: microsim
**sim-id:** triangle-resolution-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to explore the trade-off between triangle count, visual quality, and file size by adjusting mesh resolution parameters. Bloom Level: Apply (L3). Bloom Verb: use and demonstrate.

Learning Objective: Students can adjust chord deviation and angular tolerance to achieve the appropriate mesh resolution for a given print resolution, and explain the trade-off between quality and file size.

Canvas layout:
- Drawing area (upper 65%): Shows a sphere mesh rendered in wireframe-over-solid style, rotating slowly; sphere diameter ~200px at default
- Control panel (lower 35%): Two sliders and statistics display

Controls:
1. Chord Deviation slider: Range 0.01 mm to 2.0 mm (logarithmic), default 0.2 mm. Label: "Chord Deviation (mm)"
2. Angular Deviation slider: Range 1° to 45°, default 15°. Label: "Angular Deviation (°)"
3. "Pause rotation" toggle button

Statistics panel (updated live as sliders move):
- Triangle count: [computed value, e.g. "~1,240 triangles"]
- Estimated STL file size: [computed value, e.g. "~74 KB (binary)"]
- Worst-case surface error: [computed value in mm, e.g. "≤ 0.20 mm"]
- Quality rating: "Excellent / Good / Fair / Poor" based on chord deviation relative to 0.2mm FDM resolution

Data Visibility Requirements (Understand objective):
- Stage 1: Show sphere at default settings — reasonably smooth, stats visible
- Stage 2: Drag chord deviation to 2.0 mm — sphere becomes obviously faceted, triangle count drops dramatically, "Poor" quality rating appears
- Stage 3: Drag chord deviation to 0.01 mm — sphere looks perfectly smooth, triangle count jumps to 50,000+, file size estimate rises to several MB
- This sequence makes the trade-off visceral and concrete

Behavior:
- Sphere mesh is regenerated in real time as sliders move (regenerated using UV sphere algorithm, number of lat/lon divisions derived from chord deviation formula)
- Color of statistics panel changes: green for "Excellent/Good", yellow for "Fair", red for "Poor"
- Wireframe toggle: a checkbox "Show wireframe" overlays triangle edges; turning it off shows only the smooth-shaded surface

Instructional Rationale: Parameter exploration (Apply/L3) is appropriate because students need to develop intuition for how numerical settings translate to visual quality. Seeing the triangle count change in real time as the slider moves builds this intuition more effectively than any static table.

Responsive design: Sphere drawing area scales with container width. Minimum canvas height 480px. Slider labels wrap gracefully on narrow screens.
```

## Related Resources

- [Chapter 5: 3D File Formats and Mesh Geometry](../../chapters/05-file-formats-and-mesh/index.md)
