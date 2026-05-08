---
title: Industrial PBF Process Comparison
description: "Compare SLS, MJF, DMLS, and EBM on energy source, material, atmosphere, and application (Bloom L4: differentiate, compare, contrast)."
status: implemented
library: p5.js
bloom_level: Analyze
---

# Industrial PBF Process Comparison

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Compare SLS, MJF, DMLS, and EBM on energy source, material, atmosphere, and application (Bloom L4: differentiate, compare, contrast).

- **Bloom Level:** TBD
- **Bloom Verb:** TBD
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: AM Standards, Process Families, and Industrial AM](../../chapters/02-standards-and-process-families/index.md).

```text
Type: interactive-infographic
**sim-id:** industrial-pbf-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Compare SLS, MJF, DMLS, and EBM on energy source, material, atmosphere, and application (Bloom L4: differentiate, compare, contrast).

**Description:** A 2 × 2 interactive grid displaying SLS, MJF, DMLS, and EBM as four equal quadrant panels. Each panel shows:
- Process acronym (large, bold) and full name (smaller)
- Energy source icon (laser = yellow beam, IR lamp array = orange wave, electron beam = blue lightning)
- Material icon (polymer powder = yellow granules, metal powder = gray granules)
- Atmosphere icon (inert gas = cloud, vacuum = empty ring)
- One key application example (text)

**Canvas size:** 700 × 480 px, responsive (2 × 2 on wide screens, stacked 1-column on narrow screens).

**Interactions:**
- Clicking any quadrant panel expands it to full-width detail view showing:
  - Full process description (3–4 sentences)
  - Energy source with wattage range
  - Typical materials (bulleted list)
  - Atmosphere requirement
  - Build volume range (example machine)
  - Key advantage and key limitation
  - Representative end-use applications
  - "Back" button to return to grid
- A "Compare Mode" toggle at top: when active, clicking a second panel places both detail views side-by-side for direct comparison.
- Hovering any panel highlights it with a bright border and shows a tooltip with the process's one-sentence definition.

**Color coding:** SLS = green-toned, MJF = blue-toned, DMLS = orange-toned, EBM = purple-toned.
```

## Related Resources

- [Chapter 2: AM Standards, Process Families, and Industrial AM](../../chapters/02-standards-and-process-families/index.md)
