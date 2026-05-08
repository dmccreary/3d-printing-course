// DfAM Rules Explorer — 6-card grid of design-for-additive-manufacturing rules
// CANVAS_HEIGHT: 620
// Bloom L2: explain key DfAM rules by examining cross-section diagrams

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 620;

let selectedCard = -1;
let showFDM = true;   // false = Resin
let quizMode = false;
let quizAnswer = null;  // null / 'yes' / 'no'

const CARDS = [
  {
    title: 'Overhang Angle',
    icon: '📐',
    diff: 'yellow',
    fdm: 'FDM can print overhangs up to ~45° without support. Beyond 45°, each new layer extends too far over empty air, causing drooping and poor surface quality.',
    resin: 'Resin printers handle overhangs up to ~60–65° due to the very thin layers and bottom-up curing, but steep overhangs still require support to prevent peel forces from delaminating the part.',
    drawFn: drawOverhangCard,
  },
  {
    title: 'Bridging',
    icon: '🌉',
    diff: 'green',
    fdm: 'FDM can bridge gaps up to ~50 mm with good part-cooling. The filament "sags" on longer bridges — use multiple small bridges or add support for spans over 50 mm.',
    resin: 'Resin bridges sag more than FDM because uncured resin provides no support during exposure. Bridges over ~20 mm typically need support.',
    drawFn: drawBridgingCard,
  },
  {
    title: 'Wall Thickness',
    icon: '📏',
    diff: 'red',
    fdm: 'Minimum recommended wall thickness for FDM is 1.2 mm (3× nozzle diameter for 0.4 mm nozzle). Walls thinner than 0.8 mm may not print at all. Walls under 1.6 mm are fragile.',
    resin: 'Resin can print walls as thin as 0.5–0.8 mm reliably. Very thin walls (< 0.4 mm) are fragile during post-processing and may curl.',
    drawFn: drawWallCard,
  },
  {
    title: 'Hole Tolerance',
    icon: '🔩',
    diff: 'yellow',
    fdm: 'FDM holes print ~0.1–0.3 mm undersized due to perimeter outlines filling inward. Add 0.1–0.2 mm to hole diameter in CAD, or drill/ream to final size. Vertical holes (printed flat) are more accurate than horizontal.',
    resin: 'Resin holes come out very close to designed dimensions but can be slightly over- or under-size due to resin expansion. Test with a calibration print for tight-tolerance fits.',
    drawFn: drawHoleCard,
  },
  {
    title: 'Self-Supporting Arch',
    icon: '🏛️',
    diff: 'green',
    fdm: 'Flat-top holes require support. Replacing them with a teardrop or diamond shape creates a self-supporting geometry that prints clean. The angled top faces stay within the 45° overhang limit.',
    resin: 'Similar principle applies. Teardrop holes are used in resin printing to prevent support stubble inside critical holes. Works for any circular aperture up to ~10 mm.',
    drawFn: drawArchCard,
  },
  {
    title: 'Support Minimization',
    icon: '🔧',
    diff: 'red',
    fdm: 'Orient parts and add chamfers (45°) or fillets to replace horizontal shelves. Support removal leaves surface marks. Every support-free design choice saves print time and improves surface quality.',
    resin: 'Resin support removal is more difficult — supports must be cut with flush cutters and leave witness marks. Minimize by orienting parts so flat faces print vertically or on a slight angle.',
    drawFn: drawSupportCard,
  },
];

const DIFF_COLORS = {
  green:  [40, 170, 80],
  yellow: [200, 160, 20],
  red:    [195, 55, 55],
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('DfAM Rules Explorer — click any card to learn FDM and resin design rules', LABEL);
  textFont('sans-serif');
}

