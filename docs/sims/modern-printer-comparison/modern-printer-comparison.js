// Modern Printer Comparison — Bed-Slinger vs CoreXY architecture
// CANVAS_HEIGHT: 600
// Bloom L4: compare motion system architectures and their speed/quality trade-offs

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 600;

let selectedComponent = null;
let animating = false;
let animFrame = 0;
let speedLevel = 1;  // 0=slow, 1=medium, 2=fast

// Animation state
let bedYFrac   = 0.5;  // bed position (0=front, 1=back) for bed-slinger
let headXFrac  = 0.5;  // head X position (both)
let headYFrac  = 0.5;  // head Y for CoreXY
let headZFrac  = 0.5;  // head Z for bed-slinger

const COMPONENTS = {
  // Bed Slinger components
  bs_frame:    { label: 'Frame', mass: null,   col: [100,110,120], desc: 'Rigid steel frame provides the reference structure. On a bed-slinger, the frame must handle inertia from the moving bed.' },
  bs_bed:      { label: 'Heated Bed', mass: '~500g + print', col: [190, 60, 60], desc: 'The entire heated bed (200–300mm) moves in the Y axis. Combined with the part\'s growing mass, this limits maximum Y acceleration — especially for large or heavy parts.' },
  bs_head:     { label: 'Print Head', mass: '~200g', col: [40, 160, 80], desc: 'Moves in X only (plus Z via lead screws). Lighter than the bed, so X speeds can be higher. CoreXY keeps both X and Y motion in the lightweight head.' },
  bs_lead:     { label: 'Z Lead Screw', mass: null,  col: [80, 80, 120], desc: 'Stepper motor and lead screw control Z height in precise increments. Z only needs to step down one layer at a time — not speed-critical.' },
  bs_belt:     { label: 'X Belt', mass: null,  col: [60, 130, 200], desc: 'Single belt drives head in X axis. Low mass enables fast X movement, but bed still moves in Y at slower acceleration.' },

  // CoreXY components
  cxy_frame:   { label: 'Frame', mass: null,   col: [100,110,120], desc: 'Usually an enclosed cube frame (aluminum extrusion). The enclosure doubles as thermal management for engineering materials.' },
  cxy_bed:     { label: 'Z-Only Bed', mass: '~300g', col: [40, 160, 80], desc: 'The bed only moves in Z — one layer step per layer. This dramatically reduces the mass being accelerated in the working plane (XY).' },
  cxy_head:    { label: 'Print Head', mass: '~200g', col: [40, 160, 80], desc: 'Moves in both X and Y using the CoreXY belt system. Because no bed mass is involved in XY motion, the head can accelerate much faster in both directions.' },
  cxy_belts:   { label: 'CoreXY Belts', mass: null,  col: [60, 130, 200], desc: 'Two motors drive a crossed-belt loop. Any XY move requires BOTH motors to act simultaneously: X = (M1+M2)/2, Y = (M1−M2)/2. The math is elegant but requires perfectly equal belt tension.' },
  cxy_lead:    { label: 'Z Lead Screws', mass: null, col: [80, 80, 120], desc: 'Usually 3–4 lead screws for automatic tramming (bed leveling). Z motion can also be done with a single central screw for simpler designs.' },
};

let hovComponent = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Modern Printer Comparison — Bed Slinger vs CoreXY architecture comparison', LABEL);
  textFont('sans-serif');
}

