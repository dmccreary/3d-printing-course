// FDM Motion System Explainer — stepper/belt G-code motion animation
// CANVAS_HEIGHT: 580
// Bloom L2: explain how stepper motors and belts translate G-code into movement

let containerWidth;
let canvasWidth  = 700;
let controlH     = 60;
let viewH        = 320;
let dataH        = 200;
let canvasHeight = controlH + viewH + dataH;  // = 580
let containerHeight = canvasHeight;

// Preset G-code moves: [name, targetX_mm, targetY_mm]
// Build area: 220 x 220 mm (standard FDM)
const MOVES = [
  { name: 'Short X Move',        gcode: 'G1 X50 Y0 F3000',   tx: 50,  ty: 0   },
  { name: 'Short Y Move',        gcode: 'G1 X0 Y50 F3000',   tx: 0,   ty: 50  },
  { name: 'Diagonal Move',       gcode: 'G1 X50 Y30 F3000',  tx: 50,  ty: 30  },
  { name: 'Full-Bed Traverse',   gcode: 'G1 X200 Y200 F4000', tx: 200, ty: 200 },
  { name: 'Return to Origin',    gcode: 'G1 X0 Y0 F3000',    tx: 0,   ty: 0   },
];

const MM_PER_STEP  = 0.0125;  // for 16-tooth GT2 pulley, 1/16 microstepping
const BED_MM       = 220;     // build area mm

let selectedMove = 2;  // default: diagonal
let animSpeed = 1;     // 0.5 / 1 / 2
let showSteps = true;

let headX = 0, headY = 0;  // current position mm
let animating = false;
let animProgress = 0;
let startX = 0, startY = 0;
let path = [];  // trail of positions

let moveDropdown, speedSlider, stepsToggle, resetBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  moveDropdown = createSelect();
  MOVES.forEach((m, i) => moveDropdown.option(m.name, i));
  moveDropdown.selected('2');
  moveDropdown.style('font-size', '11px');
  moveDropdown.changed(() => { selectedMove = int(moveDropdown.value()); });

  speedSlider = createSlider(1, 3, 2, 1);
  speedSlider.style('width', '80px');
  speedSlider.input(() => { animSpeed = [0.5, 1, 2][speedSlider.value() - 1]; });

  stepsToggle = createCheckbox('Show Steps', true);
  stepsToggle.style('font-size', '11px');
  stepsToggle.changed(() => { showSteps = stepsToggle.checked(); });

  resetBtn = createButton('Reset');
  resetBtn.style('font-size', '11px; padding: 3px 10px');
  resetBtn.mousePressed(() => { headX = 0; headY = 0; animating = false; animProgress = 0; path = []; });

  let runBtn = createButton('▶ Run');
  runBtn.style('background', '#2a6db5');
  runBtn.style('color', 'white');
  runBtn.style('border', 'none');
  runBtn.style('padding', '4px 12px');
  runBtn.style('border-radius', '3px');
  runBtn.style('cursor', 'pointer');
  runBtn.mousePressed(startMove);
  runBtn.id('runBtn');

  describe('FDM Motion System Explainer — select a G-code move and run it to see how stepper motors translate commands into movement', LABEL);
}

function startMove() {
  if (animating) return;
  startX = headX; startY = headY;
  animProgress = 0;
  animating = true;
}

function draw() {
  updateCanvasSize();
  background(245, 248, 253);

  // Title
  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('FDM Motion System Explainer', canvasWidth / 2, 6);

  positionControls();

  if (animating) {
    let dist_mm = dist(startX, startY, MOVES[selectedMove].tx, MOVES[selectedMove].ty);
    if (dist_mm < 0.01) dist_mm = 0.1;
    let speed_mm_per_frame = animSpeed * 2;
    animProgress = min(1, animProgress + speed_mm_per_frame / dist_mm);
    headX = lerp(startX, MOVES[selectedMove].tx, animProgress);
    headY = lerp(startY, MOVES[selectedMove].ty, animProgress);
    path.push({ x: headX, y: headY });
    if (animProgress >= 1) animating = false;
  }

  drawBuildArea();
  drawDataPanel();
  drawGcodeDisplay();
}

