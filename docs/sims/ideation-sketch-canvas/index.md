---
title: Ideation Sketch Canvas
description: "Apply ideation principles by generating multiple distinct design concepts for a given constraint set (Bloom L3: apply, practice, demonstrate)."
status: implemented
library: p5.js
bloom_level: Apply
---

# Ideation Sketch Canvas

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Apply ideation principles by generating multiple distinct design concepts for a given constraint set (Bloom L3: apply, practice, demonstrate).

- **Bloom Level:** TBD
- **Bloom Verb:** TBD
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: The Engineering Design Process](../../chapters/03-engineering-design-process/index.md).

```text
Type: MicroSim
**sim-id:** ideation-sketch-canvas<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Apply ideation principles by generating multiple distinct design concepts for a given constraint set (Bloom L3: apply, practice, demonstrate).

**Description:** An interactive p5.js canvas that simulates a structured ideation session. The student is given a randomly selected engineering challenge (from a set of five AM-relevant prompts, e.g., "Design a phone stand with no supports," "Design a cable organizer for a desk," "Design a modular hook system for a pegboard") and a 5-minute countdown timer. The canvas is divided into six equal cells, each with a faint "Concept #N" label, simulating a 6-concept ideation sheet.

**Canvas layout (700 × 520 px, responsive):**
- Top bar: Challenge description card (yellow), timer display, and "New Challenge" button
- Main area: 2 × 3 grid of sketch cells (each ~210 × 140 px), each with a "Concept #N" header and a free-draw area (mouse/touch drawing with a light pencil stroke style)
- Bottom bar: "Done — Review My Concepts" button + constraint checklist (checkboxes for the key constraints of the current challenge)

**Interactions:**
- Drawing: click/drag to draw freehand strokes in any cell; right-click or double-tap to erase last stroke
- "New Challenge" randomizes the challenge prompt and clears the canvas (with a confirm dialog to prevent accidental erasure)
- Timer counts down from 5:00; at 0:00 it flashes orange and shows "Time's up — review your concepts"
- "Done — Review My Concepts" opens an overlay with the constraint checklist: student checks which constraints each concept addresses
- "Clear Cell" button (appears on hover of each cell) clears only that cell's strokes

**Responsive behavior:** On narrow screens, the grid collapses to 1 × 6 (single column). Drawing still works via touch.
**Note:** This is a low-fidelity practice tool, not a submission system. Its value is in structured time-pressure ideation, not in the quality of the drawings.
```

## Related Resources

- [Chapter 3: The Engineering Design Process](../../chapters/03-engineering-design-process/index.md)
