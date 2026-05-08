// Industrial PBF Process Comparison — SLS, MJF, DMLS, EBM
// CANVAS_HEIGHT: 580
// Bloom L4 Analyze: differentiate, compare, contrast powder-bed fusion processes

let containerWidth;
let canvasWidth  = 700;
let drawHeight   = 520;
let controlHeight = 60;
let canvasHeight  = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 12;

const processes = [
  {
    id: 'SLS', name: 'Selective Laser Sintering',
    col: [70, 160, 100],
    energy: 'CO₂ Laser (25–200 W)',
    material: 'Polymer powder (Nylon PA12, PA11, TPU)',
    atmosphere: 'Inert gas (nitrogen)',
    buildVol: '380 × 330 × 460 mm (EOS P 760)',
    advantage: 'No support structures needed — powder bed is self-supporting',
    limitation: 'Rough surface finish; post-processing often required',
    applications: 'Functional prototypes, custom orthotics, ducting, snap-fit housings',
    description: 'SLS uses a CO₂ laser to selectively sinter polymer powder layer by layer. ' +
      'The surrounding unfused powder supports the part, so complex geometry requires no additional supports. ' +
      'Commercially dominant for engineering-grade polymers, SLS produces robust, near-isotropic parts. ' +
      'Typical accuracy is ±0.3 mm; surface Ra ~10–15 µm before tumbling or media blasting.',
    tip: 'Energy source: CO₂ laser   Material: Polymer   Gas: N₂'
  },
  {
    id: 'MJF', name: 'Multi Jet Fusion',
    col: [60, 100, 190],
    energy: 'IR Lamp Array (fusing + detailing agents)',
    material: 'Polymer powder (PA12, PA11, TPA, PP)',
    atmosphere: 'Ambient / minimal enclosure',
    buildVol: '380 × 284 × 380 mm (HP 5200)',
    advantage: 'Faster than SLS; functional agent enables local property variation',
    limitation: 'Gray/black base color; post-coloring required for appearance parts',
    applications: 'Production parts, jigs & fixtures, consumer products, medical devices',
    description: 'MJF (HP) jets a fusing agent onto polymer powder and then sweeps an IR lamp across the bed. ' +
      'A detailing agent at edges prevents sintering, producing sharper boundaries than SLS. ' +
      'Voxel-level control of the fusing agent enables variable density and stiffness within one build. ' +
      'MJF parts are typically gray-black; they accept dye colorization post-print.',
    tip: 'Energy source: IR lamp   Material: Polymer   Gas: Ambient'
  },
  {
    id: 'DMLS', name: 'Direct Metal Laser Sintering',
    col: [200, 110, 50],
    energy: 'Fiber Laser (200–1000 W)',
    material: 'Metal powder (stainless steel, Ti-6Al-4V, Inconel, AlSi10Mg)',
    atmosphere: 'Inert gas (argon)',
    buildVol: '250 × 250 × 325 mm (EOS M 290)',
    advantage: 'Full-density metal parts with complex internal geometry (cooling channels)',
    limitation: 'Requires support structures; significant post-processing (HIP, heat treat)',
    applications: 'Aerospace brackets, medical implants, tooling inserts, turbine components',
    description: 'DMLS fuses metal powder with a high-power fiber laser in an argon atmosphere to prevent oxidation. ' +
      'Parts are fully dense (>99.5%) and mechanically comparable to wrought equivalents after heat treatment. ' +
      'Support structures are required because metal conducts heat and residual stresses can cause warping. ' +
      'Post-processing typically includes stress relief, HIP, machining, and surface finishing.',
    tip: 'Energy source: Fiber laser   Material: Metal   Gas: Argon'
  },
  {
    id: 'EBM', name: 'Electron Beam Melting',
    col: [130, 60, 180],
    energy: 'Electron Beam (3–6 kW)',
    material: 'Metal powder (Ti-6Al-4V, CoCr, Inconel)',
    atmosphere: 'High vacuum (~10⁻⁴ mbar)',
    buildVol: '350 × 380 mm ⌀ (GE Arcam Q20plus)',
    advantage: 'Low residual stress; no support for Ti parts; high scan speed',
    limitation: 'Rough "sintered cake" surface; vacuum limits build size options',
    applications: 'Orthopedic implants (hip cups), aerospace turbine blades, Ti structural parts',
    description: 'EBM uses a magnetically focused electron beam to melt metal powder in a high-vacuum chamber. ' +
      'The vacuum prevents oxidation without inert gas, making it ideal for reactive metals like titanium. ' +
      'The powder bed is preheated to ~700 °C, reducing thermal gradients and residual stress dramatically. ' +
      'Surface roughness (Ra ~25–35 µm) is higher than DMLS, but post-HIP is often unnecessary for dense Ti alloys.',
    tip: 'Energy source: Electron beam   Material: Metal   Gas: Vacuum'
  }
];

