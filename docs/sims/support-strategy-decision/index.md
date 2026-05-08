---
title: Support Strategy Decision Flow
description: Students can evaluate a part's geometry and select the appropriate support strategy (no support, normal support, tree support, support interface, dissolvable support) based on overhang angle, surface quality requirements, and material constraints.
status: implemented
library: p5.js
bloom_level: Evaluate (L5)
---

# Support Strategy Decision Flow

## Learning Objective

Students can evaluate a part's geometry and select the appropriate support strategy (no support, normal support, tree support, support interface, dissolvable support) based on overhang angle, surface quality requirements, and material constraints.

- **Bloom Level:** Evaluate (L5)
- **Bloom Verb:** Recommend
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="682" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Slicing, G-code, and Toolpaths](../../chapters/07-slicing-and-toolpaths/index.md).

```text
Type: workflow
**sim-id:** support-strategy-decision<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Evaluate (L5)
Bloom Verb: Recommend
Learning Objective: Students can evaluate a part's geometry and select the appropriate support strategy (no support, normal support, tree support, support interface, dissolvable support) based on overhang angle, surface quality requirements, and material constraints.

Visual style: Interactive decision tree flowchart with rectangular process nodes, diamond decision nodes, and terminal recommendation nodes. Clicking a node reveals an explanation in a side panel.

Nodes and text:
Start → "Does the part have overhanging surfaces?"
→ No: Terminal "No supports needed. Orient the part to minimize overhangs, or use DfAM to redesign."
→ Yes: "Are overhangs steeper than 45° from horizontal?"
→ No: Terminal "Self-supporting overhang. Most FDM printers bridge well up to 45°. No supports required."
→ Yes: "Is the supported surface visible or functional?"
→ No: Terminal "Use Normal Supports. They print fast and the surface quality is acceptable for hidden geometry."
→ Yes: "Is a multi-material printer or soluble filament available?"
→ Yes: Terminal "Use Dissolvable Support Interface (PVA or HIPS). Produces the cleanest supported surfaces; dissolves completely in water or limonene."
→ No: "Is the geometry complex with many isolated overhang points?"
→ Yes: Terminal "Use Tree Supports with Support Interface. Tree supports minimize contact points; interface layer improves surface quality."
→ No: Terminal "Use Normal Supports with Support Interface. Dense interface improves surface quality; normal structure is simpler to generate."

Each node:
- Hover: highlights the node with a border
- Click: side panel displays a 3–4 sentence explanation of the reasoning and practical tips

Side panel contents per node:
- "No supports needed": "Before printing, rotate the part in your slicer to find the orientation that minimizes overhang area. The slicer's 'place face on build plate' feature and the overhang preview (usually shown in red) help identify the optimal orientation."
- "Self-supporting": "FDM printers can typically bridge horizontally for 50–80 mm without supports if bridging speed is reduced and cooling is strong. Bridges over 80 mm benefit from supports or redesign."
- "Normal Supports": "In Cura, enable 'Generate Support' and set Support Structure to 'Normal'. Adjust Support Density (10–20% is standard) and Z Distance (0.15–0.2 mm to help separation)."
- "Dissolvable Interface": "PVA dissolves in water and works well with PLA. HIPS dissolves in d-limonene and pairs with ABS. Requires a dual-extrusion printer or tool changer."
- "Tree Supports with Interface": "In PrusaSlicer, set Support Style to 'Organic'. In Cura, set Support Structure to 'Tree'. Enable Support Interface with 0.2 mm Z gap for cleanest removal."
- "Normal Supports with Interface": "Enable Support Interface in Cura's Support section. Set Interface Layer Count to 2–4 and Interface Z Distance to 0.15 mm. This alone transforms surface quality on supported overhangs."

Color scheme: Decision diamonds in amber; process rectangles in blue; terminal recommendations in green; selected node highlighted in a warm orange border.
Responsive: Canvas scales to fill iframe width; on narrow screens, the tree renders vertically.
```

## Related Resources

- [Chapter 7: Slicing, G-code, and Toolpaths](../../chapters/07-slicing-and-toolpaths/index.md)
