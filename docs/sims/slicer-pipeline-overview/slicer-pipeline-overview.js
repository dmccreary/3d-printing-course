// Slicer Pipeline Overview — digital-to-physical pipeline infographic
// CANVAS_HEIGHT: 560
// Bloom L2: describe each stage from CAD model to printed part

let containerWidth;
let canvasWidth  = 700;
let pipelineH    = 230;
let detailH      = 310;
let canvasHeight = pipelineH + detailH + 20;  // = 560
let containerHeight = canvasHeight;

let selectedStage = 1;  // default: Slicer Software
let hoveredArrow  = -1;

const STAGES = [
  {
    label: 'CAD Model',
    col: [50, 100, 200],
    detail: 'A mathematical description of a closed 3D surface — triangles in STL, richer geometry in 3MF. The model has no layer information, no toolpath, and no material settings. It is just a shape.',
    drawIcon: drawCubeIcon
  },
  {
    label: 'Slicer Software',
    col: [60, 130, 190],
    detail: 'The slicer cuts the model into layers, fills each layer with perimeters and infill, adds supports and adhesion features, and applies all temperature and speed settings. Output is a G-code text file.',
    drawIcon: drawSlicerIcon
  },
  {
    label: 'G-code File',
    col: [60, 150, 160],
    detail: 'A plain text file of sequential machine commands: movements, temperatures, fan speeds, and extrusion amounts. Typically 1 MB to 50 MB depending on part complexity.',
    drawIcon: drawGcodeIcon
  },
  {
    label: 'Printer Firmware',
    col: [50, 140, 110],
    detail: 'Firmware (Marlin, Klipper, RepRapFirmware) interprets G-code commands and converts them into stepper motor pulses, heater PWM signals, and fan control signals in real time.',
    drawIcon: drawFirmwareIcon
  },
  {
    label: 'Printed Part',
    col: [160, 100, 40],
    detail: 'The physical result: layers of fused thermoplastic (or cured resin) forming the geometry defined in the original CAD model, subject to the print parameters chosen in the slicer.',
    drawIcon: drawPartIcon
  },
];

const ARROWS = [
  { label: 'STL / 3MF', tip: 'STL encodes only triangle geometry. 3MF adds color, materials, and print settings in one package.' },
  { label: 'G-code (.gcode)', tip: 'G-code is a decades-old NC machining standard adapted for 3D printing. The same format drives CNC mills and lathes.' },
  { label: 'Serial / USB / SD / WiFi', tip: 'G-code can be sent via USB cable, copied to a SD card, or transferred over WiFi — the firmware doesn\'t care which method.' },
  { label: 'Stepper pulses /\nheater signals', tip: 'Firmware converts G-code into precise electrical signals that drive motors and heaters in real time.' },
];

// Stage and arrow geometry (computed in draw)
let stageBounds = [];  // [{x, y, w, h}]
let arrowBounds = [];  // [{x, y, w, h}]

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  describe('Slicer Pipeline Overview — click any stage to learn what happens at that step of the digital-to-physical workflow', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245, 248, 253);

  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('Slicer Pipeline Overview', canvasWidth / 2, 7);

  computeLayout();
  drawPipeline();
  drawDetailPanel();
}

function computeLayout() {
  let n = STAGES.length;
  let arrowW = floor(canvasWidth * 0.07);
  let totalArrowW = arrowW * (n - 1);
  let stageW = floor((canvasWidth - 20 - totalArrowW) / n);
  let py = 34;
  let ph = pipelineH - 34 - 8;

  stageBounds = [];
  arrowBounds = [];
  let x = 10;
  for (let i = 0; i < n; i++) {
    stageBounds.push({ x, y: py, w: stageW, h: ph });
    x += stageW;
    if (i < n - 1) {
      arrowBounds.push({ x, y: py, w: arrowW, h: ph });
      x += arrowW;
    }
  }
}