function draw() {
  updateCanvasSize();
  background(240, 245, 252);

  noStroke(); fill(18, 48, 110);
  textAlign(CENTER, TOP); textSize(17); textStyle(BOLD);
  text('Design for Additive Manufacturing (DfAM) Rules', canvasWidth / 2, 7);
  textStyle(NORMAL);

  drawTopRow();

  if (selectedCard >= 0) {
    drawExpandedCard(selectedCard);
  } else {
    drawGrid();
  }
}

function drawTopRow() {
  // FDM/Resin toggle
  let bx = canvasWidth - 220, by = 6, bh = 24;
  ['FDM', 'Resin'].forEach((lbl, i) => {
    let bw = 70, x = bx + i * 74;
    let active = (i === 0) === showFDM;
    fill(active ? color(30, 90, 210) : color(215, 225, 245));
    stroke(active ? color(15, 60, 160) : color(155, 170, 205));
    strokeWeight(1); rect(x, by, bw, bh, 3);
    noStroke(); fill(active ? 255 : 55); textAlign(CENTER, CENTER); textSize(11);
    text(lbl, x + bw / 2, by + bh / 2);
  });
}

function drawGrid() {
  let margin = 10, cols = 3, rows = 2;
  let gw = (canvasWidth - margin * (cols + 1)) / cols;
  let gh = (canvasHeight - 44 - margin * (rows + 1)) / rows;

  CARDS.forEach((card, i) => {
    let col = i % cols, row = floor(i / cols);
    let x = margin + col * (gw + margin);
    let y = 44 + margin + row * (gh + margin);
    drawMiniCard(card, i, x, y, gw, gh);
  });
}

function drawMiniCard(card, idx, x, y, w, h) {
  let hov = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
  let dc  = DIFF_COLORS[card.diff];

  fill(hov ? color(dc[0], dc[1], dc[2], 20) : color(255, 254, 252));
  stroke(hov ? color(dc[0], dc[1], dc[2]) : color(195, 205, 220));
  strokeWeight(hov ? 2 : 1); rect(x, y, w, h, 5);

  // Header band
  fill(dc[0], dc[1], dc[2]); noStroke();
  rect(x, y, w, 32, 5, 5, 0, 0);
  fill(255); textAlign(LEFT, CENTER); textSize(12); textStyle(BOLD);
  text(card.icon + '  ' + card.title, x + 10, y + 16);
  textStyle(NORMAL);

  // Mini diagram
  card.drawFn(x + 8, y + 38, w - 16, h - 46, true, showFDM);

  if (hov) {
    noStroke(); fill(dc[0], dc[1], dc[2], 50);
    textAlign(CENTER, BOTTOM); textSize(9.5);
    text('Click to expand', x + w / 2, y + h - 3);
  }
}

function drawExpandedCard(idx) {
  let card = CARDS[idx];
  let dc = DIFF_COLORS[card.diff];
  let x = 8, y = 44, w = canvasWidth - 16, h = canvasHeight - 52;

  fill(255, 254, 252); stroke(dc[0], dc[1], dc[2]); strokeWeight(2);
  rect(x, y, w, h, 6);

  // Header
  fill(dc[0], dc[1], dc[2]); noStroke(); rect(x, y, w, 40, 6, 6, 0, 0);
  fill(255); textAlign(LEFT, CENTER); textSize(15); textStyle(BOLD);
  text(card.icon + '  ' + card.title, x + 14, y + 20);
  textStyle(NORMAL);
  // Back button
  fill(255, 255, 255, 80); noStroke(); rect(x + w - 80, y + 8, 72, 24, 3);
  fill(255); textAlign(CENTER, CENTER); textSize(11);
  text('← Back', x + w - 44, y + 20);

  // Diagram (left half)
  let diagW = w * 0.52 - 16;
  card.drawFn(x + 12, y + 50, diagW, h - 60, false, showFDM);

  // Text (right half)
  let tx = x + 12 + diagW + 16;
  let tw = w - diagW - 40;
  let desc = showFDM ? card.fdm : card.resin;
  noStroke(); fill(30); textAlign(LEFT, TOP); textSize(11.5);
  text(desc, tx, y + 54, tw);

  // Difficulty badge
  fill(dc[0], dc[1], dc[2], 30); noStroke();
  rect(tx, y + 160, tw, 30, 4);
  fill(dc[0], dc[1], dc[2]); textAlign(LEFT, CENTER); textSize(10.5); textStyle(BOLD);
  let diffLabel = { green: 'Easy to achieve', yellow: 'Moderate care needed', red: 'Requires careful planning' };
  text('Difficulty: ' + diffLabel[card.diff], tx + 8, y + 175);
  textStyle(NORMAL);
}

