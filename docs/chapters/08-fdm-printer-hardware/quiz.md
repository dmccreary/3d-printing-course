# Quiz: FDM Printer Hardware and Operation

Test your understanding of FDM printer components, motion systems, bed leveling, maintenance, and firmware with these questions.

---

#### 1. What is the primary function of the "heat break" in an FDM hotend assembly?

<div class="upper-alpha" markdown>
1. It breaks apart clumps of filament that form from moisture absorption
2. It creates a sharp thermal boundary between the cold zone and the hot zone to prevent heat creep
3. It controls the speed at which the extruder gear feeds filament into the nozzle
4. It monitors temperature and signals the motherboard when the hotend exceeds safe limits
</div>

??? question "Show Answer"
    The correct answer is **B**. The heat break is a narrow, thermally resistive tube (typically titanium or stainless steel) that separates the cold zone (where filament enters as a solid) from the hot zone (where it melts). By minimizing heat transfer upward, the heat break prevents "heat creep" — the failure mode where softened filament jams in the cold zone. It does not process filament mechanically, control motor speed, or function as a safety sensor.

    **Concept Tested:** Heat Break

---

#### 2. A direct-drive extruder setup is preferred over a Bowden setup when printing:

<div class="upper-alpha" markdown>
1. Large, fast prints using rigid PLA filament at maximum speed
2. Flexible filaments like TPU that buckle inside long Bowden tubes
3. High-temperature materials like polycarbonate that require elevated bed temperatures
4. Multiple colors simultaneously using an AMS-style multi-spool system
</div>

??? question "Show Answer"
    The correct answer is **B**. In a Bowden setup, flexible filaments (TPU, TPE) buckle inside the PTFE tube because they lack the column strength to be pushed through a long, flexible path. Direct-drive mounts the motor directly above the hotend, with only millimeters between gear and nozzle, giving precise control over soft filaments. Rigid PLA prints well on either setup; polycarbonate temperature requirements are about the hotend, not extruder type; multi-spool systems are orthogonal to drive type.

    **Concept Tested:** Bowden Vs Direct Drive

---

#### 3. Stepper motors in FDM printers use "open-loop control." What does this mean in practice?

<div class="upper-alpha" markdown>
1. The motors automatically adjust their speed based on real-time temperature feedback
2. The printer firmware commands positions and assumes they were reached, without an encoder confirming actual movement
3. The motors are electronically connected in an open circuit that requires no power supply
4. The control algorithm is open-source and can be modified by any user
</div>

??? question "Show Answer"
    The correct answer is **B**. Open-loop control means the firmware sends step commands to the motor and assumes the motor executed them — there is no encoder or position sensor feeding back actual position data. If the motor loses steps (stalls under overload), the printer doesn't detect this error. This is why preventing missed steps through proper current settings and acceleration limits is important. The other options misuse the term "open-loop" in unrelated ways.

    **Concept Tested:** Stepper Motors

---

#### 4. Why do FDM printers use lead screws for the Z axis but toothed belts for the X and Y axes?

<div class="upper-alpha" markdown>
1. Lead screws move faster than belts, so they are used on the axis that travels the most distance
2. Lead screws are self-locking and provide precise, slow vertical movement; belts allow the fast acceleration needed for horizontal print paths
3. Belts would stretch under the weight of the heated bed in the Z direction, causing layer height errors
4. Lead screws are required by ISO standards for all vertical motion in additive manufacturing equipment
</div>

??? question "Show Answer"
    The correct answer is **B**. Lead screws convert rotation to linear motion slowly and precisely, and are self-locking (hold position without motor power) — ideal for Z axis, which moves infrequently and must hold exact height between layers. Belts allow rapid acceleration and deceleration needed for high-speed XY tool path movements. Lead screws are too slow for XY traversal. Belts can handle vertical load if properly tensioned; there is no ISO standard mandating this arrangement.

    **Concept Tested:** Lead Screws

---

#### 5. When performing manual bed leveling, what is the correct technique for setting the nozzle-to-bed gap?

<div class="upper-alpha" markdown>
1. Measure the gap with digital calipers to achieve exactly 0.20 mm at all four corners
2. Use a piece of standard printer paper as a feeler gauge; adjust until the paper slides with slight drag
3. Print a test square at each corner and measure its height with a micrometer
4. Set the gap to zero (nozzle touching bed) and then raise each corner by exactly half a turn
</div>

??? question "Show Answer"
    The correct answer is **B**. The standard manual bed leveling technique uses a sheet of standard printer paper (approximately 0.1 mm thick) as a feeler gauge between the nozzle and bed. The correct gap produces a slight drag — the paper slides with resistance but doesn't catch or slide freely. Calipers at this scale are impractical and 0.20 mm is not the target (paper thickness method targets the Z offset, not a fixed value); test prints measure results but don't set the gap; the "half-turn from zero" method risks nozzle damage.

    **Concept Tested:** Manual Bed Leveling

