// Support Strategy Decision Flow — FDM support selection flowchart
// CANVAS_HEIGHT: 680
// Bloom L5: evaluate part geometry and recommend appropriate support strategy

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 680;
let containerHeight = canvasHeight;

let selectedNode = 0;   // default: first decision

// Tree layout area (left side)
let treeX, treeY, treeW, treeH;
// Detail panel (right side)
let detX, detY, detW, detH;

const NODES = [
  {
    type: 'decision', fx: 0.50, fy: 0.05,
    lines: ['Does the part have', 'overhanging surfaces?'],
    detail: 'Overhangs are surfaces that extend outward above empty space. In FDM, any surface angled more than 45° from horizontal may need support. Use your slicer\'s overhang preview (often shown in red or orange) to identify problem areas before generating supports.'
  },
  {
    type: 'terminal', fx: 0.14, fy: 0.18,
    lines: ['No Supports', 'Needed'],
    col: [40, 150, 80],
    detail: 'Before printing, rotate the part in your slicer to find the orientation that minimizes overhang area. The slicer\'s "place face on build plate" feature and the overhang preview help identify the optimal orientation.'
  },
  {
    type: 'decision', fx: 0.50, fy: 0.28,
    lines: ['Overhangs steeper', 'than 45° from horizontal?'],
    detail: 'A 45° overhang is the practical self-support limit for most FDM printers. Below 45°, consecutive layers still have enough overlap to stay fused. Above 45°, each layer extends too far past the previous one and sags or curls without support.'
  },
  {
    type: 'terminal', fx: 0.14, fy: 0.41,
    lines: ['Self-Supporting', 'Overhang'],
    col: [40, 150, 80],
    detail: 'FDM printers can typically bridge horizontally for 50–80 mm without supports if bridging speed is reduced and cooling is strong. Bridges over 80 mm benefit from supports or redesign. The slicer may automatically adjust bridging parameters.'
  },
  {
    type: 'decision', fx: 0.50, fy: 0.47,
    lines: ['Is the supported surface', 'visible or functional?'],
    detail: 'Normal supports leave visible marks on the supported surface. If the surface contacts another part, bears load, or is seen by the end user, surface quality matters. Hidden or structural surfaces can tolerate rougher support removal.'
  },
  {
    type: 'terminal', fx: 0.14, fy: 0.60,
    lines: ['Normal', 'Supports'],
    col: [40, 150, 80],
    detail: 'In Cura, enable "Generate Support" and set Support Structure to "Normal". Adjust Support Density (10–20% is standard) and Z Distance (0.15–0.2 mm to help separation). Normal supports are fast to generate and remove quickly.'
  },
  {
    type: 'decision', fx: 0.50, fy: 0.66,
    lines: ['Multi-material printer or', 'soluble filament available?'],
    detail: 'Dissolvable supports (PVA with PLA; HIPS with ABS) require a dual-extrusion printer or a tool changer. They produce the highest surface quality because there is no mechanical peeling — the support material dissolves completely in water or d-limonene.'
  },
  {
    type: 'terminal', fx: 0.86, fy: 0.77,
    lines: ['Dissolvable', 'Interface'],
    col: [40, 130, 190],
    detail: 'PVA dissolves in water and works well with PLA. HIPS dissolves in d-limonene and pairs with ABS. Requires a dual-extrusion printer or tool changer. Produces the cleanest supported surfaces; no peeling, no marks.'
  },
  {
    type: 'decision', fx: 0.50, fy: 0.82,
    lines: ['Complex geometry with many', 'isolated overhang points?'],
    detail: 'Tree (organic) supports work best when overhangs are scattered and isolated — projecting ears, horizontal rods, or sparse bridges. Dense flat overhangs print better with normal support structure, which is faster to generate and easier to remove uniformly.'
  },
  {
    type: 'terminal', fx: 0.14, fy: 0.95,
    lines: ['Tree Supports', 'with Interface'],
    col: [160, 80, 180],
    detail: 'In PrusaSlicer, set Support Style to "Organic". In Cura, set Support Structure to "Tree". Enable Support Interface with 0.2 mm Z gap. Tree supports minimize contact points; the interface layer significantly improves surface quality.'
  },
  {
    type: 'terminal', fx: 0.86, fy: 0.95,
    lines: ['Normal Supports', 'with Interface'],
    col: [160, 80, 180],
    detail: 'Enable Support Interface in Cura\'s Support section. Set Interface Layer Count to 2–4 and Interface Z Distance to 0.15 mm. This alone transforms surface quality on supported overhangs without needing a second material.'
  },
];

