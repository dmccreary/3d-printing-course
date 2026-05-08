// Non-Manifold Error Types — identify mesh errors that cause slicing failures
// CANVAS_HEIGHT: 580
// Bloom L2: identify open edges, T-junctions, inverted normals, overlapping faces

let containerWidth;
let canvasWidth  = 700;
let drawHeight   = 360;
let detailH      = 220;
let canvasHeight  = drawHeight + detailH;
let containerHeight = canvasHeight;

const ERRORS = [
  {
    name: 'Open Edge',
    col: [50, 110, 200],
    icon: '⟁',
    short: 'Edge shared by only ONE face (boundary gap in the mesh)',
    why: 'The slicer cannot tell whether the region is inside or outside the model. It may skip perimeters, produce hollow voids, or refuse to slice entirely.',
    howSpot: 'Shown as a highlighted edge with no neighboring face. In Meshmixer: Analysis → Inspector shows open boundary loops in red.',
    howFix: 'Fill holes using the Fill tool (Meshmixer Edit → Fill Holes, or PrusaSlicer\'s automatic repair). For large openings, manually bridge across the gap.',
    drawFn: drawOpenEdge
  },
  {
    name: 'T-Junction',
    col: [190, 110, 20],
    icon: '⊤',
    short: 'An edge shared by THREE or more faces (non-manifold edge)',
    why: 'The slicer cannot determine the correct inside/outside topology. It produces unpredictable wall structures — extra shells, missing sections, or corrupt toolpaths.',
    howSpot: 'Often visible as an interior partition or extra internal wall. Most analyzers flag these as "non-manifold edges."',
    howFix: 'Delete the extra face(s) sharing the edge, then fill any resulting hole. In complex cases, re-model the affected region.',
    drawFn: drawTJunction
  },
  {
    name: 'Inverted Normal',
    col: [190, 50, 40],
    icon: '↶',
    short: 'A face whose outward normal points INTO the model instead of out',
    why: 'The slicer treats the face\'s inside as outside. This creates phantom voids, missing shells, or shell/infill confusion — especially in areas adjacent to the flipped face.',
    howSpot: 'Appears as a dark patch in shaded views (the face is lit from the wrong direction). Tools like Meshmixer color these distinctly.',
    howFix: 'Select the offending face and flip its normal (Meshmixer: Edit → Flip Normals on selection). For bulk fixes, use "Make Consistent Normals."',
    drawFn: drawInvertedNormal
  },
  {
    name: 'Overlapping Faces',
    col: [110, 40, 160],
    icon: '⧉',
    short: 'Two or more coplanar faces occupying the same surface area',
    why: 'Duplicate geometry confuses the slicer\'s intersection math, causing z-fighting, doubled wall thickness, extra extrusions, or corrupted layer data.',
    howSpot: 'Hard to spot visually — look for unusually thick walls or repeated triangles in the raw STL data. Analyzers report as "duplicate faces" or "self-intersections."',
    howFix: 'Remove duplicate faces using mesh cleanup tools (Meshmixer: Edit → Remove Duplicates, or MeshLab\'s duplicate face filter).',
    drawFn: drawOverlapping
  }
];

let selectedError = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  describe('Non-Manifold Error Types — click an error card to learn its geometry, why it breaks slicing, and how to fix it', LABEL);
}

function draw() {
  updateCanvasSize();

  fill(244, 247, 252); stroke(210); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill(255); noStroke();
  rect(0, drawHeight, canvasWidth, detailH);

  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('Non-Manifold Error Types', canvasWidth / 2, 7);
  fill(100); textSize(10);
  text('Click a card to learn why each error breaks slicing and how to fix it', canvasWidth / 2, 28);

  // 2×2 grid of error cards
  let cardW = floor(canvasWidth / 2) - 16;
  let cardH = floor((drawHeight - 52) / 2) - 8;
  let positions = [
    [10,         44],
    [10+cardW+12, 44],
    [10,         44 + cardH + 10],
    [10+cardW+12, 44 + cardH + 10],
  ];

  for (let i = 0; i < 4; i++) {
    drawErrorCard(i, positions[i][0], positions[i][1], cardW, cardH);
  }

  // Detail panel
  if (selectedError >= 0) {
    drawDetail(selectedError);
  } else {
    noStroke(); fill(150);
    textAlign(CENTER, CENTER); textSize(12);
    text('Click any error card above to see its geometry, slicing impact, and repair method.',
      canvasWidth / 2, drawHeight + detailH / 2);
  }
}

