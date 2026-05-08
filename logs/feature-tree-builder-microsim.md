# feature-tree-builder MicroSim Log

**Sim ID:** feature-tree-builder
**Chapter:** 04 — Computer-Aided Design and Modeling
**Library:** p5.js
**Bloom Level:** Apply / Analyze (L3–L4)
**Status:** implemented

## Summary

Interactive parametric feature tree builder. Student adds CAD features
(Extrude Cut, Fillet, Shell, Linear Pattern) to a base boss and watches
the isometric 3D part update in real time. A target bracket thumbnail
challenges students to match the geometry by choosing the correct feature
order.

## Implementation Details

**Canvas layout:** 700 × 560 px (drawHeight=480, controlH=80), responsive.

**Key features:**
- Left panel: feature tree list with colored swatches, ✦ lock on base feature
  - ↑ / ↓ reorder buttons; × delete button on each non-fixed feature
  - Add Feature dropdown (createSelect) for Extrude Cut, Fillet, Shell, Lin. Pattern
- Right panel: isometric 3D block rendered with quad() for front/top/right faces
  - Cuts: dark ellipses + depth lines on top face
  - Fillet: bright edge accent lines on vertical corners
  - Shell: hollow rectangle on top face
  - Linear Pattern: dashed grid lines on top face
- Target thumbnail (green mini-block with 2 holes) in top-right corner
- ⇌ Compare to Target: split-view side-by-side compare mode
- Tree validation: fillet-before-cut triggers ⚠ rebuild error highlight
- Status line: ✓ valid or ⚠ rebuild error message

## Files Created / Modified

- `docs/sims/feature-tree-builder/feature-tree-builder.js` — created
- `docs/sims/feature-tree-builder/main.html` — updated (real implementation)
- `docs/sims/feature-tree-builder/feature-tree-builder.png` — screenshot
- `docs/sims/feature-tree-builder/index.md` — status/bloom/iframe height updated
