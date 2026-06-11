import React, { useState, useEffect } from "react";
import { LEVELS } from "@levels";
import { useGameState } from "@hooks/useGameState";
import { SplashPage } from "@pages/splash/SplashPage";
import { DashboardPage } from "@pages/dashboard/DashboardPage";
import { ArenaPage } from "@pages/arena/ArenaPage";
import { audio } from "@lib/audio";

type Screen = "splash" | "dashboard" | "arena";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [dismissLandscapePrompt, setDismissLandscapePrompt] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [activeTooltipLevelId, setActiveTooltipLevelId] = useState<number | null>(null);

  const game = useGameState();

  useEffect(() => {
    const check = () => {
      setIsPortraitMobile(window.innerHeight > window.innerWidth && window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleLoadLevel = (levelId: number) => {
    game.handleLoadLevel(levelId);
    setCurrentScreen("arena");
  };

  const handleNextLevel = () => {
    audio.playClick();
    if (game.activeLevelId === LEVELS.length) {
      setCurrentScreen("dashboard");
    } else {
      handleLoadLevel(game.activeLevelId + 1);
    }
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-slate-100 flex flex-col font-sans select-none antialiased text-slate-800">

      {/* Tut Wuri Handayani Logo — fixed top-left screen corner */}
      <img
        src="/img/tut-wuri-handayani.png"
        alt="Tut Wuri Handayani"
        className="fixed top-3 left-3 w-12 h-12 rounded-full shadow-md z-50 pointer-events-none"
      />

      {/* Portrait overlay */}
      {isPortraitMobile && !dismissLandscapePrompt && (
        <div className="fixed inset-0 bg-slate-900/95 z-[9999] flex flex-col items-center justify-center p-6 text-center text-white select-none">
          <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500 animate-[spin_8s_linear_infinite]" />
            <span className="text-5xl animate-[bounce_2s_infinite]">📱</span>
            <span className="absolute text-xl right-2 bottom-2 animate-[ping_1.5s_infinite]">🔄</span>
          </div>
          <h2 className="text-xl font-black mb-2 tracking-tight">Rekomendasi Mode Lansekap</h2>
          <p className="text-xs text-slate-300 max-w-sm mb-6 leading-relaxed font-semibold">
            Putar perangkat atau HP Anda secara mendatar! Mode Lansekap memberikan tampilan grid yang jauh lebih luas dan mudah dimainkan.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs justify-center items-center">
            <div className="bg-blue-600 text-white text-xs font-black px-5 py-2.5 rounded-xl uppercase tracking-wider shadow-md animate-pulse">
              Putar HP Sekarang
            </div>
            <button
              onClick={() => { audio.playClick(); setDismissLandscapePrompt(true); }}
              className="text-slate-400 hover:text-white text-xs font-bold underline transition-colors"
            >
              Tetap Main Portrait
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-hidden flex flex-col max-w-7xl w-full mx-auto p-3 sm:p-4 min-h-0">
        {currentScreen === "splash" && (
          <SplashPage onStart={() => setCurrentScreen("dashboard")} />
        )}

        {currentScreen === "dashboard" && (
          <DashboardPage
            progress={game.progress}
            activeTooltipLevelId={activeTooltipLevelId}
            setActiveTooltipLevelId={setActiveTooltipLevelId}
            onGoToSplash={() => setCurrentScreen("splash")}
            onLoadLevel={handleLoadLevel}
          />
        )}

        {currentScreen === "arena" && (
          <ArenaPage
            activeLevelId={game.activeLevelId}
            activeVehicles={game.activeVehicles}
            onChangeVehicles={game.setActiveVehicles}
            selectedVehicleId={game.selectedVehicleId}
            onSelectVehicle={game.setSelectedVehicleId}
            ctStage={game.ctStage}
            isSandboxMode={game.isSandboxMode}
            onSetSandboxMode={game.setIsSandboxMode}
            algorithmSteps={game.algorithmSteps}
            onUpdateSteps={game.setAlgorithmSteps}
            isSimulating={game.isSimulating}
            currentStepIndex={game.currentStepIndex}
            simulationLogs={game.simulationLogs}
            simResult={game.simResult}
            sandboxMoveCount={game.sandboxMoveCount}
            isQuizModalOpen={isQuizModalOpen}
            onOpenQuiz={() => setIsQuizModalOpen(true)}
            onCloseQuiz={() => setIsQuizModalOpen(false)}
            onStartSimulation={game.startSimulation}
            onResetLevel={game.handleResetLevel}
            onQuizComplete={(score) => { game.handleQuizComplete(score); setIsQuizModalOpen(false); }}
            onSandboxMoveRecorded={game.handleSandboxMoveRecorded}
            onNextLevel={handleNextLevel}
            onSetCtStage={game.setCtStage}
          />
        )}
      </main>

    </div>
  );
}
