// Print Session Safety Checklist — pre-print risk assessment
// CANVAS_HEIGHT: 620
// Bloom L5: assess safety adequacy of a print setup before beginning

document.addEventListener('DOMContentLoaded', function () {

  const container = document.querySelector('main');

  const SCENARIOS = [
    { name: 'Custom Setup', prefill: null },
    { name: 'ABS — Unventilated Classroom', prefill: { 'Enclosure in use': 'no', 'Active ventilation / exhaust': 'no', 'Smoke detector present': 'no', 'Resin workspace isolated': 'na' } },
    { name: 'PLA — Well-Ventilated Lab', prefill: { 'Enclosure in use': 'na', 'Active ventilation / exhaust': 'yes', 'Smoke detector present': 'yes' } },
    { name: 'Resin (MSLA) — Home Use', prefill: { 'Nitrile gloves available': 'yes', 'UV-blocking safety glasses': 'yes', 'Resin workspace isolated': 'yes', 'Active ventilation / exhaust': 'yes' } },
  ];

  const CARDS = [
    {
      title: 'Fume & Particle Risk',
      icon: '💨',
      questions: [
        { q: 'Active ventilation / exhaust running?', why: 'FDM printing emits UFPs (ultra-fine particles) and VOCs. ABS/ASA are significantly worse than PLA. Good airflow dilutes and removes them.' },
        { q: 'Enclosure in use (if ABS/ASA/Nylon)?', why: 'Enclosures trap heat and reduce warp for engineering filaments, but also concentrate fumes — must be paired with ventilation.' },
        { q: 'Air purifier or HEPA filter present?', why: 'HEPA + activated carbon filters capture particles and some VOCs. Recommended for any indoor print environment used regularly.' },
      ]
    },
    {
      title: 'Fire Safety',
      icon: '🔥',
      questions: [
        { q: 'Smoke detector present and functional?', why: 'Thermal runaway (firmware bug or sensor failure) can start a fire. A working detector is the last line of defense.' },
        { q: 'Printer never left unattended while printing?', why: 'Most 3D printer fires occur when the printer is left unsupervised. Monitor remotely or only print when someone is present.' },
        { q: 'Printer on non-combustible surface?', why: 'Filament drips and failed prints can ignite paper or wood. Metal carts, concrete floors, or fire-resistant mats reduce risk.' },
        { q: 'Fire extinguisher within reach?', why: 'Class ABC or CO₂ extinguisher handles electrical and plastic fires. Know where it is before you need it.' },
      ]
    },
    {
      title: 'Chemical Safety (Resin)',
      icon: '⚗️',
      questions: [
        { q: 'Nitrile gloves available?', why: 'Uncured resin causes contact dermatitis and sensitization. Never touch uncured resin with bare hands — sensitization can become permanent.' },
        { q: 'UV-blocking safety glasses on?', why: 'UV light from SLA/MSLA printers can cause eye damage. UV-blocking glasses (not just regular sunglasses) are required.' },
        { q: 'Resin workspace isolated from food/drink?', why: 'Resin monomers are toxic if ingested. Keep all resin chemicals away from any surface or container used for food or drink.' },
        { q: 'Resin waste disposal plan in place?', why: 'Uncured resin is hazardous waste. Cure IPA wash water in sunlight before disposal. Never pour uncured resin down the drain.' },
      ]
    },
    {
      title: 'IP & Ethical Use',
      icon: '⚖️',
      questions: [
        { q: 'File is original, licensed, or openly shared?', why: 'Downloading and printing files without a license may infringe copyright. Check for Creative Commons or explicit permission.' },
        { q: 'No replicated dangerous or regulated items?', why: 'Some objects (firearms, drug paraphernalia) are illegal to print in many jurisdictions. Know your local laws.' },
        { q: 'Intent of use is constructive / educational?', why: '3D printing has broad legitimate uses. Using it to harass, deceive, or harm undermines the community and the technology.' },
      ]
    },
  ];

  let answers = {};
  let scenarioIdx = 0;

  // Initialize all answers to null
  CARDS.forEach(c => c.questions.forEach(q => { answers[q.q] = null; }));

  // Build DOM
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'font-family: sans-serif; background: #f8faff; padding: 10px; max-width: 100%; box-sizing: border-box;';
  container.appendChild(wrapper);

  const titleEl = document.createElement('h2');
  titleEl.textContent = 'Print Session Safety Checklist';
  titleEl.style.cssText = 'text-align:center; color:#1a3a6c; margin:4px 0 8px; font-size:18px;';
  wrapper.appendChild(titleEl);

  // Scenario selector + readiness indicator row
  const topRow = document.createElement('div');
  topRow.style.cssText = 'display:flex; align-items:center; gap:10px; margin-bottom:12px; flex-wrap:wrap;';
  wrapper.appendChild(topRow);

  const scenLabel = document.createElement('span');
  scenLabel.style.cssText = 'font-size:11px; color:#444;';
  scenLabel.textContent = 'Scenario:';
  topRow.appendChild(scenLabel);

  const scenSel = document.createElement('select');
  scenSel.style.cssText = 'font-size:11px; padding:3px 6px; border-radius:3px; border:1px solid #ccc;';
  SCENARIOS.forEach((s, i) => {
    const opt = document.createElement('option');
    opt.value = i; opt.textContent = s.name;
    scenSel.appendChild(opt);
  });
  scenSel.addEventListener('change', () => {
    scenarioIdx = parseInt(scenSel.value);
    applyScenario();
    render();
  });
  topRow.appendChild(scenSel);

  const readinessEl = document.createElement('span');
  readinessEl.style.cssText = 'margin-left:auto; font-weight:600; font-size:12px; padding:4px 14px; border-radius:4px;';
  topRow.appendChild(readinessEl);

  const resetBtn = document.createElement('button');
  resetBtn.textContent = '↺ Reset';
  resetBtn.style.cssText = 'font-size:11px; padding:4px 10px; border:1px solid #ccc; border-radius:3px; cursor:pointer; background:#fff;';
  resetBtn.addEventListener('click', () => {
    CARDS.forEach(c => c.questions.forEach(q => { answers[q.q] = null; }));
    render();
  });
  topRow.appendChild(resetBtn);

  const cardsArea = document.createElement('div');
  cardsArea.style.cssText = 'display:grid; grid-template-columns:1fr 1fr; gap:8px;';
  wrapper.appendChild(cardsArea);

  function applyScenario() {
    const pf = SCENARIOS[scenarioIdx].prefill;
    if (!pf) return;
    Object.keys(pf).forEach(key => {
      // Find matching question
      CARDS.forEach(c => c.questions.forEach(q => {
        if (q.q.toLowerCase().includes(key.toLowerCase())) {
          answers[q.q] = pf[key];
        }
      }));
    });
  }

  function getCardRisk(card) {
    const qs = card.questions;
    const answered = qs.filter(q => answers[q.q] !== null);
    const noCount = qs.filter(q => answers[q.q] === 'no').length;
    const yesCount = qs.filter(q => answers[q.q] === 'yes').length;
    if (answered.length === 0) return 'unanswered';
    if (noCount >= 2) return 'high';
    if (noCount === 1) return 'medium';
    if (yesCount === qs.length || (yesCount + qs.filter(q => answers[q.q] === 'na').length) === qs.length) return 'low';
    return 'medium';
  }

  function getOverallReadiness() {
    const risks = CARDS.map(getCardRisk);
    if (risks.includes('unanswered')) return { label: 'Answer All Questions', bg: '#888', fg: '#fff' };
    if (risks.includes('high')) return { label: '⛔ Do Not Start', bg: '#c0392b', fg: '#fff' };
    if (risks.includes('medium')) return { label: '⚠ Review Required', bg: '#e67e22', fg: '#fff' };
    return { label: '✓ Ready to Print', bg: '#27ae60', fg: '#fff' };
  }

  const RISK_COLORS = {
    unanswered: { border: '#ccc', head: '#888', badge: '#ccc', badgeText: '#555', badgeLabel: '—' },
    low:    { border: '#27ae60', head: '#27ae60', badge: '#27ae60', badgeText: '#fff', badgeLabel: 'Low Risk' },
    medium: { border: '#e67e22', head: '#e67e22', badge: '#e67e22', badgeText: '#fff', badgeLabel: 'Medium Risk' },
    high:   { border: '#c0392b', head: '#c0392b', badge: '#c0392b', badgeText: '#fff', badgeLabel: 'High Risk' },
  };

  function render() {
    cardsArea.innerHTML = '';

    CARDS.forEach(card => {
      const risk = getCardRisk(card);
      const rc = RISK_COLORS[risk];

      const cardEl = document.createElement('div');
      cardEl.style.cssText = `background:#fff; border:2px solid ${rc.border}; border-radius:6px; overflow:hidden;`;

      const header = document.createElement('div');
      header.style.cssText = `background:${rc.head}; color:#fff; padding:8px 10px; display:flex; align-items:center; gap:8px;`;
      header.innerHTML = `<span style="font-size:16px">${card.icon}</span><span style="font-size:12px; font-weight:600; flex:1">${card.title}</span><span style="font-size:10px; background:rgba(255,255,255,0.25); padding:2px 8px; border-radius:10px;">${rc.badgeLabel}</span>`;
      cardEl.appendChild(header);

      const body = document.createElement('div');
      body.style.cssText = 'padding:8px;';

      card.questions.forEach(q => {
        const row = document.createElement('div');
        row.style.cssText = 'margin-bottom:6px; padding:6px; border-radius:4px; background:#f8f9fa;';

        const qText = document.createElement('div');
        qText.style.cssText = 'font-size:10.5px; font-weight:500; color:#333; margin-bottom:5px;';
        qText.textContent = q.q;

        const radioRow = document.createElement('div');
        radioRow.style.cssText = 'display:flex; gap:6px; align-items:center;';

        ['yes', 'no', 'na'].forEach(val => {
          const lbl = document.createElement('label');
          lbl.style.cssText = 'display:flex; align-items:center; gap:3px; cursor:pointer; font-size:10px;';
          const radio = document.createElement('input');
          radio.type = 'radio'; radio.name = 'q_' + q.q.replace(/\W/g, '_');
          radio.value = val; radio.checked = answers[q.q] === val;
          radio.style.cursor = 'pointer';
          radio.addEventListener('change', () => { answers[q.q] = val; render(); });
          const valColors = { yes: '#27ae60', no: '#c0392b', na: '#888' };
          lbl.appendChild(radio);
          const span = document.createElement('span');
          span.textContent = val === 'na' ? 'N/A' : val.toUpperCase();
          span.style.color = radio.checked ? valColors[val] : '#555';
          span.style.fontWeight = radio.checked ? '600' : 'normal';
          lbl.appendChild(span);
          radioRow.appendChild(lbl);
        });

        // Why tooltip
        const whyBtn = document.createElement('span');
        whyBtn.textContent = '?';
        whyBtn.style.cssText = 'margin-left:auto; cursor:pointer; font-size:10px; color:#aaa; font-weight:600; padding:1px 5px; border-radius:50%; border:1px solid #ddd;';
        let whyShown = false;
        const whyEl = document.createElement('div');
        whyEl.style.cssText = 'display:none; font-size:9.5px; color:#555; background:#fff8e1; padding:5px 7px; border-radius:3px; margin-top:4px; line-height:1.4; border-left:3px solid #e67e22;';
        whyEl.textContent = q.why;
        whyBtn.addEventListener('click', () => { whyShown = !whyShown; whyEl.style.display = whyShown ? 'block' : 'none'; });
        radioRow.appendChild(whyBtn);

        row.appendChild(qText); row.appendChild(radioRow); row.appendChild(whyEl);
        body.appendChild(row);
      });

      cardEl.appendChild(body);
      cardsArea.appendChild(cardEl);
    });

    // Update readiness
    const readiness = getOverallReadiness();
    readinessEl.textContent = readiness.label;
    readinessEl.style.background = readiness.bg;
    readinessEl.style.color = readiness.fg;
  }

  render();
});
