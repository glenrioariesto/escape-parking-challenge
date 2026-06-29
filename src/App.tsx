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
  const [isPortrait, setIsPortrait] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [activeTooltipLevelId, setActiveTooltipLevelId] = useState<number | null>(null);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);

  const game = useGameState();

  // 1. Try to lock orientation to landscape via Screen Orientation API
  useEffect(() => {
    const lockOrientation = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const screen = window.screen as any;
        if (screen?.orientation?.lock) {
          await screen.orientation.lock("landscape");
        }
      } catch {
        // Browser may deny the lock (e.g. desktop); we'll show the overlay instead
      }
    };
    lockOrientation();
  }, []);

  // 2. Detect portrait on ALL devices (not just mobile)
  useEffect(() => {
    const check = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    check();
    window.addEventListener("resize", check);
    // Also listen to orientationchange for instant reaction on mobile
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
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
        src={`${import.meta.env.BASE_URL}img/tut-wuri-handayani.png`}
        alt="Tut Wuri Handayani"
        className="fixed top-3 left-3 md:top-4 md:left-4 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full shadow-md z-50 pointer-events-none"
      />

      {/* Mandatory Landscape Overlay — shown on ALL devices in portrait */}
      {isPortrait && (
        <div className="fixed inset-0 bg-slate-950/98 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center p-6 text-center text-white select-none">
          {/* Animated phone rotate illustration */}
          <div className="relative flex items-center justify-center mb-8">
            {/* Outer spinning ring */}
            <div className="absolute w-36 h-36 rounded-full border-4 border-dashed border-blue-500/60 animate-[spin_6s_linear_infinite]" />
            {/* Inner pulsing ring */}
            <div className="absolute w-28 h-28 rounded-full border-2 border-blue-400/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
            {/* Phone emoji rotating */}
            <div className="text-7xl animate-[spin_3s_ease-in-out_infinite]" style={{ animationTimingFunction: 'cubic-bezier(0.45,0.05,0.55,0.95)' }}>📱</div>
            {/* Arrow indicators */}
            <span className="absolute -right-2 -bottom-2 text-3xl animate-[bounce_1.2s_infinite]">↩</span>
          </div>

          <h2 className="text-2xl font-black mb-3 tracking-tight text-white drop-shadow-lg">
            🌄 Mode Lansekap Diperlukan
          </h2>
          <p className="text-sm text-slate-300 max-w-xs mb-8 leading-relaxed font-medium">
            Putar perangkat Anda ke posisi mendatar (landscape) untuk memainkan <span className="text-blue-400 font-bold">Escape Parking Challenge</span>.
          </p>

          {/* Visual instruction arrows */}
          <div className="flex items-center gap-4 bg-slate-800/80 border border-slate-700 rounded-2xl px-8 py-4 shadow-xl">
            <span className="text-4xl">📱</span>
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-1">
                <span className="text-blue-400 font-black text-lg">←</span>
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest self-center">Putar</span>
                <span className="text-blue-400 font-black text-lg">→</span>
              </div>
              <div className="text-slate-500 text-[10px]">landscape mode</div>
            </div>
            <span className="text-4xl rotate-90">📱</span>
          </div>

          <p className="mt-6 text-slate-500 text-xs">
            Game ini dioptimalkan untuk layar lebar (landscape)
          </p>
        </div>
      )}

      {showFullscreenPrompt && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 select-none">
          <div className="relative max-w-sm w-full mx-auto bg-white/95 border border-slate-200/50 shadow-2xl rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center animate-scaleIn">
            {/* Pulsing Screen Emoji/Icon */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute w-20 h-20 bg-blue-100/50 rounded-full animate-ping opacity-75" />
              <div className="w-16 h-16 bg-blue-50 border border-blue-150 rounded-2xl flex items-center justify-center text-3xl shadow-sm z-10">
                📺
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight mb-2">
              Mode Layar Penuh
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mb-6">
              Apakah Anda ingin masuk ke mode layar penuh?
            </p>

            <div className="flex items-center gap-3 w-full">
              <button
                type="button"
                onClick={async () => {
                  audio.playClick();
                  try {
                    if (document.documentElement.requestFullscreen) {
                      await document.documentElement.requestFullscreen();
                    }
                  } catch (err) {
                    console.warn("Fullscreen permission denied or not supported by browser", err);
                  }
                  setShowFullscreenPrompt(false);
                  setCurrentScreen("dashboard");
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10 active:scale-95 cursor-pointer border-none"
              >
                Yes
              </button>
              
              <button
                type="button"
                onClick={() => {
                  audio.playClick();
                  setShowFullscreenPrompt(false);
                  setCurrentScreen("dashboard");
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 border border-slate-250 text-slate-700 font-extrabold py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-hidden bg-[#999999] flex flex-col w-full mx-auto min-h-0">
        {currentScreen === "splash" && (
          <SplashPage
            onStart={() => {
              const isFullscreenSupported = typeof document !== "undefined" && !!document.documentElement.requestFullscreen;
              const isCurrentlyFullscreen = typeof document !== "undefined" && !!document.fullscreenElement;
              if (isFullscreenSupported && !isCurrentlyFullscreen) {
                setShowFullscreenPrompt(true);
              } else {
                setCurrentScreen("dashboard");
              }
            }}
          />
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
            activeWalls={game.activeWalls}
            onChangeWalls={game.setActiveWalls}
            isDevMode={game.isDevMode}
            onToggleDevMode={() => game.setIsDevMode(prev => !prev)}
          />
        )}
      </main>

    </div>
  );
}
