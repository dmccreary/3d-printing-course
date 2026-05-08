// FDM Failure Diagnosis — decision tree for identifying print failure root causes
// CANVAS_HEIGHT: 640
// Bloom L5: evaluate a print failure by navigating a diagnostic decision tree

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 640;

let currentNode = 0;
let breadcrumb  = [];
let expandedLeaf = false;

// Tree data: id, question/title, children[] or fix data
const NODES = [
  // Root
  {
    id: 0, type: 'branch', col: [50, 120, 210],
    q: 'Where does the failure appear?',
    choices: [
      { label: 'First layer only', next: 1 },
      { label: 'All/most layers', next: 5 },
      { label: 'Specific geometry', next: 9 },
      { label: 'Mid-print or late failure', next: 13 },
    ]
  },

  // --- First Layer branch ---
  {
    id: 1, type: 'branch', col: [50, 120, 210],
    q: 'What does the first layer look like?',
    choices: [
      { label: 'Not sticking at all / peeling up', next: 2 },
      { label: 'Squished flat / rough', next: 3 },
      { label: 'Corners lifting (warping)', next: 4 },
    ]
  },
  {
    id: 2, type: 'leaf', col: [40, 160, 80],
    title: 'Poor Bed Adhesion',
    cause: 'The nozzle is too far from the bed, or the bed surface is contaminated with oils from handling.',
    fix: ['Clean bed with IPA — never touch the print surface with bare hands.',
          'Re-level bed: target 0.1–0.2 mm gap (paper drag test).',
          'Increase bed temperature (60°C for PLA, 80–100°C for ABS).',
          'Apply PEI sheet, glue stick, or hairspray if surface is worn.'],
    slicer: 'First layer height: 0.2–0.3 mm; first layer speed: ≤ 30 mm/s',
    safety: false,
  },
  {
    id: 3, type: 'leaf', col: [40, 160, 80],
    title: 'Z-Offset Too Close (Elephant\'s Foot)',
    cause: 'The nozzle is too close to the bed, squishing filament flat. The base layers bulge outward wider than designed.',
    fix: ['Increase Z-offset by 0.05 mm increments until first layer has slight texture.',
          'First layer should be slightly squished (good) but not paper-thin.',
          'Reduce elephant\'s foot via chamfer in CAD or first layer flow compensation in slicer.'],
    slicer: 'Z-offset; first layer flow rate (try 90% for flat bases)',
    safety: false,
  },
  {
    id: 4, type: 'leaf', col: [40, 160, 80],
    title: 'Warping / Corner Lifting',
    cause: 'Thermal contraction as the part cools pulls corners upward. More severe with ABS, large flat parts, or a cold bed.',
    fix: ['Increase bed temperature (or use enclosure for ABS).',
          'Use a brim (5–10 mm) in slicer to anchor corners.',
          'Reduce part cooling fan speed for first 3–5 layers.',
          'Print in a draft-free area; even a small air current causes warping.'],
    slicer: 'Brim width; bed temperature; first layer fan speed',
    safety: false,
  },

  // --- All Layers branch ---
  {
    id: 5, type: 'branch', col: [50, 120, 210],
    q: 'What does the problem look like throughout the print?',
    choices: [
      { label: 'Under-filled / gaps between lines', next: 6 },
      { label: 'Over-filled / blobs / ooze', next: 7 },
      { label: 'Layers not bonding / delaminating', next: 8 },
    ]
  },
  {
    id: 6, type: 'leaf', col: [40, 160, 80],
    title: 'Under-Extrusion',
    cause: 'Less filament is being deposited than the slicer expects, leaving visible gaps. Common causes: partial clog, worn extruder gear, wrong flow rate, or wet filament.',
    fix: ['Check extruder gear for wear or slippage; tighten idler tension.',
          'Do a cold pull to clear partial clog.',
          'Increase flow/extrusion multiplier by 5% increments.',
          'Dry filament (PLA: 45°C/4 hr; PETG: 65°C/4 hr; Nylon: 80°C/6 hr).'],
    slicer: 'Extrusion multiplier / flow rate; retraction settings',
    safety: false,
  },
  {
    id: 7, type: 'leaf', col: [40, 160, 80],
    title: 'Over-Extrusion / Blobs & Zits',
    cause: 'Too much filament is being pushed out relative to the move distance, creating blobs at corners and rough surfaces.',
    fix: ['Reduce flow rate (extrusion multiplier) by 5% increments.',
          'Increase retraction distance/speed to reduce ooze.',
          'Enable "wipe before retract" and "coasting" in slicer.',
          'Lower print temperature by 5°C to reduce melt viscosity.'],
    slicer: 'Flow rate; retraction; coasting; temperature',
    safety: false,
  },
  {
    id: 8, type: 'leaf', col: [185, 60, 60],
    title: 'Layer Separation / Delamination',
    cause: 'Consecutive layers are not bonding. Usually caused by printing too cold, too fast, or with a layer height too large for the nozzle diameter.',
    fix: ['Increase nozzle temperature by 5°C increments.',
          'Reduce print speed — give the melt time to bond.',
          'Keep layer height ≤ 75% of nozzle diameter (e.g., ≤ 0.30 mm for 0.4 mm nozzle).',
          'Check for drafts cooling the part prematurely.'],
    slicer: 'Print temperature; layer height (max 75% of nozzle Ø); print speed',
    safety: true,
  },

  // --- Specific Geometry branch ---
  {
    id: 9, type: 'branch', col: [50, 120, 210],
    q: 'Where specifically is the problem?',
    choices: [
      { label: 'Overhangs / bridges are drooping', next: 10 },
      { label: 'Fine details / corners are blurry', next: 11 },
      { label: 'Stringing between parts', next: 12 },
    ]
  },
  {
    id: 10, type: 'leaf', col: [40, 160, 80],
    title: 'Poor Overhang / Bridge Quality',
    cause: 'Overhangs beyond ~45° or bridges over ~50 mm lack support from below, causing filament to sag before solidifying.',
    fix: ['Enable supports in slicer for overhangs > 45°.',
          'Increase part cooling fan to maximum for overhangs.',
          'Reduce speed on overhanging perimeters (bridge speed: 30–50 mm/s).',
          'Redesign part: use chamfers (45°) or teardrop holes instead of flat overhangs.'],
    slicer: 'Support settings; overhang threshold; bridge speed; cooling fan',
    safety: false,
  },
  {
    id: 11, type: 'leaf', col: [40, 160, 80],
    title: 'Ringing / Ghosting',
    cause: 'Vibrations from rapid direction changes create ripple artifacts on surfaces near corners. More pronounced at higher speeds.',
    fix: ['Reduce print speed (perimeter speed 40–50 mm/s).',
          'Enable input shaping / resonance compensation in firmware (Klipper).',
          'Check all frame bolts and belt tensions.',
          'Reduce acceleration in slicer (< 3000 mm/s²).'],
    slicer: 'Print speed; acceleration; jerk settings',
    safety: false,
  },
  {
    id: 12, type: 'leaf', col: [40, 160, 80],
    title: 'Stringing / Oozing',
    cause: 'Molten filament drips or oozes during travel moves, leaving thin hairs between features. Caused by insufficient retraction or too-high temperature.',
    fix: ['Increase retraction distance (FDM: 1–7 mm depending on bowden/direct).',
          'Increase retraction speed (40–60 mm/s).',
          'Lower print temperature by 5–10°C.',
          'Enable "avoid crossing perimeters" and "combing" in slicer.'],
    slicer: 'Retraction distance and speed; temperature; travel settings',
    safety: false,
  },

  // --- Mid-print branch ---
  {
    id: 13, type: 'branch', col: [50, 120, 210],
    q: 'What happens during the failure?',
    choices: [
      { label: 'Print stops extruding (clog)', next: 14 },
      { label: 'Print detaches from bed mid-print', next: 15 },
      { label: 'Printer stops/shuts down unexpectedly', next: 16 },
    ]
  },
  {
    id: 14, type: 'leaf', col: [185, 60, 60],
    title: 'Nozzle Clog',
    cause: 'Burnt or carbonized filament is blocking the nozzle bore. Often caused by printing too hot, leaving filament in a hot nozzle too long, or using low-quality filament.',
    fix: ['Cold pull: heat to 200°C, push filament, cool to 90°C, pull firmly — repeat until clean.',
          'Atomic pull with nylon filament works well for stubborn clogs.',
          'If cold pull fails, remove nozzle and soak in acetone (ABS) or use needle to clear.',
          'Never leave filament in a hot nozzle idle for > 10 minutes.'],
    slicer: 'Print temperature; purge line; nozzle maintenance schedule',
    safety: true,
  },
  {
    id: 15, type: 'leaf', col: [40, 160, 80],
    title: 'Mid-Print Adhesion Failure',
    cause: 'The part releases from the bed during printing. Usually caused by tall parts catching drafts, or a warping-prone material without an enclosure.',
    fix: ['Use a brim or raft for tall/narrow parts.',
          'Print in an enclosure or draft-free area.',
          'Check that bed temperature is consistent throughout the print (not just initial).',
          'For ABS/ASA: enclosure + 80–100°C bed is nearly mandatory for large parts.'],
    slicer: 'Brim/raft; bed temperature control; enclosure use',
    safety: false,
  },
  {
    id: 16, type: 'leaf', col: [185, 60, 60],
    title: 'Thermal Runaway / Unexpected Shutdown',
    cause: 'Firmware detected that the heater block temperature is not responding as expected — a potential fire hazard. This is a safety feature, not a bug.',
    fix: ['Check that the thermistor is properly seated in the heater block.',
          'Check heater cartridge wiring for breaks or loose connections.',
          'Ensure part cooling fan is not blowing directly onto the heater block.',
          'Do NOT disable thermal runaway protection — it prevents printer fires.'],
    slicer: 'Firmware thermal runaway settings (do not disable)',
    safety: true,
  },
];

