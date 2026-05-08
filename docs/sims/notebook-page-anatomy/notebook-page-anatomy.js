// Engineering Notebook Page Anatomy — interactive callout infographic
// CANVAS_HEIGHT: 600
// Bloom L1-L2: identify and explain required elements of a notebook entry

let containerWidth;
let canvasWidth  = 700;
let drawHeight   = 520;
let controlHeight = 80;
let canvasHeight  = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Callout definitions
const callouts = [
  {
    id: 1, name: 'Date & Time',
    pos: [0.12, 0.09],  // relative x,y on left page
    side: 'left',
    why: 'The date and time create a chronological legal record. Patent law and engineering ethics require reproducibility — without a date, your entry is useless as evidence.',
    mistake: 'Skipping the time or writing "Monday" instead of "2026-05-08".',
    good: '"2026-05-08  09:14" — unambiguous and ISO-8601 compliant.',
    poor: '"May 8th" — no year, no time, not reproducible.'
  },
  {
    id: 2, name: 'Project Name & Page #',
    pos: [0.12, 0.17],
    side: 'left',
    why: 'Engineering notebooks often span months and multiple projects. The project name and page number let anyone quickly locate a specific entry — and ensure pages cannot be reordered.',
    mistake: 'Numbering pages only at the end of the project, or leaving project name blank.',
    good: '"Phone Stand v2  |  p. 14"',
    poor: '"p. 14" only — which project? Which version?'
  },
  {
    id: 3, name: 'Dimensioned Sketch',
    pos: [0.32, 0.22],
    side: 'left',
    why: 'A sketch without dimensions is just art. Dimensions let your manufacturer, printer, or future self reproduce the design exactly without guessing.',
    mistake: 'Drawing a beautiful sketch but forgetting to annotate critical dimensions.',
    good: 'Top view with overall width, height, and tolerance noted (e.g., "22 mm ± 0.5").',
    poor: 'Sketch labeled "about 20mm wide" — manufacturing cannot use "about".'
  },
  {
    id: 4, name: 'Prose Rationale',
    pos: [0.18, 0.50],
    side: 'left',
    why: 'Sketches show WHAT; prose explains WHY. Decision rationale is the most valuable — and most often missing — part of an engineering notebook.',
    mistake: '"Updated design today." — This tells nothing about why or what changed.',
    good: '"Changed tab width from 3 mm to 5 mm because 3 mm tabs failed in 3-point bend test at 12 N."',
    poor: '"Made the tabs bigger." — No test data, no failure, no context.'
  },
  {
    id: 5, name: 'Photo Label / Paste-in',
    pos: [0.18, 0.77],
    side: 'left',
    why: 'Physical evidence (photos, printed test data, material spec sheets) belongs in the notebook. Paste-ins extend the record without requiring you to redraw data by hand.',
    mistake: 'Leaving a blank rectangle labeled "Photo goes here" but never printing and pasting it.',
    good: '"Photo: v2 print, front view, 2026-05-08, printed on Bambu P1S at 0.2 mm LH."',
    poor: '"Photo" with no description of what the photo shows.'
  },
  {
    id: 6, name: 'Author Initials',
    pos: [0.43, 0.90],
    side: 'left',
    why: 'Initials on every entry establish authorship. On a team, this distinguishes each member\'s contributions — critical for both grading and IP attribution.',
    mistake: 'Only signing the cover page; leaving individual entries unsigned.',
    good: '"JAM" or "J. A. Martinez" at bottom right, every page.',
    poor: 'No initials — impossible to verify authorship months later.'
  },
  {
    id: 7, name: 'Test Data Table',
    pos: [0.70, 0.28],
    side: 'right',
    why: 'Raw data must appear in the notebook exactly as recorded — no rounding, no editing. Tables make values easy to read and process later.',
    mistake: 'Copying data from a spreadsheet into the notebook and rounding to convenient numbers.',
    good: 'Table with columns: Load (N) | Deflection (mm) | Notes — recorded to full instrument precision.',
    poor: '"Load was around 10 N and deflection was about 5 mm."'
  },
  {
    id: 8, name: 'Revision Sketch',
    pos: [0.73, 0.56],
    side: 'right',
    why: 'A revision sketch proposed in response to test data shows your engineering process: observe → hypothesize → revise. This is the core of engineering thinking.',
    mistake: 'Drawing the revision sketch without labeling it as a revision or without referencing the failure it addresses.',
    good: '"Rev. 2 sketch: 5 mm tab, chamfered base. Addresses failure from test on p. 13."',
    poor: 'Unlabeled sketch that could be confused with the original design.'
  },
  {
    id: 9, name: 'Next Steps List',
    pos: [0.67, 0.75],
    side: 'right',
    why: 'A "Next Steps" list at the end of each session creates forward continuity. It is your written commitment to yourself — and evidence that you planned methodically.',
    mistake: 'Vague items like "fix problems" or "keep working on it."',
    good: '"1. Reprint with 5mm tab (Bambu Studio, green PLA). 2. 3-pt bend test at 15 N. 3. Take photo for paste-in."',
    poor: '"Try again."'
  }
];

