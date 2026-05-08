// AM Career Pathway Navigator — 4-pathway career tree from HS AM course to workforce
// CANVAS_HEIGHT: 620
// Bloom L5: evaluate and recommend career pathways based on personal goals

let containerWidth;
let canvasWidth  = 700;
let canvasHeight = 620;

let selectedNode = null;  // { pi, ni }
let filterGoal   = 0;     // 0=all, 1=fastest, 2=earnings, 3=college, 4=hands-on
let showSalary   = false;

const GOAL_LABELS = ['All Pathways', 'Fastest Income', 'Top Earnings', 'College Prep', 'Hands-On'];
const GOAL_COLS   = [
  [80, 90, 110],
  [200, 130, 30],
  [30, 100, 200],
  [30, 120, 200],
  [140, 60, 200],
];

const NODE_W = 108;
const NODE_H = 48;

const PATHWAYS = [
  {
    name: 'Direct Employment', abbr: 'Employment',
    col: [200, 130, 30],
    goals: [1, 4],
    tagline: 'Fastest path to a paycheck — enter the workforce immediately after HS.',
    nodes: [
      {
        label: 'AM Operator',
        time: '0–3 months',
        salary: '$36K–$45K',
        desc: 'Operates FDM/SLA/SLS printers, handles material prep and basic post-processing under supervision.',
        employers: 'Protolabs, Shapeways, local job shops, school-district makerspaces',
        skills: 'Machine operation, G-code basics, OSHA safety, first-layer troubleshooting',
        credential: 'HS diploma + on-the-job training; OSHA 10 cert strongly recommended',
      },
      {
        label: 'Senior Technician',
        time: '2–4 years',
        salary: '$45K–$60K',
        desc: 'Trains new operators, maintains equipment fleet, runs CMM quality checks on finished parts.',
        employers: 'OEM manufacturers, contract manufacturers, dental/orthodontic labs',
        skills: 'Multi-process knowledge, inspection/CMM, slicer optimization, team leadership',
        credential: 'NIMS Additive Manufacturing Level 2; NC3 industry certificate',
      },
      {
        label: 'Process Engineer',
        time: '5–8 years',
        salary: '$58K–$78K',
        desc: 'Owns print process parameters, reduces scrap rate, qualifies new materials for production.',
        employers: 'Aerospace tier-1, medical device OEMs, automotive manufacturers',
        skills: 'DOE, SPC, DFAM, material testing, failure analysis, FMEA',
        credential: 'AAS/BS often required at this level; Six Sigma Green Belt common',
      },
    ],
  },
  {
    name: 'Community College', abbr: 'CC/AAS',
    col: [30, 100, 200],
    goals: [2, 3],
    tagline: 'Articulate HS credits to an AAS degree — opens engineering and management roles.',
    nodes: [
      {
        label: 'AAS Student',
        time: '1–2 years',
        salary: 'Work-study / part-time',
        desc: 'Full AAS in Manufacturing Technology or Additive Manufacturing at an articulation partner college.',
        employers: 'NWTC, Columbus State, Ivy Tech, Triton, Valencia — check PLTW partner list',
        skills: 'CAD/CAM, materials science, quality systems, AM + CNC processes, technical writing',
        credential: 'AAS in Manufacturing Technology; PLTW college credit may apply',
      },
      {
        label: 'Manufacturing Engr',
        time: '3–5 years',
        salary: '$55K–$75K',
        desc: 'Designs and improves manufacturing processes; evaluates whether AM or traditional is the right choice.',
        employers: 'Mid-size OEMs, contract manufacturers, Tier-1 defense suppliers',
        skills: 'DFM/DFAM, Lean, SolidWorks/CATIA, GD&T, process FMEA, cost modeling',
        credential: 'AAS + work experience; BS Manufacturing or Mechanical Engineering preferred',
      },
      {
        label: 'AM Applications Engr',
        time: '6–10 years',
        salary: '$72K–$100K',
        desc: 'Bridges sales and engineering — helps industrial clients adopt AM for production applications.',
        employers: 'Stratasys, EOS, Desktop Metal, Markforged, Materialise, HP MJF division',
        skills: 'Topology optimization, materials expertise, ROI analysis, customer consulting',
        credential: 'BS preferred; SME/AWS certification; strong application portfolio required',
      },
    ],
  },
  {
    name: 'Certification Track', abbr: 'Certif.',
    col: [40, 160, 80],
    goals: [1, 4],
    tagline: 'Stack industry-recognized credentials to prove competency without a four-year degree.',
    nodes: [
      {
        label: 'NC3 / NIMS Cert',
        time: '3–9 months',
        salary: '$38K–$48K',
        desc: 'Industry-validated AM operator certification from NC3 or NIMS — recognized by automotive, aerospace, and medical employers.',
        employers: 'Any employer recognizing NC3/NIMS; especially strong in auto/aerospace',
        skills: 'Machine setup, material handling, quality inspection, safety protocols',
        credential: 'NC3 Additive Manufacturing Operator OR NIMS Additive Manufacturing Level 1',
      },
      {
        label: 'Industry Credential',
        time: '1–3 years',
        salary: '$46K–$62K',
        desc: 'Advanced OEM or software certifications from major vendors, proving machine-specific expertise.',
        employers: 'OEM service centers, VAR/reseller partners, specialized service bureaus',
        skills: 'Machine-specific calibration, software certification, applications consulting',
        credential: 'Stratasys FDM Cert, EOS Operator Badge, Materialise Magics Cert, or Bambu Authorized Tech',
      },
      {
        label: 'Specialized Roles',
        time: '3–6 years',
        salary: '$55K–$80K',
        desc: 'Becomes the go-to expert in a high-value niche: medical devices, dental prosthetics, aerospace, jewelry.',
        employers: 'Dental labs, jewelry studios, medical device OEMs, aerospace MRO shops',
        skills: 'Biocompatible materials, regulatory compliance (FDA/ISO), NDT, metrology',
        credential: 'ISO 13485 training for medical; AS9100 for aerospace; state dental board varies',
      },
    ],
  },
  {
    name: 'Apprenticeship', abbr: 'Apprentice',
    col: [140, 60, 200],
    goals: [2, 4],
    tagline: 'Registered apprenticeships: earn while you learn with a structured federal program.',
    nodes: [
      {
        label: 'Registered Apprentice',
        time: '0–18 months',
        salary: '$32K–$44K (paid)',
        desc: 'DOL-registered program combining paid on-the-job training with related technical instruction (RTI).',
        employers: 'Boeing, Raytheon, Alcoa, Caterpillar, local IAM/USW union shops',
        skills: 'Blueprint reading, metrology, material handling, machine operation, safety',
        credential: 'DOL Certificate of Completion; program often earns transferable college credits',
      },
      {
        label: 'Journeyperson',
        time: '2–4 years',
        salary: '$52K–$68K',
        desc: 'Fully qualified tradesperson; may travel to project sites or mentor new apprentices.',
        employers: 'Union shops, aerospace MRO facilities, large OEM production facilities',
        skills: 'Full process ownership, complex troubleshooting, safety leadership, mentoring',
        credential: 'Journeyperson card; IAM/USW journeyperson classification (union)',
      },
      {
        label: 'Lead Technician',
        time: '4–7 years',
        salary: '$65K–$88K',
        desc: 'Leads a production shift or manufacturing cell; reviews part designs for manufacturability.',
        employers: 'Tier-1 defense/aerospace primes, medical device and implant manufacturers',
        skills: 'Cell management, PFMEA, cost estimating, continuous improvement, hiring',
        credential: 'Journeyperson + supervisor endorsement; Six Sigma Green Belt common',
      },
    ],
  },
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('AM Career Pathway Navigator — click any role node for details; use filter buttons to find your best pathway', LABEL);
  textFont('sans-serif');
}

