/**
 * MODUL MATERI B: SIKLUS MENSTRUASI
 * Serta Simulator Siklus 28 Hari dan Bank Soal Evaluasi Bagian B
 * Kurikulum Merdeka - IPA Fase D SMP/MTs
 */

const MENSTRUATION_DATA = {
  id: "menstruation",
  title: "B. Siklus Menstruasi",
  subtitle: "Memahami fase menstruasi, dinamika hormon pengatur, ovulasi, variasi siklus, serta manajemen kebersihan diri.",
  overview: `Menstruasi adalah proses alami dan sehat yang dialami oleh remaja perempuan saat memasuki masa pubertas. Menstruasi ditandai dengan keluarnya darah, lendir, dan sel-sel lapisan dinding rahim (endometrium) melalui vagina secara berkala karena sel telur tidak dibuahi.`,

  scientificNote: `Catatan Ilmiah Penting: Siklus menstruasi ideal umumnya dipelajari berdurasi 28 hari sebagai model acuan. Namun pada kenyataannya, rentang siklus yang normal dan sehat pada remaja berkisar antara 21 hingga 35 hari, bahkan pada awal pubertas siklus dapat belum teratur karena sistem hormonal tubuh masih dalam tahap penyesuaian. Perbedaan ini adalah variasi biologis yang wajar dan tidak perlu dicemaskan.`,

  // 4 Fase Siklus Menstruasi
  phases: [
    {
      id: "menstruasi",
      name: "1. Fase Menstruasi",
      dayRange: "Hari ke 1 - 5",
      hormoneState: "Kadar hormon Estrogen dan Progesteron berada pada titik terendah.",
      ovaryEvent: "Folikel baru mulai dipersiapkan di bawah pengaruh sedikit hormon FSH (Follicle Stimulating Hormone).",
      uterusEvent: "Lapisan dinding rahim (endometrium) yang tebal meluruh bersama darah dan sisa sel telur yang tidak dibuahi.",
      symptoms: "Terkadang disertai kram perut ringan (dismenore) akibat kontraksi alami otot rahim yang melepaskan prostaglandin.",
      color: "#ef4444",
      endometriumThickness: 2 // mm
    },
    {
      id: "folikular",
      name: "2. Fase Folikular (Proliferasi)",
      dayRange: "Hari ke 6 - 13",
      hormoneState: "Hormon FSH merangsang pematangan folikel; folikel yang berkembang menghasilkan lonjakan hormon Estrogen.",
      ovaryEvent: "Salah satu folikel berkembang pesat menjadi Folikel de Graaf yang matang berisi sel telur siap ovulasi.",
      uterusEvent: "Tingginya hormon estrogen memicu dinding rahim (endometrium) kembali menebal dan membentuk pembuluh darah baru (proliferasi).",
      symptoms: "Kondisi tubuh umumnya lebih bertenaga, lendir leher rahim mulai menjadi bening dan licin.",
      color: "#3b82f6",
      endometriumThickness: 6 // mm
    },
    {
      id: "ovulasi",
      name: "3. Fase Ovulasi",
      dayRange: "Hari ke 14 (± 2 hari)",
      hormoneState: "Lonjakan tajam hormon LH (Luteinizing Hormone Surge) yang dipicu oleh tingginya kadar estrogen.",
      ovaryEvent: "Folikel de Graaf pecah dan melepaskan oosit sekunder (sel telur matang) menuju corong tuba falopi.",
      uterusEvent: "Endometrium terus menebal dan siap menyambut kemungkinan terjadinya pembuahan.",
      symptoms: "Suhu basal tubuh sedikit meningkat (0.3 - 0.5°C), lendir serviks sangat licin dan elastis (menyerupai putih telur mentah).",
      color: "#10b981",
      endometriumThickness: 8 // mm
    },
    {
      id: "luteal",
      name: "4. Fase Luteal (Sekretori)",
      dayRange: "Hari ke 15 - 28",
      hormoneState: "Korpus Luteum memproduksi hormon Progesteron dalam jumlah tinggi dan sejumlah Estrogen.",
      ovaryEvent: "Bekas folikel yang pecah berubah menjadi Korpus Luteum (badan kuning). Jika tidak terjadi kehamilan, korpus luteum menyusut menjadi korpus albikans.",
      uterusEvent: "Hormon progesteron mempertahankan ketebalan endometrium dan merangsang kelenjar rahim menyekresikan cairan kaya nutrisi.",
      symptoms: "Bila tidak terjadi fertilisasi, kadar progesteron anjlok drastis di akhir hari ke-28, memicu siklus menstruasi berikutnya.",
      color: "#f59e0b",
      endometriumThickness: 10 // mm
    }
  ],

  // Edukasi Kebersihan Menstruasi (MHM)
  hygieneGuide: [
    {
      title: "Ganti Pembalut Secara Rutin",
      desc: "Ganti pembalut setidaknya setiap 4-6 jam sekali, atau lebih sering saat aliran darah sedang deras, untuk mencegah kelembapan berlebih dan perkembangbiakan kuman."
    },
    {
      title: "Cara Membersihkan yang Benar",
      desc: "Basuh area kewanitaan dari arah DEPAN ke BELAKANG (bukan dari belakang ke depan) menggunakan air bersih yang mengalir agar bakteri dari anus tidak berpindah ke saluran reproduksi."
    },
    {
      title: "Pakaian Dalam Berbahan Katun",
      desc: "Gunakan celana dalam berbahan katun yang menyerap keringat dan tidak terlalu ketat agar sirkulasi udara tetap baik."
    },
    {
      title: "Kapan Harus Berkonsultasi Medis?",
      desc: "Segera konsultasikan ke dokter atau puskesmas jika mengalami nyeri perut hebat yang tidak membaik dengan istirahat, siklus menstruasi tidak datang lebih dari 3 bulan berturut-turut, atau pendarahan sangat berlebihan."
    }
  ],

  // Data Simulasi 28 Hari (Kurva Hormon & Ketebalan)
  simulatorData: {
    totalDays: 28,
    getDayState: function(day) {
      // Menghitung kadar hormon hipotetis normal (skala 0 - 100%)
      let fsh = 30, lh = 20, estrogen = 20, progesteron = 10;
      let endometrium = 2; // mm
      let phase = "";
      let phaseName = "";
      let desc = "";

      if (day >= 1 && day <= 5) {
        phase = "menstruasi";
        phaseName = "Fase Menstruasi";
        endometrium = 5 - (day * 0.7); // Meluruh dari 5 ke ~1.5mm
        fsh = 35 + (day * 2);
        lh = 15;
        estrogen = 15;
        progesteron = 5;
        desc = `Hari ke-${day}: Dinding rahim sedang meluruh. Kadar estrogen dan progesteron rendah. Tubuh mulai memproduksi sedikit FSH untuk menyiapkan folikel baru.`;
      } else if (day >= 6 && day <= 13) {
        phase = "folikular";
        phaseName = "Fase Folikular (Proliferasi)";
        let progress = (day - 5) / 8; // 0 s.d. 1
        endometrium = 2 + (progress * 5); // Menebal ke 7mm
        fsh = 45 - (progress * 15);
        estrogen = 20 + (progress * 75); // Melonjak naik
        lh = 15 + (progress * 25);
        progesteron = 8;
        desc = `Hari ke-${day}: Folikel ovarium berkembang dan memproduksi estrogen tinggi. Dinding rahim (endometrium) kembali menebal dan membentuk pembuluh darah baru.`;
      } else if (day === 14) {
        phase = "ovulasi";
        phaseName = "Fase Ovulasi";
        endometrium = 7.5;
        fsh = 50;
        lh = 95; // Lonjakan tajam LH surge
        estrogen = 85;
        progesteron = 15;
        desc = `Hari ke-${day}: Terjadi lonjakan tajam hormon LH (LH surge) yang memicu pecahnya folikel dan pelepasan sel telur matang (ovulasi).`;
      } else {
        phase = "luteal";
        phaseName = "Fase Luteal (Sekretori)";
        let progress = (day - 14) / 14;
        if (day <= 22) {
          // Fase aktif korpus luteum
          endometrium = 8 + (progress * 2.5);
          progesteron = 30 + ((day - 14) / 8 * 60); // Puncak progesteron ~hari 21
          estrogen = 50;
          lh = 15;
          fsh = 15;
          desc = `Hari ke-${day}: Korpus luteum aktif memproduksi hormon progesteron tinggi. Endometrium berada pada kondisi paling tebal dan kaya nutrisi.`;
        } else {
          // Fase regresi korpus luteum
          let endProg = (day - 22) / 6;
          endometrium = 10.5 - (endProg * 1.5);
          progesteron = 90 - (endProg * 80); // Turun drastis
          estrogen = 50 - (endProg * 35);
          lh = 12;
          fsh = 25;
          desc = `Hari ke-${day}: Karena tidak terjadi kehamilan, korpus luteum menyusut. Kadar progesteron anjlok memicu peluruhan dinding rahim pada hari ke-1 berikutnya.`;
        }
      }

      return {
        day: day,
        phase: phase,
        phaseName: phaseName,
        endometrium: Math.max(1, parseFloat(endometrium.toFixed(1))),
        hormones: {
          fsh: Math.round(fsh),
          lh: Math.round(lh),
          estrogen: Math.round(estrogen),
          progesteron: Math.round(progesteron)
        },
        description: desc
      };
    }
  },

  flashcards: [
    {
      front: "Fase Menstruasi",
      back: "Fase peluruhan dinding endometrium rahim karena tidak terjadi fertilisasi (kadar estrogen & progesteron rendah).",
      category: "Siklus Menstruasi"
    },
    {
      front: "Hormon LH (Luteinizing Hormone)",
      back: "Hormon dari hipofisis yang lonjakan mendadaknya (LH surge) memicu terjadinya pelepasan sel telur (ovulasi).",
      category: "Hormon"
    },
    {
      front: "Hormon Progesteron",
      back: "Dihasilkan oleh korpus luteum untuk mempertahankan ketebalan dinding endometrium dan mempersiapkan kehamilan.",
      category: "Hormon"
    },
    {
      front: "Korpus Luteum",
      back: "Badan kuning bekas folikel ovarium yang telah melepaskan ovum, berfungsi menghasilkan hormon progesteron.",
      category: "Struktur Ovarium"
    },
    {
      front: "Variasi Siklus Menstruasi",
      back: "Panjang siklus normal wanita berkisar 21 hingga 35 hari, tidak selalu tepat 28 hari bagi setiap orang.",
      category: "Konsep Ilmiah"
    }
  ]
};

