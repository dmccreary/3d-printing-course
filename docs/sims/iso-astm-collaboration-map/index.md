---
title: ISO and ASTM Collaboration Map
description: Recall and explain the roles of ISO and ASTM as standards bodies in additive manufacturing (Bloom L1–L2: identify, explain).
status: scaffold
library: vis-network
bloom_level: TBD
---

# ISO and ASTM Collaboration Map

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Recall and explain the roles of ISO and ASTM as standards bodies in additive manufacturing (Bloom L1–L2: identify, explain).

- **Bloom Level:** TBD
- **Bloom Verb:** TBD
- **Library:** vis-network

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: AM Standards, Process Families, and Industrial AM](../../chapters/02-standards-and-process-families/index.md).

```text
Type: interactive-infographic
**sim-id:** iso-astm-collaboration-map<br/>
**Library:** vis-network<br/>
**Status:** Specified

**Learning objective:** Recall and explain the roles of ISO and ASTM as standards bodies in additive manufacturing (Bloom L1–L2: identify, explain).

**Description:** A vis-network node-link diagram showing the relationship between ISO/TC 261 and ASTM F42, their collaboration agreement, and the resulting ISO/ASTM joint standards. The network has three layers:
- Layer 1 (top): Two large anchor nodes — "ISO / TC 261" (blue, Geneva icon) and "ASTM F42" (red, Pennsylvania icon)
- Layer 2 (middle): A shared node labeled "Joint Standards Agreement (2011)" connected to both anchors with bidirectional arrows
- Layer 3 (bottom): Three outcome nodes branching from the agreement node — "ISO/ASTM 52900 (Terminology)", "ISO/ASTM 52910 (Design)", and "ISO/ASTM 52921 (Coordinate Systems)"

**Interactions:** Clicking any node opens a right-side infobox with: organization name, founding year, headquarters, primary focus, and a one-sentence description of their role in AM standardization. Hovering highlights connected edges. A toggle button switches between "Focus: Terminology" and "Focus: All Standards" to filter visible nodes.

**Canvas size:** 700 × 400 px, responsive.
**Layout:** Hierarchical top-to-bottom.
**Colors:** ISO nodes in blue (#1565C0), ASTM nodes in red (#C62828), shared/joint nodes in purple (#6A1B9A), text in white on node backgrounds.
```

## Related Resources

- [Chapter 2: AM Standards, Process Families, and Industrial AM](../../chapters/02-standards-and-process-families/index.md)