function getLayout() {
  let detW = selectedNode ? min(218, canvasWidth * 0.28) : 0;
  let drawW = canvasWidth - detW - (detW > 0 ? 4 : 0);
  let nPaths = PATHWAYS.length;
  let topY = 100;
  let botY = canvasHeight - 18;
  let rowH = (botY - topY) / nPaths;

  let rows = PATHWAYS.map((_, pi) => {
    let cy = topY + rowH * pi + rowH / 2;
    let nodes = PATHWAYS[pi].nodes.map((_, ni) => {
      let xFrac = 0.24 + ni * 0.26;
      return { x: drawW * xFrac, y: cy };
    });
    return { cy, nodes };
  });

  let ctrX = drawW * 0.07;
  let ctrY = (topY + botY) / 2;
  return { drawW, detW, rows, ctrX, ctrY, rowH };
}

function draw() {
  updateCanvasSize();
  background(238, 244, 252);

  let lay = getLayout();

  // Title
  noStroke(); fill(18, 48, 110);
  textAlign(CENTER, TOP); textSize(17); textStyle(BOLD);
  text('AM Career Pathway Navigator', lay.drawW / 2, 5);
  textStyle(NORMAL);

  drawGoalButtons(lay);
  drawSalaryButton(lay);
  drawPathways(lay);
  drawCenterNode(lay);
  if (selectedNode) drawDetailPanel(lay);
  if (showSalary) drawSalaryChart(lay);
}