// ───── error card ─────────────────────────────────────────────────────────────

function drawErrorCard(idx, cx, cy, cw, ch) {
  let e = ERRORS[idx];
  let isSel = selectedError === idx;
  let isHov = mouseX >= cx && mouseX <= cx + cw && mouseY >= cy && mouseY <= cy + ch;

  // Card background
  fill(isSel ? color(e.col[0], e.col[1], e.col[2], 28) : isHov ? 252 : 255);
  stroke(isSel ? color(e.col[0], e.col[1], e.col[2]) : color(205));
  strokeWeight(isSel ? 2.5 : 1);
  rect(cx, cy, cw, ch, 6);

  // Header strip
  fill(e.col[0], e.col[1], e.col[2]); noStroke();
  rect(cx, cy, cw, 30, 6, 6, 0, 0);
  fill(255); textAlign(LEFT, CENTER); textSize(13);
  text(e.name, cx + 10, cy + 15);

  // Mini diagram
  let diagW = floor(cw * 0.42);
  let diagH = ch - 38;
  let diagX = cx + cw - diagW - 6;
  let diagY = cy + 32;

  fill(238, 242, 250); stroke(200); strokeWeight(0.5);
  rect(diagX, diagY, diagW, diagH, 4);

  // Draw the specific error diagram
  e.drawFn(diagX + diagW/2, diagY + diagH/2, diagW * 0.9, diagH * 0.85, e.col);

  // Short description
  noStroke(); fill(40);
  textAlign(LEFT, TOP); textSize(10.5);
  text(e.short, cx + 8, cy + 34, cw - diagW - 18);

  // "Why it breaks" short note
  fill(e.col[0], e.col[1], e.col[2]); textSize(9.5);
  text('Impact on slicing:', cx + 8, cy + 34 + 30);
  fill(70); textSize(9);
  text(e.why.substring(0, 90) + '…', cx + 8, cy + 34 + 43, cw - diagW - 18);
}

// ───── error diagrams ─────────────────────────────────────────────────────────

function drawOpenEdge(cx, cy, w, h, col) {
  let s = min(w, h) * 0.38;
  // Two triangles with a gap between them
  stroke(150); strokeWeight(1); fill(col[0], col[1], col[2], 80);
  triangle(cx - s, cy, cx, cy - s, cx, cy + s);

  // Gap
  stroke(col[0], col[1], col[2]); strokeWeight(2.5);
  line(cx, cy - s, cx, cy + s);

  fill(255, 230, 30); noStroke();
  ellipse(cx, cy, 8, 8);

  noStroke(); fill(col[0], col[1], col[2]);
  textSize(8); textAlign(CENTER, TOP);
  text('open edge', cx, cy + s + 3);
}

function drawTJunction(cx, cy, w, h, col) {
  let s = min(w, h) * 0.36;
  stroke(150); strokeWeight(1); fill(col[0], col[1], col[2], 80);
  // Three faces meeting at one edge
  triangle(cx, cy - s, cx - s, cy + s, cx + s, cy + s);  // base face
  stroke(col[0], col[1], col[2]); strokeWeight(2.5);
  // T-edge in the middle
  line(cx - s, cy, cx + s, cy);

  stroke(150); strokeWeight(1); fill(col[0]+40, col[1]+40, col[2]+40, 100);
  triangle(cx - s, cy, cx + s, cy, cx, cy - s * 1.4); // third face

  fill(255, 50, 50); noStroke();
  ellipse(cx - s, cy, 7, 7);
  ellipse(cx + s, cy, 7, 7);

  noStroke(); fill(col[0], col[1], col[2]);
  textSize(8); textAlign(CENTER, TOP);
  text('3 faces\nat edge', cx, cy + s + 3);
}

