---
title: Slicing, G-code, and Toolpaths
description: Learn how slicer software translates CAD geometry into printer instructions — covering G-code, layer height, infill, speed, temperature, supports, and slicer profiles.
generated_by: claude skill chapter-content-generator
date: 2026-05-07 21:47:36
version: 0.08
---

# Slicing, G-code, and Toolpaths

!!! mascot-welcome "Welcome to Chapter 7"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Benchy waves hello">
    Welcome to the chapter where your digital model finally becomes a physical object — at least in the form of instructions. Slicing is the translation step between CAD and printer, and it's where most of the decisions that determine print quality actually happen. By the end of this chapter, you'll be able to read a slice file, explain what every major slicer setting does, and build a slicer profile that produces reliable results. I've been sliced approximately ten thousand times. I have opinions on this topic.

## Summary

This chapter covers the slicer software that turns CAD geometry into machine instructions. You'll learn the G-code that printers actually execute, every key slicer parameter (layer height, infill density and pattern, wall count, print speed, retraction, temperatures, cooling fan, adhesion type), how supports work, how slicer profiles are constructed and reused, and specialized print modes including vase mode, fuzzy skin, and cloud slicing.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

1. Slicer Software (Concept 83)
2. G-code Basics (Concept 84)
3. G-code Reading (Concept 85)
4. Layer Height (Concept 86)
5. First Layer Settings (Concept 87)
6. Wall Count (Concept 88)
7. Infill Density (Concept 89)
8. Infill Patterns (Concept 90)
9. Print Speed (Concept 91)
10. Travel Moves (Concept 92)
11. Retraction Settings (Concept 93)
12. Print Temperature (Concept 94)
13. Bed Temperature (Concept 95)
14. Cooling Fan Settings (Concept 96)
15. Adhesion Type (Concept 97)
16. Skirt Brim Raft (Concept 98)
17. Support Structures (Concept 99)
18. Tree Supports (Concept 100)
19. Support Interface (Concept 101)
20. Slicer Profiles (Concept 102)
21. Cloud Slicing (Concept 211)
22. Vase Mode (Concept 269)
23. Fuzzy Skin (Concept 270)

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: AM Standards, Process Families, and Industrial AM](../02-standards-and-process-families/index.md)
- [Chapter 4: Computer-Aided Design and Modeling](../04-cad-and-modeling/index.md)
- [Chapter 5: 3D File Formats and Mesh Geometry](../05-file-formats-and-mesh/index.md)
- [Chapter 6: Materials Science for Additive Manufacturing](../06-materials-science/index.md)

---

## What a Slicer Does

Your CAD model — an STL or 3MF file — is a description of a shape in three-dimensional space. Your 3D printer, however, does not understand shapes. It understands a sequence of movement and temperature commands: move the nozzle here, heat the bed to this temperature, push this much filament through. The job of converting a shape description into movement commands belongs to **slicer software**.

A slicer takes your mesh geometry, cuts it into horizontal layers at the chosen layer height, fills each layer with a toolpath (the specific path the nozzle will follow to deposit material), and outputs a G-code file containing the complete sequence of commands to print the object. It also adds all the structural elements that don't exist in your CAD file — infill, perimeters, support structures, and bed adhesion features. Calling a slicer just a "converter" undersells it: a skilled operator configuring a slicer is making dozens of engineering decisions that directly determine whether the print succeeds and how strong the result will be.

Several slicer applications dominate the desktop 3D printing market. The leading options include:

- **Ultimaker Cura** — free, widely used, large plugin ecosystem, excellent for FDM beginners
- **PrusaSlicer** — open-source, derived from Slic3r, strong support for Prusa printers but works with any FDM machine
- **OrcaSlicer** — community fork of Bambu Studio, aggressive speed optimization, growing fast
- **Bambu Studio** — tightly integrated with Bambu Lab hardware, cloud-enabled, automated calibration
- **ideaMaker** — used with Raise3D printers, strong in professional settings
- **Simplify3D** — commercial (paid), historically popular for its fine-grained manual control

All of these slicers perform the same fundamental task; they differ in interface philosophy, default presets, and which advanced features they expose. Once you understand what each parameter does conceptually, switching between slicers is straightforward — the knobs have different labels but they control the same physics.

The interactive diagram below illustrates the complete pipeline from your CAD file to a physical printed part. Click each stage to see what happens at that step and which file format or data type moves between stages.

