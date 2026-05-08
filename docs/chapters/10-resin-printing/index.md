---
title: Resin Printing: SLA, MSLA, and DLP
description: Vat photopolymerization processes, resin printer anatomy, exposure settings, resin support strategies, wash-and-cure workflow, IPA handling, PPE requirements, and modern mono-LCD and large-format advances.
generated_by: claude skill chapter-content-generator
date: 2026-05-07 23:09:02
version: 0.08
---

# Resin Printing: SLA, MSLA, and DLP

!!! mascot-welcome "Welcome to Chapter 10"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Benchy waves hello">
    FDM is my home turf, but I have to admit — the prints that come out of a resin printer can look almost impossibly smooth. In this chapter you'll learn how vat photopolymerization works, how to read a resin printer's controls, and how to handle the chemistry involved safely. The last point is not optional: resin printing without proper PPE is a health risk, full stop.

## Summary

This chapter introduces the three vat-photopolymerization processes (SLA, MSLA, DLP), the resin printer and its parts (LCD, light source, vat, FEP film), exposure settings, resin-specific support strategies, the wash-and-cure post-processing workflow, IPA handling, and the resin-specific PPE that must be in place before any print starts. Modern advances in mono-LCD resolution and large-format resin printers are also covered.

## Concepts Covered

This chapter covers the following 13 concepts from the learning graph:

1. SLA Process (Concept 37)
2. MSLA Process (Concept 38)
3. DLP Process (Concept 39)
4. Resin Printer Anatomy (Concept 142)
5. LCD And Light Source (Concept 143)
6. Resin Vat And FEP (Concept 144)
7. Exposure Settings (Concept 145)
8. Resin Supports (Concept 146)
9. Wash And Cure Workflow (Concept 147)
10. IPA Handling (Concept 148)
11. Resin PPE (Concept 149)
12. Mono LCD Resolution (Concept 247)
13. Large-Format Resin (Concept 248)

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: AM Standards, Process Families, and Industrial AM](../02-standards-and-process-families/index.md)
- [Chapter 6: Materials Science for Additive Manufacturing](../06-materials-science/index.md)
- [Chapter 7: Slicing, G-code, and Toolpaths](../07-slicing-and-toolpaths/index.md)
- [Chapter 9: Safety, Ethics, and Sustainability in 3D Printing](../09-safety-ethics-sustainability/index.md)

---

## Light as the Tool: How Vat Photopolymerization Works

FDM builds objects by melting and depositing thermoplastic. Vat photopolymerization builds them by a completely different mechanism: **light curing**. The raw material is a liquid **photopolymer resin** — a mixture of monomers, oligomers, and photoinitiators. When specific wavelengths of UV light (typically 385–405 nm) hit the photoinitiators, they trigger a chemical chain reaction called **polymerization**: the monomers cross-link into a solid polymer network. The part grows not from deposited material but from light selectively hardening a liquid.

The general workflow is:

1. The build platform starts submerged near the bottom of a resin-filled vat.
2. The light source exposes the bottom of the vat (through a transparent film) according to the current layer's cross-section.
3. Exposed resin solidifies and adheres to the build platform.
4. The platform lifts slightly, fresh resin flows under it, and the process repeats — pulling the object upward through the liquid resin layer by layer.

This process is the inverse of FDM in a structural sense: FDM builds upward by adding material to the top; vat photopolymerization pulls the print downward (in bottom-up printers) or down through a pool (in top-down SLA). The result is layer resolution an order of magnitude finer than most FDM printers — typically 25–100 μm vs. 100–300 μm for FDM.

---

## The Three Vat Photopolymerization Processes

Three distinct technologies fall within the vat photopolymerization family, differentiated by how they deliver UV light to the resin.

### SLA (Stereolithography)

**Stereolithography (SLA)** is the original 3D printing process, patented by Charles Hull in 1986. A focused UV laser beam traces the outline and infill of each layer, curing the resin point by point. The laser is steered by two galvanometer mirrors (galvos) that deflect the beam with high precision and speed. Because the laser's beam diameter is very small and can be positioned at any (X, Y) coordinate, SLA can produce excellent XY resolution and smooth curved surfaces. High-end SLA machines (such as Formlabs Form series) use this approach for professional-grade dental and engineering parts.

