// PLTW Engineering Design Process Cycle — 7-step radial diagram
// CANVAS_HEIGHT: 620
// Bloom L1-L2: recall, sequence, and explain the 7 PLTW design process steps

let containerWidth;
let canvasWidth  = 700;
let drawHeight   = 440;
let detailHeight = 180;
let canvasHeight  = drawHeight + detailHeight;
let containerHeight = canvasHeight;

const steps = [
  {
    name: 'Define the\nProblem',
    col: [21, 101, 192],
    desc: 'Clearly state what the design must accomplish, who it serves, and what constraints apply.',
    questions: ['What problem are we solving?', 'Who is the user?', 'What are the constraints (size, cost, time)?', 'What does success look like?'],
    deliverables: 'Problem statement, needs analysis, project scope document',
    amNote: 'Write a one-sentence design brief: "Print a phone stand for a desk that fits phones 60–80 mm wide, prints in PLA without supports."'
  },
  {
    name: 'Research',
    col: [0, 105, 92],
    desc: 'Gather information about existing solutions, relevant science, materials, and constraints before generating any designs.',
    questions: ['What solutions already exist?', 'What standards or codes apply?', 'What materials or processes are available?', 'What can we learn from failures?'],
    deliverables: 'Annotated research notes, competitive analysis, materials data sheet',
    amNote: 'Research FDM overhangs, layer adhesion, and support-free design strategies before sketching.'
  },
  {
    name: 'Ideate',
    col: [56, 142, 60],
    desc: 'Generate many diverse design concepts without judgment — quantity before quality.',
    questions: ['How many different ways could we solve this?', 'What unusual approaches have we NOT tried?', 'What constraints can we relax temporarily to think bigger?'],
    deliverables: '6-concept ideation sheet, morphological chart, mood board',
    amNote: 'Sketch 6+ phone-stand concepts in one session. Include wild ideas — even ones that seem unprintable.'
  },
  {
    name: 'Specify',
    col: [245, 127, 23],
    desc: 'Select the best concept and translate the design brief into measurable engineering specifications.',
    questions: ['Which concept best meets the criteria?', 'What are the exact dimensions and tolerances?', 'How will we test whether each spec is met?'],
    deliverables: 'Concept selection matrix, engineering specs table, success criteria',
    amNote: 'Specify: width = 72 ± 1 mm, tilt angle = 65°, layer height = 0.2 mm, material = PLA.'
  },
  {
    name: 'Prototype',
    col: [230, 74, 25],
    desc: 'Build a physical or digital model to test your design ideas quickly and cheaply.',
    questions: ['What is the fastest way to test the key risk?', 'What level of fidelity do we need?', 'What can go wrong in fabrication?'],
    deliverables: 'First 3D print, CAD model, foam/cardboard mock-up',
    amNote: 'Print a first version in draft quality (0.3 mm LH) to test fit — save the fine quality for after testing confirms the shape.'
  },
  {
    name: 'Test &\nValidate',
    col: [198, 40, 40],
    desc: 'Evaluate the prototype against your specifications and document results objectively.',
    questions: ['Does it meet all specs?', 'What failed and why?', 'What data proves it works (or doesn\'t)?', 'What would we change?'],
    deliverables: 'Test data table, photo documentation, pass/fail report, next-iteration plan',
    amNote: 'Perform a 3-point bend test. Record load and deflection. If the tab breaks at 12 N instead of 20 N, you have data for your next iteration.'
  },
  {
    name: 'Communicate',
    col: [106, 27, 154],
    desc: 'Share your design, process, and results with stakeholders in a format appropriate to the audience.',
    questions: ['Who is the audience — engineers, clients, students?', 'What format is most effective — poster, report, demo?', 'What did we learn that others should know?'],
    deliverables: 'Technical report, design portfolio, presentation, engineering drawing',
    amNote: 'Create a 1-page project summary with: problem statement, final design photo, test results, and key lessons learned.'
  }
];

