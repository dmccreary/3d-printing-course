// Infill Pattern Explorer — compare FDM infill patterns
// CANVAS_HEIGHT: 580
// Bloom L4: compare patterns visually; predict best pattern for application

let containerWidth;
let canvasWidth  = 700;
let drawHeight   = 420;
let infoH        = 160;
let canvasHeight  = drawHeight + infoH;
let containerHeight = canvasHeight;

const PATTERNS = [
  {
    name: 'Lines',
    col: [70, 140, 220],
    strength: [1, 0, 0],   // [isotropy, compressive, shear] 0-3
    speed: 3, material: 1,
    desc: 'Parallel lines in a single direction per layer, alternating 90° each layer. Fastest to print, minimum material, but weak perpendicular to lines.',
    bestFor: 'Models where only one load direction matters; quick prototypes; internal disposable parts.',
    drawFn: drawLines
  },
  {
    name: 'Grid',
    col: [40, 170, 100],
    strength: [2, 2, 1],
    speed: 2, material: 2,
    desc: 'Two sets of perpendicular lines overlapping. Equal strength in X and Y directions. Good balance of speed and strength for general-purpose parts.',
    bestFor: 'General-purpose structural parts that see loads in multiple directions.',
    drawFn: drawGrid
  },
  {
    name: 'Triangles',
    col: [200, 130, 30],
    strength: [3, 2, 3],
    speed: 2, material: 2,
    desc: 'Equilateral triangles distribute load in three directions at 60° intervals. Better shear resistance than grid. Slightly more material than lines.',
    bestFor: 'Parts needing in-plane strength in multiple directions; floor/ceiling panels.',
    drawFn: drawTriangles
  },
  {
    name: 'Honeycomb',
    col: [180, 50, 160],
    strength: [2, 3, 2],
    speed: 1, material: 2,
    desc: 'Hexagonal cells, inspired by natural honeycomb. Excellent compressive strength-to-weight ratio. Takes longer to print than grid.',
    bestFor: 'Parts under compression; lightweight structural components; packaging.',
    drawFn: drawHoneycomb
  },
  {
    name: 'Gyroid',
    col: [50, 170, 170],
    strength: [3, 3, 3],
    speed: 1, material: 3,
    desc: 'Continuous 3D wavy surface — truly isotropic (equal strength in all directions). Excellent for flexible materials and parts needing uniform crush resistance.',
    bestFor: 'Flexible TPU parts; isotropic loads; cushioning and impact absorption.',
    drawFn: drawGyroid
  },
  {
    name: 'Lightning',
    col: [200, 80, 50],
    strength: [0, 0, 0],
    speed: 3, material: 0,
    desc: 'Minimal branching structure — only supports top surfaces, not structural. Minimum material usage. Not suitable for any load-bearing application.',
    bestFor: 'Display models; visual prototypes where material saving is the only goal.',
    drawFn: drawLightning
  },
];

const STRENGTH_LABELS = ['Isotropy', 'Compressive', 'Shear'];
let selectedPattern = 0;
let densitySlider;
let density = 20;  // percent

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  densitySlider = createSlider(10, 50, 20, 5);
  densitySlider.style('width', '140px');
  densitySlider.input(() => { density = densitySlider.value(); });

  describe('Infill Pattern Explorer — select a pattern and density to compare strength, speed, and material usage', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245, 248, 253);

  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('Infill Pattern Explorer', canvasWidth / 2, 7);

  density = densitySlider.value();

  // Pattern buttons (top row)
  drawPatternButtons();

  // Preview area (left side, large)
  drawPreviewArea();

  // Stats panel (right side)
  drawStatsPanel();

  // Info panel (bottom)
  drawInfoPanel();

  // Slider position
  let sliderX = 180;
  let sliderY = drawHeight + 120;
  densitySlider.position(sliderX + 100, sliderY - 6);
}

function drawPatternButtons() {
  let bw = floor((canvasWidth - 16) / PATTERNS.length) - 4;
  let by = 30;
  PATTERNS.forEach((p, i) => {
    let bx = 8 + i * (bw + 4);
    let isSel = selectedPattern === i;
    let isHov = mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + 28;
    fill(p.col[0], p.col[1], p.col[2], isSel ? 230 : isHov ? 160 : 110);
    stroke(p.col[0], p.col[1], p.col[2]); strokeWeight(isSel ? 2.5 : 1);
    rect(bx, by, bw, 28, 4);
    noStroke(); fill(255); textAlign(CENTER, CENTER); textSize(10.5);
    text(p.name, bx + bw/2, by + 14);
  });
}

