# Quiz: Print Failures, Troubleshooting, and Post-Processing

Test your understanding of the structured troubleshooting workflow, common FDM and resin failure modes, their root causes, and post-processing techniques including sanding, annealing, and chemical smoothing.

---

#### 1. Which failure mode produces wavy, rippling surface artifacts on the walls of a print directly behind a sharp corner, and what is its primary cause?

<div class="upper-alpha" markdown>
1. Stringing — caused by excess moisture in filament releasing steam during extrusion
2. Over-extrusion — caused by the flow rate multiplier being set too high in the slicer
3. Ringing (ghosting) — caused by vibration in the printer frame or belts after a rapid direction change
4. Z-banding — caused by a bent or poorly lubricated lead screw
</div>

??? question "Show Answer"
    The correct answer is **C**. Ringing (also called ghosting) appears as a series of oscillating waves on print walls immediately after a sharp corner or direction reversal. When the printhead reverses direction at high speed, the frame and belts absorb mechanical energy and continue to oscillate. Each oscillation deposits a bead in a slightly wrong position, creating the ripple pattern. Stringing produces threads across open gaps; over-extrusion causes bulging and poor dimensional accuracy; Z-banding produces consistent horizontal lines matching the lead screw pitch.

    **Concept Tested:** Ringing And Ghosting

---

#### 2. A student's PLA print is curling upward at the corners and eventually detaches from the build plate mid-print. Which combination of adjustments is most likely to resolve this?

<div class="upper-alpha" markdown>
1. Raise the bed temperature, add a brim, and reduce cooling fan speed for the first layers
2. Increase retraction distance and reduce print speed to prevent stringing near the corners
3. Increase layer height and reduce wall count to decrease the thermal mass at the corners
4. Switch to vase mode and reduce the brim width
</div>

??? question "Show Answer"
    The correct answer is **A**. Warping at corners is caused by differential thermal shrinkage — the outer layers cool and contract faster than the interior, pulling edges upward. Raising bed temperature keeps the base material warm and pliable longer, resisting the curl. Adding a brim increases the footprint area anchoring the part to the plate. Reducing cooling fan speed for early layers slows the shrinkage rate at the critical base layers. Retraction tuning addresses stringing, not adhesion; changing layer height and wall count doesn't fix the thermal cause.

    **Concept Tested:** Warping

---

#### 3. During a cold pull (atomic pull) procedure, what is the correct sequence?

<div class="upper-alpha" markdown>
1. Heat to printing temperature, insert new filament, pull it out quickly while still molten
2. Heat to printing temperature, push filament through, then cool to ~90°C and pull the filament out firmly
3. Cool the hotend to room temperature and mechanically extract the nozzle to clear the blockage
4. Heat to 300°C to melt any obstruction, then flush with solvent before reloading
</div>

??? question "Show Answer"
    The correct answer is **B**. A cold pull procedure clears partial nozzle clogs by exploiting the plastic's intermediate state at ~85–95°C. The hotend is heated to full temperature, fresh filament is pushed through, then the temperature is lowered to the semi-solid range (~90°C for PLA). At this temperature the plastic is soft enough to grip the clog but not liquid enough to flow — pulling firmly extracts both the residual material and whatever was clogging the nozzle. Pulling at full melt temperature just stretches the plastic without gripping debris.

    **Concept Tested:** Clogged Nozzle

---

#### 4. Under-extrusion produces prints with gaps between walls and weak layer adhesion. Before adjusting flow rate in the slicer, what hardware cause should be ruled out first?

<div class="upper-alpha" markdown>
1. The build plate being too far from the nozzle, restricting first-layer flow
2. The print speed being too high, preventing the cooling fan from keeping up
3. The Z-offset being set too low, causing over-adhesion at the base
4. A partial clog in the nozzle or a worn extruder gear skipping on the filament
</div>

??? question "Show Answer"
    The correct answer is **D**. Under-extrusion has a hardware root cause more often than a slicer root cause. A partial nozzle clog creates back-pressure that reduces flow; a worn extruder drive gear loses grip and skips rather than advancing filament consistently. Both produce the same symptom — less material than commanded. Adjusting the slicer's flow rate multiplier to compensate for a hardware problem masks the real issue and can lead to progressive worsening. Bed distance affects the first layer only; print speed affects surface quality; Z-offset affects first-layer squish.

    **Concept Tested:** Under-Extrusion

---

#### 5. A student finishes printing a structural bracket in ABS and notices visible layer separation (delamination) between layers near the top of the part. The most likely cause is:

<div class="upper-alpha" markdown>
1. The infill density is too low, leaving air gaps that weaken the inter-layer bond
2. The print speed is too high, causing the layers to shift relative to each other
3. The nozzle temperature is too low or a cooling fan is blowing on ABS too aggressively, preventing proper layer fusion
4. Moisture in the ABS filament releasing steam bubbles that weaken the bond between layers
</div>

??? question "Show Answer"
    The correct answer is **C**. Layer separation in ABS almost always results from the deposited bead cooling too quickly before the next layer arrives, preventing proper polymer chain interdiffusion across the interface. ABS is especially vulnerable because it has high thermal expansion and requires a hot environment (heated enclosure) to maintain temperature between layers. A strong cooling fan chills ABS below the fusion threshold. Nozzle temperature that is too low prevents the new bead from reheating and bonding to the previous layer. Infill density affects strength but not delamination directly.

    **Concept Tested:** Layer Separation

---

