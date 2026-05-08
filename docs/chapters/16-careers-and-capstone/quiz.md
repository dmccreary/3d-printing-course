# Quiz: Digital Workflows, Careers, Articulation, and the Capstone Project

Test your understanding of professional file workflows, version control for CAD, manufacturing career pathways, certification programs, articulation options, and capstone project planning.

---

#### 1. A professional file naming convention for a 3D printing environment serves what primary purpose?

<div class="upper-alpha" markdown>
1. It ensures any team member can identify the correct file, its version, and its purpose without needing to ask the creator
2. It compresses file sizes by using shorter names, reducing storage requirements on shared drives
3. It prevents unauthorized users from printing files by encoding security information in the filename
4. It automates the slicer's profile selection by encoding material and layer height settings in the filename
</div>

??? question "Show Answer"
    The correct answer is **A**. File naming conventions in shared fabrication environments exist to communicate information through the name itself: the part name, version number, date, author, and material specification can all be encoded in a standardized format. This prevents the single most common production error in maker environments — printing the wrong revision of a part. Filenames do not affect storage compression; they do not provide security access control; and while some automated workflows can parse filenames, this is not the primary purpose in a general fabrication environment.

    **Concept Tested:** File Naming Conventions

---

#### 2. What is the key difference between a "print farm" and a standard single-printer setup?

<div class="upper-alpha" markdown>
1. Print farms use only industrial SLS machines; single-printer setups use consumer FDM
2. A print farm operates multiple printers simultaneously under centralized queue management to produce batches of parts or serve multiple simultaneous jobs
3. Print farms require specialized large-format printers with build volumes above 500mm on each axis
4. A print farm is a cloud-based service where users submit files and receive printed parts by mail
</div>

??? question "Show Answer"
    The correct answer is **B**. A print farm is any organized operation of multiple 3D printers managed together — from a makerspace with a dozen FDM machines to a commercial bureau with hundreds. The defining characteristics are centralized queue management (deciding what each printer produces and when), standardized printer configurations, and systematic quality control. The scale and business model vary widely. Print farms commonly use consumer FDM; they do not require large-format machines; commercial print bureaus that mail parts are a specific application of a print farm, not the definition of the category.

    **Concept Tested:** Print Farm Concepts

---

#### 3. The NIMS (National Institute for Metalworking Skills) certification most directly demonstrates to an employer that a student:

<div class="upper-alpha" markdown>
1. Has completed a four-year engineering degree with a manufacturing concentration
2. Is certified to operate any CNC machine without supervision in a commercial manufacturing environment
3. Has demonstrated competency in specific manufacturing skills assessed against nationally standardized industry benchmarks
4. Has passed the ASTM examination for additive manufacturing quality inspector
</div>

??? question "Show Answer"
    The correct answer is **C**. NIMS credentials are competency-based certifications developed in collaboration with manufacturing industry stakeholders. Each credential certifies that the holder has demonstrated specific skills — machining, quality measurement, CAM programming, or related areas — against nationally recognized standards. They are not equivalent to a four-year degree; they certify specific skills, not blanket operating authorization for all machines; and they are not ASTM quality inspector credentials (a separate certification). NIMS credentials are specifically valued by manufacturing employers as evidence of job-ready skills.

    **Concept Tested:** NIMS Certifications

---

#### 4. A student completes this 3D printing course in grade 11 and wants to receive college credit without paying tuition. Which pathway is most directly designed for this scenario?

<div class="upper-alpha" markdown>
1. Applying to a four-year university early admission program with the course on their transcript
2. Enrolling in a dual-credit or concurrent enrollment program that pairs the high-school course with a community college course for simultaneous credit
3. Earning a NIMS certification, which converts automatically to 12 college credits at any accredited institution
4. Completing an online MOOC version of the course that community colleges recognize for credit transfer
</div>

??? question "Show Answer"
    The correct answer is **B**. Dual-credit (also called concurrent enrollment) programs allow high-school students to take courses that simultaneously earn both high-school and college credit. Many community colleges partner with high schools to offer articulated courses where the high-school instructor or a college instructor teaches a course that meets college requirements — students pay reduced or no tuition while still in high school. NIMS certifications may support credit recognition but do not automatically convert to 12 credits at any institution; university early admission is not a credit-earning pathway; MOOCs have inconsistent credit-transfer policies.

    **Concept Tested:** Dual Credit Programs

---

#### 5. In a capstone project design document, what is the purpose of a "bill of materials" (BOM)?

<div class="upper-alpha" markdown>
1. It records the total cost of all failed prints during the design iteration phase for budget accounting
2. It describes the design decisions made at each iteration gate, justifying why alternative concepts were rejected
3. It provides the G-code settings used for the final production print, creating a reproducible manufacturing record
4. It lists every component, material, and purchased part required to build the functional prototype, with quantities and sources
</div>

??? question "Show Answer"
    The correct answer is **D**. A bill of materials is a structured list of every part and material needed to build the assembly: printed components, hardware (screws, bearings, electronics), raw materials, and consumables — each with quantity, specification, and source. The BOM is a fundamental design documentation artifact that connects the design intent to the physical build. It is not an iteration log (that is a design history record); it is not a record of failed prints; and G-code settings belong in a process specification or slicer profile export, not the BOM.

    **Concept Tested:** Design Documentation

---

#### 6. A student is planning a capstone project and selects "design a working miniature trebuchet that launches a golf ball 3 meters" as the goal. Which specification is missing that makes this an incomplete functional requirement set?

