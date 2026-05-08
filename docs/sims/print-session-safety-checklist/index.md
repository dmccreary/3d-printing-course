---
title: Print Session Safety Checklist
description: Students assess the safety adequacy of a print setup by working through a structured checklist and identifying which risk areas need attention before beginning a print session.
status: scaffold
library: p5.js
bloom_level: Evaluate (L5)
---

# Print Session Safety Checklist

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students assess the safety adequacy of a print setup by working through a structured checklist and identifying which risk areas need attention before beginning a print session.

- **Bloom Level:** Evaluate (L5)
- **Bloom Verb:** Assess
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Safety, Ethics, and Sustainability in 3D Printing](../../chapters/09-safety-ethics-sustainability/index.md).

```text
Type: infographic
**sim-id:** print-session-safety-checklist<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Evaluate (L5)
Bloom Verb: Assess
Learning Objective: Students assess the safety adequacy of a print setup by working through a structured checklist and identifying which risk areas need attention before beginning a print session.

Layout:
- Four collapsible card panels: Fume & Particle Risk, Fire Safety, Chemical (Resin), IP & Ethics
- Each card shows an icon, a risk-level badge (Low / Medium / High — determined by user answers), and a list of checklist questions

Interactive elements:
- Each question has a Yes / No / N/A radio button
- As the user answers, the card's risk-level badge updates dynamically:
  - All Yes = Green (Low risk)
  - Mixed = Yellow (Medium — hover shows which gaps remain)
  - Multiple No = Red (High — hover shows specific unmet criteria)
- Overall "Session Readiness" indicator at the top: Ready to Print / Review Required / Do Not Start
- "Why does this matter?" tooltip on each question (hover reveals 1-sentence rationale)
- Reset button clears all answers

Scenarios (optional guided mode):
- Dropdown: Select a scenario (e.g., "ABS print, unventilated classroom", "PLA print, well-ventilated lab") — pre-fills some answers and highlights the residual risks

Visual style:
- Clean card layout with clear icons for each risk category
- Color transitions for risk badges (smooth green/yellow/red)
- Accessible contrast ratios

Responsive: stacks cards vertically on narrow screens; minimum 320px.
```

## Related Resources

- [Chapter 9: Safety, Ethics, and Sustainability in 3D Printing](../../chapters/09-safety-ethics-sustainability/index.md)
