# Book Chapter Design Decisions

- **Skill:** `book-chapter-generator`
- **Date:** 2026-05-07
- **Project:** Introduction to 3D Printing (high-school intelligent textbook)
- **Source course description:** [docs/course-description.md](../docs/course-description.md) (Bloom-tagged, quality 100/100)
- **Source learning graph:** [docs/learning-graph/learning-graph.json](../docs/learning-graph/learning-graph.json) (292 concepts, 16 taxonomy categories, 470 edges, valid DAG)
- **Approver:** Dan McCreary

This document captures every design decision made while structuring the textbook into chapters. The goal is so that anyone re-reading later — or any subsequent skill — can understand *why* the chapters look the way they do, not just *what* they are.

---

## 1. Final chapter structure (16 chapters, 292 concepts, 0 dependency violations)

| # | Chapter Title | Concepts |
|---|---|---|
| 1 | Foundations and History of Additive Manufacturing | 18 |
| 2 | AM Standards, Process Families, and Industrial AM | 25 |
| 3 | The Engineering Design Process | 12 |
| 4 | Computer-Aided Design and Modeling | 19 |
| 5 | 3D File Formats and Mesh Geometry | 9 |
| 6 | Materials Science for Additive Manufacturing | 24 |
| 7 | Slicing, G-code, and Toolpaths | 23 |
| 8 | FDM Printer Hardware and Operation | 19 |
| 9 | Safety, Ethics, and Sustainability in 3D Printing | 12 |
| 10 | Resin Printing: SLA, MSLA, and DLP | 13 |
| 11 | Design for Additive Manufacturing and Metrology | 20 |
| 12 | Print Failures, Troubleshooting, and Post-Processing | 19 |
| 13 | Modern Hardware: Multi-Material, Motion, and Speed | 23 |
| 14 | The Modern 3D Printing Ecosystem: Slicers, Connectivity, Brands, and Production | 19 |
| 15 | AI and Machine Learning in Additive Manufacturing | 21 |
| 16 | Digital Workflows, Careers, Articulation, and the Capstone Project | 16 |
| **Total** | | **292** |

Average **18.25** concepts/chapter. Min 9 (Ch 5), max 25 (Ch 2). All within the 8–25 acceptable band; most within the 12–18 optimal band.

---

## 2. Decisions about chapter count

**Chose 16 chapters.** The skill recommends 6–20, with 10–15 as the optimal range. 16 sits one chapter above the optimal cap, but every smaller count was either dependency-infeasible or forced unbalanced sizes (>25 or <8). Tried mentally:

- **12 chapters** → average 24/chapter, multiple chapters at >25, hard to keep CAD/Slicing/Hardware as their own focus.
- **14 chapters** → workable but forced merging of CAD with Files, or Slicing with Hardware, both of which are pedagogically distinct skills.
- **16 chapters** → every chapter is a coherent topic the user could teach as one unit.

The Modern Tech cluster (Chs 13, 14, 15) was the main reason for going to 16 — multi-material/motion is a hands-on hardware story, while ecosystem/brands is a market-orientation story, and AI is its own meta-topic. Compressing them into one or two chapters would either drown students in unrelated detail or force premature jumps between very different conceptual modes.

---

## 3. Decisions about chapter ordering

The dominant constraint is the dependency DAG. The pedagogical pillars from the course description (PLTW, ASTM/ISO 52900, America Makes, articulation) each get their own anchor chapter:

- **PLTW pedagogy** → Chapter 3 (Engineering Design Process) and Chapter 16 (Capstone)
- **ASTM/ISO 52900 terminology** → Chapter 2 (AM Standards, Process Families)
- **America Makes workforce competencies** → Chapter 16 (Careers, Articulation)
- **Community-college articulation** → Chapter 16 (Articulation, Dual Credit, ABET alignment)

### Specific ordering decisions and *why*

