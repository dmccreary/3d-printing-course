---
title: Z-Offset Calibration MicroSim
description: Students practice adjusting the Z offset and observe the resulting first-layer cross-section to develop intuition for the correct gap.
status: implemented
library: p5.js
bloom_level: Apply (L3)
---

# Z-Offset Calibration MicroSim

## Learning Objective

Students practice adjusting the Z offset and observe the resulting first-layer cross-section to develop intuition for the correct gap.

- **Bloom Level:** Apply (L3)
- **Bloom Verb:** Demonstrate
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="542" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: FDM Printer Hardware and Operation](../../chapters/08-fdm-printer-hardware/index.md).

```text
Type: microsim
**sim-id:** z-offset-calibration-sim<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate
Learning Objective: Students practice adjusting the Z offset and observe the resulting first-layer cross-section to develop intuition for the correct gap.

Canvas layout:
- Top (60px): Z-offset slider labeled from -2.5 mm to +0.5 mm, current value displayed numerically
- Center (280px): Cross-section view showing the nozzle tip above the build surface, with filament bead extruding and being compressed or gapped depending on offset
- Bottom (140px): Four labeled preview thumbnails showing "Too Far", "Slightly High", "Correct", "Too Close" with colored indicators

Visual elements:
- Nozzle shown as a gray tapered shape, its vertical position controlled by the Z-offset slider
- Extruded bead shown below nozzle: at correct offset it's elliptical and squished (wider than tall); too far = circular with no contact; too close = nozzle drags on surface, bead blocked
- Color of bead changes: red (too close or too far), yellow (close but not ideal), green (correct range)
- "First Layer Grade" text updates: Excellent / Good / Marginal / Poor / Nozzle Crash

Interactive controls:
- Z-offset slider (primary control)
- "Show Magnified View" toggle: zooms in on the bead cross-section
- Button: "What does this first layer look like?" — triggers a top-down view animation of how lines look when printed at the current offset

Default parameters:
- Starting Z offset: -1.0 mm (slightly high, good starting point for adjustment)

Instructional Rationale: Parameter exploration (Apply level) is appropriate because students need to develop tactile intuition that can't be conveyed by prose alone. The simulation gives immediate, concrete feedback linking abstract offset numbers to physical print outcomes.

Responsive: adjusts to container width; minimum 360px.
```

## Related Resources

- [Chapter 8: FDM Printer Hardware and Operation](../../chapters/08-fdm-printer-hardware/index.md)
