// Resin Process Comparison — SLA vs DLP vs MSLA side-by-side diagrams
// CANVAS_HEIGHT: 600
// Bloom L4: compare UV light delivery methods and trade-offs across resin technologies

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 600;

let selectedTech = -1;
let animating    = false;
let animFrame    = 0;
let showCompare  = false;

const TECHS = [
  {
    name: 'SLA',
    subtitle: 'Stereolithography',
    lightSource: 'UV Laser',
    maskType: 'Galvanometer mirrors',
    resolution: '25–100 µm XY',
    layerTime: '~5–30 s (tracing)',
    cost: '$$$',
    bestFor: 'Jewelry, dental, fine detail',
    col: [50, 140, 220],
    desc: 'A UV laser dot is steered by galvanometer mirrors to trace each layer pattern point-by-point. High precision — but speed is limited to how fast the laser can trace the full cross-section.',
    pros: ['Highest XY resolution', 'Smooth surface finish', 'No pixel grid artifacts'],
    cons: ['Slow for large cross-sections', 'Most expensive', 'Galvo maintenance needed'],
  },
  {
    name: 'DLP',
    subtitle: 'Digital Light Processing',
    lightSource: 'UV Projector',
    maskType: 'DMD chip (micro-mirrors)',
    resolution: '35–100 µm XY',
    layerTime: '~1–5 s per layer',
    cost: '$$',
    bestFor: 'Dental, engineering parts',
    col: [200, 130, 30],
    desc: 'A UV projector flashes an entire layer at once using a digital micromirror device (DMD). Each layer cures in one exposure, making it much faster than SLA for large parts.',
    pros: ['Fast whole-layer exposure', 'Good resolution', 'Widely available'],
    cons: ['Pixel artifacts at low res', 'Fixed build volume', 'Edge distortion possible'],
  },
  {
    name: 'MSLA',
    subtitle: 'Masked SLA (LCD)',
    lightSource: 'UV LED array',
    maskType: 'LCD panel',
    resolution: '22–50 µm XY (4K/8K)',
    layerTime: '~1–4 s per layer',
    cost: '$',
    bestFor: 'Hobbyist, miniatures, consumer',
    col: [60, 165, 75],
    desc: 'A UV LED array shines through an LCD panel that masks pixels on or off. Modern 4K/8K panels deliver very high resolution at low cost. The LCD wears out (~2000 hrs) but is cheap to replace.',
    pros: ['Lowest cost', 'Very high res (4K/8K)', 'Consumer-grade machines'],
    cons: ['LCD panel degrades over time', 'Lower light efficiency', 'Panel replacement needed'],
  },
];

const SPEC_ROWS = ['Light Source', 'Masking', 'XY Resolution', 'Layer Time', 'Cost', 'Best For'];

let colW, colH, colY0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Resin Process Comparison — click SLA, DLP, or MSLA to compare technologies', LABEL);
  textFont('sans-serif');
}

function computeLayout() {
  let detW  = (selectedTech >= 0) ? min(230, canvasWidth * 0.28) : 0;
  let avail = canvasWidth - detW - (detW > 0 ? 6 : 0);
  colW  = floor(avail / 3) - 8;
  colY0 = 50;
  colH  = canvasHeight - colY0 - 6;
}

function draw() {
  updateCanvasSize();
  computeLayout();
  background(238, 243, 252);

  let detW = (selectedTech >= 0) ? min(230, canvasWidth * 0.28) : 0;
  let detX = canvasWidth - detW - (detW > 0 ? 2 : 0);

  // Title row
  noStroke(); fill(18, 48, 110);
  textAlign(LEFT, TOP); textSize(17); textStyle(BOLD);
  text('Resin Process Comparison: SLA · DLP · MSLA', 8, 8);
  textStyle(NORMAL);

  // Animate button (top right of diagram area)
  drawAnimBtn(detX);

  // Three columns
  TECHS.forEach((t, i) => {
    let x = 4 + i * (colW + 8) + 4;
    drawTechColumn(t, i, x, colY0, colW, colH);
  });

  if (animating) {
    animFrame++;
    if (animFrame > 240) { animating = false; animFrame = 0; }
  }

  // Detail panel
  if (selectedTech >= 0) drawDetailPanel(detX, detW);

  // Compare table overlay
  if (showCompare) drawCompareTable();
}

function drawAnimBtn(detX) {
  let bw = 150, bh = 24, bx = detX - bw - 6, by = 10;
  fill(animating ? color(20,100,200) : color(215, 225, 245));
  stroke(animating ? color(10,70,160) : color(155,170,200));
  strokeWeight(1); rect(bx, by, bw, bh, 3);
  noStroke(); fill(animating ? 255 : 50);
  textAlign(CENTER, CENTER); textSize(11);
  text(animating ? '⏹ Stop Animation' : '▶ Animate Layer', bx + bw / 2, by + bh / 2);
}

