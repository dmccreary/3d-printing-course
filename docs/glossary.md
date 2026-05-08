# Glossary of Terms

#### ABET Outcomes Alignment

The alignment of course content and learning objectives with the student outcomes defined by ABET (Accreditation Board for Engineering and Technology) for accredited engineering and engineering technology programs, ensuring that skills taught in secondary courses transfer smoothly to accredited post-secondary curricula.

**Example:** Incorporating engineering communication, iterative design, and quantitative testing into a 3D printing course aligns with ABET Criterion 3 outcomes, strengthening articulation agreements with accredited engineering programs.

#### ABS Filament

Acrylonitrile Butadiene Styrene — a petroleum-based thermoplastic with good impact resistance and a higher glass transition temperature (~100°C) than PLA. ABS requires elevated bed temperatures (90–110°C), an enclosure to prevent warping, and produces styrene fumes requiring ventilation.

**Example:** ABS is the material of LEGO bricks — its combination of toughness, slight flex, and dimensional stability under moderate heat makes it suitable for functional housings and automotive interior parts.

#### Adaptive Layer Height

A specific variable layer height algorithm that automatically calculates optimal layer thickness for each region based on the model's surface slope — thinner layers where the surface is nearly horizontal (more visible faceting) and thicker where the surface is steep (less visible faceting).

**Example:** Adaptive layer height on a sphere uses 0.1 mm layers near the equator (steep slopes, few visible lines) and 0.3 mm layers near the poles (gentle slopes, many visible facets) — delivering the smoothest result with the fewest total layers.

#### Additive Manufacturing

A family of processes that build three-dimensional objects by joining material layer upon layer from digital model data, as defined by ISO/ASTM 52900. It enables geometries impossible or impractical with subtractive methods and produces near-zero material waste.

**Example:** An aerospace bracket with internal lattice channels — impossible to mill — can be produced directly from a CAD file using metal powder bed fusion.

#### Adhesion Type

The type of slicer-generated structure added to the first layer to increase the contact area between the print and the build plate, improving adhesion and reducing warping. Common options are skirt (outline only, no adhesion), brim (flat border), and raft (full base platform).

**Example:** A tall, narrow ABS tower is prone to warping and tipping; printing with a wide brim of 10 mm significantly increases the footprint and thermal stability of the first layer.

#### AI Ethics In Manufacturing

The consideration of fairness, transparency, accountability, privacy, safety, and societal impact in the design and deployment of AI systems used in manufacturing contexts — including bias in quality inspection models, worker displacement, data privacy in connected factories, and environmental costs of AI compute.

**Example:** An AI quality inspection model trained primarily on parts printed from one material or printer type may perform poorly (introducing bias) on parts from other materials or machines — a fairness concern requiring diverse training data.

#### AI Failure Detection

The use of machine learning image classification models to automatically analyze print camera footage frame by frame, detect visual signs of print failures (spaghetti, detachment, layer shifts), and trigger a print pause or cancellation before the failure worsens.

**Example:** Obico's (formerly The Spaghetti Detective) failure detection model analyzes each camera frame for the stringy mass of filament characteristic of a detached print; it pauses the printer within seconds of detecting the problem.

#### AI Hallucination Risks

The tendency of large language models to generate plausible-sounding but factually incorrect information — including incorrect material properties, non-existent standards, or flawed print settings — presenting a specific risk when students use AI assistants for technical decisions without verification.

**Example:** An LLM asked for the maximum print temperature of a specific filament brand may confidently state an incorrect value; always cross-reference AI-provided material specifications against the manufacturer's published data sheet.

#### AI In Additive Manufacturing

The application of artificial intelligence and machine learning technologies across the AM workflow — including design optimization (generative design, topology optimization), process monitoring (failure detection), quality inspection (defect classification), and predictive maintenance — to improve part quality, reduce waste, and increase automation.

**Example:** An AI system monitoring a metal DMLS build chamber in real time can detect powder spreading defects, laser power anomalies, and spatter events that precede porosity, pausing the build before a structural defect forms.

#### AI Material Recommender

An AI tool that analyzes the specified function, environment, load conditions, and manufacturing constraints of a part and recommends the most suitable filament material (or resin type) from a database of characterized materials, with explanations of the trade-offs.

**Example:** An AI material recommender given the inputs "outdoor enclosure, UV exposed, 80°C max temperature, FDM printed" would recommend ASA over ABS (UV resistance), PETG (borderline Tg), or PLA (insufficient Tg and UV resistance).

#### AI Slicer Optimization

The use of machine learning and optimization algorithms within or alongside slicer software to automatically determine print settings (speed, temperature, support placement, orientation) that maximize part quality or minimize print time for a given model and printer, reducing the expertise required for optimal results.

**Example:** An AI slicer optimization tool analyzes a model's geometry and training data from thousands of previous prints on the same machine to suggest a complete settings profile predicted to minimize print time while maintaining dimensional accuracy.

#### AI Troubleshooting Assistant

An AI tool — typically an LLM with 3D printing domain knowledge and image analysis capability — that accepts descriptions or photos of print defects and suggests probable causes and remediation steps, reducing the expertise barrier for diagnosing print problems.

**Example:** Uploading a photo of a print with severe stringing to an AI troubleshooting assistant produces a prioritized list of likely causes (temperature too high, retraction insufficient, wet filament) with specific adjustment recommendations.

#### AI-Assisted CAD

The use of artificial intelligence — including generative design algorithms, large language model interfaces, and machine learning shape synthesis tools — to suggest, generate, or optimize CAD geometry based on user-specified requirements or natural-language prompts.

**Example:** Telling an AI-assisted CAD tool "design a 30 g bracket that connects a 25 mm tube to a 10 mm threaded rod and withstands 50 N of lateral force" generates candidate geometries that a designer evaluates and refines.

#### Algebra Basics

The branch of mathematics dealing with symbols and the rules for manipulating those symbols to solve equations and express relationships between quantities. In 3D printing, algebra underlies slicer calculations such as flow rate, print time estimation, and scaling formulas.

**Example:** When you scale a model from 50 mm to 75 mm, you are applying a multiplication factor of 1.5 — a straightforward algebraic operation your slicer performs automatically.

#### All-Metal Hotend

A hotend design in which the full filament path — from the heat break through the melt zone to the nozzle — is made of metal (typically stainless steel or titanium), with no PTFE lining in the heated zone. All-metal hotends enable printing above 240°C without PTFE degradation.

**Example:** Printing nylon PA12 at 260°C requires an all-metal hotend; a PTFE-lined hotend at that temperature degrades the PTFE, releasing fumes and contaminating the print.

#### AM Innovation Institutes

A network of federally funded Manufacturing USA institutes, each focused on a specific advanced manufacturing technology, that connect universities, companies, and government agencies to accelerate technology development and workforce training.

**Example:** Beyond America Makes (AM), the network includes institutes focused on digital manufacturing, lightweight metals, and flexible electronics — all relevant to modern product development.

#### AM Process Categories

The seven technology families defined by ISO/ASTM 52900 — material extrusion, vat photopolymerization, powder bed fusion, material jetting, binder jetting, directed energy deposition, and sheet lamination — that classify all additive manufacturing processes by the method used to join material.

**Example:** Knowing that your school's resin printer falls under "vat photopolymerization" lets you apply research about that entire category — cure depth, exposure time, resin chemistry — not just one brand's documentation.

#### AM Vocabulary Glossary

A reference document, such as the terminology annex of ISO/ASTM 52900, that defines standard terms used across additive manufacturing so that engineers, educators, and suppliers share a common language regardless of brand or geography.

**Example:** When a job posting asks for experience with "powder bed fusion," a student who knows the ISO vocabulary immediately recognizes this encompasses both SLS (polymer) and DMLS/SLM (metal) processes.

#### America Makes Institute

The National Additive Manufacturing Innovation Institute, established in Youngstown, Ohio in 2012, that functions as the United States' leading public–private partnership for advancing additive manufacturing research, education, and workforce development.

**Example:** America Makes publishes an annual AM technology roadmap that industry, government, and educators use to align curriculum and research priorities with real-world workforce needs.

#### AMS Material System

The Automatic Material System used by Bambu Lab printers — a multi-spool filament hub connected to a filament cutter and buffer system in the printer that stores up to 4 or 16 spools and automatically switches between materials during a print, purging the old color before continuing.

**Example:** Bambu Lab's AMS Hub connects four AMS units (up to 16 spools) to a single printer, enabling a print with up to 16 different colors or materials in a single job without user intervention.

#### Anisotropy

A material property in which mechanical behavior — strength, stiffness, or thermal conductivity — differs depending on the direction of measurement. FDM parts are inherently anisotropic because bonding between layers is weaker than bonding within a layer.

**Example:** A PLA test bar printed flat may show 60 MPa tensile strength along the print direction but only 35 MPa when pulled perpendicular to the layers, demonstrating anisotropy.

#### Annealing

A thermal treatment in which a printed part is held at a controlled temperature below the material's melting point for a period of time to relieve internal residual stresses, improve crystallinity in semi-crystalline polymers, and increase high-temperature resistance.

**Example:** Annealing a PLA part at 60°C for 30 minutes in an oven increases its glass transition temperature and heat resistance, making it suitable for applications where untreated PLA would soften — though slight warping may occur.

#### Apprenticeship Pathways

Structured, employer-sponsored training programs that combine paid on-the-job learning with related technical instruction, leading to nationally recognized credentials in skilled trades including AM technician, toolmaker, and precision machinist roles.

**Example:** The US Department of Labor's Registered Apprenticeship program includes AM technician frameworks where a student can earn while learning advanced AM operation skills over a 1–2 year paid apprenticeship.

#### ASA Filament

Acrylonitrile Styrene Acrylate — a thermoplastic chemically similar to ABS but with significantly improved UV and weathering resistance. ASA prints similarly to ABS (requiring a heated bed and enclosure) but retains color and strength after prolonged outdoor exposure.

**Example:** An outdoor sign or garden stake printed in ASA will not yellow, crack, or lose strength after months of sun and rain exposure, unlike the same part printed in ABS or PLA.

#### Assemblies

A CAD environment in which multiple individual part files are brought together, positioned relative to each other using mate constraints, to model a complete product and check fit, interference, and motion before printing.

**Example:** Assembling a printed hinge — knuckle, barrel, and pin as separate parts — in CAD lets you check that the pivot clears the mounting ears before committing to a print.

#### ASTM International

Formerly the American Society for Testing and Materials, an international standards organization that develops and publishes voluntary consensus technical standards for materials, products, systems, and services across many industries including additive manufacturing.

**Example:** ASTM Committee F42 on Additive Manufacturing Technologies co-developed ISO/ASTM 52900, the foundational vocabulary standard for the entire AM field.

#### Auto Bed Leveling

A printer feature that uses a probe — contact, inductive, or optical — to measure the build plate height at multiple points before printing, creating a mesh map of surface variations that the firmware uses to automatically compensate for plate irregularities during the first layers.

**Example:** A printer with a warped aluminum bed that deviates 0.3 mm across its surface can still print perfectly flat first layers if auto bed leveling has mapped and compensated for the warp.

#### Automatic Print Pause

A printer or monitoring software behavior that stops the print motor and turns off the extruder heater when a defined failure condition is detected — such as spaghetti detection, filament runout, power fluctuation, or thermal anomaly — preserving safety and minimizing waste.

**Example:** A filament runout sensor combined with automatic print pause allows a multi-hour print to pause mid-build when a spool empties; the operator loads a new spool and resumes from the exact pause point rather than restarting.

#### Bambu Lab AI Inspection

The suite of AI-powered quality monitoring features built into Bambu Lab printers, including lidar-based first-layer scanning, camera-based spaghetti detection, and nozzle clog detection, all processed locally on the printer's ARM processor without requiring a separate server.

**Example:** Bambu Lab's AI inspection suite automatically pauses a print when spaghetti is detected and sends a notification with a camera still to the user's phone through the Bambu Handy app.

#### Bambu Lab Printers

A line of consumer and professional FDM printers produced by Bambu Lab (founded 2022) that popularized high-speed CoreXY printing with AMS multi-material systems, active vibration compensation, AI failure detection, and deep cloud integration in sub-$1,500 machines.

**Example:** The Bambu Lab X1 Carbon's combination of CoreXY motion, input shaping, a lidar-based first-layer calibration, and AMS multi-material in a ~$1,200 package represented a step-change in accessible high-performance desktop printing when released in 2022.

#### Bambu Studio

The proprietary slicer developed by Bambu Lab for its printer ecosystem, featuring deep integration with Bambu Lab hardware, the AMS multi-material system, cloud connectivity, and automated support generation. Based on PrusaSlicer/OrcaSlicer code with Bambu-specific extensions.

**Example:** Bambu Studio's "Auto" support mode uses a tree-support algorithm that analyzes the full model and places minimal, organically shaped supports, reducing support material use by 30–50% compared to traditional linear supports.

#### Basic Physics Concepts

Foundational principles from classical mechanics, thermodynamics, and materials science — including force, energy, heat transfer, and friction — that govern how materials behave during printing and how printed parts perform under load.

**Example:** Understanding that heat rises helps explain why the top of a tall FDM print cools more slowly than the base, potentially affecting dimensional accuracy.

#### Bed Slinger Design

A printer motion architecture in which the printhead moves in X (and sometimes Z) while the build plate moves in Y. The term "bed slinger" reflects the back-and-forth Y motion of the platform. Bed-slinger designs are simpler and less expensive but have higher moving mass, limiting top acceleration and speed.

**Example:** The Prusa MK4 and Creality Ender 3 are classic bed-slinger designs; their Y-moving beds limit acceleration compared to CoreXY machines, but they are mechanically simple and easy to maintain.

#### Bed Temperature

The target temperature of the heated build plate surface during printing, set in the slicer. Bed temperature reduces the thermal gradient between the hot extruded plastic and the cold build surface, improving first-layer adhesion and reducing warping.

**Example:** ABS requires a bed temperature of 90–110°C to prevent the large thermal shrinkage that causes corners to lift; PLA adheres well at 50–65°C.

#### Belts And Pulleys

The power transmission system in CoreXY and Cartesian FDM printers: rubber-fiberglass (or steel-core) timing belts loop around toothed pulleys driven by stepper motors to translate motor rotation into precise linear printhead movement.

**Example:** A stretched or incorrectly tensioned belt causes inconsistent layer positions, appearing as banding or ringing in the print surface; re-tensioning the belt typically resolves this.

#### Binder Jetting

An AM process category in which a liquid binding agent is selectively deposited onto layers of powder material — metal, ceramic, or sand — to bond particles together. The "green" part is later sintered or infiltrated to achieve final density.