const EDGES = [
  { from: 0, to: 1, label: 'No' },
  { from: 0, to: 2, label: 'Yes' },
  { from: 2, to: 3, label: 'No' },
  { from: 2, to: 4, label: 'Yes' },
  { from: 4, to: 5, label: 'No' },
  { from: 4, to: 6, label: 'Yes' },
  { from: 6, to: 7, label: 'Yes' },
  { from: 6, to: 8, label: 'No' },
  { from: 8, to: 9, label: 'Yes' },
  { from: 8, to: 10, label: 'No' },
];

const DW = 56, DH = 26;  // diamond half-dimensions
const RW = 54, RH = 22;  // terminal rect half-dimensions

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  describe('Support Strategy Decision Flow — click any decision node to learn how to choose the right support strategy', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245, 248, 253);

  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('Support Strategy Decision Flow', canvasWidth / 2, 7);

  treeX = 6;
  treeY = 30;
  treeW = floor(canvasWidth * 0.56);
  treeH = canvasHeight - treeY - 10;

  detX  = floor(canvasWidth * 0.58);
  detY  = 30;
  detW  = canvasWidth - detX - 6;
  detH  = treeH;

  drawEdges();
  drawNodes();
  drawDetailPanel();
}

function nx(n) { return treeX + n.fx * treeW; }
function ny(n) { return treeY + n.fy * treeH; }

function drawEdges() {
  EDGES.forEach(e => {
    let a = NODES[e.from], b = NODES[e.to];
    let ax = nx(a), ay = ny(a);
    let bx = nx(b), by = ny(b);

    // Determine exit point from source node
    let exitX = ax, exitY = ay;
    if (a.type === 'decision') {
      // If going left, exit from left diamond point
      if (bx < ax - 10) { exitX = ax - DW; exitY = ay; }
      // If going right, exit from right diamond point
      else if (bx > ax + 10) { exitX = ax + DW; exitY = ay; }
      // If going down, exit from bottom diamond point
      else { exitX = ax; exitY = ay + DH; }
    } else {
      exitY = ay + RH;
    }

    // Entry point into target node
    let entX = bx, entY = by;
    if (b.type === 'decision') {
      // Enter from top
      entX = bx; entY = by - DH;
    } else {
      entX = bx; entY = by - RH;
    }

    // Draw path (corner routing for left/right exits)
    stroke(120, 140, 160); strokeWeight(1.5); noFill();
    if (abs(exitX - entX) > 20 && abs(exitY - entY) > 10) {
      // L-shaped route: horizontal then vertical
      line(exitX, exitY, entX, exitY);
      line(entX, exitY, entX, entY);
    } else {
      line(exitX, exitY, entX, entY);
    }

    // Arrowhead
    fill(120, 140, 160); noStroke();
    let dx = entX - (abs(exitX - entX) > 20 ? entX : exitX);
    let dy = entY - exitY;
    let len = sqrt(dx * dx + dy * dy);
    if (len > 0) {
      let ux = dx / len, uy = dy / len;
      // Arrow tip at entX, entY going in direction (ux, uy)
      if (abs(exitX - entX) > 20) {
        // Vertical approach
        triangle(entX, entY, entX - 5, entY - 9, entX + 5, entY - 9);
      } else {
        triangle(entX, entY, entX - 5*uy - 5*ux, entY + 5*ux - 5*uy, entX + 5*uy - 5*ux, entY - 5*ux - 5*uy);
      }
    }

    // Edge label
    noStroke(); fill(60);
    textSize(9); textAlign(CENTER, CENTER);
    let lx = (exitX + entX) / 2 + (bx < ax - 10 ? -12 : bx > ax + 10 ? 12 : 0);
    let ly = (exitY + entY) / 2;
    text(e.label, lx, ly);
  });
}

