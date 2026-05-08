---
title: Modern Hardware — Multi-Material, Motion, and Speed
description: Multi-material and multi-color printing systems, CoreXY vs bed-slinger motion, Klipper firmware with input shaping and pressure advance, high-speed printing, modern hotends, and advanced bed surfaces and auto-leveling probes.
generated_by: claude skill chapter-content-generator
date: 2026-05-07 23:17:11
version: 0.08
---

# Modern Hardware: Multi-Material, Motion, and Speed

!!! mascot-welcome "Welcome to Chapter 13"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Benchy waves hello">
    When I was first designed in 2015, a "fast" print was 60 mm/s on a printer that took six minutes to level its own bed. Today, machines print me in under four minutes at 600 mm/s and swap between five filament colors automatically. This chapter covers how we got here — the hardware and firmware advances that transformed consumer 3D printing from a patient hobbyist pursuit into a genuinely practical fabrication tool.

## Summary

This chapter covers the sub-$5,000 hardware advances of the last decade: multi-material and multi-color printing systems (AMS, Prusa MMU, IDEX, toolchanger printers, filament splicing, multi-material waste handling), modern motion systems (CoreXY, bed slingers, linear rails), the speed-enabling firmware stack (Klipper, input shaping, pressure advance, high-speed printing), modern hotends (all-metal, high-flow, hardened nozzles), and advanced bed surfaces and probes (PEI flex plates, spring steel sheets, BLTouch, inductive probes, strain-gauge leveling).

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

1. Multi-Material Printing (Concept 224)
2. Multi-Color Printing (Concept 225)
3. AMS Material System (Concept 226)
4. Prusa MMU Unit (Concept 227)
5. IDEX Dual Extrusion (Concept 228)
6. Toolchanger Printers (Concept 229)
7. Filament Splicing (Concept 230)
8. Multi-Material Waste (Concept 231)
9. CoreXY Motion System (Concept 232)
10. Bed Slinger Design (Concept 233)
11. Klipper Firmware (Concept 234)
12. Input Shaping (Concept 235)
13. Pressure Advance (Concept 236)
14. High-Speed Printing (Concept 237)
15. Linear Rails (Concept 238)
16. All-Metal Hotend (Concept 239)
17. High-Flow Hotend (Concept 240)
18. Hardened Nozzle (Concept 241)
19. PEI Flex Plate (Concept 242)
20. Spring Steel Sheet (Concept 243)
21. BLTouch Sensor (Concept 244)
22. Inductive Probe (Concept 245)
23. Strain Gauge Leveling (Concept 246)

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: Materials Science for Additive Manufacturing](../06-materials-science/index.md)
- [Chapter 7: Slicing, G-code, and Toolpaths](../07-slicing-and-toolpaths/index.md)
- [Chapter 8: FDM Printer Hardware and Operation](../08-fdm-printer-hardware/index.md)
- [Chapter 12: Print Failures, Troubleshooting, and Post-Processing](../12-troubleshooting-and-postprocessing/index.md)

---

## Beyond Single-Material, Single-Color Printing

Chapter 8 described a single-material FDM printer — one hotend, one filament, one color. The majority of everyday prints still work this way. But a large category of applications requires either **multiple materials** (soluble supports + structural material, rigid + flexible, hard + soft) or **multiple colors** (functional labels, artistic multi-tone objects, color-coded engineering parts). The 2018–2025 period saw an explosion of hardware approaches to this problem, each with different trade-offs.

Two terms are worth distinguishing upfront:

- **Multi-material printing** — printing with two or more chemically distinct materials in the same object. The most useful application is printing dissolvable supports (PVA, BVOH, or HIPS) alongside a structural material, allowing support removal without tools or surface damage.
- **Multi-color printing** — printing with the same material family in different colors. Most "multi-color" systems (AMS, MMU) are single-material multi-color: they switch between spools of PLA in different colors rather than between chemically different polymers.

### AMS (Automatic Material System)

Bambu Lab's **Automatic Material System (AMS)** is the commercial multi-color solution that brought the feature to the mass market. The AMS holds up to four spools in a single unit, with up to four AMS units connectable to one printer — enabling up to 16-color prints. A hub mechanism feeds the selected filament into the extruder, while the outgoing filament is retracted back to the AMS for storage before the next material feeds.

