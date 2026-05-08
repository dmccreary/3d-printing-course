# Quiz: Foundations and History of Additive Manufacturing

Test your understanding of the foundations, physics concepts, and history of additive manufacturing with these questions.

---

#### 1. Which formula correctly expresses the density of a 3D-printed part, where ρ is density, m is mass, and V is volume?

<div class="upper-alpha" markdown>
1. ρ = m × V
2. ρ = V / m
3. ρ = m / V
4. ρ = m + V
</div>

??? question "Show Answer"
    The correct answer is **C**. Density (ρ) is defined as mass per unit volume: ρ = m/V. This formula is used by slicer software to convert between filament length (volume) and material cost (mass). Options A and D are dimensionally incorrect operations; option B inverts the relationship, giving volume per unit mass (specific volume), not density.

    **Concept Tested:** Mass and Density

---

#### 2. What was the primary reason desktop FDM printer prices did not drop below $1,000 until after 2009?

<div class="upper-alpha" markdown>
1. The materials needed to print were too expensive for consumers
2. Stratasys held an active patent on the FDM process
3. RepRap printers were not yet open-source
4. Stepper motors and electronics were not yet affordable
</div>

??? question "Show Answer"
    The correct answer is **B**. Scott Crump filed the FDM patent in 1989 and it remained in force until 2009. During this period Stratasys was the only company legally able to sell FDM printers, keeping prices at $30,000–$300,000. Materials were available, RepRap was already open-source by 2007, and electronics were already falling in price — but the patent lock-in was the primary economic barrier.

    **Concept Tested:** FDM Patent Expiration

---

#### 3. A slicer estimates a print will use 47 grams of PLA. If a 1,000 g spool costs $24, what is the approximate filament cost for this part?

<div class="upper-alpha" markdown>
1. $0.11
2. $1.13
3. $2.40
4. $4.70
</div>

??? question "Show Answer"
    The correct answer is **B**. Using the proportion: (47 g / 1,000 g) × $24 = 0.047 × $24 = $1.13. Option A incorrectly divides $24 by 200; option C mistakenly uses 10% of $24; option D divides $24 by only 5. This type of unit-rate algebra is the core math skill needed to estimate filament costs for any print job.

    **Concept Tested:** Algebra Basics

---

#### 4. In additive manufacturing, the term "subtractive manufacturing" refers to a process that:

<div class="upper-alpha" markdown>
1. Builds objects layer by layer from digital models
2. Removes material from a raw block by cutting, drilling, or milling
3. Joins powder particles using a laser or electron beam
4. Deposits material only in areas specified by a support structure
</div>

??? question "Show Answer"
    The correct answer is **B**. Subtractive manufacturing starts with a solid block of raw material and removes material until the desired shape remains. This contrasts with additive manufacturing, which builds up material layer by layer. Options A and C describe additive processes; option D describes support-structure deposition, which is a feature of additive manufacturing.

    **Concept Tested:** Subtractive Manufacturing

---

#### 5. Adrian Bowyer's RepRap Project was considered groundbreaking primarily because it:

<div class="upper-alpha" markdown>
1. Invented the FDM process independently of Stratasys
2. Produced an open-source self-replicating 3D printer design
3. Created the first printer capable of printing in multiple materials
4. Demonstrated the first use of PLA as a printing material
</div>

??? question "Show Answer"
    The correct answer is **B**. Bowyer's RepRap Project created an FDM-style printer whose plastic structural parts could be printed by another RepRap — making it self-replicating. Critically, the design was released as open-source, allowing anyone to build and improve it. Bowyer did not invent FDM (Crump did) and RepRap was not the first multi-material or PLA printer.

    **Concept Tested:** RepRap Project

---

#### 6. Which unit is used for virtually all part dimensions in additive manufacturing?

<div class="upper-alpha" markdown>
1. Centimeters (cm)
2. Inches (in)
3. Millimeters (mm)
4. Meters (m)
</div>

??? question "Show Answer"
    The correct answer is **C**. Additive manufacturing uses the metric system almost exclusively, with millimeters as the standard unit for all part dimensions, nozzle diameters, layer heights, and bed-leveling gaps. Centimeters and meters appear in theoretical contexts but not in everyday printer use. Inches appear only in legacy drawings; the key conversion is 1 inch = 25.4 mm.

    **Concept Tested:** Units and Measurement

---

#### 7. Charles Hull invented stereolithography, which he patented in 1986. What key principle made this process a commercial breakthrough for rapid prototyping?

<div class="upper-alpha" markdown>
1. It could print in thermoplastic filament at lower cost than injection molding
2. A UV laser could cure liquid resin layer by layer to create solid 3D objects
3. It used a powder bed and electron beam to fuse metal parts
4. Interchangeable parts could be manufactured without custom tooling
</div>

??? question "Show Answer"
    The correct answer is **B**. Hull discovered that a UV laser tracing across a vat of liquid photopolymer resin would cure (solidify) a thin layer, and repeating this process built a three-dimensional object. This digital-to-physical workflow was commercially viable for rapid prototyping. Option A describes FDM; option C describes EBM; option D describes a principle from the Industrial Revolution, not stereolithography.

    **Concept Tested:** Stereolithography Invention

---

#### 8. Which organization, established in 2012, created standardized workforce competency frameworks that informed the structure of this 3D printing course?

<div class="upper-alpha" markdown>
1. RepRap Foundation
2. Stratasys Corporation
3. America Makes Institute
4. ASTM International
</div>

??? question "Show Answer"
    The correct answer is **C**. America Makes — the National Additive Manufacturing Innovation Institute — was co-established in 2012 by the U.S. Departments of Defense and Energy in Youngstown, Ohio. It publishes workforce competency frameworks that align high school CTE programs with industry needs and create articulation pathways to community colleges. RepRap and Stratasys are companies; ASTM writes technical standards, not workforce frameworks.

    **Concept Tested:** America Makes Institute

---

#### 9. The Maker Movement is best described as:

<div class="upper-alpha" markdown>
1. A government manufacturing initiative focused on military applications
2. A cultural movement using digital fabrication tools to create objects outside traditional industrial settings
3. A Stratasys marketing campaign promoting FDM printers in schools
4. A professional certification program for additive manufacturing technicians
</div>

??? question "Show Answer"
    The correct answer is **B**. The Maker Movement is a cultural and social phenomenon in which individuals and communities use digital fabrication tools — 3D printers, laser cutters, CNC routers, Arduino electronics — to design and build physical objects outside of traditional industrial contexts. It grew from hobbyist culture amplified by the RepRap project and the desktop printer revolution. It is not a government program, a corporate campaign, or a certification system.

    **Concept Tested:** Maker Movement

---

#### 10. In Newton's Second Law (F = m × a), which scenario best describes how force appears in FDM printing?

<div class="upper-alpha" markdown>
1. The cooling fan applies pressure to solidify each deposited layer
2. The UV lamp applies force to cure resin during stereolithography
3. A clogged nozzle increases the required extrusion force until the extruder gear slips
4. The heated bed applies thermal force to help the first layer bond
</div>

??? question "Show Answer"
    The correct answer is **C**. When a nozzle is partially clogged, the cross-sectional area available for filament flow decreases, increasing the back-pressure (force per area) required to push material through. When this force exceeds what the extruder motor can deliver, the gear slips and extrusion stops. Cooling fans apply airflow, not structural force on layers; UV lamps deliver energy, not mechanical force; heated beds deliver thermal energy, not force.

    **Concept Tested:** Force and Pressure

---
