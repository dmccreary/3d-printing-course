// FDM Printer Price Decline (2009–2024) — Chart.js MicroSim
// CANVAS_HEIGHT: 520
// Line chart with log/linear toggle, click-to-reveal event infobox,
// and a $500 school-budget reference line.

document.addEventListener('DOMContentLoaded', function () {

  // ── Data ──────────────────────────────────────────────────────────────────

  const DATA = [
    { year: 2009, price: 14900, event: 'Patent expires; MakerBot founded' },
    { year: 2010, price:  7500, event: 'MakerBot Thing-O-Matic' },
    { year: 2011, price:  2500, event: 'Prusa Mendel kit popularized' },
    { year: 2012, price:  2199, event: 'MakerBot Replicator 2' },
    { year: 2013, price:  1299, event: 'Flashforge Creator' },
    { year: 2014, price:   699, event: 'Proliferation of Chinese kits' },
    { year: 2015, price:   499, event: 'Prusa i3 kit widely available' },
    { year: 2017, price:   299, event: 'Creality CR-10 ships' },
    { year: 2018, price:   229, event: 'Creality Ender 3 — best-selling printer in history' },
    { year: 2020, price:   179, event: 'Multiple sub-$200 capable printers' },
    { year: 2022, price:   349, event: 'Bambu Lab P1P — high-speed CoreXY at prosumer price' },
    { year: 2024, price:   149, event: 'Entry-level capable FDM under $150' }
  ];

  // ── Layout ────────────────────────────────────────────────────────────────

  const main = document.querySelector('main');
  main.style.fontFamily = 'Arial, Helvetica, sans-serif';
  main.style.margin     = '0';
  main.style.padding    = '8px 12px 4px';
  main.style.boxSizing  = 'border-box';

  // Title
  const title = document.createElement('h2');
  title.textContent = 'FDM Printer Price Decline (2009–2024)';
  title.style.cssText = 'margin:0 0 6px;font-size:16px;text-align:center;color:#1565c0;';
  main.appendChild(title);

  // Chart container
  const chartWrap = document.createElement('div');
  chartWrap.style.cssText = 'position:relative;width:100%;height:340px;';
  main.appendChild(chartWrap);

  const canvas = document.createElement('canvas');
  canvas.id = 'priceChart';
  chartWrap.appendChild(canvas);

  // Controls row
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;align-items:center;gap:12px;margin:8px 0 4px;';
  main.appendChild(controls);

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = 'Switch to Linear Scale';
  toggleBtn.style.cssText = 'padding:5px 12px;font-size:13px;cursor:pointer;border:1px solid #1565c0;border-radius:4px;background:#e3f2fd;color:#1565c0;';
  controls.appendChild(toggleBtn);

  const hint = document.createElement('span');
  hint.textContent = 'Click a data point to see the key event.';
  hint.style.cssText = 'font-size:12px;color:#555;';
  controls.appendChild(hint);

  // Info box
  const infoBox = document.createElement('div');
  infoBox.style.cssText = 'min-height:44px;padding:8px 12px;background:#fff8e1;border:1px solid #fbc02d;border-radius:4px;font-size:13px;color:#333;display:none;';
  main.appendChild(infoBox);

  // ── Chart.js setup ────────────────────────────────────────────────────────

  let isLogScale = true;

  const labels = DATA.map(d => d.year.toString());
  const prices  = DATA.map(d => d.price);

  // Reference line plugin (school budget $500)
  const refLinePlugin = {
    id: 'refLine',
    afterDraw(chart) {
      const { ctx, chartArea, scales } = chart;
      const y = scales.y.getPixelForValue(500);
      if (y < chartArea.top || y > chartArea.bottom) return;
      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = '#e65100';
      ctx.lineWidth   = 1.5;
      ctx.beginPath();
      ctx.moveTo(chartArea.left, y);
      ctx.lineTo(chartArea.right, y);
      ctx.stroke();
      ctx.fillStyle   = '#e65100';
      ctx.font        = '11px Arial';
      ctx.fillText('Typical school-budget threshold ($500)', chartArea.left + 4, y - 4);
      ctx.restore();
    }
  };

  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Entry-level FDM price (USD)',
        data: prices,
        borderColor:     '#1565c0',
        backgroundColor: '#1565c020',
        borderWidth:     2.5,
        pointBackgroundColor: '#ff6600',
        pointBorderColor:     '#ff6600',
        pointRadius:          6,
        pointHoverRadius:     9,
        tension: 0.1,
        fill: true
      }]
    },
    options: {
      responsive:          true,
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', axis: 'x', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => {
              const d = DATA[ctx.dataIndex];
              return ['$' + d.price.toLocaleString(), d.event];
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Year', font: { size: 13 } },
          ticks: { maxTicksLimit: 9 }
        },
        y: {
          type: 'logarithmic',
          title: { display: true, text: 'Price (USD)', font: { size: 13 } },
          ticks: {
            callback: v => '$' + v.toLocaleString()
          },
          min: 100
        }
      },
      onClick(evt, elements) {
        if (!elements.length) return;
        const idx = elements[0].index;
        const d   = DATA[idx];
        infoBox.style.display = 'block';
        infoBox.innerHTML = `<strong>${d.year}</strong>: ~$${d.price.toLocaleString()} — ${d.event}`;
      }
    },
    plugins: [refLinePlugin]
  });

  // ── Toggle scale ──────────────────────────────────────────────────────────

  toggleBtn.addEventListener('click', () => {
    isLogScale = !isLogScale;
    chart.options.scales.y.type = isLogScale ? 'logarithmic' : 'linear';
    chart.options.scales.y.min  = isLogScale ? 100 : 0;
    toggleBtn.textContent = isLogScale ? 'Switch to Linear Scale' : 'Switch to Log Scale';
    chart.update();
  });

});
