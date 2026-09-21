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

## Langkah 6: Sambungkan ke Aplikasi MPI
1. Buka aplikasi web MPI Sistem Reproduksi Manusia di browser.
2. Buka menu **Portal Rekap Nilai Guru** (PIN: `guru123`).
3. Klik tombol **⚙️ Konfigurasi Spreadsheet API**.
4. Tempelkan (Paste) Web App URL tadi, lalu klik **🔍 Uji Koneksi** dan klik **Simpan Konfigurasi**.
5. Selesai! Kini setiap kali siswa menyelesaikan kuis atau mengisi refleksi, data nilai akan langsung tersimpan di Google Spreadsheet Anda secara *real-time*.
