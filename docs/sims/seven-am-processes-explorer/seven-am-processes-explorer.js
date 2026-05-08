// Seven AM Processes Explorer — ISO/ASTM 52900 hub-and-spoke radial infographic
// CANVAS_HEIGHT: 640
// Bloom L1-L2: identify and explain the 7 AM process categories

let containerWidth;
let canvasWidth  = 700;
let drawHeight   = 420;
let detailHeight = 220;
let canvasHeight = drawHeight + detailHeight;
let containerHeight = canvasHeight;

const categories = [
  {
    name: 'Material\nExtrusion',
    short: 'MEX',
    col: [60, 120, 210],
    icon: 'spool',
    def: 'Material is selectively dispensed through a nozzle or orifice.',
    join: 'Thermoplastic filament is melted and fused layer-by-layer upon deposition.',
    techs: 'FDM / FFF (Stratasys, Bambu Lab, Prusa); Pellet extrusion (Titan Robotics)',
    materials: 'PLA, ABS, PETG, Nylon, TPU, PC, filled composites',
    bestFor: 'Prototyping, jigs/fixtures, low-cost desktop manufacturing'
  },
  {
    name: 'Vat Photo-\npolymerization',
    short: 'VPP',
    col: [140, 50, 200],
    icon: 'vat',
    def: 'Liquid photopolymer in a vat is selectively cured by light-activated polymerization.',
    join: 'UV or visible-light photons cross-link liquid resin into a solid polymer network.',
    techs: 'SLA (3D Systems, Formlabs); DLP (Anycubic, Elegoo); MSLA (Phrozen)',
    materials: 'Acrylate & epoxy resins; dental resins; castable wax; engineering resins',
    bestFor: 'High-detail models, dental/jewelry, transparent parts'
  },
  {
    name: 'Powder Bed\nFusion',
    short: 'PBF',
    col: [210, 120, 30],
    icon: 'powder',
    def: 'Thermal energy selectively fuses regions of a powder bed.',
    join: 'Laser or electron beam sinters or melts powder particles; surrounding powder provides support.',
    techs: 'SLS (EOS, 3D Systems); DMLS/SLM (EOS M 290, SLM 280); MJF (HP); EBM (GE Arcam)',
    materials: 'Nylon, PA11, PA12 (polymer); Ti-6Al-4V, Inconel, stainless steel (metal)',
    bestFor: 'Complex geometry without supports; functional polymer parts; metal aerospace components'
  },
  {
    name: 'Material\nJetting',
    short: 'MJT',
    col: [20, 160, 150],
    icon: 'drops',
    def: 'Droplets of build material are selectively deposited.',
    join: 'Tiny photopolymer droplets are jetted and immediately UV-cured layer by layer.',
    techs: 'PolyJet (Stratasys J Series); MultiJet (3D Systems ProJet); NanoParticle Jetting',
    materials: 'Photopolymers (rigid, rubber-like, transparent, digital materials); wax',
    bestFor: 'Multi-material parts, full-color models, extremely smooth surfaces'
  },
  {
    name: 'Binder\nJetting',
    short: 'BJT',
    col: [50, 160, 80],
    icon: 'binder',
    def: 'A liquid bonding agent is selectively deposited to join powder materials.',
    join: 'A print head jets a binder into each powder layer; sintering later fuses metal or ceramic particles.',
    techs: 'Desktop Metal Studio/Shop System; ExOne; HP Metal Jet; Voxeljet (sand casting)',
    materials: 'Metal powders (SS, bronze); sand (casting molds); ceramics; full-color sandstone',
    bestFor: 'High-throughput metal parts; sand casting molds; full-color sandstone models'
  },
  {
    name: 'Directed Energy\nDeposition',
    short: 'DED',
    col: [190, 40, 40],
    icon: 'nozzle',
    def: 'Focused thermal energy fuses materials as they are deposited.',
    join: 'A laser or electron beam melts powder or wire as it is fed directly into the melt pool.',
    techs: 'LENS (Optomec); DED wire-arc (WAAM — Lincoln Electric); Electron Beam DED (Sciaky)',
    materials: 'Titanium, Inconel, stainless steel, aluminum (wire or powder)',
    bestFor: 'Large metal parts; repair/cladding of existing parts; near-net-shape forgings'
  },
  {
    name: 'Sheet\nLamination',
    short: 'SHL',
    col: [140, 90, 30],
    icon: 'sheets',
    def: 'Sheets of material are bonded and cut to form an object.',
    join: 'Layers of paper, metal foil, or polymer sheet are adhesively bonded or ultrasonically welded, then cut to shape.',
    techs: 'LOM (Helisys — paper); UAM (Fabrisonic — metal foil); SDL (Mcor — paper)',
    materials: 'Paper, plastic film, metal foil (aluminum, titanium, stainless steel)',
    bestFor: 'Large architectural models; embedded electronics in metal; low-cost paper prototypes'
  }
];

