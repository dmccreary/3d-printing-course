# Quiz: Materials Science for Additive Manufacturing

Test your understanding of polymer properties, filament families, resin types, and material data sheets with these questions.

---

#### 1. A student leaves a PLA bracket on a car dashboard on a hot summer day. The bracket deforms even though the car interior didn't reach PLA's melting point. What property explains this failure?

<div class="upper-alpha" markdown>
1. PLA has a low elongation at break, causing it to fracture under UV exposure
2. PLA's glass transition temperature (~60°C) is exceeded inside a hot car, softening the part under load
3. PLA absorbs moisture from the air, swelling and losing its original shape
4. PLA is a thermoset material that permanently deforms when heated above 50°C
</div>

??? question "Show Answer"
    The correct answer is **B**. Glass transition temperature (Tg) is the point above which an amorphous thermoplastic transitions from rigid to rubbery. PLA's Tg of ~60°C is easily reached inside a parked car (which can reach 70–80°C), causing the part to soften and sag under its own weight. PLA is brittle (low elongation at break) but UV exposure is not the cause here; PLA is hygroscopic but swelling doesn't explain rapid deformation; PLA is a thermoplastic, not a thermoset.

    **Concept Tested:** Glass Transition Temperature

---

#### 2. Which filament material is best suited for an outdoor UV-exposed application requiring heat resistance above 80°C and structural load bearing?

<div class="upper-alpha" markdown>
1. PLA — lowest cost and easiest to print
2. PETG — tougher than PLA with chemical resistance
3. ASA — UV-stabilized with a Tg of approximately 100°C
4. TPU — flexible with excellent elongation at break
</div>

??? question "Show Answer"
    The correct answer is **C**. ASA (acrylonitrile styrene acrylate) adds UV stabilizers to a property profile similar to ABS, with a Tg of ~100°C — comfortably above 80°C. It resists UV-induced yellowing and embrittlement that degrades standard ABS outdoors. PLA has a Tg of ~60°C (too low) and no UV resistance; PETG has a Tg of ~80°C (barely at the limit) with no UV resistance; TPU is elastic and not suited for rigid structural loads.

    **Concept Tested:** ASA Filament

---

#### 3. The "elongation at break" property of a material primarily describes:

<div class="upper-alpha" markdown>
1. The maximum stress the material can withstand before fracturing under tension
2. The temperature at which the material transitions from a rigid to a rubbery state
3. How far a sample stretches as a percentage of its original length before it breaks
4. The stiffness of the material under bending loads, measured in GPa
</div>

??? question "Show Answer"
    The correct answer is **C**. Elongation at break is the percentage increase in sample length from original to fracture point under tensile loading. A low value (2–8%) indicates brittle fracture; a high value (200–600%) indicates ductile or elastic behavior. Maximum stress before fracture is tensile strength; the rigid-to-rubbery transition is glass transition temperature; bending stiffness is flexural modulus.

    **Concept Tested:** Elongation at Break

---

#### 4. Nylon filament requires special storage precautions primarily because it:

<div class="upper-alpha" markdown>
1. Oxidizes rapidly when exposed to oxygen in the air
2. Is highly hygroscopic and absorbs moisture that causes bubbling during printing
3. Depolymerizes under UV light and becomes brittle within days of opening
4. Undergoes chemical reactions with common desiccants and must be stored dry
</div>

??? question "Show Answer"
    The correct answer is **B**. Nylon is aggressively hygroscopic — it absorbs moisture from the air so readily that a spool left open in a humid environment for even one day can show degraded print quality (popping, bubbling, weakened layer adhesion) as absorbed water flashes to steam at extrusion temperature. Nylon does not oxidize rapidly in air at room temperature, is not UV-degraded as quickly as described, and stores safely with standard silica gel desiccants.

    **Concept Tested:** Filament Storage and Drying

---

#### 5. Carbon fiber composite filament offers improved stiffness compared to the base thermoplastic, but requires which hardware modification?

<div class="upper-alpha" markdown>
1. A heated enclosure and higher bed temperature to prevent warping
2. A direct-drive extruder to prevent the stiff filament from buckling
3. A hardened steel or ruby-tipped nozzle to resist abrasion by the carbon fiber
4. A dedicated dry-box system because carbon fiber filaments are highly hygroscopic
</div>

??? question "Show Answer"
    The correct answer is **C**. Chopped carbon fiber strands are extremely hard and abrasive — they wear through a standard brass nozzle in hours. Hardened steel or ruby-tipped nozzles are required for extended carbon fiber printing. While some CF composites benefit from an enclosure (especially CF-nylon), the nozzle requirement is universal and specific to CF. Direct drive helps with flexible filaments, not necessarily stiff CF; hygroscopic risk depends on the base polymer (CF-nylon is hygroscopic, CF-PLA is less so), not the fiber itself.

    **Concept Tested:** Carbon Fiber Filament

---

