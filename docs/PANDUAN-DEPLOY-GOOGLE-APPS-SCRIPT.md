# Panduan Deployment Google Apps Script & Google Spreadsheet

Dokumen ini memandu Bapak/Ibu Guru untuk menyiapkan database Google Spreadsheet dan men-deploy Google Apps Script sebagai Web App API dalam waktu kurang dari 5 menit.

---

## Langkah 1: Buat Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.google.com).
2. Buat spreadsheet baru dan beri judul: **Database MPI Sistem Reproduksi Siswa**.

---

## Langkah 2: Buka Apps Script Editor
1. Pada menu atas Spreadsheet, klik **Ekstensi (Extensions)** → **Apps Script**.
2. Beri nama proyek di kiri atas: **Backend-MPI-Reproduksi**.

---

## Langkah 3: Masukkan Kode Apps Script
Hapus kode bawaan `myFunction()` pada editor, lalu buat 5 file skrip di Apps Script dengan menekan ikon tanda tambah `+` di samping tulisan **Files**:

1. **`Config.gs`**: Salin seluruh isi dari file `google-apps-script/Config.gs`.
2. **`Spreadsheet.gs`**: Salin seluruh isi dari file `google-apps-script/Spreadsheet.gs`.
3. **`Auth.gs`**: Salin seluruh isi dari file `google-apps-script/Auth.gs`.
4. **`Quiz.gs`**: Salin seluruh isi dari file `google-apps-script/Quiz.gs`.
5. **`Code.gs`**: Salin seluruh isi dari file `google-apps-script/Code.gs`.

Klik tombol **Save (Ikon Disket)** untuk menyimpan seluruh file.

---

## Langkah 4: Inisialisasi 8 Tabel Database Otomatis
1. Pada dropdown fungsi di toolbar atas editor (di samping tombol Run), pilih fungsi: `setupDatabaseSheets`.
2. Klik tombol **Run (Jalankan)**.
3. Google akan meminta persetujuan izin akses pertama kali:
   - Klik **Review Permissions**.
   - Pilih akun Google Anda.
   - Klik **Advanced (Lanjutan)** → Klik **Go to Backend-MPI-Reproduksi (unsafe)**.
   - Klik **Allow (Izinkan)**.
4. Periksa Google Spreadsheet Anda: 8 Sheet (`Students`, `Teachers`, `Classes`, `Questions`, `Attempts`, `Answers`, `Progress`, `Reflections`) dengan warna header profesional telah terbentuk secara otomatis!

---

## Langkah 5: Deploy Sebagai Web App
1. Klik tombol biru **Deploy (Terapkan)** di kanan atas → Pilih **New deployment (Penerapan baru)**.
2. Klik ikon gerigi di kiri tulisan *Select type* → Pilih **Web app**.
3. Isi konfigurasi sebagai berikut:
   - **Description**: `MPI Reproduksi Web App v1`
   - **Execute as**: **Me (email Anda)**
   - **Who has access**: **Anyone (Siapa saja)** *(Sangat penting agar siswa dapat mengirim nilai tanpa harus login akun Google)*.
4. Klik tombol **Deploy**.
5. Salin (Copy) **Web App URL** yang dihasilkan (formatnya: `https://script.google.com/macros/s/.../exec`).

---

## Langkah 6: Sambungkan ke Aplikasi MPI (Dua Cara)

### Cara 1: Otomatis untuk Semua HP Siswa & Guru (Sangat Direkomendasikan untuk GitHub Pages)
Agar seluruh perangkat HP siswa dan HP guru otomatis terhubung ke spreadsheet tanpa harus memasukkan URL satu per satu di setiap gawai:
1. Buka berkas [assets/js/api.js](file:///c:/wamp64/www/MPI3/assets/js/api.js).
2. Pada baris ke-10, masukkan Web App URL Anda ke `defaultGasUrl`:
   ```javascript
   defaultGasUrl: "https://script.google.com/macros/s/AKfycb.../exec",
   ```
3. Simpan berkas lalu *commit* & *push* kembali ke repositori GitHub Pages Anda (`git add . && git commit -m "Set default GAS URL" && git push`).
4. **Hasilnya**: Seluruh HP siswa dan HP guru yang membuka web GitHub Pages langsung otomatis terhubung:
   - Daftar nama kelas terbaru yang dibuat guru langsung tersinkron di dropdown HP siswa.
   - Perubahan PIN Guru langsung terverifikasi secara aman di semua perangkat.
   - Semua rekaman nilai kuis dan refleksi siswa langsung masuk ke Google Sheets.

### Cara 2: Pengaturan Manual per Perangkat (Offline Fallback)
1. Buka aplikasi web MPI di browser.
2. Buka menu **Portal Rekap Nilai Guru** (PIN bawaan: `guru123`).
3. Klik tombol **⚙️ Konfigurasi Spreadsheet API**.
4. Tempelkan (Paste) Web App URL tadi, lalu klik **🔍 Uji Koneksi** dan klik **Simpan Konfigurasi**.
5. Selesai! Kini setiap kali siswa menyelesaikan kuis atau mengisi refleksi, data nilai akan langsung tersimpan di Google Spreadsheet Anda secara *real-time*.

---

## ⚠️ Penting Saat Memperbarui Kode Google Apps Script:
Jika Anda memperbarui kode di Google Apps Script (misalnya menambahkan fitur `getClasses` atau sinkronisasi PIN):
1. Buka editor Google Apps Script.
2. Klik tombol **Deploy** → **Manage deployments** (Kelola penerapan).
3. Klik ikon pensil (**Edit**).
4. Pada menu *Version*, pilih **New version** (Versi baru).
5. Klik **Deploy** dan gunakan Web App URL tersebut. Hal ini memastikan script Google Anda mengeksekusi kode versi terbaru.
