import React from "react";
import { PlayerProgress } from "@types";
import { DashboardHeader } from "./components/DashboardHeader";
import { LevelSelector } from "./components/LevelSelector";

interface DashboardPageProps {
  progress: PlayerProgress;
  activeTooltipLevelId: number | null;
  setActiveTooltipLevelId: (id: number | null) => void;
  onGoToSplash: () => void;
  onLoadLevel: (levelId: number) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  progress,
  activeTooltipLevelId,
  setActiveTooltipLevelId,
  onGoToSplash,
  onLoadLevel,
}) => (
  <div className="flex-1 overflow-hidden flex flex-col space-y-4 h-full min-h-0 w-full text-slate-800">
    <DashboardHeader
      progress={progress}
      onGoToSplash={onGoToSplash}
    />
    <LevelSelector
      progress={progress}
      onLoadLevel={onLoadLevel}
      activeTooltipLevelId={activeTooltipLevelId}
      setActiveTooltipLevelId={setActiveTooltipLevelId}
    />
  </div>
);
