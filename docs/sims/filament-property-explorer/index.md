---
title: Filament Property Explorer
description: Students can compare thermoplastic filaments across multiple property dimensions and identify which material best fits a given application scenario.
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# Filament Property Explorer

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students can compare thermoplastic filaments across multiple property dimensions and identify which material best fits a given application scenario.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Compare
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: Materials Science for Additive Manufacturing](../../chapters/06-materials-science/index.md).

```text
Type: microsim
**sim-id:** filament-property-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Compare
Learning Objective: Students can compare thermoplastic filaments across multiple property dimensions and identify which material best fits a given application scenario.

Instructional Rationale: A parameter explorer is appropriate for an Analyze-level objective because students need to examine relationships between properties across multiple materials — something a static table cannot enable. By toggling which property is displayed and filtering materials of interest, students build an accurate mental model of the filament landscape rather than memorizing isolated facts.

Canvas layout:
- Top: Radio button row to select active property: Tensile Strength (MPa) | Elongation at Break (%) | Glass Transition Temp (°C) | Nozzle Temperature (°C)
- Center: Horizontal bar chart — one bar per material, bars sized proportionally to the selected property value
- Left: Material checkboxes to show/hide individual materials (all checked by default)
- Bottom: Info panel — clicking a bar fills the panel with: material name, selected property value with units, and a 2-sentence explanation of what that value means in practice

Data:
- PLA: Tensile 58 MPa, Elongation 6%, Tg 60°C, Nozzle 205°C
- PETG: Tensile 50 MPa, Elongation 35%, Tg 80°C, Nozzle 240°C
- ABS: Tensile 48 MPa, Elongation 15%, Tg 100°C, Nozzle 240°C
- ASA: Tensile 50 MPa, Elongation 12%, Tg 100°C, Nozzle 250°C
- TPU (95A): Tensile 35 MPa, Elongation 500%, Tg −30°C, Nozzle 228°C
- Nylon PA12: Tensile 60 MPa, Elongation 80%, Tg 55°C, Nozzle 255°C
- Polycarbonate: Tensile 65 MPa, Elongation 110%, Tg 145°C, Nozzle 285°C

Interaction:
- Clicking a bar selects it; info panel updates with a property-specific explanation.
- Hovering a bar shows a tooltip with the exact value and unit.
- Toggling the property radio button re-renders bars smoothly.
- Deselecting a material's checkbox fades its bar to 20% opacity.

Color scheme: Each material has a consistent color used across all property views (PLA = green, PETG = teal, ABS = orange, ASA = amber, TPU = purple, Nylon = blue, PC = red).

Responsive behavior: Canvas fills iframe width; chart scales proportionally on resize.
```

## Related Resources

- [Chapter 6: Materials Science for Additive Manufacturing](../../chapters/06-materials-science/index.md)
