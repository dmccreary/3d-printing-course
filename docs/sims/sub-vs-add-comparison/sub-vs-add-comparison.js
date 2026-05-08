// Subtractive vs. Additive Manufacturing — Side-by-Side Comparison
// CANVAS_HEIGHT: 440
// Animated comparison showing material removal (subtractive) vs. layer deposition (additive)
// with a clickable comparison table below

let containerWidth;
let canvasWidth = 800;
let drawHeight  = 250;
let tableHeight = 190;
let canvasHeight = drawHeight + tableHeight;
let containerHeight = canvasHeight;

let margin = 14;

// Animation state per process: 'idle' | 'animating' | 'done'
let animStateSub = 'idle';
let animStateAdd = 'idle';
let animProgressSub = 0; // 0..1
let animProgressAdd = 0; // 0..1
const ANIM_SPEED = 0.007; // ~145 frames ≈ 2.4 s at 60 fps

// Buttons
let btnSub, btnAdd;

// Comparison table
const TABLE_ROWS = [
  {
    label: 'Internal features',
    sub:   'Difficult',
    add:   'Easy',
    detail: 'Additive manufacturing can create internal cavities, cooling channels, and lattice structures that are impossible or prohibitively expensive to machine.'
  },
  {
    label: 'Tooling required',
    sub:   'Yes (fixtures, cutters)',
    add:   'No (just a digital file)',
    detail: 'Subtractive methods require custom fixtures and cutting tools for each part geometry. A 3D printer needs only a digital STL file — zero physical tooling.'
  },
  {
    label: 'Material waste',
    sub:   'High (~40%)',
    add:   'Low (~2–10%)',
    detail: 'CNC machining starts with a solid billet and removes up to 40% as chips. FDM printing deposits only what is needed — typically 2–10% waste for support structures.'
  },
  {
    label: 'Unit cost (short run)',
    sub:   'High (setup amortized)',
    add:   'Low (no setup cost)',
    detail: 'Machining setup costs are significant and only economical over large production runs. 3D printing has essentially zero setup cost — ideal for 1 to 100 parts.'
  }
];
let selectedRow = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(15);
  frameRate(60);

  let pw = Math.floor(canvasWidth / 2);

  btnSub = createButton('Animate Subtractive');
  btnSub.position(pw / 2 - 70, drawHeight - 38);
  btnSub.mousePressed(() => handleBtn('sub'));

  btnAdd = createButton('Animate Additive');
  btnAdd.position(pw + pw / 2 - 60, drawHeight - 38);
  btnAdd.mousePressed(() => handleBtn('add'));

  describe('Animated side-by-side comparison of subtractive and additive manufacturing processes with clickable data table', LABEL);
}

function handleBtn(which) {
  if (which === 'sub') {
    if (animStateSub === 'done') {
      animStateSub = 'idle'; animProgressSub = 0; btnSub.html('Animate Subtractive');
    } else {
      animStateSub = 'animating'; animProgressSub = 0; btnSub.html('Animating…');
    }
  } else {
    if (animStateAdd === 'done') {
      animStateAdd = 'idle'; animProgressAdd = 0; btnAdd.html('Animate Additive');
    } else {
      animStateAdd = 'animating'; animProgressAdd = 0; btnAdd.html('Animating…');
    }
  }
}

function draw() {
  updateCanvasSize();

  // Advance animations
  if (animStateSub === 'animating') {
    animProgressSub = min(1, animProgressSub + ANIM_SPEED);
    if (animProgressSub >= 1) { animStateSub = 'done'; btnSub.html('Reset'); }
  }
  if (animStateAdd === 'animating') {
    animProgressAdd = min(1, animProgressAdd + ANIM_SPEED);
    if (animProgressAdd >= 1) { animStateAdd = 'done'; btnAdd.html('Reset'); }
  }

  // Backgrounds
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, tableHeight);

  // Center divider in draw region
  stroke('#bbb');
  strokeWeight(2);
  line(canvasWidth / 2, 0, canvasWidth / 2, drawHeight);
  noStroke();

  let pw = Math.floor(canvasWidth / 2);

  // Panel titles
  textAlign(CENTER, TOP);
  textSize(17);
  fill('#b71c1c');
  noStroke();
  text('Subtractive Manufacturing', pw / 2, 8);
  fill('#1b5e20');
  text('Additive Manufacturing', pw + pw / 2, 8);

  drawSubPanel(0, pw);
  drawAddPanel(pw, pw);
  drawTable();

  // Reposition buttons on resize
  btnSub.position(pw / 2 - 70, drawHeight - 38);
  btnAdd.position(pw + pw / 2 - 60, drawHeight - 38);
}

