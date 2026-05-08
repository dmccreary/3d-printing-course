// Sketch Constraint States Explorer — 2D CAD sketch DOF transitions
// CANVAS_HEIGHT: 560
// Bloom L1-L3: identify constraint states, explain DOF removal, apply constraints

let containerWidth;
let canvasWidth  = 700;
let drawHeight   = 460;
let controlH     = 100;
let canvasHeight  = drawHeight + controlH;
let containerHeight = canvasHeight;

// L-shape profile (6 segments, closed) — local coords in px
// Wide at bottom, step going up-right (scaled for readability)
const L_PTS = [
  [  0,   0 ],
  [ 160,  0 ],
  [ 160, 68 ],
  [ 84,  68 ],
  [ 84, 158 ],
  [  0, 158 ],
];

// Constraint palette definitions
const CONSTRAINTS = [
  { name:'Fix Origin',    dof:2, col:[50,100,210],
    tip:'Anchors sketch to the origin — removes X and Y translation (−2 DOF).' },
  { name:'Horizontal',    dof:1, col:[0,140,100],
    tip:'Forces a line horizontal — removes one rotational DOF (−1 DOF).' },
  { name:'Vertical',      dof:1, col:[0,130,90],
    tip:'Forces a line vertical (−1 DOF).' },
  { name:'Perpendicular', dof:1, col:[140,55,175],
    tip:'Sets two lines at 90° — removes one angle DOF (−1 DOF).' },
  { name:'Equal',         dof:1, col:[175,120,25],
    tip:'Makes two lines equal length — removes one length DOF (−1 DOF).' },
  { name:'Add Dimension', dof:1, col:[200,80,40],
    tip:'Fixes one length or distance precisely (−1 DOF).' },
];

let dof = 7;
let appliedList = [];
let selectedConstraint = -1;
let floatAngle = 0;

let resetBtn;
const BW = 145, BH = 28;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(12);

  resetBtn = createButton('↺ Reset Sketch');
  resetBtn.style('font-size', '12px');
  resetBtn.style('padding', '5px 12px');
  resetBtn.style('background', '#e53935');
  resetBtn.style('color', 'white');
  resetBtn.style('border', 'none');
  resetBtn.style('border-radius', '4px');
  resetBtn.style('cursor', 'pointer');
  resetBtn.mousePressed(resetSketch);

  describe('Sketch Constraint States Explorer — apply constraints to fully define an L-shape', LABEL);
}

function resetSketch() {
  dof = 7;
  appliedList = [];
  selectedConstraint = -1;
}

function applyConstraint(idx) {
  if (dof <= 0 && appliedList.length >= 7) return;
  let c = CONSTRAINTS[idx];
  let removed = min(c.dof, max(0, dof));
  if (dof - c.dof < 0) removed = c.dof; // allow over-constrain
  dof = max(-2, dof - c.dof);
  appliedList.push({ name: c.name, removed: c.dof, col: c.col });
  selectedConstraint = idx;
}

// ───── draw ──────────────────────────────────────────────────────────────────

function draw() {
  updateCanvasSize();

  // Background panels
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white'); noStroke();
  rect(0, drawHeight, canvasWidth, controlH);

  floatAngle += 0.025;

  // Title
  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('Sketch Constraint States Explorer', canvasWidth / 2, 6);

  // DOF status badge
  let statusText, statusCol;
  if (dof > 0)       { statusText = 'UNDER-CONSTRAINED — ' + dof + ' degree' + (dof !== 1 ? 's' : '') + ' of freedom remaining'; statusCol = color(200, 90, 20); }
  else if (dof === 0) { statusText = '✓ FULLY CONSTRAINED — Sketch is completely defined'; statusCol = color(30, 130, 40); }
  else                { statusText = '⚠ OVER-CONSTRAINED — Remove a constraint'; statusCol = color(180, 30, 30); }

  fill(statusCol); noStroke();
  rect(canvasWidth / 2 - 230, 30, 460, 22, 4);
  fill(255); textAlign(CENTER, CENTER); textSize(11);
  text(statusText, canvasWidth / 2, 41);

  // ─ Sketch area ─
  let sketchCX = canvasWidth * 0.40;
  let sketchCY = drawHeight * 0.52;

  // Grid lines
  stroke(200, 210, 220); strokeWeight(0.5);
  for (let gx = 0; gx < canvasWidth * 0.66; gx += 20) {
    let sx = sketchCX - canvasWidth * 0.3 + gx;
    line(sx, 60, sx, drawHeight - 10);
  }
  for (let gy = 60; gy < drawHeight; gy += 20) {
    line(0, gy, canvasWidth * 0.66, gy);
  }

  // Origin cross
  stroke(180, 200, 180); strokeWeight(1);
  line(sketchCX - 15, sketchCY, sketchCX + 15, sketchCY);
  line(sketchCX, sketchCY - 15, sketchCX, sketchCY + 15);

  // Float offset when under-constrained
  let floatX = dof > 0 ? sin(floatAngle) * 6 * (dof / 7) : 0;
  let floatY = dof > 0 ? cos(floatAngle * 0.7) * 4 * (dof / 7) : 0;
  let floatRot = dof > 0 ? sin(floatAngle * 0.5) * 0.06 * (dof / 7) : 0;

  // Draw L-shape
  drawLShape(sketchCX + floatX - 80, sketchCY + floatY - 79, floatRot);

  // ─ Constraint palette (right panel) ─
  drawPalette();

  // ─ Applied constraints (bottom) ─
  drawApplied();

  // Reset button position
  resetBtn.position(10, drawHeight + 64);
}

