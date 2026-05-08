// Unit Converter for 3D Printing - p5.js MicroSim
// CANVAS_HEIGHT: 430
// Three-panel converter: length (mm↔in), temperature (°C↔°F), mass (g↔oz)
// Supports Quiz Me mode per panel and Reset All button

let containerWidth;
let canvasWidth = 720;
let drawHeight = 220;
let controlHeight = 210;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 14;
let defaultTextSize = 15;

// Sliders
let mmSlider, cSlider, gSlider;

// Quiz Me buttons (one per panel)
let quizBtnMM, quizBtnC, quizBtnG;

// Reset All button
let resetBtn;

// Quiz state: 0=length, 1=temp, 2=mass
let quizActive   = [false, false, false];
let quizInput    = [null,  null,  null];
let quizCheckBtn = [null,  null,  null];
let quizFeedback = [null,  null,  null]; // 'correct' | 'wrong:<answer>' | null

// Default values
const defaultMM = 50;
const defaultC  = 210;
const defaultG  = 250;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  let pw = Math.floor(canvasWidth / 3);

  // Length slider: 1–300 mm
  mmSlider = createSlider(1, 300, defaultMM);
  mmSlider.position(margin, drawHeight + 50);
  mmSlider.size(sliderW());

  // Temperature slider: 150–300 °C
  cSlider = createSlider(150, 300, defaultC);
  cSlider.position(pw + margin, drawHeight + 50);
  cSlider.size(sliderW());

  // Mass slider: 1–1000 g
  gSlider = createSlider(1, 1000, defaultG);
  gSlider.position(2 * pw + margin, drawHeight + 50);
  gSlider.size(sliderW());

  // Quiz Me buttons
  quizBtnMM = createButton('Quiz Me');
  quizBtnMM.position(margin, drawHeight + 90);
  quizBtnMM.mousePressed(() => toggleQuiz(0));

  quizBtnC = createButton('Quiz Me');
  quizBtnC.position(pw + margin, drawHeight + 90);
  quizBtnC.mousePressed(() => toggleQuiz(1));

  quizBtnG = createButton('Quiz Me');
  quizBtnG.position(2 * pw + margin, drawHeight + 90);
  quizBtnG.mousePressed(() => toggleQuiz(2));

  // Reset All button
  resetBtn = createButton('Reset All');
  resetBtn.position(canvasWidth / 2 - 40, drawHeight + controlHeight - 38);
  resetBtn.mousePressed(resetAll);

  describe('Interactive unit converter for 3D printing with quiz mode for length, temperature, and mass', LABEL);
}

function sliderW() {
  return Math.floor(canvasWidth / 3 - 2 * margin);
}

function draw() {
  updateCanvasSize();

  // Draw region
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Panel dividers
  stroke('#bbb');
  strokeWeight(1);
  let pw = Math.floor(canvasWidth / 3);
  line(pw, 0, pw, canvasHeight);
  line(2 * pw, 0, 2 * pw, canvasHeight);
  noStroke();

  let mm   = mmSlider.value();
  let degC = cSlider.value();
  let g    = gSlider.value();

  drawLengthPanel(0, pw, mm);
  drawTempPanel(pw, pw, degC);
  drawMassPanel(2 * pw, pw, g);

  // Slider labels (in control area)
  noStroke();
  fill('#333');
  textAlign(LEFT, TOP);
  textSize(13);
  text('Length: ' + mm + ' mm',    margin,          drawHeight + 30);
  text('Temp: '   + degC + ' °C',  pw + margin,     drawHeight + 30);
  text('Mass: '   + g    + ' g',   2*pw + margin,   drawHeight + 30);

  // Reposition controls on resize
  mmSlider.position(margin,        drawHeight + 50);
  mmSlider.size(sliderW());
  cSlider.position( pw + margin,   drawHeight + 50);
  cSlider.size(sliderW());
  gSlider.position(2*pw + margin,  drawHeight + 50);
  gSlider.size(sliderW());

  quizBtnMM.position(margin,        drawHeight + 90);
  quizBtnC.position( pw + margin,   drawHeight + 90);
  quizBtnG.position(2*pw + margin,  drawHeight + 90);
  resetBtn.position(canvasWidth / 2 - 40, drawHeight + controlHeight - 38);

  // Quiz inputs / check buttons
  for (let i = 0; i < 3; i++) {
    if (quizActive[i] && quizInput[i]) {
      quizInput[i].position(i * pw + margin,         drawHeight + 125);
      quizCheckBtn[i].position(i * pw + margin + 108, drawHeight + 125);
    }
  }

  // Quiz feedback text
  for (let i = 0; i < 3; i++) {
    if (quizFeedback[i]) {
      let fx = i * pw + margin;
      let fy = drawHeight + 158;
      if (quizFeedback[i] === 'correct') {
        fill('green');
        textAlign(LEFT, TOP);
        textSize(13);
        text('✓ Correct!', fx, fy);
      } else {
        fill('#c62828');
        textAlign(LEFT, TOP);
        textSize(13);
        text('✗ ' + quizFeedback[i], fx, fy);
      }
    }
  }
}

