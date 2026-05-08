# MicroSim Log: filament-lifecycle-explorer

**Date:** 2026-05-08  
**Chapter:** 09 — Safety, Ethics, and Sustainability in 3D Printing  
**Sim ID:** filament-lifecycle-explorer  
**Library:** p5.js  
**Bloom Level:** Analyze (L4) — Examine  
**Canvas Height:** 580px  

## Summary

Circular flow diagram showing the full lifecycle of a 3D-printed filament part from raw material to end-of-life. Students can click any of the 11 lifecycle nodes to see environmental impact data.

## Implementation Notes

- **11 nodes:** Raw Material → Pellet Production → Filament Extrusion → Spool & Shipping → FDM Printer → Finished Part → End of Life → (Landfill, Recycled, Compost, Repurposed)
- **10 directed edges** with material flow labels
- **Material filter buttons** (PLA/PETG/ABS) at top-right
- **Detail panel** (right 38%): shows node name, description, and per-material impact bullets
- **Legend** at bottom of detail panel showing color coding

Color coding: green=sustainable, blue=industrial process, purple=end-of-life hub, red=landfill.

## Files Created/Modified

- `docs/sims/filament-lifecycle-explorer/filament-lifecycle-explorer.js` (created, ~230 lines)
- `docs/sims/filament-lifecycle-explorer/main.html` (updated from scaffold)
- `docs/sims/filament-lifecycle-explorer/index.md` (status→implemented, height→582)
- `docs/sims/filament-lifecycle-explorer/filament-lifecycle-explorer.png` (screenshot)

## Visual Review

Screenshot shows clean circular flow diagram with colored nodes, labeled arrows, and right detail panel with prompt. Layout is well-organized across 800px canvas width.
