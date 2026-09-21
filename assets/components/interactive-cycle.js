/**
 * SIMULATOR SIKLUS MENSTRUASI 28 HARI INTERAKTIF
 * Menghasilkan kurva hormon dinamis dan perubahan ketebalan endometrium
 * secara visual berbasis HTML5 Canvas & Slider Hari
 */

const MenstruationSimulator = {
  currentDay: 14,
  maxDays: 28,

  init(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = window.MENSTRUATION_DATA;
    if (!data) return;

    container.innerHTML = `
      <div class="cycle-simulator">
        <div class="cycle-controls">
          <div class="day-slider-wrapper">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 700; color: var(--text-primary);">Pilih Hari Siklus:</span>
              <span id="display-day-number" style="font-size: 1.25rem; font-weight: 800; color: var(--primary);">Hari ke-14</span>
            </div>
            <input type="range" id="cycle-day-slider" min="1" max="28" value="14" step="1" aria-label="Slider Hari Siklus Menstruasi">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted);">
              <span>Hari 1 (Mulai Haid)</span>
              <span>Hari 14 (Ovulasi)</span>
              <span>Hari 28 (Akhir Siklus)</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <button class="btn btn-sm btn-secondary" id="btn-prev-day">◀ Hari Sebelumnya</button>
            <button class="btn btn-sm btn-primary" id="btn-play-cycle">▶ Putar Simulasi</button>
            <button class="btn btn-sm btn-secondary" id="btn-next-day">Hari Berikutnya ▶</button>
          </div>
        </div>

        <div class="phase-tabs" id="phase-tabs-container">
          ${data.phases.map(p => `
            <button class="phase-tab-btn" data-phase="${p.id}" style="border-left: 4px solid ${p.color};">
              ${p.name} (${p.dayRange})
            </button>
          `).join('')}
        </div>

        <div class="cycle-visual-grid">
          <div class="cycle-canvas-card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4>Kurva Dinamika 4 Hormon Reproduksi</h4>
              <div style="font-size: 0.72rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="color: #3b82f6; font-weight: 700;">■ FSH</span>
                <span style="color: #ec4899; font-weight: 700;">■ LH</span>
                <span style="color: #10b981; font-weight: 700;">■ Estrogen</span>
                <span style="color: #f59e0b; font-weight: 700;">■ Progesteron</span>
              </div>
            </div>
            <canvas id="canvas-hormones" width="480" height="180"></canvas>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center;">
              Garis putus-putus vertikal merah menandakan posisi hari yang sedang aktif
            </div>
          </div>

          <div class="cycle-canvas-card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4>Ketebalan Dinding Rahim (Endometrium)</h4>
              <span id="endometrium-thickness-val" style="font-size: 0.85rem; font-weight: 700; color: #dc2626;">Ketebalan: ~7.5 mm</span>
            </div>
            <canvas id="canvas-endometrium" width="480" height="180"></canvas>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center;">
              Lapisan merah merepresentasikan jaringan endometrium kaya pembuluh darah
            </div>
          </div>
        </div>

        <div id="cycle-state-description" class="card" style="background: #f8fafc; border-left: 4px solid var(--primary); margin-bottom: 0;">
          <!-- Penjelasan status hari aktif dimuat dinamis -->
        </div>
      </div>
    `;

    // Event Listeners Slider & Buttons
    const slider = document.getElementById('cycle-day-slider');
    const prevBtn = document.getElementById('btn-prev-day');
    const nextBtn = document.getElementById('btn-next-day');
    const playBtn = document.getElementById('btn-play-cycle');
    let isPlaying = false;
    let playInterval = null;

    slider.addEventListener('input', (e) => {
      this.setDay(parseInt(e.target.value));
    });

    prevBtn.addEventListener('click', () => {
      let d = parseInt(slider.value) - 1;
      if (d < 1) d = 28;
      this.setDay(d);
    });

    nextBtn.addEventListener('click', () => {
      let d = parseInt(slider.value) + 1;
      if (d > 28) d = 1;
      this.setDay(d);
    });

    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        clearInterval(playInterval);
        isPlaying = false;
        playBtn.textContent = '▶ Putar Simulasi';
        playBtn.classList.replace('btn-accent', 'btn-primary');
      } else {
        isPlaying = true;
        playBtn.textContent = '⏸ Jeda Simulasi';
        playBtn.classList.replace('btn-primary', 'btn-accent');
        playInterval = setInterval(() => {
          let d = parseInt(slider.value) + 1;
          if (d > 28) d = 1;
          this.setDay(d);
        }, 800);
      }
    });

    // Pasang tab fase klik
    container.querySelectorAll('.phase-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const phaseId = btn.getAttribute('data-phase');
        if (phaseId === 'menstruasi') this.setDay(3);
        if (phaseId === 'folikular') this.setDay(9);
        if (phaseId === 'ovulasi') this.setDay(14);
        if (phaseId === 'luteal') this.setDay(21);
      });
    });

    // Render awal
    this.setDay(14);
  },

  setDay(day) {
    this.currentDay = day;
    const slider = document.getElementById('cycle-day-slider');
    const dayDisplay = document.getElementById('display-day-number');
    if (slider) slider.value = day;
    if (dayDisplay) dayDisplay.textContent = `Hari ke-${day}`;

    const data = window.MENSTRUATION_DATA;
    if (!data) return;

    const state = data.simulatorData.getDayState(day);

    // Update tampilan ketebalan
    const thickVal = document.getElementById('endometrium-thickness-val');
    if (thickVal) thickVal.textContent = `Ketebalan: ~${state.endometrium} mm`;

    // Highlight tab fase aktif
    document.querySelectorAll('.phase-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-phase') === state.phase) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update deskripsi
    const descBox = document.getElementById('cycle-state-description');
    if (descBox) {
      descBox.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <span class="info-badge" style="background: ${state.phase === 'ovulasi' ? '#10b981' : (state.phase === 'menstruasi' ? '#ef4444' : '#2563eb')}; color: white;">
            ${state.phaseName}
          </span>
          <strong style="color: var(--text-primary); font-size: 1.05rem;">Hari ke-${day} dari Siklus 28 Hari</strong>
        </div>
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">${state.description}</p>
        <div style="display: flex; gap: 1rem; margin-top: 0.75rem; font-size: 0.82rem; color: var(--text-muted); flex-wrap: wrap;">
          <span>Perkiraan FSH: <strong>${state.hormones.fsh}%</strong></span>
          <span>Perkiraan LH: <strong style="color: #ec4899;">${state.hormones.lh}%</strong></span>
          <span>Estrogen: <strong style="color: #059669;">${state.hormones.estrogen}%</strong></span>
          <span>Progesteron: <strong style="color: #d97706;">${state.hormones.progesteron}%</strong></span>
        </div>
      `;
    }

    // Render canvas hormon & endometrium
    this.drawHormoneChart(day);
    this.drawEndometriumChart(day);
  },

  drawHormoneChart(activeDay) {
    const canvas = document.getElementById('canvas-hormones');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Background grid
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let y = 30; y < h; y += 35) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const data = window.MENSTRUATION_DATA;
    const total = 28;
    const stepX = w / total;

    // Helper draw curve
    const drawCurve = (color, getVal) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      for (let d = 1; d <= total; d++) {
        const val = getVal(d);
        const x = (d - 0.5) * stepX;
        const y = h - 15 - (val / 100 * (h - 35));
        if (d === 1) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    // Gambarkan 4 hormon
    drawCurve('#3b82f6', d => data.simulatorData.getDayState(d).hormones.fsh);
    drawCurve('#ec4899', d => data.simulatorData.getDayState(d).hormones.lh);
    drawCurve('#10b981', d => data.simulatorData.getDayState(d).hormones.estrogen);
    drawCurve('#f59e0b', d => data.simulatorData.getDayState(d).hormones.progesteron);

    // Garis hari aktif
    const activeX = (activeDay - 0.5) * stepX;
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    ctx.moveTo(activeX, 0);
    ctx.lineTo(activeX, h);
    ctx.stroke();
    ctx.setLineDash([]); // reset

    // Marker lingkaran hari aktif
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(activeX, 10, 4, 0, Math.PI * 2);
    ctx.fill();
  },

  drawEndometriumChart(activeDay) {
    const canvas = document.getElementById('canvas-endometrium');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const data = window.MENSTRUATION_DATA;
    const total = 28;
    const stepX = w / total;

    // Base myometrium (lapisan otot dasar abu-abu)
    ctx.fillStyle = '#fce7f3';
    ctx.fillRect(0, h - 30, w, 30);
    ctx.fillStyle = '#9d174d';
    ctx.font = '10px sans-serif';
    ctx.fillText('Lapisan Otot Rahim (Miometrium)', 10, h - 12);

    // Gambar lapisan endometrium (merah gradien)
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#f43f5e');
    grad.addColorStop(1, '#fda4af');

    ctx.beginPath();
    ctx.moveTo(0, h - 30);
    for (let d = 1; d <= total; d++) {
      const state = data.simulatorData.getDayState(d);
      const x = (d - 0.5) * stepX;
      // Map ketebalan 1 - 10 mm ke pixel
      const thicknessPx = (state.endometrium / 11) * (h - 60);
      const y = h - 30 - thicknessPx;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h - 30);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Gambar pembuluh darah spiral halus di dalam endometrium
    ctx.strokeStyle = 'rgba(185, 28, 28, 0.4)';
    ctx.lineWidth = 1.5;
    for (let d = 6; d <= 26; d += 2) {
      const state = data.simulatorData.getDayState(d);
      const x = (d - 0.5) * stepX;
      const topY = h - 30 - ((state.endometrium / 11) * (h - 60));
      ctx.beginPath();
      ctx.moveTo(x, h - 30);
      ctx.quadraticCurveTo(x + 5, (h - 30 + topY) / 2, x, topY + 5);
      ctx.stroke();
    }

    // Garis hari aktif
    const activeX = (activeDay - 0.5) * stepX;
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    ctx.moveTo(activeX, 0);
    ctx.lineTo(activeX, h);
    ctx.stroke();
    ctx.setLineDash([]);
  }
};

if (typeof window !== "undefined") {
  window.MenstruationSimulator = MenstruationSimulator;
}
