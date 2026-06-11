import React, { useRef } from "react";
import { Vehicle } from "../../../types";
import { HelpCircle } from "lucide-react";
import audio from "../../../lib/audio";

// Computes which cells are occupied around the board
export function getOccupiedCells(vehicles: Vehicle[], excludeId?: string, gridRows = 6, gridCols = 6) {
  const grid = Array(gridRows)
    .fill(null)
    .map(() => Array(gridCols).fill(null) as (string | null)[]);

  vehicles.forEach((v) => {
    if (v.id === excludeId) return;
    for (let i = 0; i < v.length; i++) {
      if (v.direction === "horizontal") {
        const c = v.col + i;
        if (v.row >= 0 && v.row < gridRows && c >= 0 && c < gridCols) {
          grid[v.row][c] = v.id;
        }
      } else {
        const r = v.row + i;
        if (r >= 0 && r < gridRows && v.col >= 0 && v.col < gridCols) {
          grid[r][v.col] = v.id;
        }
      }
    }
  });
  return grid;
}

// Check if a specific single-cell move is valid
export function checkCollision(
  vehicle: Vehicle,
  dir: "left" | "right" | "up" | "down",
  steps: number,
  vehicles: Vehicle[],
  gridRows = 6,
  gridCols = 6
): { valid: boolean; reason?: string } {
  const occupied = getOccupiedCells(vehicles, vehicle.id, gridRows, gridCols);

  if (vehicle.direction === "horizontal") {
    if (dir === "up" || dir === "down") {
      return { valid: false, reason: "Arah gerakan tidak sesuai dengan orientasi mobil mendatar." };
    }
    const stepSign = dir === "right" ? 1 : -1;
    const newCol = vehicle.col + stepSign * steps;

    // Check boundary
    if (newCol < 0 || newCol + vehicle.length > gridCols) {
      return { valid: false, reason: "Gerakan keluar dari area parkir (batas grid)." };
    }

    if (dir === "right") {
      for (let c = vehicle.col + vehicle.length; c < newCol + vehicle.length; c++) {
        if (occupied[vehicle.row][c] !== null) {
          const blockerId = occupied[vehicle.row][c];
          const blocker = vehicles.find(v => v.id === blockerId);
          return { valid: false, reason: `Menabrak ${blocker?.label || blockerId || "kendaraan lain"}!` };
        }
      }
    } else {
      for (let c = newCol; c < vehicle.col; c++) {
        if (occupied[vehicle.row][c] !== null) {
          const blockerId = occupied[vehicle.row][c];
          const blocker = vehicles.find(v => v.id === blockerId);
          return { valid: false, reason: `Menabrak ${blocker?.label || blockerId || "kendaraan lain"}!` };
        }
      }
    }
  } else {
    // vertical
    if (dir === "left" || dir === "right") {
      return { valid: false, reason: "Arah gerakan tidak sesuai dengan orientasi mobil tegak." };
    }
    const stepSign = dir === "down" ? 1 : -1;
    const newRow = vehicle.row + stepSign * steps;

    // Check boundary
    if (newRow < 0 || newRow + vehicle.length > gridRows) {
      return { valid: false, reason: "Gerakan keluar dari area parkir (batas grid)." };
    }

    if (dir === "down") {
      for (let r = vehicle.row + vehicle.length; r < newRow + vehicle.length; r++) {
        if (occupied[r][vehicle.col] !== null) {
          const blockerId = occupied[r][vehicle.col];
          const blocker = vehicles.find(v => v.id === blockerId);
          return { valid: false, reason: `Menabrak ${blocker?.label || blockerId || "kendaraan lain"}!` };
        }
      }
    } else {
      for (let r = newRow; r < vehicle.row; r++) {
        if (occupied[r][vehicle.col] !== null) {
          const blockerId = occupied[r][vehicle.col];
          const blocker = vehicles.find(v => v.id === blockerId);
          return { valid: false, reason: `Menabrak ${blocker?.label || blockerId || "kendaraan lain"}!` };
        }
      }
    }
  }

  return { valid: true };
}

interface ParkingGridProps {
  vehicles: Vehicle[];
  onChangeVehicles: (updated: Vehicle[]) => void;
  selectedVehicleId: string | null;
  onSelectVehicle: (id: string | null) => void;
  disabled?: boolean;
  onMoveRecorded?: (vehicleId: string, dir: "left" | "right" | "up" | "down", dist: number) => void;
  gridRows?: number;
  gridCols?: number;
  exitRow?: number;
}

