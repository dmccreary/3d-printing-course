// FDM Printer Anatomy Explorer — labeled interactive schematic
// CANVAS_HEIGHT: 620
// Bloom L1: identify and name major components of an FDM printer

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 620;
let containerHeight = canvasHeight;

const SYS = {
  motion:      { col: [50, 120, 220],   label: 'Motion System' },
  extrusion:   { col: [220, 110, 30],   label: 'Extrusion System' },
  thermal:     { col: [210, 50, 50],    label: 'Thermal System' },
  electronics: { col: [40, 170, 80],    label: 'Electronics' },
};

const COMPONENTS = [
  {
    name: 'Nozzle', system: 'thermal',
    fx: 0.50, fy: 0.64,
    fn: 'Deposits melted filament in precise lines; 0.4 mm diameter is standard.',
    mat: 'Brass (standard), hardened steel (abrasives), ruby (ultra-abrasive)',
    issue: 'Clogs from heat-creep, charred filament, or printing abrasives with a brass nozzle.'
  },
  {
    name: 'Hotend Assembly', system: 'thermal',
    fx: 0.50, fy: 0.56,
    fn: 'Heats and melts filament. Contains a heat block, thermistor, heater cartridge, and heat sink.',
    mat: 'Aluminum heat block, brass/steel nozzle, PTFE-lined or all-metal construction',
    issue: 'Thermal runaway if thermistor fails; heat-creep clogs if cooling is inadequate.'
  },
  {
    name: 'Extruder Motor', system: 'extrusion',
    fx: 0.22, fy: 0.16,
    fn: 'Drives filament into the hotend by gripping it between a toothed gear and idler bearing.',
    mat: 'NEMA 17 stepper motor with hardened steel drive gear',
    issue: 'Stripped filament (skipping) from too much pressure, too fast speed, or clogged hotend.'
  },
  {
    name: 'PTFE Tube (Bowden)', system: 'extrusion',
    fx: 0.38, fy: 0.34,
    fn: 'Guides filament from the remote extruder to the hotend with low friction.',
    mat: 'Polytetrafluoroethylene (PTFE) tubing, 2 mm inner diameter',
    issue: 'Gap at coupling allows filament to string or jam; PTFE degrades above 240 °C.'
  },
  {
    name: 'X-Axis Gantry', system: 'motion',
    fx: 0.50, fy: 0.46,
    fn: 'Carries the hotend carriage back and forth in the X direction during printing.',
    mat: 'Aluminum extrusion rail with linear rods; toothed GT2 belt driven by stepper motor',
    issue: 'Loose belt causes ringing artifacts (ghosting) in prints.'
  },
  {
    name: 'X-Axis Belt', system: 'motion',
    fx: 0.72, fy: 0.49,
    fn: 'Transmits stepper motor rotation to carriage linear motion at 2 mm per tooth.',
    mat: 'GT2 rubber belt reinforced with fiberglass; drives X motor pulley',
    issue: 'Loose belt → ringing; broken belt → print failure mid-job.'
  },
  {
    name: 'Z-Axis Lead Screw', system: 'motion',
    fx: 0.13, fy: 0.46,
    fn: 'Converts stepper motor rotation into precise vertical movement of the X-gantry.',
    mat: 'T8 threaded rod (typically stainless steel) with brass anti-backlash nut',
    issue: 'Bent or misaligned lead screw produces Z-banding — horizontal lines at regular intervals.'
  },
  {
    name: 'Print Bed (Y-Axis)', system: 'motion',
    fx: 0.50, fy: 0.77,
    fn: 'The build plate travels back and forth on the Y-axis via a belt and stepper motor below the frame.',
    mat: 'Aluminum plate with spring-steel PEI sheet or glass surface',
    issue: 'Loose Y-belt causes back-of-model artifacts; unlevel bed causes adhesion failures.'
  },
  {
    name: 'Linear Rods/Rails', system: 'motion',
    fx: 0.87, fy: 0.46,
    fn: 'Provide smooth, precise linear guidance for the X-carriage and Z-axis movement.',
    mat: 'Hardened steel rods or linear rails (MGN12H) with LM8UU or ball-bearing carriages',
    issue: 'Worn or dry bearings produce irregular surface finish; misalignment causes binding.'
  },
  {
    name: 'Motherboard', system: 'electronics',
    fx: 0.15, fy: 0.88,
    fn: 'Runs firmware (Marlin, Klipper) and controls all motors, heaters, fans, and sensors.',
    mat: 'PCB with stepper drivers (A4988, TMC2209), MCU (32-bit ARM or AVR)',
    issue: 'Failed stepper driver causes one axis to skip; firmware misconfiguration affects all functions.'
  },
  {
    name: 'Power Supply Unit', system: 'electronics',
    fx: 0.85, fy: 0.88,
    fn: 'Converts 120/240 V AC to 24 V DC to power heaters, motors, and the mainboard.',
    mat: 'Switching mode PSU, typically 30 A / 360 W for standard printers',
    issue: 'Undersized PSU causes voltage sag, thermal cutoffs, and print failures under high load.'
  },
  {
    name: 'Build Surface', system: 'extrusion',
    fx: 0.66, fy: 0.74,
    fn: 'The actual printing surface — must promote first-layer adhesion while allowing clean part removal.',
    mat: 'PEI (common), glass with hairspray/glue, textured powder-coat, or polypropylene sheets',
    issue: 'Contaminated surface (oils from hands) causes adhesion failure; worn PEI reduces grip.'
  },
];

