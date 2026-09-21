/**
 * MODUL MATERI A.2: SISTEM REPRODUKSI PEREMPUAN
 * Serta Bank Soal Evaluasi A.3 Ayo Uji Kemampuan
 * Kurikulum Merdeka - IPA Fase D SMP/MTs
 */

const REPRODUCTIVE_FEMALE_DATA = {
  id: "reproductive-female",
  title: "A.2 Sistem Reproduksi Perempuan",
  subtitle: "Memahami struktur organ reproduksi wanita, ovarium, oviduk, rahim, dan proses ovulasi.",
  overview: `Sistem reproduksi perempuan bertugas menghasilkan sel telur (ovum), memfasilitasi terjadinya fertilisasi (pembuahan), menjadi tempat pertumbuhan dan perkembangan janin selama masa kehamilan, serta memproduksi hormon estrogen dan progesteron.`,

  organs: [
    {
      id: "ovarium",
      name: "Ovarium (Indung Telur)",
      category: "Organ Dalam",
      function: "Menghasilkan sel telur (ovum) serta hormon estrogen dan progesteron.",
      description: "Ovarium berjumlah sepasang (kanan dan kiri) berbentuk bulat lonjong sebesar buah almond di dalam rongga panggul. Di dalam ovarium terdapat ribuan folikel pelindung sel telur yang berkembang secara bergantian setiap bulannya setelah pubertas.",
      keyFact: "Umumnya salah satu ovarium melepaskan satu ovum matang setiap 28 hari dalam proses yang disebut ovulasi.",
      coords: { x: 190, y: 220 }
    },
    {
      id: "fimbriae",
      name: "Fimbriae (Rumbai Penangkap)",
      category: "Organ Dalam",
      function: "Menangkap sel telur yang baru saja dilepaskan oleh ovarium saat ovulasi.",
      description: "Struktur berumbai menyerupai jari-jemari halus yang berada di ujung corong (infundibulum) tuba falopi dan melambai dekat dengan permukaan ovarium.",
      keyFact: "Gerakan silia dan rumbai fimbriae menyapu sel telur masuk ke dalam saluran tuba falopi.",
      coords: { x: 160, y: 210 }
    },
    {
      id: "tuba_falopi",
      name: "Tuba Falopi / Oviduk (Saluran Telur)",
      category: "Organ Dalam",
      function: "Saluran tempat terjadinya fertilisasi (pembuahan sel telur oleh sperma).",
      description: "Sepasang saluran tabung berotot halus sepanjang sekitar 10-12 cm yang menghubungkan masing-masing ovarium dengan rahim. Dinding dalamnya dilapisi sel bersilia yang bergetar mendorong sel telur menuju rahim.",
      keyFact: "Pembuahan (fertilisasi) normal terjadi di sepertiga bagian atas saluran tuba falopi (ampula).",
      coords: { x: 230, y: 170 }
    },
    {
      id: "uterus",
      name: "Uterus (Rahim)",
      category: "Organ Dalam",
      function: "Tempat menempel (implantasi) dan berkembangnya janin selama masa kehamilan 9 bulan.",
      description: "Organ berongga berbentuk seperti buah pir terbalik dengan dinding otot tebal dan sangat elastis. Pada wanita yang belum pernah melahirkan, panjangnya sekitar 7-8 cm dan dapat meregang ratusan kali lipat saat mengandung janin.",
      keyFact: "Otot dinding rahim (miometrium) adalah salah satu jaringan otot terkuat dalam tubuh manusia.",
      coords: { x: 300, y: 230 }
    },
    {
      id: "endometrium",
      name: "Endometrium (Lapisan Dalam Rahim)",
      category: "Lapisan Rahim",
      function: "Lapisan kaya pembuluh darah tempat zigot menanamkan diri; meluruh saat menstruasi jika tidak ada pembuahan.",
      description: "Lapisan mukosa bagian dalam rahim yang menebal dan menipis mengikuti siklus hormon bulanan. Menyediakan nutrisi awal bagi embrio sebelum plasenta terbentuk sempurna.",
      keyFact: "Jika sel telur tidak dibuahi, kadar hormon progesteron turun dan lapisan endometrium ini luruh menjadi darah menstruasi.",
      coords: { x: 300, y: 255 }
    },
    {
      id: "serviks",
      name: "Serviks (Leher Rahim)",
      category: "Organ Dalam",
      function: "Pintu masuk dari vagina menuju rahim serta menghasilkan lendir kesuburan.",
      description: "Bagian tersempit di bagian bawah rahim yang menghubungkannya dengan rongga vagina. Memiliki bukaan kecil yang dapat meregang hingga 10 cm saat proses persalinan alami.",
      keyFact: "Kanker serviks merupakan salah satu penyakit reproduksi yang dapat dicegah dengan vaksinasi HPV dan pola hidup bersih.",
      coords: { x: 300, y: 310 }
    },
    {
      id: "vagina",
      name: "Vagina (Saluran Kelahiran)",
      category: "Organ Luar/Penghubung",
      function: "Saluran persalinan, jalan keluarnya darah menstruasi, dan organ kopulasi.",
      description: "Saluran berotot dan elastis sepanjang sekitar 8-10 cm yang menghubungkan leher rahim dengan bagian luar tubuh. Lingkungan di dalam vagina bersifat asam alami untuk mencegah pertumbuhan kuman jahat.",
      keyFact: "Dinding vagina memiliki lipatan-lipatan (rugae) yang memungkinkannya mengembang saat melahirkan bayi.",
      coords: { x: 300, y: 360 }
    },
    {
      id: "vulva",
      name: "Vulva & Labia",
      category: "Organ Luar",
      function: "Melindungi pintu masuk saluran reproduksi dan uretra dari kotoran dan infeksi.",
      description: "Bagian terluar dari sistem reproduksi wanita yang tampak dari luar, mencakup bibir besar (labia mayora), bibir kecil (labia minora), klitoris, dan muara uretra.",
      keyFact: "Saluran pengeluaran urine (uretra) pada wanita terpisah sama sekali dari saluran reproduksi (vagina).",
      coords: { x: 300, y: 400 }
    }
  ],

  // Oogenesis Sederhana
  oogenesis: {
    title: "Proses Pembentukan Sel Telur (Oogenesis)",
    intro: "Oogenesis adalah proses pembentukan ovum di dalam ovarium. Berbeda dengan pria yang memproduksi sperma terus menerus sejak pubertas, pembentukan bakal sel telur wanita sudah dimulai sejak janin perempuan berada dalam kandungan ibunya!",
    stages: [
      {
        order: 1,
        name: "Oogonium (2n)",
        type: "Masa Janin",
        desc: "Sel induk diploid membelah secara mitosis di ovarium janin perempuan menghasilkan jutaan oosit primer."
      },
      {
        order: 2,
        name: "Oosit Primer (2n)",
        type: "Dorman / Istirahat",
        desc: "Memulai Meiosis I tetapi berhenti sementara pada tahap profase I hingga anak perempuan memasuki usia pubertas."
      },
      {
        order: 3,
        name: "Oosit Sekunder (n) & Badan Polar I",
        type: "Saat Pubertas / Ovulasi",
        desc: "Setiap bulan satu oosit primer melanjutkan meiosis I menghasilkan 1 oosit sekunder besar (membawa banyak sitoplasma) dan 1 badan polar kecil."
      },
      {
        order: 4,
        name: "Ovum (n) & Badan Polar II",
        type: "Fertilisasi",
        desc: "Jika ada sperma yang membuahi, meiosis II diselesaikan menghasilkan 1 ovum fungsional matang dan badan kutub yang meluruh."
      }
    ],
    flowSummary: "Ovarium (Ovulasi) → Fimbriae → Tuba Falopi (Tempat Fertilisasi) → Uterus / Rahim (Implantasi Embrio)"
  },

  flashcards: [
    {
      front: "Ovarium",
      back: "Organ yang menghasilkan sel telur (ovum) serta hormon estrogen dan progesteron.",
      category: "Organ Wanita"
    },
    {
      front: "Tuba Falopi (Oviduk)",
      back: "Saluran tempat bertemunya sperma dan sel telur (lokasi fertilisasi).",
      category: "Organ Wanita"
    },
    {
      front: "Uterus (Rahim)",
      back: "Organ berotot elastis tempat embrio menempel dan berkembang menjadi janin selama masa kehamilan.",
      category: "Organ Wanita"
    },
    {
      front: "Endometrium",
      back: "Lapisan dinding dalam rahim yang kaya pembuluh darah dan meluruh saat menstruasi bila tidak ada pembuahan.",
      category: "Organ Wanita"
    },
    {
      front: "Ovulasi",
      back: "Peristiwa pelepasan sel telur (oosit sekunder) yang telah matang dari ovarium ke tuba falopi.",
      category: "Proses Fisiologis"
    }
  ]
};