function drawTechColumn(t, idx, x, y, w, h) {
  let isSel = selectedTech === idx;
  let hov   = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

  fill(isSel ? color(t.col[0], t.col[1], t.col[2], 28) : color(255, 255, 252));
  stroke(isSel ? color(t.col[0], t.col[1], t.col[2]) : hov ? color(140, 160, 195) : color(195, 205, 220));
  strokeWeight(isSel ? 2 : 1); rect(x, y, w, h, 5);

  // Header
  fill(t.col[0], t.col[1], t.col[2]); noStroke();
  rect(x, y, w, 40, 5, 5, 0, 0);
  fill(255); textAlign(CENTER, CENTER); textSize(14); textStyle(BOLD);
  text(t.name, x + w / 2, y + 14);
  textStyle(NORMAL); textSize(9.5);
  text(t.subtitle, x + w / 2, y + 29);

  drawTechDiagram(t, idx, x + 6, y + 46, w - 12, h - 52);

  if (hov && !isSel) {
    noStroke(); fill(t.col[0], t.col[1], t.col[2], 50);
    textAlign(CENTER, BOTTOM); textSize(9.5);
    text('Click for details', x + w / 2, y + h - 3);
  }
}

function drawTechDiagram(t, idx, x, y, w, h) {
  let cx = x + w / 2;
  let partW  = w * 0.55, partH = h * 0.15;
  let vatH   = h * 0.22;
  let srcH   = h * 0.12;
  let gapPx  = 6;

  // Sections from top down: platform → part → vat → FEP → light source

  // Build platform
  fill(120, 125, 140); noStroke();
  rect(x + (w - partW - 20) / 2, y, partW + 20, 14, 2);
  fill(200); textAlign(CENTER, CENTER); textSize(8.5);
  text('Build Platform', cx, y + 7);

  // Cured part (hangs from platform, printed bottom-up)
  let partY = y + 14;
  fill(t.col[0], t.col[1], t.col[2], 210);
  rect(cx - partW / 2, partY, partW, partH, 0, 0, 2, 2);
  stroke(t.col[0] * 0.6, t.col[1] * 0.6, t.col[2] * 0.6, 130); strokeWeight(0.5);
  let nLines = 4;
  for (let i = 1; i < nLines; i++) {
    line(cx - partW / 2, partY + i * (partH / nLines), cx + partW / 2, partY + i * (partH / nLines));
  }
  noStroke();

  // Resin vat (uncured resin)
  let vatY = partY + partH + gapPx;
  fill(155, 195, 220, 120);
  rect(x + 4, vatY, w - 8, vatH, 0, 0, 2, 2);

  // Current curing layer at bottom of vat
  let layerGlow = animating ? (80 + 100 * abs(sin(animFrame * 0.1))) : 70;
  fill(t.col[0], t.col[1], t.col[2], layerGlow);
  rect(cx - partW * 0.45, vatY + vatH - 10, partW * 0.9, 10, 0, 0, 2, 2);

  // FEP film
  fill(195, 185, 160); noStroke();
  rect(x + 4, vatY + vatH, w - 8, 7);
  fill(80); textAlign(CENTER, CENTER); textSize(8);
  text('FEP', x + 4 + (w - 8) * 0.85, vatY + vatH + 3.5);

  // Light source section
  let lsY = vatY + vatH + 10;
  let lsH  = y + h - lsY;
  drawLightSource(t, idx, x, lsY, w, lsH, cx);
}

