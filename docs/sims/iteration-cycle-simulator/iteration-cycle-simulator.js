// Iteration Cycle Simulator — prototype-test-revise convergence
// CANVAS_HEIGHT: 580
// Bloom L4 Analyze: examine how iteration cycles converge on design specs

let containerWidth;
let canvasWidth  = 700;
let drawHeight   = 510;
let controlHeight = 70;
let canvasHeight  = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 16;

// Sliders
let researchSlider, fidelitySlider, rigorSlider;
let runButton, resetButton;

// Simulation state
let quality   = 35;       // design quality 0–100
let targetQuality = 80;
let iterNum   = 0;
let history   = [{ iter: 0, quality: 35, log: 'Starting quality (baseline prototype).' }];
const MAX_ITER = 12;

// Cycle animation
let beadAngle = 0;   // 0–TWO_PI rotating around cycle
let animating = false;

// Change log messages
const improvements = [
  ['wall thickness', 'load capacity'],
  ['infill density', 'stiffness'],
  ['layer height', 'surface accuracy'],
  ['perimeter count', 'tensile strength'],
  ['support type', 'post-processing time'],
  ['print orientation', 'anisotropic strength'],
  ['nozzle temperature', 'layer adhesion'],
  ['seam placement', 'aesthetic quality'],
  ['cooling fan speed', 'warp resistance'],
  ['bed temperature', 'first-layer adhesion'],
  ['retraction settings', 'stringing artifacts'],
  ['material grade', 'impact resistance']
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(13);

  researchSlider = createSlider(1, 5, 3);
  researchSlider.position(margin + 100, drawHeight + 14);
  researchSlider.size(120);

  fidelitySlider = createSlider(1, 5, 3);
  fidelitySlider.position(margin + 280, drawHeight + 14);
  fidelitySlider.size(120);

  rigorSlider = createSlider(1, 5, 3);
  rigorSlider.position(margin + 460, drawHeight + 14);
  rigorSlider.size(120);

  runButton = createButton('▶ Run Iteration');
  runButton.position(margin, drawHeight + 40);
  runButton.style('font-size', '13px');
  runButton.style('padding', '6px 14px');
  runButton.style('background', '#1565C0');
  runButton.style('color', 'white');
  runButton.style('border', 'none');
  runButton.style('border-radius', '4px');
  runButton.style('cursor', 'pointer');
  runButton.mousePressed(runIteration);

  resetButton = createButton('↺ Reset');
  resetButton.position(margin + 165, drawHeight + 40);
  resetButton.style('font-size', '13px');
  resetButton.style('padding', '6px 14px');
  resetButton.style('background', '#e53935');
  resetButton.style('color', 'white');
  resetButton.style('border', 'none');
  resetButton.style('border-radius', '4px');
  resetButton.style('cursor', 'pointer');
  resetButton.mousePressed(resetSim);

  describe('Iteration Cycle Simulator — run prototype-test-revise iterations and watch design quality converge', LABEL);
}

function runIteration() {
  if (iterNum >= MAX_ITER || quality >= 99) return;
  iterNum++;

  let r = researchSlider.value();
  let f = fidelitySlider.value();
  let s = rigorSlider.value();

  // Improvement formula with diminishing returns
  let effort = (r + f + s) / 15;   // 0.2 – 1.0
  let maxGain = effort * 20 * (1 - quality / 110);
  let gain = max(0.5, maxGain * (0.6 + random(0.4)));
  gain = round(gain * 10) / 10;
  quality = min(99.9, quality + gain);

  let imp = improvements[(iterNum - 1) % improvements.length];
  let logMsg = `Iteration ${iterNum}: Adjusted ${imp[0]} → ${imp[1]} improved ${gain.toFixed(1)}%`;
  history.push({ iter: iterNum, quality: round(quality * 10) / 10, log: logMsg });

  animating = true;
  beadAngle = 0;
}

