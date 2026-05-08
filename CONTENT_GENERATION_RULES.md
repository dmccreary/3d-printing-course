# Content Generation Rules — Introduction to 3D Printing

These rules apply whenever Claude generates or edits content under `docs/`.
They are mandatory — not suggestions.

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
  any frontmatter box, before the first `##` section heading. In Chapter 1
  only, this admonition must be a self-introduction listing all six pose-roles.
- **`mascot-thinking`** — directly after the first statement of a named
  principle, equation, or law.
- **`mascot-tip`** — after a paragraph describing a strategy, shortcut, or
  "when you see X, do Y" pattern.
- **`mascot-warning`** — at the top of a section describing a common error,
  sign-convention confusion, unit mix-up, or safety hazard. Must name the
  specific mistake.
- **`mascot-encouraging`** — before or inside the hardest derivation or most
  complex worked example in the chapter.
- **`mascot-celebration`** — at the very end of the chapter, after the final
  summary bullets or key-takeaways list.

### Spacing Rule

**Never place two mascot admonitions back-to-back.** At least one full
paragraph of regular prose must appear between any two mascot admonitions.

### Image Path

Chapters live at `docs/chapters/NN-name/index.md`. The image `src` must
climb two levels:

```
../../img/mascot/POSE.png
```

Never use an absolute `/` path or a path anchored to the site root.

### Admonition Syntax

```markdown
!!! mascot-welcome "Welcome to Chapter N"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Benchy waves hello">
    1–3 sentences in Benchy's voice. Reference the chapter's actual content
    by name. End with a preview of what the reader will learn.
```

- Title string: 3–7 words.
- `<img>` tag must be the first line of the body, before any text.
- Body text: **1–3 sentences only.**
- Use Benchy's voice: warm, experienced, occasionally self-deprecating. Always
  reference chapter-specific terms, never vague phrases like "this concept."

### Voice Guidelines by Pose

- **welcome** — friendly, energetic, forward-looking. Ends with a preview sentence.
- **thinking** — curious, analytical. Frames the concept as a puzzle worth solving.
- **tip** — confident, practical. Reads like advice from a working maker.
- **warning** — urgent but kind. Names the exact mistake; never just "be careful."
- **encouraging** — warm, reassuring. Acknowledges genuine difficulty without minimizing it.
- **celebration** — excited, proud. Specific about what the reader accomplished. Ends with a call-forward to the next chapter.
- **neutral** — conversational. Used sparingly for tangential notes.

### Anti-Patterns to Avoid

- Mascot at every `##` heading — pick the 2–3 most important.
- Identical voice across all admonitions — each pose must read distinctly.
- Mascot doing the chapter's actual teaching — Benchy guides; the prose teaches.
- Generic body text — always name the specific term.
- Back-to-back mascots — always at least one prose paragraph between them.
- Wrong image path — verify `../../img/mascot/` from the chapter's directory depth.

### Chapter 1 Self-Introduction (Special Rule)

In Chapter 1 only, the `mascot-welcome` admonition must:

1. State Benchy's name and one-line character description.
2. List all six active pose-roles as a numbered list with one sentence each.
3. End with a contract sentence: "If I'm not doing one of those six things, I'm not in the chapter."

Chapters 2 and beyond open with a normal `mascot-welcome`. Never repeat the self-introduction.

---

## Writing Style Guide

### Overall Tone

The book is **positive, optimistic, and fun to read** while being honest about
the real challenges of 3D printing. The authorial voice is that of an
enthusiastic teacher who has watched a twelve-hour print fail at hour eleven,
laughed about it, figured out why, and come back the next day excited to try again.

**Core tone commitments:**

- **Celebrate the craft.** Let the wonder of a classroom machine producing
  factory-quality objects come through in the prose.
- **Be honest about frustration.** Acknowledge warped prints, clogged nozzles,
  and baffling slicer settings directly — students feel validated when the
  textbook admits something is hard.
- **Frame every failure as information.** Use "when your print warps" (not
  "if"), and treat troubleshooting as normal and satisfying.
- **The rewards are worth the effort.** After acknowledging difficulty, always
  follow through to the payoff.

### Sentence-Level Style

- Write in **second person** ("you will," "your slicer," "when your print").
- Use **active voice** as the default.
- Vary sentence rhythm — short punchy sentences for key points, longer sentences for process or argument.
- **Contractions are fine** in body prose and Benchy's voice.
- **Analogies over jargon.** Reach for an everyday comparison first, then layer in the technical term.

### Humor Guidelines

- **One joke or light moment per major section** at most.
- **Self-deprecating and observational** — about the quirks of 3D printing, never at the student's expense.
- **Benchy carries most of the humor.** Prose sections can be warm without being jokey.
- **Puns about 3D printing are encouraged** (sparingly) — they feel authentic to the community.
- **Never mock students or make failure feel embarrassing.**
- **Don't over-explain the joke.** If it needs a label, rewrite or cut it.

### Acknowledging Difficulty Honestly

Name the difficulty, validate the frustration, then deliver the reassurance:

> "Bed leveling is one of those tasks that is simple in principle and
> occasionally maddening in practice. The gap between 'I understand what
> I'm doing' and 'my printer actually works' can feel wider than it has any
> right to be. The good news: once you find the settings that work for your
> machine, you will not need to redo them often."

### Benchy's Voice (Extended)

- **Battle-tested positivity.** He's the calibration print — his whole existence
  is revealing whether a printer works correctly. He finds this hilarious.
- **Genuine enthusiasm for making.** His celebration feels earned because he
  acknowledges the effort it took.
- **Light self-deprecating humor.** Examples:
  - *"I've been printed in low quality more times than I'd like to admit. Trust me — layer height matters."*
  - *"If you think bed leveling is frustrating now, imagine being the object that reveals whether it worked."*
  - *"Yes, that's me on half the keychain racks at makerspaces worldwide. I'm basically famous."*
- **Never preachy.** He drops a useful thought and gets out of the way.

### Positive Framing Examples

| Instead of… | Write… |
|---|---|
| "Avoid making this mistake." | "Here's the move that saves you from reprinting." |
| "This is a common source of failure." | "This is worth getting right — and now you will." |
| "3D printing requires patience." | "3D printing rewards patience — and the wait is usually worth it." |
| "Do not skip bed leveling." | "Bed leveling is the five minutes that makes the next five hours work." |
| "Many students struggle with this." | "This trips people up the first time — let's go through it carefully." |
| "If your print fails…" | "When a print doesn't go as planned — and at some point one won't — here's how to read what happened." |

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
