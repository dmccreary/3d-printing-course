# Quiz: Safety, Ethics, and Sustainability in 3D Printing

Test your understanding of workshop safety, ventilation, resin disposal, intellectual property, and ethical use of additive manufacturing with these questions.

---

#### 1. Which filament type produces the highest levels of both VOC emissions and ultrafine particles (UFPs) during FDM printing?

<div class="upper-alpha" markdown>
1. PLA — the most common beginner filament
2. PETG — used for functional parts requiring toughness
3. ABS — releases styrene, a possible carcinogen, at elevated concentrations
4. TPU — elastic filament used for flexible applications
</div>

??? question "Show Answer"
    The correct answer is **C**. ABS releases styrene (classified as a possible human carcinogen) and produces high UFP output during printing. Research from the Illinois Institute of Technology documents its elevated emission levels compared to PLA, PETG, and TPU. PLA has the lowest emission profile of common filaments; PETG is moderate; TPU is moderate-to-high. This is why ABS printing requires exhaust ventilation as a minimum, not just open windows.

    **Concept Tested:** VOC And UFP Exposure

---

#### 2. Ultrafine particles (UFPs) produced by FDM printing are defined as particles smaller than:

<div class="upper-alpha" markdown>
1. 10 micrometers (µm) — the threshold for inhalable particles
2. 2.5 micrometers (µm) — the PM2.5 standard
3. 100 nanometers (nm) — passing through standard dust masks unimpeded
4. 1 millimeter (mm) — visible to the naked eye
</div>

??? question "Show Answer"
    The correct answer is **C**. Ultrafine particles are defined as smaller than 100 nanometers (0.1 µm) — smaller than the filtration capability of standard dust masks (N95 masks are rated for particles ≥ 0.3 µm). They deposit deep in lung tissue and can enter the bloodstream. PM10 (10 µm) and PM2.5 are larger size thresholds for different air quality standards; particles visible to the naked eye are much larger than UFPs.

    **Concept Tested:** VOC And UFP Exposure

---

#### 3. What is the most effective ventilation approach for a classroom running four or more FDM printers simultaneously with ABS filament?

<div class="upper-alpha" markdown>
1. Natural ventilation with open windows, which adequately dilutes emissions from multiple printers
2. Dedicated exhaust ventilation ducted to the exterior, capturing emissions at the source
3. A single desktop HEPA air purifier placed in the center of the room
4. Wearing N95 masks, which filter both VOCs and UFPs from the breathing zone
</div>

??? question "Show Answer"
    The correct answer is **B**. Dedicated exhaust ventilation ducting printer enclosures directly to the outside captures emissions before they mix with room air — the most effective approach. Natural ventilation is unreliable for multiple printers running high-emission materials. A single desktop HEPA purifier is undersized for the emission volume of multiple ABS printers, and HEPA alone doesn't capture VOCs. N95 masks don't capture VOCs and don't effectively filter sub-100 nm UFPs.

    **Concept Tested:** Ventilation Requirements

---

#### 4. The correct procedure for disposing of liquid waste resin (uncured photopolymer) is to:

<div class="upper-alpha" markdown>
1. Pour it down the drain with running water to dilute it to safe levels
2. Seal it in a container and place it in the regular trash immediately
3. Expose it to UV light until fully cured solid, then dispose of as solid waste
4. Mix it with baking soda to neutralize the chemical reaction before disposal
</div>

??? question "Show Answer"
    The correct answer is **C**. Uncured resin is toxic to aquatic organisms and cannot go down drains. The correct approach is to cure all liquid resin waste — pour it into a clear container and expose to sunlight or a UV lamp until fully solidified. Cured resin is chemically inert and can be disposed of as solid waste. Diluting in water doesn't neutralize resin toxicity and contaminates wastewater; baking soda does not neutralize uncured photopolymer; sealing uncured resin in trash introduces hazardous material into a non-hazardous waste stream.

    **Concept Tested:** Resin Disposal

---

#### 5. Thermal runaway protection in 3D printer firmware prevents fires by:

<div class="upper-alpha" markdown>
1. Limiting print speed to keep the hotend from overheating during rapid movements
2. Shutting down the printer if the heater runs but the temperature sensor doesn't respond as expected
3. Automatically pausing any print that runs for more than 8 hours continuously
4. Reducing bed temperature to safe levels if a print failure is detected
</div>

??? question "Show Answer"
    The correct answer is **B**. Thermal runaway protection monitors the relationship between heater activity and temperature sensor response. If the heater is running but the temperature doesn't rise as expected (e.g., a disconnected thermistor reading ambient temperature while the heater runs unconstrained), the firmware triggers an emergency shutdown. This specific check prevents the heater from running indefinitely without a thermal limit. It does not govern print speed, impose time limits, or reduce bed temperature on failure detection.

    **Concept Tested:** Fire Safety