function draw() {
  updateCanvasSize();
  background(238, 244, 252);

  noStroke(); fill(18, 48, 110);
  textAlign(CENTER, TOP); textSize(17); textStyle(BOLD);
  text('Printer Architecture: Bed-Slinger vs. CoreXY', canvasWidth / 2, 6);
  textStyle(NORMAL);

  drawSpeedButtons();
  drawAnimButton();

  if (animating) {
    animFrame++;
    let t = (animFrame % 120) / 120;
    bedYFrac  = 0.2 + abs(sin(t * PI)) * 0.6;
    headXFrac = 0.2 + abs(sin(t * PI * 1.3)) * 0.6;
    headYFrac = 0.2 + abs(sin(t * PI * 1.3)) * 0.6;
  }

  let detW  = (selectedComponent !== null) ? min(220, canvasWidth * 0.28) : 0;
  let diagW = canvasWidth - detW - (detW > 0 ? 4 : 0);
  let printerW = floor(diagW / 2) - 8;
  let py = 64, ph = canvasHeight - py - 6;

  drawBedSlinger(8, py, printerW, ph);
  drawCoreXY(printerW + 16, py, printerW, ph);

  if (selectedComponent !== null) {
    drawInfoPanel(diagW + 2, py, detW, ph);
  }

  hovComponent = null;
}

function drawSpeedButtons() {
  let labels = ['Slow (60 mm/s)', 'Medium (300 mm/s)', 'Fast (500 mm/s)'];
  let bw = 120, bh = 22, gap = 4, startX = canvasWidth - (bw + gap) * 3 + gap;
  labels.forEach((lbl, i) => {
    let bx = startX + i * (bw + gap);
    let active = speedLevel === i;
    fill(active ? color(30, 90, 210) : color(210, 220, 240));
    stroke(active ? color(15, 60, 160) : color(155, 170, 210));
    strokeWeight(1); rect(bx, 8, bw, bh, 3);
    noStroke(); fill(active ? 255 : 50); textAlign(CENTER, CENTER); textSize(9.5);
    text(lbl, bx + bw / 2, 8 + bh / 2);
  });
}

function drawAnimButton() {
  let bx = 8, by = 8, bw = 140, bh = 22;
  fill(animating ? color(20,80,200) : color(215, 225, 245));
  stroke(animating ? color(10,50,160) : color(155, 170, 205));
  strokeWeight(1); rect(bx, by, bw, bh, 3);
  noStroke(); fill(animating ? 255 : 50); textAlign(CENTER, CENTER); textSize(10.5);
  text(animating ? '⏹ Stop' : '▶ Animate Move', bx + bw / 2, by + bh / 2);
}

