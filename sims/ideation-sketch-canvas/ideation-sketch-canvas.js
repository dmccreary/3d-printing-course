// Ideation Sketch Canvas — structured 6-concept ideation with timer
// CANVAS_HEIGHT: 620
// Bloom L3 Apply: generate multiple design concepts under time pressure

let containerWidth;
let canvasWidth  = 700;
let drawHeight   = 560;
let controlHeight = 60;
let canvasHeight  = drawHeight + controlHeight;
let containerHeight = canvasHeight;

const challenges = [
  {
    prompt: 'Design a phone stand that prints with NO support structures.',
    constraints: ['No overhangs > 45°', 'Stable at 60° viewing angle', 'Fits phones 60–80 mm wide', 'One-piece print']
  },
  {
    prompt: 'Design a modular desk cable organizer clipped to a table edge.',
    constraints: ['Clips without tools', 'Holds 3–5 cables', 'Cable entry/exit flexible', 'No screws or hardware']
  },
  {
    prompt: 'Design a wall-mounted hook system for a standard pegboard (25 mm holes).',
    constraints: ['Fits standard 6.35 mm peg holes', 'Holds ≥ 1 kg', 'Easy to remove/replace', 'Modular (multiple sizes)']
  },
  {
    prompt: 'Design a seed-starting tray insert for a standard 10"×20" flat.',
    constraints: ['Bio-compatible material', 'Drainage holes', 'Stackable', 'Easy seedling removal']
  },
  {
    prompt: 'Design a protective case for a Raspberry Pi 4 with ventilation.',
    constraints: ['Access to all ports', 'Ventilation slots', 'Snap-fit assembly (no hardware)', 'Camera module access optional']
  }
];

let challengeIdx = 0;
let timerSecs    = 300;  // 5 minutes
let timerRunning = false;
let timeUp       = false;
let lastMillis   = 0;

// 6 sketch cells: 2 cols × 3 rows
const COLS = 2, ROWS = 3;
let cells = [];    // each cell: array of strokes; each stroke: array of {x,y}
let activeCell = -1;
let currentStroke = null;

// Buttons
let newChallengeBtn, startTimerBtn, doneBtn, clearAllBtn;

const HEADER_H = 90;
const CELL_PAD = 8;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  canvas.elt.addEventListener('contextmenu', e => { e.preventDefault(); eraseLastStroke(); });
  textSize(13);

  // Init 6 empty cells
  for (let i = 0; i < 6; i++) cells.push([]);

  newChallengeBtn = createButton('🔀 New Challenge');
  newChallengeBtn.position(10, drawHeight + 12);
  newChallengeBtn.mousePressed(newChallenge);
  newChallengeBtn.style('font-size', '13px');
  newChallengeBtn.style('padding', '6px 12px');

  startTimerBtn = createButton('▶ Start Timer');
  startTimerBtn.position(170, drawHeight + 12);
  startTimerBtn.mousePressed(toggleTimer);
  startTimerBtn.style('font-size', '13px');
  startTimerBtn.style('padding', '6px 12px');

  clearAllBtn = createButton('🗑 Clear All');
  clearAllBtn.position(310, drawHeight + 12);
  clearAllBtn.mousePressed(clearAllCells);
  clearAllBtn.style('font-size', '13px');
  clearAllBtn.style('padding', '6px 12px');
  clearAllBtn.style('background', '#e53935');
  clearAllBtn.style('color', 'white');
  clearAllBtn.style('border', 'none');
  clearAllBtn.style('border-radius', '4px');

  describe('Ideation Sketch Canvas — freehand drawing tool for generating 6 design concepts under a 5-minute timer', LABEL);
}

function newChallenge() {
  if (cells.some(c => c.length > 0)) {
    if (!confirm('Start a new challenge? This will clear all sketches.')) return;
  }
  challengeIdx = (challengeIdx + 1) % challenges.length;
  clearAllCells();
  timerSecs = 300;
  timerRunning = false;
  timeUp = false;
  startTimerBtn.html('▶ Start Timer');
}

function clearAllCells() {
  for (let i = 0; i < 6; i++) cells[i] = [];
}

function toggleTimer() {
  if (timeUp) { timerSecs = 300; timeUp = false; }
  timerRunning = !timerRunning;
  startTimerBtn.html(timerRunning ? '⏸ Pause' : '▶ Resume');
  lastMillis = millis();
}

function eraseLastStroke() {
  let ci = getActiveCellIdx(mouseX, mouseY);
  if (ci >= 0 && cells[ci].length > 0) cells[ci].pop();
}

function cellRect(i) {
  let col = i % COLS;
  let row = Math.floor(i / COLS);
  let cw  = (canvasWidth - CELL_PAD * (COLS + 1)) / COLS;
  let ch  = (drawHeight - HEADER_H - CELL_PAD * (ROWS + 1)) / ROWS;
  let x   = CELL_PAD + col * (cw + CELL_PAD);
  let y   = HEADER_H + CELL_PAD + row * (ch + CELL_PAD);
  return { x, y, w: cw, h: ch };
}

