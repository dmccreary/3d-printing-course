// AI in AM Pipeline — horizontal pipeline with AI application nodes
// CANVAS_HEIGHT: 600
// Bloom L4: organize AI applications by pipeline stage and analyze their data flows

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 600;

let selectedNode = -1;
let filterMode   = 0;  // 0=all, 1=monitoring, 2=generative, 3=optimization
let highlightStage = false;
let highlightAnim  = 0;

const STAGES = [
  { label: 'Design',          x: 0.12, col: [60, 120, 220] },
  { label: 'Slicing',         x: 0.37, col: [100, 180, 80] },
  { label: 'Printing',        x: 0.62, col: [200, 130, 30] },
  { label: 'Post-Processing', x: 0.87, col: [150, 60, 180] },
];

const AI_NODES = [
  {
    id: 0, label: 'Text-to-CAD', stage: 0, above: true,
    type: 'generative', col: [40, 120, 220],
    input: 'Natural language description of a part',
    output: 'CAD model or parametric geometry file',
    limit: 'Hallucination risk: dimensions and tolerances may be incorrect; requires expert review.',
    example: 'AutoDesk AI, OnShape AI, PolyHive, CADGPT'
  },
  {
    id: 1, label: 'Material\nRecommender', stage: 0, above: false,
    type: 'optimization', col: [200, 130, 30],
    input: 'Part requirements: load, temperature, chemical exposure, cost',
    output: 'Ranked list of compatible materials with trade-off summary',
    limit: 'Training data may not include niche materials; always verify with datasheet.',
    example: 'Granta Design CES Selector, Ultimaker Material Advisor'
  },
  {
    id: 2, label: 'AI Slicer\nOptimizer', stage: 1, above: true,
    type: 'optimization', col: [200, 130, 30],
    input: 'STL/3MF geometry + desired quality/speed/material settings',
    output: 'Optimized layer-by-layer settings (variable speed, temperature, support placement)',
    limit: 'May over-optimize for one goal (speed) at expense of another (strength).',
    example: 'Bambu AI slicer, Prusa Slicer AI infill, Simplify3D variable settings'
  },
  {
    id: 3, label: 'First-Layer\nVision AI', stage: 2, above: true,
    type: 'monitoring', col: [40, 170, 80],
    input: 'Camera image of first layer while printing',
    output: 'Pass/Fail signal; Z-offset correction recommendation',
    limit: 'Lighting variations cause false positives; requires consistent camera angle.',
    example: 'Bambu Lab first-layer inspection, OrcaSlicer live view integration'
  },
  {
    id: 4, label: 'Spaghetti\nDetection', stage: 2, above: true,
    type: 'monitoring', col: [40, 170, 80],
    input: 'Continuous camera stream during print',
    output: 'Failure alert + optional auto-pause command to printer',
    limit: 'May miss slow or gradual failures; false alarm rate ~5–15% typical.',
    example: 'Obico (formerly The Spaghetti Detective), Bambu AI failure detection'
  },
  {
    id: 5, label: 'Predictive\nMaintenance', stage: 2, above: false,
    type: 'monitoring', col: [40, 170, 80],
    input: 'Motor current, vibration, temperature sensor time series',
    output: 'Predicted time-to-failure for components (nozzle, bearings, fans)',
    limit: 'Requires baseline data from that specific machine; limited training data.',
    example: 'Industrial printers (EOS, Stratasys) have built-in predictive systems'
  },
  {
    id: 6, label: 'Defect\nClassification', stage: 2, above: false,
    type: 'monitoring', col: [40, 170, 80],
    input: 'Images of finished layer or failed print',
    output: 'Defect type label (stringing, under-extrusion, warping, etc.) + cause',
    limit: 'Trained on limited defect libraries; rare defect types may be misclassified.',
    example: 'Obico defect history, MakerOS AI quality review'
  },
  {
    id: 7, label: 'Dimensional\nAI Inspection', stage: 3, above: true,
    type: 'monitoring', col: [40, 170, 80],
    input: '3D scan point cloud of finished part',
    output: 'Deviation map vs. CAD model; pass/fail per tolerance zone',
    limit: 'Scan resolution limits detection of < 0.05mm deviations without high-end hardware.',
    example: 'Hexagon MI, GOM Atos 3D, Keyence AI CMM systems'
  },
];

const TYPE_COLS = {
  generative:   [40, 120, 220],
  monitoring:   [40, 170, 80],
  optimization: [200, 130, 30],
};
const TYPE_LABELS = { generative: 'Generative AI', monitoring: 'Monitoring/Detection', optimization: 'Optimization AI' };

let pipelineY, pipelineH;
let nodePositions = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('AI in AM Pipeline — click any AI application node to see data inputs, outputs, and limitations', LABEL);
  textFont('sans-serif');
}