function drawPipeline() {
  // Draw stages
  STAGES.forEach((s, i) => {
    let b = stageBounds[i];
    let isSel = selectedStage === i;
    let isHov = mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h;
    let col = isSel ? [210, 140, 30] : s.col;
    let alpha = isSel ? 230 : isHov ? 180 : 150;

    fill(col[0], col[1], col[2], alpha);
    stroke(col[0], col[1], col[2]); strokeWeight(isSel ? 2.5 : 1);
    rect(b.x, b.y, b.w, b.h, 6);

    // Icon
    let iconSize = min(b.w - 16, 60);
    let ix = b.x + b.w / 2;
    let iy = b.y + b.h / 2 - 14;
    s.drawIcon(ix, iy, iconSize, col, isSel);

    // Label
    noStroke(); fill(isSel ? 255 : 240);
    textAlign(CENTER, CENTER); textSize(9.5);
    text(s.label, b.x + b.w / 2, b.y + b.h - 16);
  });

  // Draw arrows
  ARROWS.forEach((a, i) => {
    let b = arrowBounds[i];
    let isHov = mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h;
    hoveredArrow = isHov ? i : (hoveredArrow === i ? -1 : hoveredArrow);

    let cy = b.y + b.h / 2;
    let aw = b.w;
    stroke(100, 130, 160); strokeWeight(1.5); fill(100, 130, 160);
    // Shaft
    line(b.x + 2, cy, b.x + aw - 8, cy);
    // Arrowhead
    triangle(b.x + aw, cy, b.x + aw - 9, cy - 5, b.x + aw - 9, cy + 5);

    // Label above
    noStroke(); fill(60);
    textAlign(CENTER, CENTER); textSize(8);
    text(a.label, b.x + aw / 2, cy - 14);
  });

  // Tooltip for hovered arrow
  if (hoveredArrow >= 0) {
    let b = arrowBounds[hoveredArrow];
    let tx = b.x + b.w / 2;
    let ty = b.y + b.h / 2 + 14;
    let tw = 200;
    fill(255, 250, 230); stroke(180, 140, 40); strokeWeight(1);
    let th = 36;
    rect(tx - tw / 2, ty, tw, th, 4);
    noStroke(); fill(60); textSize(8.5); textAlign(CENTER, TOP);
    text(ARROWS[hoveredArrow].tip, tx - tw / 2 + 6, ty + 4, tw - 12);
  }
}

function drawDetailPanel() {
  let s = STAGES[selectedStage];
  let px = 10, py = pipelineH + 14;
  let pw = canvasWidth - 20;
  let ph = detailH - 20;

  // Panel
  fill(255); stroke(190); strokeWeight(1);
  rect(px, py, pw, ph, 4);

  // Header strip
  let col = [210, 140, 30];
  fill(col[0], col[1], col[2], 220); noStroke();
  rect(px, py, pw, 36, 4, 4, 0, 0);

  fill(255); textAlign(LEFT, CENTER); textSize(13);
  text('Stage ' + (selectedStage + 1) + ': ' + s.label, px + 14, py + 18);

  // Step indicator dots
  textAlign(RIGHT, CENTER); textSize(11); fill(255, 255, 255, 180);
  text((selectedStage + 1) + ' / ' + STAGES.length, px + pw - 12, py + 18);

  // Body
  noStroke(); fill(40); textAlign(LEFT, TOP); textSize(12);
  text(s.detail, px + 14, py + 50, pw - 28);

  // Nav hint
  fill(130); textSize(10); textAlign(CENTER, BOTTOM);
  text('← Click any stage above to explore it', px + pw / 2, py + ph - 8);

  // Digital / Physical gradient labels
  fill(80, 120, 180); textSize(9); textAlign(LEFT, TOP);
  text('◀ Digital', px + 14, py + 44);
  fill(160, 90, 30); textAlign(RIGHT, TOP);
  text('Physical ▶', px + pw - 14, py + 44);
}

// ── Icon drawing helpers ──────────────────────────────────────────────────────

