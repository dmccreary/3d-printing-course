---
title: "Chapter 1: History and Context of Additive Manufacturing"
description: "Traces the origins of 3D printing from the Industrial Revolution through stereolithography, the FDM patent expiration, the RepRap project, and the rise of the Maker Movement and America Makes."
generated_by: claude skill chapter-content-generator
date: 2026-05-07 18:23:00
version: 0.08
---

# Chapter 1: History and Context of Additive Manufacturing

## Summary

This chapter introduces additive manufacturing (AM) by tracing its origins from the Industrial Revolution through the invention of stereolithography, the expiration of FDM patents, and the rise of the open-source RepRap movement. Students explore how desktop 3D printing transformed from an industrial prototyping tool into an accessible technology that sparked the Maker Movement. The chapter also surveys the national AM innovation ecosystem — including America Makes and community-college articulation pathways — to help students understand where this course fits in the broader landscape of modern manufacturing careers.

## Concepts Covered

1. Industrial Revolution
2. Subtractive Manufacturing
3. Additive Manufacturing
4. Stereolithography Invention
5. FDM Patent Expiration
6. Desktop Printer Revolution
7. RepRap Project
8. America Makes Institute
9. AM Innovation Institutes
10. Maker Movement
11. Algebra Basics
12. Geometry Basics
13. Units And Measurement
14. Computer File Management
15. Mouse And 3D Navigation

## Prerequisites

- No prior 3D printing experience required
- Basic computer literacy (file management, mouse navigation)
- Algebra I comfort with units and ratios

---

## Introduction: Building the Future One Layer at a Time

What if you could design an object on a computer and then — instead of carving, cutting, or casting it — grow it from the ground up, one thin slice at a time? That is exactly what additive manufacturing makes possible. The term **additive manufacturing (AM)** refers to any process that builds a physical object by depositing or fusing material layer by layer, following instructions generated from a digital model. Most people know it by the popular name *3D printing*, and over the past two decades it has shifted from a specialized industrial technology costing hundreds of thousands of dollars into a classroom-accessible tool available for a few hundred dollars.

This chapter tells the story of how that transformation happened — and why it matters for your future. You will trace the thread from the great factories of the Industrial Revolution to the open-source labs of the early 2000s, and you will see how organizations like America Makes are now training the next generation of engineers and technicians. By the end of this chapter you will have the historical vocabulary and context you need to make sense of everything that follows in this course.

Before we look at the timeline, let us briefly review the foundational skills that will support your work throughout the course. **Algebra basics** — working with units, ratios, and percentages — appear constantly when you calculate layer heights, infill densities, and material costs. **Geometry basics** such as area, volume, and angles matter when you design parts and interpret technical drawings. **Units and measurement** with the metric system (millimeters, grams, degrees Celsius) are the universal language of additive manufacturing. **Computer file management** — creating folders, saving files with consistent names, and moving files between programs — keeps your project organized from CAD model to finished print. Finally, **mouse and 3D navigation** in software lets you orbit, pan, and zoom around your digital models with confidence. These are skills you likely already have; this course will sharpen and apply them in new contexts.

---

## From Craft to Mass Production: The Industrial Revolution

To understand why additive manufacturing is significant, you need to understand what came before it. Manufacturing — the making of goods — has existed since prehistoric humans chipped stone tools. But modern industrial manufacturing emerged during the **Industrial Revolution**, roughly 1760–1840, when machines powered by steam and water replaced hand tools in European and American workshops.

The Industrial Revolution introduced two ideas that still shape manufacturing today. First, **interchangeable parts**: components made to precise, standard dimensions so that any unit of a given part fits any assembly of the same model. Before this, a broken musket lock might require a custom-fitted replacement hand-filed by a skilled gunsmith. With interchangeable parts, a factory worker could grab a part from a bin and install it without modification. Second, **division of labor**: breaking complex work into specialized tasks performed by different workers on a moving assembly line. Together, these ideas made mass production possible — the same product, made in enormous quantities, at low cost.

