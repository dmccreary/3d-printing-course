// Printer Brand Landscape — radar chart comparing 5 printer brands on 6 axes
// CANVAS_HEIGHT: 600
// Bloom L4: compare major consumer printer brands to make informed recommendations

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 600;

let hovBrand    = -1;
let selectedBrand = -1;
let visibleBrands = [true, true, true, true, true];
let useCase = 0;

const AXES = [
  { label: 'Price Value',       desc: 'How much printer capability you get per dollar spent. Scores above 7 = excellent value for most budgets.' },
  { label: 'Print Speed',       desc: 'Achievable quality print speeds. 10 = best-in-class (500+ mm/s); 5 = typical 60 mm/s printers.' },
  { label: 'Ease of Use',       desc: 'How quickly a beginner can produce a good first print. Auto-leveling, enclosed, good software all increase score.' },
  { label: 'Open Source',       desc: 'Is the firmware, slicer, and hardware design openly available? Open source enables community modification and transparency.' },
  { label: 'Community Support', desc: 'Size and quality of online community — tutorials, mods, forums. Large community = faster help when something goes wrong.' },
  { label: 'Material Compat.',  desc: 'Range of materials the printer supports. Resin printers score low here (only resin); enclosed FDM scores high (ABS, ASA, PA, etc.).' },
];

const BRANDS = [
  {
    name: 'Bambu Lab', abbr: 'BL',
    col: [30, 120, 220],
    scores: [8, 10, 9, 3, 7, 8],
    strengths: 'Best speed, excellent plug-and-play experience.',
    useFor: 'Prototype engineers and makers who want speed without manual tuning.',
    caveat: 'Proprietary ecosystem — limited third-party slicer support.',
  },
  {
    name: 'Prusa', abbr: 'PR',
    col: [220, 120, 30],
    scores: [7, 6, 7, 10, 10, 9],
    strengths: 'Best open-source support, large community, excellent material range.',
    useFor: 'School labs, educators, and users who value repairability and transparency.',
    caveat: 'Lower speeds than Bambu; costs more than budget brands.',
  },
  {
    name: 'Creality', abbr: 'CR',
    col: [40, 170, 80],
    scores: [9, 7, 5, 7, 9, 7],
    strengths: 'Best price-to-size ratio; huge aftermarket upgrade ecosystem.',
    useFor: 'Budget-conscious makers and tinkerers who enjoy modifying their printer.',
    caveat: 'Requires more setup and tuning than Bambu or Prusa.',
  },
  {
    name: 'Elegoo (Resin)', abbr: 'EL',
    col: [140, 60, 200],
    scores: [9, 8, 7, 5, 8, 4],
    strengths: 'Very high XY resolution at low cost; ideal for miniatures and jewelry.',
    useFor: 'Detail-oriented users: miniature painters, jewelers, dental models.',
    caveat: 'Resin only — no flexible, engineering, or composite filaments.',
  },
  {
    name: 'Snapmaker', abbr: 'SM',
    col: [180, 160, 30],
    scores: [6, 5, 7, 4, 6, 7],
    strengths: 'All-in-one: 3D printing, laser engraving, CNC routing in one machine.',
    useFor: 'Makerspaces and classrooms wanting multiple fabrication tools from one device.',
    caveat: 'Jack-of-all-trades: slower and less optimized than dedicated machines.',
  },
];

const USE_CASES = [
  { name: 'Any / Show All', rec: [0, 1, 2, 3, 4] },
  { name: 'School Lab',     rec: [1, 0], note: 'Prusa (open-source, durable) or Bambu (ease of use)' },
  { name: 'Hobbyist Maker', rec: [0, 2], note: 'Bambu for speed, Creality for budget/tinkering' },
  { name: 'Prototype Eng.', rec: [0, 1], note: 'Bambu (speed+materials) or Prusa (material range)' },
  { name: 'High-Detail Resin', rec: [3], note: 'Elegoo MSLA excels at fine detail at low cost' },
  { name: 'Makerspace',    rec: [4, 1], note: 'Snapmaker (multi-tool) or Prusa (community support)' },
];

let radarCx, radarCy, radarR;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Printer Brand Landscape — radar chart comparing 5 major 3D printer brands', LABEL);
  textFont('sans-serif');
}

function draw() {
  updateCanvasSize();
  background(238, 244, 252);

  noStroke(); fill(18, 48, 110);
  textAlign(CENTER, TOP); textSize(17); textStyle(BOLD);
  text('Printer Brand Landscape', canvasWidth / 2, 6);
  textStyle(NORMAL);

  let detW = 230;
  radarCx = (canvasWidth - detW) / 2;
  radarCy = canvasHeight / 2 + 16;
  radarR  = min(radarCx - 80, (canvasHeight - 80) / 2);

  drawRadarGrid();
  drawBrandPolygons();
  drawAxisLabels();
  drawLegend();
  drawUseCaseSelector();
  if (hovBrand >= 0 || selectedBrand >= 0) drawDetailPanel(detW);
}

