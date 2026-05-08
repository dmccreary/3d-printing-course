---
title: Career Pathway Navigator
description: Students evaluate different career pathways in additive manufacturing and recommend the most appropriate pathway based on personal goals (immediate employment, college degree, certification, apprenticeship).
status: scaffold
library: p5.js
bloom_level: Evaluate (L5)
---

# Career Pathway Navigator

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students evaluate different career pathways in additive manufacturing and recommend the most appropriate pathway based on personal goals (immediate employment, college degree, certification, apprenticeship).

- **Bloom Level:** Evaluate (L5)
- **Bloom Verb:** Recommend
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: Digital Workflows, Careers, Articulation, and the Capstone Project](../../chapters/16-careers-and-capstone/index.md).

```text
Type: diagram
**sim-id:** am-career-pathways<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Evaluate (L5)
Bloom Verb: Recommend
Learning Objective: Students evaluate different career pathways in additive manufacturing and recommend the most appropriate pathway based on personal goals (immediate employment, college degree, certification, apprenticeship).

Visual layout:
- Central node: "High School AM Course Completion"
- Four branching pathways radiating outward:
  1. Direct Employment (→ Entry-level AM Operator → Senior Technician → Process Engineer)
  2. Community College Articulation (→ AAS Degree → Manufacturing Engineer)
  3. Certification Track (→ NC3/NIMS Certification → Industry Credential → Specialized Roles)
  4. Apprenticeship (→ Registered Apprenticeship → Journeyperson → Lead Technician)
- Each pathway node shows: role title, typical salary range, education required, and time to reach milestone

Interactive elements:
- Click any node: Expand info panel with role description, typical employers, key skills, and links to relevant certification bodies or programs
- "Filter by Goal" buttons: "Fastest to Income", "Highest Long-Term Earnings", "Best for College Prep", "Hands-On Learning" — highlights the most relevant pathway(s) for each goal
- Hover any arrow between nodes: tooltip shows the transition requirements ("needs: 2-year degree or equivalent certification")
- "Salary Range Chart" button: opens a bar chart comparing typical salary ranges at each role tier across all four pathways

Color coding:
- Blue: academic/degree pathway
- Green: certification pathway
- Orange: employment pathway
- Purple: apprenticeship pathway

Canvas: 700×420px diagram + 200px right info panel
Responsive: collapses to vertical layout on narrow screens.
```

## Related Resources

- [Chapter 16: Digital Workflows, Careers, Articulation, and the Capstone Project](../../chapters/16-careers-and-capstone/index.md)
