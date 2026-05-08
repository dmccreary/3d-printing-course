// Anisotropy Explorer — FDM Build Orientation vs. Mechanical Strength
// CANVAS_HEIGHT: 570
// Bloom L4 Analyze: examine how build orientation affects mechanical strength
// across three orientations and three load types

let containerWidth;
let canvasWidth = 700;
let drawHeight = 420;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;

// strength % by [orientation][load] — pedagogically accurate PLA approximations
const strengthData = {
  'Flat (XY)':   { 'Tensile': 90, 'Bending': 85, 'Shear': 70 },
  'On-Edge':     { 'Tensile': 75, 'Bending': 90, 'Shear': 65 },
  'Upright (Z)': { 'Tensile': 45, 'Bending': 35, 'Shear': 80 }
};

const explanations = {
  'Flat (XY)': {
    'Tensile': 'Pull runs along strong X-Y bonds between fused roads — resistance is high (~90%). Layer interfaces are not the weak link here.',
    'Bending': 'Bending stress is distributed across many fused layers. Each layer handles a slice of the load — good flexural strength (~85%).',
    'Shear':   'Shear tries to slide adjacent roads sideways. Interlayer adhesion is moderate in this direction (~70%).'
  },
  'On-Edge': {
    'Tensile': 'The tensile load pulls at an angle to layer interfaces. Moderate interface loading gives moderate strength (~75%).',
    'Bending': 'Layers align with the bending stress axis, maximizing flexural performance — the best orientation for bending loads (~90%).',
    'Shear':   'Shear runs nearly parallel to layer interfaces where adhesion is weakest. Avoid this combination in structural parts (~65%).'
  },
  'Upright (Z)': {
    'Tensile': 'Layers are pulled apart like a stack of coins. Every interface is a potential failure point — strength drops sharply (~45%).',
    'Bending': 'Bending snaps directly across layer interfaces — the weakest possible direction. Cracks initiate immediately (~35%).',
    'Shear':   'Shear runs along the length of well-bonded layer roads. Surprisingly, this direction holds up well (~80%).'
  }
};

// layer-line color per orientation
const layerColors = {
  'Flat (XY)':   [52,  120, 210],
  'On-Edge':     [40,  160,  80],
  'Upright (Z)': [220, 120,  40]
};

let orientationRadio;
let loadRadio;
let applyButton;

let animProgress = 0;
let animating   = false;
let barFlex     = 0;
let crackAlpha  = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(16);

  orientationRadio = createRadio('orientation');
  orientationRadio.option('Flat (XY)');
  orientationRadio.option('On-Edge');
  orientationRadio.option('Upright (Z)');
  orientationRadio.selected('Flat (XY)');
  orientationRadio.position(10, drawHeight + 42);
  orientationRadio.style('font-size', '14px');

  loadRadio = createRadio('load');
  loadRadio.option('Tensile');
  loadRadio.option('Bending');
  loadRadio.option('Shear');
  loadRadio.selected('Tensile');
  loadRadio.position(canvasWidth / 2, drawHeight + 42);
  loadRadio.style('font-size', '14px');

  applyButton = createButton('▶ Apply Load');
  applyButton.position(10, drawHeight + 112);
  applyButton.mousePressed(triggerAnimation);
  applyButton.style('font-size', '14px');
  applyButton.style('padding', '6px 18px');
  applyButton.style('cursor', 'pointer');

  describe('FDM Anisotropy Explorer — select build orientation and load direction to analyze relative strength', LABEL);
}

function triggerAnimation() {
  animating    = true;
  animProgress = 0;
  barFlex      = 0;
  crackAlpha   = 0;
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  let orient = orientationRadio.value() || 'Flat (XY)';
  let load   = loadRadio.value()        || 'Tensile';
  let pct    = strengthData[orient][load];
  let lc     = layerColors[orient];
  let expl   = explanations[orient][load];

  // advance animation
  if (animating) {
    animProgress = min(animProgress + 0.025, 1.0);
    if (pct < 50) {
      crackAlpha = min(crackAlpha + 18, 240);
      barFlex    = 0;
    } else {
      barFlex    = sin(animProgress * TWO_PI) * 9;
      crackAlpha = max(crackAlpha - 20, 0);
    }
    if (animProgress >= 1.0) animating = false;
  } else {
    // reset crack when combination changes
    if (pct >= 50) crackAlpha = max(crackAlpha - 12, 0);
  }

  // ── Title ──────────────────────────────────────────
  noStroke();
  fill(20, 50, 110);
  textAlign(CENTER, TOP);
  textSize(20);
  text('FDM Anisotropy Explorer', canvasWidth / 2, 10);

  // ── Test bar ───────────────────────────────────────
  drawTestBar(orient, lc, pct);

  // ── Strength gauge ────────────────────────────────
  let gaugeW = min(canvasWidth - 80, 520);
  drawGauge(pct, load, canvasWidth / 2, 268, gaugeW, 28);

  // ── Explanation ───────────────────────────────────
  noStroke();
  fill(50);
  textAlign(CENTER, TOP);
  textSize(13);
  text(expl, margin + 10, 320, canvasWidth - 2 * margin - 20);

  // ── Control labels ────────────────────────────────
  noStroke();
  fill(30);
  textAlign(LEFT, TOP);
  textSize(14);
  text('Build Orientation:', 10, drawHeight + 16);
  text('Load Direction:', canvasWidth / 2, drawHeight + 16);

  // reposition load radio dynamically on resize
  loadRadio.position(canvasWidth / 2, drawHeight + 42);
}

