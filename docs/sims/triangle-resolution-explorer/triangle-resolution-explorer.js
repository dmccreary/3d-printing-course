// Triangle Resolution Explorer — chord deviation vs. file size trade-off
// CANVAS_HEIGHT: 580
// Bloom L3: adjust mesh resolution parameters; explain quality/file-size trade-off

let containerWidth;
let canvasWidth  = 700;
let drawHeight   = 360;
let controlH     = 220;
let canvasHeight  = drawHeight + controlH;
let containerHeight = canvasHeight;

// Sliders
let chordSlider, angleSlider;
let showWire = true;
let rotAngle = 0;
let autoRotate = true;

// Derived mesh geometry
let sphereVerts = [];
let sphereFaces = [];
let latDiv = 12, lonDiv = 16;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  // Chord deviation slider: 1–200 maps to 0.01–2.0mm (linear for simplicity)
  chordSlider = createSlider(1, 200, 20, 1);
  chordSlider.style('width', '200px');
  chordSlider.input(rebuildMesh);

  angleSlider = createSlider(1, 45, 15, 1);
  angleSlider.style('width', '200px');
  angleSlider.input(rebuildMesh);

  rebuildMesh();
  describe('Triangle Resolution Explorer — drag sliders to see how chord deviation affects triangle count and file size', LABEL);
}

// Map slider 1-200 to 0.01-2.0mm (exponential feel via sqrt)
function chordMM() {
  let v = chordSlider.value();
  return parseFloat((0.01 + (v - 1) / 199 * 1.99).toFixed(3));
}

function rebuildMesh() {
  let cd = chordMM();
  let ad = angleSlider.value();

  // Derive lat/lon divisions from chord deviation
  // Chord deviation of a chord in a circle of radius R with n segments:
  // cd = R * (1 - cos(PI/n)) => n ≈ PI / acos(1 - cd/R)
  let R = 100; // sphere radius in "model units"
  let nFromChord = max(3, round(PI / acos(max(-1, min(1, 1 - cd / R)))));
  let nFromAngle = max(3, round(180 / ad));

  latDiv = max(4, min(nFromChord, 80));
  lonDiv = max(6, min(max(nFromChord, nFromAngle), 120));

  buildSphere();
}

function buildSphere() {
  sphereVerts = [];
  sphereFaces = [];
  let R = 1;

  // UV sphere vertices
  for (let la = 0; la <= latDiv; la++) {
    let phi = PI * la / latDiv;
    for (let lo = 0; lo <= lonDiv; lo++) {
      let theta = TWO_PI * lo / lonDiv;
      sphereVerts.push([
        R * sin(phi) * cos(theta),
        R * cos(phi),
        R * sin(phi) * sin(theta)
      ]);
    }
  }

  // Faces
  for (let la = 0; la < latDiv; la++) {
    for (let lo = 0; lo < lonDiv; lo++) {
      let i0 = la * (lonDiv + 1) + lo;
      let i1 = i0 + 1;
      let i2 = i0 + lonDiv + 1;
      let i3 = i2 + 1;
      if (la > 0)           sphereFaces.push([i0, i1, i2]);
      if (la < latDiv - 1)  sphereFaces.push([i1, i3, i2]);
    }
  }
}

// ───── draw ──────────────────────────────────────────────────────────────────

function draw() {
  updateCanvasSize();

  fill(238, 244, 252); noStroke();
  rect(0, 0, canvasWidth, drawHeight);
  fill(248, 250, 255); noStroke();
  rect(0, drawHeight, canvasWidth, controlH);

  if (autoRotate) rotAngle += 0.012;

  // Title
  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('Triangle Resolution Explorer', canvasWidth / 2, 6);

  // Draw sphere
  drawSphere(canvasWidth / 2, drawHeight / 2 + 12);

  // Controls
  positionControls();
  drawControls();
}

function drawSphere(cx, cy) {
  let R = min(canvasWidth * 0.22, drawHeight * 0.38);
  let cd = chordMM();
  let qualityCol = cd <= 0.10 ? color(30, 160, 50) :
                   cd <= 0.30 ? color(80, 160, 40) :
                   cd <= 0.80 ? color(200, 160, 20) : color(200, 50, 30);

  // Project and depth-sort faces
  let proj = sphereVerts.map(v => projectVert(v, cx, cy, R));

  let sorted = sphereFaces.map((f, i) => {
    let avgZ = (proj[f[0]][2] + proj[f[1]][2] + proj[f[2]][2]) / 3;
    return { f, avgZ };
  }).sort((a, b) => a.avgZ - b.avgZ);

  sorted.forEach(({ f, avgZ }) => {
    let [ax, ay] = [proj[f[0]][0], proj[f[0]][1]];
    let [bx, by] = [proj[f[1]][0], proj[f[1]][1]];
    let [cx_, cy_] = [proj[f[2]][0], proj[f[2]][1]];

    // Lighting: back faces (low z) dark, front bright
    let brightness = map(avgZ, -1, 1, 0.3, 1.0);
    let r = 60 + brightness * 80, g = 110 + brightness * 60, b_ = 200 + brightness * 40;

    fill(r, g, b_);
    if (showWire) {
      stroke(max(r - 40, 0), max(g - 40, 0), max(b_ - 40, 0)); strokeWeight(0.5);
    } else {
      noStroke();
    }
    triangle(ax, ay, bx, by, cx_, cy_);
  });

  // Quality indicator ring
  stroke(qualityCol); strokeWeight(3); noFill();
  ellipse(cx, cy, R * 2 + 10, R * 2 + 10);
}

