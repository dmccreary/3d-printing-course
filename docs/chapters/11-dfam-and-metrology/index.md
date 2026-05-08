---
title: Design for Additive Manufacturing and Metrology
description: DfAM principles — overhangs, bridging, orientation strategy, support minimization, tolerances, lattices, topology optimization, and generative design — plus measurement skills with calipers, micrometers, GD&T basics, and calibration procedures.
generated_by: claude skill chapter-content-generator
date: 2026-05-07 23:11:52
version: 0.08
---

# Design for Additive Manufacturing and Metrology

!!! mascot-welcome "Welcome to Chapter 11"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Benchy waves hello">
    This chapter is about making the design process work with the printer instead of against it. Most beginners download models and print them as-is. DfAM practitioners design specifically for how additive processes build parts — and the result is stronger, faster-printing, lower-waste parts. The metrology section closes the loop: designing well means nothing if you can't measure whether the result actually meets your requirements.

## Summary

This chapter teaches Design for Additive Manufacturing (DfAM) — the design rules that emerge from how AM processes actually build parts: overhangs, bridging, part-orientation strategy, support minimization, wall thickness rules, hole and slot tolerances, self-supporting angles, lattice structures, topology optimization, generative design, and lightweighting. The metrology half teaches dimensional accuracy, calipers, micrometers, GD&T basics, calibration cubes, quality-control procedures, and repeatability.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. DfAM Principles (Concept 155)
2. Overhangs (Concept 156)
3. Bridging (Concept 157)
4. Part Orientation Strategy (Concept 158)
5. Support Minimization (Concept 159)
6. Wall Thickness Rules (Concept 160)
7. Hole And Slot Tolerances (Concept 161)
8. Tolerance Allowances (Concept 162)
9. Self-Supporting Angles (Concept 163)
10. Lattice Structures (Concept 164)
11. Topology Optimization (Concept 165)
12. Generative Design (Concept 166)
13. Lightweighting (Concept 167)
14. Dimensional Accuracy (Concept 168)
15. Calipers (Concept 169)
16. Micrometers (Concept 170)
17. GD&T Basics (Concept 171)
18. Calibration Cube (Concept 172)
19. Quality Control Procedures (Concept 173)
20. Repeatability And Reproducibility (Concept 174)

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations and History of Additive Manufacturing](../01-foundations-and-history/index.md)
- [Chapter 2: AM Standards, Process Families, and Industrial AM](../02-standards-and-process-families/index.md)
- [Chapter 4: Computer-Aided Design and Modeling](../04-cad-and-modeling/index.md)
- [Chapter 7: Slicing, G-code, and Toolpaths](../07-slicing-and-toolpaths/index.md)
- [Chapter 8: FDM Printer Hardware and Operation](../08-fdm-printer-hardware/index.md)

---

## What Is DfAM — and Why Does It Matter?

**Design for Additive Manufacturing (DfAM)** is the practice of designing parts with additive processes in mind — exploiting what AM does well and avoiding what it does poorly. It's not a separate discipline from engineering design; it's how engineering design applies to a specific manufacturing method.

Subtractive manufacturing (CNC milling, turning) produces parts by cutting material away. The design rules for those processes center on tool access — you can only cut what a tool can reach. AM builds parts layer by layer, which creates an entirely different set of design rules:

- Internal complexity is nearly free — a hollow lattice structure is no harder to print than a solid block.
- Overhanging geometry requires support material or a specific orientation choice.
- Surface quality depends on orientation relative to the layer direction.
- Tolerances and shrinkage must be anticipated in the design stage to get dimensions right.

Understanding these rules turns you from a person who adapts existing designs to a person who engineers parts from the beginning for the process that will make them.

---

## Overhangs and Self-Supporting Angles

An **overhang** is any geometry that extends horizontally outward beyond the layer below it. When an FDM nozzle deposits a bead of plastic, that bead needs something beneath it to support it as it cools. If there's nothing below — or if the previous layer is too far offset — the material droops, curls, or fails to bond properly.

The rule of thumb most practitioners use is the **45-degree guideline**: any surface at 45° or more from horizontal (measured from the vertical, not the horizontal) can usually print without support in FDM. Surfaces at angles less than 45° from horizontal — meaning they overhang more than 45° — need either a support structure or a redesign.

