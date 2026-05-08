---
title: AM Standards, Process Families, and Industrial AM
description: ISO and ASTM standards bodies, the ISO/ASTM 52900 terminology standard, the seven AM process categories, and industrial powder-bed fusion technologies.
generated_by: claude skill chapter-content-generator
date: 2026-05-07 20:52:39
version: 0.08
---

# AM Standards, Process Families, and Industrial AM

## Summary

This chapter introduces the formal vocabulary of additive manufacturing: ISO and ASTM as standards bodies, the foundational ISO/ASTM 52900 terminology standard, and the seven AM process categories that organize every printing technology you will encounter. It also covers the industrial implementations of powder-bed fusion (SLS, MJF, DMLS, EBM) and the surrounding industrial AM context (build chamber atmosphere, post-build heat treatment, industrial vs. hobby systems), so that students understand how desktop printing relates to the metal-AM and production environments described by America Makes.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. ISO Standards Body (Concept 19)
2. ASTM International (Concept 20)
3. ISO ASTM 52900 Standard (Concept 21)
4. AM Process Categories (Concept 22)
5. AM Vocabulary Glossary (Concept 23)
6. Layer-By-Layer Principle (Concept 24)
7. Build Volume (Concept 25)
8. Build Plate (Concept 26)
9. Z Axis Direction (Concept 27)
10. Anisotropy (Concept 28)
11. Material Extrusion (Concept 29)
12. Vat Photopolymerization (Concept 30)
13. Powder Bed Fusion (Concept 31)
14. Material Jetting (Concept 32)
15. Binder Jetting (Concept 33)
16. Directed Energy Deposition (Concept 34)
17. Sheet Lamination (Concept 35)
18. SLS Process (Concept 40)
19. MJF Process (Concept 41)
20. DMLS Process (Concept 42)
21. EBM Process (Concept 43)
22. Industrial Vs Hobby Systems (Concept 150)
23. Metal AM Overview (Concept 152)
24. Build Chamber Atmosphere (Concept 153)
25. Post-Build Heat Treatment (Concept 154)

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations and History of Additive Manufacturing](../01-foundations-and-history/index.md)

---

!!! mascot-welcome "Welcome to Chapter 2"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Benchy waves hello">
    Welcome to the chapter where 3D printing gets its official vocabulary. You're about to learn the language that engineers, researchers, and manufacturers use worldwide — the ISO/ASTM 52900 standard — plus the seven process families that organize every AM technology you'll ever encounter. By the end, you'll be able to read a technical AM document without feeling like you wandered into the wrong country without a phrasebook.

## Who Writes the Rules? The Standards Bodies

Before you can speak a language fluently, you need to know who wrote the dictionary. In the world of additive manufacturing, two organizations share that responsibility: **ISO** and **ASTM International**. Neither of them makes printers. Both of them make sure that when an engineer in Minnesota writes "layer height" and an engineer in Japan writes "layer thickness," they mean exactly the same thing.

### ISO: The Global Standards Body

The **International Organization for Standardization** — better known as **ISO** — is a Geneva-based non-governmental organization that develops and publishes international standards across nearly every field of technology and commerce. Founded in 1947 and now representing 167 national member bodies, ISO operates on a simple idea: when all countries agree on what words and measurements mean, products and technologies can cross borders and work together reliably.

ISO standards carry a distinctive numbering format: "ISO" followed by a number and often a year (for example, ISO 9001:2015 for quality management systems). You will encounter ISO numbers throughout your career in manufacturing, engineering, and design. ISO does not mandate that companies follow its standards — it defines them. Governments, customers, and contracts are what make compliance practical.

### ASTM International: Standards for Materials and Testing

**ASTM International** (formerly the American Society for Testing and Materials) plays a complementary role. Where ISO tends toward broad international consensus, ASTM has historically specialized in materials testing, performance standards, and manufacturing processes — exactly the domain that additive manufacturing occupies.

Founded in 1898 and headquartered in West Conshohocken, Pennsylvania, ASTM organizes its work into technical committees. Committee F42 — formally the "Committee on Additive Manufacturing Technologies" — develops all of ASTM's AM-specific standards. If you read a research paper that cites "ASTM F3091" or "ASTM F2924," that work came out of F42.

The relationship between ISO and ASTM matters for AM because the two organizations chose to collaborate rather than compete. Beginning in 2011, ISO Technical Committee 261 (ISO/TC 261) and ASTM Committee F42 agreed to jointly develop a unified set of AM standards, publishing them under the shared "ISO/ASTM" designation. The result is a family of documents that carry both organizations' authority worldwide.

