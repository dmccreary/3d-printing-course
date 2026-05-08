# Quiz: Slicing, G-code, and Toolpaths

Test your understanding of slicer software, G-code, layer settings, infill, supports, and slicer profiles with these questions.

---

#### 1. In G-code, what does the "E" parameter control when it increases during a movement command?

<div class="upper-alpha" markdown>
1. The speed (feedrate) of the print head in mm/min
2. The extrusion of filament through the nozzle as the head moves
3. The elevation (Z height) of the build platform
4. The error correction factor applied to motor steps
</div>

??? question "Show Answer"
    The correct answer is **B**. The E parameter tracks the extruder position in millimeters of filament. When E increases during a G1 move, the extruder motor pushes filament through the nozzle — depositing material. When the nozzle moves without an increasing E value, that is a travel move (no material deposited). Feedrate is the F parameter; Z height is the Z parameter; there is no error correction "E" parameter in standard G-code.

    **Concept Tested:** G-code Basics

---

#### 2. For a standard 0.4 mm nozzle, what is the recommended layer height range for reliable FDM printing?

<div class="upper-alpha" markdown>
1. 0.01 mm to 0.1 mm
2. 0.1 mm to 0.3 mm (25–75% of nozzle diameter)
3. 0.4 mm to 0.8 mm (equal to or greater than nozzle diameter)
4. 0.5 mm to 1.0 mm for structural strength
</div>

??? question "Show Answer"
    The correct answer is **B**. Layer height should be between 25% and 75% of the nozzle diameter to ensure reliable extrusion and good layer adhesion. For a 0.4 mm nozzle, this gives a range of 0.1–0.3 mm. Going below 0.1 mm causes inconsistent extrusion and back-pressure problems; going above 0.3 mm (75% of 0.4 mm) prevents proper layer flattening and bonding. The 0.2 mm sweet spot (50% of nozzle diameter) balances quality and speed.

    **Concept Tested:** Layer Height

---

#### 3. The "gyroid" infill pattern is particularly recommended for flexible materials like TPU because:

<div class="upper-alpha" markdown>
1. It prints faster than all other patterns, reducing heat buildup in flexible filaments
2. It provides strong isotropic mechanical properties with nearly equal strength in all directions
3. It uses the least material of any infill pattern, making flexible prints lighter
4. It creates a sealed internal structure that holds air for cushioning applications
</div>

??? question "Show Answer"
    The correct answer is **B**. Gyroid infill is a triply periodic surface that provides near-isotropic strength — approximately equal stiffness and load resistance in all horizontal directions. This is valuable for flexible parts that may be compressed, stretched, or bent from any direction. It is not the fastest pattern (lines/lightning are faster); it uses moderate material (not the least); and it is not designed to seal air (lightning infill leaves more open space).

    **Concept Tested:** Infill Patterns

---

#### 4. A student is printing PETG and notices thin plastic threads spanning open spaces between features. Which two settings are the most effective first adjustments?

<div class="upper-alpha" markdown>
1. Increase infill density and add a brim for better adhesion
2. Reduce layer height and increase wall count
3. Tune retraction distance and speed, and increase travel speed
4. Disable the cooling fan completely and raise the bed temperature
</div>

??? question "Show Answer"
    The correct answer is **C**. Stringing is caused by molten plastic oozing from the nozzle during travel moves. Retraction pulls filament back to relieve pressure before the move; travel speed determines how quickly the nozzle crosses open gaps (faster = less time to ooze). Infill density and brim affect structural performance and bed adhesion, not stringing; layer height and wall count affect dimensional quality, not oozing; disabling the fan would worsen stringing by keeping material more liquid.

    **Concept Tested:** Retraction Settings

---

#### 5. When is a "raft" adhesion type most appropriate compared to a "brim"?

<div class="upper-alpha" markdown>
1. When printing PLA on a textured PEI surface that already provides excellent adhesion
2. When the build plate surface is uneven or when printing very small parts with minimal contact area
3. When printing support-free overhangs that need extra adhesion at the overhang point
4. When printing at high speed and the nozzle needs a priming area before the main part starts
</div>

??? question "Show Answer"
    The correct answer is **B**. A raft builds a complete sacrificial platform beneath the part — useful when the build plate has surface irregularities (the raft bridges them) or when a part has such a small footprint that even a brim provides insufficient adhesion. PLA on PEI typically needs at most a brim; overhangs are addressed with supports, not rafts; the priming function is served by a skirt, not a raft.

    **Concept Tested:** Skirt Brim Raft

