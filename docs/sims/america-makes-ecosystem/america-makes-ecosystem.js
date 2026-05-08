// The America Makes Ecosystem — vis-network MicroSim
// CANVAS_HEIGHT: 580
// Directed network of stakeholders; click any node for an infobox below the canvas.

document.addEventListener('DOMContentLoaded', function () {

  // ── Data ──────────────────────────────────────────────────────────────────

  const NODE_INFO = {
    1:  'America Makes (est. 2012, Youngstown OH) is the nation\'s leading public–private partnership for AM R&D and workforce development, with 200+ member organizations spanning companies and universities.',
    2:  'U.S. Dept. of Defense — a founding co-sponsor of America Makes. The DoD invests in AM to shorten supply chains, reduce lead times for parts, and enable battlefield fabrication.',
    3:  'U.S. Dept. of Energy — co-sponsor focused on energy-efficient manufacturing processes and the use of AM for nuclear and grid applications.',
    4:  'Manufacturing USA is the national network of 17 institutes including America Makes, connecting industry, academia, and government around advanced manufacturing.',
    5:  'Research Universities conduct fundamental AM research funded through America Makes grants — from new materials to novel printing processes and AI-driven quality control.',
    6:  'Community Colleges align their AM programs to America Makes curriculum frameworks and offer dual-credit pathways connecting high school CTE to associate degrees.',
    7:  'High School CTE (Career & Technical Education) programs are supported by America Makes through curriculum alignment, lab grants, and connections to credentialing systems.',
    8:  'AM Equipment Makers (e.g., Stratasys, Desktop Metal, Markforged) are industry members who fund and co-direct America Makes research priorities.',
    9:  'Material Suppliers (e.g., BASF, Evonik, 3DXTech) fund and participate in America Makes, aligning new filament and resin development with workforce training needs.',
    10: 'End-User Manufacturers (aerospace, medical, automotive sectors) invest in America Makes to accelerate adoption of production-grade AM and develop a trained workforce.',
    11: 'AM Workforce Framework — published and maintained by America Makes and ASTM International, this competency model defines the knowledge and skills required at every AM career level.',
    12: 'NC3 / NIMS Certifications — industry-recognized credentials for AM technicians, aligned to the Workforce Framework and stackable with community-college associate degrees.',
    13: 'This Course is aligned to America Makes workforce competency frameworks. The portfolio evidence you create here supports articulation credit at partner community colleges.'
  };

  const nodes = new vis.DataSet([
    { id:  1, label: 'America Makes',          group: 'hub',       x:   0, y:   0, fixed: true },
    { id:  2, label: 'U.S. Dept. of Defense',   group: 'govt',      x: -280, y: -160 },
    { id:  3, label: 'U.S. Dept. of Energy',    group: 'govt',      x: -280, y: -50  },
    { id:  4, label: 'Manufacturing USA',        group: 'govt',      x: -280, y:  60  },
    { id:  5, label: 'Research Universities',   group: 'academia',  x:   0, y: -210 },
    { id:  6, label: 'Community Colleges',      group: 'academia',  x: 160, y: -130 },
    { id:  7, label: 'High School CTE',         group: 'academia',  x: 280, y:  -40 },
    { id:  8, label: 'AM Equipment Makers',     group: 'industry',  x: -100, y:  200 },
    { id:  9, label: 'Material Suppliers',      group: 'industry',  x:   0, y:  230 },
    { id: 10, label: 'End-User Manufacturers',  group: 'industry',  x: 130, y:  200 },
    { id: 11, label: 'AM Workforce Framework',  group: 'workforce', x: 280, y:  100 },
    { id: 12, label: 'NC3 / NIMS Certs',        group: 'workforce', x: 280, y:  190 },
    { id: 13, label: 'This Course',             group: 'student',   x: 160, y:   80 }
  ]);

  const edges = new vis.DataSet([
    { from:  2, to:  1, label: 'Founding co-sponsor',          arrows: 'to' },
    { from:  3, to:  1, label: 'Founding co-sponsor',          arrows: 'to' },
    { from:  4, to:  1, label: 'Parent network',               arrows: 'to' },
    { from:  1, to:  5, label: 'Research grants',              arrows: 'to' },
    { from:  1, to:  6, label: 'Curriculum alignment',         arrows: 'to' },
    { from:  1, to:  7, label: 'CTE pathway support',          arrows: 'to' },
    { from:  8, to:  1, label: 'Industry membership & funding', arrows: 'to' },
    { from:  9, to:  1, label: 'Industry membership & funding', arrows: 'to' },
    { from: 10, to:  1, label: 'Industry membership & funding', arrows: 'to' },
    { from:  1, to: 11, label: 'Publishes & maintains',        arrows: 'to' },
    { from: 11, to: 12, label: 'Informs certification stds',   arrows: 'to' },
    { from: 11, to: 13, label: 'Shapes competencies',          arrows: 'to' },
    { from:  5, to:  6, label: 'Articulation agreements',      arrows: 'to' },
    { from:  6, to:  7, label: 'Dual-credit programs',         arrows: 'to' },
    { from: 13, to:  6, label: 'Articulation pathway',         arrows: 'to' }
  ]);

  // ── Color palette by group ─────────────────────────────────────────────────

  const GROUP_COLORS = {
    hub:       { background: '#e65100', border: '#bf360c', font: { color: 'white' } },
    govt:      { background: '#1565c0', border: '#0d47a1', font: { color: 'white' } },
    academia:  { background: '#2e7d32', border: '#1b5e20', font: { color: 'white' } },
    industry:  { background: '#6a1b9a', border: '#4a148c', font: { color: 'white' } },
    workforce: { background: '#f9a825', border: '#f57f17', font: { color: '#333'  } },
    student:   { background: '#c62828', border: '#b71c1c', font: { color: 'white' } }
  };

  // Apply group colors to nodes
  nodes.forEach(n => {
    const c = GROUP_COLORS[n.group] || {};
    nodes.update({
      id:    n.id,
      color: { background: c.background, border: c.border, highlight: { background: '#fff176', border: '#f9a825' } },
      font:  Object.assign({ size: 13 }, c.font),
      shape: n.id === 1 ? 'ellipse' : 'box',
      size:  n.id === 1 ? 30 : undefined,
      widthConstraint: { maximum: 140 }
    });
  });

  // ── DOM layout ─────────────────────────────────────────────────────────────

  const main = document.querySelector('main');
  main.style.cssText = 'margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;';

  // Title
  const titleEl = document.createElement('div');
  titleEl.textContent = 'The America Makes Ecosystem';
  titleEl.style.cssText = 'text-align:center;font-size:16px;font-weight:bold;color:#1565c0;padding:6px 0 2px;';
  main.appendChild(titleEl);

  // Network container
  const netDiv = document.createElement('div');
  netDiv.id = 'am-network';
  netDiv.style.cssText = 'width:100%;height:440px;border:1px solid #e0e0e0;background:#fafafa;';
  main.appendChild(netDiv);

  // Legend
  const legend = document.createElement('div');
  legend.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;padding:5px 8px;font-size:12px;';
  const legendItems = [
    { label: 'Hub',       color: '#e65100' },
    { label: 'Government', color: '#1565c0' },
    { label: 'Academia',  color: '#2e7d32' },
    { label: 'Industry',  color: '#6a1b9a' },
    { label: 'Workforce', color: '#f9a825' },
    { label: 'This Course', color: '#c62828' }
  ];
  legendItems.forEach(item => {
    const chip = document.createElement('span');
    chip.style.cssText = `background:${item.color};color:white;padding:2px 8px;border-radius:12px;font-weight:bold;`;
    chip.textContent = item.label;
    legend.appendChild(chip);
  });
  main.appendChild(legend);

  // Info box
  const infoBox = document.createElement('div');
  infoBox.style.cssText = 'margin:4px 8px;padding:8px 12px;min-height:44px;background:#e3f2fd;border:1px solid #90caf9;border-radius:4px;font-size:13px;color:#1a237e;';
  infoBox.textContent = 'Click any node to learn about its role in the ecosystem.';
  main.appendChild(infoBox);

  // ── vis-network options ────────────────────────────────────────────────────

  const options = {
    physics: {
      enabled: false  // positions set manually above
    },
    interaction: {
      hover:           true,
      zoomView:        false,  // prevent scroll hijacking in iframe
      dragView:        true,
      tooltipDelay:    200,
      navigationButtons: false
    },
    edges: {
      font:  { size: 10, color: '#555', strokeWidth: 0 },
      color: { color: '#aaa', highlight: '#1565c0' },
      width: 1.5,
      smooth: { type: 'curvedCW', roundness: 0.15 }
    },
    nodes: {
      borderWidth: 2,
      shadow: true
    }
  };

  const network = new vis.Network(netDiv, { nodes, edges }, options);

  // Fit to view after initialization
  network.fit({ animation: { duration: 600, easingFunction: 'easeInOutQuad' } });

  // Click handler — show infobox
  network.on('click', params => {
    if (params.nodes.length > 0) {
      const id  = params.nodes[0];
      const txt = NODE_INFO[id] || 'No description available.';
      infoBox.innerHTML = `<strong>${nodes.get(id).label}:</strong> ${txt}`;
    } else {
      infoBox.textContent = 'Click any node to learn about its role in the ecosystem.';
    }
  });

  // Highlight on hover
  network.on('hoverNode', params => {
    netDiv.style.cursor = 'pointer';
  });
  network.on('blurNode', () => {
    netDiv.style.cursor = 'default';
  });

});
