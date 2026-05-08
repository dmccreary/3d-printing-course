---
title: Computer-Aided Design and Modeling
description: Parametric, feature-based CAD — 2D sketching, constraints, core feature operations, reference geometry, assemblies, three major CAD tools, and AI-assisted design.
generated_by: claude skill chapter-content-generator
date: 2026-05-07 21:07:43
version: 0.08
---

# Computer-Aided Design and Modeling

## Summary

This chapter teaches parametric, feature-based CAD: 2D sketching with constraints, the core feature operations (extrude, revolve, sweep/loft, fillet, shell, pattern, boolean), reference geometry, assemblies and mate constraints, and three named CAD tools (Onshape, Fusion 360, FreeCAD). It also introduces AI-assisted CAD, which is increasingly part of how modern designers work. By the end, students can build a functional parametric model that can be exported for printing.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

1. CAD Software Overview (Concept 56)
2. 2D Sketching (Concept 57)
3. Sketch Constraints (Concept 58)
4. Parametric Modeling (Concept 59)
5. Feature-Based Modeling (Concept 60)
6. Extrude Feature (Concept 61)
7. Revolve Feature (Concept 62)
8. Sweep And Loft (Concept 63)
9. Fillet And Chamfer (Concept 64)
10. Shell Feature (Concept 65)
11. Pattern Features (Concept 66)
12. Boolean Operations (Concept 67)
13. Reference Geometry (Concept 68)
14. Assemblies (Concept 69)
15. Mate Constraints (Concept 70)
16. Onshape Workflow (Concept 71)
17. Fusion 360 Workflow (Concept 72)
18. FreeCAD Workflow (Concept 73)
19. AI-Assisted CAD (Concept 210)

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations and History of Additive Manufacturing](../01-foundations-and-history/index.md)

---

!!! mascot-welcome "Welcome to Chapter 4"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Benchy waves hello">
    This is the chapter where ideas become geometry. You're going to learn parametric, feature-based CAD — the same modeling approach used by professional mechanical engineers — starting from a blank sketch and building up to a fully constrained, exportable 3D model. By the end, you'll have the skills to design something original and send it to a printer with confidence.

## What Is CAD?

**Computer-Aided Design (CAD)** is software that allows you to create precise 2D and 3D geometry on a computer, with exact dimensions, relationships, and constraints that a physical drawing on paper cannot enforce. CAD replaced paper drafting in professional engineering starting in the 1980s, and today it is the universal medium through which designed objects move from idea to manufacturing.

For additive manufacturing, CAD is the starting point of everything. Before a printer can make a part, that part must exist as a 3D digital model. Every STL file, every G-code toolpath, every slicer setting is downstream of a CAD model. Learning to work in CAD is learning to speak the native language of digital fabrication.

Modern CAD software for mechanical design shares a core set of capabilities, even though the interfaces and specific workflows differ. The three you'll most likely encounter in a school makerspace or early engineering career are **Onshape**, **Fusion 360**, and **FreeCAD** — all of which will be covered later in this chapter. First, though, you need to understand the fundamental concepts that underlie all of them: sketching, constraints, and features.

## Starting in 2D: The Sketch

Every 3D feature in parametric CAD begins as a **2D sketch** — a flat, dimensioned drawing on a plane. Think of a sketch the way you think of a blueprint cross-section: it defines the profile that the software will then turn into a solid shape.

A sketch lives on a **sketch plane**, which is any flat surface — the default XY, YZ, or XZ reference planes of the model space, or the flat face of an existing solid. You activate the sketch tool, click the plane, and you enter a 2D drawing environment where the X and Y axes are your canvas.

Inside a sketch, you work with **sketch entities** — the geometric primitives that define the shape:

- **Lines:** Straight segments between two points
- **Arcs:** Portions of circles, defined by center + radius + angle, or by three points
- **Circles:** Defined by center point and radius
- **Rectangles:** Shorthand for four connected lines at right angles
- **Splines:** Smooth curves through control points, useful for organic shapes
- **Polygons:** Regular multi-sided shapes (hexagons for bolt heads, for example)

