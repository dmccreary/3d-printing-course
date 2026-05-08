---
title: Metal AM Build-to-Part Workflow
description: Recall and sequence the steps from metal powder to finished metal part in industrial AM (Bloom L1–L2: recall, sequence, summarize).
status: scaffold
library: vis-network
bloom_level: TBD
---

# Metal AM Build-to-Part Workflow

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Recall and sequence the steps from metal powder to finished metal part in industrial AM (Bloom L1–L2: recall, sequence, summarize).

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
**sim-id:** metal-am-workflow<br/>
**Library:** vis-network<br/>
**Status:** Specified

**Learning objective:** Recall and sequence the steps from metal powder to finished metal part in industrial AM (Bloom L1–L2: recall, sequence, summarize).

**Description:** A horizontal left-to-right workflow diagram using vis-network showing the complete production sequence for a DMLS metal part. Seven sequential nodes connected by directional arrows:

1. **Powder Preparation** — Sieving, moisture control, recycling assessment
2. **Build Setup** — Support design, orientation, slicing, atmosphere purge
3. **DMLS Build** — Layer-by-layer laser melting in inert atmosphere
4. **Build Plate Removal** — Wire EDM or band saw separation
5. **Stress Relief** — Furnace anneal cycle with temperature/time profile
6. **Support Removal + Machining** — CNC finishing of critical surfaces
7. **Quality Inspection** — CT scanning, dimensional metrology, surface roughness

**Interactions:** Clicking any node opens a detail panel showing:
- Step name and description (2–3 sentences)
- Typical equipment used
- Key quality control check at this step
- Typical duration or processing time
- "What goes wrong here?" — one common failure mode and its remedy

Hovering any arrow shows a tooltip describing what changes between the two steps (e.g., "Part separates from build plate but residual stress remains").

**Layout:** Horizontal chain with nodes at equal spacing; detail panel appears below the diagram.
**Canvas:** 750 × 200 px for diagram + 200 px for detail panel = 400 px total height, responsive.
**Colors:** Each step node in a sequential warm-to-cool gradient (orange → yellow → green → teal → blue → indigo → violet) to reinforce the concept of progression.
```

## Related Resources

- [Chapter 2: AM Standards, Process Families, and Industrial AM](../../chapters/02-standards-and-process-families/index.md)