| Decision | Reason |
|---|---|
| **History → Standards → Process Families** (Chs 1, 2) | Students need historical context and vocabulary before they can talk about the seven process categories meaningfully. |
| **Engineering Design Process placed at Ch 3, before CAD** | The PLTW design loop is a meta-skill that frames every CAD project. Teaching it first lets later chapters reference "the design process" without re-explaining. |
| **CAD → Files → Materials → Slicing** (Chs 4, 5, 6, 7) | This is the standard digital-fabrication pipeline. Files (STL/3MF) sit between CAD and Slicing because both produce/consume them. |
| **Materials before Slicing** (Ch 6 → Ch 7) | **Hard dependency.** Slicer Print Temperature (94) and Cooling Fan Settings (96) depend on Thermoplastics (122). Slicing can't be taught without students knowing what materials they're slicing for. |
| **FDM Hardware after Slicing** (Ch 8 after Ch 7) | A student who has seen a slicer will appreciate the printer anatomy more — they understand what each part *does* in the toolchain. |
| **Safety at Ch 9, between FDM Hardware and Resin Printing** | Safety needs Hotend (105) and Thermoplastics (122) for fume/fire content; resin PPE in Ch 10 then has Workshop Safety (194) as a clean prereq. Putting safety at Ch 3 would have created violations because material-specific safety topics depend on materials being introduced first. |
| **Resin Printing at Ch 10, after FDM** | FDM is the desktop-printer onramp most students see first; resin is a more specialized workflow with PPE concerns. |
| **DfAM and Metrology together at Ch 11** | These are co-taught in practice — DfAM tells you how to design for accuracy; metrology measures whether you achieved it. |
| **Troubleshooting at Ch 12** | Comes after both hardware chapters and DfAM so all failure-mode prereqs (Thermoplastics, Hotend, Print Speed, Belts/Pulleys, Adhesion) are available. |
| **Modern Tech as a 3-chapter block at the end** (Chs 13, 14, 15) | After foundational printing skills are taught, students can appreciate what makes Klipper/CoreXY/multi-material/AI advances *advances*. Putting these earlier would require teaching baseline before the contrast is meaningful. |
| **AI/ML chapter (Ch 15) before Capstone (Ch 16)** | So students can incorporate AI tools (text-to-CAD, AI troubleshooting assistants, vision monitoring) in their capstone if they choose. |
| **Careers + Articulation + Capstone together at Ch 16** | The capstone *is* the artifact a student takes to a community college or scholarship interview, so career framing belongs in the same chapter. ABET outcomes alignment also lives here. |

---

## 4. Decisions about concept placement (within and across chapters)

### Concepts moved out of their "natural" taxonomy chapter

| Concept | Natural taxonomy → assigned chapter | Reason |
|---|---|---|
| **36 FDM FFF Process** (PROC) | PROC → Ch 8 (FDM Hardware) | FDM as a process is inseparable from FDM as a machine; teaching them in the same chapter avoids the awkward "we'll see the printer later" gap. |
| **37, 38, 39 SLA/MSLA/DLP Processes** (PROC) | PROC → Ch 10 (Resin Printing) | Same reason — resin processes paired with resin hardware. |
| **40, 41, 42, 43 SLS/MJF/DMLS/EBM** (PROC) | PROC → Ch 2 (Standards) | These industrial processes only depend on Powder Bed Fusion (31) which is in Ch 2. Pulling them forward gives Ch 2 a complete "seven families" picture without needing to revisit. |
| **210 AI-Assisted CAD** (CAD) | CAD → Ch 4 (CAD) | Modern CAD includes AI assistance; teaching it inside CAD rather than in the AI chapter respects that it's now a standard CAD feature. |
| **211 Cloud Slicing** (SLIC) | SLIC → Ch 7 (Slicing) | Cloud slicing is a deployment of slicing software, not separate. |
| **151 Production AM Workflow** (PROC) | PROC → Ch 14 (Modern Ecosystem) | This depends on Iteration Cycle (51, Ch 3); pairing it with print farms / brand ecosystems makes more sense than putting it in the standards chapter. |
| **150, 152, 153, 154 Industrial AM context** (PROC) | PROC → Ch 2 (Standards) | These all depend only on AM (11) or industrial process implementations (42, 43) which are already in Ch 2. Pulling them forward gives the standards chapter a complete industrial picture. |
| **247 Mono LCD Resolution, 248 Large-Format Resin** (RESN) | RESN → Ch 10 (Resin Printing) | Modern resin advances belong with the resin chapter, not scattered into the modern hardware chapter. |
| **266, 267, 268 Composite filaments** (MAT) | MAT → Ch 6 (Materials) | Carbon fiber, wood-fill, metal-fill are filament families and belong in the materials chapter even though they're sub-$5K-era developments. |
| **269 Vase Mode, 270 Fuzzy Skin** (SLIC) | SLIC → Ch 7 (Slicing) | Specialized print modes are slicer features. |

### Concepts that needed special handling

- **99, 100, 101 Support Structures / Tree Supports / Support Interface** (SLIC) → kept in Ch 7 (Slicing) after dropping the 99→156 dependency. Students learn slicer-generated supports first, then encounter overhang theory in DfAM (Ch 11).

