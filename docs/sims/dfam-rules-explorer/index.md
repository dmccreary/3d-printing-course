---
title: DfAM Rules Explorer
description: Students explain the key DfAM design rules — overhang angle, bridging, wall thickness, hole tolerance, and self-supporting geometry — by examining cross-section diagrams and reading hover explanations.
status: implemented
library: p5.js
bloom_level: Understand (L2)
---

# DfAM Rules Explorer

## Learning Objective

Students explain the key DfAM design rules — overhang angle, bridging, wall thickness, hole tolerance, and self-supporting geometry — by examining cross-section diagrams and reading hover explanations.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Explain
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Design for Additive Manufacturing and Metrology](../../chapters/11-dfam-and-metrology/index.md).

```text
Type: infographic
**sim-id:** dfam-rules-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: Explain
Learning Objective: Students explain the key DfAM design rules — overhang angle, bridging, wall thickness, hole tolerance, and self-supporting geometry — by examining cross-section diagrams and reading hover explanations.

Layout:
- Grid of 6 rule cards arranged 3×2:
  1. Overhang Angle (shows cross-sections at 30°, 45°, 60° with quality indicators)
  2. Bridging (shows successful short bridge vs. sagging long bridge)
  3. Wall Thickness (shows walls from 0.4 mm to 2.4 mm with printability indicators)
  4. Hole Tolerance (shows designed vs. actual hole size with offset annotation)
  5. Self-Supporting Arch (teardrop technique vs. flat-ceiling hole)
  6. Support Minimization (chamfer replaces horizontal shelf)

Interactive elements:
- Click any card: Expand to full-screen view with detailed cross-section diagram and explanatory text
- Hover any element within a card: Show tooltip with the rule name and one-sentence rationale
- Toggle "FDM / Resin" button: Updates each card to show how the rule differs between process types
- "Design Quiz" button: Presents a simplified cross-section of a part and asks "Does this need support?" with Yes/No buttons and feedback

Visual style:
- Each card has a header color coded to difficulty (green = easy to achieve, yellow = moderate, red = requires careful planning)
- Cross-section diagrams use: blue = desired geometry, orange = problematic zone, green = well-designed outcome

Responsive: 3×2 grid collapses to 2×3 then 1×6 on narrow screens.
```

## Related Resources

- [Chapter 11: Design for Additive Manufacturing and Metrology](../../chapters/11-dfam-and-metrology/index.md)
