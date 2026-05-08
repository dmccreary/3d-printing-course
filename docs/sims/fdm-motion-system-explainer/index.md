---
title: Motion System Explainer
description: Students explain how stepper motors, belts, and lead screws translate G-code motion commands into physical print-head movement.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Motion System Explainer

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students explain how stepper motors, belts, and lead screws translate G-code motion commands into physical print-head movement.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Explain
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: FDM Printer Hardware and Operation](../../chapters/08-fdm-printer-hardware/index.md).

```text
Type: microsim
**sim-id:** fdm-motion-system-explainer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: Explain
Learning Objective: Students explain how stepper motors, belts, and lead screws translate G-code motion commands into physical print-head movement.

Data Visibility Requirements:
Stage 1: Show G-code command (e.g., G1 X50 Y30 F3000) as text at the top
Stage 2: Show the command parsed into axis deltas: ΔX = 50 mm, ΔY = 30 mm
Stage 3: Animate the print head moving from origin to (50, 30) over the build area — X belt and Y belt highlighted as they activate
Stage 4: Show step count calculations: steps = (distance / mm_per_step), displayed numerically
Stage 5: Show final position reached, with confirmation overlay

Canvas layout:
- Top panel (80px): G-code input field (preset commands to select, no freeform entry) + "Run" button
- Center (360px): Top-down view of printer build area with print head carriage, X-axis rod and belt, Y-axis rod and belt
- Bottom panel (80px): Step counter for X motor and Y motor, updating in real time during animation

Interactive controls:
- Dropdown: select from 5 preset G-code moves (short X-only, short Y-only, diagonal, full-bed traverse, retrace)
- Slider: animation speed (slow/medium/fast)
- Toggle: "Show Steps" checkbox — shows/hides step-count overlay
- Button: Reset to home position

Visual elements:
- Print head as a small colored square with crosshair
- X belt shown as a dashed line across top and bottom of carriage (moves with head)
- Y belt shown as dashed lines on sides
- Animated pulley wheels at belt endpoints, spinning during moves
- Motion path drawn as a fading trail

Instructional Rationale: Step-through with concrete data visibility is appropriate because the Understand objective requires students to connect abstract G-code numbers to physical steps and distances. Animation shows the relationship dynamically; step counters make the math visible.

Responsive: scales to container width; minimum 320px.
```

## Related Resources

- [Chapter 8: FDM Printer Hardware and Operation](../../chapters/08-fdm-printer-hardware/index.md)