let selectedComp = 0;
let activeSystem = null;  // null = show all
let pulse = 0;

// System filter buttons
let sysButtons = [];
let sysBtnY = 32;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  describe('FDM Printer Anatomy Explorer — click hotspots on the printer schematic to learn about each component', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245, 248, 253);
  pulse = sin(frameCount * 0.06) * 3;

  // Title
  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('FDM Printer Anatomy Explorer', canvasWidth / 2, 7);

  drawSysButtons();

  let panelY = sysBtnY + 34;
  let treeW = floor(canvasWidth * 0.60);
  drawPrinter(10, panelY, treeW - 10, canvasHeight - panelY - 10);
  drawInfoPanel(floor(canvasWidth * 0.61), panelY, canvasWidth - floor(canvasWidth * 0.61) - 6, canvasHeight - panelY - 10);
}

function drawSysButtons() {
  let bw = floor((canvasWidth - 16) / 5) - 3;
  let labels = ['All Systems', ...Object.values(SYS).map(s => s.label)];
  let keys   = [null, ...Object.keys(SYS)];

  sysButtons = [];
  for (let i = 0; i < labels.length; i++) {
    let bx = 8 + i * (bw + 3);
    let isSel = activeSystem === keys[i];
    let col = keys[i] ? SYS[keys[i]].col : [80, 80, 80];
    fill(col[0], col[1], col[2], isSel ? 230 : 110);
    stroke(col[0], col[1], col[2]); strokeWeight(isSel ? 2 : 1);
    rect(bx, sysBtnY, bw, 28, 4);
    noStroke(); fill(255);
    textAlign(CENTER, CENTER); textSize(9);
    text(labels[i], bx + bw / 2, sysBtnY + 14);
    sysButtons.push({ x: bx, y: sysBtnY, w: bw, h: 28, key: keys[i] });
  }
}