The AMS uses filament cutting (a built-in cutter inside the printer) and a "filament buffer" zone to manage the loading/unloading sequence quickly. Color changes happen at the slicer-defined color boundary, with a configurable purge volume (waste material flushed to a dedicated "wipe tower" or directly to a waste chute) to clear the previous color from the hotend before depositing the new one.

### Prusa MMU (Multi-Material Unit)

Prusa's **Multi-Material Unit (MMU)** is a retrofit module that adds 5-material capability to Prusa MK-series printers. Unlike the AMS, the MMU relies on longer filament path management — the filament from the selected spool travels through a PTFE tube to the extruder and then down through a new multi-channel ptfe bowden arrangement. The MMU2S (second generation) added a dedicated filament sensor to reduce the frequent jams that plagued the original design.

The MMU is popular for engineering users who want dissolvable supports (printing PLA + PVA), as PVA dissolves completely in water with no surface scarring. The challenge: PVA is hygroscopic (absorbs moisture from air) and requires dry-box storage between print sessions.

### IDEX (Independent Dual Extrusion)

**IDEX** printers mount two independent print heads on the same X-axis rail — each head can move to its parked position while the other prints, or they can both print simultaneously (for mirroring or duplication modes). IDEX was designed to solve the "ooze shield" problem of standard dual extruder designs: the second, inactive head tends to ooze onto the print.

Because each IDEX head retracts completely off the print area when not in use, ooze contamination is virtually eliminated. IDEX is well-suited for dissolvable-support printing (one head prints structural material, the other prints soluble support) and for doubling throughput when printing two identical parts simultaneously.

### Toolchanger Printers

The most flexible multi-material approach is the **toolchanger**: a robot arm or shuttle that docks and undocks entire print heads (hotend, extruder, and sometimes sensors included) from a common carriage. E3D's ToolChanger, Prusa Research's XL, and some high-end industrial machines use this architecture.

Toolchangers can switch between heads with different nozzle sizes, different maximum temperatures, and even different sensor packages — enabling combinations like a 0.25 mm fine-detail head + a 1.0 mm high-speed head in the same job, or a standard FDM head + a paste-extrusion head for ceramic or chocolate printing.

### Filament Splicing and Multi-Material Waste

An alternative to hardware multi-material units is **filament splicing**: a device that cuts and joins segments of different-color or different-material filaments into a single spliced strand before it enters the printer. The Mosaic Palette is the best-known splicing system. The printer sees a single filament path; the splicer manages timing to deliver the right material at the right moment.

Splicing eliminates the mechanical complexity of a multi-spool loading mechanism, but it requires careful timing calibration and produces significant **multi-material waste**: the color transition inside the hotend takes several centimeters of purging to fully clear. This purge material is collected in a dedicated "purge tower" (a column of mixed-color material printed next to the main model) or a waste bucket. Print farms that do large multi-color print runs can generate significant purge waste — one of the sustainability trade-offs of multi-color printing.

---

## Modern Motion Systems

The motion system is one of the primary determinants of how fast a printer can move and how much vibration it introduces into prints. Two dominant architectures compete in the consumer space.

### Bed Slinger Design

A **bed slinger** is the traditional Cartesian printer architecture where the print bed moves in the Y axis and the print head moves in X and Z. Prusa MK-series and Creality Ender-series printers are classic bed slingers. The advantages are simplicity, low cost, and a large community of users and documentation. The disadvantage is that the print itself moves — and at high speeds, the inertia of the print mass introduces vibration, limiting achievable speeds without ringing artifacts.

!!! mascot-thinking "Moving the Print Is Moving the Problem"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Benchy thinks carefully">
    In a bed slinger, I — the print — am one of the moving masses. Every acceleration pulse that moves the bed also accelerates me, and as I grow taller and heavier, the resonant frequency of the print-plus-bed system changes. This is why bed slingers are fundamentally limited in speed: you can't accelerate a growing 300-gram PLA object as fast as you can accelerate a lightweight empty carriage.

### CoreXY Motion System

**CoreXY** is a motion architecture where both X and Y movements are produced by two motors acting on a single belt loop. The print bed moves only in Z (not in X or Y). The print head carriage is the only moving mass in XY, and it can be made very light. The result: the same acceleration that would shake a bed-slinger produces much less ringing on a CoreXY because the mass being accelerated is just the carriage and print head.

