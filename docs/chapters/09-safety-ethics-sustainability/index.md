---
title: Safety, Ethics, and Sustainability in 3D Printing
description: Workshop safety, VOC and particle exposure, ventilation, fire safety, resin disposal, filament recycling, sustainability, intellectual property, open-source licensing, and the ethics of restricted designs.
generated_by: claude skill chapter-content-generator
date: 2026-05-07 23:06:20
version: 0.08
---

# Safety, Ethics, and Sustainability in 3D Printing

!!! mascot-welcome "Welcome to Chapter 9"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Benchy waves hello">
    Most 3D printing chapters focus on what you can make. This one focuses on what you need to know before, during, and after you make it — the responsibilities that come with running a printer in a shared space, downloading a model from the internet, and disposing of what's left over when the job is done. The stakes here are real: your health, your community's safety, someone else's creative rights.

## Summary

This chapter covers the non-negotiable safety and ethical practices for 3D printing: workshop safety, VOC and ultrafine-particle exposure, ventilation requirements, fire safety, resin disposal, filament recycling and broader sustainability in additive manufacturing, intellectual-property considerations, open-source and Creative Commons licensing of 3D models, and the ethics of restricted designs (e.g., weapons, counterfeit parts).

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Workshop Safety (Concept 194)
2. VOC And UFP Exposure (Concept 195)
3. Ventilation Requirements (Concept 196)
4. Fire Safety (Concept 197)
5. Resin Disposal (Concept 198)
6. Filament Recycling (Concept 199)
7. Sustainability In AM (Concept 200)
8. Intellectual Property (Concept 201)
9. Open-Source Licenses (Concept 202)
10. Creative Commons For 3D (Concept 203)
11. Ethical Use Of AM (Concept 204)
12. Restricted Designs (Concept 205)

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations and History of Additive Manufacturing](../01-foundations-and-history/index.md)
- [Chapter 5: 3D File Formats and Mesh Geometry](../05-file-formats-and-mesh/index.md)
- [Chapter 6: Materials Science for Additive Manufacturing](../06-materials-science/index.md)
- [Chapter 8: FDM Printer Hardware and Operation](../08-fdm-printer-hardware/index.md)

---

## Workshop Safety: The Foundation of Every Session

3D printing happens in a shared space — a makerspace, a classroom lab, a fabrication room. That shared space has its own rules, and understanding them isn't bureaucracy: it's how everyone gets to keep using the equipment. **Workshop safety** in a 3D printing context covers physical hazards, thermal hazards, chemical hazards, and electrical hazards. Let's start with the basics before moving to the more nuanced ones.

The most common physical hazards are easily managed with awareness:

- **Hot surfaces** — the hotend operates between 180 °C and 300 °C. The heated bed can reach 110 °C. Neither looks dangerous until you touch them. Always confirm a printer has cooled before working inside the print area.
- **Moving parts** — belts, pulleys, and motors can pinch fingers. Never reach inside a running printer.
- **Sharp edges** — freshly printed parts, especially those with support structures, can have very sharp edges where support material was attached. Use flush cutters carefully, and deburr or sand exposed edges before handling objects that will be used by others.
- **Filament ends** — freshly cut filament tips are pointed and rigid enough to pierce skin. Handle them away from your face.

A well-run workshop also maintains clear egress paths (nothing stored in front of exits), a visible and accessible fire extinguisher, and a sign-in system so it's always known who is using the space and what they're printing.

---

## VOCs and Ultrafine Particles: The Invisible Hazard

Here is the hazard that is hardest to see and easiest to underestimate: when an FDM printer melts thermoplastic, it releases **volatile organic compounds (VOCs)** and **ultrafine particles (UFPs)** into the air. Both have documented health effects with sufficient exposure, and "it doesn't smell bad" is not a reliable indicator of safety.

**Volatile organic compounds** are carbon-based chemicals that vaporize at room temperature. When plastic melts, chemical bonds break and some components become airborne. The type and concentration of VOCs depend on the filament material and print temperature. ABS is notably worse than PLA — it releases styrene at elevated concentrations, a compound classified as a possible human carcinogen. PETG and ASA also release measurable VOCs. PLA releases the least of common filaments, though it still emits compounds (largely lactide and various aldehydes) above background levels.