let nodeMap = {};
NODES.forEach(n => { nodeMap[n.id] = n; });

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('FDM Failure Diagnosis — click through a decision tree to diagnose print failures', LABEL);
  textFont('sans-serif');
}

function draw() {
  updateCanvasSize();
  background(238, 244, 252);

  noStroke(); fill(18, 48, 110);
  textAlign(CENTER, TOP); textSize(17); textStyle(BOLD);
  text('FDM Print Failure Diagnosis', canvasWidth / 2, 6);
  textStyle(NORMAL);

  drawBreadcrumb();

  let node = nodeMap[currentNode];
  if (node.type === 'branch') {
    drawBranchNode(node);
  } else {
    drawLeafNode(node);
  }
}

function drawBreadcrumb() {
  let by = 32, bh = 20;
  let segments = ['Root', ...breadcrumb.map((b, i) => {
    let n = nodeMap[b];
    return n.type === 'branch' ? n.choices.find(c => {
      let idx = breadcrumb[i + 1] !== undefined ? breadcrumb[i + 1] : currentNode;
      return c.next === idx;
    })?.label?.substring(0, 18) || '?' : n.title?.substring(0, 18);
  })];

  let x = 10;
  segments.forEach((seg, i) => {
    if (!seg) return;
    let sw = min(textWidth(seg) + 16, 150);
    let isLast = i === segments.length - 1;
    fill(isLast ? color(30, 90, 210) : color(200, 210, 230));
    stroke(isLast ? color(15, 60, 160) : color(160, 175, 205));
    strokeWeight(1); rect(x, by, sw, bh, 3);
    noStroke(); fill(isLast ? 255 : 60); textAlign(LEFT, CENTER); textSize(9.5);
    text(seg, x + 5, by + bh / 2);
    x += sw + 4;
    if (!isLast && x < canvasWidth - 30) {
      noStroke(); fill(120); textAlign(CENTER, CENTER); textSize(11);
      text('›', x - 1, by + bh / 2);
      x += 6;
    }
  });

  // Start Over button
  fill(215, 80, 60); stroke(175, 55, 40); strokeWeight(1);
  rect(canvasWidth - 90, by, 82, bh, 3);
  noStroke(); fill(255); textAlign(CENTER, CENTER); textSize(10);
  text('↺ Start Over', canvasWidth - 49, by + bh / 2);
}

