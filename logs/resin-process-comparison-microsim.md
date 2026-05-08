# MicroSim Log: resin-process-comparison

**Date:** 2026-05-08  
**Chapter:** 10 — Resin Printing: SLA, MSLA, and DLP  
**Sim ID:** resin-process-comparison  
**Library:** p5.js  
**Bloom Level:** Analyze (L4) — Compare  
**Canvas Height:** 600px  

## Summary

Three-column side-by-side diagram showing how SLA, DLP, and MSLA each deliver UV light to the resin vat. Students click any column to open a detail panel with specs, pros, and cons.

## Implementation Notes

- **3 columns**: SLA (blue), DLP (amber), MSLA (green) — each fills full canvas height
- **Each column shows**: build platform → cured part → resin vat + curing layer → FEP film → light source
- **SLA light source**: galvanometer mirrors + laser dot, animated scan beam
- **DLP light source**: projector box + DMD chip, animated projection cone
- **MSLA light source**: LCD mask panel + UV LED array, animated pixel grid
- **Animate Layer button**: triggers animation cycle showing each technology's exposure method
- **Detail panel** (right, appears on click): description, 6-row spec table, pros/cons lists
- **Compare button**: opens floating overlay table with all 3 technologies side by side
- `computeLayout()` dynamically adjusts `colW` based on whether detail panel is open

## Files Created/Modified

- `docs/sims/resin-process-comparison/resin-process-comparison.js` (created, ~290 lines)
- `docs/sims/resin-process-comparison/main.html` (updated from scaffold)
- `docs/sims/resin-process-comparison/index.md` (status→implemented, height→602)
- `docs/sims/resin-process-comparison/resin-process-comparison.png` (screenshot)

## Visual Review

Screenshot shows three well-labeled columns with build platform, resin vat, FEP film, and distinct light source elements. DLP projection cone visible in amber. MSLA LCD panel and yellow LED array visible in green column. Animate Layer button top-right. Layout clear at 800px width.
