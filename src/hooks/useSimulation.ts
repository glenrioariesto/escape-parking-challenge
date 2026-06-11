import { useState, useEffect } from "react";
import { Vehicle, MoveAction } from "@types";
import { checkCollision } from "@pages/arena/components/ParkingGrid";
import { audio } from "@lib/audio";

export function useSimulation(
  originalVehicles: Vehicle[],
  algorithmSteps: MoveAction[],
  onComplete: (stepsCount: number) => void,
  gridRows = 6,
  gridCols = 6
) {
  const [activeVehicles, setActiveVehicles] = useState<Vehicle[]>(originalVehicles);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

  const start = (vehicles: Vehicle[]) => {
    if (algorithmSteps.length === 0 || isSimulating) return;
    audio.playClick();
    setActiveVehicles(JSON.parse(JSON.stringify(originalVehicles)));
    setIsSimulating(true);
    setCurrentStepIndex(0);
    setSimulationLogs([
      "Menjalankan instruksi kompilasi algoritma...",
      `Total instruksi: ${algorithmSteps.length}`,
    ]);
  };

  const reset = (vehicles: Vehicle[]) => {
    setIsSimulating(false);
    setCurrentStepIndex(null);
    setSimulationLogs(["Posisi dikembalikan ke awal tingkat."]);
    setActiveVehicles(JSON.parse(JSON.stringify(vehicles)));
  };

  const appendLog = (msg: string) => setSimulationLogs((prev) => [...prev, msg]);

  useEffect(() => {
    if (!isSimulating || currentStepIndex === null) return;

    if (currentStepIndex >= algorithmSteps.length) {
      setIsSimulating(false);
      setCurrentStepIndex(null);
      const playerCar = activeVehicles.find((v) => v.isPlayer);
      if (playerCar && playerCar.col >= gridCols - 2) {
        onComplete(algorithmSteps.length);
      } else {
        appendLog("🏁 Semua langkah selesai. Namun, Mobil Merah belum sampai pintu keluar!");
        appendLog("💡 Tips: Analisis kembali mobil yang menghalangi.");
        audio.playError();
      }
      return;
    }

    const step = algorithmSteps[currentStepIndex];
    const timer = setTimeout(() => {
      const target = activeVehicles.find((v) => v.id === step.vehicleId);
      if (!target) {
        appendLog(`⛔ Gagal pada Langkah #${currentStepIndex + 1}: Mobil ${step.vehicleId} tidak ditemukan!`);
        audio.playError();
        setIsSimulating(false);
        setCurrentStepIndex(null);
        return;
      }

      const check = checkCollision(target, step.direction, step.distance, activeVehicles, gridRows, gridCols);
      if (!check.valid) {
        appendLog(`💥 TABRAKAN pada Langkah #${currentStepIndex + 1}: ${target.label} — "${check.reason}"!`);
        audio.playError();
        setIsSimulating(false);
        setCurrentStepIndex(null);
        return;
      }

      const offset = step.direction === "right" || step.direction === "down" ? step.distance : -step.distance;
      setActiveVehicles((prev) =>
        prev.map((v) => {
          if (v.id !== target.id) return v;
          return v.direction === "horizontal" ? { ...v, col: v.col + offset } : { ...v, row: v.row + offset };
        })
      );

      audio.playSlide();
      appendLog(`✓ Langkah #${currentStepIndex + 1}: ${target.label} [${step.direction.toUpperCase()}] sejauh ${step.distance} kotak.`);
      setCurrentStepIndex((i) => (i !== null ? i + 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [isSimulating, currentStepIndex, activeVehicles, algorithmSteps, gridRows, gridCols]);

  return { activeVehicles, setActiveVehicles, isSimulating, currentStepIndex, simulationLogs, start, reset };
}
