---
title: 3D File Format Comparison Explorer
description: Students can compare STL, 3MF, and OBJ across printing-relevant properties and choose the appropriate format for a given workflow.
status: implemented
library: p5.js
bloom_level: Analyze
---

# 3D File Format Comparison Explorer

## Learning Objective

Students can compare STL, 3MF, and OBJ across printing-relevant properties and choose the appropriate format for a given workflow.

- **Bloom Level:** Analyze
- **Bloom Verb:** compare, differentiate
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: 3D File Formats and Mesh Geometry](../../chapters/05-file-formats-and-mesh/index.md).

```text
Type: infographic
**sim-id:** file-format-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Purpose: Allow students to explore the capabilities of STL, 3MF, and OBJ side by side through an interactive comparison matrix with expandable detail panels. Bloom Level: Analyze (L4). Bloom Verb: compare and differentiate.

Learning Objective: Students can compare STL, 3MF, and OBJ across printing-relevant properties and choose the appropriate format for a given workflow.

Canvas layout:
- Three "format cards" arranged horizontally (one per format): STL (left), 3MF (center), OBJ (right)
- Each card shows: format name, a format icon (stylized file icon), and 6 property indicators
- Below cards: Detail panel showing full comparison text when a property row is clicked

Property rows (displayed as icon + label + colored dot for each format):
1. Units in file — Red dot STL, Green dot 3MF, Red dot OBJ
2. Color support — Red dot STL, Green dot 3MF, Yellow dot OBJ ("with .mtl file")
3. Multiple objects — Red dot STL, Green dot 3MF, Green dot OBJ
4. Slicer settings — Red dot STL, Green dot 3MF, Red dot OBJ
5. Universal support — Green dot STL, Yellow dot 3MF ("modern slicers"), Yellow dot OBJ
6. File size — Yellow dot STL, Green dot 3MF ("compressed"), Red dot OBJ ("large ASCII")

Color coding for dots: Green = supported/good, Yellow = partial/conditional, Red = not supported/limitation.

Interactivity:
- Clicking any property row highlights that row across all three cards and opens the detail panel
- Detail panel shows: property name, explanation of why it matters for printing, and what each format does
- Clicking a format card header selects that format and shows a summary of its best use cases and known limitations
- Hover state on any card subtly raises it (shadow effect)

Default state: No row selected; overview text shown: "Click any property row to compare how STL, 3MF, and OBJ handle it."

Responsive design: On narrow screens, cards stack vertically. Detail panel always visible below cards.
```

## Related Resources

- [Chapter 5: 3D File Formats and Mesh Geometry](../../chapters/05-file-formats-and-mesh/index.md)