The Industrial Revolution's manufacturing method of choice was **subtractive manufacturing**: starting with a block of raw material (metal, wood, plastic) and removing material until the desired shape remains, using cutting tools like lathes, mills, drills, and saws. Think of subtractive manufacturing as sculpture — you reveal the shape by taking away what you do not need.

Subtractive manufacturing is powerful and precise, but it has real limitations:

- Complex internal features (hollow channels, interlocking cavities) are difficult or impossible to cut.
- Every new shape requires new tooling (molds, fixtures, cutting programs).
- Material removed as chips and shavings is often wasted.
- Short production runs of custom parts are expensive because setup costs are high.

These limitations set the stage for a fundamentally different approach.

---

## Thinking in Layers: The Concept of Additive Manufacturing

Instead of starting with more material than you need and cutting away the excess, **additive manufacturing** starts with nothing and builds up only the material the part actually requires. The process reads a digital file describing the object's geometry, slices that geometry into thousands of horizontal cross-sections (like slicing a loaf of bread), and then deposits or fuses material to reproduce each cross-section in sequence. The completed layers bond together to form the finished part.

This layer-by-layer approach unlocks capabilities that subtractive manufacturing cannot match:

- **Internal complexity at no extra cost** — hollow channels, lattice structures, and interlocking features are created the same way as any other geometry.
- **No tooling changes** — a different digital file produces a different shape; the machine itself does not change.
- **Near-zero material waste** for many processes — only the material in the part (and any support structures) is deposited.
- **Economical customization** — making one unique part costs almost the same as making one copy of a standard part.

Before we look at the diagram below, let us establish two key terms. A **voxel** (short for *volumetric pixel*) is the three-dimensional equivalent of a pixel: the smallest cube of material a printer can place. A **build envelope** is the maximum volume a printer can fabricate in a single job, defined by its width × depth × height in millimeters.

#### Diagram: How Layer-By-Layer Building Works

<details markdown="1">
<summary>Interactive: Layer-by-Layer Additive Manufacturing Process</summary>
Type: interactive-infographic
**sim-id:** layer-by-layer-process<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *explain* (Bloom L2 — Understand) how a physical object is built from a digital model through sequential layering.

**Canvas size:** 800 × 480 px, responsive to window resize.

**Visual layout:**
- Left panel (40% width): Shows a 3D wireframe box (the "build envelope") with a cross-section view. A digital model of a simple bracket is shown inside. A horizontal slider labeled "Layer" (range 1–50) sits below the left panel.
- Right panel (60% width): Shows a side-elevation cross-section view. As the slider advances, layers fill in from the bottom up, each layer highlighted briefly in orange before settling to gray. A counter shows "Layer N of 50" and the estimated height in mm (layer N × 0.2 mm).

**Interactions:**
- Dragging the Layer slider animates the build sequence.
- Clicking any visible layer in the right panel opens an infobox: "Layer [N] — Height: [N × 0.2] mm — This slice is [width] mm × [depth] mm."
- A "Play" button animates the entire build at 8 layers per second.
- Hovering the build envelope wireframe shows a tooltip: "Build Envelope: 220 × 220 × 250 mm — the maximum object size this printer can produce."

**Colors:** Background #f8f8f8; completed layers #9e9e9e; current layer #ff6600; digital model wireframe #1565c0.

**Labels:** "Digital Model (STL file)", "Sliced layers", "Layer height: 0.2 mm", "Build plate (bottom)".

**Behavior:** At layer 50, the right panel shows the completed object and displays a summary: "Object height: 10.0 mm — 50 layers × 0.2 mm each."

**Responsive design:** On window resize, both panels scale proportionally; font sizes clamp at a minimum of 12 px.
</details>

---

## 1986: The Invention of Stereolithography

