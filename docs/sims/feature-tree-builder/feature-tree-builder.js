// Feature Tree Builder — parametric CAD feature sequencing
// CANVAS_HEIGHT: 560
// Bloom L3-L4: apply feature operations; analyze how tree order affects geometry

let containerWidth;
let canvasWidth = 700;
let drawHeight  = 480;
let controlH    = 80;
let canvasHeight = drawHeight + controlH;
let containerHeight = canvasHeight;

const FTYPE = [
  { type:'cut',     label:'Extrude Cut',  col:[200,80,60],   defaultParams:{ nx:0.28, ny:0.35, r:12 } },
  { type:'fillet',  label:'Fillet',       col:[60,160,120],  defaultParams:{ radius:10 } },
  { type:'shell',   label:'Shell',        col:[180,120,40],  defaultParams:{ thickness:4 } },
  { type:'pattern', label:'Lin. Pattern', col:[140,60,180],  defaultParams:{ count:3, spacing:0.23 } }
];

let features = [
  { type:'boss', label:'Extrude Boss', fixed:true, col:[70,120,195],
    params:{ w:100, h:64, d:52 } }
];

const TARGET = [
  { type:'boss',   label:'Extrude Boss', col:[70,120,195], params:{ w:100,h:64,d:52 } },
  { type:'cut',    label:'Extrude Cut',  col:[200,80,60],  params:{ nx:0.25, ny:0.35, r:12 } },
  { type:'cut',    label:'Extrude Cut',  col:[200,80,60],  params:{ nx:0.70, ny:0.35, r:12 } },
  { type:'fillet', label:'Fillet',       col:[60,160,120], params:{ radius:10 } }
];

let selectedFeature = 0;
let compareMode = false;
let errorSet = new Set();
let addSel;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  addSel = createSelect();
  addSel.option('+ Add Feature…', '');
  FTYPE.forEach(f => addSel.option(f.label, f.type));
  addSel.changed(onAdd);
  addSel.style('font-size', '12px');
  addSel.style('padding', '3px 6px');

  describe('Feature Tree Builder — add and reorder CAD features to match the target bracket', LABEL);
}

function onAdd() {
  let val = addSel.value();
  if (!val) return;
  let ft = FTYPE.find(f => f.type === val);
  if (!ft) { addSel.selected(''); return; }
  features.push({ type:val, label:ft.label, fixed:false, col:ft.col,
    params: Object.assign({}, ft.defaultParams) });
  selectedFeature = features.length - 1;
  validateTree();
  addSel.selected('');
}

function validateTree() {
  errorSet.clear();
  let cutIdx = features.findLastIndex(f => f.type === 'cut');
  features.forEach((f, i) => {
    if (f.type === 'fillet' && cutIdx >= 0 && i < cutIdx) errorSet.add(i);
  });
}

// ───── draw ──────────────────────────────────────────────────────────────────

function draw() {
  updateCanvasSize();
  background(238, 242, 248);

  let treeW = constrain(floor(canvasWidth * 0.36), 200, 270);
  let viewX = treeW + 4;

  // Panels
  fill(246, 248, 252); stroke(200); strokeWeight(1);
  rect(0, 0, treeW, drawHeight);
  fill(255); stroke(200);
  rect(viewX, 0, canvasWidth - viewX, drawHeight);
  fill(230, 234, 240); noStroke();
  rect(0, drawHeight, canvasWidth, controlH);

  // Title
  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(16);
  text('Feature Tree Builder', canvasWidth / 2, 6);

  drawFeatureTree(treeW);
  drawPartView(viewX, canvasWidth - viewX);
  drawControls(treeW);

  addSel.position(8, drawHeight + 8);
  addSel.style('width', (treeW - 16) + 'px');
}

// ───── feature tree panel ────────────────────────────────────────────────────

function drawFeatureTree(tw) {
  let x = 8, y = 30;
  noStroke(); fill(50); textAlign(LEFT, TOP); textSize(12);
  text('Feature Tree', x, y);
  stroke(190); strokeWeight(1);
  line(x, y + 16, tw - 4, y + 16);
  y += 24;

  features.forEach((f, i) => {
    let rowH = 34;
    let hasErr = errorSet.has(i);
    let isSel = selectedFeature === i;

    if (isSel) { fill(215, 230, 255); noStroke(); rect(x - 4, y - 2, tw - 8, rowH, 3); }
    if (hasErr) { fill(255, 228, 228); noStroke(); rect(x - 4, y - 2, tw - 8, rowH, 3); }

    // Swatch
    fill(f.col[0], f.col[1], f.col[2]); noStroke();
    rect(x, y + 7, 11, 11, 2);

    // Name
    fill(hasErr ? color(170,30,30) : color(25));
    textSize(11); textAlign(LEFT, TOP);
    text(f.label + (f.fixed ? ' ✦' : '') + (hasErr ? ' ⚠' : ''), x + 15, y + 2);

    // Param hint
    fill(140); textSize(9);
    text(paramHint(f), x + 15, y + 17);

    if (!f.fixed) {
      let br = tw - 8;
      treeBtn(br - 14, y + 8, '×', [200,60,60]);
      if (i > 1) treeBtn(br - 30, y + 8, '↑', [70,120,200]);
      if (i < features.length - 1) treeBtn(br - 46, y + 8, '↓', [70,120,200]);
    }
    y += rowH + 2;
  });
}