// ── Subtractive panel ──────────────────────────────────────────────────────

function drawSubPanel(x0, pw) {
  let cx  = x0 + pw / 2;
  let bw  = pw * 0.52;
  let bh  = drawHeight * 0.48;
  let by  = drawHeight * 0.22;   // top of block
  let p   = animProgressSub;

  if (p === 0) {
    // Raw block + tool above
    fill('#9e9e9e');
    stroke('#666');
    strokeWeight(1);
    rect(cx - bw/2, by, bw, bh);
    drawMillTool(cx, by - 8, 0);
  } else if (p < 1) {
    // Block eroding; bracket shape emerging
    // Chip scatter
    randomSeed(17);
    for (let i = 0; i < 14; i++) {
      let angle = random(TWO_PI);
      let dist  = p * 55 * random(0.4, 1.4);
      fill('#bdbdbd');
      noStroke();
      let chipW = random(3, 7);
      let chipH = random(3, 8);
      rect(cx + cos(angle)*dist - chipW/2, by + bh/2 + sin(angle)*dist, chipW, chipH, 1);
    }
    // Shrinking block
    let shrink = 1 - p * 0.38;
    fill(lerpColor(color('#9e9e9e'), color('#78909c'), p));
    stroke('#666');
    strokeWeight(1);
    rect(cx - bw*shrink/2, by, bw*shrink, bh);
    // Tool descending
    drawMillTool(cx, by - 8 + p * bh * 0.25, p);
  } else {
    // Final bracket
    drawBracket(cx, by, bw * 0.7, bh);
    // "Tool retracted" label
    fill('#555');
    textSize(11);
    noStroke();
    textAlign(CENTER, TOP);
    text('Tool retracted', cx, by - 18);
  }

  // Waste badge
  let badgeY = by + bh + 12;
  noStroke();
  fill('#e65100');
  rect(cx - 88, badgeY, 176, 22, 4);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('~40% material wasted', cx, badgeY + 11);
}

function drawMillTool(cx, ty, progress) {
  // Body
  fill('#bdbdbd');
  stroke('#555');
  strokeWeight(1.5);
  rect(cx - 7, ty - 30, 14, 32, 2);
  // Flutes (cutting edges)
  fill('#888');
  noStroke();
  triangle(cx - 7, ty + 2, cx + 7, ty + 2, cx, ty + 12);
  // Sparks when animating
  if (progress > 0 && progress < 1) {
    randomSeed(frameCount);
    for (let i = 0; i < 3; i++) {
      fill('#ffcc02');
      noStroke();
      ellipse(cx + random(-12, 12), ty + 12 + random(0, 8), 3, 3);
    }
  }
}

function drawBracket(cx, by, bw, bh) {
  fill('#546e7a');
  noStroke();
  let tw = bw * 0.28; // arm thickness
  // Vertical arm (left)
  rect(cx - bw/2, by, tw, bh);
  // Horizontal arm (bottom)
  rect(cx - bw/2, by + bh - tw, bw, tw);
}

// ── Additive panel ─────────────────────────────────────────────────────────

function drawAddPanel(x0, pw) {
  let cx  = x0 + pw / 2;
  let bw  = pw * 0.52;
  let bh  = drawHeight * 0.48;
  let by  = drawHeight * 0.22;
  let p   = animProgressAdd;

  // Build plate
  fill('#424242');
  stroke('#222');
  strokeWeight(1);
  rect(cx - bw/2 - 8, by + bh, bw + 16, 8, 2);
  noStroke();

  // Nozzle (moves up as layers build)
  let nozzleY = by + bh - p * bh - 28;
  if (nozzleY > by - 28) nozzleY = by - 28; // clamp above build region
  drawNozzle(cx, nozzleY, p);

  // Layers building from bottom
  if (p > 0) {
    let totalLayers = 18;
    let builtLayers = Math.floor(p * totalLayers);
    let layerH = bh / totalLayers;
    for (let l = 0; l < builtLayers; l++) {
      let t   = l / totalLayers;
      let ly  = by + bh - (l + 1) * layerH;
      // Color: light blue → dark blue (cooled layers)
      fill(lerpColor(color('#90caf9'), color('#1565c0'), t));
      noStroke();
      // Bracket cross-section
      let tw = bw * 0.28;
      // Bottom horizontal base
      if (l < 4) {
        rect(cx - bw/2, ly, bw, layerH);
      } else {
        // Vertical arm only (left side)
        rect(cx - bw/2, ly, tw, layerH);
      }
    }
  }

  // "No waste chips" label
  noStroke();
  fill('#555');
  textSize(11);
  textAlign(CENTER, TOP);
  text(p === 0 ? 'Awaiting build…' : (p < 1 ? 'Building layers…' : 'Complete!'), cx, by - 18);

  // Waste badge
  let badgeY = by + bh + 12;
  noStroke();
  fill('#2e7d32');
  rect(cx - 110, badgeY, 220, 22, 4);
  fill('white');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('~2% material wasted (supports only)', cx, badgeY + 11);
}

