# MicroSim Log: ai-in-am-pipeline

**Date:** 2026-05-08  
**Chapter:** 15 — AI and Machine Learning in Additive Manufacturing  
**Sim ID:** ai-in-am-pipeline  
**Library:** p5.js  
**Bloom Level:** Analyze (L4) — Organize  
**Canvas Height:** 600px  

## Summary

Horizontal pipeline diagram with four stages (Design → Slicing → Printing → Post-Processing) and 8 AI application nodes placed above/below the pipeline at their relevant stage. Click any node to open a detail panel showing data input, AI output, limitation/hallucination risk, and a real-world product example. Filter buttons highlight node types; "Most AI-Intensive Stage" button animates an amber overlay on the Printing stage.

## Implementation Notes

- **Pipeline bar**: rounded rect across the canvas with colored stage sections and triangle arrows between stages
- **Node layout**: `computeLayout()` groups nodes by `(stage, above)` key and spreads them horizontally when multiple nodes share a stage/position using `(idx / (count - 1) - 0.5) * spread` offset
- **Connector lines**: drawn from node edge to stage x on pipeline (above=pipelineY, below=pipelineY+pipelineH)
- **Filter dimming**: `alpha` set to 40 for non-matching nodes; 170 for matching; 230 for selected/hovered
- **Detail panel**: 230px right sidebar, color-coded header matching node type; 4 labeled sections (Input/Output/Limitation/Example) with distinct colors
- **Highlight overlay**: amber semi-transparent rect over Printing stage with animated fade-in (`highlightAnim` counter); text describes why Printing has the most AI applications (4 of 8)
- **Text fix**: `text(label, pos.x - (pos.w-6)/2, pos.y - pos.h/2 + 2, pos.w - 6, pos.h - 4)` — bounding box left-aligned from center to properly center text within node

## Files Created/Modified

- `docs/sims/ai-in-am-pipeline/ai-in-am-pipeline.js` (created, ~300 lines)
- `docs/sims/ai-in-am-pipeline/main.html` (updated from scaffold to p5.js CDN)
- `docs/sims/ai-in-am-pipeline/index.md` (status→implemented, height→602, scrolling="no")
- `docs/sims/ai-in-am-pipeline/ai-in-am-pipeline.png` (screenshot)

## Visual Review

Screenshot shows horizontal pipeline with Design (blue), Slicing (green), Printing (amber), Post-Processing (purple) stage labels. 8 nodes visible: Text-to-CAD (blue, Design above), Material Recommender (amber, Design below), AI Slicer Optimizer (amber, Slicing above), First-Layer Vision AI (green, Printing above-left), Spaghetti Detection (green, Printing above-right), Predictive Maintenance (green, Printing below-left), Defect Classification (green, Printing below-right), Dimensional AI Inspection (green, Post-Processing above). All labels fully readable. Filter buttons and highlight button functional.