function computeLayout() {
  let detW = (selectedNode >= 0) ? min(230, canvasWidth * 0.29) : 0;
  let pipeW = canvasWidth - detW - (detW > 0 ? 4 : 0);
  pipelineY = canvasHeight * 0.48;
  pipelineH = 38;

  nodePositions = AI_NODES.map(n => {
    let stageX = pipeW * STAGES[n.stage].x;
    let ny     = n.above ? pipelineY - 100 : pipelineY + pipelineH + 68;
    return { x: stageX, y: ny, w: 90, h: 42 };
  });
}

function draw() {
  updateCanvasSize();
  computeLayout();
  background(238, 244, 252);

  let detW = (selectedNode >= 0) ? min(230, canvasWidth * 0.29) : 0;
  let pipeW = canvasWidth - detW - (detW > 0 ? 4 : 0);

  noStroke(); fill(18, 48, 110);
  textAlign(CENTER, TOP); textSize(17); textStyle(BOLD);
  text('AI Applications in the AM Pipeline', pipeW / 2, 6);
  textStyle(NORMAL);

  drawFilterButtons(pipeW);
  drawHighlightButton(pipeW);
  drawPipeline(pipeW);
  drawNodes(pipeW);
  if (selectedNode >= 0) drawDetailPanel(pipeW + 2, detW);

  if (highlightStage) {
    highlightAnim = min(highlightAnim + 1, 60);
    drawHighlightOverlay(pipeW);
  } else {
    highlightAnim = 0;
  }
}

function drawFilterButtons(pipeW) {
  let labels = ['All', 'Monitoring', 'Generative', 'Optimization'];
  let cols2  = [[100, 110, 120], [40, 170, 80], [40, 120, 220], [200, 130, 30]];
  let bw = 90, bh = 20, gap = 4, startX = pipeW - (bw + gap) * 4 + gap;
  labels.forEach((lbl, i) => {
    let bx = startX + i * (bw + gap);
    let active = filterMode === i;
    fill(active ? color(cols2[i][0], cols2[i][1], cols2[i][2]) : color(215, 225, 245));
    stroke(active ? color(cols2[i][0] * 0.7, cols2[i][1] * 0.7, cols2[i][2] * 0.7) : color(160, 175, 210));
    strokeWeight(1); rect(bx, 32, bw, bh, 3);
    noStroke(); fill(active ? 255 : 50); textAlign(CENTER, CENTER); textSize(9.5);
    text(lbl, bx + bw / 2, 32 + bh / 2);
  });
}

function drawHighlightButton(pipeW) {
  let bx = 8, by = 32, bw = 165, bh = 20;
  fill(highlightStage ? color(20,80,200) : color(215, 225, 248));
  stroke(highlightStage ? color(10,50,160) : color(155, 170, 210));
  strokeWeight(1); rect(bx, by, bw, bh, 3);
  noStroke(); fill(highlightStage ? 255 : 50); textAlign(CENTER, CENTER); textSize(9.5);
  text('★ Most AI-Intensive Stage?', bx + bw / 2, by + bh / 2);
}

function drawPipeline(pipeW) {
  let py = pipelineY, ph = pipelineH;
  let margin = 20;

  // Pipeline bar
  fill(235, 240, 250); stroke(180, 195, 225); strokeWeight(1.5);
  rect(margin, py, pipeW - margin * 2, ph, 5);

  // Stage sections
  STAGES.forEach((st, si) => {
    let sx = pipeW * st.x;
    let sw = min(pipeW * 0.22, 120);
    fill(st.col[0], st.col[1], st.col[2], 220); noStroke();
    rect(sx - sw / 2, py, sw, ph, 3);
    fill(255); textAlign(CENTER, CENTER); textSize(11); textStyle(BOLD);
    text(st.label, sx, py + ph / 2);
    textStyle(NORMAL);

    // Arrow between stages
    if (si < STAGES.length - 1) {
      let nx = pipeW * STAGES[si + 1].x;
      fill(160, 175, 200); noStroke();
      let ax = sx + sw / 2 + 4, ay = py + ph / 2;
      triangle(ax, ay - 7, ax, ay + 7, ax + 12, ay);
    }
  });
}

