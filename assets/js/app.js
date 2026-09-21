/**
 * MAIN APPLICATION ORCHESTRATOR (app.js)
 * Titik masuk utama aplikasi MPI Sistem Reproduksi Manusia
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log("Menginisialisasi Media Pembelajaran Interaktif (MPI) Sistem Reproduksi Manusia...");

  // 1. Inisialisasi API & Storage
  if (window.ApiClient) window.ApiClient.init();

  // 1.5. Inisialisasi Manajemen Kelas & Rombel
  if (window.ClassManager) window.ClassManager.init();

  // 2. Inisialisasi Autentikasi Pengguna (Siswa/Guru)
  if (window.StudentAuth) window.StudentAuth.init();

  // 3. Inisialisasi Progress Tracker
  if (window.ProgressTracker) window.ProgressTracker.init();

  // 4. Inisialisasi Navigasi & Router
  if (window.Navigation) window.Navigation.init();

  // 5. Inisialisasi Event Handlers Global (Audio, Accessibility, Modal Profil & Guru)
  setupGlobalControls();
});

function setupGlobalControls() {
  // Toggle Suara
  const soundBtn = document.getElementById('btn-toggle-sound');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      if (window.Utils) {
        const isEnabled = window.Utils.toggleSound();
        soundBtn.innerHTML = isEnabled ? '🔊' : '🔇';
        soundBtn.title = isEnabled ? 'Matikan Efek Suara' : 'Nyalakan Efek Suara';
        window.Utils.showToast(isEnabled ? 'Efek suara aktif' : 'Efek suara dimatikan');
      }
    });
  }

  // Toggle Aksesibilitas (Kontras Tinggi)
  const contrastBtn = document.getElementById('btn-toggle-contrast');
  if (contrastBtn) {
    contrastBtn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      const isHigh = document.body.classList.contains('high-contrast');
      contrastBtn.title = isHigh ? 'Mode Kontras Normal' : 'Mode Kontras Tinggi';
      if (window.Utils) window.Utils.showToast(isHigh ? 'Mode Kontras Tinggi Aktif' : 'Mode Kontras Normal');
    });
  }

  // Toggle Ukuran Teks (Besar / Standar)
  const textSizeBtn = document.getElementById('btn-toggle-text-size');
  if (textSizeBtn) {
    textSizeBtn.addEventListener('click', () => {
      document.body.classList.toggle('large-text');
      const isLarge = document.body.classList.contains('large-text');
      if (window.Utils) window.Utils.showToast(isLarge ? 'Ukuran Teks Diperbesar' : 'Ukuran Teks Normal');
    });
  }

  // Modal Login Profil Siswa
  const userBadge = document.getElementById('user-profile-badge');
  const userModal = document.getElementById('student-modal-overlay');
  const closeUserModal = document.getElementById('btn-close-student-modal');
  const studentForm = document.getElementById('form-student-login');

  if (userBadge && userModal) {
    userBadge.addEventListener('click', () => {
      // Refresh daftar kelas terbaru yang dikelola guru
      if (window.ClassManager) window.ClassManager.populateAllSelects();

      // Isi form dengan data saat ini
      const cur = window.StudentAuth ? window.StudentAuth.currentUser : null;
      if (cur) {
        document.getElementById('input-student-name').value = cur.name || '';
        document.getElementById('input-student-nisn').value = cur.nisn || '';
        document.getElementById('input-student-class').value = cur.classCode || '';
        document.getElementById('input-student-school').value = cur.school || 'SMP';
      }
      userModal.classList.add('active');
    });
  }

  if (closeUserModal && userModal) {
    closeUserModal.addEventListener('click', () => {
      userModal.classList.remove('active');
    });
  }

  if (studentForm && userModal) {
    studentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('input-student-name').value;
      const nisn = document.getElementById('input-student-nisn').value;
      const classCode = document.getElementById('input-student-class').value;
      const school = document.getElementById('input-student-school').value;

      if (window.StudentAuth) {
        window.StudentAuth.loginStudent(name, nisn, classCode, school);
      }
      userModal.classList.remove('active');
    });
  }

  // Tombol & Modal Akses Guru
  const teacherBtn = document.getElementById('nav-teacher-portal');
  const teacherModal = document.getElementById('teacher-modal-overlay');
  const closeTeacherModal = document.getElementById('btn-close-teacher-modal');
  const teacherForm = document.getElementById('form-teacher-login');

  if (teacherBtn && teacherModal) {
    teacherBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.StudentAuth && window.StudentAuth.currentRole === 'teacher') {
        if (window.Navigation) window.Navigation.navigateTo('teacher-dashboard');
      } else {
        checkTeacherLockoutUI();
        teacherModal.classList.add('active');
      }
    });
  }

  function checkTeacherLockoutUI() {
    const lockMsg = document.getElementById('teacher-lockout-msg');
    const pinInput = document.getElementById('input-teacher-pin');
    const submitBtn = teacherForm.querySelector('button[type="submit"]');
    const lockoutUntil = window.Utils ? window.Utils.storage.get('teacher_lockout_until', 0) : 0;
    const now = Date.now();

    if (now < lockoutUntil) {
      const remainingSecs = Math.ceil((lockoutUntil - now) / 1000);
      if (lockMsg) lockMsg.textContent = `⚠️ Terkunci sementara! Coba lagi dalam ${remainingSecs} detik.`;
      if (pinInput) pinInput.disabled = true;
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(checkTeacherLockoutUI, 1000);
    } else {
      if (lockMsg) lockMsg.textContent = '';
      if (pinInput) pinInput.disabled = false;
      if (submitBtn) submitBtn.disabled = false;
    }
  }

  if (closeTeacherModal && teacherModal) {
    closeTeacherModal.addEventListener('click', () => {
      teacherModal.classList.remove('active');
    });
  }

  if (teacherForm && teacherModal) {
    teacherForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pin = document.getElementById('input-teacher-pin').value;
      if (window.StudentAuth) {
        const success = window.StudentAuth.loginTeacher(pin);
        if (success) {
          teacherModal.classList.remove('active');
          document.getElementById('input-teacher-pin').value = '';
          if (window.Navigation) window.Navigation.navigateTo('teacher-dashboard');
        } else {
          checkTeacherLockoutUI();
        }
      }
    });
  }

  // Global Modal Close on Overlay Click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}
