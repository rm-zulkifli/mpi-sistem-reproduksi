# Panduan Penggunaan Aplikasi untuk Guru & Pendidik

Panduan ini ditujukan bagi Guru Mata Pelajaran IPA SMP/MTs untuk memanfaatkan Media Pembelajaran Interaktif (MPI) Sistem Reproduksi Manusia dalam kegiatan pembelajaran tatap muka maupun Pembelajaran Jarak Jauh (PJJ).

---

## 1. Peran Aplikasi dalam Kurikulum Merdeka (Fase D)
Aplikasi ini dikembangkan untuk mendukung Capaian Pembelajaran (CP) IPA Fase D:
- **Tujuan Pembelajaran 1**: Mengidentifikasi struktur organ reproduksi laki-laki dan perempuan beserta fungsi fisiologisnya.
- **Tujuan Pembelajaran 2**: Menganalisis tahapan siklus menstruasi dan koordinasi hormonal (FSH, LH, estrogen, progesteron) secara santun dan saintifik.
- **Tujuan Pembelajaran 3**: Memahami tahapan siklus hidup manusia (kehamilan, balita, anak, pubertas remaja, dewasa) serta menginternalisasi batasan privasi tubuh (*body boundary*).
- **Tujuan Pembelajaran 4**: Mengenal prinsip dasar keluarga berencana, jenis-jenis kontrasepsi, dan pencegahan Infeksi Menular Seksual (IMS) serta pola hidup bersih dan sehat.

---

## 2. Mengakses Portal Rekap Nilai Guru
1. Pada sidebar kiri bagian bawah, klik tombol **👨‍🏫 Portal Rekap Nilai Guru**.
2. Masukkan PIN Guru:
   - **PIN Bawaan**: `guru123`
3. Setelah login, Anda akan melihat antarmuka Dashboard Guru dengan fitur:
   - **Metrik Utama**: Total pengerjaan latihan, rata-rata skor siswa, jumlah siswa tuntas KKM (≥ 75), dan status sinkronisasi Google Spreadsheet.
   - **Filter Latihan**: Memilah hasil pengerjaan berdasarkan materi (Bagian A, B, C, atau D).
   - **Tabel Nilai Realtime**: Menampilkan nama siswa, kelas, waktu pengerjaan, skor, dan status kelulusan.
   - **Ekspor CSV**: Mengunduh seluruh data rekapitulasi ke format spreadsheet (.csv) yang kompatibel dengan Microsoft Excel dan Google Sheets.

### 2.1 Manajemen Nama Kelas & Rombel Siswa (Fitur Baru)
Guru dapat menyesuaikan nama-nama kelas/rombel yang dapat dipilih oleh siswa saat mengisi formulir identitas:
1. Klik tombol **🏫 Kelola Nama Kelas** di bagian atas Dashboard Guru atau lihat kartu **🏫 Manajemen Nama Kelas & Rombel Siswa**.
2. **Mengubah Nama Kelas**:
   - Klik tombol **✏️ Ubah Nama** pada baris kelas yang diinginkan (misalnya mengubah `9-A` menjadi `Kelas IX-A` atau `Kelas 9 Unggulan Biologi`).
   - Masukkan nama baru dan kode kelas, lalu klik **Simpan Perubahan**.
   - Nama kelas pada formulir pendaftaran siswa akan langsung terbarui secara instan.
3. **Menambah Kelas Baru**:
   - Klik tombol **➕ Tambah Kelas Baru**.
   - Masukkan nama kelas (misal: `Kelas 9-E`) dan kode singkat rombel (misal: `9-E`).
4. **Menghapus Kelas**:
   - Klik tombol **🗑️ Hapus** pada baris kelas yang ingin dihilangkan (minimal tersisa 1 kelas).
5. **Mereset ke Standar**:
   - Klik tombol **🔄 Reset ke Standar** jika ingin mengembalikan daftar kelas ke setelan bawaan kurikulum (`Kelas 9-A` sampai `8-B`).
6. **Filter Ganda Nilai**:
   - Di tabel rekapitulasi nilai, guru dapat memfilter tampilan nilai berdasarkan **Bagian Materi** dan **Kelas Tertentu** secara bersamaan.
7. **Sinkronisasi Otomatis**:
   - Jika endpoint Google Apps Script telah diatur, daftar kelas akan otomatis disinkronkan ke sheet `Classes` di Google Spreadsheet.

---

## 3. Strategi Pembelajaran di Kelas (Sintaks Discovery Learning & PJBL)
- **Fase Stimulasi**: Guru menampilkan Simulator Siklus Menstruasi 28 Hari pada proyektor LCD dan meminta siswa menebak apa yang terjadi pada hari ke-14.
- **Fase Eksplorasi Mandiri**: Siswa membuka modul melalui smartphone atau komputer laboratorium sekolah, mengeksplorasi diagram interaktif organ pria dan wanita, serta memainkan flashcards.
- **Fase Asesmen Formatif**: Siswa mengerjakan *Ayo Uji Kemampuan* Bagian A, B, C, dan D secara mandiri dengan batasan timer.
- **Fase Refleksi**: Siswa mengisi *Lembar Refleksi Diri 3-2-1*. Guru dapat meninjau pertanyaan siswa pada sheet `Reflections` untuk dibahas bersama di akhir sesi.

---

## 4. Keamanan Data & Privasi Peserta Didik
- Aplikasi tidak menyimpan password atau data pribadi sensitif siswa.
- Identitas yang dicatat hanya sebatas Nama, NISN/Kode Siswa, dan Kelas.
- Siswa hanya dapat melihat hasil belajarnya sendiri di perangkatnya, sedangkan guru memiliki rekapitulasi kolektif di spreadsheet.