function positionControls() {
  let y0 = 28;
  let bx = 10;

  // G-code preset label
  noStroke(); fill(60); textSize(10); textAlign(LEFT, CENTER);
  text('Move:', bx, y0 + 10);

  moveDropdown.position(bx + 34, y0 + 2);
  speedSlider.position(bx + 230, y0 + 4);
  stepsToggle.position(bx + 320, y0 + 2);
  resetBtn.position(bx + 430, y0 + 2);

  // Speed label
  fill(60); textSize(10); textAlign(LEFT, CENTER);
  text('Speed:', bx + 184, y0 + 10);
  let speedLabels = ['Slow', 'Medium', 'Fast'];
  text(speedLabels[speedSlider.value() - 1], bx + 316, y0 + 10);

  // Position run button
  let runBtnEl = document.getElementById('runBtn');
  if (runBtnEl) {
    let mainRect = document.querySelector('main').getBoundingClientRect();
    runBtnEl.style.position = 'absolute';
    runBtnEl.style.left = (mainRect.left + canvasWidth - 70) + 'px';
    runBtnEl.style.top = (mainRect.top + y0 + 2) + 'px';
  }
}

function drawBuildArea() {
  let bx = 10, by = controlH + 10;
  let bw = floor(canvasWidth * 0.60);
  let bh = viewH - 20;

  fill(250); stroke(180); strokeWeight(1);
  rect(bx, by, bw, bh, 4);

  // Scale: px per mm
  let ppm = min((bw - 30) / BED_MM, (bh - 40) / BED_MM);
  let ox = bx + 15;  // origin x
  let oy = by + bh - 20;  // origin y (bottom-left = Y=0)

  function sx(mm) { return ox + mm * ppm; }
  function sy(mm) { return oy - mm * ppm; }

  // Grid
  stroke(220); strokeWeight(0.5);
  for (let g = 0; g <= BED_MM; g += 50) {
    line(sx(g), by + 8, sx(g), oy);
    line(ox, sy(g), ox + BED_MM * ppm, sy(g));
  }

  // Axis labels
  noStroke(); fill(80); textSize(9); textAlign(CENTER, TOP);
  for (let g = 0; g <= BED_MM; g += 50) {
    text(g, sx(g), oy + 4);
    textAlign(RIGHT, CENTER);
    text(g, ox - 3, sy(g));
    textAlign(CENTER, TOP);
  }

  // X-belt (dashed horizontal line near top of gantry)
  stroke(50, 120, 220, 180); strokeWeight(2);
  drawingContext.setLineDash([6, 3]);
  line(ox, sy(headY) - 12, ox + BED_MM * ppm, sy(headY) - 12);
  drawingContext.setLineDash([]);

  // Y-belt (dashed vertical on left, but since bed moves we show below)
  stroke(50, 120, 220, 120); strokeWeight(1.5);
  drawingContext.setLineDash([4, 3]);
  line(sx(headX), by + 8, sx(headX), oy);
  drawingContext.setLineDash([]);

  // Motion trail
  if (path.length > 1) {
    stroke(180, 100, 30, 150); strokeWeight(2); noFill();
    beginShape();
    path.forEach(p => vertex(sx(p.x), sy(p.y)));
    endShape();
  }

  // Target indicator
  let m = MOVES[selectedMove];
  stroke(100, 180, 60, 180); strokeWeight(1.5);
  drawingContext.setLineDash([3, 3]);
  line(sx(m.tx) - 8, sy(m.ty), sx(m.tx) + 8, sy(m.ty));
  line(sx(m.tx), sy(m.ty) - 8, sx(m.tx), sy(m.ty) + 8);
  drawingContext.setLineDash([]);

  // Print head (crosshair square)
  let hx = sx(headX), hy = sy(headY);
  fill(50, 50, 50); stroke(255); strokeWeight(1.5);
  rect(hx - 7, hy - 7, 14, 14, 2);
  stroke(255, 80, 80); strokeWeight(1);
  line(hx - 9, hy, hx + 9, hy);
  line(hx, hy - 9, hx, hy + 9);

  // Axis labels
  noStroke(); fill(50, 120, 220); textSize(10); textAlign(CENTER, BOTTOM);
  text('X axis →', ox + BED_MM * ppm / 2, oy + 18);
  textAlign(RIGHT, CENTER); push(); translate(ox - 16, by + bh / 2);
  rotate(-HALF_PI); text('Y axis →', 0, 0); pop();

  // Caption
  fill(50, 50, 100, 200); noStroke();
  rect(bx, by + bh - 22, bw, 22, 0, 0, 4, 4);
  fill(255); textAlign(CENTER, CENTER); textSize(9.5);
  text('Head: (' + nf(headX, 1, 1) + ', ' + nf(headY, 1, 1) + ') mm  |  ' + (animating ? '▶ Moving...' : '■ Stopped'), bx + bw / 2, by + bh - 11);
}

