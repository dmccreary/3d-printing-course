// Metal AM Build-to-Part Workflow — vis-network
// CANVAS_HEIGHT: 460
// Bloom L1-L2: recall and sequence steps from metal powder to finished part

function isInIframe() {
  try { return window.self !== window.top; } catch(e) { return true; }
}

const stepDetails = {
  1: {
    title: '1. Powder Preparation',
    desc: 'Raw metal powder must be conditioned before use. This includes particle-size sieving (typically 15–45 µm for DMLS), moisture removal (drying at 60–80 °C), and flowability testing. Recycled powder from previous builds is blended with fresh powder within allowable usage limits.',
    equipment: 'Sieve shaker, powder drier, Hall flowmeter, scanning electron microscope (SEM) for morphology checks',
    qc: 'Particle size distribution (PSD) test; flowability > 25 s/50 g; moisture content < 0.1%',
    duration: '2–4 hours per batch',
    failure: 'WHAT CAN GO WRONG: Contaminated or degraded powder (irregular morphology, oxidation) causes porosity in the final part. Remedy: Perform SEM analysis and mix no more than 30% recycled powder with fresh stock.'
  },
  2: {
    title: '2. Build Setup',
    desc: 'The CAD file is imported into build-preparation software (Magics, Materialise, or OEM software). Supports are designed and oriented to minimize deformation and stress. The file is then sliced (typically 20–60 µm layer thickness). The machine chamber is purged with argon until oxygen levels drop below 0.1%.',
    equipment: 'Magics / build-prep software; DMLS machine; oxygen analyzer',
    qc: 'Support density review; slice preview; O₂ level < 0.1% before build start',
    duration: '1–4 hours (depending on part complexity and orientation decisions)',
    failure: 'WHAT CAN GO WRONG: Poor support design leads to part warping or delamination. Remedy: Simulate thermal stress with FEA-based slicer before building. Increase support density near thin walls and overhangs.'
  },
  3: {
    title: '3. DMLS Build',
    desc: 'The fiber laser melts each powder layer sequentially in an inert argon atmosphere. A re-coater blade spreads fresh powder after each layer. Build times range from hours to days depending on part height and volume. Chamber monitoring systems track spatter and smoke plumes.',
    equipment: 'DMLS machine (EOS M 290, SLM 280, etc.); laser power monitor; chamber cameras',
    qc: 'In-situ melt-pool monitoring; layer-by-layer image logging; chamber O₂ < 0.1% throughout',
    duration: '4–96 hours depending on build height and machine',
    failure: 'WHAT CAN GO WRONG: Recoater collision with a warped part crashes the build. Remedy: Use island scanning, add anchoring supports, or reduce laser power in first layers to reduce thermal stress.'
  },
  4: {
    title: '4. Build Plate Removal',
    desc: 'After cooling, the build plate (with parts still attached) is removed. Parts are separated from the plate using wire EDM (precision) or a band saw (fast, less precise). The plate surface is then machined for reuse.',
    equipment: 'Wire EDM machine or horizontal band saw; angle grinder for cleanup; coordinate measuring machine (CMM) to verify plate flatness for reuse',
    qc: 'Visual inspection for obvious cracks; part count verification; plate surface inspection',
    duration: '30 min – 4 hours depending on number of parts and method',
    failure: 'WHAT CAN GO WRONG: Sawing too close to the part damages it or introduces burrs that affect downstream machining. Remedy: Leave 2–3 mm of stub attached; remove flush with milling or grinding in a controlled step.'
  },
  5: {
    title: '5. Stress Relief',
    desc: 'As-built DMLS parts contain high residual stresses from the rapid heating-and-cooling cycles. A furnace stress-relief anneal (typically 600–1000 °C depending on alloy, in a protective atmosphere) reduces these stresses before supports are removed, preventing distortion.',
    equipment: 'Vacuum furnace or argon-atmosphere tube furnace; thermocouples for temperature verification',
    qc: 'Cycle documentation (time-temperature log); post-anneal hardness check; dimensional check after cool-down',
    duration: '4–8 hours (including ramp-up and cool-down)',
    failure: 'WHAT CAN GO WRONG: Skipping stress relief causes the part to distort when supports are cut away. Remedy: NEVER remove supports before stress relief for metal AM parts with significant overhanging features.'
  },
  6: {
    title: '6. Support Removal + Machining',
    desc: 'After stress relief, support structures are removed by hand or with cutting tools. Critical surfaces (bores, mating faces, thread features) are then CNC-machined to tight tolerances (±0.05 mm or better) that the AM process cannot achieve alone.',
    equipment: 'CNC machining center; wire EDM; grinder; surface roughness profilometer',
    qc: 'Dimensional inspection of all critical features after machining; surface roughness Ra target (typically 1.6–3.2 µm)',
    duration: '2–8 hours per part',
    failure: 'WHAT CAN GO WRONG: Incorrect workholding during CNC introduces datum errors. Remedy: Design datum features into the AM build (reference bores or pads) to ensure consistent fixturing before machining.'
  },
  7: {
    title: '7. Quality Inspection',
    desc: 'Finished parts undergo non-destructive and dimensional inspection. CT scanning reveals internal porosity, cracks, and unfused powder. CMM verifies external geometry. Surface roughness, hardness, and sometimes tensile coupons built alongside the part are also tested.',
    equipment: 'Industrial CT scanner; CMM (coordinate measuring machine); surface profilometer; Vickers hardness tester',
    qc: 'CT scan — no pores > 0.3 mm, no cracks; CMM — all critical dimensions within ±0.1 mm; tensile coupon meets material spec',
    duration: '4–16 hours depending on CT queue and number of features inspected',
    failure: 'WHAT CAN GO WRONG: Subsurface porosity clusters reduce fatigue life and are invisible without CT. Remedy: Use HIP (hot isostatic pressing) post-processing for safety-critical titanium or Inconel parts.'
  }
};

