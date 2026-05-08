---
title: Feature Tree Builder
description: "Apply feature-based modeling by sequencing feature operations to produce a target part, understanding how the feature tree order affects the final geometry (Bloom L3–L4: apply, analyze)."
status: implemented
library: p5.js
bloom_level: Apply-Analyze
---

# Feature Tree Builder

## Learning Objective

Apply feature-based modeling by sequencing feature operations to produce a target part, understanding how the feature tree order affects the final geometry (Bloom L3–L4: apply, analyze).

- **Bloom Level:** Apply / Analyze
- **Bloom Verb:** apply, analyze
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: Computer-Aided Design and Modeling](../../chapters/04-cad-and-modeling/index.md).

```text
Type: MicroSim
**sim-id:** feature-tree-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Apply feature-based modeling by sequencing feature operations to produce a target part, understanding how the feature tree order affects the final geometry (Bloom L3–L4: apply, analyze).

**Description:** An interactive p5.js simulation showing a simplified 3D isometric view of a part (rendered as colored block geometry, not full 3D — pseudo-3D using isometric projection) that updates in real time as the student adds features to a feature tree panel.

**Canvas layout (700 × 500 px, responsive):**
- Left panel (300 × 500 px): Feature tree list
  - Starts with one base feature: "Extrude Boss: 40×60×20 mm block" (fixed, cannot remove)
  - "Add Feature" dropdown: Extrude Cut (hole), Fillet, Shell, Linear Pattern, Circular Pattern
  - Each added feature shows in the list with name, key parameter, and an "Edit" pencil and "×" delete button
  - "Move Up ↑" and "Move Down ↓" arrows on each feature (to demonstrate reorder effects)
- Right panel (400 × 500 px): Isometric 3D view of current part
  - Rendered in real time as features are added/removed/reordered
  - The part is a simplified block; features change its visible geometry (holes appear as dark squares, fillets show as rounded corners, shell shows as a hollow with open top face)
  - Currently selected feature highlighted in yellow on the 3D view

**Pre-loaded challenge:** A "Target Part" thumbnail shown in a corner — a simple bracket shape with two holes and a fillet. Student must add the right features in the right order to match it.

**Interactions:**
- Adding a feature opens a mini parameter panel (e.g., "Extrude Cut: diameter = [  ] mm, depth = [  ] mm")
- Moving a fillet above a hole demonstrates rebuild failure (error icon on the fillet)
- "Rebuild" button forces recalculation; errors flash red
- "Compare to Target" button shows a split view comparing student's part to the target

**Responsive behavior:** On narrow screens, the tree panel stacks above the 3D view.
```

## Related Resources

- [Chapter 4: Computer-Aided Design and Modeling](../../chapters/04-cad-and-modeling/index.md)
