// ISO & ASTM AM Standards Collaboration Map — vis-network
// CANVAS_HEIGHT: 520
// Bloom L1-L2: Recall and explain roles of ISO/ASTM standards bodies in AM

function isInIframe() {
  try { return window.self !== window.top; } catch(e) { return true; }
}

const nodeDetails = {
  1: {
    title: 'ISO / TC 261',
    rows: [
      ['Organization', 'International Organization for Standardization'],
      ['Committee', 'TC 261 — Additive Manufacturing'],
      ['Founded', 'ISO: 1947 | TC 261: 2011'],
      ['Headquarters', 'Geneva, Switzerland'],
      ['Focus', 'Global AM vocabulary, design requirements, process classification, data formats'],
      ['Role in AM', 'Develops internationally recognized AM standards and coordinates with ASTM F42 under a formal cooperation agreement to avoid duplication of standards.']
    ]
  },
  2: {
    title: 'ASTM F42',
    rows: [
      ['Organization', 'ASTM International'],
      ['Committee', 'F42 — Additive Manufacturing Technologies'],
      ['Founded', 'ASTM: 1898 | F42: 2009'],
      ['Headquarters', 'West Conshohocken, Pennsylvania, USA'],
      ['Focus', 'AM material standards, process qualifications, testing, and terminology'],
      ['Role in AM', 'Develops and maintains AM standards in the USA and coordinates internationally with ISO/TC 261 through the Joint Plan of Work signed in 2011.']
    ]
  },
  3: {
    title: 'Joint Standards Agreement (2011)',
    rows: [
      ['Type', 'Formal Cooperation Agreement'],
      ['Signed', '2011'],
      ['Purpose', 'Establish a Joint Plan of Work to co-develop AM standards and avoid conflicting or duplicate standards'],
      ['Significance', 'All major AM standards carry both ISO and ASTM numbering (e.g., ISO/ASTM 52900) — a direct result of this agreement.']
    ]
  },
  4: {
    title: 'ISO/ASTM 52900',
    rows: [
      ['Full Title', 'Additive Manufacturing — General Principles — Fundamentals and Vocabulary'],
      ['Year', 'First edition 2015; revised 2021'],
      ['Scope', 'Defines all core AM terminology — the seven process categories, feedstock types, and key process attributes'],
      ['Importance', 'This is the foundational document. Every other AM standard references 52900 for definitions.'],
      ['Focus', 'Terminology']
    ]
  },
  5: {
    title: 'ISO/ASTM 52910',
    rows: [
      ['Full Title', 'Additive Manufacturing — Design — Requirements, Guidelines and Recommendations'],
      ['Year', '2018'],
      ['Scope', 'Guidelines for designers using AM: design for AM (DfAM) principles, feature limitations, wall thickness, overhangs'],
      ['Importance', 'Bridges the gap between design intent and manufacturing constraints in AM.'],
      ['Focus', 'Design']
    ]
  },
  6: {
    title: 'ISO/ASTM 52921',
    rows: [
      ['Full Title', 'Additive Manufacturing — Standard Terminology for Coordinate Systems and Test Methodologies'],
      ['Year', '2013'],
      ['Scope', 'Defines X, Y, Z axis orientation conventions for AM machines; standardizes build orientation reporting for test specimens'],
      ['Importance', 'Enables reproducible testing — without agreed-upon axes, "Z-direction tensile strength" would mean different things on different machines.'],
      ['Focus', 'Coordinate Systems']
    ]
  }
};

