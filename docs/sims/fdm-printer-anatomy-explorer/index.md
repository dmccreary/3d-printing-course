---
title: FDM Printer Anatomy Explorer
description: Students identify and name the major components of an FDM printer and understand how the four subsystems are organized.
status: scaffold
library: p5.js
bloom_level: Remember (L1)
---

# FDM Printer Anatomy Explorer

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students identify and name the major components of an FDM printer and understand how the four subsystems are organized.

- **Bloom Level:** Remember (L1)
- **Bloom Verb:** Identify
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: FDM Printer Hardware and Operation](../../chapters/08-fdm-printer-hardware/index.md).

```text
Type: diagram
**sim-id:** fdm-printer-anatomy-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Remember (L1)
Bloom Verb: Identify
Learning Objective: Students identify and name the major components of an FDM printer and understand how the four subsystems are organized.

Visual layout:
- Isometric-style schematic of a Cartesian FDM printer (bed-slinger style, similar to Prusa MK3/Ender 3 proportions) drawn with simple geometric shapes in p5.js
- Labeled hotspots on: nozzle, hotend assembly, heat break, extruder motor, PTFE tube (or direct-drive notation), X-axis gantry with belt, Y-axis belt and print bed, Z-axis lead screws, linear rods/bearings, motherboard enclosure, build surface
- Each hotspot is a pulsing circle (color-coded by subsystem)
- Color coding: Orange = extrusion system, Blue = motion system, Red = thermal system, Green = electronics

Interactive elements:
- Hover a hotspot: Reveal a tooltip with the component name, one-sentence description, and subsystem label
- Click a hotspot: Expand an info panel on the right showing: component name, function, common materials, and a "things that go wrong" note
- Toggle buttons at top: "Show Motion System", "Show Extrusion System", "Show Thermal System", "Show Electronics" — dimming other subsystems to highlight the selected one
- A legend at bottom maps subsystem colors to names

Canvas layout:
- Left 60%: printer schematic
- Right 40%: info panel (updates on click)

Responsive design: scales proportionally on window resize; minimum width 320px.
```

## Related Resources

- [Chapter 8: FDM Printer Hardware and Operation](../../chapters/08-fdm-printer-hardware/index.md)