Additive manufacturing as a commercial technology was born in the mid-1980s. In 1986, **Chuck Hull**, an engineer working in California, filed the first patent for a process he called **stereolithography (SLA)**. Hull's insight was that ultraviolet (UV) light could cure (harden) certain liquid resins. By directing a UV laser beam across the surface of a vat of liquid resin, he could solidify a thin layer of the desired cross-section. Lowering a build platform a fraction of a millimeter exposed a fresh surface of liquid resin on top, and the laser traced the next layer. Repeating this process hundreds or thousands of times produced a complete three-dimensional object.

Hull co-founded **3D Systems** to commercialize the technology, and the company shipped the first commercial SLA machine — the SLA-1 — in 1988. The price: roughly $300,000 (equivalent to about $750,000 today). At that cost, only aerospace companies, automotive manufacturers, and large industrial design firms could afford stereolithography machines. They used them primarily for **rapid prototyping**: building a physical model of a new part design within days rather than the weeks a machined prototype would require. Engineers could hold the prototype, check its proportions, and catch design errors before committing to expensive tooling for mass production.

Stereolithography proved that a digital-to-physical workflow was possible. Other researchers and companies raced to develop their own layer-by-layer processes. Within a decade, several distinct additive manufacturing technologies had emerged, each with different materials, resolution, speed, and cost.

---

## 1989–2009: FDM, Patents, and the Lock-In Era

One of the most important early AM processes for today's desktop printers was invented by **Scott Crump** in 1989. Crump experimented with a glue gun loaded with a mixture of polyethylene and candle wax, tracing a shape layer by layer on a platform. He called the process **Fused Deposition Modeling (FDM)**. The core idea: melt a thermoplastic filament (a thin strand of plastic), extrude it through a small nozzle, and deposit it in precise paths to build a cross-section. When the plastic cools, it solidifies and bonds to the layer below.

Crump founded **Stratasys** in 1989 and received a patent for FDM in 1992. For the next seventeen years, Stratasys held exclusive rights to the core FDM process. Industrial FDM machines cost tens to hundreds of thousands of dollars and were available only to large companies and well-funded research institutions. The technology was remarkable, but the patent system kept it out of reach for individuals and small organizations.

The table below compares the two dominant early AM processes and the subtractive manufacturing approach they challenged.

| Feature | Subtractive Manufacturing | Stereolithography (SLA) | Fused Deposition Modeling (FDM) |
|---|---|---|---|
| **Raw material** | Solid block (metal, wood, plastic) | Liquid photopolymer resin | Thermoplastic filament (spool) |
| **How shape forms** | Material removed by cutting | UV laser cures resin layer by layer | Melted plastic extruded layer by layer |
| **Internal features** | Difficult / impossible | Possible | Possible |
| **Typical accuracy** | ±0.01–0.05 mm | ±0.025–0.1 mm | ±0.1–0.3 mm |
| **Cost (1990s)** | Varies; high for complex parts | $150,000–$400,000 | $60,000–$250,000 |
| **Dominant use** | Mass production | Rapid prototyping | Rapid prototyping, tooling |

In 2009, Stratasys's core FDM patent expired. That single event changed the trajectory of the technology more than anything since Hull's original invention.

---

## 2005–2009: The RepRap Project and Open-Source Printing

While Stratasys's patent was still in force, a group of researchers at the University of Bath (UK) started a project with a bold goal: build a machine that could replicate itself. **Adrian Bowyer** launched the **RepRap Project** (short for *Replicating Rapid Prototyper*) in 2005. The key insight was that an FDM-style printer could print the plastic structural parts needed to build another printer of the same design.

Bowyer made the RepRap design entirely **open-source**: all blueprints, software, and instructions were freely published online under open licenses. Anyone could download the files, print the plastic parts, buy the inexpensive electronic components (stepper motors, a controller board, a heated nozzle), and assemble a functional printer for a few hundred dollars. The community was invited to improve the design and share their improvements — and they did, enthusiastically.