---

#### 6. A Creative Commons CC BY-NC-SA license applied to a 3D model means that a student may:

<div class="upper-alpha" markdown>
1. Print and sell the model commercially, provided the original creator is credited
2. Print and modify the model for non-commercial use, sharing any modifications under the same license
3. Print the model for personal use only, with no modifications or redistribution of any kind
4. Use the model in any way without restriction because CC licenses are non-binding for educational use
</div>

??? question "Show Answer"
    The correct answer is **B**. CC BY-NC-SA means Attribution (BY) — credit the creator; NonCommercial (NC) — no commercial use; ShareAlike (SA) — modifications must be shared under the same license. A student can print, modify, and share the modified design for non-commercial purposes, as long as they credit the original creator and apply CC BY-NC-SA to the derivative. Selling prints (commercial use) is prohibited; ND (NoDerivatives) would prohibit modifications, not NC; CC licenses are legally binding and apply in educational contexts.

    **Concept Tested:** Creative Commons For 3D

---

#### 7. Which of the following categories of 3D-printed objects is considered a "restricted design" due to legal and safety concerns?

<div class="upper-alpha" markdown>
1. Replacement brackets for consumer electronics, since they might affect warranty
2. Prosthetic hand components designed for personal use by the user themselves
3. Untraceable firearm components that bypass serial number and background check requirements
4. Fan art miniatures printed for personal display at home
</div>

??? question "Show Answer"
    The correct answer is **C**. Untraceable firearms (sometimes called "ghost guns") raise serious legal and safety concerns — they are designed to bypass legal requirements for serial numbers and background checks. Laws vary by jurisdiction but are tightening. Replacement brackets fall under fair use for personal repair; prosthetics for personal use are generally permitted (regulated if distributed as medical devices); fan art miniatures printed for personal display typically fall under fair use, not a restricted category.

    **Concept Tested:** Restricted Designs

---

#### 8. The "BY" component of a Creative Commons license requires that users:

<div class="upper-alpha" markdown>
1. Buy a commercial license before using the model for any purpose
2. Build only objects with the model that serve a beneficial social purpose
3. Credit the original creator whenever the model is used, modified, or shared
4. Balance environmental impact by recycling the printed waste material
</div>

??? question "Show Answer"
    The correct answer is **C**. "BY" stands for Attribution — the requirement to identify and credit the original creator when using, modifying, or redistributing the work. This is the most universal component of Creative Commons licensing and is included in all CC license variants. "BY" has no connection to purchasing licenses, evaluating social benefit, or environmental requirements.

    **Concept Tested:** Open-Source Licenses

---

#### 9. In evaluating the environmental sustainability of a 3D printing operation, which comparison most accurately describes AM's material efficiency advantage over traditional subtractive manufacturing?

<div class="upper-alpha" markdown>
1. AM produces zero waste because all material is deposited exactly where needed
2. AM wastes significantly less material than machining for complex parts because it is a near-net-shape process
3. AM uses less energy than injection molding for any production volume
4. AM eliminates the need for post-processing, reducing total energy consumption to near zero
</div>

??? question "Show Answer"
    The correct answer is **B**. Additive manufacturing is a near-net-shape process — material is deposited only where the part requires it, with waste limited to support structures (2–10%) compared to typical machining waste of 40%+ for complex parts. AM does produce some waste (supports, purge material, failed prints); the energy comparison with injection molding depends heavily on production volume; and AM parts frequently require post-processing (sanding, annealing, machining).

    **Concept Tested:** Sustainability In AM

---

#### 10. Which best describes the concept of "intellectual property" as it applies to downloading a 3D model from an online repository?

<div class="upper-alpha" markdown>
1. IP law only applies to models sold commercially; free downloads have no copyright protection
2. Copyright attaches automatically to original creative works, including 3D models, regardless of whether they are registered
3. Downloading and printing a model for personal use is always legal regardless of the license
4. 3D model files are covered by patent law, not copyright, and expire after 20 years
</div>

??? question "Show Answer"
    The correct answer is **B**. Copyright is automatic — it attaches to original creative works from the moment of creation, without registration. A 3D model file is protected by copyright as soon as its creator makes it, regardless of whether it is free to download. Free downloads still have copyright protection; personal use printing may or may not be permitted depending on the specific license; and while some 3D printing processes are patented, model files are protected by copyright law, not patent law.

    **Concept Tested:** Intellectual Property

---