// ── Panel drawing ──────────────────────────────────────────────────────────

function drawLengthPanel(x0, pw, mm) {
  let cx = x0 + pw / 2;
  noStroke();

  // Title
  fill('#1565c0');
  textAlign(CENTER, TOP);
  textSize(17);
  text('Length', cx, 10);

  // Conversion value
  let inVal = (mm / 25.4).toFixed(3);
  textSize(20);
  fill('#111');
  textAlign(CENTER, CENTER);
  if (!quizActive[0]) {
    text(mm + ' mm = ' + inVal + ' in', cx, 65);
  } else {
    text(mm + ' mm = ? in', cx, 65);
  }

  // Context note
  textSize(12);
  fill('#555');
  textAlign(CENTER, TOP);
  text('A standard print bed is 220 mm = 8.66 in wide.', cx, 100, pw - 10, 60);

  // Mini ruler
  stroke('#1565c0');
  strokeWeight(2);
  let rw = pw * 0.65;
  let rx = cx - rw / 2;
  let ry = 150;
  line(rx, ry, rx + rw, ry);
  for (let t = 0; t <= 10; t++) {
    let tx = rx + t * rw / 10;
    let th = (t % 5 === 0) ? 10 : 5;
    line(tx, ry, tx, ry + th);
  }
  noStroke();
  fill('#1565c0');
  textSize(10);
  textAlign(LEFT, TOP);
  text('0', rx - 3, ry + 12);
  textAlign(RIGHT, TOP);
  text(mm + ' mm', rx + rw, ry + 12);
}

function drawTempPanel(x0, pw, degC) {
  let cx = x0 + pw / 2;
  noStroke();

  // Title
  fill('#b71c1c');
  textAlign(CENTER, TOP);
  textSize(17);
  text('Temperature', cx, 10);

  // Conversion
  let fVal = Math.round(degC * 9 / 5 + 32);
  textSize(20);
  fill('#111');
  textAlign(CENTER, CENTER);
  if (!quizActive[1]) {
    text(degC + ' °C = ' + fVal + ' °F', cx, 52);
  } else {
    text(degC + ' °C = ? °F', cx, 52);
  }

  // Color bar: blue (150°C) → orange (250°C) → red (300°C)
  let barW = pw * 0.78;
  let barX = cx - barW / 2;
  let barY = 82;
  let barH = 16;
  for (let bx = 0; bx < barW; bx++) {
    let t = bx / barW;
    let r, g, b;
    if (t < 0.67) {
      r = lerp(0,   255, t / 0.67);
      g = lerp(80,  130, t / 0.67);
      b = lerp(220, 0,   t / 0.67);
    } else {
      r = lerp(255, 180, (t - 0.67) / 0.33);
      g = lerp(130, 0,   (t - 0.67) / 0.33);
      b = 0;
    }
    stroke(r, g, b);
    line(barX + bx, barY, barX + bx, barY + barH);
  }
  // Tick indicator
  let tickX = barX + map(degC, 150, 300, 0, barW);
  stroke('black');
  strokeWeight(2);
  line(tickX, barY - 5, tickX, barY + barH + 5);
  noStroke();

  // Bar labels
  textSize(10);
  fill('#555');
  textAlign(LEFT, TOP);
  text('150°C', barX, barY + barH + 3);
  textAlign(RIGHT, TOP);
  text('300°C', barX + barW, barY + barH + 3);

  // Context note
  textSize(12);
  fill('#555');
  textAlign(CENTER, TOP);
  text('PLA prints at ~210 °C = 410 °F.', cx, 126, pw - 10, 50);
}