function projectVert(v, cx, cy, R) {
  let [x, y, z] = v;
  // Rotate Y
  let rx = x * cos(rotAngle) + z * sin(rotAngle);
  let rz = -x * sin(rotAngle) + z * cos(rotAngle);
  // Slight tilt
  let tilt = 0.3;
  let sx = cx + rx * R;
  let sy = cy - y * R + rz * tilt * R;
  return [sx, sy, rz]; // store depth for sorting
}

function positionControls() {
  let cw = min(220, canvasWidth * 0.28);
  let panelX = 16;
  let sliderY1 = drawHeight + 42;
  let sliderY2 = drawHeight + 96;
  chordSlider.position(panelX + 120, sliderY1 - 4);
  chordSlider.style('width', cw + 'px');
  angleSlider.position(panelX + 120, sliderY2 - 4);
  angleSlider.style('width', cw + 'px');
}

function drawControls() {
  let x = 16;
  let y1 = drawHeight + 42;
  let y2 = drawHeight + 96;
  let cw = min(220, canvasWidth * 0.28);

  // Slider labels
  noStroke(); fill(50); textAlign(LEFT, CENTER); textSize(11);
  text('Chord Deviation:', x, y1);
  text('Angular Deviation:', x, y2);

  // Values
  fill(30, 100, 200); textSize(11);
  text(chordMM().toFixed(3) + ' mm', x + 125 + cw + 6, y1);
  text(angleSlider.value() + '°',    x + 125 + cw + 6, y2);

  // Wireframe toggle
  let tbx = x, tby = drawHeight + 148;
  fill(showWire ? color(40, 100, 200) : color(160)); noStroke();
  rect(tbx, tby, 18, 18, 3);
  fill(255); textSize(10); textAlign(CENTER, CENTER);
  text(showWire ? '✓' : '', tbx + 9, tby + 9);
  fill(50); textAlign(LEFT, CENTER); textSize(11);
  text('Show wireframe', tbx + 24, tby + 9);

  // Rotation toggle
  let rbx = x + 140, rby = tby;
  fill(autoRotate ? color(40, 150, 60) : color(160)); noStroke();
  rect(rbx, rby, 18, 18, 3);
  fill(255); textSize(10); textAlign(CENTER, CENTER);
  text(autoRotate ? '✓' : '', rbx + 9, rby + 9);
  fill(50); textAlign(LEFT, CENTER); textSize(11);
  text('Auto-rotate', rbx + 24, rby + 9);

  // Stats panel
  drawStats();
}

function drawStats() {
  let cd = chordMM();
  let triCount = sphereFaces.length;
  let stlKB = (triCount * 50) / 1024;   // binary STL: 50 bytes/triangle
  let quality = cd <= 0.10 ? 'Excellent' : cd <= 0.30 ? 'Good' : cd <= 0.80 ? 'Fair' : 'Poor';
  let qCol = cd <= 0.10 ? color(30,160,50) : cd <= 0.30 ? color(70,150,40) :
             cd <= 0.80 ? color(200,150,20) : color(200,50,30);

  let sx = canvasWidth * 0.50, sy = drawHeight + 12;
  let sw = canvasWidth - sx - 12;

  // Stats box
  fill(250, 252, 255); stroke(200); strokeWeight(1);
  rect(sx, sy, sw, controlH - 18, 6);

  noStroke(); fill(40); textAlign(LEFT, TOP); textSize(12);
  text('Mesh Statistics', sx + 10, sy + 8);
  stroke(200); strokeWeight(1);
  line(sx + 10, sy + 24, sx + sw - 10, sy + 24);

  let labels = [
    ['Triangles:', triCount.toLocaleString()],
    ['STL size:', stlKB < 1024 ? stlKB.toFixed(0) + ' KB' : (stlKB/1024).toFixed(2) + ' MB'],
    ['Surface error:', '≤ ' + cd.toFixed(3) + ' mm'],
    ['Lat divisions:', String(latDiv)],
    ['Lon divisions:', String(lonDiv)],
  ];

  labels.forEach(([lbl, val], i) => {
    let ly = sy + 30 + i * 24;
    noStroke(); fill(80); textSize(10.5); textAlign(LEFT, TOP);
    text(lbl, sx + 10, ly);
    fill(30); textAlign(RIGHT, TOP);
    text(val, sx + sw - 10, ly);
  });

  // Quality badge
  let qy = sy + controlH - 56;
  fill(qCol); noStroke();
  rect(sx + 10, qy, sw - 20, 26, 4);
  fill(255); textAlign(CENTER, CENTER); textSize(13);
  text('Quality: ' + quality, sx + sw/2, qy + 13);

  // FDM context line
  noStroke(); fill(90); textAlign(LEFT, TOP); textSize(9.5);
  text('FDM nozzle ≈ 0.4 mm  •  Layer height ≈ 0.2 mm', sx + 10, sy + controlH - 24);
}

// ───── interaction ────────────────────────────────────────────────────────────

function mousePressed() {
  let x = 16;
  // Wireframe toggle
  if (inBox(x, drawHeight + 148, 18, 18)) { showWire = !showWire; return; }
  // Rotation toggle
  if (inBox(x + 140, drawHeight + 148, 18, 18)) { autoRotate = !autoRotate; return; }
  // Sphere click to toggle rotation
  if (mouseY < drawHeight) autoRotate = !autoRotate;
}

function inBox(bx, by, bw, bh) {
  return mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh;
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
