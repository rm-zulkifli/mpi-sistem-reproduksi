/**
 * MANAJEMEN KELAS & ROMBEL SISWA (classes.js)
 * Memungkinkan Guru untuk:
 * 1. Mengubah nama kelas yang ada (misal: 9-A -> IX-A atau 9-Unggulan)
 * 2. Menambah kelas baru
 * 3. Menghapus kelas
 * 4. Mereset ke daftar kelas bawaan
 * 5. Berjalan 100% OFFLINE (LocalStorage), sinkronisasi ke Google Spreadsheet opsional
 */

const ClassManager = {
  storageKey: 'mpi_class_list',

  // Daftar kelas bawaan kurikulum
  defaultClasses: [
    { id: "9-A", name: "Kelas 9-A" },
    { id: "9-B", name: "Kelas 9-B" },
    { id: "9-C", name: "Kelas 9-C" },
    { id: "9-D", name: "Kelas 9-D" },
    { id: "8-A", name: "Kelas 8-A" },
    { id: "8-B", name: "Kelas 8-B" }
  ],

  init() {
    let classes = null;
    try {
      classes = Utils.storage.get(this.storageKey);
    } catch (e) {
      console.warn("Storage read error:", e);
    }

    if (!classes || !Array.isArray(classes) || classes.length === 0) {
      this.saveAll(this.defaultClasses, false);
    } else {
      this.populateAllSelects();
    }
  },

  getAll() {
    try {
      const list = Utils.storage.get(this.storageKey, this.defaultClasses);
      if (Array.isArray(list) && list.length > 0) return list;
    } catch (e) {
      console.warn("ClassManager.getAll error:", e);
    }
    return this.defaultClasses;
  },

  saveAll(classes, sync = true) {
    try {
      Utils.storage.set(this.storageKey, classes);
    } catch (e) {
      console.error("Gagal menyimpan kelas ke LocalStorage:", e);
    }
    this.populateAllSelects();

    // SINKRONISASI KE GOOGLE SPREADSHEET (Hanya jika guru telah menyambungkan Web App URL)
    // Offline tetap berfungsi normal tanpa konfigurasi spreadsheet
    if (sync && window.ApiClient && typeof window.ApiClient.isConfigured === 'function' && window.ApiClient.isConfigured()) {
      window.ApiClient.updateClasses(classes).catch(err => {
        console.warn("Sinkronisasi spreadsheet ditangguhkan (offline mode):", err);
      });
    }
  },

  // Tambah kelas baru
  addClass(className, classId = null) {
    const name = (className || '').trim();
    if (!name) {
      if (window.Utils) window.Utils.showToast("Nama kelas tidak boleh kosong!", "error");
      return false;
    }

    const classes = this.getAll();
    // Jika classId tidak ditentukan, buat dari nama kelas secara otomatis
    let id = (classId || '').trim().toUpperCase();
    if (!id) {
      id = name.replace(/[^a-zA-Z0-9]/g, '-').toUpperCase().replace(/-+/g, '-').replace(/^-|-$/g, '');
    }
    if (!id) {
      id = "KLS-" + (classes.length + 1);
    }

    // Cek duplikasi
    const exists = classes.some(c => c.id.toLowerCase() === id.toLowerCase() || c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      if (window.Utils) window.Utils.showToast(`Kelas "${name}" atau kode "${id}" sudah ada!`, "warning");
      return false;
    }

    classes.push({ id, name });
    this.saveAll(classes, true);

    if (window.Utils) {
      window.Utils.playTone(660, 'sine', 0.15);
      window.Utils.showToast(`Kelas "${name}" (${id}) berhasil ditambahkan!`, "success");
    }
    return true;
  },

  // Ubah nama dan/atau kode kelas
  updateClass(index, newName, newId = null) {
    const classes = this.getAll();
    if (index < 0 || index >= classes.length) {
      if (window.Utils) window.Utils.showToast("Kelas tidak ditemukan!", "error");
      return false;
    }

    const name = (newName || '').trim();
    if (!name) {
      if (window.Utils) window.Utils.showToast("Nama kelas baru tidak boleh kosong!", "error");
      return false;
    }

    const oldClass = classes[index];
    let id = (newId || oldClass.id).trim().toUpperCase();
    if (!id) id = oldClass.id;

    // Cek duplikasi selain index saat ini
    const conflict = classes.some((c, idx) => idx !== index && (c.id.toLowerCase() === id.toLowerCase() || c.name.toLowerCase() === name.toLowerCase()));
    if (conflict) {
      if (window.Utils) window.Utils.showToast("Nama atau kode kelas sudah digunakan oleh kelas lain!", "warning");
      return false;
    }

    const oldId = oldClass.id;
    classes[index] = { id, name };
    this.saveAll(classes, true);

    // Update profil siswa jika sedang memakai kelas yang diubah
    if (window.StudentAuth && window.StudentAuth.currentUser) {
      if (window.StudentAuth.currentUser.classCode === oldId) {
        window.StudentAuth.currentUser.classCode = id;
        window.StudentAuth.saveSession();
        window.StudentAuth.updateUserUI();
      }
    }

    // Update rekaman pengerjaan kuis lokal yang menggunakan oldId agar rekapitulasi tetap akurat
    const attempts = Utils.storage.get('quiz_attempts', []);
    let updatedAttempts = false;
    attempts.forEach(a => {
      if (a.classCode === oldId) {
        a.classCode = id;
        updatedAttempts = true;
      }
    });
    if (updatedAttempts) {
      Utils.storage.set('quiz_attempts', attempts);
    }

    if (window.Utils) {
      window.Utils.playTone(700, 'sine', 0.15);
      window.Utils.showToast(`Nama kelas berhasil diubah menjadi "${name}"!`, "success");
    }
    return true;
  },

  // Hapus kelas
  deleteClass(index) {
    const classes = this.getAll();
    if (classes.length <= 1) {
      if (window.Utils) window.Utils.showToast("Minimal harus tersisa 1 kelas dalam sistem!", "warning");
      return false;
    }

    if (index < 0 || index >= classes.length) return false;

    const removed = classes.splice(index, 1)[0];
    this.saveAll(classes, true);

    if (window.Utils) {
      window.Utils.showToast(`Kelas "${removed.name}" berhasil dihapus.`, "info");
    }
    return true;
  },

  // Pulihkan kelas ke daftar awal
  resetDefaults() {
    this.saveAll(this.defaultClasses, true);
    if (window.Utils) {
      window.Utils.showToast("Daftar kelas berhasil dipulihkan ke setelan default!", "success");
    }
  },

  // Isi elemen select dengan daftar kelas saat ini
  populateSelect(selectElement, selectedValue = null) {
    if (!selectElement) return;
    const classes = this.getAll();
    const currentVal = selectedValue || selectElement.value;

    selectElement.innerHTML = classes.map(c => `
      <option value="${c.id}" ${c.id === currentVal ? 'selected' : ''}>${c.name}</option>
    `).join('');
  },

  // Refresh semua dropdown kelas di aplikasi
  populateAllSelects() {
    // 1. Dropdown Form Identitas Siswa
    const studentSelect = document.getElementById('input-student-class');
    if (studentSelect) {
      const curStudent = window.StudentAuth && window.StudentAuth.currentUser ? window.StudentAuth.currentUser.classCode : null;
      this.populateSelect(studentSelect, curStudent);
    }

    // 2. Dropdown Filter Kelas di Dashboard Guru (jika ada)
    const filterClassSelect = document.getElementById('filter-class');
    if (filterClassSelect) {
      const currentFilter = filterClassSelect.value;
      const classes = this.getAll();
      filterClassSelect.innerHTML = `
        <option value="ALL">Semua Kelas</option>
        ${classes.map(c => `
          <option value="${c.id}" ${c.id === currentFilter ? 'selected' : ''}>${c.name}</option>
        `).join('')}
      `;
    }
  },

  // Hitung jumlah siswa per kelas dari attempts yang ada
  getClassStats() {
    const attempts = Utils.storage.get('quiz_attempts', []);
    const stats = {};
    const classes = this.getAll();

    classes.forEach(c => {
      stats[c.id] = {
        name: c.name,
        attemptsCount: 0,
        uniqueStudents: new Set()
      };
    });

    attempts.forEach(a => {
      if (stats[a.classCode]) {
        stats[a.classCode].attemptsCount++;
        if (a.studentName) {
          stats[a.classCode].uniqueStudents.add(a.studentName);
        }
      }
    });

    return stats;
  }
};

// Pastikan terexpose secara global di objek window
if (typeof window !== "undefined") {
  window.ClassManager = ClassManager;
}