#### Diagram: Slicer Pipeline Overview

<iframe src="../../sims/slicer-pipeline-overview/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Slicer Pipeline Overview Interactive Infographic</summary>
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
</details>

## G-code: The Language of 3D Printers

Before you configure a single slicer setting, it's worth spending a few minutes with the file that the slicer produces — G-code. Understanding what G-code looks like, and what a handful of common commands mean, gives you a mental model for why slicer settings work the way they do. You are not expected to write G-code from scratch; you are expected to read it and understand what you're looking at.

G-code is a plain text format originally developed for CNC machining in the 1950s and later adapted for 3D printing. Each line is a command. Commands that begin with `G` are geometric moves; commands that begin with `M` control machine state (temperatures, fans, motors). Parameters on each line are single-letter arguments: `X`, `Y`, `Z` for position in millimeters; `F` for feedrate in millimeters per minute; `E` for extruder position in millimeters of filament; `S` for a setting value (usually temperature in degrees Celsius).

Here is a short, annotated excerpt from a real start-of-print G-code sequence. Read through each line — the comments after the semicolons explain exactly what each command does:

```gcode
G28          ; Home all axes (move X, Y, Z to their endstops)
G92 E0       ; Reset extruder position to zero
M104 S215    ; Set hotend target to 215°C — but don't wait, keep going
M140 S60     ; Set bed target to 60°C — don't wait
M109 S215    ; Wait here until hotend actually reaches 215°C
M190 S60     ; Wait here until bed actually reaches 60°C

G1 Z0.2 F300          ; Lift nozzle to first layer height (0.2 mm), slowly
G1 X10 Y10 F3000      ; Move to print start position (no extrusion)
G1 X100 Y10 E8 F1500  ; Move 90 mm while extruding 8 mm of filament
G1 X100 Y20 E9.6 F1500; Turn the corner, extrude proportionally
```

The `E` parameter deserves special attention because it controls the actual deposition of material. Every time the nozzle moves while `E` increases, filament is being pushed through the nozzle. When the nozzle moves without an `E` parameter — or with `E` staying the same — that is a **travel move**: the nozzle relocates without depositing material. Travel moves are where stringing problems originate if retraction isn't set correctly, which is why slicer settings for retraction directly correspond to the `E` value behavior between travel moves.

!!! mascot-thinking "A Key Principle: G-code Is Just Instructions"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Benchy thinks carefully">
    Here's a thought worth sitting with: your slicer generates tens of thousands of G-code lines for a simple part. Every slicer setting you adjust — layer height, speed, temperature — ultimately changes specific numbers in those lines. When a print fails, the failure is almost always traceable to one or a few specific G-code values being wrong for the material and geometry. Reading G-code, even just skimming it, gives you a direct connection to what the machine is actually being told to do.

## Layer Height and the First Layer

**Layer height** is the single most consequential slicer setting. It controls the thickness of each deposited layer in millimeters, and it cascades into almost every other aspect of print quality and speed. A smaller layer height produces finer surface detail and more discrete layers, but requires more layers to print the same height — directly increasing print time. A larger layer height prints faster but produces a staircase-stepped surface finish.

There is a physical constraint that governs the useful range of layer heights: the nozzle diameter. A standard FDM nozzle is 0.4 mm in diameter. For reliable layer adhesion and extrusion consistency, layer height should be between 25% and 75% of the nozzle diameter. This puts the practical range at **0.1 mm to 0.3 mm** for a 0.4 mm nozzle. The sweet spot for most general-purpose printing is 0.2 mm — exactly 50% of the nozzle diameter — which balances detail, strength, and print time.

\[ \text{Layer Height Range} = 0.25 \times d_{\text{nozzle}} \text{ to } 0.75 \times d_{\text{nozzle}} \]

Going above 75% of nozzle diameter causes the layer to be too tall for the nozzle to properly flatten and bond it to the layer below, producing weak layer adhesion. Going below 25% causes inconsistent extrusion and can leave gaps or produce excessive back-pressure.

The table below summarizes the trade-offs across common layer height choices for a 0.4 mm nozzle. These values are representative; actual print times depend on part geometry and other settings.

