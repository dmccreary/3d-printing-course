# MicroSim Log: calibration-measurement-sim

**Date:** 2026-05-08  
**Chapter:** 11 — Design for Additive Manufacturing and Metrology  
**Sim ID:** calibration-measurement-sim  
**Library:** p5.js  
**Bloom Level:** Apply (L3) — Calculate  
**Canvas Height:** 580px  

## Summary

Three-panel calibration cube simulator. Left: isometric cube with clickable X/Y/Z faces. Center: animated digital caliper with jaw gap and LCD display. Right: measurement table showing designed vs. measured values, error, and pass/fail status.

## Implementation Notes

- **3 scenarios**: Good Printer (all pass), Under-Extrusion (consistent −0.26 mm), Z-Axis Problem (Z only −0.40 mm)
- **Isometric cube**: painted with three visible faces (X=blue, Y=amber, Z=green); click any face to select that axis
- **Caliper panel**: sliding jaw position proportional to measured value; green LCD display showing reading to 2 decimal places; dimension bracket annotation
- **Measurement table**: 3-row table with Designed/Measured/Error/Status columns; rows highlight when selected; errors color-coded red/green
- **Scenario summary**: description below table identifies root cause (under-extrusion vs. Z issue)
- **E-Step Correction button**: shows correction factor formula with current measurements
- `getCubeArea()`, `getCaliperArea()`, `getTableArea()` calculate panel bounds dynamically
- `drawIsoCube()` uses standard isometric projection: `x * 0.866`, `y * 0.5` offsets

## Files Created/Modified

- `docs/sims/calibration-measurement-sim/calibration-measurement-sim.js` (created, ~300 lines)
- `docs/sims/calibration-measurement-sim/main.html` (updated from scaffold)
- `docs/sims/calibration-measurement-sim/index.md` (status→implemented, height→582)
- `docs/sims/calibration-measurement-sim/calibration-measurement-sim.png` (screenshot)

## Visual Review

Screenshot shows three panels cleanly arranged. Isometric cube in left panel with X face highlighted (blue). Caliper center panel showing 19.97 mm on large green LCD. Right panel shows measurement table with all three axes passing (Good Printer scenario). Scenario selector buttons at top.
