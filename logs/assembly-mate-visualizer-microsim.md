# assembly-mate-visualizer MicroSim Log

**Sim ID:** assembly-mate-visualizer
**Chapter:** 04 — Computer-Aided Design and Modeling
**Library:** p5.js
**Bloom Level:** Remember / Understand / Apply / Analyze (L1–L4)
**Status:** implemented

## Summary

Interactive assembly constraint visualizer showing two isometric block-shaped
parts. The student applies mate constraints from a palette and watches the
Degrees of Freedom (DOF) counter decrease from 6 to 0.

## Implementation Details

**Canvas layout:** 700 × 560 px (drawHeight=400, controlHeight=160), responsive.

**Key features:**
- Two isometric blocks drawn with `quad()` front/top/right faces:
  - Gray fixed base block (grounded)
  - Blue movable block (lerps toward target as mates are applied)
- 6 mate types in right-panel palette with DOF labels:
  - Coincident (−3 DOF), Concentric (−2 DOF), Distance (−1 DOF),
    Angle (−1 DOF), Parallel (−2 DOF), Fixed (−6 DOF)
- DOF counter prominently displayed (orange text, updates on each click)
- Status badge: UNDER-CONSTRAINED → FULLY CONSTRAINED → OVER-CONSTRAINED
- Hover tooltips on each mate button explaining the constraint
- Animated movable block (`lerp(partOffsetX, targetOffsetX, 0.12)` in draw)
- DOF arrows on movable block fade out as constraints are applied
- Dashed constraint line appears between parts when mates are active
- Applied mates list (last 4 shown + overflow count)
- Reset button clears all mates and resets position

## Layout Fix Applied

Initial screenshot showed movable block overlapping the mate palette.
Fixed by moving `cx` (assembly center) from `canvasWidth * 0.38` to
`canvasWidth * 0.28`, and moved palette label `py` from 80 to 96 to
clear the status badge.

## Files Created / Modified

- `docs/sims/assembly-mate-visualizer/assembly-mate-visualizer.js` — created
- `docs/sims/assembly-mate-visualizer/main.html` — updated (real implementation)
- `docs/sims/assembly-mate-visualizer/assembly-mate-visualizer.png` — screenshot
- `docs/sims/assembly-mate-visualizer/index.md` — status/bloom/iframe height updated