CoreXY enables the very high speeds (300–600 mm/s) of modern machines like the Bambu Lab X1 Carbon and Bambu P1P. The complexity trade-off: CoreXY belt routing is more mechanically complex, alignment is more sensitive, and diagnosing issues requires understanding the coupled belt system.

### Linear Rails

Both bed slingers and CoreXY printers can use either round linear rods (with LM8UU ball bearings, as described in Chapter 8) or **linear rails** (precision-ground steel rails with recirculating-ball carriages). Linear rails provide better rigidity, lower friction, and higher precision than round-rod systems, at higher cost. They're standard equipment on high-speed CoreXY printers and in delta printers where the stiffness of the guide system directly affects print quality at speed.

---

## The Firmware Revolution: Klipper, Input Shaping, and Pressure Advance

Hardware advances in motion systems and hotends would mean little without firmware that can exploit them. The firmware stack that powers modern high-speed printing is built on **Klipper** and two key algorithms.

### Klipper Firmware

**Klipper** is an open-source firmware that splits computation between the printer's microcontroller (which handles real-time motor pulses) and a companion single-board computer like a Raspberry Pi (which handles path planning, G-code parsing, and advanced features). By offloading computation to a more powerful processor, Klipper can run algorithms too complex for a microcontroller alone.

Key Klipper advantages over Marlin:

- Configuration in a human-readable text file (easy to back up, version-control, and share)
- Web interface (Mainsail, Fluidd) for monitoring and control from any browser
- Python-based macro system for complex automated procedures
- Real-time computation of input shaping and pressure advance corrections

### Input Shaping

When a printer accelerates, the frame and belt system oscillate at their natural resonant frequency — producing the ringing artifacts described in Chapter 12. **Input shaping** (also called resonance compensation) is an algorithm that measures those resonant frequencies (using an accelerometer mounted to the print head) and then pre-distorts the motion commands to cancel out the resonance before it occurs.

The physical analogy: if you know a bridge vibrates at 10 Hz when you walk across it, you can deliberately mis-time your steps so they arrive out of phase with the resonance — your footsteps cancel the bridge's oscillation instead of amplifying it. Input shaping does exactly this for printer motion, and it's what allows Bambu Lab and Klipper printers to print at 300–600 mm/s with smooth surfaces that would have required <80 mm/s without the compensation.

### Pressure Advance

When an FDM extruder starts a move, there's a brief lag before the pressure in the nozzle fully builds and extrusion begins at the commanded rate. At the end of a move, residual pressure continues to push out material as the head decelerates. These effects cause rounded corners (too little material at the start of a corner, too much at the end) and blobs at deceleration points.

**Pressure advance** (called Linear Advance in Marlin) measures this pressure lag and pre-compensates: the firmware begins increasing extruder pressure slightly before the print head reaches a corner, and begins retracting slightly before the head decelerates. The result is crisper corners, less blobs, and more consistent extrusion at variable speeds.

Together, input shaping and pressure advance enable the **high-speed printing** regime: print speeds above 200 mm/s with quality comparable to what was achievable at 60 mm/s a decade ago.

#### Diagram: Input Shaping and Speed Comparison

<iframe src="../../sims/input-shaping-demo/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Input Shaping and High-Speed Printing Demo</summary>
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
</details>

---

## Modern Hotends: All-Metal, High-Flow, and Hardened Nozzles

The hotend is the component that most directly limits print speed and material compatibility. Several advances have pushed what's possible.

### All-Metal Hotend

A standard hotend uses a PTFE liner that extends into the heat break and sometimes into the hot zone. PTFE is used for its very low friction, which makes filament loading smooth. However, PTFE begins to degrade at temperatures above ~240 °C, and at 260+ °C it releases harmful fumes (PFOA/PFAS compounds). This limits standard hotends to PLA, PETG, and similar materials that print below 240 °C.

An **all-metal hotend** replaces the PTFE components with stainless steel or titanium — materials that don't degrade at high temperatures. All-metal hotends are required for high-temperature filaments: ABS, ASA, PC (polycarbonate), nylon, and high-performance engineering materials like PEEK (350+ °C). The trade-off: the higher friction of bare metal walls (no PTFE coating) increases retraction sensitivity and makes flexible filaments harder to use in Bowden configurations.

### High-Flow Hotend

**High-flow hotends** address the volumetric extrusion limit: at some point, increasing print speed doesn't help because the hotend can't melt filament fast enough to supply it. The volumetric flow rate (mm³/s) is the true bottleneck, not the linear speed. High-flow hotends use:

