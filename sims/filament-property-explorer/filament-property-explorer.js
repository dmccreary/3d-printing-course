// Filament Property Explorer — compare thermoplastic filaments across properties
// CANVAS_HEIGHT: 580
// Bloom L4: compare filaments; identify best material for application scenarios

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 580;
let containerHeight = canvasHeight;

const MATERIALS = [
  { name:'PLA',   col:[70,150,220],  tensile:65,  elongation:6,   tg:60,  nozzle:215, density:1.24, summary:'Most common beginner filament. Easy to print, biodegradable, good detail. Limited heat and impact resistance.' },
  { name:'PETG',  col:[50,180,120],  tensile:50,  elongation:12,  tg:80,  nozzle:240, density:1.27, summary:'Good balance of strength and ease. Chemical resistant, slightly flexible. Great for functional parts.' },
  { name:'ABS',   col:[200,130,30],  tensile:42,  elongation:5,   tg:105, nozzle:240, density:1.05, summary:'Tough and impact resistant. Requires enclosure, warps easily. Used for consumer goods and casings.' },
  { name:'ASA',   col:[180,80,160],  tensile:45,  elongation:8,   tg:100, nozzle:245, density:1.07, summary:'UV-stable version of ABS. Outdoor and automotive use. Better weather resistance than ABS.' },
  { name:'TPU',   col:[220,80,60],   tensile:35,  elongation:550, tg:-40, nozzle:225, density:1.21, summary:'Flexible and rubber-like. Excellent impact and abrasion resistance. Hard to print fast. Gaskets, grips, wheels.' },
  { name:'Nylon', col:[100,100,200], tensile:85,  elongation:45,  tg:80,  nozzle:255, density:1.14, summary:'High strength and fatigue resistance. Absorbs moisture — must be kept dry. Gears, brackets, tooling.' },
  { name:'PC',    col:[60,60,160],   tensile:65,  elongation:6,   tg:148, nozzle:275, density:1.20, summary:'Highest heat resistance. Extremely tough. Requires high-temp printer. Enclosures, safety shields.' },
];

const PROPS = [
  { key:'tensile',    label:'Tensile Strength (MPa)', unit:'MPa', max:100 },
  { key:'elongation', label:'Elongation at Break (%)', unit:'%',  max:600 },
  { key:'tg',         label:'Glass Transition Temp (°C)', unit:'°C', max:180 },
  { key:'nozzle',     label:'Nozzle Temperature (°C)', unit:'°C', max:300 },
];

let selectedProp = 0;
let visible = Array(MATERIALS.length).fill(true);
let hoveredMat = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  describe('Filament Property Explorer — compare PLA, PETG, ABS, TPU and more; select property to visualize', LABEL);
}

function draw() {
  updateCanvasSize();
  background(246, 249, 253);

  // Title
  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('Filament Property Explorer', canvasWidth / 2, 8);

  // Property selector buttons
  drawPropButtons();

  // Bar chart
  drawBars();

  // Material checkboxes (left column)
  drawCheckboxes();

  // Detail panel (bottom)
  drawDetail();

  hoveredMat = -1;
}

function drawPropButtons() {
  let bw = floor((canvasWidth - 20) / PROPS.length) - 4;
  let by = 34;

  PROPS.forEach((p, i) => {
    let bx = 10 + i * (bw + 4);
    let isSel = selectedProp === i;
    let isHov = mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + 26;

    fill(isSel ? color(40, 100, 200) : isHov ? color(80, 140, 220) : color(160, 190, 230));
    noStroke();
    rect(bx, by, bw, 26, 4);
    fill(255); textAlign(CENTER, CENTER); textSize(10.5);
    text(p.label, bx + bw/2, by + 13);
  });
}

function drawBars() {
  let chartX = 120;
  let chartY = 80;
  let chartW = canvasWidth - chartX - 30;
  let chartH = 300;

  let active = MATERIALS.filter((m, i) => visible[i]);
  if (active.length === 0) return;

  let prop = PROPS[selectedProp];
  let maxVal = Math.max(...active.map(m => m[prop.key]));
  maxVal = max(maxVal * 1.1, prop.max * 0.2);

  let barH = floor(chartH / MATERIALS.length) - 4;

  // Axis
  stroke(200); strokeWeight(1);
  line(chartX, chartY, chartX, chartY + chartH);
  line(chartX, chartY + chartH, chartX + chartW, chartY + chartH);

  // Grid lines
  for (let g = 0; g <= 4; g++) {
    let gx = chartX + chartW * g / 4;
    stroke(230); strokeWeight(0.5);
    line(gx, chartY, gx, chartY + chartH);
    noStroke(); fill(150); textSize(9); textAlign(CENTER, TOP);
    text(round(maxVal * g / 4), gx, chartY + chartH + 4);
  }

  // Unit label
  noStroke(); fill(100); textSize(10); textAlign(RIGHT, TOP);
  text(prop.unit, chartX + chartW + 28, chartY + chartH + 4);

  // Bars
  MATERIALS.forEach((m, i) => {
    let by = chartY + i * (barH + 4) + 2;
    let barW = visible[i] ? chartW * m[prop.key] / maxVal : 0;

    // Material label
    noStroke(); fill(50); textAlign(RIGHT, CENTER); textSize(11);
    text(m.name, chartX - 6, by + barH / 2);

    if (!visible[i]) {
      // Dimmed placeholder
      fill(230); noStroke();
      rect(chartX, by, 60, barH, 2);
      fill(190); textSize(9); textAlign(LEFT, CENTER);
      text('hidden', chartX + 4, by + barH/2);
      return;
    }

    let isHov = mouseX >= chartX && mouseX <= chartX + barW &&
                mouseY >= by && mouseY <= by + barH;
    if (isHov) hoveredMat = i;

    fill(m.col[0], m.col[1], m.col[2], isHov ? 240 : 200);
    noStroke();
    rect(chartX, by, barW, barH, 0, 3, 3, 0);

    // Value label
    fill(40); textSize(10); textAlign(LEFT, CENTER);
    text(m[prop.key] + ' ' + prop.unit, chartX + barW + 4, by + barH/2);

    // Hover tooltip
    if (isHov) {
      let tx = mouseX + 10, ty = mouseY - 12;
      fill(40, 50, 60, 230); noStroke();
      rect(tx, ty, 160, 18, 3);
      fill(255); textSize(9.5); textAlign(LEFT, CENTER);
      text(m.name + ': ' + m[prop.key] + ' ' + prop.unit, tx + 6, ty + 9);
    }
  });
}