This threshold angle is sometimes called the **self-supporting angle**. It's not a hard physical constant: it depends on layer height, print speed, material, cooling fan effectiveness, and even ambient temperature. A well-tuned printer with a fast-spinning cooling fan can often handle 55–60° overhangs. A slower printer running ABS (which needs less cooling to avoid warping) may struggle above 40°. The 45° rule is a starting point for designing, not an absolute guarantee.

**Bridging** is the related concept: printing a horizontal span between two support points with no material below. Think of printing the top of a doorway arch. Most printers handle bridges remarkably well if the bridge is short (under ~60 mm for most setups) because the plastic extrudes as a continuous strand that cools before gravity pulls it down. Longer bridges sag in the middle; the solution is either to limit bridge spans in the design, use supports, or orient the part so the bridge becomes a shorter span.

!!! mascot-thinking "Overhangs Are a Gravity Problem"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Benchy thinks carefully">
    Here's a way to think about the 45° rule that makes it stick: you're essentially asking whether a bead of plastic has enough contact with the layer below it to not sag before it solidifies. At 45°, each layer only steps outward by one layer height for every layer height of vertical travel — so about half the bead is still supported. Steeper than 45°, and you're hanging more plastic in the air than is supported. Gravity doesn't care about your design intent.

---

## Part Orientation Strategy

Choosing how to orient a part in the build volume is one of the most consequential DfAM decisions — it affects support volume, surface finish, mechanical strength, and print time. Before placing a model in the slicer, ask four questions:

1. **Where are the overhangs?** Orient the part to eliminate or minimize overhanging surfaces.
2. **Which surface needs the best finish?** The top surface of a print has the best surface quality (no layer lines visible from above); sides show layer lines; the bottom touching the build surface shows the texture of the build plate.
3. **Where will the load be applied?** FDM parts are anisotropic — strongest in the XY plane, weakest in Z (between layers). Orient the part so the primary load path runs in XY, not Z.
4. **What's the tallest dimension?** Parts that can be laid flat print faster and with less Z-axis travel variability than parts standing on end.

These four goals frequently conflict. A part with a critical mating surface (needs best finish), complex underside geometry (needs orientation to avoid supports), and a tensile load path in one direction may not have a single "perfect" orientation. Experienced designers iterate: try several orientations in the slicer preview, evaluate the support volume and layer direction vs. load direction, and choose the best available trade-off.

---

## Support Minimization

**Support structures** allow you to print geometry that would otherwise fail, but they come with costs: added material, added print time, post-processing time to remove them, and surface marks where they contact the model. **Support minimization** is the DfAM practice of reducing required support through design choices rather than relying on the slicer to generate it automatically.

Strategies for minimizing supports:

- **Chamfer instead of horizontal overhangs** — replace a horizontal shelf (requires support) with a 45° chamfer (self-supporting).
- **Rotate holes to avoid unsupported ceilings** — a hole printed horizontally has a flat ceiling that droops; rotate the hole so it's vertical, and the "ceiling" is now a dome or series of bridged arcs.
- **Design with the teardrop technique** — for vertical holes, use a teardrop profile (circular cross-section with a pointed top) that eliminates the flat unsupported arc at the ceiling of the hole.
- **Segment complex parts** — split a complex shape into multiple simpler printable parts that assemble after printing, each with better orientation options.
- **Increase overhang angles in the design** — if a feature has a 40° overhang (just below the self-supporting threshold), redesigning it to 46° may eliminate the need for a support entirely.

---

## Wall Thickness Rules and Hole Tolerances

**Wall thickness** is not about aesthetics — it's about whether plastic can actually be deposited and whether the resulting wall has any structural integrity. The minimum printable wall thickness for FDM is approximately **two extrusion widths**, because a wall needs an outer and an inner perimeter to be structurally coherent. With a 0.4 mm nozzle, that's about 0.8 mm minimum — and in practice 1.2–2.0 mm is more reliable. Walls thinner than the nozzle diameter simply cannot be printed.

**Hole and slot tolerances** are where beginning designers are often surprised. A hole designed to be exactly 5.0 mm in diameter typically measures 4.6–4.8 mm when printed. Why? Two effects:

1. **Radial shrinkage** — as the plastic cools, it contracts slightly inward.
2. **Chord approximation** — circles in STL files are approximated as polygons; thin edges of those polygons contribute to the apparent undersizing.

