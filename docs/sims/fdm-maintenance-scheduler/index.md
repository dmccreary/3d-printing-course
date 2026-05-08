---
title: Maintenance Schedule Interactive Checklist
description: Students use a structured maintenance checklist to develop habits for keeping an FDM printer running reliably, and connect each task to a mechanical reason.
status: scaffold
library: p5.js
bloom_level: Apply (L3)
---

# Maintenance Schedule Interactive Checklist

!!! warning "Scaffold"
    This MicroSim has been scaffolded from its specification. The interactive
    implementation has not been built yet.

## Learning Objective

Students use a structured maintenance checklist to develop habits for keeping an FDM printer running reliably, and connect each task to a mechanical reason.

- **Bloom Level:** Apply (L3)
- **Bloom Verb:** Use
- **Library:** p5.js

## Preview

<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: FDM Printer Hardware and Operation](../../chapters/08-fdm-printer-hardware/index.md).

```text
Type: infographic
**sim-id:** fdm-maintenance-scheduler<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Level: Apply (L3)
Bloom Verb: Use
Learning Objective: Students use a structured maintenance checklist to develop habits for keeping an FDM printer running reliably, and connect each task to a mechanical reason.

Layout:
- Left column: Frequency tabs — "After Each Print", "Monthly", "As-Needed"
- Right panel: Checklist items with checkboxes, task name, time estimate, and a "Why?" expand button

Interactive elements:
- Clicking a tab shows the relevant maintenance tasks
- Each task has a checkbox (toggles checked/unchecked with visual feedback)
- "Why?" button next to each task expands a 2-sentence explanation of what goes wrong if the task is skipped
- Progress bar at top shows "X of Y tasks checked for this period"
- "Reset Checklist" button clears all checks with confirmation dialog

Visual style:
- Clean card layout, each task on a card with an icon (wrench, oil drop, spring, etc.)
- Checked tasks show a green checkmark overlay
- Overdue indicator (red dot) appears on tasks that haven't been checked in a simulated period

Data:
After-each-print tasks: Clean build surface, inspect first layer, check filament path for tangles
Monthly tasks: Belt tension check (twang test), Z screw lubrication, linear rod lubrication, pulley set screw check, extruder gear cleaning, E-step verification
As-needed tasks: Nozzle cold pull, nozzle replacement, bed leveling re-calibration, firmware update check

Responsive: horizontal layout collapses to vertical tabs on narrow screens; minimum width 280px.
```

## Related Resources

- [Chapter 8: FDM Printer Hardware and Operation](../../chapters/08-fdm-printer-hardware/index.md)
