import React from "react";
import { PlayerProgress } from "@types";
import { LevelSelector } from "./components/LevelSelector";
import { MuteButton } from "../../components/MuteButton";
import { audio } from "@lib/audio";

interface DashboardPageProps {
  progress: PlayerProgress;
  activeTooltipLevelId: number | null;
  setActiveTooltipLevelId: (id: number | null) => void;
  onGoToSplash: () => void;
  onLoadLevel: (levelId: number) => void;
  isDevMode?: boolean;
  onToggleDevMode?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  progress,
  activeTooltipLevelId,
  setActiveTooltipLevelId,
  onGoToSplash,
  onLoadLevel,
  isDevMode = false,
  onToggleDevMode,
}) => (
  <div
    className="flex-1 overflow-hidden flex flex-col h-full min-h-0 w-full bg-cover bg-center bg-no-repeat relative"
    style={{ backgroundImage: `url('${import.meta.env.BASE_URL}img/background-level.webp')` }}
  >
    {/* Top Right Audio & Dev Controls (Matching Logo Size & Position) */}
    <div className="fixed top-3 right-3 md:top-4 md:right-4 z-50 flex flex-col items-end gap-2">
      <MuteButton variant="floating" size="logo" />
      {onToggleDevMode && (
        <button
          type="button"
          onClick={() => {
            audio.playClick();
            onToggleDevMode();
          }}
          className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-[10px] md:text-xs font-black rounded-xl cursor-pointer border transition-all select-none ${
            isDevMode
              ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-600 shadow-md scale-105"
              : "bg-slate-800 hover:bg-slate-900 text-white border-slate-700 shadow-sm"
          }`}
          title="Toggle Dev Mode (Unlock All Levels & Grid Coordinates)"
        >
          DEV
        </button>
      )}
    </div>

    <LevelSelector
      progress={progress}
      onLoadLevel={onLoadLevel}
      activeTooltipLevelId={activeTooltipLevelId}
      setActiveTooltipLevelId={setActiveTooltipLevelId}
      isDevMode={isDevMode}
    />
  </div>
);

