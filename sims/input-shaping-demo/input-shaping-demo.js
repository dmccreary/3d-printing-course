// Input Shaping Demo — compare path deviation with/without resonance compensation
// CANVAS_HEIGHT: 580
// Bloom L2: explain how input shaping cancels ringing artifacts at high print speeds

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 580;

let speedSlider;
let inputShaping = true;
let pressureAdv  = true;
let stepMode     = false;
let stepFrame    = 0;
const MAX_STEP   = 80;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Input Shaping Demo — compare path deviation with and without resonance compensation', LABEL);
  textFont('sans-serif');

  speedSlider = createSlider(50, 600, 300, 10);
  speedSlider.parent(document.querySelector('main'));
  speedSlider.style('width', '140px');
}

function getSpeed() { return speedSlider.value(); }

// Path deviation model: oscillation amplitude depends on speed and whether input shaping is active
function getDeviation(speed) {
  if (inputShaping) {
    return speed < 200 ? 0.02 : speed < 400 ? 0.06 : 0.14;
  } else {
    return speed < 100 ? 0.04 : speed < 200 ? 0.12 : speed < 400 ? 0.48 : 0.85;
  }
}

function getScore(speed) {
  let dev = getDeviation(speed);
  let base = max(0, 100 - dev * 120);
  if (!pressureAdv) base -= 8;
  return round(min(100, max(0, base)));
}

function getRingLabel(speed) {
  let dev = getDeviation(speed);
  if (dev < 0.08) return { label: 'No', col: [40, 170, 80] };
  if (dev < 0.20) return { label: 'Minor', col: [200, 160, 20] };
  return { label: 'Yes', col: [190, 50, 50] };
}

function getCornerLabel(speed) {
  let dev = getDeviation(speed);
  let mod = !pressureAdv ? dev + 0.08 : dev;
  if (mod < 0.08) return { label: 'Excellent', col: [40, 170, 80] };
  if (mod < 0.25) return { label: 'Good', col: [40, 160, 80] };
  if (mod < 0.50) return { label: 'Moderate', col: [200, 160, 20] };
  return { label: 'Poor', col: [190, 50, 50] };
}

function draw() {
  updateCanvasSize();
  background(238, 244, 252);

  noStroke(); fill(18, 48, 110);
  textAlign(CENTER, TOP); textSize(17); textStyle(BOLD);
  text('Input Shaping & Pressure Advance Demo', canvasWidth / 2, 6);
  textStyle(NORMAL);

  positionSlider();
  drawControlPanel();
  drawPathPanel();
  drawQualityPanel();
}

function positionSlider() {
  speedSlider.position(16, 110);
}

function drawControlPanel() {
  let pw = 170, x = 8, y = 44, h = canvasHeight - 52;
  fill(252, 253, 255); stroke(195, 210, 230); strokeWeight(1);
  rect(x, y, pw, h, 5);

  noStroke(); fill(40, 50, 100); textAlign(LEFT, TOP); textSize(11); textStyle(BOLD);
  text('Controls', x + 10, y + 8);
  textStyle(NORMAL);

  // Speed label
  fill(40); textAlign(LEFT, TOP); textSize(10.5);
  text('Print Speed (mm/s)', x + 8, y + 28);
  fill(20, 70, 200); textSize(16); textStyle(BOLD);
  text(getSpeed() + ' mm/s', x + 8, y + 130);
  textStyle(NORMAL);

  // Toggle buttons
  let by = y + 158;
  drawToggle(x + 8, by, 154, 28, 'Input Shaping', inputShaping, [40, 170, 80], () => { inputShaping = !inputShaping; });
  by += 36;
  drawToggle(x + 8, by, 154, 28, 'Pressure Advance', pressureAdv, [50, 120, 210], () => { pressureAdv = !pressureAdv; });
  by += 48;

  // Step through button
  fill(stepMode ? color(20,80,180) : color(215, 225, 248));
  stroke(stepMode ? color(10,50,140) : color(155, 170, 210));
  strokeWeight(1); rect(x + 8, by, 154, 28, 3);
  noStroke(); fill(stepMode ? 255 : 50); textAlign(CENTER, CENTER); textSize(10.5);
  text(stepMode ? '⏹ Stop Step-Through' : '▶ Step Through Corner', x + 8 + 77, by + 14);

  if (stepMode) {
    by += 36;
    // Progress
    fill(220, 235, 255); noStroke(); rect(x + 8, by, 154, 8, 3);
    fill(50, 120, 210); rect(x + 8, by, 154 * (stepFrame / MAX_STEP), 8, 3);
    let phase = stepFrame < 30 ? 'Wall A printing' : stepFrame < 50 ? 'Approaching corner' : stepFrame < 65 ? 'Corner turn' : 'Wall B printing';
    fill(50); textAlign(CENTER, TOP); textSize(9.5);
    text(phase, x + 8 + 77, by + 12);
    stepFrame = min(stepFrame + 1, MAX_STEP);
  }

  // Legend
  let ly = y + h - 70;
  noStroke(); fill(100); textAlign(LEFT, TOP); textSize(9); textStyle(ITALIC);
  text('Blue = commanded path\nOrange = actual path\n(deviation exaggerated 10×)', x + 8, ly);
  textStyle(NORMAL);
}

