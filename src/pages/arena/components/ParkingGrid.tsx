import React, { useState, useRef, useEffect } from "react";
import { Vehicle } from "../../../types";
import { HelpCircle } from "lucide-react";
import audio from "../../../lib/audio";
import { getVehicleImagePath, getVehicleDisplayNamesMap, getVehicleBaseName } from "../../../lib/vehicleHelpers";

// Computes which cells are occupied around the board
export function getOccupiedCells(
  vehicles: Vehicle[],
  excludeId?: string,
  gridRows = 11,
  gridCols = 12,
  walls: { row: number; col: number }[] = []
) {
  const grid = Array(gridRows)
    .fill(null)
    .map(() => Array(gridCols).fill(null) as (string | null)[]);

  // Mark walls first
  walls.forEach((w) => {
    if (w.row >= 0 && w.row < gridRows && w.col >= 0 && w.col < gridCols) {
      grid[w.row][w.col] = "WALL";
    }
  });

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
  gridRows = 11,
  gridCols = 12,
  walls: { row: number; col: number }[] = []
): { valid: boolean; reason?: string } {
  const occupied = getOccupiedCells(vehicles, vehicle.id, gridRows, gridCols, walls);
  const nameMap = getVehicleDisplayNamesMap(vehicles);
  const getBlockerName = (b?: Vehicle) => b ? (nameMap[b.id] || getVehicleBaseName(b)) : "kendaraan lain";

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
        const blockerId = occupied[vehicle.row][c];
        if (blockerId !== null) {
          if (blockerId === "WALL") {
            return { valid: false, reason: "Menabrak dinding pembatas!" };
          }
          const blocker = vehicles.find((v) => v.id === blockerId);
          return { valid: false, reason: `Menabrak ${getBlockerName(blocker)}!` };
        }
      }
    } else {
      for (let c = newCol; c < vehicle.col; c++) {
        const blockerId = occupied[vehicle.row][c];
        if (blockerId !== null) {
          if (blockerId === "WALL") {
            return { valid: false, reason: "Menabrak dinding pembatas!" };
          }
          const blocker = vehicles.find((v) => v.id === blockerId);
          return { valid: false, reason: `Menabrak ${getBlockerName(blocker)}!` };
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
        const blockerId = occupied[r][vehicle.col];
        if (blockerId !== null) {
          if (blockerId === "WALL") {
            return { valid: false, reason: "Menabrak dinding pembatas!" };
          }
          const blocker = vehicles.find((v) => v.id === blockerId);
          return { valid: false, reason: `Menabrak ${getBlockerName(blocker)}!` };
        }
      }
    } else {
      for (let r = newRow; r < vehicle.row; r++) {
        const blockerId = occupied[r][vehicle.col];
        if (blockerId !== null) {
          if (blockerId === "WALL") {
            return { valid: false, reason: "Menabrak dinding pembatas!" };
          }
          const blocker = vehicles.find((v) => v.id === blockerId);
          return { valid: false, reason: `Menabrak ${getBlockerName(blocker)}!` };
        }
      }
    }
  }

  return { valid: true };
}

export function isLevelSolved(
  vehicles: Vehicle[],
  gridRows = 11,
  gridCols = 12,
  defaultExitRow = 4,
  defaultExitCol = 4
): boolean {
  const playerCars = vehicles.filter((v) => v.isPlayer || v.id === "R");
  if (playerCars.length === 0) return false;

  return playerCars.every((v) => {
    if (v.direction === "vertical") {
      const col = v.exitCol !== undefined ? v.exitCol : defaultExitCol;
      return v.row >= gridRows - v.length && v.col === col;
    } else {
      const row = v.exitRow !== undefined ? v.exitRow : defaultExitRow;
      return v.col >= gridCols - v.length && v.row === row;
    }
  });
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
  levelId?: number;
  activeWalls?: { row: number; col: number }[];
  onChangeWalls?: (walls: { row: number; col: number }[]) => void;
  isDevMode?: boolean;
  onToggleDevMode?: () => void;
}

