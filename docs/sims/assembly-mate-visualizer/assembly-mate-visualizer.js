// Assembly Mate Visualizer — DOF constraints in CAD assembly
// CANVAS_HEIGHT: 560
// Bloom L1-L4: identify mate types, explain DOF removal, analyze full constraint

let containerWidth;
let canvasWidth  = 700;
let drawHeight   = 400;
let controlHeight = 160;
let canvasHeight  = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Mate definitions: name, DOF removed, color, description, tip
const MATES = [
  { name: 'Coincident', dof: 3, col: [30, 120, 200],
    desc: 'Aligns two faces/planes to be coplanar — removes 1 translation + 2 rotations (3 DOF).',
    tip: 'Makes two flat faces touch and be flush.'
  },
  { name: 'Concentric', dof: 2, col: [0, 140, 100],
    desc: 'Aligns two cylindrical/conical axes — removes 2 translations (2 DOF).',
    tip: 'Like inserting a bolt through a hole — it can still slide along the axis.'
  },
  { name: 'Distance',   dof: 1, col: [200, 100, 20],
    desc: 'Sets a specified gap between two faces — removes 1 translation (1 DOF).',
    tip: 'Sets a precise offset between surfaces.'
  },
  { name: 'Angle',      dof: 1, col: [150, 30, 180],
    desc: 'Sets a specified angle between two faces — removes 1 rotation (1 DOF).',
    tip: 'Fixes the rotational relationship while leaving distance free.'
  },
  { name: 'Parallel',   dof: 2, col: [50, 160, 60],
    desc: 'Keeps two faces parallel (same normal direction) — removes 2 rotations (2 DOF).',
    tip: 'The faces stay parallel but can translate freely.'
  },
  { name: 'Fixed',      dof: 6, col: [180, 40, 40],
    desc: 'Locks a part completely in place — removes all 6 DOF instantly.',
    tip: 'Used to "ground" one part. Using Fixed on a second part usually over-constrains.'
  }
];

let appliedMates = [];
let dof          = 6;
let selectedMate = -1;

// Movable part position (interpolated)
let partOffsetX  = 160;  // start: floating right
let partOffsetY  = -60;
let targetOffsetX = 0;
let targetOffsetY = 0;

let resetBtn;
const MATE_BTN_W = 130, MATE_BTN_H = 28;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(13);

  resetBtn = createButton('↺ Reset Assembly');
  resetBtn.style('font-size', '13px');
  resetBtn.style('padding', '6px 14px');
  resetBtn.style('background', '#e53935');
  resetBtn.style('color', 'white');
  resetBtn.style('border', 'none');
  resetBtn.style('border-radius', '4px');
  resetBtn.style('cursor', 'pointer');
  resetBtn.mousePressed(resetAssembly);
  resetBtn.position(10, drawHeight + 128);

  describe('Assembly Mate Visualizer — click mate buttons to constrain parts and watch DOF decrease to zero', LABEL);
}

function resetAssembly() {
  appliedMates = [];
  dof          = 6;
  selectedMate = -1;
  partOffsetX  = 160;
  partOffsetY  = -60;
  targetOffsetX = 0;
  targetOffsetY = 0;
}

function applyMate(mateIdx) {
  if (dof <= 0) return;
  let mate = MATES[mateIdx];
  let actual = min(mate.dof, dof);
  dof = max(0, dof - actual);
  appliedMates.push({ name: mate.name, dof: actual, col: mate.col });
  selectedMate = mateIdx;

  // Smoothly move the part toward target
  let progress = 1 - dof / 6;
  targetOffsetX = lerp(160, 0, progress);
  targetOffsetY = lerp(-60, 0, progress);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Animate part position
  partOffsetX = lerp(partOffsetX, targetOffsetX, 0.12);
  partOffsetY = lerp(partOffsetY, targetOffsetY, 0.12);

  // Title
  noStroke();
  fill(20, 50, 110);
  textAlign(CENTER, TOP);
  textSize(17);
  text('Assembly Mate Visualizer', canvasWidth / 2, 6);

  // DOF counter
  let dofColor = dof === 0 ? color(30, 120, 40) : dof > 6 ? color(180, 30, 30) : color(200, 80, 20);
  noStroke();
  fill(dofColor);
  textAlign(CENTER, TOP);
  textSize(15);
  text('Degrees of Freedom Remaining: ' + dof, canvasWidth / 2, 28);

  // Status badge
  let panelW = canvasWidth - 30;
  let statusText, statusCol;
  if (dof > 0)       { statusText = 'UNDER-CONSTRAINED — Part can still move';   statusCol = color(200, 100, 20); }
  else if (dof === 0) { statusText = '✓ FULLY CONSTRAINED — Part is locked in place'; statusCol = color(30, 120, 40); }
  else                { statusText = '⚠ OVER-CONSTRAINED — Redundant constraint'; statusCol = color(180, 30, 30); }

  fill(statusCol); noStroke();
  rect(canvasWidth / 2 - 200, 48, 400, 22, 4);
  fill(255); textAlign(CENTER, CENTER); textSize(11);
  text(statusText, canvasWidth / 2, 59);

  // Draw the 3D assembly
  let cx = canvasWidth * 0.28;
  let cy = drawHeight * 0.52;
  drawIsometricAssembly(cx, cy);

  // Mate palette (right side)
  drawMatePalette();

  // Applied mates list
  drawAppliedMates();

  // Reposition reset button
  resetBtn.position(10, drawHeight + 128);
}

