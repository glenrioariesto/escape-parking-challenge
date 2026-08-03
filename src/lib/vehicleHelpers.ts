import { Vehicle, QuizQuestion } from "../types";

const base = () => import.meta.env.BASE_URL;

const TRUCK_ASSETS = [
  "truck-biru.svg",
  "truck-merah.svg",
  "truck-abu.svg",
  "truck-kuning.svg",
  "truck-hijau.svg",
  "truck-cyan.svg"
];

const CAR_ASSETS = [
  "bak-kuning.svg", "bak-merah.svg", "bak-biru.svg", "bak-putih.svg",
  "hatchback-hijau.svg", "hatchback-abu.svg", "hatchback-biru.svg", "hatchback-cyan.svg",
  "jeep-cokelat.svg", "jeep-merah.svg", "jeep-hijau.svg", "jeep-putih.svg",
  "sedan-hijau.svg", "sedan-kuning.svg", "sedan-merah.svg", "sedan-abu.svg"
];

// Cache: maps a stringified vehicle-IDs key → { vehicleId → asset filename }
let _assignmentCache: { key: string; map: { [id: string]: string } } | null = null;

/**
 * Build a unique asset assignment for all vehicles in a level.
 * Trucks (length >= 3) pick from TRUCK_ASSETS, cars (length 2) from CAR_ASSETS.
 * Uses charCode as a starting hint, but skips already-taken assets to guarantee uniqueness.
 * Player/taxi vehicles always get taxi.svg (duplicates allowed only for taxis).
 */
function buildAssetAssignment(allVehicles: Vehicle[]): { [id: string]: string } {
  const assignment: { [id: string]: string } = {};
  const usedTrucks = new Set<string>();
  const usedCars = new Set<string>();

  // Sort by ID for deterministic ordering
  const sorted = [...allVehicles].sort((a, b) => a.id.localeCompare(b.id));

  sorted.forEach((v) => {
    if (v.isPlayer || v.id === "R") {
      assignment[v.id] = "taxi.svg";
      return;
    }

    if (v.length >= 3) {
      const pool = TRUCK_ASSETS;
      const used = usedTrucks;
      const startIdx = (v.id.charCodeAt(0) || 0) % pool.length;

      // Try from startIdx, wrapping around, to find an unused asset
      let picked: string | null = null;
      for (let offset = 0; offset < pool.length; offset++) {
        const candidate = pool[(startIdx + offset) % pool.length];
        if (!used.has(candidate)) {
          picked = candidate;
          break;
        }
      }

      // Fallback: if all assets are used (more vehicles than assets), use modulo
      if (!picked) {
        picked = pool[startIdx];
      }

      used.add(picked);
      assignment[v.id] = picked;
    } else {
      const pool = CAR_ASSETS;
      const used = usedCars;
      const startIdx = (v.id.charCodeAt(0) || 0) % pool.length;

      let picked: string | null = null;
      for (let offset = 0; offset < pool.length; offset++) {
        const candidate = pool[(startIdx + offset) % pool.length];
        if (!used.has(candidate)) {
          picked = candidate;
          break;
        }
      }

      if (!picked) {
        picked = pool[startIdx];
      }

      used.add(picked);
      assignment[v.id] = picked;
    }
  });

  return assignment;
}

/**
 * Get the cache key for a set of vehicles (based on IDs + lengths, which determine assignment).
 */
function getVehicleSetKey(vehicles: Vehicle[]): string {
  return vehicles
    .map((v) => `${v.id}:${v.length}:${v.isPlayer ? 1 : 0}`)
    .sort()
    .join("|");
}

// Maps a vehicle to its corresponding image path in public/img/
// When allVehicles is provided, ensures each non-player vehicle gets a unique asset.
export function getVehicleImagePath(v: Vehicle, allVehicles?: Vehicle[]): string {
  if (v.isPlayer || v.id === "R") {
    return `${base()}img/taxi.svg`;
  }

  // If we have the full vehicle list, use the context-aware unique assignment
  if (allVehicles && allVehicles.length > 0) {
    const key = getVehicleSetKey(allVehicles);
    if (!_assignmentCache || _assignmentCache.key !== key) {
      _assignmentCache = { key, map: buildAssetAssignment(allVehicles) };
    }
    const filename = _assignmentCache.map[v.id];
    if (filename) {
      return `${base()}img/${filename}`;
    }
  }

  // Fallback for single-vehicle calls (no context): use charCode modulo (legacy behavior)
  const idNum = v.id.charCodeAt(0) || 0;

  if (v.length >= 3) {
    return `${base()}img/${TRUCK_ASSETS[idNum % TRUCK_ASSETS.length]}`;
  } else {
    return `${base()}img/${CAR_ASSETS[idNum % CAR_ASSETS.length]}`;
  }
}

