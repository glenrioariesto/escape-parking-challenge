import { LevelDefinition } from "./types";

export const LEVELS: LevelDefinition[] = [
  {
    id: 1,
    name: "Tingkat 1: Blokade Sederhana",
    description: "Kenali pola gerakan dasar tempat parkir. Mobil Merahmu terperangkap secara vertikal di kolom 4. Geser penghalang A dan B yang mendatar ke samping untuk membebaskannya!",
    difficulty: "Mudah",
    optimalSteps: 3,
    gridRows: 11,
    gridCols: 12,
    exitRow: 2,
    vehicles: [
      {
        id: "R",
        direction: "vertical",
        row: 5,
        col: 6,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah (Pemain)",
        isPlayer: true
      },
      {
        id: "A",
        direction: "vertical",
        row: 5,
        col: 3,
        length: 2,
        color: "bg-amber-400 shadow-amber-200 border-amber-500",
        label: "Mobil Kuning A"
      },
      {
        id: "B",
        direction: "horizontal",
        row: 7,
        col: 6,
        length: 2,
        color: "bg-emerald-400 shadow-emerald-200 border-emerald-500",
        label: "Mobil Hijau B"
      },
      {
        id: "C",
        direction: "vertical",
        row: 5,
        col:5,
        length: 2,
        color: "bg-sky-400 shadow-sky-200 border-sky-500",
        label: "Mobil Biru C"
      },
      {
        id: "D",
        direction: "vertical",
        row: 5,
        col: 7,
        length: 2,
        color: "bg-violet-400 shadow-violet-200 border-violet-500",
        label: "Mobil Ungu D"
      },
      {
        id: "E",
        direction: "vertical",
        row: 5,
        col: 9,
        length: 2,
        color: "bg-pink-400 shadow-pink-200 border-pink-500",
        label: "Mobil Fuchsia E"
      }
    ],
    quizQuestions: [
      {
        id: "q1_1",
        question: "Kendaraan manakah yang menghalangi jalan keluar Mobil Merah secara langsung?",
        options: ["Mobil Biru C", "Mobil Kuning A dan Mobil Hijau B", "Tidak ada", "Semua mobil"],
        correctAnswerIndex: 1,
        explanation: "Mobil Kuning A (baris 1) dan Mobil Hijau B (baris 2) berada langsung di kolom 4, menghalangi jalur vertikal Mobil Merah."
      },
      {
        id: "q1_2",
        question: "Ke arah manakah Mobil Kuning A dan Mobil Hijau B harus digeser agar lintasan Mobil Merah terbuka?",
        options: ["Ke atas atau ke bawah", "Mendatar ke kiri atau ke kanan untuk mengosongkan kolom 4", "Hanya bisa ke kanan", "Tidak bisa digeser"],
        correctAnswerIndex: 1,
        explanation: "Karena A dan B berorientasi horizontal (mendatar), mereka harus digeser ke kiri atau kanan agar kolom 4 menjadi kosong."
      }
    ],
    walls: [{"row":4,"col":1},{"row":4,"col":2},{"row":4,"col":3},{"row":4,"col":4},{"row":4,"col":5},{"row":4,"col":6},{"row":4,"col":7},{"row":4,"col":8},{"row":4,"col":9},{"row":4,"col":10}]
  },
  {
    id: 2,
    name: "Tingkat 2: Hambatan Berantai",
    description: "Tantangan mulai meningkat! Mobil Kuning menghalangi jalan keluar, tapi jalurnya sendiri dihalangi oleh Mobil Hijau. Urutkan langkahmu demi jalan keluar!",
    difficulty: "Sedang",
    optimalSteps: 3,
    gridRows: 11,
    gridCols: 12,
    exitRow: 2,
    vehicles: [
      {
        id: "R",
        direction: "horizontal",
        row: 2,
        col: 1,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah (Pemain)",
        isPlayer: true
      },
      {
        id: "T",
        direction: "vertical",
        row: 0,
        col: 6,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Taxi 2 (Pemain)",
        isPlayer: true,
        exitCol: 6
      },
      {
        id: "A",
        direction: "horizontal",
        row: 1,
        col: 3,
        length: 2,
        color: "bg-amber-400 shadow-amber-200 border-amber-500",
        label: "Mobil Kuning A"
      },
      {
        id: "B",
        direction: "horizontal",
        row: 3,
        col: 2,
        length: 2,
        color: "bg-emerald-400 shadow-emerald-200 border-emerald-500",
        label: "Mobil Hijau B"
      },
      {
        id: "C",
        direction: "horizontal",
        row: 0,
        col: 0,
        length: 2,
        color: "bg-sky-400 shadow-sky-200 border-sky-500",
        label: "Mobil Biru C"
      }
    ],
    quizQuestions: [
      {
        id: "q2_1",
        question: "Sebelum menggeser Mobil Kuning A ke bawah, kendaraan manakah yang harus dipindahkan terlebih dahulu?",
        options: ["Mobil Biru C", "Mobil Hijau B", "Mobil Merah R", "Tidak perlu memindahkan apa pun"],
        correctAnswerIndex: 1,
        explanation: "Mobil Hijau B berada di baris 3 kolom 2-3, tepat di bawah posisi target Mobil Kuning A. B harus digeser ke kanan agar A bisa turun ke baris 3."
      },
      {
        id: "q2_2",
        question: "Urutan strategi atau algoritma logis manakah yang tepat untuk menyelesaikan tingkat ini?",
        options: [
          "Geser R ke kanan langsung saja",
          "Geser B ke kanan → Geser A ke bawah → Geser R ke kanan",
          "Geser C ke bawah → Geser B ke kiri → Geser A ke atas",
          "Geser A ke atas → Geser B ke kanan → Geser R ke kiri"
        ],
        correctAnswerIndex: 1,
        explanation: "Dengan menggeser Mobil Hijau B ke kanan, ruang di baris 3 terbuka. Kemudian geser Kuning A ke bawah, memberi jalan bagi Mobil Merah R untuk meluncur ke kanan."
      }
    ]
  },
  {
    id: 3,
    name: "Tingkat 3: Labirin Parkir Padat",
    description: "Ruang gerak makin sempit dengan 6 kendaraan. Kamu harus mengurai kemacetan ini dengan analisis urutan langkah optimal agar tidak terjadi kemacetan total.",
    difficulty: "Menengah",
    optimalSteps: 5,
    gridRows: 11,
    gridCols: 12,
    exitRow: 2,
    vehicles: [
      {
        id: "R",
        direction: "horizontal",
        row: 2,
        col: 1,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah (Pemain)",
        isPlayer: true
      },
      {
        id: "A",
        direction: "horizontal",
        row: 1,
        col: 3,
        length: 2,
        color: "bg-amber-400 shadow-amber-200 border-amber-500",
        label: "Mobil Kuning A"
      },
      {
        id: "B",
        direction: "horizontal",
        row: 3,
        col: 2,
        length: 2,
        color: "bg-emerald-400 shadow-emerald-200 border-emerald-500",
        label: "Mobil Hijau B"
      },
      {
        id: "C",
        direction: "horizontal",
        row: 0,
        col: 0,
        length: 2,
        color: "bg-cyan-400 shadow-cyan-200 border-cyan-500",
        label: "Mobil Cyan C"
      },
      {
        id: "D",
        direction: "horizontal",
        row: 5,
        col: 0,
        length: 3,
        color: "bg-violet-400 shadow-violet-200 border-violet-500",
        label: "Truk Ungu D"
      },
      {
        id: "E",
        direction: "horizontal",
        row: 4,
        col: 0,
        length: 2,
        color: "bg-fuchsia-400 shadow-fuchsia-200 border-fuchsia-500",
        label: "Mobil Fuchsia E"
      },
      {
        id: "F",
        direction: "horizontal",
        row: 3,
        col: 4,
        length: 2,
        color: "bg-orange-400 shadow-orange-200 border-orange-500",
        label: "Mobil Jingga F"
      }
    ],
    quizQuestions: [
      {
        id: "q3_1",
        question: "Jika kamu memindahkan Truk Ungu D, apakah hal tersebut berdampak langsung pada terbukanya jalan keluar Mobil Merah?",
        options: [
          "Ya, sangat impactful",
          "Tidak, karena Truk Ungu D berada di baris 5 jauh dari jalur keluar Mobil Merah di baris 2",
          "Ya, karena semua truk harus dipindahkan",
          "Mungkin saja tergantung arah putaran angin"
        ],
        correctAnswerIndex: 1,
        explanation: "Konsep Abstraction (Abstraksi): Truk Ungu D berada di baris 5 dan tidak menghalangi rantai kendaraan yang memblokir jalur keluar Mobil Merah R. Mengabaikan truk ini adalah bentuk penyederhanaan masalah."
      },
      {
        id: "q3_2",
        question: "Langkah pembuka manakah yang paling efisien untuk memulai penyelesaian tingkat ini?",
        options: [
          "Geser Mobil Merah R langsung ke kanan",
          "Pindahkan Truk Ungu D ke baris atas",
          "Geser Mobil Jingga F ke bawah untuk membuka ruang bagi Mobil Hijau B",
          "Geser Mobil Cyan C ke kanan sejauh mungkin"
        ],
        correctAnswerIndex: 2,
        explanation: "Mobil Jingga F di baris 3 kolom 4-5 menghalangi Mobil Hijau B untuk bergeser ke kanan. Menurunkan F ke baris 4 membuka ruang bagi B, yang kemudian memungkinkan A turun dan membuka jalur R."
      }
    ]
  },
  {
    id: 4,
    name: "Tingkat 4: Strategi Solusi Ganda",
    description: "Evaluasilah jalur tercepat! Terdapat 8 kendaraan yang saling mengunci. Terdapat dua cara menggeser hambatan, temukan rute dengan jumlah gerakan paling minimal.",
    difficulty: "Sulit",
    optimalSteps: 7,
    gridRows: 11,
    gridCols: 12,
    exitRow: 2,
    vehicles: [
      {
        id: "R",
        direction: "horizontal",
        row: 2,
        col: 1,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah (Pemain)",
        isPlayer: true
      },
      {
        id: "A",
        direction: "horizontal",
        row: 0,
        col: 3,
        length: 2,
        color: "bg-amber-400 shadow-amber-200 border-amber-500",
        label: "Mobil Kuning A"
      },
      {
        id: "B",
        direction: "horizontal",
        row: 4,
        col: 0,
        length: 2,
        color: "bg-emerald-400 shadow-emerald-200 border-emerald-500",
        label: "Mobil Hijau B"
      },
      {
        id: "C",
        direction: "horizontal",
        row: 5,
        col: 3,
        length: 2,
        color: "bg-indigo-400 shadow-indigo-200 border-indigo-500",
        label: "Mobil Indigo C"
      },
      {
        id: "D",
        direction: "horizontal",
        row: 4,
        col: 2,
        length: 2,
        color: "bg-sky-400 shadow-sky-200 border-sky-500",
        label: "Mobil Biru D"
      },
      {
        id: "E",
        direction: "horizontal",
        row: 1,
        col: 3,
        length: 2,
        color: "bg-teal-400 shadow-teal-200 border-teal-500",
        label: "Mobil Teal E"
      },
      {
        id: "F",
        direction: "horizontal",
        row: 0,
        col: 0,
        length: 2,
        color: "bg-pink-400 shadow-pink-200 border-pink-500",
        label: "Mobil Merah Muda F"
      },
      {
        id: "G",
        direction: "horizontal",
        row: 5,
        col: 0,
        length: 2,
        color: "bg-lime-400 shadow-lime-200 border-lime-500",
        label: "Mobil Limau G"
      }
    ],
    quizQuestions: [
      {
        id: "q4_1",
        question: "Dalam Computational Thinking, membandingkan dua opsi solusi untuk menemukan rute tersingkat disebut sebagai apa?",
        options: [
          "Evaluasi Solusi paling Efektif",
          "Penyamaran Masalah",
          "Metode Tebak-Tebakan",
          "Penulisan Kode Program"
        ],
        correctAnswerIndex: 0,
        explanation: "Mengevaluasi solusi paling efektif adalah ukuran Berpikir Komputasional untuk memilih jalur yang paling sedikit usahanya (langkah minimal) di antara berbagai pilihan yang ada."
      },
      {
        id: "q4_2",
        question: "Jika Mobil Kuning A perlu turun ke baris 2 untuk membuka jalur, kendaraan mana yang harus dipindahkan terlebih dahulu?",
        options: ["Mobil Hijau B dan Truk Ungu D", "Mobil Teal E yang berada tepat di bawah A", "Mobil Merah R", "Semua mobil sekaligus"],
        correctAnswerIndex: 1,
        explanation: "Mobil Teal E berada di baris 1 kolom 3-4, tepat di bawah Mobil Kuning A. E harus digeser ke kanan agar A bisa turun, tetapi E sendiri terhalang dan membutuhkan persiapan terlebih dahulu."
      }
    ]
  },
  {
    id: 5,
    name: "Tingkat 5: Kemacetan Total (Grand Master)",
    description: "Tantangan akhir dengan 10 kendaraan! Struktur saling mengunci secara kompleks. Dapatkah kamu menyusun urutan langkah sempurna untuk membebaskan mobil merah?",
    difficulty: "Ahli",
    optimalSteps: 9,
    gridRows: 11,
    gridCols: 12,
    exitRow: 2,
    vehicles: [
      {
        id: "R",
        direction: "horizontal",
        row: 2,
        col: 1,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah (Pemain)",
        isPlayer: true
      },
      {
        id: "A",
        direction: "horizontal",
        row: 0,
        col: 3,
        length: 2,
        color: "bg-amber-400 shadow-amber-200 border-amber-500",
        label: "Mobil Kuning A"
      },
      {
        id: "B",
        direction: "horizontal",
        row: 5,
        col: 3,
        length: 2,
        color: "bg-emerald-400 shadow-emerald-200 border-emerald-500",
        label: "Mobil Hijau B"
      },
      {
        id: "C",
        direction: "horizontal",
        row: 0,
        col: 1,
        length: 2,
        color: "bg-indigo-400 shadow-indigo-200 border-indigo-500",
        label: "Mobil Indigo C"
      },
      {
        id: "D",
        direction: "horizontal",
        row: 0,
        col: 4,
        length: 2,
        color: "bg-sky-400 shadow-sky-200 border-sky-500",
        label: "Mobil Biru D"
      },
      {
        id: "E",
        direction: "horizontal",
        row: 1,
        col: 3,
        length: 2,
        color: "bg-pink-400 shadow-pink-200 border-pink-500",
        label: "Mobil Merah Muda E"
      },
      {
        id: "F",
        direction: "horizontal",
        row: 5,
        col: 0,
        length: 3,
        color: "bg-teal-400 shadow-teal-200 border-teal-500",
        label: "Truk Teal F"
      },
      {
        id: "G",
        direction: "horizontal",
        row: 4,
        col: 0,
        length: 2,
        color: "bg-lime-400 shadow-lime-200 border-lime-500",
        label: "Mobil Limau G"
      },
      {
        id: "H",
        direction: "horizontal",
        row: 3,
        col: 2,
        length: 2,
        color: "bg-violet-400 shadow-violet-200 border-violet-500",
        label: "Mobil Violet H"
      },
      {
        id: "I",
        direction: "horizontal",
        row: 2,
        col: 3,
        length: 2,
        color: "bg-orange-400 shadow-orange-200 border-orange-500",
        label: "Mobil Jingga I"
      }
    ],
    quizQuestions: [
      {
        id: "q5_1",
        question: "Ketika masalah terlalu besar (10 kendaraan), strategi dekomposisi apa yang paling tepat kita lakukan?",
        options: [
          "Mencoba memindahkan semua mobil sekaligus secara acak",
          "Menyerah dan membuat level baru saja",
          "Memfokuskan analisis hanya pada mobil yang berada di jalur keluar (baris 2 kolom 3-5), lalu melacak penyebab hambatan mobil tersebut ke belakang",
          "Menghapus mobil-mobil yang sulit dipindahkan"
        ],
        correctAnswerIndex: 2,
        explanation: "Dekomposisi adalah memecah masalah besar menjadi bagian kecil. Dengan melacak mundur hambatan mulai dari mobil keluar terdekat, kita menyederhanakan pohon pencarian solusi."
      },
      {
        id: "q5_2",
        question: "Langkah terakhir untuk mencapai kata sukses/selesai pada simulasi Computational Thinking ini adalah?",
        options: [
          "Mengulangi level dari awal",
          "Melakukan evaluasi seberapa efektif rute kita dibanding rute optimal dan merefleksikannya",
          "Membagikan skor di media sosial saja",
          "Menunggu petunjuk otomatis keluar"
        ],
        correctAnswerIndex: 1,
        explanation: "Evaluasi dan Refleksi adalah tahap pamungkas Computational Thinking untuk mengevaluasi efektivitas solusi, mengidentifikasi kelebihan, dan belajar strategi yang lebih baik."
      }
    ]
  }
];
