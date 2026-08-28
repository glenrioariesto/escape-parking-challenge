import React, { useState } from "react";
import { GraduationCap, Lightbulb, ChevronLeft, ChevronRight, Target, Puzzle, ListChecks } from "lucide-react";
import { audio } from "@lib/audio";

interface ObjectivesModalProps {
  isOpen: boolean;
  onContinue: () => void;
}

const OUTCOMES = [
  "Mengenali pola gerakan dan kendaraan yang menghambat jalan keluar.",
  "Memecah masalah kemacetan menjadi langkah-langkah kecil (dekomposisi).",
  "Menyusun dan mengurutkan algoritma langkah yang paling efisien.",
  "Menganalisis solusi dan menarik kesimpulan melalui kuis pemahaman.",
];

export const ObjectivesModal: React.FC<ObjectivesModalProps> = ({ isOpen, onContinue }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    audio.playClick();
    setCurrentSlide((prev) => prev + 1);
  };

  const handlePrev = () => {
    audio.playClick();
    setCurrentSlide((prev) => prev - 1);
  };

  const handleClose = () => {
    audio.playClick();
    onContinue();
    setCurrentSlide(0);
  };

  const slides = [
    {
      title: "1. Tujuan Pembelajaran",
      icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />,
      iconWrap: "bg-blue-600 text-white",
      accent: "border-blue-200 bg-blue-50/50",
      text: (
        <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-650 leading-relaxed font-medium">
          Game ini melatih <span className="font-bold text-slate-800">Berpikir Komputasional</span>: mengenali pola,
          memecah masalah, dan menyusun algoritma urutan langkah untuk membebaskan Taxi Kuning dari kemacetan tempat
          parkir menuju pintu keluar.
        </p>
      ),
    },
    {
      title: "2. Mengenali Pola & Hambatan",
      icon: <Puzzle className="w-4 h-4 sm:w-5 sm:h-5" />,
      iconWrap: "bg-emerald-600 text-white",
      accent: "border-emerald-200 bg-emerald-50/50",
      text: (
        <ul className="text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-650 space-y-1.5 list-disc pl-4 font-medium leading-relaxed">
          <li>{OUTCOMES[0]}</li>
          <li>{OUTCOMES[1]}</li>
        </ul>
      ),
    },
    {
      title: "3. Menyusun & Mengevaluasi",
      icon: <ListChecks className="w-4 h-4 sm:w-5 sm:h-5" />,
      iconWrap: "bg-amber-600 text-white",
      accent: "border-amber-200 bg-amber-50/50",
      text: (
        <ul className="text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-650 space-y-1.5 list-disc pl-4 font-medium leading-relaxed">
          <li>{OUTCOMES[2]}</li>
          <li>{OUTCOMES[3]}</li>
        </ul>
      ),
    },
  ];

  const slide = slides[currentSlide];
  const totalSlides = slides.length;

  return (
    <div className="fixed inset-0 z-[998] flex justify-center overflow-y-auto bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 md:p-6 lg:p-8 select-none animate-fadeIn">
      <div className="relative max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl w-full m-auto shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden max-h-modal flex flex-col bg-white border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 sm:p-4 md:p-5 lg:p-6 pb-2 sm:pb-3 md:pb-4 lg:pb-5 relative flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="text-[10px] sm:text-xs md:text-base lg:text-lg font-black tracking-tight font-display">
                Strategi Keluar dari Tempat Parkir
              </h3>
              <p className="text-[9px] sm:text-[11px] md:text-sm text-blue-100 font-bold uppercase tracking-wide">
                Tujuan Pembelajaran
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-2.5 sm:top-4 md:top-5 lg:top-6 right-2.5 sm:right-4 md:right-5 lg:right-6 z-50 w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-black text-[10px] sm:text-xs md:text-sm lg:text-base transition-colors cursor-pointer border-none"
            title="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-5 md:p-6 lg:p-8 flex-1 min-h-0 overflow-y-auto flex flex-col">
          <div className={`p-3 sm:p-4 md:p-5 lg:p-6 border rounded-xl sm:rounded-2xl transition-all duration-300 flex-1 flex items-center m-auto w-full ${slide.accent}`}>
            <div className="flex gap-2.5 sm:gap-3 md:gap-4 items-start">
              <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-xs ${slide.iconWrap}`}>
                {slide.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[10px] sm:text-xs md:text-sm lg:text-base font-black text-slate-800 uppercase tracking-wide font-display">
                  {slide.title}
                </h4>
                <div className="mt-1 sm:mt-1.5 md:mt-2 lg:mt-3">{slide.text}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-2.5 sm:p-4 md:p-5 lg:p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between flex-shrink-0">
          {/* Slide Indicator Dots */}
          <div className="flex gap-1 md:gap-1.5 lg:gap-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 md:h-2 lg:h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "w-4 md:w-5 lg:w-6 bg-blue-600" : "w-1.5 md:w-2 lg:w-2.5 bg-slate-300"
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-1.5 md:gap-2 lg:gap-3">
            {currentSlide > 0 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-[10px] sm:text-xs md:text-sm lg:text-base rounded-lg sm:rounded-xl cursor-pointer transition-all flex items-center gap-1 md:gap-1.5 shadow-xs border-solid"
              >
                <ChevronLeft size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                Sebelumnya
              </button>
            )}

            {currentSlide < totalSlides - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] sm:text-xs md:text-sm lg:text-base rounded-lg sm:rounded-xl cursor-pointer transition-all flex items-center gap-1 md:gap-1.5 shadow-md border-none"
              >
                Lanjut
                <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] sm:text-xs md:text-sm lg:text-base rounded-lg sm:rounded-xl cursor-pointer transition-all shadow-md active:scale-95 flex items-center gap-1 md:gap-1.5 border-none"
              >
                Selesai
                <ChevronRight size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