// Group vehicles by their base name (type + color)
export function getVehicleBaseName(v: Vehicle, allVehicles?: Vehicle[]): string {
  const path = getVehicleImagePath(v, allVehicles);
  const filename = path.split("/").pop() || "";
  
  let type = "Mobil";
  if (filename.includes("truck")) {
    type = "Truk";
  } else if (filename.includes("taxi")) {
    return "Taxi Kuning";
  } else if (filename.includes("bak")) {
    type = "Bak";
  } else if (filename.includes("hatchback")) {
    type = "Hatchback";
  } else if (filename.includes("jeep")) {
    type = "Jeep";
  } else if (filename.includes("sedan")) {
    type = "Sedan";
  }
  
  let color = "Abu-abu";
  if (filename.includes("biru")) color = "Biru";
  else if (filename.includes("merah")) color = "Merah";
  else if (filename.includes("kuning")) color = "Kuning";
  else if (filename.includes("hijau")) color = "Hijau";
  else if (filename.includes("cyan")) color = "Cyan";
  else if (filename.includes("cokelat")) color = "Cokelat";
  else if (filename.includes("putih")) color = "Putih";
  
  return `${type} ${color}`;
}

// Build a mapping from vehicle ID to display name for this level
export function getVehicleDisplayNamesMap(vehicles: Vehicle[]): { [id: string]: string } {
  const vehicleDisplayNames: { [id: string]: string } = {};
  const baseNameCounts: { [base: string]: number } = {};
  
  // First pass: count duplicates
  vehicles.forEach((v) => {
    const base = getVehicleBaseName(v, vehicles);
    baseNameCounts[base] = (baseNameCounts[base] || 0) + 1;
  });
  
  // Keep track of counts seen so far for numbering
  const baseNameIndices: { [base: string]: number } = {};
  
  // Sort vehicles by ID to ensure deterministic numbering
  const sortedVehicles = [...vehicles].sort((a, b) => a.id.localeCompare(b.id));
  
  sortedVehicles.forEach((v) => {
    const base = getVehicleBaseName(v, vehicles);
    if (baseNameCounts[base] > 1) {
      baseNameIndices[base] = (baseNameIndices[base] || 0) + 1;
      vehicleDisplayNames[v.id] = `${base} ${baseNameIndices[base]}`;
    } else {
      vehicleDisplayNames[v.id] = base;
    }
  });

  return vehicleDisplayNames;
}

// Replace vehicle names in a given text string dynamically
export function syncTextWithVehicleNames(text: string, vehicles: Vehicle[]): string {
  if (!text) return "";
  let updatedText = text;
  const nameMap = getVehicleDisplayNamesMap(vehicles);

  // Sort vehicles so we replace longer patterns first to avoid partial replacement issues
  const sortedVehicles = [...vehicles].sort((a, b) => b.id.localeCompare(a.id));

  // 1. Replace specific long labels/patterns first (e.g. "Taxi Kuning R (Pemain)", "Mobil Merah A")
  sortedVehicles.forEach((v) => {
    const displayName = nameMap[v.id] || getVehicleBaseName(v);
    
    // Replace labels with (Pemain) or without
    const cleanLabel = v.label.replace(/\s*\(Pemain\)/g, "");
    updatedText = updatedText.replace(new RegExp(escapeRegExp(v.label), "gi"), displayName);
    updatedText = updatedText.replace(new RegExp(escapeRegExp(cleanLabel), "gi"), displayName);

    // Replace generic pattern like "Mobil Merah A" or "Truk Abu-abu D"
    const genericPattern = `${getVehicleBaseName(v)} ${v.id}`;
    updatedText = updatedText.replace(new RegExp(escapeRegExp(genericPattern), "gi"), displayName);
  });

  // 2. Replace standalone single letters (e.g. " A ", " B ", " F ")
  sortedVehicles.forEach((v) => {
    const displayName = nameMap[v.id] || getVehicleBaseName(v);
    // Use word boundary to match the letter alone
    const regex = new RegExp(`\\b${v.id}\\b`, "g");
    updatedText = updatedText.replace(regex, displayName);
  });

  return updatedText;
}

// Utility to escape regex special characters
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Sync entire quiz question structure
export function syncQuizQuestionWithVehicles(q: QuizQuestion, vehicles: Vehicle[]): QuizQuestion {
  return {
    ...q,
    question: syncTextWithVehicleNames(q.question, vehicles),
    options: q.options.map((opt) => syncTextWithVehicleNames(opt, vehicles)),
    explanation: syncTextWithVehicleNames(q.explanation, vehicles)
  };
}