function resetSim() {
  quality  = 35;
  iterNum  = 0;
  history  = [{ iter: 0, quality: 35, log: 'Starting quality (baseline prototype).' }];
  animating = false;
  beadAngle = 0;
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Advance bead
  if (animating) {
    beadAngle += 0.06;
    if (beadAngle >= TWO_PI) { beadAngle = 0; animating = false; }
  }

  // Title
  noStroke();
  fill(20, 50, 110);
  textAlign(CENTER, TOP);
  textSize(18);
  text('Design Iteration Cycle Simulator', canvasWidth / 2, 8);

  // ── QUALITY GAUGE ──────────────────────────────────────────────────
  drawQualityGauge(quality, targetQuality);

  // ── CYCLE DIAGRAM ──────────────────────────────────────────────────
  drawCycleDiagram();

  // ── LINE CHART ─────────────────────────────────────────────────────
  drawLineChart();

  // ── LOG ────────────────────────────────────────────────────────────
  drawLog();

  // ── CONTROL LABELS ─────────────────────────────────────────────────
  noStroke();
  fill(40);
  textAlign(LEFT, TOP);
  textSize(11);
  text('Research depth: ' + researchSlider.value(), margin, drawHeight + 14);
  text('Prototype fidelity: ' + fidelitySlider.value(), margin + 178, drawHeight + 14);
  text('Test rigor: ' + rigorSlider.value(), margin + 360, drawHeight + 14);

  // Reposition sliders
  researchSlider.position(margin + 100, drawHeight + 14);
  fidelitySlider.position(margin + 280, drawHeight + 14);
  rigorSlider.position(margin + 460, drawHeight + 14);
  runButton.position(margin, drawHeight + 38);
  resetButton.position(margin + 160, drawHeight + 38);
}

function drawQualityGauge(q, target) {
  let gx = margin;
  let gy = 38;
  let gw = canvasWidth - 2 * margin;
  let gh = 28;
  let t  = q / 100;

  let gc = lerpColor(color(210, 50, 50), color(50, 180, 60), t);
  fill(215); noStroke(); rect(gx, gy, gw, gh, 5);
  fill(gc); rect(gx, gy, gw * t, gh, 5);
  noFill(); stroke(160); strokeWeight(1); rect(gx, gy, gw, gh, 5);

  // Target marker
  let tx = gx + gw * target / 100;
  stroke(20, 80, 180);
  strokeWeight(2);
  line(tx, gy - 4, tx, gy + gh + 4);
  noStroke(); fill(20, 80, 180);
  textAlign(CENTER, BOTTOM); textSize(10);
  text('Target ' + target + '%', tx, gy - 6);

  // Label
  noStroke(); fill(0);
  textAlign(LEFT, CENTER); textSize(13);
  text('Design Quality:', margin, gy - 14);
  textAlign(RIGHT, CENTER);
  fill(q >= target ? color(30, 120, 40) : color(180, 40, 40));
  textSize(14);
  text(q.toFixed(1) + '%', canvasWidth - margin, gy - 14);

  if (q >= target) {
    fill(30, 120, 40, 30); noStroke();
    rect(gx + gw * target / 100, gy, gw - gw * target / 100, gh, 0, 5, 5, 0);
    noStroke(); fill(30, 120, 40);
    textAlign(CENTER, CENTER); textSize(11);
    text('✓ Meets spec!', gx + gw * (target / 100 + (100 - target) / 200), gy + gh / 2);
  }
}

function drawCycleDiagram() {
  let cx = margin + 110;
  let cy = 230;
  let R  = 80;

  // Ring
  noFill(); stroke(180); strokeWeight(2);
  ellipse(cx, cy, R * 2, R * 2);

  // Three phases at 0°, 120°, 240° (starting top = -90° = Prototype)
  const phases = [
    { label: 'Prototype', angle: -HALF_PI + 0,            col: [30, 120, 200] },
    { label: 'Test',      angle: -HALF_PI + TWO_PI / 3,   col: [200, 100, 30] },
    { label: 'Revise',    angle: -HALF_PI + 2 * TWO_PI / 3, col: [50, 160, 80] }
  ];

  phases.forEach(ph => {
    let px = cx + cos(ph.angle) * R;
    let py = cy + sin(ph.angle) * R;

    // Node
    fill(ph.col[0], ph.col[1], ph.col[2]);
    noStroke();
    ellipse(px, py, 36, 36);

    // Label
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(10);
    let labelOffset = 22;
    text(ph.label, px + cos(ph.angle) * labelOffset, py + sin(ph.angle) * labelOffset);
  });

  // Arrows — draw curved paths between phase nodes using many small segments
  stroke(120); strokeWeight(2); noFill();
  for (let i = 0; i < 3; i++) {
    let a1 = phases[i].angle + 0.32;
    let a2 = phases[(i + 1) % 3].angle - 0.32;
    // draw arc as polyline
    let steps = 20;
    beginShape();
    for (let s = 0; s <= steps; s++) {
      let a = lerp(a1, a2, s / steps);
      vertex(cx + cos(a) * R, cy + sin(a) * R);
    }
    endShape();
    // arrowhead
    let aDir = a2 + HALF_PI;
    let ax = cx + cos(a2) * R;
    let ay = cy + sin(a2) * R;
    fill(120); noStroke();
    triangle(ax, ay,
      ax + cos(aDir - 0.45) * 9, ay + sin(aDir - 0.45) * 9,
      ax + cos(aDir + 0.45) * 9, ay + sin(aDir + 0.45) * 9);
    stroke(120); strokeWeight(2); noFill();
  }

  // Glowing bead
  let bx = cx + cos(-HALF_PI + beadAngle) * R;
  let by = cy + sin(-HALF_PI + beadAngle) * R;
  fill(255, 200, 0, 120); noStroke();
  ellipse(bx, by, 18, 18);
  fill(255, 200, 0); ellipse(bx, by, 10, 10);

  // Iteration count
  noStroke(); fill(60);
  textAlign(CENTER, CENTER); textSize(12);
  text('Iteration\n' + iterNum, cx, cy);
}