- Larger melt zones (longer or wider heater blocks)
- Higher-power heater cartridges (60–80 W vs. 30–40 W standard)
- Higher-mass heat blocks that store more thermal energy
- Reduced PTFE-to-metal transition distance for all-metal designs

The E3D Revo, Bambu CHT-style nozzles, and Phaetus Rapido are examples of high-flow designs that enable sustained volumetric outputs of 30–60 mm³/s vs. the 8–12 mm³/s of a standard hotend. This is what makes printing at 600 mm/s with a 0.4 mm nozzle physically possible.

### Hardened Nozzle

As covered briefly in Chapter 8, **hardened steel and ruby-tipped nozzles** resist the abrasive wear caused by carbon fiber, glass fiber, glow-in-the-dark, and metal-particle composite filaments. With the growth of high-performance composite filaments for functional parts, hardened nozzles have become a routine accessory rather than a specialty item.

---

## Modern Bed Surfaces and Auto-Leveling Probes

The build surface and leveling system have also advanced substantially since the glass-and-hairspray era.

Before examining specific technologies, recall from Chapter 8 that bed leveling (tramming) ensures the build surface is parallel to the print head plane, and that Z-offset calibration sets the precise nozzle-to-bed gap. Auto bed leveling (ABL) adds a probe to measure a grid of points and apply software compensation. The probe technology determines how accurately, quickly, and robustly the system works.

### PEI Flex Plate and Spring Steel Sheet

**PEI (Polyetherimide) spring steel sheets** have become the standard removable build surface for consumer printers. The spring steel substrate is magnetically held to the heated bed by a magnetic sheet — easy to remove without tools. PEI coating provides excellent adhesion to most FDM materials when warm, and the flex-to-release mechanism means finished prints pop off with a simple bend, no scraper needed.

Two texture options are common:

- **Smooth PEI**: excellent for PLA and TPU, giving parts a glossy bottom surface finish that looks almost injection-molded.
- **Textured PEI** (satin or rough powder coating): better adhesion for PETG and materials that sometimes over-adhere to smooth PEI; gives a matte textured bottom surface.

### Auto-Leveling Probe Technologies

Several probe designs are in common use, each with different operating principles and trade-offs:

**BLTouch / CR Touch** — a servo-actuated pin that physically extends and touches the bed surface, then retracts. Works on any surface type. Accuracy: ±0.005 mm typical. Requires mounting at a specific distance from the nozzle (the probe offset) and calibrating that offset in firmware.

**Inductive probes** — sense the metal build surface without physical contact via an electromagnetic field. Work on spring steel and aluminum beds; won't work on glass or other non-conductive surfaces. Faster and more durable than contact probes because there are no moving parts.

**Strain gauge leveling** — the most advanced approach, used in the Bambu Lab and some Prusa printers. A load cell (pressure sensor) in the print head assembly detects the minute force when the nozzle contacts the bed surface — effectively using the nozzle itself as the probe. Since the nozzle is the reference point, there's no offset to calibrate. The measurement point is always exactly where material will be deposited. Accuracy: ±0.001 mm or better. The trade-off: the nozzle must physically touch the bed, which requires a clean nozzle and can leave marks on PEI if the nozzle has residual filament.

The following table summarizes the major probe technologies:

| Probe Type | Contact | Works On | Typical Accuracy | Calibration Needed |
|---|---|---|---|---|
| BLTouch / CR Touch | Physical pin | Any surface | ±0.005 mm | Probe XY offset + Z offset |
| Inductive probe | Non-contact (EM) | Metal surfaces only | ±0.01 mm | Z offset |
| Capacitive probe | Non-contact | Conductive surfaces | ±0.02 mm | Z offset |
| Strain gauge / nozzle | Physical nozzle | Any surface | ±0.001 mm | None (no offset) |

---

## How These Advances Work Together

The modern high-speed printer (Bambu Lab X1C, Prusa XL, Voron) is not a single innovation — it's a system where each component has been upgraded to remove what was previously the bottleneck:

1. **CoreXY carriage** — lightweight, low-inertia XY motion
2. **Linear rails** — rigid, low-friction guidance
3. **High-flow all-metal hotend** — sufficient melt capacity for 600 mm/s at 0.4 mm nozzle
4. **Hardened nozzle** — handles engineering composite filaments
5. **PEI spring steel with strain-gauge leveling** — reliable first-layer without manual setup
6. **Klipper + input shaping + pressure advance** — cancels the vibration and flow-lag that would otherwise limit surface quality at these speeds
7. **AMS or MMU** — adds multi-color capability without operator intervention

