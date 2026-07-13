import { LevelDefinition } from "./types";

export const LEVELS: LevelDefinition[] = [
  {
    id: 1,
    name: "Tingkat 1: Blokade Sederhana",
    description: "Kenali pola gerakan dasar tempat parkir. Taxi Kuning R terperangkap secara vertikal di kolom 6. Geser Mobil Biru B yang mendatar ke samping untuk membebaskannya!",
    difficulty: "Mudah",
    optimalSteps: 2,
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
        label: "Taxi Kuning R (Pemain)",
        isPlayer: true
      },
      {
        id: "A",
        direction: "vertical",
        row: 5,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah A"
      },
      {
        id: "B",
        direction: "horizontal",
        row: 7,
        col: 6,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Biru B"
      },
      {
        id: "C",
        direction: "vertical",
        row: 5,
        col: 5,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Abu-abu C"
      },
      {
        id: "D",
        direction: "vertical",
        row: 5,
        col: 7,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Hijau D"
      },
      {
        id: "E",
        direction: "vertical",
        row: 5,
        col: 9,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Abu-abu E"
      }
    ],
    quizQuestions: [
      {
        id: "q1_1",
        question: "Kendaraan manakah yang menghalangi jalan keluar Taxi Kuning R secara langsung?",
        options: ["Mobil Biru B", "Mobil Merah A dan Mobil Biru B", "Tidak ada", "Semua mobil"],
        correctAnswerIndex: 0,
        explanation: "Mobil Biru B berada di baris 7 kolom 6-7, tepat di lintasan vertikal Taxi Kuning R menuju gerbang keluar."
      },
      {
        id: "q1_2",
        question: "Ke arah manakah Mobil Biru B harus digeser agar lintasan Taxi Kuning R terbuka?",
        options: ["Mendatar ke kiri atau ke kanan untuk mengosongkan kolom 6", "Ke atas atau ke bawah", "Hanya bisa ke kanan", "Tidak bisa digeser"],
        correctAnswerIndex: 0,
        explanation: "Karena Mobil Biru B berorientasi horizontal (mendatar), ia harus digeser ke kiri atau kanan agar kolom 6 menjadi kosong, sehingga Taxi Kuning R bisa melaju ke bawah."
      }
    ],
    walls: [{"row":4,"col":1},{"row":4,"col":2},{"row":4,"col":3},{"row":4,"col":4},{"row":4,"col":5},{"row":4,"col":6},{"row":4,"col":7},{"row":4,"col":8},{"row":4,"col":9},{"row":4,"col":10}]
  },
  {
    id: 2,
    name: "Tingkat 2: Hambatan Berantai",
    description: "Tantangan mulai meningkat! Papan parkir vertikal seperti Tingkat 1. Taxi Kuning R terhalang langsung oleh Mobil Abu-abu C, namun Mobil Abu-abu C sendiri terkunci oleh Mobil Putih G di kiri dan Mobil Biru B di kanan. Bebaskan kuncian ini!",
    difficulty: "Sedang",
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
        label: "Taxi Kuning R (Pemain)",
        isPlayer: true
      },
      {
        id: "A",
        direction: "vertical",
        row: 5,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah A"
      },
      {
        id: "B",
        direction: "horizontal",
        row: 7,
        col: 7,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Biru B"
      },
      {
        id: "C",
        direction: "horizontal",
        row: 7,
        col: 5,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Abu-abu C"
      },
      {
        id: "D",
        direction: "vertical",
        row: 5,
        col: 9,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Hijau D"
      },
      {
        id: "E",
        direction: "vertical",
        row: 5,
        col: 5,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Cokelat E"
      },
      {
        id: "F",
        direction: "vertical",
        row: 5,
        col: 2,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Cyan F"
      },
      {
        id: "G",
        direction: "horizontal",
        row: 7,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Putih G"
      }
    ],
    quizQuestions: [
      {
        id: "q2_1",
        question: "Kendaraan manakah yang menghalangi jalan keluar Taxi Kuning R secara langsung?",
        options: ["Mobil Abu-abu C", "Mobil Biru B dan Mobil Cokelat E", "Tidak ada", "Semua mobil"],
        correctAnswerIndex: 0,
        explanation: "Mobil Abu-abu C berada di baris 7 kolom 5-6, sehingga secara langsung menutup lintasan vertikal Taxi Kuning R di kolom 6."
      },
      {
        id: "q2_2",
        question: "Urutan strategi atau algoritma logis manakah yang tepat untuk menyelesaikan tingkat ini?",
        options: [
          "Geser Taxi Kuning R ke bawah langsung",
          "Geser Mobil Putih G ke kiri (atau Mobil Biru B ke kanan) → Geser Mobil Abu-abu C ke samping → Geser Taxi Kuning R ke bawah",
          "Geser Mobil Merah A ke bawah → Geser Taxi Kuning R ke bawah",
          "Geser Taxi Kuning R ke atas"
        ],
        correctAnswerIndex: 1,
        explanation: "Kita perlu membuka ruang gerak untuk C dengan menggeser G ke kiri (atau B ke kanan) terlebih dahulu, baru kemudian menggeser C ke samping agar kolom 6 bersih, lalu menjalankan Taxi Kuning R ke bawah."
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
        label: "Taxi Kuning R (Pemain)",
        isPlayer: true
      },
      {
        id: "A",
        direction: "vertical",
        row: 1,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah A"
      },
      {
        id: "B",
        direction: "horizontal",
        row: 3,
        col: 2,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Biru B"
      },
      {
        id: "C",
        direction: "horizontal",
        row: 0,
        col: 0,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Abu-abu C"
      },
      {
        id: "D",
        direction: "horizontal",
        row: 5,
        col: 0,
        length: 3,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Abu-abu D"
      },
      {
        id: "E",
        direction: "horizontal",
        row: 4,
        col: 0,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Abu-abu E"
      },
      {
        id: "F",
        direction: "vertical",
        row: 3,
        col: 4,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Biru F"
      }
    ],
    quizQuestions: [
      {
        id: "q3_1",
        question: "Jika kamu memindahkan Truk Abu-abu D, apakah hal tersebut berdampak langsung pada terbukanya jalan keluar Taxi Kuning R?",
        options: [
          "Ya, sangat impactful",
          "Tidak, karena Truk Abu-abu D berada di baris 5 jauh dari jalur keluar Taxi Kuning R",
          "Ya, karena semua truk harus dipindahkan",
          "Mungkin saja tergantung arah putaran angin"
        ],
        correctAnswerIndex: 1,
        explanation: "Konsep Abstraction (Abstraksi): Truk Abu-abu D berada di baris 5 dan tidak menghalangi rantai kendaraan yang memblokir jalur keluar Taxi Kuning R. Mengabaikan truk ini adalah bentuk penyederhanaan masalah."
      },
      {
        id: "q3_2",
        question: "Langkah pembuka manakah yang paling efisien untuk memulai penyelesaian tingkat ini?",
        options: [
          "Geser Taxi Kuning R langsung ke kanan",
          "Pindahkan Truk Abu-abu D ke baris atas",
          "Geser Mobil Biru F ke bawah untuk membuka ruang bagi Mobil Biru B",
          "Geser Mobil Abu-abu C ke kanan sejauh mungkin"
        ],
        correctAnswerIndex: 2,
        explanation: "Mobil Biru F di kolom 4 baris 3-4 menghalangi Mobil Biru B untuk bergeser ke kanan. Menurunkan F ke bawah membuka ruang bagi B, yang kemudian memungkinkan Mobil Merah A turun dan membuka jalur Taxi Kuning R."
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
        label: "Taxi Kuning R (Pemain)",
        isPlayer: true
      },
      {
        id: "A",
        direction: "vertical",
        row: 0,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah A"
      },
      {
        id: "B",
        direction: "horizontal",
        row: 4,
        col: 0,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Biru B"
      },
      {
        id: "C",
        direction: "horizontal",
        row: 5,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Abu-abu C"
      },
      {
        id: "D",
        direction: "horizontal",
        row: 4,
        col: 2,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Hijau D"
      },
      {
        id: "E",
        direction: "horizontal",
        row: 3,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Abu-abu E"
      },
      {
        id: "F",
        direction: "horizontal",
        row: 0,
        col: 0,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Biru F"
      },
      {
        id: "G",
        direction: "horizontal",
        row: 5,
        col: 0,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Cyan G"
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
        question: "Jika Mobil Merah A perlu turun ke baris 2 untuk membuka jalur, kendaraan mana yang harus dipindahkan terlebih dahulu?",
        options: [
          "Mobil Biru B dan Mobil Hijau D",
          "Mobil Abu-abu E yang berada tepat di bawah A",
          "Taxi Kuning R",
          "Semua mobil sekaligus"
        ],
        correctAnswerIndex: 1,
        explanation: "Mobil Abu-abu E berada di baris 3 kolom 3-4, tepat di bawah Mobil Merah A. E harus digeser ke kanan atau ke kiri agar kolom 3 baris 3 kosong, sehingga Mobil Merah A bisa turun ke bawah."
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
        label: "Taxi Kuning R (Pemain)",
        isPlayer: true
      },
      {
        id: "A",
        direction: "vertical",
        row: 0,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah A"
      },
      {
        id: "B",
        direction: "horizontal",
        row: 5,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Biru B"
      },
      {
        id: "C",
        direction: "horizontal",
        row: 0,
        col: 1,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Abu-abu C"
      },
      {
        id: "D",
        direction: "vertical",
        row: 0,
        col: 4,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Hijau D"
      },
      {
        id: "E",
        direction: "horizontal",
        row: 3,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Abu-abu E"
      },
      {
        id: "F",
        direction: "horizontal",
        row: 5,
        col: 0,
        length: 3,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Hijau F"
      },
      {
        id: "G",
        direction: "horizontal",
        row: 4,
        col: 0,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Cyan G"
      },
      {
        id: "H",
        direction: "vertical",
        row: 3,
        col: 2,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Cokelat H"
      },
      {
        id: "I",
        direction: "horizontal",
        row: 2,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah I"
      }
    ],
    quizQuestions: [
      {
        id: "q5_1",
        question: "Ketika masalah terlalu besar (10 kendaraan), strategi dekomposisi apa yang paling tepat kita lakukan?",
        options: [
          "Mencoba memindahkan semua mobil sekaligus secara acak",
          "Menyerah dan membuat level baru saja",
          "Memfokuskan analisis hanya pada mobil yang menghalangi jalur keluar langsung (seperti Mobil Merah I di baris 2 kolom 3-4), lalu melacak penyebab hambatan mobil tersebut ke belakang",
          "Menghapus mobil-mobil yang sulit dipindahkan"
        ],
        correctAnswerIndex: 2,
        explanation: "Dekomposisi adalah memecah masalah besar menjadi bagian kecil. Dengan melacak mundur hambatan mulai dari mobil keluar terdekat (seperti Mobil Merah I), kita menyederhanakan pencarian solusi."
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