function drawGoalButtons(lay) {
  let bw = 90, bh = 20, gap = 3;
  let totalW = GOAL_LABELS.length * (bw + gap) - gap;
  let startX = lay.drawW / 2 - totalW / 2;
  let by = 30;

  GOAL_LABELS.forEach((lbl, i) => {
    let bx = startX + i * (bw + gap);
    let active = filterGoal === i;
    let gc = GOAL_COLS[i];
    fill(active ? color(gc[0], gc[1], gc[2]) : color(215, 225, 245));
    stroke(active ? color(gc[0]*0.7, gc[1]*0.7, gc[2]*0.7) : color(160, 175, 210));
    strokeWeight(1); rect(bx, by, bw, bh, 3);
    noStroke(); fill(active ? 255 : 50); textAlign(CENTER, CENTER); textSize(9);
    text(lbl, bx + bw / 2, by + bh / 2);
  });
}

function drawSalaryButton(lay) {
  let bx = 6, by = 30, bw = 118, bh = 20;
  fill(showSalary ? color(20, 100, 40) : color(215, 240, 222));
  stroke(showSalary ? color(10, 60, 20) : color(130, 185, 150));
  strokeWeight(1); rect(bx, by, bw, bh, 3);
  noStroke(); fill(showSalary ? 255 : 50); textAlign(CENTER, CENTER); textSize(9);
  text('$ Salary Range Chart', bx + bw / 2, by + bh / 2);
}

function drawCenterNode(lay) {
  let cx = lay.ctrX, cy = lay.ctrY;
  fill(18, 48, 110, 220); noStroke();
  rect(cx - 54, cy - 30, 108, 60, 8);
  fill(255); textAlign(CENTER, CENTER); textSize(10); textStyle(BOLD);
  text('HS AM Course\nComplete', cx - 50, cy - 24, 100, 48);
  textStyle(NORMAL);
}

function drawPathways(lay) {
  PATHWAYS.forEach((path, pi) => {
    let row   = lay.rows[pi];
    let nc    = path.col;
    let isHi  = filterGoal === 0 || path.goals.includes(filterGoal);
    let alpha = isHi ? 200 : 45;

    // Pathway name label aligned with first node row
    noStroke();
    fill(nc[0], nc[1], nc[2], isHi ? 190 : 40);
    textAlign(LEFT, BOTTOM); textSize(8.5); textStyle(ITALIC);
    text(path.name, lay.ctrX + 58, row.nodes[0].y - NODE_H / 2 - 2, 95);
    textStyle(NORMAL);

    // Line from center node to first pathway node
    stroke(nc[0], nc[1], nc[2], alpha); strokeWeight(1.5); noFill();
    line(lay.ctrX + 54, lay.ctrY, row.nodes[0].x - NODE_W / 2, row.nodes[0].y);

    // Lines and arrows between nodes
    path.nodes.forEach((_, ni) => {
      if (ni >= path.nodes.length - 1) return;
      let p1 = row.nodes[ni], p2 = row.nodes[ni + 1];
      stroke(nc[0], nc[1], nc[2], alpha); strokeWeight(1.5); noFill();
      line(p1.x + NODE_W / 2, p1.y, p2.x - NODE_W / 2, p2.y);
      // Arrow
      let ax = p2.x - NODE_W / 2, ay = p2.y;
      fill(nc[0], nc[1], nc[2], alpha); noStroke();
      triangle(ax - 10, ay - 5, ax - 10, ay + 5, ax, ay);
    });

    // Nodes
    path.nodes.forEach((n, ni) => {
      let pos  = row.nodes[ni];
      let isSel = selectedNode && selectedNode.pi === pi && selectedNode.ni === ni;
      let hov  = abs(mouseX - pos.x) < NODE_W / 2 && abs(mouseY - pos.y) < NODE_H / 2;
      let ba   = isHi ? (isSel || hov ? 235 : 175) : 45;

      fill(nc[0], nc[1], nc[2], ba);
      stroke(nc[0]*0.7, nc[1]*0.7, nc[2]*0.7, ba);
      strokeWeight(isSel ? 2.5 : 1.2);
      rect(pos.x - NODE_W / 2, pos.y - NODE_H / 2, NODE_W, NODE_H, 6);

      noStroke(); fill(255, 255, 255, ba > 100 ? 230 : 55);
      textAlign(CENTER, CENTER); textSize(9); textStyle(BOLD);
      text(n.label, pos.x - (NODE_W - 8) / 2, pos.y - (NODE_H - 6) / 2, NODE_W - 8, NODE_H - 6);
      textStyle(NORMAL);

      // Salary tag
      if (isHi) {
        noStroke(); fill(nc[0], nc[1], nc[2], 170);
        textAlign(CENTER, TOP); textSize(7.5);
        text(n.salary, pos.x, pos.y + NODE_H / 2 + 2);
      }
    });
  });
}

