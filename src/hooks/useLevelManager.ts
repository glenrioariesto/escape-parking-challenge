import { useState } from "react";
import { Vehicle, CTStage, MoveAction } from "@types";
import { LEVELS } from "@levels";
import { audio } from "@lib/audio";

function cloneVehicles(vehicles: Vehicle[]): Vehicle[] {
  return JSON.parse(JSON.stringify(vehicles));
}

export function useLevelManager() {
  const [activeLevelId, setActiveLevelId] = useState<number>(1);
  const [activeVehicles, setActiveVehicles] = useState<Vehicle[]>(() => {
    const lvl1 = LEVELS.find((l) => l.id === 1);
    return lvl1 ? cloneVehicles(lvl1.vehicles) : [];
  });
  const [originalVehicles, setOriginalVehicles] = useState<Vehicle[]>(() => {
    const lvl1 = LEVELS.find((l) => l.id === 1);
    return lvl1 ? cloneVehicles(lvl1.vehicles) : [];
  });
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [ctStage, setCtStage] = useState<CTStage>("analysis");
  const [isSandboxMode, setIsSandboxMode] = useState(false);
  const [algorithmSteps, setAlgorithmSteps] = useState<MoveAction[]>([]);
  const [sandboxMoveCount, setSandboxMoveCount] = useState(0);

  const loadLevel = (levelId: number) => {
    const l = LEVELS.find((lv) => lv.id === levelId);
    if (!l) return;

    setActiveLevelId(levelId);
    setActiveVehicles(cloneVehicles(l.vehicles));
    setOriginalVehicles(cloneVehicles(l.vehicles));
    setCtStage("analysis");
    setIsSandboxMode(false);
    setAlgorithmSteps([]);
    setSandboxMoveCount(0);
    setSelectedVehicleId(null);
  };

  const resetLevel = (originalV: Vehicle[]) => {
    audio.playClick();
    setActiveVehicles(cloneVehicles(originalV));
    setSelectedVehicleId(null);
    setSandboxMoveCount(0);
  };

  return {
    activeLevelId,
    activeVehicles,
    setActiveVehicles,
    originalVehicles,
    selectedVehicleId,
    setSelectedVehicleId,
    ctStage,
    setCtStage,
    isSandboxMode,
    setIsSandboxMode,
    algorithmSteps,
    setAlgorithmSteps,
    sandboxMoveCount,
    setSandboxMoveCount,
    loadLevel,
    resetLevel,
  };
}
