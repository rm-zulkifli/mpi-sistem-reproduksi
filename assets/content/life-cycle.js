/**
 * MODUL MATERI C: SIKLUS HIDUP MANUSIA
 * C.1 Kehamilan dan Bayi, C.2 Anak-anak, C.3 Remaja dan Pubertas, C.4 Dewasa
 * Serta Bank Soal Evaluasi C.5 Ayo Uji Kemampuan (15 Soal HOTS)
 * Kurikulum Merdeka - IPA Fase D SMP/MTs
 */

const LIFE_CYCLE_DATA = {
  id: "life-cycle",
  title: "C. Siklus Hidup Manusia",
  subtitle: "Menelusuri tahapan perkembangan manusia mulai dari pembuahan, masa bayi, kanak-kanak, pubertas remaja, hingga dewasa.",
  overview: `Manusia mengalami tahapan pertumbuhan (pertambahan ukuran fisik) dan perkembangan (pematangan fungsi organ dan kemampuan psikologis) sepanjang hidupnya. Setiap tahap memiliki karakteristik biologis yang unik dan penting untuk dipahami secara ilmiah.`,

  subsections: [
    {
      id: "c1",
      code: "C.1",
      title: "Kehamilan dan Bayi",
      summary: "Awal kehidupan manusia dimulai dari proses fertilisasi sel sperma dan sel ovum hingga melahirkan bayi mungil yang sehat.",
      content: {
        fertilization: "Fertilisasi terjadi ketika sebuah sel sperma menembus dinding ovum di tuba falopi, meleburkan materi genetik ayah (23 kromosom) dan ibu (23 kromosom) menjadi zigot diploid (46 kromosom).",
        cleavage: "Zigot membelah secara mitosis berulang kali membentuk morula (kumpulan sel padat menyerupai buah murbei), kemudian berkembang menjadi blastokista berongga.",
        implantation: "Sekitar hari ke-6 hingga ke-7 setelah fertilisasi, blastokista menempel dan menanamkan diri ke dalam lapisan endometrium rahim (implantasi).",
        fetalStages: [
          {
            stage: "Trimester Pertama (Minggu 1 - 12)",
            desc: "Pembentukan organ-organ vital (organogenesis): otak, jantung mulai berdetak (minggu ke-5), pembentukan kuncup anggota gerak tangan dan kaki. Pada akhir minggu ke-8, embrio mulai disebut janin (fetus)."
          },
          {
            stage: "Trimester Kedua (Minggu 13 - 27)",
            desc: "Pertumbuhan ukuran tubuh janin yang pesat, sistem saraf semakin matang, janin mulai aktif bergerak menendang, jenis kelamin sudah dapat dibedakan melalui pemeriksaan USG medis."
          },
          {
            stage: "Trimester Ketiga (Minggu 28 - 40)",
            desc: "Pematangan fungsi paru-paru dan penambahan bobot tubuh janin secara signifikan. Janin memutar posisi kepala menuju pintu panggul ibu sebagai persiapan kelahiran normal."
          }
        ],
        placentaRole: "Plasenta (ari-ari) adalah organ khusus yang menghubungkan ibu dan janin melalui tali pusat. Berfungsi menyalurkan oksigen dan nutrisi dari darah ibu, membuang zat sisa (karbon dioksida dan urea), serta menyaring beberapa zat berbahaya (sawar plasenta).",
        maternalCare: "Ibu hamil memerlukan asupan gizi seimbang tinggi protein, asam folat, zat besi, kalsium, istirahat cukup, serta pemeriksaan antenatal rutin (ANC) ke bidan atau dokter."
      }
    },
    {
      id: "c2",
      code: "C.2",
      title: "Anak-anak",
      summary: "Masa pertumbuhan fisik yang aktif serta perkembangan kemampuan motorik, bahasa, kognitif, dan sosialisasi.",
      content: {
        features: [
          {
            area: "Pertumbuhan Fisik",
            desc: "Tinggi dan berat badan bertambah secara stabil, pergantian gigi susu menjadi gigi permanen, serta penguatan struktur tulang dan otot rangka."
          },
          {
            area: "Perkembangan Motorik",
            desc: "Motorik kasar (berlari, melompat, bersepeda) dan motorik halus (menulis, menggambar, mengancingkan baju) berkembang semakin terkoordinasi."
          },
          {
            area: "Perkembangan Kognitif & Bahasa",
            desc: "Rasa ingin tahu yang sangat tinggi, kemampuan berpikir logis konkret, perbendaharaan kata meningkat pesat, dan mulai memahami konsep sebab-akibat."
          },
          {
            area: "Perkembangan Sosial-Emosional",
            desc: "Belajar berbagi, bermain peran bersama teman sebaya (peer group), serta memahami aturan sosial dan norma dasar di lingkungan keluarga dan sekolah."
          }
        ],
        healthNeeds: "Masa anak-anak membutuhkan gizi seimbang (makanan 4 sehat kaya protein untuk pertumbuhan otak dan tulang), waktu tidur yang cukup (9-11 jam sehari), aktivitas fisik di luar ruangan, serta pembiasaan mencuci tangan pakai sabun."
      }
    },
    {
      id: "c3",
      code: "C.3",
      title: "Remaja dan Pubertas",
      summary: "Masa peralihan dari anak-anak menuju dewasa yang ditandai dengan perubahan fisik, hormonal, dan kematangan organ reproduksi.",
      content: {
        definition: "Pubertas adalah masa ketika organ reproduksi manusia mulai aktif berfungsi dan mampu menghasilkan sel kelamin (gamet) karena pengaruh stimulasi hormon gonadotropin dari kelenjar hipofisis.",
        variations: "Waktu dimulainya pubertas bervariasi pada setiap remaja (umumnya usia 9-14 tahun pada perempuan dan 10-15 tahun pada laki-laki). Perbedaan waktu ini dipengaruhi oleh faktor genetik, nutrisi, dan kondisi kesehatan tubuh.",
        maleChanges: {
          primary: "Mulai diproduksinya sel sperma di testis, yang sering ditandai dengan peristiwa mimpi basah (emisi nokturnal alami).",
          secondary: [
            "Tumbuh rambut di area ketiak dan sekitar kemaluan",
            "Jakun membesar di leher dan suara menjadi lebih berat/dalam",
            "Bahu dan dada bertambah lebar dan berotot",
            "Kelenjar minyak dan keringat lebih aktif (potensi timbul jerawat)"
          ]
        },
        femaleChanges: {
          primary: "Mulai terjadinya pematangan sel telur dan datangnya siklus menstruasi pertama (menarche).",
          secondary: [
            "Payudara mulai tumbuh dan berkembang",
            "Pinggul membesar dan membulat",
            "Tumbuh rambut halus di ketiak dan area kemaluan",
            "Kelenjar kulit dan keringat lebih aktif"
          ]
        },
        emotionalChanges: "Perubahan hormon dapat memicu fluktuasi emosi (mood swing), pencarian jati diri, dan ketertarikan sosial yang lebih besar kepada teman sebaya.",
        bodySafety: "Edukasi Batasan Tubuh (Body Boundary): Remaja wajib menjaga privasi tubuhnya sendiri dan menghormati batasan tubuh orang lain. Area tubuh pribadi yang tertutup baju tidak boleh disentuh sembarangan oleh siapapun, dan remaja berhak tegas berkata 'TIDAK' pada perlakuan yang tidak pantas.",
        mythsAndFacts: [
          {
            myth: "Mimpi basah adalah tanda penyakit berbahaya pada remaja laki-laki.",
            fact: "Mimpi basah adalah proses alami tubuh membuang cairan sperma yang menumpuk, merupakan tanda sehat bahwa sistem reproduksi telah aktif."
          },
          {
            myth: "Saat haid dilarang keramas karena air dingin bisa membuat darah haid membeku di rahim.",
            fact: "Secara medis ini adalah mitos keliru. Mandi dan keramas dengan air bersih justru sangat dianjurkan untuk menjaga kebersihan rambut dan tubuh."
          },
          {
            myth: "Remaja yang pubertasnya lebih awal pasti lebih cerdas daripada yang terlambat.",
            fact: "Waktu pubertas sama sekali tidak berhubungan dengan kecerdasan intelektual siswa; waktu pubertas ditentukan oleh jam biologis genetik dan nutrisi."
          }
        ]
      }
    },
    {
      id: "c4",
      code: "C.4",
      title: "Dewasa",
      summary: "Masa tercapainya kematangan fisik, emosional, sosial, serta tanggung jawab menjaga kesehatan reproduksi dan gaya hidup.",
      content: {
        maturity: "Organ reproduksi telah matang sempurna, pertumbuhan tinggi badan umumnya telah berhenti (lempeng epifisis tulang menutup), dan kemampuan berpikir abstrak serta pengambilan keputusan telah stabil.",
        healthResponsibilities: "Dewasa bertanggung jawab menjaga pola makan sehat, menjauhi rokok, alkohol, dan narkoba, berolahraga teratur, menjaga kebersihan reproduksi, serta mempersiapkan diri secara matang sebelum membina rumah tangga.",
        lifestyleImpact: "Gaya hidup yang dijalani saat remaja dan dewasa muda (merokok, kurang tidur, stres kronis, junk food) sangat mempengaruhi kualitas kesuburan dan kesehatan reproduksi di masa depan."
      }
    }
  ],

  flashcards: [
    {
      front: "Fertilisasi",
      back: "Proses peleburan antara inti sel sperma dan inti sel telur menghasilkan zigot diploid (46 kromosom).",
      category: "Kehamilan"
    },
    {
      front: "Plasenta (Ari-ari)",
      back: "Organ penyambung antara ibu dan janin untuk menyalurkan nutrisi dan oksigen serta membuang sisa metabolisme.",
      category: "Kehamilan"
    },
    {
      front: "Pubertas",
      back: "Masa transisi dari anak-anak ke dewasa di mana organ reproduksi mulai matang dan menghasilkan gamet serta hormon.",
      category: "Pubertas"
    },
    {
      front: "Ciri Kelamin Primer",
      back: "Ciri utama yang berkaitan langsung dengan fungsi reproduksi (produksi sperma pada pria, menstruasi pada wanita).",
      category: "Pubertas"
    },
    {
      front: "Ciri Kelamin Sekunder",
      back: "Tanda fisik luar yang membedakan pria dan wanita yang muncul saat pubertas (suara membesar, payudara membesar).",
      category: "Pubertas"
    },
    {
      front: "Batasan Tubuh (Body Boundary)",
      back: "Prinsip menjaga privasi tubuh pribadi serta menghormati tubuh orang lain, berani berkata TIDAK bila merasa tidak nyaman.",
      category: "Edukasi Remaja"
    }
  ]
};

