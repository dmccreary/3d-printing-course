---
title: FDM Failure Diagnosis Decision Tree
description: Students evaluate a described print failure by navigating a decision tree that identifies the most likely root cause and recommended fix.
status: scaffold
library: p5.js
bloom_level: Evaluate (L5)
---

# FDM Failure Diagnosis Decision Tree

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students evaluate a described print failure by navigating a decision tree that identifies the most likely root cause and recommended fix.

- **Bloom Level:** Evaluate (L5)
- **Bloom Verb:** Judge
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: Print Failures, Troubleshooting, and Post-Processing](../../chapters/12-troubleshooting-and-postprocessing/index.md).

```text
Type: workflow
**sim-id:** fdm-failure-diagnosis<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Evaluate (L5)
Bloom Verb: Judge
Learning Objective: Students evaluate a described print failure by navigating a decision tree that identifies the most likely root cause and recommended fix.

Visual layout:
- Interactive decision tree rendered in p5.js
- Root node: "Where does the failure appear?"
- Branch categories: First Layer / All Layers / Specific Geometry / After Long Run
- Each category branches into symptom nodes (e.g., "Gaps in first layer?", "Lines not bonding?", "Blobs and zits?")
- Leaf nodes show: Failure Name, Root Cause (1–2 sentences), Recommended Fix (numbered list), Related Slicer Setting

Interactive elements:
- Click any branch node to navigate deeper into the tree; breadcrumb trail at top shows path taken
- Each leaf node has a "See Example Photo Description" button — expands a text panel describing what this failure looks like in detail
- "Start Over" button resets to root
- Hover any node to see the full question/description in a tooltip

Tree data covers: warping, first-layer not sticking, first-layer too squished, stringing, under-extrusion, over-extrusion, layer separation, elephant's foot, ringing/ghosting, clogged nozzle, failed mid-print adhesion

Color coding:
- Blue: question/branch nodes
- Orange: symptom confirmation nodes
- Green: leaf nodes (diagnosis + fix)
- Red: safety-related fixes (thermal runaway, nozzle clog fire risk)

Responsive: tree scales to container; on narrow screens, switches from graphical tree to a guided Q&A form.
```

## Related Resources

- [Chapter 12: Print Failures, Troubleshooting, and Post-Processing](../../chapters/12-troubleshooting-and-postprocessing/index.md)
