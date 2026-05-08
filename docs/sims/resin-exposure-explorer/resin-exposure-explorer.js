// Resin Exposure Setting Explorer — cure depth and bleed vs. exposure time
// CANVAS_HEIGHT: 560
// Bloom L3: demonstrate relationship between exposure time and cure depth/bleed

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 560;

let normalSlider, bottomSlider;
let showBottom = false;
let showPrintPanel = false;

const CTRL_H   = 110;  // top controls area
const VIEW_H   = 310;  // cross-section view
const STATUS_H = 110;  // status + labels

const PIXEL_W = 110;   // simulated LCD pixel column width (px)
const LAYER_T = 120;   // resin layer thickness in px (~100µm per layer)
const LAYER_T_UM = 100; // µm

const NORMAL_THRESH  = 0.4;
const BOTTOM_THRESH  = 3.0;
const CURE_SCALE     = 95;   // µm per sqrt(s) — empirical
const BLEED_SCALE    = 28;
const OPTIMAL_NORMAL_MIN = 1.5;
const OPTIMAL_NORMAL_MAX = 3.5;
const OPTIMAL_BOTTOM_MIN = 20;
const OPTIMAL_BOTTOM_MAX = 50;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Resin Exposure Explorer — adjust exposure time to see cure depth and bleed', LABEL);
  textFont('sans-serif');

  normalSlider = createSlider(5, 60, 20, 1);  // /10 → 0.5–6.0 s
  normalSlider.parent(document.querySelector('main'));
  normalSlider.style('width', '150px');

  bottomSlider = createSlider(5, 80, 30, 1);
  bottomSlider.parent(document.querySelector('main'));
  bottomSlider.style('width', '150px');
}

function getNormalExp() { return normalSlider.value() / 10; }
function getBottomExp()  { return bottomSlider.value(); }

function getCureDepthPx(exp, thresh) {
  if (exp <= thresh) return 0;
  const depthUm = CURE_SCALE * Math.sqrt(exp - thresh);
  return min((depthUm / LAYER_T_UM) * LAYER_T, LAYER_T);
}

function getBleedPx(exp, optMax) {
  const excess = max(0, exp - optMax * 0.6);
  return (BLEED_SCALE * excess / LAYER_T_UM) * LAYER_T * 0.5;
}

function draw() {
  updateCanvasSize();
  background(240, 244, 250);

  const exp     = showBottom ? getBottomExp() : getNormalExp();
  const thresh  = showBottom ? BOTTOM_THRESH  : NORMAL_THRESH;
  const optMin  = showBottom ? OPTIMAL_BOTTOM_MIN : OPTIMAL_NORMAL_MIN;
  const optMax  = showBottom ? OPTIMAL_BOTTOM_MAX : OPTIMAL_NORMAL_MAX;

  const cureDepthPx = getCureDepthPx(exp, thresh);
  const bleedPx     = getBleedPx(exp, optMax);
  const cureDepthUm = round((cureDepthPx / LAYER_T) * LAYER_T_UM);
  const bleedUm     = round((bleedPx / LAYER_T) * LAYER_T_UM);

  positionSliders();
  drawTitleAndControls();
  drawToggleButtons();

  const cx = canvasWidth / 2;
  const vy = CTRL_H + (VIEW_H - LAYER_T - 60) / 2;
  drawCrossSection(cx, vy, cureDepthPx, bleedPx, thresh, exp);
  drawAnnotations(cx, vy, cureDepthUm, bleedUm);

  drawStatusBar(exp, optMin, optMax, bleedUm);

  if (showPrintPanel) drawPrintPanel(bleedUm, cureDepthUm);
}

function positionSliders() {
  let cx = canvasWidth / 2;
  normalSlider.position(cx - 200, CTRL_H - 44);
  bottomSlider.position(cx + 50,  CTRL_H - 44);
}

function drawTitleAndControls() {
  let cx = canvasWidth / 2;
  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17); textStyle(BOLD);
  text('Resin Exposure Setting Explorer', cx, 6);
  textStyle(NORMAL);

  // Normal slider label
  fill(40); textAlign(LEFT, TOP); textSize(11);
  text('Normal Layer Exposure (s)', cx - 200, CTRL_H - 70);
  fill(showBottom ? 100 : 20, showBottom ? 100 : 80, 200);
  textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text(nf(getNormalExp(), 1, 1) + ' s', cx - 200, CTRL_H - 20);
  textStyle(NORMAL);

  // Bottom slider label
  fill(40); textAlign(LEFT, TOP); textSize(11);
  text('Bottom Exposure (s)', cx + 50, CTRL_H - 70);
  fill(showBottom ? 20 : 100, showBottom ? 80 : 100, showBottom ? 200 : 100);
  textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text(getBottomExp() + ' s', cx + 50, CTRL_H - 20);
  textStyle(NORMAL);
}