#### 6. A material data sheet lists "Heat Deflection Temperature" (HDT) rather than just glass transition temperature (Tg). Why is HDT more useful for structural design?

<div class="upper-alpha" markdown>
1. HDT is measured in Fahrenheit rather than Celsius, making it easier to apply in American contexts
2. HDT is measured under a specified bending load, making it more relevant to real-world structural performance than bare Tg
3. HDT is always higher than Tg, giving designers a larger safety margin for part performance
4. HDT is determined by ASTM standards while Tg is not standardized
</div>

??? question "Show Answer"
    The correct answer is **B**. HDT (heat deflection temperature) measures the temperature at which a sample deflects by a fixed amount under a specified load — meaning it accounts for both temperature and mechanical stress simultaneously. Tg measures only the thermal transition point without load. For structural parts that will bear weight at elevated temperatures, HDT is more directly applicable. HDT uses standard metric or imperial units; HDT can be lower or higher than Tg depending on measurement conditions; both have ASTM and ISO standards.

    **Concept Tested:** Material Data Sheet

---

#### 7. Standard photopolymer resins for resin printing are classified as thermosets rather than thermoplastics. What practical consequence does this have?

<div class="upper-alpha" markdown>
1. Failed resin prints cannot be re-melted and reused as raw material the way FDM waste can be recycled
2. Resin prints are inherently flexible and cannot be used for rigid structural applications
3. Resin must be heated above 200°C before it will cure under UV light
4. Standard resins can be reprinted without washing because the curing is reversible
</div>

??? question "Show Answer"
    The correct answer is **A**. Thermosets form permanent cross-linked polymer networks when cured — this reaction is irreversible. Failed resin prints cannot be re-melted or re-dissolved into liquid resin for reuse, unlike FDM thermoplastics that can theoretically be ground and re-extruded. Resin prints can be very rigid; UV curing requires no heating (UV light, not heat, triggers polymerization); and curing is permanent and non-reversible, so reprinting requires fresh resin.

    **Concept Tested:** Photopolymer Resins

---

#### 8. Polycarbonate (PC) filament offers the highest heat resistance of common FDM materials but is challenging to print because it requires:

<div class="upper-alpha" markdown>
1. A specialized resin vat and UV lamp rather than a standard FDM hotend
2. Very high nozzle temperatures (260–300°C), a heated enclosure, and moisture-free storage
3. A dual-extruder setup because PC must be printed with a soluble support material
4. Print speeds below 10 mm/s to prevent thermal shock and delamination
</div>

??? question "Show Answer"
    The correct answer is **B**. Polycarbonate demands nozzle temperatures of 260–310°C (beyond many stock hotends), a fully heated enclosure to prevent the aggressive delamination and warping caused by rapid cooling, and dry storage because PC is hygroscopic. PC does not require a resin vat — it is an FDM thermoplastic. It can be printed with standard supports in many cases. While print speed is often reduced, the 10 mm/s threshold is not a universal requirement; 40–60 mm/s is common for perimeters.

    **Concept Tested:** Polycarbonate Filament

---

#### 9. Which category of photopolymer resins would be most appropriate for printing a dental model that must withstand elevated sterilization temperatures above 200°C?

<div class="upper-alpha" markdown>
1. Standard resin — widely available and provides excellent surface detail
2. Tough/flexible resin — designed for impact-resistant functional parts
3. Engineering resin — purpose-formulated with high-temperature HDT and biocompatibility
4. Wood-fill resin — provides the closest aesthetic match to natural tooth color
</div>

??? question "Show Answer"
    The correct answer is **C**. Engineering resins are purpose-formulated for demanding applications including dental and medical uses — some have heat deflection temperatures above 200°C and biocompatibility certifications (Class I/II medical). Standard resins have HDT of ~45°C, far too low for sterilization. Tough/flexible resins improve toughness but don't meet sterilization temperature requirements. "Wood-fill resin" is not a recognized resin category — wood fill applies to FDM filaments.

    **Concept Tested:** Engineering Resins

---

#### 10. The key chemical difference between thermoplastics and thermosetting polymers is that thermoplastics:

<div class="upper-alpha" markdown>
1. Are derived from petroleum while thermosets are bio-based
2. Soften reversibly when heated and re-harden when cooled, allowing repeated melting cycles
3. Form permanent cross-linked molecular networks that cannot be re-melted
4. Are limited to FDM printing while thermosets are used exclusively in resin printing
</div>

??? question "Show Answer"
    The correct answer is **B**. Thermoplastics soften and flow when heated above their Tg or melting point, then re-solidify when cooled — this thermally reversible behavior is exploited by FDM printing and recycling. Thermosets form permanent cross-linked networks (answer C describes thermosets, not thermoplastics). Both categories can be petroleum or bio-based; both are used in various AM processes — some thermoset materials can be processed in ways other than resin vat photopolymerization.

    **Concept Tested:** Thermoplastics

---