The standard compensation strategy is to add a **tolerance allowance**: design holes 0.2–0.5 mm larger than the intended clearance fit, depending on the material and printer. This must be determined empirically on your specific printer — print a calibration part with holes from 3.0 mm to 8.0 mm, measure each actual diameter with calipers, and calculate the consistent offset to apply in your CAD models.

**Tolerance allowances** also affect mating parts. A shaft and bearing designed for 0.1 mm clearance in the CAD model may be a press fit or may rattle, depending on your printer's dimensional accuracy. The engineering design process applies here: prototype, measure, iterate.

The following table summarizes starting-point tolerance allowances for FDM with a 0.4 mm nozzle in PLA:

| Feature Type | Design Allowance | Notes |
|---|---|---|
| Clearance fit hole (shaft passes through) | +0.3 to +0.5 mm | Larger for longer holes |
| Press fit hole (shaft press-fits in) | +0.0 to +0.1 mm | Test on your specific printer |
| Slot width | +0.2 mm | Depends on slot orientation |
| Threaded hole (tapping) | Standard drill size | Post-process with tap; don't print threads |
| External feature width | -0.1 to -0.2 mm | Extrusion width causes over-sizing |

#### Diagram: DfAM Rules Explorer

<iframe src="../../sims/dfam-rules-explorer/main.html" width="100%" height="540px" scrolling="no"></iframe>

<details markdown="1">
<summary>DfAM Rules Explorer</summary>
Type: infographic
**sim-id:** dfam-rules-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Understand (L2)
Bloom Verb: Explain
Learning Objective: Students explain the key DfAM design rules — overhang angle, bridging, wall thickness, hole tolerance, and self-supporting geometry — by examining cross-section diagrams and reading hover explanations.

Layout:
- Grid of 6 rule cards arranged 3×2:
  1. Overhang Angle (shows cross-sections at 30°, 45°, 60° with quality indicators)
  2. Bridging (shows successful short bridge vs. sagging long bridge)
  3. Wall Thickness (shows walls from 0.4 mm to 2.4 mm with printability indicators)
  4. Hole Tolerance (shows designed vs. actual hole size with offset annotation)
  5. Self-Supporting Arch (teardrop technique vs. flat-ceiling hole)
  6. Support Minimization (chamfer replaces horizontal shelf)

Interactive elements:
- Click any card: Expand to full-screen view with detailed cross-section diagram and explanatory text
- Hover any element within a card: Show tooltip with the rule name and one-sentence rationale
- Toggle "FDM / Resin" button: Updates each card to show how the rule differs between process types
- "Design Quiz" button: Presents a simplified cross-section of a part and asks "Does this need support?" with Yes/No buttons and feedback

Visual style:
- Each card has a header color coded to difficulty (green = easy to achieve, yellow = moderate, red = requires careful planning)
- Cross-section diagrams use: blue = desired geometry, orange = problematic zone, green = well-designed outcome

Responsive: 3×2 grid collapses to 2×3 then 1×6 on narrow screens.
</details>

---

## Lattice Structures, Topology Optimization, and Lightweighting

One of AM's most compelling advantages over subtractive manufacturing is the ability to create **internal complexity** without additional cost or machining steps. Three related techniques exploit this capability.

**Lattice structures** are repeating geometric frameworks that fill a volume with struts and voids instead of solid material. A part with a gyroid, honeycomb, or octet truss internal structure can achieve 60–80% of the stiffness of a solid part while using 20–40% of the material. Slicers like Cura and PrusaSlicer have built-in infill pattern options that are essentially lattice structures — the gyroid and honeycomb infills familiar from Chapter 7 are exactly this concept. More advanced lattice designs (graded density, conformal lattices that follow surface curvature) require CAD-level design rather than slicer settings.

**Topology optimization** is a computational technique that uses Finite Element Analysis (FEA) to find the minimum-material structure that carries a specified load while maintaining acceptable stress levels. You define the design space (maximum allowable volume), loading conditions (force magnitude and direction), boundary conditions (where the part is fixed), and performance targets (maximum deflection or stress). The algorithm iteratively removes material from low-stress regions until the target is met. The result is an organically shaped structure — looking almost biological — that couldn't be economically manufactured by any subtractive method but is straightforward to 3D print.

