import React from "react";
import { Info } from "lucide-react";
import { LevelDefinition, PlayerProgress } from "../../../types";
import { LEVELS } from "../../../levels";
import { audio } from "../../../lib/audio";

interface LevelSelectorProps {
  progress: PlayerProgress;
  onLoadLevel: (levelId: number) => void;
  activeTooltipLevelId: number | null;
  setActiveTooltipLevelId: (id: number | null) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  progress,
  onLoadLevel,
  activeTooltipLevelId,
  setActiveTooltipLevelId
}) => {

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case "Mudah":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "Sedang":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "Menengah":
        return "bg-sky-50 text-sky-600 border-sky-200";
      case "Sulit":
        return "bg-orange-50 text-orange-600 border-orange-200";
      default:
        return "bg-rose-50 text-rose-600 border-rose-200 font-extrabold";
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden space-y-3">
      <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex-shrink-0">
        <span>Alur Tingkatan Simulasi</span>
      </h3>

        {/* --- DESKTOP VIEW: Legacy Vertical Scroll List (lg and up) --- */}
        <div className="hidden lg:flex flex-col flex-1 overflow-y-auto pr-1 space-y-3 pb-6">
          {LEVELS.map((level) => {
            const isUnlocked = level.id <= progress.unlockedLevel;
            const lvScore = progress.levelScores[level.id];
            const isCompleted = lvScore?.completed;

            return (
              <div
                key={level.id}
                onClick={() => {
                  if (isUnlocked) {
                    onLoadLevel(level.id);
                  } else {
                    audio.playError();
                  }
                }}
                className={`group border rounded-2xl p-4 flex items-center justify-between transition-all select-none ${
                  isUnlocked
                    ? "bg-white cursor-pointer border-slate-200 hover:border-blue-500/50 hover:bg-slate-50 shadow-xs"
                    : "bg-slate-200 border-slate-300 opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="flex gap-3.5 items-center">
                  {/* Level Number Circle Badge */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black font-mono transition-colors ${
                    isCompleted
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : isUnlocked
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "bg-slate-200 text-slate-400 border border-slate-300"
                  }`}>
                    Tkt {level.id}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                        {level.name}
                      </h4>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-black border ${getDifficultyStyles(level.difficulty)}`}>
                        {level.difficulty}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1 max-w-[420px] leading-relaxed font-sans font-medium">
                      {level.description}
                    </p>
                  </div>
                </div>

                {/* Completed Star stats */}
                <div className="text-right flex flex-col items-end gap-1 flex-shrink-0">
                  {isCompleted ? (
                    <>
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((star) => (
                          <span
                            key={star}
                            className={`text-xs ${
                              star <= (lvScore?.stars || 0)
                                ? "text-amber-500 drop-shadow-[0_1px_4px_rgba(250,204,21,0.35)]"
                                : "text-slate-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-[9px] text-emerald-600 font-bold font-mono">
                        Terbaik: {lvScore?.bestSteps} Langkah
                      </span>
                    </>
                  ) : isUnlocked ? (
                    <span className="text-xs bg-blue-50 text-blue-600 font-black px-3.5 py-1.5 rounded-lg border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                      Tantang →
                    </span>
                  ) : (
                    <span className="text-xs text-slate-405 font-bold font-mono flex items-center gap-1">
                      🔒 Terkunci
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* --- MOBILE & TAB VIEW: Horizontal Scroll List with Tooltips (below lg) --- */}
        <div className="flex lg:hidden flex-1 min-h-0 overflow-x-auto pb-4 pt-1 items-center gap-4 snap-x select-none scroll-smooth">
          {LEVELS.map((level) => {
            const isUnlocked = level.id <= progress.unlockedLevel;
            const lvScore = progress.levelScores[level.id];
            const isCompleted = lvScore?.completed;

            return (
              <div
                key={level.id}
                onClick={() => {
                  if (isUnlocked) {
                    onLoadLevel(level.id);
                  } else {
                    audio.playError();
                  }
                }}
                className={`group border rounded-2xl p-4 flex flex-col justify-between transition-all flex-shrink-0 w-[260px] sm:w-[280px] h-[190px] relative snap-start ${
                  isUnlocked
                    ? "bg-white cursor-pointer border-slate-200 hover:border-blue-500/50 hover:bg-slate-50 shadow-sm"
                    : "bg-slate-200 border-slate-300 opacity-50 cursor-not-allowed"
                }`}
              >
                {/* Top portion profile */}
                <div className="flex items-center justify-between flex-shrink-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black font-mono transition-colors ${
                    isCompleted
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : isUnlocked
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "bg-slate-200 text-slate-400 border border-slate-300"
                  }`}>
                    Tkt {level.id}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-black border ${getDifficultyStyles(level.difficulty)}`}>
                      {level.difficulty}
                    </span>

                    {/* Info Button trigger inside specific cards */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        audio.playClick();
                        setActiveTooltipLevelId(activeTooltipLevelId === level.id ? null : level.id);
                      }}
                      className={`p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-750 transition-colors flex items-center justify-center ${
                        !isUnlocked && "pointer-events-none"
                      }`}
                      title="Detail Informasi Level"
                    >
                      <Info size={14} />
                    </button>
                  </div>
                </div>

                {/* Middle description content block */}
                <div className="flex-1 min-h-0 flex flex-col justify-center mt-1 mb-1 relative">
                  <div className="text-center bg-slate-50 border border-slate-150 rounded-xl py-1.5 px-2">
                    <h4 className="text-xs font-black text-slate-800 truncate">
                      {level.name}
                    </h4>
                    <span className="text-[9px] text-blue-600 font-mono font-bold">
                      Ketuk info (i) untuk detail
                    </span>
                  </div>

                  {/* Interactive Tooltip popup over Card element absolute */}
                  {activeTooltipLevelId === level.id && (
                    <div 
                      className="absolute z-50 left-0 right-0 bottom-full mb-1.5 bg-slate-900 border border-slate-800 text-white p-3 rounded-xl shadow-xl text-xs animate-[fade-in_0.15s_ease-out]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-black text-blue-400 text-xs">{level.name}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTooltipLevelId(null);
                          }}
                          className="text-slate-400 hover:text-white font-bold ml-1"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-slate-300 text-[10px] leading-relaxed font-semibold">
                        {level.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom status and rating display row */}
                <div className="border-t border-slate-100 pt-2 flex items-center justify-between flex-shrink-0">
                  <div>
                    {isCompleted ? (
                      <div className="flex flex-col items-start gap-px">
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map((star) => (
                            <span
                              key={star}
                              className={`text-[9px] ${
                                star <= (lvScore?.stars || 0)
                                  ? "text-amber-500 drop-shadow-[0_1px_4px_rgba(250,204,21,0.35)]"
                                  : "text-slate-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-[8px] text-emerald-600 font-mono font-bold uppercase">
                          {lvScore?.bestSteps} Langkah
                        </span>
                      </div>
                    ) : (
                      <span className="text-[9px] text-slate-400 font-mono font-bold uppercase">
                        Tantangan Baru
                      </span>
                    )}
                  </div>

                  <div>
                    {isCompleted ? (
                      <span className="text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-250 rounded-lg px-2 py-0.5 font-bold uppercase">
                        Lunas ✓
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-[9px] bg-blue-600 text-white font-black rounded-lg px-2.5 py-1 hover:bg-blue-700 transition-colors shadow-2xs">
                        Mulai →
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-400 font-mono font-bold flex items-center gap-0.5">
                        🔒 Kunci
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
};