// State
let viewMode      = 'grid';   // 'grid' | 'detail' | 'compare'
let selectedIdx   = -1;
let compareIdx1   = -1;
let compareIdx2   = -1;
let hoveredIdx    = -1;
let compareActive = false;

// Buttons
let backButton;
let compareButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(14);

  backButton = createButton('◀ Back to Grid');
  backButton.position(10, drawHeight + 14);
  backButton.mousePressed(() => { resetToGrid(); });
  backButton.style('font-size', '13px');
  backButton.style('padding', '5px 14px');
  backButton.hide();

  compareButton = createButton('⇔ Compare Mode: OFF');
  compareButton.position(canvasWidth - 180, drawHeight + 14);
  compareButton.mousePressed(toggleCompare);
  compareButton.style('font-size', '13px');
  compareButton.style('padding', '5px 14px');

  describe('Industrial PBF Process Comparison — click panels to explore SLS, MJF, DMLS, and EBM', LABEL);
}

function resetToGrid() {
  viewMode    = 'grid';
  selectedIdx = -1;
  compareIdx1 = -1;
  compareIdx2 = -1;
  compareActive = false;
  compareButton.html('⇔ Compare Mode: OFF');
  backButton.hide();
}

function toggleCompare() {
  compareActive = !compareActive;
  compareButton.html('⇔ Compare Mode: ' + (compareActive ? 'ON' : 'OFF'));
  if (!compareActive) {
    compareIdx1 = -1;
    compareIdx2 = -1;
    viewMode = 'grid';
    backButton.hide();
  }
}

function mousePressed() {
  if (viewMode === 'grid') {
    let idx = getHoveredPanel(mouseX, mouseY);
    if (idx >= 0) {
      if (compareActive) {
        if (compareIdx1 < 0) {
          compareIdx1 = idx;
        } else if (compareIdx2 < 0 && idx !== compareIdx1) {
          compareIdx2 = idx;
          viewMode = 'compare';
          backButton.show();
        } else {
          compareIdx1 = idx;
          compareIdx2 = -1;
          viewMode = 'grid';
          backButton.hide();
        }
      } else {
        selectedIdx = idx;
        viewMode = 'detail';
        backButton.show();
      }
    }
  }
}

function getHoveredPanel(mx, my) {
  let cols = 2, rows = 2;
  let titleH = 50;
  let gap    = 10;
  let pw = (canvasWidth - (cols + 1) * gap) / cols;
  let ph = (drawHeight - titleH - (rows + 1) * gap) / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let i  = r * cols + c;
      let px = gap + c * (pw + gap);
      let py = titleH + gap + r * (ph + gap);
      if (mx >= px && mx <= px + pw && my >= py && my <= py + ph) return i;
    }
  }
  return -1;
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // reposition compare button on resize
  compareButton.position(canvasWidth - 185, drawHeight + 14);

  if (viewMode === 'grid') drawGrid();
  else if (viewMode === 'detail') drawDetail(selectedIdx, 0, canvasWidth);
  else if (viewMode === 'compare') drawCompare();

  // Control area labels
  noStroke();
  fill(80);
  textAlign(LEFT, CENTER);
  textSize(12);
  if (viewMode === 'grid' && compareActive) {
    text('Compare mode ON — click two panels to compare', 10, drawHeight + 30);
  } else if (viewMode === 'grid') {
    text('Click any panel to explore details', 10, drawHeight + 30);
  }
}