**Generative design** extends this concept: instead of one optimized design, generative design software (Fusion 360, nTopology) produces multiple design alternatives optimized for different manufacturing methods, material choices, or performance objectives simultaneously. You select from a gallery of algorithmically generated options based on your priorities.

**Lightweighting** is the application goal: reducing part mass while maintaining structural performance. For aerospace and automotive applications, every gram matters. For consumer products, lightweighting reduces material cost and print time. DfAM lightweighting strategies include hollow shells with ribbed internal reinforcement, lattice infill, topology-optimized geometry, and multi-material designs where stiff material is placed only where stresses are highest.

!!! mascot-tip "Topology Optimization Is a Starting Point, Not a Final Part"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Benchy gives practical advice">
    The organic shapes that come out of topology optimization look impressive, but they often have tiny wall sections, sharp stress concentrations, and surfaces that are difficult to print cleanly. Treat the optimizer's output as a design concept, not a production file. Smooth the surfaces, thicken minimum walls to at least 2× your nozzle diameter, and check for printability before committing to a print.

---

## Measuring What You Made: Introduction to Metrology

You've designed with DfAM in mind. You've printed the part. Now comes the question that determines whether all that work actually produced what you intended: **does it fit the specification?** This is the domain of **metrology** — the science of measurement.

**Dimensional accuracy** is the degree to which a printed part matches the dimensions in its CAD model. In FDM, dimensional accuracy is affected by:

- Thermal shrinkage (plastic contracts as it cools)
- E-step calibration (incorrect extrusion multiplier)
- Belt tension and backlash in the motion system
- Elephant's foot on the first layer
- Layer height variation from Z-axis lead screw pitch errors

No FDM printer is perfectly accurate. Understanding the characteristic error profile of your specific machine — which dimensions it consistently under- or over-produces, and by how much — lets you compensate in CAD before printing.

### Calipers

**Calipers** are the primary metrology tool for 3D printing quality control. A digital caliper can measure outside dimensions, inside dimensions (bore diameters), depth, and step heights with a resolution of 0.01 mm and typical accuracy of ±0.02 mm. Three measurement modes are used:

- **Outside jaws** — grip the exterior of a feature (wall-to-wall distance, overall part size)
- **Inside jaws** — expand into a bore or slot (hole diameter, slot width)
- **Depth rod** — measures depth of a hole or step from the face

Correct caliper technique matters: jaws must be perpendicular to the measured surface; don't tighten the jaws (they should close gently under zero force for accurate readings); zero the caliper before each measurement session (check that the jaws close to 0.00 mm before measuring).

### Micrometers

**Micrometers** provide finer resolution than calipers — typically 0.001 mm (1 µm) resolution with ±0.002 mm accuracy. An outside micrometer measures over the flat thimble and anvil faces. It's the right tool when you need to verify a critical dimension like a shaft diameter or verify that a flat surface is within tolerance.

Micrometer technique: close the thimble using the ratchet stop (not the thimble barrel directly) — the ratchet ensures consistent, low clamping force that doesn't deform soft materials. Read the main scale (1 mm divisions), the thimble scale (0.01 mm divisions), and the vernier scale if present (0.001 mm).

### GD&T Basics

**Geometric Dimensioning and Tolerancing (GD&T)** is the engineering language for specifying not just dimensions but the allowable variation in shape, orientation, and position. A simple linear tolerance (5.0 ± 0.2 mm) tells you the allowable range for a length. GD&T adds symbols for flatness, roundness, perpendicularity, position, and concentricity — geometric properties that a linear measurement can't capture.

For 3D printing purposes, the most relevant GD&T concepts are:

- **Flatness** — how flat is a face? A warped PLA print may have a bottom face that's within 0.5 mm flatness — you need to know whether your application tolerates that.
- **Roundness (circularity)** — how close is a hole to a true circle? FDM holes are slightly polygonal due to STL faceting and layer stacking.
- **Position** — are hole centers where the CAD model says they are, relative to a datum?

A full GD&T course is beyond the scope of this textbook, but understanding that GD&T exists — and that it's the formal language for specifying and communicating dimensional requirements — prepares you for engineering drawings in co-op, apprenticeship, or post-secondary manufacturing programs.

---

## Calibration Cubes and Quality Control

