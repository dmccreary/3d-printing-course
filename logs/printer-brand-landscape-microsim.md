# MicroSim Log: printer-brand-landscape

**Date:** 2026-05-08  
**Chapter:** 14 — The Modern 3D Printing Ecosystem  
**Sim ID:** printer-brand-landscape  
**Library:** p5.js  
**Bloom Level:** Analyze (L4) — Compare  
**Canvas Height:** 600px  

## Summary

Radar chart comparing 5 printer brands (Bambu Lab, Prusa, Creality, Elegoo Resin, Snapmaker) across 6 axes: Price Value, Print Speed, Ease of Use, Open Source, Community Support, Material Compatibility. Use Case selector highlights recommended brands.

## Implementation Notes

- **Radar grid**: 5 concentric hexagons (rings 2–10) + 6 spokes drawn using trigonometry
- **Brand polygons**: each drawn with `beginShape()/endShape(CLOSE)` using `cos(ai/nAxes * TWO_PI - HALF_PI) * r`
- **Hover detection**: per-brand centroid proximity check within `radarR * 0.3`
- **Use Case selector**: 6 options; when active, `isRec` brands draw at full alpha, others at alpha=35
- **Detail panel**: click/hover opens right panel with per-axis score bars, best-for text, caveat, use-case note
- **Brand legend**: left side, click to toggle visibility (checkbox squares)
- Scores taken from spec verbatim (Bambu=8/10/9/3/7/8, Prusa=7/6/7/10/10/9, etc.)

## Files Created/Modified

- `docs/sims/printer-brand-landscape/printer-brand-landscape.js` (created, ~270 lines)
- `docs/sims/printer-brand-landscape/main.html` (updated from scaffold)
- `docs/sims/printer-brand-landscape/index.md` (status→implemented, height→602)
- `docs/sims/printer-brand-landscape/printer-brand-landscape.png` (screenshot)

## Visual Review

Screenshot shows clear radar chart with 5 colored polygons overlapping. Bambu (blue) extends far right (Print Speed), Prusa (orange) extends far bottom (Open Source/Community), Elegoo (purple) minimal on Material axis. Brand legend top-left, Use Case selector bottom-left. All 6 axis labels visible.
