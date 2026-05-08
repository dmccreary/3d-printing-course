// Layer Height Cross-Section Explorer
// CANVAS_HEIGHT: 560
// Bloom L3: predict how layer height affects layer count, print time, and surface quality

let containerWidth;
let canvasWidth  = 700;
let drawHeight   = 400;
let controlH     = 160;
let canvasHeight = drawHeight + controlH;
let containerHeight = canvasHeight;

let lhSlider;
let layerHeight = 0.20;  // mm

// Block dimensions
const BLOCK_MM = 20;   // total height of block in mm
const NOZZLE_D = 0.40; // nozzle diameter in mm

// Colors: two alternating layer shades
const COL_A = [40,  90, 170];
const COL_B = [70, 130, 210];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  lhSlider = createSlider(8, 36, 20, 4);  // ×100 to avoid float steps
  lhSlider.style('width', '200px');
  lhSlider.input(() => { layerHeight = lhSlider.value() / 100; });

  describe('Layer Height Cross-Section Explorer — adjust layer height to see its effect on layer count, print time, and surface quality', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245, 248, 253);

  layerHeight = lhSlider.value() / 100;

  // Title
  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('Layer Height Cross-Section Explorer', canvasWidth / 2, 7);

  drawCrossSection();
  drawStatsPanel();
  drawControls();
}

function drawCrossSection() {
  let px = 10, py = 34;
  let pw = floor(canvasWidth * 0.58);
  let ph = drawHeight - py - 10;

  // Panel background
  fill(250); stroke(190); strokeWeight(1);
  rect(px, py, pw, ph, 4);

  // Block dimensions in pixels
  let blockW = pw - 40;
  let blockH = ph - 50;
  let bx = px + 20;
  let by = py + 20;

  // Scale: pixels per mm
  let pxPerMm = blockH / BLOCK_MM;

  // Number of layers
  let layerCount = ceil(BLOCK_MM / layerHeight);
  let layerPx = blockH / layerCount;

  // Draw layers bottom to top
  noStroke();
  for (let i = 0; i < layerCount; i++) {
    let yTop = by + blockH - (i + 1) * layerPx;
    let c = (i % 2 === 0) ? COL_A : COL_B;
    fill(c[0], c[1], c[2]);
    rect(bx, yTop, blockW, layerPx);
  }

  // Block outline
  noFill(); stroke(20, 50, 110); strokeWeight(1.5);
  rect(bx, by, blockW, blockH);

  // Nozzle diameter reference line
  let nozzlePx = NOZZLE_D * pxPerMm;
  let refY = by + blockH - nozzlePx;
  stroke(220, 40, 40); strokeWeight(1.5);
  setLineDash([4, 3]);
  line(bx, refY, bx + blockW, refY);
  setLineDash([]);

  // Label inside block at right edge
  noStroke(); fill(220, 40, 40);
  textSize(8.5); textAlign(RIGHT, BOTTOM);
  text('← Nozzle Ø 0.4 mm', bx + blockW - 4, refY - 2);

  // Layer height indicator on right side
  if (layerPx > 4) {
    let topY = by + blockH - layerPx;
    stroke(40, 40, 40); strokeWeight(1);
    line(bx + blockW + 4, topY, bx + blockW + 14, topY);
    line(bx + blockW + 4, by + blockH, bx + blockW + 14, by + blockH);
    line(bx + blockW + 9, topY, bx + blockW + 9, by + blockH);
    noStroke(); fill(40); textSize(8); textAlign(LEFT, CENTER);
    text(nf(layerHeight, 1, 2) + ' mm', bx + blockW + 16, (topY + by + blockH) / 2);
  }

  // Caption bar
  noStroke();
  fill(40, 90, 170, 200);
  rect(px, py + ph - 22, pw, 22, 0, 0, 4, 4);
  fill(255); textAlign(CENTER, CENTER); textSize(11);
  text(layerCount + ' layers · ' + nf(layerHeight, 1, 2) + ' mm each', px + pw / 2, py + ph - 11);
}