let activeCallout = null;  // index or null
let quizMode      = false;
let quizTarget    = null;
let quizMsg       = '';
let quizBtnText   = '? Quiz Me';
let quizBtn, closeBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(13);

  quizBtn = createButton(quizBtnText);
  quizBtn.position(10, drawHeight + 44);
  quizBtn.style('font-size', '13px');
  quizBtn.style('padding', '6px 14px');
  quizBtn.style('background', '#f57c00');
  quizBtn.style('color', 'white');
  quizBtn.style('border', 'none');
  quizBtn.style('border-radius', '4px');
  quizBtn.style('cursor', 'pointer');
  quizBtn.mousePressed(toggleQuiz);

  describe('Engineering Notebook Page Anatomy — click numbered callouts to learn about each required element', LABEL);
}

function toggleQuiz() {
  quizMode = !quizMode;
  if (quizMode) {
    let idx = Math.floor(random(callouts.length));
    quizTarget = callouts[idx];
    quizMsg = 'Click the callout for: "' + quizTarget.name + '"';
    quizBtn.html('✕ Exit Quiz');
    activeCallout = null;
  } else {
    quizTarget = null;
    quizMsg = '';
    quizBtn.html('? Quiz Me');
  }
}

function draw() {
  updateCanvasSize();

  // Backgrounds
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill(20, 50, 110);
  textAlign(CENTER, TOP);
  textSize(17);
  text('Engineering Notebook Page Anatomy', canvasWidth / 2, 6);

  // Notebook page spread
  let pageW = (canvasWidth - 36) / 2;
  let pageH = drawHeight - 38;
  let leftX = 12;
  let rightX = leftX + pageW + 12;
  let pageY = 32;

  drawPage(leftX, pageY, pageW, pageH, 'LEFT PAGE — Design & Rationale');
  drawPage(rightX, pageY, pageW, pageH, 'RIGHT PAGE — Test Data & Next Steps');
  drawPageContent(leftX, pageY, pageW, pageH);
  drawPageContent2(rightX, pageY, pageW, pageH);
  drawCallouts(leftX, rightX, pageY, pageW, pageH);

  // Control area
  drawControlArea();
  quizBtn.position(10, drawHeight + 44);
}

function drawPage(x, y, w, h, label) {
  // Grid paper texture
  fill(250, 248, 240);
  stroke(180);
  strokeWeight(1);
  rect(x, y, w, h, 2);

  // Grid lines
  stroke(210, 210, 190);
  strokeWeight(0.5);
  let gridSize = 10;
  for (let gx = x; gx <= x + w; gx += gridSize) line(gx, y, gx, y + h);
  for (let gy = y; gy <= y + h; gy += gridSize) line(x, gy, x + w, gy);

  // Red margin line
  stroke(220, 150, 150);
  strokeWeight(1);
  line(x + 22, y, x + 22, y + h);

  // Label
  noStroke(); fill(100);
  textAlign(CENTER, BOTTOM);
  textSize(9);
  text(label, x + w / 2, y - 2);
}