function drawIsometricAssembly(cx, cy) {
  // Fixed base block (gray, grounded)
  drawIsoBlock(cx - 40, cy + 20, 100, 60, 40, color(160, 160, 170), 'Base Part\n(Fixed)');

  // Movable block (blue)
  let mx = cx + partOffsetX - 10;
  let my = cy + partOffsetY - 20;
  drawIsoBlock(mx, my, 80, 48, 32, color(60, 120, 200), 'Movable Part');

  // DOF arrows when not constrained
  if (dof > 0) {
    let pct = dof / 6;
    let alpha = pct * 200;
    stroke(200, 80, 20, alpha);
    strokeWeight(1.5);
    let ax = mx + 40, ay = my - 24;
    // Translation arrows
    drawArrow(ax, ay, ax + 20 * pct, ay, color(200, 80, 20, alpha));
    drawArrow(ax, ay, ax, ay - 16 * pct, color(200, 80, 20, alpha));
    drawArrow(ax, ay, ax - 12 * pct, ay + 8 * pct, color(200, 80, 20, alpha));
  }

  // Constraint lines when mates are applied
  if (appliedMates.length > 0) {
    stroke(selectedMate >= 0 ? color(MATES[selectedMate].col[0], MATES[selectedMate].col[1], MATES[selectedMate].col[2], 100) : color(100, 100, 200, 80));
    strokeWeight(1.5);
    setLineDash([4, 4]);
    line(cx + 20, cy + 20, mx + 40, my + 48);
    setLineDash([]);
  }
}

function drawIsoBlock(x, y, w, h, d, col, label) {
  // Isometric box: front, top, right faces
  let dX = d * 0.6, dY = d * 0.35;

  // Front face
  fill(col);
  stroke(80); strokeWeight(1);
  quad(x, y, x + w, y, x + w, y + h, x, y + h);

  // Top face
  fill(red(col) * 1.15, green(col) * 1.15, blue(col) * 1.15);
  quad(x, y, x + dX, y - dY, x + w + dX, y - dY, x + w, y);

  // Right face
  fill(red(col) * 0.75, green(col) * 0.75, blue(col) * 0.75);
  quad(x + w, y, x + w + dX, y - dY, x + w + dX, y + h - dY, x + w, y + h);

  // Label
  noStroke(); fill(255);
  textAlign(CENTER, CENTER); textSize(10);
  text(label, x + w / 2, y + h / 2);
}

function drawArrow(x1, y1, x2, y2, col_) {
  stroke(col_); strokeWeight(1.5);
  line(x1, y1, x2, y2);
  let ang = atan2(y2 - y1, x2 - x1);
  fill(col_); noStroke();
  triangle(x2, y2,
    x2 - cos(ang - 0.4) * 6, y2 - sin(ang - 0.4) * 6,
    x2 - cos(ang + 0.4) * 6, y2 - sin(ang + 0.4) * 6);
}

function drawMatePalette() {
  let px = canvasWidth * 0.62;
  let py = 96;

  noStroke(); fill(80);
  textAlign(LEFT, TOP); textSize(12);
  text('Mate Palette — click to apply:', px, py - 18);

  MATES.forEach((m, i) => {
    let bx = px;
    let by = py + i * 34;
    let hov = (mouseX >= bx && mouseX <= bx + MATE_BTN_W &&
               mouseY >= by && mouseY <= by + MATE_BTN_H);

    fill(m.col[0], m.col[1], m.col[2], hov ? 230 : 180);
    stroke(m.col[0], m.col[1], m.col[2]);
    strokeWeight(selectedMate === i ? 2.5 : 1);
    rect(bx, by, MATE_BTN_W, MATE_BTN_H, 4);

    noStroke(); fill(255);
    textAlign(LEFT, CENTER); textSize(12);
    text(m.name, bx + 8, by + MATE_BTN_H / 2);

    noStroke(); fill(200);
    textAlign(RIGHT, CENTER); textSize(10);
    text('−' + m.dof + ' DOF', bx + MATE_BTN_W - 5, by + MATE_BTN_H / 2);

    // Tooltip
    if (hov) {
      fill(50, 50, 60, 220);
      rect(px - 140, by - 4, 135, 42, 4);
      fill(240); textSize(9.5); textAlign(LEFT, TOP);
      text(m.tip, px - 136, by + 2, 128);
    }
  });
}

function drawAppliedMates() {
  let lx = 10;
  let ly = drawHeight + 8;
  let lw = min(canvasWidth * 0.55, 350);

  noStroke(); fill(60);
  textAlign(LEFT, TOP); textSize(12);
  text('Applied Mates:', lx, ly);

  if (appliedMates.length === 0) {
    fill(150); textSize(11);
    text('None — click a mate button above to constrain the assembly.', lx, ly + 18);
  } else {
    appliedMates.slice(-4).forEach((m, i) => {
      let y = ly + 18 + i * 20;
      fill(m.col[0], m.col[1], m.col[2]);
      rect(lx, y, 80, 16, 3);
      fill(255); textSize(10); textAlign(LEFT, CENTER);
      text(m.name, lx + 5, y + 8);
      fill(60); textAlign(LEFT, TOP); textSize(10);
      text('(removed ' + m.dof + ' DOF)', lx + 85, y + 3);
    });
    if (appliedMates.length > 4) {
      fill(130); textSize(10);
      text('+ ' + (appliedMates.length - 4) + ' more', lx, ly + 18 + 4 * 20);
    }
  }
}

function mousePressed() {
  let px = canvasWidth * 0.62;
  let py = 96;
  for (let i = 0; i < MATES.length; i++) {
    let bx = px, by = py + i * 34;
    if (mouseX >= bx && mouseX <= bx + MATE_BTN_W && mouseY >= by && mouseY <= by + MATE_BTN_H) {
      applyMate(i);
      return;
    }
  }
}

function setLineDash(list) { drawingContext.setLineDash(list); }

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
