// Material Data Sheet Explorer — annotated filament data sheet mockup
// CANVAS_HEIGHT: 580
// Bloom L2: identify and explain each section of a thermoplastic data sheet

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 580;
let containerHeight = canvasHeight;

// Data sheet sections (each is a clickable region on the left-panel mockup)
const SECTIONS = [
  {
    label: 'Product Overview',
    color: [50, 110, 200],
    rect: [0.03, 0.090, 0.56, 0.082],  // normalized x,y,w,h within sheet area
    title: 'Product Overview',
    body: 'Identifies the material family (e.g., PLA), color variant, grade, and manufacturer. Tells you whether this is an engineering-grade or hobby-grade product and its primary intended applications. Also lists key selling points — not engineering data, but context for choosing this product.',
    example: 'Example: "PLA+ White — Optimized for detail and low-warp printing. Suitable for prototypes, display models, and educational use. Not food-safe."'
  },
  {
    label: 'Print Settings',
    color: [30, 150, 80],
    rect: [0.03, 0.184, 0.56, 0.115],
    title: 'Recommended Print Settings',
    body: 'The most practically important section. Lists starting-point values for: nozzle temperature, bed temperature, print speed, cooling fan, and enclosure requirements. These are manufacturer recommendations — your specific printer may need tuning.',
    example: 'Typical PLA values: Nozzle 200–220°C, Bed 60°C, Speed 40–60 mm/s, Fan 100%. ABS needs 230–250°C nozzle, 100–110°C bed, and an enclosure.'
  },
  {
    label: 'Mechanical Properties',
    color: [190, 100, 20],
    rect: [0.03, 0.310, 0.56, 0.135],
    title: 'Mechanical Properties Table',
    body: 'Tabulated values from standardized tests (ASTM or ISO). Common properties: Tensile Strength (MPa) — max pull force before breaking; Elongation at Break (%) — how much it stretches; Flexural Modulus (GPa) — stiffness; Impact Resistance (kJ/m²) — energy absorbed before fracture.',
    example: 'Caution: These values are measured on injection-molded test bars, not FDM prints. FDM parts are 20–50% weaker due to layer-line anisotropy. Use these as relative comparisons, not absolute design values.'
  },
  {
    label: 'Thermal Properties',
    color: [200, 50, 40],
    rect: [0.03, 0.457, 0.56, 0.075],
    title: 'Thermal Properties',
    body: 'Includes Heat Deflection Temperature (HDT) — the temperature at which the part deforms under load — and Glass Transition Temperature (Tg). HDT is more useful for printing: a part left in a hot car (60–80°C) will warp if HDT is too low.',
    example: 'PLA: HDT ~55°C. PETG: HDT ~70°C. ABS: HDT ~100°C. If your application sees temperatures above 60°C, avoid PLA entirely.'
  },
  {
    label: 'Chemical Resistance',
    color: [120, 40, 160],
    rect: [0.03, 0.544, 0.56, 0.068],
    title: 'Chemical Resistance',
    body: 'A table or text noting resistance to common solvents, acids, oils, and UV exposure. Critical for outdoor, medical, or industrial parts. PLA dissolves in acetone; ABS dissolves in acetone (useful for smoothing); PETG resists most household chemicals; Nylon absorbs water.',
    example: 'For outdoor use, ASA and PETG resist UV better than PLA, which yellows and embrittles. For chemical exposure, check the specific solvent against the resistance table.'
  },
  {
    label: 'Storage & Handling',
    color: [60, 140, 130],
    rect: [0.03, 0.622, 0.56, 0.068],
    title: 'Storage and Handling',
    body: 'Moisture sensitivity and storage instructions. Hygroscopic filaments (Nylon, PC, TPU, PVA) must be stored in sealed containers with desiccant and dried before printing. PLA and PETG are less sensitive but still benefit from dry storage.',
    example: 'Wet Nylon symptoms: popping sounds during extrusion, stringy finish, weak layer bonds. Dry it at 70°C for 4–8 hours in a filament dryer or oven before printing.'
  },
  {
    label: 'Regulatory Info',
    color: [80, 80, 140],
    rect: [0.03, 0.700, 0.56, 0.060],
    title: 'Regulatory Information',
    body: 'Lists compliance certifications such as REACH (EU chemical safety), RoHS (hazardous substances), food-contact safety, and any flame-retardant ratings (UL94). Critical for consumer products, medical devices, and food-contact applications.',
    example: 'Food-safe filament requires both a food-safe material AND a smooth, non-porous surface finish. FDM prints are generally not food-safe due to layer-line crevices that harbor bacteria.'
  },
];

let selectedSection = -1;
let sheetX, sheetW, sheetH, sheetY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  describe('Material Data Sheet Explorer — click each section of the filament data sheet to learn its purpose', LABEL);
}

function draw() {
  updateCanvasSize();
  background(240, 244, 250);

  // Title
  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('Material Data Sheet Explorer', canvasWidth / 2, 7);
  fill(100); textSize(10);
  text('Click any section of the data sheet to learn its purpose and how to interpret it', canvasWidth / 2, 28);

  // Layout
  sheetX = 10;
  sheetY = 44;
  sheetW = floor(canvasWidth * 0.60) - 8;
  sheetH = canvasHeight - sheetY - 10;

  drawDataSheet();
  drawInfoPanel(sheetX + sheetW + 12, sheetY, canvasWidth - sheetX - sheetW - 22, sheetH);
}

