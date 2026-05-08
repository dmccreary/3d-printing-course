# sketch-constraint-explorer MicroSim Log

**Sim ID:** sketch-constraint-explorer
**Chapter:** 04 — Computer-Aided Design and Modeling
**Library:** p5.js
**Bloom Level:** Remember / Understand / Apply (L1–L3)
**Status:** implemented

## Summary

Interactive 2D sketch constraint explorer. An L-shaped profile floats
(under-constrained) until the student applies geometric and dimensional
constraints that reduce degrees of freedom from 7 to 0 (fully constrained),
then turns red if over-constrained.

## Implementation Details

**Canvas layout:** 700 × 560 px (drawHeight=460, controlH=100), responsive.

**Key features:**
- L-shape sketch profile (6 segments, 160×158 px) on grid background
- Float animation: shape oscillates when under-constrained; motion amplitude
  scales with dof/7 so it lessens as constraints are applied
- Line color: blue (under), black (fully), red (over-constrained)
- Status badge at top with DOF count
- Constraint palette (right panel):
  - Geometric: Fix Origin (−2), Horizontal (−1), Vertical (−1),
    Perpendicular (−1), Equal (−1)
  - Dimensional: Add Dimension (−1)
- Hover tooltips on each constraint button
- Constraint symbols drawn on sketch (⟷ horizontal, ↕ vertical, origin pin,
  ⊓ perpendicular tick marks)
- Dimension annotations appear when fully constrained
- Applied constraints row at bottom showing last 5 applied

## Layout Fix Applied

Initial screenshot showed "Constraint Palette" label overlapping the status
badge (which extends to y=52). Fixed by moving palette py from 58 to 78,
putting the label at y=58 (clear of badge).
Also scaled L_PTS from 90×88 to 160×158 for better visibility.

## Files Created / Modified

- `docs/sims/sketch-constraint-explorer/sketch-constraint-explorer.js` — created
- `docs/sims/sketch-constraint-explorer/main.html` — updated (real implementation)
- `docs/sims/sketch-constraint-explorer/sketch-constraint-explorer.png` — screenshot
- `docs/sims/sketch-constraint-explorer/index.md` — status/bloom/iframe height updated