function drawRadarGrid() {
  let nAxes = AXES.length;
  let rings = 5;

  for (let r2 = 1; r2 <= rings; r2++) {
    let rr = radarR * r2 / rings;
    stroke(200, 210, 228); strokeWeight(0.8); noFill();
    beginShape();
    for (let a2 = 0; a2 < nAxes; a2++) {
      let ang = (a2 / nAxes) * TWO_PI - HALF_PI;
      vertex(radarCx + cos(ang) * rr, radarCy + sin(ang) * rr);
    }
    endShape(CLOSE);
    noStroke(); fill(140); textAlign(CENTER, CENTER); textSize(8);
    text(r2 * 2, radarCx + 4, radarCy - rr + 4);
  }

  // Spokes
  for (let a2 = 0; a2 < nAxes; a2++) {
    let ang = (a2 / nAxes) * TWO_PI - HALF_PI;
    stroke(185, 198, 220); strokeWeight(1);
    line(radarCx, radarCy, radarCx + cos(ang) * radarR, radarCy + sin(ang) * radarR);
  }
}

function drawBrandPolygons() {
  let nAxes = AXES.length;
  let recBrands = USE_CASES[useCase].rec;

  BRANDS.forEach((brand, bi) => {
    if (!visibleBrands[bi]) return;
    let isRec = recBrands.includes(bi);
    let isHov = hovBrand === bi || selectedBrand === bi;
    let alpha = (useCase > 0 && !isRec) ? 35 : (isHov ? 210 : 120);
    let strokeAlpha = (useCase > 0 && !isRec) ? 60 : (isHov ? 255 : 200);

    fill(brand.col[0], brand.col[1], brand.col[2], alpha);
    stroke(brand.col[0], brand.col[1], brand.col[2], strokeAlpha);
    strokeWeight(isHov ? 2.5 : 1.5);

    beginShape();
    brand.scores.forEach((s, ai) => {
      let ang = (ai / nAxes) * TWO_PI - HALF_PI;
      let r2  = radarR * s / 10;
      vertex(radarCx + cos(ang) * r2, radarCy + sin(ang) * r2);
    });
    endShape(CLOSE);

    // Dots on axes
    brand.scores.forEach((s, ai) => {
      let ang = (ai / nAxes) * TWO_PI - HALF_PI;
      let r2  = radarR * s / 10;
      fill(brand.col[0], brand.col[1], brand.col[2], strokeAlpha);
      noStroke();
      ellipse(radarCx + cos(ang) * r2, radarCy + sin(ang) * r2, isHov ? 10 : 6, isHov ? 10 : 6);
    });
  });

  // Hover detection
  hovBrand = -1;
  BRANDS.forEach((brand, bi) => {
    if (!visibleBrands[bi]) return;
    let nAxes = AXES.length;
    let inside = true;
    for (let ai = 0; ai < nAxes; ai++) {
      let ang = (ai / nAxes) * TWO_PI - HALF_PI;
      let r2  = radarR * brand.scores[ai] / 10;
      let px2 = radarCx + cos(ang) * r2;
      let py  = radarCy + sin(ang) * r2;
      if (dist(mouseX, mouseY, px2, py) < 12) { hovBrand = bi; break; }
    }
    // Simple centroid-based hover
    let cx2 = 0, cy2 = 0;
    brand.scores.forEach((s, ai) => {
      let ang = (ai / nAxes) * TWO_PI - HALF_PI;
      cx2 += radarCx + cos(ang) * radarR * s / 10;
      cy2 += radarCy + sin(ang) * radarR * s / 10;
    });
    cx2 /= nAxes; cy2 /= nAxes;
    if (dist(mouseX, mouseY, cx2, cy2) < radarR * 0.3) hovBrand = bi;
  });
}

function drawAxisLabels() {
  let nAxes = AXES.length;
  AXES.forEach((axis, ai) => {
    let ang = (ai / nAxes) * TWO_PI - HALF_PI;
    let labelR = radarR + 28;
    let lx = radarCx + cos(ang) * labelR;
    let ly = radarCy + sin(ang) * labelR;
    noStroke(); fill(40, 55, 100); textAlign(CENTER, CENTER); textSize(10.5); textStyle(BOLD);
    text(axis.label, lx, ly, 90);
    textStyle(NORMAL);
  });
}

function drawLegend() {
  let lx = 8, ly = 44;
  noStroke(); fill(30, 50, 110); textAlign(LEFT, TOP); textSize(10.5); textStyle(BOLD);
  text('Brands:', lx, ly);
  textStyle(NORMAL); ly += 16;

  BRANDS.forEach((brand, bi) => {
    let active = visibleBrands[bi];
    let hov2 = hovBrand === bi || selectedBrand === bi;

    fill(active ? color(brand.col[0], brand.col[1], brand.col[2]) : color(180, 185, 200));
    stroke(active ? color(brand.col[0] * 0.7, brand.col[1] * 0.7, brand.col[2] * 0.7) : color(150));
    strokeWeight(1); rect(lx, ly, 14, 14, 2);

    noStroke(); fill(active ? 40 : 150); textAlign(LEFT, CENTER); textSize(10);
    text(brand.name, lx + 20, ly + 7);
    ly += 20;
  });
}

