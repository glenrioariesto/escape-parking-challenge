import React from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import { audio } from "@lib/audio";

interface SplashPageProps {
  onStart: () => void;
}

export const SplashPage: React.FC<SplashPageProps> = ({ onStart }) => {

  return (
    <div className="relative w-full max-w-3xl mx-auto text-center py-6 flex-1 flex flex-col justify-start md:justify-center items-center overflow-y-auto pr-1 min-h-0">

      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-xs font-bold mb-6 animate-pulse">
        <Sparkles size={12} />
        <span>Berpikir Komputasional (CT) SD</span>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-display tracking-tight text-slate-800 mb-4 leading-tight">
        Belajar Strategi & Algoritma lewat{" "}
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Escape Parking!
        </span>
      </h1>

      <p className="text-xs sm:text-sm md:text-base text-slate-500 font-sans max-w-xl mx-auto mb-6 md:mb-8 leading-relaxed font-medium">
        Halo Calon Pemikir Hebat! Bantu mobil merah keluar dari tempat parkir yang macet dengan memecah
        hambatan, merancang instruksi langkah, dan menguji algoritma terbaikmu!
      </p>

      <div className="mb-10 md:mb-14 flex flex-col sm:flex-row gap-3.5 justify-center items-center w-full max-w-xl mx-auto">
        <button
          onClick={() => { audio.playClick(); onStart(); }}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black text-sm sm:text-base md:text-lg px-8 py-4 sm:px-10 sm:py-4.5 md:px-12 md:py-5 rounded-xl sm:rounded-2xl transition-all shadow-lg active:scale-95 cursor-pointer hover:scale-105 inline-flex items-center justify-center gap-2 sm:gap-3 animate-[pulse_2.5s_infinite]"
        >
          <span>MULAI SEKARANG</span>
          <ChevronRight size={18} className="text-blue-200" />
        </button>
      </div>
    </div>
  );
};
