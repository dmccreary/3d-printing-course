# MicroSim Log: dfam-rules-explorer

**Date:** 2026-05-08  
**Chapter:** 11 — Design for Additive Manufacturing and Metrology  
**Sim ID:** dfam-rules-explorer  
**Library:** p5.js  
**Bloom Level:** Understand (L2) — Explain  
**Canvas Height:** 620px  

## Summary

Six-card 3×2 grid of DfAM rules with mini cross-section diagrams. Each card expands to full-canvas view with detailed diagram and explanatory text. FDM/Resin toggle updates all content.

## Implementation Notes

- **6 CARDS**: Overhang Angle, Bridging, Wall Thickness, Hole Tolerance, Self-Supporting Arch, Support Minimization
- **Color-coded difficulty**: green header = easy, yellow = moderate, red = requires care
- **Each card**: custom `drawFn(x, y, w, h, mini, fdm)` for diagram — runs in mini mode for grid, full mode for expanded view
- **Overhang card**: 3 triangles at 30°/45°/60° with green/red coding; max angle changes between FDM (45°) and Resin (60°)
- **Bridging card**: good bridge (✓) vs. sagging long bridge with sine curve droop
- **Wall thickness card**: 4 colored bars proportional to wall width
- **Hole tolerance card**: dashed blue "Design" circle + smaller orange "Actual" circle with dimension labels
- **Arch card**: flat-top hole (red dashed) vs. teardrop profile (green)
- **Support minimization**: shelf (red dashed support) vs. chamfered geometry (green)
- **FDM/Resin toggle**: switches text and rule thresholds (e.g., max overhang 45° vs. 60°)
- **Click expand**: fills full canvas with diagram on left, text description on right

## Files Created/Modified

- `docs/sims/dfam-rules-explorer/dfam-rules-explorer.js` (created, ~280 lines)
- `docs/sims/dfam-rules-explorer/main.html` (updated from scaffold)
- `docs/sims/dfam-rules-explorer/index.md` (status→implemented, height→622)
- `docs/sims/dfam-rules-explorer/dfam-rules-explorer.png` (screenshot)

## Visual Review

Screenshot shows clean 3×2 grid with all 6 cards correctly rendered. Overhang triangles color-coded green/green/red at 30°/45°/60°. Bridging shows sagging curve. Wall thickness bars progress from red (too thin) to green. Hole tolerance shows design vs. actual circles. Arch card shows flat vs. teardrop. FDM/Resin buttons top-right.
