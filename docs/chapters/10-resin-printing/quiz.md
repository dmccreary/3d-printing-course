# Quiz: Resin Printing — SLA, MSLA, and DLP

Test your understanding of vat photopolymerization processes, resin printer anatomy, exposure settings, PPE, and post-processing with these questions.

---

#### 1. Which resin printing technology uses an LCD panel as a photomask with a UV LED array to cure an entire layer simultaneously?

<div class="upper-alpha" markdown>
1. SLA (Stereolithography) — uses a galvo-steered UV laser
2. DLP (Digital Light Processing) — uses a DMD micromirror projector
3. MSLA (Masked Stereolithography) — uses a mono LCD and UV LED array
4. MJF (Multi Jet Fusion) — uses an infrared lamp and fusing agent
</div>

??? question "Show Answer"
    The correct answer is **C**. MSLA (Masked SLA) uses a UV LED array beneath a monochrome LCD panel that acts as a photomask — pixels transmit UV light to cure exposed areas of resin while opaque pixels block light. Because the entire layer is exposed at once, MSLA is faster than point-by-point laser SLA. DLP uses a DMD chip (micromirrors), not an LCD; SLA uses a laser; MJF is a powder-bed polymer process, not a resin vat process.

    **Concept Tested:** MSLA Process

---

#### 2. The FEP film at the bottom of a resin vat must be replaced regularly because:

<div class="upper-alpha" markdown>
1. FEP becomes chemically bonded to the resin after each print and must be discarded with the part
2. UV exposure and peel forces gradually cloud, scratch, and stretch the FEP, degrading layer sharpness
3. FEP absorbs UV light over time, requiring progressively longer exposure settings
4. FEP expands at printing temperature, warping the vat geometry beyond useful tolerances
</div>

??? question "Show Answer"
    The correct answer is **B**. FEP (fluorinated ethylene propylene) degrades over time from UV exposure, physical abrasion, and the mechanical stress of thousands of peel cycles. Clouding scatters UV light and reduces layer sharpness; scratches in the exposure zone introduce artifacts. FEP does not bond to parts permanently; it transmits UV light well; and resin printing occurs at room temperature, so thermal expansion is minimal.

    **Concept Tested:** Resin Vat And FEP

---

#### 3. What is "elephant's foot" in resin printing, and what causes it?

<div class="upper-alpha" markdown>
1. A failure where the print detaches from the build platform and falls to the vat floor
2. An outward bulge at the base of the print caused by over-exposed bottom layers bleeding beyond intended boundaries
3. A rounded bottom surface caused by the FEP film flexing during the peel motion
4. A deformation from insufficient UV curing in the first layers
</div>

??? question "Show Answer"
    The correct answer is **B**. Elephant's foot is where the base of a resin print is wider than intended. Over-exposed bottom layers cure deeper and bleed outward beyond the intended cross-section boundary. Bottom layers use much longer exposure times (20–60 seconds vs. 1–4 seconds normal) for platform adhesion, and excessive exposure causes this characteristic outward flare. Platform detachment is a different failure; FEP flex causes peeling artifacts, not bulging; under-cured first layers would cause delamination, not widening.

    **Concept Tested:** Exposure Settings

---

#### 4. Minimum PPE for every resin printing session includes:

<div class="upper-alpha" markdown>
1. Safety glasses only — liquid resin is not hazardous to skin at normal temperatures
2. Nitrile gloves, safety glasses, and adequate ventilation
3. A full face shield and chemical-resistant apron only
4. An N95 mask to filter resin vapors — skin contact is safe without gloves
</div>

??? question "Show Answer"
    The correct answer is **B**. Minimum required PPE is nitrile gloves (at least 4 mil), safety glasses or goggles, and adequate ventilation. Liquid resin is a skin sensitizer — repeated skin contact without gloves can cause a permanent, irreversible allergy. Eye protection prevents chemical burns from splashes; ventilation addresses vapor inhalation. A full face shield adds protection but is not alone sufficient; an N95 alone does not protect skin from sensitization, which is the primary long-term risk.

    **Concept Tested:** Resin PPE

---

#### 5. Why must a resin print undergo a separate UV curing step after washing, even if it appears fully hardened?

<div class="upper-alpha" markdown>
1. Washing with IPA dissolves the surface cure, requiring recuring to restore surface hardness
2. Interior and shielded areas remain only partially polymerized during printing; post-cure completes cross-linking throughout the part
3. The UV curing step sterilizes the part by destroying residual IPA contamination
4. Resin prints are always dimensionally inaccurate when wet; post-curing corrects the shrinkage
</div>

??? question "Show Answer"
    The correct answer is **B**. During printing, UV light cures only to approximately one layer depth per exposure. Interior sections and geometry shielded by overhanging features remain only partially cross-linked. Post-cure UV exposure completes polymerization throughout the part, achieving full mechanical properties. Without post-curing, parts remain brittle, possibly tacky, and dimensionally unstable as residual monomers slowly cross-link over time. IPA washing cleans, it does not dissolve cured resin; post-cure is not a sterilization step.

    **Concept Tested:** Wash And Cure Workflow

