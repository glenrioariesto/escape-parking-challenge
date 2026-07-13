import React, { useState, useEffect, useRef } from "react";
import { Vehicle, MoveAction, CTStage, QuizQuestion } from "@types";
import { LEVELS } from "@levels";
import { audio } from "@lib/audio";
import { QuizSection } from "./components/QuizSection";
import { Reflection } from "./components/Reflection";
import { GridPanel } from "./components/GridPanel";
import { SandboxPanel } from "./components/SandboxPanel";
import { AlgorithmPanel } from "./components/AlgorithmPanel";
import { DecompositionModal } from "./components/DecompositionModal";
import { AnalysisWorkspace } from "./components/AnalysisWorkspace";
import { Info, ChevronRight, Cpu, Flame, Eye, RotateCcw, Play } from "lucide-react";
import { syncQuizQuestionWithVehicles } from "@lib/vehicleHelpers";

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
  activeWalls: { row: number; col: number }[];
  onChangeWalls: (walls: { row: number; col: number }[]) => void;
  isDevMode: boolean;
  onToggleDevMode: () => void;
}

export const ArenaPage: React.FC<ArenaPageProps> = (props) => {
  const activeLevel = LEVELS.find((l) => l.id === props.activeLevelId);
  const [isDecompositionModalOpen, setIsDecompositionModalOpen] = useState(true);

  // Adjust state inline during render when activeLevelId, ctStage or isSandboxMode changes, using Refs to avoid unnecessary re-renders
  const prevLevelIdRef = useRef(props.activeLevelId);
  const prevCtStageRef = useRef(props.ctStage);
  const prevIsSandboxModeRef = useRef(props.isSandboxMode);

  if (
    props.activeLevelId !== prevLevelIdRef.current ||
    props.ctStage !== prevCtStageRef.current ||
    props.isSandboxMode !== prevIsSandboxModeRef.current
  ) {
    const isNewLevel = props.activeLevelId !== prevLevelIdRef.current;
    prevLevelIdRef.current = props.activeLevelId;
    prevCtStageRef.current = props.ctStage;
    prevIsSandboxModeRef.current = props.isSandboxMode;
    if (isNewLevel && !props.isSandboxMode && props.ctStage === "algorithm") {
      setIsDecompositionModalOpen(true);
    } else if (props.isSandboxMode) {
      setIsDecompositionModalOpen(false);
    }
  }

  // Open quiz automatically when stage transitions to 'analysis'
  useEffect(() => {
    if (props.ctStage === "analysis") {
      props.onOpenQuiz();
    }
  }, [props.ctStage]);


  return (
    <div className="flex-1 overflow-hidden flex flex-col min-h-0 h-full w-full p-0">
      <div className="flex flex-row gap-0 items-stretch w-full flex-1 min-h-0 overflow-hidden">
        {/* Left/Main Column: Grid Panel (Fixed, not collapsible) */}
        <div className={`${
          activeLevel && activeLevel.gridCols > 6
            ? "w-[58%] sm:w-[65%] xl:w-[70%]"
            : "w-[50%] sm:w-[50%] xl:w-[60%]"
        } flex-shrink-0 flex flex-col min-h-0 p-1 md:p-4 gap-1.5 md:gap-3 arena-left-column`}>
          <GridPanel
            vehicles={props.activeVehicles}
            onChangeVehicles={props.onChangeVehicles}
            selectedVehicleId={props.selectedVehicleId}
            onSelectVehicle={props.onSelectVehicle}
            isSimulating={props.isSimulating}
            isSandboxMode={props.isSandboxMode}
            onMoveRecorded={props.onSandboxMoveRecorded}
            gridRows={activeLevel?.gridRows ?? 11}
            gridCols={activeLevel?.gridCols ?? 12}
            exitRow={activeLevel?.exitRow}
            levelId={props.activeLevelId}
            onSetSandboxMode={props.onSetSandboxMode}
            onResetLevel={props.onResetLevel}
            ctStage={props.ctStage}
            onOpenDecompositionModal={() => setIsDecompositionModalOpen(true)}
            onOpenQuiz={props.onOpenQuiz}
            activeWalls={props.activeWalls}
            onChangeWalls={props.onChangeWalls}
            isDevMode={props.isDevMode}
            onToggleDevMode={props.onToggleDevMode}
          />
        </div>

        {/* Right Column: Unified Workspace Panel (Modes, Algorithms, Analysis, Sandbox) */}
        <div className="flex-1 h-full w-full min-h-0 flex flex-col bg-white border-l border-slate-200 rounded-l-lg overflow-hidden shadow-sm">
          {/* Header tabs / Mode switcher */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 p-1.5 md:p-4  flex-shrink-0">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  audio.playClick();
                  props.onSetSandboxMode(false);
                  props.onResetLevel();
                }}
                className={`w-9.5 h-9.5 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                  !props.isSandboxMode
                    ? "bg-blue-600 border-blue-600 text-white shadow-md scale-105"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800"
                }`}
                title="Skenario BK"
              >
                <Cpu size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  audio.playClick();
                  props.onSetSandboxMode(true);
                  props.onResetLevel();
                }}
                className={`w-9.5 h-9.5 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                  props.isSandboxMode
                    ? "bg-amber-500 border-amber-500 text-white shadow-md scale-105"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800"
                }`}
                title="Mode Bebas"
              >
                <Flame size={16} />
              </button>

              {/* Eye icon for game guide, visible only in analysis/algorithm stage and NOT in sandbox mode */}
              {!props.isSandboxMode && (props.ctStage === "analysis" || props.ctStage === "algorithm") && (
                <button
                  type="button"
                  onClick={() => {
                    audio.playClick();
                    setIsDecompositionModalOpen(true);
                  }}
                  className="w-9.5 h-9.5 flex items-center justify-center bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 hover:text-blue-700 rounded-xl transition-all cursor-pointer hover:scale-105"
                  title="Lihat Panduan Game"
                >
                  <Eye size={16} />
                </button>
              )}
            </div>

             {/* Ulangi & Jalankan Buttons on the Right */}
             {!props.isSandboxMode && props.ctStage !== "analysis" && (
               <div className="flex gap-1.5 sm:gap-2 items-center">
                 {/* Mobile-only Step Count Badge */}
                 <div className="h-9.5 hidden mobile-landscape-flex items-center text-[9px] font-mono font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 rounded-xl flex-shrink-0 select-none">
                   {props.algorithmSteps.length} Langkah
                 </div>

                 <button
                   type="button"
                   onClick={() => {
                    audio.playClick();
                    props.onResetLevel();
                  }}
                  disabled={props.isSimulating}
                  className="bg-slate-100 hover:bg-slate-200 border border-slate-350 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 font-extrabold w-9.5 h-9.5 lg:w-auto lg:h-auto lg:px-3 lg:py-1.5 text-xs rounded-xl flex items-center justify-center gap-1 lg:gap-1.5 transition-all cursor-pointer shadow-xs flex-shrink-0"
                  title="Ulangi simulasi dari awal"
                >
                  <RotateCcw size={14} className="lg:w-[13px] lg:h-[13px]" />
                  <span className="hidden lg:inline">Ulangi</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    audio.playClick();
                    props.onStartSimulation();
                  }}
                  disabled={props.isSimulating || props.algorithmSteps.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-105 disabled:text-slate-400 disabled:border-slate-100 text-white font-black w-9.5 h-9.5 lg:w-auto lg:h-auto lg:px-3 lg:py-1.5 text-xs rounded-xl flex items-center justify-center gap-1 lg:gap-1.5 transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer border-none flex-shrink-0"
                  title="Jalankan algoritma langkah"
                >
                  <Play size={14} className="fill-current lg:w-[13px] lg:h-[13px]" />
                  <span className="hidden lg:inline">Jalankan</span>
                </button>
              </div>
            )}
          </div>

          {/* Content Body */}
          <div className="flex-1 min-h-0 md:px-4 md:pb-4 overflow-hidden">
            {props.isSandboxMode ? (
              <SandboxPanel onResetLevel={props.onResetLevel} />
            ) : props.ctStage === "analysis" ? (
              <AnalysisWorkspace
                levelName={activeLevel?.name || ""}
                onOpenDecompositionModal={() => setIsDecompositionModalOpen(true)}
                onOpenQuiz={props.onOpenQuiz}
              />
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
                selectedVehicleId={props.selectedVehicleId}
                onSelectVehicle={props.onSelectVehicle}
              />
            )}
          </div>
        </div>
      </div>

      {/* Decomposition (Fase 1) Modal */}
      <DecompositionModal
        isOpen={!props.isSandboxMode && (props.ctStage === "analysis" || props.ctStage === "algorithm") && isDecompositionModalOpen}
        onClose={() => setIsDecompositionModalOpen(false)}
        levelName={activeLevel?.name || ""}
      />

      {/* Quiz Modal */}
      {!props.isSandboxMode && props.ctStage === "analysis" && props.isQuizModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 select-none">
          <div className="relative max-w-xl w-full mx-auto shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col bg-white">
            <button
              type="button"
              onClick={() => { audio.playClick(); props.onCloseQuiz(); }}
              className="absolute top-4 right-4 z-50 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-black text-xs shadow-xs transition-colors cursor-pointer"
            >
              ✕
            </button>
            <QuizSection
              questions={(activeLevel?.quizQuestions || []).map((q) =>
                syncQuizQuestionWithVehicles(q, props.activeVehicles)
              )}
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