function drawNodes(pipeW) {
  AI_NODES.forEach((node, ni) => {
    let pos   = nodePositions[ni];
    let isSel = selectedNode === ni;
    let hov   = mouseX >= pos.x - pos.w / 2 && mouseX <= pos.x + pos.w / 2 &&
                mouseY >= pos.y - pos.h / 2 && mouseY <= pos.y + pos.h / 2;
    let nc    = TYPE_COLS[node.type];

    // Filter dimming
    let typeMatch = filterMode === 0 ||
      (filterMode === 1 && node.type === 'monitoring') ||
      (filterMode === 2 && node.type === 'generative') ||
      (filterMode === 3 && node.type === 'optimization');
    let alpha = typeMatch ? (isSel || hov ? 230 : 170) : 40;

    // Connector line
    let stageX = pipeW * STAGES[node.stage].x;
    stroke(nc[0], nc[1], nc[2], alpha * 0.8); strokeWeight(1.5); noFill();
    let connY = node.above ? pipelineY : pipelineY + pipelineH;
    line(pos.x, pos.y + (node.above ? pos.h / 2 : -pos.h / 2), stageX, connY);

    // Node box
    fill(nc[0], nc[1], nc[2], alpha);
    stroke(nc[0] * 0.7, nc[1] * 0.7, nc[2] * 0.7, alpha);
    strokeWeight(isSel ? 2.5 : 1.5);
    rect(pos.x - pos.w / 2, pos.y - pos.h / 2, pos.w, pos.h, 5);

    // Label
    noStroke(); fill(255, 255, 255, alpha > 100 ? 230 : 60);
    textAlign(CENTER, CENTER); textSize(9.5); textStyle(BOLD);
    text(node.label, pos.x, pos.y, pos.w - 6);
    textStyle(NORMAL);
  });
}

function drawDetailPanel(px, pw) {
  if (selectedNode < 0) return;
  let node = AI_NODES[selectedNode];
  let nc   = TYPE_COLS[node.type];
  let py   = 56, ph = canvasHeight - 62;

  fill(255, 254, 250); stroke(185, 200, 225); strokeWeight(1);
  rect(px, py, pw, ph, 5);

  fill(nc[0], nc[1], nc[2]); noStroke(); rect(px, py, pw, 40, 5, 5, 0, 0);
  fill(255); textAlign(LEFT, CENTER); textSize(11); textStyle(BOLD);
  text(node.label.replace('\n', ' '), px + 8, py + 20, pw - 16);
  textStyle(NORMAL);

  let ty = py + 50;
  let sections = [
    ['Data Input:', node.input],
    ['AI Output:', node.output],
    ['Limitation:', node.limit],
    ['Real Example:', node.example],
  ];
  let sectionCols = [[50,90,180], [40,150,70], [180,70,50], [80,80,120]];

  sections.forEach(([lbl, val], i) => {
    fill(sectionCols[i][0], sectionCols[i][1], sectionCols[i][2]); noStroke();
    textAlign(LEFT, TOP); textSize(10); textStyle(BOLD);
    text(lbl, px + 8, ty);
    textStyle(NORMAL); fill(40); textSize(9.5);
    text(val, px + 8, ty + 14, pw - 16);
    ty += 50;
  });

  // Type badge
  fill(nc[0], nc[1], nc[2], 30); noStroke();
  rect(px + 6, canvasHeight - 50, pw - 12, 22, 3);
  fill(nc[0], nc[1], nc[2]); textAlign(CENTER, CENTER); textSize(9.5);
  text('Type: ' + TYPE_LABELS[node.type], px + pw / 2, canvasHeight - 39);
}

function drawHighlightOverlay(pipeW) {
  let st = STAGES[2];  // Printing stage
  let sx = pipeW * st.x;
  let sw2 = pipeW * 0.25;
  let alpha = min(highlightAnim * 4, 140);

  fill(200, 130, 30, alpha); noStroke();
  rect(sx - sw2 / 2 - 10, 56, sw2 + 20, canvasHeight - 62, 5);

  noStroke(); fill(160, 90, 10, alpha > 100 ? 200 : alpha);
  textAlign(CENTER, CENTER); textSize(12); textStyle(BOLD);
  text('Most AI-Intensive\nStage: PRINTING', sx, canvasHeight * 0.25, sw2);
  textStyle(NORMAL); textSize(9.5);
  text('4 of 8 AI applications operate\nduring active printing.', sx, canvasHeight * 0.35, sw2);
}

function mousePressed() {
  // Filter buttons
  let pipeW2 = canvasWidth - (selectedNode >= 0 ? min(230, canvasWidth * 0.29) : 0) - 4;
  let bw = 90, bh = 20, gap = 4, startX = pipeW2 - (bw + gap) * 4 + gap;
  for (let i = 0; i < 4; i++) {
    let bx = startX + i * (bw + gap);
    if (mouseX >= bx && mouseX <= bx + bw && mouseY >= 32 && mouseY <= 52) {
      filterMode = i; return;
    }
  }

  // Highlight button
  if (mouseX >= 8 && mouseX <= 173 && mouseY >= 32 && mouseY <= 52) {
    highlightStage = !highlightStage; return;
  }

  // Node clicks
  let clicked = false;
  AI_NODES.forEach((_, ni) => {
    let pos = nodePositions[ni];
    if (mouseX >= pos.x - pos.w / 2 && mouseX <= pos.x + pos.w / 2 &&
        mouseY >= pos.y - pos.h / 2 && mouseY <= pos.y + pos.h / 2) {
      selectedNode = (selectedNode === ni) ? -1 : ni;
      clicked = true;
    }
  });
  if (!clicked) selectedNode = -1;
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
