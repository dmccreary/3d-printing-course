---
title: The Engineering Design Process
description: The PLTW iterative design loop — problem definition, research, ideation, specifications, prototyping, testing, and communication — and how engineering notebooks and portfolios document the journey.
generated_by: claude skill chapter-content-generator
date: 2026-05-07 21:00:57
version: 0.08
---

# The Engineering Design Process

## Summary

This chapter teaches the PLTW engineering design process — the iterative loop of problem definition, research, ideation, specifications, prototyping, testing, and communication — that every subsequent project in this course will follow. Students learn how engineering notebooks and portfolios document the journey, why iteration is non-negotiable in additive manufacturing, and how the design process aligns with both ABET outcomes and community-college engineering curricula.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. PLTW Design Process (Concept 44)
2. Problem Definition (Concept 45)
3. Research Phase (Concept 46)
4. Ideation And Sketching (Concept 47)
5. Design Specifications (Concept 48)
6. Concept Selection (Concept 49)
7. Prototyping (Concept 50)
8. Iteration Cycle (Concept 51)
9. Testing And Validation (Concept 52)
10. Engineering Communication (Concept 53)
11. Engineering Notebook (Concept 54)
12. Portfolio Development (Concept 55)

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations and History of Additive Manufacturing](../01-foundations-and-history/index.md)

---

!!! mascot-welcome "Welcome to Chapter 3"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Benchy waves hello">
    This chapter is the one that turns "I have an idea" into "I have a plan." You're going to learn the PLTW engineering design process — the structured loop that professional engineers use to move from a fuzzy problem to a tested, documented solution. Every project you build from here on follows this loop, so understanding it deeply is worth every page.

## Why Engineers Need a Process

Imagine you've been asked to design a replacement bracket for a piece of lab equipment. You could dive straight into CAD, model something, print it, and discover three hours later that it doesn't fit. You could try again, still guessing. Or you could spend twenty minutes defining the problem precisely, sketching three options, picking the best one on paper, and then modeling and printing with confidence.

The second approach is not slower — it's faster. It just feels slower at first because you're doing work that doesn't immediately look like making something. That upfront thinking is exactly what the **engineering design process** provides: a structured sequence of activities that converts a problem into a solution with the fewest wasted prototypes.

The specific version you'll use in this course is the **PLTW Engineering Design Process**, developed by Project Lead The Way as part of their nationwide pre-engineering curriculum. It is closely aligned with the engineering design loops used in college engineering programs and industry settings, making it a transferable skill that extends well beyond this class.

#### Diagram: The PLTW Engineering Design Process Cycle

<details markdown="1">
<summary>The PLTW Engineering Design Process Cycle</summary>
Type: interactive-infographic
**sim-id:** pltw-design-process-cycle<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Recall and sequence the seven steps of the PLTW engineering design process and explain how they connect in an iterative loop (Bloom L1–L2: recall, sequence, explain).

**Description:** A circular p5.js diagram showing the PLTW design process as a ring of seven labeled nodes connected by curved directional arrows forming a clockwise loop. A center label reads "PLTW Engineering Design Process."

