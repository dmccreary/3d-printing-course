---
title: AI in AM Pipeline Explorer
description: Students organize AI applications in additive manufacturing by their stage in the production pipeline and analyze what data each system needs and what output it provides.
status: scaffold
library: p5.js
bloom_level: Analyze (L4)
---

# AI in AM Pipeline Explorer

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students organize AI applications in additive manufacturing by their stage in the production pipeline and analyze what data each system needs and what output it provides.

- **Bloom Level:** Analyze (L4)
- **Bloom Verb:** Organize
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 15: AI and Machine Learning in Additive Manufacturing](../../chapters/15-ai-and-machine-learning/index.md).

```text
Type: diagram
**sim-id:** ai-in-am-pipeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Analyze (L4)
Bloom Verb: Organize
Learning Objective: Students organize AI applications in additive manufacturing by their stage in the production pipeline and analyze what data each system needs and what output it provides.

Visual layout:
- Horizontal pipeline with four stages: Design → Slicing → Printing → Post-Processing
- AI application nodes placed above or below the pipeline at their relevant stage:
  - Design: Text-to-CAD, Material Recommender
  - Slicing: AI Slicer Optimizer
  - Printing: First-Layer Vision, Spaghetti Detection, Predictive Maintenance, Defect Classification
  - Post-Processing: Dimensional AI Inspection
- Each node is a rounded rectangle; arrows connect nodes to their pipeline stage

Interactive elements:
- Click any AI node: Expand info panel showing (a) what data input the system needs, (b) what output it produces, (c) what can go wrong (limitation/hallucination risk), (d) a real-world example tool or product
- Hover any arrow from node to pipeline: Tooltip shows what the AI "hands off" to the human or next system
- Filter button "Show only monitoring" or "Show only generative" — highlights relevant nodes and dims others
- "Which stage is most AI-intensive?" button: triggers an animation that highlights the Printing stage with a "most applications" label and explanation

Color coding:
- Blue nodes: generative AI (creates something new)
- Green nodes: monitoring/detection AI (observes and flags)
- Orange nodes: optimization AI (improves parameters)
- Yellow nodes: educational/assistive AI

Canvas: 700×400px main area + 250px right info panel
Responsive: pipeline changes from horizontal to vertical on narrow screens.
```

## Related Resources

- [Chapter 15: AI and Machine Learning in Additive Manufacturing](../../chapters/15-ai-and-machine-learning/index.md)