function drawToggle(x, y, w, h, label, active, col, _fn) {
  fill(active ? color(col[0], col[1], col[2]) : color(210, 220, 238));
  stroke(active ? color(col[0] * 0.7, col[1] * 0.7, col[2] * 0.7) : color(160, 175, 210));
  strokeWeight(1); rect(x, y, w, h, 3);
  noStroke(); fill(active ? 255 : 60); textAlign(LEFT, CENTER); textSize(10.5);
  // Toggle switch indicator
  let sw = 28, sh = 14, sx = x + w - sw - 4, sy = y + (h - sh) / 2;
  fill(active ? color(255, 255, 255, 80) : color(180, 190, 210)); noStroke();
  rect(sx, sy, sw, sh, sh / 2);
  fill(active ? 255 : color(140, 155, 180)); noStroke();
  ellipse(active ? sx + sw - sh / 2 : sx + sh / 2, sy + sh / 2, sh - 2, sh - 2);
  noStroke(); fill(active ? 255 : 50); textAlign(LEFT, CENTER); textSize(10);
  text(label, x + 8, y + h / 2);
}

function drawPathPanel() {
  let pw = 170;
  let ppw = floor((canvasWidth - pw - 20) * 0.65);
  let x = pw + 14, y = 44, h = canvasHeight - 52;

  fill(252, 253, 255); stroke(195, 210, 230); strokeWeight(1);
  rect(x, y, ppw, h, 5);

  noStroke(); fill(40, 50, 100); textAlign(LEFT, TOP); textSize(11); textStyle(BOLD);
  text('Printed Path vs. Commanded Path', x + 8, y + 8);
  textStyle(NORMAL);

  let speed = getSpeed();
  let dev = getDeviation(speed);
  let devPx = dev * 80;  // exaggerated scale: 1mm = 80px for visibility

  // Square path simulation
  let sq = min(ppw - 40, h - 80);
  let sx = x + (ppw - sq) / 2, sy = y + (h - sq) / 2 - 10;

  // Grid background
  stroke(220, 230, 245); strokeWeight(0.5); noFill();
  let gridStep = sq / 8;
  for (let i = 0; i <= 8; i++) {
    line(sx, sy + i * gridStep, sx + sq, sy + i * gridStep);
    line(sx + i * gridStep, sy, sx + i * gridStep, sy + sq);
  }

  if (stepMode) {
    drawStepPath(sx, sy, sq, devPx);
  } else {
    // Commanded path (blue dashed)
    drawingContext.setLineDash([5, 4]);
    stroke(50, 120, 220); strokeWeight(2.5); noFill();
    rect(sx, sy, sq, sq);
    drawingContext.setLineDash([]);

    // Actual path (orange) with ringing oscillation
    stroke(220, 120, 30); strokeWeight(2); noFill();
    beginShape();
    drawActualPath(sx, sy, sq, devPx);
    endShape();
  }

  // Speed annotation
  noStroke(); fill(50); textAlign(CENTER, BOTTOM); textSize(10);
  text(speed + ' mm/s  |  deviation: ~' + nf(dev, 1, 2) + ' mm (shown 10×)', x + ppw / 2, y + h - 4);
}

function drawActualPath(sx, sy, sq, devPx) {
  let speed = getSpeed();
  let freq = speed / 80;  // oscillation frequency
  let nPts  = 200;

  // Top edge (left to right)
  for (let i = 0; i <= nPts; i++) {
    let t = i / nPts;
    let px2 = sx + t * sq;
    let ring = sin(t * sq * freq * 0.2) * devPx * exp(-t * 3);
    vertex(px2, sy + ring);
  }
  // Right edge (top to bottom)
  for (let i = 0; i <= nPts; i++) {
    let t = i / nPts;
    let py = sy + t * sq;
    let ring = sin(t * sq * freq * 0.2) * devPx * exp(-t * 3);
    vertex(sx + sq + ring, py);
  }
  // Bottom edge (right to left)
  for (let i = 0; i <= nPts; i++) {
    let t = i / nPts;
    let px2 = sx + sq - t * sq;
    let ring = -sin(t * sq * freq * 0.2) * devPx * exp(-t * 3);
    vertex(px2, sy + sq + ring);
  }
  // Left edge (bottom to top)
  for (let i = 0; i <= nPts; i++) {
    let t = i / nPts;
    let py = sy + sq - t * sq;
    let ring = -sin(t * sq * freq * 0.2) * devPx * exp(-t * 3);
    vertex(sx + ring, py);
  }
}

