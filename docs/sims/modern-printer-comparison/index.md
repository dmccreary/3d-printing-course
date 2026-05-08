---
title: Modern Printer Architecture Comparison
description: Students compare bed-slinger and CoreXY printer architectures by examining how each moves its axes, and analyze how the moving mass difference affects achievable print speed.
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# Modern Printer Architecture Comparison

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students compare bed-slinger and CoreXY printer architectures by examining how each moves its axes, and analyze how the moving mass difference affects achievable print speed.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Compare
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 13: Modern Hardware — Multi-Material, Motion, and Speed](../../chapters/13-modern-hardware/index.md).

```text
Type: diagram
**sim-id:** modern-printer-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Compare
Learning Objective: Students compare bed-slinger and CoreXY printer architectures by examining how each moves its axes, and analyze how the moving mass difference affects achievable print speed.

Visual layout:
- Side-by-side schematic of two printers:
  - Left: Bed slinger (classic Prusa-style proportions) — bed moves in Y, head moves in X/Z
  - Right: CoreXY (Bambu-style proportions) — bed moves only in Z, head moves in X/Y via coupled belt loop
- Motion arrows animated on each printer showing which axis moves when
- Mass labels on moving components: "~200g (head)" for CoreXY head, "~500g (bed + print)" for bed-slinger Y axis

Interactive elements:
- "Animate Move" button: animates a diagonal move on both printers simultaneously, showing how each motion system executes it differently
- Click any component: info panel shows component name, function, and "how this affects print quality"
- Hover "Belt" on CoreXY: tooltip shows the CoreXY belt routing explanation (both motors act together to produce any XY move)
- Speed slider: drag to increase move speed; at high speeds, the bed-slinger shows ringing artifacts (oscillating color of deposited path), while the CoreXY shows clean lines

Color coding:
- Red components: high-mass, speed-limiting elements
- Green components: low-mass, speed-enabling elements
- Blue: motion path

Canvas:
- Each printer: 300×300px schematic
- Info panel: 200px right sidebar

Responsive: stacks to vertical layout on screens below 700px.
```

## Related Resources

- [Chapter 13: Modern Hardware — Multi-Material, Motion, and Speed](../../chapters/13-modern-hardware/index.md)
