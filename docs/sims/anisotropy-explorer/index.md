---
title: Anisotropy Explorer
description: Analyze how build orientation affects mechanical strength in FDM parts by applying tensile and bending loads in different orientations (Bloom L4: examine relationships, distinguish).
status: scaffold
library: p5.js
bloom_level: TBD
---

# Anisotropy Explorer

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Analyze how build orientation affects mechanical strength in FDM parts by applying tensile and bending loads in different orientations (Bloom L4: examine relationships, distinguish).

- **Bloom Level:** TBD
- **Bloom Verb:** TBD
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: AM Standards, Process Families, and Industrial AM](../../chapters/02-standards-and-process-families/index.md).

```text
Type: MicroSim
**sim-id:** anisotropy-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Analyze how build orientation affects mechanical strength in FDM parts by applying tensile and bending loads in different orientations (Bloom L4: examine relationships, distinguish).

**Description:** An interactive p5.js simulation showing a rectangular test bar printed in FDM. The student can select build orientation (flat/XY, on-edge, upright/Z) using radio buttons, then apply either a tensile pull or a bending moment using buttons.

**Canvas layout (600 × 420 px, responsive):**
- Top third: The test bar rendered as a 3D-perspective isometric box, with layer lines drawn horizontally in the current orientation. Layer lines are color-coded (blue = XY, green = on-edge, orange = vertical/Z).
- Middle section: A strength bar gauge (0–100 %, green to red gradient) showing relative strength in the selected load direction. Values are approximate but pedagogically accurate (XY tensile ≈ 90 %, on-edge tensile ≈ 75 %, Z tensile ≈ 45 % for typical PLA).
- Bottom section: A one-sentence explanation that updates to describe why the strength is high or low for the current combination.

**Controls:**
- Radio group "Build Orientation": Flat (XY), On-Edge, Upright (Z)
- Radio group "Load Direction": Tensile (pull apart), Bending (snap across layers), Shear (slide layers)
- Button "Apply Load" — triggers an animated bar deformation and snapping effect on weak combinations; a subtle flex on strong combinations

**Interactions:** All controls update the display immediately. The strength gauge animates smoothly when parameters change. When a combination results in < 50 % strength, the test bar shows a red crack line across the weakest layer interface.

**Responsive behavior:** Canvas scales to fit window width while maintaining aspect ratio.
```

## Related Resources

- [Chapter 2: AM Standards, Process Families, and Industrial AM](../../chapters/02-standards-and-process-families/index.md)
