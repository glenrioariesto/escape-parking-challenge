import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { audio } from "@lib/audio";

interface DecompositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  levelName: string;
}

export const DecompositionModal: React.FC<DecompositionModalProps> = ({
  isOpen,
  onClose,
  levelName,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  if (!isOpen) return null;

  const handleNext = () => {
    audio.playClick();
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    audio.playClick();
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    audio.playClick();
    onClose();
    setCurrentSlide(0); // Reset for next open
  };

  const slides = [
    {
      title: "1. Tujuan Utama",
      emoji: "🎯",
      text: "Bantu Taxi Kuning (R) keluar dari area parkir menuju pintu keluar yang ditandai dengan panah hijau di tepi jalan.",
      bgClass: "bg-amber-50/40 border-amber-100",
      emojiBg: "bg-amber-50 text-amber-600",
    },
    {
      title: "2. Aturan Gerakan",
      emoji: "🚗",
      text: "Setiap mobil hanya bisa bergerak maju atau mundur sesuai orientasinya. Mobil Mendatar (Horizontal) hanya bisa digeser Kiri/Kanan, sedangkan mobil Tegak (Vertikal) hanya bisa digeser Atas/Bawah.",
      bgClass: "bg-blue-50/40 border-blue-100",
      emojiBg: "bg-blue-50 text-blue-600",
    },
    {
      title: "3. Buat Langkah Algoritma",
      emoji: "✍️",
      text: "Pilih mobil dengan mengekliknya pada papan parkir. Tentukan arah dan jarak geser pada panel kanan, lalu klik Tambahkan Langkah. Terakhir, klik Jalankan untuk menyimulasikan gerakan secara otomatis. Tips: Kamu bisa menyeret (drag) langkah untuk menyusun ulang urutannya, atau menariknya ke luar daftar (drag to outside) untuk menghapusnya.",
      bgClass: "bg-emerald-50/40 border-emerald-100",
      emojiBg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "4. Uji Pemahaman Kuis",
      emoji: "🧠",
      text: "Setelah taxi berhasil lolos dari kemacetan, kamu harus menjawab Kuis Pemahaman untuk menganalisis penyelesaian masalah menggunakan Berpikir Komputasional sebelum maju ke level berikutnya.",
      bgClass: "bg-purple-50/40 border-purple-100",
      emojiBg: "bg-purple-50 text-purple-600",
    },
  ];

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 select-none animate-fadeIn">
      <div className="relative max-w-sm sm:max-w-md md:max-w-lg w-full mx-auto shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden max-h-[92vh] flex flex-col bg-white border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 sm:p-4 pb-2 sm:pb-3 relative flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl p-0.5 sm:p-1 bg-white/10 rounded-lg sm:rounded-xl">🎮</span>
            <div>
              <h3 className="text-[10px] sm:text-xs md:text-sm font-black tracking-tight">
                Cara Bermain & Aturan Game
              </h3>
              <p className="text-[8px] sm:text-[9px] font-mono text-blue-200 tracking-wider uppercase">
                Slide {currentSlide + 1} dari {totalSlides} • {levelName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 z-50 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-black text-[10px] sm:text-xs transition-colors cursor-pointer border-none"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-5 flex-1 min-h-0 overflow-y-auto flex flex-col justify-center">
          <div className={`p-3 sm:p-4 border rounded-xl sm:rounded-2xl flex items-start gap-2.5 sm:gap-3.5 transition-all duration-300 ${slide.bgClass}`}>
            <span className={`text-xl sm:text-2xl w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 font-bold ${slide.emojiBg}`}>
              {slide.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-[10px] sm:text-xs font-black text-slate-800 font-mono uppercase tracking-wide">
                {slide.title}
              </h4>
              <p className="text-[10px] sm:text-xs text-slate-650 mt-1 sm:mt-1.5 leading-relaxed font-medium">
                {slide.text}
              </p>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-2.5 sm:p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between flex-shrink-0">
          {/* Slide Indicator Dots */}
          <div className="flex gap-1">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "w-4 bg-blue-600" : "w-1.5 bg-slate-300"
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-1.5">
            {currentSlide > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-[10px] sm:text-xs rounded-lg sm:rounded-xl cursor-pointer transition-all flex items-center gap-1 shadow-xs border-solid"
              >
                <ChevronLeft size={12} className="sm:w-3.5 sm:h-3.5" />
                Sebelumnya
              </button>
            )}

            {currentSlide < totalSlides - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] sm:text-xs rounded-lg sm:rounded-xl cursor-pointer transition-all flex items-center gap-1 shadow-md border-none"
              >
                Lanjut
                <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] sm:text-xs rounded-lg sm:rounded-xl cursor-pointer transition-all shadow-md active:scale-95 border-none"
              >
                Mulai Bermain!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
