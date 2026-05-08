---
title: Assembly Mate Constraints Visualizer
description: "Identify common mate constraint types, explain what degrees of freedom each removes, and analyze how combinations of mates fully constrain a part in an assembly (Bloom L1–L4: identify, explain, analyze)."
status: implemented
library: p5.js
bloom_level: Remember-Understand-Apply-Analyze
---

# Assembly Mate Constraints Visualizer

## Learning Objective

Identify common mate constraint types, explain what degrees of freedom each removes, and analyze how combinations of mates fully constrain a part in an assembly (Bloom L1–L4: identify, explain, analyze).

- **Bloom Level:** Remember / Understand / Apply / Analyze
- **Bloom Verb:** identify, explain, analyze
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: Computer-Aided Design and Modeling](../../chapters/04-cad-and-modeling/index.md).

```text
Type: interactive-infographic
**sim-id:** assembly-mate-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Identify common mate constraint types, explain what degrees of freedom each removes, and analyze how combinations of mates fully constrain a part in an assembly (Bloom L1–L4: identify, explain, analyze).

**Description:** An interactive p5.js diagram showing two simple block-shaped parts in isometric view. The student selects mates from a palette and applies them between the parts, watching the DOF counter decrease and the parts snap into their constrained positions.

**Canvas layout (700 × 480 px, responsive):**
- Center: Isometric view of two parts — a base block (fixed, gray) and a movable block (blue, starts floating off to the side)
- Top bar: "Degrees of Freedom Remaining: 6" counter (updates with each mate added)
- Right panel: Mate palette with six mate buttons (Coincident, Concentric, Distance, Angle, Parallel, Fixed), each with a tooltip describing what it does and how many DOF it removes
- Below mate palette: Applied mates list (numbered, with delete button)
- Bottom: "Assembly Status" badge — UNDER-CONSTRAINED / FULLY CONSTRAINED / OVER-CONSTRAINED

**Interactions:**
- Clicking a mate button applies it between the selected faces of the two parts (clicking a face on either part highlights it as the selection)
- The movable part animates to its new position after each mate is applied
- DOF counter decrements appropriately
- At 0 DOF, the badge turns green: "FULLY CONSTRAINED — Part is locked in place"
- Adding one more mate turns the badge red: "OVER-CONSTRAINED — One constraint is redundant or conflicting"
- Clicking a mate in the applied list highlights the constrained faces on the 3D view
- "Reset" button clears all mates

**Responsive behavior:** Scales to container width; DOF counter and status badge remain prominent at all sizes.
```

## Related Resources

- [Chapter 4: Computer-Aided Design and Modeling](../../chapters/04-cad-and-modeling/index.md)