// ── Draw isometric test bar ───────────────────────────────────────────────
function drawTestBar(orient, lc, pct) {
  let cx = canvasWidth / 2;
  let cy = 155;
  let bw = min(220, canvasWidth * 0.34);
  let bh = 58;
  let dep = 26;

  let x0 = cx - bw / 2;
  let y0 = cy - bh / 2;

  // flex deformation for strong combinations
  let fx = barFlex;

  // right face
  fill(168, 168, 182);
  stroke(120);
  strokeWeight(1);
  quad(x0 + bw, y0 + fx * 0.5,
       x0 + bw + dep, y0 - dep,
       x0 + bw + dep, y0 - dep + bh,
       x0 + bw,       y0 + bh + fx * 0.5);

  // top face
  fill(202, 202, 214);
  quad(x0,          y0 + fx,
       x0 + bw,     y0 + fx * 0.5,
       x0 + bw + dep, y0 - dep,
       x0 + dep,    y0 - dep + fx);

  // front face
  fill(228, 228, 238);
  quad(x0,      y0 + fx,
       x0 + bw, y0 + fx * 0.5,
       x0 + bw, y0 + bh + fx * 0.5,
       x0,      y0 + bh + fx);

  // layer lines
  stroke(lc[0], lc[1], lc[2], 210);
  strokeWeight(1.5);

  if (orient === 'Flat (XY)') {
    let n = 8;
    for (let i = 1; i < n; i++) {
      let t  = i / n;
      let ly = lerp(y0 + fx, y0 + bh + fx, t);
      let ry = lerp(y0 + fx * 0.5, y0 + bh + fx * 0.5, t);
      line(x0, ly, x0 + bw, ry);
    }
  } else if (orient === 'On-Edge') {
    let n = 10;
    for (let i = 1; i < n; i++) {
      let t  = i / n;
      let lx = x0 + t * bw;
      line(lx, y0 + fx, lx, y0 + bh + fx);
    }
  } else {
    // Upright (Z): show stacking going into depth on top face
    let n = 7;
    for (let i = 1; i < n; i++) {
      let t  = i / n;
      let lx = x0 + t * bw;
      line(lx, y0 + fx, lx + dep * (1 - t), y0 - dep * (1 - t) + fx);
    }
    // also show faint vertical lines on front face to indicate Z stacking
    stroke(lc[0], lc[1], lc[2], 100);
    strokeWeight(1);
    for (let i = 1; i < n; i++) {
      let t  = i / n;
      let lx = x0 + t * bw;
      line(lx, y0 + fx, lx, y0 + bh + fx);
    }
  }

  // crack for weak combinations
  if (crackAlpha > 0) {
    let alpha = crackAlpha;
    stroke(210, 30, 30, alpha);
    strokeWeight(2.5);
    let mx = x0 + bw * 0.5;
    let my = y0 + bh * 0.44 + fx * 0.7;
    line(x0 + bw * 0.08, my + 4, mx - 10, my - 2);
    line(mx - 10, my - 2, mx + 15, my + 3);
    line(mx + 15, my + 3, x0 + bw * 0.92, my - 1);
    // secondary crack
    strokeWeight(1.5);
    stroke(210, 30, 30, alpha * 0.5);
    line(x0 + bw * 0.3, my + 9, mx, my + 4);
  }

  // orientation label below bar
  noStroke();
  fill(lc[0], lc[1], lc[2]);
  textAlign(CENTER, TOP);
  textSize(13);
  text(orient, cx, y0 + bh + abs(fx) + 12);
}

// ── Draw strength gauge ───────────────────────────────────────────────────
function drawGauge(pct, load, cx, cy, w, h) {
  let x = cx - w / 2;
  let t = pct / 100;
  let gc = lerpColor(color(210, 50, 50), color(50, 180, 60), t);

  // labels above bar
  noStroke();
  fill(40);
  textAlign(LEFT, BOTTOM);
  textSize(14);
  text('Relative Strength (' + load + ' load):', x, cy - 4);
  textAlign(RIGHT, BOTTOM);
  fill(pct < 50 ? color(180, 30, 30) : color(30, 120, 40));
  text(pct + '%', x + w, cy - 4);

  // track
  fill(215);
  noStroke();
  rect(x, cy, w, h, 5);

  // filled portion
  fill(gc);
  rect(x, cy, w * t, h, 5);

  // border
  noFill();
  stroke(160);
  strokeWeight(1);
  rect(x, cy, w, h, 5);

  // 50% marker
  stroke(80);
  strokeWeight(1);
  line(cx, cy, cx, cy + h);
  noStroke();
  fill(80);
  textAlign(CENTER, TOP);
  textSize(11);
  text('50%', cx, cy + h + 2);
}

// ── Resize ────────────────────────────────────────────────────────────────
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  loadRadio.position(canvasWidth / 2, drawHeight + 42);
  applyButton.position(10, drawHeight + 112);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth    = containerWidth;
}