/**
 * BANK SOAL EVALUASI BAGIAN C (15 Soal HOTS Kurikulum Merdeka)
 * C.5 Ayo Uji Kemampuan Bagian C
 */
const QUIZ_SECTION_C = [
  {
    id: "qc-01",
    section: "C",
    type: "mcq",
    question: "Tahap awal kehidupan manusia setelah sel sperma berhasil melebur dengan sel ovum membentuk sel tunggal dengan 46 kromosom disebut...",
    options: [
      "Janin (Fetus)",
      "Zigot",
      "Morula",
      "Blastokista"
    ],
    correctAnswer: 1,
    explanation: "Hasil peleburan inti sel sperma (23 kromosom) dan sel ovum (23 kromosom) disebut zigot, yang merupakan sel diploid pertama calon individu baru.",
    difficulty: "Mudah"
  },
  {
    id: "qc-02",
    section: "C",
    type: "mcq",
    question: "Organ yang terbentuk di dalam rahim selama masa kehamilan untuk menyalurkan nutrisi dan oksigen dari darah ibu kepada janin adalah...",
    options: [
      "Plasenta (Ari-ari)",
      "Ovarium",
      "Kelenjar Prostat",
      "Tuba Falopi"
    ],
    correctAnswer: 0,
    explanation: "Plasenta menghubungkan sirkulasi darah ibu dengan janin melalui tali pusat, memungkinkan pertukaran gas oksigen, nutrisi makanan, dan pembuangan sisa metabolit janin.",
    difficulty: "Mudah"
  },
  {
    id: "qc-03",
    section: "C",
    type: "mcq",
    question: "Pada perkembangan janin di dalam kandungan, organ-organ vital seperti otak, kuncup tangan dan kaki, serta detak jantung mulai terbentuk pada masa...",
    options: [
      "Trimester pertama (minggu ke-1 sampai 12)",
      "Trimester kedua",
      "Trimester ketiga",
      "Saat proses persalinan saja"
    ],
    correctAnswer: 0,
    explanation: "Organogenesis (pembentukan organ vital tubuh) berlangsung secara intensif pada trimester pertama, sehingga periode ini sangat sensitif terhadap pengaruh gizi dan zat berbahaya.",
    difficulty: "Sedang"
  },
  {
    id: "qc-04",
    section: "C",
    type: "mcq",
    question: "Berikut ini yang merupakan ciri-ciri perkembangan motorik kasar pada masa anak-anak adalah...",
    options: [
      "Kemampuan memecahkan soal matematika rumit",
      "Kemampuan berlari, melompat, dan menaiki tangga dengan seimbang",
      "Mulai bekerjanya hormon testosteron",
      "Pertumbuhan kumis pada wajah"
    ],
    correctAnswer: 1,
    explanation: "Motorik kasar melibatkan koordinasi otot-otot besar tubuh untuk melakukan aktivitas seperti berjalan, berlari, dan melompat seimbang.",
    difficulty: "Mudah"
  },
  {
    id: "qc-05",
    section: "C",
    type: "mcq",
    question: "Tanda utama (primer) yang menunjukkan bahwa sistem reproduksi seorang anak laki-laki telah memasuki masa pubertas dan aktif adalah...",
    options: [
      "Tumbuhnya jakun di leher",
      "Mulai diproduksinya sel sperma oleh testis yang ditandai dengan mimpi basah",
      "Pertambahan tinggi badan secara cepat",
      "Tumbuhnya rambut di sekitar wajah"
    ],
    correctAnswer: 1,
    explanation: "Ciri kelamin primer berhubungan langsung dengan pematangan organ gonad dan sel gamet. Pada laki-laki adalah dimulainya produksi sperma oleh testis.",
    difficulty: "Sedang"
  },
  {
    id: "qc-06",
    section: "C",
    type: "mcq",
    question: "Tanda kelamin primer pada remaja perempuan yang menandakan ovarium mulai matang dan melepaskan sel telur adalah...",
    options: [
      "Terjadinya menstruasi pertama (menarche)",
      "Membesarnya payudara",
      "Membesarnya tulang pinggul",
      "Suara menjadi lebih nyaring"
    ],
    correctAnswer: 0,
    explanation: "Menstruasi pertama (menarche) adalah ciri primer yang menandakan sistem hormonal perempuan telah mematangkan sel telur pertamanya.",
    difficulty: "Mudah"
  },
  {
    id: "qc-07",
    section: "C",
    type: "mcq",
    question: "Perubahan fisik berikut yang termasuk ciri kelamin sekunder pada laki-laki saat pubertas adalah...",
    options: [
      "Produksi hormon progesteron meningkat tajam",
      "Suara menjadi lebih berat/besar dan jakun membesar",
      "Pelepasan sel ovum dari ovarium",
      "Peluruhan dinding endometrium"
    ],
    correctAnswer: 1,
    explanation: "Membesarnya laring/pita suara (jakun) yang membuat suara menjadi lebih dalam adalah salah satu ciri seksual sekunder akibat pengaruh testosteron.",
    difficulty: "Mudah"
  },
  {
    id: "qc-08",
    section: "C",
    type: "mcq",
    question: "Andi berusia 13 tahun belum mengalami perubahan suara, sementara temannya Budi yang berusia 12 tahun suaranya sudah membesar. Kesimpulan ilmiah yang tepat adalah...",
    options: [
      "Andi mengalami kelainan hormonal serius",
      "Budi mengalami penuaan dini",
      "Waktu dimulainya pubertas wajar berbeda-beda pada setiap remaja karena pengaruh genetik dan nutrisi",
      "Andi tidak akan pernah mengalami pubertas"
    ],
    correctAnswer: 2,
    explanation: "Awal mula pubertas bervariasi secara alami. Setiap individu memiliki jam biologis tubuh yang unik; rentang pubertas laki-laki normalnya 10-15 tahun.",
    difficulty: "Sedang"
  },
  {
    id: "qc-09",
    section: "C",
    type: "mcq",
    question: "Kelenjar minyak dan kelenjar keringat remaja menjadi jauh lebih aktif selama masa pubertas. Sikap menjaga kebersihan diri yang paling tepat adalah...",
    options: [
      "Menggunakan parfum tebal tanpa perlu mandi",
      "Mandi teratur minimal 2 kali sehari menggunakan sabun dan mengeringkan tubuh dengan handuk bersih",
      "Membiarkan pakaian basah keringat kering sendiri di badan",
      "Menghindari minum air putih"
    ],
    correctAnswer: 1,
    explanation: "Keringat dan minyak berlebih bila bercampur bakteri dapat menimbulkan bau badan dan jerawat. Mandi teratur 2 kali sehari dan ganti pakaian bersih adalah langkah higienis utama.",
    difficulty: "Mudah"
  },
  {
    id: "qc-10",
    section: "C",
    type: "mcq",
    question: "Salah satu prinsip penting dalam menjaga keamanan dan privasi tubuh bagi remaja adalah...",
    options: [
      "Mengizinkan siapa saja menyentuh bagian tubuh pribadi asalkan teman akrab",
      "Berhak tegas berkata 'TIDAK' dan segera melapor kepada orang tua atau guru bila ada yang melakukan sentuhan tidak pantas",
      "Menyimpan sendiri perasaan tidak nyaman tanpa menceritakan kepada orang dewasa terpercaya",
      "Menghindari bertanya tentang kesehatan reproduksi kepada guru atau dokter"
    ],
    correctAnswer: 1,
    explanation: "Konsep 'My Body is My Privacy' mengajarkan remaja untuk mengenali batasan tubuh, menolak sentuhan tidak pantas, dan segera mencari perlindungan kepada orang tua/guru bila ada ancaman.",
    difficulty: "Sedang"
  },
  {
    id: "qc-11",
    section: "C",
    type: "mcq",
    question: "Mitos yang sering beredar di masyarakat adalah bahwa saat perempuan sedang menstruasi dilarang keramas/mencuci rambut. Fakta ilmiah kedokteran yang benar adalah...",
    options: [
      "Mitos tersebut benar karena pori-pori kepala bisa menyerap darah haid",
      "Mitos tersebut keliru, mencuci rambut saat haid justru aman dan dianjurkan untuk menjaga kebersihan diri",
      "Keramas hanya boleh dilakukan dengan air panas mendidih",
      "Keramas saat haid dapat menghentikan fungsi ovarium selamanya"
    ],
    correctAnswer: 1,
    explanation: "Tidak ada kaitan biologis antara kulit kepala dan pembuluh darah rahim. Menjaga kebersihan rambut dan tubuh selama haid sangat dianjurkan untuk kesehatan.",
    difficulty: "Mudah"
  },
  {
    id: "qc-12",
    section: "C",
    type: "mcq",
    question: "Ciri perkembangan masa dewasa yang membedakannya dengan masa remaja adalah...",
    options: [
      "Tercapainya kematangan fungsi organ reproduksi secara penuh dan stabilitas emosional serta tanggung jawab sosial",
      "Terhentinya seluruh aktivitas enzim dalam tubuh",
      "Menurunnya fungsi organ pendengaran secara drastis",
      "Pertumbuhan tinggi badan yang semakin cepat setiap tahunnya"
    ],
    correctAnswer: 0,
    explanation: "Masa dewasa ditandai dengan matangnya organ reproduksi secara fungsional, berhentinya pertumbuhan tulang panjang, serta kesiapan memikul tanggung jawab psikososial.",
    difficulty: "Sedang"
  },
  {
    id: "qc-13",
    section: "C",
    type: "mcq",
    question: "Dampak buruk dari kebiasaan merokok dan konsumsi minuman keras terhadap kesehatan reproduksi manusia pada usia dewasa adalah...",
    options: [
      "Meningkatkan kualitas sel sperma dan sel telur",
      "Dapat menurunkan kualitas dan kuantitas sperma serta meningkatkan risiko komplikasi kehamilan",
      "Mempercepat pertumbuhan janin secara sehat",
      "Mencegah penularan penyakit organ reproduksi"
    ],
    correctAnswer: 1,
    explanation: "Zat racun dalam rokok dan alkohol terbukti merusak DNA sel sperma/ovum, menurunkan kesuburan, dan membahayakan janin jika dikonsumsi ibu hamil.",
    difficulty: "Sedang"
  },
  {
    id: "qc-14",
    section: "C",
    type: "mcq",
    question: "Urutan tahapan perkembangan awal setelah pembuahan hingga menjadi janin yang benar adalah...",
    options: [
      "Zigot → Morula → Blastokista → Embrio → Fetus (Janin)",
      "Fetus → Embrio → Blastokista → Zigot",
      "Morula → Zigot → Fetus → Blastokista",
      "Blastokista → Fetus → Morula → Zigot"
    ],
    correctAnswer: 0,
    explanation: "Zigot membelah menjadi morula (kumpulan sel padat), lalu berongga menjadi blastokista, menempel di dinding rahim menjadi embrio, dan setelah minggu ke-8 disebut fetus (janin).",
    difficulty: "Sulit"
  },
  {
    id: "qc-15",
    section: "C",
    type: "mcq",
    question: "Asam folat dan zat besi adalah nutrisi yang sangat dianjurkan bagi ibu selama masa awal kehamilan karena berperan penting untuk...",
    options: [
      "Mencegah cacat tabung saraf tulang belakang janin dan mencegah anemia pada ibu",
      "Membuat janin langsung bisa berjalan setelah lahir",
      "Menentukan jenis kelamin janin secara otomatis",
      "Menggantikan fungsi hormon oksitosin"
    ],
    correctAnswer: 0,
    explanation: "Asam folat esensial untuk penutupan tabung saraf tulang belakang (neural tube) janin pada trimester pertama, sedangkan zat besi membentuk hemoglobin pencegah anemia.",
    difficulty: "Sedang"
  }
];

if (typeof window !== "undefined") {
  window.LIFE_CYCLE_DATA = LIFE_CYCLE_DATA;
  window.QUIZ_SECTION_C = QUIZ_SECTION_C;
}