function drawPageContent(x, y, w, h) {
  let lx = x + 28;
  let tw = w - 36;
  noStroke(); fill(60);
  textAlign(LEFT, TOP);
  textSize(11);

  // Date/time
  fill(80);
  text('2026-05-08  09:14', lx, y + 8);

  // Project name
  text('Phone Stand v2  |  p. 14', lx, y + 22);

  // Sketch box
  stroke(120); strokeWeight(1); fill(245, 240, 220);
  rect(lx, y + 40, tw * 0.7, 100, 2);

  // Sketch content (simple bracket shape)
  stroke(60); strokeWeight(1.5); noFill();
  let sx = lx + 14, sy = y + 55;
  // Base
  line(sx, sy + 60, sx + 80, sy + 60);
  // Vertical
  line(sx + 40, sy + 60, sx + 40, sy + 10);
  // Tab
  line(sx + 40, sy + 10, sx + 80, sy + 10);
  line(sx + 80, sy + 10, sx + 80, sy + 60);
  // Dimensions
  stroke(180); strokeWeight(0.8);
  line(sx, sy + 75, sx + 80, sy + 75);
  line(sx, sy + 70, sx, sy + 80);
  line(sx + 80, sy + 70, sx + 80, sy + 80);
  noStroke(); fill(100); textSize(9);
  text('80 mm', sx + 22, sy + 76);
  // Vertical dim
  stroke(180); strokeWeight(0.8);
  line(sx + 95, sy + 10, sx + 95, sy + 60);
  noStroke(); fill(100); textSize(9);
  text('50mm', sx + 97, sy + 30);

  // Prose rationale
  noStroke(); fill(60); textSize(10.5);
  text('Changed tab thickness from 3 mm to 5 mm.\nPrevious tabs failed at 12 N in 3-pt bend\ntest (see p. 13). New geometry provides\n~67% more cross-sectional area.', lx, y + 148, tw);

  // Paste-in area
  fill(220, 225, 220); stroke(160); strokeWeight(1);
  rect(lx, y + 222, tw, 30, 2);
  noStroke(); fill(100); textSize(9); textAlign(LEFT, CENTER);
  text('Photo: v2 print, front view, 2026-05-08', lx + 4, y + 237);

  // Author initials
  noStroke(); fill(60); textSize(11); textAlign(RIGHT, BOTTOM);
  text('— JAM', x + w - 10, y + h - 6);

  textAlign(LEFT, TOP);
}

function drawPageContent2(x, y, w, h) {
  let lx = x + 28;
  let tw = w - 36;
  noStroke(); fill(60); textSize(10.5); textAlign(LEFT, TOP);

  // Test data table header
  fill(30, 80, 170);
  text('Test: 3-point bend, 5 mm tab, green PLA', lx, y + 8);

  // Table
  let tx = lx, ty = y + 22, trh = 16, tcw = [60, 60, tw - 130];
  let headers = ['Load (N)', 'Defl (mm)', 'Notes'];
  let rows = [['5', '1.2', 'Elastic'], ['10', '2.9', 'Elastic'], ['15', '4.8', 'Micro-crack?'], ['20', '8.1', 'Visible crack'], ['22', '—', 'Fracture']];

  fill(200, 210, 240); stroke(160); strokeWeight(0.8);
  for (let i = 0; i < 3; i++) {
    let cx = tx + tcw.slice(0, i).reduce((a, b) => a + b, 0);
    rect(cx, ty, tcw[i], trh);
    noStroke(); fill(30, 70, 150); textSize(10); textAlign(CENTER, CENTER);
    text(headers[i], cx + tcw[i] / 2, ty + trh / 2);
    stroke(160);
  }
  ty += trh;
  rows.forEach((row, ri) => {
    fill(ri % 2 === 0 ? 248 : 240); stroke(160); strokeWeight(0.5);
    for (let i = 0; i < 3; i++) {
      let cx = tx + tcw.slice(0, i).reduce((a, b) => a + b, 0);
      rect(cx, ty, tcw[i], trh);
      noStroke(); fill(50); textSize(10); textAlign(CENTER, CENTER);
      text(row[i], cx + tcw[i] / 2, ty + trh / 2);
      stroke(160);
    }
    ty += trh;
  });

  // Revision sketch
  ty += 10;
  stroke(120); strokeWeight(1); fill(245, 240, 220);
  rect(lx, ty, tw * 0.7, 80, 2);
  noStroke(); fill(80); textSize(9); text('Rev. 2 — chamfered base, 5 mm tab', lx + 4, ty + 4);
  // Simple revised sketch
  stroke(60); strokeWeight(1.5); noFill();
  let sx2 = lx + 20, sy2 = ty + 20;
  line(sx2, sy2 + 50, sx2 + 80, sy2 + 50);      // base
  line(sx2, sy2 + 50, sx2 + 10, sy2 + 20);       // chamfer
  line(sx2 + 10, sy2 + 20, sx2 + 40, sy2 + 20);  // horizontal
  line(sx2 + 40, sy2 + 20, sx2 + 40, sy2 + 50);  // vertical

  // Next steps
  ty += 96;
  noStroke(); fill(20, 100, 40); textSize(10); textAlign(LEFT, TOP);
  text('Next Steps:', lx, ty);
  fill(50);
  text('1. Reprint at 0.2 mm LH, green PLA\n2. 3-pt bend at 22 N target\n3. Paste print photo\n4. Update CAD if test passes', lx + 8, ty + 14, tw);

  textAlign(LEFT, TOP);
}

