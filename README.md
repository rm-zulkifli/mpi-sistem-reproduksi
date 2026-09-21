# Media Pembelajaran Interaktif (MPI) Sistem Reproduksi Manusia
### SMP/MTs — Kurikulum Merdeka — Fase D (Versi Profesional — PJJ Ready)

[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)](#)
[![Kurikulum](https://img.shields.io/badge/Kurikulum-Merdeka%20Fase%20D-blue.svg)](#)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20PJJ%20%7C%20Offline-orange.svg)](#)
[![Backend](https://img.shields.io/badge/Database-Google%20Spreadsheet%20%2B%20GAS-green.svg)](#)

Aplikasi web **Media Pembelajaran Interaktif (MPI) Sistem Reproduksi Manusia** dirancang khusus untuk siswa SMP/MTs Fase D dalam Kurikulum Merdeka. Aplikasi ini menggabungkan penjelasan ilmiah yang santun, diagram anatomi interaktif SVG, simulator siklus menstruasi 28 hari berbasis HTML5 Canvas, gamifikasi laboratorium mini, asesmen mandiri dengan penilaian otomatis, sertifikat digital kelulusan, serta integrasi database Google Spreadsheet via Google Apps Script (GAS).

---

## 🌟 Fitur Utama Aplikasi

### 1. Struktur Materi Lengkap Sesuai Kurikulum Merdeka
- **Bagian A: Sistem Reproduksi Laki-laki & Perempuan**
  - **A.1 Sistem Reproduksi Laki-laki**: Anatomi luar & dalam (penis, skrotum, testis, epididimis, vas deferens, vesikula seminalis, prostat, cowper, uretra) + spermatogenesis + diagram anatomi hotspot + mini game susun alur sperma.
  - **A.2 Sistem Reproduksi Perempuan**: Anatomi internal & eksternal (ovarium, fimbriae, tuba falopi, uterus, endometrium, serviks, vagina, vulva) + oogenesis + ovulasi + diagram anatomi hotspot.
  - **A.3 Ayo Uji Kemampuan Bagian A**: 10 butir soal pilihan ganda HOTS lengkap dengan pembahasan.
- **Bagian B: Siklus Menstruasi**
  - Pemahaman 4 fase (Menstruasi, Folikular/Proliferasi, Ovulasi, Luteal/Sekretori).
  - Variasi siklus biologis normal (21-35 hari) & manajemen kebersihan diri remaja (MHM).
  - **Simulator Dinamis 28 Hari**: Slider interaktif hari 1 s.d. 28 dengan visualisasi kurva 4 hormon (FSH, LH, Estrogen, Progesteron) dan respon ketebalan dinding rahim (endometrium).
  - **Ayo Uji Kemampuan Bagian B**: 10 butir soal pilihan ganda HOTS & interpretasi grafik hormon.
- **Bagian C: Siklus Hidup Manusia**
  - **C.1 Kehamilan dan Bayi**: Fertilisasi di tuba falopi, perkembangan embrio & janin (trimester 1-3), peran plasenta, dan asupan gizi ibu hamil.
  - **C.2 Anak-anak**: Tumbuh kembang fisik, motorik kasar/halus, kognitif, bahasa, dan pola hidup sehat.
  - **C.3 Remaja dan Pubertas**: Perubahan kelamin primer & sekunder pria dan wanita, hormon, mitos vs fakta seputar pubertas, edukasi batasan privasi tubuh (*body boundary*), dan detektif studi kasus remaja.
  - **C.4 Dewasa**: Kematangan fungsi reproduksi, stabilitas emosi, dan tanggung jawab gaya hidup sehat.
  - **C.5 Ayo Uji Kemampuan Bagian C**: 15 butir soal pilihan ganda HOTS.
- **Bagian D: Keluarga Berencana & Kesehatan Reproduksi**
  - **D.1 Kontrasepsi & Kesehatan Reproduksi**: Tujuan mulia perencanaan keluarga, prinsip kerja 4 kelompok kontrasepsi (alami, penghalang mekanik, hormonal, mantap/permanen), konsultasi medis, serta pencegahan Infeksi Menular Seksual (IMS) dan HIV/AIDS.
  - **Ayo Uji Kemampuan Bagian D**: 10 butir soal pilihan ganda HOTS.
- **Evaluasi Diri: Lembar Refleksi Pembelajaran Siswa (Metode 3-2-1)**
  - Mengisi 3 hal baru, 2 hal menarik, dan 1 pertanyaan lanjutan yang tercatat ke memori dan database guru.

### 2. Gamifikasi & Interaktivitas Edukatif
- **Pemain Flashcard Flip 3D**: Menghafal istilah biologi, fungsi organ, dan konsep hormon dengan fitur balik kartu, navigasi, dan acak urutan.
- **Efek Suara Sintetis Web Audio API**: Suara klik, jawaban benar, jawaban salah, dan fanfare kelulusan disintesis langsung oleh browser tanpa membutuhkan file audio eksternal (100% bebas error tautan rusak).
- **Efek Taburan Confetti**: Perayaan kelulusan KKM pada canvas HTML5 ringan.
- **Sertifikat Digital Apresiasi Belajar**: Otomatis dapat dicetak atau disimpan ke format PDF jika siswa meraih nilai ≥ 75.

### 3. Sistem Akun & Portal Rekapitulasi Guru
- **Siswa**: Login identitas (Nama Lengkap, NISN, Kelas, Sekolah), progres materi tersimpan di *localStorage*.
- **Guru**: Dilindungi PIN (`guru123`), menampilkan dashboard total siswa, rata-rata nilai, siswa tuntas KKM, filter bagian materi, dan ekspor data nilai ke file CSV/Excel.
- **Database Google Spreadsheet**: 8 Sheet otomatis (`Students`, `Teachers`, `Classes`, `Questions`, `Attempts`, `Answers`, `Progress`, `Reflections`) via Google Apps Script Web App.

---

## 📂 Struktur Berkas Proyek

```
c:/wamp64/www/MPI3/
├── index.html                           # Shell utama aplikasi web
├── README.md                            # Dokumentasi umum
├── LICENSE                              # Lisensi MIT
├── assets/
│   ├── css/
│   │   ├── style.css                    # Styling utama, tema biru-hijau-oranye edukatif
│   │   ├── responsive.css               # Responsivitas layar desktop, tablet, smartphone
│   │   └── accessibility.css            # Aksesibilitas WCAG 2.1 AA (kontras, pembesar teks)
│   ├── js/
│   │   ├── app.js                       # Entry point & orchestrator aplikasi
│   │   ├── navigation.js                # Router tampilan halaman, modal guru, & breadcrumb
│   │   ├── classes.js                   # Manajemen nama kelas & rombel oleh guru
│   │   ├── auth.js                      # Autentikasi siswa & sesi portal guru
│   │   ├── progress.js                  # Pelacak capaian progres belajar
│   │   ├── api.js                       # Client komunikasi Google Apps Script & offline fallback
│   │   └── utils.js                     # Sintesis audio, kanvas confetti, formatters
│   ├── content/
│   │   ├── reproductive-male.js         # Modul A.1 & data organ pria
│   │   ├── reproductive-female.js       # Modul A.2 & Bank Soal Bagian A (10 soal)
│   │   ├── menstruation.js              # Modul B, data siklus 28 hari, Bank Soal B (10 soal)
│   │   ├── life-cycle.js                # Modul C.1 - C.4 & Bank Soal Bagian C (15 soal)
│   │   └── family-planning.js           # Modul D.1 & Bank Soal Bagian D (10 soal)
│   └── components/
│       ├── interactive-diagram.js       # Diagram SVG anatomi pria & wanita dengan hotspot
│       ├── interactive-cycle.js         # Simulator siklus 28 hari (kurva hormon & dinding rahim)
│       ├── interactive-activities.js    # Flashcards, susun alur sperma, studi kasus pubertas
│       └── quiz-card.js                 # Engine kuis, timer, acak soal, skor, pembahasan
├── google-apps-script/
│   ├── Code.gs                          # Router doGet & doPost Web App
│   ├── Config.gs                        # Konfigurasi nama tabel & respons JSON
│   ├── Spreadsheet.gs                   # Inisialisasi otomatis 8 sheet database
│   ├── Auth.gs                          # Handler pendaftaran siswa & pencatatan refleksi
│   └── Quiz.gs                          # Validasi kuis & perhitungan nilai server-side
└── docs/
    ├── PANDUAN-INSTALASI.md             # Panduan menjalankan di komputer lokal / WAMP
    ├── PANDUAN-DEPLOY-GITHUB-PAGES.md   # Panduan deployment gratis ke GitHub Pages
    ├── PANDUAN-DEPLOY-GOOGLE-APPS-SCRIPT.md # Panduan setup spreadsheet & Web App
    ├── PANDUAN-PENGGUNAAN-GURU.md       # Panduan lengkap guru & strategi kelas
    ├── PANDUAN-PENGGUNAAN-SISWA.md      # Panduan belajar mandiri untuk siswa
    └── LAPORAN-PENGUJIAN.md             # Laporan hasil Quality Assurance (QA)
```

---

## 🚀 Cara Menjalankan

### Menjalankan Secara Offline / Lokal:
Cukup klik ganda pada file `index.html` menggunakan peramban web modern apa pun (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Menjalankan Melalui WAMP / Localhost:
Buka peramban di alamat: `http://localhost/MPI3/`

### Deployment Online ke GitHub Pages:
Ikuti panduan lengkap pada [docs/PANDUAN-DEPLOY-GITHUB-PAGES.md](docs/PANDUAN-DEPLOY-GITHUB-PAGES.md).

### Menghubungkan ke Google Spreadsheet Guru:
Ikuti panduan 5 menit pada [docs/PANDUAN-DEPLOY-GOOGLE-APPS-SCRIPT.md](docs/PANDUAN-DEPLOY-GOOGLE-APPS-SCRIPT.md).
PIN Guru default: `guru123`.

---

## 📄 Lisensi
Proyek ini dilisensikan di bawah lisensi MIT. Bebas digunakan, dikembangkan, dan dimanfaatkan untuk memajukan pendidikan IPA di seluruh Indonesia.