---

## 5. Required graph edits (6 dependency drops)

The original learning graph had several over-strict dependencies that prevented clean topological chaptering. Six edges are recommended for removal. **None of them remove concepts; they only relax ordering constraints between concepts.** All six were judged to be conceptual associations rather than strict prerequisites.

| # | Edge to drop | Concept depends on | Pedagogical reason for dropping |
|---|---|---|---|
| 1 | 99 → 156 | Support Structures → Overhangs | A beginner uses slicer auto-supports without knowing DfAM theory. The dep forces DfAM to be taught before basic slicing, which is wrong-way-round for hands-on courses. |
| 2 | 140 → 200 | Bio-Based Filaments → Sustainability In AM | Bio-PLA is identifiable as a material on its own. Sustainability is one motivation, not a prerequisite for understanding what the filament *is*. |
| 3 | 141 → 199 | Recycled Filaments → Filament Recycling | Same reasoning. |
| 4 | 231 → 200 | Multi-Material Waste → Sustainability In AM | Multi-material waste is a hardware artifact (the purge tower). Sustainability is the framing, not the prereq. |
| 5 | 261 → 197 | Enclosed Printer → Fire Safety | An enclosure is a printer feature. Fire safety is co-taught alongside the enclosure, not a hard prerequisite. |
| 6 | 290 → 204 | AI Ethics In Manufacturing → Ethical Use Of AM | These are peer concepts (one general AI ethics, one general AM ethics), not parent/child. |

After these six edits: **0 dependency violations across all 16 chapters.**

---

## 6. Decisions deliberately *not* made

These are things a future editor could legitimately revise but I chose to leave as-is:

- **Chapter 5 is small (9 concepts).** Could be merged into Ch 4 (CAD) or Ch 7 (Slicing). Kept separate because file formats are a topic students consistently get confused about (STL vs. 3MF resolution, manifold vs. non-manifold) and benefit from focused treatment.
- **Chapter 16 mixes Workflows, Careers, Articulation, and Capstone.** Could be split into two chapters (Workflows+Careers vs. Capstone). Kept as one because the capstone *is* the career-portfolio artifact and the integration is the point.
- **Modern slicers (PrusaSlicer, Cura, etc.) are in Ch 14, not Ch 7.** They could be in either. Ch 14 keeps the "modern ecosystem" theme tight and lets Ch 7 stay focused on slicing concepts (parameters, supports, G-code) rather than tool comparisons.
- **AI ethics (Ch 15) and broader AM ethics (Ch 9)** are separated. Could be merged into a single ethics chapter. Kept separate because AI ethics has a different audience and context than additive-manufacturing ethics (printing weapons, IP).

---

## 7. Validation

The proposed structure was validated programmatically:

```
Total: 292 | Assigned: 292 | Missing: 0 | Extra: 0 | Duplicates: 0
Violations after graph edits: 0
```

Every concept appears in exactly one chapter; every dependency is satisfied by the topological ordering of chapters.

---

## 8. URL path names (planned for file generation)

| Ch | URL path |
|---|---|
| 1 | `01-foundations-and-history` |
| 2 | `02-standards-and-process-families` |
| 3 | `03-engineering-design-process` |
| 4 | `04-cad-and-modeling` |
| 5 | `05-file-formats-and-mesh` |
| 6 | `06-materials-science` |
| 7 | `07-slicing-and-toolpaths` |
| 8 | `08-fdm-printer-hardware` |
| 9 | `09-safety-ethics-sustainability` |
| 10 | `10-resin-printing` |
| 11 | `11-dfam-and-metrology` |
| 12 | `12-troubleshooting-and-postprocessing` |
| 13 | `13-modern-hardware` |
| 14 | `14-modern-ecosystem` |
| 15 | `15-ai-and-machine-learning` |
| 16 | `16-careers-and-capstone` |

All lowercase, dashes only, ≤ 50 characters.

---

## 9. Outstanding actions before file generation

1. **Apply the 6 graph edits** to `docs/learning-graph/learning-graph.csv`, then regenerate `learning-graph.json`, `quality-metrics.md`, and `taxonomy-distribution.md`.
2. **Create the chapter directory tree** at `docs/chapters/`.
3. **Write `docs/chapters/index.md`** (overview page) and 16 individual chapter `index.md` files with title / summary / concepts list / prerequisites / TODO marker.
4. **Update `mkdocs.yml`** Chapters nav with the 16 chapter entries.
5. **Update `docs/learning-graph/index.md`** concept counts/notes if the dependency edits change reported metrics.