function drawLightSource(t, idx, x, y, w, h, cx) {
  if (idx === 0) {
    // SLA: mirrors + laser
    let my = y + h * 0.3;
    push();
    translate(cx - 12, my); rotate(-0.35);
    fill(190, 185, 220); noStroke(); rect(-5, -14, 10, 28, 1);
    pop();
    push();
    translate(cx + 12, my - 4); rotate(0.35);
    fill(190, 185, 220); noStroke(); rect(-5, -14, 10, 28, 1);
    pop();
    noStroke(); fill(80); textAlign(CENTER, CENTER); textSize(8.5);
    text('Galvo mirrors', cx, my + 20);

    fill(220, 55, 55); noStroke();
    ellipse(cx, y + h * 0.75, 36, 16);
    fill(255); textAlign(CENTER, CENTER); textSize(8.5); text('UV Laser', cx, y + h * 0.75);

    if (animating) {
      let laserX = x + 8 + ((animFrame % 80) / 80) * (w - 16);
      let vatTop = y - 25;
      stroke(80, 200, 255, 200); strokeWeight(2);
      line(cx, y + h * 0.3 - 14, laserX, vatTop);
      fill(80, 200, 255, 230); noStroke(); ellipse(laserX, vatTop, 6, 6);
    }

  } else if (idx === 1) {
    // DLP: projector + cone
    let py = y + h * 0.45;
    fill(55, 55, 75); noStroke(); rect(cx - 22, py, 44, 22, 3);
    fill(255); textAlign(CENTER, CENTER); textSize(8.5); text('Projector', cx, py + 11);
    fill(200, 165, 45); textSize(8); text('DMD chip', cx, py + 28);

    let alpha = animating ? (50 + 120 * abs(sin(animFrame * 0.08))) : 50;
    fill(240, 200, 50, alpha); noStroke();
    let vatTop = y - 25;
    quad(cx - 10, py, cx + 10, py, cx + 32, vatTop, cx - 32, vatTop);

  } else {
    // MSLA: LCD + LED array
    let lcdY = y + 8;
    fill(175, 195, 235, 180); noStroke(); rect(x + 5, lcdY, w - 10, 16, 2);
    fill(40, 60, 140); textAlign(CENTER, CENTER); textSize(8.5);
    text('LCD panel (mask)', cx, lcdY + 8);

    if (animating) {
      let pxW = (w - 10) / 9;
      for (let i = 0; i < 9; i++) {
        let on = (i % 3 !== 0);
        fill(on ? color(90, 210, 90, 200) : color(40, 50, 60, 220));
        noStroke(); rect(x + 5 + i * pxW, lcdY, pxW - 1, 16);
      }
    }

    let ledY = y + h * 0.65;
    fill(70, 70, 80); noStroke(); rect(x + 5, ledY, w - 10, 12, 2);
    fill(255, 215, 50);
    let nLeds = floor((w - 20) / 14);
    for (let i = 0; i < nLeds; i++) ellipse(x + 12 + i * 14, ledY + 6, 9, 9);
    fill(75); textAlign(CENTER, TOP); textSize(8.5); text('UV LED array', cx, ledY + 14);
  }
}

function drawDetailPanel(detX, detW) {
  fill(255, 254, 250); stroke(185, 200, 225); strokeWeight(1);
  rect(detX, 0, detW, canvasHeight);

  let t = TECHS[selectedTech];

  fill(t.col[0], t.col[1], t.col[2]); noStroke();
  rect(detX, 0, detW, 44);
  fill(255); textAlign(CENTER, CENTER); textSize(13); textStyle(BOLD);
  text(t.name + ' — ' + t.subtitle, detX + detW / 2, 22);
  textStyle(NORMAL);

  let y = 52;
  noStroke(); fill(40); textAlign(LEFT, TOP); textSize(9.5);
  text(t.desc, detX + 7, y, detW - 14);
  y += 105;

  let specs = [t.lightSource, t.maskType, t.resolution, t.layerTime, t.cost, t.bestFor];
  SPEC_ROWS.forEach((row, i) => {
    fill(i % 2 === 0 ? color(240, 245, 252) : color(250)); noStroke();
    rect(detX + 3, y, detW - 6, 26, 2);
    fill(90); textAlign(LEFT, CENTER); textSize(8.5); textStyle(BOLD);
    text(row, detX + 7, y + 13);
    textStyle(NORMAL); fill(40); textAlign(RIGHT, CENTER); textSize(8.5);
    text(specs[i], detX + detW - 6, y + 13, detW * 0.5 - 4);
    y += 28;
  });

  y += 8;
  fill(t.col[0], t.col[1], t.col[2], 28); noStroke();
  rect(detX + 3, y, detW - 6, 16 + t.pros.length * 16, 3);
  fill(35, 125, 55); textAlign(LEFT, TOP); textSize(9.5); textStyle(BOLD);
  text('Pros', detX + 7, y + 3);
  textStyle(NORMAL); fill(30);
  t.pros.forEach((p, i) => text('+ ' + p, detX + 9, y + 17 + i * 16, detW - 16));
  y += 20 + t.pros.length * 16 + 4;

  fill(200, 50, 50, 22); noStroke();
  rect(detX + 3, y, detW - 6, 16 + t.cons.length * 16, 3);
  fill(165, 35, 35); textAlign(LEFT, TOP); textSize(9.5); textStyle(BOLD);
  text('Cons', detX + 7, y + 3);
  textStyle(NORMAL); fill(70);
  t.cons.forEach((c, i) => text('– ' + c, detX + 9, y + 17 + i * 16, detW - 16));
  y += 20 + t.cons.length * 16 + 8;

  // Compare button
  if (y + 28 < canvasHeight - 6) {
    fill(showCompare ? color(20,80,200) : color(218,228,248));
    stroke(showCompare ? color(10,50,140) : color(158,172,212));
    strokeWeight(1); rect(detX + 6, y, detW - 12, 26, 3);
    noStroke(); fill(showCompare ? 255 : 40); textAlign(CENTER, CENTER); textSize(10.5);
    text('⊕ Compare All Specs', detX + detW / 2, y + 13);
  }
}

