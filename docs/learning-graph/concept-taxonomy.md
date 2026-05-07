# Concept Taxonomy

The 292 concepts in this learning graph are organized into **16 categories**. Each category has a 3–5-letter `TaxonomyID` used in `learning-graph.csv` and `learning-graph.json`. Categories are sized to keep no single category above 30 % of all concepts; the largest (HARD) is ~17.8 %.

| TaxonomyID | Category Name | Description |
|---|---|---|
| FOUND | Foundation Concepts | Math, physics, computer skills assumed as prior knowledge |
| HIST | History And Context | Origins of additive manufacturing, key inventions, institutions, and cultural movements |
| STND | Standards And Terminology | ISO/ASTM bodies, the ISO/ASTM 52900 standard, AM vocabulary, and core spatial concepts (build volume, Z axis, anisotropy) |
| PROC | AM Process Families | The seven ISO/ASTM 52900 process categories and their representative technologies (FDM, SLA, MSLA, DLP, SLS, MJF, DMLS, EBM) plus industrial AM context |
| EDP | Engineering Design Process And Capstone | PLTW design loop, problem definition, ideation, prototyping, iteration, communication, portfolio, and capstone synthesis |
| CAD | CAD Software And Modeling | Sketches, constraints, features, assemblies, parametric and feature-based modeling, named CAD tools, AI-assisted CAD |
| FILE | Mesh And File Formats | STL, 3MF, OBJ, mesh geometry, manifold topology, mesh repair, export settings |
| SLIC | Slicing And Toolpaths | Slicer software, G-code, layer height, infill, walls, supports, retraction, temperature, adhesion, modern slicers, variable/adaptive layer height, specialized print modes |
| HARD | Printer Hardware And Modern Tech | FDM printer anatomy, motion systems, hotends, extruders, bed leveling, modern features (Klipper, input shaping, Wi-Fi, AI failure detection, multi-material, IDEX, toolchangers, enclosures, printer ecosystems) |
| MAT | Materials Science | Polymer science, thermoplastic and resin material families, mechanical properties, data sheets, composite filaments |
| RESN | Resin Printer Operation | Resin printer hardware and operating workflow including LCD/light source, vat, exposure, wash and cure, IPA handling, resin PPE |
| DFAM | Design For AM And Metrology | DfAM principles, overhangs, orientation, support minimization, tolerances, lattice/topology/generative design, dimensional accuracy, GD&T, calipers, micrometers, calibration cube, QC |
| TROB | Troubleshooting And Post-Processing | Diagnostic workflow, common failure modes, support removal, sanding, painting, annealing, smoothing, joining |
| SAFE | Safety, Ethics, And Sustainability | Workshop safety, fume/UFP exposure, ventilation, fire safety, resin disposal, recycling, IP, licenses, ethical use |
| WORK | Digital Workflows And Careers | File naming, version control, print farms, queue management, cloud slicing, manufacturing career clusters, certifications, articulation, ABET alignment, apprenticeships |
| AIAM | AI In Additive Manufacturing | AI/ML foundations (computer vision, ML basics, neural networks), vision-based print monitoring (first-layer check, spaghetti detection, Obico, Bambu AI, time-lapse, defect classification, auto-pause), ML-driven process optimization (predictive maintenance, AI slicer tuning), generative AI for design and materials (text-to-CAD, AI material recommender), AI tutoring and troubleshooting assistants, edge AI, synthetic training data, AI ethics, and hallucination risks |

## Approximate distribution

| TaxonomyID | Concept Count | Percentage |
|---|---|---|
| FOUND | 8 | 2.7% |
| HIST | 10 | 3.4% |
| STND | 10 | 3.4% |
| PROC | 20 | 6.9% |
| EDP | 16 | 5.5% |
| CAD | 19 | 6.5% |
| FILE | 9 | 3.1% |
| SLIC | 29 | 10.0% |
| HARD | 52 | 17.8% |
| MAT | 24 | 8.2% |
| RESN | 10 | 3.4% |
| DFAM | 20 | 6.9% |
| TROB | 19 | 6.5% |
| SAFE | 13 | 4.5% |
| WORK | 12 | 4.1% |
| AIAM | 21 | 7.2% |
| **Total** | **292** | **100.0%** |

See [taxonomy-distribution.md](./taxonomy-distribution.md) for the authoritative breakdown.
