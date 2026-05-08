# CLAUDE.md — Introduction to 3D Printing Intelligent Textbook

## Project Overview

This is an MkDocs Material intelligent textbook for a high-school (grades 9–12)
introduction to additive manufacturing, designed to align with PLTW engineering
pedagogy, ASTM/ISO 52900 terminology, America Makes workforce competencies, and
community-college articulation pathways.

---

## Pedagogical Mascot: Benchy

### Character Description

**Name:** Benchy
**Species/Type:** Anthropomorphic 3D-printing tugboat — inspired by the classic
3DBenchy calibration model used by the 3D printing community worldwide.
**Appearance:** Bright blue FDM-printed plastic body with subtle visible layer
lines; warm red-orange lower hull; large expressive cartoon face with oversized
blue-and-white eyes, thick eyebrows, and a wide animated smile; flexible
white-gloved cartoon hands on bendable arms emerging from the hull sides;
recognizable intact smokestack.
**Personality:** Enthusiastic, knowledgeable, and encouraging. Benchy has
survived countless calibration prints and speaks from experience. He is never
condescending — he treats every student as a fellow maker. His humor is gentle
and self-deprecating ("I've been printed badly more times than I can count, so
trust me on this one."). He refers to print failures as "learning opportunities"
and celebrates every successful print, no matter how small.
**Catchphrase:** "Let's make something great!"

### Pose Inventory

Seven pose images are available in `docs/img/mascot/`:

| Filename | Admonition class | Role |
|---|---|---|
| `welcome.png` | `mascot-welcome` | Opens each chapter; orients the reader |
| `thinking.png` | `mascot-thinking` | Highlights a key concept, law, or principle |
| `tip.png` | `mascot-tip` | Shares a practical shortcut or pro move |
| `warning.png` | `mascot-warning` | Flags a common mistake or dangerous pitfall |
| `encouraging.png` | `mascot-encouraging` | Supports the reader through a hard section |
| `celebration.png` | `mascot-celebration` | Closes the chapter; celebrates completion |
| `neutral.png` | `mascot-neutral` | General aside or supplemental note |

---

## Mascot Placement Rules for Chapter Content

These rules apply whenever Claude generates or edits chapter content under
`docs/chapters/`. They are mandatory — not suggestions.

### Frequency Limits

| Admonition | Per-chapter target | Hard maximum |
|---|---|---|
| `mascot-welcome` | Exactly 1 | 1 |
| `mascot-thinking` | 1–3 | 3 |
| `mascot-tip` | 0–2 | 2 |
| `mascot-warning` | 0–2 | 2 |
| `mascot-encouraging` | 0–2 | 2 |
| `mascot-celebration` | 0–1 | 1 |
| `mascot-neutral` | 0–1 | 1 |
| **Total per chapter** | **5–6** | **6** |

### Placement Positions

- **`mascot-welcome`** — immediately after the chapter `# Title` heading and
  any frontmatter box, before the first `##` section heading. This is Benchy's
  greeting for the chapter. In Chapter 1 only, this admonition must also be a
  self-introduction that lists all six pose-roles Benchy will play across the
  book.
- **`mascot-thinking`** — directly after the first statement of a named
  principle, equation, or law. The `##` or `###` heading names the concept;
  Benchy's admonition immediately follows the defining sentence.
- **`mascot-tip`** — after a paragraph that describes a strategy, shortcut, or
  "when you see X, do Y" pattern. Benchy adds the practitioner's angle.
- **`mascot-warning`** — at the top of a section (or after a paragraph) that
  describes a common error, sign-convention confusion, unit mix-up, or safety
  hazard. The warning must name the specific mistake.
- **`mascot-encouraging`** — before or inside the hardest derivation or most
  complex worked example in the chapter. Benchy acknowledges the difficulty
  before the reader hits it.
- **`mascot-celebration`** — at the very end of the chapter, after the final
  summary bullets or key-takeaways list. Benchy closes out and previews the
  next chapter.

### Spacing Rule

**Never place two mascot admonitions back-to-back.** At least one full
paragraph of regular prose must appear between any two mascot admonitions. If
two placements feel naturally adjacent, pick the more important one and cut
the other.

### Image Path

Chapters live at `docs/chapters/NN-name/index.md` and render at the URL
`…/chapters/NN-name/`. The image `src` must climb two levels:

```
../../img/mascot/POSE.png
```

Always use this relative path. Never use an absolute `/` path or a path
anchored to the site root, as MkDocs resolves paths from the rendered page
location.

### Admonition Syntax

```markdown
!!! mascot-welcome "Welcome to Chapter N"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Benchy waves hello">
    1–3 sentences in Benchy's voice. Reference the chapter's actual content
    by name. End with a preview of what the reader will learn.
```

- The title string (quoted after the admonition class) is displayed as the
  admonition header. Keep it short (3–7 words).
- The `<img>` tag must be the first line of the body, before any text.
- Body text: **1–3 sentences only.** If you need more, the mascot is doing
  the chapter's job — move that content to the main prose.
- Use Benchy's voice: warm, experienced, occasionally self-deprecating, never
  generic. Reference chapter-specific terms ("layer adhesion", "Ohm's Law",
  "slicer settings") rather than vague phrases ("this concept", "this topic").

### Voice Guidelines by Pose

- **welcome** — friendly, energetic, forward-looking. Ends with a preview sentence.
- **thinking** — curious, analytical. Frames the concept as a puzzle worth solving.
- **tip** — confident, practical. Reads like advice from a working maker, not a textbook.
- **warning** — urgent but kind. Names the exact mistake; never just "be careful."
- **encouraging** — warm, reassuring. Acknowledges genuine difficulty without
  minimizing it.
- **celebration** — excited, proud. Specific about what the reader accomplished.
  Ends with a call-forward to the next chapter.
- **neutral** — conversational. Used sparingly for tangential notes that don't
  fit another pose.

### Anti-Patterns to Avoid

- Mascot at every `##` heading — pick the 2–3 most important, not all of them.
- Identical voice across all admonitions — each pose should read distinctly.
- Mascot doing the chapter's actual teaching — Benchy guides; the prose teaches.
- Generic body text ("pay attention to this concept") — always name the specific term.
- Back-to-back mascots — always at least one prose paragraph between them.
- Wrong image path — verify `../../img/mascot/` from the chapter's directory depth.

### Chapter 1 Self-Introduction (Special Rule)

In Chapter 1 only, the `mascot-welcome` admonition is Benchy's self-introduction
to the entire book. It must:

1. State Benchy's name and one-line character description.
2. List all six active pose-roles as a numbered list (welcome, thinking, tip,
   warning, encouraging, celebration) with one sentence each explaining what
   Benchy does in that pose.
3. End with a contract sentence: something like "If I'm not doing one of those
   six things, I'm not in the chapter."

Chapters 2 and beyond open with a normal `mascot-welcome` that goes straight
into chapter-specific content. Never repeat the self-introduction.

---

## Reading Level

Target: **Senior High (Grades 10–12)**
- Sentence length: 15–22 words average
- Mixed simple, compound, and some complex sentences
- Technical vocabulary introduced with clear inline definitions on first use
- Concrete examples and real-world analogies alongside abstract concepts

---

## Math Notation

Use backslash LaTeX delimiters (MkDocs KaTeX-compatible):
- Inline: `\( equation \)`
- Display: `\[ equation \]`

Do **not** use dollar-sign delimiters (`$` or `$$`).

---

## Non-Text Element Rules

- No more than 3 consecutive paragraphs without a non-text element.
- Every diagram, chart, infographic, timeline, MicroSim, or network graph
  must be interactive (clickable nodes, hoverable tooltips, or user-controlled
  inputs). Static images are not acceptable.
- Specify each interactive element inside a `<details markdown="1">` block,
  preceded by a `#### Diagram: Title` level-4 heading.
- Define all technical terms in prose **before** they appear in a diagram,
  table, or code example.
