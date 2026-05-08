---
title: Engineering Notebook Page Anatomy
description: Identify the required elements of a proper engineering notebook entry and explain why each element matters (Bloom L1–L2: identify, explain).
status: scaffold
library: p5.js
bloom_level: TBD
---

# Engineering Notebook Page Anatomy

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Identify the required elements of a proper engineering notebook entry and explain why each element matters (Bloom L1–L2: identify, explain).

- **Bloom Level:** TBD
- **Bloom Verb:** TBD
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: The Engineering Design Process](../../chapters/03-engineering-design-process/index.md).

```text
Type: interactive-infographic
**sim-id:** notebook-page-anatomy<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Identify the required elements of a proper engineering notebook entry and explain why each element matters (Bloom L1–L2: identify, explain).

**Description:** An interactive p5.js rendering of a sample engineering notebook page spread (left and right pages). Labeled callout arrows point to each key element of good notebook practice. Clicking a callout opens an explanation panel.

**Canvas layout (700 × 480 px, responsive):**
- Background: Cream/off-white grid-paper texture filling both pages
- Left page sample content (rendered as faint "handwriting-style" text and sketches):
  - Date and time at top
  - Project name and page number
  - A hand-drawn sketch of a phone stand bracket with dimension annotations
  - A short prose entry describing the design decision made that day
  - A paste-in label area (gray rectangle) with "Photo: v2 print, front view"
  - Author initials at bottom right
- Right page sample content:
  - Test data table (load vs. deflection)
  - A short "Next Steps" bullet list
  - A second sketch showing a proposed revision
- Callout markers (numbered circles in orange) pointing to: date, project name, sketch with dimensions, prose rationale, paste-in label, initials, data table, revision sketch, next steps

**Interactions:** Clicking any numbered callout circle opens a side panel (or modal overlay) with:
- Element name
- Why it's required (1–2 sentences)
- Common mistake to avoid
- Example of good vs. poor practice for this element
- "Got it" button to dismiss

A "Quiz Me" button at bottom cycles through the callout markers in random order, hiding the labels and asking the student to click the correct element when given its name.

**Responsive behavior:** On narrow screens, both pages render in a single-column scroll; callouts appear as expandable accordion items below the illustration.
```

## Related Resources

- [Chapter 3: The Engineering Design Process](../../chapters/03-engineering-design-process/index.md)