function drawToggleButtons() {
  let bw = 130, bh = 24, gap = 6;
  let startX = 14, by = 30;

  ['Normal Layer', 'Bottom Layer'].forEach((lbl, i) => {
    let bx = startX + i * (bw + gap);
    let active = (i === 1) === showBottom;
    fill(active ? color(20, 80, 200) : color(210, 218, 230));
    stroke(active ? color(10, 50, 160) : color(170, 178, 190));
    strokeWeight(1); rect(bx, by, bw, bh, 3);
    noStroke(); fill(active ? 255 : 60); textAlign(CENTER, CENTER); textSize(11);
    text(lbl, bx + bw / 2, by + bh / 2);
  });
}

function drawCrossSection(cx, vy, cureDepthPx, bleedPx, thresh, exp) {
  let pw = PIXEL_W, th = LAYER_T;
  let vx = cx - pw * 2;

  // LCD panel (wide)
  fill(50, 50, 60); noStroke();
  rect(vx, vy, pw * 4, 18, 2);
  // Active pixel column (light blue)
  fill(160, 200, 240, 200);
  rect(cx - pw / 2, vy, pw, 18);
  fill(30, 50, 80); textAlign(CENTER, CENTER); textSize(10);
  text('LCD / mask panel', cx, vy + 9);

  // UV rays
  if (exp > thresh && cureDepthPx > 0) {
    stroke(240, 230, 50, 160); strokeWeight(1.5);
    let nRays = 9;
    for (let i = 0; i <= nRays; i++) {
      let rx = (cx - pw / 2) + (pw / nRays) * i;
      let rlen = min(th * 0.55, cureDepthPx * 0.6 + 10);
      line(rx, vy + 18, rx, vy + 18 + rlen);
    }
    noStroke();
  }

  // Uncured resin layer
  fill(140, 190, 215, 150);
  rect(vx, vy + 18, pw * 4, th, 0, 0, 2, 2);

  // Cured zone
  if (cureDepthPx > 0) {
    let curedW = pw + bleedPx * 2;
    let curedX = cx - curedW / 2;
    fill(40, 145, 130, 230);
    rect(curedX, vy + 18, curedW, cureDepthPx, 0, 0, 2, 2);
    // Bleed zones (orange)
    if (bleedPx > 2) {
      fill(230, 110, 30, 170);
      rect(curedX, vy + 18, bleedPx, cureDepthPx, 2, 0, 0, 2);
      rect(cx + pw / 2, vy + 18, bleedPx, cureDepthPx, 0, 2, 2, 0);
    }
  }

  // Target pixel outline (dashed)
  drawingContext.setLineDash([5, 4]);
  stroke(50, 120, 220); strokeWeight(2); noFill();
  rect(cx - pw / 2, vy + 18, pw, th);
  drawingContext.setLineDash([]);
  noStroke();

  // FEP film
  fill(160, 148, 120);
  rect(vx, vy + 18 + th, pw * 4, 10, 0, 0, 3, 3);

  // Legend labels right side
  let lx = vx + pw * 4 + 8;
  noStroke(); textAlign(LEFT, CENTER); textSize(10.5);
  fill(40, 145, 130); text('Cured resin', lx, vy + 26);
  fill(140, 190, 215); text('Uncured resin', lx, vy + 18 + th * 0.55);
  fill(160, 148, 120); text('FEP film', lx, vy + 18 + th + 5);
  if (bleedPx > 4) { fill(200, 90, 20); text('Bleed', lx, vy + 40); }

  // Cure-depth bracket (left side)
  if (cureDepthPx > 8) {
    stroke(60); strokeWeight(1); noFill();
    let bx = vx - 18;
    let y1 = vy + 18, y2 = vy + 18 + cureDepthPx;
    line(bx, y1, bx, y2);
    line(bx - 5, y1, bx + 5, y1);
    line(bx - 5, y2, bx + 5, y2);
    noStroke(); fill(50); textAlign(RIGHT, CENTER); textSize(10);
    text('Cure\ndepth', bx - 6, (y1 + y2) / 2);
  }

  // Bleed bracket (bottom)
  if (bleedPx > 6) {
    stroke(200, 90, 20); strokeWeight(1); noFill();
    let y = vy + 18 + cureDepthPx + 6;
    let x1 = cx - pw / 2 - bleedPx, x2 = cx - pw / 2;
    line(x1, y, x2, y);
    line(x1, y - 5, x1, y + 5); line(x2, y - 5, x2, y + 5);
    noStroke(); fill(170, 70, 10); textAlign(CENTER, TOP); textSize(9.5);
    text('bleed', (x1 + x2) / 2, y + 3);
  }
}

function drawAnnotations(cx, vy, cureDepthUm, bleedUm) {
  let ay = vy + LAYER_T + 38;
  noStroke(); fill(30, 120, 110); textAlign(CENTER, TOP); textSize(13); textStyle(BOLD);
  text('Cure depth: ' + cureDepthUm + ' µm   |   Bleed: ' + bleedUm + ' µm', cx, ay);
  textStyle(NORMAL);
}