The first RepRap machine — named "Darwin" — was demonstrated in 2008. A year later, the second generation — "Mendel" — arrived. These machines were not polished consumer products; they required careful assembly and tuning. But they proved that capable FDM printing did not require a $100,000 machine. The RepRap community grew rapidly, spawning dozens of derivative designs and inspiring early companies like MakerBot (founded 2009) to build more user-friendly printers based on open-source principles.

The following list summarizes the key developments in this era:

- **2005** — Adrian Bowyer launches the RepRap Project at the University of Bath.
- **2007** — First working prototype printed; community grows online.
- **2008** — "Darwin" (RepRap v1) demonstrated publicly; first successful self-replication of printed parts.
- **2009** — "Mendel" (RepRap v2) released; Stratasys FDM patent expires; MakerBot founded.
- **2011** — "Prusa Mendel" by Josef Průša becomes the dominant community design; MakerBot ships the Replicator.
- **2012** — Desktop printers appear for under $1,000; Formlabs launches the first affordable SLA resin printer (Form 1) via Kickstarter.

---

## 2009–Present: The Desktop Revolution

When the FDM patent expired in 2009, the dam broke. Dozens of companies and thousands of hobbyists rushed into the space. Prices fell dramatically — from $60,000 to $3,000 to $500 to, eventually, under $200 for capable entry-level machines. **The desktop printer revolution** refers to this rapid democratization of 3D printing technology between roughly 2009 and 2015.

Several factors drove the revolution:

- **Patent expiration** removed the legal barrier that had kept prices artificially high.
- **Open-source community** (RepRap) had already developed and refined the technology over four years, giving commercial companies a head start.
- **Falling component costs** — stepper motors, Arduino-compatible controller boards, and heated print beds all became inexpensive commodity components.
- **Global maker culture** created demand from students, artists, engineers, and tinkerers who wanted to fabricate their own ideas.
- **Online platforms** like Thingiverse (launched 2008) provided a library of free downloadable designs, so even users with no CAD skills could immediately print useful objects.

#### Diagram: Price Decline of Desktop FDM Printers (2009–2024)

<details markdown="1">
<summary>Interactive Chart: FDM Printer Price Decline Over Time</summary>
Type: chart
**sim-id:** fdm-price-decline<br/>
**Library:** Chart.js<br/>
**Status:** Specified

**Learning objective:** Students will *interpret* (Bloom L2 — Understand) how patent expiration and open-source development drove down the cost of desktop 3D printing over fifteen years.

**Chart type:** Line chart with clickable data points.

**Data series (approximate market price for a capable consumer/prosumer FDM printer):**

| Year | Price (USD) | Event label |
|------|-------------|-------------|
| 2009 | 14,900 | Patent expiration; MakerBot founded |
| 2010 | 8,000 | MakerBot Thing-O-Matic released |
| 2011 | 2,500 | Prusa Mendel popularized |
| 2012 | 2,199 | MakerBot Replicator 2 |
| 2013 | 1,299 | Flashforge Creator released |
| 2014 | 750 | Proliferation of Chinese manufacturers |
| 2015 | 499 | Prusa i3 kit widely available |
| 2017 | 299 | Creality Ender 3 announced |
| 2018 | 229 | Ender 3 ships; becomes best-selling printer |
| 2020 | 199 | Multiple sub-$200 capable printers |
| 2022 | 179 | Bambu Lab enters market; drives quality up |
| 2024 | 149 | Entry-level capable printers under $150 |

**X-axis:** Year (2009–2024), labeled every 2 years.
**Y-axis:** Price in USD, log scale (100–20,000), labeled at 100, 500, 1000, 5000, 10000, 20000.

**Interactions:**
- Clicking any data point opens an infobox with the year, price, and event label.
- Hovering a data point shows a tooltip: "[Year]: ~$[price] — [event]."
- A toggle button switches between linear and log scale y-axis so students can see both representations.
- A horizontal dashed line at $500 is labeled "School-budget threshold."

**Colors:** Line #1565c0; data points #ff6600; event labels #555.

**Responsive design:** Chart resizes on window resize; minimum canvas height 300 px.
</details>