function drawDetailPanel(lay) {
  if (!selectedNode) return;
  let { pi, ni } = selectedNode;
  let path = PATHWAYS[pi];
  let node = path.nodes[ni];
  let nc   = path.col;
  let dx   = lay.drawW + 2, pw = lay.detW;
  let dy   = 56, ph = canvasHeight - 62;

  fill(255, 254, 250); stroke(185, 200, 225); strokeWeight(1);
  rect(dx, dy, pw, ph, 5);

  // Header
  fill(nc[0], nc[1], nc[2]); noStroke();
  rect(dx, dy, pw, 44, 5, 5, 0, 0);
  fill(255); textAlign(CENTER, CENTER); textSize(11); textStyle(BOLD);
  text(node.label, dx + pw / 2, dy + 14, pw - 8);
  textStyle(NORMAL); textSize(9);
  text(path.name + ' Track', dx + pw / 2, dy + 32);

  let ty = dy + 54;
  let sections = [
    ['Role:', node.desc],
    ['Employers:', node.employers],
    ['Key Skills:', node.skills],
    ['Credential:', node.credential],
    ['Timeline / Salary:', node.time + '  |  ' + node.salary],
  ];
  let sCols = [
    [30, 60, 140],
    [40, 140, 60],
    [160, 90, 20],
    [100, 30, 140],
    [30, 110, 130],
  ];

  sections.forEach(([lbl, val], i) => {
    fill(sCols[i][0], sCols[i][1], sCols[i][2]); noStroke();
    textAlign(LEFT, TOP); textSize(9.5); textStyle(BOLD);
    text(lbl, dx + 7, ty);
    textStyle(NORMAL); fill(40); textSize(9);
    text(val, dx + 7, ty + 13, pw - 14);
    ty += 50;
  });

  // Tagline badge
  fill(nc[0], nc[1], nc[2], 28); noStroke();
  rect(dx + 4, canvasHeight - 52, pw - 8, 36, 3);
  fill(nc[0], nc[1], nc[2]); textAlign(CENTER, CENTER); textSize(8.5); textStyle(ITALIC);
  text(path.tagline, dx + pw / 2, canvasHeight - 34, pw - 14);
  textStyle(NORMAL);
}