function drawCubeIcon(cx, cy, s, col, sel) {
  let c = sel ? [255, 255, 255] : [220, 235, 255];
  stroke(c[0], c[1], c[2]); strokeWeight(1.5); noFill();
  let h = s * 0.4;
  // Front face
  rect(cx - h, cy - h / 2, h * 1.4, h * 1.2, 2);
  // Top
  beginShape();
  vertex(cx - h, cy - h / 2);
  vertex(cx - h + h * 0.4, cy - h * 0.8);
  vertex(cx - h + h * 0.4 + h * 1.4, cy - h * 0.8);
  vertex(cx - h + h * 1.4, cy - h / 2);
  endShape(CLOSE);
  // Right side
  beginShape();
  vertex(cx - h + h * 1.4, cy - h / 2);
  vertex(cx - h + h * 1.4 + h * 0.4, cy - h * 0.8);
  vertex(cx - h + h * 1.4 + h * 0.4, cy - h * 0.8 + h * 1.2);
  vertex(cx - h + h * 1.4, cy - h / 2 + h * 1.2);
  endShape(CLOSE);
}

function drawSlicerIcon(cx, cy, s, col, sel) {
  let c = sel ? [255, 255, 255] : [220, 240, 255];
  stroke(c[0], c[1], c[2]); strokeWeight(1.5); noFill();
  let h = s * 0.4;
  rect(cx - h, cy - h, h * 2, h * 2, 2);
  // Horizontal slice lines
  let nSlices = 4;
  for (let i = 1; i < nSlices; i++) {
    let ys = cy - h + i * (h * 2 / nSlices);
    line(cx - h, ys, cx + h, ys);
  }
}

function drawGcodeIcon(cx, cy, s, col, sel) {
  let c = sel ? [255, 255, 255] : [200, 240, 240];
  stroke(c[0], c[1], c[2]); strokeWeight(1.5); noFill();
  let w = s * 0.45, h = s * 0.55;
  rect(cx - w, cy - h, w * 2, h * 2, 2);
  // Text lines
  let nLines = 5;
  for (let i = 0; i < nLines; i++) {
    let ly = cy - h + 6 + i * ((h * 2 - 10) / nLines);
    let lw = (i % 2 === 0) ? w * 1.5 : w;
    line(cx - w + 4, ly, cx - w + 4 + lw, ly);
  }
  // Dog-ear
  let ex = cx + w - 7;
  let ey = cy - h;
  line(ex, ey, cx + w, ey + 7);
  line(ex, ey, ex, ey + 7);
  line(cx + w, ey + 7, ex, ey + 7);
}

function drawFirmwareIcon(cx, cy, s, col, sel) {
  let c = sel ? [255, 255, 255] : [200, 250, 225];
  stroke(c[0], c[1], c[2]); strokeWeight(1.5); noFill();
  let h = s * 0.42;
  rect(cx - h, cy - h, h * 2, h * 2, 3);
  // Chip center
  rect(cx - h * 0.5, cy - h * 0.5, h, h, 2);
  // Pins
  let pins = 3;
  let pinSpacing = (h * 1.4) / (pins + 1);
  for (let i = 0; i < pins; i++) {
    let py_ = cy - h * 0.7 + pinSpacing * (i + 1);
    line(cx - h, py_, cx - h * 0.5, py_);       // left pin
    line(cx + h * 0.5, py_, cx + h, py_);       // right pin
  }
}

function drawPartIcon(cx, cy, s, col, sel) {
  let c = sel ? [255, 220, 160] : [240, 200, 140];
  fill(c[0], c[1], c[2], 200); stroke(c[0], c[1], c[2]); strokeWeight(1.5);
  let w = s * 0.45;
  let layers = 4;
  let lh = s * 0.18;
  for (let i = 0; i < layers; i++) {
    let lw = w * (1 - i * 0.15);
    let ly = cy + (layers / 2 - i) * lh - lh;
    rect(cx - lw, ly, lw * 2, lh, 2);
  }
}

function mousePressed() {
  for (let i = 0; i < STAGES.length; i++) {
    let b = stageBounds[i];
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      selectedStage = i;
      return;
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