---

#### 6. The key operational difference between SLA and DLP resin printing is:

<div class="upper-alpha" markdown>
1. SLA uses liquid resin while DLP uses solid powder that is melted by a laser
2. SLA cures resin point by point with a laser; DLP projects the entire layer cross-section simultaneously with a digital micromirror device
3. SLA builds parts from the top down; DLP builds from the bottom up
4. SLA is limited to clear resins; DLP works with opaque resins only
</div>

??? question "Show Answer"
    The correct answer is **B**. SLA traces each layer sequentially using a galvo-steered UV laser — curing one point at a time across the cross-section. DLP uses a DMD (Digital Micromirror Device) chip that projects the entire layer cross-section at once, curing all pixels simultaneously in a single flash. This makes DLP faster for large cross-sections. Both use liquid resin; bottom-up vs. top-down is an architecture variation, not a SLA-vs-DLP distinction; both can work with pigmented resins.

    **Concept Tested:** DLP Process

---

#### 7. The primary benefit of monochrome (mono) LCD panels over earlier color LCD panels in MSLA printers is:

<div class="upper-alpha" markdown>
1. Mono LCDs produce colored prints without requiring colored resins
2. Mono LCDs transmit UV light 4–6 times more efficiently, reducing exposure times from ~10 seconds to ~2 seconds per layer
3. Mono LCDs eliminate the need for a UV LED array, reducing printer manufacturing cost
4. Mono LCDs have higher pixel density, increasing XY resolution from 50 µm to 500 µm
</div>

??? question "Show Answer"
    The correct answer is **B**. Color LCDs use a color filter matrix that absorbs significant UV light even at "clear" pixels. Monochrome LCDs remove this filter, increasing UV transmission 4–6 times. The practical effect is dramatic: normal layer exposure drops from 8–15 seconds to 1.5–3 seconds, cutting total print times by 60–75%. Mono LCDs are black-and-white display panels — they don't produce color; they still require a UV LED array; and higher pixel density increases resolution (smaller µm value), not decreases it.

    **Concept Tested:** Mono LCD Resolution

---

#### 8. Resin supports differ from FDM supports primarily because resin supports must:

<div class="upper-alpha" markdown>
1. Be printed using a second resin material that is chemically incompatible with the part material
2. Anchor the part to the build platform to resist peel forces during each layer lift cycle
3. Be wider and denser than FDM supports to compensate for the lower strength of cured resin
4. Be placed only on the top surface of the part where the final layer is exposed
</div>

??? question "Show Answer"
    The correct answer is **B**. In bottom-up resin printing, each layer separation from the FEP film generates significant tensile (pulling) forces. Supports must anchor the print firmly to the build platform to resist these forces, or the print tears loose. Resin supports use the same resin as the part; they typically taper to finer tips than FDM supports (not wider); and supports are placed on the underside and overhanging areas of the part, not the final top surface.

    **Concept Tested:** Resin Supports

---

#### 9. Isopropyl alcohol (IPA) used to wash resin prints must be handled carefully because:

<div class="upper-alpha" markdown>
1. IPA reacts with cured resin to form toxic fumes that require HEPA filtration to capture
2. IPA is flammable with a low flash point (~11.7°C) and saturated wash IPA must not be poured down drains
3. IPA dissolves the FEP film if it contacts the vat bottom during the wash step
4. IPA must be used at above 60°C to effectively dissolve uncured resin from print surfaces
</div>

??? question "Show Answer"
    The correct answer is **B**. IPA's flash point of approximately 11.7°C means it ignites from sparks at most room temperatures — it is a genuine fire hazard. Additionally, spent IPA loaded with dissolved resin is considered hazardous waste and must be cured under UV (not poured down drains where it harms aquatic organisms) or collected by a certified hazardous waste service. IPA does not react with cured resin to produce toxic fumes; IPA does not dissolve FEP in normal washing conditions; and IPA washes effectively at room temperature.

    **Concept Tested:** IPA Handling

---

#### 10. In the wash-and-cure workflow, why must the printed part be completely dry before being placed in the UV curing station?

<div class="upper-alpha" markdown>
1. Residual IPA on the surface prevents proper UV cure and creates a tacky, incompletely polymerized surface
2. Water contamination from the IPA will dissolve the outer layers of cured resin in the UV station
3. The UV station's high heat evaporates IPA explosively if the part is still wet
4. Wet parts are too heavy for the rotating cure plate and cause mechanical failure of the station
</div>

??? question "Show Answer"
    The correct answer is **A**. IPA residue on the surface of a resin print inhibits complete UV polymerization — the solvent molecules interfere with the cross-linking reaction, leaving a tacky, incompletely cured surface. The part must air-dry fully before the UV cure step. IPA does not dissolve cured resin (that's why it can't re-liquefy cured parts); UV curing stations do not use significant heat; and weight is not a meaningful concern for a typical small UV cure platform.

    **Concept Tested:** Wash And Cure Workflow

---