// ── Mini diagram draw functions ──────────────────────────────────────

function drawOverhangCard(x, y, w, h, mini, fdm) {
  let cx = x + w / 2;
  let angles = [30, 45, 60];
  let cols2 = mini ? [[40,170,80], [200,160,20], [195,55,55]] : [[40,170,80],[40,170,80],[195,55,55]];
  let maxAngle = fdm ? 45 : 60;
  let pw = mini ? w / 4 : w / 5;
  angles.forEach((ang, i) => {
    let ox = mini ? (x + pw * 0.5 + i * (w / 3)) : (x + pw * 0.5 + i * (w / 3.5));
    let oy = y + h * 0.7;
    let good = ang <= maxAngle;
    let c = good ? [40,170,80] : [195,55,55];
    fill(c[0], c[1], c[2], 200); noStroke();
    // Triangle cross-section
    let dh = h * 0.5;
    triangle(ox, oy, ox + pw, oy - dh * tan((ang * PI) / 180), ox + pw, oy);
    // Base
    fill(120); rect(ox - 4, oy, pw + 8, 5, 1);
    noStroke(); fill(good ? color(40,170,80) : color(195,55,55));
    textAlign(CENTER, BOTTOM); textSize(mini ? 8 : 10);
    text(ang + '°', ox + pw / 2, oy - 4);
  });
  if (!mini) {
    noStroke(); fill(60); textAlign(CENTER, TOP); textSize(10);
    text('Max angle: ' + maxAngle + '°', cx, y + h * 0.82);
  }
}

function drawBridgingCard(x, y, w, h, mini, fdm) {
  let maxBridge = fdm ? 50 : 20;
  let bh = h * 0.25, by = y + h * 0.35;
  let pw = w * 0.35;

  // Short bridge (good)
  let sx = x + w * 0.1;
  fill(130); noStroke(); rect(sx, by, 10, bh + 12, 1); rect(sx + pw, by, 10, bh + 12, 1);
  fill(40, 170, 80, 180); rect(sx, by, pw + 10, 8, 1);
  noStroke(); fill(40, 170, 80); textAlign(CENTER, BOTTOM); textSize(mini ? 8 : 10);
  text('✓', sx + pw / 2, by - 2);

  // Long bridge (bad for FDM)
  let lx = x + w * 0.55;
  let lw = w * 0.38;
  fill(130); noStroke(); rect(lx, by, 10, bh + 12, 1); rect(lx + lw, by, 10, bh + 12, 1);
  // Sagging line
  stroke(195, 55, 55); strokeWeight(2); noFill();
  beginShape();
  for (let t2 = 0; t2 <= 1; t2 += 0.05) {
    let xp = lx + t2 * lw + 5;
    let yp = by + sin(t2 * PI) * bh * 0.6;
    vertex(xp, yp);
  }
  endShape();
  noStroke(); fill(195, 55, 55); textAlign(CENTER, BOTTOM); textSize(mini ? 8 : 10);
  text('sag', lx + lw / 2, by + bh * 0.5);
  fill(60); textAlign(CENTER, TOP); textSize(mini ? 7.5 : 9.5);
  text('> ' + maxBridge + 'mm', lx + lw / 2, by + bh + 16);
}