function drawCheckboxes() {
  let cx = 10, cy = 80;
  MATERIALS.forEach((m, i) => {
    let barH = floor(300 / MATERIALS.length) - 4;
    let by = cy + i * (barH + 4) + 2;

    // Checkbox
    fill(visible[i] ? color(m.col[0], m.col[1], m.col[2]) : color(210));
    stroke(m.col[0], m.col[1], m.col[2]); strokeWeight(1);
    rect(cx, by + barH/2 - 7, 14, 14, 2);
    if (visible[i]) {
      noStroke(); fill(255); textSize(10); textAlign(CENTER, CENTER);
      text('✓', cx + 7, by + barH/2);
    }
  });
}

function drawDetail() {
  let dy = 400;
  let dw = canvasWidth - 20;

  stroke(200); strokeWeight(1);
  line(10, dy, 10 + dw, dy);

  if (hoveredMat >= 0) {
    let m = MATERIALS[hoveredMat];
    noStroke(); fill(m.col[0], m.col[1], m.col[2]);
    textAlign(LEFT, TOP); textSize(13);
    text(m.name, 12, dy + 10);

    // All properties
    let props = [
      ['Tensile Strength:', m.tensile + ' MPa'],
      ['Elongation:', m.elongation + '%'],
      ['Glass Transition:', m.tg + '°C'],
      ['Nozzle Temp:', m.nozzle + '°C'],
      ['Density:', m.density + ' g/cm³'],
    ];
    props.forEach(([lbl, val], idx) => {
      fill(80); textSize(10); textAlign(LEFT, TOP);
      text(lbl, 12 + idx * 140, dy + 30);
      fill(30); textSize(11);
      text(val, 12 + idx * 140, dy + 44);
    });

    fill(50); textSize(11); textAlign(LEFT, TOP);
    text(m.summary, 12, dy + 66, dw - 4);
  } else {
    noStroke(); fill(140);
    textAlign(CENTER, CENTER); textSize(11);
    text('Hover a bar to see full material properties and use-case summary', canvasWidth / 2, dy + 80);
  }

  // Application scenarios at bottom
  let sy = dy + 130;
  noStroke(); fill(50); textAlign(LEFT, TOP); textSize(11);
  text('Quick selection guide:', 12, sy);
  let scenarios = [
    ['Decorative props:', 'PLA'],
    ['Outdoor enclosure:', 'ASA or PETG'],
    ['Flexible seal/grip:', 'TPU'],
    ['Load-bearing bracket:', 'Nylon or PC'],
    ['Snap-fit housing:', 'PETG or ABS'],
    ['High-temp part:', 'PC'],
  ];
  scenarios.forEach(([scenario, mat], idx) => {
    let col = idx % 2 === 0 ? 248 : 255;
    fill(col); noStroke();
    rect(12 + idx * floor((canvasWidth-24)/6), sy + 18, floor((canvasWidth-24)/6) - 2, 34, 3);
    fill(80); textSize(9.5); textAlign(LEFT, TOP);
    text(scenario, 16 + idx * floor((canvasWidth-24)/6), sy + 20);
    fill(30, 80, 180); textSize(11);
    text(mat, 16 + idx * floor((canvasWidth-24)/6), sy + 34);
  });
}

function mousePressed() {
  // Property buttons
  let bw = floor((canvasWidth - 20) / PROPS.length) - 4;
  for (let i = 0; i < PROPS.length; i++) {
    let bx = 10 + i * (bw + 4);
    if (mouseX >= bx && mouseX <= bx + bw && mouseY >= 34 && mouseY <= 60) {
      selectedProp = i; return;
    }
  }

  // Checkboxes
  let cx = 10, cy = 80;
  MATERIALS.forEach((m, i) => {
    let barH = floor(300 / MATERIALS.length) - 4;
    let by = cy + i * (barH + 4) + 2;
    if (mouseX >= cx && mouseX <= cx + 14 && mouseY >= by + barH/2 - 7 && mouseY <= by + barH/2 + 7) {
      visible[i] = !visible[i];
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
