// Resin Family Comparison — standard vs tough/flexible vs engineering resins
// CANVAS_HEIGHT: 520
// Bloom L2: compare resin families by mechanical/thermal properties; match to applications

document.addEventListener('DOMContentLoaded', function () {

  const container = document.querySelector('main');

  const PROPERTIES = [
    {
      key: 'tensile',
      label: 'Tensile Strength (MPa)',
      data: [40, 50, 65],
      max: 80,
      context: 'Higher tensile strength means the part can withstand greater pulling force before fracturing. Engineering resins approach injection-molded plastic performance.'
    },
    {
      key: 'elongation',
      label: 'Elongation at Break (%)',
      data: [5, 120, 25],
      max: 150,
      context: 'Elongation measures flexibility. Tough/flexible resins stretch dramatically before breaking — ideal for snap-fits and living hinges. Standard resins are brittle.'
    },
    {
      key: 'hdt',
      label: 'Heat Deflection Temp (°C)',
      data: [45, 55, 200],
      max: 230,
      context: 'HDT indicates how hot a part can get under load before warping. Engineering resins maintain shape in high-temperature environments where standard resins would deform.'
    },
    {
      key: 'cost',
      label: 'Relative Cost Index',
      data: [1.0, 2.5, 4.5],
      max: 5.5,
      context: 'Cost increases with material sophistication. Standard resin is the baseline (1.0×). Engineering resins cost 4–5× more but offer properties that standard resins cannot match.'
    },
  ];

  const FAMILIES = [
    { name: 'Standard Resin',       col: 'rgba(60,110,200,0.85)',  border: 'rgb(40,80,180)',  use: 'Miniatures, display models, prototypes' },
    { name: 'Tough/Flexible Resin', col: 'rgba(30,160,120,0.85)', border: 'rgb(20,130,100)', use: 'Snap-fits, gaskets, living hinges, grips' },
    { name: 'Engineering Resin',    col: 'rgba(200,110,30,0.85)', border: 'rgb(170,80,20)',  use: 'Automotive parts, heat-resistant fixtures, dental' },
  ];

  let currentProp = 0;

  // ── Build DOM ──────────────────────────────────────────────────────────────

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'font-family: sans-serif; background: #f8faff; padding: 10px; max-width: 100%;';
  container.appendChild(wrapper);

  const title = document.createElement('h2');
  title.textContent = 'Resin Family Comparison';
  title.style.cssText = 'text-align:center; color:#1a3a6c; margin:4px 0 2px; font-size:18px;';
  wrapper.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Select a property to compare Standard, Tough/Flexible, and Engineering resins';
  subtitle.style.cssText = 'text-align:center; color:#666; font-size:11px; margin:0 0 10px;';
  wrapper.appendChild(subtitle);

  // Property toggle buttons
  const btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex; gap:6px; flex-wrap:wrap; justify-content:center; margin-bottom:10px;';
  wrapper.appendChild(btnRow);

  const btns = PROPERTIES.map((p, i) => {
    const btn = document.createElement('button');
    btn.textContent = p.label;
    btn.style.cssText = `padding:5px 12px; border:2px solid #5580cc; border-radius:4px; cursor:pointer; font-size:11px; background:${i === 0 ? '#3355cc' : '#e8edf8'}; color:${i === 0 ? '#fff' : '#333'};`;
    btn.addEventListener('click', () => {
      currentProp = i;
      btns.forEach((b, j) => {
        b.style.background = j === i ? '#3355cc' : '#e8edf8';
        b.style.color = j === i ? '#fff' : '#333';
      });
      updateChart();
    });
    btnRow.appendChild(btn);
    return btn;
  });

  // Chart canvas
  const chartCanvas = document.createElement('canvas');
  chartCanvas.id = 'resinChart';
  chartCanvas.style.cssText = 'max-height:220px; display:block; width:100%;';
  wrapper.appendChild(chartCanvas);

  // Context text box
  const contextBox = document.createElement('div');
  contextBox.style.cssText = 'background:#fff; border:1px solid #dde; border-radius:4px; padding:8px 12px; margin:8px 0; font-size:11px; color:#444; line-height:1.5;';
  wrapper.appendChild(contextBox);

  // Application table
  const appSection = document.createElement('div');
  appSection.style.cssText = 'margin-top:8px;';
  wrapper.appendChild(appSection);

  const appTitle = document.createElement('p');
  appTitle.textContent = 'Typical Applications:';
  appTitle.style.cssText = 'font-weight:600; margin:4px 0; font-size:11px; color:#333;';
  appSection.appendChild(appTitle);

  const appGrid = document.createElement('div');
  appGrid.style.cssText = 'display:flex; gap:6px; flex-wrap:wrap;';
  appSection.appendChild(appGrid);

  FAMILIES.forEach(f => {
    const card = document.createElement('div');
    card.style.cssText = `flex:1; min-width:160px; border-left:4px solid ${f.border}; background:#fff; padding:6px 8px; border-radius:2px; font-size:10.5px;`;
    card.innerHTML = `<strong style="color:${f.border}">${f.name}</strong><br>${f.use}`;
    appGrid.appendChild(card);
  });

  // ── Chart.js ───────────────────────────────────────────────────────────────

  const ctx = chartCanvas.getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: FAMILIES.map(f => f.name),
      datasets: [{
        label: PROPERTIES[0].label,
        data: PROPERTIES[0].data,
        backgroundColor: FAMILIES.map(f => f.col),
        borderColor: FAMILIES.map(f => f.border),
        borderWidth: 2,
        borderRadius: 4,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => {
              const p = PROPERTIES[currentProp];
              return ` ${ctx.raw} ${p.key === 'cost' ? '×' : p.label.match(/\((.+?)\)/)?.[1] || ''}`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: PROPERTIES[0].max,
          grid: { color: '#e8edf8' },
          ticks: { font: { size: 11 } }
        },
        y: {
          ticks: { font: { size: 12 }, color: '#333' },
          grid: { display: false }
        }
      },
      animation: { duration: 350 }
    }
  });

  function updateChart() {
    const p = PROPERTIES[currentProp];
    chart.data.datasets[0].data = p.data;
    chart.data.datasets[0].label = p.label;
    chart.options.scales.x.max = p.max;
    chart.update();
    contextBox.textContent = p.context;
  }

  updateChart();
});