function drawLShape(ox, oy, rot) {
  let shapeCol;
  if (dof > 0)      shapeCol = color(40, 100, 220);
  else if (dof === 0) shapeCol = color(30, 30, 30);
  else               shapeCol = color(200, 30, 30);

  push();
  translate(ox + 80, oy + 79); // pivot at shape center
  rotate(rot);
  translate(-80, -79);

  // Fill
  fill(red(shapeCol), green(shapeCol), blue(shapeCol), 22);
  stroke(shapeCol); strokeWeight(dof === 0 ? 2.5 : 2);
  beginShape();
  L_PTS.forEach(p => vertex(p[0], p[1]));
  endShape(CLOSE);

  // Dimension annotations when fully constrained
  if (dof <= 0) {
    noStroke(); fill(30, 120, 40, 200);
    textSize(10); textAlign(CENTER, CENTER);
    text('160', 80, -8);   // bottom width
    text('158', -14, 79);  // left height
    text('84', 42, 75);    // step width
    text('90', 170, 34);   // right height segment
  }

  // Constraint symbols on lines
  if (appliedList.length > 0) {
    noStroke(); fill(70, 70, 200, 180);
    textSize(9); textAlign(CENTER, CENTER);
    // Horizontal symbol on bottom edge
    if (appliedList.some(a => a.name === 'Horizontal')) text('⟷', 45, 8);
    // Vertical symbol on left edge
    if (appliedList.some(a => a.name === 'Vertical'))   text('↕', -8, 44);
    // Origin pin
    if (appliedList.some(a => a.name === 'Fix Origin'))  { fill(50,100,210,200); ellipse(0, 0, 8, 8); }
    // Perpendicular tick marks
    if (appliedList.some(a => a.name === 'Perpendicular')) {
      stroke(140,55,175,180); strokeWeight(1.5); noFill();
      rect(4, -4, 7, 7);
      rect(82, 4, 7, 7);
    }
  }
  pop();
}

function drawPalette() {
  let px = canvasWidth * 0.68;
  let py = 78;

  noStroke(); fill(60); textAlign(LEFT, TOP); textSize(12);
  text('Constraint Palette', px, py - 20);

  stroke(200); strokeWeight(1);
  line(px, py - 5, px + BW + 4, py - 5);

  noStroke(); fill(90); textSize(10);
  text('Geometric', px, py);
  py += 14;

  CONSTRAINTS.forEach((c, i) => {
    let bx = px, by = py + i * (BH + 4);
    let hov = mouseX >= bx && mouseX <= bx + BW && mouseY >= by && mouseY <= by + BH;
    let isSel = selectedConstraint === i;

    fill(c.col[0], c.col[1], c.col[2], hov ? 230 : 180);
    stroke(c.col[0], c.col[1], c.col[2]);
    strokeWeight(isSel ? 2.5 : 1);
    rect(bx, by, BW, BH, 4);

    noStroke(); fill(255);
    textAlign(LEFT, CENTER); textSize(11);
    text(c.name, bx + 8, by + BH / 2);

    noStroke(); fill(220);
    textAlign(RIGHT, CENTER); textSize(10);
    text('−' + c.dof + ' DOF', bx + BW - 5, by + BH / 2);

    // Divider before dimension
    if (i === 4) {
      noStroke(); fill(90); textAlign(LEFT, TOP); textSize(10);
      text('Dimensional', px, by + BH + 4);
      py += 18;
    }

    // Tooltip
    if (hov) {
      fill(50, 50, 60, 225);
      rect(px - 160, by - 2, 152, 44, 4);
      fill(240); textSize(9); textAlign(LEFT, TOP);
      text(c.tip, px - 156, by + 3, 145);
    }
  });
}

function drawApplied() {
  let lx = 10, ly = drawHeight + 8;
  noStroke(); fill(60); textAlign(LEFT, TOP); textSize(12);
  text('Applied Constraints:', lx, ly);

  if (appliedList.length === 0) {
    fill(150); textSize(11);
    text('None — click a constraint button to constrain the sketch.', lx, ly + 18);
  } else {
    appliedList.slice(-5).forEach((a, i) => {
      let bx = lx + i * 115;
      fill(a.col[0], a.col[1], a.col[2]); noStroke();
      rect(bx, ly + 16, 108, 16, 3);
      fill(255); textSize(9); textAlign(LEFT, CENTER);
      text(a.name + '  −' + a.removed, bx + 4, ly + 24);
    });
    if (appliedList.length > 5) {
      fill(130); textSize(10); textAlign(LEFT, TOP);
      text('+' + (appliedList.length - 5) + ' more', lx + 5 * 115, ly + 18);
    }
  }
}

// ───── interaction ────────────────────────────────────────────────────────────

function mousePressed() {
  let px = canvasWidth * 0.68;
  let py = 92;

  CONSTRAINTS.forEach((c, i) => {
    if (i === 5) py += 18; // dimensional divider offset
    let by = py + i * (BH + 4);
    if (mouseX >= px && mouseX <= px + BW && mouseY >= by && mouseY <= by + BH) {
      applyConstraint(i);
    }
  });
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