function drawBedSlinger(x, y, w, h) {
  let hov = (comp) => hovComponent === 'bs_' + comp;
  let sel = (comp) => selectedComponent === 'bs_' + comp;

  fill(248, 252, 255); stroke(195, 210, 230); strokeWeight(1.5);
  rect(x, y, w, h, 5);

  // Title
  let titleCol = [190, 60, 60];
  fill(titleCol[0], titleCol[1], titleCol[2]); noStroke();
  rect(x, y, w, 34, 5, 5, 0, 0);
  fill(255); textAlign(CENTER, CENTER); textSize(13); textStyle(BOLD);
  text('Bed-Slinger', x + w / 2, y + 12);
  textStyle(NORMAL); textSize(9.5);
  text('(Classic Prusa/Ender style)', x + w / 2, y + 25);

  let mx = x + w / 2, my = y + 34 + (h - 34) * 0.5;
  let scale = min(w, h - 34) * 0.35;

  // Frame
  let fc = sel('frame') || hov('frame') ? [160, 165, 190] : [120, 125, 140];
  stroke(fc[0], fc[1], fc[2]); strokeWeight(sel('frame') ? 3 : 1.5); noFill();
  rect(mx - scale, my - scale * 0.9, scale * 2, scale * 1.8, 2);

  // Z lead screws (vertical lines on sides)
  stroke(80, 80, 120); strokeWeight(2);
  line(mx - scale, my - scale * 0.85, mx - scale, my + scale * 0.85);
  line(mx + scale, my - scale * 0.85, mx + scale, my + scale * 0.85);

  // Bed (Y axis) — moves based on animation
  let bedY = my - scale * 0.3 + bedYFrac * scale * 0.6;
  let bedColor = sel('bed') || hov('bed') ? [220, 80, 80] : [190, 60, 60];
  fill(bedColor[0], bedColor[1], bedColor[2], 200); stroke(150, 40, 40); strokeWeight(1.5);
  rect(mx - scale * 0.75, bedY, scale * 1.5, scale * 0.15, 2);
  noStroke(); fill(255, 255, 255, 120); textAlign(CENTER, CENTER); textSize(8.5);
  text('HEATED BED', mx, bedY + scale * 0.075);
  // Mass label
  fill(190, 60, 60); textAlign(RIGHT, TOP); textSize(8);
  text('~500g + print', mx + scale * 0.73, bedY - 14);

  // X gantry (horizontal bar at fixed height)
  let gantryY = my - scale * 0.5;
  fill(160, 165, 175); stroke(120, 125, 135); strokeWeight(2);
  rect(mx - scale * 0.8, gantryY - 4, scale * 1.6, 8, 2);

  // Print head on X gantry
  let headX2 = mx - scale * 0.5 + headXFrac * scale;
  let headColor = sel('head') || hov('head') ? [60, 200, 100] : [40, 160, 80];
  fill(headColor[0], headColor[1], headColor[2]); stroke(25, 120, 55); strokeWeight(1.5);
  rect(headX2 - 10, gantryY - 14, 20, 22, 3);
  fill(255, 240, 30); noStroke(); ellipse(headX2, gantryY + 6, 6, 6);

  // Motion arrows
  if (animating) {
    let spd = [0.3, 0.7, 1.0][speedLevel];
    // Y arrow for bed
    let aring = speedLevel >= 2 ? sin(animFrame * 0.4) * 4 : 0;
    stroke(190, 60, 60); strokeWeight(2); noFill();
    drawArrow(mx - scale * 0.85, bedY + aring, mx - scale * 0.85, bedY - 12 + aring, 8);
    // X arrow for head
    stroke(40, 160, 80);
    drawArrow(headX2 + 12, gantryY, headX2 + 24, gantryY, 8);
  }

  // Labels
  noStroke(); fill(190, 60, 60); textAlign(CENTER, BOTTOM); textSize(9.5); textStyle(BOLD);
  text('Y: BED MOVES', mx, bedY - 20);
  fill(40, 160, 80); textAlign(CENTER, TOP); textSize(9.5);
  text('X: head moves', headX2, gantryY + 14);
  textStyle(NORMAL);

  // Ringing indicator at high speeds
  if (speedLevel === 2 && animating) {
    fill(255, 200, 50, 160); noStroke();
    rect(x + 6, y + h - 30, w - 12, 22, 3);
    fill(160, 80, 10); textAlign(CENTER, CENTER); textSize(9); textStyle(BOLD);
    text('⚠ Ringing at 500 mm/s Y-speed', x + w / 2, y + h - 19);
    textStyle(NORMAL);
  } else {
    noStroke(); fill(80); textAlign(CENTER, BOTTOM); textSize(9.5);
    text('Click component for details', x + w / 2, y + h - 6);
  }
}