#### Diagram: ISO and ASTM Collaboration Map

<details markdown="1">
<summary>ISO and ASTM Collaboration Map</summary>
Type: interactive-infographic
**sim-id:** iso-astm-collaboration-map<br/>
**Library:** vis-network<br/>
**Status:** Specified

**Learning objective:** Recall and explain the roles of ISO and ASTM as standards bodies in additive manufacturing (Bloom L1–L2: identify, explain).

**Description:** A vis-network node-link diagram showing the relationship between ISO/TC 261 and ASTM F42, their collaboration agreement, and the resulting ISO/ASTM joint standards. The network has three layers:
- Layer 1 (top): Two large anchor nodes — "ISO / TC 261" (blue, Geneva icon) and "ASTM F42" (red, Pennsylvania icon)
- Layer 2 (middle): A shared node labeled "Joint Standards Agreement (2011)" connected to both anchors with bidirectional arrows
- Layer 3 (bottom): Three outcome nodes branching from the agreement node — "ISO/ASTM 52900 (Terminology)", "ISO/ASTM 52910 (Design)", and "ISO/ASTM 52921 (Coordinate Systems)"

**Interactions:** Clicking any node opens a right-side infobox with: organization name, founding year, headquarters, primary focus, and a one-sentence description of their role in AM standardization. Hovering highlights connected edges. A toggle button switches between "Focus: Terminology" and "Focus: All Standards" to filter visible nodes.

