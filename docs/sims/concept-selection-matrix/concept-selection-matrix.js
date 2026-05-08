// Concept Selection Matrix — Weighted Decision Tool
// CANVAS_HEIGHT: 650
// Bloom L3-L5: apply weighted decision matrix to select best design concept

const EXAMPLE = {
  concepts: ['Fold-Flat', 'Slot-Tab', 'Desk-Clip'],
  criteria: [
    { name: 'Structural strength',   weight: 5 },
    { name: 'Ease of assembly',      weight: 3 },
    { name: 'Print time',            weight: 2 },
    { name: 'No supports needed',    weight: 4 },
    { name: 'Adjustable angle',      weight: 4 }
  ],
  scores: [
    [4, 3, 5],
    [5, 4, 2],
    [3, 4, 5],
    [2, 5, 4],
    [5, 2, 3]
  ]
};

// Working state (deep copy from example on init)
let state;
const MAX_CONCEPTS = 5;
const MAX_CRITERIA = 6;

function deepCopy(obj) { return JSON.parse(JSON.stringify(obj)); }

function initState() {
  state = deepCopy(EXAMPLE);
}

function calcTotals() {
  return state.concepts.map((_, ci) =>
    state.criteria.reduce((sum, crit, ri) =>
      sum + (crit.weight || 1) * (state.scores[ri][ci] || 1), 0)
  );
}

function renderMatrix() {
  const totals = calcTotals();
  const sorted = [...totals].sort((a, b) => b - a);
  const winnerScore = sorted[0];
  const secondScore = sorted[1];

  const wrap = document.getElementById('matrix-wrap');
  let html = '<table><thead><tr>';
  html += '<th>Criterion</th><th>Weight<br>(1–5)</th>';
  state.concepts.forEach((c, ci) => {
    html += `<th>
      <input type="text" value="${escHtml(c)}" style="width:90px;border:none;background:transparent;color:white;text-align:center;font-weight:700;font-size:12px"
        onchange="renameConcept(${ci}, this.value)">
      ${state.concepts.length > 1 ? `<button class="btn-del" onclick="removeConcept(${ci})" title="Remove">✕</button>` : ''}
    </th>`;
  });
  html += '</tr></thead><tbody>';

  state.criteria.forEach((crit, ri) => {
    html += '<tr>';
    html += `<td class="crit-cell">
      <input type="text" value="${escHtml(crit.name)}" onchange="renameCriterion(${ri}, this.value)">
      ${state.criteria.length > 1 ? `<button class="btn-del" onclick="removeCriterion(${ri})">✕</button>` : ''}
    </td>`;
    html += `<td><input type="number" min="1" max="5" value="${crit.weight}" onchange="setWeight(${ri}, +this.value)"></td>`;
    state.concepts.forEach((_, ci) => {
      html += `<td><input type="number" min="1" max="5" value="${state.scores[ri][ci]}" onchange="setScore(${ri},${ci},+this.value)"></td>`;
    });
    html += '</tr>';
  });

  // Totals row
  html += '<tr class="total-row"><td colspan="2">Weighted Total</td>';
  totals.forEach((t, ci) => {
    let cls = '';
    if (t === winnerScore) cls = 'winner';
    else if (t === secondScore && secondScore !== winnerScore) cls = 'second';
    html += `<td class="${cls}">${t}</td>`;
  });
  html += '</tr>';

  // Rank row
  html += '<tr class="rank-cell"><td colspan="2">Rank</td>';
  totals.forEach(t => {
    const rank = sorted.indexOf(t) + 1;
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '#' + rank;
    html += `<td>${medal}</td>`;
  });
  html += '</tr>';

  html += '</tbody></table>';
  wrap.innerHTML = html;
  drawChart(totals);
}

function escHtml(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function drawChart(totals) {
  const canvas = document.getElementById('barchart');
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 700;
  canvas.width  = W;
  canvas.height = 140;

  ctx.clearRect(0, 0, W, 140);

  const maxVal = Math.max(...totals, 1);
  const n = totals.length;
  const barW = Math.min(80, (W - 60) / n - 10);
  const startX = 30;
  const chartH = 100;
  const colors = ['#1565C0','#2e7d32','#e65100','#6a1b9a','#00695c'];
  const sorted = [...totals].sort((a,b)=>b-a);

  totals.forEach((t, i) => {
    const x = startX + i * ((W - 60) / n) + ((W - 60) / n - barW) / 2;
    const h = (t / maxVal) * chartH;
    const y = chartH - h + 10;
    ctx.fillStyle = t === sorted[0] ? '#43a047' : t === sorted[1] ? '#fdd835' : colors[i % colors.length];
    ctx.fillRect(x, y, barW, h);
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, barW, h);

    // label
    ctx.fillStyle = '#333';
    ctx.font = '12px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(state.concepts[i], x + barW / 2, 130);

    // value
    ctx.fillStyle = '#111';
    ctx.font = 'bold 12px Segoe UI';
    ctx.fillText(t, x + barW / 2, y - 4);
  });
}

// Mutations
function renameConcept(ci, val) { state.concepts[ci] = val; renderMatrix(); }
function renameCriterion(ri, val) { state.criteria[ri].name = val; renderMatrix(); }
function setWeight(ri, val) { state.criteria[ri].weight = clamp(val, 1, 5); renderMatrix(); }
function setScore(ri, ci, val) { state.scores[ri][ci] = clamp(val, 1, 5); renderMatrix(); }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function addConcept() {
  if (state.concepts.length >= MAX_CONCEPTS) return;
  state.concepts.push('Concept ' + (state.concepts.length + 1));
  state.scores.forEach(row => row.push(3));
  renderMatrix();
}

function addCriterion() {
  if (state.criteria.length >= MAX_CRITERIA) return;
  state.criteria.push({ name: 'New Criterion', weight: 3 });
  state.scores.push(state.concepts.map(() => 3));
  renderMatrix();
}

function removeConcept(ci) {
  if (state.concepts.length <= 1) return;
  state.concepts.splice(ci, 1);
  state.scores.forEach(row => row.splice(ci, 1));
  renderMatrix();
}

function removeCriterion(ri) {
  if (state.criteria.length <= 1) return;
  state.criteria.splice(ri, 1);
  state.scores.splice(ri, 1);
  renderMatrix();
}

function resetMatrix() {
  initState();
  renderMatrix();
}

function downloadCSV() {
  const totals = calcTotals();
  let rows = [['Criterion', 'Weight', ...state.concepts]];
  state.criteria.forEach((crit, ri) => {
    rows.push([crit.name, crit.weight, ...state.scores[ri]]);
  });
  rows.push(['Weighted Total', '', ...totals]);
  const csv = rows.map(r => r.map(v => '"' + String(v).replace(/"/g,'""') + '"').join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = 'concept-selection-matrix.csv';
  a.click();
}

// Init
initState();
renderMatrix();
window.addEventListener('resize', () => { const t = calcTotals(); drawChart(t); });
