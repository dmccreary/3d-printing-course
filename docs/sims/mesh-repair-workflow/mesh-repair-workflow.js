// Mesh Repair Workflow — step-through flowchart for STL repair
// CANVAS_HEIGHT: 600
// Bloom L3: apply the correct repair strategy for each error type

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 600;
let containerHeight = canvasHeight;

// Workflow nodes: type = 'step' | 'decision' | 'terminal'
const NODES = [
  { id:0, type:'terminal', label:'Import STL\ninto Repair Tool',  col:[60,120,200],  x:0.50, y:0.09,
    detail:'Open the STL in a tool like Meshmixer, PrusaSlicer, or Netfabb. The first step is always to load and visually inspect the file before running any automated analysis.' },
  { id:1, type:'step',     label:'Run Mesh\nAnalyzer',            col:[60,120,200],  x:0.50, y:0.18,
    detail:'Use the analysis tool (Analysis → Inspector in Meshmixer, or the built-in repair checker in PrusaSlicer) to identify: open edges, non-manifold edges, inverted normals, self-intersections, and degenerate faces.' },
  { id:2, type:'decision', label:'Errors\nFound?',                col:[200,130,20],  x:0.50, y:0.31,
    detail:'If the analyzer reports zero errors, the mesh is already valid. If errors are found, you must repair them before the slicer can generate correct toolpaths.' },
  { id:3, type:'terminal', label:'Export for\nSlicing ✓',         col:[30,150,60],   x:0.82, y:0.31,
    detail:'No errors found — the model is manifold, watertight, and ready for slicing. Export as STL or 3MF.' },
  { id:4, type:'step',     label:'Run\nAuto-Repair',              col:[60,120,200],  x:0.50, y:0.44,
    detail:'Most tools offer one-click auto-repair. This fills holes, removes duplicate faces, and fixes winding order automatically. Works well for simple models with few errors.' },
  { id:5, type:'decision', label:'All Errors\nFixed?',            col:[200,130,20],  x:0.50, y:0.57,
    detail:'Re-run the analyzer after auto-repair. If all errors are resolved, proceed to final inspection. Complex models may still have issues that require manual intervention.' },
  { id:6, type:'step',     label:'Manual\nRepair',                col:[180,70,40],   x:0.18, y:0.57,
    detail:'For stubborn errors: select and delete problem faces, manually fill holes with the bridge/fill tool, flip inverted normals face-by-face, or re-mesh problematic regions. This is slower but handles complex geometry.' },
  { id:7, type:'step',     label:'Final\nInspection',             col:[60,120,200],  x:0.50, y:0.70,
    detail:'Do a final visual review: rotate the model in all directions, check for thin walls below minimum printable thickness, verify the model sits on the build plate correctly, and confirm no stray geometry remains.' },
  { id:8, type:'terminal', label:'Export for\nSlicing ✓',         col:[30,150,60],   x:0.50, y:0.84,
    detail:'The model is repaired and verified. Export as STL or 3MF. For multi-material or multi-part models, prefer 3MF to preserve all metadata.' },
];

// Edges: [from, to, label]
const EDGES = [
  [0, 1, ''],
  [1, 2, ''],
  [2, 3, 'No'],
  [2, 4, 'Yes'],
  [4, 5, ''],
  [5, 7, 'Yes'],
  [5, 6, 'No'],
  [6, 4, ''],   // loop back
  [7, 8, ''],
];

let selectedNode = -1;
let animStep = -1;  // for step-through
let stepBtn, resetBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  stepBtn = createButton('Next Step →');
  stepBtn.style('font-size', '12px');
  stepBtn.style('padding', '5px 14px');
  stepBtn.style('background', '#1565C0');
  stepBtn.style('color', 'white');
  stepBtn.style('border', 'none');
  stepBtn.style('border-radius', '4px');
  stepBtn.style('cursor', 'pointer');
  stepBtn.mousePressed(() => { animStep = (animStep + 1) % NODES.length; selectedNode = animStep; });

  resetBtn = createButton('↺ Reset');
  resetBtn.style('font-size', '12px');
  resetBtn.style('padding', '5px 12px');
  resetBtn.style('background', '#e53935');
  resetBtn.style('color', 'white');
  resetBtn.style('border', 'none');
  resetBtn.style('border-radius', '4px');
  resetBtn.style('cursor', 'pointer');
  resetBtn.mousePressed(() => { animStep = -1; selectedNode = -1; });

  describe('Mesh Repair Workflow — click Next Step to walk through the repair process, or click any node to learn about that step', LABEL);
}

function draw() {
  updateCanvasSize();
  background(246, 248, 252);

  // Title
  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('Mesh Repair Workflow', canvasWidth / 2, 8);
  fill(100); textSize(10);
  text('Click a step to learn its purpose — or use Next Step to walk through the process', canvasWidth / 2, 26);

  // Draw edges first (behind nodes)
  drawEdges();

  // Draw nodes
  NODES.forEach((n, i) => drawNode(n, i));

  // Info panel
  if (selectedNode >= 0) {
    drawInfoBanner(selectedNode);
  }

  // Button positions
  stepBtn.position(10, canvasHeight - 38);
  resetBtn.position(166, canvasHeight - 38);
}

