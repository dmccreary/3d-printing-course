---
title: Mesh Geometry Anatomy
description: Students can identify and explain the role of vertices, edges, faces, and surface normals in a triangle mesh.
status: implemented
library: p5.js
bloom_level: Understand
---

# Mesh Geometry Anatomy

## Learning Objective

Students can identify and explain the role of vertices, edges, faces, and surface normals in a triangle mesh.

- **Bloom Level:** Understand
- **Bloom Verb:** identify, explain
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: 3D File Formats and Mesh Geometry](../../chapters/05-file-formats-and-mesh/index.md).

```text
Type: diagram
**sim-id:** mesh-geometry-anatomy<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Teach the three primitive elements of a mesh (vertex, edge, face) and surface normals. Bloom Level: Understand (L2). Bloom Verb: identify and explain.

Learning Objective: Students can identify and explain the role of vertices, edges, faces, and surface normals in a triangle mesh.

Canvas layout:
- Main drawing area (left ~70%): Shows a simple 3D mesh object (sphere approximation with ~80 triangles, rendered in an isometric-like projection with slight rotation)
- Info panel (right ~30%): Shows name, definition, and role of the currently hovered element

Visual elements:
- Mesh rendered with visible triangle wireframe over shaded faces
- Vertices displayed as small filled circles (orange) at each corner
- Edges displayed as thin lines (gray)
- Faces shaded light blue with slight transparency so the wireframe shows through
- Surface normal arrows (short red arrows) drawn perpendicular to each visible face, pointing outward

Interactivity:
- Hovering a vertex highlights it (yellow) and shows in the info panel: "Vertex — A single point in 3D space defined by X, Y, Z coordinates. Meshes typically have thousands of vertices."
- Hovering an edge highlights it (bright yellow) and shows: "Edge — A straight line segment connecting exactly two vertices. Each triangle has exactly three edges."
- Hovering a face highlights it (bright orange) and shows: "Face — A flat triangular surface defined by three vertices. The surface normal (red arrow) indicates which side is 'outside.'"
- A toggle button "Show Normals / Hide Normals" controls visibility of normal arrows
- A slow auto-rotation animation (can be paused with a button) to show the 3D nature of the mesh

Responsive design: Canvas resizes to container width while maintaining proportions. Minimum canvas height 400px.

Color scheme: Dark background (#1a1a2e), blue faces (#4a90d9 with 0.6 opacity), orange vertices (#ff8c00), gray edges (#aaaaaa), red normal arrows (#ff4444), yellow hover highlights.
```

## Related Resources

- [Chapter 5: 3D File Formats and Mesh Geometry](../../chapters/05-file-formats-and-mesh/index.md)