function drawCoreXY(x, y, w, h) {
  let sel = (comp) => selectedComponent === 'cxy_' + comp;

  fill(248, 252, 255); stroke(195, 210, 230); strokeWeight(1.5);
  rect(x, y, w, h, 5);

  let titleCol = [40, 160, 80];
  fill(titleCol[0], titleCol[1], titleCol[2]); noStroke();
  rect(x, y, w, 34, 5, 5, 0, 0);
  fill(255); textAlign(CENTER, CENTER); textSize(13); textStyle(BOLD);
  text('CoreXY', x + w / 2, y + 12);
  textStyle(NORMAL); textSize(9.5);
  text('(Bambu Lab / Voron / Prusa Core One)', x + w / 2, y + 25);

  let mx = x + w / 2, my = y + 34 + (h - 34) * 0.5;
  let scale = min(w, h - 34) * 0.35;

  // Enclosed frame
  fill(235, 240, 248); stroke(100, 110, 120); strokeWeight(sel('frame') ? 3 : 1.5);
  rect(mx - scale, my - scale * 0.9, scale * 2, scale * 1.8, 2);

  // Z lead screws (4 corners)
  stroke(80, 80, 120); strokeWeight(1.5);
  let corners = [[-scale + 5, -scale * 0.85], [-scale + 5, scale * 0.85],
                 [scale - 5, -scale * 0.85],  [scale - 5, scale * 0.85]];
  corners.forEach(([dx, _]) => { line(mx + dx, my - scale * 0.85, mx + dx, my + scale * 0.85); });

  // Bed (Z only, at fixed XY, moves slightly in Z — show at bottom)
  let bedZ = my + scale * 0.55;
  let bedColor = sel('bed') ? [60, 200, 100] : [40, 160, 80];
  fill(bedColor[0], bedColor[1], bedColor[2], 200); stroke(25, 120, 55); strokeWeight(1.5);
  rect(mx - scale * 0.72, bedZ, scale * 1.44, scale * 0.14, 2);
  noStroke(); fill(255, 255, 255, 140); textAlign(CENTER, CENTER); textSize(8.5);
  text('Z-ONLY BED', mx, bedZ + scale * 0.07);
  fill(40, 160, 80); textAlign(RIGHT, TOP); textSize(8);
  text('Z only', mx + scale * 0.70, bedZ - 12);

  // CoreXY belt routing (diagonal lines)
  stroke(60, 130, 200, 120); strokeWeight(1.5); noFill();
  drawingContext.setLineDash([4, 3]);
  // Two belt loops shown as X-cross
  line(mx - scale * 0.8, my - scale * 0.7, mx + scale * 0.8, my - scale * 0.1);
  line(mx + scale * 0.8, my - scale * 0.7, mx - scale * 0.8, my - scale * 0.1);
  drawingContext.setLineDash([]);

  // Print head (XY, near top)
  let hx = mx - scale * 0.4 + headXFrac * scale * 0.8;
  let hy = my - scale * 0.5 + headYFrac * scale * 0.3;
  let hCol = sel('head') ? [60, 200, 100] : [40, 160, 80];
  fill(hCol[0], hCol[1], hCol[2]); stroke(25, 120, 55); strokeWeight(1.5);
  rect(hx - 10, hy - 12, 20, 22, 3);
  fill(255, 240, 30); noStroke(); ellipse(hx, hy + 8, 6, 6);

  // Motion arrows for head
  if (animating) {
    stroke(40, 160, 80); strokeWeight(2); noFill();
    drawArrow(hx + 12, hy, hx + 26, hy, 8);
    drawArrow(hx, hy - 14, hx, hy - 28, 8);
  }

  // Labels
  noStroke(); fill(40, 160, 80); textAlign(CENTER, TOP); textSize(9.5); textStyle(BOLD);
  text('XY: head moves (low mass)', mx, my - scale * 0.75);
  textStyle(NORMAL);

  // Speed advantage tag
  if (speedLevel === 2 && animating) {
    fill(200, 245, 210, 200); noStroke();
    rect(x + 6, y + h - 30, w - 12, 22, 3);
    fill(20, 120, 50); textAlign(CENTER, CENTER); textSize(9); textStyle(BOLD);
    text('✓ Clean print at 500 mm/s', x + w / 2, y + h - 19);
    textStyle(NORMAL);
  } else {
    noStroke(); fill(80); textAlign(CENTER, BOTTOM); textSize(9.5);
    text('Click component for details', x + w / 2, y + h - 6);
  }
}

function drawArrow(x1, y1, x2, y2, arrowSize) {
  line(x1, y1, x2, y2);
  let ang = atan2(y2 - y1, x2 - x1);
  fill(red(strokeColor()), green(strokeColor()), blue(strokeColor())); noStroke();
  triangle(x2, y2,
    x2 - arrowSize * cos(ang - 0.4), y2 - arrowSize * sin(ang - 0.4),
    x2 - arrowSize * cos(ang + 0.4), y2 - arrowSize * sin(ang + 0.4));
}

// Workaround for strokeColor() not being standard p5
let _strokeR = 0, _strokeG = 0, _strokeB = 0;
const _origStroke = window.stroke;

