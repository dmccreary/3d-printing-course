// File Format Comparison — STL vs 3MF vs OBJ for 3D printing
// CANVAS_HEIGHT: 580
// Bloom L4: compare and differentiate file formats; choose appropriate format

let containerWidth;
let canvasWidth  = 700;
let drawHeight   = 430;
let detailH      = 150;
let canvasHeight  = drawHeight + detailH;
let containerHeight = canvasHeight;

const FORMATS = [
  {
    name: 'STL',
    subtitle: 'STereoLithography',
    col: [50, 120, 200],
    year: '1987',
    props: {
      'Color/Texture': ['✗ None', 0],
      'Material Info': ['✗ None', 0],
      'Metadata':      ['✗ None', 0],
      'Units':         ['✗ None (mm assumed)', 1],
      'Compression':   ['✗ Binary ~50% smaller', 1],
      'Print-Ready':   ['✓ Universal support', 3],
      'Multi-Body':    ['✗ Single mesh', 0],
    },
    useCase: 'Best for simple single-color prints. Universally supported by every slicer. Use when compatibility is the top priority.',
    pros: ['Every slicer accepts it', 'Simple to inspect and repair', 'ASCII or binary variants'],
    cons: ['No color or material data', 'No units — convention is mm', 'Large file sizes for complex models'],
    icon: '▣'
  },
  {
    name: '3MF',
    subtitle: '3D Manufacturing Format',
    col: [30, 150, 80],
    year: '2015',
    props: {
      'Color/Texture': ['✓ Full RGBA + texture', 3],
      'Material Info': ['✓ Material properties', 3],
      'Metadata':      ['✓ Rich XML metadata', 3],
      'Units':         ['✓ Explicitly specified', 3],
      'Compression':   ['✓ ZIP compression', 3],
      'Print-Ready':   ['✓ Print orientation & support', 3],
      'Multi-Body':    ['✓ Multiple objects', 3],
    },
    useCase: 'Best for modern workflows, multi-material prints, and full design intent. The preferred format for PrusaSlicer, Bambu Studio, and Cura.',
    pros: ['Preserves color, materials, metadata', 'Compressed — smaller than STL', 'Supports multi-object assemblies'],
    cons: ['Not supported by all older slicers', 'More complex to inspect manually'],
    icon: '◈'
  },
  {
    name: 'OBJ',
    subtitle: 'Wavefront Object',
    col: [190, 100, 30],
    year: '1992',
    props: {
      'Color/Texture': ['✓ via .MTL file', 2],
      'Material Info': ['△ Basic via .MTL', 1],
      'Metadata':      ['△ Comments only', 1],
      'Units':         ['✗ None', 0],
      'Compression':   ['✗ ASCII only (large)', 0],
      'Print-Ready':   ['△ Slicer dependent', 1],
      'Multi-Body':    ['✓ Named groups', 2],
    },
    useCase: 'Good when textures or multi-part geometry are needed and 3MF is not available. Originally a 3D graphics format, not designed for printing.',
    pros: ['Color + texture via MTL file', 'Widely supported in 3D software', 'Human-readable ASCII'],
    cons: ['Large ASCII file sizes', 'External .MTL texture file required', 'No print-specific metadata'],
    icon: '○'
  }
];

const PROPS = Object.keys(FORMATS[0].props);
let selectedFormat = -1;
let hoveredFormat  = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  describe('File Format Comparison — click a format card to learn when to use STL, 3MF, or OBJ', LABEL);
}

function draw() {
  updateCanvasSize();

  // Background
  fill(245, 248, 252); stroke(210); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill(255); noStroke();
  rect(0, drawHeight, canvasWidth, detailH);

  // Title
  noStroke(); fill(20, 50, 110);
  textAlign(CENTER, TOP); textSize(17);
  text('3D Printing File Format Comparison', canvasWidth / 2, 8);

  // Subtitle
  fill(90); textSize(11);
  text('Click a format card to see details and use cases', canvasWidth / 2, 30);

  // Format cards
  let cardW = floor(canvasWidth / 3) - 20;
  let cardX0 = 10;
  for (let i = 0; i < 3; i++) {
    drawFormatCard(i, cardX0 + i * (cardW + 10), 48, cardW);
  }

  // Detail panel
  if (selectedFormat >= 0) {
    drawDetail(selectedFormat);
  } else {
    noStroke(); fill(160);
    textAlign(CENTER, CENTER); textSize(12);
    text('Click any format card above to see its strengths, trade-offs, and use cases.',
      canvasWidth / 2, drawHeight + detailH / 2);
  }

  hoveredFormat = -1;
}

