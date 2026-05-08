---
title: The PLTW Engineering Design Process Cycle
description: Recall and sequence the seven steps of the PLTW engineering design process and explain how they connect in an iterative loop (Bloom L1–L2: recall, sequence, explain).
status: scaffold
library: p5.js
bloom_level: TBD
---

# The PLTW Engineering Design Process Cycle

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Recall and sequence the seven steps of the PLTW engineering design process and explain how they connect in an iterative loop (Bloom L1–L2: recall, sequence, explain).

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
Type: interactive-infographic
**sim-id:** pltw-design-process-cycle<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Recall and sequence the seven steps of the PLTW engineering design process and explain how they connect in an iterative loop (Bloom L1–L2: recall, sequence, explain).

**Description:** A circular p5.js diagram showing the PLTW design process as a ring of seven labeled nodes connected by curved directional arrows forming a clockwise loop. A center label reads "PLTW Engineering Design Process."

**Node labels and colors (clockwise from top):**
1. Define the Problem — blue (#1565C0)
2. Research — teal (#00695C)
3. Ideate — green (#388E3C)
4. Specify — yellow (#F57F17)
5. Prototype — orange (#E64A19)
6. Test & Validate — red (#C62828)
7. Communicate — purple (#6A1B9A)

**Canvas:** 650 × 500 px, responsive.

**Interactions:**
- Clicking any node highlights it with a pulsing glow and opens a detail panel below the diagram showing:
  - Step name and one-sentence description
  - Key questions asked at this step (bulleted list, 3–4 items)
  - Typical deliverables (e.g., "problem statement," "sketch sheet," "CAD model")
  - AM-specific note: how this step plays out in a 3D printing project
  - A "Next Step →" button that advances to the next node in the cycle
- Arrows between non-adjacent nodes (e.g., Test back to Ideate) are shown as lighter dashed arcs to indicate that iteration can jump back to earlier steps; hovering these arcs shows a tooltip: "Iteration: test results revealed a flaw — return here to redesign."
- A "Full Cycle" button animates a glowing bead traveling around the ring in sequence with a 0.8 s pause at each node.

**Layout:** Nodes evenly spaced on a circle of radius 200 px. Node circles are 60 px diameter with white text. Arrows are curved SVG paths with arrowheads.
```

## Related Resources

- [Chapter 3: The Engineering Design Process](../../chapters/03-engineering-design-process/index.md)