function drawCallouts(leftX, rightX, pageY, pageW, pageH) {
  callouts.forEach((c, i) => {
    let baseX = c.side === 'left' ? leftX : rightX;
    let cx = baseX + c.pos[0] * pageW;
    let cy = pageY + c.pos[1] * pageH;

    let isActive = (activeCallout === i);
    let isTarget = quizMode && quizTarget && quizTarget.id === c.id;

    // Callout circle
    if (quizMode && !isTarget) {
      fill(200); stroke(160);
    } else {
      fill(isActive ? color(200, 80, 10) : color(230, 110, 20));
      stroke(isActive ? color(140, 50, 0) : color(180, 70, 0));
    }
    strokeWeight(isActive ? 2.5 : 1.5);
    ellipse(cx, cy, 20, 20);
    noStroke(); fill(255);
    textAlign(CENTER, CENTER); textSize(10);
    text(c.id, cx, cy);
  });

  // Active callout panel
  if (activeCallout !== null && !quizMode) {
    drawCalloutPanel(callouts[activeCallout]);
  }
}

function drawCalloutPanel(c) {
  let pw = min(canvasWidth - 40, 400);
  let ph = 200;
  let px = (canvasWidth - pw) / 2;
  let py = (drawHeight - ph) / 2;

  fill(255, 252, 240, 240);
  stroke(200, 140, 30);
  strokeWeight(2);
  rect(px, py, pw, ph, 8);

  noStroke();
  fill(180, 80, 10);
  textAlign(LEFT, TOP);
  textSize(14);
  text('Element ' + c.id + ': ' + c.name, px + 12, py + 10);

  stroke(200, 140, 30); strokeWeight(1);
  line(px + 10, py + 28, px + pw - 10, py + 28);

  noStroke();
  fill(40);
  textSize(11);
  text('Why required: ' + c.why, px + 12, py + 34, pw - 24);
  text('Common mistake: ' + c.mistake, px + 12, py + 84, pw - 24);

  fill(30, 120, 40);
  text('✓ Good: ' + c.good, px + 12, py + 128, pw - 24);
  fill(180, 40, 40);
  text('✗ Poor: ' + c.poor, px + 12, py + 150, pw - 24);

  // Close hint
  fill(100);
  textAlign(CENTER, BOTTOM);
  textSize(10);
  text('Click anywhere to close', px + pw / 2, py + ph - 4);
}

function drawControlArea() {
  noStroke(); fill(60);
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Click any numbered callout   to learn about that element.', 10, drawHeight + 18);

  if (quizMode && quizMsg) {
    fill(200, 80, 10);
    textSize(14);
    text(quizMsg, 10, drawHeight + 55);
  }
}

function mousePressed() {
  // Close panel if open
  if (activeCallout !== null && !quizMode) {
    activeCallout = null;
    return;
  }

  // Check callout clicks
  let leftX = 12, rightX = 12 + (canvasWidth - 36) / 2 + 12;
  let pageY = 32;
  let pageW = (canvasWidth - 36) / 2;
  let pageH = drawHeight - 38;

  for (let i = 0; i < callouts.length; i++) {
    let c = callouts[i];
    let baseX = c.side === 'left' ? leftX : rightX;
    let cx = baseX + c.pos[0] * pageW;
    let cy = pageY + c.pos[1] * pageH;
    if (dist(mouseX, mouseY, cx, cy) < 12) {
      if (quizMode && quizTarget) {
        if (c.id === quizTarget.id) {
          quizMsg = '✓ Correct! "' + c.name + '" identified. Click "Quiz Me" for another.';
          quizTarget = null;
        } else {
          quizMsg = '✗ That\'s "' + c.name + '". Try again — find: "' + quizTarget.name + '"';
        }
      } else {
        activeCallout = (activeCallout === i) ? null : i;
      }
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
