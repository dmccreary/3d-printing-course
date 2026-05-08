---
title: Slicer Pipeline Overview
description: Students can describe what happens at each stage of the digital-to-physical pipeline from CAD model to printed part, including the role of the slicer, the G-code file, and the printer firmware.
status: scaffold
library: p5.js
bloom_level: Understand (L2)
---

# Slicer Pipeline Overview

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students can describe what happens at each stage of the digital-to-physical pipeline from CAD model to printed part, including the role of the slicer, the G-code file, and the printer firmware.

- **Bloom Level:** Understand (L2)
- **Bloom Verb:** Explain
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Slicing, G-code, and Toolpaths](../../chapters/07-slicing-and-toolpaths/index.md).

```text
Type: infographic
**sim-id:** slicer-pipeline-overview<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: Explain
Learning Objective: Students can describe what happens at each stage of the digital-to-physical pipeline from CAD model to printed part, including the role of the slicer, the G-code file, and the printer firmware.

Layout:
- Horizontal pipeline with five stages connected by labeled arrows
- Each stage is a rounded rectangle with an icon and a short label
- Arrows between stages show the data format moving between them
- A detail panel (right side or below) populates when a stage is clicked

Stages and detail content:

1. **CAD Model** (icon: cube wireframe)
   Arrow label: "STL / 3MF"
   Detail: "A mathematical description of a closed 3D surface — triangles in STL, richer geometry in 3MF. The model has no layer information, no toolpath, and no material settings. It is just a shape."

2. **Slicer Software** (icon: horizontal slices through a cube)
   Arrow label: "G-code (.gcode)"
   Detail: "The slicer cuts the model into layers, fills each layer with perimeters and infill, adds supports and adhesion features, and applies all temperature and speed settings. Output is a G-code text file."

3. **G-code File** (icon: text document with command lines)
   Arrow label: "Serial / USB / SD / WiFi"
   Detail: "A plain text file of sequential machine commands: movements, temperatures, fan speeds, and extrusion amounts. Typically 1 MB to 50 MB depending on part complexity."

4. **Printer Firmware** (icon: circuit board with microcontroller)
   Arrow label: "Stepper pulses / heater signals"
   Detail: "Firmware (Marlin, Klipper, RepRapFirmware) interprets G-code commands and converts them into stepper motor pulses, heater PWM signals, and fan control signals in real time."

5. **Printed Part** (icon: 3D printed object)
   Detail: "The physical result: layers of fused thermoplastic (or cured resin) forming the geometry defined in the original CAD model, subject to the print parameters chosen in the slicer."

Arrow interactions:
- Hovering the "STL / 3MF" arrow reveals: "STL encodes only triangle geometry. 3MF adds color, materials, and print settings in one package."
- Hovering the "G-code" arrow reveals: "G-code is a decades-old NC machining standard adapted for 3D printing. The same format drives CNC mills and lathes."
- Hovering the "Serial / USB / SD / WiFi" arrow reveals: "G-code can be sent via USB cable, copied to a SD card, or transferred over WiFi — the printer firmware doesn't care which method."

Default state: Stage 2 "Slicer Software" is selected and its detail panel is visible.

Color scheme: Cool blue gradient left-to-right indicating digital-to-physical transformation; the selected stage highlights in a warm amber.

Responsive: Scales to fill iframe width; on narrow screens the pipeline renders vertically instead of horizontally.
```

## Related Resources

- [Chapter 7: Slicing, G-code, and Toolpaths](../../chapters/07-slicing-and-toolpaths/index.md)
