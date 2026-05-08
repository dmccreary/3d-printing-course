# Quiz: Computer-Aided Design and Modeling

Test your understanding of parametric CAD, sketch constraints, feature operations, and CAD tools with these questions.

---

#### 1. In parametric CAD, a sketch entity that appears blue in the viewport is:

<div class="upper-alpha" markdown>
1. Fully constrained and ready for feature creation
2. Over-constrained with conflicting geometric rules
3. Under-constrained and still free to move or scale
4. Locked on a reference plane and cannot be edited
</div>

??? question "Show Answer"
    The correct answer is **C**. In most parametric CAD tools, blue entities are under-constrained — they still have unconstrained degrees of freedom and can drift when features are rebuilt. Black entities are fully constrained (the goal); red entities are over-constrained (conflicting constraints). A blue sketch should not be used to create a feature because its geometry may change unpredictably as the model evolves.

    **Concept Tested:** Sketch Constraints

---

#### 2. What is the main advantage of parametric modeling over non-parametric (fixed-geometry) modeling?

<div class="upper-alpha" markdown>
1. Parametric models use less file storage space than non-parametric ones
2. Changing one dimension parameter automatically updates all dependent geometry
3. Parametric models can be exported directly to G-code without a slicer
4. Parametric models do not require a feature tree to track design history
</div>

??? question "Show Answer"
    The correct answer is **B**. In parametric modeling, dimensions and relationships are stored as editable parameters. Changing one value — say, bracket width from 40 mm to 60 mm — propagates through the entire model, updating all features that depend on it. Non-parametric models require manually moving every affected edge and face. File size, G-code export, and feature trees are separate concepts unrelated to the parametric/non-parametric distinction.

    **Concept Tested:** Parametric Modeling

---

#### 3. Which CAD feature operation creates a solid by rotating a 2D sketch profile around an axis?

<div class="upper-alpha" markdown>
1. Extrude Boss
2. Shell
3. Revolve
4. Loft
</div>

??? question "Show Answer"
    The correct answer is **C**. The Revolve feature spins a 2D sketch profile around a specified axis by a defined angle (typically 360° for a complete solid). It is used for rotationally symmetric shapes such as cylinders, cones, rings, and bottle bodies. Extrude Boss pushes a profile along a straight axis; Shell hollows an existing solid; Loft blends between two or more profiles on different planes.

    **Concept Tested:** Revolve Feature

---

#### 4. Why should fillet features typically be placed at the very end of the feature tree?

<div class="upper-alpha" markdown>
1. Fillets are cosmetic and the CAD software cannot process them until the model is complete
2. Fillets applied early create reference edges that downstream features depend on, causing rebuild failures when earlier features change
3. The slicer requires fillets to be the last operation so it can calculate toolpaths correctly
4. Fillets increase file size and should be added only when the model is ready for export
</div>

??? question "Show Answer"
    The correct answer is **B**. If a fillet is applied early in the feature tree, later features (holes, cuts, patterns) may reference the filleted edge. When an earlier feature changes and the fillet geometry shifts, those downstream references break and the model fails to rebuild. Placing fillets last — as "finishing touches" — avoids this cascading failure. This has nothing to do with slicer processing, cosmetic classification, or file size.

    **Concept Tested:** Fillet and Chamfer

---

#### 5. In a CAD assembly, what does it mean for a part to have "0 remaining degrees of freedom"?

<div class="upper-alpha" markdown>
1. The part cannot be edited because the CAD file is locked
2. The part is fully constrained and cannot translate or rotate in any direction
3. The part has no features applied to it yet in the feature tree
4. The part is a rigid body that has been excluded from motion simulation
</div>

??? question "Show Answer"
    The correct answer is **B**. A rigid body in 3D space has 6 degrees of freedom (3 translation, 3 rotation). Each mate constraint removes one or more DOF. When all 6 are removed (DOF = 0), the part is fully constrained — it has a fixed, unambiguous position in the assembly that will not change when the model is rebuilt. DOF is about positional constraint, not file permissions, feature history, or simulation exclusion.

    **Concept Tested:** Mate Constraints