function getActiveCellIdx(mx, my) {
  for (let i = 0; i < 6; i++) {
    let r = cellRect(i);
    if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) return i;
  }
  return -1;
}

function mousePressed() {
  activeCell = getActiveCellIdx(mouseX, mouseY);
  if (activeCell >= 0) {
    currentStroke = [{ x: mouseX, y: mouseY }];
    cells[activeCell].push(currentStroke);
  }
}

function mouseDragged() {
  if (activeCell >= 0 && currentStroke) {
    let r = cellRect(activeCell);
    let clampedX = constrain(mouseX, r.x + 1, r.x + r.w - 1);
    let clampedY = constrain(mouseY, r.y + 1, r.y + r.h - 1);
    currentStroke.push({ x: clampedX, y: clampedY });
  }
}

function mouseReleased() {
  activeCell = -1;
  currentStroke = null;
}

function draw() {
  updateCanvasSize();

  // Update timer
  if (timerRunning && !timeUp) {
    let now = millis();
    let elapsed = (now - lastMillis) / 1000;
    lastMillis = now;
    timerSecs -= elapsed;
    if (timerSecs <= 0) {
      timerSecs = 0;
      timerRunning = false;
      timeUp = true;
      startTimerBtn.html('↺ Restart');
    }
  }

  // Backgrounds
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // ── HEADER ──────────────────────────────────────────────────────────
  let ch = challenges[challengeIdx];

  // Challenge card
  fill(255, 248, 170);
  stroke(210, 180, 0);
  strokeWeight(1.5);
  rect(CELL_PAD, 6, canvasWidth - 2 * CELL_PAD - 130, 76, 6);

  noStroke();
  fill(80, 60, 0);
  textAlign(LEFT, TOP);
  textSize(11);
  text('🎯 DESIGN CHALLENGE:', CELL_PAD + 8, 12);
  textSize(13);
  fill(30);
  text(ch.prompt, CELL_PAD + 8, 26, canvasWidth - 2 * CELL_PAD - 145, 54);

  // Timer
  let mins = Math.floor(timerSecs / 60);
  let secs = Math.floor(timerSecs % 60);
  let timerStr = `${mins}:${secs.toString().padStart(2, '0')}`;
  let timerX = canvasWidth - 120;

  fill(timeUp ? color(255, 150, 0) : timerRunning ? color(40, 130, 40) : color(80));
  if (timeUp && frameCount % 30 < 15) fill(255, 80, 0); // flash
  textAlign(CENTER, CENTER);
  textSize(28);
  noStroke();
  text(timerStr, timerX + 50, 42);
  textSize(11);
  fill(100);
  text(timeUp ? "Time's up!" : timerRunning ? 'running…' : 'paused', timerX + 50, 68);

  if (timeUp) {
    fill(255, 80, 0, 60);
    noStroke();
    rect(0, 0, canvasWidth, drawHeight);
  }

  // ── SKETCH CELLS ───────────────────────────────────────────────────
  let hoveredCell = getActiveCellIdx(mouseX, mouseY);

  for (let i = 0; i < 6; i++) {
    let r = cellRect(i);

    // Cell background
    fill(hoveredCell === i ? color(240, 248, 255) : 255);
    stroke(hoveredCell === i ? color(100, 160, 220) : color(180));
    strokeWeight(hoveredCell === i ? 2 : 1);
    rect(r.x, r.y, r.w, r.h, 4);

    // Cell header
    noStroke();
    fill(hoveredCell === i ? color(60, 120, 200) : color(160));
    textAlign(LEFT, TOP);
    textSize(11);
    text('Concept #' + (i + 1), r.x + 6, r.y + 4);

    // Clear cell button on hover
    if (hoveredCell === i && cells[i].length > 0) {
      fill(230, 70, 70);
      rect(r.x + r.w - 52, r.y + 2, 50, 18, 3);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(10);
      text('clear', r.x + r.w - 27, r.y + 11);
    }

    // Draw strokes
    stroke(30, 30, 100);
    strokeWeight(1.8);
    noFill();
    for (let stroke_ of cells[i]) {
      if (stroke_.length < 2) continue;
      beginShape();
      for (let pt of stroke_) curveVertex(pt.x, pt.y);
      endShape();
    }
  }

  // ── CONSTRAINTS (bottom of draw area) ───────────────────────────────
  noStroke();
  fill(80);
  textAlign(LEFT, TOP);
  textSize(10);
  let cy2 = drawHeight - 22;
  text('Key constraints: ' + ch.constraints.join(' · '), CELL_PAD, cy2);

  // Control area buttons reposition
  newChallengeBtn.position(10, drawHeight + 12);
  startTimerBtn.position(170, drawHeight + 12);
  clearAllBtn.position(310, drawHeight + 12);
}

// Handle clear-cell click
function mouseClicked() {
  let hi = getActiveCellIdx(mouseX, mouseY);
  if (hi >= 0 && cells[hi].length > 0) {
    let r = cellRect(hi);
    if (mouseX >= r.x + r.w - 52 && mouseX <= r.x + r.w - 2 &&
        mouseY >= r.y + 2 && mouseY <= r.y + 20) {
      cells[hi] = [];
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