**Example:** ExOne and Desktop Metal use binder jetting to print metal parts at speeds far exceeding laser powder bed fusion, though a separate sintering furnace step is required.

#### Bio-Based Filaments

Thermoplastic filaments manufactured primarily from renewable biological sources rather than petroleum — including PLA (corn or sugarcane), PHA (bacterial fermentation), and hemp- or bamboo-composite materials. They are positioned as more sustainable alternatives to conventional plastics.

**Example:** PLA's bio-based origin means its carbon was recently atmospheric CO₂ captured by a plant, giving it a lower cradle-to-gate carbon footprint than petroleum-derived ABS.

#### BLTouch Sensor

A servo-actuated probe developed by ANTCLABS that deploys a metal pin to physically contact the build surface at multiple points before printing, measuring the bed height map for auto bed leveling. It works on any bed surface regardless of electrical conductivity.

**Example:** A BLTouch sensor probing a 5×5 grid of 25 points creates a detailed height map that allows Marlin firmware to compensate for a build plate that is warped by 0.4 mm across its surface.

#### Boolean Operations

Mathematical set operations — union (combine two solids into one), subtract (remove one solid's volume from another), and intersect (retain only the shared volume) — applied to 3D solid bodies to create complex geometry from simple primitives.

**Example:** Subtracting a cylinder solid from a block solid is a Boolean difference operation, producing a block with a round hole — the most common CAD operation for adding holes.

#### Bowden Vs Direct Drive

Two extruder configurations distinguished by the location of the filament drive mechanism: in Bowden systems the motor is fixed to the frame and filament travels through a PTFE tube to the hotend; in direct drive systems the motor is mounted on the toolhead, directly above the hotend.

**Example:** Bowden setups have a lighter toolhead enabling higher speeds, but require longer retractions; direct-drive extruders handle flexible filaments like TPU much more reliably because there is no slack tube to navigate.

#### Bridging

The process of printing a horizontal span across a gap between two supported walls without any support below. Successful bridging depends on fast cooling of the extruded strand before it sags; span length, fan speed, and print speed all affect bridge quality.

**Example:** Most well-tuned FDM printers can bridge gaps of 40–60 mm reliably; a printer with a weak part-cooling fan struggles to bridge even 20 mm without sagging.

#### Build Chamber Atmosphere

The controlled gas environment maintained inside the build enclosure of metal AM machines to prevent oxidation of reactive metal powder during the high-temperature fusion process. Most systems use inert argon or nitrogen; EBM uses high vacuum.

**Example:** Titanium and aluminum powders ignite in air at high temperatures; the argon atmosphere in a DMLS machine reduces oxygen concentration below 100 ppm, preventing dangerous reactions.

#### Build Plate

The flat platform on which parts are fabricated during an additive manufacturing process. It provides a reference surface for the first layer and must be level, clean, and at the correct temperature for adequate adhesion.

**Example:** Heating a PLA build plate to 60°C softens the first layer just enough to conform to the surface, dramatically improving adhesion compared to a cold plate.

#### Build Surface Types

The variety of materials applied to or comprising the build plate surface to optimize first-layer adhesion for different filaments. Common types include glass, PEI (polyetherimide) sheet, textured PEI, magnetic flex plates, and garolite (G10).

**Example:** A smooth PEI sheet provides excellent PLA adhesion when warm and easy release when cool; a textured PEI sheet imprints a matte texture onto the bottom of PETG and ABS parts.

#### Build Volume

The maximum three-dimensional envelope — defined by X, Y, and Z dimensions — within which a specific printer can fabricate parts. Parts or assemblies that exceed any single dimension must be split, scaled, or printed on a larger machine.

**Example:** A printer with a 220 × 220 × 250 mm build volume cannot print a 260 mm tall trophy in one piece; the designer must either scale it down or split it into two sections and join them after printing.

#### CAD Software Overview

Computer-Aided Design (CAD) software is a category of application that allows users to create, modify, and document 2D drawings and 3D models digitally. CAD replaces manual drafting and directly outputs files for manufacturing processes including 3D printing.

**Example:** Onshape, Fusion 360, and FreeCAD are three CAD platforms commonly used in high-school engineering courses, each offering parametric 3D modeling and STL export.

#### Calibration Cube

A simple test print — typically a 20 mm solid cube labeled with X, Y, and Z axes — used to verify and adjust a printer's dimensional accuracy by measuring printed dimensions with calipers and comparing them to the 20 mm nominal value.

**Example:** A calibration cube that measures 19.7 mm in X indicates the X steps-per-mm setting is slightly too low; increasing it by a calculated factor corrects the scaling error.

#### Calipers

A precision measuring instrument that uses two adjustable jaws to measure the external width, internal width, depth, or step height of a part, read from a graduated scale or digital display. Vernier and digital calipers are the primary metrology tool in desktop AM quality control.

**Example:** Measuring a calibration cube's X, Y, and Z dimensions with digital calipers and comparing to the nominal 20 mm CAD dimensions reveals whether the printer's steps-per-mm need adjustment.

#### Capstone Project Planning

The structured process of defining scope, deliverables, timeline, resources, and success criteria for a culminating design-build project that integrates skills from across the course. Effective planning prevents scope creep and ensures a completable project within the available time.

**Example:** A capstone planning document specifying "design and print a functional adaptive device for a specific user need, with CAD files, test data, and a 5-minute presentation, completed in 8 weeks" creates a realistic, achievable scope.

#### Carbon Fiber Filament

A composite filament in which short-chopped carbon fiber strands (typically 5–15% by weight) are blended into a thermoplastic base (PLA, PETG, nylon, or PC), producing a stiffer, lighter, and more dimensionally stable material than the base polymer alone.

**Example:** Carbon-fiber-reinforced nylon filament produces parts that are stiffer than aluminum by specific stiffness (stiffness per unit density) and far lighter, making it attractive for drone frames and racing car aerodynamic components.

#### Chemical Smoothing

A post-processing technique that uses chemical solvents — acetone for ABS and ASA, ethyl acetate for PLA — to dissolve and reflow the surface layer of a printed part, filling layer lines and producing a smooth, glossy surface without mechanical abrasion.

**Example:** Suspending an ABS print above a container of warm acetone vapor for 30–60 seconds produces a surface as smooth as injection-molded plastic — a dramatic improvement over the raw printed texture.

#### Clogged Nozzle

A print defect in which partial or complete blockage of the nozzle orifice restricts or stops filament flow. Clogs are caused by charred filament residue, foreign particles, heat creep, or printing a material beyond its rated temperature.

**Example:** A clogged nozzle shows as under-extrusion that worsens over time; a cold pull (heating to printing temp, then pulling at 90°C) removes the plug by gripping it as the plastic partially solidifies.

#### Cloud Slicing

The process of uploading a 3D model to a remote server that performs slicing computations and returns G-code, rather than running slicer software locally. Cloud slicing enables slicing on low-power devices and facilitates centralized profile management.

**Example:** Bambu Lab's Bambu Cloud service allows users to start a print from a phone by uploading an STL that the cloud slices with stored profiles, then sending the G-code directly to the printer over Wi-Fi.

#### Community College Pathways

The articulated sequences of coursework at two-year institutions that lead to associate degrees, certificates, or transfer to four-year universities in engineering technology, manufacturing, or related fields. Community colleges are the primary workforce training pipeline for AM technician roles.

**Example:** A student completing a high-school 3D printing course that articulates to a community college AM certificate program can earn six transferable college credits and enter the workforce one semester earlier.

#### Composite Filaments

Filaments that blend a base thermoplastic with particulate or short-fiber additives — including carbon fiber, glass fiber, wood, metal powder, or ceramics — to modify the mechanical, aesthetic, or thermal properties of the printed part.

**Example:** Carbon-fiber-filled PLA composite filament produces stiffer parts and a distinctive matte black surface texture, but requires a hardened steel nozzle because the abrasive fibers quickly erode soft brass.

#### Computer File Management

The practice of organizing, naming, storing, and retrieving digital files using a logical folder hierarchy and consistent naming conventions. Good file management prevents version confusion and lost CAD files, which is critical in iterative design work.

**Example:** Storing files as `benchy_v3_0.5mm-nozzle.stl` instead of `finalfinal2.stl` makes it easy to identify the correct version weeks later.

#### Computer Vision Basics

The field of AI in which algorithms process and interpret digital images or video to recognize objects, detect patterns, measure dimensions, or classify conditions. Computer vision is the enabling technology for AI-based 3D print monitoring systems.

**Example:** A computer vision system trained on thousands of images of good and failed 3D prints learns to classify each new frame as "nominal" or "failure" with high accuracy — without being explicitly programmed with rules about what failure looks like.

#### Concept Selection

The design process step in which candidate design concepts are systematically evaluated against established criteria — often using a decision matrix — to identify the most promising concept for further development and prototyping.

**Example:** A Pugh matrix comparing four phone-stand concepts on criteria of stability, printability, and compactness helps a team objectively choose the best concept to prototype.

#### Cooling Fan Settings

Slicer parameters controlling the part-cooling fan speed (0–100%) at various stages of the print. Rapid cooling solidifies each layer before the next is deposited, improving bridge performance and overhangs, but excessive cooling reduces interlayer adhesion on materials like ABS and ASA.

**Example:** PLA benefits from 100% fan cooling after the first few layers; PETG prints better at 30–50% fan speed because too much cooling reduces layer bonding and causes layer splitting.

#### CoreXY Motion System

A printer motion architecture in which two stepper motors cooperate through a crossed belt system to move the printhead in both X and Y simultaneously, while the build plate moves only in Z. CoreXY enables fast, high-acceleration XY motion with a lighter toolhead than bed-slinger designs.

**Example:** Bambu Lab X1C and Voron 2.4 use CoreXY motion systems; the fixed build plate (no Y movement) means the printer can accelerate the lightweight toolhead to 20,000 mm/s² without the inertia of a heavy moving bed.

#### Creality Printers

A line of budget-friendly FDM printers produced by Creality (Shenzhen, China) — including the popular Ender 3 series and K1 series — that democratized desktop printing through aggressive pricing, a large user community, and wide availability of parts and upgrades.

**Example:** The Creality Ender 3 V2 (retailing around $200–250) introduced millions of hobbyists to FDM printing; its open design and massive community-upgrade ecosystem make it a popular first printer despite requiring more tuning than premium models.

#### Creative Commons For 3D

The application of Creative Commons licensing to 3D model files hosted on platforms like Thingiverse, Printables, and MyMiniFactory. CC licenses specify permissions for sharing (BY attribution), commercial use (NC = non-commercial only), modifications (ND = no derivatives), and reciprocal sharing (SA = share-alike).

**Example:** A model tagged CC BY-NC-SA may be downloaded, remixed, and shared freely for personal or educational use, as long as attribution is given and the remix is not sold — a common license on educational model repositories.

#### Cura Slicer

An open-source slicer developed by Ultimaker (now UltiMaker), widely used in education for its broad printer compatibility, accessible interface, and extensive plugin ecosystem. Cura is often the default slicer bundled with budget desktop printers.

**Example:** Cura's "Recommended Settings" mode presents only a handful of key parameters (layer height, infill, support) — making it approachable for beginners — while "Custom" mode exposes hundreds of advanced settings for experienced users.

#### 2D Sketching

The process of drawing flat geometric shapes — lines, arcs, circles, rectangles — on a defined plane within CAD software as the foundation for creating 3D features. A 2D sketch is the starting point for nearly every parametric solid model.

**Example:** To create a rectangular box in CAD, you first sketch a rectangle on the XY plane, then extrude it upward along Z to give it height.

#### Defect Classification Models

Machine learning models trained to categorize specific print defect types — such as stringing, under-extrusion, layer shift, warping, or elephant's foot — from images or sensor data, enabling automated quality inspection at speeds and scales impractical for human inspectors.

**Example:** A defect classification model deployed in a print farm inspects camera images of every completed first layer and routes prints showing under-extrusion signs to a human inspector for review, reducing waste from undetected failures.

#### Design Documentation

The complete set of engineering records created during a design project — including problem statements, research notes, design specifications, sketches, CAD files, engineering drawings, test data, and revision history — that makes a design reproducible and auditable.

**Example:** Design documentation so complete that a different engineer could build and test the device from the records alone is the gold standard — it's the engineering equivalent of writing a recipe detailed enough that a stranger could cook the dish.

#### Design Specifications

A formal document listing the measurable performance targets, dimensional constraints, material requirements, and testing criteria that a successful design must satisfy. Specifications translate a problem statement into verifiable engineering requirements.

**Example:** A design specification might state: "Part must support 20 N at mid-span without deflecting more than 1 mm, must fit within a 50 × 50 × 20 mm envelope, and must be printable without supports."

#### Desktop Printer Revolution

The period roughly from 2009 to the present during which falling prices, open-source hardware, and community-driven development made FDM 3D printing accessible to hobbyists, educators, and small businesses. Machines that once cost $30,000 became available for under $300.

**Example:** The original MakerBot Cupcake CNC (2009) sold as a kit for around $750, making desktop FDM printing accessible to makers for the first time.

#### DfAM Principles

Design for Additive Manufacturing (DfAM) — a set of guidelines and strategies for designing parts that take full advantage of AM's geometric freedom while avoiding its limitations. DfAM is the opposite of designing for machining or injection molding.

**Example:** A DfAM approach to a mounting bracket consolidates six machined parts into one printed piece with integrated fastener bosses, internal wire channels, and a topology-optimized web — reducing assembly time and overall mass.

#### Dimensional Accuracy

The degree to which the measured dimensions of a printed part match the dimensions specified in the CAD model. Expressed as absolute deviation (±0.1 mm) or relative tolerance (±0.1%), dimensional accuracy is affected by calibration, material shrinkage, and process parameters.

**Example:** A well-calibrated FDM printer typically achieves ±0.2 mm absolute accuracy for features larger than 10 mm; a professional SLA printer may achieve ±0.05 mm under similar conditions.

#### Directed Energy Deposition

An AM process category in which focused thermal energy — typically a laser or electron beam — simultaneously melts material (wire or powder) as it is deposited, building up or repairing parts with high deposition rates. Commonly used for large metal components and repair.

**Example:** Aerospace companies use directed energy deposition to add material to worn turbine blades, restoring them to specification without scrapping the entire expensive part.

#### DLP Process

Digital Light Processing (DLP) — a vat photopolymerization process in which a digital micromirror device (DMD) chip projects a UV image of each layer onto the resin surface, curing the full layer at once. DLP offers higher brightness and longer light-source life than MSLA.

**Example:** Dental and jewelry studios often choose DLP resin printers because the projected image maintains consistent resolution across the entire build area, unlike laser-based systems.

#### DMLS Process

Direct Metal Laser Sintering (DMLS) — a powder bed fusion process, associated with EOS GmbH, in which a high-power fiber laser selectively melts metal powder (stainless steel, titanium, Inconel, aluminum) layer by layer in an inert-atmosphere chamber. The result is a dense, functional metal part.

**Example:** Orthopedic implant manufacturers use DMLS to print titanium hip stems with porous surfaces that encourage bone in-growth — a geometry impossible to machine.

#### Dual Credit Programs

Agreements between high schools and colleges that allow students to simultaneously earn both high-school and college credit for the same course, reducing the cost and time required to complete post-secondary education.

**Example:** A PLTW Engineering Design course offered for dual credit at a local community college lets a student enter college as a second-semester freshman, potentially saving thousands of dollars in tuition.

#### EBM Process

Electron Beam Melting (EBM) — a powder bed fusion process in which a focused electron beam, operated in high vacuum, melts metal powder layer by layer. The vacuum environment and high preheat temperatures reduce residual stress, making EBM well-suited for reactive metals like titanium.

**Example:** Arcam (GE Additive) EBM systems are used to manufacture titanium acetabular cups for hip replacements, producing a trabecular (lattice-like) surface in a single build step.

#### Edge AI On Printers

The deployment of machine learning inference directly on the printer's onboard processor (microcontroller or ARM SoC), rather than sending data to a cloud server, enabling real-time AI-powered monitoring and response with low latency, no internet dependency, and improved privacy.

**Example:** Bambu Lab printers run their spaghetti detection and first-layer inspection models on an onboard ARM processor, analyzing camera frames in real time without sending footage to external servers.

#### Elegoo Printers

A line of budget FDM and resin printers produced by Elegoo (Shenzhen, China), best known for the Neptune FDM series and the Saturn and Mars resin series, offering competitive price-to-performance ratios for the hobbyist and educational market.

**Example:** The Elegoo Saturn 4 Ultra offers a large 218 × 123 × 260 mm resin build volume at a competitive price, making large-format MSLA printing accessible to students and small studios.

#### Elephants Foot

A print defect in which the first few layers of a print are wider than the intended dimensions, creating a flared "elephant's foot" at the base of the part. Caused by a Z offset that squishes the first layer too much, or by a bed temperature so high that the first layers remain soft and spread.

**Example:** An elephant's foot on an ABS print can be reduced by raising Z offset slightly (less squish) and reducing bed temperature from 110°C to 100°C for the first layer.

#### Elongation At Break

The percentage increase in a material's length from its original (unstretched) dimension to the length at which it fractures under tension. High elongation indicates a tough, flexible material; low elongation indicates a brittle one.

**Example:** Standard PLA elongation at break is roughly 3–6%, meaning it snaps with little deformation; TPU can reach 400–600%, stretching dramatically before tearing.

#### Enclosed Printer

A 3D printer design in which the build area is surrounded by panels (typically metal, acrylic, or polycarbonate) that contain heat from the heated bed, reduce drafts, and limit the emission of VOCs and UFPs into the surrounding environment. Enclosures improve print quality for warping-prone materials and are a safety measure.

**Example:** Enclosing a printer with ABS-printing polycarbonate panels raises the internal air temperature to ~40°C passively (from bed heat alone), significantly reducing corner warping without an active heater.

#### Engineering Communication

The practice of conveying technical information — through drawings, reports, presentations, and models — to audiences ranging from technical peers to non-specialist stakeholders. Clear communication is as essential as technical skill in professional engineering.

**Example:** A dimensioned CAD drawing of a printed bracket communicates to a machinist exactly what the designer intends, using standardized symbols that transcend language barriers.

#### Engineering Notebook

A chronological, bound or digital record of a designer's observations, sketches, calculations, test data, and design decisions, maintained throughout a project. It serves as evidence of the design process and protects intellectual property.

**Example:** Dating and signing each notebook entry with a witness signature creates a legal record of when an invention was conceived — important for patent disputes.

#### Engineering Resins

High-performance photopolymer resin formulations designed to mimic the mechanical properties of injection-molded engineering plastics — including ABS-like impact resistance, PP-like flexibility, or high-temperature resistance. They typically require more careful exposure calibration.

**Example:** Formlabs' Tough 2000 resin is an engineering resin designed to approximate ABS properties, making it suitable for functional enclosure prototypes that must survive drop testing.

#### Ethical Use Of AM

The application of moral reasoning to decisions about what to design, print, and share using additive manufacturing technology, including considerations of safety, legality, privacy, environmental impact, and the potential for misuse of fabrication capabilities.

**Example:** The ethical question of whether to publish detailed STL files for functional firearm components involves balancing free information access against public safety concerns — a genuine dilemma without a universally agreed answer.

#### Exposure Settings

In resin printing, the duration and intensity of UV light exposure for each layer — including the initial "burn-in" layers (longer exposure to ensure bed adhesion) and the normal layers (shorter, calibrated exposure to cure each cross-section without bleed-through).

**Example:** Setting exposure time to 2.0 s for normal layers when the material needs 2.5 s produces under-cured parts that are soft and sticky; 4.0 s over-cures, bloating fine features and reducing detail.

#### Extrude Feature

A CAD operation that adds or removes material by pushing a 2D sketch profile a specified distance along an axis perpendicular to the sketch plane, creating a prismatic (constant cross-section) solid or void.

**Example:** Extruding a 30 × 20 mm rectangle sketch 10 mm upward creates a solid rectangular block; extruding it as a "cut" removes that shape from an existing solid.

#### Extruder Mechanism

The motor-driven assembly that grips and advances filament toward the hotend at a controlled rate. It uses a toothed gear or drive wheel pressing against a bearing to push or pull filament; the gear's teeth bite into the filament surface.

**Example:** A dual-drive extruder (like the Bondtech BMG) grips filament from both sides with two meshed toothed gears, providing more pushing force and less slipping than a single-drive design.

#### Failed Adhesion

A print failure in which the part detaches from the build plate during printing — either immediately after the first layer or mid-print — resulting in a failed print and potentially a spaghetti mess. Causes include an unlevel bed, insufficient bed temperature, contaminated plate surface, or incorrect Z offset.

**Example:** Wiping the PEI plate with IPA and ensuring a first-layer squish of 10–20% extrusion line width resolves most adhesion failures on PLA — the two most impactful variables.

#### FDM FFF Process

Fused Deposition Modeling (FDM, trademarked by Stratasys) and Fused Filament Fabrication (FFF, the open-source equivalent term) both describe a material extrusion process in which thermoplastic filament is melted and extruded through a nozzle to build parts layer by layer.

**Example:** The Bambu Lab P1S uses FFF to print at speeds exceeding 500 mm/s, demonstrating how far the open-source FDM concept has evolved since the original Stratasys patent.

#### FDM Patent Expiration

The lapse of Stratasys's foundational Fused Deposition Modeling patents — primarily in 2009 — which removed legal barriers to manufacturing low-cost FDM printers. This event directly triggered an explosion of open-source and consumer desktop printers.

**Example:** Within two years of the key FDM patent expiring, dozens of companies introduced sub-$1,000 desktop printers, collapsing the price of entry-level additive manufacturing from tens of thousands of dollars.

#### FDM Printer Anatomy

The set of physical subsystems comprising a fused deposition modeling printer: the motion system (frame, axes, motors, belts), the toolhead (extruder, hotend, cooling fan), the build platform (heated bed, surface), and the electronics (motherboard, display, power supply).

**Example:** Understanding that the hotend and extruder are separate components — one melts plastic, the other drives it — helps a student correctly diagnose whether a clog is upstream or at the nozzle.

#### Feature-Based Modeling

A CAD approach in which a 3D part is constructed as an ordered sequence of discrete operations — extrusions, cuts, fillets, patterns — each called a feature. The feature tree records the design history and allows individual features to be edited or suppressed.

**Example:** A part's feature tree might list: Sketch1 → Extrude1 (base block) → Sketch2 → Cut-Extrude1 (hole) → Fillet1 (rounded edge) — each step editable independently.

#### Filament Loading

The process of inserting a new filament strand into the printer's extruder, feeding it through the Bowden tube or direct-drive mechanism, and advancing it through the hotend until fresh material purges from the nozzle. Done before each print or material change.

**Example:** Most modern printers automate filament loading with a sensor-triggered feeding routine; the user inserts the filament tip into the extruder and the machine feeds it the rest of the way.

#### Filament Recycling

The process of collecting failed prints, support structures, and waste filament, shredding them into granules, and re-extruding them into new filament using a desktop filament extruder. Closed-loop recycling reduces plastic waste from the printing process.

**Example:** A school print lab using a Felfil Evo filament extruder can recycle failed PLA prints back into usable filament, significantly reducing material costs and teaching circular economy principles simultaneously.

#### Filament Splicing

A multi-material technique in which separate filament segments of different colors or materials are fused end-to-end into a single strand before printing, eliminating the need for mid-print filament changes. Splicing devices automate this process for multi-color printing.

**Example:** Palette 3 by Mosaic Manufacturing splices up to four filament colors into a single combined strand before feeding it to a standard single-extruder printer, enabling multi-color printing without hardware modification.

#### Filament Storage And Drying

The practice of keeping filament spools in sealed, desiccant-containing containers to prevent moisture absorption, and drying already-wet filament in a food dehydrator or dedicated filament dryer before use. Wet filament produces bubbling, stringing, and poor layer bonding.

**Example:** A spool of nylon left open in a humid workshop overnight may absorb enough moisture to cause audible popping and visible bubbles at the nozzle — a filament dryer at 70°C for 8 hours restores print quality.

#### File Naming Conventions

A systematic approach to naming digital files using descriptive, consistent, and machine-readable identifiers — including project name, version number, date, and key parameters — to facilitate organization, retrieval, and collaboration.

**Example:** `spinal-brace_v2-3_0.4mm-nozzle_PETG_2025-03.stl` encodes project, revision, nozzle size, material, and date — enabling anyone on the team to identify the correct file without opening it.

#### Fillet And Chamfer

A fillet rounds a sharp edge or corner with a specified radius; a chamfer replaces a sharp edge with a flat angled cut at a specified distance and angle. Both reduce stress concentrations in printed parts and improve printability of external edges.

**Example:** Adding a 1 mm fillet to the base corners of a printed bracket spreads stress over a larger area, reducing the chance of cracking under load compared to sharp 90° corners.

#### Fire Safety

The set of precautions and equipment — including never leaving a printer unattended during a long print, using monitored smoke detectors, keeping a fire extinguisher accessible, and avoiding prints on flammable surfaces — that reduce the risk of printer fires.

**Example:** Several high-profile printer fires have been traced to thermal runaway events (uncontrolled temperature spikes) when firmware safety checks were disabled; always ensure thermal runaway protection is active in printer firmware.

#### First Layer Settings

The collection of slicer parameters — including layer height, print speed, temperature, and flow rate — applied specifically to the first layer to maximize adhesion to the build plate. The first layer is the most critical layer in the entire print.

**Example:** Slowing first-layer speed to 20 mm/s and increasing first-layer height to 0.3 mm gives the molten plastic more time to spread and bond with the heated bed surface.

#### First-Layer Failures

Print defects occurring during or immediately after the first layer, including adhesion failure (the print detaches), under-squish (filament doesn't stick), over-squish (nozzle scrapes), or missing sections. First-layer problems are the most common cause of failed prints and almost always stem from Z offset or bed leveling errors.

**Example:** A first layer that looks like a series of round spaghetti strands rather than flattened ribbons indicates the nozzle is too far from the bed — decrease Z offset by 0.05 mm increments until the strands squish flat.

#### First-Layer Vision Check

An AI feature, implemented in some printers (including Bambu Lab), that uses a built-in sensor or camera to automatically scan the first layer after it is deposited and assess adhesion, extrusion consistency, and Z-offset accuracy before the print continues.

**Example:** Bambu Lab's lidar-based first-layer inspection scans each extrusion line of the first layer and triggers a warning or adjustment if extrusion width deviates significantly from the expected value, catching Z-offset errors before they ruin an 8-hour print.

#### Force And Pressure

Force is a push or pull acting on an object, measured in newtons (N). Pressure is force distributed over an area, measured in pascals (Pa). These concepts explain why thin walls crack under load and why nozzle clogging increases back-pressure in the hotend.

**Example:** A part designed to support a 50 N load over a 10 cm² surface experiences 500 Pa of pressure — a calculation that informs minimum wall thickness decisions.

#### FreeCAD Workflow

The parametric 3D modeling process specific to FreeCAD — a free, open-source CAD application with a workbench-based interface. It is less polished than commercial alternatives but has no cost or licensing restrictions, making it practical for schools and makers.

**Example:** A student using FreeCAD accesses the Part Design workbench to sketch and extrude features, then switches to the Mesh workbench to export an STL file for slicing.

#### Functional Prototype Design

The design of a physical model that demonstrates and tests the core functional requirements of a concept — not just its appearance. Functional prototypes validate mechanical fit, motion, and performance before committing to final materials or production methods.

**Example:** A functional prototype of a door-latch mechanism prints the moving parts in PETG to verify that the cam geometry engages correctly and the spring force is sufficient before designing the production injection-mold.

#### Fusion 360 Workflow

The parametric CAD, simulation, and CAM process specific to Autodesk Fusion 360 — an integrated platform that combines solid modeling, mesh editing, rendering, finite element analysis, and toolpath generation in a single application with cloud-based storage.

**Example:** A Fusion 360 user can model a part, run a stress simulation to check for weak spots, and generate a slicer-ready STL — all without leaving the application.

#### Fuzzy Skin

A slicer feature that adds controlled random perturbations to the outer perimeter path of a print, creating a deliberately rough, matte, or tactile surface texture instead of the smooth layer-line appearance of standard FDM prints. The effect mimics leather, stone, or fabric textures.

**Example:** Applying fuzzy skin to a phone case design creates a grip-enhancing rough texture on the back surface without requiring post-processing, as the texture is generated entirely through the slicer's perimeter path algorithm.

#### G-code Basics

G-code is a numerical control programming language in which alphanumeric commands instruct a machine's motion system to move to specified coordinates, set temperatures, control fans, and manage extruder flow. It is the universal instruction set for CNC machines and 3D printers.

**Example:** The G-code command `G1 X100 Y50 F3000` tells the printhead to move linearly to position X=100 mm, Y=50 mm at a feed rate of 3000 mm/min.

#### G-code Reading

The ability to interpret raw G-code output from a slicer — identifying move commands, temperature settings, retractions, and layer changes — to diagnose print problems or verify that slicer settings produced the intended toolpath.

**Example:** Scrolling through G-code and finding `M104 S215` confirms the slicer set the hotend to 215°C; finding no `G28` (home) command at the start indicates a missing start script.

#### GD&T Basics

Geometric Dimensioning and Tolerancing (GD&T) — a standardized symbolic language (ASME Y14.5) for defining and communicating allowable variation in part geometry: size, form, orientation, location, and runout. GD&T replaces ambiguous plus/minus notes with precise geometric controls.

**Example:** A GD&T flatness callout of 0.1 mm on a printed build plate reference surface specifies that no point on that surface may deviate more than 0.1 mm from a perfect plane — more informative than a simple ±0.1 mm dimension.

#### Generative Design

An AI- or algorithm-driven design method in which software automatically generates and evaluates hundreds of structural configurations satisfying prescribed loads, materials, manufacturing constraints, and mass targets — often integrated into CAD platforms like Fusion 360.

**Example:** Entering a bracket's mounting points, load direction, and "must not exceed 80 g" mass target into Fusion 360's generative design tool produces dozens of topology-optimized candidates ranked by stiffness-to-weight ratio.

#### Geometry Basics

The branch of mathematics concerned with shapes, sizes, positions, angles, and dimensions of objects in space. Geometry is foundational to CAD modeling, mesh construction, and understanding how a 3D form breaks down into printable layers.

**Example:** Understanding that a cylinder is defined by a radius and height lets you correctly set parameters when designing a tube or boss feature in CAD software.

#### Glass Transition Temperature

The temperature range at which an amorphous (non-crystalline) polymer transitions from a rigid, glassy state to a softer, rubbery state. Below this temperature (Tg) the material is stiff; above it the material deforms under load. For FDM parts, Tg defines the maximum service temperature.

**Example:** PLA has a Tg of roughly 60°C, meaning a PLA printed phone mount left on a car dashboard in summer sun (70–80°C) will deform; PETG's Tg of ~80°C makes it a better choice for that application.

#### Hardened Nozzle

A nozzle manufactured from hardened steel, tungsten carbide, or ruby-tipped steel instead of soft brass, providing high abrasion resistance for printing composite filaments containing carbon fiber, glass fiber, stainless steel, or other hard particulate additives that rapidly erode brass nozzles.

**Example:** A brass nozzle printing carbon-fiber-filled filament may enlarge from 0.4 mm to 0.5 mm within 500 g of filament, degrading print quality; a hardened steel nozzle shows negligible wear over the same volume.

#### Heat Break

The thermally resistive tube or transition zone in a hotend that separates the hot zone (heater block and nozzle) from the cold zone (heatsink and extruder), preventing the filament from softening prematurely and causing a jam (heat creep).

**Example:** All-metal heat breaks allow printing above 240°C without PTFE degradation; PTFE-lined heat breaks are easier to retract cleanly but limit maximum temperature.

#### Heated Chamber

An enclosed build environment in which the air temperature is actively raised and maintained above ambient — typically 40–70°C for polymers — to slow the cooling rate of extruded material, reduce thermal gradients, and prevent warping of high-shrinkage materials like ABS, ASA, and PC.

**Example:** A Bambu Lab X1C with a heated chamber set to 45°C enables reliable ABS and ASA printing without warping on parts that would lift and fail on an open-frame printer.

#### High-Flow Hotend

A hotend design optimized to melt and deliver significantly larger volumes of filament per unit time than a standard hotend, enabling higher print speeds and/or larger nozzle diameters without under-extrusion. High-flow designs feature larger melt zones, higher-power heaters, and improved thermal transfer.

**Example:** The Bambu Lab hotend achieves a volumetric flow rate of ~35 mm³/s compared to ~12 mm³/s for a standard E3D V6, enabling the printer to maintain quality at 300 mm/s with a 0.4 mm nozzle.

#### High-Speed Printing

FDM printing at toolhead velocities significantly above the traditional 40–80 mm/s range — typically 150–500+ mm/s — made possible by high-flow hotends, lightweight CoreXY motion systems, input shaping, pressure advance, and optimized slicer acceleration profiles.

**Example:** Bambu Lab markets the X1C at a maximum print speed of 500 mm/s with 20,000 mm/s² acceleration; a part that takes 4 hours on a traditional printer can complete in under 1 hour on a high-speed machine.

#### Hole And Slot Tolerances

The dimensional adjustments applied to CAD hole and slot diameters to compensate for the tendency of FDM processes to print holes slightly undersized due to material shrinkage and extrusion pressure. Adding a 0.1–0.3 mm positive tolerance to mating holes prevents interference fits where clearance fits are intended.

**Example:** A hole designed as exactly 10 mm in CAD may print at 9.7 mm on a typical FDM printer; adding 0.2 mm to the CAD diameter (10.2 mm) produces a 10 mm hole after printing.

#### Hotend

The heated assembly at the tip of a 3D printer's toolhead that melts thermoplastic filament and delivers it through the nozzle at a controlled temperature. It consists of a heater block, thermistor or thermocouple, heat break, and nozzle.

**Example:** A hotend rated to 300°C is required to print high-temperature materials like polycarbonate or nylon; budget printers with PTFE-lined hotends are limited to about 240°C.

#### Ideation And Sketching

The design process step in which a wide variety of potential solutions are generated and captured as rough sketches, without immediate judgment or filtering. Quantity of ideas is prioritized over quality to stimulate creative thinking.

**Example:** A team generating ideas for a custom cable organizer might produce thirty thumbnail sketches in twenty minutes, later evaluating them against the design criteria.

#### IDEX Dual Extrusion

Independent Dual Extrusion — a printer design with two independently moving printheads on a shared X-axis, each carrying its own extruder and hotend. IDEX enables simultaneous mirrored or duplicated printing, or two-material printing without a purge tower.

**Example:** An IDEX printer in mirror mode simultaneously prints two identical parts — one from each head moving symmetrically — doubling throughput without any additional setup time.

#### Inductive Probe

A non-contact proximity sensor used for auto bed leveling that detects the presence of metal within a few millimeters by measuring changes in an electromagnetic field. Inductive probes are fast, wear-free, and highly repeatable, but only work on metal build plates.

**Example:** An inductive probe on a printer with an aluminum heated bed measures the plate surface in under 30 seconds before each print, with ±0.005 mm repeatability that exceeds what manual leveling can achieve.

#### Industrial Revolution

The period of rapid mechanization and factory-based production, originating in Britain circa 1760–1840, that shifted manufacturing from hand craft to machine-driven mass production. It established the paradigm of centralized fabrication that additive manufacturing now begins to decentralize.

**Example:** The spinning jenny and steam-powered loom automated textile production during the Industrial Revolution, just as 3D printers today automate complex geometry production in small shops and classrooms.

#### Industrial Vs Hobby Systems

The distinction between professional-grade AM systems (high accuracy, large build volumes, broad material capability, but costing $50K–$1M+) and consumer/desktop systems (lower cost, more limited capability, but accessible to students and small businesses). The gap between these categories has narrowed significantly since 2020.

**Example:** An industrial SLS machine costs $100K and produces isotropic nylon parts with ±0.1% dimensional accuracy; a desktop Formlabs Fuse 1+ costs ~$20K and offers comparable resolution but a smaller build volume.

#### Infill Density

The percentage of the interior volume of a print that is filled with material, ranging from 0% (hollow) to 100% (solid). Density directly affects part strength, weight, and print time.

**Example:** A decorative figurine may use 10% infill to save filament; a structural bracket under cyclic load may require 40–60% infill to avoid crushing or cracking.

#### Infill Patterns

The geometric arrangement — grid, gyroid, honeycomb, lightning, Hilbert curve, etc. — in which infill material is deposited in the interior of a part. Different patterns offer different trade-offs between strength, flexibility, print speed, and material use.

**Example:** Gyroid infill distributes stress more isotropically than rectilinear grid infill and is favored for flexible parts or parts experiencing loads from multiple directions.

#### Input Shaping

A Klipper firmware feature that measures the resonant frequencies of a printer's motion system using an accelerometer, then applies a mathematical compensation filter to G-code move commands that cancels out the excitation of those resonances, enabling higher print speeds without ringing artifacts.

**Example:** After running Klipper's input shaping calibration with an ADXL345 sensor, a printer that produced visible ringing at 100 mm/s can print ringing-free at 200 mm/s using the calculated resonance compensation.

#### Intellectual Property

The legal protections — patents, copyrights, trademarks, and trade secrets — that give creators exclusive rights over their inventions, artistic works, brand identifiers, and proprietary information. In AM, IP issues arise when printing objects from downloaded files.

**Example:** Downloading and printing a commercial product's patented geometry for personal use may constitute patent infringement, even if no money changes hands — the same logic applies to photocopying a copyrighted book.

#### IPA Handling

The safe use, storage, and disposal of isopropyl alcohol used to wash uncured resin from freshly printed parts. IPA is flammable, and resin-contaminated IPA is a hazardous waste that must be neutralized by UV exposure before disposal as solid waste, per local regulations.

**Example:** Leaving a container of resin-contaminated IPA in direct sunlight cures the dissolved resin into a solid that can be safely disposed in solid waste, reducing the amount of liquid hazardous waste requiring special handling.

#### ISO ASTM 52900 Standard

A jointly published international standard that establishes a unified vocabulary and seven process-category classification system for all additive manufacturing technologies. It provides the shared terminology used throughout this course and across industry.

**Example:** Before ISO/ASTM 52900, companies used proprietary brand names (FDM, SLS, SLA) inconsistently; the standard replaced brand usage with neutral category names like "material extrusion" and "powder bed fusion."

#### ISO Standards Body

The International Organization for Standardization — a non-governmental organization headquartered in Geneva that develops and publishes voluntary international standards across virtually every industry to ensure quality, safety, and interoperability.

**Example:** ISO standards give manufacturers worldwide a common language: a part stamped "ISO 9001 certified" signals that the producing facility meets internationally agreed quality management requirements.

#### Iteration Cycle

The repeated loop of designing, building, testing, and refining a solution based on test results and user feedback. Iteration is central to engineering design because first attempts rarely satisfy all specifications simultaneously.

**Example:** After discovering that a printed living-hinge cracked after ten flex cycles, a student iterates by switching from PLA to TPU and reducing layer height from 0.3 mm to 0.15 mm.

#### Joining Printed Parts

Methods of connecting separate 3D-printed components into an assembly, including mechanical fasteners, adhesives (CA glue, epoxy, solvent welding), heat-set inserts, snap fits, press fits, and plastic welding. The best method depends on material, load requirements, and disassembly needs.

**Example:** Heat-set brass inserts pressed into printed holes with a soldering iron create strong, reusable threaded connections in FDM parts — far more durable than threading directly into printed plastic.

#### Klipper Firmware

An open-source 3D printer firmware that runs motion planning and G-code processing on a host computer (typically a Raspberry Pi) rather than the printer's microcontroller, with the microcontroller handling only low-level stepper timing. Klipper enables advanced features including input shaping, pressure advance, and real-time configuration changes.

**Example:** Switching a printer from Marlin to Klipper and running ADXL345 resonance measurement enables automatic input shaping calibration, reducing ringing artifacts without any manual tuning.

#### Large-Format Resin

Resin vat photopolymerization printers with build volumes significantly larger than standard desktop models (larger than approximately 200 × 120 × 200 mm), enabling single-piece printing of large cosplay props, architectural models, dental arches, or footwear.

**Example:** The Elegoo Jupiter SE has a build volume of 277 × 156 × 300 mm — large enough to print a full-face helmet visor or a detailed architectural section in one piece without splitting the model.

#### Lattice Structures

Three-dimensional networks of interconnected struts and nodes that fill volume with far less material than a solid body while maintaining significant stiffness and strength. Lattices are a key DfAM strategy for lightweighting and energy absorption, achievable only through AM.

**Example:** A bicycle saddle with an internal gyroid lattice printed in TPU achieves custom compliance — firmer at the sit bones, softer at the pressure points — impossible to achieve with conventional foam padding.

#### Layer Height

The thickness of each deposited layer in an FDM print, measured in millimeters along the Z axis. Layer height is the primary determinant of surface quality, print time, and Z-resolution; smaller values produce smoother surfaces but require more layers and longer print times.

**Example:** Printing at 0.1 mm layer height produces a surface where individual layers are barely visible; at 0.3 mm the layer lines are clearly visible but the part prints roughly three times faster.

#### Layer Separation

A defect in which one or more printed layers delaminate or fail to bond to the layer below, creating a visible crack or gap through the part. Causes include too-low print temperature, excessive cooling, too-fast print speed, or moisture in the filament.

**Example:** A tall vase showing a horizontal crack two-thirds of the way up typically indicates a brief under-temperature event (perhaps from a draft cooling the hotend) that failed to melt the previous layer surface adequately.

#### Layer-By-Layer Principle

The fundamental operating concept of all additive manufacturing: a digital 3D model is mathematically sliced into thin horizontal cross-sections, each of which is physically deposited or cured in sequence until the complete part is built up from the base.

**Example:** A 30 mm tall FDM print at 0.2 mm layer height consists of 150 individual deposited layers — each one a slightly different cross-section of the original digital model.

#### LCD And Light Source

In MSLA resin printers, the liquid crystal display (LCD) panel acts as a per-pixel mask that selectively blocks or passes UV light from a backlight array, curing only the pixels corresponding to the current layer's cross-section. Mono LCDs offer higher UV transmission and longer service life.

**Example:** A 4K mono LCD panel has approximately 3840 × 2400 pixels across the build area; for a 192 × 120 mm build plate, each pixel represents about 0.05 mm — the effective XY resolution of the print.

#### Lead Screws

Threaded rods that convert the rotation of a stepper motor into precise linear motion along the Z axis by engaging a brass anti-backlash nut. Lead screws provide high positional accuracy and hold the bed position when the motors are powered off.

**Example:** A T8 lead screw with 8 mm pitch lead and a 200-step motor provides 0.04 mm of Z movement per step — far finer than a typical 0.2 mm layer height.

#### Lightweighting

A design strategy that reduces component mass through material removal, lattice infill, topology optimization, or part consolidation while maintaining or exceeding the structural performance of the original design. Lightweighting is especially valuable in aerospace and automotive applications.

**Example:** An aircraft bracket redesigned for AM using topology optimization and titanium DMLS may weigh 35% less than its machined aluminum predecessor, saving fuel over the aircraft's service life.

#### Linear Bearings

Bearings designed to allow smooth, low-friction sliding motion along a rod or rail rather than rotational motion. In FDM printers they guide the printhead and build plate along their respective axes, directly affecting print quality through smoothness and play.

**Example:** LM8UU linear bearings slide along 8 mm smooth rods; worn bearings develop play (wobble) that translates into Z-banding or wavy surfaces in the print.

#### Linear Rails

Precision hardened steel rails with recirculating ball bearing carriages used in place of smooth rods and linear bearings in high-performance printers. Linear rails offer lower friction, greater stiffness, and better resistance to off-axis loads than rod-and-bearing systems.

**Example:** Voron CoreXY printers use MGN9 and MGN12 linear rails for the XY toolhead axes; the increased rigidity at high acceleration speeds reduces toolhead deflection and improves dimensional accuracy.

#### LLM Tutoring For Students

The use of large language model-based conversational AI as an interactive learning assistant that answers student questions, explains concepts, provides worked examples, and gives feedback on design decisions in the context of a 3D printing or engineering course.

**Example:** A student who doesn't understand why their bridging is failing can ask an LLM tutor for an explanation; the model explains the physics of plastic cooling during bridge formation and suggests specific fan speed and speed adjustments to try.

#### Machine Learning Basics

A branch of artificial intelligence in which algorithms learn to make predictions or decisions by finding patterns in training data, rather than being explicitly programmed with rules. Machine learning underlies most modern AI applications in AM, from failure detection to material optimization.

**Example:** A machine learning model trained on 10,000 labeled images of FDM print surfaces learns to predict layer adhesion strength from visual texture alone — a relationship too complex to express as explicit rules.

#### Mainsail Web Interface

An open-source browser-based user interface for Klipper firmware that provides real-time printer status, interactive controls, print job management, temperature graphing, and configuration editing through a modern, responsive web application.

**Example:** Mainsail running on a Raspberry Pi allows a student to monitor a Klipper-based Voron printer, adjust live print parameters like speed and temperature, and watch the webcam — all from a phone across the school network.

#### Maker Movement

A cultural and technological phenomenon, accelerating from roughly 2005 onward, in which individuals use digital fabrication tools — including 3D printers, laser cutters, and microcontrollers — to design, build, and share physical objects outside traditional industrial settings.

**Example:** Makerspaces in public libraries and schools, stocked with FDM printers and CNC routers, are direct expressions of the Maker Movement's philosophy that fabrication tools should be democratically accessible.

#### Manifold Geometry

A mesh in which every edge is shared by exactly two faces and no faces overlap or self-intersect, creating a watertight, logically consistent surface that unambiguously separates interior from exterior volume. Manifold meshes slice correctly without errors.

**Example:** A cube mesh is manifold if each of its 12 edges is bordered by exactly 2 of the 12 triangular faces, with no gaps at corners or edges.

#### Manual Bed Leveling

The process of physically adjusting the build plate — typically by turning corner thumbscrews or knobs — to bring it into a consistent, uniform distance from the nozzle across its entire surface before printing. It requires a feel for the correct paper-drag resistance as the nozzle passes.

**Example:** Sliding a standard sheet of copy paper between the nozzle and a cold build plate and adjusting each corner until the paper drags slightly but doesn't bind is the classic manual leveling technique.

#### Manufacturing Career Clusters

The groupings of related careers in manufacturing — including production, quality, design, maintenance, and supply chain — organized by the US career and technical education (CTE) framework to help students identify pathways from high school through workforce entry or college.

**Example:** The Manufacturing career cluster includes roles from CNC operator and quality inspector (entry-level) through process engineer and manufacturing manager (degree-level), showing students the full spectrum of opportunity.

#### Mass And Density

Mass is the quantity of matter in an object, measured in grams or kilograms. Density is mass per unit volume (g/cm³). Together they determine how much a printed part weighs and whether it will float, sink, or meet weight requirements for a design.

**Example:** PLA has a density of roughly 1.24 g/cm³, so a solid 100 cm³ PLA part would have a mass of about 124 g — useful for estimating filament usage.

#### Mate Constraints

Relationships defined in a CAD assembly that fix the relative position and orientation of two components — examples include coincident (faces flush), concentric (axes aligned), and tangent (surfaces touching). Mates simulate real-world physical contact.

**Example:** A concentric mate between a shaft's cylindrical axis and a hole's axis ensures the shaft is always centered in the hole, regardless of how other assembly dimensions change.

#### Material Data Sheet

A document published by a material manufacturer that specifies the physical, mechanical, thermal, and processing properties of a material — including tensile strength, Tg, density, recommended print temperatures, and storage conditions. Essential for selecting the correct material for an application.

**Example:** Before printing a bracket for outdoor use, consulting the ASA filament data sheet confirms it retains 90% of its tensile strength after UV exposure testing, unlike ABS which degrades rapidly outdoors.

#### Material Extrusion

An AM process category in which material — typically thermoplastic filament — is selectively dispensed through a heated nozzle and deposited layer by layer to build a part. It is the most widely used AM process in education and desktop manufacturing.

**Example:** Consumer FDM printers like the Prusa MK4 and Bambu Lab X1C both fall under material extrusion, though they differ significantly in speed and features.

#### Material Jetting

An AM process category in which droplets of build material — typically photopolymer or wax — are selectively deposited from print heads and cured or solidified layer by layer, similar to how an inkjet printer deposits ink but building in three dimensions.

**Example:** Stratasys PolyJet printers use material jetting to produce full-color, multi-material prototypes with smooth surfaces directly from the machine, without post-processing.

#### Mesh Geometry

A digital representation of a 3D surface as a network of interconnected polygonal faces — most commonly triangles — defined by vertex coordinates and connectivity data. Mesh geometry is the universal intermediate format between CAD models and slicers.

**Example:** A smooth CAD sphere becomes a mesh of 500–50,000 triangles depending on export resolution; at low resolution the sphere looks like a faceted gemstone rather than a smooth ball.

#### Mesh Repair

The process of identifying and correcting geometric errors in a mesh file — including holes, inverted normals, non-manifold edges, and self-intersections — so the slicer can correctly interpret the model as a closed solid.

**Example:** Tools like Microsoft 3D Builder, Meshmixer, and PrusaSlicer's built-in repair function can automatically close small holes and fix flipped triangles that would otherwise cause slicing artifacts.

#### Metal AM Overview

A summary of the AM processes capable of producing fully dense metal parts — primarily powder bed fusion (DMLS, SLM, EBM) and directed energy deposition — including their material options, typical accuracy, post-processing requirements, and cost relative to conventional machining.

**Example:** A titanium bracket produced by DMLS may cost $500 versus $50 for an aluminum machined equivalent, but the AM bracket can incorporate internal cooling channels or optimized lattice geometry impossible to machine.

#### Metal Fill Filament

A composite filament blending a thermoplastic base with fine metal powder (copper, brass, bronze, iron, or stainless steel), producing parts with metallic weight, appearance, and the ability to be polished or chemically patinated. It is not a substitute for structural metal AM.

**Example:** A bronze-fill PLA figurine polished with progressively finer sandpaper and then treated with a patina solution develops an authentic aged-bronze surface appearance, suitable for decorative display.

#### 3MF File Format

The 3D Manufacturing Format — an XML-based open file format developed by the 3MF Consortium that encapsulates geometry, color, material, print settings, and thumbnail in a single file. It preserves more information than STL and is increasingly preferred for modern slicers.

**Example:** A 3MF file exported from Bambu Studio retains the plate layout, support settings, and material assignments, so a colleague can open the exact same print setup without reconfiguring anything.

#### Micrometers

A precision measuring instrument that uses a calibrated screw mechanism to measure small external dimensions — typically filament diameter, wall thickness, or nozzle-to-bed gap — with resolution of 0.01 mm or better, finer than most digital calipers.

**Example:** Measuring filament diameter with a micrometer at three points along a 100 mm length reveals whether a spool is within its ±0.05 mm specification, which affects extrusion consistency.

#### MJF Process

Multi Jet Fusion (MJF) — a powder bed fusion process developed by HP in which inkjet arrays deposit a fusing agent and a detailing agent onto nylon powder before an infrared heating pass melts the treated powder. MJF produces isotropic parts faster than SLS.

**Example:** HP MJF parts printed in PA12 exhibit nearly identical mechanical properties in X, Y, and Z directions — a significant advantage over FDM for functional end-use parts.

#### Mono LCD Resolution

The pixel density and total resolution of the monochrome LCD panel in an MSLA resin printer, which directly determines the minimum feature size the printer can resolve in the XY plane. Higher resolution panels produce finer details and smoother curves.

**Example:** A 12K mono LCD with 11,520 × 5,120 pixels across a 218 × 123 mm build plate produces an XY pixel size of ~19 μm — resolving detail that rivals professional SLA systems.

#### Motherboard Firmware

The combination of the printer's control electronics (motherboard) and the software (firmware) permanently stored on it that interprets incoming G-code, controls stepper drivers, manages temperature PID loops, and coordinates all machine functions.

**Example:** Marlin and Klipper are the two most common open-source 3D printer firmware systems; Klipper offloads computation to a Raspberry Pi, enabling faster processing and easier configuration changes.

#### Mouse And 3D Navigation

The set of mouse gestures and keyboard shortcuts used to orbit, pan, and zoom within a 3D CAD or slicer viewport. Fluent navigation lets a designer inspect all faces of a model without reorienting the part physically.

**Example:** In most CAD tools, holding the middle mouse button and dragging orbits the model; scrolling the wheel zooms in and out.

#### MSLA Process

Masked Stereolithography (MSLA) — a vat photopolymerization process in which an LCD panel acts as a pixel-by-pixel mask, allowing a UV light source to cure an entire layer simultaneously rather than tracing it point by point. It is the dominant technology in consumer resin printers.

**Example:** Elegoo and Anycubic desktop resin printers use MSLA; because the entire layer cures at once, print time depends on layer count rather than layer complexity.

#### Multi-Color Printing

A 3D printing capability that enables the use of multiple filament colors within a single print job, producing parts with integrated color graphics, text, or patterns without painting. Multi-color printing is a specific application of multi-material hardware using same-type filaments of different colors.

**Example:** A multi-color printer can produce a topographic map with elevation zones in different greens and browns, or a chess set where each piece type is a different color, all in a single unattended print.

#### Multi-Material Printing

A 3D printing capability that enables the deposition of two or more distinct filament materials within a single print job, allowing parts with combinations of rigid and flexible zones, dissolvable support interfaces, or multiple structural materials to be produced without manual material changes.

**Example:** Printing a phone case with a rigid PETG frame and soft TPU corner bumpers in a single multi-material job produces a composite part that would otherwise require two separate prints glued together.

#### Multi-Material Waste

The purged material generated when a multi-material printer flushes the previous material from the nozzle before printing with a new material. Purge volume is a significant overhead cost in multi-material printing, typically ranging from 100–500 mm³ per color change.

**Example:** A 16-color print with 50 color changes generates substantial purge waste — optimizing color change sequences to minimize purge volume (transitioning between similar colors rather than dark-to-light) reduces material waste by 30–50%.

#### NC3 Certifications

The National Coalition of Certification Centers — a network of industry-validated technical certifications offered through community colleges and high schools that verify student competency in specific manufacturing, AM, and STEM skills recognized by employers.

**Example:** Earning an NC3 3D Printing Technician certification documents a student's verified ability to operate, calibrate, and troubleshoot FDM printers — a credential visible on a résumé before graduation.

#### Neural Networks Overview

A class of machine learning models loosely inspired by biological neural networks, consisting of layers of interconnected mathematical nodes (neurons) that transform input data through learned weights into output predictions. Convolutional neural networks (CNNs) are the basis of most image-based AM inspection systems.

**Example:** A convolutional neural network for print failure detection applies learned filters to each camera frame, detecting the spatial patterns (stringy filament tangles, detached layers) that distinguish failures from normal prints.

#### NIMS Certifications

National Institute for Metalworking Skills (NIMS) — industry-developed credentials that certify machinist, CNC, and precision manufacturing competencies. NIMS credentials are increasingly expanding to include AM-related process skills.

**Example:** A NIMS Additive Manufacturing credential signals to an employer that a technician can operate metal AM equipment, interpret build parameters, and perform first-article inspection — verified by a nationally recognized body.

#### Non Manifold Errors

Geometric conditions in a mesh where an edge is shared by more than two faces, faces overlap, or a hole exists in the surface — making the mesh logically ambiguous as a solid. Non-manifold geometry confuses slicers and produces incorrect or failed prints.

**Example:** If two separate bodies in a CAD assembly are exported as a single STL without being merged, the shared surface between them creates non-manifold edges that cause slicing artifacts.

#### Nozzle

The replaceable metal orifice at the tip of a hotend through which molten filament is extruded. Nozzle diameter (typically 0.4 mm for standard use) determines minimum feature size and maximum extrusion rate; material (brass, hardened steel, ruby) determines abrasion resistance.

**Example:** Switching from a 0.4 mm to a 0.8 mm nozzle roughly doubles extrusion rate, cutting print time nearly in half for large structural parts where fine detail is not required.

#### Nozzle Change

The maintenance procedure of removing the current nozzle from a heated hotend and installing a replacement, required when a nozzle is worn, clogged beyond recovery, or when switching to a different diameter or material (e.g., brass to hardened steel for abrasive filaments).

**Example:** Changing to a 0.6 mm hardened steel nozzle before printing carbon-fiber-filled filament protects the nozzle from abrasive wear that would rapidly enlarge a soft brass nozzle's orifice.

#### Nylon Filament

A family of polyamide thermoplastics (PA6, PA12, PA6-6) that produce strong, tough, and wear-resistant parts with good fatigue resistance. Nylon is highly hygroscopic (absorbs moisture from air), which causes print quality to degrade if filament is not kept dry.

**Example:** Nylon is preferred for gears, functional hinges, and load-bearing brackets; its high toughness lets it absorb shock loads that would crack PLA or ABS parts.

#### Obico Open Monitoring

An open-source 3D print monitoring platform (formerly The Spaghetti Detective) that combines AI failure detection, remote camera access, print management, and multi-printer support in a self-hostable or cloud-hosted service compatible with OctoPrint and Klipper/Moonraker.

**Example:** A school running 15 printers can connect all of them to a self-hosted Obico server, receiving automated failure alerts and reviewing real-time camera feeds for every printer from a single dashboard.

#### OBJ File Format

A text-based 3D geometry file format that stores vertex positions, texture coordinates, surface normals, and material references (via an associated MTL file). OBJ supports color and texture data that STL lacks, making it common for artistic and multi-color models.

**Example:** A painted character model downloaded from a sculpting application arrives as an OBJ with texture maps; the slicer can use the color data to assign different filament colors to different regions.

#### OctoPrint Server

An open-source web-based 3D printer management application that runs on a Raspberry Pi or similar single-board computer connected to the printer, providing remote monitoring, file management, G-code streaming, and a plugin ecosystem for extended functionality.

**Example:** OctoPrint's Spaghetti Detective (Obico) plugin, time-lapse recording, and remote access over the internet transform a basic FDM printer into a remotely manageable, AI-monitored production tool.

#### Onshape Workflow

The browser-based parametric CAD process specific to the Onshape platform, which stores all files in the cloud, supports real-time multi-user collaboration, and maintains full version history without manual saves. It requires no software installation and works on any device with a browser.

**Example:** A student can start a design on a school Chromebook in Onshape and continue editing it on a home laptop without transferring any files, because the model lives entirely in the cloud.

#### Open-Source Licenses

Legal frameworks that allow creators to share designs, software, and hardware while specifying the conditions under which others may use, modify, and redistribute them. Open-source licenses underpin the RepRap project, most desktop printer firmware, and the majority of free 3D models online.

**Example:** A design released under the GPL (GNU General Public License) requires that any derivative work also be released under GPL — this "copyleft" provision prevented early RepRap designs from being incorporated into closed commercial products without reciprocal sharing.

#### OrcaSlicer

An open-source slicer derived from Bambu Studio, optimized for high-speed printing and featuring advanced calibration workflows (flow rate, pressure advance, resonance), multi-plate management, and compatibility with Bambu, Prusa, Voron, and other printers.

**Example:** OrcaSlicer's built-in calibration wizard guides a user through flow rate calibration, pressure advance tuning, and max volumetric speed testing in a structured sequence, producing optimized profiles in under an hour.

#### Over-Extrusion

A print defect in which the printer deposits more material than specified, producing bulging, blobbing, raised seams, and dimensional inaccuracy. Causes include too-high flow rate, excessive temperature, or incorrect e-step calibration.

**Example:** A wall that measures 1.5 mm when designed as 1.2 mm indicates over-extrusion; reducing the flow multiplier by 10% and recalibrating the extruder brings dimensions back in spec.

#### Overhangs

Regions of a 3D model that extend horizontally beyond the layer below, requiring either support structures or careful orientation to print successfully. Most FDM printers handle overhangs up to 45–60° from vertical without support.

**Example:** A nose cone printed tip-up has the nose as a gentle overhang that builds progressively inward layer by layer; printed upside-down, the same cone overhangs dramatically and requires substantial supports.

#### Painting And Priming

The application of primer (a porous adhesion layer) and paint to the surface of a printed part to improve aesthetics, color uniformity, and surface protection. Most 3D-printed surfaces benefit from a filler primer that fills micro-texture before the color coat.

**Example:** A gray sandable filler primer sprayed in thin coats and sanded between coats fills the subtle layer texture of an FDM print, creating a surface indistinguishable from an injection-molded part before color paint is applied.

#### Parametric Modeling

A CAD methodology in which dimensions and geometric relationships are stored as editable parameters (numbers or equations), so the model updates automatically when any parameter changes. This enables rapid design iteration without rebuilding geometry from scratch.

**Example:** Setting a wall thickness parameter to "T = 3 mm" across an entire assembly means changing T to 4 mm updates every wall simultaneously — a major time-saver during iteration.

#### Part Orientation Strategy

The deliberate selection of how a model is positioned on the build plate to optimize print quality, minimize support volume, maximize strength along the primary load axis, and reduce print time. Orientation is one of the most impactful decisions in FDM manufacturing.

**Example:** A carabiner printed with its gate in the vertical plane maximizes tensile strength along the load path (X–Y layer direction) but may require supports; printed upright it needs no supports but is weaker.

#### Pattern Features

A CAD operation that duplicates one or more features — such as holes, bosses, or cuts — in a linear array, circular arrangement, or along a curve, without requiring each instance to be modeled individually.

**Example:** Creating a linear pattern of 8 ventilation slots spaced 5 mm apart takes seconds in CAD rather than manually sketching and cutting each slot separately.

#### PEI Flex Plate

A build surface consisting of a spring steel sheet coated with PEI (polyetherimide) polymer, secured to the printer's magnetic heated bed. Parts adhere firmly during printing and release easily when the flex plate is removed and bent slightly after cooling.

**Example:** The snap-on magnetic PEI flex plate popularized by Prusa eliminates the need for adhesion sprays or glue on the bed — PLA and PETG stick at printing temperature and release cleanly when the plate cools to room temperature.

#### PETG Filament

Polyethylene Terephthalate Glycol — a thermoplastic that combines the ease of printing close to PLA with improved toughness, moisture resistance, and a higher glass transition temperature (~80°C). PETG is semi-transparent and bonds well to itself.

**Example:** PETG is a popular choice for water bottle adaptors, food-contact parts (when printed carefully), and mechanical components that need more impact resistance than PLA provides.

#### Photopolymer Resins

Liquid mixtures of monomers, oligomers, and photoinitiators used in vat photopolymerization processes. When exposed to light of the correct wavelength (typically 385–405 nm), the photoinitiators trigger a chain reaction that cross-links the monomers into a solid polymer network.

**Example:** Standard desktop resin printers use 405 nm UV-wavelength light; purchasing a resin formulated for 365 nm (like some specialized dental resins) and using it in a 405 nm printer will result in partial or no curing.

#### PLA Filament

Polylactic Acid — a biodegradable thermoplastic derived from corn starch or sugarcane that is the most commonly used FDM filament. PLA prints at relatively low temperatures (190–220°C), adheres well without a heated bed, and produces minimal fumes.

**Example:** PLA is the recommended starting material for beginners: it is forgiving of a wide range of print temperatures, rarely warps, and is available in hundreds of colors at low cost.

#### PLTW Design Process

The Project Lead The Way engineering design process — a structured, iterative problem-solving framework used in PLTW courses that guides students from problem definition through research, ideation, prototyping, testing, and communication of results.

**Example:** A PLTW student designing an adaptive tool grip follows the design process by first documenting user needs, then sketching multiple concepts before committing to a prototype.

#### Polycarbonate Filament

A high-performance engineering thermoplastic (PC) with excellent impact resistance, optical clarity (in natural form), and a high glass transition temperature (~147°C). Polycarbonate requires a high-temperature hotend (260–310°C), a heated enclosure, and good adhesion strategies.

**Example:** Riot shields and bulletproof glazing are made from polycarbonate sheet; PC filament brings similar toughness and heat resistance to printed structural components.

#### Polymer Basics

The study of large molecules (polymers) formed by linking many smaller repeating units (monomers) into long chains. Polymers form the basis of all thermoplastic filaments and photopolymer resins used in desktop additive manufacturing.

**Example:** Polylactic acid (PLA) is a polymer built from thousands of lactic acid monomers chained together; its molecular structure determines its melting point, flexibility, and biodegradability.

#### Portfolio Development

The ongoing curation of design work, project documentation, and reflective commentary into a coherent collection that demonstrates a student's skills, growth, and design process to colleges, employers, or certification bodies.

**Example:** A PLTW student's digital portfolio might include CAD screenshots, printed part photos, test data tables, and a written reflection for each major project across the course.

#### Post-Build Heat Treatment

Thermal processing — including stress relief annealing, solution treatment, and aging — applied to metal AM parts after printing to relieve residual stresses, restore material properties, and achieve final dimensional stability. Required for most structural metal AM applications.

**Example:** A 316L stainless steel part built by DMLS is stress-relieved at 650°C for 2 hours before being cut from the build plate; without this step, removing the part causes it to warp as residual stresses relax.

#### Powder Bed Fusion

An AM process category in which a heat source — laser or electron beam — selectively melts or sinters powder material (polymer or metal) spread in thin layers across a flat bed. Unmelted powder supports the part during building.

**Example:** SLS nylon parts built via powder bed fusion require no support structures because the surrounding unsintered powder holds overhanging features in place throughout the build.

#### Predictive Maintenance ML

The application of machine learning to sensor data from 3D printers — including motor current signatures, vibration spectra, temperature trends, and extrusion pressure — to predict component failures before they cause print failures or machine damage.

**Example:** An ML model monitoring stepper motor current over thousands of print hours learns that a gradually increasing current draw on the Z-axis motor precedes lead screw binding failure by approximately 50 print hours, allowing preemptive maintenance.

#### Pressure Advance

A Klipper and PrusaSlicer/OrcaSlicer feature that compensates for the elastic lag in the filament path — the delay between extruder motor movement and actual nozzle pressure change — by slightly pre-pressurizing the melt zone before a move begins and releasing pressure early at the end of a segment.

**Example:** Calibrating pressure advance eliminates the blobbing at corners and the gaps at the start of extrusion segments that occur when the nozzle pressure doesn't keep up with the printhead's acceleration.

#### Print Camera Monitoring

A camera (built-in or added) positioned to capture images or video of the print in progress, enabling remote visual monitoring of print quality and allowing early detection of failures before significant material is wasted.

**Example:** A time-lapse camera on a 12-hour overnight print captures one frame per layer; reviewing the time-lapse in the morning reveals at which layer a failure began, helping diagnose its cause.

#### Print Farm Concepts

The operation of multiple 3D printers running simultaneously to increase throughput, managed through a centralized queue, file distribution system, and monitoring platform. Print farms enable higher production volumes without proportionally increasing labor.

**Example:** A school running 20 FDM printers managed through OctoPrint Farm can distribute the same file to all machines simultaneously and monitor each printer's progress from a single dashboard.

#### Print Queue Management

The organization and scheduling of multiple print jobs across one or more printers, including prioritization, time estimation, material compatibility checking, and status tracking. Effective queue management maximizes printer utilization and meets delivery deadlines.

**Example:** A makerspace with three printers and ten queued jobs uses print duration estimates and nozzle material requirements to assign jobs to machines in a sequence that minimizes changeover time.

#### Print Speed

The velocity at which the printhead moves while depositing material, expressed in millimeters per second (mm/s). Higher speeds reduce print time but can degrade quality if the hotend cannot melt filament fast enough or if vibrations cause ringing artifacts.

**Example:** A Bambu Lab X1C can print at 500 mm/s with acceptable quality due to its rigid CoreXY frame and input shaping; a budget bed-slinger may produce ringing artifacts above 60 mm/s.

#### Print Temperature

The target temperature of the hotend nozzle during extrusion, set in the slicer and maintained by a PID control loop. Print temperature must fall within the filament manufacturer's recommended range to achieve proper melt viscosity and interlayer adhesion.

**Example:** PLA typically prints at 190–220°C; printing at 180°C may cause under-extrusion and poor layer bonding, while 240°C can cause degradation, burning, and stringing.

#### Problem Definition

The design process step in which the challenge to be solved is clearly articulated as a problem statement, including the need being addressed, constraints (limits), and criteria (measures of success). A well-defined problem prevents wasted design effort.

**Example:** "Design a phone stand that holds a device at 45°–75°, costs under $2 in filament, and fits in a backpack pocket" is a strong problem definition with both criteria and constraints.

#### Production AM Workflow

The sequence of activities required to use AM for repeatable, quality-controlled part production at scale: file management and job queuing, machine preparation and qualification, build execution and monitoring, post-processing (support removal, surface finishing, heat treatment), inspection, and documentation.

**Example:** A dental lab running 10 resin printers follows a production AM workflow: scheduled nightly builds, morning wash-and-cure, afternoon QC inspection with digital calipers, and shipping — all documented in a batch record.

#### Prototyping

The fabrication of a physical or digital model of a design concept for the purpose of testing, evaluation, and communication — not for final production. Prototypes range from rough foam mockups to fully functional 3D-printed assemblies.

**Example:** Printing a first prototype at 30% scale with coarse 0.3 mm layers takes 20 minutes and reveals fit and proportion issues before committing to a multi-hour full-scale print.

#### Prusa MMU Unit

The Multi-Material Upgrade (MMU) developed by Prusa Research — a filament selector and drive unit that connects up to five filament spools to a Prusa MK4 or XL printer, enabling automated filament switching, multi-color printing, and soluble support interface printing.

**Example:** The Prusa MMU3 can switch between PLA and PVA in a single print, depositing PVA as a soluble interface layer under overhangs so the support dissolves cleanly in water without touching the part surface.

#### Prusa Printers

A line of open-source and semi-proprietary FDM and resin printers produced by Prusa Research (Prague, Czech Republic), known for reliable performance, active community support, comprehensive documentation, and a commitment to open-source design principles.

**Example:** The Prusa MK4 features a load-cell auto-leveling system, nextruder direct-drive extruder, and Prusa Connect cloud monitoring — remaining a top choice for educational settings due to its reliability and strong documentation.

#### PrusaSlicer

An open-source slicer application developed by Prusa Research, based on the Slic3r engine, known for its intuitive interface, powerful support generation, variable layer height, and wide printer compatibility. PrusaSlicer is a common choice in educational settings.

**Example:** PrusaSlicer's built-in print profiles for Prusa printers include verified settings for dozens of filament materials, making it straightforward for beginners to achieve good results without manual parameter tuning.

#### Quality Control Procedures

The set of systematic checks — dimensional measurement, visual inspection, surface roughness assessment, and mechanical testing — performed on printed parts to verify that they meet design specifications before use or shipment.

**Example:** A production QC procedure for printed medical-device housings might include 100% caliper inspection of four critical dimensions and a visual check for layer separations or surface defects.

#### Recycled Filaments

Thermoplastic filaments produced by collecting, sorting, cleaning, re-granulating, and extruding post-consumer or post-industrial plastic waste — including rPETG from bottles or rPLA from failed prints and sprues.

**Example:** Companies like Filamentive and Re-Filament produce rPETG spools from recycled bottle-grade PET; their properties are close to virgin PETG, making them a practical lower-carbon alternative.

#### Reference Geometry

Construction entities — planes, axes, points, and coordinate systems — that do not appear in the final model but define positions and orientations used to place sketches, features, and mates. Reference geometry keeps models predictable as dimensions change.

**Example:** Creating an offset plane 15 mm above the top face of a block lets you sketch and extrude a boss precisely positioned relative to that face, even as the block height changes.

#### Repeatability And Reproducibility

Repeatability is the variation in measurements made by the same operator using the same instrument on the same part; reproducibility is variation when different operators, machines, or days are involved. Together they define the consistency of a measurement or manufacturing system.

**Example:** An FDM printer that produces parts varying ±0.05 mm in repeated prints of the same file on the same day has good repeatability; if a different machine of the same model produces parts within ±0.1 mm of the first machine's output, that describes reproducibility.

#### RepRap Project

An open-source initiative launched by Adrian Bowyer at the University of Bath in 2005 to create a self-replicating rapid prototyping machine — one that could print most of its own structural components. RepRap seeded the modern desktop FDM ecosystem.

**Example:** The RepRap Darwin (2007) was the first machine to successfully print a significant fraction of its own plastic parts, proving the self-replication concept.

#### Research Phase

The design process step in which background information is gathered — through literature review, user interviews, competitive benchmarking, and standards review — to inform design decisions and avoid reinventing existing solutions.

**Example:** Before designing a filament dry box, a student in the research phase might survey existing commercial products, read forum posts about filament moisture problems, and review material data sheets.

#### Resin Disposal

The proper handling and disposal of waste resin materials — uncured resin, resin-contaminated IPA, and used FEP film — according to local hazardous waste regulations. Uncured resin must never be poured down drains or into trash.

**Example:** Resin-contaminated IPA can be neutralized by spreading it in a shallow tray in direct sunlight until all resin cures solid; the solid residue is then disposable as regular solid waste in most jurisdictions.

#### Resin PPE

Personal protective equipment required when handling uncured photopolymer resin: nitrile gloves to prevent skin contact (resin is a skin sensitizer), safety glasses to protect eyes from splashes, and adequate ventilation or an organic vapor respirator to reduce inhalation of VOCs.

**Example:** Developing a resin allergy from repeated unprotected skin contact is a real occupational risk; nitrile gloves during pouring, printing, and washing are non-negotiable safety equipment.

#### Resin Print Failures

Defects specific to vat photopolymerization printing, including failed bed adhesion (print falls off the plate), suction cupping (large flat surfaces trap resin and cause layer tears), layer separation, and FEP film delamination from excessive peel forces.

**Example:** A large flat model that consistently fails mid-print likely suffers from suction cup forces; hollowing the model and adding drainage holes reduces the vacuum effect and the peel force on the FEP.

#### Resin Printer Anatomy

The set of physical subsystems comprising a vat photopolymerization desktop printer: the light source (laser, projector, or LCD-UV array), the resin vat with transparent FEP release film on the bottom, the build platform that moves upward as layers cure, and the Z-axis lead screw mechanism.

**Example:** Understanding that the FEP film is a consumable wear item — gradually becoming cloudy and sticky with use — helps a student anticipate when a print failure is due to FEP degradation rather than a settings error.

#### Resin Supports

Thin stalks and contact tips generated by resin slicers to attach overhanging parts of a model to the build platform, preventing them from sagging or tearing away from the FEP film during the peel force of each layer lift. Resin supports are typically fine and tree-like.

**Example:** A resin print of a human figure requires supports under the outstretched arms; the contact tips are made as small as possible (0.3–0.5 mm) to minimize witness marks on the finished surface.

#### Resin Vat And FEP

The shallow tray that holds liquid resin during a print, with a transparent fluorinated ethylene propylene (FEP) or nFEP film forming the bottom. The cured layer peels from the FEP rather than adhering to it, allowing the build platform to rise and fresh resin to fill beneath the next layer.

**Example:** A scratched or milky FEP film scatters UV light, reducing cure consistency and causing print failures; replacing the FEP every 2–5 liters of resin is standard maintenance.

#### Restricted Designs

3D model files or designs that are illegal to print, distribute, or possess in certain jurisdictions — including functional firearms, lock-bypassing tools, counterfeit products, and objects that violate copyright or patent law. Awareness of restrictions is part of responsible AM practice.

**Example:** In many countries, printing a functional untraceable firearm frame is illegal regardless of the method of manufacture; "ghost gun" laws have been enacted specifically in response to AM capabilities.

#### Retraction Settings

Slicer parameters controlling how far and how fast the extruder pulls filament backward at the end of an extrusion segment to relieve pressure in the nozzle and prevent oozing during travel moves. Incorrect retraction causes stringing or under-extrusion.

**Example:** Direct-drive extruders typically retract 0.5–1.5 mm; Bowden-tube setups require 4–7 mm of retraction to compensate for the slack in the longer filament path.

#### Revolve Feature

A CAD operation that creates a solid of revolution by rotating a 2D sketch profile around a specified axis. It is used to model axisymmetric parts such as shafts, bottles, knobs, and wheels.

**Example:** Revolving a right-triangle profile 360° around one of its legs produces a cone — the same principle used to model a funnel or a tapered nozzle tip in CAD.

#### Ringing And Ghosting

A print defect manifesting as ripple or wave patterns in the print surface near sharp corners or edges, caused by mechanical vibrations in the printer's motion system resonating after rapid direction changes. Also called "ringing" because the wall oscillates like a struck bell.

**Example:** A square tower printed at 100 mm/s showing horizontal ripples on the walls near corners is exhibiting ringing; reducing print speed to 60 mm/s or adding input shaping calibration eliminates the artifact.

#### Routine Maintenance

The scheduled set of cleaning, inspection, and adjustment tasks performed on a 3D printer to maintain print quality and prevent failures: bed surface cleaning, lead screw lubrication, belt tension check, PTFE tube inspection, and extruder gear cleaning.

**Example:** Wiping the PEI build plate with isopropyl alcohol before each print removes finger oils that degrade adhesion — a thirty-second maintenance step that prevents most first-layer failures.

#### Sanding And Finishing

Post-processing operations using abrasive materials — sandpaper, sanding sponges, needle files — to reduce surface roughness, remove support witness marks, and prepare a part for painting or bonding. Wet sanding produces finer results and reduces dust inhalation risk.

**Example:** Wet sanding an SLA-printed model from 220 to 400 to 800 grit progressively removes layer lines and produces a surface smooth enough for automotive-quality paint application.

#### Self-Supporting Angles

The range of overhang angles — measured from vertical — that a given printer, material, and cooling configuration can produce without support structures. Angles from 0° (vertical wall) to approximately 45–60° are typically self-supporting on FDM printers.

**Example:** Designing all overhanging features at 45° or steeper (measured from horizontal, or 45° from vertical) allows a part to print support-free on most well-tuned FDM printers.

#### Sheet Lamination

An AM process category in which sheets of material — paper, metal foil, or composite — are bonded together and cut to shape layer by layer to form a three-dimensional object. It is the least common AM category in educational settings.

**Example:** Mcor Technologies used sheet lamination with standard office paper to produce full-color 3D models at very low material cost, though layer delamination limited mechanical performance.

#### Shell Feature

A CAD operation that hollows out a solid part to a uniform wall thickness by removing interior material, leaving open faces where specified. Shelling reduces material use and print time while maintaining structural surfaces.

**Example:** Shelling a solid CAD box to 2 mm wall thickness before export means the slicer sees the walls directly, rather than relying on slicer-side infill settings to approximate them.

#### Sketch Constraints

Geometric and dimensional rules applied to 2D sketch entities — such as "horizontal," "equal," "tangent," or a specific dimension — that fully define the sketch's shape and size so it behaves predictably when parameters change.

**Example:** Applying a "symmetric" constraint to two lines about a centerline ensures that when you widen a slot, both sides grow equally — keeping the slot centered on the part.

#### Skirt Brim Raft

Three adhesion structures generated by slicers: a skirt is one or more loops printed around — but not touching — the model to prime the nozzle and check flow; a brim extends from the model's base outward; a raft is a full sacrificial platform beneath the part.

**Example:** Use a skirt for models with large flat bases that adhere easily; a brim for tall or small-footprint models at risk of tipping; a raft for flexible filaments or when bed adhesion is particularly challenging.

#### SLA Process

Stereolithography Apparatus (SLA) — a vat photopolymerization process in which a UV laser traces each layer's cross-section across the surface of a liquid photopolymer resin, curing it point by point. It produces very high surface quality and fine feature resolution.

**Example:** Formlabs Form 3 printers use a refined low-force SLA process capable of resolving features smaller than 0.3 mm, making them popular for jewelry, dental, and engineering prototype applications.

#### Slicer Profiles

Saved collections of slicer settings — temperature, speed, layer height, retraction, cooling — optimized for a specific printer and filament combination. Profiles eliminate the need to configure every setting from scratch for each print.

**Example:** A slicer profile named "Prusa MK4 – PLA 0.2mm Quality" stores 50+ settings tuned for that printer and material so a new user can achieve good results immediately.

#### Slicer Software

An application that translates a 3D mesh file into machine-specific G-code instructions by computing toolpaths for each layer, applying user-defined print settings, and generating support structures. The slicer is the critical bridge between digital model and physical print.

**Example:** PrusaSlicer, OrcaSlicer, Cura, and Bambu Studio are all slicer applications; each takes the same STL as input but may produce different G-code depending on their settings and algorithms.

#### SLS Process

Selective Laser Sintering (SLS) — a powder bed fusion process that uses a CO₂ laser to selectively sinter (fuse) thermoplastic powder, typically nylon (PA12), layer by layer. No support structures are needed because unsintered powder supports the part.

**Example:** Formlabs Fuse 1 brought benchtop SLS to small studios; parts emerge from a "powder cake" that is broken away and bead-blasted to reveal the finished nylon component.

#### SME Education Foundation

The educational arm of SME (Society of Manufacturing Engineers) that funds scholarships, supports STEM manufacturing education, and develops curriculum resources for K–12 and community college programs aligned with industry workforce needs.

**Example:** The SME Education Foundation's PRIME initiative places manufacturing equipment and curriculum in high schools, giving students hands-on CNC and AM experience while still earning their diploma.

#### Snapmaker Printers

A line of modular desktop fabrication machines produced by Snapmaker (Shenzhen, China) that combine FDM 3D printing, laser engraving/cutting, and CNC carving in a single interchangeable-toolhead platform, enabling a classroom to perform multiple fabrication processes with one machine.

**Example:** The Snapmaker Artisan's 400 × 400 × 400 mm FDM module prints large structural parts, while the same machine's laser module can engrave or cut acrylic for enclosure panels — providing multi-process capability in a single compact footprint.

#### Spaghetti Detection

A specific AI failure detection scenario in which a machine learning model identifies the characteristic tangled mass of filament strands that results from a print detaching from the build plate and the printhead continuing to extrude into mid-air. Named for its visual resemblance to a pile of spaghetti.

**Example:** The Obico (formerly Spaghetti Detective) ML model detects spaghetti within 3–5 minutes of a print failing and sends a push notification to the user's phone with a snapshot of the failure.

#### Spring Steel Sheet

A flexible, magnetically attachable build plate substrate made from spring steel that enables easy part removal by flexing the sheet after printing. The spring steel provides a flat, stable surface during printing but flexes enough to pop parts loose without tools.

**Example:** Flexing a spring steel sheet just 10–15° pops even stubbornly adhered PETG parts cleanly off the surface — eliminating the palette knife prying that scratches glass beds.

#### Standard Resin

A category of photopolymer resin formulated for general-purpose desktop resin printing, balancing moderate strength, reasonable cost, and good printability. Standard resins are brittle compared to engineering resins and are suitable for display models, miniatures, and low-stress prototypes.

**Example:** A tabletop game miniature is an ideal standard resin application — the fine detail resolution and smooth surface quality matter more than impact resistance.

#### Stepper Motors

Brushless DC electric motors that rotate in precise discrete angular increments ("steps") in response to electrical pulses, providing positional control without requiring encoder feedback. In 3D printers they drive the X, Y, Z axes and the extruder.

**Example:** A typical 1.8° stepper motor takes 200 steps to complete one full revolution; with a 20-tooth pulley and 2 mm pitch belt, each step advances the printhead exactly 0.2 mm.

#### Stereolithography Invention

The development of the first commercial additive manufacturing process by Chuck Hull in 1983–1986, in which ultraviolet light selectively cures photopolymer resin layer by layer. Hull's invention established the conceptual and commercial foundation for all subsequent AM technologies.

**Example:** Hull filed U.S. Patent 4,575,330 in 1984 and co-founded 3D Systems, the company that brought the first SLA machine to market in 1988.

#### STL Export Settings

The parameters set in CAD software when saving to STL format, including chord deviation (maximum gap between the mesh and the true surface) and angular tolerance (maximum angle between adjacent triangle normals). These settings control the trade-off between surface quality and file size.

**Example:** Setting chord deviation to 0.01 mm when exporting a detailed jewelry model produces a smooth mesh suitable for resin printing; 0.5 mm would introduce visible faceting.

#### STL File Format

A mesh-based file format (Standard Tessellation Language or STereoLithography) that represents a 3D surface as a collection of triangular facets, each defined by three vertices and an outward-facing normal vector. STL is the most universally accepted format for 3D printing.

**Example:** Exporting a CAD model as an STL with too few triangles produces a faceted surface on curved features — increasing triangle count smooths the geometry at the cost of larger file size.

#### Strain Gauge Leveling

A bed leveling method in which a force sensor (strain gauge or load cell) on the toolhead detects the moment the nozzle contacts the bed surface by measuring the deflection force, providing extremely precise and repeatable Z-offset and bed mesh measurements using the nozzle itself as the probe.

**Example:** Bambu Lab printers use strain gauge leveling with the nozzle as the probe — the system detects the micro-deflection when the nozzle first touches the plate, achieving sub-0.01 mm probe repeatability without any separate sensor.

#### Stringing

Thin wisps of filament bridging between separated features of a print, caused by oozing from the nozzle during travel moves. Stringing is reduced by increasing retraction distance, lowering print temperature, enabling combing (keeping travel moves inside the print footprint), and ensuring the filament is dry.

**Example:** A print of multiple small towers shows stringing between them when print temperature is 220°C; reducing to 205°C and increasing retraction by 1 mm typically eliminates the strings.

#### Subtractive Manufacturing

A class of fabrication processes in which material is progressively removed from a solid workpiece — by cutting, milling, drilling, or grinding — to achieve a desired shape. It contrasts with additive manufacturing, which builds shapes by adding material.

**Example:** A CNC router carving a wooden gear from a flat board is subtractive manufacturing; the same gear printed layer by layer on an FDM machine is additive.

#### Support Interface

A thin layer of material — sometimes printed in a different filament type — placed between the bulk of a support structure and the supported part surface to improve surface quality and make the support easier to detach cleanly.

**Example:** Using a PVA or BVOH interface layer between PETG supports and a PLA part means the interface dissolves in water, leaving a smooth undersurface without peeling or scarring.

#### Support Minimization

A DfAM strategy of designing or orienting parts to reduce or eliminate the need for support structures, achieved by modifying overhangs, chamfering undersides, splitting complex parts, or choosing orientations that keep overhangs within self-supporting angles.

**Example:** Replacing a horizontal undercut with a 45° chamfer on the underside of a ledge eliminates the need for supports under that feature without affecting the part's function.

#### Support Removal

The post-processing step of detaching and cleaning up support structures from a printed part, using flush cutters, needle-nose pliers, a hobby knife, or dissolution (for soluble supports). Surface quality of supported areas depends heavily on the care taken during removal.

**Example:** Cutting resin supports at the contact tip with flush cutters rather than ripping them off leaves a small nub that can be sanded smooth, versus a torn divot that requires filling.

#### Support Structures

Temporary material printed beneath overhanging features or bridging regions to prevent them from drooping or collapsing during the build. Supports are removed after printing, often leaving marks on the supported surface.

**Example:** A part shaped like the letter "T" needs supports under the horizontal cross-arm if its overhangs exceed the printer's self-supporting angle (typically 45°–60° from vertical).

#### Sustainability In AM

The consideration of environmental impact across the full life cycle of additive manufacturing — including material sourcing, energy consumption during printing, part lifespan, and end-of-life disposal or recycling — and strategies to minimize negative impacts.

**Example:** Designing parts for disassembly (snap fits instead of glued joints) and printing in recycled or bio-based filaments are two sustainability strategies that reduce the environmental footprint of AM production.

#### Sweep And Loft

Sweep creates a solid by extruding a 2D profile along a curved path. Loft creates a solid by blending between two or more profiles at different positions. Both features produce complex, non-prismatic geometry useful for organic and functional shapes.

**Example:** A sweep is used to model a curved handle on a mug; a loft is used to transition a square cross-section at the base of an aircraft part smoothly to a circular cross-section at the top.

#### Synthetic Training Data

Artificially generated datasets — including 3D-rendered images of print defects, simulated sensor readings, or procedurally generated CAD models — used to train machine learning models when real-world data is scarce, expensive to collect, or insufficiently diverse.

**Example:** Generating 10,000 synthetic images of simulated spaghetti-failure prints at varied camera angles, lighting conditions, and filament colors produces a diverse training dataset that improves an AI model's robustness across real-world printer setups.

#### Technical Presentation

A structured communication of technical work — combining slides, physical artifacts, data visualizations, and verbal narration — delivered to an audience of peers, judges, or industry representatives. Technical presentations assess communication skills alongside technical content.

**Example:** A capstone technical presentation might include: problem statement, research summary, three iterated prototypes with photos, test data comparing iterations, final design CAD rendering, and a reflection on lessons learned.

#### Tensile Strength

The maximum stress that a material can withstand while being pulled apart in tension before fracturing, measured in megapascals (MPa) or pounds per square inch (psi). It is a key metric for comparing filament materials and evaluating printed part durability.

**Example:** Solid PLA has a tensile strength of approximately 50–65 MPa; carbon-fiber-reinforced PLA can reach 80–100 MPa, making it suitable for applications requiring a stiffer, stronger part.

#### Testing And Validation

The design process step in which a prototype is evaluated against the design specifications using defined test methods to determine whether it meets performance criteria. Testing generates data that drives the next iteration.

**Example:** Hanging calibrated weights from a printed bracket and measuring deflection with calipers is a simple validation test that quantifies structural performance against a specification.

#### Text-To-CAD Generation

An AI capability in which a natural-language text description is processed by a large language model or specialized generative model to produce a 3D CAD model or parametric modeling script directly, without the user performing manual CAD operations.

**Example:** Typing "a 30 mm diameter cylinder 50 mm tall with a 5 mm through-hole centered on the top face" into a text-to-CAD system produces an immediately exportable STL, bypassing the manual CAD workflow for simple geometries.

#### Thermoplastics

A class of polymers that soften and become moldable when heated above a characteristic temperature and re-solidify when cooled, without undergoing permanent chemical change. This reversible behavior is what makes filament-based FDM printing possible.

**Example:** PLA, PETG, ABS, and nylon are all thermoplastics — they can be melted and re-extruded repeatedly, which is also why failed FDM prints can be recycled into new filament.

#### Time-Lapse Print Capture

The recording of a 3D print's progress as a time-lapse video by capturing one still frame per layer (or at regular time intervals) and compositing them into a fast-motion video. Time-lapses are valuable for print monitoring, process documentation, and social sharing.

**Example:** OctoPrint's Octolapse plugin synchronizes the camera shutter with the printhead's park position between layers, producing a time-lapse where the print appears to grow magically without the printhead visible — a popular format for social media.

#### Tolerance Allowances

Planned dimensional offsets added to CAD features to account for material shrinkage, extrusion width, and printer accuracy, ensuring that printed parts fit together as intended. Tolerance allowances vary by printer, material, and feature type.

**Example:** A snap-fit tab designed with a 0.15 mm clearance from its slot in CAD accounts for the typical dimensional error of a well-calibrated FDM printer, producing a firm but releasable fit.

#### Toolchanger Printers

Printers equipped with a mechanism to automatically swap between multiple physical toolheads — each with its own hotend, nozzle, and material — during a single print. Toolchangers offer the most flexible multi-material capability because each tool is fully independent.

**Example:** The E3D Tool Changer platform can swap between a 0.25 mm nozzle for fine detail work and a 0.8 mm nozzle for fast infill deposition within the same layer, optimizing both quality and speed.

#### Topology Optimization

A computational design method that uses finite element analysis and mathematical optimization algorithms to distribute material only where it is structurally necessary within a defined design space, given specified loads and constraints, producing organically shaped, highly efficient structures.

**Example:** Topology optimization of a mounting bracket may remove 40% of its mass while maintaining identical stiffness, generating an organic, bone-like shape that AM can build directly.

#### Tough And Flexible Resins

Photopolymer resin formulations that incorporate rubber-like or impact-modifier components to produce cured parts with higher elongation, toughness, or flexibility than standard resins. They sacrifice some detail resolution for improved mechanical performance.

**Example:** A flexible resin phone case can flex in the hand without snapping, whereas the same geometry in standard resin would shatter at the first flex.

#### TPU Filament

Thermoplastic Polyurethane — a flexible, rubber-like thermoplastic that produces soft, impact-absorbing, and highly elastic printed parts. TPU requires a direct-drive extruder and slow print speeds due to its tendency to buckle in Bowden tubes.

**Example:** Phone cases, cable protectors, orthotic insoles, and flexible hinges are common TPU applications — the material can be compressed, stretched, and twisted without cracking.

#### Travel Moves

Non-extrusion movements of the printhead between the end of one extruded segment and the start of the next. During travel moves, the extruder typically retracts filament to prevent oozing, and the head may lift (Z-hop) to clear printed features.

**Example:** A print with many small isolated islands — like text characters — involves frequent travel moves; optimizing travel paths and retractions reduces stringing between letters.

#### Tree Supports

A type of support structure that branches organically from the build plate (or part surface) to contact only the minimum necessary points of an overhang, rather than building full columns. Tree supports use less material and are easier to remove than traditional supports.

**Example:** Tree supports contact a complex organic figure's outstretched arm at just two or three points, leaving a cleaner surface than a solid column support that runs the arm's full length.

#### Triangle Resolution

The number of triangular facets used to approximate curved surfaces in a mesh file, controlled by the chord deviation or angular tolerance set at export. Higher resolution produces smoother surfaces but larger file sizes.

**Example:** A cylinder exported at high resolution may use 1,000 triangles to approximate its curved wall; the same cylinder at low resolution uses only 16, producing a clearly polygonal cross-section.

#### Troubleshooting Workflow

A systematic diagnostic process — observe the symptom, identify probable causes, change one variable at a time, test, and verify — used to resolve 3D printing problems. Changing multiple settings simultaneously makes it impossible to identify which change fixed the problem.

**Example:** When a print shows stringing, a disciplined troubleshooting workflow first checks retraction distance (increase by 0.5 mm), tests, then checks temperature (decrease by 5°C) if stringing persists — not both at once.

#### Under-Extrusion

A print defect in which the printer deposits less material than the slicer specifies, resulting in gaps between extrusion lines, weak layer bonds, and rough surfaces. Causes include a partial clog, insufficient temperature, too-high print speed, or incorrect flow rate calibration.

**Example:** Gaps visible in the top surface infill where lines don't quite meet indicate under-extrusion; recalibrating the extruder's e-steps and increasing flow multiplier by 5% often resolves the issue.

#### Units And Measurement

A standardized system for expressing physical quantities — such as length in millimeters, mass in grams, or temperature in degrees Celsius — so that values can be communicated and reproduced consistently. Correct unit handling prevents scaling errors and print failures.

**Example:** A design exported in inches but imported into a slicer set to millimeters will appear 25.4 times too large, resulting in a print that far exceeds the build volume.

#### UV Post-Curing

The process of exposing a freshly washed resin print to additional UV light (from a dedicated cure station, UV lamp, or sunlight) to complete polymerization of any remaining uncured monomer, achieving full mechanical strength, surface hardness, and chemical resistance.

**Example:** A resin miniature that skips post-curing may feel slightly tacky and break more easily; 5 minutes in a UV cure station at 405 nm completes cross-linking and produces a hard, dry surface.

#### Variable Layer Height

A slicer feature that allows different regions of the same print to be sliced at different layer heights — for example, using thin layers (0.1 mm) for detailed curved regions and thick layers (0.3 mm) for simple vertical walls — optimizing quality where needed while saving time elsewhere.

**Example:** Printing a figurine's face with 0.1 mm variable layer height while printing its cylindrical base at 0.3 mm reduces print time by 40% compared to uniform 0.1 mm throughout, with no visible quality difference on the base.

#### Vase Mode

A slicer printing mode (also called "spiralize outer contour") that converts a closed model into a continuous single-wall spiral that rises without interruption, eliminating seam lines and producing smooth, thin-walled vessels. Vase mode prints are hollow and non-watertight at the base unless combined with a solid floor.

**Example:** Printing a decorative pot in vase mode produces a seamless, translucent single-wall form in 20 minutes that would take hours at normal settings — perfect for decorative lighting or organics.

#### Vat Photopolymerization

An AM process category in which a liquid photopolymer resin contained in a vat is selectively cured (solidified) by a light source — UV laser, DLP projector, or LCD panel — layer by layer from the bottom or top of the vat.

**Example:** A dental lab using an SLA printer to produce crown models is using vat photopolymerization; the process yields fine feature resolution unmatched by most FDM printers.

#### Ventilation Requirements

The specification of air exchange rates, filtration systems (HEPA + activated carbon), or exhaust routing needed to maintain safe airborne concentrations of VOCs and UFPs during 3D printing. Requirements vary by process (FDM vs. resin vs. metal) and workspace size.

**Example:** Enclosing an FDM printer and exhausting filtered air through a HEPA + activated carbon cartridge reduces both UFP count and VOC concentration to near-background levels in a small classroom.

#### Version Control For CAD

The practice of tracking changes to CAD files over time using version numbering, timestamps, and change logs — or dedicated tools like Git, PDM systems, or CAD-native versioning (Onshape branches) — so previous states can be recovered and collaborative edits are managed.

**Example:** Onshape's built-in version history automatically saves a snapshot every time a document is shared or branched, allowing a student to restore a design to any previous state without manually keeping backup copies.

#### VOC And UFP Exposure

Volatile Organic Compounds (VOCs) are gaseous chemicals released from heated filament or resin; Ultrafine Particles (UFPs) are sub-100 nm solid particles emitted during FDM printing. Both pose inhalation health risks, particularly in enclosed, poorly ventilated spaces.

**Example:** Studies have measured ABS printing as producing significantly higher VOC and UFP emissions than PLA; both materials release measurable particles, making ventilation important regardless of filament type.

#### Wall Count

The number of continuous perimeter loops (shells) printed around the outer boundary of each layer before the interior infill is deposited. More walls increase strength, surface quality, and watertightness at the cost of additional material and time.

**Example:** A functional mounting bracket typically uses 3–4 walls to ensure structural integrity, while a decorative vase might use only 2 walls to reduce weight and print time.

#### Wall Thickness Rules

DfAM guidelines specifying the minimum and recommended wall thicknesses for 3D-printed parts to ensure they print reliably and meet structural requirements. Minimum printable wall thickness is typically 1–2 times the nozzle diameter; structural walls are usually 2–4 mm.

**Example:** A wall of 0.3 mm designed for a 0.4 mm nozzle will not print at all; redesigning it to 0.8 mm (two extrusion widths) produces a thin but printable wall.

#### Warping

A print defect in which thermal contraction of cooling material pulls the corners or edges of a print upward off the build plate, distorting the part's geometry. Warping is most common with high-shrinkage materials like ABS, ASA, and nylon on unheated or improperly prepared beds.

**Example:** A large ABS print warping at the corners can be addressed by raising bed temperature to 110°C, adding a brim, using an enclosure to slow cooling, and applying a bed adhesion aid like ABS slurry.

#### Wash And Cure Workflow

The two-stage post-processing sequence for resin prints: first, washing the freshly printed part in isopropyl alcohol (IPA) or a dedicated wash solution to dissolve uncured resin from the surface; then, exposing the washed part to UV light to achieve full mechanical properties through complete cross-linking.

**Example:** Skipping the cure step produces a resin part that is dimensionally accurate but weaker and tackier than fully cured material; a 2–5 minute cure under a UV lamp completes the polymerization.

#### Wi-Fi Connected Printer

A 3D printer equipped with Wi-Fi networking hardware and supporting firmware that allows remote monitoring, file transfer, and print control over a local network or the internet without a physical USB connection.

**Example:** A Wi-Fi connected Bambu Lab printer allows a student to upload an STL from a phone, slice it in the cloud, start the print, and receive a completion notification — all without being physically present at the printer.

#### Wood Fill Filament

A composite filament blending a thermoplastic base with finely ground wood fiber or sawdust (typically 20–40% by weight), producing parts with a wood-like texture, smell, and appearance that can be sanded, stained, and finished like natural wood.

**Example:** A decorative sculpture printed in wood-fill PLA can be sanded, stained with wood stain, and sealed with varnish to achieve an appearance indistinguishable from carved wood to a casual observer.

#### Workshop Safety

The set of practices, protocols, and protective measures that reduce the risk of injury in a fabrication environment — including proper tool handling, fire prevention, electrical safety, fume control, and emergency procedures.

**Example:** A classroom 3D printing lab should have a written safety protocol covering: no unsupervised prints, printer enclosures or ventilation for ABS/resin, chemical storage for IPA and resin, and a fire extinguisher rated for electrical fires.

#### Z Axis Direction

The vertical axis of a 3D printer's coordinate system, oriented perpendicular to the build plate and parallel to the direction of layer stacking. Layer height is measured along Z, and part strength is typically lowest in this direction due to interlayer bonding.

**Example:** A hook printed with its load-bearing axis vertical (along Z) is weaker than the same hook printed horizontally, because the force tries to separate layers rather than shear across them.

#### Z Offset Calibration

The adjustment of the distance between the nozzle tip and the build plate surface at the home position (Z=0), expressed as a positive or negative offset in millimeters. Correct Z offset is critical for first-layer adhesion and consistent line width.

**Example:** A Z offset that is too large (nozzle too far from the bed) produces a first layer of round strands that don't squish and adhere; too small causes the nozzle to scrape and potentially damage the plate.