function drawWallCard(x, y, w, h, mini, fdm) {
  let thicknesses = fdm ? [0.4, 0.8, 1.2, 2.0] : [0.3, 0.5, 0.8, 1.6];
  let cols3 = [[195,55,55], [200,160,20], [40,170,80], [40,170,80]];
  let ww = (w - 10) / thicknesses.length - 4;
  let wallH = h * 0.55;
  thicknesses.forEach((t2, i) => {
    let wx = x + 6 + i * (ww + 4);
    let wy = y + h * 0.12;
    let scaledW = max(3, t2 * (mini ? 14 : 20));
    fill(cols3[i][0], cols3[i][1], cols3[i][2], 200); noStroke();
    rect(wx + (ww - scaledW) / 2, wy, scaledW, wallH, 2);
    fill(60); textAlign(CENTER, TOP); textSize(mini ? 7.5 : 9);
    text(t2 + 'mm', wx + ww / 2, wy + wallH + 3);
  });
  if (!mini) {
    let minW = fdm ? 1.2 : 0.5;
    noStroke(); fill(60); textAlign(CENTER, TOP); textSize(10);
    text('Min recommended: ' + minW + ' mm', x + w / 2, y + h * 0.85);
  }
}

function drawHoleCard(x, y, w, h, mini, fdm) {
  let cx = x + w / 2, cy = y + h * 0.5;
  let r = mini ? h * 0.28 : h * 0.32;
  let offset = fdm ? 0.15 : 0.08;

  // Designed (dashed blue)
  drawingContext.setLineDash([4, 3]);
  stroke(50, 120, 220); strokeWeight(1.5); noFill();
  ellipse(cx, cy, r * 2, r * 2);
  drawingContext.setLineDash([]);

  // Actual (solid, slightly smaller for FDM)
  let shrink = mini ? 4 : 8;
  fill(200, 120, 50, 120); stroke(180, 80, 20); strokeWeight(1.5);
  ellipse(cx, cy, (r - shrink) * 2, (r - shrink) * 2);
  noStroke();

  fill(50, 120, 220); textAlign(CENTER, BOTTOM); textSize(mini ? 8 : 10);
  text('Design', cx, cy - r - 3);
  fill(180, 80, 20); textAlign(CENTER, TOP); textSize(mini ? 8 : 10);
  text('Actual', cx, cy + (r - shrink) + 3);

  if (!mini) {
    fill(60); textAlign(CENTER, TOP); textSize(10.5);
    text((fdm ? 'FDM: −0.1 to −0.3 mm offset' : 'Resin: ±0.05 mm typical'), cx, cy + r + 20);
  }
}

function drawArchCard(x, y, w, h, mini, fdm) {
  let cx = x + w / 2, by = y + h * 0.68;
  let hr = mini ? h * 0.22 : h * 0.28;

  // Bad: flat-top hole (left)
  let lx = x + w * 0.14;
  fill(150); noStroke(); rect(lx - hr * 0.8, by - hr, hr * 1.6, hr + hr * 0.2, 2);
  fill(240, 244, 252); noStroke(); rect(lx - hr * 0.6, by - hr, hr * 1.2, hr, 0);
  stroke(195, 55, 55); strokeWeight(1.5);
  drawingContext.setLineDash([3, 3]);
  rect(lx - hr * 0.6, by - hr, hr * 1.2, hr * 0.5);
  drawingContext.setLineDash([]);
  noStroke(); fill(195, 55, 55); textAlign(CENTER, BOTTOM); textSize(mini ? 8 : 10);
  text('✗ flat', lx, by - hr - 3);

  // Good: teardrop (right)
  let rx = x + w * 0.70;
  fill(150); noStroke(); rect(rx - hr * 0.8, by - hr, hr * 1.6, hr + hr * 0.2, 2);
  fill(240, 244, 252); noStroke();
  arc(rx, by - hr * 0.2, hr * 1.2, hr * 1.2, PI, TWO_PI);
  // Teardrop point
  triangle(rx - hr * 0.1, by - hr * 0.8, rx + hr * 0.1, by - hr * 0.8, rx, by - hr * 1.15);
  stroke(40, 170, 80); strokeWeight(1.5); noFill();
  arc(rx, by - hr * 0.2, hr * 1.2, hr * 1.2, PI, TWO_PI);
  triangle(rx - hr * 0.1, by - hr * 0.8, rx + hr * 0.1, by - hr * 0.8, rx, by - hr * 1.15);
  noStroke(); fill(40, 170, 80); textAlign(CENTER, BOTTOM); textSize(mini ? 8 : 10);
  text('✓ teardrop', rx, by - hr * 1.2 - 3);
}