**Node labels and colors (clockwise from top):**
1. Define the Problem — blue (#1565C0)
2. Research — teal (#00695C)
3. Ideate — green (#388E3C)
4. Specify — yellow (#F57F17)
5. Prototype — orange (#E64A19)
6. Test & Validate — red (#C62828)
7. Communicate — purple (#6A1B9A)

**Canvas:** 650 × 500 px, responsive.

**Interactions:**
- Clicking any node highlights it with a pulsing glow and opens a detail panel below the diagram showing:
  - Step name and one-sentence description
  - Key questions asked at this step (bulleted list, 3–4 items)
  - Typical deliverables (e.g., "problem statement," "sketch sheet," "CAD model")
  - AM-specific note: how this step plays out in a 3D printing project
  - A "Next Step →" button that advances to the next node in the cycle
- Arrows between non-adjacent nodes (e.g., Test back to Ideate) are shown as lighter dashed arcs to indicate that iteration can jump back to earlier steps; hovering these arcs shows a tooltip: "Iteration: test results revealed a flaw — return here to redesign."
- A "Full Cycle" button animates a glowing bead traveling around the ring in sequence with a 0.8 s pause at each node.

**Layout:** Nodes evenly spaced on a circle of radius 200 px. Node circles are 60 px diameter with white text. Arrows are curved SVG paths with arrowheads.
</details>

## Step 1: Define the Problem

Every design process begins with a problem — but a vague problem produces a vague solution. **Problem definition** is the discipline of transforming a fuzzy situation into a precise, solvable statement before any design work begins.

A well-written problem statement does four things:

- Identifies the **user or stakeholder** whose need is being addressed
- Describes the **current situation** that is unsatisfactory
- States the **goal** without prescribing the solution
- Notes any **key constraints** (physical limits, available materials, budget, time)

Compare these two versions:

> **Weak:** "We need a better phone stand."

> **Strong:** "Students in the school makerspace need a phone stand that holds a phone at 60–75° from horizontal for hands-free video recording, fits phones 60–90 mm wide, and can be assembled and disassembled without tools so it can be shared between users."

The strong version tells you exactly who you're designing for, what the physical requirements are, and what "better" actually means. It does not say "print a folding stand" — that would be specifying a solution before understanding the problem. Solution-jumping at this stage is one of the most common mistakes in student engineering projects, and it almost always results in a product that solves the wrong problem elegantly.

In additive manufacturing projects specifically, problem definition is especially valuable because printing time is real — you cannot prototype your way out of a misunderstood problem without wasting hours of machine time and material.

## Step 2: Research

Once you have a clear problem statement, the next step is to learn everything relevant before generating solutions. The **research phase** serves three purposes: it reveals existing solutions you can learn from, surfaces constraints you might not have anticipated, and builds the vocabulary and domain knowledge you'll need to make good design decisions.

Research for an engineering design project typically draws from several source types:

| Source Type | Examples | What You're Looking For |
|---|---|---|
| Existing products | Commercial solutions, Thingiverse models | What approaches have been tried? What works and what doesn't? |
| Standards and specifications | ASTM material datasheets, dimensional standards | What are the accepted values, limits, or test methods? |
| User interviews | Conversations with your target user | What does the person actually need, not just what they say they want? |
| Technical literature | Engineering textbooks, manufacturer application notes | What physics, materials science, or process knowledge applies? |
| Prior prototypes and test data | Your own or a predecessor's prints, test results | What has already been tried in your specific context? |

One research skill that trips up many students: knowing when to stop. Research can expand indefinitely. The practical rule is to stop when you can answer the key questions raised by your problem statement and when additional research would no longer change your design decisions. In a semester-long project, two to three focused research sessions is usually appropriate.

## Step 3: Ideation and Sketching

With a well-defined problem and solid research in hand, you're ready to generate ideas. **Ideation** is the creative phase of the design process — the goal is to produce as many candidate solutions as possible before evaluating any of them.

The cardinal rule of ideation is **defer judgment**. During idea generation, no idea is bad enough to reject on the spot. Wild ideas are welcome because they stretch the possibility space and often contain the seed of a practical innovation. The time for critical evaluation comes in the next step.

**Sketching** is the primary tool of ideation in engineering design. You don't need artistic skill — you need to communicate shapes, relationships, and mechanisms clearly enough that another person (or your future self) can understand what you were thinking. Engineering sketches follow loose conventions:

- Draw in pencil; expect to revise
- Show multiple views if needed (front, side, top, isometric)
- Label key dimensions, even approximately
- Add short notes explaining non-obvious features
- Number and date each sketch for your engineering notebook

!!! mascot-thinking "Constraints Are the Fuel of Creativity"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Benchy thinks carefully">
    It might feel like having fewer constraints would make ideation easier. In practice, the opposite is often true. "Design anything" produces paralysis. "Design something that holds a phone, must be printed flat, uses no supports, and snaps together" produces a flood of ideas — because the constraints give your creativity something to push against. Constraints are not the enemy of design. They're the puzzle that makes it interesting.

Aim to generate at least five to eight distinct concepts during ideation — not variations on the same theme, but genuinely different approaches. A phone stand that folds, a phone stand that uses a slot-and-tab joint, a phone stand that clips to a desk edge, a stand with an adjustable-angle hinge: these are distinct concepts, not iterations. Variety at the ideation stage means you'll have real options to compare in the next step.

#### Diagram: Ideation Sketch Canvas

<details markdown="1">
<summary>Ideation Sketch Canvas</summary>
Type: MicroSim
**sim-id:** ideation-sketch-canvas<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Apply ideation principles by generating multiple distinct design concepts for a given constraint set (Bloom L3: apply, practice, demonstrate).

**Description:** An interactive p5.js canvas that simulates a structured ideation session. The student is given a randomly selected engineering challenge (from a set of five AM-relevant prompts, e.g., "Design a phone stand with no supports," "Design a cable organizer for a desk," "Design a modular hook system for a pegboard") and a 5-minute countdown timer. The canvas is divided into six equal cells, each with a faint "Concept #N" label, simulating a 6-concept ideation sheet.

**Canvas layout (700 × 520 px, responsive):**
- Top bar: Challenge description card (yellow), timer display, and "New Challenge" button
- Main area: 2 × 3 grid of sketch cells (each ~210 × 140 px), each with a "Concept #N" header and a free-draw area (mouse/touch drawing with a light pencil stroke style)
- Bottom bar: "Done — Review My Concepts" button + constraint checklist (checkboxes for the key constraints of the current challenge)

**Interactions:**
- Drawing: click/drag to draw freehand strokes in any cell; right-click or double-tap to erase last stroke
- "New Challenge" randomizes the challenge prompt and clears the canvas (with a confirm dialog to prevent accidental erasure)
- Timer counts down from 5:00; at 0:00 it flashes orange and shows "Time's up — review your concepts"
- "Done — Review My Concepts" opens an overlay with the constraint checklist: student checks which constraints each concept addresses
- "Clear Cell" button (appears on hover of each cell) clears only that cell's strokes

**Responsive behavior:** On narrow screens, the grid collapses to 1 × 6 (single column). Drawing still works via touch.
**Note:** This is a low-fidelity practice tool, not a submission system. Its value is in structured time-pressure ideation, not in the quality of the drawings.
</details>

## Step 4: Design Specifications

Ideation produces possibilities; **design specifications** convert those possibilities into measurable targets. A specification is a precise, testable statement of what the final design must achieve. The difference between a vague wish and a specification is testability: you must be able to measure whether the specification is met.

Specifications typically fall into two categories:

- **Requirements** (must-haves): The design must meet these to be acceptable. Failure on a requirement means the design is rejected. Example: "The bracket must support a 500 g load without deflecting more than 1 mm."
- **Desires** (nice-to-haves): The design should achieve these if possible, but failure does not disqualify it. Example: "The stand should be printable in under three hours."

Well-written specifications always include:

- The **parameter** being specified (load, dimension, print time, assembly time, etc.)
- The **target value** (with units)
- The **acceptable range** or tolerance (e.g., ± 0.5 mm, ≥ 80 % of target)
- The **test method** (how you will measure it)

One powerful tool for organizing specifications is the **engineering specification table** — a simple document that lists every requirement and desire alongside its test method and acceptance criterion. You'll build one for your own design project later in this course.

Before we look at the concept selection process that follows, the table below summarizes what distinguishes a well-formed specification from a vague goal. Each row shows the same design intent written two ways — notice how the specification version makes testing straightforward:

| Design Intent | Vague Goal | Testable Specification |
|---|---|---|
| It should be strong | "Won't break easily" | Supports 50 N lateral force with < 2 mm deflection (measured with calibrated weights) |
| It needs to fit my phone | "Works with most phones" | Accommodates devices 62–90 mm wide, confirmed with calipers |
| Should print fast | "Doesn't take too long" | Prints in ≤ 2 hours at 0.2 mm layer height on an FDM printer |
| Easy to assemble | "Simple to put together" | Assembled by a first-time user in < 3 minutes with no tools |

## Step 5: Concept Selection

You now have a set of candidate concepts from ideation and a list of specifications to evaluate them against. **Concept selection** is the structured process of picking the concept most likely to meet your specifications and constraints before committing to a full prototype.

The most common tool for concept selection in engineering education is the **decision matrix** (also called a Pugh matrix or weighted criteria matrix). The matrix lists your candidate concepts as columns and your specifications (criteria) as rows. Each cell gets a score for how well that concept meets that criterion. Weights can be assigned to criteria that matter more than others.

Before examining the interactive decision matrix below, here are the three steps to filling one out:

1. **Identify criteria:** Pull the key requirements and desires from your specification table. Use 4–8 criteria — too few gives you no discrimination, too many dilutes the signal.
2. **Weight the criteria:** Assign each criterion a weight (1–5 or 1–10) based on how critical it is. A structural load requirement for a bracket might get a weight of 5; aesthetic preference for color might get a 1.
3. **Score each concept:** For each concept-criterion combination, score from 1 (fails to meet) to 5 (exceeds). Multiply score × weight for a weighted score. Sum weighted scores per concept.

The concept with the highest total weighted score is usually the best starting point for prototyping — but the matrix is a decision aid, not a decision maker. If the highest-scoring concept has a fatal flaw not captured by the matrix, trust your engineering judgment over the arithmetic.

#### Diagram: Concept Selection Decision Matrix

<details markdown="1">
<summary>Concept Selection Decision Matrix</summary>
Type: MicroSim
**sim-id:** concept-selection-matrix<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Apply a weighted decision matrix to select the best design concept from a set of alternatives (Bloom L3–L5: apply, analyze, evaluate).

**Description:** An interactive p5.js decision matrix tool. The student can enter up to 5 concepts (columns) and up to 6 criteria (rows), assign weights (1–5) to each criterion, and score each concept on each criterion (1–5). The matrix auto-calculates weighted scores, totals per concept, and highlights the winning concept.

**Canvas layout (700 × 500 px, responsive):**
- Top area: Matrix table with editable cells
  - Column headers: "Criterion", "Weight", then "Concept 1" through "Concept N" (up to 5)
  - Row entries: up to 6 criteria (user-editable text)
  - Weight column: number spinners 1–5
  - Score cells: number spinners 1–5 for each concept × criterion
  - Bottom row: "Weighted Total" — auto-calculated, displayed as a bold number
- The winning concept column is highlighted in green; second-place in yellow
- Controls below the matrix:
  - "Add Concept" button (up to 5)
  - "Add Criterion" button (up to 6)
  - "Reset Matrix" button
  - "Download as CSV" button (generates a comma-separated download of the matrix)
- A bar chart below the matrix shows weighted totals per concept, updating in real time as scores change

**Pre-loaded example:** Phone stand design with 3 concepts (fold-flat, slot-tab, desk-clip) and 5 criteria (structural strength, ease of assembly, print time, no supports needed, adjustable angle). Student can modify or clear to enter their own project.

**Interactions:** All cells are editable. Matrix recalculates and chart updates on every change. Hovering a concept column highlights the entire column. Clicking a concept name opens a text field to rename it.

**Responsive behavior:** On narrow screens, the matrix scrolls horizontally. The bar chart stacks below.
</details>

## Step 6: Prototyping

A prototype is a physical or digital realization of your design concept, built for the purpose of learning — not for the purpose of producing a finished product. **Prototyping** is where additive manufacturing becomes a genuine superpower in the engineering design process: you can go from a CAD file to a physical object in hours rather than days or weeks.

Prototypes exist on a spectrum from low-fidelity to high-fidelity:

- **Sketch models:** Foam, cardboard, or tape assemblies built in minutes to check overall size and form. Answer questions like "Does this feel right in the hand?" or "Is this roughly the right scale?"
- **Appearance prototypes:** 3D-printed parts optimized for visual accuracy but not structural performance. Used to evaluate aesthetics, color, labeling, and ergonomics.
- **Functional prototypes:** 3D-printed or machined parts built to test specific mechanical performance — load capacity, fit, range of motion, assembly sequence.
- **Production-intent prototypes:** Parts made with the actual production process and material, intended to verify that manufacturing is feasible and that the final design meets all specifications.

In a high-school AM course, you will work most with sketch models and functional prototypes. The key insight is to build the prototype that answers the specific question you currently have — not the most impressive prototype you can make. Printing a fully detailed appearance model when you're still uncertain whether the joint mechanism works is a waste of print time.

!!! mascot-tip "Prototype What You Don't Know"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Benchy gives a thumbs up">
    Here's the move that saves hours: before you print a full model, identify the single riskiest assumption in your design and build the smallest possible prototype that tests only that. Does the snap-fit joint actually snap? Print just the joint — not the whole part. Does the phone actually fit? Print just the slot — not the whole stand. This approach (sometimes called a "critical-parameter prototype") lets you iterate fast on what matters and print the full design only once you're confident.

## The Iteration Cycle

The PLTW design process is often shown as a neat linear sequence of steps, but that diagram is slightly misleading. In practice, design is **iterative**: you move forward, encounter new information, and loop back to an earlier step. This looping is not a failure — it is the mechanism by which designs improve.

The **iteration cycle** in additive manufacturing looks something like this: you prototype a design, test it, discover that the snap-fit tabs break at lower loads than specified, return to your CAD model, revise the tab geometry, reprint, and test again. Each loop through prototype → test → revise produces a part that better meets its specifications. Professional products routinely go through dozens of iterations before reaching production; in a class project, three to five iterations is a solid target.

!!! mascot-warning "Skipping Iteration Is How Parts Get Reprinted Anyway"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Benchy looks concerned">
    The most common temptation in a time-pressured project is to print the first prototype, decide it's "good enough," and submit without iterating. This almost never actually saves time — it just moves the rework to a later, more stressful moment (like the day before the deadline, when the teacher points out that the joint doesn't actually hold). Planned iteration is faster than panicked rework. Build iteration time into your project schedule from the beginning.

The iteration cycle is also where your engineering notebook earns its value. Every loop through the cycle produces new information: test data, failure modes, revised dimensions, before-and-after photos. That record is what allows you to explain, months later, exactly why your final design looks the way it does.

#### Diagram: Iteration Cycle Simulator

<details markdown="1">
<summary>Iteration Cycle Simulator</summary>
Type: MicroSim
**sim-id:** iteration-cycle-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Analyze how repeated prototype-test-revise cycles converge on a design that meets specifications (Bloom L4: examine relationships, analyze patterns).

**Description:** An animated p5.js simulation showing an abstract design metric (e.g., "load capacity" or "dimensional accuracy") improving over successive iterations. The student controls how much effort goes into each phase of the cycle and observes how the design metric evolves.

**Canvas layout (680 × 460 px, responsive):**
- Top: A horizontal "Design Quality" gauge (0–100 %), starting at 30–40 %, increasing with iterations
- Middle: Three sliders labeled "Research depth," "Prototype fidelity," and "Test rigor" (each 1–5)
- Center: A circular animation showing the three-phase loop: Prototype → Test → Revise, with a glowing bead cycling around
- Right panel: A live line chart showing Design Quality vs. Iteration Number (X-axis 1–10, Y-axis 0–100 %)
- Bottom: "Run Next Iteration" button; "Reset" button

**Simulation logic (simplified, pedagogically calibrated):**
- Each iteration increases Design Quality by a random amount within a range influenced by the three sliders (higher values = larger potential improvement)
- Diminishing returns are modeled: improvements shrink as quality approaches 100 %
- A "Specification Target" horizontal line at 80 % (user-draggable between 60–95 %) shows when the design would be accepted
- At each iteration, a brief text log entry appears (e.g., "Iteration 3: Tab thickness increased 0.4 mm → load capacity improved 12 %")

**Interactions:** All sliders update simulation parameters for the next iteration. Clicking "Run Next Iteration" advances one loop and updates the chart and gauge. Hovering any chart point shows that iteration's log entry in a tooltip.

**Responsive behavior:** On narrow screens, the chart and left panel stack vertically.
</details>

## Testing and Validation

**Testing and validation** is the phase where you find out whether your prototype actually meets your specifications — and, crucially, which specifications it falls short on and by how much. This is not the scary part of the design process; it is the most informative part.

Testing in an AM course takes many forms depending on what you're evaluating:

- **Dimensional testing:** Measure critical dimensions with calipers or a ruler. Compare to specified dimensions. Record the difference (error) and check it against your tolerance specification.
- **Functional testing:** Does the part do what it's supposed to do? Does the hinge articulate through its full range of motion? Does the snap-fit close and open repeatedly without cracking?
- **Load testing:** Apply measured forces (known weights, a spring scale, or calibrated loads) to structural parts and record deflection, yield point, or failure mode.
- **User testing:** Have a person who didn't design the part try to use it. Observe where they struggle, what questions they ask, and what they find intuitive.

Each test should be planned before you run it — define what you're measuring, how you're measuring it, and what constitutes a pass. Record raw data, not just conclusions. "The bracket held 500 g" is a conclusion; "we hung calibrated 100 g masses, one at a time, from the hook and measured deflection with a ruler at each increment: 100 g → 0.2 mm, 200 g → 0.5 mm, 300 g → 0.9 mm, 400 g → 1.6 mm, 500 g → 2.4 mm" is data. Data gives you information to act on; conclusions give you only a pass/fail.

Validation means comparing your test results against your specifications to decide whether the design is complete. If all requirements are met and most desires are satisfied, the design is validated and ready for communication. If one or more requirements are not met, you loop back to redesign — this is the iteration cycle in action.

## Engineering Communication

A design that cannot be communicated is a design that cannot be built by anyone else, cannot be evaluated by anyone else, and cannot be improved by anyone else. **Engineering communication** is the set of skills and conventions that make your design work visible, understandable, and usable beyond your own notebook.

Engineering communication in a 3D printing context includes several forms:

- **Engineering drawings:** Dimensioned orthographic views (front, top, side) that specify exactly what the part looks like, with tolerances on critical dimensions. Even if you're designing for additive manufacturing, being able to read and produce engineering drawings is a fundamental professional skill.
- **Technical documentation:** Written descriptions of design decisions — why you chose one concept over another, what iteration revealed, what the final specifications are.
- **Presentations:** Oral or slide-based communication of your design process and results to an audience that didn't follow the project day to day.
- **CAD models and annotated screenshots:** Shared files that allow others to view, analyze, or modify your design.
- **Photos and video:** Documentation of prototypes, assembly processes, and tests — especially important in AM where the printing process itself is part of the story.

!!! mascot-encouraging "Communication Is a Skill, Not a Talent"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Benchy cheers you on">
    Many students dread the "communicate" step because they feel their writing or presentation skills aren't strong enough. Here's the truth: engineering communication is a learnable craft, not an innate gift. The engineers who communicate well do so because they practice — every project, every notebook entry, every slide deck. Start now, even if your first attempts feel clumsy. The ability to explain your design clearly is, in many workplaces, as valued as the ability to create it.

## The Engineering Notebook

The **engineering notebook** is the running record of your design process — every observation, decision, sketch, measurement, and result, recorded in sequence as the project unfolds. It is not a polished report written after the fact; it is a living document that captures the actual history of your thinking.

Professional engineers maintain engineering notebooks for several practical reasons:

- **Patent and IP documentation:** A dated, witnessed engineering notebook is legal evidence of when an invention was conceived and how it was developed.
- **Debugging and traceability:** When a design fails six months later, the notebook shows exactly what was done and when, making root cause analysis possible.
- **Knowledge transfer:** A new team member can read the notebook and understand what has been tried, what worked, and what was abandoned and why.

In an educational setting, your engineering notebook serves the same functions at smaller scale: it documents that you followed a design process, it provides evidence for portfolio assessment, and it becomes your primary resource when you write your final report.

Good notebook practice follows a few simple rules:

- **Write in ink** (or date-stamped digital entries if you use a digital format). Pencil entries look like they can be erased and back-dated.
- **Date every page** at the top. If you make multiple entries in one day, note the time.
- **Never tear out pages** or skip pages. If you make an error, draw a single line through it and initial it — don't obliterate it.
- **Paste in printed elements** (slicer screenshots, test data tables, photos) and initial and date the paste-in so it's clear it belongs to that day's entry.
- **Write for a reader six months in the future** — probably yourself — who has forgotten everything about this project. "Printed part" is not enough. "Printed phone-stand v2 in PLA, 0.2 mm layers, 20 % infill, on Printer A. Print time 1 hr 22 min. Part came out slightly warped on the back left corner — bed adhesion issue suspected" is a notebook entry.

#### Diagram: Engineering Notebook Page Anatomy

<details markdown="1">
<summary>Engineering Notebook Page Anatomy</summary>
Type: interactive-infographic
**sim-id:** notebook-page-anatomy<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Learning objective:** Identify the required elements of a proper engineering notebook entry and explain why each element matters (Bloom L1–L2: identify, explain).

**Description:** An interactive p5.js rendering of a sample engineering notebook page spread (left and right pages). Labeled callout arrows point to each key element of good notebook practice. Clicking a callout opens an explanation panel.

**Canvas layout (700 × 480 px, responsive):**
- Background: Cream/off-white grid-paper texture filling both pages
- Left page sample content (rendered as faint "handwriting-style" text and sketches):
  - Date and time at top
  - Project name and page number
  - A hand-drawn sketch of a phone stand bracket with dimension annotations
  - A short prose entry describing the design decision made that day
  - A paste-in label area (gray rectangle) with "Photo: v2 print, front view"
  - Author initials at bottom right
- Right page sample content:
  - Test data table (load vs. deflection)
  - A short "Next Steps" bullet list
  - A second sketch showing a proposed revision
- Callout markers (numbered circles in orange) pointing to: date, project name, sketch with dimensions, prose rationale, paste-in label, initials, data table, revision sketch, next steps

**Interactions:** Clicking any numbered callout circle opens a side panel (or modal overlay) with:
- Element name
- Why it's required (1–2 sentences)
- Common mistake to avoid
- Example of good vs. poor practice for this element
- "Got it" button to dismiss

A "Quiz Me" button at bottom cycles through the callout markers in random order, hiding the labels and asking the student to click the correct element when given its name.

**Responsive behavior:** On narrow screens, both pages render in a single-column scroll; callouts appear as expandable accordion items below the illustration.
</details>

## Portfolio Development

Where the engineering notebook is a raw, unedited record of the process, the **portfolio** is a curated, polished presentation of your best work. Developing a portfolio is the final form of engineering communication — you are selecting, organizing, and presenting evidence that you can apply the engineering design process, use AM tools, and produce functional results.

A strong engineering portfolio for a high-school AM course typically includes:

- **Problem statements:** Clear, concise descriptions of what each project was trying to solve, written for a reader who has no prior context
- **Process documentation:** Selected notebook entries, photos, and key decision points that show how you worked through the design process
- **Specification tables:** Evidence that you set measurable targets before building
- **CAD screenshots and drawings:** Rendered views of your models, with dimensions on critical features
- **Prototype photos:** Before-and-after photos showing iteration — "v1 failed here; v2 fixed it by..."
- **Test data summaries:** Tables or charts showing measured performance versus specifications
- **Reflection:** An honest, specific assessment of what worked, what you'd change, and what you learned

The portfolio format can vary — a bound physical document, a PDF, a Google Sites website, or a platform like Behance or a GitHub Pages site. What matters more than format is specificity: the weakest portfolios say "I designed a phone stand and it worked"; the strongest say "I defined the problem, generated eight concepts, selected one using a decision matrix, printed and tested three iterations, discovered and fixed a joint failure mode, and ended up with a part that met five of six specifications."

A well-built portfolio from this course can serve multiple purposes: evidence for community-college articulation credit, support for scholarship applications, and demonstration of your capabilities in a technical job interview. These are real, near-term stakes — the habit of documenting your work carefully pays dividends faster than most students expect.

## Key Takeaways

The PLTW engineering design process provides a repeatable, learnable framework for turning problems into tested solutions. Here is the core of what you now understand:

- **PLTW Design Process** is a seven-step iterative loop: define → research → ideate → specify → prototype → test → communicate. The loop can (and should) be re-entered from any step when new information demands it.
- **Problem definition** precedes all design. A precise, testable problem statement prevents the most common student engineering mistake: designing an elegant solution to the wrong problem.
- **Research** fills in the knowledge gaps between your problem and your design. Know when to stop: research until additional information would no longer change your decisions.
- **Ideation** is a quantity game first. Generate many distinct concepts before evaluating any. Constraints are not obstacles to creativity — they are the prompt.
- **Design specifications** turn vague intentions into measurable, testable targets. Every specification needs a parameter, a target value, an acceptable range, and a test method.
- **Concept selection** uses structured tools — decision matrices, weighted criteria — to pick the most promising concept before committing to fabrication.
- **Prototyping** in AM means building the lowest-fidelity prototype that answers your current riskiest question. Don't print the whole design when a partial prototype will do.
- **Iteration** is planned, not accidental. Build three to five revision cycles into your project schedule from day one.
- **Testing and validation** generate data, not just conclusions. Compare test results to specifications to determine pass/fail and to guide the next revision.
- **Engineering communication** makes your work visible and useful to others: drawings, documentation, presentations, and shared files.
- **Engineering notebooks** capture the unedited history of your design process in real time.
- **Portfolios** curate the best of that history into polished, audience-ready evidence of your skills.

!!! mascot-celebration "Chapter 3 Complete — You Have a Process Now"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Benchy celebrates">
    That's the full PLTW loop in your hands — define, research, ideate, specify, prototype, test, communicate. You just built the mental scaffolding that every project in this course will hang on. Chapter 4 is where things get tangible: you'll start working in CAD, turning the ideas you can now sketch and specify into the 3D models you'll send to a printer. Let's make something.