---

#### 6. A PEI spring steel sheet build surface offers which key advantage over a traditional glass plate?

<div class="upper-alpha" markdown>
1. It operates at higher temperatures, enabling polycarbonate printing without an enclosure
2. Prints adhere firmly while hot, then release easily when the sheet is flexed after cooling
3. It eliminates the need for bed leveling because it self-corrects to a flat plane
4. PEI spring steel absorbs UV light, making it compatible with resin printing
</div>

??? question "Show Answer"
    The correct answer is **B**. PEI spring steel sheets solve the adhesion/release trade-off: the PEI surface provides strong adhesion to many filaments when hot, and the flexible spring steel allows the sheet to be flexed off the printer and bent slightly, popping the cooled print loose without tools. PEI does not extend the temperature range for PC printing (that requires an enclosure); it does not self-level; and it is not used in resin printing.

    **Concept Tested:** Build Surface Types

---

#### 7. Automatic bed leveling (ABL) systems like BLTouch work by:

<div class="upper-alpha" markdown>
1. Physically grinding down high spots on the build plate to create a perfectly flat surface
2. Probing a grid of points, creating a mesh map of surface variations, and applying software compensation during printing
3. Heating the build plate to an exact temperature so thermal expansion creates a uniform surface
4. Detecting filament flow rate variations and adjusting the Z axis in real time during printing
</div>

??? question "Show Answer"
    The correct answer is **B**. ABL sensors probe multiple points across the bed to measure any tilt or surface warp, building a height mesh. During printing, the firmware applies a Z-offset correction at each XY position to keep the first layer height consistent relative to the actual (non-flat) surface. ABL does not physically modify the bed surface, does not use thermal expansion for leveling, and does not monitor filament flow rate.

    **Concept Tested:** Auto Bed Leveling

---

#### 8. The most important rule for changing a nozzle on an FDM printer is:

<div class="upper-alpha" markdown>
1. Always change nozzles with the printer completely powered off and cooled down
2. Always heat the hotend to printing temperature before attempting to remove or install a nozzle
3. Replace the nozzle only after completing a cold pull to clear all residual filament
4. Use only a torque wrench calibrated to exactly 1.5 Nm to avoid stripping threads
</div>

??? question "Show Answer"
    The correct answer is **B**. Nozzles must be changed at printing temperature because cold, solidified filament in the nozzle acts as a thread-locking agent. The torque required to break a cold nozzle free can strip the heater block threads or snap the nozzle off. At temperature, the plastic is soft and the metal has expanded slightly for clean thread engagement. A cold pull is good maintenance practice but not required before every nozzle change; a torque wrench helps but a specific 1.5 Nm value is not universally required.

    **Concept Tested:** Nozzle Change

---

#### 9. Klipper firmware differs from standard Marlin firmware primarily because Klipper:

<div class="upper-alpha" markdown>
1. Is a proprietary commercial firmware sold with Bambu Lab printers
2. Offloads computation to a Raspberry Pi, enabling faster processing and advanced features like input shaping
3. Requires no calibration because it uses factory-preset parameters for all supported printers
4. Only works with CoreXY motion systems and cannot be used on bed-slinger printers
</div>

??? question "Show Answer"
    The correct answer is **B**. Klipper runs a low-level real-time component on the printer's microcontroller but offloads the main computation to a connected Raspberry Pi (or similar single-board computer). The Raspberry Pi's faster processor enables features like input shaping (resonance compensation) and pressure advance that are difficult or impossible on slower embedded microcontrollers. Klipper is open-source; it still requires calibration; and it runs on both Cartesian and CoreXY printers.

    **Concept Tested:** Motherboard Firmware

---

#### 10. Routine lubrication of Z-axis lead screws is important because:

<div class="upper-alpha" markdown>
1. Dry lead screws cause excessive motor current draw that can trigger thermal runaway protection
2. Lubrication reduces friction, preventing jerky Z movement that causes "Z-banding" artifacts in prints
3. Lead screw lubricant also conditions the rubber belts on the X and Y axes
4. Without lubrication, lead screws corrode and must be replaced after every 100 print hours
</div>

??? question "Show Answer"
    The correct answer is **B**. Dry lead screws develop stick-slip friction — the screw intermittently catches and releases rather than moving smoothly. This causes the Z axis to advance in small uneven increments rather than precisely, creating horizontal bands (Z-banding) visible on the printed part surface. Lubrication is not directly tied to thermal runaway protection; lead screw lubricant should not be applied to rubber belts (different requirement); and properly lubricated steel lead screws last far longer than 100 hours before requiring replacement.

    **Concept Tested:** Routine Maintenance

---
