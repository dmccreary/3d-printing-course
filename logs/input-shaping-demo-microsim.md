# MicroSim Log: input-shaping-demo

**Date:** 2026-05-08  
**Chapter:** 13 — Modern Hardware — Multi-Material, Motion, and Speed  
**Sim ID:** input-shaping-demo  
**Library:** p5.js  
**Bloom Level:** Understand (L2) — Explain  
**Canvas Height:** 580px  

## Summary

Three-panel interactive demo showing how input shaping and pressure advance affect printed path quality. Left panel has speed slider (50–600 mm/s) and toggle switches. Center shows commanded (blue dashed) vs. actual (orange) path. Right panel shows quality score, ringing indicator, and corner quality.

## Implementation Notes

- **Speed slider**: 50–600 mm/s; deviation model uses `getDeviation(speed)` returning empirical values
- **Input Shaping toggle**: switches between IS-on model (0.02–0.14 mm) and IS-off model (0.04–0.85 mm)
- **Pressure Advance toggle**: reduces quality score by 8 points when disabled
- **Path panel**: draws grid + commanded rectangle (dashed blue) + actual path (orange bezier with sinusoidal ringing that decays after corners)
- **Ringing oscillation**: `sin(t * sq * freq * 0.2) * devPx * exp(-t * 3)` — damped oscillation after each corner
- **Step Through Corner mode**: animates a corner turn frame by frame with pressure advance annotation
- **Quality Score**: 100 - deviation*120 clamped to [0,100], displayed as big number with color-coded bar
- **Metrics**: Ringing (No/Minor/Yes), Corner Quality (Excellent/Good/Moderate/Poor), Deviation in mm
- Toggle switches drawn as pill shapes with circular indicator

## Files Created/Modified

- `docs/sims/input-shaping-demo/input-shaping-demo.js` (created, ~270 lines)
- `docs/sims/input-shaping-demo/main.html` (updated from scaffold)
- `docs/sims/input-shaping-demo/index.md` (status→implemented, height→582)
- `docs/sims/input-shaping-demo/input-shaping-demo.png` (screenshot)

## Visual Review

Screenshot shows 300 mm/s with input shaping ON: orange actual path closely follows dashed blue commanded square, quality score 93/100 (green), "No" ringing, "Excellent" corner quality. Toggle switches clearly show IS=on, PA=on. Speed annotation at bottom of path panel.
