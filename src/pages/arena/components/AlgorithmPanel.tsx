import React from "react";
import { Vehicle, MoveAction, CTStage } from "@types";
import { StepBuilder } from "./StepBuilder";
import { SimulationConsole } from "./SimulationConsole";

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
      <SimulationConsole simulationLogs={simulationLogs} />
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