function drawPrinter(px, py, pw, ph) {
  // Background
  fill(255); stroke(190); strokeWeight(1);
  rect(px, py, pw, ph, 4);

  // Printer coordinate helpers
  function sx(fx) { return px + 8 + fx * (pw - 16); }
  function sy(fy) { return py + 8 + fy * (ph - 16); }

  // === Draw structural elements ===

  // Frame vertical rails
  fill(180, 180, 185); noStroke();
  rect(sx(0.06), sy(0.05), 12, ph * 0.82);  // left rail
  rect(sx(0.92) - 12, sy(0.05), 12, ph * 0.82);  // right rail
  // Bottom rail
  rect(sx(0.06), sy(0.87), pw * 0.86, 12);

  // Z-axis lead screws (thin lines along left rail)
  stroke(150); strokeWeight(2); noFill();
  line(sx(0.10), sy(0.08), sx(0.10), sy(0.85));
  line(sx(0.90), sy(0.08), sx(0.90), sy(0.85));

  // Z stepper motors (small squares at bottom of each screw)
  fill(80, 80, 100); noStroke();
  rect(sx(0.07), sy(0.82), 18, 18, 2);
  rect(sx(0.87), sy(0.82), 18, 18, 2);

  // X-axis gantry (horizontal bar)
  fill(140, 150, 170); noStroke();
  rect(sx(0.09), sy(0.43), pw * 0.82, 14, 2);

  // X-axis motor (small square on right end of gantry)
  fill(80, 80, 100); noStroke();
  rect(sx(0.84), sy(0.40), 20, 20, 2);

  // X-axis belt (dashed line along gantry)
  stroke(100, 130, 160); strokeWeight(1.5);
  drawingContext.setLineDash([5, 3]);
  line(sx(0.12), sy(0.50), sx(0.82), sy(0.50));
  drawingContext.setLineDash([]);

  // Hotend carriage (small block on gantry)
  fill(160, 160, 180); noStroke();
  rect(sx(0.44), sy(0.42), 28, 24, 3);

  // PTFE tube from extruder to hotend (curved)
  stroke(220, 220, 240); strokeWeight(2); noFill();
  beginShape();
  vertex(sx(0.24), sy(0.19));
  bezierVertex(sx(0.30), sy(0.20), sx(0.40), sy(0.32), sx(0.50), sy(0.46));
  endShape();

  // Extruder motor (box at top-left area)
  fill(80, 80, 100); noStroke();
  rect(sx(0.14), sy(0.08), 28, 24, 3);
  // Gear indicator
  fill(180); ellipse(sx(0.22), sy(0.17), 10, 10);

  // Hotend body (hanging below carriage)
  fill(120, 120, 140); noStroke();
  rect(sx(0.455), sy(0.63), 18, 26, 2);

  // Heat block
  fill(200, 80, 60); noStroke();
  rect(sx(0.451), sy(0.57), 22, 14, 2);

  // Nozzle (tapered triangle)
  fill(150, 100, 60); noStroke();
  triangle(sx(0.457), sy(0.62), sx(0.465) + 14, sy(0.62), sx(0.462) + 7, sy(0.67));

  // Print bed
  fill(200, 210, 220); stroke(160); strokeWeight(1);
  rect(sx(0.10), sy(0.72), pw * 0.80, 16, 2);
  // PEI surface
  fill(255, 200, 100, 180); noStroke();
  rect(sx(0.10), sy(0.72), pw * 0.80, 6, 2, 2, 0, 0);

  // Y-axis belt (dashed below bed)
  stroke(100, 130, 160); strokeWeight(1.5);
  drawingContext.setLineDash([5, 3]);
  line(sx(0.10), sy(0.80), sx(0.90), sy(0.80));
  drawingContext.setLineDash([]);

  // Y stepper (at right, below frame bottom rail)
  fill(80, 80, 100); noStroke();
  rect(sx(0.86), sy(0.80), 20, 20, 2);

  // Motherboard box (bottom-left)
  fill(40, 80, 50); noStroke();
  rect(sx(0.06), py + ph - 46, 42, 36, 3);
  // PCB traces (decorative)
  stroke(80, 180, 100); strokeWeight(0.8);
  for (let i = 0; i < 4; i++) {
    line(sx(0.06) + 4, py + ph - 43 + i * 8, sx(0.06) + 38, py + ph - 43 + i * 8);
  }

  // Power supply box (bottom-right)
  fill(60, 60, 70); noStroke();
  rect(sx(0.78), py + ph - 46, 52, 36, 3);
  fill(200, 200, 40); rect(sx(0.82), py + ph - 42, 8, 8, 2);

  // === Draw hotspots ===
  COMPONENTS.forEach((c, i) => {
    let cx_ = sx(c.fx), cy_ = sy(c.fy);
    let sys = SYS[c.system];
    let col = sys.col;
    let isActive = activeSystem === null || activeSystem === c.system;
    let isSel = selectedNode === i;
    let alpha = isActive ? 220 : 60;

    let r = 9 + (isSel ? pulse : 0);
    if (isSel) {
      fill(col[0], col[1], col[2], 60); noStroke();
      ellipse(cx_, cy_, r * 3, r * 3);
    }
    fill(col[0], col[1], col[2], alpha);
    stroke(255, 255, 255, alpha); strokeWeight(1.5);
    ellipse(cx_, cy_, r * 2, r * 2);

    // Number inside
    noStroke(); fill(255, 255, 255, alpha);
    textAlign(CENTER, CENTER); textSize(7.5);
    text(i + 1, cx_, cy_ + 0.5);

    // Hover tooltip
    let hov = dist(mouseX, mouseY, cx_, cy_) < 12;
    if (hov && isActive) {
      fill(30, 30, 30, 210); noStroke();
      let tw = max(textWidth(c.name) + 10, 80);
      let tx = constrain(cx_ - tw / 2, px, px + pw - tw);
      rect(tx, cy_ - 24, tw, 18, 3);
      fill(255); textSize(9); textAlign(LEFT, CENTER);
      text(c.name, tx + 5, cy_ - 15);
    }
  });
}