function strokeColor() { return color(_strokeR, _strokeG, _strokeB); }

function drawInfoPanel(x, y, w, h) {
  if (!selectedComponent || !COMPONENTS[selectedComponent]) return;
  let comp = COMPONENTS[selectedComponent];

  fill(255, 254, 250); stroke(185, 200, 225); strokeWeight(1);
  rect(x, y, w, h, 0, 5, 5, 0);

  let isBed = selectedComponent.includes('bed');
  let hc = isBed ? (selectedComponent.startsWith('bs') ? [190, 60, 60] : [40, 160, 80]) : [60, 100, 180];

  fill(hc[0], hc[1], hc[2]); noStroke(); rect(x, y, w, 44);
  fill(255); textAlign(LEFT, CENTER); textSize(11); textStyle(BOLD);
  text(comp.label, x + 8, y + 22);
  textStyle(NORMAL);

  let ty = y + 52;
  if (comp.mass) {
    fill(hc[0], hc[1], hc[2], 30); noStroke();
    rect(x + 4, ty, w - 8, 26, 3);
    fill(hc[0], hc[1], hc[2]); textAlign(LEFT, CENTER); textSize(10.5); textStyle(BOLD);
    text('Mass: ' + comp.mass, x + 8, ty + 13);
    textStyle(NORMAL); ty += 32;
  }

  noStroke(); fill(40); textAlign(LEFT, TOP); textSize(10);
  text(comp.desc, x + 8, ty, w - 16);
}

function mousePressed() {
  // Speed buttons
  let bw = 120, bh = 22, gap = 4, startX = canvasWidth - (bw + gap) * 3 + gap;
  for (let i = 0; i < 3; i++) {
    let bx = startX + i * (bw + gap);
    if (mouseX >= bx && mouseX <= bx + bw && mouseY >= 8 && mouseY <= 30) {
      speedLevel = i; return;
    }
  }

  // Animate button
  if (mouseX >= 8 && mouseX <= 148 && mouseY >= 8 && mouseY <= 30) {
    animating = !animating; animFrame = 0; return;
  }

  // Component detection (simplified by region)
  let detW  = (selectedComponent !== null) ? min(220, canvasWidth * 0.28) : 0;
  let diagW = canvasWidth - detW - (detW > 0 ? 4 : 0);
  let printerW = floor(diagW / 2) - 8;
  let py = 64;

  // Bed-slinger region
  if (mouseX >= 8 && mouseX <= printerW + 8 && mouseY >= py) {
    let mx = 8 + printerW / 2;
    let my = py + 34 + (canvasHeight - py - 34 - 6) * 0.5;
    let scale = min(printerW, canvasHeight - py - 34 - 6) * 0.35;
    let bedY  = my - scale * 0.3 + bedYFrac * scale * 0.6;
    let ganY  = my - scale * 0.5;

    if (abs(mouseY - bedY - scale * 0.075) < 14) { selectedComponent = 'bs_bed'; return; }
    if (abs(mouseY - ganY) < 16) { selectedComponent = 'bs_head'; return; }
    selectedComponent = 'bs_frame';
    return;
  }

  // CoreXY region
  if (mouseX >= printerW + 16 && mouseX <= printerW * 2 + 16 && mouseY >= py) {
    let mx = printerW + 16 + printerW / 2;
    let my = py + 34 + (canvasHeight - py - 34 - 6) * 0.5;
    let scale = min(printerW, canvasHeight - py - 34 - 6) * 0.35;
    let bedZ  = my + scale * 0.55;

    if (abs(mouseY - bedZ - scale * 0.07) < 14) { selectedComponent = 'cxy_bed'; return; }
    let hx = mx - scale * 0.4 + headXFrac * scale * 0.8;
    let hy = my - scale * 0.5 + headYFrac * scale * 0.3;
    if (dist(mouseX, mouseY, hx, hy) < 20) { selectedComponent = 'cxy_head'; return; }
    selectedComponent = 'cxy_frame';
    return;
  }

  selectedComponent = null;
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
