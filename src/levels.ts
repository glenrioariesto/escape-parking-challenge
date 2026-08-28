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
        options: ["Mobil Biru B", "Tidak ada", "Mobil Merah A", "Semua mobil"],
        correctAnswerIndex: 0,
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
    walls: [{"row":4,"col":1},{"row":4,"col":2},{"row":4,"col":3},{"row":4,"col":4},{"row":4,"col":5},{"row":4,"col":6},{"row":4,"col":7},{"row":4,"col":8},{"row":4,"col":9},{"row":4,"col":10}],
    focus: "Berpikir Komputasional - Pengenalan Pola dan Algoritma Dasar: Mengenali pola gerakan kendaraan agar dapat menyusun urutan langkah sederhana untuk membebaskan Taxi Kuning R.",
    outcomes: [
      "Mengenali kendaraan yang menghalangi jalan keluar Taxi Kuning.",
      "Menentukan arah potensial kendaraan berdasarkan orientasinya (mendatar/tegak).",
      "Menyusun urutan langkah berurutan untuk membebaskan jalan keluar."
    ]
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
        options: ["Tidak ada", "Mobil Abu-abu C", "Mobil Biru B dan Mobil Cokelat E", "Semua mobil"],
        correctAnswerIndex: 1,
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
    ],
    focus: "Berpikir Komputasional - Dekomposisi: Menguraikan masalah kemacetan yang berantai menjadi langkah-langkah kecil yang saling bergantung.",
    outcomes: [
      "Mengidentifikasi kendaraan yang terkunci oleh kendaraan lain (hambatan berantai).",
      "Menentukan urutan pelepasan yang tepat agar setiap kendaraan dapat bergerak.",
      "Menyusun algoritma bertahap untuk mengosongkan kolom jalan keluar."
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
        options: ["Truk Abu-abu D", "Mobil Cokelat E", "Mobil Cyan F", "Truk Hijau H"],
        correctAnswerIndex: 3,
        explanation: "Truk Hijau H melintang di baris 7 kolom 1-3, sehingga secara langsung menutup lintasan vertikal Taxi Kuning T di kolom 3."
      },
      {
        id: "q3_2",
        question: "Bagaimana cara yang logis untuk memindahkan Truk Abu-abu D agar tidak menghalangi jalan keluar Taxi Kuning R (kolom 7)?",
        options: [
          "Geser Truk Putih G ke bawah terlebih dahulu, lalu geser Truk D ke kanan",
          "Langsung geser Truk D ke atas",
          "Truk D tidak perlu dipindahkan",
          "Geser Mobil Cyan F ke kanan, lalu geser Truk D ke kiri"
        ],
        correctAnswerIndex: 0,
        explanation: "Truk Putih G di kolom 9 menghalangi Truk D untuk bergeser ke kanan. Dengan menurunkan G ke bawah, Truk D memiliki ruang untuk bergeser ke kanan (kolom 7-9 menjadi bersih untuk R)."
      }
    ],
    focus: "Berpikir Komputasional - Abstraksi: Memilah informasi penting (kendaraan penghambat) dari detail yang tidak relevan untuk merancang strategi labirin parkir padat.",
    outcomes: [
      "Menemukan kendaraan terpanjang yang menjadi hambatan utama (dekomposisi).",
      "Merancang urutan langkah efisien untuk membebaskan dua Taxi Kuning.",
      "Membaca dan menjelaskan alasan di balik setiap langkah yang dipilih."
    ]
  },
  {
    id: 4,
    name: "Tingkat 4: Labirin 3 Taxi",
    description: "Tantangan parkir tingkat lanjut! Terdapat tiga Taxi Kuning (R, T, dan S) yang harus dibebaskan dari kepungan kendaraan. Susun strategi paling efisien untuk meloloskan ketiganya!",
    difficulty: "Sulit",
    optimalSteps: 16,
    gridRows: 11,
    gridCols: 12,
    exitRow: 2,
    vehicles: [
      {
        id: "R",
        direction: "vertical",
        row: 3,
        col: 7,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Taxi Kuning R (Pemain)",
        isPlayer: true
      },
      {
        id: "T",
        direction: "vertical",
        row: 3,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Taxi Kuning T (Pemain)",
        isPlayer: true,
        exitCol: 3
      },
      {
        id: "S",
        direction: "vertical",
        row: 6,
        col: 5,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Taxi Kuning S (Pemain)",
        isPlayer: true,
        exitCol: 5
      },
      {
        id: "A",
        direction: "vertical",
        row: 3,
        col: 4,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah A"
      },
      {
        id: "B",
        direction: "vertical",
        row: 3,
        col: 6,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Biru B"
      },
      {
        id: "D",
        direction: "horizontal",
        row: 2,
        col: 6,
        length: 3,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Abu-abu D"
      },
      {
        id: "E",
        direction: "vertical",
        row: 3,
        col: 2,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Cokelat E"
      },
      {
        id: "F",
        direction: "horizontal",
        row: 2,
        col: 4,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Cyan F"
      },
      {
        id: "H",
        direction: "horizontal",
        row: 2,
        col: 1,
        length: 3,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Hijau H"
      },
      {
        id: "J",
        direction: "horizontal",
        row: 8,
        col: 2,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Sedan Kuning J"
      },
      {
        id: "P",
        direction: "horizontal",
        row: 8,
        col: 4,
        length: 3,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Abu-abu P"
      },
      {
        id: "K",
        direction: "vertical",
        row: 6,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Hijau K"
      },
      {
        id: "L",
        direction: "vertical",
        row: 6,
        col: 7,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Cyan L"
      },
      {
        id: "N",
        direction: "horizontal",
        row: 8,
        col: 7,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Cokelat N"
      }
    ],
    quizQuestions: [
      {
        id: "q4_1",
        question: "Kendaraan manakah yang secara langsung menghalangi jalan keluar Taxi Kuning R ke atas di kolom 7?",
        options: ["Mobil Cyan F", "Truk Hijau H", "Truk Abu-abu D", "Mobil Biru B"],
        correctAnswerIndex: 2,
        explanation: "Truk Abu-abu D melintang di baris 2 kolom 6-8, tepat menutup lintasan vertikal Taxi Kuning R di kolom 7 menuju gerbang EXIT atas."
      },
      {
        id: "q4_2",
        question: "Bagaimana cara yang logis untuk membebaskan Taxi Kuning S agar bisa keluar ke bawah melalui kolom 5?",
        options: [
          "Langsung geser Taxi S ke bawah tanpa memindahkan kendaraan lain",
          "Geser Sedan Kuning J ke kiri (atau Truk Cokelat N ke kanan) → Geser Truk Abu-abu P ke samping → Geser Taxi S ke bawah",
          "Geser Truk Abu-abu P ke atas agar tidak menghalangi",
          "Geser Mobil Hijau K ke atas melewati dinding pembatas"
        ],
        correctAnswerIndex: 1,
        explanation: "Truk Abu-abu P di baris 8 kolom 4-6 menghalangi Taxi S. Namun P terkunci oleh Sedan Kuning J di kiri dan Truk Cokelat N di kanan. Kita perlu menggeser J ke kiri atau N ke kanan terlebih dahulu agar P memiliki ruang untuk bergeser ke samping, baru Taxi S bisa meluncur ke bawah."
      }
    ],
    walls: [{"row":5,"col":1},{"row":5,"col":2},{"row":5,"col":3},{"row":5,"col":4},{"row":5,"col":5},{"row":5,"col":6},{"row":5,"col":7},{"row":5,"col":8},{"row":5,"col":9},{"row":5,"col":10}],
    focus: "Berpikir Komputasional - Algoritma dan Perencanaan: Merancang strategi terkoordinasi untuk membebaskan tiga Taxi Kuning secara bersamaan dalam labirin padat.",
    outcomes: [
      "Menguraikan masalah multi-Taxi menjadi sub-masalah yang lebih kecil.",
      "Memprioritaskan urutan pelepasan kendaraan penghambat yang saling terkunci.",
      "Merancang algoritma efisien dan mengevaluasi jumlah langkah minimal."
    ]
  },
  {
    id: 5,
    name: "Tingkat 5: Kemacetan Total 5 Taxi (Grand Master)",
    description: "Tantangan pamungkas Computational Thinking! Terdapat 5 Taxi Kuning (2 di area atas dan 3 di area bawah) yang terperangkap di dalam labirin parkir ganda. Rencanakan langkah dekomposisi paling presisi untuk membebaskan kelima Taxi!",
    difficulty: "Ahli",
    optimalSteps: 23,
    gridRows: 11,
    gridCols: 12,
    exitRow: 2,
    vehicles: [
      {
        id: "R",
        direction: "vertical",
        row: 3,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Taxi Kuning R (Pemain)",
        isPlayer: true,
        exitCol: 3
      },
      {
        id: "T",
        direction: "vertical",
        row: 3,
        col: 7,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Taxi Kuning T (Pemain)",
        isPlayer: true,
        exitCol: 7
      },
      {
        id: "S",
        direction: "vertical",
        row: 6,
        col: 3,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Taxi Kuning S (Pemain)",
        isPlayer: true,
        exitCol: 3
      },
      {
        id: "U",
        direction: "vertical",
        row: 6,
        col: 5,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Taxi Kuning U (Pemain)",
        isPlayer: true,
        exitCol: 5
      },
      {
        id: "V",
        direction: "vertical",
        row: 6,
        col: 7,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Taxi Kuning V (Pemain)",
        isPlayer: true,
        exitCol: 7
      },
      {
        id: "A",
        direction: "vertical",
        row: 3,
        col: 4,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Merah A"
      },
      {
        id: "B",
        direction: "vertical",
        row: 3,
        col: 6,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Biru B"
      },
      {
        id: "D",
        direction: "horizontal",
        row: 2,
        col: 2,
        length: 3,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Abu-abu D"
      },
      {
        id: "C",
        direction: "horizontal",
        row: 2,
        col: 5,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Cyan C"
      },
      {
        id: "E",
        direction: "vertical",
        row: 3,
        col: 1,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Cokelat E"
      },
      {
        id: "H",
        direction: "horizontal",
        row: 2,
        col: 7,
        length: 3,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Hijau H"
      },
      {
        id: "J",
        direction: "horizontal",
        row: 8,
        col: 1,
        length: 3,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Kuning J"
      },
      {
        id: "P",
        direction: "horizontal",
        row: 8,
        col: 5,
        length: 3,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Abu-abu P"
      },
      {
        id: "K",
        direction: "vertical",
        row: 6,
        col: 2,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Hijau K"
      },
      {
        id: "L",
        direction: "vertical",
        row: 6,
        col: 8,
        length: 2,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Mobil Cyan L"
      },
      {
        id: "N",
        direction: "horizontal",
        row: 8,
        col: 8,
        length: 3,
        color: "bg-rose-500 shadow-rose-300 border-rose-600",
        label: "Truk Cokelat N"
      }
    ],
    quizQuestions: [
      {
        id: "q5_1",
        question: "Kendaraan manakah yang secara langsung menghalangi jalan keluar Taxi Kuning R (kolom 3) dan Taxi Kuning T (kolom 7) ke atas di area atas?",
        options: [
          "Truk Abu-abu D dan Truk Hijau H",
          "Mobil Merah A dan Mobil Biru B",
          "Mobil Cokelat E dan Mobil Cyan C",
          "Tidak ada kendaraan yang menghalangi"
        ],
        correctAnswerIndex: 0,
        explanation: "Truk Abu-abu D (kolom 2-4) dan Truk Hijau H (kolom 7-9) melintang di baris 2, secara langsung menutup lintasan vertikal Taxi Kuning R (kolom 3) dan Taxi Kuning T (kolom 7) menuju gerbang EXIT atas."
      },
      {
        id: "q5_2",
        question: "Bagaimana urutan strategi yang tepat untuk membebaskan 3 Taxi di area bawah (Taxi S, U, dan V)?",
        options: [
          "Langsung menjalankan ketiga Taxi ke bawah tanpa memindahkan kendaraan lain",
          "Geser Mobil Hijau K ke kiri (atau Truk Cokelat N ke kanan) → Geser Truk J dan Truk P ke samping → Bebaskan Taxi S, U, dan V ke bawah",
          "Menggeser Taxi R dan T di area atas ke bawah untuk membantu",
          "Menggeser Truk Abu-abu P ke atas melewati dinding pembatas"
        ],
        correctAnswerIndex: 1,
        explanation: "Truk J dan Truk P di baris 8 menghalangi jalur keluar ketiga Taxi di bawah. Dengan menggeser Mobil K atau Truk N terlebih dahulu, ruang gerak horizontal Truk J dan P terbuka sehingga jalur keluar Taxi S, U, dan V menjadi bersih."
      }
    ],
    walls: [{"row":5,"col":1},{"row":5,"col":2},{"row":5,"col":3},{"row":5,"col":4},{"row":5,"col":5},{"row":5,"col":6},{"row":5,"col":7},{"row":5,"col":8},{"row":5,"col":9},{"row":5,"col":10}],
    focus: "Berpikir Komputasional - Integrasi dan Evaluasi: Menerapkan seluruh konsep computational thinking untuk memecahkan kemacetan paling kompleks secara presisi.",
    outcomes: [
      "Mengintegrasikan dekomposisi, pengenalan pola, abstraksi, dan algoritma.",
      "Merencanakan strategi panjang yang akurat untuk membebaskan lima Taxi Kuning.",
      "Mengevaluasi solusi dan menyajikan alasan setiap langkah secara logis."
    ]
  }
];