The trade-off: because the laser cures one point at a time, SLA is slower than mask-based systems for large cross-sections. It's also more mechanically complex — the galvo system and laser add cost.

### DLP (Digital Light Processing)

**DLP** replaces the laser with a Digital Micromirror Device (DMD): a chip containing millions of microscopic mirrors, each tilting to either reflect UV light onto the resin or away from it. Because the DMD projects an entire layer cross-section simultaneously as a 2D image, DLP cures each layer in one exposure regardless of how complex the cross-section is. This makes DLP very fast for small-to-medium build volumes.

The XY resolution of a DLP printer is determined by the number of micromirrors divided by the build area — more pixels per millimeter means finer detail. DLP projectors can change the optical path to focus the image at different scales, giving some flexibility in the resolution-versus-build-area trade-off.

### MSLA (Masked Stereolithography)

**MSLA** is currently the dominant technology in consumer resin printers. Instead of a laser or DMD projector, it uses a UV LED array below an LCD screen. The LCD acts as a mask: pixels turn black (blocking light) or clear (passing UV light) to define the layer cross-section. The UV array illuminates all clear pixels simultaneously, curing the full layer at once — just like DLP.

The key advantage over DLP: LCD panels are inexpensive commodity hardware. A MSLA printer can be built for a fraction of what an equivalent DLP system costs. The disadvantage: early color LCDs had significant UV absorption even at "open" pixels, limiting the light intensity and requiring longer exposure times. The shift to **monochrome (mono) LCD panels** (covered below) eliminated most of this limitation, making modern MSLA printers fast and accurate.

!!! mascot-thinking "SLA vs. DLP vs. MSLA: The Trade-Off Triangle"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Benchy thinks carefully">
    Think of SLA, DLP, and MSLA as three corners of a triangle labeled Precision, Speed, and Cost. SLA wins on precision for curved geometry but costs the most and is slower. DLP wins on speed and resolution but costs more than MSLA. MSLA wins on cost and is now competitive on speed — which is why the consumer market has settled on it. Professional applications often still prefer SLA or high-end DLP for material breadth and calibrated accuracy.

The following table summarizes the key differences:

| Technology | Light Source | Cures Layer | XY Resolution | Relative Cost | Best For |
|---|---|---|---|---|---|
| SLA | UV laser + galvos | Point by point | ~140 µm (beam size) | High | Professional, large parts |
| DLP | UV projector (DMD) | Full layer at once | Depends on chip/magnification | Medium-High | Speed + detail balance |
| MSLA | UV LED + mono LCD | Full layer at once | 22–50 µm (consumer) | Low | Consumer, hobbyist |

---

## Resin Printer Anatomy

Understanding the hardware of an MSLA printer (by far the most common type in school settings) helps you interpret what each setting does and diagnose problems when they occur.

Before examining individual components, it helps to picture the whole machine: a box containing a UV light source at the bottom, an LCD mask directly above it, a resin-filled vat sitting on the LCD, and a build platform suspended above that can raise and lower on a lead screw. The print grows downward from the platform, pulling through the vat with each layer.

The major components are:

- **Build platform** — a flat, textured metal plate to which the print adheres layer by layer. It's attached to a Z-axis carriage driven by a precision lead screw. If the platform isn't level relative to the FEP film, layers will peel unevenly or fail to adhere.
- **LCD and light source** — the monochrome LCD and the UV LED matrix beneath it together define which areas of resin receive UV exposure for each layer.
- **Resin vat** — a container that holds liquid resin. The bottom of the vat is a flexible, UV-transparent film: FEP (fluorinated ethylene propylene). This film is critical to how bottom-up printing works and requires regular inspection and replacement.
- **Z-axis lead screw and linear rails** — provide the vertical motion that lifts the platform between layers.
- **Mainboard and touchscreen** — run the printer firmware, accept print files (via USB), and control exposure timing, Z motion, and build-platform lift sequences.

### LCD and Light Source: Resolution and Uniformity

The **LCD** (liquid crystal display) in an MSLA printer is a monochrome UV-transparent panel that masks UV light into the layer's cross-section shape. The UV LED matrix below provides the light energy that passes through the open pixels and cures the resin.