function drawInvertedNormal(cx, cy, w, h, col) {
  let s = min(w, h) * 0.36;
  stroke(150); strokeWeight(1);

  // Correct face (light)
  fill(col[0], col[1], col[2], 80);
  triangle(cx - s, cy + s * 0.3, cx, cy - s, cx + s * 0.1, cy + s);
  // Arrow pointing outward (correct)
  stroke(30, 140, 60); strokeWeight(2);
  let mx = (cx - s + cx + cx + s * 0.1) / 3, my = (cy + s * 0.3 + cy - s + cy + s) / 3;
  drawArrow(mx + 18, my - 18, 20, col);

  // Inverted face (dark, next to it)
  fill(col[0] * 0.4, col[1] * 0.4, col[2] * 0.4, 200);
  stroke(col[0], col[1], col[2]);
  triangle(cx + s * 0.2, cy + s * 0.3, cx + s * 1.1, cy - s * 0.5, cx + s * 1.2, cy + s);
  // Arrow pointing inward (wrong)
  stroke(200, 40, 40); strokeWeight(2);
  let mx2 = (cx + s * 0.2 + cx + s * 1.1 + cx + s * 1.2) / 3;
  let my2 = (cy + s * 0.3 + cy - s * 0.5 + cy + s) / 3;
  drawArrow(mx2 - 16, my2 + 16, 20, [200, 40, 40]);

  noStroke(); fill(col[0], col[1], col[2]);
  textSize(8); textAlign(CENTER, TOP);
  text('↓ inward', cx + s * 0.7, cy + s + 3);
}

function drawArrow(ax, ay, len, col) {
  let c = Array.isArray(col) ? color(col[0], col[1], col[2]) : col;
  stroke(c); strokeWeight(2);
  line(ax, ay, ax + len, ay - len);
  fill(c); noStroke();
  let ang = atan2(-len, len);
  triangle(ax + len, ay - len,
    ax + len - cos(ang - 0.5) * 7, ay - len - sin(ang - 0.5) * 7,
    ax + len - cos(ang + 0.5) * 7, ay - len - sin(ang + 0.5) * 7);
}

function drawOverlapping(cx, cy, w, h, col) {
  let s = min(w, h) * 0.38;
  // Two overlapping triangles offset slightly
  stroke(col[0], col[1], col[2]); strokeWeight(1.5);
  fill(col[0], col[1], col[2], 80);
  triangle(cx - s, cy + s, cx, cy - s, cx + s, cy + s);

  fill(col[0], col[1], col[2], 140);
  stroke(255, 80, 80); strokeWeight(1.5);
  triangle(cx - s + 8, cy + s - 4, cx + 8, cy - s - 4, cx + s + 8, cy + s - 4);

  // Overlap indicator
  fill(255, 120, 120, 160); noStroke();
  triangle(cx + s - 12, cy + s, cx + 8, cy - s - 4, cx + s + 8, cy + s - 4);

  noStroke(); fill(col[0], col[1], col[2]);
  textSize(8); textAlign(CENTER, TOP);
  text('duplicate\nfaces', cx, cy + s + 3);
}

// ───── detail panel ──────────────────────────────────────────────────────────

function drawDetail(idx) {
  let e = ERRORS[idx];
  let x = 12, y = drawHeight + 10, w = canvasWidth - 24;

  noStroke(); fill(e.col[0], e.col[1], e.col[2]);
  textAlign(LEFT, TOP); textSize(14);
  text(e.name, x, y);
  stroke(e.col[0], e.col[1], e.col[2]); strokeWeight(1.5);
  line(x, y + 20, x + w, y + 20);

  let col1 = w * 0.50, col2x = x + col1 + 12;
  let col2 = w - col1 - 14;

  noStroke(); fill(e.col[0], e.col[1], e.col[2]); textSize(10.5);
  text('Why it breaks slicing:', x, y + 28);
  fill(40); textSize(10);
  text(e.why, x, y + 42, col1);

  fill(e.col[0], e.col[1], e.col[2]); textSize(10.5);
  text('How to spot it:', col2x, y + 28);
  fill(40); textSize(10);
  text(e.howSpot, col2x, y + 42, col2);

  fill(e.col[0], e.col[1], e.col[2]); textSize(10.5);
  text('How to fix it:', col2x, y + 106);
  fill(40); textSize(10);
  text(e.howFix, col2x, y + 120, col2);
}

function mousePressed() {
  let cardW = floor(canvasWidth / 2) - 16;
  let cardH = floor((drawHeight - 52) / 2) - 8;
  let positions = [
    [10,          44],
    [10+cardW+12, 44],
    [10,          44 + cardH + 10],
    [10+cardW+12, 44 + cardH + 10],
  ];
  for (let i = 0; i < 4; i++) {
    let [cx, cy] = positions[i];
    if (mouseX >= cx && mouseX <= cx + cardW && mouseY >= cy && mouseY <= cy + cardH) {
      selectedError = (selectedError === i) ? -1 : i;
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
