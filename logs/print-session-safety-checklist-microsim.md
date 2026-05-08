# MicroSim Log: print-session-safety-checklist

**Date:** 2026-05-08  
**Chapter:** 09 — Safety, Ethics, and Sustainability in 3D Printing  
**Sim ID:** print-session-safety-checklist  
**Library:** Custom HTML/DOM  
**Bloom Level:** Evaluate (L5) — Assess  
**Canvas Height:** 620px  

## Summary

Interactive pre-print safety checklist organized into four risk category cards. Students answer Yes/No/N/A for each question; cards update their risk badge dynamically and an overall session readiness indicator drives a go/no-go decision.

## Implementation Notes

- **4 CARDS** in a 2×2 grid: Fume & Particle Risk (3 Qs), Fire Safety (4 Qs), Chemical Safety/Resin (4 Qs), IP & Ethical Use (3 Qs)
- **Radio buttons** (Yes / No / N/A) per question; selection persists in `answers{}` object
- **Card risk logic**: 0 No → low, 1 No → medium, 2+ No → high, unanswered → grey
- **Overall readiness banner**: Answer All Questions / ✓ Ready to Print / ⚠ Review Required / ⛔ Do Not Start
- **Why? toggle**: amber-bordered explanation box expands inline per question
- **Scenario presets**: dropdown with 4 options (Custom, ABS Unventilated, PLA Ventilated Lab, Resin Home Use) — prefills relevant answers
- **Reset button** clears all answers back to null
- DOM-based (not p5.js); `document.addEventListener('DOMContentLoaded', ...)` pattern

## Files Created/Modified

- `docs/sims/print-session-safety-checklist/print-session-safety-checklist.js` (created, ~229 lines)
- `docs/sims/print-session-safety-checklist/main.html` (updated from scaffold)
- `docs/sims/print-session-safety-checklist/index.md` (status→implemented, height→622)
- `docs/sims/print-session-safety-checklist/print-session-safety-checklist.png` (screenshot)

## Visual Review

Screenshot shows clean 2×2 card grid with grey headers (unanswered state), scenario dropdown top-left, "Answer All Questions" readiness badge top-right, Reset button. All 14 questions visible with YES/NO/N/A radios and ? buttons. Layout renders correctly at 800px width.
