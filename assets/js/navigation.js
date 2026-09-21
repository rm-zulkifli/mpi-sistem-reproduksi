/**
 * SISTEM NAVIGASI & ROUTING VIEW (navigation.js)
 * Mengatur pergantian view halaman, breadcrumb, tombol Prev/Next,
 * dan rendering dinamis setiap sub-materi.
 */

const Navigation = {
  currentView: "home",
  viewHistory: [],

  routes: {
    "home": { title: "Beranda", section: "Home", prev: null, next: "materi-a1" },
    
    // Bagian A
    "materi-a1": { title: "A.1 Sistem Reproduksi Laki-laki", section: "Bagian A", prev: "home", next: "materi-a2" },
    "materi-a2": { title: "A.2 Sistem Reproduksi Perempuan", section: "Bagian A", prev: "materi-a1", next: "quiz-a" },
    "quiz-a": { title: "Ayo Uji Kemampuan Bagian A", section: "Bagian A", prev: "materi-a2", next: "materi-b" },

    // Bagian B
    "materi-b": { title: "B. Siklus Menstruasi", section: "Bagian B", prev: "quiz-a", next: "quiz-b" },
    "quiz-b": { title: "Ayo Uji Kemampuan Bagian B", section: "Bagian B", prev: "materi-b", next: "materi-c1" },

    // Bagian C
    "materi-c1": { title: "C.1 Kehamilan dan Bayi", section: "Bagian C", prev: "quiz-b", next: "materi-c2" },
    "materi-c2": { title: "C.2 Anak-anak", section: "Bagian C", prev: "materi-c1", next: "materi-c3" },
    "materi-c3": { title: "C.3 Remaja dan Pubertas", section: "Bagian C", prev: "materi-c2", next: "materi-c4" },
    "materi-c4": { title: "C.4 Dewasa", section: "Bagian C", prev: "materi-c3", next: "quiz-c" },
    "quiz-c": { title: "Ayo Uji Kemampuan Bagian C", section: "Bagian C", prev: "materi-c4", next: "materi-d1" },

    // Bagian D
    "materi-d1": { title: "D.1 Kontrasepsi & Kesehatan Reproduksi", section: "Bagian D", prev: "quiz-c", next: "quiz-d" },
    "quiz-d": { title: "Ayo Uji Kemampuan Bagian D", section: "Bagian D", prev: "materi-d1", next: "reflection" },

    // Refleksi & Guru
    "reflection": { title: "Lembar Refleksi Diri", section: "Evaluasi Diri", prev: "quiz-d", next: "home" },
    "teacher-dashboard": { title: "Dashboard Rekapitulasi Guru", section: "Portal Pendidik", prev: "home", next: null }
  },

  init() {
    // Tangkap klik nav-item
    document.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const route = el.getAttribute('data-route');
        this.navigateTo(route);
      });
    });

    // Tangkap mobile sidebar toggle
    const toggleBtn = document.getElementById('btn-mobile-menu');
    const sidebar = document.querySelector('.app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (backdrop) backdrop.classList.toggle('active');
      });
    }

    if (backdrop && sidebar) {
      backdrop.addEventListener('click', () => {
        sidebar.classList.remove('open');
        backdrop.classList.remove('active');
      });
    }

    this.updateMenuLockState();
    this.navigateTo("home");

    // Jika siswa belum mengisi identitas saat pertama kali buka aplikasi, munculkan modal otomatis
    if (window.StudentAuth && !window.StudentAuth.isIdentified()) {
      setTimeout(() => {
        this.showMandatoryStudentModal();
      }, 500);
    }
  },

  navigateTo(routeId) {
    if (!this.routes[routeId]) routeId = "home";

    // FITUR PENGUNCIAN: Nonaktifkan semua menu materi & kuis jika siswa belum mengisi identitas
    if (routeId !== "home" && routeId !== "teacher-dashboard") {
      const isIdentified = window.StudentAuth && window.StudentAuth.isIdentified();
      if (!isIdentified) {
        if (window.Utils) {
          window.Utils.playWrong();
          window.Utils.showToast("🔒 Akses Terkunci! Lengkapi identitas Anda terlebih dahulu.", "warning");
        }
        this.showMandatoryStudentModal();
        this.navigateTo("home");
        return;
      }
    }

    this.currentView = routeId;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Tutup mobile sidebar jika terbuka
    const sidebar = document.querySelector('.app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');

    // Update active class di sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-route') === routeId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update Breadcrumb & Header Title
    this.updateHeaderBar(routeId);

    // Render Konten Sesuai Rute
    const mainContainer = document.getElementById('app-content-area');
    if (!mainContainer) return;

    switch (routeId) {
      case "home":
        this.renderHomeView(mainContainer);
        break;
      case "materi-a1":
        this.renderMateriA1View(mainContainer);
        if (window.ProgressTracker) window.ProgressTracker.markCompleted("A1");
        break;
      case "materi-a2":
        this.renderMateriA2View(mainContainer);
        if (window.ProgressTracker) window.ProgressTracker.markCompleted("A2");
        break;
      case "quiz-a":
        this.renderQuizView(mainContainer, "A", window.QUIZ_SECTION_A);
        break;
      case "materi-b":
        this.renderMateriBView(mainContainer);
        if (window.ProgressTracker) window.ProgressTracker.markCompleted("B");
        break;
      case "quiz-b":
        this.renderQuizView(mainContainer, "B", window.QUIZ_SECTION_B);
        break;
      case "materi-c1":
        this.renderMateriC1View(mainContainer);
        if (window.ProgressTracker) window.ProgressTracker.markCompleted("C1");
        break;
      case "materi-c2":
        this.renderMateriC2View(mainContainer);
        if (window.ProgressTracker) window.ProgressTracker.markCompleted("C2");
        break;
      case "materi-c3":
        this.renderMateriC3View(mainContainer);
        if (window.ProgressTracker) window.ProgressTracker.markCompleted("C3");
        break;
      case "materi-c4":
        this.renderMateriC4View(mainContainer);
        if (window.ProgressTracker) window.ProgressTracker.markCompleted("C4");
        break;
      case "quiz-c":
        this.renderQuizView(mainContainer, "C", window.QUIZ_SECTION_C);
        break;
      case "materi-d1":
        this.renderMateriD1View(mainContainer);
        if (window.ProgressTracker) window.ProgressTracker.markCompleted("D1");
        break;
      case "quiz-d":
        this.renderQuizView(mainContainer, "D", window.QUIZ_SECTION_D);
        break;
      case "reflection":
        this.renderReflectionView(mainContainer);
        break;
      case "teacher-dashboard":
        if (window.StudentAuth && window.StudentAuth.currentRole !== 'teacher') {
          if (window.Utils) window.Utils.showToast("Akses ditolak! Anda harus memasukkan PIN Guru terlebih dahulu.", "error");
          this.navigateTo('home');
          return;
        }
        this.renderTeacherDashboardView(mainContainer);
        break;
    }
  },

  updateHeaderBar(routeId) {
    const route = this.routes[routeId];
    const breadcrumbEl = document.getElementById('breadcrumb-nav');
    if (breadcrumbEl) {
      if (routeId === "home") {
        breadcrumbEl.innerHTML = `<span>Beranda</span>`;
      } else {
        breadcrumbEl.innerHTML = `
          <a href="#" data-route="home">Beranda</a>
          <span class="separator">/</span>
          <span>${route.section}</span>
          <span class="separator">/</span>
          <span style="color: var(--text-primary); font-weight: 600;">${route.title}</span>
        `;
        // Pasang klik listener ke link breadcrumb
        breadcrumbEl.querySelector('a').addEventListener('click', (e) => {
          e.preventDefault();
          this.navigateTo('home');
        });
      }
    }
  },

  // VIEW 1: HOME / BERANDA
  renderHomeView(container) {
    const isIdentified = window.StudentAuth && window.StudentAuth.isIdentified();
    const user = window.StudentAuth ? window.StudentAuth.currentUser : null;
    const userName = isIdentified ? user.name : "Belum Mengisi Identitas";
    const userClass = isIdentified ? user.classCode : "-";

    container.innerHTML = `
      <div class="animate-fade-in">
        <!-- Hero Banner Edukatif -->
        <div class="hero-banner">
          <div class="hero-content">
            <span class="hero-tag">🔬 MEDIA PEMBELAJARAN INTERAKTIF • SMP/MTs FASE D</span>
            <h1 class="hero-title">Sistem Reproduksi Manusia</h1>
            <p class="hero-subtitle">
              Pelajari anatomi tubuh manusia, pembentukan sel kelamin, siklus menstruasi, 
              tahapan pubertas dan siklus hidup, serta kesehatan reproduksi secara santun, ilmiah, dan interaktif.
            </p>
            <div class="hero-cta-group">
              <button class="btn ${isIdentified ? 'btn-hero' : 'btn-accent'}" id="btn-start-learning">
                ${isIdentified ? '🚀 Mulai Pembelajaran (Bagian A)' : '🔒 Lengkapi Identitas untuk Membuka'}
              </button>
              <button class="btn btn-outline-white" id="btn-open-guide">
                📖 Panduan Belajar Siswa
              </button>
            </div>
          </div>
          <div style="font-size: 7rem; opacity: 0.9; text-shadow: 0 4px 12px rgba(0,0,0,0.2);">🧬</div>
        </div>

        ${!isIdentified ? `
          <!-- BANNER PERINGATAN: AKSES TERKUNCI -->
          <div class="card animate-fade-in" style="background: #fffbeb; border: 2px dashed #f59e0b; padding: 1.25rem 1.5rem; margin-bottom: 1.75rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; border-radius: var(--radius-lg);">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div style="font-size: 2.5rem;">🔒</div>
              <div>
                <h4 style="font-weight: 800; color: #b45309; font-size: 1.15rem; margin-bottom: 0.25rem;">
                  Semua Modul Pembelajaran & Kuis Sedang Terkunci
                </h4>
                <p style="font-size: 0.88rem; color: #92400e; line-height: 1.5;">
                  Anda wajib melengkapi identitas diri (Nama Lengkap & Kelas) terlebih dahulu agar seluruh materi, diagram anatomi 3D, simulator, dan kuis dapat diakses.
                </p>
              </div>
            </div>
            <button class="btn btn-hero btn-sm" id="btn-home-unlock-identity" style="padding: 0.7rem 1.3rem;">
              📝 Lengkapi Identitas Sekarang ▶
            </button>
          </div>
        ` : ''}

        <!-- Progress Card Siswa -->
        <div class="progress-container">
          <div class="progress-info">
            <span>Progres Belajar: <strong id="home-user-name" style="color: ${isIdentified ? 'var(--primary-dark)' : 'var(--danger)'};">${userName} (${userClass})</strong></span>
            <span id="main-progress-text">${isIdentified ? '0% Selesai' : '🔒 Terkunci'}</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" id="main-progress-fill" style="width: 0%;"></div>
          </div>
        </div>

        <!-- 4 Kotak Bagian Materi Utama (Sesuai Daftar Isi) -->
        <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary);">Daftar Modul Pembelajaran</h2>
          <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
            ${isIdentified ? '🟢 Modul Terbuka' : '🔴 4 Modul Terkunci'}
          </span>
        </div>

        <div class="modules-grid">
          <!-- Modul A -->
          <div class="module-card ${!isIdentified ? 'locked' : ''}" data-route="materi-a1">
            <div class="module-header">
              <div class="module-code">A</div>
              <span class="module-status ${isIdentified ? 'status-pending' : ''}" id="status-module-a" style="${!isIdentified ? 'background:#fee2e2; color:#991b1b;' : ''}">
                ${isIdentified ? 'Belum Selesai' : '🔒 Terkunci'}
              </span>
            </div>
            <h3 class="module-title">Sistem Reproduksi Laki-laki & Perempuan</h3>
            <p class="module-description">Mempelajari struktur organ luar & dalam, spermatogenesis, oogenesis, dan ovulasi dengan diagram anatomi 3D interaktif.</p>
            <ul class="module-subitems">
              <li>A.1 Sistem Reproduksi Laki-laki</li>
              <li>A.2 Sistem Reproduksi Perempuan</li>
              <li>A.3 Ayo Uji Kemampuan Bagian A</li>
            </ul>
            <div class="module-footer">
              <span>${isIdentified ? 'Buka Modul A' : '🔒 Lengkapi Identitas'}</span>
              <span>${isIdentified ? '→' : '🔒'}</span>
            </div>
          </div>

          <!-- Modul B -->
          <div class="module-card ${!isIdentified ? 'locked' : ''}" data-route="materi-b">
            <div class="module-header">
              <div class="module-code" style="background: #fce7f3; color: #db2777;">B</div>
              <span class="module-status ${isIdentified ? 'status-pending' : ''}" id="status-module-b" style="${!isIdentified ? 'background:#fee2e2; color:#991b1b;' : ''}">
                ${isIdentified ? 'Belum Selesai' : '🔒 Terkunci'}
              </span>
            </div>
            <h3 class="module-title">Siklus Menstruasi</h3>
            <p class="module-description">Eksplorasi 4 fase siklus haid, dinamika 4 hormon (FSH, LH, Estrogen, Progesteron), simulator 28 hari, serta manajemen kebersihan diri.</p>
            <ul class="module-subitems">
              <li>Simulator Dinamis 28 Hari</li>
              <li>Variasi Siklus & Kebersihan Remaja</li>
              <li>Ayo Uji Kemampuan Bagian B</li>
            </ul>
            <div class="module-footer" style="color: #db2777;">
              <span>${isIdentified ? 'Buka Modul B' : '🔒 Lengkapi Identitas'}</span>
              <span>${isIdentified ? '→' : '🔒'}</span>
            </div>
          </div>

          <!-- Modul C -->
          <div class="module-card ${!isIdentified ? 'locked' : ''}" data-route="materi-c1">
            <div class="module-header">
              <div class="module-code" style="background: #ecfdf5; color: #059669;">C</div>
              <span class="module-status ${isIdentified ? 'status-pending' : ''}" id="status-module-c" style="${!isIdentified ? 'background:#fee2e2; color:#991b1b;' : ''}">
                ${isIdentified ? 'Belum Selesai' : '🔒 Terkunci'}
              </span>
            </div>
            <h3 class="module-title">Siklus Hidup Manusia</h3>
            <p class="module-description">Menelusuri tahap fertilisasi, janin di rahim, masa anak-anak, tanda pubertas remaja, privasi tubuh, mitos fakta, hingga dewasa.</p>
            <ul class="module-subitems">
              <li>C.1 Kehamilan & Bayi • C.2 Anak-anak</li>
              <li>C.3 Remaja & Pubertas • C.4 Dewasa</li>
              <li>C.5 Ayo Uji Kemampuan Bagian C</li>
            </ul>
            <div class="module-footer" style="color: #059669;">
              <span>${isIdentified ? 'Buka Modul C' : '🔒 Lengkapi Identitas'}</span>
              <span>${isIdentified ? '→' : '🔒'}</span>
            </div>
          </div>

          <!-- Modul D -->
          <div class="module-card ${!isIdentified ? 'locked' : ''}" data-route="materi-d1">
            <div class="module-header">
              <div class="module-code" style="background: #fef3c7; color: #d97706;">D</div>
              <span class="module-status ${isIdentified ? 'status-pending' : ''}" id="status-module-d" style="${!isIdentified ? 'background:#fee2e2; color:#991b1b;' : ''}">
                ${isIdentified ? 'Belum Selesai' : '🔒 Terkunci'}
              </span>
            </div>
            <h3 class="module-title">Keluarga Berencana & Kesehatan</h3>
            <p class="module-description">Memahami konsep perencanaan keluarga, prinsip kerja kontrasepsi, pencegahan IMS/HIV, serta pola hidup higienis remaja.</p>
            <ul class="module-subitems">
              <li>D.1 Kontrasepsi & Kesehatan Reproduksi</li>
              <li>Pencegahan Infeksi Menular Seksual</li>
              <li>Ayo Uji Kemampuan Bagian D</li>
            </ul>
            <div class="module-footer" style="color: #d97706;">
              <span>${isIdentified ? 'Buka Modul D' : '🔒 Lengkapi Identitas'}</span>
              <span>${isIdentified ? '→' : '🔒'}</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Pasang listeners di card modul
    container.querySelectorAll('.module-card').forEach(card => {
      card.addEventListener('click', () => {
        if (!isIdentified) {
          if (window.Utils) {
            window.Utils.playWrong();
            window.Utils.showToast("🔒 Modul terkunci! Silakan isi identitas Anda terlebih dahulu.", "warning");
          }
          this.showMandatoryStudentModal();
          return;
        }
        const route = card.getAttribute('data-route');
        this.navigateTo(route);
      });
    });

    container.querySelector('#btn-start-learning').addEventListener('click', () => {
      if (!isIdentified) {
        this.showMandatoryStudentModal();
      } else {
        this.navigateTo('materi-a1');
      }
    });

    const unlockBtn = container.querySelector('#btn-home-unlock-identity');
    if (unlockBtn) {
      unlockBtn.addEventListener('click', () => {
        this.showMandatoryStudentModal();
      });
    }

    container.querySelector('#btn-open-guide').addEventListener('click', () => {
      this.showGuideModal();
    });

    if (window.ProgressTracker) window.ProgressTracker.updateProgressBarUI();
  },

  updateMenuLockState() {
    const isIdentified = window.StudentAuth && window.StudentAuth.isIdentified();
    const navItems = document.querySelectorAll('.app-sidebar .nav-item[data-route]');
    
    navItems.forEach(item => {
      const route = item.getAttribute('data-route');
      if (route !== 'home' && route !== 'teacher-dashboard') {
        if (!isIdentified) {
          item.classList.add('locked');
          item.setAttribute('title', '🔒 Terkunci - Harap lengkapi identitas siswa terlebih dahulu');
        } else {
          item.classList.remove('locked');
          item.removeAttribute('title');
        }
      }
    });

    if (this.currentView === 'home') {
      const mainContainer = document.getElementById('app-content-area');
      if (mainContainer) this.renderHomeView(mainContainer);
    }
  },

  showMandatoryStudentModal() {
    const userModal = document.getElementById('student-modal-overlay');
    if (!userModal) return;

    if (window.ClassManager) {
      window.ClassManager.populateAllSelects();
    }

    const cur = window.StudentAuth ? window.StudentAuth.currentUser : null;
    if (cur && cur.name !== "Belum Mengisi Identitas") {
      const nameInput = document.getElementById('input-student-name');
      const nisnInput = document.getElementById('input-student-nisn');
      const classInput = document.getElementById('input-student-class');
      const schoolInput = document.getElementById('input-student-school');

      if (nameInput) nameInput.value = cur.name || '';
      if (nisnInput) nisnInput.value = cur.nisn || '';
      if (classInput) classInput.value = cur.classCode || '';
      if (schoolInput) schoolInput.value = cur.school || 'SMP';
    }

    userModal.classList.add('active');
  },

  // VIEW: MATERI A.1 (SISTEM REPRODUKSI LAKI-LAKI)
  renderMateriA1View(container) {
    const data = window.REPRODUCTIVE_MALE_DATA;
    container.innerHTML = `
      <div class="animate-fade-in">
        <div class="card">
          <div class="card-title">🔬 ${data.title}</div>
          <p class="card-desc">${data.overview}</p>
        </div>

        <div style="margin: 1.5rem 0;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
            📌 Diagram Interaktif: Klik Pin Organ untuk Mengetahui Fungsinya
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">
            Arahkan kursor atau sentuh lingkaran nomor pada diagram untuk menampilkan fungsi dan fakta biologis organ tersebut di panel sebelah kanan.
          </p>

          <div class="diagram-container">
            <div class="diagram-svg-box" id="male-diagram-svg"></div>
            <div class="diagram-info-panel" id="male-diagram-panel"></div>
          </div>
        </div>

        <!-- Bagan Spermatogenesis Sederhana -->
        <div class="card" style="border-left: 4px solid var(--primary);">
          <div class="card-title">🧬 ${data.spermatogenesis.title}</div>
          <p class="card-desc" style="margin-bottom: 1rem;">${data.spermatogenesis.intro}</p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
            ${data.spermatogenesis.stages.map(s => `
              <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                  <span style="font-size: 0.75rem; font-weight: 700; color: var(--primary);">${s.type}</span>
                  <span style="width: 22px; height: 22px; border-radius: 50%; background: var(--primary-light); color: var(--primary-dark); font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center;">${s.order}</span>
                </div>
                <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem;">${s.name}</h4>
                <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">${s.desc}</p>
              </div>
            `).join('')}
          </div>

          <div style="background: #eff6ff; padding: 0.85rem 1.25rem; border-radius: var(--radius-md); font-size: 0.88rem; color: var(--primary-dark); font-weight: 600;">
            📍 Alur Ringkas: ${data.spermatogenesis.flowSummary}
          </div>
        </div>

        <!-- Aktivitas Mini 1: Susun Alur Sperma -->
        <div id="sperm-flow-activity-box"></div>

        <!-- Flashcards A.1 -->
        <div id="male-flashcards-box"></div>

        <!-- Tombol Navigasi Bawah -->
        <div class="quiz-nav-footer" style="margin-top: 2rem;">
          <button class="btn btn-secondary" data-route="home">◀ Kembali ke Beranda</button>
          <button class="btn btn-primary" data-route="materi-a2">Lanjut ke A.2 Sistem Reproduksi Perempuan ▶</button>
        </div>
      </div>
    `;

    // Render diagram
    if (window.InteractiveDiagram) {
      window.InteractiveDiagram.renderMaleDiagram('male-diagram-svg', 'male-diagram-panel');
    }

    // Render aktivitas alur sperma
    if (window.InteractiveActivities) {
      window.InteractiveActivities.initSpermFlowActivity('sperm-flow-activity-box');
      window.InteractiveActivities.initFlashcards('male-flashcards-box', data.flashcards);
    }

    this.bindRouteButtons(container);
  },

  // VIEW: MATERI A.2 (SISTEM REPRODUKSI PEREMPUAN)
  renderMateriA2View(container) {
    const data = window.REPRODUCTIVE_FEMALE_DATA;
    container.innerHTML = `
      <div class="animate-fade-in">
        <div class="card">
          <div class="card-title">🔬 ${data.title}</div>
          <p class="card-desc">${data.overview}</p>
        </div>

        <div style="margin: 1.5rem 0;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
            📌 Diagram Interaktif: Klik Pin Organ untuk Mengetahui Fungsinya
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">
            Sentuh atau klik nomor pada diagram rahim dan ovarium untuk mempelajari fungsi biologisnya.
          </p>

          <div class="diagram-container">
            <div class="diagram-svg-box" id="female-diagram-svg"></div>
            <div class="diagram-info-panel" id="female-diagram-panel"></div>
          </div>
        </div>

        <!-- Oogenesis -->
        <div class="card" style="border-left: 4px solid #db2777;">
          <div class="card-title">🧬 ${data.oogenesis.title}</div>
          <p class="card-desc" style="margin-bottom: 1rem;">${data.oogenesis.intro}</p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
            ${data.oogenesis.stages.map(s => `
              <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem;">
                  <span style="font-size: 0.75rem; font-weight: 700; color: #db2777;">${s.type}</span>
                  <span style="width: 22px; height: 22px; border-radius: 50%; background: #fce7f3; color: #9d174d; font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center;">${s.order}</span>
                </div>
                <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem;">${s.name}</h4>
                <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">${s.desc}</p>
              </div>
            `).join('')}
          </div>

          <div style="background: #fdf2f8; padding: 0.85rem 1.25rem; border-radius: var(--radius-md); font-size: 0.88rem; color: #9d174d; font-weight: 600;">
            📍 Alur Sel Telur: ${data.oogenesis.flowSummary}
          </div>
        </div>

        <!-- Flashcards A.2 -->
        <div id="female-flashcards-box"></div>

        <!-- Tombol Navigasi Bawah -->
        <div class="quiz-nav-footer" style="margin-top: 2rem;">
          <button class="btn btn-secondary" data-route="materi-a1">◀ Sebelumnya: Organ Laki-laki</button>
          <button class="btn btn-hero" data-route="quiz-a">🎯 Ayo Uji Kemampuan Bagian A (10 Soal) ▶</button>
        </div>
      </div>
    `;

    if (window.InteractiveDiagram) {
      window.InteractiveDiagram.renderFemaleDiagram('female-diagram-svg', 'female-diagram-panel');
    }

    if (window.InteractiveActivities) {
      window.InteractiveActivities.initFlashcards('female-flashcards-box', data.flashcards);
    }

    this.bindRouteButtons(container);
  },

  // VIEW: MATERI B (SIKLUS MENSTRUASI)
  renderMateriBView(container) {
    const data = window.MENSTRUATION_DATA;
    container.innerHTML = `
      <div class="animate-fade-in">
        <div class="card">
          <div class="card-title">🩸 ${data.title}</div>
          <p class="card-desc">${data.overview}</p>
          <div style="background: #eff6ff; border-left: 3px solid var(--primary); padding: 0.85rem; border-radius: var(--radius-sm); margin-top: 0.75rem; font-size: 0.88rem; color: var(--primary-dark);">
            ${data.scientificNote}
          </div>
        </div>

        <!-- Simulator Siklus 28 Hari -->
        <div style="margin: 1.5rem 0;">
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.35rem;">
            🎮 Simulator Dinamis Siklus Menstruasi 28 Hari
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1rem;">
            Geser slider hari atau klik tombol fase untuk mengamati perubahan grafik kadar 4 hormon utama dan penebalan dinding rahim (endometrium).
          </p>

          <div id="menstruation-simulator-box"></div>
        </div>

        <!-- Rincian 4 Fase -->
        <div style="margin: 2rem 0;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem;">
            📋 Karakteristik 4 Fase Siklus Menstruasi
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
            ${data.phases.map(p => `
              <div class="card" style="margin-bottom: 0; border-top: 4px solid ${p.color};">
                <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">${p.name}</h4>
                <span class="info-badge" style="background: #f1f5f9; color: var(--text-secondary); margin-bottom: 0.75rem;">Rentang: ${p.dayRange}</span>
                <div style="font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem; line-height: 1.5;">
                  <div><strong>Kondisi Hormon:</strong> ${p.hormoneState}</div>
                  <div><strong>Peristiwa Ovarium:</strong> ${p.ovaryEvent}</div>
                  <div><strong>Dinding Rahim:</strong> ${p.uterusEvent}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Edukasi Kebersihan Menstruasi (MHM) -->
        <div class="card" style="border-left: 4px solid var(--success);">
          <div class="card-title">🧼 Manajemen Kebersihan & Kesehatan Menstruasi</div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 1rem;">
            ${data.hygieneGuide.map(h => `
              <div style="background: #f8fafc; padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin-bottom: 0.35rem;">✓ ${h.title}</div>
                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">${h.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Flashcards B -->
        <div id="menstruation-flashcards-box"></div>

        <!-- Tombol Navigasi Bawah -->
        <div class="quiz-nav-footer" style="margin-top: 2rem;">
          <button class="btn btn-secondary" data-route="quiz-a">◀ Latihan Soal Bagian A</button>
          <button class="btn btn-hero" data-route="quiz-b">🎯 Ayo Uji Kemampuan Bagian B (10 Soal) ▶</button>
        </div>
      </div>
    `;

    if (window.MenstruationSimulator) {
      window.MenstruationSimulator.init('menstruation-simulator-box');
    }

    if (window.InteractiveActivities) {
      window.InteractiveActivities.initFlashcards('menstruation-flashcards-box', data.flashcards);
    }

    this.bindRouteButtons(container);
  },

  // VIEW: MATERI C.1 (KEHAMILAN DAN BAYI)
  renderMateriC1View(container) {
    const data = window.LIFE_CYCLE_DATA;
    const sub = data.subsections[0];
    container.innerHTML = `
      <div class="animate-fade-in">
        <div class="card">
          <div class="card-title">👶 ${sub.title} (${sub.code})</div>
          <p class="card-desc">${sub.summary}</p>
        </div>

        <div class="card" style="border-left: 4px solid var(--primary);">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--primary-dark); margin-bottom: 0.5rem;">Fertilisasi & Penanaman (Implantasi)</h3>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.75rem;">${sub.content.fertilization}</p>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">${sub.content.cleavage} ${sub.content.implantation}</p>
        </div>

        <div style="margin: 1.5rem 0;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem;">
            🗓️ Tahapan Tumbuh Kembang Janin (3 Trimester)
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${sub.content.fetalStages.map((st, idx) => `
              <div style="display: flex; gap: 1rem; background: white; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary-light); color: var(--primary-dark); display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0;">${idx + 1}</div>
                <div>
                  <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">${st.stage}</h4>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${st.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card" style="background: #fdf2f8; border: 1px solid #fbcfe8;">
          <h4 style="color: #9d174d; font-weight: 700; margin-bottom: 0.4rem;">❤️ Peran Vital Plasenta & Perawatan Ibu Hamil</h4>
          <p style="font-size: 0.9rem; color: #831843; line-height: 1.6; margin-bottom: 0.5rem;">${sub.content.placentaRole}</p>
          <p style="font-size: 0.9rem; color: #831843; line-height: 1.6;">${sub.content.maternalCare}</p>
        </div>

        <div class="quiz-nav-footer" style="margin-top: 2rem;">
          <button class="btn btn-secondary" data-route="quiz-b">◀ Latihan Soal Bagian B</button>
          <button class="btn btn-primary" data-route="materi-c2">Lanjut ke C.2 Anak-anak ▶</button>
        </div>
      </div>
    `;
    this.bindRouteButtons(container);
  },

  // VIEW: MATERI C.2 (ANAK-ANAK)
  renderMateriC2View(container) {
    const data = window.LIFE_CYCLE_DATA;
    const sub = data.subsections[1];
    container.innerHTML = `
      <div class="animate-fade-in">
        <div class="card">
          <div class="card-title">🧒 ${sub.title} (${sub.code})</div>
          <p class="card-desc">${sub.summary}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
          ${sub.content.features.map(f => `
            <div class="card" style="margin-bottom: 0;">
              <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--primary-dark); margin-bottom: 0.4rem;">${f.area}</h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${f.desc}</p>
            </div>
          `).join('')}
        </div>

        <div class="card" style="background: #f0fdf4; border-left: 4px solid var(--success);">
          <h4 style="color: var(--success-dark); font-weight: 700; margin-bottom: 0.35rem;">🥗 Kebutuhan Kesehatan Masa Kanak-Kanak</h4>
          <p style="font-size: 0.92rem; color: #064e3b; line-height: 1.6;">${sub.content.healthNeeds}</p>
        </div>

        <div class="quiz-nav-footer" style="margin-top: 2rem;">
          <button class="btn btn-secondary" data-route="materi-c1">◀ Sebelumnya: C.1 Kehamilan & Bayi</button>
          <button class="btn btn-primary" data-route="materi-c3">Lanjut ke C.3 Remaja dan Pubertas ▶</button>
        </div>
      </div>
    `;
    this.bindRouteButtons(container);
  },

  // VIEW: MATERI C.3 (REMAJA DAN PUBERTAS)
  renderMateriC3View(container) {
    const data = window.LIFE_CYCLE_DATA;
    const sub = data.subsections[2];
    container.innerHTML = `
      <div class="animate-fade-in">
        <div class="card">
          <div class="card-title">🧑‍🎓 ${sub.title} (${sub.code})</div>
          <p class="card-desc">${sub.summary}</p>
          <div style="background: #eff6ff; border-left: 3px solid var(--primary); padding: 0.75rem; border-radius: var(--radius-sm); margin-top: 0.75rem; font-size: 0.88rem; color: var(--primary-dark);">
            ${sub.content.variations}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;" class="diagram-container">
          <div class="card" style="margin-bottom: 0; border-top: 4px solid #2563eb;">
            <h4 style="font-size: 1.15rem; font-weight: 800; color: #1e40af; margin-bottom: 0.5rem;">Perubahan pada Laki-laki</h4>
            <div style="background: #eff6ff; padding: 0.6rem 0.85rem; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 700; color: #1e3a8a; margin-bottom: 0.75rem;">
              Ciri Primer: ${sub.content.maleChanges.primary}
            </div>
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.35rem;">CIRI SEKUNDER:</div>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.88rem; color: var(--text-secondary);">
              ${sub.content.maleChanges.secondary.map(item => `<li>✓ ${item}</li>`).join('')}
            </ul>
          </div>

          <div class="card" style="margin-bottom: 0; border-top: 4px solid #db2777;">
            <h4 style="font-size: 1.15rem; font-weight: 800; color: #9d174d; margin-bottom: 0.5rem;">Perubahan pada Perempuan</h4>
            <div style="background: #fdf2f8; padding: 0.6rem 0.85rem; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 700; color: #831843; margin-bottom: 0.75rem;">
              Ciri Primer: ${sub.content.femaleChanges.primary}
            </div>
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.35rem;">CIRI SEKUNDER:</div>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.88rem; color: var(--text-secondary);">
              ${sub.content.femaleChanges.secondary.map(item => `<li>✓ ${item}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Privasi Tubuh & Batasan Diri -->
        <div class="card" style="border-left: 4px solid var(--accent); background: #fffbeb;">
          <h4 style="color: var(--accent-dark); font-weight: 800; font-size: 1.1rem; margin-bottom: 0.4rem;">🛡️ Batasan Tubuh & Hak Privasi Remaja (Body Boundary)</h4>
          <p style="font-size: 0.92rem; color: #92400e; line-height: 1.6;">${sub.content.bodySafety}</p>
        </div>

        <!-- Mitos vs Fakta -->
        <div style="margin: 1.5rem 0;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem;">
            🤔 Mitos vs Fakta Seputar Pubertas
          </h3>
          <div style="display: flex; flex-direction: column; gap: 0.85rem;">
            ${sub.content.mythsAndFacts.map(mf => `
              <div style="background: white; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
                <div style="color: #dc2626; font-weight: 700; font-size: 0.92rem; margin-bottom: 0.25rem;">❌ Mitos: "${mf.myth}"</div>
                <div style="color: #059669; font-weight: 600; font-size: 0.92rem;">✓ Fakta Ilmiah: ${mf.fact}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Detektif Studi Kasus Remaja -->
        <div id="c3-case-study-box"></div>

        <div class="quiz-nav-footer" style="margin-top: 2rem;">
          <button class="btn btn-secondary" data-route="materi-c2">◀ Sebelumnya: C.2 Anak-anak</button>
          <button class="btn btn-primary" data-route="materi-c4">Lanjut ke C.4 Dewasa ▶</button>
        </div>
      </div>
    `;

    if (window.InteractiveActivities) {
      window.InteractiveActivities.initCaseStudyActivity('c3-case-study-box');
    }

    this.bindRouteButtons(container);
  },

  // VIEW: MATERI C.4 (DEWASA)
  renderMateriC4View(container) {
    const data = window.LIFE_CYCLE_DATA;
    const sub = data.subsections[3];
    container.innerHTML = `
      <div class="animate-fade-in">
        <div class="card">
          <div class="card-title">👨‍💼 ${sub.title} (${sub.code})</div>
          <p class="card-desc">${sub.summary}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
          <div class="card" style="margin-bottom: 0;">
            <h4 style="font-weight: 700; color: var(--primary); margin-bottom: 0.4rem;">Kematangan Fisik & Emosi</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${sub.content.maturity}</p>
          </div>
          <div class="card" style="margin-bottom: 0;">
            <h4 style="font-weight: 700; color: var(--success); margin-bottom: 0.4rem;">Tanggung Jawab Kesehatan</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${sub.content.healthResponsibilities}</p>
          </div>
          <div class="card" style="margin-bottom: 0;">
            <h4 style="font-weight: 700; color: var(--accent-dark); margin-bottom: 0.4rem;">Pengaruh Gaya Hidup</h4>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${sub.content.lifestyleImpact}</p>
          </div>
        </div>

        <!-- Flashcards C -->
        <div id="c-flashcards-box"></div>

        <div class="quiz-nav-footer" style="margin-top: 2rem;">
          <button class="btn btn-secondary" data-route="materi-c3">◀ Sebelumnya: C.3 Remaja</button>
          <button class="btn btn-hero" data-route="quiz-c">🎯 Ayo Uji Kemampuan Bagian C (15 Soal) ▶</button>
        </div>
      </div>
    `;

    if (window.InteractiveActivities) {
      window.InteractiveActivities.initFlashcards('c-flashcards-box', data.flashcards);
    }

    this.bindRouteButtons(container);
  },

  // VIEW: MATERI D.1 (KELUARGA BERENCANA)
  renderMateriD1View(container) {
    const data = window.FAMILY_PLANNING_DATA;
    container.innerHTML = `
      <div class="animate-fade-in">
        <div class="card">
          <div class="card-title">👨‍👩‍👧 ${data.title}</div>
          <p class="card-desc">${data.overview}</p>
        </div>

        <div style="margin: 1.5rem 0; display: flex; flex-direction: column; gap: 1rem;">
          <div class="card" style="margin-bottom: 0; border-left: 4px solid var(--primary);">
            <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--primary-dark); margin-bottom: 0.35rem;">1. ${data.principles[0].title}</h4>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">${data.principles[0].desc}</p>
          </div>

          <div class="card" style="margin-bottom: 0; border-left: 4px solid var(--accent);">
            <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--accent-dark); margin-bottom: 0.35rem;">2. ${data.principles[1].title}</h4>
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">${data.principles[1].desc}</p>
          </div>
        </div>

        <!-- Metode Kontrasepsi Table Cards -->
        <div style="margin: 2rem 0;">
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">
            🛡️ 4 Kelompok Metode Kontrasepsi Secara Ilmiah
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
            ${data.principles[2].methods.map(m => `
              <div class="card" style="margin-bottom: 0; background: #f8fafc;">
                <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--primary-dark); margin-bottom: 0.5rem;">${m.name}</h4>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.6rem;">
                  <strong>Prinsip Kerja:</strong> ${m.principle}
                </div>
                <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.6rem;">
                  <strong>Contoh:</strong> ${m.examples}
                </div>
                <div style="font-size: 0.8rem; background: white; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); color: var(--text-muted);">
                  💡 ${m.prosCons}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Pencegahan IMS -->
        <div class="card" style="border-left: 4px solid var(--danger); background: #fef2f2;">
          <h4 style="color: #991b1b; font-weight: 800; font-size: 1.1rem; margin-bottom: 0.4rem;">🛑 Pencegahan Infeksi Menular Seksual (IMS) & HIV</h4>
          <p style="font-size: 0.92rem; color: #7f1d1d; line-height: 1.6;">${data.principles[4].desc}</p>
        </div>

        <!-- Flashcards D -->
        <div id="d-flashcards-box"></div>

        <div class="quiz-nav-footer" style="margin-top: 2rem;">
          <button class="btn btn-secondary" data-route="quiz-c">◀ Latihan Soal Bagian C</button>
          <button class="btn btn-hero" data-route="quiz-d">🎯 Ayo Uji Kemampuan Bagian D (10 Soal) ▶</button>
        </div>
      </div>
    `;

    if (window.InteractiveActivities) {
      window.InteractiveActivities.initFlashcards('d-flashcards-box', data.flashcards);
    }

    this.bindRouteButtons(container);
  },

  // VIEW: QUIZ RUNNER (A, B, C, D)
  renderQuizView(container, sectionCode, questionsList) {
    container.innerHTML = `<div id="quiz-runner-mount"></div>`;
    if (window.QuizEngine) {
      window.QuizEngine.startQuiz('quiz-runner-mount', sectionCode, questionsList);
    }
  },

  // VIEW: REFLECTION (LEMBAR REFLEKSI DIRI 3-2-1)
  renderReflectionView(container) {
    const user = window.StudentAuth ? window.StudentAuth.currentUser : null;
    const historyRef = Utils.storage.get('student_reflections', []);

    container.innerHTML = `
      <div class="animate-fade-in" style="max-width: 760px; margin: 0 auto;">
        <div class="card" style="border-left: 4px solid var(--primary);">
          <div class="card-title">📝 Lembar Refleksi Pembelajaran Siswa (Metode 3-2-1)</div>
          <p class="card-desc">
            Refleksi membantu Anda mengendapkan pengetahuan dan menyadari apa saja perkembangan belajar Anda selama mempelajari modul Sistem Reproduksi Manusia.
          </p>
        </div>

        <div class="card">
          <form id="form-reflection">
            <div class="form-group">
              <label class="form-label">1. Sebutkan 3 hal baru dan penting yang Anda pelajari dari materi ini:</label>
              <textarea class="form-textarea" id="ref-point-3" rows="3" placeholder="Contoh: Mengetahui fungsi ovarium menghasilkan ovum, memahami 4 fase siklus haid, dan pentingnya menjaga privasi tubuh..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">2. Sebutkan 2 hal yang menurut Anda paling menarik atau mengejutkan:</label>
              <textarea class="form-textarea" id="ref-point-2" rows="3" placeholder="Contoh: Simulator siklus menstruasi 28 hari dan ternyata waktu pubertas tiap remaja bisa berbeda wajar..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">3. Sebutkan 1 pertanyaan atau hal yang masih ingin Anda pelajari lebih dalam:</label>
              <textarea class="form-textarea" id="ref-point-1" rows="2" placeholder="Tuliskan pertanyaan atau topik yang ingin Anda diskusikan dengan bapak/ibu guru di kelas..." required></textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
              <button type="submit" class="btn btn-primary" id="btn-submit-ref">Simpan & Kirim Refleksi ✓</button>
            </div>
          </form>
        </div>

        ${historyRef.length > 0 ? `
          <div class="card">
            <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem;">Riwayat Pengisian Refleksi Anda:</h4>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${historyRef.map(r => `
                <div style="background: #f8fafc; padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-size: 0.88rem;">
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem;">Dikirim pada: ${Utils.formatDate(r.submittedAt)}</div>
                  <div style="white-space: pre-wrap; color: var(--text-primary);">${r.response}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="quiz-nav-footer" style="margin-top: 2rem;">
          <button class="btn btn-secondary" data-route="home">Kembali ke Beranda</button>
        </div>
      </div>
    `;

    const form = container.querySelector('#form-reflection');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const p3 = document.getElementById('ref-point-3').value.trim();
      const p2 = document.getElementById('ref-point-2').value.trim();
      const p1 = document.getElementById('ref-point-1').value.trim();

      const combined = `[3 Hal Baru]: ${p3}\n\n[2 Hal Menarik]: ${p2}\n\n[1 Hal Ingin Dipelajari]: ${p1}`;

      if (window.ApiClient) {
        window.ApiClient.saveReflection("Refleksi Akhir 3-2-1", combined);
      }
      if (window.ProgressTracker) {
        window.ProgressTracker.markCompleted("REF");
      }
      if (window.Utils) {
        window.Utils.playComplete();
        window.Utils.showToast("Refleksi berhasil disimpan!");
      }
      this.renderReflectionView(container);
    });

    this.bindRouteButtons(container);
  },

  // VIEW: DASHBOARD REKAPITULASI GURU
  renderTeacherDashboardView(container) {
    const attempts = Utils.storage.get('quiz_attempts', []);
    const reflections = Utils.storage.get('student_reflections', []);
    const gasUrl = window.ApiClient ? window.ApiClient.gasUrl : "";
    const cm = window.ClassManager || (typeof ClassManager !== 'undefined' ? ClassManager : null);
    const currentClasses = cm ? cm.getAll() : [];
    const classStats = cm ? cm.getClassStats() : {};

    // Kalkulasi metrik guru
    const totalAttempts = attempts.length;
    const avgScore = totalAttempts > 0 ? Math.round(attempts.reduce((acc, a) => acc + a.score, 0) / totalAttempts) : 0;
    const passedCount = attempts.filter(a => a.score >= 75).length;

    container.innerHTML = `
      <div class="animate-fade-in">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="info-badge">Portal Pendidik</span>
            <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin-top: 0.25rem;">
              Dashboard Pemantauan & Rekapitulasi Nilai Guru
            </h2>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="btn btn-primary btn-sm" id="btn-manage-classes">🏫 Kelola Nama Kelas</button>
            <button class="btn btn-secondary btn-sm" id="btn-config-gas">⚙️ Konfigurasi Spreadsheet API</button>
            <button class="btn btn-secondary btn-sm" id="btn-change-pin">🔐 Ganti PIN Guru</button>
            <button class="btn btn-success btn-sm" id="btn-export-csv">📥 Ekspor Rekap CSV</button>
            <button class="btn btn-sm" id="btn-logout-teacher" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5;">🚪 Keluar Sesi Guru</button>
          </div>
        </div>

        <!-- 4 Kotak Metrik -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div class="card" style="margin-bottom: 0;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">TOTAL PENGERJAAN KUIS</div>
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-top: 0.25rem;">${totalAttempts}</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Dari seluruh bagian materi A, B, C, D</div>
          </div>
          <div class="card" style="margin-bottom: 0;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">RATA-RATA NILAI SISWA</div>
            <div style="font-size: 1.8rem; font-weight: 800; color: ${avgScore >= 75 ? 'var(--success)' : 'var(--accent-dark)'}; margin-top: 0.25rem;">${avgScore} / 100</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Batas KKM Kelulusan: 75</div>
          </div>
          <div class="card" style="margin-bottom: 0;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">SISWA TUNTAS KKM</div>
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--success); margin-top: 0.25rem;">${passedCount} (${totalAttempts > 0 ? Math.round(passedCount/totalAttempts*100) : 0}%)</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">Mendapat Sertifikat Digital</div>
          </div>
          <div class="card" style="margin-bottom: 0;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">STATUS SINKRONISASI SPREADSHEET</div>
            <div style="font-size: 1rem; font-weight: 800; color: ${gasUrl ? 'var(--success)' : 'var(--danger)'}; margin-top: 0.5rem;">
              ${gasUrl ? '● Terhubung ke GAS' : '○ Mode Offline'}
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${gasUrl || 'URL belum diatur'}
            </div>
          </div>
        </div>

        <!-- KARTU MANAJEMEN KELAS & ROMBEL -->
        <div class="card" style="border-left: 4px solid var(--primary); margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;">
            <div>
              <span class="info-badge" style="background: #e0f2fe; color: #0284c7;">Pengaturan Kurikulum</span>
              <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-top: 0.25rem;">
                🏫 Manajemen Nama Kelas & Rombel Siswa
              </h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">
                Ubah nama kelas yang tampil di formulir identitas siswa, tambah rombel baru, atau sesuaikan dengan kelas Anda.
              </p>
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" id="btn-add-class">➕ Tambah Kelas Baru</button>
              <button class="btn btn-secondary btn-sm" id="btn-reset-classes">🔄 Reset ke Standar</button>
            </div>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
              <thead>
                <tr style="background: #f8fafc; border-bottom: 2px solid var(--border-color); color: var(--text-secondary);">
                  <th style="padding: 0.65rem 0.85rem; width: 45px;">No</th>
                  <th style="padding: 0.65rem 0.85rem; width: 120px;">ID / Kode</th>
                  <th style="padding: 0.65rem 0.85rem;">Nama Tampilan Kelas</th>
                  <th style="padding: 0.65rem 0.85rem; width: 180px;">Aktivitas Kuis</th>
                  <th style="padding: 0.65rem 0.85rem; width: 190px; text-align: center;">Aksi Guru</th>
                </tr>
              </thead>
              <tbody>
                ${currentClasses.map((c, idx) => {
                  const stat = classStats[c.id] || { attemptsCount: 0, uniqueStudents: new Set() };
                  const studentCount = stat.uniqueStudents ? stat.uniqueStudents.size : 0;
                  return `
                    <tr style="border-bottom: 1px solid var(--border-color);">
                      <td style="padding: 0.65rem 0.85rem; color: var(--text-muted);">${idx + 1}</td>
                      <td style="padding: 0.65rem 0.85rem;"><span class="badge" style="background: #f1f5f9; color: var(--text-primary); font-family: monospace; font-weight: 700;">${c.id}</span></td>
                      <td style="padding: 0.65rem 0.85rem; font-weight: 700; color: var(--primary-dark); font-size: 0.95rem;">${c.name}</td>
                      <td style="padding: 0.65rem 0.85rem; font-size: 0.82rem; color: var(--text-secondary);">
                        <span>📝 ${stat.attemptsCount} tugas (${studentCount} siswa)</span>
                      </td>
                      <td style="padding: 0.65rem 0.85rem; text-align: center;">
                        <div style="display: flex; gap: 0.35rem; justify-content: center;">
                          <button class="btn btn-secondary btn-sm btn-edit-class" data-index="${idx}" style="padding: 0.25rem 0.65rem; font-size: 0.78rem;" title="Ubah Nama Kelas">
                            ✏️ Ubah Nama
                          </button>
                          <button class="btn btn-sm btn-delete-class" data-index="${idx}" style="padding: 0.25rem 0.65rem; font-size: 0.78rem; background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5;" title="Hapus Kelas">
                            🗑️ Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Tabel Rekap Nilai Siswa -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
            <h3 style="font-size: 1.15rem; font-weight: 700;">Rekap Hasil Evaluasi Siswa</h3>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <select id="filter-class" class="form-select" style="width: auto; padding: 0.35rem 0.75rem; font-size: 0.85rem;">
                <option value="ALL">Semua Kelas</option>
                ${currentClasses.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
              </select>
              <select id="filter-section" class="form-select" style="width: auto; padding: 0.35rem 0.75rem; font-size: 0.85rem;">
                <option value="ALL">Semua Bagian Materi</option>
                <option value="A">Bagian A (Organ Reproduksi)</option>
                <option value="B">Bagian B (Siklus Menstruasi)</option>
                <option value="C">Bagian C (Siklus Hidup)</option>
                <option value="D">Bagian D (Keluarga Berencana)</option>
              </select>
            </div>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
              <thead>
                <tr style="background: #f1f5f9; border-bottom: 2px solid var(--border-color); color: var(--text-secondary);">
                  <th style="padding: 0.75rem 1rem;">Waktu</th>
                  <th style="padding: 0.75rem 1rem;">Nama Siswa</th>
                  <th style="padding: 0.75rem 1rem;">Kelas</th>
                  <th style="padding: 0.75rem 1rem;">Bagian</th>
                  <th style="padding: 0.75rem 1rem;">Skor</th>
                  <th style="padding: 0.75rem 1rem;">Status KKM</th>
                </tr>
              </thead>
              <tbody id="teacher-attempts-tbody">
                ${attempts.length === 0 ? `
                  <tr>
                    <td colspan="6" style="padding: 2rem; text-align: center; color: var(--text-muted);">
                      Belum ada data pengerjaan latihan siswa yang terekam.
                    </td>
                  </tr>
                ` : attempts.slice().reverse().map(a => `
                  <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 0.75rem 1rem; color: var(--text-muted); font-size: 0.8rem;">${Utils.formatDate(a.submittedAt)}</td>
                    <td style="padding: 0.75rem 1rem; font-weight: 600; color: var(--text-primary);">${a.studentName || '-'}</td>
                    <td style="padding: 0.75rem 1rem;">${a.classCode || '-'}</td>
                    <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--primary);">Bagian ${a.section}</td>
                    <td style="padding: 0.75rem 1rem; font-weight: 800; font-size: 1rem; color: ${a.score >= 75 ? 'var(--success)' : 'var(--danger)'};">${a.score}</td>
                    <td style="padding: 0.75rem 1rem;">
                      <span style="font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: var(--radius-full); background: ${a.score >= 75 ? '#d1fae5' : '#fee2e2'}; color: ${a.score >= 75 ? '#065f46' : '#991b1b'};">
                        ${a.score >= 75 ? '✓ TUNTAS' : 'REMIDIAL'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="quiz-nav-footer" style="margin-top: 2rem;">
          <button class="btn btn-secondary" data-route="home">Kembali ke Beranda Siswa</button>
        </div>
      </div>
    `;

    // Filter listener ganda: Section & Class
    const filterSec = container.querySelector('#filter-section');
    const filterClass = container.querySelector('#filter-class');
    const applyFilters = () => {
      const secVal = filterSec ? filterSec.value : 'ALL';
      const classVal = filterClass ? filterClass.value : 'ALL';
      const tbody = container.querySelector('#teacher-attempts-tbody');

      let filtered = attempts;
      if (secVal !== 'ALL') {
        filtered = filtered.filter(a => a.section === secVal);
      }
      if (classVal !== 'ALL') {
        filtered = filtered.filter(a => a.classCode === classVal);
      }

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="padding: 2rem; text-align: center; color: var(--text-muted);">Tidak ada rekaman untuk filter ini.</td></tr>`;
      } else {
        tbody.innerHTML = filtered.slice().reverse().map(a => `
          <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 0.75rem 1rem; color: var(--text-muted); font-size: 0.8rem;">${Utils.formatDate(a.submittedAt)}</td>
            <td style="padding: 0.75rem 1rem; font-weight: 600; color: var(--text-primary);">${a.studentName || '-'}</td>
            <td style="padding: 0.75rem 1rem;">${a.classCode || '-'}</td>
            <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--primary);">Bagian ${a.section}</td>
            <td style="padding: 0.75rem 1rem; font-weight: 800; font-size: 1rem; color: ${a.score >= 75 ? 'var(--success)' : 'var(--danger)'};">${a.score}</td>
            <td style="padding: 0.75rem 1rem;">
              <span style="font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: var(--radius-full); background: ${a.score >= 75 ? '#d1fae5' : '#fee2e2'}; color: ${a.score >= 75 ? '#065f46' : '#991b1b'};">
                ${a.score >= 75 ? '✓ TUNTAS' : 'REMIDIAL'}
              </span>
            </td>
          </tr>
        `).join('');
      }
    };

    if (filterSec) filterSec.addEventListener('change', applyFilters);
    if (filterClass) filterClass.addEventListener('change', applyFilters);

    // Event listener tombol Manajemen Kelas di header
    const btnManageClasses = container.querySelector('#btn-manage-classes');
    if (btnManageClasses) {
      btnManageClasses.addEventListener('click', () => {
        this.showManageClassesModal();
      });
    }

    // Tombol Tambah Kelas Baru di Card
    const btnAddClass = container.querySelector('#btn-add-class');
    if (btnAddClass) {
      btnAddClass.addEventListener('click', () => {
        this.showAddClassModal();
      });
    }

    // Tombol Reset Kelas ke Default di Card
    const btnResetClasses = container.querySelector('#btn-reset-classes');
    if (btnResetClasses) {
      btnResetClasses.addEventListener('click', () => {
        if (confirm("Apakah Anda yakin ingin mereset daftar kelas kembali ke standar kurikulum (9-A sampai 8-B)?")) {
          if (window.ClassManager) {
            window.ClassManager.resetDefaults();
            this.renderTeacherDashboardView(container);
          }
        }
      });
    }

    // Tombol Ubah Nama per baris tabel
    container.querySelectorAll('.btn-edit-class').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        this.showEditClassModal(idx);
      });
    });

    // Tombol Hapus per baris tabel
    container.querySelectorAll('.btn-delete-class').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        const targetClass = currentClasses[idx];
        if (!targetClass) return;
        if (confirm(`Apakah Anda yakin ingin menghapus kelas "${targetClass.name}" (${targetClass.id})?`)) {
          if (window.ClassManager) {
            window.ClassManager.deleteClass(idx);
            this.renderTeacherDashboardView(container);
          }
        }
      });
    });

    // Modal GAS URL config
    container.querySelector('#btn-config-gas').addEventListener('click', () => {
      this.showGasConfigModal();
    });

    // Modal Ganti PIN Guru
    container.querySelector('#btn-change-pin').addEventListener('click', () => {
      this.showChangePinModal();
    });

    // Logout Guru
    container.querySelector('#btn-logout-teacher').addEventListener('click', () => {
      if (confirm("Apakah Anda yakin ingin keluar dari sesi Guru?")) {
        if (window.StudentAuth) window.StudentAuth.logoutTeacher();
      }
    });

    // Ekspor CSV
    container.querySelector('#btn-export-csv').addEventListener('click', () => {
      this.exportAttemptsToCsv(attempts);
    });

    this.bindRouteButtons(container);
  },

  // MODAL KELOLA SELURUH KELAS
  showManageClassesModal() {
    const overlay = document.getElementById('general-modal-overlay');
    const content = document.getElementById('general-modal-content');
    if (!overlay || !content) return;

    const cm = window.ClassManager || (typeof ClassManager !== 'undefined' ? ClassManager : null);
    const classes = cm ? cm.getAll() : [];

    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--primary-dark); margin: 0;">
          🏫 Kelola Daftar Kelas & Rombel Siswa
        </h3>
        <button class="btn btn-secondary btn-sm" id="btn-close-class-modal" style="padding: 0.25rem 0.5rem;">✕</button>
      </div>
      <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
        Seluruh perubahan nama kelas akan langsung tersinkron ke formulir identitas siswa dan Google Spreadsheet.
      </p>

      <div style="max-height: 320px; overflow-y: auto; margin-bottom: 1.25rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
          <thead style="background: #f8fafc; position: sticky; top: 0;">
            <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-secondary);">
              <th style="padding: 0.6rem 0.75rem;">Kode</th>
              <th style="padding: 0.6rem 0.75rem;">Nama Tampilan Kelas</th>
              <th style="padding: 0.6rem 0.75rem; text-align: right;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${classes.map((c, idx) => `
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 0.6rem 0.75rem; font-family: monospace; font-weight: 700;">${c.id}</td>
                <td style="padding: 0.6rem 0.75rem; font-weight: 600;">${c.name}</td>
                <td style="padding: 0.6rem 0.75rem; text-align: right;">
                  <button class="btn btn-secondary btn-sm btn-modal-edit" data-index="${idx}" style="padding: 0.2rem 0.5rem; font-size: 0.78rem;">✏️ Ubah</button>
                  <button class="btn btn-sm btn-modal-del" data-index="${idx}" style="padding: 0.2rem 0.5rem; font-size: 0.78rem; background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5;">🗑️</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <button type="button" class="btn btn-secondary btn-sm" id="btn-modal-reset">🔄 Reset Standar</button>
        <div style="display: flex; gap: 0.5rem;">
          <button type="button" class="btn btn-primary btn-sm" id="btn-modal-add">➕ Tambah Kelas Baru</button>
          <button type="button" class="btn btn-secondary btn-sm" id="btn-modal-done">Selesai ✓</button>
        </div>
      </div>
    `;

    overlay.classList.add('active');

    const closeModal = () => {
      overlay.classList.remove('active');
      const mainContainer = document.getElementById('app-content-area');
      if (mainContainer && this.currentView === 'teacher-dashboard') {
        this.renderTeacherDashboardView(mainContainer);
      }
    };

    content.querySelector('#btn-close-class-modal').addEventListener('click', closeModal);
    content.querySelector('#btn-modal-done').addEventListener('click', closeModal);

    content.querySelectorAll('.btn-modal-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        this.showEditClassModal(idx, () => this.showManageClassesModal());
      });
    });

    content.querySelectorAll('.btn-modal-del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        const target = classes[idx];
        if (confirm(`Hapus kelas "${target.name}"?`)) {
          if (cm) {
            cm.deleteClass(idx);
            this.showManageClassesModal();
          }
        }
      });
    });

    content.querySelector('#btn-modal-add').addEventListener('click', () => {
      this.showAddClassModal(() => this.showManageClassesModal());
    });

    content.querySelector('#btn-modal-reset').addEventListener('click', () => {
      if (confirm("Reset daftar kelas ke default kurikulum?")) {
        if (cm) {
          cm.resetDefaults();
          this.showManageClassesModal();
        }
      }
    });
  },

  // MODAL UBAH NAMA KELAS
  showEditClassModal(index, onCompleteCallback = null) {
    const overlay = document.getElementById('general-modal-overlay');
    const content = document.getElementById('general-modal-content');
    if (!overlay || !content) return;

    const cm = window.ClassManager || (typeof ClassManager !== 'undefined' ? ClassManager : null);
    const classes = cm ? cm.getAll() : [];
    const targetClass = classes[index];
    if (!targetClass) return;

    content.innerHTML = `
      <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--primary-dark); margin-bottom: 0.5rem;">
        ✏️ Ubah Nama Kelas
      </h3>
      <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
        Perbarui nama tampilan kelas untuk rombel <strong>${targetClass.name}</strong> (${targetClass.id}).
      </p>

      <form id="form-edit-class">
        <div class="form-group">
          <label class="form-label">Nama Tampilan Kelas:</label>
          <input type="text" id="input-edit-class-name" class="form-input" value="${targetClass.name}" required placeholder="Contoh: Kelas IX-A atau Kelas 9 Unggulan Biologi">
        </div>

        <div class="form-group">
          <label class="form-label">ID / Kode Rombel:</label>
          <input type="text" id="input-edit-class-id" class="form-input" value="${targetClass.id}" required placeholder="Contoh: 9-A atau IX-A">
          <small style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-top: 0.25rem;">Kode unik digunakan untuk rekap nilai dan spreadsheet.</small>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
          <button type="button" class="btn btn-secondary btn-sm" id="btn-cancel-edit-class">Batal</button>
          <button type="submit" class="btn btn-primary btn-sm">Simpan Perubahan ✓</button>
        </div>
      </form>
    `;

    overlay.classList.add('active');

    content.querySelector('#btn-cancel-edit-class').addEventListener('click', () => {
      if (onCompleteCallback) {
        onCompleteCallback();
      } else {
        overlay.classList.remove('active');
      }
    });

    content.querySelector('#form-edit-class').addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = (document.getElementById('input-edit-class-name').value || '').trim();
      const newId = (document.getElementById('input-edit-class-id').value || '').trim();

      const cm = window.ClassManager || (typeof ClassManager !== 'undefined' ? ClassManager : null);
      if (cm) {
        const success = cm.updateClass(index, newName, newId);
        if (success) {
          overlay.classList.remove('active');
          const mainContainer = document.getElementById('app-content-area');
          if (mainContainer && this.currentView === 'teacher-dashboard') {
            this.renderTeacherDashboardView(mainContainer);
          }
          if (onCompleteCallback) {
            onCompleteCallback();
          }
        }
      }
    });
  },

  // MODAL TAMBAH KELAS BARU
  showAddClassModal(onCompleteCallback = null) {
    const overlay = document.getElementById('general-modal-overlay');
    const content = document.getElementById('general-modal-content');
    if (!overlay || !content) return;

    content.innerHTML = `
      <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--primary-dark); margin-bottom: 0.5rem;">
        ➕ Tambah Kelas / Rombel Baru
      </h3>
      <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
        Tambahkan kelas baru ke dalam sistem agar siswa di kelas tersebut dapat memilihnya saat mengisi identitas.
      </p>

      <form id="form-add-class">
        <div class="form-group">
          <label class="form-label">Nama Tampilan Kelas:</label>
          <input type="text" id="input-new-class-name" class="form-input" required placeholder="Contoh: Kelas 9-E atau Kelas 9 Tahfidz">
        </div>

        <div class="form-group">
          <label class="form-label">Kode Singkat Kelas (Opsional):</label>
          <input type="text" id="input-new-class-id" class="form-input" placeholder="Contoh: 9-E (Jika kosong dibuat otomatis)">
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
          <button type="button" class="btn btn-secondary btn-sm" id="btn-cancel-add-class">Batal</button>
          <button type="submit" class="btn btn-primary btn-sm">Tambahkan Kelas ✓</button>
        </div>
      </form>
    `;

    overlay.classList.add('active');

    content.querySelector('#btn-cancel-add-class').addEventListener('click', () => {
      if (onCompleteCallback) {
        onCompleteCallback();
      } else {
        overlay.classList.remove('active');
      }
    });

    content.querySelector('#form-add-class').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('input-new-class-name').value || '').trim();
      const id = (document.getElementById('input-new-class-id').value || '').trim();

      const cm = window.ClassManager || (typeof ClassManager !== 'undefined' ? ClassManager : null);
      if (cm) {
        const success = cm.addClass(name, id);
        if (success) {
          overlay.classList.remove('active');
          const mainContainer = document.getElementById('app-content-area');
          if (mainContainer && this.currentView === 'teacher-dashboard') {
            this.renderTeacherDashboardView(mainContainer);
          }
          if (onCompleteCallback) {
            onCompleteCallback();
          }
        }
      }
    });
  },

  showChangePinModal() {
    const overlay = document.getElementById('general-modal-overlay');
    const content = document.getElementById('general-modal-content');
    if (!overlay || !content) return;

    content.innerHTML = `
      <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--primary-dark); margin-bottom: 0.5rem;">
        🔐 Perbarui PIN Akses Guru
      </h3>
      <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
        Ganti PIN bawaan (guru123) dengan PIN rahasia Anda sendiri agar siswa tidak dapat membuka dashboard nilai ini.
      </p>

      <form id="form-change-pin">
        <div class="form-group">
          <label class="form-label">PIN Lama:</label>
          <input type="password" id="input-old-pin" class="form-input" placeholder="Masukkan PIN saat ini" required>
        </div>

        <div class="form-group">
          <label class="form-label">PIN Baru (Minimal 4 Karakter):</label>
          <input type="password" id="input-new-pin" class="form-input" placeholder="Buat PIN baru rahasia" required>
        </div>

        <div class="form-group">
          <label class="form-label">Ulangi PIN Baru:</label>
          <input type="password" id="input-confirm-pin" class="form-input" placeholder="Konfirmasi PIN baru" required>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
          <button type="button" class="btn btn-secondary btn-sm" id="btn-cancel-change-pin">Batal</button>
          <button type="submit" class="btn btn-primary btn-sm">Simpan PIN Baru ✓</button>
        </div>
      </form>
    `;

    overlay.classList.add('active');

    content.querySelector('#btn-cancel-change-pin').addEventListener('click', () => {
      overlay.classList.remove('active');
    });

    content.querySelector('#form-change-pin').addEventListener('submit', (e) => {
      e.preventDefault();
      const oldPin = document.getElementById('input-old-pin').value;
      const newPin = document.getElementById('input-new-pin').value;
      const confirmPin = document.getElementById('input-confirm-pin').value;

      if (newPin !== confirmPin) {
        if (window.Utils) window.Utils.showToast("Konfirmasi PIN baru tidak cocok!", "error");
        return;
      }

      if (window.StudentAuth) {
        const success = window.StudentAuth.changeTeacherPin(oldPin, newPin);
        if (success) {
          overlay.classList.remove('active');
        }
      }
    });
  },

  exportAttemptsToCsv(attempts) {
    if (!attempts || attempts.length === 0) {
      Utils.showToast("Belum ada data untuk diekspor!", "warning");
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,Timestamp,StudentName,Class,Section,Score,Status\n";
    attempts.forEach(a => {
      csvContent += `"${a.submittedAt}","${a.studentName || '-'}","${a.classCode || '-'}","Bagian ${a.section}",${a.score},"${a.score >= 75 ? 'TUNTAS' : 'REMIDIAL'}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Nilai_Sistem_Reproduksi_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    Utils.showToast("File Rekap CSV berhasil diunduh!");
  },

  // MODAL PANDUAN BELAJAR
  showGuideModal() {
    const overlay = document.getElementById('general-modal-overlay');
    const content = document.getElementById('general-modal-content');
    if (!overlay || !content) return;

    content.innerHTML = `
      <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--primary-dark); margin-bottom: 0.75rem;">
        📖 Panduan Belajar Siswa (Kurikulum Merdeka)
      </h3>
      <div style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; display: flex; flex-direction: column; gap: 0.85rem;">
        <p>Selamat datang di Media Pembelajaran Interaktif Sistem Reproduksi Manusia! Ikuti langkah-langkah berikut untuk mendapatkan pemahaman terbaik:</p>
        <ol style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <li><strong>Eksplorasi Diagram Anatomi:</strong> Klik setiap pin nomor untuk membaca fungsi organ secara mendalam.</li>
          <li><strong>Gunakan Flashcard:</strong> Uji ingatan istilah biologi Anda dengan membalik kartu dan mengacak urutan.</li>
          <li><strong>Eksperimen di Simulator Menstruasi:</strong> Geser slider hari untuk melihat bagaimana hormon mengatur dinding rahim.</li>
          <li><strong>Kerjakan Ayo Uji Kemampuan:</strong> Kerjakan 10-15 butir soal di setiap akhir bab. Jika mencapai nilai 75 (KKM), Anda berhak mengunduh Sertifikat Apresiasi!</li>
          <li><strong>Isi Refleksi Diri 3-2-1:</strong> Tuangkan apa yang Anda pelajari dan hal menarik untuk didiskusikan di kelas.</li>
        </ol>
      </div>
      <div style="margin-top: 1.5rem; text-align: right;">
        <button class="btn btn-primary" id="btn-close-general-modal">Saya Mengerti, Mulai Belajar! ✓</button>
      </div>
    `;

    overlay.classList.add('active');
    content.querySelector('#btn-close-general-modal').addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  },

  // MODAL KONFIGURASI GAS
  showGasConfigModal() {
    const overlay = document.getElementById('general-modal-overlay');
    const content = document.getElementById('general-modal-content');
    if (!overlay || !content) return;

    const currentUrl = window.ApiClient ? window.ApiClient.gasUrl : "";

    content.innerHTML = `
      <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--primary-dark); margin-bottom: 0.75rem;">
        ⚙️ Konfigurasi URL Google Apps Script Web App
      </h3>
      <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
        Masukkan URL deployment Web App dari Google Apps Script untuk menghubungkan aplikasi ini ke Google Spreadsheet database guru secara otomatis.
      </p>

      <div class="form-group">
        <label class="form-label">URL Web App Google Apps Script:</label>
        <input type="url" id="input-gas-url" class="form-input" placeholder="https://script.google.com/macros/s/AKfycb.../exec" value="${currentUrl}">
        <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem; display: block;">
          Pastikan hak akses deployment diatur: <em>Execute as: Me</em> dan <em>Who has access: Anyone</em>.
        </span>
      </div>

      <div id="gas-test-result" style="margin-bottom: 1rem;"></div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button class="btn btn-secondary btn-sm" id="btn-test-gas-conn">🔍 Uji Koneksi</button>
        <button class="btn btn-primary btn-sm" id="btn-save-gas-url">Simpan Konfigurasi</button>
      </div>
    `;

    overlay.classList.add('active');

    content.querySelector('#btn-test-gas-conn').addEventListener('click', async () => {
      const url = document.getElementById('input-gas-url').value;
      const resBox = document.getElementById('gas-test-result');
      resBox.innerHTML = `<span style="font-size: 0.82rem; color: var(--primary);">Sedang menguji koneksi...</span>`;
      const res = await window.ApiClient.testConnection(url);
      resBox.innerHTML = `
        <div style="padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.82rem; background: ${res.success ? '#ecfdf5' : '#fef2f2'}; color: ${res.success ? '#065f46' : '#991b1b'};">
          ${res.message}
        </div>
      `;
    });

    content.querySelector('#btn-save-gas-url').addEventListener('click', () => {
      const url = document.getElementById('input-gas-url').value;
      if (window.ApiClient) window.ApiClient.setGasUrl(url);
      overlay.classList.remove('active');
      this.renderTeacherDashboardView(document.getElementById('app-content-area'));
    });
  },

  // MODAL SERTIFIKAT DIGITAL
  showCertificate(attemptRecord) {
    const overlay = document.getElementById('general-modal-overlay');
    const content = document.getElementById('general-modal-content');
    if (!overlay || !content) return;

    const user = window.StudentAuth ? window.StudentAuth.currentUser : null;
    const name = user ? user.name : "Siswa Berprestasi";
    const school = user ? user.school : "SMP/MTs Merdeka";

    content.innerHTML = `
      <div style="border: 8px double #1e40af; padding: 2rem; text-align: center; background: #ffffff; position: relative;" id="printable-cert">
        <div style="font-size: 0.85rem; font-weight: 700; color: #64748b; letter-spacing: 0.1em; text-transform: uppercase;">KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI</div>
        <div style="font-size: 1.5rem; font-weight: 800; color: #1e3a8a; margin: 0.5rem 0;">SERTIFIKAT APRESIASI BELAJAR</div>
        <div style="font-size: 0.9rem; color: #475569;">Diberikan dengan bangga kepada:</div>
        
        <div style="font-size: 1.8rem; font-weight: 800; color: #0f172a; border-bottom: 2px solid #2563eb; display: inline-block; padding: 0.25rem 2rem; margin: 1rem 0;">
          ${name}
        </div>

        <p style="font-size: 0.95rem; color: #334155; max-width: 500px; margin: 0 auto; line-height: 1.6;">
          Atas keberhasilan menyelesaikan pembelajaran dan evaluasi <strong>Media Pembelajaran Interaktif Sistem Reproduksi Manusia (Kurikulum Merdeka Fase D)</strong> dengan predikat <strong>TUNTAS (Nilai: ${attemptRecord.score})</strong>.
        </p>

        <div style="display: flex; justify-content: space-between; margin-top: 2rem; font-size: 0.85rem; color: #64748b; padding-top: 1rem; border-top: 1px dashed #cbd5e1;">
          <div>
            <div>Tanggal: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            <div>ID Verifikasi: ${attemptRecord.attemptId}</div>
          </div>
          <div>
            <div style="font-weight: 700; color: #1e3a8a;">${school}</div>
            <div style="font-size: 0.78rem;">Verifikasi Otomatis Sistem MPI</div>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: center; gap: 0.75rem; margin-top: 1.5rem;">
        <button class="btn btn-primary" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
        <button class="btn btn-secondary" id="btn-close-cert-modal">Tutup</button>
      </div>
    `;

    overlay.classList.add('active');
    content.querySelector('#btn-close-cert-modal').addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  },

  bindRouteButtons(parentEl) {
    parentEl.querySelectorAll('[data-route]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const route = btn.getAttribute('data-route');
        this.navigateTo(route);
      });
    });
  }
};

if (typeof window !== "undefined") {
  window.Navigation = Navigation;
}