function drawSupportCard(x, y, w, h, mini, fdm) {
  let cx = x + w / 2;

  // Bad: horizontal shelf (left)
  let lx = x + w * 0.12, ly = y + h * 0.72;
  let sw2 = w * 0.28, sh = h * 0.32;
  fill(150); noStroke();
  rect(lx, ly - sh, sw2 * 0.5, sh, 1);       // vertical post
  rect(lx, ly - sh, sw2, 10, 1);              // horizontal shelf
  stroke(195, 55, 55); strokeWeight(1.5);
  drawingContext.setLineDash([3, 3]);
  rect(lx + sw2 * 0.5, ly - sh + 10, sw2 * 0.5, sh - 10);  // support needed
  drawingContext.setLineDash([]);
  noStroke(); fill(195, 55, 55); textSize(mini ? 8 : 9.5); textAlign(CENTER, BOTTOM);
  text('✗ shelf', lx + sw2 / 2, ly - sh - 3);

  // Good: chamfered (right)
  let rx = x + w * 0.56, ry = y + h * 0.72;
  fill(150); noStroke();
  rect(rx, ry - h * 0.32, w * 0.28 * 0.5, h * 0.32, 1);    // post
  // Chamfered top
  fill(40, 170, 80, 200);
  beginShape();
  vertex(rx, ry - h * 0.32);
  vertex(rx + w * 0.28 * 0.5, ry - h * 0.32);
  vertex(rx + w * 0.28, ry - h * 0.32 + h * 0.18);
  vertex(rx + w * 0.28, ry);
  vertex(rx, ry);
  endShape(CLOSE);
  noStroke(); fill(40, 170, 80); textSize(mini ? 8 : 9.5); textAlign(CENTER, BOTTOM);
  text('✓ chamfer', rx + w * 0.14, ry - h * 0.32 - 3);
}

function mousePressed() {
  // FDM/Resin toggle
  let bx = canvasWidth - 220, by = 6, bh = 24;
  if (mouseY >= by && mouseY <= by + bh) {
    if (mouseX >= bx && mouseX <= bx + 70) { showFDM = true; return; }
    if (mouseX >= bx + 74 && mouseX <= bx + 144) { showFDM = false; return; }
  }

  if (selectedCard >= 0) {
    // Back button
    let x = 8, y = 44, w = canvasWidth - 16;
    if (mouseX >= x + w - 80 && mouseX <= x + w - 8 && mouseY >= y + 8 && mouseY <= y + 32) {
      selectedCard = -1; return;
    }
    return;
  }

  // Grid card clicks
  let margin = 10, cols = 3, rows = 2;
  let gw = (canvasWidth - margin * (cols + 1)) / cols;
  let gh = (canvasHeight - 44 - margin * (rows + 1)) / rows;
  CARDS.forEach((_, i) => {
    let col = i % cols, row = floor(i / cols);
    let cx2 = margin + col * (gw + margin);
    let cy2 = 44 + margin + row * (gh + margin);
    if (mouseX >= cx2 && mouseX <= cx2 + gw && mouseY >= cy2 && mouseY <= cy2 + gh) {
      selectedCard = i;
    }
  });
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
