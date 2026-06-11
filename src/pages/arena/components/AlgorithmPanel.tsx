import React from "react";
import { Vehicle, MoveAction, CTStage } from "@types";
import { StepBuilder } from "./StepBuilder";
import { Info } from "lucide-react";

interface AlgorithmPanelProps {
  activeVehicles: Vehicle[];
  algorithmSteps: MoveAction[];
  onUpdateSteps: (steps: MoveAction[]) => void;
  isSimulating: boolean;
  currentStepIndex: number | null;
  simulationLogs: string[];
  ctStage: CTStage;
  onStartSimulation: () => void;
  onResetLevel: () => void;
  onSetCtStage: (stage: CTStage) => void;
}

export const AlgorithmPanel: React.FC<AlgorithmPanelProps> = ({
  activeVehicles,
  algorithmSteps,
  onUpdateSteps,
  isSimulating,
  currentStepIndex,
  simulationLogs,
  ctStage,
  onStartSimulation,
  onResetLevel,
  onSetCtStage,
}) => (
  <div className="h-full flex flex-col min-h-0 overflow-hidden space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0 overflow-hidden">
      {/* Step Builder */}
      <div className="md:col-span-1 flex flex-col min-h-0 overflow-hidden">
        <StepBuilder
          vehicles={activeVehicles}
          steps={algorithmSteps}
          onUpdateSteps={onUpdateSteps}
          onRunSimulation={onStartSimulation}
          onResetSimulation={onResetLevel}
          isSimulating={isSimulating}
          currentSimulatingStepIndex={currentStepIndex}
        />
      </div>

      {/* Simulation Console */}
      <div className="md:col-span-1 bg-white rounded-2xl p-4 border border-slate-200 flex flex-col justify-between max-h-full overflow-hidden min-h-0">
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3 flex-shrink-0">
            <span className="text-[9px] font-mono font-black tracking-wider text-amber-600 uppercase flex items-center gap-1">
              <span>⚙️</span>
              <span>Konsol Uji Jalur</span>
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto font-mono text-[10px] leading-relaxed pr-1 mb-2">
            {simulationLogs.map((log, idx) => (
              <div
                key={idx}
                className={`py-1 ${
                  log.includes("⛔") || log.includes("💥")
                    ? "text-rose-600 font-bold bg-rose-50 px-1.5 border-l-2 border-rose-500"
                    : log.includes("✓")
                    ? "text-emerald-600 font-bold"
                    : log.includes("🏁") || log.includes("🏆")
                    ? "text-amber-600 font-black"
                    : "text-slate-500"
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 border-t border-slate-200 pt-2 flex items-start gap-1.5 text-[10px] leading-normal flex-shrink-0">
          <Info size={11} className="text-amber-500 flex-shrink-0 mt-0.5 animate-bounce" />
          <p className="font-medium text-slate-400">
            Jika langkahmu menabrak rintangan, sesuaikan kembali urutan algoritma lalu "Jalankan Strategi" secara mandiri.
          </p>
        </div>
      </div>
    </div>

    {/* Proceed to evaluation banner */}
    {algorithmSteps.length > 0 && !isSimulating && ctStage === "simulation" && (
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center justify-between text-xs text-blue-700 font-bold shadow-xs flex-shrink-0 animate-pulse">
        <span>Skenario berjalan sukses, silakan simpan atau revisi programmu.</span>
        <button
          onClick={() => onSetCtStage("evaluation")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
        >
          Buka Lembar Evaluasi →
        </button>
      </div>
    )}
  </div>
);
