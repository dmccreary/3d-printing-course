// Filament Lifecycle Explorer — circular flow diagram with environmental impact
// CANVAS_HEIGHT: 580
// Bloom L4: examine full lifecycle of a 3D-printed part and identify waste/impact

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 580;
let containerHeight = canvasHeight;

let selectedNode = -1;
let hoveredNode  = -1;
let selectedMat  = 0;  // 0=PLA, 1=PETG, 2=ABS

const MATS = ['PLA', 'PETG', 'ABS'];

const NODES = [
  {
    id: 0, label: 'Raw Material',
    fx: 0.50, fy: 0.14,
    col: [80, 140, 60],
    detail: 'Corn starch (PLA), petroleum (PETG/ABS), or bio-based feedstocks are processed into polymer pellets. PLA consumes less fossil energy; ABS is 100% petroleum-derived.',
    impact: ['PLA: Moderate (corn farming CO₂)', 'PETG: High (petroleum cracking)', 'ABS: High (styrene/butadiene synthesis)'],
    arrow_to: 1, arrow_label: 'Polymer pellets'
  },
  {
    id: 1, label: 'Pellet Production',
    fx: 0.82, fy: 0.28,
    col: [60, 130, 170],
    detail: 'Polymer pellets are compounded with colorants, stabilizers, and modifiers at a chemical plant. Energy-intensive extrusion and mixing occurs here.',
    impact: ['PLA: Low-moderate', 'PETG: Moderate', 'ABS: High (VOC emissions during production)'],
    arrow_to: 2, arrow_label: 'Compounded resin'
  },
  {
    id: 2, label: 'Filament Extrusion',
    fx: 0.92, fy: 0.55,
    col: [60, 130, 170],
    detail: 'Pellets are melted and extruded through a precision die to form 1.75mm or 2.85mm filament. Spooling, QC, and packaging add further material use.',
    impact: ['PLA: Low (~1.5 kWh/kg)', 'PETG: Low-moderate', 'ABS: Moderate (requires higher temps)'],
    arrow_to: 3, arrow_label: 'Filament on spool'
  },
  {
    id: 3, label: 'Spool & Shipping',
    fx: 0.82, fy: 0.80,
    col: [100, 100, 180],
    detail: 'Filament ships in plastic bags on plastic spools. Shipping creates transport emissions; spool plastic often cannot be recycled locally.',
    impact: ['All materials: Spool waste (~120g plastic per kg filament)', 'Shipping: Variable by distance'],
    arrow_to: 4, arrow_label: 'Filament to printer'
  },
  {
    id: 4, label: 'FDM Printer',
    fx: 0.50, fy: 0.88,
    col: [160, 80, 40],
    detail: 'The printer consumes electricity (~100–400W) and produces the part plus waste: failed prints, support structures, purge lines, and test pieces.',
    impact: ['Waste rate: 10–30% typical for beginners', 'Electricity: 0.1–0.4 kWh per hour', 'Failed prints go directly to landfill'],
    arrow_to: 5, arrow_label: 'Finished parts + waste'
  },
  {
    id: 5, label: 'Finished Part',
    fx: 0.18, fy: 0.80,
    col: [40, 120, 200],
    detail: 'The printed part is used — in a prototype, a repair, a product, or a student project. Use-phase determines whether the material and energy investment was worthwhile.',
    impact: ['Extends product life → positive impact', 'One-time novelty item → waste', 'Functional replacement part → highly positive'],
    arrow_to: 6, arrow_label: 'Used product'
  },
  {
    id: 6, label: 'End of Life',
    fx: 0.08, fy: 0.55,
    col: [120, 60, 160],
    detail: 'Click each end-of-life path to explore. The disposal option strongly determines the lifecycle\'s environmental footprint.',
    impact: ['Path determines impact — see branches below'],
    arrow_to: -1, arrow_label: ''
  },
  {
    id: 7, label: 'Recycled',
    fx: 0.18, fy: 0.28,
    col: [40, 170, 80],
    detail: 'Some PLA and PETG can be mechanically recycled at specialist facilities. Home filament extruders can recycle clean scraps. Contamination is the biggest barrier.',
    impact: ['PLA: ✓ Possible at industrial composters or recyclers', 'PETG: ✓ Technically recyclable (code 1)', 'ABS: ✓ Recyclable (code 7) but rarely accepted'],
    arrow_to: -1, arrow_label: ''
  },
  {
    id: 8, label: 'Landfill',
    fx: 0.08, fy: 0.28,
    col: [190, 60, 50],
    detail: 'Most failed prints and unsorted plastic end up in landfill. PLA may take decades to break down in landfill conditions (requires industrial composting).',
    impact: ['All: Permanent plastic waste unless industrial composted', 'PLA: Misleadingly labeled "biodegradable" — requires 50°C+ facility'],
    arrow_to: -1, arrow_label: ''
  },
  {
    id: 9, label: 'Compost',
    fx: 0.18, fy: 0.14,
    col: [80, 180, 60],
    detail: 'PLA (Polylactic Acid) can be industrially composted at temperatures above 50°C. Home composting is insufficient. Most municipalities lack collection for bioplastics.',
    impact: ['PLA only: ✓ Industrially compostable (EN 13432)', 'PETG/ABS: ✗ Not compostable'],
    arrow_to: -1, arrow_label: ''
  },
  {
    id: 10, label: 'Repurposed',
    fx: 0.30, fy: 0.14,
    col: [40, 170, 80],
    detail: 'Broken parts can be redesigned and reprinted; scraps used for other projects. Extending part life before disposal is the highest-value environmental action.',
    impact: ['All materials: Best option — avoids new material and waste', 'Repair culture reduces overall consumption'],
    arrow_to: -1, arrow_label: ''
  },
];

