# Panduan Deployment ke GitHub Pages (100% Gratis)

Aplikasi Media Pembelajaran Interaktif (MPI) ini dirancang tanpa ketergantungan server runtime berat (PHP/Node.js di frontend) sehingga dapat dihosting langsung dan gratis melalui **GitHub Pages**.

---

## Langkah 1: Buat Repository Baru di GitHub
1. Buka [GitHub.com](https://github.com) dan login ke akun Anda.
2. Klik tombol **New Repository**.
3. Beri nama repository, misalnya: `mpi-sistem-reproduksi-manusia`.
4. Pilih status **Public**.
5. Jangan centang *Add a README file* (karena repository lokal sudah memilikinya).
6. Klik **Create repository**.

---

## Langkah 2: Unggah Berkas Proyek

### Cara A: Melalui Git CLI (Direkomendasikan)
Buka terminal pada folder proyek Anda (`c:/wamp64/www/MPI3`), lalu jalankan perintah:

```bash
git init
git add .
git commit -m "Inisialisasi aplikasi MPI Sistem Reproduksi Manusia SMP Kurikulum Merdeka"
git branch -M main
git remote add origin https://github.com/USERNAME_ANDA/mpi-sistem-reproduksi-manusia.git
git push -u origin main
```

### Cara B: Melalui Web GitHub (Upload Files)
1. Pada halaman repository baru Anda, klik tautan **uploading an existing file**.
2. Tarik (drag & drop) seluruh isi folder proyek:
   - `index.html`
   - Folder `assets/` (beserta isinya)
   - Folder `google-apps-script/`
   - Folder `docs/`
   - `README.md`
3. Klik tombol hijau **Commit changes**.

---

## Langkah 3: Mengaktifkan GitHub Pages
1. Masuk ke tab **Settings** pada repository GitHub Anda.
2. Pada panel navigasi kiri, pilih menu **Pages** (di bawah bagian *Code and automation*).
3. Pada bagian **Build and deployment**:
   - **Source**: Pilih `Deploy from a branch`.
   - **Branch**: Pilih `main`, dan folder pilih `/(root)`.
4. Klik tombol **Save**.

---

## Langkah 4: Akses Aplikasi Online
1. Tunggu sekitar 1 hingga 2 menit agar GitHub Actions selesai melakukan deployment.
2. Refresh halaman Settings Pages Anda. Akan muncul kotak hijau bertuliskan:
   > **Your site is live at `https://USERNAME_ANDA.github.io/mpi-sistem-reproduksi-manusia/`**
3. Bagikan tautan tersebut kepada siswa untuk pembelajaran jarak jauh (PJJ) atau pembelajaran mandiri di rumah!
