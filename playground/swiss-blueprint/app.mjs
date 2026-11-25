// Pure data & DOM controller for DT-015 Swiss Blueprint standalone specimen.
export const PARTS = [
  {
    id: 'P-01',
    name: '主框架外壳 / Main Chassis Frame',
    subsystem: 'frame',
    dimensionMm: 420.0,
    toleranceMm: 0.15,
    material: '6061-T6 Aluminum',
    status: 'VERIFIED',
    tone: 'ok',
    xPct: 50,
    yPct: 24,
    note: '基准刚性框架，提供四点安装基准面与内部导轨定位槽。'
  },
  {
    id: 'P-02',
    name: '光学视窗环 / Optical Aperture Ring',
    subsystem: 'optics',
    dimensionMm: 108.0,
    toleranceMm: 0.05,
    material: 'Anodized Alloy + AR Glass',
    status: 'VERIFIED',
    tone: 'ok',
    xPct: 36.8,
    yPct: 50,
    note: '双阶同心光学视窗环，带防眩光阶梯内壁与密封槽。'
  },
  {
    id: 'P-03',
    name: '对准基准靶心 / Alignment Reticle Core',
    subsystem: 'optics',
    dimensionMm: 20.0,
    toleranceMm: 0.02,
    material: 'Fused Silica',
    status: 'REVIEW',
    tone: 'warning',
    xPct: 36.8,
    yPct: 68,
    note: '中心光学基准刻度，需在装配终检阶段做二次同轴度校核。'
  },
  {
    id: 'P-04',
    name: '纵列散热鳍片 / Thermal Fin Array',
    subsystem: 'thermal',
    dimensionMm: 126.0,
    toleranceMm: 0.2,
    material: 'Extruded Alloy 6063',
    status: 'VERIFIED',
    tone: 'ok',
    xPct: 64.2,
    yPct: 50,
    note: '8 片等距自然对流散热片，垂直通道避免横向气流遮挡。'
  },
  {
    id: 'P-05',
    name: '定位基准螺栓孔 / Corner Mount Bore',
    subsystem: 'fastener',
    dimensionMm: 10.0,
    toleranceMm: 0.08,
    material: 'A4 Stainless Insert',
    status: 'VERIFIED',
    tone: 'ok',
    xPct: 19.1,
    yPct: 27,
    note: '四角对称 M5 沉头紧固基准孔，附带钢丝螺套防滑牙设计。'
  },
  {
    id: 'P-06',
    name: '底部检修锁扣 / Lower Service Latch',
    subsystem: 'fastener',
    dimensionMm: 24.5,
    toleranceMm: 0.1,
    material: '304 Stainless Steel',
    status: 'REVIEW',
    tone: 'warning',
    xPct: 80.9,
    yPct: 73,
    note: '免工具快拆检修锁扣，待验证低温循环后预紧力衰减。'
  }
];

export function formatLength(mm, unit = 'mm') {
  if (unit === 'in') return `${(mm / 25.4).toFixed(2)} in`;
  return `${mm.toFixed(1)} mm`;
}

export function formatTolerance(mm, unit = 'mm') {
  if (unit === 'in') return `±${(mm / 25.4).toFixed(3)} in`;
  return `±${mm.toFixed(2)} mm`;
}

export function filterParts(subsystem = 'all') {
  if (subsystem === 'all') return PARTS;
  return PARTS.filter(p => p.subsystem === subsystem);
}