function drawNodes() {
  NODES.forEach((n, i) => {
    let x = nx(n), y = ny(n);
    let isSel = selectedNode === i;
    let isHov = isHovered(n, i);

    if (n.type === 'decision') {
      let col = isSel ? [220, 120, 30] : isHov ? [200, 150, 60] : [180, 120, 30];
      fill(col[0], col[1], col[2]);
      stroke(isSel ? [255, 160, 40] : [140, 90, 20]); strokeWeight(isSel ? 2.5 : 1);
      drawDiamond(x, y, DW, DH);
      noStroke(); fill(255);
      textAlign(CENTER, CENTER); textSize(8.5);
      for (let li = 0; li < n.lines.length; li++) {
        text(n.lines[li], x, y + (li - (n.lines.length - 1) / 2) * 11);
      }
    } else {
      let bc = n.col || [40, 150, 80];
      let col = isSel ? bc : isHov ? [bc[0]+20, bc[1]+20, bc[2]+20] : bc;
      fill(col[0], col[1], col[2]);
      stroke(isSel ? [255, 220, 80] : [col[0]-30, col[1]-30, col[2]-30]);
      strokeWeight(isSel ? 2.5 : 1);
      rect(x - RW, y - RH, RW * 2, RH * 2, 6);
      noStroke(); fill(255);
      textAlign(CENTER, CENTER); textSize(8.5);
      for (let li = 0; li < n.lines.length; li++) {
        text(n.lines[li], x, y + (li - (n.lines.length - 1) / 2) * 11);
      }
    }
  });
}

function drawDiamond(x, y, hw, hh) {
  beginShape();
  vertex(x, y - hh);
  vertex(x + hw, y);
  vertex(x, y + hh);
  vertex(x - hw, y);
  endShape(CLOSE);
}

function isHovered(n, i) {
  let x = nx(n), y = ny(n);
  if (n.type === 'decision') {
    return mouseX >= x - DW && mouseX <= x + DW && mouseY >= y - DH && mouseY <= y + DH;
  } else {
    return mouseX >= x - RW && mouseX <= x + RW && mouseY >= y - RH && mouseY <= y + RH;
  }
}

function drawDetailPanel() {
  let n = NODES[selectedNode];
  fill(255); stroke(190); strokeWeight(1);
  rect(detX, detY, detW, detH, 4);

  // Header
  let hcol = n.type === 'decision' ? [180, 120, 30] : (n.col || [40, 150, 80]);
  fill(hcol[0], hcol[1], hcol[2], 220); noStroke();
  rect(detX, detY, detW, 34, 4, 4, 0, 0);
  fill(255); textAlign(LEFT, CENTER); textSize(11);
  let label = n.lines.join(' ');
  text(label, detX + 10, detY + 17, detW - 16);

  // Type badge
  textAlign(RIGHT, CENTER); textSize(9);
  text(n.type === 'decision' ? 'Decision' : 'Recommendation', detX + detW - 8, detY + 17);

  // Body
  noStroke(); fill(40); textAlign(LEFT, TOP); textSize(10.5);
  text(n.detail, detX + 10, detY + 44, detW - 20);

  // Hint
  fill(130); textSize(9); textAlign(CENTER, BOTTOM);
  text('Click any node to explore', detX + detW / 2, detY + detH - 8);

  // Legend
  let ly = detY + detH - 58;
  fill(255); stroke(180); strokeWeight(1);
  rect(detX + 8, ly, detW - 16, 50, 4);
  noStroke();
  fill(180, 120, 30); rect(detX + 14, ly + 8, 14, 14, 2);
  fill(40); textSize(8.5); textAlign(LEFT, CENTER);
  text('Decision question', detX + 34, ly + 15);
  fill(40, 150, 80); rect(detX + 14, ly + 28, 14, 14, 2);
  text('FDM self-support / basic support', detX + 34, ly + 35);
}

function mousePressed() {
  for (let i = 0; i < NODES.length; i++) {
    if (isHovered(NODES[i], i)) { selectedNode = i; return; }
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