function drawPreviewArea() {
  let px = 10, py = 68, pw = floor(canvasWidth * 0.55), ph = drawHeight - py - 10;
  fill(250); stroke(190); strokeWeight(1);
  rect(px, py, pw, ph, 4);

  let p = PATTERNS[selectedPattern];
  p.drawFn(px + 4, py + 4, pw - 8, ph - 8, density, p.col);

  noStroke(); fill(p.col[0], p.col[1], p.col[2], 200);
  rect(px, py + ph - 22, pw, 22, 0, 0, 4, 4);
  fill(255); textAlign(CENTER, CENTER); textSize(11);
  text(p.name + ' — ' + density + '% density', px + pw/2, py + ph - 11);
}

function drawStatsPanel() {
  let p = PATTERNS[selectedPattern];
  let sx = floor(canvasWidth * 0.57), sy = 68;
  let sw = canvasWidth - sx - 10, sh = drawHeight - sy - 10;

  fill(255); stroke(190); strokeWeight(1);
  rect(sx, sy, sw, sh, 4);

  noStroke(); fill(50); textAlign(LEFT, TOP); textSize(11);
  text('Pattern Stats', sx + 8, sy + 8);

  // Strength bars
  STRENGTH_LABELS.forEach((lbl, i) => {
    let ry = sy + 30 + i * 36;
    let val = p.strength[i];
    fill(90); textSize(9.5); textAlign(LEFT, TOP);
    text(lbl, sx + 8, ry);
    for (let d = 0; d < 3; d++) {
      let col = d < val ? color(p.col[0], p.col[1], p.col[2]) : color(220);
      fill(col); noStroke();
      rect(sx + 8 + d * (sw - 16) / 3, ry + 14, (sw - 20) / 3 - 2, 14, 2);
    }
  });

  // Speed and material
  let labels2 = [
    ['Print Speed', p.speed, [40, 170, 80]],
    ['Material Use', 3 - p.material, [200, 100, 30]],
  ];
  labels2.forEach(([lbl, val, col], i) => {
    let ry = sy + 30 + (3 + i) * 36;
    fill(90); textSize(9.5); textAlign(LEFT, TOP); noStroke();
    text(lbl, sx + 8, ry);
    let stars = val === 3 ? '★★★' : val === 2 ? '★★☆' : val === 1 ? '★☆☆' : '☆☆☆';
    fill(col[0], col[1], col[2]); textSize(14); textAlign(LEFT, TOP);
    text(stars, sx + 8, ry + 12);
  });

  // Best for tag
  let ty = sy + sh - 60;
  fill(p.col[0], p.col[1], p.col[2], 30); stroke(p.col[0], p.col[1], p.col[2], 80); strokeWeight(1);
  rect(sx + 6, ty, sw - 12, 50, 4);
  noStroke(); fill(p.col[0], p.col[1], p.col[2]); textSize(9); textAlign(LEFT, TOP);
  text('Best for:', sx + 10, ty + 4);
  fill(40); textSize(9);
  text(p.bestFor, sx + 10, ty + 16, sw - 20);
}

function drawInfoPanel() {
  let p = PATTERNS[selectedPattern];
  let x = 10, y = drawHeight + 8, w = canvasWidth - 20;

  noStroke(); fill(p.col[0], p.col[1], p.col[2]);
  textAlign(LEFT, TOP); textSize(13);
  text(p.name + ' Infill', x, y);
  stroke(p.col[0], p.col[1], p.col[2]); strokeWeight(1.5);
  line(x, y + 20, x + w, y + 20);

  noStroke(); fill(40); textSize(10.5); textAlign(LEFT, TOP);
  text(p.desc, x, y + 28, w * 0.60);

  // Density label
  fill(60); textSize(11);
  text('Density: ' + density + '%', x + w * 0.62, y + 28);
  densitySlider.position(x + w * 0.62 + 72, drawHeight + 36 - 6);
}

// ───── pattern drawing functions ──────────────────────────────────────────────

