# Quiz: The Engineering Design Process

Test your understanding of the PLTW engineering design process, specifications, iteration, and documentation with these questions.

---

#### 1. In the PLTW engineering design process, which step comes immediately after "Ideate"?

<div class="upper-alpha" markdown>
1. Research
2. Prototype
3. Specify (Design Specifications)
4. Test and Validate
</div>

??? question "Show Answer"
    The correct answer is **C**. The PLTW seven-step loop runs: Define → Research → Ideate → Specify → Prototype → Test → Communicate. After generating many design concepts during Ideation, the next step is to create measurable, testable Design Specifications that the chosen concept must meet. Jumping directly to Prototype without establishing specifications means you won't know whether the result is successful.

    **Concept Tested:** PLTW Design Process

---

#### 2. Which of the following is a well-formed design specification (as opposed to a vague goal)?

<div class="upper-alpha" markdown>
1. "The bracket should be strong enough to hold the camera."
2. "The phone stand should look good and fit most phones."
3. "The bracket supports a 500 g load with less than 1 mm deflection, verified with calibrated weights."
4. "The part should print quickly and not take too long."
</div>

??? question "Show Answer"
    The correct answer is **C**. A well-formed specification includes a parameter (load capacity), a target value (500 g), an acceptable range (< 1 mm deflection), and a test method (calibrated weights). Options A, B, and D are vague goals — they describe desired qualities but provide no measurable criteria that could be tested to determine pass or fail.

    **Concept Tested:** Design Specifications

---

#### 3. The primary purpose of ideation in the engineering design process is to:

<div class="upper-alpha" markdown>
1. Select the single best design concept as quickly as possible
2. Generate as many distinct candidate solutions as possible before evaluating any
3. Write a detailed engineering specification document
4. Determine the exact materials and print settings for the prototype
</div>

??? question "Show Answer"
    The correct answer is **B**. The cardinal rule of ideation is to defer judgment — produce a wide variety of distinct concepts before critically evaluating any of them. Wild and unusual ideas are welcomed because they expand the solution space. Selection (option A) happens in the Concept Selection step; specifications (option C) come in the next step; print settings (option D) are a prototyping concern.

    **Concept Tested:** Ideation and Sketching

---

#### 4. A "decision matrix" (Pugh matrix) is primarily used in the engineering design process to:

<div class="upper-alpha" markdown>
1. Record all observations and measurements from testing sessions
2. Document the timeline and budget for a design project
3. Evaluate and compare candidate design concepts against weighted criteria
4. List all known failure modes and their root causes
</div>

??? question "Show Answer"
    The correct answer is **C**. A decision matrix lists candidate concepts as columns and evaluation criteria (from the specification table) as rows. Each concept is scored against each criterion, weighted by importance, and the total weighted scores identify the most promising concept for prototyping. Options A and D describe engineering notebook practices; option B describes a project plan.

    **Concept Tested:** Concept Selection

---

#### 5. Why is it important to "test one variable at a time" during the testing and validation phase?

<div class="upper-alpha" markdown>
1. Testing multiple variables at once will damage the prototype
2. Changing only one setting at a time ensures you can identify which change fixed or caused a problem
3. The PLTW process rules prohibit changing more than one specification per test cycle
4. Single-variable testing is faster than testing multiple variables simultaneously
</div>

??? question "Show Answer"
    The correct answer is **B**. If you change multiple variables simultaneously and the result improves (or worsens), you cannot determine which change was responsible. Isolating one variable per test cycle gives you interpretable data that guides the next iteration. This is standard engineering and scientific practice. It doesn't damage the prototype, isn't a rule but a principle, and is often actually slower — but far more informative.

    **Concept Tested:** Testing and Validation

---

#### 6. Which of the following best explains why the PLTW design process is described as "iterative" rather than linear?

