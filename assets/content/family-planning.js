/**
 * MODUL MATERI D: KELUARGA BERENCANA & KESEHATAN REPRODUKSI
 * D.1 Kontrasepsi dan Kesehatan Reproduksi
 * Serta Bank Soal Evaluasi Bagian D (10 Soal HOTS)
 * Kurikulum Merdeka - IPA Fase D SMP/MTs
 */

const FAMILY_PLANNING_DATA = {
  id: "family-planning",
  title: "D. Keluarga Berencana & Kesehatan Reproduksi",
  subtitle: "Memahami konsep perencanaan keluarga, prinsip kerja metode kontrasepsi, pencegahan IMS, serta menjaga kesehatan reproduksi.",
  overview: `Keluarga Berencana (KB) adalah upaya mengatur kelahiran anak, jarak dan usia ideal melahirkan, serta mengatur kehamilan melalui promosi, perlindungan, dan bantuan sesuai hak reproduksi untuk mewujudkan keluarga yang berkualitas dan sejahtera lahir batin.`,

  principles: [
    {
      title: "1. Pengertian dan Tujuan KB",
      desc: "Tujuan utama program KB bukan semata-mata membatasi jumlah anak, melainkan merencanakan masa depan keluarga secara matang: menjaga kesehatan fisik dan mental ibu, menjamin kecukupan kasih sayang dan gizi bagi anak, serta mewujudkan kesejahteraan ekonomi keluarga."
    },
    {
      title: "2. Pengertian Kontrasepsi",
      desc: "Kontrasepsi berasal dari kata 'kontra' (melawan/mencegah) dan 'konsepsi' (pembuahan). Kontrasepsi adalah cara, alat, atau obat yang digunakan oleh pasangan suami istri dewasa untuk mencegah terjadinya pembuahan sel telur oleh sperma."
    },
    {
      title: "3. Klasifikasi Metode Kontrasepsi",
      methods: [
        {
          name: "Metode Alami (Tanpa Alat/Obat)",
          principle: "Menghindari hubungan suami istri pada masa subur wanita (fase ovulasi).",
          examples: "Metode Kalender (Knaus-Ogino), Metode Suhu Basal Tubuh, dan Metode Amenore Laktasi (MAL - menyusui eksklusif).",
          prosCons: "Bebas efek samping obat, namun membutuhkan ketelitian tinggi dan rentan gagal jika siklus haid tidak teratur."
        },
        {
          name: "Metode Penghalang / Mekanik (Barrier)",
          principle: "Mencegah secara fisik sel sperma agar tidak dapat masuk ke dalam rahim dan tuba falopi.",
          examples: "Kondom (pria/wanita), Diafragma, serta IUD / AKDR (Alat Kontrasepsi Dalam Rahim) yang dipasang di rahim oleh tenaga medis.",
          prosCons: "Kondom memiliki keunggulan ganda karena mampu mencegah kehamilan sekaligus mencegah penularan Infeksi Menular Seksual (IMS/HIV). IUD efektif untuk jangka panjang (3-8 tahun)."
        },
        {
          name: "Metode Kimiawi & Hormonal",
          principle: "Menggunakan hormon sintetis (progestin atau kombinasi progestin-estrogen) untuk mencegah ovulasi, mengentalkan lendir leher rahim, dan menipiskan endometrium sehingga sperma sulit lewat.",
          examples: "Pil KB harian, Suntik KB (1 bulan atau 3 bulan), dan Implan/Susuk yang dipasang di bawah kulit lengan.",
          prosCons: "Tingkat efektivitas pencegahan kehamilan sangat tinggi (>99%), namun memerlukan kedisiplinan jadwal dan dapat memicu perubahan siklus haid sementara."
        },
        {
          name: "Metode Mantap / Permanen (Sterilisasi)",
          principle: "Tindakan bedah kecil medis untuk memutus atau mengikat saluran gamet secara permanen bagi pasangan yang sudah cukup memiliki anak.",
          examples: "Vasektomi (pemotongan/pengikatan vas deferens pada pria) dan Tubektomi (pemotongan/pengikatan tuba falopi pada wanita).",
          prosCons: "Bersifat permanen dan memiliki efektivitas hampir 100%, tidak mempengaruhi hormon seksual atau gairah tubuh."
        }
      ]
    },
    {
      title: "4. Pentingnya Konsultasi Tenaga Kesehatan",
      desc: "Tidak ada satu metode kontrasepsi yang cocok untuk semua orang secara seragam. Pemilihan metode kontrasepsi untuk orang dewasa harus disesuaikan dengan kondisi medis individu, usia, riwayat penyakit, serta dilakukan atas konsultasi langsung dengan dokter atau bidan yang berkompeten."
    },
    {
      title: "5. Pencegahan Infeksi Menular Seksual (IMS)",
      desc: "Kesehatan reproduksi mencakup pencegahan berbagai penyakit infeksi menular, seperti Gonore (kencing nanah akibat bakteri Neisseria gonorrhoeae), Sifilis (bakteri Treponema pallidum), Herpes genitalis, dan HIV/AIDS (virus perusak sistem kekebalan tubuh). Remaja dicegah dari risiko IMS dengan membentengi diri melalui nilai moral keagamaan, setia pada pasangan sah setelah menikah, menjauhi pergaulan bebas, dan tidak menyalahgunakan narkoba suntik."
    }
  ],

  flashcards: [
    {
      front: "Keluarga Berencana (KB)",
      back: "Upaya mengatur kehamilan, jarak anak, dan usia melahirkan demi kesehatan ibu, kecukupan gizi anak, dan kesejahteraan keluarga.",
      category: "Keluarga Berencana"
    },
    {
      front: "Kontrasepsi",
      back: "Metode, alat, atau obat yang digunakan pasangan suami istri untuk mencegah terjadinya pembuahan (konsepsi).",
      category: "Keluarga Berencana"
    },
    {
      front: "Vasektomi",
      back: "Metode kontrasepsi mantap pada pria dengan memotong dan mengikat saluran vas deferens sehingga cairan semen tidak mengandung sperma.",
      category: "Kontrasepsi Mantap"
    },
    {
      front: "Tubektomi",
      back: "Metode kontrasepsi permanen pada wanita dengan mengikat saluran tuba falopi sehingga sel telur tidak dapat bertemu sperma.",
      category: "Kontrasepsi Mantap"
    },
    {
      front: "IUD (Alat Kontrasepsi Dalam Rahim)",
      back: "Alat kecil berbentuk T berbahan tembaga yang dipasang dokter di dalam rahim untuk mencegah implantasi embrio.",
      category: "Alat Kontrasepsi"
    },
    {
      front: "Kondom",
      back: "Metode kontrasepsi mekanik yang memiliki keunggulan ganda: mencegah kehamilan sekaligus mencegah penularan IMS/HIV.",
      category: "Kesehatan Reproduksi"
    }
  ]
};

