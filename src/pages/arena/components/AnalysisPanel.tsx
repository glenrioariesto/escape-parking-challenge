import React from "react";
import { Info, ChevronRight } from "lucide-react";
import { audio } from "../../../lib/audio";

interface AnalysisPanelProps {
  onOpenQuiz: () => void;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ onOpenQuiz }) => (
  <div className="h-full flex flex-col min-h-0 overflow-y-auto space-y-4 bg-white border border-slate-200 rounded-3xl p-5 md:p-6 justify-between shadow-sm">
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg text-lg">🧭</span>
        <div>
          <h3 className="text-xs sm:text-sm md:text-base font-black text-slate-800 tracking-tight">
            Fase 1: Dekomposisi & Analisis Hambatan
          </h3>
          <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono tracking-wider uppercase">
            Alur Berpikir Komputasional
          </p>
        </div>
      </div>

      <p className="text-[11px] sm:text-xs text-slate-600 leading-normal sm:leading-relaxed font-semibold">
        Sebelum merancang algoritma gerakan, mari kita lakukan analisis sistematis menggunakan logika berpikir
        komputasional. Amati tata letak kendaraan di papan parkir sebelah kiri dengan seksama.
      </p>

      <div className="space-y-2.5">
        <div className="p-3 bg-blue-50/20 border border-blue-100 rounded-xl flex items-start gap-2.5">
          <span className="text-base bg-blue-50 text-blue-600 w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 font-bold">🧩</span>
          <div>
            <h4 className="text-[10px] sm:text-xs font-black text-slate-800 font-mono uppercase">1. Dekomposisi</h4>
            <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 leading-normal">
              Pecah masalah kemacetan ini: Mobil apa saja yang langsung atau tidak langsung menghalangi jalur keluar Mobil Merah?
            </p>
          </div>
        </div>
        <div className="p-3 bg-emerald-50/20 border border-emerald-100 rounded-xl flex items-start gap-2.5">
          <span className="text-base bg-emerald-50 text-emerald-600 w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 font-bold">🔍</span>
          <div>
            <h4 className="text-[10px] sm:text-xs font-black text-slate-800 font-mono uppercase">2. Pengenalan Pola & Abstraksi</h4>
            <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 leading-normal">
              Pahami batasan gerak (horizontal/vertikal) dan abaikan kendaraan di pojok yang tidak relevan dengan lintasan keluar.
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 bg-amber-50/30 border border-amber-200/60 rounded-xl flex items-start gap-2 text-[10px] sm:text-xs leading-normal">
        <Info size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-slate-600 font-medium">
          <strong>Tips Eksplorasi</strong>: Sentuh atau klik mobil di sisi kiri untuk melihat arah gerakan dan nama identitas mereka sebelum memulai kuis.
        </p>
      </div>
    </div>

    <div className="pt-4 border-t border-slate-100 space-y-3">
      <p className="text-[9px] sm:text-[10px] text-slate-400 font-semibold text-center uppercase tracking-wider">
        Apakah Anda siap menguji pemahaman analisis logis Anda?
      </p>
      <button
        onClick={() => { audio.playClick(); onOpenQuiz(); }}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl cursor-pointer transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95"
      >
        <span>🧭 Mulai Kuis Analisis Hambatan</span>
        <ChevronRight size={14} />
      </button>
    </div>
  </div>
);