The **calibration cube** is the standard diagnostic print for FDM dimensional accuracy assessment. A 20 mm × 20 mm × 20 mm cube printed from your chosen material allows you to measure:

- X dimension (width)
- Y dimension (depth)
- Z dimension (height)

Any consistent offset from 20.00 mm indicates a calibration error in that axis. Common findings:

- X and Y slightly under-sized (e.g., 19.85 mm): extruder steps-per-mm is too low, or belt tension is off.
- X and Y slightly over-sized (e.g., 20.15 mm): extruder is over-extruding.
- Z under-sized (e.g., 19.75 mm): Z lead screw steps-per-mm is miscalibrated.
- X and Y are different from each other: one axis belt is at different tension than the other.

Measuring a calibration cube is also good practice for developing caliper technique — it's a simple geometry with clearly defined measurement planes.

**Quality control (QC) procedures** for a production context (school print farm, or a student operating a printer for others) formalize the measurement and acceptance process:

1. Define the inspection dimensions and tolerances for a part before printing.
2. Print a first article and measure all critical dimensions.
3. Compare measurements to the tolerance specification.
4. Determine pass/fail and document results.
5. If failing: diagnose root cause (calibration, material shrinkage, design issue) and correct before the full run.

#### Diagram: Calibration and Measurement MicroSim

<iframe src="../../sims/calibration-measurement-sim/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Calibration Cube Measurement MicroSim</summary>
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
</details>

### Repeatability and Reproducibility

**Repeatability** is the ability to produce the same result when repeating a process under the same conditions. Print the same model three times on the same printer without changing any settings — do the dimensions agree? **Reproducibility** is a broader property: can the same model be printed on a different printer (or by a different operator) and still fall within the specification?

In a school lab, both matter. If five printers in the room all print the same calibration cube and the X dimensions range from 19.60 mm to 20.10 mm, the process lacks reproducibility — and any part designed for assembly must account for the full range of variation, not just the average. This is why systematic QC — not just "it looks right" — matters for real engineering applications.

---

## Key Takeaways

- DfAM means designing parts to work with additive processes, not despite them — exploiting internal complexity while respecting overhang, bridging, and wall constraints.
- The 45° self-supporting angle rule is a reliable starting point for FDM overhang design; the exact threshold depends on material, cooling, and speed.
- Bridging can span ~60 mm in well-tuned FDM setups; longer spans need supports or redesign.
- Part orientation controls surface finish, mechanical strength (anisotropy), and support volume — orient with the primary load in XY, not Z.
- Hole diameters in FDM print undersized by 0.2–0.5 mm; design with tolerance allowances and verify on your specific printer.
- Lattice structures, topology optimization, and generative design exploit AM's ability to produce complex internal geometry — these strategies produce lighter, often stronger parts.
- Dimensional accuracy measurement requires calipers (±0.02 mm) for routine QC and micrometers (±0.002 mm) for critical dimensions.
- A 20 mm calibration cube reveals consistent dimensional errors in X, Y, and Z; the error pattern diagnoses the root cause.
- GD&T formalizes geometric specifications beyond linear dimensions — flatness, roundness, position — essential for engineering drawings.
- Repeatability (same printer, same settings) and reproducibility (different printers or operators) are distinct properties; both matter for parts used in assembly.

??? question "Check Your Understanding: Why Are FDM Parts Strongest in XY and Weakest in Z? — Click to Reveal"
    FDM parts are built by depositing beads of molten plastic that fuse to the layer below. Within each layer (XY), the plastic flows continuously and bonds strongly. Between layers (Z), the bond is formed by melted filament from above fusing to the cooled layer below — a partial melt bond that is weaker than the continuous intra-layer structure. When a tensile load is applied in Z (pulling layers apart), it's loading precisely this weaker inter-layer interface. This orientation-dependent strength is called anisotropy, and it's why DfAM emphasizes aligning load paths with the XY plane.

!!! mascot-celebration "You Can Design AND Measure"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Benchy celebrates with you">
    This chapter gave you two complementary skills: designing parts that work with the printer, and measuring parts to know whether the design worked. That's the full loop — design, print, measure, iterate — and it's the engineering design process applied to manufacturing. Chapter 12 awaits with troubleshooting and post-processing, where you'll put both skills to use diagnosing real print failures.
