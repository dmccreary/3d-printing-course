# MicroSim Log: z-offset-calibration-sim

**Date:** 2026-05-08  
**Chapter:** 08 — FDM Printer Hardware and Operation  
**Sim ID:** z-offset-calibration-sim  
**Library:** p5.js  
**Bloom Level:** Apply (L3) — Demonstrate  
**Canvas Height:** 540px  

## Summary

Interactive cross-section simulator showing the relationship between Z-offset value and first-layer bead shape. The slider controls nozzle height relative to the build surface; the cross-section view updates in real time.

## Implementation Notes

- **Top (70px):** Z-offset slider from -2.50 to +0.50mm; current value label
- **Center (290px):** Cross-section view — nozzle trapezoid, squished/round bead ellipse, build surface, gap dimension annotation
- **Grade banner (40px):** Color-coded badge: Excellent/Good/Slightly High/Too Close/Nozzle Crash
- **Thumbnails (140px):** Four fixed-z reference cards (Too Far, Slight High, Correct, Too Close) with highlighted border on active range

Bead shape uses approximate area conservation: `beadWidth = (NOZZLE_R² × 4) / beadHeight` so bead flattens correctly as gap decreases.

## Files Created/Modified

- `docs/sims/z-offset-calibration-sim/z-offset-calibration-sim.js` (created, ~180 lines)
- `docs/sims/z-offset-calibration-sim/main.html` (updated from scaffold)
- `docs/sims/z-offset-calibration-sim/index.md` (status→implemented, height→542)
- `docs/sims/z-offset-calibration-sim/z-offset-calibration-sim.png` (screenshot)

## Visual Review

Screenshot shows: nozzle at -1.00mm default, green squished bead visible, "Excellent" green grade badge, four thumbnail cards with "Correct" highlighted. Layout clean and clear.