let selectedStep = -1;
let beadAngle    = 0;   // 0 to 7 (step index, fractional)
let animRunning  = false;
let animPause    = 0;   // frames to pause at each step
let animBtn;
let nextBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(13);

  animBtn = createButton('▶ Animate Full Cycle');
  animBtn.position(10, drawHeight + detailHeight - 36);
  animBtn.style('font-size', '13px');
  animBtn.style('padding', '6px 14px');
  animBtn.style('background', '#1565C0');
  animBtn.style('color', 'white');
  animBtn.style('border', 'none');
  animBtn.style('border-radius', '4px');
  animBtn.style('cursor', 'pointer');
  animBtn.mousePressed(toggleAnimation);

  nextBtn = createButton('Next Step →');
  nextBtn.position(200, drawHeight + detailHeight - 36);
  nextBtn.style('font-size', '13px');
  nextBtn.style('padding', '6px 14px');
  nextBtn.style('background', '#2e7d32');
  nextBtn.style('color', 'white');
  nextBtn.style('border', 'none');
  nextBtn.style('border-radius', '4px');
  nextBtn.style('cursor', 'pointer');
  nextBtn.mousePressed(advanceStep);

  describe('PLTW Design Process Cycle — click any step node to learn details; animate the full cycle', LABEL);
}

function toggleAnimation() {
  animRunning = !animRunning;
  animBtn.html(animRunning ? '⏸ Pause' : '▶ Animate Full Cycle');
  if (animRunning) beadAngle = 0;
}

function advanceStep() {
  if (selectedStep < 0) selectedStep = 0;
  else selectedStep = (selectedStep + 1) % 7;
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, detailHeight);

  // Advance animation
  if (animRunning) {
    if (animPause > 0) {
      animPause--;
    } else {
      beadAngle += 0.03;
      if (beadAngle >= 7) beadAngle = 0;
      let nearStep = round(beadAngle) % 7;
      let dist_ = abs(beadAngle - round(beadAngle));
      if (dist_ < 0.04) animPause = 50;
    }
  }

  // Title
  noStroke();
  fill(20, 50, 110);
  textAlign(CENTER, TOP);
  textSize(18);
  text('PLTW Engineering Design Process', canvasWidth / 2, 6);

  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 12;
  let R  = min(cy - 60, cx - 80, 185);

  // Connection ring
  noFill(); stroke(200); strokeWeight(2);
  ellipse(cx, cy, R * 2, R * 2);

  // Directional arrows (clockwise between adjacent steps)
  for (let i = 0; i < 7; i++) {
    let a1 = getAngle(i) + 0.28;
    let a2 = getAngle((i + 1) % 7) - 0.28;
    drawArcArrow(cx, cy, R, a1, a2, color(150), false);
  }

  // Center hub
  noStroke(); fill(40, 60, 100);
  ellipse(cx, cy, 90, 90);
  fill(255); textAlign(CENTER, CENTER); textSize(11);
  text('PLTW\nDesign\nProcess', cx, cy);

  // Step nodes
  for (let i = 0; i < 7; i++) {
    drawStepNode(i, cx, cy, R);
  }

  // Animated bead
  if (animRunning) {
    let ang = getAngle(beadAngle % 7);
    let bx = cx + cos(ang) * R;
    let by = cy + sin(ang) * R;
    noStroke(); fill(255, 220, 0, 150);
    ellipse(bx, by, 22, 22);
    fill(255, 200, 0); ellipse(bx, by, 12, 12);
  }

  // Detail panel
  if (selectedStep >= 0) {
    drawDetailPanel(selectedStep);
  } else {
    noStroke(); fill(150);
    textAlign(CENTER, CENTER); textSize(13);
    text('Click any step to learn its purpose, key questions, and deliverables.', canvasWidth / 2, drawHeight + detailHeight / 2 - 20);
  }

  animBtn.position(10, drawHeight + detailHeight - 36);
  nextBtn.position(200, drawHeight + detailHeight - 36);
}

function getAngle(i) {
  return -HALF_PI + TWO_PI * i / 7;
}