---

## The Maker Movement

The **Maker Movement** is the cultural and social phenomenon in which individuals and communities use digital fabrication tools — including 3D printers, laser cutters, CNC routers, and electronics — to design and build physical objects outside traditional industrial settings. The movement grew from hobbyist electronics culture (exemplified by the Arduino microcontroller platform, 2005) and was amplified by the RepRap project and the first wave of desktop printers.

Key institutions of the Maker Movement include:

- **Maker Faire** (first held 2006 in San Mateo, California) — a festival where makers demonstrate their projects; now held in dozens of cities worldwide.
- **Makerspaces and hackerspaces** — community workshops equipped with fabrication tools, open to members for a monthly fee or by institutional membership (schools, libraries, community colleges).
- **Instructables and Hackaday** — online platforms where makers share step-by-step project documentation.
- **Thingiverse, Printables, and MakerWorld** — repositories of free, downloadable 3D model files.

The Maker Movement matters for education because it shifted 3D printing from something that happened in corporate R&D labs into something that happens in classrooms, libraries, and garages. It created a culture of **sharing designs rather than hoarding them**, of learning by building, and of treating failure as data rather than defeat — values that align closely with engineering design practice.

---

## America Makes and the National Innovation Ecosystem

Individual makers and small companies drove the desktop revolution, but industrial additive manufacturing required organized, large-scale investment. In 2012, the U.S. Department of Defense and Department of Energy co-funded **America Makes** — the National Additive Manufacturing Innovation Institute — headquartered in Youngstown, Ohio.

America Makes is a public–private partnership that brings together manufacturers, universities, government agencies, and workforce-development organizations to advance additive manufacturing in the United States. Its goals include:

- Funding applied research that bridges the gap between laboratory discovery and industrial deployment.
- Developing **workforce competency frameworks** — standardized descriptions of the skills, knowledge, and abilities needed for AM jobs at various career levels.
- Creating educational programs and certifications that map directly to industry needs.
- Maintaining a database of AM projects, publications, and best practices accessible to member organizations.

**AM Innovation Institutes** are the broader category to which America Makes belongs. The Manufacturing USA network (established 2014) now includes over a dozen institutes, each focused on a different advanced manufacturing technology. America Makes is the node dedicated to additive manufacturing.

For students in this course, America Makes is relevant in two direct ways. First, the workforce competency frameworks that America Makes helped develop informed the design of this very course. Second, community colleges that offer AM-related dual-credit or articulation programs often align their curricula to America Makes standards — meaning the skills you build here are recognized beyond this classroom.

#### Diagram: America Makes and the AM Innovation Ecosystem

<details markdown="1">
<summary>Interactive Network: America Makes Stakeholder Map</summary>
Type: graph-data-model
**sim-id:** america-makes-network<br/>
**Library:** vis-network<br/>
**Status:** Specified

**Learning objective:** Students will *identify* (Bloom L1 — Remember) the major stakeholders in the America Makes ecosystem and explain how they connect to workforce development.

**Nodes (each clickable, opens infobox with 2–3 sentences of detail):**

| ID | Label | Group | Color |
|----|-------|-------|-------|
| 1 | America Makes | hub | #e65100 |
| 2 | U.S. Department of Defense | government | #1565c0 |
| 3 | U.S. Department of Energy | government | #1565c0 |
| 4 | Manufacturing Universities | academia | #2e7d32 |
| 5 | Community Colleges | academia | #2e7d32 |
| 6 | High School CTE Programs | academia | #2e7d32 |
| 7 | AM Equipment Manufacturers | industry | #6a1b9a |
| 8 | Material Suppliers | industry | #6a1b9a |
| 9 | End-User Companies | industry | #6a1b9a |
| 10 | Manufacturing USA | government | #1565c0 |
| 11 | NC3 / NIMS Certifications | workforce | #f9a825 |
| 12 | AM Workforce Framework | workforce | #f9a825 |