You draw sketch entities approximately at first — their size and position will be made precise by dimensions and constraints in the next step. Sketching is not about precision at the drawing stage; it's about capturing the topology (the connectivity and shape type) of your profile.

## Sketch Constraints: Making Geometry Fully Defined

A raw sketch with just geometry drawn is **under-constrained**: the entities can slide, rotate, and scale freely, like shapes drawn on a whiteboard that you could push around with your finger. Before you can build a solid feature from a sketch, you need to lock it down completely using **sketch constraints**.

There are two types of constraints:

**Geometric constraints** define relationships between sketch entities without specifying exact values:

- **Horizontal / Vertical:** Forces a line to be exactly horizontal or vertical
- **Parallel / Perpendicular:** Forces two lines to maintain a specific angular relationship
- **Coincident:** Forces two points or a point and a line to share the same location
- **Concentric:** Forces two arcs or circles to share the same center
- **Equal:** Forces two lines or arcs to have the same length or radius
- **Tangent:** Forces a line and arc, or two arcs, to meet smoothly with no corner
- **Midpoint:** Forces a point to sit exactly at the midpoint of a line or arc
- **Symmetric:** Forces two entities to be mirror images about a centerline

**Dimensional constraints** specify exact numeric values — lengths, angles, radii, and distances. You place a dimension on a line, arc, or pair of entities, type in the value, and the geometry snaps to that size.

