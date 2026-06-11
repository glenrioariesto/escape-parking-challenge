import React from "react";
import { Vehicle } from "@types";
import { ParkingGrid } from "@pages/arena/components/ParkingGrid";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface GridPanelProps {
  vehicles: Vehicle[];
  onChangeVehicles: (v: Vehicle[]) => void;
  selectedVehicleId: string | null;
  onSelectVehicle: (id: string | null) => void;
  isSimulating: boolean;
  isSandboxMode: boolean;
  onMoveRecorded: (vId: string, dir: string, dist: number) => void;
  gridRows?: number;
  gridCols?: number;
  exitRow?: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const GridPanel: React.FC<GridPanelProps> = ({
  vehicles,
  onChangeVehicles,
  selectedVehicleId,
  onSelectVehicle,
  isSimulating,
  isSandboxMode,
  onMoveRecorded,
  gridRows = 6,
  gridCols = 6,
  exitRow = 2,
  isCollapsed,
  onToggleCollapse,
}) => {
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center justify-start gap-2 pt-4">
        <button
          onClick={onToggleCollapse}
          className="bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 p-2 rounded-xl border border-slate-200 shadow-sm transition-colors cursor-pointer"
          title="Perluas Panel Grid"
        >
          <PanelLeftOpen size={18} />
        </button>
        <span className="text-[9px] font-mono text-slate-400 font-bold tracking-wider writing-mode-vertical rotate-180" style={{ writingMode: "vertical-rl" }}>
          Grid Parkir
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full overflow-y-auto pr-1 pb-4 flex-shrink-0">
      <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-sm flex flex-col items-center w-full relative">
        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="absolute top-3 right-3 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 p-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer z-10"
          title="Ciutkan Panel"
        >
          <PanelLeftClose size={14} />
        </button>

        <ParkingGrid
          vehicles={vehicles}
          onChangeVehicles={onChangeVehicles}
          selectedVehicleId={selectedVehicleId}
          onSelectVehicle={onSelectVehicle}
          disabled={isSimulating || !isSandboxMode}
          onMoveRecorded={onMoveRecorded}
          gridRows={gridRows}
          gridCols={gridCols}
          exitRow={exitRow}
        />
      </div>
    </div>
  );
};