let selectedIdx  = -1;
let compareIdx   = -1;
let hoveredIdx   = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(14);
  describe('Seven AM Processes Explorer — click a category to see its definition, materials, and applications', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing region
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Detail region
  fill('white');
  rect(0, drawHeight, canvasWidth, detailHeight);

  // Title
  noStroke();
  fill(20, 50, 110);
  textAlign(CENTER, TOP);
  textSize(19);
  text('ISO/ASTM 52900 — Seven AM Process Categories', canvasWidth / 2, 10);

  // Radial layout
  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 15;
  let radius = min(cy - 60, cx - 100);
  radius = min(radius, 190);

  // Spokes
  for (let i = 0; i < 7; i++) {
    let angle = TWO_PI * i / 7 - HALF_PI;
    let nx = cx + cos(angle) * radius;
    let ny = cy + sin(angle) * radius;
    stroke(categories[i].col[0], categories[i].col[1], categories[i].col[2], 120);
    strokeWeight(i === selectedIdx || i === compareIdx ? 3 : 1.5);
    line(cx, cy, nx, ny);
  }

  // Center hub
  noStroke();
  fill(30, 50, 100);
  ellipse(cx, cy, 90, 90);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(11);
  text('AM Process\nCategories\n(52900)', cx, cy);

  // Detect hover
  hoveredIdx = -1;
  for (let i = 0; i < 7; i++) {
    let angle = TWO_PI * i / 7 - HALF_PI;
    let nx = cx + cos(angle) * radius;
    let ny = cy + sin(angle) * radius;
    let d = dist(mouseX, mouseY, nx, ny);
    if (d < 52) { hoveredIdx = i; break; }
  }

  // Category nodes
  for (let i = 0; i < 7; i++) {
    let angle = TWO_PI * i / 7 - HALF_PI;
    let nx = cx + cos(angle) * radius;
    let ny = cy + sin(angle) * radius;
    drawCategoryNode(i, nx, ny);
  }

  // Detail panel
  if (selectedIdx >= 0) {
    drawDetailPanel();
  } else {
    noStroke();
    fill(150);
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Click any category node to see its definition, materials, and applications.', canvasWidth / 2, drawHeight + detailHeight / 2);
  }
}

function drawCategoryNode(i, cx, cy) {
  let cat    = categories[i];
  let isSelected = (i === selectedIdx || i === compareIdx);
  let isHovered  = (i === hoveredIdx);
  let bc = cat.col;

  // Halo for selected
  if (isSelected) {
    noStroke();
    fill(bc[0], bc[1], bc[2], 60);
    ellipse(cx, cy, 116, 116);
  }

  // Node background
  fill(bc[0], bc[1], bc[2], isSelected ? 220 : isHovered ? 180 : 140);
  stroke(bc[0], bc[1], bc[2]);
  strokeWeight(isSelected ? 3 : 1.5);
  rectMode(CENTER);
  rect(cx, cy, 100, 70, 10);
  rectMode(CORNER);

  // Icon
  drawIcon(cat.icon, cx, cy - 12, bc, isSelected);

  // Label
  noStroke();
  fill(isSelected ? 255 : 30);
  textAlign(CENTER, CENTER);
  textSize(11);
  text(cat.name, cx, cy + 18);
}

