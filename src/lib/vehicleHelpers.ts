import { Vehicle, QuizQuestion } from "../types";

// Maps a vehicle to its corresponding image path in public/img/
export function getVehicleImagePath(v: Vehicle): string {
  if (v.isPlayer || v.id === "R") {
    return `${import.meta.env.BASE_URL}img/taxi.svg`;
  }

  // Use character code of vehicle ID to deterministically map to the same asset
  const idNum = v.id.charCodeAt(0) || 0;

  if (v.length >= 3) {
    // 3-grid truck assets (6 options)
    const base = import.meta.env.BASE_URL;
    const trucks = [
      `${base}img/truck-biru.svg`,
      `${base}img/truck-merah.svg`,
      `${base}img/truck-abu.svg`,
      `${base}img/truck-kuning.svg`,
      `${base}img/truck-hijau.svg`,
      `${base}img/truck-cyan.svg`
    ];
    return trucks[idNum % trucks.length];
  } else {
    // 2-grid car assets: bak, hatchback, jeep, sedan (16 options total)
    const base = import.meta.env.BASE_URL;
    const cars = [
      `${base}img/bak-kuning.svg`, `${base}img/bak-merah.svg`, `${base}img/bak-biru.svg`, `${base}img/bak-putih.svg`,
      `${base}img/hatchback-hijau.svg`, `${base}img/hatchback-abu.svg`, `${base}img/hatchback-biru.svg`, `${base}img/hatchback-cyan.svg`,
      `${base}img/jeep-cokelat.svg`, `${base}img/jeep-merah.svg`, `${base}img/jeep-hijau.svg`, `${base}img/jeep-putih.svg`,
      `${base}img/sedan-hijau.svg`, `${base}img/sedan-kuning.svg`, `${base}img/sedan-merah.svg`, `${base}img/sedan-abu.svg`
    ];
    return cars[idNum % cars.length];
  }
}

// Group vehicles by their base name (type + color)
export function getVehicleBaseName(v: Vehicle): string {
  const path = getVehicleImagePath(v);
  const filename = path.split("/").pop() || "";
  
  let type = "Mobil";
  if (filename.includes("truck")) {
    type = "Truk";
  } else if (filename.includes("taxi")) {
    return "Taxi Kuning";
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
    const base = getVehicleBaseName(v);
    baseNameCounts[base] = (baseNameCounts[base] || 0) + 1;
  });
  
  // Keep track of counts seen so far for numbering
  const baseNameIndices: { [base: string]: number } = {};
  
  // Sort vehicles by ID to ensure deterministic numbering
  const sortedVehicles = [...vehicles].sort((a, b) => a.id.localeCompare(b.id));
  
  sortedVehicles.forEach((v) => {
    const base = getVehicleBaseName(v);
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
