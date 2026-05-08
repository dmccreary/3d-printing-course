---
title: Mesh Repair Workflow
description: Students can follow the mesh repair workflow — analyze, auto-repair, inspect, manual repair, re-export — and select the appropriate tool and action for each step.
status: implemented
library: p5.js
bloom_level: Apply
---

# Mesh Repair Workflow

## Learning Objective

Students can follow the mesh repair workflow — analyze, auto-repair, inspect, manual repair, re-export — and select the appropriate tool and action for each step.

- **Bloom Level:** Apply
- **Bloom Verb:** execute, implement
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: 3D File Formats and Mesh Geometry](../../chapters/05-file-formats-and-mesh/index.md).

```text
Type: workflow
**sim-id:** mesh-repair-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Walk students through the standard mesh repair decision workflow so they can apply the correct repair strategy for different error types. Bloom Level: Apply (L3). Bloom Verb: execute and implement.

Learning Objective: Students can follow the mesh repair workflow — analyze, auto-repair, inspect, manual repair, re-export — and select the appropriate tool and action for each step.

Canvas layout:
- Vertical flowchart with rounded rectangles for process steps and diamond shapes for decision points
- Each node is clickable
- Right side panel (25% width): Detail panel for the selected node

Workflow nodes and click content:
1. START oval: "Export mesh from CAD"
   Click text: "Export as STL (binary) or 3MF. Use high-quality resolution settings — errors introduced by low resolution cannot be repaired, only re-exported."

2. Process rectangle: "Import into slicer / repair tool"
   Click text: "PrusaSlicer, Meshmixer, or Netfabb. Most tools run an automatic diagnostic scan on import and flag errors in the title bar or an error panel."

3. Diamond decision: "Errors detected?"
   — Yes branch → Step 4
   — No branch → Step 7

4. Process rectangle: "Run Auto-Repair"
   Click text: "Use the tool's one-click repair function. This handles ~80% of common errors: filling small holes, removing duplicate faces, flipping inverted normals, merging overlapping geometry."

5. Diamond decision: "Errors remain after auto-repair?"
   — Yes branch → Step 6
   — No branch → Step 7

6. Process rectangle: "Manual Inspection & Repair"
   Click text: "Use error visualization to locate remaining problems. Delete bad faces and fill manually. If errors are severe or widespread, returning to CAD and fixing source geometry is more reliable than manual mesh patching."

7. Process rectangle: "Validate: check manifold status"
   Click text: "Confirm the mesh is now manifold (watertight, no open edges, no inverted normals). Most tools show a green check or 'manifold' status when validation passes."

8. Diamond decision: "Manifold?"
   — Yes branch → Step 9
   — No branch → Step 4 (loop back)

9. END oval: "Export clean mesh → ready for slicer"
   Click text: "Save as a new file (don't overwrite the original). Your mesh is now ready for slicing. The loop from Step 8 back to Step 4 is normal — complex repairs sometimes take 2-3 iterations."

Color scheme:
- Process rectangles: Blue (#3b82f6) with white text
- Decision diamonds: Orange (#f97316) with white text
- Start/End ovals: Green (#22c55e) with white text
- Arrows: Light gray (#9ca3af)
- Selected node: Highlighted with bright yellow border (#fbbf24)
- Detail panel: Dark background (#1e293b), white text

Default state: START node is selected and detail panel shows its content.

Responsive design: Flowchart scales to canvas width. Text in nodes wraps automatically. Minimum font size 12px. Canvas height adjusts to fit all nodes with comfortable spacing.
```

## Related Resources

- [Chapter 5: 3D File Formats and Mesh Geometry](../../chapters/05-file-formats-and-mesh/index.md)
