---
title: Printer Brand Landscape Comparison
description: Students compare major consumer printer brands across dimensions including price, open-source status, print speed, ease of use, and community support to make informed recommendations for different use cases.
status: implemented
library: p5.js
bloom_level: Analyze (L4)
---

# Printer Brand Landscape Comparison

## Learning Objective

Students compare major consumer printer brands across dimensions including price, open-source status, print speed, ease of use, and community support to make informed recommendations for different use cases.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Compare
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 14: The Modern 3D Printing Ecosystem — Slicers, Connectivity, Brands, and Production](../../chapters/14-modern-ecosystem/index.md).

```text
Type: chart
**sim-id:** printer-brand-landscape<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Compare
Learning Objective: Students compare major consumer printer brands across dimensions including price, open-source status, print speed, ease of use, and community support to make informed recommendations for different use cases.

Visual layout:
- Radar (spider) chart with 6 axes: Price-Value, Print Speed, Ease of Use, Open Source, Community Support, Material Compatibility
- Each brand plotted as a colored polygon: Bambu (blue), Prusa (orange), Creality (green), Elegoo (resin only, purple), Snapmaker (multi-function, yellow)
- Scores on each axis are 1–10 based on industry consensus data

Interactive elements:
- Hover any brand's polygon: Highlight that brand's data and show a floating card with the brand's strengths and typical use-case recommendations
- Toggle checkboxes: show/hide individual brands to compare subsets
- Click any axis label: Show a tooltip explaining what that dimension means and how scores were assigned
- "Use Case Matcher" dropdown: Select "School Lab", "Hobbyist Maker", "Prototype Engineer", "High-Detail Resin" — highlights the recommended brand(s) for that use case

Data:
Bambu: Price-Value=8, Speed=10, Ease=9, OpenSource=3, Community=7, Material=8
Prusa: Price-Value=7, Speed=6, Ease=7, OpenSource=10, Community=10, Material=9
Creality: Price-Value=9, Speed=7, Ease=5, OpenSource=7, Community=9, Material=7
Elegoo (resin): Price-Value=9, Speed=8, Ease=7, OpenSource=5, Community=8, Material=4 (resin only)
Snapmaker: Price-Value=6, Speed=5, Ease=7, OpenSource=4, Community=6, Material=7

Responsive: chart scales proportionally; minimum 300px diameter.
```

## Related Resources

- [Chapter 14: The Modern 3D Printing Ecosystem — Slicers, Connectivity, Brands, and Production](../../chapters/14-modern-ecosystem/index.md)
