import { loadFlights, project, type Airport } from "@/lib/flights";

// Continent polygons calibrated to the same equirectangular projection as
// project(). Each point was derived from geographic lat/lon via the formula
// x=(lon+180)/360*420, y=(90-lat)/180*220 so dots land on land.
const CONTINENTS = [
  // North America
  "M47,37 L140,37 L136,55 L117,79 L88,83 L70,73 L59,55 Z",
  // Central America
  "M88,83 L113,83 L110,100 L99,100 Z",
  // South America
  "M119,92 L143,104 L154,134 L142,153 L130,172 L117,155 L110,130 L117,104 Z",
  // UK / Ireland
  "M202,40 L207,38 L210,44 L205,47 L201,43 Z",
  // Europe (mainland + Scandinavia)
  "M201,64 L245,65 L248,37 L239,22 L214,37 L204,55 Z",
  // Africa
  "M203,66 L247,72 L263,95 L251,142 L238,152 L226,137 L206,103 L190,92 Z",
  // Asia main body (Russia south, Central Asia, China)
  "M245,43 L340,24 L380,43 L362,61 L344,79 L303,73 L274,61 L280,43 Z",
  // Indian subcontinent
  "M288,79 L298,71 L317,78 L313,83 L308,88 L300,101 L295,87 Z",
  // SE Asia (Indochina + Malay Peninsula)
  "M322,88 L334,83 L335,98 L331,110 L328,107 L320,96 Z",
  // Maritime SE Asia (Sumatra, Java, Borneo)
  "M322,104 L334,117 L343,121 L348,108 L344,102 L336,106 Z",
  // Philippines
  "M350,88 L358,93 L354,103 L349,103 Z",
  // Japan / Korea
  "M360,67 L375,55 L374,60 L373,67 L368,69 L362,73 Z",
  // Australia
  "M345,149 L363,125 L380,131 L388,143 L386,152 L379,156 L371,153 Z",
];

// Quadratic-curve route, gently bowed away from the home airport.
function routePath(home: Airport, dest: Airport): string {
  const a = project(home.lat, home.lon);
  const b = project(dest.lat, dest.lon);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  // Perpendicular nudge proportional to distance - short hops bow less.
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy);
  const bow = Math.min(dist * 0.15, 26);
  const nx = -dy / dist;
  const ny = dx / dist;
  const cx = mx + nx * bow;
  const cy = my + ny * bow;
  return `M${a.x},${a.y} Q${cx.toFixed(1)},${cy.toFixed(1)} ${b.x},${b.y}`;
}

export async function FlightsMap() {
  const airports = await loadFlights();
  if (airports.length === 0) return null;

  const home = airports.find((a) => a.home) ?? airports[0];
  const others = airports.filter((a) => a !== home);

  // Airports too close to a neighbor to label cleanly at this scale.
  const SKIP_LABEL = new Set(["PKR", "BHR", "MAA"]);

  const labelOffsets: Record<string, { dx: number; dy: number }> = {
    SIN: { dx: 4, dy: 10 },
    // India
    DEL: { dx: -10, dy: -4 },
    BOM: { dx: -12, dy: 4 },
    PNQ: { dx: -12, dy: 10 },
    HYD: { dx: 4, dy: -4 },
    BLR: { dx: 4, dy: 6 },
    CCU: { dx: 4, dy: -4 },
    // Nepal
    KTM: { dx: 4, dy: -4 },
    // Sri Lanka
    CMB: { dx: 4, dy: 8 },
    // SE Asia
    HAN: { dx: 4, dy: -4 },
    BKK: { dx: -12, dy: -4 },
    KUL: { dx: -12, dy: 6 },
    CGK: { dx: -12, dy: 6 },
    DPS: { dx: 4, dy: 6 },
    MNL: { dx: 4, dy: -4 },
    // Japan
    KIX: { dx: -12, dy: -4 },
    NRT: { dx: 4, dy: -4 },
    // Central Asia
    ALA: { dx: 4, dy: -4 },
    // Africa
    CAI: { dx: -12, dy: -4 },
    ASW: { dx: -12, dy: 4 },
  };
  const offsetFor = (code: string) =>
    labelOffsets[code] ?? { dx: 4, dy: -4 };

  return (
    <figure className="not-prose">
      <svg
        viewBox="0 0 420 220"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Flight map: ${home.code} home, with ${others.length} destinations`}
        style={{ width: "100%", maxWidth: 640, display: "block" }}
      >
        {/* Landmasses use --color-rule so they shift in dark mode. */}
        <g>
          {CONTINENTS.map((d, i) => (
            <path
              key={i}
              d={d}
              style={{ fill: "var(--color-rule)" }}
            />
          ))}
        </g>

        {/* Routes */}
        <g>
          {others.map((dest) => (
            <path
              key={`route-${dest.code}`}
              d={routePath(home, dest)}
              fill="none"
              stroke="var(--color-mark)"
              strokeWidth={0.8}
              strokeDasharray="3 3"
              opacity={0.55}
            />
          ))}
        </g>

        {/* Home dot */}
        <circle
          cx={project(home.lat, home.lon).x}
          cy={project(home.lat, home.lon).y}
          r={3.2}
          style={{ fill: "var(--color-ink)" }}
        />

        {/* Destination dots */}
        <g>
          {others.map((a) => {
            const p = project(a.lat, a.lon);
            return (
              <circle
                key={`dot-${a.code}`}
                cx={p.x}
                cy={p.y}
                r={2}
                style={{ fill: "var(--color-mark)" }}
              />
            );
          })}
        </g>

        {/* Labels */}
        <g
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 5.5,
            fill: "var(--color-ink-faint)",
            letterSpacing: "0.08em",
          }}
        >
          {airports
            .filter((a) => !SKIP_LABEL.has(a.code))
            .map((a) => {
              const p = project(a.lat, a.lon);
              const o = offsetFor(a.code);
              return (
                <text key={`lbl-${a.code}`} x={p.x + o.dx} y={p.y + o.dy}>
                  {a.code}
                </text>
              );
            })}
        </g>
      </svg>

      <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-ink-faint)]">
        <span>
          Home · {home.code} {home.city}
        </span>
        <span>
          Visited · {others.length}{" "}
          {others.length === 1 ? "airport" : "airports"}
        </span>
      </figcaption>
    </figure>
  );
}