if (typeof document !== 'undefined') {
  const shell = document.querySelector('.bp-shell');
  const pinLayer = document.getElementById('pinLayer');
  const scheduleBody = document.getElementById('scheduleBody');
  const scheduleCount = document.getElementById('scheduleCount');
  const metaUnit = document.getElementById('metaUnit');
  const svgDimSpan = document.getElementById('svgDimSpan');
  const unitToggle = document.getElementById('unitToggle');
  const gridToggle = document.getElementById('gridToggle');
  const detailCode = document.getElementById('detailCode');
  const detailName = document.getElementById('detailName');
  const detailStatus = document.getElementById('detailStatus');
  const detailNote = document.getElementById('detailNote');
  const detailSpecs = document.getElementById('detailSpecs');

  const state = { filter: 'all', unit: 'mm', grid: true, selectedId: 'P-01' };

  function renderDetail() {
    const part = PARTS.find(p => p.id === state.selectedId) || PARTS[0];
    detailCode.textContent = part.id;
    detailName.textContent = part.name;
    detailStatus.textContent = part.status;
    detailStatus.dataset.tone = part.tone;
    detailNote.textContent = part.note;
    detailSpecs.replaceChildren();
    const specs = [
      ['SUBSYSTEM', part.subsystem.toUpperCase()],
      ['DIMENSION', formatLength(part.dimensionMm, state.unit)],
      ['TOLERANCE', formatTolerance(part.toleranceMm, state.unit)],
      ['MATERIAL', part.material]
    ];
    for (const [k, v] of specs) {
      const box = document.createElement('div');
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = k;
      dd.textContent = v;
      box.append(dt, dd);
      detailSpecs.append(box);
    }
  }

  function render() {
    const visible = filterParts(state.filter);
    const visibleIds = new Set(visible.map(p => p.id));
    if (!visibleIds.has(state.selectedId) && visible.length) {
      state.selectedId = visible[0].id;
    }

    metaUnit.textContent = state.unit.toUpperCase();
    svgDimSpan.textContent = formatLength(420.0, state.unit);
    unitToggle.textContent = state.unit === 'mm' ? '单位：mm → in' : '单位：in → mm';
    unitToggle.setAttribute('aria-pressed', String(state.unit === 'in'));
    gridToggle.textContent = state.grid ? '坐标网格：开' : '坐标网格：关';
    gridToggle.setAttribute('aria-pressed', String(state.grid));
    shell.dataset.grid = state.grid ? 'on' : 'off';

    for (const chip of document.querySelectorAll('.bp-chip')) {
      chip.setAttribute('aria-pressed', String(chip.dataset.filter === state.filter));
    }

    pinLayer.replaceChildren();
    for (const part of PARTS) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'bp-pin';
      btn.style.left = `${part.xPct}%`;
      btn.style.top = `${part.yPct}%`;
      btn.textContent = part.id;
      btn.hidden = !visibleIds.has(part.id);
      btn.setAttribute('aria-label', `选中零件 ${part.id} ${part.name}`);
      btn.setAttribute('aria-pressed', String(part.id === state.selectedId));
      btn.addEventListener('click', () => {
        state.selectedId = part.id;
        render();
      });
      pinLayer.append(btn);
    }

    scheduleBody.replaceChildren();
    for (const part of visible) {
      const tr = document.createElement('tr');
      tr.dataset.active = String(part.id === state.selectedId);
      tr.addEventListener('click', () => {
        state.selectedId = part.id;
        render();
      });
      const tdId = document.createElement('td');
      const idBtn = document.createElement('button');
      idBtn.type = 'button';
      idBtn.className = 'bp-row-btn';
      idBtn.textContent = part.id;
      idBtn.addEventListener('click', e => {
        e.stopPropagation();
        state.selectedId = part.id;
        render();
      });
      tdId.append(idBtn);

      const cells = [
        part.name,
        part.subsystem.toUpperCase(),
        formatLength(part.dimensionMm, state.unit),
        formatTolerance(part.toleranceMm, state.unit),
        part.status
      ];
      tr.append(tdId);
      for (const text of cells) {
        const td = document.createElement('td');
        td.textContent = text;
        tr.append(td);
      }
      scheduleBody.append(tr);
    }

    scheduleCount.textContent = `${visible.length} / ${PARTS.length} PARTS`;
    renderDetail();
  }

  for (const chip of document.querySelectorAll('.bp-chip')) {
    chip.addEventListener('click', () => {
      state.filter = chip.dataset.filter || 'all';
      render();
    });
  }
  unitToggle.addEventListener('click', () => {
    state.unit = state.unit === 'mm' ? 'in' : 'mm';
    render();
  });
  gridToggle.addEventListener('click', () => {
    state.grid = !state.grid;
    render();
  });

  render();
}