function setLineDash(pattern) {
  drawingContext.setLineDash(pattern);
}

function drawStatsPanel() {
  let sx = floor(canvasWidth * 0.60);
  let sy = 34;
  let sw = canvasWidth - sx - 10;
  let sh = drawHeight - sy - 10;

  fill(255); stroke(190); strokeWeight(1);
  rect(sx, sy, sw, sh, 4);

  noStroke(); fill(20, 50, 110);
  textAlign(LEFT, TOP); textSize(12);
  text('Layer Height Stats', sx + 10, sy + 10);

  let layerCount = ceil(BLOCK_MM / layerHeight);
  let relTime = 0.20 / layerHeight;
  let quality = getQuality(layerHeight);
  let qualColor = getQualityColor(layerHeight);

  let rows = [
    ['Layer Height',     nf(layerHeight, 1, 2) + ' mm',      [40, 90, 170]],
    ['Part Height',      BLOCK_MM + ' mm',                   [80, 80, 80]],
    ['Total Layers',     str(layerCount),                     [40, 90, 170]],
    ['Rel. Print Time',  nf(relTime, 1, 2) + '×',            [180, 80, 30]],
    ['Surface Quality',  quality,                             qualColor],
  ];

  rows.forEach(([label, val, col], i) => {
    let ry = sy + 38 + i * 46;
    fill(90); textSize(10); textAlign(LEFT, TOP); noStroke();
    text(label, sx + 10, ry);
    fill(col[0], col[1], col[2]); textSize(17); textAlign(LEFT, TOP);
    text(val, sx + 10, ry + 14);
  });
}

function getQuality(lh) {
  if (lh <= 0.10) return 'Very Fine';
  if (lh <= 0.16) return 'Fine';
  if (lh <= 0.22) return 'Standard';
  if (lh <= 0.28) return 'Draft';
  return 'Coarse';
}

function getQualityColor(lh) {
  if (lh <= 0.10) return [30, 160, 100];
  if (lh <= 0.16) return [60, 170, 80];
  if (lh <= 0.22) return [40, 110, 200];
  if (lh <= 0.28) return [180, 130, 20];
  return [200, 60, 40];
}

function drawControls() {
  let y = drawHeight + 10;
  let cx = canvasWidth / 2;

  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(13);
  text('Layer Height', cx, y + 8);

  // Tick marks
  let steps = [0.08, 0.12, 0.16, 0.20, 0.24, 0.28, 0.32, 0.36];
  let sliderLeft = cx - 100;
  let sliderRight = cx + 100;
  let tickY = y + 60;

  fill(80); textSize(9); textAlign(CENTER, TOP);
  steps.forEach((v, i) => {
    let tx = map(v, 0.08, 0.36, sliderLeft, sliderRight);
    stroke(150); strokeWeight(1);
    line(tx, tickY - 4, tx, tickY + 2);
    noStroke();
    text(nf(v, 1, 2), tx, tickY + 4);
  });

  // Slider position
  lhSlider.position(sliderLeft + canvasWidth / 2 - canvasWidth / 2 + (containerWidth - canvasWidth) / 2 + sliderLeft - (containerWidth / 2 - 100), y + 44);

  // Re-position slider using absolute page position
  let sliderPageX = (containerWidth / 2) - 100;
  lhSlider.position(sliderPageX, y + 44);

  // Current value callout
  noStroke(); fill(40, 90, 170);
  textSize(14); textAlign(CENTER, TOP);
  text(nf(layerHeight, 1, 2) + ' mm', cx, y + 100);

  // Explanatory note
  fill(80); textSize(10); textAlign(CENTER, TOP);
  text('Relative print time is based on 0.20 mm as the 1.0× baseline.', cx, y + 122);
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
