# Quiz: AM Standards, Process Families, and Industrial AM

Test your understanding of ISO/ASTM standards, the seven process categories, and industrial additive manufacturing with these questions.

---

#### 1. What does the term "anisotropy" mean in the context of FDM-printed parts?

<div class="upper-alpha" markdown>
1. The part is equally strong in all directions
2. Mechanical properties differ depending on the direction of applied load
3. The part contains internal lattice structures to save material
4. The Z axis moves slower than the X and Y axes
</div>

??? question "Show Answer"
    The correct answer is **B**. Anisotropy (from Greek: not equal direction) means that a material behaves differently depending on the axis along which force is applied. In FDM parts, inter-layer bonds are weaker than within-layer bonds, so a force pulling layers apart (Z direction) fails at lower loads than the same force applied along layers (XY plane). Option A describes isotropy; options C and D are unrelated to anisotropy.

    **Concept Tested:** Anisotropy

---

#### 2. Which document serves as the foundational vocabulary standard for all additive manufacturing?

<div class="upper-alpha" markdown>
1. ASTM F42 Committee Report
2. ISO/ASTM 52900
3. Manufacturing USA Network Charter
4. America Makes Workforce Framework
</div>

??? question "Show Answer"
    The correct answer is **B**. ISO/ASTM 52900, titled *Additive Manufacturing — General Principles — Fundamentals and Vocabulary*, defines the terms and seven process categories that every other AM standard builds upon. It is jointly developed by ISO Technical Committee 261 and ASTM Committee F42. The F42 committee develops standards but is not itself a vocabulary document; Manufacturing USA and America Makes are not standards bodies.

    **Concept Tested:** ISO ASTM 52900 Standard

---

#### 3. In Selective Laser Sintering (SLS), what role does the unfused powder play during the build?

<div class="upper-alpha" markdown>
1. It acts as a natural support structure, eliminating the need for separate support material
2. It is collected and reused as a binder for the next build cycle
3. It provides the inert gas atmosphere required for metal fusion
4. It is jetted with a fusing agent before an infrared lamp passes over it
</div>

??? question "Show Answer"
    The correct answer is **A**. In SLS, the unfused powder surrounding the part supports it on all sides during the build — one of SLS's major advantages, enabling complex overhangs and internal features without support structures. Option B doesn't accurately describe SLS powder recycling; option C describes metal AM atmosphere control; option D describes the MJF process, not SLS.

    **Concept Tested:** SLS Process

---

#### 4. Which of the seven ISO/ASTM 52900 process categories does desktop FDM printing belong to?

<div class="upper-alpha" markdown>
1. Vat Photopolymerization
2. Binder Jetting
3. Material Extrusion
4. Powder Bed Fusion
</div>

??? question "Show Answer"
    The correct answer is **C**. Under ISO/ASTM 52900, FDM (Fused Deposition Modeling) and FFF (Fused Filament Fabrication) both fall under Material Extrusion — defined by feedstock being fed through a heated nozzle and deposited in a precise path. Vat Photopolymerization covers SLA/MSLA/DLP resin printing; Binder Jetting deposits a liquid binder onto a powder bed; Powder Bed Fusion fuses powder with thermal energy.

    **Concept Tested:** Material Extrusion

---

#### 5. Why do metal AM parts produced by DMLS require post-build heat treatment?

<div class="upper-alpha" markdown>
1. To add surface color and finish before the part is inspected
2. To relieve residual stresses caused by rapid, localized melting and solidification
3. To permanently join support structures to the main part
4. To recrystallize the metal back into its original raw ore structure
</div>

??? question "Show Answer"
    The correct answer is **B**. Layer-by-layer laser melting creates steep thermal gradients that lock residual stresses into the metal. Without heat treatment (stress relief anneal, solution annealing, or HIP), these stresses cause warping, reduce fatigue life, and can crack high-strength alloys. Post-build treatment does not add color, join supports, or recreate ore crystal structures — it aligns the microstructure toward target mechanical properties.

    **Concept Tested:** Post-Build Heat Treatment

---

#### 6. EBM (Electron Beam Melting) requires a high-vacuum chamber primarily because:

<div class="upper-alpha" markdown>
1. Vacuum prevents the electron beam from scattering in air, and eliminates oxidation of reactive metals
2. Vacuum cools the metal powder faster than inert gas atmosphere
3. Electrons cannot be generated at atmospheric pressure
4. Vacuum allows the build platform to descend more smoothly between layers
</div>

??? question "Show Answer"
    The correct answer is **A**. Electrons scatter when they collide with gas molecules, so a vacuum is necessary for the beam to maintain focus and energy over the distance to the powder bed. The vacuum also prevents oxidation — critical for reactive metals like titanium. Vacuum does not improve cooling speed (it actually reduces convective cooling), electrons can be generated at any pressure, and platform descent is mechanical and unrelated to atmosphere.

    **Concept Tested:** EBM Process

---

#### 7. HP's Multi Jet Fusion (MJF) process differs from standard SLS primarily because:

<div class="upper-alpha" markdown>
1. MJF uses a laser to selectively melt polymer powder layer by layer
2. MJF jets a fusing agent onto the powder bed and then fuses it with an infrared lamp pass
3. MJF builds parts from liquid resin rather than powder
4. MJF requires a vacuum atmosphere to prevent oxidation of nylon powder
</div>

??? question "Show Answer"
    The correct answer is **B**. MJF uses a printhead to jet a fusing agent on regions to be solidified and a detailing agent at boundaries, then an infrared lamp fuses the coated powder in a single pass — producing the entire layer at once rather than tracing with a laser. This approach makes MJF faster per layer than laser-based SLS. Options A and C misidentify the process; MJF uses inert nitrogen but not a strict vacuum like EBM.

    **Concept Tested:** MJF Process

---

#### 8. In a 3D printer, "build volume" refers to:

<div class="upper-alpha" markdown>
1. The weight of material that can be loaded onto a spool
2. The maximum three-dimensional envelope within which a machine can fabricate parts
3. The total volume of filament extruded in a single print job
4. The depth of the resin vat in an SLA machine
</div>

??? question "Show Answer"
    The correct answer is **B**. Build volume is the maximum X × Y × Z working space of an AM system — the answer to "how large a part can this machine make?" It is typically expressed in millimeters. It is not a measure of filament weight, extruded volume during a specific job, or vat depth — though vat depth does influence build volume in resin printers, they are not the same thing.

    **Concept Tested:** Build Volume

---

#### 9. The ISO/ASTM process category "Directed Energy Deposition" (DED) is best characterized by which feature?

<div class="upper-alpha" markdown>
1. Bonding thin sheets of material layer by layer using ultrasonic vibration
2. Jetting microscopic droplets of photopolymer and curing them with UV lamps
3. Depositing and melting material simultaneously with a focused laser or electric arc
4. Spreading powder in a bed and selectively fusing regions with a CO₂ laser
</div>

??? question "Show Answer"
    The correct answer is **C**. Directed Energy Deposition simultaneously deposits feedstock (metal powder or wire) and melts it with a focused energy source (laser or arc). This distinguishes it from powder bed fusion (powder spread first, then fused) and makes it excellent for repair and cladding of existing metal parts. Option A describes Sheet Lamination (UAM); option B describes Material Jetting; option D describes powder bed fusion.

    **Concept Tested:** Directed Energy Deposition

---

#### 10. What is the key difference between "industrial AM systems" and "hobby/desktop AM systems" in terms of facility requirements?

<div class="upper-alpha" markdown>
1. Industrial systems require specialized software that hobby systems cannot run
2. Industrial systems require dedicated space, controlled atmosphere, and process gas supply; hobby systems need only a standard outlet
3. Industrial systems use open-source firmware while hobby systems use proprietary software
4. Industrial systems always produce metal parts; hobby systems are limited to polymer parts
</div>

??? question "Show Answer"
    The correct answer is **B**. Industrial AM systems (especially metal PBF systems) require dedicated facility space with temperature and humidity control, high-voltage power supplies, inert gas supply (argon or nitrogen), powder handling infrastructure, and post-processing equipment like HIP furnaces. Hobby systems plug into a standard outlet on a desktop. Both categories can run various software types, and some hobby systems produce metal or ceramic parts via binder jetting.

    **Concept Tested:** Industrial Vs Hobby Systems

---