function drawLineChart() {
  let chartX = margin + 235;
  let chartY = 80;
  let chartW = canvasWidth - chartX - margin;
  let chartH = 230;

  // Background
  fill(250); stroke(200); strokeWeight(1);
  rect(chartX, chartY, chartW, chartH);

  // Axes labels
  noStroke(); fill(80);
  textAlign(CENTER, TOP); textSize(10);
  text('Iteration #', chartX + chartW / 2, chartY + chartH + 4);
  textAlign(CENTER, BOTTOM); textSize(10);
  push(); translate(chartX - 14, chartY + chartH / 2); rotate(-HALF_PI); text('Quality %', 0, 0); pop();

  // Grid lines (0, 25, 50, 75, 100)
  for (let v of [0, 25, 50, 75, 100]) {
    let gy = map(v, 0, 100, chartY + chartH, chartY);
    stroke(220); strokeWeight(1);
    line(chartX, gy, chartX + chartW, gy);
    noStroke(); fill(140); textAlign(RIGHT, CENTER); textSize(9);
    text(v + '%', chartX - 3, gy);
  }

  // X axis labels
  for (let i = 0; i <= MAX_ITER; i += 2) {
    let gx = map(i, 0, MAX_ITER, chartX, chartX + chartW);
    stroke(220); line(gx, chartY, gx, chartY + chartH);
    noStroke(); fill(140); textAlign(CENTER, TOP); textSize(9);
    text(i, gx, chartY + chartH + 2);
  }

  // Target line
  let ty = map(targetQuality, 0, 100, chartY + chartH, chartY);
  stroke(20, 80, 180); strokeWeight(1.5); setLineDash([4, 4]);
  line(chartX, ty, chartX + chartW, ty);
  setLineDash([]);
  noStroke(); fill(20, 80, 180); textAlign(LEFT, BOTTOM); textSize(10);
  text('Target ' + targetQuality + '%', chartX + 3, ty - 2);

  // Data line
  if (history.length > 1) {
    stroke(200, 60, 60); strokeWeight(2.5); noFill();
    beginShape();
    history.forEach(h => {
      let px = map(h.iter, 0, MAX_ITER, chartX, chartX + chartW);
      let py = map(h.quality, 0, 100, chartY + chartH, chartY);
      vertex(px, py);
    });
    endShape();
  }

  // Data points
  history.forEach(h => {
    let px = map(h.iter, 0, MAX_ITER, chartX, chartX + chartW);
    let py = map(h.quality, 0, 100, chartY + chartH, chartY);
    fill(200, 60, 60); noStroke();
    ellipse(px, py, 8, 8);
  });
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function drawLog() {
  let lx = margin;
  let ly = 330;
  let lh = 140;
  let lw = 215;

  fill(255); stroke(200); strokeWeight(1);
  rect(lx, ly, lw, lh, 4);

  noStroke(); fill(60);
  textAlign(LEFT, TOP); textSize(11);
  text('Iteration Log', lx + 6, ly + 5);

  stroke(200); line(lx, ly + 18, lx + lw, ly + 18); noStroke();

  fill(50); textSize(10);
  let visible = history.slice(-5).reverse();
  visible.forEach((h, i) => {
    let y = ly + 24 + i * 22;
    fill(h.iter === iterNum ? color(180, 30, 30) : 80);
    text(h.log, lx + 4, y, lw - 8);
  });
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  researchSlider.position(margin + 100, drawHeight + 14);
  fidelitySlider.position(margin + 280, drawHeight + 14);
  rigorSlider.position(margin + 460, drawHeight + 14);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth    = containerWidth;
}
