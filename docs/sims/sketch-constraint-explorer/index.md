---
title: Sketch Constraint States Explorer
description: Identify the three sketch constraint states (under-constrained, fully constrained, over-constrained) and apply geometric and dimensional constraints to reach the fully constrained state (Bloom L1–L3: identify, explain, apply).
status: scaffold
library: p5.js
bloom_level: TBD
---

# Sketch Constraint States Explorer

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Identify the three sketch constraint states (under-constrained, fully constrained, over-constrained) and apply geometric and dimensional constraints to reach the fully constrained state (Bloom L1–L3: identify, explain, apply).

- **Bloom Level:** TBD
- **Bloom Verb:** TBD
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: Computer-Aided Design and Modeling](../../chapters/04-cad-and-modeling/index.md).

```text
Type: MicroSim
**sim-id:** sketch-constraint-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Identify the three sketch constraint states (under-constrained, fully constrained, over-constrained) and apply geometric and dimensional constraints to reach the fully constrained state (Bloom L1–L3: identify, explain, apply).

**Description:** An interactive p5.js canvas showing a simple L-shaped sketch profile made of five line segments. The student adds constraints and dimensions to move the sketch from under-constrained to fully constrained, experiencing the state transitions directly.

**Canvas layout (680 × 480 px, responsive):**
- Left panel (480 × 480 px): The sketch canvas showing the L-shape profile
  - Line colors: blue = under-constrained, black = fully constrained, red = over-constrained
  - A status badge at top: "UNDER-CONSTRAINED (N free degrees)" / "FULLY CONSTRAINED" / "OVER-CONSTRAINED"
  - Clicking a line selects it (yellow highlight)
  - Clicking two lines selects both for relational constraints
- Right panel (200 × 480 px): Constraint palette
  - Section "Geometric Constraints": buttons for Horizontal, Vertical, Parallel, Perpendicular, Equal, Coincident
  - Section "Dimensional Constraint": a text input for length/distance and an "Apply Dimension" button
  - Section "Status": shows count of free degrees of freedom remaining
  - "Reset Sketch" button clears all constraints

**Simulation logic:**
- The L-shape starts with 7 degrees of freedom (DOF): position in X (1), position in Y (1), rotation (1), and 4 line lengths
- Each constraint reduces DOF by a specific amount (horizontal/vertical removes 1, dimension removes 1, equal removes 1, etc.)
- When DOF reaches 0, all lines turn black and the status shows "FULLY CONSTRAINED"
- Adding one more constraint after full definition turns a conflicting entity red and shows "OVER-CONSTRAINED — remove a constraint"
- Hovering any constraint button shows a tooltip explaining what relationship it enforces

**Responsive behavior:** On narrow screens (< 600 px), the right panel moves below the sketch canvas.
```

## Related Resources

- [Chapter 4: Computer-Aided Design and Modeling](../../chapters/04-cad-and-modeling/index.md)
