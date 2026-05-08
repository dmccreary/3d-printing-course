# MicroSim Log: resin-exposure-explorer

**Date:** 2026-05-08  
**Chapter:** 10 — Resin Printing: SLA, MSLA, and DLP  
**Sim ID:** resin-exposure-explorer  
**Library:** p5.js  
**Bloom Level:** Apply (L3) — Demonstrate  
**Canvas Height:** 560px  

## Summary

Interactive cross-section simulator showing how UV exposure time affects cure depth and lateral bleed (elephant's foot) in resin printing. Students adjust two sliders (normal and bottom layer exposure) and observe the cured zone grow in real time.

## Implementation Notes

- **Cross-section view (310px):** LCD panel at top → UV rays → uncured resin (teal) → cured zone (dark teal) → FEP film
- **Cure depth model:** `cureDepthUm = CURE_SCALE * sqrt(exp - threshold)`, scaled to px
- **Bleed model:** proportional to exposure beyond optimal range, shown in orange
- **Dashed target outline:** shows ideal pixel boundary for reference
- **Normal/Bottom toggle buttons:** switch which exposure scenario is visualized
- **Status bar:** Under-cured / Marginal / Optimal / Over-cured badge + explanatory text
- **"Show Print Effect" button:** reveals schematic of base layers with bleed exaggeration
- Cure depth bracket annotation on left side; bleed bracket below cured zone

## Files Created/Modified

- `docs/sims/resin-exposure-explorer/resin-exposure-explorer.js` (created, ~240 lines)
- `docs/sims/resin-exposure-explorer/main.html` (updated from scaffold)
- `docs/sims/resin-exposure-explorer/index.md` (status→implemented, height→562)
- `docs/sims/resin-exposure-explorer/resin-exposure-explorer.png` (screenshot)

## Visual Review

Screenshot shows clear cross-section with LCD panel, active pixel column, large cured teal zone at 2.0s default, "Optimal" green status badge, and "Show Print Effect" button. Cure depth bracket and µm readout visible. Layout clean at 800px width.
