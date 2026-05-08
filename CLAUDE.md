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

## Writing Style Guide

### Overall Tone

The book is **positive, optimistic, and fun to read** — while being honest
about the real challenges of 3D printing. The authorial voice is that of an
enthusiastic teacher who has been in the maker trenches: someone who has
watched a twelve-hour print fail at hour eleven, laughed about it, figured
out why, and come back the next day excited to try again.

**Core tone commitments:**

- **Celebrate the craft.** 3D printing is genuinely remarkable. A machine
  in a classroom can produce objects that would have required a factory
  fifty years ago. Let that wonder come through in the prose.
- **Be honest about frustration.** Warped prints, clogged nozzles, and
  slicer settings that make no sense are real. Acknowledge them directly —
  students feel validated when the textbook admits the thing is hard
  sometimes, rather than pretending everything always works perfectly.
- **Frame every failure as information.** A failed print is not a setback;
  it is a data point. The book consistently uses language like "when your
  print warps" (not "if"), and treats troubleshooting as a normal, even
  satisfying, part of the process.
- **The rewards are worth the effort.** After acknowledging difficulty,
  always follow through to the payoff: the part that fits perfectly, the
  mechanism that moves, the prototype that solves a real problem. Remind
  students what they are working toward.

### Sentence-Level Style

- Write in **second person** ("you will," "your slicer," "when your print")
  to put the student inside the process, not watching it from the outside.
- Use **active voice** as the default. "The extruder pushes filament" beats
  "filament is pushed by the extruder."
- Vary sentence rhythm. Short punchy sentences land key points. Longer
  sentences carry the reader through a process or build an argument.
  Alternating between them keeps reading from feeling monotonous.
- **Contractions are fine** in body prose and in Benchy's voice. "You'll,"
  "it's," "that's" — they make the text feel like a knowledgeable person
  talking, not a legal document.
- **Analogies over jargon.** When introducing a concept, reach for an
  everyday comparison first, then layer in the technical term. "Think of
  the hotend like a glue gun that has been given very precise instructions"
  works better than leading with "the thermoplastic extrusion assembly."

### Humor Guidelines

Occasional, well-placed humor makes the book more enjoyable and helps
students push through difficult sections. Follow these rules:

- **One joke or light moment per major section** at most. Humor is seasoning,
  not the main course.
- **Self-deprecating and observational** — jokes about the quirks of 3D
  printing itself, not at the expense of students. ("The 3D printing
  community has produced a surprising number of creative names for the same
  problem — because apparently we needed seventeen words for 'the plastic
  didn't stick.'")
- **Benchy carries most of the humor.** His admonition text is the natural
  home for a light touch, a pun, or a wry aside. Prose sections can be
  warm and engaging without being jokey.
- **Puns about 3D printing are encouraged** (sparingly). Layer puns,
  filament puns, and calibration humor are part of the culture of the
  community and feel authentic rather than forced.
- **Never mock students or make failure feel embarrassing.** Humor always
  punches at the technology or the situation, never at the person
  struggling with it.
- **Avoid over-explaining the joke.** If you have to add "(that's a
  printing joke)" after a pun, the pun wasn't clear enough — rewrite it
  or cut it.

### Acknowledging Difficulty Honestly

When a topic is genuinely hard or a process is genuinely frustrating, say so
directly before the student discovers it on their own:

> "Bed leveling is one of those tasks that is simple in principle and
> occasionally maddening in practice. The gap between 'I understand what
> I'm doing' and 'my printer actually works' can feel wider than it has any
> right to be. The good news: once you find the settings that work for your
> machine, you will not need to redo them often."

This approach — name the difficulty, validate the frustration, then deliver
the reassurance — is more respectful than pretending everything is easy, and
more motivating than dwelling on how hard things can be.

### Benchy's Voice (Extended)

In addition to the pose-by-pose guidelines in the Mascot section, Benchy
should consistently reflect these personality traits:

- **Battle-tested positivity.** Benchy has been printed badly many times.
  He's the calibration print, after all — his whole existence is being used
  to test whether a printer is working correctly. He finds this hilarious
  rather than tragic.
- **Genuine enthusiasm for making.** Benchy lights up (figuratively — he
  is a plastic boat) when a student gets something right or pushes through
  something hard. His celebration feels earned because he acknowledges the
  effort it took.
- **Light self-deprecating humor.** Examples of the Benchy voice:
  - *"I've been printed in low quality more times than I'd like to admit.
    Trust me — layer height matters."*
  - *"If you think bed leveling is frustrating now, imagine being the
    object that reveals whether it worked. That's basically my job."*
  - *"Yes, that's me on half the keychain racks at makerspaces worldwide.
    I'm basically famous."*
- **Never preachy.** Benchy does not lecture. He drops a useful thought and
  gets out of the way. The prose does the teaching.

### Positive Framing Examples

Prefer these framings over their alternatives:

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