let selectedNode = 0;

function drawInfoPanel(px, py, pw, ph) {
  let c = COMPONENTS[selectedComp];
  let sys = SYS[c.system];

  fill(255); stroke(190); strokeWeight(1);
  rect(px, py, pw, ph, 4);

  // System color header
  fill(sys.col[0], sys.col[1], sys.col[2], 220); noStroke();
  rect(px, py, pw, 34, 4, 4, 0, 0);
  fill(255); textAlign(LEFT, CENTER); textSize(11); textStyle(BOLD);
  text(c.name, px + 10, py + 17);
  textStyle(NORMAL);
  textAlign(RIGHT, CENTER); textSize(9);
  text(sys.label, px + pw - 8, py + 17);

  let gy = py + 44;
  noStroke(); fill(60); textAlign(LEFT, TOP);

  // Function
  fill(sys.col[0], sys.col[1], sys.col[2]); textSize(9.5);
  text('Function', px + 10, gy);
  fill(40); textSize(9.5);
  text(c.fn, px + 10, gy + 14, pw - 20);

  gy += 14 + textHeight(c.fn, pw - 20) + 10;

  // Material
  fill(sys.col[0], sys.col[1], sys.col[2]); textSize(9.5);
  text('Material / Specification', px + 10, gy);
  fill(40); textSize(9.5);
  text(c.mat, px + 10, gy + 14, pw - 20);

  gy += 14 + textHeight(c.mat, pw - 20) + 10;

  // Issues
  fill(190, 60, 40); textSize(9.5);
  text('Things That Go Wrong', px + 10, gy);
  fill(40); textSize(9.5);
  text(c.issue, px + 10, gy + 14, pw - 20);

  // Component number
  fill(sys.col[0], sys.col[1], sys.col[2], 40); noStroke();
  rect(px + pw - 38, py + ph - 38, 28, 28, 14);
  fill(sys.col[0], sys.col[1], sys.col[2]); textAlign(CENTER, CENTER); textSize(14);
  text(selectedComp + 1, px + pw - 24, py + ph - 24);

  // Navigation
  fill(130); textSize(9); textAlign(CENTER, BOTTOM); noStroke();
  text('Click hotspots to explore components', px + pw / 2, py + ph - 8);
}

function textHeight(str, maxWidth) {
  // Estimate wrapped text height
  let words = str.split(' ');
  let lineW = 0, lines = 1;
  words.forEach(w => {
    let ww = textWidth(w + ' ');
    if (lineW + ww > maxWidth) { lines++; lineW = ww; }
    else lineW += ww;
  });
  return lines * 13;
}

function mousePressed() {
  // Check system filter buttons
  for (let b of sysButtons) {
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      activeSystem = b.key;
      return;
    }
  }

  // Check component hotspots
  let panelY = sysBtnY + 34;
  let treeW  = floor(canvasWidth * 0.60);
  function sx(fx) { return 10 + 8 + fx * (treeW - 26); }
  function sy(fy) { return panelY + 8 + fy * (canvasHeight - panelY - 18); }

  for (let i = 0; i < COMPONENTS.length; i++) {
    let c = COMPONENTS[i];
    let cx_ = sx(c.fx), cy_ = sy(c.fy);
    if (dist(mouseX, mouseY, cx_, cy_) < 14) {
      selectedComp = i;
      selectedNode = i;
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
