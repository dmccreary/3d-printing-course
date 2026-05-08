// Z-Offset Calibration MicroSim — first layer gap visualizer
// CANVAS_HEIGHT: 540
// Bloom L3: practice adjusting Z offset and observe first-layer cross-section

let containerWidth;
let canvasWidth  = 700;
let topH         = 70;
let viewH        = 290;
let thumbH       = 140;
let gradeH       = 40;
let canvasHeight = topH + viewH + thumbH + gradeH;  // = 540
let containerHeight = canvasHeight;

let zSlider;
let zOffset = -1.0;

// Reference: gap in canvas pixels when z_offset = -1.0 mm (correct center)
const REF_Z    = -1.0;
const REF_GAP  = 20;   // pixels above surface = "correct" squish reference
const PX_PER_MM = 80;  // visualization scale (not physical scale)
const NOZZLE_R = 14;   // nozzle outlet "radius" in visualization pixels

const THUMBS = [
  { label: 'Too Far',    z: +0.2,  col: [210, 60, 40] },
  { label: 'Slight High', z: -0.5, col: [200, 150, 30] },
  { label: 'Correct',    z: -1.0,  col: [40, 170, 80] },
  { label: 'Too Close',  z: -1.8,  col: [210, 60, 40] },
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  zSlider = createSlider(-250, 50, -100, 5);  // in units of 0.01mm → -2.50 to +0.50
  zSlider.style('width', '260px');
  zSlider.input(() => { zOffset = zSlider.value() / 100; });

  describe('Z-Offset Calibration Simulator — adjust the slider to see how Z offset affects first-layer bead shape', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245, 248, 253);

  zOffset = zSlider.value() / 100;

  // Title
  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('Z-Offset Calibration Simulator', canvasWidth / 2, 6);

  // Slider controls
  let sliderLabel = 'Z Offset: ' + nf(zOffset, 1, 2) + ' mm';
  noStroke(); fill(60); textSize(12); textAlign(LEFT, CENTER);
  text(sliderLabel, 14, topH / 2 + 8);

  zSlider.position(floor(canvasWidth / 2) - 130, topH / 2 - 4);

  // Range labels
  noStroke(); fill(100); textSize(9); textAlign(LEFT, CENTER);
  text('-2.50', floor(canvasWidth / 2) - 130, topH / 2 + 16);
  textAlign(RIGHT, CENTER);
  text('+0.50', floor(canvasWidth / 2) + 130, topH / 2 + 16);

  drawCrossSection();
  drawGradeBadge();
  drawThumbnails();
}

function getGapPx() {
  return (zOffset - REF_Z) * PX_PER_MM + REF_GAP;
}

function getGrade(gap) {
  if (gap < -4)     return { label: 'Nozzle Crash',   col: [200, 40, 40],  tip: 'Nozzle is dragging on the build surface — risk of damage.' };
  if (gap < 6)      return { label: 'Too Close',       col: [200, 80, 30],  tip: 'Bead is crushed; nozzle may clog or damage PEI coating.' };
  if (gap < 14)     return { label: 'Good',            col: [80, 180, 80],  tip: 'Bead is well-squished; good adhesion and extrusion.' };
  if (gap < 26)     return { label: 'Excellent',       col: [40, 160, 60],  tip: 'Ideal gap: bead is squished ~50% — optimal first-layer adhesion.' };
  if (gap < 40)     return { label: 'Slightly High',   col: [190, 160, 30], tip: 'Bead barely makes contact; adhesion may be inconsistent.' };
  return              { label: 'Too Far',             col: [200, 60, 40],  tip: 'Bead is round and floating — no bed adhesion.' };
}