---

#### 6. The Shell feature in CAD is most useful for additive manufacturing because it:

<div class="upper-alpha" markdown>
1. Converts a solid part into a hollow structure with controlled wall thickness
2. Automatically generates support structures for the slicer
3. Splits a complex model into printable segments that can be assembled
4. Removes all internal geometry to reduce file size before STL export
</div>

??? question "Show Answer"
    The correct answer is **A**. Shell hollows a solid body by removing interior material while leaving walls of a specified uniform thickness and creating openings at selected faces. This is valuable when the hollow interior is part of the design intent (enclosures, containers) rather than leaving it to the slicer's infill system. Shell does not generate supports, split models, or reduce STL file size through geometry removal.

    **Concept Tested:** Shell Feature

---

#### 7. Which of the three CAD tools discussed in the chapter is completely browser-based, requiring no local installation?

<div class="upper-alpha" markdown>
1. FreeCAD
2. Fusion 360
3. Onshape
4. SolidWorks
</div>

??? question "Show Answer"
    The correct answer is **C**. Onshape is a fully cloud-based parametric CAD platform that runs in a standard web browser — no download or installation required. It works on any device, including Chromebooks. FreeCAD is an open-source desktop application that installs locally. Fusion 360 installs as a desktop application with cloud sync. SolidWorks is a professional desktop application not covered in this chapter's three tools.

    **Concept Tested:** Onshape Workflow

---

#### 8. A Linear Pattern feature is most appropriate when you need to:

<div class="upper-alpha" markdown>
1. Blend smoothly between two differently shaped cross-sections
2. Replicate a feature multiple times in rows and columns at equal spacing
3. Remove a cylindrical volume from an existing solid to create a hole
4. Constrain two faces in an assembly to be flush with each other
</div>

??? question "Show Answer"
    The correct answer is **B**. A Linear Pattern replicates a feature (or set of features) in one or two directions at equal intervals — perfect for mounting holes along a rail, ventilation slots across a panel, or fins on a heat sink. Option A describes a Loft feature; option C describes an Extrude Cut; option D describes a Coincident mate constraint in an assembly.

    **Concept Tested:** Pattern Features

---

#### 9. AI-assisted CAD tools such as text-to-geometry generators are most effectively used by designers who:

<div class="upper-alpha" markdown>
1. Have no CAD experience, since the AI replaces the need to learn manual modeling
2. Understand parametric modeling deeply enough to evaluate, edit, and verify AI-generated geometry
3. Work only with FreeCAD, as it is the primary platform supporting AI integration
4. Produce purely decorative models that require no dimensional accuracy
</div>

??? question "Show Answer"
    The correct answer is **B**. AI-generated geometry still requires a skilled designer to evaluate whether it is dimensionally correct, structurally sound, and properly constrained. Designers who understand sketching, features, and constraints can use AI to go faster; designers who expect AI to do the thinking for them tend to miss critical errors. AI does not replace CAD fundamentals — it leverages them. No single CAD platform monopolizes AI integration.

    **Concept Tested:** AI-Assisted CAD

---

#### 10. Which Boolean operation retains only the volume shared by two overlapping solid bodies, discarding everything else?

<div class="upper-alpha" markdown>
1. Union
2. Difference
3. Intersection
4. Extrude Cut
</div>

??? question "Show Answer"
    The correct answer is **C**. A Boolean Intersection retains only the region where two solids overlap — useful for finding the common volume of two shapes. Union combines two solids into one merged body; Difference (and the equivalent Extrude Cut) subtracts one body from another to create holes and pockets; Extrude Cut is a specific application of Boolean Difference. Understanding these three operations gives you full control over multi-body geometry.

    **Concept Tested:** Boolean Operations

---