Two specifications govern print quality here:

- **XY resolution** = LCD pixel size. A 6-inch 4K mono LCD with 3840×2400 pixels has a pixel pitch of about 35 µm — meaning the finest possible feature is about 35 µm wide (0.035 mm). Compare this to FDM's nozzle diameter of 0.4 mm.
- **Light uniformity** — the UV LEDs must illuminate the entire LCD plane evenly. Hot spots (areas with more UV intensity) cure faster and can create dimensional variation across the print. Quality printers include light-collimating arrays (parallel-light modules) to reduce hot spots.

### Resin Vat and FEP Film

The **resin vat** holds the liquid photopolymer, and its transparent bottom film is called **FEP** (fluorinated ethylene propylene). FEP is chosen because it has extremely low surface energy — cured resin sticks to the build platform much more readily than to FEP, which allows the peeling motion to work. However, FEP does stick slightly to each cured layer, which is why the lift motion includes a deliberate separation sequence.

FEP film degrades over time. UV exposure, physical abrasion from the build platform, and the peel forces of thousands of layers gradually cloud, scratch, and stretch the FEP. A cloudy FEP scatters UV light and degrades layer sharpness. Inspect the FEP before every session and replace it when you see visible clouding, scratches in the exposure zone, or visible deformation. Most FEP films are inexpensive and designed to be user-replaceable.

---

## Exposure Settings

The most critical tuning variable in resin printing is **exposure time** — how long the UV light illuminates each layer. Too short: layers under-cure and won't bond properly, leading to print failures. Too long: layers over-cure and bloom outward (called "bleed"), reducing detail and potentially locking supports to fine features permanently.

Two exposure parameters matter most:

- **Normal layer exposure** — the time used for all layers except the bottom layers (typically 1–4 seconds for modern mono LCDs).
- **Bottom layer exposure** — the time for the first 3–10 layers, which must adhere firmly to the build platform (typically 20–60 seconds for mono LCDs). These layers are deliberately over-exposed relative to the rest of the print to ensure platform adhesion.

The ratio between bottom and normal exposure is a common source of dimensional error. Over-exposed bottom layers create **elephant's foot** — the base of the print is wider than intended because cured resin bleeds outward. Reducing bottom layer exposure or using the "transition layers" setting (which gradually ramps down from bottom exposure to normal exposure) helps correct this.

Optimal exposure settings depend on:

- Resin brand and color (each formulation has a different photosensitivity)
- LCD UV transmission (varies by panel and age)
- Temperature (resin viscosity and cure rate change with temperature)
- Desired layer height (thinner layers cure faster; thicker layers need more time)

The community-maintained database **Chitubox** and third-party validator prints (like the "Matrix Test" or "Exposure Test File") are standard tools for dialing in exposure settings for a new resin on a specific machine.

#### Diagram: Exposure Setting Explorer

<iframe src="../../sims/resin-exposure-explorer/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Resin Exposure Setting Explorer</summary>
Type: microsim
**sim-id:** resin-exposure-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: Demonstrate
Learning Objective: Students demonstrate the relationship between exposure time and layer cure depth/bleed by adjusting a slider and observing cross-section changes in a simulated layer.

Canvas layout:
- Top (80px): Two sliders — "Normal Layer Exposure (s)" range 0.5–6.0, and "Bottom Layer Exposure (s)" range 5–80
- Center (300px): Cross-section view of a resin layer being cured:
  - Shows LCD pixel column (light blue = UV passing through)
  - Shows resin layer as a horizontal rectangle
  - Shows cured zone expanding downward and outward as exposure increases
  - Annotates cure depth and bleed width in mm
- Bottom (100px): Status indicators: "Under-cured / Optimal / Over-cured" with color coding, plus dimensional error estimate for bottom layer elephant's foot

Visual elements:
- UV rays shown as short yellow vertical lines from LCD to resin surface
- Cured resin shown in a darker teal color filling from the top of the layer down to cure depth
- If over-exposed, cured zone bleeds sideways past the pixel boundary (shown in orange)
- Target cross-section outline shown in dashed line for reference
- Real-time label: "Cure depth: X µm, Bleed: Y µm"

