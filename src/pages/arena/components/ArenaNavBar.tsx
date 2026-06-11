import React from "react";
import { audio } from "../../../lib/audio";
import { Cpu, Flame } from "lucide-react";

interface ArenaNavBarProps {
  isSandboxMode: boolean;
  onSetSandboxMode: (v: boolean) => void;
  onResetLevel: () => void;
}

export const ArenaNavBar: React.FC<ArenaNavBarProps> = ({
  isSandboxMode,
  onSetSandboxMode,
  onResetLevel,
}) => (
  <div className="flex items-center border-b border-slate-200 pb-2 gap-2.5 flex-shrink-0">
    {/* Mode toggle */}
    <div className="flex p-0.5 bg-slate-250 border border-slate-300 rounded-xl flex-shrink-0">
      <button
        onClick={() => { audio.playClick(); onSetSandboxMode(false); onResetLevel(); }}
        className={`px-3 py-1 text-xs font-black rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
          !isSandboxMode ? "bg-blue-600 text-white shadow-xs" : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <Cpu size={12} />
        <span>Skenario BK</span>
      </button>
      <button
        onClick={() => { audio.playClick(); onSetSandboxMode(true); onResetLevel(); }}
        className={`px-3 py-1 text-xs font-black rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
          isSandboxMode ? "bg-[#F59E0B] text-white shadow-xs" : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <Flame size={12} />
        <span>Mode Bebas</span>
      </button>
    </div>
  </div>
);