| Layer Height | Quality | Speed | Typical Use Case |
|---|---|---|---|
| 0.08–0.12 mm | Very fine detail | Very slow (3–5× base) | Jewelry, miniatures, dental models |
| 0.16–0.20 mm | Good detail | Standard | General prototypes, functional parts |
| 0.24–0.28 mm | Draft quality | Fast (1.5–2×) | Early-stage prototypes, large structural parts |
| 0.32–0.36 mm | Coarse finish | Very fast | Rapid drafts, large non-visual geometry |

**First layer settings** are a special case that most slicers treat independently from the rest of the print. The first layer sits directly on the build plate and must bond reliably to the surface — failure here means the entire print detaches. To improve bed adhesion, slicers typically apply three first-layer modifications: a **reduced speed** (usually 25–50% of normal print speed, giving the material time to bond before it's pulled by the next move), an **increased line width** (extruding slightly wider than normal to squish material into surface texture), and a **reduced or zero fan speed** (letting the first layer stay warm and malleable longer). These three adjustments together are responsible for the good "squish" you see on a well-calibrated first layer — the lines are visibly pressed flat and slightly wider than the layers above them.

The MicroSim below lets you explore how layer height affects the visual cross-section and estimated layer count for a 20 mm tall test cube. Adjust the slider and observe the trade-offs.

#### Diagram: Layer Height Cross-Section Explorer

<iframe src="../../sims/layer-height-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Layer Height Cross-Section Explorer MicroSim</summary>
Type: microsim
**sim-id:** layer-height-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: Use
Learning Objective: Students can predict how changing layer height affects layer count, surface finish, and relative print time for a given part height.

Instructional Rationale: An interactive slider with live visual feedback is appropriate for an Apply-level objective — students are not just recalling a fact but actively manipulating a parameter and observing consequential changes, which builds the intuition needed to choose layer heights in practice.

Canvas layout:
- Left panel (60% width): Side-view cross-section of a 20 mm tall rectangular block, rendered as a stack of visible layer lines. Layer lines drawn as alternating bands in two shades of blue to make individual layers visible. Layers scale in thickness proportionally to the selected layer height.
- Right panel (40% width): Data readout showing:
  - Selected Layer Height (mm)
  - Total Layers (20 mm ÷ layer height, rounded up)
  - Relative Print Time (normalized: 0.20 mm = 1.0×)
  - Surface Smoothness rating (qualitative scale: Coarse / Draft / Standard / Fine / Very Fine)

Controls (below the panels):
- Horizontal slider: Layer Height — range 0.08 mm to 0.36 mm, step 0.04 mm
- Default: 0.20 mm

Interaction:
- Moving the slider immediately updates the cross-section drawing and all four data readout values.
- Hovering the cross-section reveals a tooltip with the exact layer height and layer count at that resolution.
- A thin red line on the cross-section marks the 0.4 mm nozzle diameter for reference (labeled "Nozzle diameter").

Data:
- Layer count = ceil(20 / layer_height)
- Relative print time = 0.20 / layer_height (simplified, assumes speed constant)
- Surface smoothness: 0.08–0.12 → "Very Fine", 0.16–0.20 → "Standard", 0.24–0.28 → "Draft", 0.32–0.36 → "Coarse"

Color scheme: Layer bands in two shades of navy blue; control panel in light gray; red reference line for nozzle diameter.
Responsive: Canvas fills iframe width; panels stack vertically on screens narrower than 600px.
</details>

## Wall Count and Infill

The interior of a 3D-printed part is almost never solid plastic — that would be wasteful of both material and time. Instead, the slicer creates two distinct structural regions: a solid outer shell and a partially filled interior.

**Wall count** (also called perimeters or shells depending on the slicer) determines how many continuous loops of plastic form the outer boundary of each layer. Each wall loop is approximately one nozzle width wide (0.4 mm for a standard nozzle). With two walls, a cross-section of your part's edge will show two concentric rings of plastic; with four walls, it shows four. More walls produce a thicker, stronger outer shell and improve surface finish by increasing the amount of solid plastic at the surface. For functional parts, three or four walls are common; for display models, two walls often suffice. For parts that will experience bending or lateral impact, increasing wall count is often more effective than increasing infill density.

**Infill density** is the percentage of the interior volume that is filled with material. At 0% infill the part is hollow; at 100% it is solid. Most functional parts land between 15% and 40%:

- **10–15%:** Minimal structure — adequate for lightweight decorative parts or objects with no mechanical load
- **20–30%:** General purpose — good for most prototypes and lightly loaded functional parts
- **40–60%:** High strength — appropriate for parts that carry significant loads or experience repeated stress
- **80–100%:** Near-solid — for maximum strength or when the part will be machined, tapped, or drilled after printing

**Infill patterns** are the geometric structures used to fill the interior at the chosen density. Each pattern has a different strength profile, material usage, and print time. Before examining the comparison table, here is a brief description of the main options:

- **Lines (rectilinear):** Alternating straight lines layer by layer. Fast to print, good for simple parts.
- **Grid:** Two overlapping line directions per layer. Slightly stronger than lines in both axes.
- **Triangles:** Three-way crossing lines. Strong in-plane, prints quickly.
- **Honeycomb:** Hexagonal cells. Good strength-to-material ratio, attractive cross-section.
- **Gyroid:** A mathematically smooth triply periodic surface — looks like interconnected sine waves. Exceptional isotropic strength (nearly equal in all directions), excellent for flexible materials like TPU.
- **Cubic:** 3D diagonal cubes that resist compression from above. Strong under vertical loads.
- **Lightning:** Minimal branching tree structure designed purely to support the top surface, using almost no material. Use only when interior strength is irrelevant.

The following table summarizes the patterns you'll encounter most often. "Isotropic" means the pattern is equally strong in all horizontal directions; "anisotropic" means it's stronger in one direction than another.

| Pattern | Strength Profile | Print Speed | Material Use | Best For |
|---|---|---|---|---|
| Lines | Anisotropic (one axis) | Very fast | Low | Flat, thin parts |
| Grid | Anisotropic (two axes) | Fast | Low | General prototypes |
| Honeycomb | Moderate isotropic | Medium | Medium | Balanced strength/weight |
| Gyroid | Strong isotropic | Medium | Medium | Flexible parts, isotropic loads |
| Cubic | Strong vertical | Medium | Medium | Parts loaded from above |
| Lightning | Near zero | Very fast | Very low | Top-surface support only |

!!! mascot-tip "Tip: Wall Count Before Infill Density"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Benchy shares a practical tip">
    Here's the move that saves filament and print time: when you need a stronger part, add walls before adding infill density. Going from 2 walls to 4 walls increases the surface shell thickness by 100% and dramatically improves impact resistance. Going from 20% to 40% infill adds material throughout the interior but contributes less to impact resistance than the shell does. The shell is what protects the interior from the outside world — don't neglect it.

The MicroSim below lets you explore how different infill patterns look from above and how density changes the material coverage. Select a pattern and adjust the density slider to see the interior structure.

#### Diagram: Infill Pattern Explorer

<iframe src="../../sims/infill-pattern-explorer/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Infill Pattern Explorer MicroSim</summary>
Type: microsim
**sim-id:** infill-pattern-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Compare
Learning Objective: Students can compare infill patterns by their visual structure and predict which pattern is most appropriate for a given application based on strength profile and material use.

Instructional Rationale: A pattern explorer that renders patterns in real time is appropriate for Analyze-level because students need to visually distinguish patterns and make comparative judgments — not just remember names. Interactive density adjustment builds intuition about the infill density parameter before students use it in a real slicer.

Canvas layout:
- Left panel (65% width): Top-down view of a 100 mm × 100 mm square cross-section showing the selected infill pattern at the chosen density, with a solid perimeter wall (2 layers) visible around the edge.
- Right panel (35% width): Pattern selector (clickable buttons for: Lines, Grid, Honeycomb, Gyroid, Cubic, Lightning) + density slider (5%–100%, step 5%) + readout showing: selected pattern name, density %, estimated material coverage per layer (%).

Pattern rendering (2D approximations):
- Lines: Parallel horizontal lines spaced inversely proportional to density
- Grid: Two sets of perpendicular lines
- Honeycomb: Hexagonal grid, cell size inversely proportional to density
- Gyroid: Sinusoidal wave pattern in X offset by sinusoidal in Y (2D approximation of 3D gyroid cross-section)
- Cubic: 45° diagonal lines in alternating directions per simulated layer
- Lightning: Branching tree from center toward edges, minimal lines

Interaction:
- Clicking a pattern button immediately redraws the infill in the left panel.
- Moving the density slider redraws immediately.
- Hovering over the infill area reveals a tooltip: "Pattern: [Name] | Density: [X]% | Coverage: [Y]%"

Default: Grid pattern, 20% density.

Color scheme: Perimeter walls in dark blue; infill lines in medium blue; empty interior in off-white.
Responsive: Canvas fills iframe width; panels stack vertically on screens narrower than 600px.
</details>

## Speed, Travel, and Retraction

Three interrelated settings govern how the printer moves: print speed, travel speed, and retraction. Getting them right is one of the trickiest parts of dialing in a profile, because they interact with each other and with material properties in ways that are not always obvious until something goes wrong.

**Print speed** is the velocity at which the nozzle moves while depositing material, measured in millimeters per second. Slower speeds give the material more time to bond to the layer below and reduce vibration-induced surface artifacts. Faster speeds save time but can cause under-extrusion (the extruder can't push material fast enough), ringing (ghosting patterns from printer vibration), or poor layer adhesion if the material cools before bonding. A typical FDM profile might print perimeters at 40–60 mm/s, infill at 60–80 mm/s (infill is hidden so cosmetic quality matters less there), and the first layer at 20–30 mm/s.

**Travel moves** are the nozzle movements between printing locations where no material is deposited. During a travel move, the nozzle lifts slightly (or not at all) and moves quickly — often at 150–250 mm/s — to the next print start point. Because the nozzle is hot and the hotend still has molten plastic inside, a small amount of material can ooze out during travel, landing on the surface as a thin string or blob. This is the root cause of **stringing** — the thin threads of plastic you sometimes see spanning open spaces in a print.

**Retraction** is the printer's countermeasure against stringing. When the slicer detects that a travel move is needed, it inserts a G-code command to pull the filament backward through the nozzle by a short distance before moving. This negative pressure reduces the tendency of molten plastic to ooze out during the move. When printing resumes, the slicer adds a corresponding forward push (called **prime** or **restart**) to restore pressure before depositing again.

Two retraction parameters must be tuned: **retraction distance** (how far the filament pulls back) and **retraction speed** (how fast the pull happens). The appropriate values depend heavily on extruder type:

- **Bowden setup** (long PTFE tube between extruder motor and hotend): 4–7 mm distance, 40–60 mm/s speed
- **Direct drive** (motor sits directly on the printhead): 0.5–2 mm distance, 25–45 mm/s speed

!!! mascot-warning "Warning: More Retraction Is Not Always Better"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Benchy flags a common mistake">
    The specific mistake: cranking retraction distance above 8 mm on a Bowden setup (or above 3 mm on direct drive) hoping to eliminate all stringing. Too much retraction pulls molten plastic up into the cooler region of the heat break, where it can solidify and cause a clog — the dreaded cold pull scenario, but unintentional. Stringing is irritating; a clogged hotend is a multi-hour repair. Use the minimum retraction that eliminates stringing for your material, not the maximum your printer will accept.

## Temperature and Cooling

Every material you print has a recommended temperature range for both the hotend and the heated bed. These values come from the material data sheet you learned to read in Chapter 6, and they interact directly with print quality and layer adhesion.

**Print temperature** (hotend temperature) controls the viscosity of the melted filament. At the low end of a material's recommended range, the plastic is more viscous and flows less freely — better for detail and bridging, but risking under-extrusion if too cool. At the high end, the plastic flows more freely and bonds more reliably between layers, but increases stringing, oozing, and the risk of heat creep. The optimal temperature for a given material and speed is often in the middle of the recommended range; if you push print speed up, you typically need to raise temperature slightly to maintain adequate melt flow.

**Bed temperature** controls how well the first layer bonds to the build surface and how gradually the part transitions from the hot bed to the ambient air above. For materials prone to warping (ABS, ASA, nylon, polycarbonate), a hot bed slows the cooling of the lower layers and dramatically reduces the thermal stress that causes corners to lift. For PLA, bed temperature is helpful for adhesion but less critical for warping prevention. For PETG, bed temperature is important but excessively high values (above 90°C) cause PETG to bond so aggressively to smooth surfaces that removal can damage the part or the bed.

**Cooling fan settings** control the part cooling fan that blows ambient air at the deposited layers immediately after extrusion. Rapid cooling locks layers into position and improves fine detail and bridging performance. However, rapid cooling also reduces layer bonding by resolidifying the surface of the layer below before the new layer can fuse with it — the same mechanism that causes ABS and polycarbonate to delaminate when cooled too fast.

The appropriate cooling strategy depends entirely on the material being printed:

- **PLA:** 100% fan speed after the first 2–3 layers. PLA benefits greatly from cooling and produces much better overhangs and bridges with strong airflow.
- **PETG:** 50–75% fan. PETG needs some cooling for detail but too much airflow weakens layer adhesion.
- **ABS / ASA:** 0–15% fan, or none at all. These materials warp and delaminate if cooled too fast.
- **Nylon:** 30–50% fan. Some cooling helps with sagging; too much causes warping.
- **Polycarbonate:** 0% fan. PC delamination under airflow is severe; an enclosure is preferred.
- **TPU:** 30–50% fan. Helps maintain detail without causing adhesion issues.

## Bed Adhesion: Getting the First Layer to Stick

Before the slicer can plan the part itself, it needs to decide how the print starts its relationship with the build plate. Three **adhesion types** are commonly available, each suited to a different situation.

A **skirt** is a series of printed lines around the perimeter of the part, not touching it. Its sole purpose is to prime the nozzle and establish a stable flow of material before the part outline begins. It adds almost no print time and is appropriate for any situation where the part itself will adhere well without help.

A **brim** extends from the first layer of the part outward across the build plate — essentially making the first layer wider than the rest of the part. The extra surface area dramatically improves first-layer adhesion for parts with small footprints, sharp corners, or materials prone to lifting at the edges. After printing, the brim is removed — either by peeling it off by hand or trimming with flush cutters. Brims are the right choice for most ABS, ASA, and nylon prints.

A **raft** is a complete sacrificial platform of several layers printed beneath the part, separated from it by a small gap. The raft provides a stable, level surface for the first part layer to adhere to, which is useful when the build plate surface is uneven or when printing very small parts that would otherwise have insufficient contact area. Rafts consume significant material and add print time; their main advantage is reliability for difficult materials or awkward geometries.

## Support Structures

Many real-world geometries include overhanging features — areas of the model that extend outward over empty space with no material below them. FDM printing deposits each layer onto the layer below, so a surface hanging in mid-air with no support will sag, droop, or fail entirely. The slicer handles this by generating **support structures**: automatically placed columns, grids, or tree-like scaffolding that the overhanging geometry can rest on during printing.

!!! mascot-encouraging "Supports Are Worth Learning Properly"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Benchy offers encouragement">
    Supports get a bad reputation — they're extra material, they leave surface marks, and removing them can feel like surgery. But a well-configured support setup is genuinely impressive engineering: it holds a cantilevered overhang in place for hours, then separates cleanly enough to leave a usable surface. The settings in this section are the ones that make the difference between supports that peel off in one satisfying piece and supports that weld themselves to your part. Worth getting right.

There are two main support generation strategies in modern slicers. **Normal supports** (sometimes called "linear" or "grid" supports) generate a regularly spaced rectilinear structure under all overhangs above the overhang angle threshold (typically 45° or 50° from horizontal). Normal supports are fast to generate and print but can be difficult to remove and leave obvious contact marks on the supported surface.

**Tree supports** (available in PrusaSlicer, Cura, and OrcaSlicer) generate branching organic structures that grow from the build plate and reach upward to touch only the minimum necessary contact points of the overhanging surfaces. Tree supports use significantly less material than normal supports, are easier to remove because they touch the part at fewer points, and often produce cleaner supported surfaces. They take longer to generate (the algorithm is complex) and longer to print, but for most parts the trade-offs favor tree supports.

The third support-related setting — **support interface** — is a thin layer of densely printed material placed between the support structure and the part's overhanging surface. The interface is printed in a tighter pattern with a small gap above it, so the part surface rests on a smooth, level base rather than directly on the open-grid support structure. This improves the quality of supported surfaces enormously: instead of a rough, patterned imprint, the part surface looks nearly as good as if it had been printed face-down on the build plate. Support interface can be configured to use a different material — dissolvable filaments like PVA or HIPS are sometimes used for the interface layer alone, enabling completely clean removal.

The interactive decision flow below walks through the key questions for choosing a support configuration. Click each step to see the reasoning behind the recommendation.

#### Diagram: Support Strategy Decision Flow

<iframe src="../../sims/support-strategy-decision/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Support Strategy Decision Flow Workflow</summary>
Type: workflow
**sim-id:** support-strategy-decision<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Evaluate (L5)
Bloom Verb: Recommend
Learning Objective: Students can evaluate a part's geometry and select the appropriate support strategy (no support, normal support, tree support, support interface, dissolvable support) based on overhang angle, surface quality requirements, and material constraints.

Visual style: Interactive decision tree flowchart with rectangular process nodes, diamond decision nodes, and terminal recommendation nodes. Clicking a node reveals an explanation in a side panel.

Nodes and text:
Start → "Does the part have overhanging surfaces?"
→ No: Terminal "No supports needed. Orient the part to minimize overhangs, or use DfAM to redesign."
→ Yes: "Are overhangs steeper than 45° from horizontal?"
→ No: Terminal "Self-supporting overhang. Most FDM printers bridge well up to 45°. No supports required."
→ Yes: "Is the supported surface visible or functional?"
→ No: Terminal "Use Normal Supports. They print fast and the surface quality is acceptable for hidden geometry."
→ Yes: "Is a multi-material printer or soluble filament available?"
→ Yes: Terminal "Use Dissolvable Support Interface (PVA or HIPS). Produces the cleanest supported surfaces; dissolves completely in water or limonene."
→ No: "Is the geometry complex with many isolated overhang points?"
→ Yes: Terminal "Use Tree Supports with Support Interface. Tree supports minimize contact points; interface layer improves surface quality."
→ No: Terminal "Use Normal Supports with Support Interface. Dense interface improves surface quality; normal structure is simpler to generate."

Each node:
- Hover: highlights the node with a border
- Click: side panel displays a 3–4 sentence explanation of the reasoning and practical tips

Side panel contents per node:
- "No supports needed": "Before printing, rotate the part in your slicer to find the orientation that minimizes overhang area. The slicer's 'place face on build plate' feature and the overhang preview (usually shown in red) help identify the optimal orientation."
- "Self-supporting": "FDM printers can typically bridge horizontally for 50–80 mm without supports if bridging speed is reduced and cooling is strong. Bridges over 80 mm benefit from supports or redesign."
- "Normal Supports": "In Cura, enable 'Generate Support' and set Support Structure to 'Normal'. Adjust Support Density (10–20% is standard) and Z Distance (0.15–0.2 mm to help separation)."
- "Dissolvable Interface": "PVA dissolves in water and works well with PLA. HIPS dissolves in d-limonene and pairs with ABS. Requires a dual-extrusion printer or tool changer."
- "Tree Supports with Interface": "In PrusaSlicer, set Support Style to 'Organic'. In Cura, set Support Structure to 'Tree'. Enable Support Interface with 0.2 mm Z gap for cleanest removal."
- "Normal Supports with Interface": "Enable Support Interface in Cura's Support section. Set Interface Layer Count to 2–4 and Interface Z Distance to 0.15 mm. This alone transforms surface quality on supported overhangs."

Color scheme: Decision diamonds in amber; process rectangles in blue; terminal recommendations in green; selected node highlighted in a warm orange border.
Responsive: Canvas scales to fill iframe width; on narrow screens, the tree renders vertically.
</details>

## Slicer Profiles and Advanced Modes

Once you've found settings that work well for a given printer-material combination, you don't want to re-enter them for every print. **Slicer profiles** are saved collections of all slicer settings — temperatures, speeds, layer height, infill, supports, retraction — stored under a name so you can recall them instantly. A well-organized profile library might include entries like "PLA_Standard_0.4mm", "PETG_Functional_0.4mm", "ABS_Draft_0.4mm_Enclosure", and "TPU_Flex_0.4mm_DirectDrive". Sharing profiles — as machine- and material-specific .ini or .json files — is one of the ways the 3D printing community accelerates learning; printer manufacturers and filament companies often publish tested profiles as a starting point.

Modern slicers also expose a handful of specialized print modes that go beyond standard layering. Two are worth knowing now and experimenting with when the opportunity is right.

**Vase mode** (called "Spiralize Outer Contour" in Cura) prints a model as a continuous upward spiral — a single-wall shell with no layer seams and no infill. The nozzle moves continuously upward in a helical path, producing a seamless, smooth exterior that is ideal for vases, cups, lamp shades, and artistic models. Because there is only one wall, vase mode objects are not particularly strong and cannot have solid overhangs. The print time and material use are dramatically reduced compared to a full-infill print of the same model. Most slicer UIs simply provide a checkbox for this mode and automatically configure the necessary single-wall, infill-free settings.

**Fuzzy skin** is a texture mode that deliberately introduces small random perturbations to the outer perimeter toolpath. Instead of printing a smooth outer wall, the nozzle varies its position slightly on each pass, producing a matte, textured, slightly rough surface. This can make a print look like it was cast from sand, machined from stone, or printed at higher resolution than it actually was — and it effectively disguises layer lines. Fuzzy skin is a purely cosmetic effect controlled by two parameters: amplitude (how large the perturbations are, in mm) and point distance (how frequently perturbations are inserted along the path).

**Cloud slicing** is a newer delivery model — offered by Bambu Lab, Raise3D, and other managed ecosystem printers — in which the slicing computation is performed on remote servers rather than on your local computer. You upload the STL to a cloud platform, select your material and machine, and receive a pre-sliced G-code back, or the print is sent directly to the printer over the internet without you ever handling a G-code file. Cloud slicing lowers the software barrier to entry (no local installation required) and enables print farms to be managed from a browser. The trade-off is dependency on internet connectivity and the service provider's platform — if the cloud service is unavailable or discontinued, cloud-sliced printers may lose some capability.

## Key Takeaways

Twenty-three concepts, one complete pipeline from model to printer. Here is a summary to reinforce the key ideas.

- **Slicer software** converts STL/3MF geometry into G-code — the sequence of motion and temperature commands the printer actually executes.
- **G-code** is a plain text format; `G1` moves the nozzle, `M104/M109` control hotend temperature, `M140/M190` control bed temperature, and the `E` parameter controls extrusion.
- **Layer height** should be 25–75% of nozzle diameter. Smaller layers produce finer detail and stronger vertical bonding; larger layers print faster but show more surface stairstepping.
- **First layer settings** — slower speed, wider extrusion, no cooling fan — are configured separately to maximize bed adhesion.
- **Wall count** (shells) builds the outer strength of the part; **infill density and pattern** fill the interior with configurable structure ranging from lightning (nearly hollow) to gyroid (strong isotropic) to solid.
- **Print speed** and **travel moves** control throughput; **retraction** prevents stringing during travel by briefly pulling filament back into the nozzle.
- **Print temperature** and **bed temperature** must match material requirements; **cooling fan** settings are material-dependent — PLA wants maximum cooling, ABS/PC want little or none.
- **Adhesion type** — skirt (priming only), brim (extended first layer), or raft (full sacrificial platform) — is chosen based on the material's warping tendency and the part's footprint.
- **Support structures** (normal or tree) handle overhangs above ~45°; **support interface** layers improve supported surface quality; dissolvable supports enable clean removal on dual-extrusion setups.
- **Slicer profiles** save your tested settings for rapid reuse; **vase mode** prints single-wall seamless shells; **fuzzy skin** adds deliberate texture; **cloud slicing** offloads processing to remote servers.

??? question "Check Your Understanding: Diagnosing a Stringing Problem"
    Your PETG print is coming out with thin threads of plastic spanning every open space between printed features. You've confirmed the nozzle temperature is within the manufacturer's recommended range. Which two slicer settings are the most likely culprits, and what change would you make to each?

    **Answer:** The two primary levers for stringing are **retraction distance/speed** and **travel speed**. For PETG, try increasing retraction distance slightly (PETG typically needs a bit more retraction than PLA — try 1–2 mm on a direct drive, or 5–6 mm on Bowden) and increase retraction speed to 40–50 mm/s. Also increase travel speed so the nozzle spends less time crossing open gaps. As a secondary check, ensure your print temperature isn't too high — PETG at the top of its range (250°C+) strings more aggressively than at 235–240°C.

!!! mascot-celebration "Twenty-Three Down — You Can Read a Slicer Now"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Benchy celebrates chapter completion">
    That is a complete slicer education in one chapter. You understand G-code, you know what every major parameter does, and you can reason about why a print fails rather than just adjusting things at random. Next up: **Chapter 8 — FDM Printer Operation**, where you take all these settings off the screen and onto a real machine. Bed leveling, first-layer calibration, filament changes — everything you just learned about first layer settings and temperatures is about to become something you do with your hands.
