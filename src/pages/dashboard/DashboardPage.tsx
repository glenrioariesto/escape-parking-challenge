import React from "react";
import { PlayerProgress } from "@types";
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
  <div
    className="flex-1 overflow-hidden flex flex-col h-full min-h-0 w-full bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url('${import.meta.env.BASE_URL}img/background-level.webp')` }}
  >
    <LevelSelector
      progress={progress}
      onLoadLevel={onLoadLevel}
      activeTooltipLevelId={activeTooltipLevelId}
      setActiveTooltipLevelId={setActiveTooltipLevelId}
    />
  </div>
);