<div class="upper-alpha" markdown>
1. The target audience — the specification does not state who will use the trebuchet
2. The manufacturing process — the specification does not state that the trebuchet must be 3D printed
3. Measurable performance tolerances — "3 meters" needs a range (minimum distance, maximum footprint, load mass) and safety constraints to be a complete engineering requirement
4. The material specification — the specification does not state which filament must be used for structural members
</div>

??? question "Show Answer"
    The correct answer is **C**. "Launches a golf ball 3 meters" is a performance goal, but a complete functional requirement set includes: the target value plus acceptable tolerance (3.0 m ± 0.5 m? minimum 3 m?), constraints (maximum dimensions, maximum mass, safety clearances, number of people required to operate), and success criteria for each requirement. Without these, the project has no clear pass/fail criteria. Target audience affects human factors design but is not the missing element for a mechanical performance spec. The manufacturing process and material choices are design decisions, not requirements — requirements define what, not how.

    **Concept Tested:** Capstone Project Planning

---

#### 7. The SME Education Foundation supports manufacturing career development by:

<div class="upper-alpha" markdown>
1. Providing scholarships, grants, and educational resources specifically for students pursuing manufacturing engineering and technology careers
2. Operating a network of accredited community colleges that grant manufacturing technology associate degrees
3. Setting the national curriculum standards for all high-school manufacturing courses under the Career Technical Education framework
4. Issuing the NC3 and NIMS industry certifications on behalf of the US Department of Labor
</div>

??? question "Show Answer"
    The correct answer is **A**. The SME Education Foundation (affiliated with SME, the Society of Manufacturing Engineers) provides scholarships for undergraduate and graduate students in manufacturing engineering and technology, funds educator professional development, and supports STEM pipeline programs aimed at increasing the manufacturing talent pool. It does not operate colleges, does not set national CTE curriculum standards (that function belongs to state education agencies and organizations like ACTE), and does not administer NIMS or NC3 certifications — those are administered by NIMS and NC3 respectively.

    **Concept Tested:** SME Education Foundation

---

#### 8. A student delivers a technical presentation about their capstone project to a panel that includes a community college instructor and a local manufacturing employer. Which presentation element carries the most weight for demonstrating engineering competency?

<div class="upper-alpha" markdown>
1. The visual quality of the rendered CAD model, which demonstrates proficiency with design software
2. A detailed account of what failed during iteration and how the student diagnosed and resolved each failure
3. The number of design iterations completed, which demonstrates thoroughness
4. The final part's visual appearance, which demonstrates print quality and post-processing skill
</div>

??? question "Show Answer"
    The correct answer is **B**. Evaluators in engineering and manufacturing contexts are specifically looking for evidence of the engineering problem-solving process: identifying problems, forming hypotheses about causes, testing changes, and evaluating results. A student who can articulate "the first bracket cracked under load because the layer orientation was perpendicular to the bending moment — I reoriented the print and used an additional perimeter, which solved the problem" demonstrates systems thinking, failure analysis, and iterative design. Polished CAD renders and good final prints are positive indicators but do not show the engineering process; iteration count without quality of reasoning is less meaningful.

    **Concept Tested:** Technical Presentation

---

#### 9. Version control for CAD files is most important because CAD designs typically undergo multiple revisions, and without version control:

<div class="upper-alpha" markdown>
1. The slicer cannot determine which version of the STL to use when multiple files share a base name
2. Community college articulation programs require version-controlled CAD portfolios as proof of professional workflow standards
3. Without version control, cloud-based CAD tools like Onshape automatically delete files older than 30 days
4. A team member or student may print an outdated revision, or a design change that caused a failure cannot be traced back to the specific modification that introduced it
</div>

??? question "Show Answer"
    The correct answer is **D**. Version control for CAD provides two critical capabilities: preventing the wrong-version-print problem (printing revision 3 when revision 7 is current) and enabling traceability — when a part fails, the change history allows the team to identify which modification introduced the failure and revert to the last known good state. This is standard practice in professional CAD environments. Slicer file selection is a human workflow issue; articulation programs do not typically mandate version control as a requirement; Onshape retains version history indefinitely and does not delete old files.

    **Concept Tested:** Version Control For CAD

---

#### 10. A student completing this course wants to enter the advanced manufacturing workforce immediately after high school graduation rather than pursuing a four-year degree. Evaluate which pathway best combines immediate employment with long-term credential building.

<div class="upper-alpha" markdown>
1. Completing a registered apprenticeship program — which combines paid on-the-job training with related technical instruction and leads to a nationally recognized journeyworker credential
2. Entering the workforce in an entry-level role without any credentials, then seeking employer-sponsored training
3. Earning a NIMS certification and immediately applying for manufacturing engineering positions that typically require a bachelor's degree
4. Completing an online certification course in 3D printing from a non-accredited provider, which equivalent community college programs will recognize for transfer credit
</div>

??? question "Show Answer"
    The correct answer is **A**. Registered apprenticeships combine immediate paid employment (the apprentice earns a wage from day one) with structured on-the-job training and related technical education (often at a community college). Completion leads to a federally recognized journeyworker credential that is portable across employers. This pathway addresses both immediate income needs and long-term credential value. Entry-level work without credentials provides income but limited advancement pathways; NIMS certifications are valuable but do not qualify holders for engineering positions requiring a degree; non-accredited online courses have poor and inconsistent transfer credit recognition.

    **Concept Tested:** Apprenticeship Pathways

---