**Canvas size:** 700 × 400 px, responsive.
**Layout:** Hierarchical top-to-bottom.
**Colors:** ISO nodes in blue (#1565C0), ASTM nodes in red (#C62828), shared/joint nodes in purple (#6A1B9A), text in white on node backgrounds.
</details>

## ISO/ASTM 52900: The AM Dictionary

The most important document you'll encounter in this course is **ISO/ASTM 52900**, titled *Additive Manufacturing — General Principles — Fundamentals and Vocabulary*. Think of it as the official dictionary for all of additive manufacturing. First published in 2015 and updated in 2021, it defines the terms and categories that every other AM standard — and this textbook — builds on.

!!! mascot-thinking "The Standard That Standardized Everything"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Benchy thinks carefully">
    ISO/ASTM 52900 is one of those documents that seems dry until you realize what it actually does: it ended years of competing vocabularies. Before 2015, one company called it "fused deposition modeling," another called it "fused filament fabrication," and a third called it "material extrusion." ISO/ASTM 52900 said: they're all the same thing, and the official category name is *material extrusion*. That's the kind of clarity that lets engineers collaborate across companies and countries.

The standard's most consequential contribution is establishing the **seven additive manufacturing process categories** — a framework that organizes every AM technology into one of seven families based on how the technology joins material together. You'll use this framework for the rest of the course and likely for the rest of your career.

### The AM Vocabulary Glossary

ISO/ASTM 52900 does more than categorize processes. It provides precise definitions for the core terms that show up in every AM conversation. A few foundational ones are worth defining now, because you'll see them in every chapter that follows:

- **Additive manufacturing (AM):** The process of joining materials to make parts from 3D model data, usually layer upon layer, as opposed to subtractive and formative manufacturing methodologies.
- **Build:** A single production run of an AM system — the act of fabricating one or more parts.
- **Layer:** A thin cross-sectional slice of material deposited or solidified during a single pass of the AM system.
- **Part:** The object being fabricated; may be a single geometry or multiple nested geometries in a single build.
- **Feedstock:** The raw material input to an AM process (filament, resin, powder, wire, sheets, etc.).
- **Support structure:** Material added to a build to support overhanging geometry; usually removed after fabrication.

These definitions matter because precision matters. When a print shop quotes you a "build" with five "parts," you need to know whether you're paying for one machine run or five.

## The Building Blocks: Universal AM Geometry

Regardless of which of the seven process categories you are using, all additive manufacturing shares a set of geometric fundamentals. Understanding these is like understanding the grammar of a language — once you have it, every process makes more sense.

### Layer-by-Layer Principle

Every AM process, without exception, builds a part by adding thin cross-sections of material one on top of the next. This **layer-by-layer principle** is what makes AM "additive" — you begin with nothing and accumulate material until the shape is complete. The computer slices your 3D model into hundreds or thousands of horizontal planes, and the machine executes each slice in sequence.

The thickness of each layer (called **layer height** in most slicer software) is one of the most powerful variables you control. Thinner layers produce smoother surfaces and finer detail but take longer to print. Thicker layers print faster but leave visible steps on curved surfaces. Most FDM printers operate between 0.05 mm and 0.35 mm per layer. Industrial metal AM systems commonly work at 0.02–0.10 mm.

### Build Volume, Build Plate, and the Z Axis

Three closely related terms define the physical space in which your printer works:

**Build volume** is the maximum three-dimensional envelope of space in which an AM system can fabricate — the answer to the question "how big a part can this machine make?" It is typically expressed as X × Y × Z dimensions in millimeters. A desktop FDM printer might have a build volume of 220 × 220 × 250 mm. An industrial polymer SLS machine might offer 380 × 380 × 600 mm. Understanding build volume helps you decide whether a part needs to be printed whole or split into segments.

**Build plate** (also called the build platform or print bed) is the physical surface on which printing begins. In FDM, the first layer adheres directly to the build plate. In SLS and other powder-bed processes, the build plate indexes downward after each layer, allowing fresh powder to be spread across the top. The build plate is one of the most calibration-sensitive components in any printer — its flatness and temperature directly affect whether your first layer succeeds.

**Z axis direction** refers to the vertical direction in which a part grows during the build. In standard orientation, Z is up. Each new layer is added at a slightly higher Z position than the one before it. This direction is not arbitrary — it determines the orientation of your part in the machine, and orientation is one of the most consequential design decisions in AM.

### Anisotropy: Why Direction Matters

Here is one of the most important insights in all of additive manufacturing, and one that catches beginners off guard:

**Parts built with AM processes are not equally strong in all directions.** This property — where mechanical behavior differs depending on the direction of applied load — is called **anisotropy**. The word comes from Greek: *an-* (not) + *isos* (equal) + *tropos* (direction).

In an FDM part, the bonds between adjacent layers are the weakest links in the structure. A force applied parallel to the layers (the XY plane) breaks fewer inter-layer bonds than a force applied perpendicular to them (the Z direction). This means a printed hook oriented with its critical load running horizontally through many layers is significantly stronger than the same hook printed vertically, where the load must travel across layer-to-layer interfaces.

!!! mascot-warning "Z-Direction Loads Will Surprise You"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Benchy looks concerned">
    The most common strength-related mistake beginners make is forgetting anisotropy when choosing print orientation. If your part needs to resist a bending or tensile force, make sure that force runs through the layers, not across them. A part that looks right on the build plate can be dangerously weak if it's oriented so the critical load pulls layers apart. I've been tested at every angle — trust me on this one.

Anisotropy affects powder-bed processes too, though often less severely than FDM. SLS nylon parts are notably more isotropic than FDM parts because powder fusion creates a more continuous matrix. Metal AM parts (DMLS, EBM) typically require post-build heat treatment partly to relieve the residual stress anisotropy introduced by rapid layer-by-layer solidification.

#### Diagram: Anisotropy Explorer

<details markdown="1">
<summary>Anisotropy Explorer</summary>
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
</details>

## The Seven AM Process Categories

With the geometric fundamentals established, you're ready for the framework at the heart of ISO/ASTM 52900: the **seven additive manufacturing process categories**. Every printing technology in existence — from the desktop FDM printer in your classroom to the million-dollar industrial metal printer at an aerospace facility — belongs to one of these seven families.

The categories are defined by *how the process joins material*, not by what material it uses or what machine brand produces it. This makes the framework durable: even as new machines emerge, they slot into one of the seven categories. Learning these seven families gives you a mental map of the entire AM landscape.

Here is a brief overview of each category before we look at them in depth:

| Process Category | How Material Is Joined | Common Example |
|---|---|---|
| Material Extrusion | Melting and depositing through a nozzle | FDM/FFF desktop printers |
| Vat Photopolymerization | Light curing liquid resin layer by layer | SLA, MSLA, DLP resin printers |
| Powder Bed Fusion | Heat-fusing a powder bed with laser or electron beam | SLS, MJF, DMLS, EBM |
| Material Jetting | Jetting droplets of material and curing | Stratasys PolyJet, inkjet-style |
| Binder Jetting | Jetting a liquid binder onto a powder bed | Desktop metal and full-color sand printers |
| Directed Energy Deposition | Melting material as it is deposited with focused energy | Wire-arc, laser-blown powder |
| Sheet Lamination | Bonding and cutting sheets of material | LOM, UAM (ultrasonic AM) |

### Material Extrusion

**Material extrusion** is the process category you're most likely to use first. A continuous strand of feedstock material — almost always a thermoplastic filament — is fed into a heated nozzle. The heat softens the material past its glass transition temperature, and the printer moves the nozzle in precise XY paths while depositing a thin road of molten plastic. Each new layer fuses to the one below it as it cools.

The familiar name for this technology is **FDM** (Fused Deposition Modeling, the original Stratasys trademark) or **FFF** (Fused Filament Fabrication, the open-source equivalent). Both terms describe the same process category. Under ISO/ASTM 52900, the formal category name is "material extrusion."

Material extrusion dominates the desktop printer market because it is mechanically simple, uses widely available filaments, and produces functional parts quickly. Its limitations — visible layer lines, anisotropy, and limited resolution — are the trade-offs you accept for cost and accessibility.

### Vat Photopolymerization

**Vat photopolymerization** works on a fundamentally different principle. Instead of depositing solid material, the process starts with a vat of liquid **photopolymer resin** — a monomer mixture that solidifies when exposed to specific wavelengths of light (typically UV or near-UV). A light source traces each layer's cross-section on the resin surface (or bottom), solidifying a thin slice. The build platform then indexes vertically, a new layer of liquid resin flows in, and the next cross-section is cured.

Three technologies fall under this category:

- **SLA** (Stereolithography): Uses a UV laser on a point-by-point path. Historically the first AM technology (patented by Chuck Hull in 1986, as covered in Chapter 1). Produces extremely fine detail and smooth surfaces.
- **MSLA** (Masked SLA): Uses an LCD panel as a photomask, curing an entire layer at once with a UV LED array. The dominant technology in affordable desktop resin printers today (Elegoo, Phrozen, etc.).
- **DLP** (Digital Light Processing): Uses a digital micromirror device (DMD chip) to project the entire layer cross-section at once. Common in professional and dental printers.

Vat photopolymerization produces the highest surface resolution of any common AM process — layer heights of 0.025–0.05 mm are normal. The trade-off is that photopolymer resins require careful handling (UV protection, gloves, ventilation) and post-processing (washing in IPA, UV curing station).

### Powder Bed Fusion

**Powder bed fusion (PBF)** uses thermal energy — from a laser or an electron beam — to selectively fuse regions of a powder bed. The machine spreads a thin layer of fine powder across the build area, then a scanning heat source traces the cross-section for that layer, fusing the powder grains together. The build platform descends by one layer thickness, fresh powder is spread, and the process repeats. Unfused powder supports the part during the build, eliminating the need for separate support structures in most cases.

PBF is commercially significant because it can process an enormous range of materials: nylon, polypropylene, thermoplastic elastomers, aluminum, titanium, stainless steel, cobalt-chrome, Inconel, and more. The industrial sub-processes within this category — SLS, MJF, DMLS, EBM — are covered in detail in the next section.

### Material Jetting

**Material jetting** works much like an inkjet document printer, scaled up to three dimensions. Hundreds or thousands of tiny nozzles jet microscopic droplets of photopolymer material onto the build surface, which are immediately cured by UV lamps carried alongside the printheads. The process can deposit multiple materials simultaneously — different colors, different mechanical properties, soluble support materials — in a single build, achieving exceptional detail and surface finish.

Material jetting systems (Stratasys PolyJet is the leading brand; 3D Systems MultiJet is another) are expensive to buy and operate and require dedicated support material that must be dissolved or blasted away. They are used heavily for visual prototypes, dental models, and multi-material functional parts where surface quality is paramount.

### Binder Jetting

**Binder jetting** separates the deposition and sintering steps. Like PBF, a powder bed is spread layer by layer. Unlike PBF, a liquid **binder** (think: a sophisticated adhesive) is jetted selectively onto the powder where each cross-section needs to be formed. The binder holds the powder particles together, but does not melt them. After the build, the "green part" (a fragile binder-held assembly) must be cured and then — for metal parts — sintered in a furnace to burn off the binder and fuse the metal powder into a dense solid.

Binder jetting has two major application spaces: full-color sand printing (for architectural models and art objects) and metal printing. Desktop Metal and ExOne (now owned by Desktop Metal) are major commercial players. Binder jetting can be faster and cheaper than laser PBF for metals, but dimensional shrinkage during sintering (typically 15–20 %) requires careful compensation.

### Directed Energy Deposition

**Directed energy deposition (DED)** deposits material and melts it simultaneously with a focused heat source. Two common feedstock types define the sub-variants:

- **Laser powder-fed DED:** A nozzle delivers metal powder into a laser beam focus point. As the deposition head moves, it builds up dense metal geometry. Used for repair, cladding, and building near-net-shape parts.
- **Wire-arc additive manufacturing (WAAM):** An electric arc (like welding) melts wire feedstock into a deposited bead. Excellent for large metal structures; lower resolution than laser DED.

DED systems excel at repairing high-value metal parts (turbine blades, mold inserts), adding features to existing components, and producing large-scale metal structures faster than powder-bed processes. Resolution is typically lower than DMLS or EBM.

### Sheet Lamination

**Sheet lamination** — the oldest and simplest process category conceptually — builds parts by bonding thin sheets of material and then cutting the cross-section profile from each sheet, or by bonding pre-cut sheets. The two main technologies are:

- **LOM (Laminated Object Manufacturing):** Bonds and laser-cuts paper, plastic, or composite sheets layer by layer. Produces large, wood-like parts inexpensively; inner geometry is difficult to remove.
- **UAM (Ultrasonic Additive Manufacturing):** Uses ultrasonic vibration to bond thin metal foils layer by layer, with a CNC mill cutting the cross-section between layers. Produces fully dense metal parts and can embed sensors or electronics inside solid metal structures.

Sheet lamination is the least common process category in typical school settings but appears in specialized applications — embedded electronics, large architectural prototypes, and metal matrix composites — where other processes fall short.

!!! mascot-tip "Match the Category to the Job"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Benchy gives a thumbs up">
    Here's the move that saves you from reprinting (or from buying the wrong machine): before you ask "how do I print this," ask "which process category fits this part?" Material, required surface finish, size, mechanical demands, and budget each point toward different categories. Resin for dental precision. FDM for quick functional prototypes. SLS for complex nylon assemblies with no support waste. Getting the category right first means the rest of the decisions get a lot easier.

#### Diagram: Seven Process Families Explorer

<details markdown="1">
<summary>Seven Process Families Explorer</summary>
Type: interactive-infographic
**sim-id:** seven-am-processes-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Identify and explain each of the seven ISO/ASTM 52900 AM process categories by feedstock type, energy source, and representative technology (Bloom L1–L2: recall, classify).

**Description:** A radial hub-and-spoke infographic centered on a "ISO/ASTM 52900" hub node. Seven labeled spokes radiate outward to category nodes, each containing the category name and a small icon representing the feedstock type (filament spool, resin vat, powder bed, droplets, powder + binder, wire/powder nozzle, sheets stack).

**Layout (700 × 600 px, responsive):**
- Center hub: Dark circle labeled "AM Process Categories" (ISO/ASTM 52900)
- 7 category nodes arranged in a ring at radius ~220 px, evenly spaced
- Each node: Rounded rectangle with category name (bold), feedstock icon below
- Color coding: Each category has a distinct hue (Material Extrusion = blue, Vat Photo = purple, PBF = orange, Material Jetting = teal, Binder Jetting = green, DED = red, Sheet Lamination = brown)

**Interactions:**
- Clicking any category node expands a detail panel below the diagram (or to the right on wide screens) showing:
  - Category name and formal ISO/ASTM 52900 definition
  - How material is joined (one sentence)
  - Two representative technologies/machines
  - Typical materials
  - One-line description of best use case
- The selected node glows with a halo effect. Previous selection dims.
- A "Compare Two" mode: click one node, then shift-click another to view a side-by-side comparison of the two categories.

**Responsive behavior:** On narrow screens (< 500 px), the radial layout collapses to a vertical list with the same clickable detail panels.

**Color scheme:** Soft pastel node backgrounds with dark text; white center hub on dark background.
</details>

## Industrial Powder Bed Fusion: SLS, MJF, DMLS, and EBM

Among the seven process categories, **powder bed fusion** has given rise to the most significant industrial AM technologies. You'll encounter four industrial PBF sub-processes repeatedly in AM literature: SLS, MJF, DMLS, and EBM. Each occupies a specific niche in the industrial landscape.

!!! mascot-encouraging "This Section Gets Technical — You've Got This"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Benchy cheers you on">
    The next few pages cover industrial processes that most students won't operate hands-on in a high-school class. That's fine — understanding what these machines do and why they matter is exactly the kind of knowledge that sets you apart in a college engineering course or a technical job interview. Read it like you're building a map of a territory you'll explore later in your career.

### SLS: Selective Laser Sintering

**Selective Laser Sintering (SLS)** uses a CO₂ laser to sinter (partially fuse) polymer powder — most commonly nylon (PA 12 or PA 11) but also polypropylene, TPU, and composite-filled variants — in a controlled bed. The term "sintering" is technically imprecise for polymer SLS (the material actually melts rather than sinters in the metallurgical sense), but the name has stuck from the process's 1980s origins at the University of Texas.

SLS machines operate at elevated bed temperatures just below the polymer's melting point, which dramatically reduces the energy the laser needs to deliver to complete fusion. Unfused powder from surrounding regions acts as a natural support, making SLS ideal for complex geometries — undercuts, internal channels, living hinges, and interlocking assemblies — that would require extensive support structures in FDM. SLS nylon parts exhibit near-isotropic mechanical properties, making them popular for functional end-use parts.

Industrial SLS machines from EOS, Farsoon, Sinterit, and Formlabs (Fuse 1+) range from desktop scale to large production systems. A typical industrial SLS build chamber is 340 × 340 × 600 mm or larger.

### MJF: Multi Jet Fusion

**Multi Jet Fusion (MJF)** is HP's industrial AM process, introduced in 2016. It is technically a powder bed process, but it does not use a laser. Instead, a printhead array jets two agents across a nylon powder bed: a **fusing agent** on the regions to be solidified, and a **detailing agent** on the boundary between fused and unfused powder to sharpen edges. An infrared lamp then passes over the bed, heating the fusing-agent-coated powder to fusion while the detailing agent inhibits fusion at boundaries, producing crisp, smooth edges.

MJF's key advantages are speed (the entire layer is fused in a single IR pass), part accuracy, and cost-effectiveness for medium-to-high production volumes. Gray and black nylon are standard; full-color capability (HP Jet Fusion 5200 series) enables color-functional parts. MJF competes directly with SLS for industrial polymer AM, often winning on production throughput.

### DMLS: Direct Metal Laser Sintering

**Direct Metal Laser Sintering (DMLS)** is the leading industrial process for metal AM. Originally an EOS GmbH trademark (now used generically), DMLS uses a fiber laser — typically 200–1000 W — to selectively melt (not merely sinter) fine metal powder in a bed. Common materials include titanium alloys (Ti-6Al-4V), aluminum (AlSi10Mg), stainless steels (316L, 17-4 PH), tool steels, cobalt-chrome, and nickel superalloys like Inconel 625 and 718.

Because metal powder beds require precise atmospheric control (more on this below), DMLS systems are complex and expensive — industrial machines range from $300,000 to well over $1,000,000. The parts they produce, however, are fully dense metal components with mechanical properties comparable to or exceeding wrought stock. Aerospace, medical implants, and motorsport are the dominant end markets.

The related term **SLM (Selective Laser Melting)** describes the same process but emphasizes that the powder is fully melted rather than sintered. The distinction is largely semantic in practice; the technical community is converging on "Laser Powder Bed Fusion" (LPBF) as the preferred umbrella term.

### EBM: Electron Beam Melting

**Electron Beam Melting (EBM)**, commercialized by Arcam AB (now GE Additive), uses a focused electron beam rather than a laser to melt metal powder. This creates important differences from DMLS:

- **Vacuum atmosphere:** EBM must operate in a high-vacuum chamber because electrons scatter in air. The vacuum also eliminates oxidation, beneficial for reactive metals like titanium.
- **Elevated bed temperature:** The electron beam preheats the entire powder bed to near-sintering temperature before the melt scan, reducing residual stress and distortion — a significant advantage over laser PBF.
- **Scan speed:** Electron beams are deflected magnetically, with no moving mechanical parts, enabling very high scan speeds.
- **Materials:** EBM is particularly suited to titanium (Ti-6Al-4V, Ti-6Al-2Sn-4Zr-2Mo) and cobalt-chrome. It is the dominant process for orthopedic implants — hip cups, spinal fusion cages, and knee components with porous lattice structures that promote bone ingrowth.

EBM parts typically require less post-build support removal than DMLS because the preheated bed reduces distortion, and parts are often embedded in sintered powder that holds them in place.

#### Diagram: Industrial PBF Process Comparison

<details markdown="1">
<summary>Industrial PBF Process Comparison</summary>
Type: interactive-infographic
**sim-id:** industrial-pbf-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Compare SLS, MJF, DMLS, and EBM on energy source, material, atmosphere, and application (Bloom L4: differentiate, compare, contrast).

**Description:** A 2 × 2 interactive grid displaying SLS, MJF, DMLS, and EBM as four equal quadrant panels. Each panel shows:
- Process acronym (large, bold) and full name (smaller)
- Energy source icon (laser = yellow beam, IR lamp array = orange wave, electron beam = blue lightning)
- Material icon (polymer powder = yellow granules, metal powder = gray granules)
- Atmosphere icon (inert gas = cloud, vacuum = empty ring)
- One key application example (text)

**Canvas size:** 700 × 480 px, responsive (2 × 2 on wide screens, stacked 1-column on narrow screens).

**Interactions:**
- Clicking any quadrant panel expands it to full-width detail view showing:
  - Full process description (3–4 sentences)
  - Energy source with wattage range
  - Typical materials (bulleted list)
  - Atmosphere requirement
  - Build volume range (example machine)
  - Key advantage and key limitation
  - Representative end-use applications
  - "Back" button to return to grid
- A "Compare Mode" toggle at top: when active, clicking a second panel places both detail views side-by-side for direct comparison.
- Hovering any panel highlights it with a bright border and shows a tooltip with the process's one-sentence definition.

**Color coding:** SLS = green-toned, MJF = blue-toned, DMLS = orange-toned, EBM = purple-toned.
</details>

## Industrial AM Context: Atmosphere, Systems, and Heat Treatment

Running a metal AM system — whether DMLS or EBM — demands more infrastructure than plugging in a desktop printer. Three concepts define that industrial context.

### Industrial vs. Hobby Systems

The gap between a desktop FDM printer and an industrial SLS or metal AM system is not just price — it is a fundamentally different relationship with the manufacturing environment.

**Desktop / hobby AM systems** (sub-$10,000, sometimes sub-$500 for entry-level FDM) are designed to be self-contained and forgiving. They use pre-packaged materials (filament spools, pre-bottled resins), require minimal facility infrastructure, and operate in open rooms. Their process parameters are largely pre-tuned by the manufacturer. Trade-offs include lower precision, limited materials, and smaller build volumes.

**Industrial AM systems** ($100,000–$5,000,000+) require dedicated facility space with controlled temperature and humidity, material handling infrastructure (powder loading/unloading systems, powder recycling stations), process gas supply (argon or nitrogen for DMLS), high-voltage power supplies (EBM), and post-processing equipment (HIP, heat treatment furnaces, CNC machining for finishing). They provide far tighter process control, validated material databases, in-process monitoring sensors, and quality documentation that meet aerospace and medical certification requirements.

The conceptual boundary is not sharp — mid-range industrial-grade desktop systems (EOS Formiga, Formlabs Fuse) occupy a middle ground. But understanding the spectrum helps you read a machine spec sheet intelligently.

| Dimension | Hobby/Desktop | Industrial |
|---|---|---|
| Purchase price | < $10 K | $100 K – $5 M+ |
| Materials | Pre-packaged, limited | Broad; open parameter sets |
| Facility needs | Standard outlet, table | Dedicated room, gas, power |
| Part accuracy | ± 0.3–0.5 mm typical | ± 0.05–0.1 mm typical |
| Certification | None required | AS9100D, ISO 13485 for regulated markets |
| Annual volume | Dozens to hundreds of parts | Thousands to millions |

### Build Chamber Atmosphere

For metal PBF processes (DMLS and related technologies), the build chamber atmosphere is not optional — it is critical to part quality and safety. When fine metal powders (titanium, aluminum, stainless steel) are heated to melting temperatures, they react aggressively with oxygen and nitrogen in air. Oxidized metal powder produces parts with porosity, inclusions, and reduced mechanical properties.

The solution is to purge the build chamber with an **inert gas** — almost always **argon** (Ar) for laser PBF, or a **high vacuum** (< 10⁻⁴ mbar) for EBM. Before a build begins, the chamber is evacuated or flooded with inert gas until oxygen levels drop below 0.1 % (100 ppm) or lower for reactive metals. A constant gas flow during the build sweeps away metal fume and condensate ("spatter") that would otherwise re-deposit on the powder bed and contaminate the part.

Chamber atmosphere monitoring is part of every industrial DMLS machine's standard instrumentation. Oxygen sensor readings are logged and form part of the build quality record.

### Metal AM Overview and Post-Build Heat Treatment

Metal AM parts produced by DMLS or EBM are not ready for use when they come out of the machine. The rapid, localized melting and solidification during the build creates significant **residual stresses** within the part — internal forces locked in by the steep thermal gradients of layer-by-layer processing. Without treatment, these residual stresses can cause:

- Distortion or warping of the part after removal from the build plate
- Reduced fatigue life under cyclic loading
- Risk of cracking in high-strength alloys

**Post-build heat treatment** addresses these issues through controlled heating and cooling cycles. The specific treatment depends on the alloy and the intended application, but common steps include:

1. **Stress relief anneal:** Heating the part (while still attached to the build plate) to a temperature below the alloy's aging or solution temperature, holding for 1–4 hours, then slow-cooling. This relaxes residual stresses without significantly changing the microstructure.
2. **Solution annealing and aging (precipitation hardening alloys):** For alloys like Ti-6Al-4V and Inconel 718, a full solution treatment and aging cycle transforms the as-built microstructure into the desired phase structure and achieves target mechanical properties.
3. **Hot Isostatic Pressing (HIP):** A process that applies both high temperature (1000–1200 °C) and high pressure (100–200 MPa argon) simultaneously to close any residual porosity and further homogenize the microstructure. HIP is required for fatigue-critical aerospace and medical applications.

After heat treatment, metal AM parts typically receive CNC machining on critical surfaces (interfaces, holes, threads) to achieve final dimensional tolerances, since heat treatment itself introduces small distortions.

#### Diagram: Metal AM Build-to-Part Workflow

<details markdown="1">
<summary>Metal AM Build-to-Part Workflow</summary>
Type: interactive-infographic
**sim-id:** metal-am-workflow<br/>
**Library:** vis-network<br/>
**Status:** Specified

**Learning objective:** Recall and sequence the steps from metal powder to finished metal part in industrial AM (Bloom L1–L2: recall, sequence, summarize).

**Description:** A horizontal left-to-right workflow diagram using vis-network showing the complete production sequence for a DMLS metal part. Seven sequential nodes connected by directional arrows:

1. **Powder Preparation** — Sieving, moisture control, recycling assessment
2. **Build Setup** — Support design, orientation, slicing, atmosphere purge
3. **DMLS Build** — Layer-by-layer laser melting in inert atmosphere
4. **Build Plate Removal** — Wire EDM or band saw separation
5. **Stress Relief** — Furnace anneal cycle with temperature/time profile
6. **Support Removal + Machining** — CNC finishing of critical surfaces
7. **Quality Inspection** — CT scanning, dimensional metrology, surface roughness

**Interactions:** Clicking any node opens a detail panel showing:
- Step name and description (2–3 sentences)
- Typical equipment used
- Key quality control check at this step
- Typical duration or processing time
- "What goes wrong here?" — one common failure mode and its remedy

Hovering any arrow shows a tooltip describing what changes between the two steps (e.g., "Part separates from build plate but residual stress remains").

**Layout:** Horizontal chain with nodes at equal spacing; detail panel appears below the diagram.
**Canvas:** 750 × 200 px for diagram + 200 px for detail panel = 400 px total height, responsive.
**Colors:** Each step node in a sequential warm-to-cool gradient (orange → yellow → green → teal → blue → indigo → violet) to reinforce the concept of progression.
</details>

## Key Takeaways

This chapter has covered a lot of ground — from the organizations that write the standards to the furnaces that finish a metal part after it leaves the printer. Here is the core of what you now know:

- **ISO and ASTM International** jointly develop AM standards, with ISO/TC 261 and ASTM F42 collaborating since 2011 to produce unified ISO/ASTM documents accepted worldwide.
- **ISO/ASTM 52900** is the foundational AM vocabulary and process-classification standard. Every other AM standard builds on its definitions.
- All AM processes share the **layer-by-layer principle**: slicing a 3D model and joining cross-sections sequentially. The Z axis direction determines how layers stack.
- **Build volume** and **build plate** define the physical limits and starting surface of any AM system.
- **Anisotropy** — direction-dependent mechanical properties — is an inherent consequence of layer-by-layer construction and a critical design variable.
- The **seven AM process categories** (material extrusion, vat photopolymerization, powder bed fusion, material jetting, binder jetting, directed energy deposition, sheet lamination) provide a framework for understanding every printing technology.
- **SLS** (laser-sintered polymer), **MJF** (HP's agent-based polymer process), **DMLS** (laser-melted metal), and **EBM** (electron-beam-melted metal) are the dominant industrial PBF sub-processes.
- **Industrial AM systems** differ from hobby systems in precision, materials, facility requirements, and certification context.
- Metal AM parts require **inert or vacuum chamber atmospheres** during the build and **post-build heat treatment** to relieve residual stress and achieve target mechanical properties.

!!! mascot-celebration "Chapter 2 Complete — You Speak AM Now"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Benchy celebrates">
    You just built the vocabulary that the entire rest of this course runs on. Seven process categories, two standards bodies, a universal glossary, and a clear-eyed picture of how the desktop printer in your classroom relates to the million-dollar machine making titanium hip implants. That is not a small thing — most people working in manufacturing never get a clear map of the whole landscape. In Chapter 3, you'll start applying this vocabulary to the engineering design process, the systematic method that turns ideas into real, testable objects.

[See Annotated References](./references.md)