/**
 * BANK SOAL EVALUASI BAGIAN B (10 Soal HOTS Kurikulum Merdeka)
 * Ayo Uji Kemampuan Bagian B
 */
const QUIZ_SECTION_B = [
  {
    id: "qb-01",
    section: "B",
    type: "mcq",
    question: "Peristiwa ovulasi pada siklus menstruasi 28 hari normalnya dipicu secara langsung oleh peristiwa hormonal...",
    options: [
      "Penurunan drastis hormon estrogen",
      "Lonjakan mendadak kadar hormon LH (LH surge)",
      "Peningkatan tajam hormon progesteron oleh rahim",
      "Berhentinya sekresi hormon oleh ovarium"
    ],
    correctAnswer: 1,
    explanation: "Tingginya hormon estrogen menjelang pertengahan siklus memicu kelenjar hipofisis anterior melepaskan LH dalam jumlah sangat tinggi (LH surge), yang memicu pecahnya folikel de Graaf dan keluarnya sel telur (ovulasi).",
    difficulty: "Sedang"
  },
  {
    id: "qb-02",
    section: "B",
    type: "mcq",
    question: "Dua orang siswi SMP berdiskusi: Rina memiliki siklus menstruasi 26 hari, sedangkan Siti memiliki siklus 32 hari. Berdasarkan pemahaman ilmiah kesehatan reproduksi...",
    options: [
      "Kedua siswi mengalami kelainan reproduksi dan harus segera diberi obat penyeimbang hormon",
      "Hanya siklus 28 hari yang normal, sehingga Rina dan Siti sama-sama tidak normal",
      "Kedua siklus tersebut berada dalam rentang variasi biologis yang wajar dan sehat (21-35 hari)",
      "Siti mengalami pubertas terlambat karena siklusnya lebih dari 28 hari"
    ],
    correctAnswer: 2,
    explanation: "Panjang siklus menstruasi bervariasi antarindividu. Rentang normal dan sehat berkisar antara 21 sampai 35 hari. Angka 28 hari hanyalah rata-rata populasi.",
    difficulty: "Sedang"
  },
  {
    id: "qb-03",
    section: "B",
    type: "mcq",
    question: "Hormon reproduksi yang berperan paling utama dalam mempertahankan ketebalan dinding endometrium agar tidak luruh selama fase luteal adalah...",
    options: [
      "Progesteron",
      "FSH (Follicle Stimulating Hormone)",
      "Oksitosin",
      "Prolaktin"
    ],
    correctAnswer: 0,
    explanation: "Progesteron yang diproduksi oleh korpus luteum berfungsi merangsang kelenjar endometrium dan menjaga dinding rahim tetap tebal dan kaya pembuluh darah untuk persiapan implantasi embrio.",
    difficulty: "Mudah"
  },
  {
    id: "qb-04",
    section: "B",
    type: "mcq",
    question: "Pada fase folikular (hari ke 6-13), dinding rahim (endometrium) mulai menebal kembali setelah menstruasi berakhir. Penebalan kembali ini dirangsang oleh hormon...",
    options: [
      "Progesteron yang dihasilkan korpus albikans",
      "Estrogen yang disekresikan oleh folikel yang sedang berkembang",
      "LH yang dihasilkan oleh dinding vagina",
      "Insulin yang dihasilkan oleh pankreas"
    ],
    correctAnswer: 1,
    explanation: "Folikel yang berkembang di bawah pengaruh FSH menghasilkan hormon estrogen, yang memicu proliferasi (pertumbuhan sel-sel baru) pada dinding endometrium.",
    difficulty: "Sedang"
  },
  {
    id: "qb-05",
    section: "B",
    type: "mcq",
    question: "Mengapa pembasuhan area kewanitaan setelah buang air harus dilakukan dari arah DEPAN ke BELAKANG?",
    options: [
      "Agar sirkulasi darah di sekitar panggul menjadi lebih lancar",
      "Mencegah berpindahnya kuman/bakteri dari anus ke saluran kemih dan saluran reproduksi",
      "Mempercepat proses terjadinya ovulasi pada ovarium",
      "Mencegah terjadinya kram perut saat menstruasi"
    ],
    correctAnswer: 1,
    explanation: "Anus merupakan muara pembuangan kotoran yang kaya bakteri (seperti E. coli). Membasuh dari depan ke belakang mencegah kuman anus mencemari vagina dan uretra.",
    difficulty: "Mudah"
  },
  {
    id: "qb-06",
    section: "B",
    type: "mcq",
    question: "Apabila sel telur tidak dibuahi oleh sperma, hal yang akan terjadi pada struktur korpus luteum di dalam ovarium adalah...",
    options: [
      "Berubah menjadi janin baru di ovarium",
      "Menyusut dan berdegenerasi menjadi jaringan parut (korpus albikans)",
      "Terus menerus menghasilkan hormon progesteron seumur hidup",
      "Keluar menuju saluran tuba falopi menjadi sel telur baru"
    ],
    correctAnswer: 1,
    explanation: "Tanpa adanya sinyal hormon kehamilan (hCG), korpus luteum akan mati dan menyusut menjadi korpus albikans, menyebabkan kadar progesteron anjlok dan memicu menstruasi.",
    difficulty: "Sedang"
  },
  {
    id: "qb-07",
    section: "B",
    type: "mcq",
    question: "Pada hari ke-1 sampai ke-5 dalam siklus menstruasi, kondisi hormon estrogen dan progesteron berada pada keadaan...",
    options: [
      "Keduanya mencapai puncak tertinggi",
      "Keduanya berada pada tingkat yang sangat rendah",
      "Estrogen sangat tinggi, sedangkan progesteron nol",
      "Progesteron sangat tinggi, sedangkan estrogen nol"
    ],
    correctAnswer: 1,
    explanation: "Penurunan tajam kedua hormon ini pada akhir fase luteal adalah pemicu langsung terjadinya peluruhan dinding rahim (fase menstruasi).",
    difficulty: "Sedang"
  },
  {
    id: "qb-08",
    section: "B",
    type: "mcq",
    question: "Peran utama hormon FSH (Follicle Stimulating Hormone) yang disekresikan oleh kelenjar hipofisis di otak adalah...",
    options: [
      "Merangsang kontraksi otot rahim saat persalinan",
      "Merangsang pertumbuhan dan pematangan folikel di dalam ovarium",
      "Menghancurkan lapisan endometrium saat haid",
      "Menghentikan pembentukan sel sperma pada testis"
    ],
    correctAnswer: 1,
    explanation: "Sesuai namanya (Follicle Stimulating Hormone), FSH merangsang perkembangan folikel ovarium primer menjadi folikel yang matang.",
    difficulty: "Mudah"
  },
  {
    id: "qb-09",
    section: "B",
    type: "mcq",
    question: "Saat sedang menstruasi, tindakan kebersihan pribadi (personal hygiene) yang paling tepat dilakukan siswi adalah...",
    options: [
      "Mengganti pembalut hanya satu kali sehari agar hemat",
      "Mengganti pembalut teratur setiap 4-6 jam sekali atau saat sudah terasa lembap",
      "Menghindari mandi sama sekali selama masa menstruasi",
      "Menggunakan celana yang sangat ketat dan kedap udara"
    ],
    correctAnswer: 1,
    explanation: "Darah menstruasi dan keringat merupakan media subur bagi bakteri. Mengganti pembalut tiap 4-6 jam menjaga area kewanitaan tetap higienis, kering, dan bebas infeksi.",
    difficulty: "Mudah"
  },
  {
    id: "qb-10",
    section: "B",
    type: "mcq",
    question: "Kondisi di bawah ini yang merupakan indikasi bagi seorang remaja untuk sebaiknya berkonsultasi dengan tenaga kesehatan/dokter adalah...",
    options: [
      "Siklus menstruasi berlangsung selama 28 hari",
      "Mengalami sedikit rasa lemas di hari pertama haid",
      "Nyeri haid (kram) sangat hebat hingga pingsan dan tidak dapat beraktivitas normal",
      "Warna darah menstruasi berwarna merah gelap"
    ],
    correctAnswer: 2,
    explanation: "Nyeri haid berlebihan (dismenore sekunder berat) yang melumpuhkan aktivitas dapat menjadi tanda adanya gangguan medis (seperti endometriosis) dan memerlukan evaluasi medis.",
    difficulty: "Sedang"
  }
];

if (typeof window !== "undefined") {
  window.MENSTRUATION_DATA = MENSTRUATION_DATA;
  window.QUIZ_SECTION_B = QUIZ_SECTION_B;
}
