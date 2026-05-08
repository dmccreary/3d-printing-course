# MicroSim Log: modern-printer-comparison

**Date:** 2026-05-08  
**Chapter:** 13 — Modern Hardware — Multi-Material, Motion, and Speed  
**Sim ID:** modern-printer-comparison  
**Library:** p5.js  
**Bloom Level:** Analyze (L4) — Compare  
**Canvas Height:** 600px  

## Summary

Side-by-side schematic comparison of Bed-Slinger and CoreXY printer architectures. Shows how each axis moves, labels mass-critical components, and provides animated move visualization at three speed levels.

## Implementation Notes

- **Left panel (Bed-Slinger)**: Frame + heated bed (Y axis, red, ~500g) + X gantry + print head; `bedYFrac` drives bed Y position in animation
- **Right panel (CoreXY)**: Enclosed frame + crossed belt routing (dashed blue X) + XY print head + Z-only bed (green)
- **3 speed buttons**: Slow (60 mm/s) / Medium (300 mm/s) / Fast (500 mm/s) — at 500 mm/s, bed-slinger shows yellow warning; CoreXY shows green "Clean print" badge
- **Animate Move button**: sets `animating=true`, drives sinusoidal bedYFrac/headXFrac/headYFrac with `animFrame`
- **Click to select**: clicking on components opens info panel on right with mass label and description from `COMPONENTS` dictionary
- **COMPONENTS dict**: 10 entries (5 per printer type) with label, mass, col, and desc fields
- `drawArrow()` helper draws line + filled arrowhead using `atan2()` for angle

## Files Created/Modified

- `docs/sims/modern-printer-comparison/modern-printer-comparison.js` (created, ~290 lines)
- `docs/sims/modern-printer-comparison/main.html` (updated from scaffold)
- `docs/sims/modern-printer-comparison/index.md` (status→implemented, height→602)
- `docs/sims/modern-printer-comparison/modern-printer-comparison.png` (screenshot)

## Visual Review

Screenshot shows bed-slinger (red header) with gantry, print head, and labeled heated bed ("Y: BED MOVES", ~500g + print); CoreXY (green header) with crossed belt lines and Z-only bed. Speed buttons top-right, Animate Move top-left. Medium (300 mm/s) speed selected. Layout clear at 800px width.
