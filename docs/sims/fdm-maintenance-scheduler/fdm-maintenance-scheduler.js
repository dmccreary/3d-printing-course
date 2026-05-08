// FDM Maintenance Scheduler — interactive checklist with Why? explanations
// CANVAS_HEIGHT: 580
// Bloom L3: use structured checklist to develop printer maintenance habits

document.addEventListener('DOMContentLoaded', function () {
  // CANVAS_HEIGHT: 580

  const container = document.querySelector('main');

  const TABS = ['After Each Print', 'Monthly', 'As-Needed'];

  const TASKS = {
    'After Each Print': [
      {
        icon: '🧹', name: 'Clean build surface',
        time: '2 min',
        why: 'Residual adhesive, filament bits, and finger oils contaminate the surface and cause adhesion failures on the next print. A clean PEI sheet grips PLA reliably for hundreds of prints.'
      },
      {
        icon: '🔍', name: 'Inspect first layer quality',
        time: '1 min',
        why: 'The first layer is a diagnostic — good squish indicates correct Z-offset and level bed. Gaps or blobs catch issues before a multi-hour print fails halfway through.'
      },
      {
        icon: '🎣', name: 'Check filament path for tangles',
        time: '1 min',
        why: 'Tangles or crossed loops on the spool cause mid-print filament jams. Catching them before the print starts prevents the frustration of a failure at hour eight.'
      },
    ],
    'Monthly': [
      {
        icon: '🎵', name: 'Belt tension check (twang test)',
        time: '5 min',
        why: 'A loose belt produces ringing artifacts (ghosting) visible as echoes on vertical surfaces. Pluck each belt — it should produce a musical note, not a dull thud.'
      },
      {
        icon: '💧', name: 'Z screw lubrication',
        time: '5 min',
        why: 'Dry lead screws cause Z-banding (horizontal artifacts at screw pitch intervals) and wear faster. Use PTFE-based grease, not oil, which attracts dust.'
      },
      {
        icon: '🔩', name: 'Linear rod lubrication',
        time: '5 min',
        why: 'Unlubricated rods create print artifacts from uneven resistance and wear out bearings prematurely. A light machine oil every month extends rod life significantly.'
      },
      {
        icon: '🔧', name: 'Pulley set screw check',
        time: '5 min',
        why: 'Loose set screws on motor shaft pulleys cause layer shifts — the pulley slips but the motor keeps stepping. Check both X and Y stepper pulleys with an Allen wrench.'
      },
      {
        icon: '⚙️', name: 'Extruder gear cleaning',
        time: '5 min',
        why: 'PLA dust accumulates in the drive gear teeth and reduces grip, causing underextrusion. A stiff brush or dental pick removes debris from between the teeth.'
      },
      {
        icon: '📐', name: 'E-step verification',
        time: '10 min',
        why: 'E-steps (extruder steps per mm) drift as gears wear. Mark the filament at 100 mm, command exactly 100 mm, measure the actual distance moved — it should be within 1 mm.'
      },
    ],
    'As-Needed': [
      {
        icon: '❄️', name: 'Nozzle cold pull',
        time: '15 min',
        why: 'A cold pull removes charred debris from inside the hotend that causes clogs and inconsistent extrusion. Recommended whenever extrusion quality degrades or after material changes.'
      },
      {
        icon: '🔄', name: 'Nozzle replacement',
        time: '20 min',
        why: 'Brass nozzles wear after 200–500 hours of abrasive filament. Replace when inner diameter measures oversized or when stringing increases despite tuning.'
      },
      {
        icon: '📏', name: 'Bed leveling re-calibration',
        time: '10 min',
        why: 'Bed springs compress and shift over time, especially with heat cycles. Re-level whenever first-layer squish inconsistency appears across the bed.'
      },
      {
        icon: '💾', name: 'Firmware update check',
        time: '15 min',
        why: 'Firmware updates fix bugs, improve thermal runaway protection, and add new features. Check the manufacturer\'s GitHub every few months for safety-related updates.'
      },
    ]
  };

  let currentTab = 0;
  let checked = {};
  let expanded = {};

  Object.values(TASKS).flat().forEach(t => { checked[t.name] = false; expanded[t.name] = false; });

  // Build DOM
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'font-family: sans-serif; background: #f8faff; padding: 10px; max-width: 100%; min-height: 560px; box-sizing: border-box;';
  container.appendChild(wrapper);

  const title = document.createElement('h2');
  title.textContent = 'FDM Maintenance Scheduler';
  title.style.cssText = 'text-align:center; color:#1a3a6c; margin:4px 0 10px; font-size:18px;';
  wrapper.appendChild(title);

  // Tab bar
  const tabBar = document.createElement('div');
  tabBar.style.cssText = 'display:flex; gap:6px; margin-bottom:12px;';
  wrapper.appendChild(tabBar);

  const contentArea = document.createElement('div');
  contentArea.style.cssText = 'flex:1;';
  wrapper.appendChild(contentArea);

  function renderTabs() {
    tabBar.innerHTML = '';
    TABS.forEach((tab, i) => {
      const btn = document.createElement('button');
      btn.textContent = tab;
      const tasks = TASKS[tab];
      const done = tasks.filter(t => checked[t.name]).length;
      btn.innerHTML = tab + (done > 0 ? ` <span style="background:#2a8a4a;color:#fff;border-radius:10px;padding:1px 6px;font-size:10px;">${done}/${tasks.length}</span>` : '');
      btn.style.cssText = `padding:7px 14px; border-radius:4px 4px 0 0; cursor:pointer; font-size:11px; border:1px solid #cdd; border-bottom:${i === currentTab ? '3px solid #1a3a6c' : '1px solid #cdd'}; background:${i === currentTab ? '#fff' : '#e8edf8'}; color:${i === currentTab ? '#1a3a6c' : '#555'}; font-weight:${i === currentTab ? '600' : 'normal'};`;
      btn.addEventListener('click', () => { currentTab = i; render(); });
      tabBar.appendChild(btn);
    });
  }

  function renderContent() {
    contentArea.innerHTML = '';
    const tabName = TABS[currentTab];
    const tasks = TASKS[tabName];
    const done = tasks.filter(t => checked[t.name]).length;

    // Progress bar
    const progWrap = document.createElement('div');
    progWrap.style.cssText = 'margin-bottom:10px;';
    const progLabel = document.createElement('div');
    progLabel.style.cssText = 'font-size:11px; color:#444; margin-bottom:4px;';
    progLabel.textContent = `${tabName}: ${done} of ${tasks.length} tasks completed`;
    const progBar = document.createElement('div');
    progBar.style.cssText = 'height:8px; background:#e0e8f0; border-radius:4px; overflow:hidden;';
    const progFill = document.createElement('div');
    progFill.style.cssText = `height:100%; width:${tasks.length ? (done / tasks.length * 100) : 0}%; background:${done === tasks.length ? '#2a8a4a' : '#2a6db5'}; border-radius:4px; transition:width 0.3s;`;
    progBar.appendChild(progFill);
    progWrap.appendChild(progLabel); progWrap.appendChild(progBar);
    contentArea.appendChild(progWrap);

    // Task cards
    tasks.forEach(task => {
      const card = document.createElement('div');
      const isDone = checked[task.name];
      const isExp = expanded[task.name];
      card.style.cssText = `background:${isDone ? '#f0faf4' : '#fff'}; border:1px solid ${isDone ? '#a0d8b0' : '#dde'}; border-radius:6px; margin-bottom:8px; padding:10px 12px; transition:all 0.2s;`;

      const topRow = document.createElement('div');
      topRow.style.cssText = 'display:flex; align-items:center; gap:8px;';

      // Checkbox
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.checked = isDone; cb.style.cssText = 'width:16px;height:16px;cursor:pointer;';
      cb.addEventListener('change', () => { checked[task.name] = cb.checked; render(); });

      // Icon + name
      const label = document.createElement('span');
      label.style.cssText = `flex:1; font-size:12px; font-weight:600; color:${isDone ? '#2a8a4a' : '#222'}; text-decoration:${isDone ? 'line-through' : 'none'}; cursor:pointer;`;
      label.textContent = task.icon + ' ' + task.name;
      label.addEventListener('click', () => { checked[task.name] = !checked[task.name]; render(); });

      // Time badge
      const timeBadge = document.createElement('span');
      timeBadge.style.cssText = 'font-size:10px; color:#888; background:#f0f0f8; padding:2px 8px; border-radius:10px; white-space:nowrap;';
      timeBadge.textContent = '⏱ ' + task.time;

      // Why button
      const whyBtn = document.createElement('button');
      whyBtn.textContent = isExp ? '▲ Hide' : '❓ Why?';
      whyBtn.style.cssText = `font-size:10px; padding:3px 8px; border-radius:3px; cursor:pointer; border:1px solid #aab; background:${isExp ? '#e8edf8' : '#f8f8ff'}; color:#445;`;
      whyBtn.addEventListener('click', () => { expanded[task.name] = !expanded[task.name]; render(); });

      topRow.appendChild(cb); topRow.appendChild(label); topRow.appendChild(timeBadge); topRow.appendChild(whyBtn);
      card.appendChild(topRow);

      if (isExp) {
        const why = document.createElement('div');
        why.style.cssText = 'margin-top:8px; padding:8px 10px; background:#f0f4ff; border-radius:4px; font-size:11px; color:#334; line-height:1.5; border-left:3px solid #4466cc;';
        why.textContent = task.why;
        card.appendChild(why);
      }

      contentArea.appendChild(card);
    });

    // Reset button
    const resetBtn = document.createElement('button');
    resetBtn.textContent = '↺ Reset Checklist';
    resetBtn.style.cssText = 'margin-top:8px; padding:6px 14px; font-size:11px; border:1px solid #cdd; border-radius:4px; cursor:pointer; background:#fff; color:#555;';
    resetBtn.addEventListener('click', () => {
      if (confirm('Clear all checks for ' + tabName + '?')) {
        tasks.forEach(t => { checked[t.name] = false; expanded[t.name] = false; });
        render();
      }
    });
    contentArea.appendChild(resetBtn);
  }

  function render() {
    renderTabs();
    renderContent();
  }

  render();
});
