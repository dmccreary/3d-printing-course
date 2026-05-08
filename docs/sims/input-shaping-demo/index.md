---
title: Input Shaping and Speed Comparison
description: Students explain how input shaping cancels resonance artifacts by comparing simulated surface quality at different print speeds with and without resonance compensation.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Input Shaping and Speed Comparison

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students explain how input shaping cancels resonance artifacts by comparing simulated surface quality at different print speeds with and without resonance compensation.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Explain
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 13: Modern Hardware — Multi-Material, Motion, and Speed](../../chapters/13-modern-hardware/index.md).

```text
Type: microsim
**sim-id:** input-shaping-demo<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: Explain
Learning Objective: Students explain how input shaping cancels resonance artifacts by comparing simulated surface quality at different print speeds with and without resonance compensation.

Canvas layout:
- Left panel (200px): Controls — speed slider (50–600 mm/s), toggle "Input Shaping On/Off", toggle "Pressure Advance On/Off"
- Center panel (350px): Simulation of a top-down view of a square being printed, showing the actual deposited path vs. the commanded path. Without input shaping at high speeds, the deposited path shows oscillating error. With input shaping, it matches the command.
- Right panel (150px): "Surface Quality Score" (0–100) calculated from the simulated path deviation, plus indicators for "Ringing visible: Yes/No" and "Corner quality: Poor/Good/Excellent"

Data Visibility:
- At 60 mm/s without input shaping: path deviation <0.05 mm, no visible ringing
- At 300 mm/s without input shaping: ringing oscillations ±0.5 mm visible on straight walls after corners
- At 300 mm/s with input shaping: path deviation <0.08 mm, no visible ringing
- At 600 mm/s with input shaping: path deviation <0.15 mm, minor corner rounding visible
- With pressure advance off at corners: small blob visible at corner endpoint, gap at start of new wall

Step-through mode: "Step Through a Corner" button shows one corner being printed frame by frame, with annotations showing when pressure advance fires relative to the head position change.

Instructional Rationale: Step-through with data visibility appropriate for Understand level. Students need to see the deviation between commanded and actual path to understand why input shaping matters — prose alone cannot convey the magnitude of the correction.

Responsive: panels reflow vertically on screens below 600px.
```

## Related Resources

- [Chapter 13: Modern Hardware — Multi-Material, Motion, and Speed](../../chapters/13-modern-hardware/index.md)