function drawUseCaseSelector() {
  let ux = 8, uy = canvasHeight - USE_CASES.length * 26 - 14;
  noStroke(); fill(30, 50, 110); textAlign(LEFT, TOP); textSize(10.5); textStyle(BOLD);
  text('Use Case:', ux, uy);
  textStyle(NORMAL); uy += 16;

  USE_CASES.forEach((uc, i) => {
    let active = useCase === i;
    fill(active ? color(30, 80, 200) : color(210, 220, 242));
    stroke(active ? color(15, 55, 160) : color(155, 170, 210));
    strokeWeight(1); rect(ux, uy, 155, 22, 3);
    noStroke(); fill(active ? 255 : 50); textAlign(LEFT, CENTER); textSize(9.5);
    text(uc.name, ux + 7, uy + 11);
    uy += 25;
  });
}

function drawDetailPanel(detW) {
  let bi = selectedBrand >= 0 ? selectedBrand : hovBrand;
  if (bi < 0) return;
  let brand = BRANDS[bi];
  let dx = canvasWidth - detW - 2, dy = 44, dh = canvasHeight - 52;

  fill(255, 254, 250); stroke(185, 200, 225); strokeWeight(1);
  rect(dx, dy, detW, dh, 5);

  fill(brand.col[0], brand.col[1], brand.col[2]); noStroke();
  rect(dx, dy, detW, 38, 5, 5, 0, 0);
  fill(255); textAlign(CENTER, CENTER); textSize(13); textStyle(BOLD);
  text(brand.name, dx + detW / 2, dy + 19);
  textStyle(NORMAL);

  let y = dy + 48;

  // Scores grid
  AXES.forEach((axis, ai) => {
    let score = brand.scores[ai];
    let sc = score >= 8 ? [40, 170, 80] : score >= 5 ? [200, 160, 20] : [190, 60, 60];
    fill(ai % 2 === 0 ? color(242, 247, 255) : color(250)); noStroke();
    rect(dx + 4, y, detW - 8, 24, 2);
    fill(60); textAlign(LEFT, CENTER); textSize(9.5);
    text(axis.label, dx + 8, y + 12);
    // Score bar
    let bw = 50, bx2 = dx + detW - bw - 8;
    fill(220, 228, 240); noStroke(); rect(bx2, y + 6, bw, 12, 5);
    fill(sc[0], sc[1], sc[2]); rect(bx2, y + 6, bw * score / 10, 12, 5);
    fill(40); textAlign(RIGHT, CENTER); textSize(9);
    text(score + '/10', bx2 - 4, y + 12);
    y += 26;
  });

  y += 6;
  fill(40); textAlign(LEFT, TOP); textSize(10); textStyle(BOLD);
  text('Best for:', dx + 8, y); textStyle(NORMAL);
  y += 16; fill(40); textSize(9.5);
  text(brand.useFor, dx + 8, y, detW - 16);
  y += 40;

  noStroke(); fill(200, 220, 255, 80); rect(dx + 4, y, detW - 8, 38, 3);
  fill(40, 60, 140); textAlign(LEFT, TOP); textSize(9.5); textStyle(ITALIC);
  text('Caveat: ' + brand.caveat, dx + 8, y + 4, detW - 16);
  textStyle(NORMAL);

  // Use case note
  if (useCase > 0) {
    let ucn = USE_CASES[useCase].note;
    y += 46;
    fill(210, 240, 210); noStroke(); rect(dx + 4, y, detW - 8, 38, 3);
    fill(20, 100, 40); textAlign(LEFT, TOP); textSize(9.5); textStyle(BOLD);
    text('Recommended: ', dx + 8, y + 4);
    textStyle(NORMAL);
    text(ucn, dx + 8, y + 18, detW - 16);
  }
}

function mousePressed() {
  // Brand legend clicks
  let lx = 8, ly = 44 + 16;
  BRANDS.forEach((brand, bi) => {
    if (mouseX >= lx && mouseX <= lx + 130 && mouseY >= ly && mouseY <= ly + 14) {
      selectedBrand = (selectedBrand === bi) ? -1 : bi;
    }
    ly += 20;
  });

  // Use case selector clicks
  let ux = 8, uy = canvasHeight - USE_CASES.length * 26 - 14 + 16;
  USE_CASES.forEach((uc, i) => {
    if (mouseX >= ux && mouseX <= ux + 155 && mouseY >= uy && mouseY <= uy + 22) {
      useCase = i;
    }
    uy += 25;
  });

  // Click radar area
  if (hovBrand >= 0 && selectedBrand !== hovBrand) {
    selectedBrand = hovBrand;
  } else if (hovBrand < 0 && dist(mouseX, mouseY, radarCx, radarCy) < radarR) {
    selectedBrand = -1;
  }
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