**Edges (directed, label on hover):**

- 2 → 1 "Founding co-sponsor"
- 3 → 1 "Founding co-sponsor"
- 10 → 1 "Parent network"
- 1 → 4 "Research grants"
- 1 → 5 "Curriculum alignment"
- 1 → 6 "CTE pathway support"
- 1 → 7 "Industry partnerships"
- 1 → 8 "Materials research"
- 4 → 5 "Articulation agreements"
- 5 → 6 "Dual credit programs"
- 1 → 12 "Publishes framework"
- 12 → 11 "Informs certifications"
- 9 → 1 "Member companies fund & use research"

**Canvas:** 700 × 500 px, physics layout (Barnes-Hut), responsive.

**Hub node (America Makes):** Larger node (radius 40 px), bold label, centered automatically.

**Infobox content examples:**
- "America Makes (node 1): Founded in 2012, headquartered in Youngstown, Ohio. The nation's leading public–private partnership for additive manufacturing R&D and workforce development."
- "Community Colleges (node 5): Institutions like Hennepin Technical and Dunwoody College offer AM programs aligned to America Makes standards, enabling high school students to earn dual credit."

**Responsive design:** Network redraws on window resize; minimum height 350 px.
</details>

---

## Articulation Pathways: Where This Course Fits

One of the most practical reasons to take this course seriously is **articulation**: the formal agreement between a high school program and a community college or university that allows students to earn college credit for work done in high school. When a high school AM course meets the standards set by institutions and frameworks like America Makes, students may be able to enter college with credits already earned, saving time and tuition.

In Minnesota, for example, institutions such as Hennepin Technical College, Dakota County Technical College, and Dunwoody College of Technology offer articulated credit or dual enrollment options in Advanced Manufacturing, CAD Technology, or Digital Fabrication. Similar pathways exist across the country. The course you are in now is designed to align with those articulation pathways — which means the portfolio you build, the safety practices you demonstrate, and the technical vocabulary you master are not just for a grade. They are credentials.

Industry certifications from organizations such as **NC3** (National Center for Construction Education and Research) and **NIMS** (National Institute for Metalworking Skills) also recognize AM competencies and are valued by manufacturing employers. You do not need to pursue these certifications during this course, but you will build many of the underlying skills they test.

---

## Foundational Technical Skills for This Course

Before you operate any hardware or software, a brief review of the foundational skills will help you navigate the rest of the course with confidence. We will treat each one as a tool in your workshop — not something to master in a single sitting, but something to practice a little every day.

**Algebra Basics.** You will encounter algebra when converting between units, calculating print time, and determining how changes in one parameter (say, layer height) affect others (print time, surface smoothness, file size). The key operations are setting up proportions, solving for an unknown variable, and working with percentages.

**Geometry Basics.** Areas, volumes, angles, and the relationships between shapes appear constantly in CAD modeling and when analyzing print orientation. If you need to calculate the volume of a cylindrical part or determine whether a 45° overhang can print without support, geometry is the tool you reach for.

**Units and Measurement.** Additive manufacturing uses the metric system almost exclusively. Dimensions are in millimeters (mm), temperatures in degrees Celsius (°C), and filament diameter and nozzle size in millimeters. Mass is measured in grams (g). Conversion fluency between metric units — and occasional translation to inches for legacy drawings — is essential.

**Computer File Management.** A single design project generates many files: CAD project files, exported STL or 3MF meshes, slicer project files, G-code files sent to the printer, and photo or video documentation. Developing consistent naming conventions and a logical folder hierarchy from the start will save you hours of searching and prevent sending the wrong file to the printer.

**Mouse and 3D Navigation.** Every CAD and slicer program uses a 3D viewport — a window in which you orbit, pan, and zoom around your model. Standard navigation typically uses three mouse buttons or modifier keys. Left-click selects; middle-click (or Ctrl + left-click in some programs) orbits; Shift + middle-click pans; scroll wheel zooms. We will practice this in every software session until it becomes automatic.