<div class="upper-alpha" markdown>
1. The process must always begin again from the Define step after every test
2. Designers can loop back to earlier steps when test results or new information require redesign
3. Iteration refers to the ability to skip steps when the design is already well understood
4. The process repeats identically for every project without modification
</div>

??? question "Show Answer"
    The correct answer is **B**. "Iterative" means the design loop can be re-entered from any earlier step when new information demands it — for example, when testing reveals a structural failure, the designer returns to CAD to revise geometry, then reprints and retests. The process does not automatically restart from Define, does not allow skipping steps, and must be adapted to each specific design problem.

    **Concept Tested:** Iteration Cycle

---

#### 7. What is the "critical parameter prototype" approach described in the chapter, and why is it more efficient than printing a full model first?

<div class="upper-alpha" markdown>
1. A prototype that tests only the riskiest assumption in the design, saving time and material
2. A high-fidelity, fully detailed prototype used for final client approval before manufacturing
3. A prototype printed with the most expensive material to ensure realistic test results
4. A prototype that documents all specifications before any physical model is made
</div>

??? question "Show Answer"
    The correct answer is **A**. The critical parameter prototype isolates and tests the single riskiest unknown in a design — for example, printing just a snap-fit joint rather than the entire enclosure. If the joint fails, only a small test piece is wasted. Printing the complete model first to discover a fundamental joint failure wastes hours of machine time and material. Options B, C, and D describe different concepts unrelated to risk-focused partial prototyping.

    **Concept Tested:** Prototyping

---

#### 8. An engineering notebook entry for a print session should include which of the following to be considered a proper record?

<div class="upper-alpha" markdown>
1. Only the final result of the print job, omitting settings and observations
2. Date, printer and material details, slicer settings, observations, and next steps
3. A clean, polished summary written after the project is complete
4. Photos only, since written notes are too time-consuming to be practical
</div>

??? question "Show Answer"
    The correct answer is **B**. A proper engineering notebook entry is a real-time record that includes the date, what was printed, the settings used, observations (including failures), and next steps for the following session. Option A omits the data needed to learn from failures; option C describes a portfolio, not a notebook; option D omits the written rationale that makes the record useful for debugging and patent documentation.

    **Concept Tested:** Engineering Notebook

---

#### 9. Which of the following best describes the difference between an engineering notebook and a portfolio?

<div class="upper-alpha" markdown>
1. An engineering notebook is digital; a portfolio must be printed on paper
2. An engineering notebook is the raw, real-time record of the design process; a portfolio is a curated selection of best work
3. Portfolios are used only for college applications; engineering notebooks are only used in professional engineering settings
4. An engineering notebook records only failures; a portfolio records only successes
</div>

??? question "Show Answer"
    The correct answer is **B**. The engineering notebook captures the complete, unedited history of a project as it unfolds — every observation, sketch, and result. The portfolio selects, organizes, and presents the most compelling evidence of competency for a specific audience. Both can be digital or physical; both are used in educational and professional settings; and both should include honest documentation of what worked and what didn't.

    **Concept Tested:** Portfolio Development

---

#### 10. A student builds a snap-fit enclosure, tests it, and finds the tabs break at 200 g instead of the required 400 g. According to the PLTW design process, the correct next action is:

<div class="upper-alpha" markdown>
1. Submit the design as-is since it meets at least some of the required load
2. Return to the CAD model, revise the tab geometry, and print a new prototype for testing
3. Change the material to a more expensive filament without modifying the geometry
4. Skip directly to the Communicate step to document the test results
</div>

??? question "Show Answer"
    The correct answer is **B**. When a test shows a specification is not met (400 g required, 200 g achieved), the iteration cycle directs the designer back to redesign — in this case, revising the snap-fit tab geometry in CAD. Submitting a design that fails to meet requirements (option A) is not acceptable engineering practice; changing material without examining geometry (option C) may be part of a solution but shouldn't precede geometric analysis; communicating before the design is complete (option D) skips required iteration.

    **Concept Tested:** Iteration Cycle

---
