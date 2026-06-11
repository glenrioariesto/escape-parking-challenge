import React, { useState } from "react";
import { Vehicle, MoveAction, CTStage, QuizQuestion } from "@types";
import { LEVELS } from "@levels";
import { audio } from "@lib/audio";
import { QuizSection } from "./components/QuizSection";
import { Reflection } from "./components/Reflection";
import { ArenaNavBar } from "./components/ArenaNavBar";
import { GridPanel } from "./components/GridPanel";
import { SandboxPanel } from "./components/SandboxPanel";
import { AnalysisPanel } from "./components/AnalysisPanel";
import { AlgorithmPanel } from "./components/AlgorithmPanel";

export interface SimResult {
  success: boolean;
  totalSteps: number;
  scoreStars: number;
}

interface ArenaPageProps {
  activeLevelId: number;
  activeVehicles: Vehicle[];
  onChangeVehicles: (v: Vehicle[]) => void;
  selectedVehicleId: string | null;
  onSelectVehicle: (id: string | null) => void;
  ctStage: CTStage;
  isSandboxMode: boolean;
  onSetSandboxMode: (v: boolean) => void;
  algorithmSteps: MoveAction[];
  onUpdateSteps: (steps: MoveAction[]) => void;
  isSimulating: boolean;
  currentStepIndex: number | null;
  simulationLogs: string[];
  simResult: SimResult | null;
  sandboxMoveCount: number;
  isQuizModalOpen: boolean;
  onOpenQuiz: () => void;
  onCloseQuiz: () => void;
  onStartSimulation: () => void;
  onResetLevel: () => void;
  onQuizComplete: (score: number) => void;
  onSandboxMoveRecorded: (vId: string, dir: string, dist: number) => void;
  onNextLevel: () => void;
  onSetCtStage: (stage: CTStage) => void;
}

export const ArenaPage: React.FC<ArenaPageProps> = (props) => {
  const activeLevel = LEVELS.find((l) => l.id === props.activeLevelId);
  const [isGridPanelCollapsed, setIsGridPanelCollapsed] = useState(false);

  return (
    <div className="flex-1 overflow-hidden flex flex-col space-y-3 min-h-0 h-full w-full">
      <ArenaNavBar
        isSandboxMode={props.isSandboxMode}
        onSetSandboxMode={props.onSetSandboxMode}
        onResetLevel={props.onResetLevel}
      />

      <div className="flex gap-4 lg:gap-6 items-stretch w-full flex-1 min-h-0 overflow-hidden">
        {/* Left: Grid Panel (collapsible) */}
        <div className={isGridPanelCollapsed ? "flex-shrink-0" : "w-[60%] xl:w-[75%] flex-shrink-0"}>
          <GridPanel
            vehicles={props.activeVehicles}
            onChangeVehicles={props.onChangeVehicles}
            selectedVehicleId={props.selectedVehicleId}
            onSelectVehicle={props.onSelectVehicle}
            isSimulating={props.isSimulating}
            isSandboxMode={props.isSandboxMode}
            onMoveRecorded={props.onSandboxMoveRecorded}
            gridRows={activeLevel?.gridRows}
            gridCols={activeLevel?.gridCols}
            exitRow={activeLevel?.exitRow}
            isCollapsed={isGridPanelCollapsed}
            onToggleCollapse={() => setIsGridPanelCollapsed((v) => !v)}
          />
        </div>

        {/* Right: Content Panel */}
        <div className="flex-1 h-full w-full min-h-0 flex flex-col overflow-hidden">
          {props.isSandboxMode ? (
            <SandboxPanel onResetLevel={props.onResetLevel} />
          ) : props.ctStage === "analysis" ? (
            <AnalysisPanel onOpenQuiz={props.onOpenQuiz} />
          ) : (
            <AlgorithmPanel
              activeVehicles={props.activeVehicles}
              algorithmSteps={props.algorithmSteps}
              onUpdateSteps={props.onUpdateSteps}
              isSimulating={props.isSimulating}
              currentStepIndex={props.currentStepIndex}
              simulationLogs={props.simulationLogs}
              ctStage={props.ctStage}
              onStartSimulation={props.onStartSimulation}
              onResetLevel={props.onResetLevel}
              onSetCtStage={props.onSetCtStage}
            />
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      {!props.isSandboxMode && props.ctStage === "analysis" && props.isQuizModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 select-none">
          <div className="relative max-w-xl w-full mx-auto shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col bg-white">
            <button
              onClick={() => { audio.playClick(); props.onCloseQuiz(); }}
              className="absolute top-4 right-4 z-50 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-black text-xs shadow-xs transition-colors cursor-pointer"
            >
              ✕
            </button>
            <QuizSection
              questions={activeLevel?.quizQuestions || []}
              onQuizComplete={props.onQuizComplete}
              onPrevStage={props.onCloseQuiz}
            />
          </div>
        </div>
      )}

      {/* Reflection Modal */}
      {!props.isSandboxMode && props.ctStage === "evaluation" && props.simResult && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 select-none">
          <div className="relative max-w-xl w-full mx-auto shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col bg-white">
            <Reflection
              levelId={props.activeLevelId}
              levelName={activeLevel?.name || ""}
              playerStepsCount={props.simResult.totalSteps}
              optimalStepsCount={activeLevel?.optimalSteps || 1}
              starsEarned={props.simResult.scoreStars}
              onRestartLevel={props.onResetLevel}
              onNextLevel={props.onNextLevel}
              isLastLevel={props.activeLevelId === LEVELS.length}
            />
          </div>
        </div>
      )}
    </div>
  );
};