const EDGES = [
  { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 },
  { from: 3, to: 4 }, { from: 4, to: 5 }, { from: 5, to: 6 },
  { from: 6, to: 7 }, { from: 6, to: 8 }, { from: 6, to: 9 }, { from: 6, to: 10 },
];

// Detail panel
let detX, detY, detW, detH;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  describe('Filament Lifecycle Explorer — click any stage to examine its environmental impact', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245, 248, 253);

  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('Filament Lifecycle Explorer', canvasWidth / 2, 7);

  drawMatButtons();
  drawEdges();
  drawNodes();

  detX = floor(canvasWidth * 0.62);
  detY = 30;
  detW = canvasWidth - detX - 8;
  detH = canvasHeight - detY - 10;
  drawDetailPanel();
}

function drawMatButtons() {
  let by = 30, bw = 60, bh = 22;
  let startX = floor(canvasWidth * 0.62) + 2;
  MATS.forEach((m, i) => {
    let bx = startX + i * (bw + 4);
    let isSel = selectedMat === i;
    let col = [[80,140,60],[60,130,170],[90,80,60]][i];
    fill(col[0], col[1], col[2], isSel ? 220 : 100);
    stroke(col[0], col[1], col[2]); strokeWeight(isSel ? 2 : 1);
    rect(bx, by, bw, bh, 3);
    noStroke(); fill(255); textAlign(CENTER, CENTER); textSize(10);
    text(m, bx + bw / 2, by + bh / 2);
  });
}

function nx(n) { return floor(canvasWidth * 0.58 * n.fx) + 10; }
function ny(n) { return n.fy * (canvasHeight - 50) + 30; }

function drawEdges() {
  EDGES.forEach(e => {
    let a = NODES[e.from], b = NODES[e.to];
    let ax = nx(a), ay = ny(a), bx = nx(b), by = ny(b);
    stroke(160, 170, 190); strokeWeight(1.5);
    let ang = atan2(by - ay, bx - ax);
    let nr = 20;
    let exX = ax + cos(ang) * nr, exY = ay + sin(ang) * nr;
    let enX = bx - cos(ang) * nr, enY = by - sin(ang) * nr;
    line(exX, exY, enX, enY);
    fill(160, 170, 190); noStroke();
    let arrLen = 8;
    triangle(
      enX, enY,
      enX - arrLen * cos(ang - 0.3), enY - arrLen * sin(ang - 0.3),
      enX - arrLen * cos(ang + 0.3), enY - arrLen * sin(ang + 0.3)
    );

    // Arrow label
    if (NODES[e.from].arrow_label) {
      noStroke(); fill(80); textSize(8); textAlign(CENTER, CENTER);
      text(NODES[e.from].arrow_label, (ax + bx) / 2, (ay + by) / 2 - 8);
    }
  });
}

