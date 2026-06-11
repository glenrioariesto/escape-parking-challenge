import React, { useState } from "react";
import { RefreshCcw, ArrowRight, HelpCircle, GraduationCap, CheckCircle2 } from "lucide-react";
import audio from "../../../lib/audio";

interface ReflectionProps {
  levelId: number;
  levelName: string;
  playerStepsCount: number;
  optimalStepsCount: number;
  starsEarned: number;
  onRestartLevel: () => void;
  onNextLevel: () => void;
  isLastLevel: boolean;
}

export const Reflection: React.FC<ReflectionProps> = ({
  levelId,
  levelName,
  playerStepsCount,
  optimalStepsCount,
  starsEarned,
  onRestartLevel,
  onNextLevel,
  isLastLevel
}) => {
  const [reflectionAnswer, setReflectionAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Reflection options targeted for Elementary School Computational Thinking (CT)
  const reflectionQuestions = [
    {
      question: "Mengapa kita harus menggeser mobil penghalang sekunder terlebih dahulu sebelum langsung mengejar gerbang keluar?",
      options: [
        "Sebab mobil penghalang utama tidak memiliki ruang bergeser karena terblokir oleh mobil lain (Hambatan Berantai).",
        "Hanya karena itu membuat permainan terasa lebih panjang dan melelahkan.",
        "Sebab mobil merah dilarang terbang, jadi harus berputar bolak-balik tanpa tujuan."
      ],
      correctIndex: 0,
      feedback: "Tepat sekali! Ini melatih kita mengurai hambatan bertingkat (Dekomposisi Masalah). Kita melacak sebab-akibat kemacetan untuk membuka ruang gerak."
    },
    {
      question: "Bagaimana cara mendesain solusi yang paling efisien (langkah tersingkat) pada tingkat-tingkat sulit?",
      options: [
        "Dengan mengevaluasi jalur beberapa mobil sekaligus dan mengabaikan mobil yang tidak bersinggungan langsung (Abstraksi).",
        "Menggerakkan semua mobil ke segala arah secara acak sampai berhasil.",
        "Membongkar seluruh tempat parkir dan meletakkan mobil merah di luar."
      ],
      correctIndex: 0,
      feedback: "Hebat! Konsep Abstraksi mengajarkan kita untuk mengabaikan detail tidak relevan (seperti mobil di ujung kiri) dan hanya berfokus pada titik kritis pergerakan."
    },
    {
      question: "Aktivitas kehidupan sehari-hari manakah di bawah ini yang paling membutuhkan berpikir algoritmik (Sequencing) seperti game parkir ini?",
      options: [
        "Menyusun jadwal kegiatan belajar harian, resep memasak kue, atau tata cara mencuci tangan agar bersih.",
        "Melihat televisi saat sore hari tanpa memperdulikan waktu.",
        "Tidur sepanjang hari tanpa melakukan apa pun."
      ],
      correctIndex: 0,
      feedback: "Luar biasa! Algoritma adalah susunan langkah urutan logis. Memasak, mencuci tangan, atau menjadwalkan tugas membutuhkan urutan langkah yang benar agar tujuannya berhasil tanpa kacau!"
    }
  ];

  // Pick a question based on level ID (cycle them)
  const selectedQuiz = reflectionQuestions[(levelId - 1) % reflectionQuestions.length];

  const handleSelectOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    audio.playClick();
    setReflectionAnswer(opt);
  };

  const handleSubmitReflection = () => {
    if (reflectionAnswer === null) return;
    audio.playSuccess();
    setIsAnswerSubmitted(true);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden max-w-[500px] w-full mx-auto select-none text-slate-800">
      {/* Decorative Golden Ambient Background */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-rose-500" />

      <div className="text-center mb-5">
        <span className="text-4xl mb-2 inline-block animate-bounce">🏆</span>
        <h2 className="text-lg font-black font-sans text-slate-800 tracking-tight">
          Skenario Simulasi Berhasil!
        </h2>
        <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-wider font-bold">
          {levelName}
        </p>
      </div>

      {/* Step Comparison Metrics */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-5 text-center">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1 font-bold">
          Evaluasi Efisiensi Solusi
        </span>

        {/* Big Stars Rating */}
        <div className="flex justify-center gap-2 mb-3">
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              className={`text-3xl transition-transform duration-300 ${
                star <= starsEarned
                  ? "text-amber-500 scale-110 drop-shadow-[0_2px_8px_rgba(250,204,21,0.35)]"
                  : "text-slate-350 select-none opacity-40"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center mt-2 border-t border-slate-200 pt-3">
          <div>
            <span className="text-[10px] text-slate-500 font-bold block animate-fade-in">Langkahmu:</span>
            <span className="text-lg font-black font-mono text-slate-800">{playerStepsCount}</span>
          </div>
          <div className="border-x border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold block animate-fade-in">Optimal:</span>
            <span className="text-lg font-black font-mono text-emerald-600">{optimalStepsCount}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold block animate-fade-in">Selisih:</span>
            <span className={`text-lg font-black font-mono ${
              playerStepsCount - optimalStepsCount === 0 ? "text-emerald-600" : "text-amber-600"
            }`}>
              {playerStepsCount - optimalStepsCount === 0 
                ? "Sempurna!" 
                : `+${playerStepsCount - optimalStepsCount}`
              }
            </span>
          </div>
        </div>

        {/* Feedback message depending on score */}
        <p className="text-xs text-slate-500 font-medium font-sans mt-3 px-1 leading-relaxed">
          {starsEarned === 3 && "Luar biasa! Kamu menyelesaikan level ini dengan algoritma yang paling efektif (Bintang Sempurna)! 🌟"}
          {starsEarned === 2 && "Hebat! Langkahmu hampir sesempurna strategi minimal. Bisakah kamu memperbaikinya lagi? 🎯"}
          {starsEarned === 1 && "Kamu berhasil meloloskan mobil! Namun, cobalah merancang urutan langkah lain agar lebih hemat energi. 🔋"}
        </p>
      </div>

      {/* Educational CT Reflection Assessment */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-5 shadow-xs">
        <div className="flex items-center gap-1.5 border-b border-slate-205 pb-2 mb-3">
          <GraduationCap size={15} className="text-blue-500" />
          <span className="text-[10px] font-mono uppercase text-blue-600 font-bold tracking-wider">
            Uji Renungan Mandiri
          </span>
        </div>

        <p className="text-xs font-black text-slate-800 flex items-start gap-1 mb-3">
          <HelpCircle size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <span>{selectedQuiz.question}</span>
        </p>

        <div className="space-y-2 mb-3">
          {selectedQuiz.options.map((option, idx) => {
            const isChosen = reflectionAnswer === option;
            const isCorrectOption = idx === selectedQuiz.correctIndex;
            
            let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-medium shadow-xs";
            if (isChosen) {
              btnStyle = "bg-blue-50 border-blue-500 text-blue-800 ring-1 ring-blue-500/20 font-bold";
            }
            if (isAnswerSubmitted) {
              if (isCorrectOption) {
                btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold";
              } else if (isChosen) {
                btnStyle = "bg-rose-50 border-rose-500 text-rose-800 font-bold opacity-60";
              } else {
                btnStyle = "opacity-40 bg-slate-100 border-slate-200 text-slate-400";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-3 rounded-lg border text-[11px] leading-relaxed select-none transition-all duration-200 ${btnStyle}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {reflectionAnswer && !isAnswerSubmitted && (
          <button
            onClick={handleSubmitReflection}
            className="w-full bg-blue-600 hover:bg-blue-750 text-white font-extrabold text-xs py-2 rounded-lg transition-transform focus:scale-95 shadow-xs cursor-pointer border-none"
          >
            Selesaikan Jawaban Refleksi
          </button>
        )}

        {isAnswerSubmitted && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-[10.5px] leading-relaxed text-blue-800 flex gap-1.5 items-start font-medium animate-fade-in shadow-xs">
            <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <p>{selectedQuiz.feedback}</p>
          </div>
        )}
      </div>

      {/* Stage footer controls */}
      <div className="flex gap-2.5">
        <button
          onClick={onRestartLevel}
          className="flex-1 border border-slate-300 text-slate-700 bg-white rounded-xl px-3 py-2.5 text-xs font-bold hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-all shadow-xs"
        >
          <RefreshCcw size={12} />
          <span>Ulangi (Cari Optimal)</span>
        </button>

        <button
          onClick={onNextLevel}
          disabled={!isAnswerSubmitted}
          className={`flex-1 font-extrabold rounded-xl px-4 py-2.5 text-xs flex items-center justify-center gap-1.5 max-h-11 transition-all shadow-xs focus:scale-[0.98] ${
            isAnswerSubmitted
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:scale-105 active:scale-95 shadow"
              : "bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none border border-slate-200 shadow-none"
          }`}
          title={isAnswerSubmitted ? "Lanjut" : "Jawab refleksi dahulu untuk lanjut"}
        >
          <span>{isLastLevel ? "Selesai & Ke Dashboard" : "Skenario Berikutnya"}</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