function drawNozzle(cx, ty, progress) {
  fill('#757575');
  stroke('#444');
  strokeWeight(1.5);
  rect(cx - 6, ty - 22, 12, 26, 2);
  triangle(cx - 6, ty + 4, cx + 6, ty + 4, cx, ty + 14);
  // Filament bead when printing
  if (progress > 0 && progress < 1) {
    fill('#1565c0');
    noStroke();
    ellipse(cx, ty + 16, 5, 7);
  }
}

// ── Comparison table ───────────────────────────────────────────────────────

function drawTable() {
  let tx   = margin;
  let tw   = canvasWidth - 2 * margin;
  let rowH = 28;
  let ty   = drawHeight + 6;
  let c1   = tx + tw * 0.38;  // subtractive col start
  let c2   = tx + tw * 0.65;  // additive col start

  // Header row
  fill('#37474f');
  stroke('#37474f');
  strokeWeight(0);
  rect(tx, ty, tw, rowH, 3, 3, 0, 0);
  fill('white');
  textSize(13);
  textAlign(LEFT, CENTER);
  noStroke();
  text('Dimension',     tx + 6, ty + rowH/2);
  text('Subtractive',   c1 + 6, ty + rowH/2);
  text('Additive',      c2 + 6, ty + rowH/2);
  ty += rowH;

  // Data rows
  for (let i = 0; i < TABLE_ROWS.length; i++) {
    let row     = TABLE_ROWS[i];
    let isHover = mouseY > ty && mouseY < ty + rowH && mouseX > tx && mouseX < tx + tw;
    let isSel   = selectedRow === i;

    fill(isSel ? '#e3f2fd' : (isHover ? '#f5f5f5' : (i % 2 === 0 ? '#fafafa' : 'white')));
    stroke('#ddd');
    strokeWeight(1);
    rect(tx, ty, tw, rowH);

    noStroke();
    textSize(13);

    fill('#263238');
    textAlign(LEFT, CENTER);
    text(row.label,   tx + 6, ty + rowH/2);

    fill('#b71c1c');
    text(row.sub,     c1 + 6, ty + rowH/2);

    fill('#1b5e20');
    text(row.add,     c2 + 6, ty + rowH/2);

    ty += rowH;
  }

  // Info box (when a row is selected)
  if (selectedRow >= 0) {
    let infoY = drawHeight + 6 + rowH * 5 + 4;
    let infoH = 36;
    fill('#e8eaf6');
    stroke('#9fa8da');
    strokeWeight(1);
    rect(tx, infoY, tw, infoH, 4);
    noStroke();
    fill('#1a237e');
    textSize(12);
    textAlign(LEFT, CENTER);
    text(TABLE_ROWS[selectedRow].detail, tx + 8, infoY + infoH/2, tw - 16, infoH);
  }
}

function mousePressed() {
  // Table row hit-test
  let tx   = margin;
  let tw   = canvasWidth - 2 * margin;
  let rowH = 28;
  let ty   = drawHeight + 6 + rowH; // skip header

  for (let i = 0; i < TABLE_ROWS.length; i++) {
    if (mouseY > ty && mouseY < ty + rowH && mouseX > tx && mouseX < tx + tw) {
      selectedRow = (selectedRow === i) ? -1 : i;
      return;
    }
    ty += rowH;
  }
}

// ── Responsive ─────────────────────────────────────────────────────────────

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