function drawBranchNode(node) {
  let qy = 64, qh = 70;
  let cx = canvasWidth / 2;

  // Question box
  let nc = node.col;
  fill(nc[0], nc[1], nc[2], 30); stroke(nc[0], nc[1], nc[2]); strokeWeight(1.5);
  rect(14, qy, canvasWidth - 28, qh, 6);
  noStroke(); fill(nc[0], nc[1], nc[2]); textAlign(LEFT, CENTER); textSize(15); textStyle(BOLD);
  text(node.q, 26, qy + qh / 2, canvasWidth - 52);
  textStyle(NORMAL);

  // Choice buttons
  let choices = node.choices;
  let bh = 58, gap = 8;
  let totalH = choices.length * (bh + gap) - gap;
  let startY = qy + qh + 20 + (canvasHeight - qy - qh - 20 - totalH) / 2;

  choices.forEach((ch, i) => {
    let bw = canvasWidth - 40, bx = 20;
    let by2 = startY + i * (bh + gap);
    let hov = mouseX >= bx && mouseX <= bx + bw && mouseY >= by2 && mouseY <= by2 + bh;

    let nextNode = nodeMap[ch.next];
    let endCol = nextNode.type === 'leaf'
      ? (nextNode.safety ? [185, 60, 60] : [40, 160, 80])
      : [50, 120, 210];

    fill(hov ? color(endCol[0], endCol[1], endCol[2], 50) : color(255, 254, 252));
    stroke(hov ? color(endCol[0], endCol[1], endCol[2]) : color(190, 205, 225));
    strokeWeight(hov ? 2 : 1); rect(bx, by2, bw, bh, 5);

    noStroke(); fill(endCol[0], endCol[1], endCol[2], 40); rect(bx, by2, 6, bh, 5, 0, 0, 5);

    fill(40); textAlign(LEFT, CENTER); textSize(13); textStyle(BOLD);
    text(ch.label, bx + 20, by2 + bh / 2, bw - 80);
    textStyle(NORMAL);

    if (nextNode.type === 'leaf') {
      fill(endCol[0], endCol[1], endCol[2]); textAlign(RIGHT, CENTER); textSize(10);
      text((nextNode.safety ? '⚠ ' : '✓ ') + 'Diagnosis available', bx + bw - 12, by2 + bh / 2);
    } else {
      fill(80); textAlign(RIGHT, CENTER); textSize(10);
      text(nextNode.choices.length + ' more options →', bx + bw - 12, by2 + bh / 2);
    }
  });

  // Depth indicator
  noStroke(); fill(100); textAlign(CENTER, BOTTOM); textSize(10);
  text('Click an option above to continue diagnosis', cx, canvasHeight - 6);
}

