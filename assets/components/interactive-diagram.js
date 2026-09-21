/**
 * KOMPONEN DIAGRAM ANATOMI 3D REALISTIS & VEKTOR INTERAKTIF
 * Mendukung 2 mode tampilan:
 * 1. Mode Ilustrasi Medis 3D Realistis (Photorealistic 3D Medical Artwork)
 * 2. Mode Diagram Vektor 3D Interaktif (3D Shaded Vector Diagrams)
 */

const InteractiveDiagram = {
  activeOrganId: null,
  maleViewMode: 'vector', // 'vector' | '3d'
  femaleViewMode: 'vector', // 'vector' | '3d'

  // Path aset ilustrasi 3D realistis (relatif untuk GitHub Pages & hosting web)
  images: {
    male3D: "assets/images/male_anatomy_3d.jpg",
    female3D: "assets/images/female_anatomy_3d.jpg"
  },

  renderMaleDiagram(containerId, panelId) {
    const container = document.getElementById(containerId);
    const panel = document.getElementById(panelId);
    if (!container || !panel) return;

    const maleData = window.REPRODUCTIVE_MALE_DATA;
    if (!maleData) return;

    // Tambahkan tombol toggle mode di atas container
    container.innerHTML = `
      <div style="width: 100%; display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 0.5rem 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
          <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary);">Gaya Tampilan Diagram:</span>
          <div style="display: flex; gap: 0.35rem;">
            <button class="btn btn-sm ${this.maleViewMode === '3d' ? 'btn-primary' : 'btn-secondary'}" id="btn-toggle-male-3d" style="padding: 0.25rem 0.65rem; font-size: 0.78rem;">
              🎨 3D Realistis Medis
            </button>
            <button class="btn btn-sm ${this.maleViewMode === 'vector' ? 'btn-primary' : 'btn-secondary'}" id="btn-toggle-male-vec" style="padding: 0.25rem 0.65rem; font-size: 0.78rem;">
              📐 Diagram Vektor 3D
            </button>
          </div>
        </div>

        <div class="diagram-render-viewport" id="male-viewport" style="position: relative; width: 100%; min-height: 480px; display: flex; align-items: center; justify-content: center; background: #ffffff; border-radius: var(--radius-md); overflow: hidden; box-shadow: inset 0 0 12px rgba(0,0,0,0.03);">
          <!-- Konten dirender oleh renderMaleContent -->
        </div>
      </div>
    `;

    const viewport = container.querySelector('#male-viewport');
    this.renderMaleContent(viewport, panel, maleData);

    container.querySelector('#btn-toggle-male-3d').addEventListener('click', () => {
      this.maleViewMode = '3d';
      this.renderMaleDiagram(containerId, panelId);
    });

    container.querySelector('#btn-toggle-male-vec').addEventListener('click', () => {
      this.maleViewMode = 'vector';
      this.renderMaleDiagram(containerId, panelId);
    });
  },

  renderMaleContent(viewport, panel, maleData) {
    if (this.maleViewMode === '3d') {
      // MODE 1: ILUSTRASI MEDIS 3D REALISTIS DENGAN OVERLAY HOTSPOT INTERAKTIF
      // Koordinat persentase hotspot yang pas di atas organ ilustrasi 3D
      const maleHotspots3D = [
        { id: "penis", x: 30, y: 64, name: "Penis" },
        { id: "skrotum", x: 44, y: 84, name: "Skrotum" },
        { id: "testis", x: 42, y: 74, name: "Testis" },
        { id: "epididimis", x: 46, y: 70, name: "Epididimis" },
        { id: "vas_deferens", x: 41, y: 46, name: "Vas Deferens" },
        { id: "vesikula_seminalis", x: 60, y: 39, name: "Vesikula Seminalis" },
        { id: "kelenjar_prostat", x: 54, y: 45, name: "Kelenjar Prostat" },
        { id: "kelenjar_cowper", x: 57, y: 52, name: "Kelenjar Cowper" },
        { id: "uretra", x: 33, y: 60, name: "Uretra" }
      ];

      viewport.innerHTML = `
        <div style="position: relative; width: 100%; max-width: 540px; margin: 0 auto; user-select: none;">
          <img src="${this.images.male3D}" alt="Ilustrasi Medis 3D Anatomi Sistem Reproduksi Laki-laki" 
               style="width: 100%; height: auto; display: block; border-radius: var(--radius-md); box-shadow: 0 4px 14px rgba(0,0,0,0.08);"
               onerror="this.onerror=null; InteractiveDiagram.fallbackToVector('male');">

          <!-- Overlay Hotspot Interaktif yang Glowing -->
          ${maleHotspots3D.map((spot, idx) => `
            <button class="organ-hotspot-pin" id="pin_3d_${spot.id}" data-id="${spot.id}"
                    style="position: absolute; top: ${spot.y}%; left: ${spot.x}%; transform: translate(-50%, -50%);"
                    title="${spot.name} - Klik untuk membaca fungsi">
              <span class="hotspot-pulse"></span>
              <span class="hotspot-dot">${idx + 1}</span>
            </button>
          `).join('')}
        </div>
      `;

      // Event listeners untuk pin 3D
      maleHotspots3D.forEach(spot => {
        const pin = viewport.querySelector(`#pin_3d_${spot.id}`);
        const organObj = maleData.organs.find(o => o.id === spot.id);
        if (pin && organObj) {
          pin.addEventListener('click', () => {
            this.selectOrgan(organObj, maleData.organs, viewport, panel, false, true);
          });
        }
      });

      this.selectOrgan(maleData.organs[0], maleData.organs, viewport, panel, false, true);

    } else {
      // MODE 2: DIAGRAM VEKTOR 3D SHADED (DENGAN GRADIENT VOLUMETRIK, HIGHLIGHT & DEPTH)
      viewport.innerHTML = `
        <svg viewBox="0 0 540 500" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 520px; height: auto;" role="img" aria-label="Diagram Vektor 3D Sistem Reproduksi Laki-laki">
          <defs>
            <!-- 3D Gradients & Realistic Lighting Filters -->
            <radialGradient id="gradBladder3D" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="60%" stop-color="#f59e0b"/>
              <stop offset="100%" stop-color="#b45309"/>
            </radialGradient>
            
            <radialGradient id="gradProstate3D" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#fed7aa"/>
              <stop offset="60%" stop-color="#ea580c"/>
              <stop offset="100%" stop-color="#9a3412"/>
            </radialGradient>

            <linearGradient id="gradPenisShaft3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#bfdbfe"/>
              <stop offset="40%" stop-color="#60a5fa"/>
              <stop offset="85%" stop-color="#2563eb"/>
              <stop offset="100%" stop-color="#1e40af"/>
            </linearGradient>

            <radialGradient id="gradTestis3D" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#fce7f3"/>
              <stop offset="50%" stop-color="#f472b6"/>
              <stop offset="100%" stop-color="#be185d"/>
            </radialGradient>

            <linearGradient id="gradVas3D" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#0284c7"/>
            </linearGradient>

            <filter id="shadow3D" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
              <feOffset dx="2" dy="4" result="offsetblur"/>
              <feComponentTransfer><feFuncA type="linear" slope="0.25"/></feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <!-- Tulang Panggul & Garis Tubuh -->
          <path d="M120,70 Q270,35 420,70 Q470,230 400,410 Q340,470 260,480 Q170,470 120,410 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6,6"/>
          
          <!-- Kandung Kemih 3D Bulat Berongga -->
          <ellipse cx="305" cy="145" rx="55" ry="46" fill="url(#gradBladder3D)" filter="url(#shadow3D)"/>
          <path d="M280,120 Q310,110 335,125" stroke="rgba(255,255,255,0.6)" stroke-width="3" fill="none" stroke-linecap="round"/>
          <text x="305" y="148" font-size="12" fill="#ffffff" font-weight="700" text-anchor="middle" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))">Kandung Kemih</text>

          <!-- Kelenjar Vesikula Seminalis 3D Berlobus -->
          <g filter="url(#shadow3D)">
            <ellipse cx="365" cy="180" rx="14" ry="24" fill="#fbbf24" stroke="#d97706" stroke-width="1.5" transform="rotate(25 365 180)"/>
            <circle cx="360" cy="172" r="7" fill="#fef08a" opacity="0.7"/>
            <circle cx="370" cy="188" r="8" fill="#f59e0b" opacity="0.6"/>
          </g>

          <!-- Kelenjar Prostat 3D Memeluk Pangkal Uretra -->
          <path d="M275,190 C275,175 335,175 335,190 C345,230 265,230 275,190 Z" fill="url(#gradProstate3D)" filter="url(#shadow3D)"/>
          <path d="M285,185 Q305,180 325,185" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none"/>

          <!-- Kelenjar Cowper (Bulbouretra) 3D -->
          <circle cx="300" cy="242" r="9" fill="#10b981" stroke="#047857" stroke-width="2" filter="url(#shadow3D)"/>
          <circle cx="297" cy="239" r="3" fill="#ffffff" opacity="0.8"/>

          <!-- Skrotum 3D Bertekstur Kulit Halus -->
          <path d="M235,315 C235,425 335,425 335,315 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" filter="url(#shadow3D)"/>

          <!-- Testis 3D Lonjong Berwarna Alami -->
          <ellipse cx="285" cy="365" rx="28" ry="36" fill="url(#gradTestis3D)" stroke="#9d174d" stroke-width="2" filter="url(#shadow3D)"/>
          <path d="M272,345 Q285,335 298,345" stroke="rgba(255,255,255,0.6)" stroke-width="3" fill="none" stroke-linecap="round"/>

          <!-- Epididimis 3D Memeluk Bagian Belakang Testis -->
          <path d="M262,335 C252,375 272,402 292,400 C268,390 260,355 278,335 Z" fill="#a855f7" stroke="#7e22ce" stroke-width="2.5" filter="url(#shadow3D)"/>

          <!-- Saluran Vas Deferens Berkelok 3D -->
          <path d="M266,350 C220,300 230,150 310,95 C370,95 385,160 330,200" fill="none" stroke="url(#gradVas3D)" stroke-width="5" stroke-linecap="round" filter="url(#shadow3D)"/>

          <!-- Batang Penis 3D Silindris -->
          <path d="M275,230 L205,325 C190,345 215,365 235,350 L300,250 Z" fill="url(#gradPenisShaft3D)" filter="url(#shadow3D)"/>
          <path d="M225,300 L280,225" stroke="rgba(255,255,255,0.4)" stroke-width="6" fill="none" stroke-linecap="round"/>

          <!-- Saluran Uretra Dalam -->
          <path d="M305,230 L220,340" fill="none" stroke="#ef4444" stroke-width="3.5" stroke-dasharray="2,2" stroke-linecap="round"/>

          <!-- Pin Nomor Interaktif Vektor -->
          ${maleData.organs.map((organ, idx) => `
            <g class="organ-pin" id="pin_vec_${organ.id}" data-id="${organ.id}" tabindex="0" role="button" aria-label="${organ.name}">
              <circle class="outer-ring" cx="${organ.coords.x}" cy="${organ.coords.y}" r="17"/>
              <circle class="inner-dot" cx="${organ.coords.x}" cy="${organ.coords.y}" r="12"/>
              <text x="${organ.coords.x}" y="${organ.coords.y}">${idx + 1}</text>
            </g>
          `).join('')}
        </svg>
      `;

      maleData.organs.forEach(organ => {
        const pin = viewport.querySelector(`#pin_vec_${organ.id}`);
        if (pin) {
          pin.addEventListener('click', () => {
            this.selectOrgan(organ, maleData.organs, viewport, panel, false, false);
          });
        }
      });

      this.selectOrgan(maleData.organs[0], maleData.organs, viewport, panel, false, false);
    }
  },

  renderFemaleDiagram(containerId, panelId) {
    const container = document.getElementById(containerId);
    const panel = document.getElementById(panelId);
    if (!container || !panel) return;

    const femaleData = window.REPRODUCTIVE_FEMALE_DATA;
    if (!femaleData) return;

    container.innerHTML = `
      <div style="width: 100%; display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; padding: 0.5rem 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
          <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary);">Gaya Tampilan Diagram:</span>
          <div style="display: flex; gap: 0.35rem;">
            <button class="btn btn-sm ${this.femaleViewMode === '3d' ? 'btn-primary' : 'btn-secondary'}" id="btn-toggle-fem-3d" style="padding: 0.25rem 0.65rem; font-size: 0.78rem;">
              🎨 3D Realistis Medis
            </button>
            <button class="btn btn-sm ${this.femaleViewMode === 'vector' ? 'btn-primary' : 'btn-secondary'}" id="btn-toggle-fem-vec" style="padding: 0.25rem 0.65rem; font-size: 0.78rem;">
              📐 Diagram Vektor 3D
            </button>
          </div>
        </div>

        <div class="diagram-render-viewport" id="female-viewport" style="position: relative; width: 100%; min-height: 480px; display: flex; align-items: center; justify-content: center; background: #ffffff; border-radius: var(--radius-md); overflow: hidden; box-shadow: inset 0 0 12px rgba(0,0,0,0.03);">
          <!-- Konten dirender oleh renderFemaleContent -->
        </div>
      </div>
    `;

    const viewport = container.querySelector('#female-viewport');
    this.renderFemaleContent(viewport, panel, femaleData);

    container.querySelector('#btn-toggle-fem-3d').addEventListener('click', () => {
      this.femaleViewMode = '3d';
      this.renderFemaleDiagram(containerId, panelId);
    });

    container.querySelector('#btn-toggle-fem-vec').addEventListener('click', () => {
      this.femaleViewMode = 'vector';
      this.renderFemaleDiagram(containerId, panelId);
    });
  },

  renderFemaleContent(viewport, panel, femaleData) {
    if (this.femaleViewMode === '3d') {
      // Hotspots koordinat persentase di atas ilustrasi 3D realistis perempuan
      const femaleHotspots3D = [
        { id: "ovarium", x: 25, y: 42, name: "Ovarium" },
        { id: "fimbriae", x: 19, y: 39, name: "Fimbriae" },
        { id: "tuba_falopi", x: 23, y: 28, name: "Tuba Falopi" },
        { id: "uterus", x: 50, y: 26, name: "Uterus (Rahim)" },
        { id: "endometrium", x: 44, y: 48, name: "Endometrium" },
        { id: "serviks", x: 50, y: 64, name: "Serviks" },
        { id: "vagina", x: 50, y: 78, name: "Vagina" },
        { id: "vulva", x: 50, y: 92, name: "Pintu Masuk Vagina" }
      ];

      viewport.innerHTML = `
        <div style="position: relative; width: 100%; max-width: 540px; margin: 0 auto; user-select: none;">
          <img src="${this.images.female3D}" alt="Ilustrasi Medis 3D Anatomi Sistem Reproduksi Perempuan" 
               style="width: 100%; height: auto; display: block; border-radius: var(--radius-md); box-shadow: 0 4px 14px rgba(0,0,0,0.08);"
               onerror="this.onerror=null; InteractiveDiagram.fallbackToVector('female');">

          <!-- Overlay Hotspot Interaktif yang Glowing -->
          ${femaleHotspots3D.map((spot, idx) => `
            <button class="organ-hotspot-pin pin-female" id="pin_3d_f_${spot.id}" data-id="${spot.id}"
                    style="position: absolute; top: ${spot.y}%; left: ${spot.x}%; transform: translate(-50%, -50%);"
                    title="${spot.name} - Klik untuk membaca fungsi">
              <span class="hotspot-pulse pulse-female"></span>
              <span class="hotspot-dot dot-female">${idx + 1}</span>
            </button>
          `).join('')}
        </div>
      `;

      femaleHotspots3D.forEach(spot => {
        const pin = viewport.querySelector(`#pin_3d_f_${spot.id}`);
        const organObj = femaleData.organs.find(o => o.id === spot.id);
        if (pin && organObj) {
          pin.addEventListener('click', () => {
            this.selectOrgan(organObj, femaleData.organs, viewport, panel, true, true);
          });
        }
      });

      this.selectOrgan(femaleData.organs[0], femaleData.organs, viewport, panel, true, true);

    } else {
      // MODE 2: VEKTOR 3D PEREMPUAN
      viewport.innerHTML = `
        <svg viewBox="0 0 540 500" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 520px; height: auto;" role="img" aria-label="Diagram Vektor 3D Sistem Reproduksi Perempuan">
          <defs>
            <radialGradient id="gradOvary3DF" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="50%" stop-color="#eab308"/>
              <stop offset="100%" stop-color="#854d0e"/>
            </radialGradient>

            <linearGradient id="gradUterus3DF" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#fda4af"/>
              <stop offset="50%" stop-color="#f43f5e"/>
              <stop offset="100%" stop-color="#9f1239"/>
            </linearGradient>

            <radialGradient id="gradCavity3DF" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#ffe4e6"/>
              <stop offset="80%" stop-color="#f43f5e"/>
              <stop offset="100%" stop-color="#881337"/>
            </radialGradient>
          </defs>

          <!-- Tuba Falopi Kiri & Kanan 3D -->
          <path d="M140,190 C150,130 215,155 250,175 M400,190 C390,130 325,155 290,175" fill="none" stroke="#fb7185" stroke-width="14" stroke-linecap="round" filter="url(#shadow3D)"/>
          
          <!-- Rumbai Fimbriae 3D -->
          <path d="M135,175 Q115,190 130,205 Q118,218 138,218 M405,175 Q425,190 410,205 Q422,218 402,218" fill="none" stroke="#e11d48" stroke-width="6" stroke-linecap="round"/>

          <!-- Ovarium Kiri & Kanan 3D -->
          <ellipse cx="170" cy="225" rx="26" ry="18" fill="url(#gradOvary3DF)" stroke="#713f12" stroke-width="1.5" filter="url(#shadow3D)"/>
          <ellipse cx="370" cy="225" rx="26" ry="18" fill="url(#gradOvary3DF)" stroke="#713f12" stroke-width="1.5" filter="url(#shadow3D)"/>

          <!-- Uterus Dinding Otot 3D -->
          <path d="M210,170 C240,158 300,158 330,170 C360,225 325,305 305,325 L235,325 C215,305 180,225 210,170 Z" fill="url(#gradUterus3DF)" filter="url(#shadow3D)"/>

          <!-- Rongga Rahim (Endometrium) 3D -->
          <path d="M240,190 C250,185 290,185 300,190 C312,225 295,270 280,285 C265,270 248,225 240,190 Z" fill="url(#gradCavity3DF)"/>

          <!-- Serviks (Leher Rahim) 3D -->
          <rect x="250" y="325" width="40" height="35" rx="6" fill="#f472b6" stroke="#db2777" stroke-width="2" filter="url(#shadow3D)"/>

          <!-- Vagina 3D -->
          <path d="M245,360 L295,360 L290,435 L250,435 Z" fill="#fb923c" stroke="#ea580c" stroke-width="2" filter="url(#shadow3D)"/>

          <!-- Pins Vektor Perempuan -->
          ${femaleData.organs.map((organ, idx) => {
            let cx = 270; let cy = 250;
            if (organ.id === "ovarium") { cx = 170; cy = 225; }
            if (organ.id === "fimbriae") { cx = 135; cy = 195; }
            if (organ.id === "tuba_falopi") { cx = 210; cy = 155; }
            if (organ.id === "uterus") { cx = 270; cy = 205; }
            if (organ.id === "endometrium") { cx = 270; cy = 250; }
            if (organ.id === "serviks") { cx = 270; cy = 340; }
            if (organ.id === "vagina") { cx = 270; cy = 395; }
            if (organ.id === "vulva") { cx = 270; cy = 445; }

            return `
              <g class="organ-pin" id="pin_vec_f_${organ.id}" data-id="${organ.id}" tabindex="0" role="button" aria-label="${organ.name}">
                <circle class="outer-ring" cx="${cx}" cy="${cy}" r="17" fill="#ec4899"/>
                <circle class="inner-dot" cx="${cx}" cy="${cy}" r="12" fill="#db2777"/>
                <text x="${cx}" y="${cy}">${idx + 1}</text>
              </g>
            `;
          }).join('')}
        </svg>
      `;

      femaleData.organs.forEach(organ => {
        const pin = viewport.querySelector(`#pin_vec_f_${organ.id}`);
        if (pin) {
          pin.addEventListener('click', () => {
            this.selectOrgan(organ, femaleData.organs, viewport, panel, true, false);
          });
        }
      });

      this.selectOrgan(femaleData.organs[0], femaleData.organs, viewport, panel, true, false);
    }
  },

  selectOrgan(organ, organsList, viewport, panel, isFemale = false, is3D = false) {
    this.activeOrganId = organ.id;
    if (window.Utils) window.Utils.playClick();

    // Update active class pada pin
    if (is3D) {
      viewport.querySelectorAll('.organ-hotspot-pin').forEach(p => p.classList.remove('active'));
      const activePin = viewport.querySelector(isFemale ? `#pin_3d_f_${organ.id}` : `#pin_3d_${organ.id}`);
      if (activePin) activePin.classList.add('active');
    } else {
      viewport.querySelectorAll('.organ-pin').forEach(p => p.classList.remove('active'));
      const activePin = viewport.querySelector(isFemale ? `#pin_vec_f_${organ.id}` : `#pin_vec_${organ.id}`);
      if (activePin) activePin.classList.add('active');
    }

    // Render detail panel informasi
    panel.innerHTML = `
      <div class="animate-fade-in">
        <span class="info-badge" style="background: ${isFemale ? '#fce7f3' : 'var(--primary-light)'}; color: ${isFemale ? '#9d174d' : 'var(--primary-dark)'};">
          ${organ.category}
        </span>
        <h3 class="info-title" style="margin-top: 0.4rem;">${organ.name}</h3>
        
        <div style="background: white; border-radius: var(--radius-sm); padding: 0.85rem; margin: 0.75rem 0; border-left: 3px solid ${isFemale ? '#db2777' : 'var(--primary)'};">
          <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: ${isFemale ? '#db2777' : 'var(--primary)'};">Fungsi Utama:</div>
          <div style="font-weight: 600; color: var(--text-primary); font-size: 0.95rem; margin-top: 0.2rem;">${organ.function}</div>
        </div>

        <p class="info-desc">${organ.description}</p>

        <div class="info-facts" style="margin-top: 0.85rem;">
          <strong>💡 Fakta Menarik & Klinis:</strong>
          <span>${organ.keyFact}</span>
        </div>

        <div style="margin-top: 1.2rem; padding-top: 0.85rem; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.78rem; color: var(--text-muted);">Organ ${organsList.findIndex(o => o.id === organ.id) + 1} dari ${organsList.length}</span>
          <button class="btn btn-sm btn-primary" id="btn-next-organ" style="background: ${isFemale ? '#db2777' : 'var(--primary)'};">Organ Berikutnya →</button>
        </div>
      </div>
    `;

    const nextBtn = panel.querySelector('#btn-next-organ');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const currentIndex = organsList.findIndex(o => o.id === organ.id);
        const nextIndex = (currentIndex + 1) % organsList.length;
        this.selectOrgan(organsList[nextIndex], organsList, viewport, panel, isFemale, is3D);
      });
    }
  },

  fallbackToVector(type) {
    console.warn(`Fallback ke diagram vektor 3D untuk ${type}`);
    if (type === 'male') {
      this.maleViewMode = 'vector';
      this.renderMaleDiagram('male-diagram-svg', 'male-diagram-panel');
    } else {
      this.femaleViewMode = 'vector';
      this.renderFemaleDiagram('female-diagram-svg', 'female-diagram-panel');
    }
  }
};

if (typeof window !== "undefined") {
  window.InteractiveDiagram = InteractiveDiagram;
}