function drawSalaryChart(lay) {
  let ox = 24, oy = 66, ow = lay.drawW - 34, oh = canvasHeight - 88;
  fill(250, 252, 255, 245); stroke(175, 195, 225); strokeWeight(1.5);
  rect(ox, oy, ow, oh, 8);

  // Title
  fill(18, 48, 110); noStroke(); textAlign(CENTER, TOP); textSize(13); textStyle(BOLD);
  text('Salary Ranges by Career Tier', ox + ow / 2, oy + 10);
  textStyle(NORMAL);

  // Close button
  fill(200, 60, 60); noStroke(); rect(ox + ow - 28, oy + 6, 22, 22, 3);
  fill(255); textAlign(CENTER, CENTER); textSize(11); textStyle(BOLD);
  text('✕', ox + ow - 17, oy + 17);
  textStyle(NORMAL);

  let maxSal   = 110;
  let barX     = ox + 86;
  let barW     = ow - 106;
  let barTop   = oy + 40;
  let barH     = oh - 66;
  let nTiers   = 3;
  let tierH    = barH / nTiers;

  // Tier labels and grid
  ['Entry Level', 'Mid Career', 'Senior Level'].forEach((lbl, ti) => {
    let ty2 = barTop + ti * tierH;
    stroke(210, 218, 232); strokeWeight(0.5);
    line(barX, ty2, barX + barW, ty2);
    fill(30, 50, 110); noStroke(); textAlign(RIGHT, TOP); textSize(9.5); textStyle(BOLD);
    text(lbl, barX - 4, ty2 + 4);
    textStyle(NORMAL);
  });

  // Bars
  let pathSpacing = tierH / (PATHWAYS.length + 1);
  PATHWAYS.forEach((path, pi) => {
    let nc = path.col;
    path.nodes.forEach((n, ni) => {
      let salMatch = n.salary.match(/\$(\d+)K[–\-–]?\$?(\d+)K/);
      if (!salMatch) return;
      let lo = parseInt(salMatch[1]), hi = parseInt(salMatch[2]);
      let ty2 = barTop + ni * tierH + pathSpacing * (pi + 0.5) + 2;
      let bx1 = barX + (lo / maxSal) * barW;
      let bw2 = max((hi - lo) / maxSal * barW, 4);

      fill(nc[0], nc[1], nc[2], 190); noStroke();
      rect(bx1, ty2, bw2, 14, 3);
      fill(nc[0]*0.7, nc[1]*0.7, nc[2]*0.7); textAlign(LEFT, CENTER); textSize(8);
      text('$' + lo + '–' + hi + 'K', bx1 + bw2 + 3, ty2 + 7);
      fill(nc[0], nc[1], nc[2]); textAlign(RIGHT, CENTER); textSize(8);
      text(path.abbr, barX - 4, ty2 + 7);
    });
  });

  // X-axis
  stroke(175); strokeWeight(0.8);
  line(barX, barTop + barH, barX + barW, barTop + barH);
  [0, 25, 50, 75, 100].forEach(v => {
    let bx2 = barX + (v / maxSal) * barW;
    stroke(205, 213, 228); strokeWeight(0.5);
    line(bx2, barTop, bx2, barTop + barH);
    noStroke(); fill(100); textAlign(CENTER, TOP); textSize(8);
    text('$' + v + 'K', bx2, barTop + barH + 3);
  });
}

function mousePressed() {
  let lay = getLayout();

  // Salary chart close button
  if (showSalary) {
    let ox = 24, oy = 66, ow = lay.drawW - 34;
    if (mouseX >= ox + ow - 28 && mouseX <= ox + ow - 6 && mouseY >= oy + 6 && mouseY <= oy + 28) {
      showSalary = false; return;
    }
    return; // block clicks behind chart
  }

  // Salary button
  if (mouseX >= 6 && mouseX <= 124 && mouseY >= 30 && mouseY <= 50) {
    showSalary = !showSalary; return;
  }

  // Goal filter buttons
  let bw = 90, bh = 20, gap = 3;
  let totalW = GOAL_LABELS.length * (bw + gap) - gap;
  let startX = lay.drawW / 2 - totalW / 2;
  for (let i = 0; i < GOAL_LABELS.length; i++) {
    let bx = startX + i * (bw + gap);
    if (mouseX >= bx && mouseX <= bx + bw && mouseY >= 30 && mouseY <= 50) {
      filterGoal = i; return;
    }
  }

  // Node clicks
  let clicked = false;
  PATHWAYS.forEach((_, pi) => {
    let row = lay.rows[pi];
    PATHWAYS[pi].nodes.forEach((_, ni) => {
      let pos = row.nodes[ni];
      if (abs(mouseX - pos.x) < NODE_W / 2 && abs(mouseY - pos.y) < NODE_H / 2) {
        if (selectedNode && selectedNode.pi === pi && selectedNode.ni === ni) {
          selectedNode = null;
        } else {
          selectedNode = { pi, ni };
        }
        clicked = true;
      }
    });
  });
  if (!clicked) selectedNode = null;
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
