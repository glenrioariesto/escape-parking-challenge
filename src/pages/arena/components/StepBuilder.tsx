import React, { useState, useEffect } from "react";
import { Vehicle, MoveAction } from "../../../types";
import { Play, RotateCcw, Trash2, ArrowUp, ArrowDown, Plus, Cpu } from "lucide-react";
import audio from "../../../lib/audio";

interface StepBuilderProps {
  vehicles: Vehicle[];
  steps: MoveAction[];
  onUpdateSteps: (updated: MoveAction[]) => void;
  onRunSimulation: () => void;
  onResetSimulation: () => void;
  isSimulating: boolean;
  currentSimulatingStepIndex: number | null;
}

export const StepBuilder: React.FC<StepBuilderProps> = ({
  vehicles,
  steps,
  onUpdateSteps,
  onRunSimulation,
  onResetSimulation,
  isSimulating,
  currentSimulatingStepIndex
}) => {
  // Local state to construct a new step
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");
  const [direction, setDirection] = useState<"left" | "right" | "up" | "down" | "">("");
  const [distance, setDistance] = useState<number>(1);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);

  // Sync available directions when selected vehicle changes
  useEffect(() => {
    if (selectedVehicle) {
      if (selectedVehicle.direction === "horizontal") {
        setDirection("right");
      } else {
        setDirection("down");
      }
    } else {
      setDirection("");
    }
  }, [selectedVehicleId, vehicles]);

  // Handle adding step
  const handleAddStep = () => {
    if (!selectedVehicleId || !direction) return;

    const newStep: MoveAction = {
      vehicleId: selectedVehicleId,
      direction: direction as any,
      distance: Number(distance)
    };

    audio.playClick();
    onUpdateSteps([...steps, newStep]);
    
    // Clear selections for standard UX, keeping vehicle selected for easier chaining
    setDistance(1);
  };

  // Remove individual step
  const handleRemoveStep = (index: number) => {
    audio.playClick();
    const updated = [...steps];
    updated.splice(index, 1);
    onUpdateSteps(updated);
  };

  // Shift step position in algorithm list (Sequencing exercise)
  const handleMoveStep = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === steps.length - 1) return;

    audio.playClick();
    const updated = [...steps];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    // Swap
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    onUpdateSteps(updated);
  };

  const getDirectionText = (dir: string) => {
    switch (dir) {
      case "left":
        return "Maju Kiri";
      case "right":
        return "Maju Kanan";
      case "up":
        return "Geser Atas";
      case "down":
        return "Geser Bawah";
      default:
        return dir;
    }
  };

  const getDirectionSymbol = (dir: string) => {
    switch (dir) {
      case "left": return "◀";
      case "right": return "▶";
      case "up": return "▲";
      case "down": return "▼";
      default: return "";
    }
  };

  return (
    <div className="flex flex-col h-full justify-between text-slate-800 p-1">
      <div>
        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider font-mono">
            Algoritma
          </h4>
          <span className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-mono">
            {steps.length} Langkah
          </span>
        </div>

        {/* Builder Panel Form */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Pick Vehicle */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-mono font-black text-slate-400">
                Mobil
              </label>
              <select
                value={selectedVehicleId}
                onChange={(e) => {
                  audio.playClick();
                  setSelectedVehicleId(e.target.value);
                }}
                disabled={isSimulating}
                className="bg-white text-xs text-slate-700 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="">-- Pilih --</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.id === "R" ? "🔴 R" : `${v.id} - ${v.label}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Pick Direction */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-mono font-black text-slate-400">
                Arah
              </label>
              <select
                value={direction}
                onChange={(e) => {
                  audio.playClick();
                  setDirection(e.target.value as any);
                }}
                disabled={isSimulating || !selectedVehicleId}
                className="bg-white text-xs text-slate-700 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 outline-none disabled:opacity-50"
              >
                {!selectedVehicleId && <option value="">Pilih mobil dulu</option>}
                {selectedVehicle?.direction === "horizontal" && (
                  <>
                    <option value="left">◀ Kiri</option>
                    <option value="right">▶ Kanan</option>
                  </>
                )}
                {selectedVehicle?.direction === "vertical" && (
                  <>
                    <option value="up">▲ Ke Atas</option>
                    <option value="down">▼ Ke Bawah</option>
                  </>
                )}
              </select>
            </div>

            {/* Pick Distance */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-mono font-black text-slate-400">
                Jarak
              </label>
              <select
                value={distance}
                onChange={(e) => {
                  audio.playClick();
                  setDistance(Number(e.target.value));
                }}
                disabled={isSimulating || !selectedVehicleId}
                className="bg-white text-xs text-slate-700 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-blue-500 outline-none disabled:opacity-50"
              >
                {[1, 2, 3, 4, 5].map((d) => (
                  <option key={d} value={d}>
                    {d} Kotak
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleAddStep}
            disabled={isSimulating || !selectedVehicleId || !direction}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-extrabold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-all shadow-sm cursor-pointer border-none"
          >
            <Plus size={14} />
            <span>Tambah Langkah</span>
          </button>
        </div>

        {/* Algorithm List Block Container */}
        <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
          {steps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 px-4 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <p className="text-[11px] text-slate-400 font-medium">
                Belum ada langkah terancang.
              </p>
            </div>
          ) : (
            steps.map((step, idx) => {
              const matchedVehicle = vehicles.find((v) => v.id === step.vehicleId);
              const isCurrentlyRunning = currentSimulatingStepIndex === idx;

              // Left accent color matches custom vehicle color in the High-Density palette
              let borderLeftColor = "#94A3B8";
              if (matchedVehicle) {
                if (matchedVehicle.id === "R" || matchedVehicle.isPlayer) {
                  borderLeftColor = "#EF4444";
                } else if (matchedVehicle.direction === "horizontal") {
                  borderLeftColor = "#3B82F6";
                } else {
                  borderLeftColor = "#F59E0B";
                }
              }

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs font-mono border transition-all ${
                    isCurrentlyRunning
                      ? "bg-amber-50 border-amber-300 ring-2 ring-amber-400/20 text-slate-800 scale-[1.01]"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                  style={{
                    // Puzzle notch notch simulation style or Scratch looks
                    borderLeftWidth: "6px",
                    borderLeftColor: borderLeftColor
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-sans font-bold bg-slate-200 px-1.5 py-0.5 rounded text-slate-600">
                      #{idx + 1}
                    </span>
                    <strong className="text-slate-800 font-extrabold">
                      {step.vehicleId === "R" ? "MOBIL R" : `MOBIL ${step.vehicleId}`}
                    </strong>
                    <span className="text-slate-600 flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      <span>{getDirectionSymbol(step.direction)}</span>
                      <span>{getDirectionText(step.direction)}</span>
                    </span>
                    <span className="text-blue-600 font-black">
                      {step.distance} Kotak
                    </span>
                  </div>

                  {/* Ordering / Deleting Block Sequencing Actions */}
                  <div className="flex items-center gap-1 pointer-events-auto">
                    <button
                      onClick={() => handleMoveStep(idx, "up")}
                      disabled={isSimulating || idx === 0}
                      className="text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-100 rounded disabled:opacity-20"
                      title="Geser kode ke atas"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      onClick={() => handleMoveStep(idx, "down")}
                      disabled={isSimulating || idx === steps.length - 1}
                      className="text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-100 rounded disabled:opacity-20"
                      title="Geser kode ke bawah"
                    >
                      <ArrowDown size={12} />
                    </button>
                    <button
                      onClick={() => handleRemoveStep(idx)}
                      disabled={isSimulating}
                      className="text-rose-500 hover:text-rose-750 p-1 hover:bg-rose-50 rounded disabled:opacity-20 ml-1"
                      title="Hapus langkah"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Compile / Run actions */}
      <div className="flex gap-2 border-t border-slate-200 pt-4 mt-4">
        <button
          onClick={() => {
            audio.playClick();
            onResetSimulation();
          }}
          disabled={isSimulating}
          className="flex-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 font-semibold px-3 py-2 text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
        >
          <RotateCcw size={13} />
          <span>Reset Posisi</span>
        </button>

        <button
          onClick={onRunSimulation}
          disabled={isSimulating || steps.length === 0}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-100 text-white font-extrabold px-3 py-2 text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
        >
          <Play size={13} className="fill-current" />
          <span>Jalankan Strategi</span>
        </button>
      </div>
    </div>
  );
};