function drawLeafNode(node) {
  let cx = canvasWidth / 2;
  let nc = node.col;
  let safety = node.safety;

  // Header
  fill(nc[0], nc[1], nc[2]); noStroke();
  rect(10, 60, canvasWidth - 20, 44, 5);
  fill(255); textAlign(CENTER, CENTER); textSize(16); textStyle(BOLD);
  text((safety ? '⚠ ' : '✓ ') + node.title, cx, 82);
  textStyle(NORMAL);

  let y = 116;

  // Root cause
  fill(40, 50, 80); noStroke(); textAlign(LEFT, TOP); textSize(11); textStyle(BOLD);
  text('Root Cause:', 18, y);
  textStyle(NORMAL); fill(40); textSize(11);
  text(node.cause, 18, y + 18, canvasWidth - 36);
  y += 54;

  // Fix
  fill(40, 50, 80); noStroke(); textAlign(LEFT, TOP); textSize(11); textStyle(BOLD);
  text('Recommended Fix:', 18, y);
  textStyle(NORMAL); fill(40); textSize(11);
  y += 18;
  node.fix.forEach((step, i) => {
    fill(nc[0], nc[1], nc[2]); noStroke(); ellipse(26, y + 7, 10, 10);
    fill(255); textAlign(CENTER, CENTER); textSize(8);
    text(i + 1, 26, y + 7);
    fill(40); textAlign(LEFT, TOP); textSize(11);
    text(step, 36, y, canvasWidth - 52);
    y += 28;
  });

  // Slicer setting
  y += 4;
  fill(220, 235, 255); stroke(160, 185, 230); strokeWeight(1);
  rect(10, y, canvasWidth - 20, 30, 4);
  noStroke(); fill(40, 60, 130); textAlign(LEFT, CENTER); textSize(10.5); textStyle(BOLD);
  text('Slicer Setting: ', 18, y + 15);
  textStyle(NORMAL); fill(50);
  text(node.slicer, 118, y + 15, canvasWidth - 130);

  if (safety) {
    y += 38;
    fill(255, 230, 230); stroke(185, 60, 60); strokeWeight(1.5);
    rect(10, y, canvasWidth - 20, 28, 4);
    noStroke(); fill(185, 60, 60); textAlign(CENTER, CENTER); textSize(10.5); textStyle(BOLD);
    text('⚠ Safety Note: Review firmware settings and inspect wiring before resuming printing.', cx, y + 14, canvasWidth - 30);
    textStyle(NORMAL);
  }

  // Back button
  let bby = canvasHeight - 38;
  fill(50, 80, 160); stroke(30, 55, 130); strokeWeight(1);
  rect(canvasWidth / 2 - 90, bby, 180, 28, 4);
  noStroke(); fill(255); textAlign(CENTER, CENTER); textSize(12);
  text('← Go Back', canvasWidth / 2, bby + 14);
}

function mousePressed() {
  // Start Over
  if (mouseX >= canvasWidth - 90 && mouseX <= canvasWidth - 8 && mouseY >= 32 && mouseY <= 52) {
    currentNode = 0; breadcrumb = []; expandedLeaf = false; return;
  }

  let node = nodeMap[currentNode];

  if (node.type === 'leaf') {
    // Back button
    let bby = canvasHeight - 38;
    if (mouseX >= canvasWidth / 2 - 90 && mouseX <= canvasWidth / 2 + 90 && mouseY >= bby && mouseY <= bby + 28) {
      currentNode = breadcrumb.pop() || 0; return;
    }
    return;
  }

  // Branch: choice buttons
  let qy = 64, qh = 70;
  let choices = node.choices;
  let bh = 58, gap = 8;
  let totalH = choices.length * (bh + gap) - gap;
  let startY = qy + qh + 20 + (canvasHeight - qy - qh - 20 - totalH) / 2;

  choices.forEach((ch, i) => {
    let bw = canvasWidth - 40, bx = 20;
    let by2 = startY + i * (bh + gap);
    if (mouseX >= bx && mouseX <= bx + bw && mouseY >= by2 && mouseY <= by2 + bh) {
      breadcrumb.push(currentNode);
      currentNode = ch.next;
    }
  });
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
