import React from "react";
import { RefreshCcw } from "lucide-react";

interface SandboxPanelProps {
  onResetLevel: () => void;
}

export const SandboxPanel: React.FC<SandboxPanelProps> = ({ onResetLevel }) => (
  <div className="bg-amber-100/10 border border-amber-200 rounded-3xl p-5 md:p-6 space-y-4 h-full flex flex-col justify-between overflow-y-auto pb-6">
    <div>
      <div className="flex items-center gap-1.5 border-b border-amber-200 pb-3 mb-4">
        <span className="p-1 px-2 bg-amber-50 text-amber-700 border border-amber-200 font-mono text-[9px] font-black rounded uppercase">
          AREA BERMAIN BEBAS
        </span>
        <h4 className="text-sm font-black text-slate-800">Eksperimen Bebas (Coba & Salah)</h4>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
        Pada mode bebas ini, kamu bisa langsung menyentuh lalu memindahkan mobil di dalam grid secara bebas
        tanpa merangkai kode! Gunakan ini untuk melatih insting pemecahan masalahmu sebelum membuat algoritma yang rapi.
      </p>

      <div className="space-y-2 bg-white/90 p-4 rounded-xl border border-slate-200 leading-normal text-xs text-slate-600 shadow-xs">
        <p className="font-black text-slate-800">📋 Petunjuk Eksperimen:</p>
        <ol className="list-decimal pl-4 space-y-1 text-slate-500 font-sans font-medium">
          <li>Klik salah satu mobil di dalam papan parkir di sebelah kiri.</li>
          <li>Gunakan tombol panah kecil yang melayang di bawahnya untuk menggeser mobil.</li>
          <li>Tujuan: Loloskan Mobil Merah (🔴) menuju Gerbang Keluar sebelah kanan di Baris ke-2!</li>
        </ol>
      </div>
    </div>

    <div className="border-t border-slate-200 pt-4 flex-shrink-0">
      <button
        onClick={onResetLevel}
        className="w-full bg-white hover:bg-slate-50 border border-slate-250 text-slate-700 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer animate-[pulse_3s_infinite]"
      >
        <RefreshCcw size={13} />
        <span>Reset Papan Parkir</span>
      </button>
    </div>
  </div>
);
