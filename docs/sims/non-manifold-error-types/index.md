---
title: Non-Manifold Error Types
description: Students can identify open edges, T-junctions, inverted normals, and overlapping faces in mesh geometry and explain why each causes slicing failures.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Non-Manifold Error Types

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students can identify open edges, T-junctions, inverted normals, and overlapping faces in mesh geometry and explain why each causes slicing failures.

- **Bloom Level:** TBD
- **Bloom Verb:** TBD
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: 3D File Formats and Mesh Geometry](../../chapters/05-file-formats-and-mesh/index.md).

```text
Type: diagram
**sim-id:** non-manifold-error-types<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Help students recognize the four most common non-manifold geometry errors by seeing their visual geometry and understanding why each breaks slicing. Bloom Level: Understand (L2). Bloom Verb: identify and explain.

Learning Objective: Students can identify open edges, T-junctions, inverted normals, and overlapping faces in mesh geometry and explain why each causes slicing failures.

Canvas layout:
- Four clickable "error cards" displayed in a 2×2 grid in the upper 60% of the canvas
- Lower 40%: Detail panel showing enlarged geometry view and explanation text for the selected error type

Error cards (each shows a small wireframe illustration of the error):
1. Open Edge — Small mesh with a missing triangle, free edge highlighted in red
2. T-Junction — Two meshes meeting with misaligned vertices, junction highlighted
3. Inverted Normal — Single face shown with arrow pointing inward instead of outward (red arrow pointing INTO the mesh)
4. Overlapping Faces — Two triangles occupying the same space, shown with cross-hatching

Interactivity:
- Clicking a card selects it (card border turns bright orange)
- Detail panel updates to show:
  - Error name and definition
  - Enlarged wireframe showing the error clearly
  - "Why it breaks slicing" explanation (1-2 sentences)
  - "How to fix it" short tip
- Default state: Open Edge is selected on load

Detail panel content:
1. Open Edge: "A triangle is missing, leaving a free edge shared by only one face. The slicer cannot determine the solid boundary, so it may skip the region entirely or generate random infill. Fix: run the 'fill holes' repair in your mesh tool."
2. T-Junction: "A vertex sits on the middle of an adjacent triangle's edge instead of at a shared corner. The geometry doesn't align at the molecular level. Fix: remesh or weld the vertex to split the adjacent edge."
3. Inverted Normal: "This face's normal arrow points inward, telling the slicer that this surface is inside the solid. The slicer may skip depositing material there. Fix: use 'flip normals' or 'recalculate normals' in your repair tool."
4. Overlapping Faces: "Two faces occupy the same space, creating ambiguity about inside vs. outside. The slicer may generate double walls or gaps. Fix: use boolean union to merge overlapping geometry."

Color scheme: Error cards use a dark blue background (#1e293b) with white wireframes. Selected card has an orange border (#f97316). Detail panel is slightly lighter (#334155). Error highlights in red (#ef4444). Normal arrows in red for inverted, green for correct.

Responsive design: Grid layout reflows to 1×4 column on narrow screens. Canvas height adjusts to content.
```

## Related Resources

- [Chapter 5: 3D File Formats and Mesh Geometry](../../chapters/05-file-formats-and-mesh/index.md)