// Warm-to-cool gradient: orange → yellow → green → teal → blue → indigo → violet
const stepColors = [
  '#E65100', // 1 orange
  '#F9A825', // 2 amber
  '#2E7D32', // 3 green
  '#00695C', // 4 teal
  '#1565C0', // 5 blue
  '#4527A0', // 6 indigo
  '#6A1B9A'  // 7 violet
];

const nodes = new vis.DataSet(Array.from({length: 7}, (_, i) => ({
  id: i + 1,
  label: (i + 1) + '. ' + [
    'Powder\nPrep', 'Build\nSetup', 'DMLS\nBuild',
    'Plate\nRemoval', 'Stress\nRelief', 'Support\nRemoval\n+Machining', 'Quality\nInspect'
  ][i],
  x: -500 + i * 170,
  y: 0,
  color: { background: stepColors[i], border: '#222', highlight: { background: stepColors[i], border: '#000' } },
  font: { color: '#fff', size: 13, bold: true },
  shape: 'box',
  widthConstraint: { minimum: 90, maximum: 110 },
  margin: 8
})));

const edgeLabels = [
  'Conditioned\npowder ready',
  'File sliced;\nchamber purged',
  'As-built part\non plate',
  'Part free;\nstress remains',
  'Stress\nrelieved',
  'Net-shape\npart'
];

const edges = new vis.DataSet(Array.from({length: 6}, (_, i) => ({
  id: i + 1,
  from: i + 1,
  to: i + 2,
  arrows: { to: { enabled: true, scaleFactor: 0.9 } },
  label: edgeLabels[i],
  font: { size: 9, color: '#555', align: 'middle', background: '#fafbff' },
  color: { color: '#777', highlight: '#333' },
  smooth: { type: 'straightCross' }
})));

let network;

function initNetwork() {
  const container = document.getElementById('network');
  const inIframe  = isInIframe();

  const options = {
    layout: { improvedLayout: false },
    physics:  { enabled: false },
    interaction: {
      dragNodes: false,
      dragView:  !inIframe,
      zoomView:  !inIframe,
      navigationButtons: false,
      hover: true,
      selectConnectedEdges: true
    },
    nodes: { borderWidth: 2, shadow: { enabled: true, size: 5, x: 2, y: 2 }, margin: 8 },
    edges: { width: 2 }
  };

  network = new vis.Network(container, { nodes, edges }, options);
  network.fit({ animation: false });

  network.on('click', function(params) {
    if (params.nodes.length > 0) showDetail(params.nodes[0]);
  });
}

function showDetail(nodeId) {
  const det = stepDetails[nodeId];
  if (!det) return;
  const panel = document.getElementById('detail-panel');
  const col = stepColors[nodeId - 1];
  panel.innerHTML = `
    <h3 style="color:${col}; border-bottom: 2px solid ${col}; padding-bottom:4px; margin-bottom:10px;">${det.title}</h3>
    <p style="margin-bottom:10px; color:#333;">${det.desc}</p>
    <div class="detail-grid">
      <span class="det-label">Equipment:</span><span>${det.equipment}</span>
      <span class="det-label">QC Check:</span><span>${det.qc}</span>
      <span class="det-label">Typical Duration:</span><span>${det.duration}</span>
      <span class="det-label det-warn">⚠ Failure Mode:</span><span class="det-warn">${det.failure}</span>
    </div>
  `;
}

initNetwork();