function drawCompareTable() {
  let tw = min(580, canvasWidth - 30), th = 230;
  let tx = (canvasWidth - tw) / 2, ty = (canvasHeight - th) / 2;
  fill(255, 255, 250, 245); stroke(140, 160, 200); strokeWeight(1.5);
  rect(tx, ty, tw, th, 6);
  noStroke(); fill(28, 48, 110); textAlign(CENTER, TOP); textSize(13); textStyle(BOLD);
  text('Side-by-Side Comparison', tx + tw / 2, ty + 8);
  textStyle(NORMAL);

  let cw = (tw - 120) / 3, rowH = 28, startY = ty + 30;
  TECHS.forEach((t, i) => {
    fill(t.col[0], t.col[1], t.col[2]); noStroke();
    rect(tx + 120 + i * cw, startY, cw - 2, rowH, 2);
    fill(255); textAlign(CENTER, CENTER); textSize(11); textStyle(BOLD);
    text(t.name, tx + 120 + i * cw + cw / 2, startY + rowH / 2);
    textStyle(NORMAL);
  });

  let specData = [
    ['Light Source', TECHS.map(t => t.lightSource)],
    ['Masking',      TECHS.map(t => t.maskType.split(' ')[0])],
    ['XY Resolution', TECHS.map(t => t.resolution.split(' ')[0])],
    ['Layer Time',   TECHS.map(t => t.layerTime.replace('~','').replace(' (tracing)','').replace(' per layer',''))],
    ['Cost',         TECHS.map(t => t.cost)],
  ];

  specData.forEach(([row, vals], ri) => {
    let ry = startY + rowH + ri * rowH;
    fill(ri % 2 === 0 ? 245 : 255); noStroke(); rect(tx + 2, ry, tw - 4, rowH);
    fill(80); textAlign(LEFT, CENTER); textSize(10); textStyle(BOLD);
    text(row, tx + 8, ry + rowH / 2);
    textStyle(NORMAL);
    vals.forEach((v, vi) => {
      fill(50); textAlign(CENTER, CENTER); textSize(9.5);
      text(v, tx + 120 + vi * cw + cw / 2, ry + rowH / 2, cw - 6);
    });
  });

  // Close button
  fill(215, 70, 55); noStroke(); ellipse(tx + tw - 14, ty + 14, 18, 18);
  fill(255); textAlign(CENTER, CENTER); textSize(12); textStyle(BOLD);
  text('×', tx + tw - 14, ty + 14);
  textStyle(NORMAL);
}

function mousePressed() {
  computeLayout();
  let detW = (selectedTech >= 0) ? min(230, canvasWidth * 0.28) : 0;
  let detX = canvasWidth - detW - (detW > 0 ? 2 : 0);

  // Animate button
  let bw = 150, bh = 24, bx = detX - bw - 6, by = 10;
  if (mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh) {
    animating = !animating; animFrame = 0; return;
  }

  // Compare table
  if (showCompare) {
    let tw = min(580, canvasWidth - 30), th = 230;
    let tx = (canvasWidth - tw) / 2, ty = (canvasHeight - th) / 2;
    if (dist(mouseX, mouseY, tx + tw - 14, ty + 14) < 10) { showCompare = false; return; }
    if (mouseX >= tx && mouseX <= tx + tw && mouseY >= ty && mouseY <= ty + th) return;
    showCompare = false; return;
  }

  // Compare button in detail panel
  if (selectedTech >= 0 && detW > 0) {
    let t = TECHS[selectedTech];
    let y = 52 + 105 + SPEC_ROWS.length * 28 + 8 + 20 + t.pros.length * 16 + 4 + 20 + t.cons.length * 16 + 8;
    if (mouseX >= detX + 6 && mouseX <= canvasWidth - 6 && mouseY >= y && mouseY <= y + 26) {
      showCompare = !showCompare; return;
    }
  }

  // Column clicks
  TECHS.forEach((t, i) => {
    let x = 4 + i * (colW + 8) + 4;
    if (mouseX >= x && mouseX <= x + colW && mouseY >= colY0 && mouseY <= colY0 + colH) {
      selectedTech = (selectedTech === i) ? -1 : i;
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
