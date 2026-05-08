---
title: Calibration and Measurement MicroSim
description: Students apply caliper measurement technique by reading simulated caliper displays and calculating the dimensional error and required calibration correction for a printed calibration cube.
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Calibration and Measurement MicroSim

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students apply caliper measurement technique by reading simulated caliper displays and calculating the dimensional error and required calibration correction for a printed calibration cube.

- **Bloom Level:** Apply (L3)
- **Bloom Verb:** Calculate
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Design for Additive Manufacturing and Metrology](../../chapters/11-dfam-and-metrology/index.md).

```text
Type: microsim
**sim-id:** calibration-measurement-sim<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: Calculate
Learning Objective: Students apply caliper measurement technique by reading simulated caliper displays and calculating the dimensional error and required calibration correction for a printed calibration cube.

Canvas layout:
- Left panel (300px): Isometric view of a calibration cube with highlighted measurement faces. Click a face to activate that measurement.
- Center panel (250px): Animated digital caliper display showing a reading for the selected dimension, with the jaw gap visible
- Right panel (150px): Data entry table — student enters the measured values for X, Y, Z dimensions

Visual elements:
- Calibration cube rendered in p5.js with distinct labeled faces (X, Y, Z)
- Digital caliper: realistic LCD display showing mm reading with decimal point; jaws animate to show correct placement
- Three rows in the data table: Designed (20.00), Measured (editable), Error (auto-calculated), Status (Pass/Fail at ±0.3 mm default tolerance)

Interactive controls:
- Click cube face: selects that dimension and animates caliper to measuring position
- Input field: student types their reading; error calculates immediately
- Slider: "Printer Accuracy Level" (Good / Average / Needs Calibration) — changes the simulated measured values to present different scenarios
- Button: "Calculate E-step Correction" — shows formula and computed correction factor if the extruder calibration is the diagnosed root cause

Data:
- Scenario 1 (Good): X=19.97, Y=20.01, Z=19.95 — within tolerance
- Scenario 2 (Under-extrusion): X=19.72, Y=19.74, Z=19.80 — consistent under-sizing
- Scenario 3 (Z issue): X=19.98, Y=19.97, Z=19.60 — Z axis only out

Instructional Rationale: Apply-level objective requires students to use a procedure in a given situation. Simulating calibration cube reading lets students practice the data-gathering and diagnosis steps before working with real hardware.

Responsive: panels reflow to vertical stack on narrow screens.
```

## Related Resources

- [Chapter 11: Design for Additive Manufacturing and Metrology](../../chapters/11-dfam-and-metrology/index.md)