---

#### 6. "Tree supports" differ from normal (linear) supports primarily because tree supports:

<div class="upper-alpha" markdown>
1. Print faster because they use a simpler rectangular grid pattern
2. Branch organically to touch only minimum necessary contact points, using less material and leaving cleaner surfaces
3. Are generated only for resin printers and not available in FDM slicers
4. Connect directly between overhanging faces without touching the build plate
</div>

??? question "Show Answer"
    The correct answer is **B**. Tree supports generate branching organic structures that reach upward from the build plate to touch only the minimum necessary contact points on the overhanging surface. They use significantly less material than normal supports, are easier to remove because they have fewer contact points, and produce cleaner supported surfaces. They are available in FDM slicers (PrusaSlicer, Cura, OrcaSlicer); they take longer to generate, not faster; and they do originate from the build plate.

    **Concept Tested:** Tree Supports

---

#### 7. What is the purpose of "vase mode" (Spiralize Outer Contour) in a slicer?

<div class="upper-alpha" markdown>
1. To print multiple vase-shaped objects simultaneously on the same build plate
2. To print a continuous upward spiral single-wall shell with no layer seams and no infill
3. To automatically detect vase geometries and optimize support placement
4. To add a textured surface appearance to the exterior of any printed model
</div>

??? question "Show Answer"
    The correct answer is **B**. Vase mode moves the nozzle in a continuous helical upward spiral, producing a single-wall shell without layer change seams and without any infill. The result is a seamless, smooth exterior ideal for vases, cups, and decorative objects. It dramatically reduces print time and material use. It does not batch-print multiple objects, detect specific geometry types, or add texture — that is fuzzy skin mode.

    **Concept Tested:** Vase Mode

---

#### 8. For printing ABS material, the recommended cooling fan setting is approximately:

<div class="upper-alpha" markdown>
1. 100% fan speed to maximize layer definition and overhang quality
2. 50–75% to balance detail and layer adhesion
3. 0–15% or no fan at all to prevent delamination and warping
4. 25% during the first 10 layers, then increasing to 80% for the remainder
</div>

??? question "Show Answer"
    The correct answer is **C**. ABS has high thermal expansion and poor tolerance for rapid surface cooling. Strong airflow causes the outer surface to cool and contract faster than the interior, inducing the differential shrinkage that causes warping and layer delamination. ABS requires little or no part cooling fan and benefits from a heated enclosure instead. PLA (not ABS) uses 100% fan; PETG uses 50–75%; the staged approach in option D is sometimes used for PLA on the first few layers, not for ABS throughout.

    **Concept Tested:** Cooling Fan Settings

---

#### 9. A "support interface" layer improves the quality of supported surfaces because:

<div class="upper-alpha" markdown>
1. It doubles the number of support columns, increasing structural stability
2. It places a dense, flat surface with a small gap above the support structure, giving the part a smoother base to rest on
3. It merges the support material permanently with the part for additional strength
4. It detects the model's weakest overhang and adds extra material specifically there
</div>

??? question "Show Answer"
    The correct answer is **B**. The support interface is a densely printed, flat layer placed between the open-grid support structure and the bottom of the overhanging part surface. The small gap above the interface (typically 0.15–0.2 mm) allows easy separation, while the flat surface gives the part a smooth contact area rather than the irregular grid of the main support structure. It does not double support columns, merge permanently with the part, or perform overhang analysis.

    **Concept Tested:** Support Interface

---

#### 10. "Cloud slicing" as offered by services like Bambu Lab performs the slicing computation:

<div class="upper-alpha" markdown>
1. On the printer's own microcontroller board, using onboard processing power
2. On remote servers accessed over the internet, rather than on the user's local computer
3. Inside the STL file itself, which contains embedded slicing instructions
4. On a Raspberry Pi connected to the printer via USB cable
</div>

??? question "Show Answer"
    The correct answer is **B**. Cloud slicing moves the computation-intensive slicing step to remote servers. The user uploads an STL or 3MF to a cloud platform, selects settings, and receives G-code back (or the print is sent directly to the printer over the internet). The printer's microcontroller interprets G-code but doesn't perform slicing; STL files contain only geometry, not slicing instructions; Raspberry Pi with OctoPrint manages print jobs but runs a local slicer, not cloud slicing.

    **Concept Tested:** Cloud Slicing

---
