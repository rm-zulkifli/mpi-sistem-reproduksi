/**
 * SISTEM AKUN, AUTENTIKASI & KEAMANAN SISWA & GURU (auth.js)
 * Dilengkapi proteksi Anti Brute-Force Lockout, Ganti PIN Guru, dan Auto-Logout
 */

const StudentAuth = {
  currentUser: null,
  currentRole: 'guest', // 'student' | 'teacher' | 'guest'
  
  // Fitur Keamanan Anti Brute-Force
  failedAttempts: 0,
  maxFailedAttempts: 3,
  lockoutSeconds: 60,
  lockoutTimerInterval: null,

  isIdentified() {
    const identified = Utils.storage.get('student_identified', false);
    return identified && this.currentUser && this.currentUser.name && this.currentUser.name.trim().length > 0 && this.currentUser.name !== "Belum Mengisi Identitas";
  },

  init() {
    const saved = Utils.storage.get('current_session');
    const isSavedIdentified = Utils.storage.get('student_identified', false);

    if (saved && saved.user && isSavedIdentified) {
      this.currentUser = saved.user;
      this.currentRole = saved.role === 'teacher' ? 'student' : saved.role;
    } else {
      // Siswa belum mengisi data diri
      this.currentUser = {
        studentId: "",
        nisn: "",
        name: "Belum Mengisi Identitas",
        classCode: "-",
        school: "-",
        points: 0,
        badges: []
      };
      this.currentRole = 'student';
      Utils.storage.set('student_identified', false);
      this.saveSession();
    }
    this.updateUserUI();
  },

  saveSession() {
    Utils.storage.set('current_session', {
      user: this.currentUser,
      role: this.currentRole
    });
  },

  loginStudent(name, nisn, classCode, school = "SMP") {
    if (!name || name.trim().length === 0) {
      Utils.showToast("Nama lengkap siswa wajib diisi!", "error");
      return false;
    }

    if (!classCode || classCode.trim().length === 0) {
      Utils.showToast("Pilihan kelas wajib dipilih!", "error");
      return false;
    }

    this.currentUser = {
      studentId: "STD_" + (nisn && nisn.trim().length > 0 ? nisn.trim() : Date.now()),
      nisn: nisn ? nisn.trim() : "-",
      name: name.trim(),
      classCode: classCode.trim(),
      school: school && school.trim().length > 0 ? school.trim() : "SMP",
      points: this.currentUser ? (this.currentUser.points || 0) : 0,
      badges: this.currentUser ? (this.currentUser.badges || ["Pelajar Aktif"]) : ["Pelajar Aktif"]
    };
    this.currentRole = 'student';
    Utils.storage.set('student_identified', true);
    this.saveSession();
    this.updateUserUI();

    if (window.Utils) {
      window.Utils.playComplete();
      window.Utils.showToast(`Identitas tersimpan! Selamat belajar, ${this.currentUser.name}!`, "success");
    }

    // Perbarui status gembok menu secara instan
    if (window.Navigation) {
      window.Navigation.updateMenuLockState();
    }

    // Daftarkan ke spreadsheet backend jika online
    if (window.ApiClient) {
      window.ApiClient.registerStudent(this.currentUser);
    }
    return true;
  },

  // Verifikasi PIN Guru dengan Proteksi Anti Brute-Force & Cloud Sync
  async loginTeacher(pin) {
    // Cek apakah sedang dalam masa lockout
    const lockoutUntil = Utils.storage.get('teacher_lockout_until', 0);
    const now = Date.now();

    if (now < lockoutUntil) {
      const remainingSecs = Math.ceil((lockoutUntil - now) / 1000);
      Utils.showToast(`Akses terkunci sementara! Harap tunggu ${remainingSecs} detik lagi.`, "error");
      return false;
    }

    const trimmedPin = (pin || "").trim();
    const savedPin = Utils.storage.get('teacher_pin', 'guru123');

    // 1. Cek kecocokan PIN di memori lokal perangkat
    if (trimmedPin && trimmedPin === savedPin) {
      return this._grantTeacherAccess();
    }

    // 2. Jika di HP belum sinkron (misal ganti PIN di laptop), verifikasi ke backend cloud Google Apps Script
    if (window.ApiClient && typeof window.ApiClient.isConfigured === 'function' && window.ApiClient.isConfigured()) {
      try {
        const check = await window.ApiClient.verifyTeacherPinOnBackend(trimmedPin);
        if (check && check.success && check.data && check.data.valid) {
          // Sinkronkan PIN baru ke LocalStorage HP ini
          Utils.storage.set('teacher_pin', trimmedPin);
          return this._grantTeacherAccess();
        }
      } catch (e) {
        console.warn("Verifikasi PIN via backend cloud gagal:", e);
      }
    }

    // 3. Jika gagal baik lokal maupun cloud:
    this.failedAttempts++;
    const sisa = this.maxFailedAttempts - this.failedAttempts;

    if (sisa <= 0) {
      // Aktifkan Lockout selama 60 detik
      const lockTime = Date.now() + (this.lockoutSeconds * 1000);
      Utils.storage.set('teacher_lockout_until', lockTime);
      this.failedAttempts = 0;
      Utils.showToast(`Terdeteksi 3 kali salah PIN! Portal dikunci selama ${this.lockoutSeconds} detik demi keamanan.`, "error");
    } else {
      Utils.showToast(`PIN salah! Sisa percobaan: ${sisa} kali sebelum terkunci.`, "warning");
    }
    return false;
  },

  _grantTeacherAccess() {
    this.currentRole = 'teacher';
    this.failedAttempts = 0;
    Utils.storage.remove('teacher_lockout_until');
    this.saveSession();
    this.updateUserUI();
    Utils.showToast("Berhasil masuk sebagai Guru / Pengajar!", "success");
    return true;
  },

  // Mengubah PIN Guru dan menyelaraskan ke Cloud Spreadsheet
  async changeTeacherPin(oldPin, newPin) {
    const savedPin = Utils.storage.get('teacher_pin', 'guru123');

    if (oldPin !== savedPin) {
      // Cek apakah oldPin valid di backend cloud (misal jika PIN diubah dari perangkat lain)
      let oldPinValidOnCloud = false;
      if (window.ApiClient && typeof window.ApiClient.isConfigured === 'function' && window.ApiClient.isConfigured()) {
        try {
          const check = await window.ApiClient.verifyTeacherPinOnBackend(oldPin);
          if (check && check.success && check.data && check.data.valid) {
            oldPinValidOnCloud = true;
          }
        } catch (e) {}
      }

      if (!oldPinValidOnCloud) {
        Utils.showToast("PIN lama Anda salah!", "error");
        return false;
      }
    }

    if (!newPin || newPin.trim().length < 4) {
      Utils.showToast("PIN baru minimal harus 4 karakter!", "error");
      return false;
    }

    const cleanNewPin = newPin.trim();
    Utils.storage.set('teacher_pin', cleanNewPin);

    // Sinkronkan ke Google Apps Script backend jika online
    if (window.ApiClient && typeof window.ApiClient.isConfigured === 'function' && window.ApiClient.isConfigured()) {
      window.ApiClient.changeTeacherPinOnBackend(oldPin, cleanNewPin).then(() => {
        console.log("PIN Guru tersinkron ke cloud Google Apps Script.");
      }).catch(err => {
        console.warn("Gagal sinkron PIN ke cloud:", err);
      });
    }

    Utils.showToast("PIN Guru berhasil diperbarui dengan aman!", "success");
    return true;
  },

  logoutTeacher() {
    this.currentRole = 'student';
    this.saveSession();
    this.updateUserUI();
    Utils.showToast("Sesi Guru telah diakhiri. Kembali ke mode siswa.");
    if (window.Navigation) window.Navigation.navigateTo('home');
  },

  logout() {
    this.currentRole = 'guest';
    this.currentUser = {
      studentId: "GUEST",
      nisn: "-",
      name: "Tamu",
      classCode: "-",
      school: "-"
    };
    this.saveSession();
    this.updateUserUI();
    Utils.showToast("Anda telah keluar.");
  },

  recordQuizAttempt(attempt) {
    if (!this.currentUser) return;
    const history = Utils.storage.get('quiz_attempts', []);
    
    const enrichedAttempt = {
      ...attempt,
      studentId: this.currentUser.studentId,
      studentName: this.currentUser.name,
      classCode: this.currentUser.classCode,
      nisn: this.currentUser.nisn
    };

    history.push(enrichedAttempt);
    Utils.storage.set('quiz_attempts', history);

    this.addPoints(attempt.score);

    if (window.ProgressTracker) {
      window.ProgressTracker.markSectionQuizCompleted(attempt.section, attempt.score);
    }
  },

  addPoints(amount) {
    if (!this.currentUser) return;
    this.currentUser.points = (this.currentUser.points || 0) + amount;
    
    if (this.currentUser.points >= 100 && !this.currentUser.badges.includes("Penjelajah Anatomi")) {
      this.currentUser.badges.push("Penjelajah Anatomi");
      Utils.showToast("🎖️ Lencana Baru: Penjelajah Anatomi!", "warning");
    }
    if (this.currentUser.points >= 250 && !this.currentUser.badges.includes("Pakar Siklus Menstruasi")) {
      this.currentUser.badges.push("Pakar Siklus Menstruasi");
      Utils.showToast("🎖️ Lencana Baru: Pakar Siklus Menstruasi!", "warning");
    }
    if (this.currentUser.points >= 400 && !this.currentUser.badges.includes("Juara Reproduksi Sehat")) {
      this.currentUser.badges.push("Juara Reproduksi Sehat");
      Utils.showToast("🏆 Lencana Tertinggi: Juara Reproduksi Sehat!", "warning");
    }

    this.saveSession();
    this.updateUserUI();
  },

  updateUserUI() {
    const badge = document.getElementById('user-profile-badge');
    const nameEl = document.getElementById('header-user-name');
    const roleEl = document.getElementById('header-user-role');
    const dot = badge ? badge.querySelector('.role-indicator') : null;

    if (this.currentRole === 'teacher') {
      if (nameEl) nameEl.textContent = "Guru / Pengajar";
      if (roleEl) roleEl.textContent = "👨‍🏫 Mode Pendidik";
      if (dot) dot.style.background = "var(--primary)";
    } else if (this.isIdentified()) {
      if (nameEl && this.currentUser) nameEl.textContent = this.currentUser.name;
      if (roleEl) roleEl.textContent = `👤 Siswa (${this.currentUser.classCode || '9-A'})`;
      if (dot) dot.style.background = "var(--success)";
      if (badge) badge.style.borderColor = "#bfdbfe";
    } else {
      if (nameEl) nameEl.textContent = "⚠️ Lengkapi Identitas";
      if (roleEl) roleEl.textContent = "Klik untuk isi Nama & Kelas";
      if (dot) dot.style.background = "var(--danger)";
      if (badge) {
        badge.style.borderColor = "var(--danger)";
        badge.style.background = "#fee2e2";
      }
    }
  }
};

if (typeof window !== "undefined") {
  window.StudentAuth = StudentAuth;
}
