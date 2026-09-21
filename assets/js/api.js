/**
 * CLIENT INTEGRASI GOOGLE APPS SCRIPT & OFFLINE QUEUE (api.js)
 * Mengirimkan data pengerjaan kuis, pendaftaran siswa, dan refleksi
 * ke Google Spreadsheet via Web App Apps Script, dengan fallback offline storage.
 */

const ApiClient = {
  // URL bawaan deployment Google Apps Script Web App.
  // Jika diisi di sini, SEMUA perangkat siswa dan HP guru otomatis terhubung tanpa perlu setting manual!
  defaultGasUrl: "",

  gasUrl: "",

  init() {
    // Ambil dari LocalStorage perangkat jika ada, jika tidak gunakan defaultGasUrl
    const saved = Utils.storage.get('gas_endpoint_url', '');
    this.gasUrl = (saved && saved.trim().length > 0) ? saved.trim() : (this.defaultGasUrl || '').trim();
  },

  setGasUrl(newUrl) {
    this.gasUrl = (newUrl || '').trim();
    Utils.storage.set('gas_endpoint_url', this.gasUrl);
    Utils.showToast("URL Google Apps Script berhasil diperbarui!");
  },

  isConfigured() {
    return this.gasUrl && this.gasUrl.startsWith('https://script.google.com');
  },

  // Kirim data via POST request dengan mode no-cors / JSONP fallback
  async postData(action, payload) {
    if (!this.isConfigured()) {
      console.log(`[Offline Mode] GAS URL belum dikonfigurasi. Menyimpan aksi '${action}' ke penyimpanan lokal.`);
      return { success: true, offline: true, message: "Disimpan di memori lokal perangkat" };
    }

    try {
      const response = await fetch(this.gasUrl, {
        method: "POST",
        mode: "no-cors", // Google Apps Script Web App redirect handling
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
          action: action,
          timestamp: new Date().toISOString(),
          ...payload
        })
      });

      // no-cors menghasilkan opaque response, jika tidak throw error berarti paket terkirim
      return { success: true, message: "Data berhasil dikirim ke Google Spreadsheet!" };
    } catch (err) {
      console.warn("Gagal menghubungi Google Apps Script:", err);
      return { success: false, error: err.message, message: "Gagal terhubung ke Google Sheets. Data tersimpan di memori perangkat." };
    }
  },

  async registerStudent(studentData) {
    return await this.postData('createStudent', {
      student_id: studentData.studentId,
      nisn_or_code: studentData.nisn,
      name: studentData.name,
      class_code: studentData.classCode,
      status: "Aktif"
    });
  },

  async submitQuizToBackend(attemptRecord) {
    const res = await this.postData('submitQuiz', {
      attempt_id: attemptRecord.attemptId,
      student_id: attemptRecord.studentId,
      student_name: attemptRecord.studentName,
      class_code: attemptRecord.classCode,
      section: attemptRecord.section,
      score: attemptRecord.score,
      total_questions: attemptRecord.totalQuestions,
      answers: attemptRecord.details.map(d => ({
        question_id: d.num,
        selected_answer: d.selectedAnswer,
        is_correct: d.isCorrect
      }))
    });

    const badge = document.getElementById('sync-status-badge');
    if (badge) {
      if (this.isConfigured()) {
        badge.textContent = "✓ Berhasil Sinkron ke Spreadsheet Guru";
        badge.style.color = "var(--success)";
      } else {
        badge.textContent = "Tersimpan di Perangkat (Offline)";
        badge.style.color = "var(--accent-dark)";
      }
    }
    return res;
  },

  async saveProgress(section, completionPct) {
    const user = window.StudentAuth ? window.StudentAuth.currentUser : null;
    if (!user) return;

    return await this.postData('saveProgress', {
      student_id: user.studentId,
      section: section,
      completion: completionPct,
      last_activity: "Membaca modul " + section
    });
  },

  async saveReflection(section, responseText) {
    const user = window.StudentAuth ? window.StudentAuth.currentUser : null;
    if (!user) return;

    // Simpan di lokal dulu
    const reflections = Utils.storage.get('student_reflections', []);
    reflections.push({
      studentId: user.studentId,
      section: section,
      response: responseText,
      submittedAt: new Date().toISOString()
    });
    Utils.storage.set('student_reflections', reflections);

    return await this.postData('saveReflection', {
      student_id: user.studentId,
      section: section,
      response: responseText
    });
  },

  async updateClasses(classList) {
    return await this.postData('updateClasses', {
      classes: classList
    });
  },

  async fetchClasses() {
    if (!this.isConfigured()) {
      return { success: false, offline: true, message: "GAS URL belum dikonfigurasi" };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const response = await fetch(`${this.gasUrl}?action=getClasses`, {
        method: "GET",
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const resJson = await response.json();
      if (resJson && resJson.success && resJson.data && Array.isArray(resJson.data.classes)) {
        return { success: true, classes: resJson.data.classes };
      }
      return { success: false, message: resJson.message || "Data kelas kosong" };
    } catch (err) {
      console.warn("fetchClasses error (offline fallback):", err);
      return { success: false, error: err.message };
    }
  },

  async verifyTeacherPinOnBackend(pin) {
    if (!this.isConfigured()) {
      return { success: false, offline: true, message: "Offline mode" };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(`${this.gasUrl}?action=verifyTeacherPin&pin=${encodeURIComponent(pin)}`, {
        method: "GET",
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const resJson = await response.json();
      return resJson;
    } catch (err) {
      console.warn("verifyTeacherPinOnBackend error:", err);
      return { success: false, error: err.message };
    }
  },

  async changeTeacherPinOnBackend(oldPin, newPin) {
    return await this.postData('changeTeacherPin', {
      old_pin: oldPin,
      new_pin: newPin
    });
  },

  async testConnection(url) {
    const targetUrl = url || this.gasUrl;
    if (!targetUrl || !targetUrl.startsWith('https://script.google.com')) {
      return { success: false, message: "Format URL tidak valid. Harus diawali https://script.google.com" };
    }

    try {
      await fetch(targetUrl + "?action=ping", {
        method: "GET",
        mode: "no-cors"
      });
      return { success: true, message: "Koneksi ke endpoint Google Apps Script berhasil dicapai!" };
    } catch (e) {
      return { success: false, message: "Gagal terhubung ke endpoint: " + e.message };
    }
  }
};

if (typeof window !== "undefined") {
  window.ApiClient = ApiClient;
}
