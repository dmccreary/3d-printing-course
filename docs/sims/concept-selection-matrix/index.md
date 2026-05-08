---
title: Concept Selection Decision Matrix
description: "Apply a weighted decision matrix to select the best design concept from a set of alternatives (Bloom L3–L5: apply, analyze, evaluate)."
status: implemented
library: p5.js
bloom_level: Apply-Analyze-Evaluate
---

# Concept Selection Decision Matrix

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Apply a weighted decision matrix to select the best design concept from a set of alternatives (Bloom L3–L5: apply, analyze, evaluate).

- **Bloom Level:** TBD
- **Bloom Verb:** TBD
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="652" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: The Engineering Design Process](../../chapters/03-engineering-design-process/index.md).

```text
Type: MicroSim
**sim-id:** concept-selection-matrix<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Apply a weighted decision matrix to select the best design concept from a set of alternatives (Bloom L3–L5: apply, analyze, evaluate).

**Description:** An interactive p5.js decision matrix tool. The student can enter up to 5 concepts (columns) and up to 6 criteria (rows), assign weights (1–5) to each criterion, and score each concept on each criterion (1–5). The matrix auto-calculates weighted scores, totals per concept, and highlights the winning concept.

**Canvas layout (700 × 500 px, responsive):**
- Top area: Matrix table with editable cells
  - Column headers: "Criterion", "Weight", then "Concept 1" through "Concept N" (up to 5)
  - Row entries: up to 6 criteria (user-editable text)
  - Weight column: number spinners 1–5
  - Score cells: number spinners 1–5 for each concept × criterion
  - Bottom row: "Weighted Total" — auto-calculated, displayed as a bold number
- The winning concept column is highlighted in green; second-place in yellow
- Controls below the matrix:
  - "Add Concept" button (up to 5)
  - "Add Criterion" button (up to 6)
  - "Reset Matrix" button
  - "Download as CSV" button (generates a comma-separated download of the matrix)
- A bar chart below the matrix shows weighted totals per concept, updating in real time as scores change

**Pre-loaded example:** Phone stand design with 3 concepts (fold-flat, slot-tab, desk-clip) and 5 criteria (structural strength, ease of assembly, print time, no supports needed, adjustable angle). Student can modify or clear to enter their own project.

**Interactions:** All cells are editable. Matrix recalculates and chart updates on every change. Hovering a concept column highlights the entire column. Clicking a concept name opens a text field to rename it.

**Responsive behavior:** On narrow screens, the matrix scrolls horizontally. The bar chart stacks below.
```

## Related Resources

- [Chapter 3: The Engineering Design Process](../../chapters/03-engineering-design-process/index.md)