function drawIcon(type, cx, cy, bc, selected) {
  noStroke();
  let c = selected ? color(255) : color(bc[0], bc[1], bc[2]);
  fill(c);
  let s = 12;
  if (type === 'spool') {
    // filament spool: circle with center hole
    ellipse(cx, cy, s * 2, s * 2);
    fill(selected ? color(bc[0], bc[1], bc[2]) : color(220, 230, 255));
    ellipse(cx, cy, s * 0.8, s * 0.8);
  } else if (type === 'vat') {
    // resin vat: trapezoid
    fill(c);
    quad(cx - s, cy - s * 0.5, cx + s, cy - s * 0.5, cx + s * 0.7, cy + s * 0.5, cx - s * 0.7, cy + s * 0.5);
  } else if (type === 'powder') {
    // powder bed: rectangle with dots
    fill(c);
    rect(cx - s, cy - s * 0.4, s * 2, s);
    fill(selected ? color(bc[0], bc[1], bc[2]) : color(200, 210, 240));
    for (let d of [-6, 0, 6]) ellipse(cx + d, cy, 3, 3);
  } else if (type === 'drops') {
    // droplets
    fill(c);
    for (let d of [-5, 0, 5]) ellipse(cx + d, cy + 2, 5, 7);
  } else if (type === 'binder') {
    // binder jetting: powder + drop
    fill(c);
    rect(cx - s, cy - s * 0.3, s * 2, s * 0.8);
    ellipse(cx, cy - s * 0.8, 7, 7);
  } else if (type === 'nozzle') {
    // DED nozzle: triangle
    fill(c);
    triangle(cx, cy - s, cx - s * 0.7, cy + s * 0.5, cx + s * 0.7, cy + s * 0.5);
  } else if (type === 'sheets') {
    // stacked sheets: horizontal lines
    stroke(c);
    strokeWeight(2);
    noFill();
    for (let j = -1; j <= 1; j++) line(cx - s, cy + j * 4, cx + s, cy + j * 4);
    noStroke();
  }
}

function drawDetailPanel() {
  let cat = categories[selectedIdx];
  let x   = margin;
  let y   = drawHeight + 14;
  let w   = canvasWidth - 2 * margin;
  let col = color(cat.col[0], cat.col[1], cat.col[2]);

  // Header
  noStroke();
  fill(cat.col[0], cat.col[1], cat.col[2]);
  textAlign(LEFT, TOP);
  textSize(16);
  text(cat.short + ' — ' + cat.name.replace('\n', ' '), x, y);

  // Divider
  stroke(cat.col[0], cat.col[1], cat.col[2]);
  strokeWeight(1.5);
  line(x, y + 24, x + w, y + 24);

  noStroke();
  textSize(12);
  fill(40);
  textAlign(LEFT, TOP);
  let rows = [
    ['Definition:', cat.def],
    ['How material joins:', cat.join],
    ['Technologies:', cat.techs],
    ['Typical materials:', cat.materials],
    ['Best for:', cat.bestFor]
  ];

  let ry = y + 30;
  for (let [label, val] of rows) {
    fill(cat.col[0], cat.col[1], cat.col[2]);
    text(label, x, ry);
    fill(40);
    text(val, x + 130, ry, w - 130);
    ry += 34;
  }

  // Shift-click hint
  fill(150);
  textAlign(RIGHT, BOTTOM);
  textSize(11);
  text('Shift-click another category to compare side-by-side', canvasWidth - margin, drawHeight + detailHeight - 6);
}

let margin = 12;

function mousePressed() {
  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 15;
  let radius = min(cy - 60, cx - 100);
  radius = min(radius, 190);

  for (let i = 0; i < 7; i++) {
    let angle = TWO_PI * i / 7 - HALF_PI;
    let nx = cx + cos(angle) * radius;
    let ny = cy + sin(angle) * radius;
    if (dist(mouseX, mouseY, nx, ny) < 52) {
      if (keyIsDown(SHIFT) && selectedIdx >= 0 && i !== selectedIdx) {
        compareIdx = i;
      } else {
        selectedIdx = i;
        compareIdx  = -1;
      }
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth    = containerWidth;
}