function treeBtn(bx, by, lbl, col) {
  fill(col[0], col[1], col[2], 200); stroke(col[0], col[1], col[2]); strokeWeight(1);
  rect(bx, by, 14, 14, 2);
  noStroke(); fill(255); textAlign(CENTER, CENTER); textSize(9);
  text(lbl, bx + 7, by + 7);
}

function paramHint(f) {
  if (f.type === 'boss')    return `${f.params.w}×${f.params.h}×${f.params.d}`;
  if (f.type === 'cut')     return `r=${f.params.r}  pos(${nf(f.params.nx,1,2)},${nf(f.params.ny,1,2)})`;
  if (f.type === 'fillet')  return `radius=${f.params.radius}`;
  if (f.type === 'shell')   return `thickness=${f.params.thickness}`;
  if (f.type === 'pattern') return `×${f.params.count}  step=${f.params.spacing}`;
  return '';
}

// ───── 3D part view panel ────────────────────────────────────────────────────

function drawPartView(vx, vw) {
  noStroke(); fill(50); textAlign(LEFT, TOP); textSize(11);
  text(compareMode ? 'Your Part  |  Target Part' : 'Current Part', vx + 8, 8);

  let vy = 26, vh = drawHeight - vy - 10;

  if (compareMode) {
    let hw = floor(vw / 2) - 8;
    drawPart(features, vx + 4,      vy, hw, vh, [70,120,195], 'Your Part');
    drawPart(TARGET,   vx + hw + 12, vy, hw, vh, [55,155,85],  'Target');
  } else {
    drawPart(features, vx + 4, vy, vw - 8, vh, [70,120,195], null);
    drawTargetThumb(vx + vw - 92, vy + 4);
  }
}

function drawPart(flist, px, py, pw, ph, baseCol, caption) {
  let sc = min(pw * 0.55, ph * 0.55) / 100;
  let W = 100*sc, H = 64*sc, D = 52*sc;
  let dX = D * 0.6, dY = D * 0.35;

  let ox = px + pw/2 - (W + dX)/2;
  let oy = py + ph/2 + H/2;

  let r = baseCol[0], g = baseCol[1], b = baseCol[2];
  let hasShell   = flist.some(f => f.type === 'shell');
  let hasFillet  = flist.some(f => f.type === 'fillet');
  let hasPattern = flist.some(f => f.type === 'pattern');

  // Front face
  fill(r, g, b); stroke(50); strokeWeight(1);
  quad(ox, oy,  ox+W, oy,  ox+W, oy-H,  ox, oy-H);

  // Top face
  fill(min(r*1.15,255), min(g*1.15,255), min(b*1.15,255));
  quad(ox, oy-H,  ox+dX, oy-H-dY,  ox+W+dX, oy-H-dY,  ox+W, oy-H);

  // Right face
  fill(r*0.70, g*0.70, b*0.70);
  quad(ox+W, oy,  ox+W+dX, oy-dY,  ox+W+dX, oy-H-dY,  ox+W, oy-H);

  // Shell: hollow top
  if (hasShell) {
    let t = 5*sc;
    fill(20, 20, 28, 210); noStroke();
    quad(ox+t, oy-H+t*0.4,  ox+dX+t, oy-H-dY+t*0.4,
         ox+W+dX-t, oy-H-dY+t*0.4,  ox+W-t, oy-H+t*0.4);
  }

  // Fillet: bright edge lines on vertical corners
  if (hasFillet) {
    let lc = color(min(r*1.5,255), min(g*1.5,255), min(b*1.5,255));
    stroke(lc); strokeWeight(2.5); noFill();
    let fi = 5*sc;
    line(ox+fi, oy, ox+fi, oy-H);
    line(ox+W-fi, oy, ox+W-fi, oy-H);
  }

  // Cut features: holes on top face
  flist.filter(f => f.type === 'cut').forEach(f => {
    let nx = f.params.nx, ny = f.params.ny, rr = f.params.r * sc;
    let hx = ox + nx*W + ny*dX;
    let hy = (oy-H) - ny*dY;
    fill(18, 18, 22); stroke(0); strokeWeight(0.5);
    ellipse(hx, hy, rr*2.5, rr*1.2);
    stroke(35, 35, 40); strokeWeight(0.8);
    let depth = min(H*0.75, rr*1.6);
    line(hx - rr*1.15, hy, hx - rr*1.15, hy + depth);
    line(hx + rr*1.15, hy, hx + rr*1.15, hy + depth);
  });

  // Linear pattern: dashed grid lines on top
  if (hasPattern) {
    let pf = flist.find(f => f.type === 'pattern');
    for (let pi = 1; pi < pf.params.count; pi++) {
      let nx = 0.15 + pi * pf.params.spacing;
      if (nx > 0.92) continue;
      let px_ = ox + nx*W, py_ = oy-H;
      stroke(210, 170, 30, 180); strokeWeight(1.2);
      setLineDash([3,3]);
      line(px_, py_, px_ + dX*0.6, py_ - dY*0.6);
      setLineDash([]);
    }
  }

  // Caption
  if (caption) {
    noStroke(); fill(70); textAlign(CENTER, TOP); textSize(10);
    text(caption, px + pw/2, py + ph - 12);
  }
}