function drawStepNode(i, cx, cy, R) {
  let ang = getAngle(i);
  let nx  = cx + cos(ang) * R;
  let ny  = cy + sin(ang) * R;
  let c   = steps[i].col;
  let isSelected = (selectedStep === i);

  // Glow
  if (isSelected) {
    noStroke();
    fill(c[0], c[1], c[2], 60 + 30 * sin(frameCount * 0.1));
    ellipse(nx, ny, 80, 80);
  }

  // Node circle
  fill(c[0], c[1], c[2]);
  stroke(isSelected ? color(255, 200, 0) : color(255));
  strokeWeight(isSelected ? 2.5 : 1.5);
  ellipse(nx, ny, 64, 64);

  // Step number
  noStroke(); fill(255);
  textAlign(CENTER, CENTER); textSize(10);
  text((i + 1) + '\n' + steps[i].name, nx, ny);
}

function drawArcArrow(cx, cy, R, a1, a2, col_, dashed) {
  stroke(col_);
  strokeWeight(dashed ? 1 : 1.5);
  if (dashed) setLineDash([4, 4]);
  noFill();
  let steps_ = 16;
  beginShape();
  for (let s = 0; s <= steps_; s++) {
    let a = lerp(a1, a2, s / steps_);
    vertex(cx + cos(a) * R, cy + sin(a) * R);
  }
  endShape();
  if (dashed) setLineDash([]);

  // Arrowhead
  let aDir = a2 + HALF_PI;
  let ax = cx + cos(a2) * R;
  let ay = cy + sin(a2) * R;
  fill(col_); noStroke();
  triangle(ax, ay,
    ax + cos(aDir - 0.4) * 8, ay + sin(aDir - 0.4) * 8,
    ax + cos(aDir + 0.4) * 8, ay + sin(aDir + 0.4) * 8);
}

function setLineDash(list) { drawingContext.setLineDash(list); }

function drawDetailPanel(i) {
  let s   = steps[i];
  let col = color(s.col[0], s.col[1], s.col[2]);
  let x   = 12;
  let y   = drawHeight + 10;
  let w   = canvasWidth - 24;

  // Step header
  noStroke();
  fill(s.col[0], s.col[1], s.col[2]);
  textAlign(LEFT, TOP); textSize(15);
  text('Step ' + (i + 1) + ': ' + s.name.replace('\n', ' '), x, y);

  stroke(s.col[0], s.col[1], s.col[2]);
  strokeWeight(1.5);
  line(x, y + 22, x + w, y + 22);

  noStroke(); fill(40);
  textSize(11.5);
  textAlign(LEFT, TOP);

  // Two columns
  let col1W = w * 0.55;
  let col2X = x + col1W + 10;
  let col2W = w - col1W - 12;
  let ry = y + 28;

  // Left: desc + questions
  fill(40);
  text(s.desc, x, ry, col1W);
  ry += 30;

  fill(s.col[0], s.col[1], s.col[2]);
  text('Key questions:', x, ry);
  ry += 14;
  fill(50);
  s.questions.forEach(q => { text('• ' + q, x + 8, ry, col1W - 8); ry += 16; });

  // Right column
  let ry2 = y + 28;
  fill(s.col[0], s.col[1], s.col[2]);
  textAlign(LEFT, TOP);
  text('Deliverables:', col2X, ry2);
  fill(50); ry2 += 14;
  text(s.deliverables, col2X, ry2, col2W);
  ry2 += 32;
  fill(s.col[0], s.col[1], s.col[2]);
  text('AM Context:', col2X, ry2);
  fill(50); ry2 += 14;
  text(s.amNote, col2X, ry2, col2W);
}

function mousePressed() {
  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 12;
  let R  = min(cy - 60, cx - 80, 185);
  for (let i = 0; i < 7; i++) {
    let ang = getAngle(i);
    let nx  = cx + cos(ang) * R;
    let ny  = cy + sin(ang) * R;
    if (dist(mouseX, mouseY, nx, ny) < 36) {
      selectedStep = (selectedStep === i) ? -1 : i;
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
