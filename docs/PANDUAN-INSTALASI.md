# Panduan Instalasi dan Menjalankan Aplikasi

Aplikasi Media Pembelajaran Interaktif (MPI) Sistem Reproduksi Manusia dapat dijalankan dengan berbagai metode fleksibel sesuai fasilitas yang tersedia di sekolah.

---

## Opsi 1: Menjalankan Langsung di Komputer Sekolah (Offline / Direct Browser)
Aplikasi ini 100% *self-contained* (tanpa memerlukan build tools seperti npm atau webpack).
1. Buka folder `c:/wamp64/www/MPI3` pada File Explorer Windows.
2. Klik ganda file `index.html`.
3. Aplikasi akan langsung terbuka di browser default (Google Chrome, Microsoft Edge, Mozilla Firefox) dan seluruh fitur interaktif (diagram SVG, simulator canvas, audio synth) berfungsi optimal tanpa koneksi internet.

---

## Opsi 2: Menjalankan Melalui Local Web Server (WAMP / XAMPP)
Jika komputer laboratorium sekolah terhubung dalam jaringan LAN lokal (Local Area Network):
1. Pastikan WAMP Server atau XAMPP telah aktif (ikon hijau di system tray).
2. Letakkan folder aplikasi di direktori web root:
   - WAMP: `c:/wamp64/www/MPI3/`
   - XAMPP: `c:/xampp/htdocs/MPI3/`
3. Komputer server guru dapat membuka browser di alamat:
   `http://localhost/MPI3/`
4. Komputer siswa di ruang laboratorium yang terhubung jaringan lokal dapat mengakses via IP Server guru, contoh:
   `http://192.168.1.100/MPI3/`

---

## Opsi 3: Menjalankan Melalui GitHub Pages (Online / PJJ)
Lihat panduan lengkap pada berkas: [PANDUAN-DEPLOY-GITHUB-PAGES.md](PANDUAN-DEPLOY-GITHUB-PAGES.md).
Dengan GitHub Pages, siswa dapat membuka aplikasi dari smartphone masing-masing di mana saja dan kapan saja secara gratis.