Interactive controls:
- Normal exposure slider (primary)
- Bottom exposure slider
- Toggle: "Show bottom layer / normal layer" switches which scenario is visualized
- Button: "What happens to my print?" — shows a simplified cross-section of the base of a print using the current settings

Default parameters:
- Normal exposure: 2.0 s
- Bottom exposure: 30 s

Instructional Rationale: Parameter exploration is appropriate for Apply-level objectives. Students need to build physical intuition for how over- and under-exposure manifest in the printed part — this is difficult to convey through prose alone.

Responsive: scales to container; minimum 320px.
</details>

---

## Resin Supports

Resin supports differ from FDM supports in geometry and purpose. Both support overhanging geometry, but resin printing has a specific additional requirement: the supports must anchor the print to the build platform during the peel motion. Each time the platform lifts, the FEP film peels away from the cured layer — generating significant tensile forces. Without adequate supports connecting the print to the platform, these forces can tear the part loose or cause delamination.

Key differences between FDM and resin supports:

- **Tip size** — Resin supports taper to very fine tips (typically 0.3–0.6 mm) where they contact the model, minimizing the contact mark left behind after removal. FDM supports use wider contact areas because they don't need to resist peel forces.
- **Density** — Resin supports are denser than FDM supports for complex bottom surfaces; the peel force is distributed across many small supports rather than a few large ones.
- **Automatic vs. manual placement** — Slicer software (Chitubox, Lychee Slicer) can auto-place supports but frequently makes poor decisions on organic geometry. Experienced resin printers manually add or remove supports, particularly on jewelry, figurines, and dental models.
- **Orientation strategy** — Resin prints are typically oriented at an angle (30–45° from vertical) to reduce layer cross-section area, which reduces peel forces and minimizes the number of layers where large flat surfaces must pull away from the FEP simultaneously.

---

## The Wash-and-Cure Workflow

When a resin print finishes, it is not actually finished: it's still covered in liquid uncured resin and its interior may not be fully polymerized. The **wash-and-cure workflow** is a mandatory post-processing sequence for all resin prints.

Before we cover the procedure, two important safety notes: always wear **nitrile gloves** when handling uncured resin prints, and work in a ventilated space. Uncured resin is a skin sensitizer — repeated skin contact without protection can cause allergic reactions that worsen with each subsequent exposure.

The wash-and-cure procedure:

1. **Remove the print from the build platform** — use a print removal tool (a flexible scraper) to pop the print loose. Work carefully: thin resin parts are brittle when freshly printed.
2. **Initial rinse** — hold the print over the resin vat while removing to let excess liquid drip back into the vat.
3. **Wash station** — submerge the print in isopropyl alcohol (IPA) at 91% or higher concentration, or in a dedicated resin wash solution. Agitate (a magnetic stirrer or dedicated wash station works well) for 2–5 minutes to dissolve uncured resin from the surface and support cavities.
4. **Second rinse** — if the IPA wash is heavily saturated (visibly cloudy/yellow), a second rinse in fresh IPA removes residual contaminants.
5. **Dry** — allow the part to air dry completely. Residual IPA on the surface will prevent proper UV curing and cloud the surface.
6. **UV cure** — place the dry print in a UV curing station (or under direct sunlight as a lower-quality alternative) for the resin manufacturer's recommended time (typically 2–8 minutes depending on resin and station power). This completes the polymerization and achieves full material properties.
7. **Support removal** — remove supports after curing while the print is in its final hardened state. (Some printers remove supports before curing when parts are still slightly flexible — this can work for some geometries but risks permanent deformation.)

