import { promises as fs } from "fs";
import path from "path";

export type Airport = {
  code: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  home: boolean;
  firstVisited: number | null;
  visits: number | null;
  note: string | null;
};

const CSV_PATH = path.join(process.cwd(), "lib", "flights.csv");

// Tiny CSV parser. The flights.csv is hand-edited and small - no quoted
// commas, no embedded newlines - so a split-based parse is fine.
export async function loadFlights(): Promise<Airport[]> {
  let raw: string;
  try {
    raw = await fs.readFile(CSV_PATH, "utf8");
  } catch {
    return [];
  }
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("#"));
  if (lines.length === 0) return [];

  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const idx = (name: string) => header.indexOf(name);
  const iCode = idx("code");
  const iCity = idx("city");
  const iCountry = idx("country");
  const iLat = idx("lat");
  const iLon = idx("lon");
  const iHome = idx("home");
  const iFirst = idx("first_visited");
  const iVisits = idx("visits");
  const iNote = idx("note");

  return lines.slice(1).flatMap<Airport>((line) => {
    const cells = line.split(",").map((c) => c.trim());
    const code = cells[iCode];
    const lat = Number(cells[iLat]);
    const lon = Number(cells[iLon]);
    if (!code || !Number.isFinite(lat) || !Number.isFinite(lon)) return [];
    return [
      {
        code,
        city: cells[iCity] ?? "",
        country: cells[iCountry] ?? "",
        lat,
        lon,
        home: (cells[iHome] ?? "").toLowerCase() === "true",
        firstVisited:
          iFirst >= 0 && cells[iFirst] && /^\d+$/.test(cells[iFirst])
            ? Number(cells[iFirst])
            : null,
        visits:
          iVisits >= 0 && cells[iVisits] && /^\d+$/.test(cells[iVisits])
            ? Number(cells[iVisits])
            : null,
        note: iNote >= 0 && cells[iNote] ? cells[iNote] : null,
      },
    ];
  });
}

// Equirectangular projection into a 420×220 viewBox sized for the
// editorial map component. Roughly Mercator-ish for inland latitudes
// and good enough for the airports list.
export function project(
  lat: number,
  lon: number,
): { x: number; y: number } {
  const W = 420;
  const H = 220;
  const x = ((lon + 180) / 360) * W;
  const y = ((90 - lat) / 180) * H;
  return { x, y };
}