/**
 * BANK SOAL EVALUASI BAGIAN D (10 Soal HOTS Kurikulum Merdeka)
 * Ayo Uji Kemampuan Bagian D
 */
const QUIZ_SECTION_D = [
  {
    id: "qd-01",
    section: "D",
    type: "mcq",
    question: "Tujuan utama program Keluarga Berencana (KB) yang dicanangkan oleh pemerintah ditinjau dari aspek kesehatan keluarga adalah...",
    options: [
      "Melarang setiap pasangan untuk memiliki anak laki-laki",
      "Menjaga kesehatan fisik dan mental ibu, mengatur jarak kelahiran anak, serta menjamin tumbuh kembang anak optimal",
      "Menghilangkan fungsi sistem reproduksi manusia secara total",
      "Menurunkan angka harapan hidup masyarakat"
    ],
    correctAnswer: 1,
    explanation: "KB bertujuan mulia untuk merencanakan keluarga sehat sejahtera, menurunkan angka kematian ibu dan bayi, serta mencegah stunting melalui jarak kelahiran yang ideal.",
    difficulty: "Mudah"
  },
  {
    id: "qd-02",
    section: "D",
    type: "mcq",
    question: "Prinsip kerja dasar dari metode kontrasepsi mekanik penghalang (seperti kondom atau diafragma) adalah...",
    options: [
      "Mematikan ovarium agar tidak menghasilkan sel telur",
      "Secara fisik merintangi sel sperma agar tidak dapat masuk dan bertemu dengan sel telur",
      "Mengubah sifat genetik sel kelamin",
      "Menaikkan suhu tubuh secara drastis"
    ],
    correctAnswer: 1,
    explanation: "Metode mekanik (barrier) bekerja sebagai pelindung fisik yang menghalangi sperma berenang memasuki saluran reproduksi wanita.",
    difficulty: "Mudah"
  },
  {
    id: "qd-03",
    section: "D",
    type: "mcq",
    question: "Tindakan medis berupa pemotongan dan pengikatan saluran vas deferens pada pria agar sperma tidak keluar bersama semen dinamakan...",
    options: [
      "Tubektomi",
      "Vasektomi",
      "Sirkumsisi",
      "Implantasi"
    ],
    correctAnswer: 1,
    explanation: "Vasektomi (dari kata 'vas deferens') adalah sterilisasi pada pria dengan menutup saluran vas deferens.",
    difficulty: "Mudah"
  },
  {
    id: "qd-04",
    section: "D",
    type: "mcq",
    question: "Sementara itu, tindakan pengikatan atau pemotongan pada saluran tuba falopi (oviduk) pada perempuan dikenal dengan istilah medis...",
    options: [
      "Vasektomi",
      "Tubektomi",
      "Biopsi",
      "Kuretase"
    ],
    correctAnswer: 1,
    explanation: "Tubektomi (dari kata 'tuba') adalah sterilisasi permanen pada wanita dengan mengikat/memotong tuba falopi sehingga ovum tidak dapat dibuahi sperma.",
    difficulty: "Mudah"
  },
  {
    id: "qd-05",
    section: "D",
    type: "mcq",
    question: "Alat kontrasepsi yang memiliki manfaat ganda, yaitu tidak hanya mencegah kehamilan tetapi juga paling efektif mencegah penularan Infeksi Menular Seksual (IMS) dan HIV adalah...",
    options: [
      "Pil KB",
      "Kondom",
      "Suntik KB",
      "Susuk (Implan)"
    ],
    correctAnswer: 1,
    explanation: "Kondom adalah satu-satunya alat kontrasepsi yang bekerja mencegah pertukaran cairan tubuh secara fisik, sehingga melindungi dari bakteri dan virus IMS/HIV.",
    difficulty: "Mudah"
  },
  {
    id: "qd-06",
    section: "D",
    type: "mcq",
    question: "Prinsip kerja dari kontrasepsi hormonal (seperti pil KB harian atau suntik KB) dalam tubuh wanita adalah...",
    options: [
      "Menyumbat uretra secara mekanis",
      "Mencegah pelepasan sel telur dari ovarium (menghambat ovulasi) dan mengentalkan lendir leher rahim",
      "Menghilangkan darah menstruasi untuk selamanya",
      "Mempercepat pergerakan sperma"
    ],
    correctAnswer: 1,
    explanation: "Hormon sintetik progestin/estrogen memberikan umpan balik negatif ke otak untuk menekan pelepasan FSH dan LH, sehingga ovulasi tidak terjadi dan lendir serviks mengental.",
    difficulty: "Sedang"
  },
  {
    id: "qd-07",
    section: "D",
    type: "mcq",
    question: "IUD (Intrauterine Device) atau AKDR adalah alat kecil fleksibel berbentuk huruf T yang dipasang di dalam organ...",
    options: [
      "Ovarium",
      "Uterus (Rahim)",
      "Vagina",
      "Uretra"
    ],
    correctAnswer: 1,
    explanation: "AKDR/IUD dipasang oleh bidan/dokter terlatih di dalam rongga rahim (uterus) untuk mencegah implantasi embrio.",
    difficulty: "Mudah"
  },
  {
    id: "qd-08",
    section: "D",
    type: "mcq",
    question: "Mengapa pemilihan metode kontrasepsi bagi pasangan dewasa harus dikonsultasikan terlebih dahulu kepada tenaga kesehatan (dokter/bidan)?",
    options: [
      "Karena semua metode kontrasepsi bebas dijual tanpa aturan",
      "Karena kondisi medis setiap individu berbeda (misalnya tekanan darah, riwayat penyakit, dan rencana jumlah anak) sehingga memerlukan metode yang paling tepat dan aman",
      "Agar siswa SMP dapat membeli obat kontrasepsi secara bebas",
      "Karena kontrasepsi hanya bekerja jika diminum bersama dokter"
    ],
    correctAnswer: 1,
    explanation: "Konsultasi medis memastikan metode yang dipilih cocok dengan kondisi kesehatan ibu (misal bebas hipertensi untuk kontrasepsi hormonal) dan tidak menimbulkan kontraindikasi.",
    difficulty: "Sedang"
  },
  {
    id: "qd-09",
    section: "D",
    type: "mcq",
    question: "Penyakit sistem reproduksi yang disebabkan oleh bakteri Treponema pallidum dengan gejala luka pada organ intim yang tidak nyeri pada tahap awal dinamakan...",
    options: [
      "Sifilis (Raja Singa)",
      "Gonore (Kencing Nanah)",
      "Herpes Genitalis",
      "Kandidiasis"
    ],
    correctAnswer: 0,
    explanation: "Sifilis disebabkan oleh infeksi bakteri Treponema pallidum dan dikenal dengan gejala khas luka chancre pada fase primer.",
    difficulty: "Sedang"
  },
  {
    id: "qd-10",
    section: "D",
    type: "mcq",
    question: "Upaya paling efektif bagi remaja SMP dalam membentengi diri dari bahaya penularan penyakit infeksi menular seksual (IMS) dan menjaga kesehatan reproduksi adalah...",
    options: [
      "Mencoba berbagai obat tanpa resep dokter",
      "Menjalankan ajaran agama, menghormati privasi tubuh, menjauhi pergaulan bebas, dan mengisi masa muda dengan kegiatan positif",
      "Menyembunyikan keluhan kesehatan dari orang tua",
      "Mengkonsumsi suplemen vitamin dalam jumlah berlebih"
    ],
    correctAnswer: 1,
    explanation: "Pendidikan karakter, nilai agama, pemahaman batas pergaulan, serta pola hidup sehat dan aktif merupakan benteng paling kokoh bagi remaja.",
    difficulty: "Mudah"
  }
];

if (typeof window !== "undefined") {
  window.FAMILY_PLANNING_DATA = FAMILY_PLANNING_DATA;
  window.QUIZ_SECTION_D = QUIZ_SECTION_D;
}
