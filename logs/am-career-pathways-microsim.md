# MicroSim Log: am-career-pathways

**Date:** 2026-05-08  
**Chapter:** 16 — Digital Workflows, Careers, Articulation, and the Capstone Project  
**Sim ID:** am-career-pathways  
**Library:** p5.js  
**Bloom Level:** Evaluate (L5) — Recommend  
**Canvas Height:** 620px  

## Summary

4-pathway career tree diagram from a central "HS AM Course Complete" node. Four horizontal pathways (Direct Employment, Community College, Certification Track, Apprenticeship) each contain 3 progressive role nodes with salary tags. Filter buttons highlight the most relevant pathways for 4 personal goals. A Salary Range Chart overlay compares salary tiers across all four tracks. Clicking any node opens a detail panel with role description, employers, skills, credential, and timeline/salary data.

## Implementation Notes

- **Layout**: `getLayout()` recomputes `drawW` dynamically based on whether a detail panel is selected; 4 rows distributed from y=100 to y=600, 3 columns per row at x fractions 0.24, 0.50, 0.76
- **Center node**: Fixed blue box at `ctrX = drawW * 0.07`, `ctrY` = vertical center — connecting lines fan out to each pathway's first node
- **Pathway labels**: Italic italic label above each pathway's first node row
- **Goal filter**: `filterGoal` index 0–4; `path.goals` array holds the goal indices that pathway serves. Non-matching pathways dim to alpha=45
- **Salary tags**: Small text below each node showing salary range string
- **Salary chart**: Full-canvas overlay with horizontal bars grouped by tier (Entry/Mid/Senior), one bar per pathway per tier; X-axis from $0K to $110K with gridlines
- **Detail panel**: 218px right panel with 5 labeled sections (Role, Employers, Key Skills, Credential, Timeline/Salary); color-coded section headers per pathway color

## Files Created/Modified

- `docs/sims/am-career-pathways/am-career-pathways.js` (created, ~310 lines)
- `docs/sims/am-career-pathways/main.html` (updated from scaffold to p5.js CDN)
- `docs/sims/am-career-pathways/index.md` (status→implemented, height→622, scrolling="no")
- `docs/sims/am-career-pathways/am-career-pathways.png` (screenshot)

## Visual Review

Screenshot shows title "AM Career Pathway Navigator", goal filter buttons (All Pathways, Fastest Income, Top Earnings, College Prep, Hands-On), salary chart button. Central dark blue "HS AM Course Complete" box on left. Four horizontal rows with pathway labels in italic:
- Direct Employment (orange): AM Operator → Senior Technician → Process Engineer
- Community College (blue): AAS Student → Manufacturing Engr → AM Applications Engr
- Certification Track (green): NC3/NIMS Cert → Industry Credential → Specialized Roles
- Apprenticeship (purple): Registered Apprentice → Journeyperson → Lead Technician

All salary tags visible below each node. All arrows and connecting lines clear. Layout clean and readable.