function drawStepPath(sx, sy, sq, devPx) {
  let t = stepFrame / MAX_STEP;
  let speed = getSpeed();
  let freq = speed / 80;

  // Draw completed portion of commanded path
  drawingContext.setLineDash([5, 4]);
  stroke(50, 120, 220); strokeWeight(2.5); noFill();
  // Top edge
  let topFrac = min(t * 4, 1);
  if (topFrac > 0) line(sx, sy, sx + sq * topFrac, sy);
  drawingContext.setLineDash([]);

  // Actual path portion
  stroke(220, 120, 30); strokeWeight(2.5); noFill();
  beginShape();
  let nPts = floor(topFrac * 80);
  for (let i = 0; i <= nPts; i++) {
    let tf = i / 80;
    let px2 = sx + tf * sq;
    let ring = sin(tf * sq * freq * 0.2) * devPx * exp(-tf * 3);
    vertex(px2, sy + ring);
  }
  endShape();

  // Print head position
  let headX = sx + sq * topFrac, headY = sy;
  fill(255, 60, 60); noStroke(); ellipse(headX, headY, 14, 14);
  fill(255); textAlign(CENTER, CENTER); textSize(8); text('🖊', headX, headY);

  // Annotation for pressure advance
  if (t > 0.35 && t < 0.6) {
    fill(50, 120, 210, 200); noStroke();
    rect(sx - 2, sy - 34, 120, 28, 3);
    fill(255); textAlign(LEFT, CENTER); textSize(9.5);
    text(pressureAdv ? 'PA: Reducing pressure ✓' : 'PA off: blob forming', sx + 4, sy - 20);
  }
}

function drawQualityPanel() {
  let pw = 170;
  let ppw = floor((canvasWidth - pw - 20) * 0.65);
  let qx = pw + 14 + ppw + 6, qy = 44;
  let qw = canvasWidth - qx - 6, qh = canvasHeight - 52;

  fill(252, 253, 255); stroke(195, 210, 230); strokeWeight(1);
  rect(qx, qy, qw, qh, 5);

  noStroke(); fill(40, 50, 100); textAlign(LEFT, TOP); textSize(11); textStyle(BOLD);
  text('Quality Score', qx + 8, qy + 8);
  textStyle(NORMAL);

  let speed = getSpeed();
  let score = getScore(speed);
  let scoreCol = score >= 85 ? [40, 170, 80] : score >= 60 ? [200, 160, 20] : [190, 50, 50];

  // Big score
  fill(scoreCol[0], scoreCol[1], scoreCol[2]); textAlign(CENTER, CENTER); textSize(36); textStyle(BOLD);
  text(score, qx + qw / 2, qy + 70);
  textStyle(NORMAL); textSize(11);
  text('/ 100', qx + qw / 2, qy + 100);

  // Score bar
  let bx = qx + 10, by = qy + 118, bw = qw - 20, bh = 12;
  fill(220, 225, 235); noStroke(); rect(bx, by, bw, bh, 5);
  fill(scoreCol[0], scoreCol[1], scoreCol[2]);
  rect(bx, by, bw * (score / 100), bh, 5);

  // Metrics
  let my = qy + 148;
  let ring = getRingLabel(speed);
  let corner = getCornerLabel(speed);

  drawMetric(qx + 8, my, qw - 16, 'Ringing', ring.label, ring.col);
  my += 40;
  drawMetric(qx + 8, my, qw - 16, 'Corner\nQuality', corner.label, corner.col);
  my += 50;
  drawMetric(qx + 8, my, qw - 16, 'Deviation', nf(getDeviation(speed), 1, 2) + ' mm', score >= 85 ? [40,170,80] : score >= 60 ? [200,160,20] : [190,50,50]);

  // Summary
  my += 48;
  noStroke(); fill(40); textAlign(LEFT, TOP); textSize(9.5); textStyle(ITALIC);
  let summary = inputShaping
    ? (speed > 400 ? 'Input shaping enables fast printing with only minor deviation.' : 'Good performance — input shaping compensates resonance.')
    : (speed > 200 ? 'Ringing visible — enable input shaping for speeds above 150 mm/s.' : 'Speed low enough that ringing is minimal without IS.');
  text(summary, qx + 8, my, qw - 16);
  textStyle(NORMAL);
}

function drawMetric(x, y, w, label, value, col) {
  fill(248, 252, 255); stroke(210, 220, 235); strokeWeight(1);
  rect(x, y, w, 34, 3);
  noStroke(); fill(80); textAlign(LEFT, CENTER); textSize(9.5); textStyle(BOLD);
  text(label, x + 6, y + 17);
  textStyle(NORMAL);
  fill(col[0], col[1], col[2]); textAlign(RIGHT, CENTER); textSize(11); textStyle(BOLD);
  text(value, x + w - 6, y + 17);
  textStyle(NORMAL);
}

function mousePressed() {
  let pw = 170, x = 8, y = 44;
  // Input shaping toggle
  let by = y + 158;
  if (mouseX >= x + 8 && mouseX <= x + 162 && mouseY >= by && mouseY <= by + 28) {
    inputShaping = !inputShaping; return;
  }
  by += 36;
  // Pressure advance toggle
  if (mouseX >= x + 8 && mouseX <= x + 162 && mouseY >= by && mouseY <= by + 28) {
    pressureAdv = !pressureAdv; return;
  }
  by += 48;
  // Step through button
  if (mouseX >= x + 8 && mouseX <= x + 162 && mouseY >= by && mouseY <= by + 28) {
    stepMode = !stepMode; stepFrame = 0; return;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth    = containerWidth;
}