function drawFormatCard(idx, cx, cy, cw) {
  let f = FORMATS[idx];
  let ch = drawHeight - cy - 8;
  let isSel = selectedFormat === idx;
  let isHov = mouseX >= cx && mouseX <= cx + cw && mouseY >= cy && mouseY <= cy + ch;
  if (isHov) hoveredFormat = idx;

  // Card background
  fill(isSel ? color(f.col[0], f.col[1], f.col[2], 30) :
       isHov ? color(f.col[0], f.col[1], f.col[2], 15) : 255);
  stroke(isSel ? color(f.col[0], f.col[1], f.col[2]) : color(210));
  strokeWeight(isSel ? 2.5 : 1);
  rect(cx, cy, cw, ch, 6);

  // Header strip
  fill(f.col[0], f.col[1], f.col[2]); noStroke();
  rect(cx, cy, cw, 44, 6, 6, 0, 0);

  // Format name
  fill(255); textAlign(CENTER, CENTER); textSize(20);
  text(f.name, cx + cw / 2, cy + 16);
  textSize(9.5);
  text(f.subtitle, cx + cw / 2, cy + 34);

  // Year tag
  fill(f.col[0], f.col[1], f.col[2], 160); noStroke();
  rect(cx + cw - 38, cy + 6, 32, 14, 3);
  fill(255); textSize(9); textAlign(CENTER, CENTER);
  text(f.year, cx + cw - 22, cy + 13);

  // Property rows
  let rowH = (ch - 52) / PROPS.length;
  PROPS.forEach((p, r) => {
    let ry = cy + 50 + r * rowH;
    let [label, score] = f.props[p];
    let rowCol = score === 3 ? color(40, 140, 60) :
                 score === 2 ? color(100, 160, 50) :
                 score === 1 ? color(200, 140, 20) : color(180, 60, 40);

    // Alternating background
    if (r % 2 === 0) { fill(248); noStroke(); rect(cx + 1, ry, cw - 2, rowH); }

    // Property name
    fill(60); textAlign(LEFT, TOP); textSize(9.5);
    text(p, cx + 6, ry + 2);

    // Score dots
    let dotX = cx + cw - 38;
    for (let d = 0; d < 3; d++) {
      fill(d < score ? rowCol : color(220));
      noStroke();
      ellipse(dotX + d * 10, ry + rowH / 2, 7, 7);
    }

    // Value label
    fill(rowCol); textSize(8.5); textAlign(LEFT, TOP);
    text(label.replace(/^[✓✗△] /, ''), cx + 6, ry + rowH - 12, cw - 48);
  });

  // Click hint
  if (isHov && !isSel) {
    noStroke(); fill(f.col[0], f.col[1], f.col[2], 200);
    rect(cx + cw/2 - 40, cy + ch - 18, 80, 14, 4);
    fill(255); textSize(9); textAlign(CENTER, CENTER);
    text('Click to expand', cx + cw/2, cy + ch - 11);
  }
}

function drawDetail(idx) {
  let f = FORMATS[idx];
  let x = 12, y = drawHeight + 10, w = canvasWidth - 24;

  // Header
  noStroke(); fill(f.col[0], f.col[1], f.col[2]);
  textAlign(LEFT, TOP); textSize(14);
  text(f.name + ' — ' + f.subtitle, x, y);
  stroke(f.col[0], f.col[1], f.col[2]); strokeWeight(1.5);
  line(x, y + 20, x + w, y + 20);

  // Use case
  noStroke(); fill(40);
  textSize(11); textAlign(LEFT, TOP);
  text(f.useCase, x, y + 26, w * 0.55);

  // Pros / Cons
  let col1 = x + w * 0.58;
  let col2 = x + w * 0.80;
  fill(30, 140, 50); textSize(10.5);
  text('Pros:', col1, y + 26);
  fill(50);
  f.pros.forEach((p, i) => { text('+ ' + p, col1, y + 40 + i * 16, w * 0.20); });

  fill(180, 40, 40); textSize(10.5);
  text('Cons:', col2, y + 26);
  fill(50);
  f.cons.forEach((c, i) => { text('− ' + c, col2, y + 40 + i * 16, w * 0.20); });
}

function mousePressed() {
  let cardW = floor(canvasWidth / 3) - 20;
  let cardX0 = 10;
  let ch = drawHeight - 48 - 8;
  for (let i = 0; i < 3; i++) {
    let cx = cardX0 + i * (cardW + 10);
    if (mouseX >= cx && mouseX <= cx + cardW && mouseY >= 48 && mouseY <= 48 + ch) {
      selectedFormat = (selectedFormat === i) ? -1 : i;
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