!!! mascot-tip "Wash Fresh, Cure Dry"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Benchy gives practical advice">
    Two phrases worth memorizing: "wash fresh" (don't let uncured resin dry on the part — wash immediately after removing from the platform) and "cure dry" (never put a wet or IPA-damp part in the curing station — the solvent prevents full cure and creates a tacky surface). These two rules prevent about 80% of post-processing failures.

### IPA Handling

**Isopropyl alcohol (IPA)** is both the most common wash solvent and a fire hazard. Its flash point is 11.7 °C — it will ignite from a spark at most room temperatures. Safe IPA handling requires:

- Store IPA in a sealed container away from heat sources and printers.
- Never wash parts near an open flame or spark source.
- Allow spent IPA (loaded with dissolved resin) to be cured under UV light (outdoors in direct sun works well) before disposal as solid waste — do not pour down a drain.
- Use a dedicated wash container with a lid; don't leave IPA open and evaporating in a workspace.
- Saturation levels: IPA loaded with dissolved resin becomes less effective at cleaning. Replace IPA when it appears noticeably discolored or when washes take significantly longer to achieve cleanliness.

---

## Resin PPE: Non-Negotiable

Resin printing requires personal protective equipment at every step where contact with liquid resin is possible. The hazards justify it:

- **Skin sensitization** — photopolymer resin contains acrylate monomers that can penetrate skin. Initial exposures may produce no reaction; repeated exposures can develop into a chronic contact allergy with no cure. Once sensitized, you may be unable to work with resin safely at all.
- **Eye hazard** — liquid resin splashed into the eyes causes irritation and potentially chemical burns. Safety glasses should be worn whenever the resin vat is open or when removing supports from uncured prints.
- **Respiratory hazard** — resin vapors and mist are irritating to respiratory tissue. Work in a ventilated space; dedicated exhaust ventilation is preferred for extended printing sessions.
- **UV hazard** — UV curing stations emit light that can cause eye damage and skin burns. Never look directly into a curing station, and ensure the UV lid/cover is closed during curing.

Minimum PPE for every resin session:

- **Nitrile gloves** (at least 4 mil thickness) — wear from first handling through the end of curing
- **Safety glasses or goggles** — whenever the vat is open or supports are being removed from uncured parts
- **Adequate ventilation** — exhaust fan, open window, or HEPA/carbon filtration

!!! mascot-warning "Resin Sensitization Is Permanent"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Benchy warns about a serious hazard">
    Unlike most workshop hazards where exposure has an immediate cost you can stop, resin sensitization is cumulative and irreversible. You don't get a warning when you're approaching the sensitization threshold. The gloves are not inconvenient extra steps — they are the entire mitigation strategy for the most serious long-term health risk in 3D printing.

---

## Mono LCD Resolution: The Technology Shift

Early consumer MSLA printers used standard color LCDs repurposed for UV blocking. These panels absorbed a significant fraction of UV light even in "open" pixels, limiting throughput and requiring long exposure times (10–20 seconds per layer). The shift to **monochrome (mono) LCD panels** — first popularized in printers like the Elegoo Saturn and Anycubic Photon Mono — removed the color filter matrix and increased UV transmission by 4–6×.

The practical effect is dramatic:

- Normal layer exposure times dropped from 8–15 seconds to 1.5–3 seconds.
- Print times for the same model dropped by 60–75%.
- Mono LCDs have longer service lives than color LCDs under UV load (typically 2000+ hours vs. 400–600 for color).
- Higher light transmission allows the use of engineering and dental resins that require very high UV intensity for proper cure.

Current (2025) high-end consumer MSLA printers use 12K or 14K mono LCD panels with pixel sizes of 19–22 µm — resolution approaching the limits of what UV diffraction allows at practical exposure times. At these resolutions, the limiting factor for feature fidelity is no longer the display but the resin's own polymerization diffusion radius.

---

## Large-Format Resin Printing

Consumer resin printers have historically had small build volumes (130×80×150 mm is typical for a 6-inch panel). **Large-format resin printers** use larger panels (10–15+ inches) or tilted-FEP / continuous printing mechanisms to expand the build envelope substantially.

Two approaches dominate large-format consumer and prosumer resin printing:

- **Large mono LCD** — printers like the Elegoo Saturn 4 Ultra (12-inch 16K panel) achieve 218×123×260 mm build volumes with sub-30 µm XY resolution. These printers use larger UV LED arrays and more rigid Z-axis structures to maintain accuracy at scale.
- **Continuous liquid interface production (CLIP) / continuous printing** — used in higher-end machines, this approach maintains a thin "dead zone" of oxygen-inhibited uncured resin between the FEP and the cure zone, allowing continuous Z motion without the peel cycle. This eliminates the peel-force limitation entirely and enables print speeds an order of magnitude faster than conventional MSLA.

Large-format resin opens applications that were impractical with small build volumes: full dental arches, scale architectural models, large figurines and cosplay props, and production-run small parts. The trade-off is increased resin cost per print, larger IPA wash requirements, and longer curing times.

#### Diagram: Resin Process Comparison Explorer

<iframe src="../../sims/resin-process-comparison/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Resin Process Comparison Explorer</summary>
Type: diagram
**sim-id:** resin-process-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Compare
Learning Objective: Students compare SLA, DLP, and MSLA processes by examining how each technology delivers UV light to the resin vat, and analyze the trade-offs between precision, speed, and cost.

Visual layout:
- Three side-by-side cross-section diagrams (SLA, DLP, MSLA), each showing:
  - The light source at the bottom (laser dot for SLA, projector cone for DLP, LED array for MSLA)
  - The masking element (galvo mirrors for SLA, DMD chip for DLP, LCD panel for MSLA)
  - The resin vat with FEP film
  - The build platform above with a partially built object
  - Animated UV light path for each technology (laser tracing for SLA, full-layer flash for DLP/MSLA)

Interactive elements:
- Click any diagram: Expand a side panel with specs — light source, typical XY resolution, layer cure time, relative cost, best use cases
- Toggle "Animate Layer": Shows an animated cycle of one layer exposing for each selected technology simultaneously — helps compare speed differences visually
- Hover any component label: Shows a tooltip with the component's definition
- "Compare Spec" button: Opens a floating comparison table with all three technologies side by side

Color coding:
- UV exposure zones: yellow (active) → teal (cured resin)
- Build platform: gray with dark hatching for cured layers
- Resin: transparent blue for liquid, dark teal for cured

Animation details:
- SLA: laser dot scans across the cross-section pattern (fast)
- DLP/MSLA: full rectangular flash with a single frame (faster for large layers)
- Timer below each shows relative layer time at typical settings

Responsive: maintains 3-column layout down to 600px, then stacks to vertical for smaller screens.
</details>

---

## Key Takeaways

- Vat photopolymerization cures liquid photopolymer resin with UV light layer by layer; resolution is typically 10–100 µm in XY, far finer than FDM.
- SLA uses a laser + galvos (precision, expensive); DLP uses a micromirror projector (speed + precision, moderate cost); MSLA uses an LED array + mono LCD (speed + low cost, dominant consumer technology).
- The resin vat's FEP film creates the peel interface that allows bottom-up printing; it requires regular inspection and replacement.
- Exposure time is the primary tuning dial: under-exposure causes layer failures; over-exposure causes bleed, elephant's foot, and fused supports.
- Resin supports must anchor prints against peel forces; fine tips minimize surface marks; manual placement outperforms auto-support for complex geometry.
- The wash-and-cure sequence (IPA wash → air dry → UV cure) is mandatory; cured resin is inert, but uncured resin is a skin sensitizer.
- IPA is a fire hazard — store safely, keep away from sparks, and dispose of saturated IPA by curing under UV before treating as solid waste.
- Minimum PPE: nitrile gloves, safety glasses, and adequate ventilation at every step where liquid resin may be contacted.
- Monochrome LCD panels increased UV transmission 4–6× over color LCDs, reducing exposure times from ~10 seconds to ~2 seconds.
- Large-format resin printers extend the build envelope to 200+ mm, enabling dental, architectural, and prosumer production applications.

??? question "Check Your Understanding: Why Do Resin Prints Need a Separate UV Cure Step After Washing? — Click to Reveal"
    When a print leaves the printer, it is only surface-cured to a depth approximately equal to one layer. The interior and any areas shielded by geometry may not be fully polymerized. The UV curing step completes the cross-linking throughout the part, achieving full mechanical properties (hardness, stiffness, impact resistance). Printing without curing results in a part that is brittle, tacky, and continues to shrink as residual monomers slowly cross-link — degrading dimensional accuracy over time.

!!! mascot-celebration "Resin Printing Is in Your Toolkit"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Benchy celebrates with you">
    You now understand how three different light-based processes build parts from liquid resin, why PPE is non-negotiable, and how to take a print from vat to finished part safely. Resin printing unlocks a level of surface detail and resolution that FDM simply can't match for certain applications. Next up in Chapter 11, we dive into designing for the manufacturing process — learning how to orient, hollow, and structure parts specifically for additive processes.
