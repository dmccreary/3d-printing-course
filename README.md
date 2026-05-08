[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/3d-printing-course/)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

# Introduction to 3D Printing

## View the Live Site

Visit the published textbook at [dmccreary.github.io/3d-printing-course](https://dmccreary.github.io/3d-printing-course/).

## Overview

This project is an interactive intelligent textbook for high-school students learning additive manufacturing. It covers the history of 3D printing, ISO/ASTM 52900 process families, CAD, slicing, FDM and resin workflows, materials science, DfAM, troubleshooting, safety, AI in additive manufacturing, and college-credit or workforce pathways.

The book is built with MkDocs Material and combines long-form chapter content with quizzes, a glossary, an FAQ, a teacher's guide, a 292-concept learning graph, and a large catalog of browser-based MicroSims.

## Branch Layout

This repository uses two branches for two different purposes:

- `main`: default GitHub branch and source authoring branch, with `mkdocs.yml`, `docs/`, plugins, CSS, JavaScript, and learning-graph source artifacts
- `gh-pages`: published build output served by GitHub Pages

If you are editing content, work from `main`. If you are inspecting the deployed site artifacts, you are likely on `gh-pages`.

## Source Status

The latest source on `origin/main` currently includes:

| Metric | Count |
|--------|------:|
| Chapters | 16 |
| Chapter quizzes | 16 |
| Chapter references pages | 16 |
| Quiz questions | 160 |
| Learning-graph concepts | 292 |
| Glossary terms | 292 |
| FAQ entries | 81 |
| MicroSims with `index.md` | 47 |
| Planned MicroSim TODO specs | 45 |
| Markdown files under `docs/` | 122 |
| Images and icons under `docs/` | 41 |
| Student-facing word count | 91,842 |
| Chapter-only word count | 82,057 |
| Diagrams | 50 |

Quality and course-structure signals from the current source:

- Course description assessment: `100 / 100` on `2026-05-07`
- Learning graph: `292` concepts, `470` dependency edges, valid DAG, `0` cycles, `0` orphaned nodes
- Chapter sequence: 16 chapters spanning foundations, CAD, materials, slicing, printer hardware, resin printing, DfAM, troubleshooting, modern hardware, AI, and careers/capstone

## Toolchain

The latest `mkdocs.yml` on `origin/main` defines:

- `mkdocs-material` theme
- Plugins: `search`, `social`, `glightbox`
- Markdown features: admonitions, tables, footnotes, `pymdownx` extensions, KaTeX support
- Custom assets: `docs/css/extra.css`, `docs/css/mascot.css`, `docs/javascripts/katex.js`
- Build hook: `docs/plugins/social_override.py`
- Google Analytics property: `G-0GVHRS0Y5Y`

## Getting Started

### Clone the repository

```bash
git clone https://github.com/dmccreary/3d-printing-course.git
cd 3d-printing-course
```

### Work on the source branch

```bash
git switch main
```

The source branch contains `mkdocs.yml` and the full `docs/` tree. The `gh-pages` branch does not.

### Install documentation dependencies

```bash
pip install mkdocs mkdocs-material "mkdocs-material[imaging]" mkdocs-glightbox
```

### Run the book locally

```bash
mkdocs serve
```

Then open `http://localhost:8000`.

### Publish updates

If your workflow uses MkDocs deployment directly:

```bash
mkdocs gh-deploy
```

If you use a custom deploy flow, keep `main` as the authoring source and `gh-pages` as the generated output branch.

## Repository Structure

```text
3d-printing-course/
├── mkdocs.yml                        # Source-site configuration on main
├── docs/                             # Source content on main
│   ├── index.md
│   ├── about.md
│   ├── course-description.md
│   ├── chapters/
│   │   ├── 01-foundations-and-history/
│   │   ├── ...
│   │   └── 16-careers-and-capstone/
│   ├── sims/                         # 47 MicroSims plus TODO specs
│   ├── learning-graph/               # Graph data, reports, scripts
│   ├── glossary.md
│   ├── faq.md
│   ├── teachers-guide.md
│   ├── css/
│   ├── javascripts/
│   └── plugins/
├── index.html                        # Published output on gh-pages
├── chapters/                         # Rendered pages on gh-pages
├── sims/                             # Rendered MicroSim pages on gh-pages
├── learning-graph/                   # Rendered reports and graph assets
└── README.md
```

## What Students Get

- 16 sequenced chapters written for grades 10-12
- Embedded MicroSims for core concepts
- Chapter quizzes and curated references
- A 292-term glossary
- An 81-entry FAQ
- A teacher's guide for classroom use
- A concept dependency graph and supporting reports

## Reporting Issues

Open issues at [github.com/dmccreary/3d-printing-course/issues](https://github.com/dmccreary/3d-printing-course/issues).

Include:

- the branch you were using: `main` or `gh-pages`
- the page, file, or MicroSim name
- expected behavior vs. actual behavior
- screenshots if the issue is visual

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en).

See the published license page at [dmccreary.github.io/3d-printing-course/license](https://dmccreary.github.io/3d-printing-course/license/).

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)
