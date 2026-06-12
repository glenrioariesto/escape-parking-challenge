import React from "react";
import { Eye, Compass } from "lucide-react";
import { audio } from "@lib/audio";

interface AnalysisWorkspaceProps {
  levelName: string;
  onOpenDecompositionModal: () => void;
  onOpenQuiz: () => void;
}

export const AnalysisWorkspace: React.FC<AnalysisWorkspaceProps> = ({
  levelName,
  onOpenDecompositionModal,
  onOpenQuiz,
}) => {
  return (
    <div className="flex flex-col justify-between h-full space-y-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-1.5 border-b border-slate-200 pb-3 mb-4">
          <span className="p-1 px-2 bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[9px] font-black rounded uppercase">
            FASE 1: ANALISIS & DEKOMPOSISI
          </span>
          <h4 className="text-sm font-black text-slate-800">{levelName}</h4>
        </div>

        {/* Action Options */}
        <div className="grid grid-cols-1 gap-3 mt-2">
          {/* Action 1: Petunjuk Dekomposisi */}
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              onOpenDecompositionModal();
            }}
            className="flex items-center gap-3 p-4 bg-blue-50/50 hover:bg-blue-50 border border-blue-200 hover:border-blue-300 rounded-2xl text-left cursor-pointer transition-all hover:scale-[1.01]"
          >
            <span className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <Eye size={18} />
            </span>
            <div>
              <h5 className="text-xs font-black text-slate-800">Lihat Petunjuk Dekomposisi</h5>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">ANALISIS HAMBATAN JALUR KELUAR</p>
            </div>
          </button>

          {/* Action 2: Kuis Pemahaman */}
          <button
            type="button"
            onClick={() => {
              audio.playClick();
              onOpenQuiz();
            }}
            className="flex items-center gap-3 p-4 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-300 rounded-2xl text-left cursor-pointer transition-all hover:scale-[1.01]"
          >
            <span className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
              <Compass size={18} className="animate-pulse" />
            </span>
            <div>
              <h5 className="text-xs font-black text-slate-800">Mulai Kuis Pemahaman</h5>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">UJI PEMAHAMAN POLA & BLOKADE</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