The result is a machine that in 2024 costs $500–$800 and outperforms what cost $20,000 in 2014 on speed, surface quality, and ease of use. That pace of development is not slowing down.

#### Diagram: Modern Printer Architecture Comparison

<iframe src="../../sims/modern-printer-comparison/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Modern Printer Architecture Comparison</summary>
Type: diagram
**sim-id:** modern-printer-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Compare
Learning Objective: Students compare bed-slinger and CoreXY printer architectures by examining how each moves its axes, and analyze how the moving mass difference affects achievable print speed.

Visual layout:
- Side-by-side schematic of two printers:
  - Left: Bed slinger (classic Prusa-style proportions) — bed moves in Y, head moves in X/Z
  - Right: CoreXY (Bambu-style proportions) — bed moves only in Z, head moves in X/Y via coupled belt loop
- Motion arrows animated on each printer showing which axis moves when
- Mass labels on moving components: "~200g (head)" for CoreXY head, "~500g (bed + print)" for bed-slinger Y axis

Interactive elements:
- "Animate Move" button: animates a diagonal move on both printers simultaneously, showing how each motion system executes it differently
- Click any component: info panel shows component name, function, and "how this affects print quality"
- Hover "Belt" on CoreXY: tooltip shows the CoreXY belt routing explanation (both motors act together to produce any XY move)
- Speed slider: drag to increase move speed; at high speeds, the bed-slinger shows ringing artifacts (oscillating color of deposited path), while the CoreXY shows clean lines

Color coding:
- Red components: high-mass, speed-limiting elements
- Green components: low-mass, speed-enabling elements
- Blue: motion path

Canvas:
- Each printer: 300×300px schematic
- Info panel: 200px right sidebar

Responsive: stacks to vertical layout on screens below 700px.
</details>

---

## Key Takeaways

- Multi-material printing enables dissolvable supports and functional material combinations; multi-color printing uses single-material filament switching to produce colored objects.
- AMS (Bambu) and MMU (Prusa) are the major consumer multi-color solutions; each uses a purge/wipe strategy to clear the previous color, generating material waste.
- IDEX uses two independent heads on one rail, eliminating ooze contamination; toolchangers swap entire print heads for maximum flexibility.
- Bed slingers move the print in Y — the growing print mass is a speed-limiting inertia; CoreXY moves only a lightweight carriage in XY, enabling much higher accelerations.
- Linear rails provide greater rigidity and precision than round-rod systems, critical for high-speed accuracy.
- Klipper splits computation between microcontroller (motor pulses) and companion SBC (advanced algorithms), enabling input shaping and pressure advance.
- Input shaping measures and cancels resonant frequencies, allowing high-speed printing without ringing artifacts.
- Pressure advance pre-compensates for hotend pressure lag, producing crisp corners at variable speeds.
- All-metal hotends are required for temperatures above ~240 °C; high-flow hotends remove the volumetric extrusion bottleneck.
- Strain-gauge leveling uses the nozzle as the probe — eliminating probe offset calibration and achieving sub-micron repeatability.

??? question "Check Your Understanding: Why Does a CoreXY Printer Handle High Speeds Better Than a Bed Slinger? — Click to Reveal"
    In a bed slinger, both the bed and the growing print must accelerate and decelerate with each Y-axis move. As the print grows heavier, the resonant frequency of the bed+print system decreases, and accelerating it causes vibration (ringing). In a CoreXY printer, the bed moves only in Z — very slowly, once per layer. All XY motion is performed by a lightweight carriage with only the print head as its moving mass. This low, consistent mass allows much higher accelerations without exciting resonance, which is why CoreXY printers can run at 300–600 mm/s while bed slingers typically peak at 100–150 mm/s for quality prints.

!!! mascot-celebration "You Know the State of the Art"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Benchy celebrates with you">
    The printer landscape we just covered represents a decade of competitive development compressed into one chapter. You now understand not just what modern printers can do but why they can do it — the specific hardware and firmware innovations that drove each improvement. Chapter 14 zooms out to the broader modern ecosystem: the slicers, model repositories, digital workflows, and community infrastructure that make all this hardware useful.

[See Annotated References](./references.md)