function drawStatusBar(exp, optMin, optMax, bleedUm) {
  let sy = CTRL_H + VIEW_H + 6;
  let sw = canvasWidth - 28;

  fill(255); stroke(190); strokeWeight(1);
  rect(14, sy, sw, STATUS_H - 8, 5);

  let status, bg;
  if (exp < (showBottom ? BOTTOM_THRESH : NORMAL_THRESH) + 0.2) {
    status = '✗ Under-cured'; bg = color(180, 50, 50);
  } else if (exp >= optMin && exp <= optMax && bleedUm < 12) {
    status = '✓ Optimal'; bg = color(40, 160, 80);
  } else if (exp > optMax || bleedUm >= 12) {
    status = '⚠ Over-cured'; bg = color(210, 130, 20);
  } else {
    status = '~ Marginal'; bg = color(150, 150, 40);
  }

  fill(bg); noStroke(); rect(22, sy + 10, 130, 30, 4);
  fill(255); textAlign(CENTER, CENTER); textSize(12); textStyle(BOLD);
  text(status, 22 + 65, sy + 25); textStyle(NORMAL);

  noStroke(); fill(50); textAlign(LEFT, TOP); textSize(10.5);
  let desc;
  if (exp < (showBottom ? BOTTOM_THRESH : NORMAL_THRESH) + 0.2) {
    desc = 'Layer will not cure — adhesion failure likely. Increase exposure time.';
  } else if (exp > optMax) {
    desc = 'Over-exposure: lateral bleed causes dimensional error. Bottom layer "elephant\'s foot" likely.';
  } else if (exp >= optMin) {
    desc = 'Good cure depth with minimal bleed. Solid layer adhesion expected.';
  } else {
    desc = 'Borderline — may work but marginal layer bonding is possible.';
  }
  text(desc, 160, sy + 14, sw - 300);

  // Show Print Effect button
  let bx = 14 + sw - 148, by = sy + STATUS_H - 46;
  fill(showPrintPanel ? color(20,80,180) : color(225, 232, 248));
  stroke(showPrintPanel ? color(10,50,140) : color(160,170,200));
  strokeWeight(1); rect(bx, by, 144, 26, 3);
  noStroke(); fill(showPrintPanel ? 255 : 50); textAlign(CENTER, CENTER); textSize(10.5);
  text('📐 Show Print Effect', bx + 72, by + 13);
}

function drawPrintPanel(bleedUm, cureDepthUm) {
  let px = canvasWidth - 240, py = CTRL_H + 20;
  let pw = 228, ph = 220;
  fill(255, 255, 248); stroke(140, 160, 200); strokeWeight(1.5);
  rect(px, py, pw, ph, 6);
  noStroke(); fill(30, 50, 100); textAlign(CENTER, TOP); textSize(11); textStyle(BOLD);
  text('Print Base Cross-Section', px + pw / 2, py + 8);
  textStyle(NORMAL);

  let bx = px + 30, by = py + 35;
  let cols = 5, layH = 22, fw = 26;

  for (let row = 4; row >= 0; row--) {
    let isBottom = row >= 3;
    let thisBleed = isBottom ? bleedUm * 0.4 : 0;
    for (let col = 0; col < cols; col++) {
      let lx = bx + col * (fw + 2) - thisBleed * 0.5;
      let lw = fw + thisBleed;
      fill(isBottom ? color(30, 120, 110) : color(40, 155, 140));
      stroke(20, 80, 80); strokeWeight(0.5);
      rect(lx, by + row * (layH + 2), lw, layH, 1);
    }
  }
  noStroke(); fill(80); textAlign(LEFT, TOP); textSize(9.5);
  text('← Normal layers', bx, by + 5);
  text('← Bottom layers', bx, by + 3 * (layH + 2) + 3);

  if (bleedUm > 10) {
    fill(180, 80, 10); textSize(10); textAlign(CENTER, TOP);
    text('⚠ Elephant\'s foot: ~' + bleedUm + ' µm bleed', px + pw / 2, by + 5 * (layH + 2) + 12);
  } else {
    fill(40, 130, 60); textSize(10); textAlign(CENTER, TOP);
    text('✓ Clean base — minimal bleed', px + pw / 2, by + 5 * (layH + 2) + 12);
  }
}

function mousePressed() {
  let bw = 130, bh = 24, gap = 6, by = 30;
  if (mouseY >= by && mouseY <= by + bh) {
    if (mouseX >= 14 && mouseX <= 14 + bw) { showBottom = false; }
    if (mouseX >= 14 + bw + gap && mouseX <= 14 + bw * 2 + gap) { showBottom = true; }
  }

  let sy = CTRL_H + VIEW_H + 6;
  let sw = canvasWidth - 28;
  let bx = 14 + sw - 148, bby = sy + STATUS_H - 46;
  if (mouseX >= bx && mouseX <= bx + 144 && mouseY >= bby && mouseY <= bby + 26) {
    showPrintPanel = !showPrintPanel;
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