#### Diagram: Foundational Skills MicroSim — Units and Measurement Practice

<details markdown="1">
<summary>Interactive MicroSim: Unit Conversion for Additive Manufacturing</summary>
Type: microsim
**sim-id:** unit-conversion-practice<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Students will *apply* (Bloom L3 — Apply) unit conversion between millimeters, centimeters, and inches in the context of 3D printing dimensions.

**Canvas size:** 700 × 420 px, responsive to window resize.

**Layout:**
- Top section: A labeled diagram of a simple rectangular block showing Width, Depth, and Height with current values displayed next to each arrow.
- Middle section: Three labeled sliders — Width (mm), Depth (mm), Height (mm) — each ranging from 5 mm to 200 mm, default 50 mm.
- Bottom section: A display panel showing the current values in three unit systems simultaneously:
  - Millimeters: "50.0 mm × 50.0 mm × 50.0 mm"
  - Centimeters: "5.0 cm × 5.0 cm × 5.0 cm"
  - Inches: "1.97 in × 1.97 in × 1.97 in"
  - Volume: "125,000 mm³ = 125.0 cm³ = 7.63 in³"

**Interactions:**
- Moving any slider immediately updates all display values and the 3D block diagram.
- Clicking the "Quiz Me" button hides one unit row and prompts the student to type the missing value; correct answers display a green check, incorrect a red X with the correct answer.
- A "Reset" button returns all sliders to 50 mm.

**Behavior:** The block diagram uses an isometric projection and scales proportionally as sliders change. Extreme aspect ratios (e.g., 5 mm × 200 mm × 200 mm) display correctly without clipping.

**Responsive design:** All elements scale on window resize; text minimum 13 px.
</details>

---

## The AM Timeline: From Concept to Classroom

Now that we have described each milestone in detail, we can see the full arc of additive manufacturing history at once. Before reading the timeline, recall the key terms we have defined: **additive manufacturing** (building objects layer by layer from a digital model), **stereolithography** (UV laser curing of liquid resin), **FDM** (melted plastic extruded through a nozzle), and **open source** (designs and code freely shared and modifiable by anyone).

#### Diagram: Interactive Timeline of Additive Manufacturing History

<details markdown="1">
<summary>Interactive Timeline: Key Milestones in AM History (1760–2024)</summary>
Type: timeline
**sim-id:** am-history-timeline<br/>
**Library:** vis-timeline<br/>
**Status:** Specified

**Learning objective:** Students will *recall* (Bloom L1 — Remember) key milestones in the history of additive manufacturing in chronological order.

**Canvas size:** Full-width, height 320 px, responsive.

**Timeline groups:**

| Group ID | Group label |
|----------|-------------|
| 1 | Historical Context |
| 2 | Technology Invention |
| 3 | Patents & Standards |
| 4 | Open Source |
| 5 | Ecosystem |

**Timeline items (each clickable, opens infobox below the timeline):**