function drawLines(px, py, pw, ph, dens, col) {
  let spacing = map(dens, 10, 50, 30, 8);
  stroke(col[0], col[1], col[2], 200); strokeWeight(1.5);
  for (let x = px; x < px + pw; x += spacing) line(x, py, x, py + ph);
  stroke(col[0], col[1], col[2], 100); strokeWeight(1);
  for (let y = py; y < py + ph; y += spacing) line(px, y, px + pw, y);
}

function drawGrid(px, py, pw, ph, dens, col) {
  let spacing = map(dens, 10, 50, 28, 8);
  stroke(col[0], col[1], col[2], 200); strokeWeight(1.5);
  for (let x = px; x < px + pw; x += spacing) line(x, py, x, py + ph);
  for (let y = py; y < py + ph; y += spacing) line(px, y, px + pw, y);
}

function drawTriangles(px, py, pw, ph, dens, col) {
  let s = map(dens, 10, 50, 36, 12);
  stroke(col[0], col[1], col[2], 200); strokeWeight(1.5); noFill();
  for (let gy = py; gy < py + ph + s; gy += s * 0.87) {
    let rowOffset = (floor((gy - py) / (s * 0.87)) % 2 === 0) ? 0 : s/2;
    for (let gx = px - s + rowOffset; gx < px + pw + s; gx += s) {
      triangle(gx, gy + s * 0.87, gx + s/2, gy, gx + s, gy + s * 0.87);
    }
  }
}

function drawHoneycomb(px, py, pw, ph, dens, col) {
  let s = map(dens, 10, 50, 28, 9);
  let w_ = s * sqrt(3);
  stroke(col[0], col[1], col[2], 200); strokeWeight(1.5); noFill();
  for (let gy = py - s; gy < py + ph + s; gy += s * 1.5) {
    for (let gx = px - w_; gx < px + pw + w_; gx += w_) {
      let ox = (floor((gy - py) / (s * 1.5)) % 2) * w_ / 2;
      let hx = gx + ox;
      beginShape();
      for (let a = 0; a < 6; a++) vertex(hx + s * cos(a * PI/3 + PI/6), gy + s * sin(a * PI/3 + PI/6));
      endShape(CLOSE);
    }
  }
}

function drawGyroid(px, py, pw, ph, dens, col) {
  let freq = map(dens, 10, 50, 0.05, 0.14);
  stroke(col[0], col[1], col[2], 200); strokeWeight(1.5);
  let step = 3;
  for (let y = py; y < py + ph; y += 12) {
    beginShape();
    noFill();
    for (let x = px; x <= px + pw; x += step) {
      let t = (x - px) * freq;
      let wy = y + 14 * sin(t) + 6 * sin(t * 2.3 + y * freq * 1.8);
      vertex(x, wy);
    }
    endShape();
  }
  stroke(col[0], col[1], col[2], 120); strokeWeight(1);
  for (let x = px; x < px + pw; x += 12) {
    beginShape(); noFill();
    for (let y = py; y <= py + ph; y += step) {
      let t = (y - py) * freq;
      let wx = x + 10 * cos(t) + 5 * cos(t * 2.1 + x * freq * 1.6);
      vertex(wx, y);
    }
    endShape();
  }
}

function drawLightning(px, py, pw, ph, dens, col) {
  stroke(col[0], col[1], col[2], 180); strokeWeight(1.5);
  // Sparse random-ish tree
  let branches = max(3, floor(pw / 60));
  for (let b = 0; b < branches; b++) {
    let bx = px + pw * (b + 0.5) / branches;
    let by = py + ph;
    let tx = bx + randomGaussian(0, 20);
    line(bx, by, tx, py + 10);
    let mid = (by + py) / 2;
    line(tx, mid, tx - 20, mid - 20);
    line(tx, mid, tx + 18, mid - 15);
  }
  // Top surface lines (minimum coverage)
  stroke(col[0], col[1], col[2], 100); strokeWeight(1);
  for (let y = py; y < py + 15; y += 4) line(px, y, px + pw, y);
}

function mousePressed() {
  let bw = floor((canvasWidth - 16) / PATTERNS.length) - 4;
  for (let i = 0; i < PATTERNS.length; i++) {
    let bx = 8 + i * (bw + 4);
    if (mouseX >= bx && mouseX <= bx + bw && mouseY >= 30 && mouseY <= 58) {
      selectedPattern = i; return;
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