// ───── layout helpers ─────────────────────────────────────────────────────────

function nx(n) { return n.x * canvasWidth; }
function ny(n) { return n.y * canvasHeight; }

function drawEdges() {
  EDGES.forEach(([from, to, lbl]) => {
    let a = NODES[from], b = NODES[to];
    let ax = nx(a), ay = ny(a);
    let bx = nx(b), by = ny(b);

    let isActive = (selectedNode === from || selectedNode === to) ||
                   (animStep >= 0 && from <= animStep && to <= animStep + 1);

    stroke(isActive ? color(60, 120, 220) : color(180));
    strokeWeight(isActive ? 2 : 1.2);
    setLineDash(isActive ? [] : [5,4]);

    // Simple elbow for the loop-back edge (6→4)
    if (from === 6 && to === 4) {
      let mx = canvasWidth * 0.05;
      line(ax, ay, mx, ay);
      line(mx, ay, mx, ny(NODES[4]));
      line(mx, ny(NODES[4]), bx, ny(NODES[4]));
      // Arrowhead
      drawArrow(bx, ny(NODES[4]), bx + 1, ny(NODES[4]) - 1, isActive);
      if (lbl) drawEdgeLabel(ax + (mx - ax)/2, ay, lbl);
    } else {
      line(ax, ay, bx, by);
      drawArrow(bx, by, bx, by + 1, isActive);
      if (lbl) drawEdgeLabel((ax + bx)/2 + 10, (ay + by)/2, lbl);
    }
    setLineDash([]);
  });
}

function drawArrow(tx, ty, dx, dy, active) {
  let ang = atan2(ty - dy, tx - dx);
  fill(active ? color(60, 120, 220) : color(180));
  noStroke();
  triangle(tx, ty,
    tx - cos(ang - 0.5) * 8, ty - sin(ang - 0.5) * 8,
    tx - cos(ang + 0.5) * 8, ty - sin(ang + 0.5) * 8);
}

function drawEdgeLabel(x, y, lbl) {
  fill(220, 120, 20); noStroke();
  textAlign(CENTER, CENTER); textSize(10);
  text(lbl, x, y);
}

function drawNode(n, i) {
  let x = nx(n), y = ny(n);
  let isSel = selectedNode === i;
  let isAnim = animStep === i;
  let c = n.col;

  let nw, nh;
  if (n.type === 'decision') {
    nw = 90; nh = 38;
  } else if (n.type === 'terminal') {
    nw = 110; nh = 34;
  } else {
    nw = 105; nh = 34;
  }

  // Glow
  if (isSel || isAnim) {
    fill(c[0], c[1], c[2], 40 + 20 * sin(frameCount * 0.08));
    noStroke();
    if (n.type === 'decision') drawDiamond(x, y, nw + 18, nh + 14);
    else rect(x - nw/2 - 8, y - nh/2 - 8, nw + 16, nh + 16, 8);
  }

  // Node shape
  fill(c[0], c[1], c[2]);
  stroke(isSel ? color(255, 200, 0) : color(60, 60, 80));
  strokeWeight(isSel ? 2.5 : 1);

  if (n.type === 'decision') {
    drawDiamond(x, y, nw, nh);
  } else if (n.type === 'terminal') {
    rect(x - nw/2, y - nh/2, nw, nh, 17); // pill shape
  } else {
    rect(x - nw/2, y - nh/2, nw, nh, 6);
  }

  // Label
  noStroke(); fill(255);
  textAlign(CENTER, CENTER); textSize(10);
  text(n.label, x, y);
}

function drawDiamond(cx, cy, w, h) {
  beginShape();
  vertex(cx, cy - h/2);
  vertex(cx + w/2, cy);
  vertex(cx, cy + h/2);
  vertex(cx - w/2, cy);
  endShape(CLOSE);
}

function drawInfoBanner(i) {
  let n = NODES[i];
  let c = n.col;
  let bh = 62;
  let by = canvasHeight - bh - 44;

  fill(255, 255, 255, 240); stroke(c[0], c[1], c[2]); strokeWeight(1.5);
  rect(8, by, canvasWidth - 16, bh, 4);

  noStroke(); fill(c[0], c[1], c[2]);
  textAlign(LEFT, TOP); textSize(12);
  text(n.label.replace('\n', ' '), 16, by + 6);

  fill(40); textSize(10.5);
  text(n.detail, 16, by + 22, canvasWidth - 32);
}

function mousePressed() {
  NODES.forEach((n, i) => {
    let x = nx(n), y = ny(n);
    let hw = n.type === 'decision' ? 46 : 56;
    let hh = n.type === 'decision' ? 22 : 18;
    if (abs(mouseX - x) < hw && abs(mouseY - y) < hh) {
      selectedNode = (selectedNode === i) ? -1 : i;
    }
  });
}

function setLineDash(list) { drawingContext.setLineDash(list); }

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