function drawTargetThumb(tx, ty) {
  let tw = 85, th = 66;
  fill(240,250,242); stroke(90,150,90); strokeWeight(1);
  rect(tx, ty, tw, th, 4);

  noStroke(); fill(60,130,60);
  textAlign(CENTER, TOP); textSize(8);
  text('TARGET', tx + tw/2, ty + 3);

  let sc = 0.30;
  let W = 100*sc, H = 64*sc, D = 52*sc;
  let dX = D*0.6, dY = D*0.35;
  let ox = tx + 5, oy = ty + th - 6;

  fill(55,155,85); stroke(40); strokeWeight(0.5);
  quad(ox, oy, ox+W, oy, ox+W, oy-H, ox, oy-H);
  fill(70,185,105);
  quad(ox, oy-H, ox+dX, oy-H-dY, ox+W+dX, oy-H-dY, ox+W, oy-H);
  fill(35,115,60);
  quad(ox+W, oy, ox+W+dX, oy-dY, ox+W+dX, oy-H-dY, ox+W, oy-H);

  [[0.25,0.35],[0.70,0.35]].forEach(([nx,ny]) => {
    let rr = 12*sc;
    let hx = ox + nx*W + ny*dX;
    let hy = (oy-H) - ny*dY;
    fill(18,18,22); noStroke();
    ellipse(hx, hy, rr*2.5, rr*1.2);
  });
}

// ───── controls ──────────────────────────────────────────────────────────────

function drawControls(treeW) {
  noStroke(); fill(80);
  textSize(11); textAlign(LEFT, TOP);
  text('Add feature:', 8, drawHeight + 10);

  let cbx = treeW + 10;
  let cbc = compareMode ? [30,120,40] : [55,100,175];
  fill(cbc[0],cbc[1],cbc[2]); stroke(cbc[0],cbc[1],cbc[2]); strokeWeight(1);
  rect(cbx, drawHeight + 8, 138, 26, 4);
  noStroke(); fill(255); textSize(11); textAlign(CENTER, CENTER);
  text(compareMode ? '✕ Close Compare' : '⇌ Compare to Target', cbx + 69, drawHeight + 21);

  if (errorSet.size > 0) {
    noStroke(); fill(175,30,30);
    textSize(10); textAlign(LEFT, TOP);
    text('⚠ Rebuild error: fillet is before a cut — move fillet below cuts.', cbx, drawHeight + 44);
  } else if (features.length > 1) {
    noStroke(); fill(30,120,40);
    textSize(10); textAlign(LEFT, TOP);
    text('✓ Tree valid — ' + features.length + ' features applied.', cbx, drawHeight + 44);
  }
}

// ───── interaction ────────────────────────────────────────────────────────────

function mousePressed() {
  let treeW = constrain(floor(canvasWidth * 0.36), 200, 270);
  let x = 8, y = 54;

  for (let i = 0; i < features.length; i++) {
    let rowH = 36;
    if (mouseX > x - 4 && mouseX < treeW - 4 && mouseY > y - 2 && mouseY < y + rowH) {
      selectedFeature = i;
    }
    if (!features[i].fixed) {
      let br = treeW - 8;
      // Delete
      if (inBox(br-14, y+8, 14, 14)) {
        features.splice(i, 1);
        if (selectedFeature >= features.length) selectedFeature = features.length - 1;
        validateTree(); return;
      }
      // Move up
      if (i > 1 && inBox(br-30, y+8, 14, 14)) {
        [features[i], features[i-1]] = [features[i-1], features[i]];
        selectedFeature = i - 1; validateTree(); return;
      }
      // Move down
      if (i < features.length - 1 && inBox(br-46, y+8, 14, 14)) {
        [features[i], features[i+1]] = [features[i+1], features[i]];
        selectedFeature = i + 1; validateTree(); return;
      }
    }
    y += rowH + 2;
  }

  // Compare button
  let cbx = constrain(floor(canvasWidth * 0.36), 200, 270) + 10;
  if (inBox(cbx, drawHeight + 8, 138, 26)) compareMode = !compareMode;
}

function inBox(bx, by, bw, bh) {
  return mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh;
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