**Ultrafine particles (UFPs)** are particles smaller than 100 nanometers in diameter. They're invisible to the naked eye and too small to be captured by most dust masks. Research from the Illinois Institute of Technology (2013 and subsequent studies) documented that desktop FDM printers emit millions to hundreds of millions of UFPs per minute during operation — comparable to burning a candle or smoking a cigarette. UFPs deposit deep in lung tissue and can enter the bloodstream. Long-term cumulative exposure is the concern; a single print session in a well-ventilated space is not an acute hazard for most people, but hours of daily exposure in a poorly ventilated space can be.

!!! mascot-thinking "The Particle You Can't See Is the One to Respect"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Benchy thinks carefully">
    Ultrafine particles are 100 nm or smaller — a human hair is roughly 70,000 nm wide. These particles pass through standard dust masks as if the mask isn't there. The hazard isn't what you can smell or see; it's the invisible chemistry happening at the nozzle tip. The good news is that the mitigation — ventilation — works. The bad news is that a lot of makerspaces treat it as optional.

The table below compares common filament materials by their relative VOC and UFP emission levels, based on peer-reviewed studies:

| Filament | Relative VOC Emissions | Primary VOC Compounds | Relative UFP Output |
|---|---|---|---|
| PLA | Low | Lactide, acetaldehyde | Moderate |
| PETG | Moderate | Benzene derivatives | Moderate-High |
| ABS | High | Styrene, butadiene | High |
| ASA | High | Styrene derivatives | High |
| TPU | Moderate-High | Isocyanate derivatives | Moderate |
| Nylon | Moderate | Caprolactam | Moderate |

---

## Ventilation Requirements

Knowing that printers emit VOCs and UFPs leads directly to the question: what do you do about it? The answer is **ventilation** — moving contaminated air out and replacing it with fresh air. There are three ventilation approaches in common use, ranging from minimal to robust.

**Natural ventilation** means relying on open windows and doors to dilute emissions. It's better than nothing, but it's unreliable. Wind direction, temperature, and the number of printers running simultaneously all affect whether dilution is adequate. For a single printer running occasionally in a large room with good airflow, natural ventilation is marginally acceptable. For a classroom with four to eight printers running simultaneously for hours, it is not.

**Exhaust ventilation** routes air directly from the printer's enclosure (or build area) to the outside via a dedicated duct. This is the most effective approach because it captures emissions at the source before they mix with room air. Many enclosed printers (Bambu Lab, Prusa MK4 with enclosure, UltiMaker S-series) have built-in fan ports for external ducting. For open-frame printers, you can build a simple enclosure and add an exhaust fan ducted to an exterior wall or window.

**HEPA + activated carbon filtration** captures particles and adsorbs VOCs within a sealed circulation system. HEPA filters rated H13 or H14 capture particles down to 0.3 μm with 99.97% efficiency; however, UFPs smaller than 100 nm are not captured with the same efficiency. Activated carbon adsorbs VOC molecules. Combined HEPA + carbon systems (like those built into some enclosures) are a reasonable solution when ducting to the exterior is impractical, but the filters require regular replacement.

For a high school lab setting, the America Makes and SME recommended baseline is: **at minimum, use exhaust ventilation when running ABS, ASA, or engineering filaments, and HEPA/carbon filtration when running PLA in an enclosed space without exterior ducting.**

---

## Fire Safety

3D printers run unattended for hours — sometimes overnight. An FDM printer combines resistive heaters, polymer materials, and sustained high temperatures. The fire risk is real and should be treated with the same seriousness as any other heat-producing workshop equipment.

The main fire scenarios in FDM printing are:

- **Thermal runaway** — a heater circuit malfunctions while the temperature sensor fails, allowing the heater to run unconstrained. Modern firmware (Marlin 2.x, Klipper) includes thermal runaway protection: if the temperature reading doesn't respond to heater activity as expected, the firmware shuts down and triggers an error. This feature should always be enabled.
- **Filament jams near the hotend** — a clog can cause filament to back up and contact the heater block housing, potentially smoldering.
- **Electronics faults** — cheap or damaged wiring, loose connectors, or failed MOSFET components can overheat.
- **Print failures creating heat concentration** — in rare cases, a badly warped print that collides with the hotend can prevent normal motion and concentrate heat in one location.