function drawDataPanel() {
  let sx = floor(canvasWidth * 0.62);
  let sy = controlH + 10;
  let sw = canvasWidth - sx - 8;
  let sh = viewH - 20;

  fill(255); stroke(190); strokeWeight(1);
  rect(sx, sy, sw, sh, 4);

  let m = MOVES[selectedMove];
  let dx = m.tx - headX, dy = m.ty - headY;
  let stepsX = abs(round((m.tx - startX) * animProgress / MM_PER_STEP));
  let stepsY = abs(round((m.ty - startY) * animProgress / MM_PER_STEP));

  noStroke(); fill(20, 50, 110);
  textAlign(LEFT, TOP); textSize(11);
  text('G-code Interpretation', sx + 8, sy + 8);

  let rows = [
    ['Selected Move', m.name],
    ['G-code Command', m.gcode],
    ['ΔX (remaining)', nf(dx, 1, 2) + ' mm'],
    ['ΔY (remaining)', nf(dy, 1, 2) + ' mm'],
    ['Head Position', '(' + nf(headX, 1, 1) + ', ' + nf(headY, 1, 1) + ')'],
  ];

  rows.forEach(([label, val], i) => {
    let ry = sy + 32 + i * 40;
    fill(100); textSize(9); textAlign(LEFT, TOP); noStroke();
    text(label, sx + 8, ry);
    fill(20, 50, 110); textSize(11); textAlign(LEFT, TOP);
    text(val, sx + 8, ry + 12);
  });

  if (showSteps) {
    let ry = sy + sh - 70;
    fill(230, 240, 255); stroke(180, 200, 240); strokeWeight(1);
    rect(sx + 6, ry, sw - 12, 62, 4);
    noStroke(); fill(50, 80, 160); textSize(9); textAlign(LEFT, TOP);
    text('Steps issued so far:', sx + 12, ry + 6);
    fill(40); textSize(11);
    text('X motor: ' + stepsX + ' steps', sx + 12, ry + 20);
    text('Y motor: ' + stepsY + ' steps', sx + 12, ry + 36);
    fill(100); textSize(8.5);
    text('(at ' + nf(MM_PER_STEP * 1000, 1, 1) + ' μm/step)', sx + 12, ry + 52);
  }
}

function drawGcodeDisplay() {
  let bx = 10, by = controlH + viewH;
  let bw = canvasWidth - 20;
  let bh = dataH - 10;

  fill(30, 30, 40); stroke(80); strokeWeight(1);
  rect(bx, by, bw, bh, 4);

  // G-code display (terminal style)
  let m = MOVES[selectedMove];
  let dx = m.tx - headX, dy = m.ty - headY;

  fill(80, 200, 80); textSize(10); textAlign(LEFT, TOP);
  text('; FDM Motion System — step-by-step breakdown', bx + 12, by + 10);
  fill(255, 220, 60);
  text(m.gcode, bx + 12, by + 28);
  fill(160, 200, 255);
  text('; Parsed: move X ' + nf(m.tx, 1, 1) + ' mm, Y ' + nf(m.ty, 1, 1) + ' mm at F' + (m.gcode.split('F')[1] || '3000'), bx + 12, by + 46);
  fill(200);
  text('; ΔX = ' + nf(m.tx - startX, 1, 2) + ' mm → ' + abs(round((m.tx - startX) / MM_PER_STEP)) + ' X-motor steps', bx + 12, by + 64);
  text('; ΔY = ' + nf(m.ty - startY, 1, 2) + ' mm → ' + abs(round((m.ty - startY) / MM_PER_STEP)) + ' Y-motor steps', bx + 12, by + 80);
  fill(80, 200, 80);
  text('; Each step = ' + nf(MM_PER_STEP * 1000, 1, 1) + ' μm (16-tooth GT2 pulley, 1/16 microstepping, 200 steps/rev)', bx + 12, by + 98);
  fill(255, 120, 80);
  let progress_pct = nf(animProgress * 100, 1, 1);
  text('; Progress: ' + progress_pct + '%  |  Status: ' + (animating ? 'MOVING' : (animProgress >= 1 ? 'ARRIVED' : 'READY')), bx + 12, by + 116);
  fill(140);
  text('; Click ▶ Run above to animate this move', bx + 12, by + 134);
  fill(80, 200, 80);
  text('>', bx + 12, by + 152);
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