function drawMassPanel(x0, pw, g) {
  let cx = x0 + pw / 2;
  noStroke();

  // Title
  fill('#4a148c');
  textAlign(CENTER, TOP);
  textSize(17);
  text('Mass', cx, 10);

  // Conversion
  let ozVal = (g / 28.35).toFixed(1);
  textSize(20);
  fill('#111');
  textAlign(CENTER, CENTER);
  if (!quizActive[2]) {
    text(g + ' g = ' + ozVal + ' oz', cx, 65);
  } else {
    text(g + ' g = ? oz', cx, 65);
  }

  // Context note
  textSize(12);
  fill('#555');
  textAlign(CENTER, TOP);
  text('A standard filament spool is 1,000 g = 35.3 oz.', cx, 102, pw - 10, 50);

  // Spool icon
  let spoolX = cx;
  let spoolY = 168;
  let spoolR = 24;
  let pct = map(g, 1, 1000, 0.05, 0.95);
  // Outer ring
  stroke('#7b1fa2');
  strokeWeight(3);
  noFill();
  ellipse(spoolX, spoolY, spoolR * 2, spoolR * 2);
  // Filament fill arc
  stroke('#ce93d8');
  strokeWeight(8);
  arc(spoolX, spoolY, spoolR * 1.6, spoolR * 1.6, -HALF_PI, -HALF_PI + TWO_PI * pct);
  // Hub
  fill('#e1bee7');
  noStroke();
  ellipse(spoolX, spoolY, 12, 12);
  // Flanges
  fill('#7b1fa2');
  noStroke();
  rect(spoolX - spoolR - 4, spoolY - 7, 8, 14, 2);
  rect(spoolX + spoolR - 4, spoolY - 7, 8, 14, 2);
  // Percent label
  fill('#4a148c');
  textSize(10);
  textAlign(CENTER, CENTER);
  text(Math.round(pct * 100) + '%', spoolX + spoolR + 12, spoolY);
}

// ── Quiz logic ─────────────────────────────────────────────────────────────

function toggleQuiz(panel) {
  quizActive[panel] = !quizActive[panel];
  quizFeedback[panel] = null;
  let btns = [quizBtnMM, quizBtnC, quizBtnG];
  let pw = Math.floor(canvasWidth / 3);

  if (quizActive[panel]) {
    quizInput[panel] = createInput('');
    quizInput[panel].attribute('placeholder', 'Your answer');
    quizInput[panel].size(95);
    quizInput[panel].position(panel * pw + margin, drawHeight + 125);

    quizCheckBtn[panel] = createButton('Check');
    quizCheckBtn[panel].position(panel * pw + margin + 108, drawHeight + 125);
    quizCheckBtn[panel].mousePressed(() => checkAnswer(panel));

    btns[panel].html('Hide Quiz');
  } else {
    if (quizInput[panel])    { quizInput[panel].remove();    quizInput[panel]    = null; }
    if (quizCheckBtn[panel]) { quizCheckBtn[panel].remove(); quizCheckBtn[panel] = null; }
    btns[panel].html('Quiz Me');
  }
}

function checkAnswer(panel) {
  let inputEl = quizInput[panel];
  if (!inputEl) return;
  let userVal = parseFloat(inputEl.value());
  if (isNaN(userVal)) { quizFeedback[panel] = 'Enter a number'; return; }

  let correct, tol;
  if (panel === 0) {
    correct = mmSlider.value() / 25.4;
    tol     = 0.01;
    quizFeedback[panel] = Math.abs(userVal - correct) <= tol
      ? 'correct'
      : 'Answer: ' + correct.toFixed(3) + ' in';
  } else if (panel === 1) {
    correct = cSlider.value() * 9 / 5 + 32;
    tol     = 1;
    quizFeedback[panel] = Math.abs(userVal - correct) <= tol
      ? 'correct'
      : 'Answer: ' + Math.round(correct) + ' °F';
  } else {
    correct = gSlider.value() / 28.35;
    tol     = 0.5;
    quizFeedback[panel] = Math.abs(userVal - correct) <= tol
      ? 'correct'
      : 'Answer: ' + correct.toFixed(1) + ' oz';
  }
}

function resetAll() {
  mmSlider.value(defaultMM);
  cSlider.value(defaultC);
  gSlider.value(defaultG);
  for (let i = 0; i < 3; i++) {
    if (quizActive[i]) toggleQuiz(i);
    quizFeedback[i] = null;
  }
}

// ── Responsive ─────────────────────────────────────────────────────────────

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  mmSlider.size(sliderW());
  cSlider.size(sliderW());
  gSlider.size(sliderW());
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth    = containerWidth;
}