function drawNodes() {
  hoveredNode = -1;
  NODES.forEach((n, i) => {
    let x = nx(n), y = ny(n);
    let isSel = selectedNode === i;
    let isHov = dist(mouseX, mouseY, x, y) < 22;
    if (isHov) hoveredNode = i;

    let r = isSel ? 22 : isHov ? 20 : 18;
    if (isSel) {
      fill(n.col[0], n.col[1], n.col[2], 50); noStroke();
      ellipse(x, y, r * 3, r * 3);
    }
    fill(n.col[0], n.col[1], n.col[2], isSel ? 230 : 180);
    stroke(255, 255, 255, 200); strokeWeight(2);
    ellipse(x, y, r * 2, r * 2);
    noStroke(); fill(255); textAlign(CENTER, CENTER); textSize(7.5);
    let lines = n.label.split(' ');
    lines.forEach((l, li) => text(l, x, y + (li - (lines.length - 1) / 2) * 9));
  });
}

function drawDetailPanel() {
  fill(255); stroke(190); strokeWeight(1);
  rect(detX, detY + 28, detW, detH - 28, 4);

  if (selectedNode < 0) {
    noStroke(); fill(100); textAlign(CENTER, CENTER); textSize(11);
    text('Click any stage to explore\nits environmental impact', detX + detW / 2, detY + 28 + (detH - 28) / 2);
    return;
  }

  let n = NODES[selectedNode];
  fill(n.col[0], n.col[1], n.col[2], 220); noStroke();
  rect(detX, detY + 28, detW, 34, 4, 4, 0, 0);
  fill(255); textAlign(LEFT, CENTER); textSize(11); textStyle(BOLD);
  text(n.label, detX + 10, detY + 45);
  textStyle(NORMAL);

  noStroke(); fill(40); textAlign(LEFT, TOP); textSize(10);
  text(n.detail, detX + 10, detY + 72, detW - 20);

  let impactY = detY + 175;
  fill(n.col[0], n.col[1], n.col[2]); textSize(10);
  text('Material Impact:', detX + 10, impactY);
  fill(50); textSize(9.5);
  n.impact.forEach((line, i) => text('• ' + line, detX + 10, impactY + 16 + i * 18, detW - 20));

  // Legend (bottom)
  let ley = detX;
  let legendY = detY + detH - 80;
  fill(220, 230, 245); stroke(180); strokeWeight(1); noFill();
  rect(detX + 6, legendY, detW - 12, 74, 4);
  noStroke(); fill(80); textSize(8.5); textAlign(LEFT, TOP);
  let legendItems = [
    { col: [80,140,60], label: 'Raw / sustainable stages' },
    { col: [60,130,170], label: 'Industrial process stages' },
    { col: [40,170,80], label: 'Positive end-of-life paths' },
    { col: [190,60,50], label: 'Landfill / waste paths' },
  ];
  legendItems.forEach((l, i) => {
    fill(l.col[0], l.col[1], l.col[2]); noStroke();
    ellipse(detX + 18, legendY + 12 + i * 16, 10, 10);
    noStroke(); fill(60); textSize(8.5);
    text(l.label, detX + 26, legendY + 5 + i * 16);
  });
}

function mousePressed() {
  // Mat filter buttons
  let startX = floor(canvasWidth * 0.62) + 2;
  for (let i = 0; i < MATS.length; i++) {
    let bx = startX + i * 64;
    if (mouseX >= bx && mouseX <= bx + 60 && mouseY >= 30 && mouseY <= 52) {
      selectedMat = i; return;
    }
  }

  // Node click
  for (let i = 0; i < NODES.length; i++) {
    if (dist(mouseX, mouseY, nx(NODES[i]), ny(NODES[i])) < 22) {
      selectedNode = (selectedNode === i) ? -1 : i;
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
