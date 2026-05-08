---
title: Iteration Cycle Simulator
description: Analyze how repeated prototype-test-revise cycles converge on a design that meets specifications (Bloom L4: examine relationships, analyze patterns).
status: scaffold
library: p5.js
bloom_level: TBD
---

# Iteration Cycle Simulator

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Analyze how repeated prototype-test-revise cycles converge on a design that meets specifications (Bloom L4: examine relationships, analyze patterns).

- **Bloom Level:** TBD
- **Bloom Verb:** TBD
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: The Engineering Design Process](../../chapters/03-engineering-design-process/index.md).

```text
Type: MicroSim
**sim-id:** iteration-cycle-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Analyze how repeated prototype-test-revise cycles converge on a design that meets specifications (Bloom L4: examine relationships, analyze patterns).

**Description:** An animated p5.js simulation showing an abstract design metric (e.g., "load capacity" or "dimensional accuracy") improving over successive iterations. The student controls how much effort goes into each phase of the cycle and observes how the design metric evolves.

**Canvas layout (680 × 460 px, responsive):**
- Top: A horizontal "Design Quality" gauge (0–100 %), starting at 30–40 %, increasing with iterations
- Middle: Three sliders labeled "Research depth," "Prototype fidelity," and "Test rigor" (each 1–5)
- Center: A circular animation showing the three-phase loop: Prototype → Test → Revise, with a glowing bead cycling around
- Right panel: A live line chart showing Design Quality vs. Iteration Number (X-axis 1–10, Y-axis 0–100 %)
- Bottom: "Run Next Iteration" button; "Reset" button

**Simulation logic (simplified, pedagogically calibrated):**
- Each iteration increases Design Quality by a random amount within a range influenced by the three sliders (higher values = larger potential improvement)
- Diminishing returns are modeled: improvements shrink as quality approaches 100 %
- A "Specification Target" horizontal line at 80 % (user-draggable between 60–95 %) shows when the design would be accepted
- At each iteration, a brief text log entry appears (e.g., "Iteration 3: Tab thickness increased 0.4 mm → load capacity improved 12 %")

**Interactions:** All sliders update simulation parameters for the next iteration. Clicking "Run Next Iteration" advances one loop and updates the chart and gauge. Hovering any chart point shows that iteration's log entry in a tooltip.

**Responsive behavior:** On narrow screens, the chart and left panel stack vertically.
```

## Related Resources

- [Chapter 3: The Engineering Design Process](../../chapters/03-engineering-design-process/index.md)
