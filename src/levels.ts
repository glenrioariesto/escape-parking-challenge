import { LevelDefinition } from "./types";

export const LEVELS: LevelDefinition[] = [
  {
    id: 1,
    name: "Tingkat 1: Blokade Sederhana",
    description: "Kenali pola gerakan dasar tempat parkir. Taxi Kuning R terperangkap secara vertikal di kolom 6. Geser Mobil Biru B yang mendatar ke samping untuk membebaskannya!",
    difficulty: "Mudah",
    optimalSteps: 5,
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
        options: ["Tidak ada", "Mobil Merah A", "Mobil Biru B", "Semua mobil"],
        correctAnswerIndex: 2,
        explanation: "Mobil Biru B berada di baris 7 kolom 6-7, tepat di lintasan vertikal Taxi Kuning R menuju gerbang keluar."
      },
      {
        id: "q1_2",
        question: "Ke arah manakah Mobil Biru B harus digeser agar lintasan Taxi Kuning R terbuka?",
        options: ["Hanya bisa digeser ke kanan", "Ke atas atau ke bawah secara vertikal", "Tidak bisa digeser sama sekali", "Mendatar ke kiri atau ke kanan untuk mengosongkan kolom 6"],
        correctAnswerIndex: 3,
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
    optimalSteps: 6,
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
        options: ["Tidak ada", "Mobil Biru B dan Mobil Cokelat E", "Semua mobil", "Mobil Abu-abu C"],
        correctAnswerIndex: 3,
        explanation: "Mobil Abu-abu C berada di baris 7 kolom 5-6, sehingga secara langsung menutup lintasan vertikal Taxi Kuning R di kolom 6."
      },
      {
        id: "q2_2",
        question: "Urutan strategi atau algoritma logis manakah yang tepat untuk menyelesaikan tingkat ini?",
        options: [
          "Geser Taxi Kuning R ke bawah langsung",
          "Geser Mobil Merah A ke bawah → Geser Taxi Kuning R ke bawah",
          "Geser Mobil Putih G ke kiri (atau Mobil Biru B ke kanan) → Geser Mobil Abu-abu C ke samping → Geser Taxi Kuning R ke bawah",
          "Geser Taxi Kuning R ke atas"
        ],
        correctAnswerIndex: 2,
        explanation: "Kita perlu membuka ruang gerak untuk C dengan menggeser G ke kiri (atau B ke kanan) terlebih dahulu, baru kemudian menggeser C ke samping agar kolom 6 bersih, lalu menjalankan Taxi Kuning R ke bawah."
      }
    ]
  },
  {
    id: 3,
    name: "Tingkat 3: Labirin Parkir Padat",
    description: "Tantangan parkir dengan dua Taxi Kuning (R dan T) yang terhalang jalan keluarnya oleh Truk Abu-abu D yang sangat panjang. Geser truk tersebut untuk membebaskan kedua Taxi!",
    difficulty: "Menengah",
    optimalSteps: 14,
    gridRows: 11,
    gridCols: 12,
    exitRow: 2,
    vehicles: [
      {
        id: "R",
        direction: "vertical",
        row: 5,
        col: 7,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Taxi Kuning R (Pemain)",
        isPlayer: true
      },
      {
        id: "T",
        direction: "vertical",
        row: 5,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Taxi Kuning T (Pemain)",
        isPlayer: true,
        exitCol: 3
      },
      {
        id: "A",
        direction: "vertical",
        row: 5,
        col: 4,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah A"
      },
      {
        id: "B",
        direction: "vertical",
        row: 5,
        col: 6,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Biru B"
      },
      {
        id: "D",
        direction: "horizontal",
        row: 7,
        col: 6,
        length: 3,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Abu-abu D"
      },
      {
        id: "E",
        direction: "vertical",
        row: 5,
        col: 2,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Cokelat E"
      },
      {
        id: "F",
        direction: "horizontal",
        row: 7,
        col: 4,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Cyan F"
      },
      {
        id: "G",
        direction: "vertical",
        row: 5,
        col: 9,
        length: 3,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Putih G"
      },
      {
        id: "H",
        direction: "horizontal",
        row: 7,
        col: 1,
        length: 3,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Hijau H"
      }
    ],
    quizQuestions: [
      {
        id: "q3_1",
        question: "Kendaraan manakah yang menghalangi jalan keluar Taxi Kuning T secara langsung di kolom 3?",
        options: ["Truk Hijau H", "Truk Abu-abu D", "Mobil Cokelat E", "Mobil Cyan F"],
        correctAnswerIndex: 0,
        explanation: "Truk Hijau H melintang di baris 7 kolom 1-3, sehingga secara langsung menutup lintasan vertikal Taxi Kuning T di kolom 3."
      },
      {
        id: "q3_2",
        question: "Bagaimana cara yang logis untuk memindahkan Truk Abu-abu D agar tidak menghalangi jalan keluar Taxi Kuning R (kolom 7)?",
        options: [
          "Geser Truk Putih G ke bawah terlebih dahulu, lalu geser Truk D ke kanan",
          "Geser Mobil Cyan F ke kanan, lalu geser Truk D ke kiri",
          "Langsung geser Truk D ke atas",
          "Truk D tidak perlu dipindahkan"
        ],
        correctAnswerIndex: 0,
        explanation: "Truk Putih G di kolom 9 menghalangi Truk D untuk bergeser ke kanan. Dengan menurunkan G ke bawah, Truk D memiliki ruang untuk bergeser ke kanan (kolom 7-9 menjadi bersih untuk R)."
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