Best practices for fire safety:

- Enable thermal runaway protection in firmware — verify it's active in your printer settings.
- Never leave a printer completely unattended overnight without a smoke detector and ideally a connected camera.
- Keep a class ABC or BC dry-chemical fire extinguisher within reach of any printer cluster.
- Use a smart plug with power monitoring — abnormal power draw can indicate a heater problem.
- Don't print with degraded or partially damaged wiring.
- Keep the area around printers clear of loose paper, filament trimmings, and other flammable material.

!!! mascot-warning "Thermal Runaway Protection Is Not Optional"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Benchy warns about a fire hazard">
    Some older or heavily modified printers have thermal runaway protection disabled by default, or have it stripped out of a custom firmware build. Before you leave any printer running unattended, confirm in the firmware configuration that `THERMAL_PROTECTION_HOTENDS` and `THERMAL_PROTECTION_BED` are set to true. It's two lines of code that stand between your printer and a fire.

---

## Resin Disposal

Resin printing (covered in detail in Chapter 10) uses photopolymer resins that are chemically reactive, skin-sensitizing, and toxic to aquatic organisms. Proper disposal is not just good practice — it's a legal requirement in most jurisdictions under hazardous waste regulations.

Before we cover disposal, two terms to understand: **uncured resin** is liquid photopolymer that has not been exposed to UV light. It is the most hazardous form — it's a skin sensitizer and can cause allergic reactions with repeated dermal exposure. **Cured resin** is hardened polymer that has been fully polymerized by UV light. Cured resin is chemically inert and generally can be handled without gloves, though sanding produces fine particles that should be managed with appropriate respiratory protection.

The key rule for resin disposal: **never pour uncured liquid resin down a drain**. Resin is toxic to aquatic organisms and does not break down safely in wastewater systems.

Proper disposal procedures for resin waste:

1. **Cure all liquid waste before disposal** — pour waste resin into a clear container and expose to direct sunlight or a UV lamp until fully solidified. Cured resin can then be disposed of as solid waste.
2. **Wipe containers and tools, then cure the wipes** — IPA-soaked paper towels and nitrile gloves used during washing contain residual resin. Expose them to UV and dispose as solid waste once cured.
3. **Saturated IPA wash fluid** — washing alcohol heavily loaded with resin should be evaporated under UV (not poured down the drain) or disposed through a certified hazardous waste collection service.
4. **Partially cured resin prints** — if a print fails midway through and is still tacky, cure it fully before handling without gloves.
5. **Empty resin bottles** — allow residual resin to cure inside the bottle, then seal and dispose as solid waste.

---

## Filament Recycling and Sustainability in AM

3D printing generates material waste: support structures, failed prints, purge material, and end-of-spool remnants. Understanding what happens to that waste — and what can be done about it — is part of being a responsible maker.

**Filament recycling** in the context of consumer FDM printing is constrained by a practical challenge: thermoplastics can be recycled, but the infrastructure for doing so at small scale is limited. Here's the landscape:

- **PLA** is technically compostable (in industrial composting facilities, not home compost bins) and can be recycled in some municipal streams if your local facility accepts #7 plastics. It can also be ground and re-extruded into new filament using a desktop filament recycler (e.g., Filamaker, Felfil Evo), though the mechanical properties of the recycled filament may be reduced.
- **ABS and PETG** are more recyclable in conventional plastic streams (#5 and #1 respectively) but are rarely accepted in kerbside programs because print volumes are too small to be economically sorted.
- **Composite filaments** (carbon fiber-filled, wood-filled, etc.) are generally not recyclable — the composite nature prevents clean material recovery.
- **Print waste reduction** is more practically achievable than recycling for most students: use supports only where genuinely necessary, orient models to minimize support volume, choose appropriate infill, and learn to recover from failed prints early rather than letting a bad print run for hours.

**Sustainability in AM** extends beyond waste. When evaluating the environmental impact of an additive manufacturing operation, consider:

- **Energy use** — FDM printers draw 100–300 W during operation; a 10-hour print consumes 1–3 kWh.
- **Material efficiency** — AM is inherently a near-net-shape process; it produces less material waste than traditional subtractive manufacturing for complex parts.
- **Bio-based materials** — PLA is derived from corn starch or sugarcane; some specialty filaments use recycled ocean plastics or other post-consumer streams.
- **Part longevity** — a well-designed part that lasts years is more sustainable than a poorly designed part that requires repeated reprinting.
- **End-of-life planning** — design parts to be disassembled so materials can be sorted and recycled separately.

#### Diagram: Filament Lifecycle Explorer

<iframe src="../../sims/filament-lifecycle-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Filament Lifecycle Explorer</summary>
Type: infographic
**sim-id:** filament-lifecycle-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Examine
Learning Objective: Students examine the full lifecycle of a 3D-printed filament part — from raw material to end-of-life — and identify where waste and environmental impact occur.

Layout:
- Circular flow diagram showing lifecycle stages: Raw Material → Pellet Production → Filament Extrusion → Spool → Printer → Finished Part → End of Life (branching to: Recycled / Landfill / Compost / Repurposed)
- Each stage is a labeled node on the circle
- Arrows between stages show material and energy flow

Interactive elements:
- Click any node: Expand an info panel with details — what happens at this stage, energy input, waste generated, and sustainability notes
- Hover any arrow: Show tooltip with "what's flowing here" (e.g., "PLA pellets", "waste prints", "extrusion heat")
- Filter toggle: "Show PLA", "Show PETG", "Show ABS" — each filter highlights the path and updates the info panel with material-specific data
- "Zoom to End of Life" button: expands the end-of-life branch to show the three disposal paths with their requirements and barriers

Color coding:
- Green: Sustainable / recyclable pathways
- Yellow: Conditionally sustainable
- Red: Landfill / non-recyclable pathways
- Blue: Process / energy inputs

Canvas:
- Main diagram: 600×400 area
- Info panel: right side, 200px wide

Responsive: reflows to vertical on narrow screens.
</details>

---

## Intellectual Property in 3D Printing

When you download a 3D model from an online repository — Thingiverse, Printables, Cults3D, MyMiniFactory — you are accessing someone else's creative work. That work is protected by **intellectual property (IP)** law, specifically copyright, from the moment the designer creates it. You don't need to register a copyright for it to exist; the right attaches to original creative works automatically.

In practice, IP considerations in 3D printing cluster around three questions:

1. **Can I print this?** — Does the model's license permit personal or educational printing?
2. **Can I modify it?** — Does the license allow derivative works?
3. **Can I share or sell it?** — Does the license permit redistribution, and under what conditions?

The answers depend entirely on the license the creator has applied to the model. A model with "all rights reserved" (default copyright, no license stated) technically permits you only to view the file — printing it is technically an unauthorized reproduction, though enforcement is uncommon for personal non-commercial use. A model with a permissive open-source license gives you explicit permissions.

---

## Open-Source and Creative Commons Licensing

The 3D printing community has adopted two main licensing frameworks for sharing models: **open-source hardware/software licenses** and **Creative Commons (CC) licenses**. Understanding the difference between them, and how to read a specific license, is a practical skill every maker needs.

**Creative Commons licenses** are the dominant framework for 3D model sharing. They combine four conditions into license combinations:

- **BY** (Attribution) — you must credit the original creator
- **NC** (NonCommercial) — you may not use the work for commercial purposes
- **SA** (ShareAlike) — any derivative work must carry the same license
- **ND** (NoDerivatives) — you may not modify the work

These conditions combine into specific license types. The most permissive is **CC BY** (attribution only — you can use, modify, and sell as long as you credit the creator). The most restrictive commonly used is **CC BY-NC-ND** (attribution required, no commercial use, no modifications).

The table below shows the six main Creative Commons license types and what each permits:

| License | Print for Personal Use | Modify | Sell Prints | Must Credit |
|---|---|---|---|---|
| CC BY | Yes | Yes | Yes | Yes |
| CC BY-SA | Yes | Yes (same license) | Yes (same license) | Yes |
| CC BY-NC | Yes | Yes | No | Yes |
| CC BY-NC-SA | Yes | Yes (same license) | No | Yes |
| CC BY-ND | Yes | No | Yes | Yes |
| CC BY-NC-ND | Yes | No | No | Yes |

In educational settings, CC BY-NC and CC BY-NC-SA are the most commonly encountered licenses. They allow students to print, study, and modify models — which is exactly what a 3D printing class needs — while protecting the creator's commercial interest. When in doubt about a license, check the model page, contact the creator, or use a model that carries a clearly permissive license.

!!! mascot-tip "Read the License, Not Just the Preview"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Benchy gives practical advice">
    A lot of designers on model-sharing sites label their work as "free" in the title, then apply a CC BY-NC-ND license in the metadata. "Free" in the context of a model site usually means "free to download," not "free to do anything with." Before you modify or redistribute a model, scroll to the license badge, not the price tag. Thirty seconds of reading prevents a lot of awkward situations.

---

## Ethical Use of Additive Manufacturing

Intellectual property is one dimension of ethics in 3D printing, but the field raises broader questions that deserve direct engagement. **Ethical use of AM** means thinking clearly about what you're making, who it affects, and whether the benefits outweigh the harms.

Most 3D-printed objects are unambiguously beneficial: replacement parts that extend the life of products, adaptive devices that improve accessibility for people with disabilities, educational models that make abstract concepts tangible, customized tools that solve specific problems. The technology's democratizing effect — putting a manufacturing capability in every school and many homes — is genuinely remarkable.

But the same technology that prints a custom prosthetic hand can print a weapon component. The same that produces anatomical models for medical education can produce counterfeit brand-name goods. The ethical framework isn't complicated, but it requires active thought:

- **Who might be harmed?** Physical harm (weapons), financial harm (counterfeits), privacy harm (scanning and reproducing someone's personal items without consent).
- **Does the law allow it?** Counterfeit goods are illegal. Unregistered firearms may be illegal depending on jurisdiction. Reproducing copyrighted characters for commercial sale without a license violates IP law.
- **Does permission exist?** Printing a design for your own use is different from distributing it. Using a school printer for personal projects is different from using it for a side business.

### Restricted Designs

**Restricted designs** are models that carry legal, safety, or ethical prohibitions on their printing and distribution. The most discussed examples are:

- **Untraceable firearms** — "ghost guns" lack serial numbers and are not subject to standard background-check requirements. Laws vary by jurisdiction but are tightening across the U.S. and internationally.
- **Counterfeit goods** — printing exact replicas of branded products (logos, form factors) for resale violates trademark law.
- **Medical devices without clearance** — printing and distributing items represented as medical devices (implants, drug delivery components) without FDA clearance (U.S.) or CE marking (EU) is illegal and dangerous.
- **Lock picks and security bypass tools** — legal status varies; some jurisdictions restrict possession, and using them without authorization is criminal regardless.
- **Models that infringe copyright** — printing and selling characters, architecture, or art under copyright without license is infringement.

Most model-sharing platforms have policies against hosting restricted designs, and responsible community members report and flag them. Understanding these categories matters not just for legal compliance but because the long-term health of open access to 3D printing depends on the community using the technology responsibly.

!!! mascot-warning "The Community's Reputation Is Also at Stake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Benchy gives a serious warning">
    Every story about 3D-printed weapons or counterfeit goods makes it harder to argue that schools, libraries, and makerspaces should have open access to printers. The freedom to print almost anything exists partly because most people in the community exercise good judgment. When that trust breaks down, regulations tighten — and everyone loses access. The ethical choices you make affect not just yourself but every maker who comes after you.

---

## Assessing Your Print Setup's Safety Profile

Before beginning a print session, it helps to run through a quick mental assessment of the four risk areas we've covered. These questions don't take long — once you know what to look for, the whole check takes about sixty seconds.

**Fume and particle risk:**
- What material am I printing? (ABS/ASA = higher risk; PLA = lower risk)
- Is ventilation running? (exhaust fan active, window open, or enclosure filter engaged)
- How long will this print run?

**Fire risk:**
- Is thermal runaway protection enabled on this printer?
- Is there a smoke detector in the space?
- Is a fire extinguisher accessible?

**Chemical risk (resin only):**
- Am I wearing nitrile gloves before touching any resin component?
- Is IPA wash solution fresh or saturated?
- Is there a UV curing station and appropriate disposal containers available?

**IP and ethics:**
- Do I know the license on the model I'm printing?
- Is the design appropriate for a school/community space?

#### Diagram: Print Session Safety Checklist

<iframe src="../../sims/print-session-safety-checklist/main.html" width="100%" height="480px" scrolling="no"></iframe>

<details markdown="1">
<summary>Print Session Safety Checklist</summary>
Type: infographic
**sim-id:** print-session-safety-checklist<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Evaluate (L5)
Bloom Verb: Assess
Learning Objective: Students assess the safety adequacy of a print setup by working through a structured checklist and identifying which risk areas need attention before beginning a print session.

Layout:
- Four collapsible card panels: Fume & Particle Risk, Fire Safety, Chemical (Resin), IP & Ethics
- Each card shows an icon, a risk-level badge (Low / Medium / High — determined by user answers), and a list of checklist questions

Interactive elements:
- Each question has a Yes / No / N/A radio button
- As the user answers, the card's risk-level badge updates dynamically:
  - All Yes = Green (Low risk)
  - Mixed = Yellow (Medium — hover shows which gaps remain)
  - Multiple No = Red (High — hover shows specific unmet criteria)
- Overall "Session Readiness" indicator at the top: Ready to Print / Review Required / Do Not Start
- "Why does this matter?" tooltip on each question (hover reveals 1-sentence rationale)
- Reset button clears all answers

Scenarios (optional guided mode):
- Dropdown: Select a scenario (e.g., "ABS print, unventilated classroom", "PLA print, well-ventilated lab") — pre-fills some answers and highlights the residual risks

Visual style:
- Clean card layout with clear icons for each risk category
- Color transitions for risk badges (smooth green/yellow/red)
- Accessible contrast ratios

Responsive: stacks cards vertically on narrow screens; minimum 320px.
</details>

---

## Key Takeaways

- FDM printing produces VOCs and ultrafine particles (UFPs); ABS and ASA are the highest emitters and require exhaust ventilation as a minimum.
- Ultrafine particles (<100 nm) bypass standard dust masks; only adequate room-air turnover or exhaust ventilation mitigates UFP exposure.
- Fire safety requires thermal runaway protection enabled in firmware, smoke detection, and accessible fire extinguishers — not just awareness.
- Uncured photopolymer resin is hazardous to skin and toxic to aquatic organisms; never pour liquid resin down a drain — cure it first, then dispose as solid waste.
- Filament waste can be reduced through better print strategies; recycling options are limited but exist for some materials through desktop extruder systems.
- Sustainability assessment of a print job includes energy consumption, material waste, and end-of-life recyclability — not just raw material choice.
- Copyright attaches to 3D models automatically; printing a downloaded model without reviewing its license is a legal and ethical gray area.
- Creative Commons licenses define what you can do with a model in combinations of: Attribution (BY), NonCommercial (NC), ShareAlike (SA), and NoDerivatives (ND).
- Restricted designs — untraceable firearms, counterfeit goods, unauthorized medical devices — carry legal consequences and community-level reputational risk for the entire field.
- Responsible use of 3D printing means actively thinking about who might be harmed, what the law requires, and what permission exists before making and sharing.

??? question "Check Your Understanding: Which CC License Lets a Student Modify and Share a Model Free, But Not Sell Prints? — Click to Reveal"
    CC BY-NC-SA (Attribution-NonCommercial-ShareAlike). The BY component requires crediting the original designer. The NC component prohibits commercial use (selling prints). The SA component requires any modified versions to carry the same license. A student can print, modify, and share the modified design — but cannot sell it, and any shared version must also be CC BY-NC-SA.

!!! mascot-celebration "You're Now a Responsible Maker"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Benchy celebrates with you">
    This chapter asked you to think beyond the printer — about the air you breathe while it runs, the community you share the space with, and the people whose creative work you're using. That's a different kind of competence than bed leveling or slicer settings, but it's just as important. Up next in Chapter 10, we move to resin printing — where ventilation and PPE go from strongly recommended to absolutely required.