function drawDataSheet() {
  // Sheet background
  fill(255); stroke(180); strokeWeight(1);
  rect(sheetX, sheetY, sheetW, sheetH, 2);

  // Sheet header (not clickable)
  fill(30, 50, 120); noStroke();
  rect(sheetX, sheetY, sheetW, 40, 2, 2, 0, 0);
  fill(255); textAlign(LEFT, CENTER); textSize(13);
  text('  PLA+ Technical Data Sheet', sheetX + 4, sheetY + 20);
  fill(200); textAlign(RIGHT, CENTER); textSize(10);
  text('Rev. 2.1  •  ', sheetX + sheetW - 4, sheetY + 20);

  // Each section
  SECTIONS.forEach((s, i) => {
    let sx = sheetX + s.rect[0] * sheetW;
    let sy = sheetY + 40 + s.rect[1] * (sheetH - 40);
    let sw = s.rect[2] * sheetW;
    let sh = s.rect[3] * (sheetH - 40);

    let isSel = selectedSection === i;
    let isHov = mouseX >= sx && mouseX <= sx + sw && mouseY >= sy && mouseY <= sy + sh;

    // Section background
    fill(isSel ? color(s.color[0], s.color[1], s.color[2], 35) :
         isHov ? color(s.color[0], s.color[1], s.color[2], 18) : 255);
    stroke(isSel ? color(s.color[0], s.color[1], s.color[2]) : color(210));
    strokeWeight(isSel ? 2 : 0.5);
    rect(sx, sy, sw, sh, 2);

    // Section label bar
    fill(s.color[0], s.color[1], s.color[2], isSel ? 220 : 160); noStroke();
    rect(sx, sy, sw, 16, 2, 2, 0, 0);
    fill(255); textAlign(LEFT, TOP); textSize(9);
    text(s.label, sx + 4, sy + 4);

    // Fake content lines
    fill(210); noStroke();
    let lineY = sy + 20;
    while (lineY + 5 < sy + sh - 4) {
      rect(sx + 4, lineY, sw - 8, 4, 1);
      lineY += 9;
    }

    // Numbered callout
    fill(s.color[0], s.color[1], s.color[2]); noStroke();
    ellipse(sx + sw - 10, sy + 10, 16, 16);
    fill(255); textAlign(CENTER, CENTER); textSize(9);
    text(i + 1, sx + sw - 10, sy + 10);
  });

  // Sheet footer area
  noStroke(); fill(180);
  let fy = sheetY + 40 + 0.77 * (sheetH - 40);
  rect(sheetX + sheetW * 0.03, fy, sheetW * 0.56, (sheetH - 40) * 0.22, 2);
  fill(150); textAlign(CENTER, CENTER); textSize(8);
  text('Disclaimer • Version • Contact Info', sheetX + sheetW * 0.31, fy + (sheetH - 40) * 0.11);
}

function drawInfoPanel(px, py, pw, ph) {
  fill(255); stroke(180); strokeWeight(1);
  rect(px, py, pw, ph, 4);

  if (selectedSection < 0) {
    noStroke(); fill(140);
    textAlign(CENTER, CENTER); textSize(11);
    text('Click a numbered section\nto see its purpose and\nhow to read it', px + pw/2, py + ph/2 - 20);

    // Legend
    SECTIONS.forEach((s, i) => {
      fill(s.color[0], s.color[1], s.color[2]); noStroke();
      ellipse(px + 14, py + ph/2 + 30 + i * 18, 14, 14);
      fill(255); textAlign(CENTER, CENTER); textSize(8);
      text(i + 1, px + 14, py + ph/2 + 30 + i * 18);
      fill(50); textAlign(LEFT, CENTER); textSize(9.5);
      text(s.label, px + 24, py + ph/2 + 30 + i * 18);
    });
    return;
  }

  let s = SECTIONS[selectedSection];
  let x = px + 8, y = py + 8, w = pw - 16;

  // Header
  fill(s.color[0], s.color[1], s.color[2]); noStroke();
  rect(x, y, w, 28, 4);
  fill(255); textAlign(LEFT, CENTER); textSize(12);
  text('  §' + (selectedSection + 1) + ' ' + s.title, x, y + 14);

  // Body
  noStroke(); fill(35); textSize(10.5); textAlign(LEFT, TOP);
  text(s.body, x, y + 36, w);

  // Example box
  let ey = y + 36 + 115;
  fill(s.color[0], s.color[1], s.color[2], 20); stroke(s.color[0], s.color[1], s.color[2], 100); strokeWeight(1);
  rect(x, ey, w, ph - ey + py - 16, 3);
  noStroke(); fill(s.color[0], s.color[1], s.color[2]); textSize(9.5); textAlign(LEFT, TOP);
  text('Example / Key Point:', x + 4, ey + 4);
  fill(40); textSize(9.5);
  text(s.example, x + 4, ey + 18, w - 8);
}

function mousePressed() {
  SECTIONS.forEach((s, i) => {
    let sx = sheetX + s.rect[0] * sheetW;
    let sy = sheetY + 40 + s.rect[1] * (sheetH - 40);
    let sw = s.rect[2] * sheetW;
    let sh = s.rect[3] * (sheetH - 40);
    if (mouseX >= sx && mouseX <= sx + sw && mouseY >= sy && mouseY <= sy + sh) {
      selectedSection = (selectedSection === i) ? -1 : i;
    }
  });
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
