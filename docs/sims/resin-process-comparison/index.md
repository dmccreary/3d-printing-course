---
title: Resin Process Comparison Explorer
description: Students compare SLA, DLP, and MSLA processes by examining how each technology delivers UV light to the resin vat, and analyze the trade-offs between precision, speed, and cost.
status: implemented
library: p5.js
bloom_level: Analyze (L4)
---

# Resin Process Comparison Explorer

## Learning Objective

Students compare SLA, DLP, and MSLA processes by examining how each technology delivers UV light to the resin vat, and analyze the trade-offs between precision, speed, and cost.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Compare
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: Resin Printing: SLA, MSLA, and DLP](../../chapters/10-resin-printing/index.md).

```text
Type: diagram
**sim-id:** resin-process-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Compare
Learning Objective: Students compare SLA, DLP, and MSLA processes by examining how each technology delivers UV light to the resin vat, and analyze the trade-offs between precision, speed, and cost.

Visual layout:
- Three side-by-side cross-section diagrams (SLA, DLP, MSLA), each showing:
  - The light source at the bottom (laser dot for SLA, projector cone for DLP, LED array for MSLA)
  - The masking element (galvo mirrors for SLA, DMD chip for DLP, LCD panel for MSLA)
  - The resin vat with FEP film
  - The build platform above with a partially built object
  - Animated UV light path for each technology (laser tracing for SLA, full-layer flash for DLP/MSLA)

Interactive elements:
- Click any diagram: Expand a side panel with specs — light source, typical XY resolution, layer cure time, relative cost, best use cases
- Toggle "Animate Layer": Shows an animated cycle of one layer exposing for each selected technology simultaneously — helps compare speed differences visually
- Hover any component label: Shows a tooltip with the component's definition
- "Compare Spec" button: Opens a floating comparison table with all three technologies side by side

Color coding:
- UV exposure zones: yellow (active) → teal (cured resin)
- Build platform: gray with dark hatching for cured layers
- Resin: transparent blue for liquid, dark teal for cured

Animation details:
- SLA: laser dot scans across the cross-section pattern (fast)
- DLP/MSLA: full rectangular flash with a single frame (faster for large layers)
- Timer below each shows relative layer time at typical settings

Responsive: maintains 3-column layout down to 600px, then stacks to vertical for smaller screens.
```

## Related Resources

- [Chapter 10: Resin Printing: SLA, MSLA, and DLP](../../chapters/10-resin-printing/index.md)