#### 6. Acetone vapor smoothing is an effective post-processing method for ABS parts because:

<div class="upper-alpha" markdown>
1. Acetone reacts chemically with ABS to permanently cross-link the polymer chains, increasing hardness
2. Acetone dissolves the ABS surface layer slightly, allowing the softened material to reflow and erase layer lines
3. Acetone sterilizes the part surface, making it suitable for food-contact applications
4. Acetone only affects the exterior of the part, leaving the structural interior completely unchanged
</div>

??? question "Show Answer"
    The correct answer is **B**. Acetone is a solvent for ABS. When ABS is exposed to acetone vapor in a sealed chamber, the surface absorbs a controlled amount of solvent, softening the outermost layer slightly. Surface tension causes the softened plastic to reflow into a smooth, glossy surface — layer lines become nearly invisible. The reaction is not cross-linking (thermosets cross-link; ABS is a thermoplastic); acetone does not sterilize or produce food-safe surfaces; and the effect extends only to the outermost layers, making option D partially correct but misleadingly worded.

    **Concept Tested:** Chemical Smoothing

---

#### 7. Annealing a PLA print in an oven at 60–65°C for 30–60 minutes improves which property, and what risk must be managed?

<div class="upper-alpha" markdown>
1. Improves heat deflection temperature by allowing crystallization; risk is dimensional distortion if the part lacks support
2. Improves UV resistance; risk is discoloration of pigmented filaments
3. Improves surface finish by reflowing the outer layer; risk is melting fine details below the nozzle resolution
4. Improves layer adhesion by re-fusing layers; risk is warping of the base layer if the oven is uneven
</div>

??? question "Show Answer"
    The correct answer is **A**. PLA can undergo stress-relief crystallization when held near (but below) its glass transition temperature of ~60°C. Annealing allows amorphous regions to reorganize into more ordered crystalline structures, raising the effective heat deflection temperature by 10–20°C. The risk is dimensional change — as the polymer chains rearrange, the part can warp or sag if not supported during the process. Placing the part on a flat surface or in a sand bed provides support. Annealing does not meaningfully affect UV resistance or surface finish.

    **Concept Tested:** Annealing

---

#### 8. A resin print fails completely — the support grid is stuck to the FEP film and the build platform rises empty. Which root cause should be investigated first?

<div class="upper-alpha" markdown>
1. Insufficient bottom layer exposure time, failing to bond the first layers to the build platform
2. Excess IPA left on the build platform from the previous cleaning, preventing adhesion
3. The FEP film being too new and transparent, passing too much UV and over-curing the base layers
4. Incorrect resin temperature — resin below 20°C becomes too viscous to level between exposures
</div>

??? question "Show Answer"
    The correct answer is **A**. When a resin print separates entirely and adheres to the FEP rather than the platform, the fundamental cause is failure of the critical first layers to bond to the build platform. Bottom exposure time must be long enough (typically 20–60 seconds) to cure deeply into the resin and create a strong mechanical bond with the build plate surface. If bottom layers under-cure, the weakest bond is at the platform — and peel forces during layer separation pull the print to the FEP instead. IPA contamination and FEP clarity are secondary considerations.

    **Concept Tested:** Resin Print Failures

---

#### 9. When sanding a printed PLA part to prepare it for painting, the correct progression is:

<div class="upper-alpha" markdown>
1. Start with 400-grit sandpaper and finish with 80-grit to maximize surface roughness for paint adhesion
2. Use only wet sanding at 2000-grit to avoid removing material beyond the outer wall
3. Sand with 80-grit throughout — coarser grits cut faster and leave a texture that improves paint grip
4. Start with 120-grit to remove layer lines, progress to 220-grit, then 400-grit, finishing with primer before top coats
</div>

??? question "Show Answer"
    The correct answer is **D**. Sanding follows a progression from coarser to finer grits. Starting at 120-grit removes the most prominent layer lines efficiently. Progressing to 220-grit removes the scratches from 120-grit, then 400-grit produces a smooth surface. Applying primer before painting fills any remaining micro-texture and provides a uniform base for color coats. Starting coarse and going finer is the fundamental principle — starting fine on unprocessed print surfaces wastes effort; starting at 2000-grit can't remove layer lines efficiently; leaving deep scratches from 80-grit defeats the purpose.

    **Concept Tested:** Sanding And Finishing

---

#### 10. A student wants to join two large printed PLA halves of an enclosure that were split to fit the build volume. Evaluate which joining method provides both a strong structural bond and a clean exterior appearance.

<div class="upper-alpha" markdown>
1. Hot glue — fast application and easy repositioning if alignment is off
2. Mechanical snap clips printed into both halves, which can be disassembled without adhesive
3. Super glue (CA adhesive) applied to both mating surfaces, aligned, and held for 60 seconds, with sanding and primer over the seam
4. Soldering the parts together using a hot iron pressed against the seam
</div>

??? question "Show Answer"
    The correct answer is **C**. Cyanoacrylate (CA/super glue) bonds effectively to PLA, cures rapidly, and produces a thin, strong glue line. After bonding and cure, the seam can be sanded flush, filled with spot putty if needed, and primed — producing a nearly invisible joint. Hot glue is weak at elevated temperatures, creates thick visible seams, and is not structurally reliable for enclosures; snap clips work for removable assemblies but leave visible gaps at the parting line; pressing a soldering iron against PLA melts and deforms the material rather than welding it cleanly.

    **Concept Tested:** Joining Printed Parts

---
