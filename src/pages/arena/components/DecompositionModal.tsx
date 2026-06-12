import React from "react";
import { Info } from "lucide-react";
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 select-none animate-fadeIn">
      <div className="relative max-w-xl w-full mx-auto shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col bg-white border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 pb-5 relative flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-1 bg-white/10 rounded-xl">🧭</span>
            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-black tracking-tight">
                Fase 1: Dekomposisi & Analisis Hambatan
              </h3>
              <p className="text-[10px] font-mono text-blue-200 tracking-wider uppercase">
                Alur Berpikir Komputasional • {levelName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 z-50 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-black text-xs transition-colors cursor-pointer border-none"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh] text-slate-700">
          <p className="text-xs sm:text-sm font-semibold leading-relaxed">
            Sebelum merancang algoritma gerakan, mari kita lakukan analisis sistematis menggunakan logika berpikir
            komputasional. Amati tata letak kendaraan di papan parkir sebelah kiri dengan seksama.
          </p>

          <div className="space-y-3">
            {/* 1. Dekomposisi */}
            <div className="p-4 bg-blue-50/30 border border-blue-100 rounded-2xl flex items-start gap-3">
              <span className="text-xl bg-blue-50 text-blue-600 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold">
                🧩
              </span>
              <div>
                <h4 className="text-xs font-black text-slate-800 font-mono uppercase">1. Dekomposisi</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Pecah masalah kemacetan ini: Mobil apa saja yang langsung atau tidak langsung menghalangi jalur keluar Mobil Merah?
                </p>
              </div>
            </div>

            {/* 2. Pengenalan Pola & Abstraksi */}
            <div className="p-4 bg-emerald-50/30 border border-emerald-100 rounded-2xl flex items-start gap-3">
              <span className="text-xl bg-emerald-50 text-emerald-600 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold">
                🔍
              </span>
              <div>
                <h4 className="text-xs font-black text-slate-800 font-mono uppercase">2. Pengenalan Pola & Abstraksi</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Pahami batasan gerak (horizontal/vertikal) dan abaikan kendaraan di pojok yang tidak relevan dengan lintasan keluar.
                </p>
              </div>
            </div>
          </div>

          {/* Tips Banner */}
          <div className="p-4 bg-amber-50/30 border border-amber-200/60 rounded-2xl flex items-start gap-2.5 text-xs leading-relaxed text-slate-800 bg-amber-50/10">
            <Info size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="font-medium">
              <strong>Tips Eksplorasi</strong>: Setelah menutup dialog ini, sentuh atau klik mobil di sisi kiri untuk melihat arah gerakan dan nama identitas mereka sebelum memulai kuis.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              onClose();
            }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl cursor-pointer transition-all shadow-md hover:scale-[1.01] active:scale-95 border-none"
          >
            Saya Mengerti, Mulai Eksplorasi
          </button>
        </div>
      </div>
    </div>
  );
};