/**
 * BANK SOAL EVALUASI BAGIAN A (10 Soal HOTS Kurikulum Merdeka)
 * Ayo Uji Kemampuan Bagian A
 */
const QUIZ_SECTION_A = [
  {
    id: "qa-01",
    section: "A",
    type: "mcq",
    question: "Suhu di dalam skrotum laki-laki umumnya berkisar 2-3°C lebih rendah dibandingkan dengan suhu inti tubuh. Mengapa adaptasi suhu ini sangat penting bagi sistem reproduksi laki-laki?",
    options: [
      "Mencegah terjadinya infeksi bakteri pada kandung kemih",
      "Memastikan kondisi lingkungan yang optimal untuk pembentukan sel sperma (spermatogenesis)",
      "Membantu mempercepat pengeluaran urine saat suhu lingkungan dingin",
      "Melindungi saluran uretra dari gesekan saat beraktivitas"
    ],
    correctAnswer: 1,
    explanation: "Tubulus seminiferus di dalam testis memerlukan suhu sekitar 34-35°C (2-3°C di bawah suhu inti tubuh normal 37°C) agar enzim pembentukan sperma dapat bekerja secara optimal.",
    difficulty: "Sedang"
  },
  {
    id: "qa-02",
    section: "A",
    type: "mcq",
    question: "Seorang siswa mengamati skema saluran reproduksi pria. Urutan yang tepat dilalui oleh sel sperma sejak pertama kali dibentuk hingga dikeluarkan dari tubuh adalah...",
    options: [
      "Testis → Vas Deferens → Epididimis → Uretra",
      "Epididimis → Testis → Uretra → Vas Deferens",
      "Testis → Epididimis → Vas Deferens → Uretra",
      "Vas Deferens → Testis → Epididimis → Uretra"
    ],
    correctAnswer: 2,
    explanation: "Sperma dibentuk di tubulus seminiferus testis, kemudian dimatangkan di epididimis, dialirkan melalui saluran vas deferens, dan dikeluarkan melalui uretra.",
    difficulty: "Mudah"
  },
  {
    id: "qa-03",
    section: "A",
    type: "mcq",
    question: "Kelenjar reproduksi pria yang berfungsi menghasilkan cairan kental kaya zat fruktosa sebagai sumber energi bagi pergerakan sel sperma adalah...",
    options: [
      "Kelenjar Prostat",
      "Vesikula Seminalis",
      "Kelenjar Cowper (Bulbouretra)",
      "Kelenjar Hipofisis"
    ],
    correctAnswer: 1,
    explanation: "Vesikula seminalis menghasilkan cairan yang mengandung fruktosa, asam askorbat, dan prostaglandin yang menyediakan energi untuk gerakan ekor (flagela) sperma.",
    difficulty: "Mudah"
  },
  {
    id: "qa-04",
    section: "A",
    type: "mcq",
    question: "Pada sistem reproduksi perempuan, proses pembuahan (fertilisasi) bertemunya sel sperma dan sel telur normalnya terjadi pada organ...",
    options: [
      "Ovarium",
      "Dinding Rahim (Endometrium)",
      "Tuba Falopi (Oviduk)",
      "Vagina"
    ],
    correctAnswer: 2,
    explanation: "Fertilisasi terjadi di sepertiga atas saluran tuba falopi (ampula). Setelah terbentuk zigot, zigot akan berjalan menuju rahim untuk berimplantasi.",
    difficulty: "Mudah"
  },
  {
    id: "qa-05",
    section: "A",
    type: "mcq",
    question: "Apabila sel telur yang diovulasikan oleh ovarium tidak dibuahi oleh sel sperma, peristiwa fisiologis yang akan terjadi pada dinding rahim adalah...",
    options: [
      "Endometrium akan terus menebal untuk menyimpan cadangan makanan",
      "Dinding endometrium akan meluruh bersama darah dan sel telur yang hancur (menstruasi)",
      "Oviduk akan menyerap kembali seluruh jaringan endometrium",
      "Uretra akan menyalurkan ovum keluar bersama air seni"
    ],
    correctAnswer: 1,
    explanation: "Bila tidak terjadi pembuahan, korpus luteum akan menyusut sehingga kadar hormon progesteron turun drastis. Akibatnya, dinding endometrium kehilangan penyangga dan meluruh sebagai menstruasi.",
    difficulty: "Sedang"
  },
  {
    id: "qa-06",
    section: "A",
    type: "mcq",
    question: "Perbedaan mendasar antara proses spermatogenesis pada laki-laki dan oogenesis pada perempuan yang tepat adalah...",
    options: [
      "Spermatogenesis menghasilkan 1 sel fungsional, sedangkan oogenesis menghasilkan 4 sel fungsional",
      "Spermatogenesis menghasilkan 4 spermatozoa fungsional, sedangkan oogenesis menghasilkan 1 ovum fungsional dan badan polar",
      "Spermatogenesis terjadi secara mitosis saja, sedangkan oogenesis meiosis saja",
      "Spermatogenesis berhenti saat pubertas, sedangkan oogenesis baru dimulai"
    ],
    correctAnswer: 1,
    explanation: "Spermatogenesis menghasilkan 4 sel sperma fungsional berflagel dari satu spermatogonium, sedangkan oogenesis menghasilkan hanya 1 sel telur (ovum) fungsional berukuran besar dan 3 badan polar kecil yang meluruh.",
    difficulty: "Sulit"
  },
  {
    id: "qa-07",
    section: "A",
    type: "mcq",
    question: "Organ reproduksi perempuan yang memiliki otot paling kuat dan elastis untuk menampung dan melindungi perkembangan janin selama masa kehamilan adalah...",
    options: [
      "Serviks",
      "Uterus (Rahim)",
      "Tuba Falopi",
      "Ovarium"
    ],
    correctAnswer: 1,
    explanation: "Uterus (rahim) tersusun atas dinding otot miometrium yang sangat elastis sehingga mampu meregang sesuai pertumbuhan janin hingga saat melahirkan.",
    difficulty: "Mudah"
  },
  {
    id: "qa-08",
    section: "A",
    type: "mcq",
    question: "Perhatikan fungsi organ berikut: (1) Menghasilkan ovum, (2) Menghasilkan hormon estrogen, (3) Menghasilkan hormon progesteron. Organ yang memiliki ketiga fungsi tersebut adalah...",
    options: [
      "Uterus",
      "Oviduk",
      "Ovarium",
      "Vagina"
    ],
    correctAnswer: 2,
    explanation: "Ovarium adalah gonad pada perempuan yang memiliki dua fungsi utama: memproduksi gamet (ovum) dan menyekresikan hormon kelamin wanita (estrogen & progesteron).",
    difficulty: "Sedang"
  },
  {
    id: "qa-09",
    section: "A",
    type: "mcq",
    question: "Pada laki-laki, uretra memiliki fungsi ganda sebagai saluran pengeluaran urine dan saluran reproduksi. Hal yang mencegah urine dan cairan sperma keluar secara bersamaan adalah...",
    options: [
      "Kerja katup sfingter otot polos yang menutup saluran urine saat ejakulasi secara otomatis",
      "Kelenjar Cowper yang menyumbat kandung kemih",
      "Suhu skrotum yang menghentikan pembentukan urine",
      "Hormon testosteron yang mengencerkan urine"
    ],
    correctAnswer: 0,
    explanation: "Terdapat sfingter (otot cincin) di pangkal kandung kemih yang akan berkontraksi secara refleks saat terjadi ejakulasi, sehingga sperma dan urine tidak pernah bercampur.",
    difficulty: "Sedang"
  },
  {
    id: "qa-10",
    section: "A",
    type: "mcq",
    question: "Bagian ujung corong saluran tuba falopi yang memiliki rumbai-rumbai halus untuk menangkap sel telur yang dilepaskan saat ovulasi dinamakan...",
    options: [
      "Endometrium",
      "Fimbriae",
      "Serviks",
      "Myometrium"
    ],
    correctAnswer: 1,
    explanation: "Fimbriae adalah struktur berbentuk rumbai-rumbai mirip jari di ujung tuba falopi yang berfungsi aktif menyapu dan menangkap oosit sekunder saat lepas dari ovarium.",
    difficulty: "Mudah"
  }
];

if (typeof window !== "undefined") {
  window.REPRODUCTIVE_FEMALE_DATA = REPRODUCTIVE_FEMALE_DATA;
  window.QUIZ_SECTION_A = QUIZ_SECTION_A;
}
