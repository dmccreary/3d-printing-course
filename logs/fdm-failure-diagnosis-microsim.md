# MicroSim Log: fdm-failure-diagnosis

**Date:** 2026-05-08  
**Chapter:** 12 — Print Failures, Troubleshooting, and Post-Processing  
**Sim ID:** fdm-failure-diagnosis  
**Library:** p5.js  
**Bloom Level:** Evaluate (L5) — Judge  
**Canvas Height:** 640px  

## Summary

Interactive decision tree for diagnosing FDM print failures. Students navigate from the root question ("Where does the failure appear?") through branching questions to a leaf node showing the failure name, root cause, numbered fix list, and relevant slicer settings.

## Implementation Notes

- **17 NODES**: 5 branch nodes (blue) + 12 leaf nodes (green/red for safety issues)
- **4 root categories**: First Layer / All Layers / Specific Geometry / Mid-Print
- **12 failure diagnoses**: Poor Bed Adhesion, Elephant's Foot, Warping, Under-Extrusion, Over-Extrusion, Layer Separation, Overhang Quality, Ringing/Ghosting, Stringing, Nozzle Clog, Mid-Print Adhesion, Thermal Runaway
- **Safety-flagged nodes**: Layer Separation, Nozzle Clog, Thermal Runaway rendered with red headers
- **Breadcrumb trail**: top bar shows path taken; "Start Over" button resets
- **Choice buttons**: color-coded by destination type (green=diagnosis, blue=more questions); show "Diagnosis available" or "N more options →"
- **Leaf node**: Root Cause + numbered Fix list + Slicer Setting badge + optional Safety Note
- **Back button**: pops breadcrumb to return to parent node
- `nodeMap` dictionary keyed by ID for O(1) node lookup

## Files Created/Modified

- `docs/sims/fdm-failure-diagnosis/fdm-failure-diagnosis.js` (created, ~290 lines)
- `docs/sims/fdm-failure-diagnosis/main.html` (updated from scaffold)
- `docs/sims/fdm-failure-diagnosis/index.md` (status→implemented, height→642)
- `docs/sims/fdm-failure-diagnosis/fdm-failure-diagnosis.png` (screenshot)

## Visual Review

Screenshot shows root node with question "Where does the failure appear?" in blue box, four large choice buttons below with "3 more options →" labels. Root breadcrumb chip top-left, Start Over button top-right. Clean layout at 800px width.