export const ParkingGrid: React.FC<ParkingGridProps> = ({
  vehicles,
  onChangeVehicles,
  selectedVehicleId,
  onSelectVehicle,
  disabled = false,
  onMoveRecorded,
  gridRows = 6,
  gridCols = 6,
  exitRow = 2,
}) => {
  const cellW = 100 / gridCols; // percentage width per cell
  const cellH = 100 / gridRows; // percentage height per cell

  // Drag state ref for direct fluid mouse/touch sliding
  const dragRef = useRef<{
    vehicleId: string;
    startX: number;
    startY: number;
    startCol: number;
    startRow: number;
    cellPixels: number;
    direction: "horizontal" | "vertical";
    currentShift: number;
  } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, v: Vehicle) => {
    e.stopPropagation();
    onSelectVehicle(v.id);
    audio.playClick();

    if (disabled) return;

    const board = document.getElementById("parking-board");
    if (!board) return;

    const rect = board.getBoundingClientRect();
    const cellPixels = rect.width / gridCols;

    dragRef.current = {
      vehicleId: v.id,
      startX: e.clientX,
      startY: e.clientY,
      startCol: v.col,
      startRow: v.row,
      cellPixels,
      direction: v.direction,
      currentShift: 0,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const drag = dragRef.current;

    const diffX = e.clientX - drag.startX;
    const diffY = e.clientY - drag.startY;

    let shift = 0;
    if (drag.direction === "horizontal") {
      shift = Math.round(diffX / drag.cellPixels);
    } else {
      shift = Math.round(diffY / drag.cellPixels);
    }

    if (shift !== drag.currentShift) {
      const currentVehicle = vehicles.find((v) => v.id === drag.vehicleId);
      if (!currentVehicle) return;

      const steps = Math.abs(shift);
      const dir = drag.direction === "horizontal"
        ? (shift > 0 ? "right" : "left")
        : (shift > 0 ? "down" : "up");

      if (steps === 0) {
        const updated = vehicles.map((v) => {
          if (v.id === drag.vehicleId) {
            return { ...v, col: drag.startCol, row: drag.startRow };
          }
          return v;
        });
        drag.currentShift = 0;
        onChangeVehicles(updated);
      } else {
        const tempVehicle = { ...currentVehicle, col: drag.startCol, row: drag.startRow };
        const test = checkCollision(tempVehicle, dir, steps, vehicles, gridRows, gridCols);
        if (test.valid) {
          const updated = vehicles.map((v) => {
            if (v.id === drag.vehicleId) {
              if (drag.direction === "horizontal") {
                return { ...v, col: drag.startCol + (shift > 0 ? steps : -steps) };
              } else {
                return { ...v, row: drag.startRow + (shift > 0 ? steps : -steps) };
              }
            }
            return v;
          });
          drag.currentShift = shift;
          onChangeVehicles(updated);
          audio.playSlide();
        }
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const drag = dragRef.current;

    if (drag.currentShift !== 0 && onMoveRecorded) {
      const dir = drag.direction === "horizontal"
        ? (drag.currentShift > 0 ? "right" : "left")
        : (drag.currentShift > 0 ? "down" : "up");
      onMoveRecorded(drag.vehicleId, dir, Math.abs(drag.currentShift));
    }

    dragRef.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);



  // Render grid cells
  const renderBackgroundSlots = () => {
    const cells = [];
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const isExitLine = r === exitRow && c === gridCols - 1;
        cells.push(
          <div
            key={`cell-${r}-${c}`}
            className={`border border-slate-300 relative flex items-center justify-center ${
              isExitLine
                ? "bg-emerald-50"
                : (r + c) % 2 === 0
                ? "bg-slate-200"
                : "bg-slate-100"
            }`}
          >
            <div className="absolute top-0.5 left-0.5 text-[7px] font-mono text-slate-400 select-none">
              {r},{c}
            </div>
            {isExitLine && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-emerald-500/15 animate-pulse pointer-events-none" />
            )}
          </div>
        );
      }
    }
    return cells;
  };

  // Exit gate positioning (percentage-based)
  const exitTopPct = (exitRow / gridRows) * 100;
  const exitHeightPct = (1 / gridRows) * 100;
  const exitMidPct = exitTopPct + exitHeightPct / 2;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Parking Board Frame */}
      <div
        id="parking-board"
        className="relative w-full bg-slate-400 border-8 border-slate-700 rounded-2xl shadow-xl overflow-hidden p-1 select-none"
        style={{ aspectRatio: `${gridCols} / ${gridRows}`, maxWidth: gridCols > 6 ? "600px" : "420px", minWidth: "260px" }}
      >
        {/* Background Slots Grid */}
        <div
          className="absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gridTemplateRows: `repeat(${gridRows}, 1fr)` }}
        >
          {renderBackgroundSlots()}
        </div>

        {/* Exit Gate Marker */}
        <div
          className="absolute right-0 w-2 bg-emerald-500 z-10 shadow-md rounded-l flex flex-col justify-between py-1"
          style={{ top: `${exitTopPct}%`, height: `${exitHeightPct}%` }}
        >
          <div className="w-full h-[2px] bg-white animate-pulse" />
          <div className="w-full h-[2px] bg-white animate-pulse" />
          <div className="w-full h-[2px] bg-white animate-pulse" />
        </div>

        {/* EXIT Label */}
        <div
          className="absolute right-[-20px] origin-center rotate-90 text-[9px] tracking-widest font-mono text-white font-extrabold bg-emerald-600 px-2.5 py-0.5 rounded shadow border border-emerald-700 z-30"
          style={{ top: `${exitMidPct}%` }}
        >
          EXIT ➔
        </div>

        {/* Vehicles layer */}
        <div className="absolute inset-0 pointer-events-none">
          {vehicles.map((v) => {
            const isSelected = selectedVehicleId === v.id;
            const top = v.row * cellH;
            const left = v.col * cellW;
            const width = v.direction === "horizontal" ? v.length * cellW : cellW;
            const height = v.direction === "vertical" ? v.length * cellH : cellH;

            let vehicleStyleClasses = "";
            if (v.id === "R" || v.isPlayer) {
              vehicleStyleClasses = "bg-[#EF4444] border-[3px] border-[#B91C1C] text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]";
            } else if (v.length >= 3) {
              vehicleStyleClasses = "bg-[#F59E0B] border-[3px] border-[#B45309] text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]";
            } else {
              vehicleStyleClasses = "bg-[#3B82F6] border-[3px] border-[#1D4ED8] text-white shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]";
            }

            return (
              <div
                key={v.id}
                onPointerDown={(e) => handlePointerDown(e, v)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onClick={(e) => { e.stopPropagation(); }}
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${width}%`,
                  height: `${height}%`,
                }}
                className={`absolute p-1 cursor-grab active:cursor-grabbing pointer-events-auto rounded-xl select-none touch-none transition-all duration-300 ease-out ${
                  isSelected
                    ? "ring-4 ring-blue-500 ring-offset-2 ring-offset-slate-100 z-30 scale-[1.02]"
                    : "hover:scale-[1.01] hover:brightness-105 z-20"
                }`}
              >
                <div
                  className={`w-full h-full rounded-lg relative flex flex-col items-center justify-center overflow-hidden ${vehicleStyleClasses}`}
                >
                  <div className="absolute inset-[2px] rounded border border-white/20 pointer-events-none flex flex-col justify-between">
                    <div className="flex justify-between p-1">
                      <div className="w-2 h-1.5 bg-neutral-950/40 rounded-sm" />
                      <div className="w-2 h-1.5 bg-neutral-950/40 rounded-sm" />
                    </div>
                    <div className="flex justify-between p-1">
                      <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full" />
                    </div>
                  </div>

                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-neutral-950/25 border border-white/10 ${
                    v.direction === "horizontal" ? "w-[50%] h-[40%]" : "w-[40%] h-[50%]"
                  }`} />

                  <span className="font-sans font-black text-white text-xs select-none z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] flex flex-col items-center">
                    {v.id === "R" ? "MOBIL R" : `MOBIL ${v.id}`}
                    {v.isPlayer && (
                      <span className="text-[7px] tracking-tighter uppercase text-rose-200 font-bold">
                        PEMAIN
                      </span>
                    )}
                  </span>

                  <div className={`absolute opacity-50 text-[10px] pointer-events-none flex ${
                    v.direction === "horizontal" ? "flex-row justify-between w-full px-2" : "flex-col justify-between h-full py-2"
                  }`}>
                    {v.direction === "horizontal" ? (
                      <>
                        <span className="text-white text-[8px]">◀</span>
                        <span className="text-white text-[8px]">▶</span>
                      </>
                    ) : (
                      <>
                        <span className="text-white text-[8px]">▲</span>
                        <span className="text-white text-[8px]">▼</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions Overlay */}
        {!selectedVehicleId && !disabled && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-1.5 pointer-events-none">
            <HelpCircle size={13} className="text-amber-500 animate-bounce" />
            <span className="text-[10px] font-sans font-medium text-slate-600">
              Sentuh mobil untuk memindahkan
            </span>
          </div>
        )}
      </div>

    </div>
  );
};
