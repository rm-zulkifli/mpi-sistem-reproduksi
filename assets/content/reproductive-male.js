/**
 * MODUL MATERI A.1: SISTEM REPRODUKSI LAKI-LAKI
 * Kurikulum Merdeka - IPA Fase D SMP/MTs
 */

const REPRODUCTIVE_MALE_DATA = {
  id: "reproductive-male",
  title: "A.1 Sistem Reproduksi Laki-laki",
  subtitle: "Mengenal struktur organ reproduksi, fungsi kelenjar pendukung, dan proses pembentukan sperma.",
  overview: `Sistem reproduksi laki-laki dirancang khusus untuk menghasilkan, mematangkan, dan mengantarkan sel kelamin jantan (sperma) serta menghasilkan hormon reproduksi utama yaitu testosteron. Sistem ini tersusun atas organ bagian luar dan organ bagian dalam yang bekerja secara terpadu dan saling melengkapi.`,
  
  // Organ-organ utama & penjelasannya
  organs: [
    {
      id: "penis",
      name: "Penis",
      category: "Organ Luar",
      function: "Saluran keluarnya urine dan sperma (saluran kencing sekaligus ejakulasi).",
      description: "Penis tersusun atas jaringan spons erektil yang kaya pembuluh darah dan ujung saraf perasa. Bagian luar penis dilapisi kulit dan pada ujungnya terdapat glans penis. Saluran di dalam penis disebut uretra.",
      keyFact: "Memiliki jaringan erektil berongga yang dapat terisi darah saat terjadi ereksi secara alami.",
      coords: { x: 230, y: 310 }
    },
    {
      id: "skrotum",
      name: "Skrotum",
      category: "Organ Luar",
      function: "Membungkus testis dan mengatur suhu testis agar optimal bagi produksi sperma.",
      description: "Skrotum adalah kantong kulit yang menggantung di luar rongga tubuh di belakang penis. Suhu di dalam skrotum dipertahankan sekitar 2-3°C lebih rendah daripada suhu inti tubuh normal (sekitar 34-35°C), yang merupakan kondisi ideal bagi spermatogenesis.",
      keyFact: "Dapat mengerut mendekati tubuh saat dingin dan mengendur saat panas untuk menjaga kestabilan suhu testis.",
      coords: { x: 260, y: 360 }
    },
    {
      id: "testis",
      name: "Testis (Buah Zakar)",
      category: "Organ Dalam",
      function: "Menghasilkan sel sperma (spermatozoa) dan hormon testosteron.",
      description: "Testis berjumlah sepasang (kiri dan kanan) berbentuk oval yang berada di dalam kantong skrotum. Di dalam testis terdapat saluran halus melilit-lilit sepanjang ratusan meter yang disebut tubulus seminiferus, tempat pembentukan sel sperma berlangsung.",
      keyFact: "Laki-laki sehat dapat memproduksi jutaan hingga ratusan juta sel sperma setiap harinya.",
      coords: { x: 275, y: 345 }
    },
    {
      id: "epididimis",
      name: "Epididimis",
      category: "Organ Dalam",
      function: "Tempat penyimpanan sementara dan pematangan sel sperma.",
      description: "Saluran berkelok-kelok panjang yang menempel di bagian belakang masing-masing testis. Sel sperma muda dari tubulus seminiferus bergerak ke epididimis untuk memperoleh motilitas (daya gerak renang) dan kemampuan membuahi selama kurun waktu 2-3 minggu.",
      keyFact: "Sperma yang belum matang belum bisa bergerak lurus; di epididimis ekor sperma berkembang sempurna.",
      coords: { x: 285, y: 320 }
    },
    {
      id: "vas_deferens",
      name: "Vas Deferens (Saluran Sperma)",
      category: "Organ Dalam",
      function: "Mengangkut sperma matang dari epididimis menuju uretra.",
      description: "Saluran tabung berotot panjang yang bergerak naik dari skrotum masuk ke rongga panggul, melingkari kandung kemih. Dinding ototnya berkontraksi mendorong sperma saat terjadi ejakulasi.",
      keyFact: "Pada prosedur kontrasepsi mantap laki-laki (vasektomi), saluran vas deferens ini dipotong dan diikat secara medis.",
      coords: { x: 290, y: 240 }
    },
    {
      id: "vesikula_seminalis",
      name: "Vesikula Seminalis (Kantung Semen)",
      category: "Kelenjar Aksesori",
      function: "Menghasilkan cairan nutrisi basa yang kaya fruktosa untuk energi sperma.",
      description: "Sepasang kantung kelenjar yang terletak di bagian belakang bawah kandung kemih. Cairan yang dihasilkan membentuk sekitar 60-70% volume cairan semen, bersifat basa (alkalis) untuk menetralkan keasaman saluran reproduksi wanita.",
      keyFact: "Fruktosa pada cairan ini berfungsi sebagai bahan bakar energi utama bagi gerakan ekor sperma.",
      coords: { x: 330, y: 220 }
    },
    {
      id: "kelenjar_prostat",
      name: "Kelenjar Prostat",
      category: "Kelenjar Aksesori",
      function: "Menghasilkan cairan keputihan encer untuk melindungi dan meningkatkan kelangsungan hidup sperma.",
      description: "Kelenjar berbentuk sebesar buah kenari yang melingkari pangkal uretra tepat di bawah kandung kemih. Menghasilkan cairan yang mengandung enzim dan sitrat, membantu mobilitas sperma.",
      keyFact: "Ukuran prostat dapat membesar seiring bertambahnya usia pada pria dewasa.",
      coords: { x: 295, y: 260 }
    },
    {
      id: "kelenjar_cowper",
      name: "Kelenjar Cowper (Bulbouretra)",
      category: "Kelenjar Aksesori",
      function: "Menghasilkan lendir pembersih uretra dan pelumas sebelum ejakulasi.",
      description: "Sepasang kelenjar kecil seukuran kacang polong yang terletak di sepanjang uretra di bawah prostat. Mengeluarkan cairan bening kental yang membersihkan sisa urine asam di dalam uretra sebelum sperma melintas.",
      keyFact: "Sifat cairan Cowper yang basa menetralkan jejak asam urine yang mematikan bagi sperma.",
      coords: { x: 280, y: 280 }
    },
    {
      id: "uretra",
      name: "Uretra",
      category: "Saluran Akhir",
      function: "Saluran bersama untuk pengeluaran urine dari kandung kemih dan semen dari sistem reproduksi.",
      description: "Saluran pipa yang membentang dari leher kandung kemih melalui kelenjar prostat dan sepanjang batang penis hingga bermuara di ujung penis.",
      keyFact: "Terdapat katup otot otomatis (sfingter) yang mencegah urine dan semen keluar secara bersamaan.",
      coords: { x: 245, y: 295 }
    }
  ],

  // Spermatogenesis Konsep Sederhana SMP
  spermatogenesis: {
    title: "Proses Pembentukan Sperma (Spermatogenesis)",
    intro: "Spermatogenesis adalah proses pembelahan sel induk hingga menjadi sel sperma matang yang terjadi di dalam tubulus seminiferus testis mulai masa pubertas hingga sepanjang hayat pria.",
    stages: [
      {
        order: 1,
        name: "Spermatogonium (2n)",
        type: "Sel Induk Diploid",
        desc: "Sel induk diploid (memiliki 23 pasang / 46 kromosom) membelah diri secara mitosis memperbanyak diri."
      },
      {
        order: 2,
        name: "Spermatosit Primer (2n)",
        type: "Pertumbuhan",
        desc: "Spermatogonium tumbuh membesar mempersiapkan pembelahan reduksi pertama (Meiosis I)."
      },
      {
        order: 3,
        name: "Spermatosit Sekunder (n)",
        type: "Meiosis I (Haploid)",
        desc: "Dihasilkan 2 sel spermatosit sekunder haploid (masing-masing membawa 23 kromosom tunggal)."
      },
      {
        order: 4,
        name: "Spermatid (n)",
        type: "Meiosis II",
        desc: "Masing-masing membelah kembali secara Meiosis II menghasilkan 4 sel spermatid bulat yang belum memiliki ekor."
      },
      {
        order: 5,
        name: "Spermatozoa (n)",
        type: "Diferensiasi (Spermiogenesis)",
        desc: "Spermatid berdiferensiasi membentuk bagian kepala berisi inti genetik, bagian leher berisi mitokondria, dan flagelum (ekor renang)."
      }
    ],
    flowSummary: "Testis (Tubulus Seminiferus) → Epididimis (Pematangan) → Vas Deferens → Saluran Ejakulasi (+ Cairan Kelenjar) → Uretra Penis"
  },

  // Flashcards untuk menghafal istilah
  flashcards: [
    {
      front: "Testis",
      back: "Organ tempat pembentukan sel sperma dan penghasil hormon testosteron.",
      category: "Organ Pria"
    },
    {
      front: "Skrotum",
      back: "Kantong pembungkus testis yang menjaga suhunya 2-3°C lebih rendah dari suhu tubuh.",
      category: "Organ Pria"
    },
    {
      front: "Epididimis",
      back: "Saluran berkelok tempat pematangan dan penyimpanan sementara sel sperma.",
      category: "Organ Pria"
    },
    {
      front: "Vas Deferens",
      back: "Saluran panjang yang mengangkut sperma matang dari epididimis menuju uretra.",
      category: "Organ Pria"
    },
    {
      front: "Vesikula Seminalis",
      back: "Kelenjar yang menghasilkan cairan nutrisi kaya fruktosa untuk energi gerak sperma.",
      category: "Organ Pria"
    },
    {
      front: "Hormon Testosteron",
      back: "Hormon kelamin utama laki-laki yang memicu pertumbuhan ciri seksual primer dan sekunder saat pubertas.",
      category: "Hormon Pria"
    }
  ]
};

// Ekspor ke window global untuk ketersediaan di browser tanpa bundler
if (typeof window !== "undefined") {
  window.REPRODUCTIVE_MALE_DATA = REPRODUCTIVE_MALE_DATA;
}
