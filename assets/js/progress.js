/**
 * SISTEM MONITORING PROGRES BELAJAR SISWA (progress.js)
 * Menghitung persentase penyelesaian modul, latihan soal, dan aktivitas interaktif
 */

const ProgressTracker = {
  // Daftar target capaian modul
  modulesState: {
    "A1": false, // Materi A.1 Pria
    "A2": false, // Materi A.2 Wanita
    "QA": false, // Kuis Bagian A
    "B": false,  // Materi B Siklus Menstruasi
    "BSim": false,// Simulator 28 hari
    "QB": false, // Kuis Bagian B
    "C1": false, // C.1 Kehamilan & Bayi
    "C2": false, // C.2 Anak-anak
    "C3": false, // C.3 Remaja & Pubertas
    "C4": false, // C.4 Dewasa
    "QC": false, // Kuis Bagian C
    "D1": false, // D.1 Kontrasepsi & Kesehatan
    "QD": false, // Kuis Bagian D
    "REF": false // Lembar Refleksi
  },

  init() {
    const saved = Utils.storage.get('learning_progress');
    if (saved) {
      this.modulesState = { ...this.modulesState, ...saved };
    }
    this.updateProgressBarUI();
  },

  markCompleted(moduleId) {
    if (this.modulesState.hasOwnProperty(moduleId)) {
      if (!this.modulesState[moduleId]) {
        this.modulesState[moduleId] = true;
        Utils.storage.set('learning_progress', this.modulesState);
        this.updateProgressBarUI();
        Utils.showToast(`Progres diperbarui: Sub-bab ${moduleId} tuntas!`);

        // Sinkronisasi ke backend jika ada
        if (window.ApiClient) {
          window.ApiClient.saveProgress(moduleId, this.getCompletionPercentage());
        }
      }
    }
  },

  markSectionQuizCompleted(sectionCode, score) {
    if (sectionCode === "A") this.markCompleted("QA");
    if (sectionCode === "B") this.markCompleted("QB");
    if (sectionCode === "C") this.markCompleted("QC");
    if (sectionCode === "D") this.markCompleted("QD");
  },

  getCompletionPercentage() {
    const keys = Object.keys(this.modulesState);
    const completed = keys.filter(k => this.modulesState[k]).length;
    return Math.round((completed / keys.length) * 100);
  },

  updateProgressBarUI() {
    const pct = this.getCompletionPercentage();
    
    // Update progress bar di beranda & navbar jika ada
    const barFill = document.getElementById('main-progress-fill');
    const textPct = document.getElementById('main-progress-text');
    const badgeHome = document.getElementById('home-progress-badge');

    if (barFill) barFill.style.width = `${pct}%`;
    if (textPct) textPct.textContent = `${pct}% Selesai`;
    if (badgeHome) badgeHome.textContent = `${pct}% Tuntas`;

    // Update status card di beranda jika ada
    const statusA = document.getElementById('status-module-a');
    if (statusA) {
      const isADone = this.modulesState.A1 && this.modulesState.A2 && this.modulesState.QA;
      statusA.className = `module-status ${isADone ? 'status-completed' : 'status-pending'}`;
      statusA.textContent = isADone ? '✓ Selesai' : 'Belum Selesai';
    }

    const statusB = document.getElementById('status-module-b');
    if (statusB) {
      const isBDone = this.modulesState.B && this.modulesState.QB;
      statusB.className = `module-status ${isBDone ? 'status-completed' : 'status-pending'}`;
      statusB.textContent = isBDone ? '✓ Selesai' : 'Belum Selesai';
    }

    const statusC = document.getElementById('status-module-c');
    if (statusC) {
      const isCDone = this.modulesState.C1 && this.modulesState.C2 && this.modulesState.C3 && this.modulesState.C4 && this.modulesState.QC;
      statusC.className = `module-status ${isCDone ? 'status-completed' : 'status-pending'}`;
      statusC.textContent = isCDone ? '✓ Selesai' : 'Belum Selesai';
    }

    const statusD = document.getElementById('status-module-d');
    if (statusD) {
      const isDDone = this.modulesState.D1 && this.modulesState.QD;
      statusD.className = `module-status ${isDDone ? 'status-completed' : 'status-pending'}`;
      statusD.textContent = isDDone ? '✓ Selesai' : 'Belum Selesai';
    }
  }
};

if (typeof window !== "undefined") {
  window.ProgressTracker = ProgressTracker;
}