| ID | Start | End | Group | Label | Infobox text |
|----|-------|-----|-------|-------|--------------|
| 1 | 1760 | 1840 | 1 | Industrial Revolution | "The Industrial Revolution (1760–1840) established mass production, interchangeable parts, and subtractive manufacturing as the dominant industrial paradigm." |
| 2 | 1986 | 1986 | 2 | Chuck Hull patents SLA | "Charles W. Hull files the first stereolithography patent (US 4,575,330) in 1986, co-founds 3D Systems, and ships the first commercial SLA machine in 1988 at ~$300,000." |
| 3 | 1989 | 1989 | 2 | Scott Crump invents FDM | "Scott Crump invents Fused Deposition Modeling, co-founds Stratasys, and receives the core FDM patent in 1992. Industrial machines sell for $60,000–$250,000." |
| 4 | 1992 | 2009 | 3 | FDM Patent Active | "Stratasys holds exclusive rights to FDM. The patent prevents low-cost competition and keeps prices high for 17 years." |
| 5 | 2005 | 2005 | 4 | RepRap Project launched | "Adrian Bowyer at the University of Bath launches the RepRap Project — an open-source FDM printer designed to print most of its own parts." |
| 6 | 2008 | 2008 | 4 | RepRap Darwin demonstrated | "RepRap 'Darwin' is publicly demonstrated and successfully prints its own components, proving self-replication is possible." |
| 7 | 2009 | 2009 | 3 | FDM Patent expires | "Stratasys's core FDM patent expires in 2009. Dozens of companies immediately enter the market; prices fall 80% within five years." |
| 8 | 2009 | 2009 | 5 | MakerBot founded | "MakerBot Industries is founded by Bre Pettis, Adam Mayer, and Zach 'Hoeken' Smith. Their open-source Cupcake CNC sells for $750 assembled." |
| 9 | 2012 | 2012 | 5 | America Makes founded | "America Makes — the National Additive Manufacturing Innovation Institute — is established in Youngstown, Ohio, with federal and industry co-funding." |
| 10 | 2012 | 2012 | 2 | Formlabs Form 1 (SLA) | "Formlabs raises $2.9M on Kickstarter for the Form 1, bringing affordable desktop SLA to $3,299 — 100× cheaper than industrial SLA machines." |
| 11 | 2018 | 2018 | 5 | Ender 3 ships | "Creality ships the Ender 3 at $229. It becomes the best-selling desktop FDM printer in history and is widely used in classrooms worldwide." |
| 12 | 2022 | 2022 | 5 | Bambu Lab launches | "Bambu Lab enters the market with fast, multi-material CoreXY printers. Competition drives print quality and speed improvements across all price ranges." |

**Behavior:** Timeline is horizontally scrollable. Clicking any item highlights it and displays its infobox below the timeline canvas. Time axis shows decades for early periods and years for 2005–2024. A "Fit" button resets the view to show the full timeline.

**Responsive design:** Canvas width matches the parent container; item text truncates with ellipsis at narrow widths.
</details>

---

## Key Takeaways

This chapter has traced additive manufacturing from the factories of the Industrial Revolution to the open-source printers in today's classrooms. The following points summarize what you should carry forward:

- **Subtractive manufacturing** (cutting away material) dominated industry for two centuries but struggles with complex internal geometry and high costs for short runs.
- **Additive manufacturing** builds objects layer by layer from a digital model, enabling internal complexity, near-zero material waste, and economical customization.
- **Stereolithography**, invented by Chuck Hull in 1986, proved that a digital-to-physical workflow was commercially viable — at industrial prices.
- **FDM**, invented by Scott Crump in 1989 and patented until 2009, became the dominant desktop technology once the patent expired.
- The **RepRap Project** (2005) demonstrated that an open-source community could develop functional AM hardware and distribute it at near-component cost, setting off the desktop revolution.
- The **Maker Movement** created the cultural ecosystem — makerspaces, open design repositories, Maker Faires — that welcomed 3D printing into schools and communities.
- **America Makes** (2012) anchors the national AM innovation and workforce development ecosystem; its competency frameworks directly informed the design of this course.
- Foundational skills — algebra, geometry, metric measurement, file management, and 3D navigation — will support every topic that follows.

In the next chapter, you will move from historical context to technical vocabulary, learning the seven ISO/ASTM 52900 process categories that define and organize the entire field of additive manufacturing.

---

## Review Questions

1. In your own words, explain the difference between subtractive manufacturing and additive manufacturing. Give one advantage and one disadvantage of each.
2. Why did the expiration of the FDM patent in 2009 have such a large impact on the cost and availability of desktop 3D printers?
3. What was the RepRap Project, and why was making its design open-source important for the development of affordable 3D printing?
4. Describe two ways that America Makes connects high school students to careers in additive manufacturing.
5. A part has dimensions 80 mm × 45 mm × 30 mm. Convert each dimension to centimeters and to inches (round to two decimal places). Calculate the volume in mm³ and cm³.