function drawCrossSection() {
  let cx = floor(canvasWidth / 2);
  let surfY = topH + viewH - 60;
  let gap = getGapPx();
  let grade = getGrade(gap);

  // Background
  fill(250); stroke(190); strokeWeight(1);
  rect(10, topH, canvasWidth - 20, viewH, 4);

  // Build plate
  fill(150, 150, 160); noStroke();
  rect(10, surfY + 6, canvasWidth - 20, 20);
  fill(200, 200, 205);
  rect(10, surfY, canvasWidth - 20, 8);

  // Surface label
  noStroke(); fill(80); textSize(9); textAlign(LEFT, CENTER);
  text('Build surface', canvasWidth - 100, surfY + 3);

  // Nozzle body
  let nozzleTipY = surfY - max(gap, -6);
  let nozzleTopY = nozzleTipY - 60;
  let nozzleTopW = 36;
  fill(140, 140, 150); stroke(100); strokeWeight(1);
  beginShape();
  vertex(cx - nozzleTopW, nozzleTopY);
  vertex(cx + nozzleTopW, nozzleTopY);
  vertex(cx + NOZZLE_R, nozzleTipY);
  vertex(cx - NOZZLE_R, nozzleTipY);
  endShape(CLOSE);

  // Nozzle tip hole
  fill(60); noStroke();
  ellipse(cx, nozzleTipY, NOZZLE_R * 1.2, 6);

  // Bead cross-section
  if (gap > -4) {
    let beadCenterY, beadH, beadW;
    if (gap <= 0) {
      // Nozzle below surface — bead crushed flat / blocked
      beadH = 4;
      beadW = NOZZLE_R * 3;
      beadCenterY = surfY - 2;
    } else if (gap < NOZZLE_R * 2) {
      // Squished bead
      beadH = max(4, gap * 0.7);
      // Volume conservation: π*(NOZZLE_R)^2 = π*(beadW/2)*(beadH/2)
      beadW = (NOZZLE_R * NOZZLE_R * 4) / beadH;
      beadCenterY = surfY - beadH / 2;
    } else {
      // Round bead (floating or barely touching)
      beadH = NOZZLE_R * 2;
      beadW = NOZZLE_R * 2;
      beadCenterY = surfY - gap + NOZZLE_R;
    }

    fill(grade.col[0], grade.col[1], grade.col[2], 220);
    stroke(grade.col[0] - 30, grade.col[1] - 30, grade.col[2] - 30); strokeWeight(1);
    ellipse(cx, beadCenterY, beadW, beadH);

    // Dimension annotation: gap
    let annotY = surfY - gap / 2;
    if (gap > 6) {
      stroke(80); strokeWeight(1); fill(80);
      line(cx + NOZZLE_R + 10, surfY, cx + NOZZLE_R + 10, nozzleTipY);
      triangle(cx + NOZZLE_R + 10, surfY, cx + NOZZLE_R + 7, surfY - 6, cx + NOZZLE_R + 13, surfY - 6);
      triangle(cx + NOZZLE_R + 10, nozzleTipY, cx + NOZZLE_R + 7, nozzleTipY + 6, cx + NOZZLE_R + 13, nozzleTipY + 6);
      noStroke(); textSize(9); textAlign(LEFT, CENTER);
      text(nf(gap / PX_PER_MM, 1, 2) + ' mm', cx + NOZZLE_R + 16, annotY);
    }
  }

  // Grade tooltip region
  if (gap < -4) {
    // Crash indicator
    stroke(200, 40, 40); strokeWeight(2);
    drawingContext.setLineDash([4, 3]);
    line(cx - 40, surfY, cx + 40, surfY);
    drawingContext.setLineDash([]);
    noStroke(); fill(200, 40, 40); textSize(10); textAlign(CENTER, CENTER);
    text('⚠ Nozzle below build surface', cx, surfY - 20);
  }
}

function drawGradeBadge() {
  let grade = getGrade(getGapPx());
  let bx = 14, by = topH + viewH + 4;
  let bw = canvasWidth - 28;

  fill(grade.col[0], grade.col[1], grade.col[2], 200); stroke(grade.col[0] - 30, grade.col[1] - 30, grade.col[2] - 30); strokeWeight(1);
  rect(bx, by, bw, 32, 4);
  noStroke(); fill(255); textAlign(CENTER, CENTER); textSize(13);
  text('First Layer Grade: ' + grade.label + '   —   ' + grade.tip, bx + bw / 2, by + 16);
}

function drawThumbnails() {
  let ty = topH + viewH + 40;
  let tw = floor((canvasWidth - 24) / 4) - 4;

  THUMBS.forEach((t, i) => {
    let tx = 12 + i * (tw + 4);
    let surfY = ty + 78;
    let gap = (t.z - REF_Z) * PX_PER_MM + REF_GAP;

    // Mini background
    let isSelected = abs(zOffset - t.z) < 0.35;
    fill(isSelected ? 230 : 245); stroke(isSelected ? t.col : [190, 190, 190]); strokeWeight(isSelected ? 2 : 1);
    rect(tx, ty, tw, thumbH - 10, 4);

    // Mini surface
    fill(190, 190, 200); noStroke();
    rect(tx + 2, surfY, tw - 4, 8);

    // Mini nozzle
    let mCx = tx + tw / 2;
    let mNozzTipY = surfY - max(gap * 0.6, -4);
    fill(150, 150, 160); noStroke();
    beginShape();
    vertex(mCx - 14, mNozzTipY - 22);
    vertex(mCx + 14, mNozzTipY - 22);
    vertex(mCx + 5, mNozzTipY);
    vertex(mCx - 5, mNozzTipY);
    endShape(CLOSE);

    // Mini bead
    if (gap > -4) {
      let bh, bw_;
      if (gap <= 0) { bh = 2; bw_ = 18; }
      else if (gap * 0.6 < 10) { bh = max(2, gap * 0.42); bw_ = (5*5*4) / max(bh, 1); }
      else { bh = 10; bw_ = 10; }
      fill(t.col[0], t.col[1], t.col[2], 200); noStroke();
      ellipse(mCx, surfY - bh / 2, min(bw_, tw - 8), bh);
    }

    // Label
    noStroke(); fill(t.col[0], t.col[1], t.col[2]); textSize(9); textAlign(CENTER, BOTTOM);
    text(t.label, mCx, ty + thumbH - 12);
    fill(80); textSize(8); textAlign(CENTER, BOTTOM);
    text(nf(t.z, 1, 1) + ' mm', mCx, ty + thumbH - 4);
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