const nodes = new vis.DataSet([
  { id: 1, label: 'ISO\nTC 261',     x: -180, y: -120, color: { background: '#1565C0', border: '#0d47a1', highlight: { background: '#1976D2', border: '#0d47a1' } }, font: { color: '#fff', size: 16, bold: true }, shape: 'ellipse', widthConstraint: { minimum: 90 } },
  { id: 2, label: 'ASTM\nF42',       x:  180, y: -120, color: { background: '#C62828', border: '#8B1A1A', highlight: { background: '#D32F2F', border: '#8B1A1A' } }, font: { color: '#fff', size: 16, bold: true }, shape: 'ellipse', widthConstraint: { minimum: 90 } },
  { id: 3, label: 'Joint Standards\nAgreement\n(2011)',  x: 0,    y:   30, color: { background: '#6A1B9A', border: '#4A148C', highlight: { background: '#7B1FA2', border: '#4A148C' } }, font: { color: '#fff', size: 13 }, shape: 'box', widthConstraint: { minimum: 120 } },
  { id: 4, label: 'ISO/ASTM\n52900\nTerminology', x: -150, y:  210, color: { background: '#6A1B9A', border: '#4A148C', highlight: { background: '#7B1FA2', border: '#4A148C' } }, font: { color: '#fff', size: 12 }, shape: 'box', widthConstraint: { minimum: 100 } },
  { id: 5, label: 'ISO/ASTM\n52910\nDesign',      x:   30, y:  210, color: { background: '#6A1B9A', border: '#4A148C', highlight: { background: '#7B1FA2', border: '#4A148C' } }, font: { color: '#fff', size: 12 }, shape: 'box', widthConstraint: { minimum: 100 } },
  { id: 6, label: 'ISO/ASTM\n52921\nCoord Sys',   x:  210, y:  210, color: { background: '#6A1B9A', border: '#4A148C', highlight: { background: '#7B1FA2', border: '#4A148C' } }, font: { color: '#fff', size: 12 }, shape: 'box', widthConstraint: { minimum: 100 } }
]);

const edges = new vis.DataSet([
  { from: 1, to: 3, arrows: { to: { enabled: true }, from: { enabled: true } }, color: '#555', label: 'co-develops', font: { size: 11, color: '#444', align: 'middle' } },
  { from: 2, to: 3, arrows: { to: { enabled: true }, from: { enabled: true } }, color: '#555', label: 'co-develops', font: { size: 11, color: '#444', align: 'middle' } },
  { from: 3, to: 4, arrows: { to: { enabled: true } }, color: '#8e24aa', dashes: false },
  { from: 3, to: 5, arrows: { to: { enabled: true } }, color: '#8e24aa', dashes: false },
  { from: 3, to: 6, arrows: { to: { enabled: true } }, color: '#8e24aa', dashes: false }
]);

let focusTermOnly = false;
let network;

function initNetwork() {
  const container = document.getElementById('network');
  const data = { nodes, edges };

  const inIframe = isInIframe();
  const options = {
    layout: { improvedLayout: false },
    physics: { enabled: false },
    interaction: {
      dragNodes: false,
      dragView: !inIframe,
      zoomView: !inIframe,
      navigationButtons: false,
      selectConnectedEdges: true,
      hover: true
    },
    nodes: {
      borderWidth: 2,
      shadow: { enabled: true, size: 6, x: 2, y: 2 },
      margin: 10
    },
    edges: {
      width: 2,
      smooth: { type: 'curvedCW', roundness: 0.1 }
    }
  };

  network = new vis.Network(container, data, options);

  // Fit network to view
  network.fit({ animation: { duration: 600, easingFunction: 'easeInOutQuad' } });

  // Node click → info panel
  network.on('click', function(params) {
    if (params.nodes.length > 0) {
      showInfo(params.nodes[0]);
    }
  });
}

function showInfo(nodeId) {
  const panel = document.getElementById('info-panel');
  const det = nodeDetails[nodeId];
  if (!det) return;
  let html = '<h3>' + det.title + '</h3>';
  for (const [label, val] of det.rows) {
    html += '<div class="info-row"><span class="info-label">' + label + ':</span> ' + val + '</div>';
  }
  panel.innerHTML = html;
}

// Toggle: show only Terminology node or all nodes
document.getElementById('toggle-btn').addEventListener('click', function() {
  focusTermOnly = !focusTermOnly;
  this.textContent = focusTermOnly ? 'Show All Standards' : 'Focus: Terminology';
  if (focusTermOnly) {
    nodes.update([
      { id: 5, hidden: true },
      { id: 6, hidden: true }
    ]);
  } else {
    nodes.update([
      { id: 5, hidden: false },
      { id: 6, hidden: false }
    ]);
  }
  network.fit({ animation: { duration: 400 } });
});

initNetwork();
