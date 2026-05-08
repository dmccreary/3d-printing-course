# Quiz: Design for Additive Manufacturing and Metrology

Test your understanding of DfAM principles, overhang and bridging rules, part orientation, tolerance strategies, lattice structures, topology optimization, and metrology with calipers and GD&T.

---

#### 1. What is the standard "self-supporting angle" guideline for FDM overhangs, and what does it represent?

<div class="upper-alpha" markdown>
1. 30° from horizontal — the maximum slope a layer can print without any support
2. 45° from vertical — the maximum overhang angle before support material is typically required
3. 60° from horizontal — the threshold where cooling fans must engage at 100%
4. 90° from vertical — representing a fully horizontal surface that always requires support
</div>

??? question "Show Answer"
    The correct answer is **B**. The 45-degree guideline refers to the angle measured from vertical (the build axis). Geometry overhanging more than 45° from vertical — meaning it leans more than 45° past the support of the layer below — typically requires either support material or a redesign. This threshold is not a physical constant; it shifts based on layer height, cooling, material, and machine tuning. It is a design starting point, not a guarantee.

    **Concept Tested:** Self-Supporting Angles

---

#### 2. A student is designing a printed bracket with a large horizontal bridge between two walls that spans 120 mm. What is the most effective DfAM strategy?

<div class="upper-alpha" markdown>
1. Increase infill density to 80% to provide internal support for the bridge
2. Add a chamfer or arch profile to the underside of the bridge to shorten the unsupported span
3. Use a raft beneath the entire part to prevent the bridge from sagging
4. Lower print temperature by 20°C so the filament cools faster mid-bridge
</div>

??? question "Show Answer"
    The correct answer is **B**. Long bridges (over ~60 mm) sag because the extruded strand cools too slowly before gravity pulls it down. Redesigning the bridge underside as an arch or chamfer converts the long horizontal span into a series of shorter self-supporting angles, eliminating the need for supports. Increasing infill doesn't help bridge surfaces; a raft affects bed adhesion, not bridges; lowering temperature can worsen layer adhesion and is not a reliable design solution.

    **Concept Tested:** Bridging

---

#### 3. Which part orientation on the build plate produces the strongest FDM tensile load path for a rod that will be pulled along its long axis?

<div class="upper-alpha" markdown>
1. Flat — printing the rod lying horizontal so all layers are perpendicular to the applied load
2. Vertical — printing the rod upright so layers stack along its long axis
3. At 45° diagonal — distributing the load across more layer interfaces simultaneously
4. Vertical — upright orientation maximizes layer count and thus overall strength
</div>

??? question "Show Answer"
    The correct answer is **A**. In FDM, tensile strength is highest when the applied load is transmitted within each layer (across the extruded bead) rather than between layers. Inter-layer bond strength is the weakest direction of an FDM part. Printing the rod flat orients the layers perpendicular to the pull axis, so the load travels through each layer's material, not through inter-layer bonds. A vertically printed rod loaded axially transfers force through its weakest interfaces.

    **Concept Tested:** Part Orientation Strategy

---

#### 4. Topology optimization produces organic-looking parts with irregular geometry because it:

<div class="upper-alpha" markdown>
1. Randomly varies infill density to reduce printing time at the expense of predictable strength
2. Applies iterative finite element analysis to remove material from low-stress regions while maintaining structural performance
3. Extrudes material along the stress lines detected by the slicer during toolpath generation
4. Uses generative AI to suggest aesthetic shapes that approximate the original part outline
</div>

??? question "Show Answer"
    The correct answer is **B**. Topology optimization runs iterative FEA simulations on the part under its defined load cases and boundary conditions. At each iteration, material in regions below a stress threshold is removed. The algorithm repeats until removing more material would compromise performance targets. The result is a minimum-mass structure that carries the applied loads efficiently — often resembling bone or tree branches because nature uses the same principle. It is not random and is separate from AI shape generation.

    **Concept Tested:** Topology Optimization

---

#### 5. A designer wants to measure the inside diameter of a printed bearing bore that is 12.5 mm wide. Which measuring tool and technique is correct?

<div class="upper-alpha" markdown>
1. Outside jaw calipers, placed across the exterior of the bore wall
2. Inside jaw calipers (or inside jaws of a digital caliper), opened to contact the bore walls
3. A micrometer, with the spindle extended into the bore until contact
4. A calibration cube, placed inside the bore to verify diameter by fit-check
</div>

??? question "Show Answer"
    The correct answer is **B**. Digital calipers have two jaw sets: outside jaws (the larger lower jaws) for external dimensions, and inside jaws (small upper nubs) for internal dimensions like hole diameters and slot widths. For a 12.5 mm bore, the inside jaws are inserted and expanded until they contact both walls. A micrometer measures external dimensions with its spindle; it cannot easily reach inside a bore. Outside jaws would measure the wall exterior, not the hole. A calibration cube is a print test, not a measuring instrument.

    **Concept Tested:** Calipers

---

#### 6. In GD&T notation, a "true position" tolerance applied to a printed hole specifies:

<div class="upper-alpha" markdown>
1. The allowed range of hole diameters, expressed as ± tolerance from nominal
2. The cylindrical zone within which the hole's axis must fall relative to a datum reference frame
3. The required surface roughness of the hole wall after post-processing
4. The minimum wall thickness surrounding the hole to prevent cracking under load
</div>

??? question "Show Answer"
    The correct answer is **B**. True position (⊕ symbol in GD&T) defines a cylindrical tolerance zone centered on the theoretically exact location of a feature's axis, referenced to one or more datums. The actual hole axis must fall inside this zone. This is more powerful than a simple ± coordinate tolerance because it accounts for the circular nature of the tolerance zone (giving ~57% more usable area) and enforces relationship to a datum system. It does not control diameter, surface finish, or wall thickness.

    **Concept Tested:** GD&T Basics

---

#### 7. When printing a hole intended to receive an M5 bolt (5.0 mm nominal diameter), a DfAM practitioner typically models the hole at:

<div class="upper-alpha" markdown>
1. Exactly 5.0 mm — the slicer will compensate for shrinkage automatically
2. 5.2–5.4 mm — slightly oversized to compensate for FDM hole contraction caused by filament shrinkage and bead geometry
3. 4.8 mm — slightly undersized so the bolt must be forced in for a friction fit
4. 6.0 mm — a 1 mm clearance is standard practice for all metric fasteners in FDM
</div>

??? question "Show Answer"
    The correct answer is **B**. FDM holes consistently print smaller than nominal because the extruded bead deposits on the inside of the circular path, effectively filling inward. A 5.0 mm CAD hole often prints at 4.6–4.8 mm. Standard practice is to add 0.2–0.4 mm to the designed diameter for clearance fits, or to use the slicer's horizontal expansion compensation after measuring a test print. Modeling at exactly 5.0 mm reliably produces an undersized hole; 4.8 mm compounds the problem; 6.0 mm creates excessive slop for most applications.

    **Concept Tested:** Hole And Slot Tolerances

---

#### 8. A student prints five identical calibration cubes and measures the X dimension on each: 19.7, 19.8, 19.7, 19.9, 19.8 mm. The nominal design dimension is 20.0 mm. How should these results be interpreted?

<div class="upper-alpha" markdown>
1. The printer is accurate and precise — the cubes are within acceptable variation for most applications
2. The printer is precise (consistent) but not accurate (biased low by ~0.2 mm); X-axis steps/mm or flow rate needs adjustment
3. The printer is accurate but not precise — the spread of 0.2 mm indicates a repeatability problem
4. The results are within the normal tolerance band of ±0.5 mm; no calibration action is needed
</div>

??? question "Show Answer"
    The correct answer is **B**. Precision means repeatability — all five measurements cluster tightly (19.7–19.9 mm, a spread of only 0.2 mm), so the printer is consistent. Accuracy means closeness to the true value — all five are consistently below 20.0 mm by ~0.2 mm, indicating a systematic bias, not random error. This pattern points to a calibration offset: the X-axis steps/mm setting or the flow rate multiplier needs a small upward adjustment. High precision with low accuracy is a systematic error, not a repeatability problem.

    **Concept Tested:** Repeatability And Reproducibility

---

#### 9. Lattice structures are used in DfAM primarily to:

<div class="upper-alpha" markdown>
1. Replace all solid walls with open-cell geometry to maximize UV light penetration during resin curing
2. Reduce part mass while maintaining structural stiffness by filling interior volume with a periodic open framework
3. Increase surface area for bonding layers more securely in high-temperature materials like PC
4. Provide a uniform internal pattern that slicer software can process faster than organic infill geometries
</div>

??? question "Show Answer"
    The correct answer is **B**. Lattice structures are engineered open-cell frameworks (gyroid, octet truss, Voronoi, BCC, etc.) designed to fill interior volume with minimum material while retaining structural performance. The design intent is lightweighting: removing material from low-stress interior regions while maintaining a solid exterior skin and strategic internal members. This is a core DfAM advantage — AM can produce complex internal geometry that would be impossible to machine. The other options describe unrelated behaviors.

    **Concept Tested:** Lattice Structures

---

#### 10. Evaluate the following DfAM decision: A student redesigns a robot arm bracket by merging three previously separate machined aluminum parts into one printed assembly with internal channels, organic topology-optimized geometry, and integrated snap-fit clips. What is the most significant benefit of this approach?

<div class="upper-alpha" markdown>
1. The printed part will be stiffer than the aluminum assembly because polymers have higher flexural modulus
2. Consolidating parts eliminates assembly steps, fasteners, and tolerance stack-up between mating surfaces
3. Organic geometry always prints faster because slicers optimize toolpaths for curved surfaces
4. Internal channels are mandatory in DfAM to allow trapped support material to be removed after printing
</div>

??? question "Show Answer"
    The correct answer is **B**. Part consolidation is one of the most powerful DfAM strategies: merging multiple components into a single printed part eliminates assembly labor, removes fasteners and their associated cost and weight, and avoids tolerance stack-up — the cumulative dimensional error that builds up across mating surfaces in multi-part assemblies. Polymers are not stiffer than aluminum; organic geometry does not inherently slice faster; and internal channels are a design choice for cooling or weight reduction, not a DfAM requirement.

    **Concept Tested:** DfAM Principles

---