!!! mascot-thinking "Fully Defined Is the Goal — Every Time"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Benchy thinks carefully">
    A sketch has three possible states: **under-constrained** (blue entities in most CAD tools — still free to move), **fully constrained** (black entities — locked in place), and **over-constrained** (red entities — conflicting constraints that can't all be satisfied simultaneously). Your goal is always fully constrained. An under-constrained sketch can drift when features are added later, producing unpredictable geometry. Over-constrained sketches tell you something is redundant or contradictory and must be resolved. Black is the color you're aiming for.

When all sketch entities are black (or the software displays "Fully Defined"), your sketch is ready. Every point has a fixed position, every line has a fixed length and angle, and the sketch will produce exactly the same geometry every time it is regenerated — which is what makes parametric modeling possible.

#### Diagram: Sketch Constraint States Explorer

<details markdown="1">
<summary>Sketch Constraint States Explorer</summary>
Type: MicroSim
**sim-id:** sketch-constraint-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Identify the three sketch constraint states (under-constrained, fully constrained, over-constrained) and apply geometric and dimensional constraints to reach the fully constrained state (Bloom L1–L3: identify, explain, apply).

**Description:** An interactive p5.js canvas showing a simple L-shaped sketch profile made of five line segments. The student adds constraints and dimensions to move the sketch from under-constrained to fully constrained, experiencing the state transitions directly.

**Canvas layout (680 × 480 px, responsive):**
- Left panel (480 × 480 px): The sketch canvas showing the L-shape profile
  - Line colors: blue = under-constrained, black = fully constrained, red = over-constrained
  - A status badge at top: "UNDER-CONSTRAINED (N free degrees)" / "FULLY CONSTRAINED" / "OVER-CONSTRAINED"
  - Clicking a line selects it (yellow highlight)
  - Clicking two lines selects both for relational constraints
- Right panel (200 × 480 px): Constraint palette
  - Section "Geometric Constraints": buttons for Horizontal, Vertical, Parallel, Perpendicular, Equal, Coincident
  - Section "Dimensional Constraint": a text input for length/distance and an "Apply Dimension" button
  - Section "Status": shows count of free degrees of freedom remaining
  - "Reset Sketch" button clears all constraints

**Simulation logic:**
- The L-shape starts with 7 degrees of freedom (DOF): position in X (1), position in Y (1), rotation (1), and 4 line lengths
- Each constraint reduces DOF by a specific amount (horizontal/vertical removes 1, dimension removes 1, equal removes 1, etc.)
- When DOF reaches 0, all lines turn black and the status shows "FULLY CONSTRAINED"
- Adding one more constraint after full definition turns a conflicting entity red and shows "OVER-CONSTRAINED — remove a constraint"
- Hovering any constraint button shows a tooltip explaining what relationship it enforces

**Responsive behavior:** On narrow screens (< 600 px), the right panel moves below the sketch canvas.
</details>

## Parametric Modeling

The word **parametric** in CAD means that dimensions and relationships are stored as **parameters** — named, editable values — rather than hard-coded geometry. When you change a parameter, the entire model updates automatically to reflect the new value.

Consider a simple bracket modeled with a base width parameter of 40 mm and two mounting holes spaced 30 mm apart. In a non-parametric system, changing the bracket to 60 mm wide would require manually moving the holes and redrawing the edges. In a parametric system, you change the base-width parameter to 60 mm, and the software recomputes every feature that depends on it — hole positions, wall lengths, total volume — in seconds.

This is why professional engineers use parametric CAD. Design is iterative (as you learned in Chapter 3), and iteration means changing dimensions repeatedly. Parametric models absorb those changes gracefully. Fixed, non-parametric models fight you at every revision.

Parameters can also be linked by **equations**. You can specify that the hole diameter equals the wall thickness divided by two, or that the pattern spacing equals the total length divided by the number of instances. When one value changes, all linked values update — the model is not just a shape, it's a system of design intent captured in math.

## Feature-Based Modeling

**Feature-based modeling** is the method by which a 3D solid is built up from a sequence of discrete operations called **features**. Each feature — an extrude, a cut, a fillet, a pattern — modifies the solid and is recorded in a **feature tree** (also called a model tree or history tree), which appears as a vertical list in the CAD interface.

The feature tree is the timeline of your model. Features are applied in order from top to bottom. You can:

- **Edit** a feature anywhere in the tree to change its parameters, and the downstream features recalculate
- **Suppress** a feature to temporarily remove it from the model without deleting it — useful for testing "what would this look like without the fillet?"
- **Reorder** features when the sequence matters (you usually cannot fillet an edge that doesn't exist yet)
- **Insert** new features at any point in the history

The combination of parametric dimensions and a feature tree creates a model that carries its own design intent. Another engineer opening your file six months later can read the feature tree and understand exactly how the part was built and how to modify it. This is not just organizational tidiness — it is what makes professional CAD collaboration possible.

## The Core Feature Operations

With the sketch and parametric groundwork in place, here are the principal feature operations you'll use to build solid geometry. These operations are the vocabulary of 3D modeling — you need all of them, and most models use several in combination.

### Extrude

The **extrude feature** takes a closed 2D sketch profile and pushes it a specified distance along an axis perpendicular to the sketch plane, creating a 3D solid. It is the most common feature in mechanical CAD by a wide margin.

Extrudes can add material (**boss/extrude**) or remove it (**cut/extrude**). A rectangular sketch extruded 20 mm creates a box. The same rectangle extruded as a cut into an existing solid creates a rectangular pocket or slot. Extrude depth can be:

- **Blind:** A fixed distance
- **Through all:** Passes completely through any existing geometry
- **Up to surface/face:** Stops at a specified surface
- **Symmetric:** Grows equally in both directions from the sketch plane

### Revolve

The **revolve feature** rotates a 2D sketch profile around an axis by a specified angle (typically 360° for a complete solid of revolution, but any angle works). If extrude is for prismatic shapes, revolve is for cylindrical and rotationally symmetric shapes.

A circle profile revolved 360° around an external axis produces a torus (donut). A profile of a bottle cross-section revolved 360° around its centerline produces the bottle body. A semicircle revolved 360° around its diameter produces a sphere. Revolve cuts work the same way — a profile spun around an axis to remove material creates grooves, threads, and undercuts.

### Sweep and Loft

**Sweep** and **loft** are the two feature types that handle non-prismatic, non-rotationally symmetric geometry.

A **sweep** moves a profile sketch along a path sketch, creating a solid that follows the path's curvature. The cross-section remains constant (or can taper with optional scaling). Uses include pipes, tubes, cable guides, handrails, and any part that has the same cross-section shape along its length but follows a curve.

A **loft** blends between two or more profile sketches on different sketch planes, creating a smooth solid transition. The profiles can have different shapes — a rectangle at the base blending into a circle at the top, for example. Lofts are used for aerodynamic shapes, ergonomic handles, and any geometry that transitions smoothly between distinct cross-sections.

### Fillet and Chamfer

**Fillet** and **chamfer** are edge-modification features that replace sharp corners.

A **fillet** rounds an edge with a constant or variable radius, producing a smooth curved transition between two faces. Fillets serve functional and aesthetic purposes: they reduce stress concentrations at corners (sharp internal corners are where cracks initiate under load), improve aerodynamics, make parts safer to handle, and often improve printability by eliminating overhanging sharp corners.

A **chamfer** cuts a flat angled bevel at an edge, defined by distance and angle or two distances. Chamfers are faster to produce than fillets in machining contexts; in AM they're used primarily for aesthetic style or lead-in edges that help parts mate.

!!! mascot-tip "Add Fillets Last — Almost Always"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Benchy gives a thumbs up">
    Here's a workflow move that will save you frustration: add fillets at the very end of your feature tree, after all cuts, patterns, and other geometry is finalized. Fillets applied early in the tree can create reference edges that downstream features depend on — then when you change an earlier feature, those fillet references break and the model fails to rebuild. Keep fillets at the bottom of the tree as "finishing touches" and your models will rebuild cleanly almost every time.

### Shell

The **shell feature** hollows out a solid, leaving walls of a specified thickness. Select one or more faces to "open" (those become the openings), specify wall thickness, and the software removes the interior material while maintaining uniform walls on all remaining faces.

Shell is invaluable for AM: most FDM parts are already hollowed by the slicer's infill settings, but shell in CAD gives you explicit control over wall geometry for parts where the hollow interior is part of the design — enclosures, containers, thin-walled structures. Combining shell with specific opening faces lets you design boxes, cups, tubes, and hollow sculptural forms.

### Pattern Features

**Pattern features** replicate a feature (or a set of features) in a regular geometric arrangement without manually rebuilding each instance. Two types are common:

- **Linear pattern:** Replicates features in one or two directions, spaced at equal intervals. Use for mounting holes along a rail, ventilation slots across a panel, or fins along a heat sink.
- **Circular pattern:** Replicates features around an axis at equal angular spacing. Use for bolt-circle patterns, gear teeth, radially symmetric features.

Patterns are parametric — the count and spacing are parameters you can change. A 6-hole bolt pattern can become an 8-hole pattern by editing one number.

### Boolean Operations

**Boolean operations** are logical combinations of two or more solid bodies:

- **Union (Add/Join):** Combines two bodies into a single solid, merging their volumes
- **Difference (Subtract/Cut):** Removes the volume of one body from another — the primary mechanism for holes, pockets, and cutouts
- **Intersection (Common):** Retains only the volume shared by both bodies, discarding everything else

In most CAD tools, boolean operations happen implicitly during feature creation — an extruded cut is a boolean difference between the existing solid and the extruded shape. But explicit multi-body boolean operations become useful when modeling complex assemblies or using advanced workflows like creating cavity shapes for mold design.

Before examining the feature relationship diagram below, here is a summary of the core features and their primary use cases, which you can use as a quick reference:

| Feature | What It Does | Typical AM Use Case |
|---|---|---|
| Extrude Boss | Adds a prismatic solid from a sketch | Any flat-bottomed part, brackets, plates |
| Extrude Cut | Removes material along a sketch profile | Holes, slots, pockets, cutouts |
| Revolve | Creates solids of revolution | Cylinders, cones, bottle bodies, rings |
| Sweep | Follows a profile along a path | Pipes, channels, cables, handrails |
| Loft | Blends between profiles | Aerofoils, handles, tapered transitions |
| Fillet | Rounds edges with a radius | Stress relief, aesthetics, printability |
| Chamfer | Bevels edges at an angle | Lead-in edges, style, part mating |
| Shell | Hollows a solid with uniform walls | Enclosures, containers, thin-walled parts |
| Linear Pattern | Repeats features in rows/columns | Hole arrays, slot grids, fins |
| Circular Pattern | Repeats features around an axis | Bolt circles, gear teeth, radial symmetry |
| Boolean Union | Merges two bodies | Combining complex shapes |
| Boolean Difference | Subtracts one body from another | Cavities, complex cutouts |

#### Diagram: Feature Tree Builder

<details markdown="1">
<summary>Feature Tree Builder</summary>
Type: MicroSim
**sim-id:** feature-tree-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Apply feature-based modeling by sequencing feature operations to produce a target part, understanding how the feature tree order affects the final geometry (Bloom L3–L4: apply, analyze).

**Description:** An interactive p5.js simulation showing a simplified 3D isometric view of a part (rendered as colored block geometry, not full 3D — pseudo-3D using isometric projection) that updates in real time as the student adds features to a feature tree panel.

**Canvas layout (700 × 500 px, responsive):**
- Left panel (300 × 500 px): Feature tree list
  - Starts with one base feature: "Extrude Boss: 40×60×20 mm block" (fixed, cannot remove)
  - "Add Feature" dropdown: Extrude Cut (hole), Fillet, Shell, Linear Pattern, Circular Pattern
  - Each added feature shows in the list with name, key parameter, and an "Edit" pencil and "×" delete button
  - "Move Up ↑" and "Move Down ↓" arrows on each feature (to demonstrate reorder effects)
- Right panel (400 × 500 px): Isometric 3D view of current part
  - Rendered in real time as features are added/removed/reordered
  - The part is a simplified block; features change its visible geometry (holes appear as dark squares, fillets show as rounded corners, shell shows as a hollow with open top face)
  - Currently selected feature highlighted in yellow on the 3D view

**Pre-loaded challenge:** A "Target Part" thumbnail shown in a corner — a simple bracket shape with two holes and a fillet. Student must add the right features in the right order to match it.

**Interactions:**
- Adding a feature opens a mini parameter panel (e.g., "Extrude Cut: diameter = [  ] mm, depth = [  ] mm")
- Moving a fillet above a hole demonstrates rebuild failure (error icon on the fillet)
- "Rebuild" button forces recalculation; errors flash red
- "Compare to Target" button shows a split view comparing student's part to the target

**Responsive behavior:** On narrow screens, the tree panel stacks above the 3D view.
</details>

## Reference Geometry

**Reference geometry** consists of construction elements that help you position and orient features without adding material to the model. The three primary types are:

- **Reference planes:** Infinite flat planes used as sketch planes for features that don't naturally land on an existing face. You can create a reference plane offset from an existing face by a distance, at an angle through an edge, or through three points.
- **Reference axes:** Infinite lines used as revolution axes for revolve features, pattern axes for circular patterns, or alignment references. A reference axis through the center of a cylindrical face is the most common use.
- **Reference points:** Specific locations in model space, useful for anchoring mate constraints in assemblies or as control points for complex features.

Reference geometry is invisible in the final model — it is scaffolding. But without it, many features are impossible to place correctly. When a part needs a feature on an angled surface that doesn't exist yet, you create a reference plane at that angle first, then sketch on it.

## Assemblies

A **CAD assembly** is a file that brings together two or more individual part models (each in its own file) and positions them relative to each other to form a complete product. Assemblies let you model complex products as collections of manageable parts, check whether parts fit together correctly, detect collisions, and simulate motion.

In an AM context, assemblies are essential when you're designing multi-component products — a two-part snap-fit enclosure, a mechanism with moving parts, a bracket and bolt combination. Each component is modeled as a separate part file; the assembly file references all of them and defines how they relate.

Part positions in an assembly are controlled by **degrees of freedom (DOF)**. A rigid body in free space has 6 degrees of freedom: translation in X, Y, Z and rotation about X, Y, Z. As you add mate constraints, degrees of freedom are removed until the part is fully positioned.

!!! mascot-warning "Over-Constraining an Assembly Causes Rebuilds to Fail"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Benchy looks concerned">
    The most common assembly mistake is adding more mate constraints than needed, creating conflicting position requirements the solver can't satisfy simultaneously. A shaft that is fully defined with one coincident axis mate and one face mate does NOT need a second face mate — that third constraint will fight the first two and the assembly will fail or produce unpredictable positions. Add constraints one at a time and check the DOF count after each one. When the part stops moving the way you want, stop adding constraints.

## Mate Constraints

**Mate constraints** (called "mates" in SolidWorks/Onshape, "joints" in Fusion 360) are the rules that position one part relative to another in an assembly. Each mate type removes a specific number of degrees of freedom:

- **Coincident:** Forces two faces to be coplanar (flush) or two points to share the same location. Removes up to 3 DOF.
- **Concentric:** Forces two cylindrical or conical faces to share the same axis. A bolt-in-hole mate. Removes 2 rotational DOF + 2 translational DOF along the radial directions.
- **Distance:** Maintains a fixed gap between two faces or entities. Removes 1 translational DOF.
- **Angle:** Maintains a fixed angle between two faces or axes. Removes 1 rotational DOF.
- **Parallel / Perpendicular:** Forces planar or linear entities into a specific angular relationship.
- **Fixed:** Locks a part completely in place with no movement. Removes all 6 DOF. Typically applied to the first part added to an assembly.

A fully constrained part has 0 remaining DOF in all six directions. A part with 0 DOF does not wiggle. An intentionally under-constrained part (1 rotational DOF) can spin around its axis — useful for modeling hinges, knobs, and rotating mechanisms.

#### Diagram: Assembly Mate Constraints Visualizer

<details markdown="1">
<summary>Assembly Mate Constraints Visualizer</summary>
Type: interactive-infographic
**sim-id:** assembly-mate-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Identify common mate constraint types, explain what degrees of freedom each removes, and analyze how combinations of mates fully constrain a part in an assembly (Bloom L1–L4: identify, explain, analyze).

**Description:** An interactive p5.js diagram showing two simple block-shaped parts in isometric view. The student selects mates from a palette and applies them between the parts, watching the DOF counter decrease and the parts snap into their constrained positions.

**Canvas layout (700 × 480 px, responsive):**
- Center: Isometric view of two parts — a base block (fixed, gray) and a movable block (blue, starts floating off to the side)
- Top bar: "Degrees of Freedom Remaining: 6" counter (updates with each mate added)
- Right panel: Mate palette with six mate buttons (Coincident, Concentric, Distance, Angle, Parallel, Fixed), each with a tooltip describing what it does and how many DOF it removes
- Below mate palette: Applied mates list (numbered, with delete button)
- Bottom: "Assembly Status" badge — UNDER-CONSTRAINED / FULLY CONSTRAINED / OVER-CONSTRAINED

**Interactions:**
- Clicking a mate button applies it between the selected faces of the two parts (clicking a face on either part highlights it as the selection)
- The movable part animates to its new position after each mate is applied
- DOF counter decrements appropriately
- At 0 DOF, the badge turns green: "FULLY CONSTRAINED — Part is locked in place"
- Adding one more mate turns the badge red: "OVER-CONSTRAINED — One constraint is redundant or conflicting"
- Clicking a mate in the applied list highlights the constrained faces on the 3D view
- "Reset" button clears all mates

**Responsive behavior:** Scales to container width; DOF counter and status badge remain prominent at all sizes.
</details>

## CAD Tools: Onshape, Fusion 360, and FreeCAD

Three CAD tools dominate educational and entry-level professional AM workflows. They all implement parametric, feature-based modeling, but they differ in delivery model, pricing, ecosystem, and specific workflow conventions.

!!! mascot-encouraging "Which Tool You Pick Matters Less Than You Think"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Benchy cheers you on">
    Students sometimes freeze up trying to choose the "right" CAD tool, worried that picking the wrong one will put them behind. Here's the reality: the concepts you learn in this chapter — sketching, constraints, features, assemblies — transfer directly between all three. Professionals switch between CAD packages regularly throughout their careers. Get fluent in one, and the others will feel familiar within a few weeks. Pick whichever one your school has available, or whichever runs on your computer. The skills are what matter.

### Onshape

**Onshape** is a fully cloud-based parametric CAD platform developed by the original SolidWorks team and launched in 2015. Because it runs entirely in a web browser, it requires no installation, works on any device including Chromebooks, and stores all files in the cloud with automatic version history. There is no local file to lose or corrupt.

Key Onshape characteristics:

- **Browser-based:** No download or installation; runs on Mac, Windows, Linux, Chromebook, iPad
- **Free for education:** A robust free education/hobbyist tier includes unlimited public documents
- **Real-time collaboration:** Multiple users can work on the same document simultaneously (like Google Docs for CAD)
- **Feature Manager:** Called "Part Studio" in Onshape; all parts in a studio share the same feature tree
- **Assembly environment:** Separate "Assembly" tab; uses "Mates" for positioning (fastened, revolute, slider, planar, cylindrical, ball, parallel, tangent)
- **Learning resources:** Extensive free learning center at learn.onshape.com

Onshape's biggest limitation is that file access requires an internet connection, which can be a constraint in poor-connectivity environments.

### Fusion 360

**Fusion 360** is Autodesk's cloud-connected parametric CAD/CAM/simulation platform, launched in 2013. Unlike Onshape, Fusion 360 installs as a desktop application (with cloud syncing), offering offline capability with cloud collaboration when connected.

Key Fusion 360 characteristics:

- **Desktop + cloud:** Installs on Mac and Windows; syncs to Autodesk's cloud; can work offline
- **Free for students and educators:** Autodesk's education license is free for verified students and teachers; a startup/hobbyist license is also available
- **Integrated CAM:** Fusion 360 includes computer-aided manufacturing (CAM) toolpath generation for CNC machining — a feature Onshape and FreeCAD do not include by default
- **Integrated simulation:** Basic finite element analysis (FEA) for stress simulation is built in
- **Timeline:** Uses a "timeline" bar at the bottom of the screen rather than a tree panel — a slightly different visual metaphor for the same feature history concept
- **Assembly environment:** Uses "Joints" rather than traditional mate constraints, with joint types (rigid, revolute, slider, planar, etc.) that define motion type directly

Fusion 360 is the industry standard for small manufacturing businesses and a strong preparation for college-level engineering programs.

### FreeCAD

**FreeCAD** is a free, open-source, cross-platform parametric CAD application. It installs on Mac, Windows, and Linux and stores all data locally — no account, no internet connection, no subscription required.

Key FreeCAD characteristics:

- **Completely free and open-source:** No license, no expiration, no subscription
- **Part Design workbench:** Uses a feature tree approach similar to SolidWorks and Onshape
- **Multiple workbenches:** FreeCAD's modular architecture provides specialized environments for mesh editing, FEM simulation, path (CAM), architecture (BIM), and more
- **Steeper learning curve:** The interface is less polished than commercial tools and some workflows require workarounds for tasks that are straightforward in Onshape or Fusion 360
- **Community-supported:** Active forums and extensive community documentation; no formal support contract

FreeCAD is an excellent choice when cost is a barrier and internet access is unreliable. Its learning curve rewards investment: students who become fluent in FreeCAD develop a deeper understanding of parametric modeling because the tool is less automated.

The following table summarizes the three tools across the dimensions most relevant to a high-school AM course:

| Dimension | Onshape | Fusion 360 | FreeCAD |
|---|---|---|---|
| Cost (education) | Free | Free (verified) | Free always |
| Installation | None (browser) | Desktop app | Desktop app |
| Offline capability | No | Yes | Yes |
| Collaboration | Real-time | Cloud sync | Manual file sharing |
| CAM included | No (add-on) | Yes | Yes (Path workbench) |
| Simulation | Basic | Basic FEA | FEM workbench |
| Industry use | Growing | Common in small mfg | Niche / hobbyist |
| Learning curve | Moderate | Moderate | Steeper |

### Workflow Comparison: The Same Part in Three Tools

The core workflow for building a simple bracket — sketch → extrude boss → extrude cut (holes) → fillet — follows the same logical sequence in all three tools. The command names and keyboard shortcuts differ, but the thinking process is identical:

1. **Create a new part / part studio / body**
2. **Select or create a sketch plane**
3. **Sketch the outer profile with dimensions and constraints**
4. **Extrude the sketch to create the base solid**
5. **Create a new sketch on a face for hole positions**
6. **Extrude-cut the hole circles through the solid**
7. **Apply fillets to specified edges**
8. **Export as STL or 3MF for the slicer**

This sequence is the template you'll repeat hundreds of times. The tool you're in changes the menu path; the sequence stays constant.

## AI-Assisted CAD

**AI-assisted CAD** is an emerging category of tools that use artificial intelligence to accelerate or automate parts of the modeling process that traditionally required manual effort. As of 2025, AI-assisted CAD capabilities appear in several forms:

- **Text-to-geometry:** Experimental tools (including integrations in Fusion 360 and third-party plugins) that accept a natural-language description ("a bracket with two M4 holes, 40 mm apart, 3 mm wall thickness") and generate a 3D model or sketch. Results still require significant cleanup and verification, but the speed of iteration is improving rapidly.
- **Generative design:** Autodesk Fusion 360 and other platforms can automatically generate optimized geometry for a given set of loads, constraints, and manufacturing processes. The user specifies what must be preserved (keep-out zones, load application points, attachment locations) and the software explores thousands of forms, presenting solutions that are often lighter and stronger than what a human would design manually.
- **AI-powered constraint suggestion:** Some tools can analyze an incomplete sketch and suggest likely geometric constraints based on near-coincident or near-parallel entities — reducing the manual clicking required to fully define a sketch.
- **Error diagnosis:** AI assistants integrated into CAD tools (like Fusion 360's AI assistant) can analyze rebuild failures, identify the conflicting features, and suggest fixes in natural language.
- **Automated parametric optimization:** Given a range of parameter values and a performance target (minimize material, maximize stiffness, fit within a build volume), AI optimization loops can test thousands of parameter combinations and report which combinations best meet the target.

AI-assisted CAD does not replace the need to understand sketching, constraints, and features — quite the opposite. To evaluate, edit, and trust AI-generated geometry, you need to understand the underlying modeling concepts deeply. The students who benefit most from AI tools are those who could build the model manually and use AI to go faster, not those who expect AI to do the thinking for them.

## Key Takeaways

This chapter has covered the complete foundation of parametric, feature-based CAD modeling. Here is what you now know:

- **CAD software** translates design intent into precise 3D digital geometry that can be exported for printing, simulation, and manufacturing.
- **2D sketches** are the starting point for every 3D feature — flat profiles drawn on planes and then turned into solids.
- **Sketch constraints** (geometric and dimensional) lock sketch entities into fully defined, non-ambiguous geometry. The goal is always a fully constrained (black) sketch.
- **Parametric modeling** stores dimensions as editable parameters so that changing one value cascades through all dependent geometry automatically.
- **Feature-based modeling** builds solids as an ordered sequence of features stored in a feature tree — a timeline of design history that can be edited, reordered, and suppressed.
- **Core features:** extrude, revolve, sweep, loft (adding and removing material in different geometric ways), fillet, chamfer (edge modifications), shell (hollowing), pattern (replication), and boolean operations (union, difference, intersection).
- **Reference geometry** — planes, axes, points — provides scaffolding for features that cannot land on existing faces.
- **Assemblies** combine multiple part files and position them using **mate constraints** that remove degrees of freedom until parts are fully positioned.
- **Onshape** is cloud-based, free for education, ideal for Chromebook environments and collaborative classrooms. **Fusion 360** is desktop + cloud, free for students, adds integrated CAM and simulation. **FreeCAD** is completely free and open-source, works offline, has a steeper learning curve.
- **AI-assisted CAD** is an evolving set of tools — text-to-geometry, generative design, constraint suggestion, error diagnosis — that accelerate modeling but require a solid understanding of parametric fundamentals to use effectively.

!!! mascot-celebration "Chapter 4 Complete — You Can Model Now"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Benchy celebrates">
    You've just covered every concept a working mechanical designer uses every day: sketches, constraints, features, assemblies, and the tools to put it all together. That's not a small thing — parametric CAD is one of the most transferable skills in modern engineering. In Chapter 5, you'll take the models you can now build and learn exactly how to get them out of the CAD environment and into a format the printer can use. Mesh files, STL, 3MF — the bridge from digital to physical is next.

[See Annotated References](./references.md)