function drawGrid() {
  let titleH = 50;
  let gap    = 10;
  let cols   = 2, rows = 2;
  let pw = (canvasWidth - (cols + 1) * gap) / cols;
  let ph = (drawHeight - titleH - (rows + 1) * gap) / rows;

  // Page title
  noStroke();
  fill(20, 50, 110);
  textAlign(CENTER, TOP);
  textSize(20);
  text('Industrial Powder Bed Fusion — Process Comparison', canvasWidth / 2, 12);

  hoveredIdx = getHoveredPanel(mouseX, mouseY);

  for (let i = 0; i < 4; i++) {
    let r  = floor(i / 2);
    let c  = i % 2;
    let px = gap + c * (pw + gap);
    let py = titleH + gap + r * (ph + gap);
    drawPanel(i, px, py, pw, ph, hoveredIdx === i, compareIdx1 === i);
  }
}

function drawPanel(i, px, py, pw, ph, hovered, selected) {
  let p  = processes[i];
  let bg = color(p.col[0], p.col[1], p.col[2], hovered ? 45 : 22);
  let bd = color(p.col[0], p.col[1], p.col[2], selected ? 255 : hovered ? 200 : 120);

  fill(bg);
  stroke(bd);
  strokeWeight(hovered || selected ? 2.5 : 1.5);
  rect(px, py, pw, ph, 8);

  // Acronym
  noStroke();
  fill(p.col[0], p.col[1], p.col[2]);
  textAlign(CENTER, TOP);
  textSize(36);
  text(p.id, px + pw / 2, py + 10);

  // Full name
  fill(30);
  textSize(12);
  text(p.name, px + pw / 2, py + 52);

  // Divider
  stroke(p.col[0], p.col[1], p.col[2], 80);
  strokeWeight(1);
  line(px + 16, py + 72, px + pw - 16, py + 72);

  // Attributes
  noStroke();
  fill(50);
  textAlign(LEFT, TOP);
  textSize(11);
  let ay = py + 80;
  let indent = px + 12;
  text('⚡ ' + p.energy, indent, ay, pw - 20);
  text('◉ ' + (p.material.length > 40 ? p.material.substring(0, 38) + '…' : p.material), indent, ay + 22, pw - 20);
  text('☁ ' + p.atmosphere, indent, ay + 44, pw - 20);

  // Application
  fill(p.col[0], p.col[1], p.col[2]);
  textAlign(LEFT, BOTTOM);
  textSize(11);
  text('▸ ' + p.applications.split(',')[0].trim(), indent, py + ph - 10, pw - 20);
}

function drawDetail(i, x, w) {
  let p  = processes[i];
  let bd = color(p.col[0], p.col[1], p.col[2]);

  // Header bar
  fill(p.col[0], p.col[1], p.col[2], 50);
  noStroke();
  rect(x, 0, w, 55, 0);

  noStroke();
  fill(p.col[0], p.col[1], p.col[2]);
  textAlign(LEFT, CENTER);
  textSize(28);
  text(p.id, x + 16, 28);
  textSize(14);
  fill(30);
  text(p.name, x + 72, 28);

  // Description
  fill(40);
  textAlign(LEFT, TOP);
  textSize(13);
  text(p.description, x + 16, 62, w - 32);

  // Attribute rows
  let rowY = 155;
  let rowH = 36;
  let attrs = [
    ['⚡ Energy', p.energy],
    ['◉ Material', p.material],
    ['☁ Atmosphere', p.atmosphere],
    ['⬛ Build Volume', p.buildVol],
    ['✔ Advantage', p.advantage],
    ['✘ Limitation', p.limitation],
    ['▸ Applications', p.applications]
  ];

  for (let j = 0; j < attrs.length; j++) {
    let ay = rowY + j * rowH;
    fill(p.col[0], p.col[1], p.col[2], j % 2 === 0 ? 30 : 12);
    noStroke();
    rect(x, ay, w, rowH);

    fill(p.col[0], p.col[1], p.col[2]);
    textAlign(LEFT, CENTER);
    textSize(12);
    text(attrs[j][0], x + 12, ay + rowH / 2);

    fill(35);
    textAlign(LEFT, CENTER);
    textSize(12);
    text(attrs[j][1], x + 130, ay + rowH / 2, w - 145);
  }
}

function drawCompare() {
  let half = floor(canvasWidth / 2);
  drawDetail(compareIdx1, 0,    half - 1);
  // divider
  stroke(180);
  strokeWeight(1);
  line(half, 0, half, drawHeight);
  drawDetail(compareIdx2, half + 1, half - 1);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  compareButton.position(canvasWidth - 185, drawHeight + 14);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth    = containerWidth;
}
