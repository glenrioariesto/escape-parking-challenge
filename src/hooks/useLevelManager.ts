import { useState, useEffect } from "react";
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
  const [activeWalls, setActiveWalls] = useState<{ row: number; col: number }[]>(() => {
    const lvl1 = LEVELS.find((l) => l.id === 1);
    return lvl1?.walls ? JSON.parse(JSON.stringify(lvl1.walls)) : [];
  });
  const [originalWalls, setOriginalWalls] = useState<{ row: number; col: number }[]>(() => {
    const lvl1 = LEVELS.find((l) => l.id === 1);
    return lvl1?.walls ? JSON.parse(JSON.stringify(lvl1.walls)) : [];
  });
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [ctStage, setCtStage] = useState<CTStage>("analysis");
  const [isSandboxMode, setIsSandboxMode] = useState(false);
  const [algorithmSteps, setAlgorithmSteps] = useState<MoveAction[]>([]);
  const [sandboxMoveCount, setSandboxMoveCount] = useState(0);
  const [isDevMode, setIsDevMode] = useState(false);

  // Keep active vehicles in sync with levels config (important for HMR/Hot Module Replacement during development)
  const currentConfigLevel = LEVELS.find((l) => l.id === activeLevelId);
  const serializedConfigVehicles = JSON.stringify(currentConfigLevel?.vehicles);
  const serializedConfigWalls = JSON.stringify(currentConfigLevel?.walls);

  useEffect(() => {
    if (currentConfigLevel) {
      setActiveVehicles(cloneVehicles(currentConfigLevel.vehicles));
      setOriginalVehicles(cloneVehicles(currentConfigLevel.vehicles));
      setActiveWalls(currentConfigLevel.walls ? JSON.parse(JSON.stringify(currentConfigLevel.walls)) : []);
      setOriginalWalls(currentConfigLevel.walls ? JSON.parse(JSON.stringify(currentConfigLevel.walls)) : []);
    }
  }, [activeLevelId, serializedConfigVehicles, serializedConfigWalls]);

  const loadLevel = (levelId: number) => {
    const l = LEVELS.find((lv) => lv.id === levelId);
    if (!l) return;

    setActiveLevelId(levelId);
    setActiveVehicles(cloneVehicles(l.vehicles));
    setOriginalVehicles(cloneVehicles(l.vehicles));
    setActiveWalls(l.walls ? JSON.parse(JSON.stringify(l.walls)) : []);
    setOriginalWalls(l.walls ? JSON.parse(JSON.stringify(l.walls)) : []);
    setCtStage("analysis");
    setIsSandboxMode(false);
    setAlgorithmSteps([]);
    setSandboxMoveCount(0);
    setSelectedVehicleId(null);
  };

  const resetLevel = (originalV: Vehicle[]) => {
    audio.playClick();
    setActiveVehicles(cloneVehicles(originalV));
    setActiveWalls(JSON.parse(JSON.stringify(originalWalls)));
    setSelectedVehicleId(null);
    setSandboxMoveCount(0);
  };

  return {
    activeLevelId,
    activeVehicles,
    setActiveVehicles,
    originalVehicles,
    activeWalls,
    setActiveWalls,
    originalWalls,
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
    isDevMode,
    setIsDevMode,
    loadLevel,
    resetLevel,
  };
}