export const ParkingGrid: React.FC<ParkingGridProps> = ({
  vehicles,
  onChangeVehicles,
  selectedVehicleId,
  onSelectVehicle,
  disabled = false,
  onMoveRecorded,
  gridRows = 11,
  gridCols = 12,
  exitRow = 4,
  levelId,
  activeWalls = [],
  onChangeWalls,
  isDevMode = false,
  onToggleDevMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [dragState, setDragState] = useState<any | null>(null);

  // Image caches to avoid reloading on each frame
  const imageCacheRef = useRef<{ [key: string]: HTMLImageElement }>({});
  const bgImageRef = useRef<HTMLImageElement | null>(null);

  // Keep tracking values in refs for zero-lag drag/pan
  const vehiclesRef = useRef<Vehicle[]>(vehicles);
  const selectedVehicleIdRef = useRef<string | null>(selectedVehicleId);
  const activeWallsRef = useRef<{ row: number; col: number }[]>(activeWalls);
  const isDevModeRef = useRef<boolean>(isDevMode);

  vehiclesRef.current = vehicles;
  selectedVehicleIdRef.current = selectedVehicleId;
  activeWallsRef.current = activeWalls;
  isDevModeRef.current = isDevMode;

  // Keep track of visual positions for smooth sliding animation
  const visualPositionsRef = useRef<{ [id: string]: { col: number; row: number } }>({});
  const animationFrameIdRef = useRef<number | null>(null);

  // Smooth sliding animation loop using requestAnimationFrame
  const animatePositions = () => {
    let needsMoreFrames = false;
    const lerpSpeed = 0.15; // Speed of slide (higher = faster)
    const threshold = 0.01;

    vehiclesRef.current.forEach((v) => {
      const current = visualPositionsRef.current[v.id];
      if (!current) {
        visualPositionsRef.current[v.id] = { col: v.col, row: v.row };
        return;
      }

      // If being dragged, keep in sync with visual pos of drag
      if (dragInfoRef.current && dragInfoRef.current.vehicleId === v.id) {
        current.col = v.direction === "horizontal" ? dragInfoRef.current.visualPos : v.col;
        current.row = v.direction === "vertical" ? dragInfoRef.current.visualPos : v.row;
        return;
      }

      // Smoothly slide col
      if (Math.abs(current.col - v.col) > threshold) {
        current.col += (v.col - current.col) * lerpSpeed;
        needsMoreFrames = true;
      } else {
        current.col = v.col;
      }

      // Smoothly slide row
      if (Math.abs(current.row - v.row) > threshold) {
        current.row += (v.row - current.row) * lerpSpeed;
        needsMoreFrames = true;
      } else {
        current.row = v.row;
      }
    });

    requestRedraw();

    if (needsMoreFrames) {
      animationFrameIdRef.current = requestAnimationFrame(animatePositions);
    } else {
      animationFrameIdRef.current = null;
    }
  };

  // Start animation loop when vehicles prop changes
  useEffect(() => {
    // Initialize any missing vehicles
    vehicles.forEach((v) => {
      if (!visualPositionsRef.current[v.id]) {
        visualPositionsRef.current[v.id] = { col: v.col, row: v.row };
      }
    });

    // Check if any position differs
    const hasDifference = vehicles.some((v) => {
      const current = visualPositionsRef.current[v.id];
      return current && (Math.abs(current.col - v.col) > 0.01 || Math.abs(current.row - v.row) > 0.01);
    });

    if (hasDifference && !animationFrameIdRef.current) {
      animationFrameIdRef.current = requestAnimationFrame(animatePositions);
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [vehicles]);

  // Drag visual offsets and boundaries ref
  const dragInfoRef = useRef<{
    vehicleId: string;
    startCol: number;
    startRow: number;
    startX: number;
    startY: number;
    minVal: number;
    maxVal: number;
    visualPos: number;
    direction: "horizontal" | "vertical";
  } | null>(null);

  // Lazy loads background grid image maps-level-1.svg
  const getBgImage = () => {
    if (bgImageRef.current) {
      return bgImageRef.current;
    }
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}img/maps-level-1.svg`;
    img.onload = () => {
      requestRedraw();
    };
    bgImageRef.current = img;
    return img;
  };

  // Lazy loads a vehicle image
  const getVehicleImage = (v: Vehicle) => {
    const src = getVehicleImagePath(v);
    if (imageCacheRef.current[src]) {
      return imageCacheRef.current[src];
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      requestRedraw();
    };
    imageCacheRef.current[src] = img;
    return img;
  };

  // Canvas drawing loop
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawRoundRect = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
      if (c.roundRect) {
        c.roundRect(x, y, w, h, r);
      } else {
        c.beginPath();
        c.moveTo(x + r, y);
        c.lineTo(x + w - r, y);
        c.quadraticCurveTo(x + w, y, x + w, y + r);
        c.lineTo(x + w, y + h - r);
        c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        c.lineTo(x + r, y + h);
        c.quadraticCurveTo(x, y + h, x, y + h - r);
        c.lineTo(x, y + r);
        c.quadraticCurveTo(x, y, x + r, y);
        c.closePath();
      }
    };

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Adapt resolution for Retina screens (high DPI)
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);


    // Calculate grid dimensions centered inside the fluid canvas with padding for coordinates
    const padLeft = 28;
    const padTop = 28;
    const cellSize = Math.min((rect.width - padLeft) / gridCols, (rect.height - padTop) / gridRows);
    const xOffset = (rect.width - padLeft - gridCols * cellSize) / 2 + padLeft;
    const yOffset = (rect.height - padTop - gridRows * cellSize) / 2 + padTop;

    const playerCar = vehiclesRef.current.find((v) => v.isPlayer || v.id === "R");
    const isPlayerVertical = playerCar?.direction === "vertical";
    const exitCol = playerCar ? playerCar.col : 4;

    ctx.save();
    // Translate rendering origin to the centered parking grid
    ctx.translate(xOffset, yOffset);

    // Draw grid coordinates (column numbers on top, row numbers on left)
    ctx.save();
    ctx.fillStyle = "rgba(71, 85, 105, 0.8)";
    ctx.font = "600 11px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let c = 0; c < gridCols; c++) {
      ctx.fillText(String(c), c * cellSize + cellSize / 2, -14);
    }
    for (let r = 0; r < gridRows; r++) {
      ctx.fillText(String(r), -14, r * cellSize + cellSize / 2);
    }
    ctx.restore();

    // 1. Draw Grid Slots and Borders
    const bgImg = getBgImage();
    if (bgImg.complete) {
      ctx.drawImage(bgImg, 0, 0, gridCols * cellSize, gridRows * cellSize);
    }

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const isExitLine = isPlayerVertical
          ? r === gridRows - 1 && c === exitCol
          : r === exitRow && c === gridCols - 1;

        if (!bgImg.complete) {
          ctx.fillStyle = isExitLine
            ? "#E8F5E9" // Emerald light tint for exit row slot
            : (r + c) % 2 === 0
            ? "#F8FAFC" // Slate 50
            : "#F1F5F9"; // Slate 100

          ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }

        // Grid coordinates text (only in dev mode)
        if (isDevModeRef.current) {
          ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
          ctx.font = "bold 8px monospace";
          ctx.fillText(`${r},${c}`, c * cellSize + 4, r * cellSize + 11);
        }
      }
    }

    // Overlay thin grid outlines (always visible, only lines, no text)
    ctx.strokeStyle = "rgba(15, 23, 42, 0.08)";
    ctx.lineWidth = 1;
    for (let r = 0; r <= gridRows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellSize);
      ctx.lineTo(gridCols * cellSize, r * cellSize);
      ctx.stroke();
    }
    for (let c = 0; c <= gridCols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellSize, 0);
      ctx.lineTo(c * cellSize, gridRows * cellSize);
      ctx.stroke();
    }

    // 2. Draw Exit Gate Indicator
    const playerCars = vehiclesRef.current.filter((v) => v.isPlayer || v.id === "R");
    playerCars.forEach((v) => {
      ctx.save();
      ctx.fillStyle = "#10B981"; // Emerald 500
      if (v.direction === "vertical") {
        const col = v.exitCol !== undefined ? v.exitCol : exitCol;
        ctx.fillRect(col * cellSize, gridRows * cellSize - 5, cellSize, 5);

        ctx.fillStyle = "#10B981";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText("EXIT ▼", col * cellSize + cellSize / 2, gridRows * cellSize + 2);
      } else {
        const row = v.exitRow !== undefined ? v.exitRow : exitRow;
        const exitLeftOnGrid = gridCols * cellSize;
        ctx.fillRect(exitLeftOnGrid - 5, row * cellSize, 5, cellSize);

        ctx.fillStyle = "#10B981";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("EXIT ➔", exitLeftOnGrid + 4, row * cellSize + cellSize / 2);
      }
      ctx.restore();
    });

    // 3. Draw Walls
    activeWallsRef.current.forEach((w) => {
      const wx = w.col * cellSize;
      const wy = w.row * cellSize;
      
      ctx.save();
      if (isDevModeRef.current) {
        // Dev mode: draw a visible gray hazard block with yellow warnings
        ctx.fillStyle = "#334155"; // Slate 700
        ctx.beginPath();
        drawRoundRect(ctx, wx + 2, wy + 2, cellSize - 4, cellSize - 4, 6);
        ctx.fill();
        
        // Draw stripes
        ctx.strokeStyle = "#F59E0B"; // Amber 500
        ctx.lineWidth = 3.5;
        ctx.lineCap = "round";
        ctx.save();
        ctx.beginPath();
        drawRoundRect(ctx, wx + 2, wy + 2, cellSize - 4, cellSize - 4, 6);
        ctx.clip();
        
        for (let offset = -cellSize; offset < cellSize * 2; offset += 14) {
          ctx.beginPath();
          ctx.moveTo(wx + offset, wy);
          ctx.lineTo(wx + offset + cellSize, wy + cellSize);
          ctx.stroke();
        }
        ctx.restore();
        
        // Border
        ctx.strokeStyle = "#1E293B";
        ctx.lineWidth = 2;
        ctx.beginPath();
        drawRoundRect(ctx, wx + 2, wy + 2, cellSize - 4, cellSize - 4, 6);
        ctx.stroke();
        
        // Text
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 8px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("WALL", wx + cellSize / 2, wy + cellSize / 2);
      } else {
        // Production mode: completely transparent
      }
      ctx.restore();
    });

    // 4. Draw Vehicles
    vehiclesRef.current.forEach((v) => {
      const isSelected = selectedVehicleIdRef.current === v.id;

      // Draw vehicle based on visual state (if currently dragged, use visual pos from ref, else use animated visualPos)
      const isThisVehicleDragged = dragInfoRef.current?.vehicleId === v.id;
      const visualPos = visualPositionsRef.current[v.id] || { col: v.col, row: v.row };
      const drawCol = (isThisVehicleDragged && dragInfoRef.current?.direction === "horizontal")
        ? dragInfoRef.current.visualPos
        : visualPos.col;
      const drawRow = (isThisVehicleDragged && dragInfoRef.current?.direction === "vertical")
        ? dragInfoRef.current.visualPos
        : visualPos.row;

      const vx = drawCol * cellSize;
      const vy = drawRow * cellSize;
      const vw = (v.direction === "horizontal" ? v.length : 1) * cellSize;
      const vh = (v.direction === "vertical" ? v.length : 1) * cellSize;

      ctx.save();

      // Selected ring highlights
      if (isSelected) {
        ctx.strokeStyle = "#3B82F6";
        ctx.lineWidth = 3.5;
      } else {
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 2;
      }

      // Draw as WebP Image
      const img = getVehicleImage(v);
      if (img.complete) {
        ctx.save();
        if (v.direction === "horizontal") {
          // Horizontal vehicle: needs to be rotated 90 degrees clockwise since asset is vertical (facing UP)
          const cx = vx + vw / 2;
          const cy = vy + vh / 2;
          ctx.translate(cx, cy);
          ctx.rotate(Math.PI / 2);
          
          // Width in rotated space is grid vertical (cellSize)
          // Height in rotated space is grid horizontal (v.length * cellSize)
          const drawW = cellSize;
          const drawH = v.length * cellSize;
          ctx.drawImage(img, -drawW / 2 + 3, -drawH / 2 + 3, drawW - 6, drawH - 6);
        } else {
          // Vertical vehicle: draw directly since asset is already vertical (facing UP)
          ctx.drawImage(img, vx + 3, vy + 3, vw - 6, vh - 6);
        }
        ctx.restore();
      } else {
        // Fallback: draw rounded rect
        let bodyColor = "#3B82F6";
        let borderColor = "#1D4ED8";
        if (v.id === "R" || v.isPlayer) {
          bodyColor = "#EF4444";
          borderColor = "#B91C1C";
        } else if (v.length >= 3) {
          bodyColor = "#F59E0B";
          borderColor = "#B45309";
        }
        ctx.fillStyle = bodyColor;
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        drawRoundRect(ctx, vx + 4, vy + 4, vw - 8, vh - 8, 10);
        ctx.fill();
        ctx.stroke();
      }

      // Draw selection border highlight
      if (isSelected) {
        ctx.strokeStyle = "#3B82F6";
        ctx.lineWidth = 3;
        ctx.beginPath();
        drawRoundRect(ctx, vx + 2, vy + 2, vw - 4, vh - 4, 11);
        ctx.stroke();
      }

      // Label text with shadow (vehicle labels are only shown in Dev Mode)
      if (isDevModeRef.current) {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 9px sans-serif";
        ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
        ctx.shadowBlur = 4;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          v.id === "R" ? "TAXI" : `MOBIL ${v.id}`,
          vx + vw / 2,
          vy + vh / 2
        );
      }

      ctx.restore();
    });

    ctx.restore();
    ctx.restore();
  };

  // High performance throttle for animation frames
  const renderScheduledRef = useRef(false);
  const requestRedraw = () => {
    if (renderScheduledRef.current) return;
    renderScheduledRef.current = true;
    requestAnimationFrame(() => {
      drawCanvas();
      renderScheduledRef.current = false;
    });
  };

  // Redraw when states or props change
  useEffect(() => {
    requestRedraw();
  }, [vehicles, selectedVehicleId, gridRows, gridCols, exitRow, activeWalls, isDevMode]);

  // Redraw when the window resizes to adapt the fluid canvas resolution
  useEffect(() => {
    const handleResize = () => {
      requestRedraw();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Global pointer move & up event listeners on window
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (!dragInfoRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const padLeft = 28;
      const padTop = 28;
      const cellSize = Math.min((rect.width - padLeft) / gridCols, (rect.height - padTop) / gridRows);

      if (dragInfoRef.current) {
        const diffX = e.clientX - dragInfoRef.current.startX;
        const diffY = e.clientY - dragInfoRef.current.startY;

        if (dragInfoRef.current.direction === "horizontal") {
          const diffCol = diffX / cellSize;
          const targetCol = Math.max(
            dragInfoRef.current.minVal,
            Math.min(dragInfoRef.current.maxVal, dragInfoRef.current.startCol + diffCol)
          );
          dragInfoRef.current.visualPos = targetCol;
        } else {
          const diffRow = diffY / cellSize;
          const targetRow = Math.max(
            dragInfoRef.current.minVal,
            Math.min(dragInfoRef.current.maxVal, dragInfoRef.current.startRow + diffRow)
          );
          dragInfoRef.current.visualPos = targetRow;
        }
        
        requestRedraw();
        audio.playSlide();
      }
    };

    const handleGlobalPointerUp = () => {
      if (dragInfoRef.current) {
        const finalVal = Math.round(dragInfoRef.current.visualPos);
        const dragId = dragInfoRef.current.vehicleId;
        const startC = dragInfoRef.current.startCol;
        const startR = dragInfoRef.current.startRow;
        const dragDir = dragInfoRef.current.direction;

        const updated = vehiclesRef.current.map((v) => {
          if (v.id === dragId) {
            if (dragDir === "horizontal") {
              return { ...v, col: finalVal };
            } else {
              return { ...v, row: finalVal };
            }
          }
          return v;
        });

        dragInfoRef.current = null;
        setDragState(null);
        onChangeVehicles(updated);

        const stepsMoved = dragDir === "horizontal"
          ? Math.abs(finalVal - startC)
          : Math.abs(finalVal - startR);

        if (stepsMoved > 0 && onMoveRecorded) {
          const dir = dragDir === "horizontal"
            ? (finalVal > startC ? "right" : "left")
            : (finalVal > startR ? "down" : "up");
          onMoveRecorded(dragId, dir, stepsMoved);
        }
      }
    };

    window.addEventListener("pointermove", handleGlobalPointerMove, { passive: true });
    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointercancel", handleGlobalPointerUp);

    return () => {
      window.removeEventListener("pointermove", handleGlobalPointerMove);
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointercancel", handleGlobalPointerUp);
    };
  }, [gridCols, gridRows, onChangeVehicles, onMoveRecorded]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const xOnCanvas = (e.clientX - rect.left) * (canvas.width / (rect.width * window.devicePixelRatio));
    const yOnCanvas = (e.clientY - rect.top) * (canvas.height / (rect.height * window.devicePixelRatio));
    const xInGridPixels = xOnCanvas;
    const yInGridPixels = yOnCanvas;

    // Calculate grid dimensions centered inside the fluid canvas with padding for coordinates
    const padLeft = 28;
    const padTop = 28;
    const cellSize = Math.min((rect.width - padLeft) / gridCols, (rect.height - padTop) / gridRows);
    const xOffset = (rect.width - padLeft - gridCols * cellSize) / 2 + padLeft;
    const yOffset = (rect.height - padTop - gridRows * cellSize) / 2 + padTop;

    const xActive = xInGridPixels - xOffset;
    const yActive = yInGridPixels - yOffset;

    let clickedVehicle: Vehicle | null = null;
    for (const v of vehiclesRef.current) {
      const vx = v.col * cellSize;
      const vy = v.row * cellSize;
      const vw = (v.direction === "horizontal" ? v.length : 1) * cellSize;
      const vh = (v.direction === "vertical" ? v.length : 1) * cellSize;

      if (
        xActive >= vx &&
        xActive <= vx + vw &&
        yActive >= vy &&
        yActive <= vy + vh
      ) {
        clickedVehicle = v;
        break;
      }
    }

    // Toggle wall in Dev Mode if empty space clicked
    if (isDevModeRef.current && !clickedVehicle) {
      const clickCol = Math.floor(xActive / cellSize);
      const clickRow = Math.floor(yActive / cellSize);
      if (clickRow >= 0 && clickRow < gridRows && clickCol >= 0 && clickCol < gridCols) {
        // Toggle wall at coordinates
        const wallIndex = activeWalls.findIndex((w) => w.row === clickRow && w.col === clickCol);
        let updatedWalls;
        if (wallIndex > -1) {
          updatedWalls = activeWalls.filter((_, idx) => idx !== wallIndex);
        } else {
          updatedWalls = [...activeWalls, { row: clickRow, col: clickCol }];
        }
        if (onChangeWalls) {
          onChangeWalls(updatedWalls);
        }
        audio.playClick();
        return;
      }
    }

    audio.playClick();

    if (clickedVehicle) {
      onSelectVehicle(clickedVehicle.id);
      if (disabled) return;

      const occupied = getOccupiedCells(vehiclesRef.current, clickedVehicle.id, gridRows, gridCols, activeWalls);
      let minVal = 0;
      let maxVal = 0;

      if (clickedVehicle.direction === "horizontal") {
        minVal = 0;
        maxVal = gridCols - clickedVehicle.length;
        for (let c = clickedVehicle.col - 1; c >= 0; c--) {
          if (occupied[clickedVehicle.row][c] !== null) {
            minVal = c + 1;
            break;
          }
        }
        for (let c = clickedVehicle.col + clickedVehicle.length; c < gridCols; c++) {
          if (occupied[clickedVehicle.row][c] !== null) {
            maxVal = c - clickedVehicle.length;
            break;
          }
        }
      } else {
        minVal = 0;
        maxVal = gridRows - clickedVehicle.length;
        for (let r = clickedVehicle.row - 1; r >= 0; r--) {
          if (occupied[r][clickedVehicle.col] !== null) {
            minVal = r + 1;
            break;
          }
        }
        for (let r = clickedVehicle.row + clickedVehicle.length; r < gridRows; r++) {
          if (occupied[r][clickedVehicle.col] !== null) {
            maxVal = r - clickedVehicle.length;
            break;
          }
        }
      }

      const info = {
        vehicleId: clickedVehicle.id,
        startCol: clickedVehicle.col,
        startRow: clickedVehicle.row,
        startX: e.clientX,
        startY: e.clientY,
        minVal,
        maxVal,
        visualPos: clickedVehicle.direction === "horizontal" ? clickedVehicle.col : clickedVehicle.row,
        direction: clickedVehicle.direction,
      };

      dragInfoRef.current = info;
      setDragState(info);
    } else {
      onSelectVehicle(null);
    }
  };



  return (
    <div className="flex flex-col items-center w-full h-full relative">
      {/* Board Viewport Wrapper (Fluid Ratio) */}
      <div
        className="w-full h-full overflow-hidden relative flex items-center justify-center rounded-2xl animate-[fadeIn_0.5s_ease-out]"
        style={{
          width: "100%",
          height: "100%",
          cursor: "default",
          border: "none",
          outline: "none",
          boxShadow: "none"
        }}
      >
        <canvas
          ref={canvasRef}
          id="parking-canvas"
          className="w-full h-full select-none touch-none block bg-transparent"
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none"
          }}
          onPointerDown={handlePointerDown}
        />

        {/* Floating Dev Mode Controls (Vertical) */}
        {onToggleDevMode && (
          <div className="absolute top-3 right-3 z-40 hidden flex-col items-center gap-1.5 select-none">
            <button
              type="button"
              onClick={() => {
                audio.playClick();
                onToggleDevMode();
              }}
              className={`w-7.5 h-7.5 flex items-center justify-center text-[9px] font-black rounded-lg cursor-pointer border transition-all select-none ${
                isDevMode
                  ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-600 shadow-md scale-105"
                  : "bg-slate-800 hover:bg-slate-900 text-slate-350 border-slate-700 shadow-sm"
              }`}
              title="Toggle Dev Mode (Click grid to place/remove walls)"
            >
              DEV
            </button>
          </div>
        )}

        {/* HTML EXIT Label removed: exit indicators are drawn dynamically on canvas */}
      </div>

      {/* Instructions Overlay */}
      {!selectedVehicleId && !disabled && !isDevMode && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-1.5 pointer-events-none z-10">
          <HelpCircle size={13} className="text-amber-500 animate-bounce" />
          <span className="text-[10px] font-sans font-medium text-slate-600">
            Sentuh mobil untuk memindahkan
          </span>
        </div>
      )}

      {isDevMode && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-amber-500/90 text-slate-950 backdrop-blur px-3 py-1.5 rounded-full border border-amber-600 shadow-sm flex items-center gap-1.5 pointer-events-none z-10 text-[9px] font-bold">
          🛠️ Mode Dev Aktif: Klik slot kosong untuk atur koordinat dinding (wall)
        </div>
      )}
    </div>
  );
};
