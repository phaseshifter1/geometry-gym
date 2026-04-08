import type { DiagramSpec } from '@/lib/problems/types';

// ─── Circle ──────────────────────────────────────────────────────────────────

function CircleDiagram({ radius, showRadius, showDiameter }: { radius: number; showRadius: boolean; showDiameter?: boolean }) {
  const cx = 140;
  const cy = 145;
  const svgR = 100;
  const radiusEndX = cx + svgR;

  return (
    <svg
      viewBox="0 0 280 290"
      width="100%"
      style={{ maxWidth: '500px' }}
      aria-label={`Circle with radius ${radius} cm`}
    >
      <circle cx={cx} cy={cy} r={svgR} fill="#F0FDF4" stroke="#16A34A" strokeWidth="2.5" />

      {showDiameter && (
        <>
          <line x1={cx - svgR} y1={cy} x2={cx + svgR} y2={cy} stroke="#16A34A" strokeWidth="2" strokeDasharray="6 4" />
          <circle cx={cx} cy={cy} r="4" fill="#16A34A" />
          <text x={cx} y={cy - 12} fontSize="15" fill="#14532D"
            fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" fontWeight="700">
            d = {radius * 2} cm
          </text>
        </>
      )}

      {showRadius && !showDiameter && (
        <>
          <line x1={cx} y1={cy} x2={radiusEndX} y2={cy} stroke="#16A34A" strokeWidth="2" strokeDasharray="6 4" />
          <circle cx={cx} cy={cy} r="4" fill="#16A34A" />
          <text x={(cx + radiusEndX) / 2} y={cy - 12} fontSize="15" fill="#14532D"
            fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" fontWeight="700">
            r = {radius} cm
          </text>
        </>
      )}
    </svg>
  );
}

// ─── Triangle ─────────────────────────────────────────────────────────────────

function TriangleDiagram({
  angles,
  showExterior,
  unknownIndex,
  unknownIndices,
}: {
  angles: [number, number, number];
  showExterior?: number;
  unknownIndex?: number;
  unknownIndices?: number[];
}) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const [α, β, γ] = angles.map(toRad);
  const sinγ = Math.sin(γ);

  // Unit-scale triangle: A=(0,0), B=(1,0), C derived from angles
  const AC = Math.sin(β) / sinγ;
  const Cx_u = AC * Math.cos(α);
  const Cy_u = -AC * Math.sin(α); // negative = above baseline in math coords

  const vx_u = [0, 1, Cx_u];
  const vy_u = [0, 0, Cy_u];

  // Scale to fit viewport — PAD=85 gives room for exterior line + label on all sides
  const VW = 460, VH = 320;
  const PAD = 85;
  const availW = VW - 2 * PAD;
  const availH = VH - 2 * PAD;

  const minX_u = Math.min(...vx_u);
  const maxX_u = Math.max(...vx_u);
  const minY_u = Math.min(...vy_u);
  const maxY_u = Math.max(...vy_u);
  const w_u = maxX_u - minX_u || 1;
  const h_u = maxY_u - minY_u || 1;
  const scale = Math.min(availW / w_u, availH / h_u);

  // Map unit coords to SVG coords
  const sx = (x: number) => PAD + (x - minX_u) * scale + (availW - w_u * scale) / 2;
  const sy = (y: number) => PAD + (y - minY_u) * scale + (availH - h_u * scale) / 2;

  const vx = vx_u.map(sx);
  const vy = vy_u.map(sy);
  const pts = vx.map((x, i) => `${x},${vy[i]}`).join(' ');

  // Centroid
  const centX = (vx[0] + vx[1] + vx[2]) / 3;
  const centY = (vy[0] + vy[1] + vy[2]) / 3;

  // Angle labels: push TOWARD centroid so labels sit inside the triangle at each corner
  const LABEL_D = 30;
  const labels = [0, 1, 2].map((i) => {
    const dx = centX - vx[i]; // toward centroid = inward
    const dy = centY - vy[i];
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    return { x: vx[i] + (dx / len) * LABEL_D, y: vy[i] + (dy / len) * LABEL_D };
  });

  // Exterior angle: extend side vj→vi beyond vi
  let extX: number | null = null;
  let extY: number | null = null;
  let extLabelX: number | null = null;
  let extLabelY: number | null = null;

  if (showExterior !== undefined) {
    const vi = showExterior;
    const vj = (vi + 2) % 3;
    const dx = vx[vi] - vx[vj];
    const dy = vy[vi] - vy[vj];
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const EXT = 60;
    extX = vx[vi] + (dx / len) * EXT;
    extY = vy[vi] + (dy / len) * EXT;
    extLabelX = vx[vi] + (dx / len) * (EXT + 20);
    extLabelY = vy[vi] + (dy / len) * (EXT + 20);
  }

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      width="100%"
      style={{ maxWidth: '500px' }}
      aria-label="Triangle with labeled interior angles"
    >
      <polygon
        points={pts}
        fill="#FFF7ED"
        stroke="#F97316"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {extX !== null && extY !== null && (
        <line
          x1={vx[showExterior!]} y1={vy[showExterior!]}
          x2={extX} y2={extY}
          stroke="#F97316"
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeLinecap="round"
        />
      )}

      {labels.map((pos, i) => {
        const isUnknown = i === unknownIndex || (unknownIndices?.includes(i) ?? false);
        return (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            fontSize="15"
            fontWeight="700"
            fill={isUnknown ? '#7C3AED' : '#9A3412'}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {isUnknown ? '?°' : `${angles[i]}°`}
          </text>
        );
      })}

      {extLabelX !== null && extLabelY !== null && (
        <text
          x={extLabelX}
          y={extLabelY}
          fontSize="14"
          fontWeight="700"
          fill="#7C3AED"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          ?°
        </text>
      )}
    </svg>
  );
}

// ─── Rectangle ────────────────────────────────────────────────────────────────

function RectangleDiagram({
  width,
  height,
  labelDimensions,
  unknownDimension,
  widthLabel,
  heightLabel,
}: {
  width: number;
  height: number;
  labelDimensions: boolean;
  unknownDimension?: 'width' | 'height';
  widthLabel?: string;
  heightLabel?: string;
}) {
  const VW = 320, VH = 240;
  const PAD = 55;
  const availW = VW - 2 * PAD;
  const availH = VH - 2 * PAD;

  const scale = Math.min(availW / width, availH / height);
  const dispW = width * scale;
  const dispH = height * scale;

  // Center the rectangle in the viewport
  const rx = (VW - dispW) / 2;
  const ry = (VH - dispH) / 2;

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      width="100%"
      style={{ maxWidth: '500px' }}
      aria-label={`Rectangle ${width} by ${height}`}
    >
      <rect
        x={rx} y={ry}
        width={dispW} height={dispH}
        fill="#FFF7ED"
        stroke="#F97316"
        strokeWidth="2.5"
      />

      {labelDimensions && (
        <>
          {/* Width label — centred below bottom edge */}
          <text
            x={rx + dispW / 2}
            y={ry + dispH + 24}
            fontSize="15" fontWeight="700"
            fill={unknownDimension === 'width' ? '#6B21A8' : '#9A3412'}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {unknownDimension === 'width' ? '?' : (widthLabel ?? `${width} cm`)}
          </text>

          {/* Height label — centred left of left edge, rotated */}
          <text
            x={rx - 24}
            y={ry + dispH / 2}
            fontSize="15" fontWeight="700"
            fill={unknownDimension === 'height' ? '#6B21A8' : '#9A3412'}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(-90, ${rx - 24}, ${ry + dispH / 2})`}
          >
            {unknownDimension === 'height' ? '?' : (heightLabel ?? `${height} cm`)}
          </text>
        </>
      )}
    </svg>
  );
}

// ─── Angle ────────────────────────────────────────────────────────────────────

function AngleDiagram({ degrees }: { degrees: number }) {
  const VW = 300, VH = 220;
  const isReflex = degrees > 180;

  // Vertex: lower-centre for ≤180°, middle for reflex
  const vx = VW / 2;
  const vy = isReflex ? VH / 2 : VH - 50;

  const RAY_LEN = 110;
  const ARC_R   = 48;

  const toRad = (d: number) => (d * Math.PI) / 180;

  // Base ray goes right along the positive-x axis
  const baseEndX = vx + RAY_LEN;
  const baseEndY = vy;

  // Second ray at `degrees` counter-clockwise (SVG y-axis is flipped, so negate sin)
  const rad = toRad(degrees);
  const rayEndX = vx + RAY_LEN * Math.cos(rad);
  const rayEndY = vy - RAY_LEN * Math.sin(rad);

  // Arc: from base ray end (at ARC_R) to second ray end (at ARC_R)
  const arcStartX = vx + ARC_R;
  const arcStartY = vy;
  const arcEndX   = vx + ARC_R * Math.cos(rad);
  const arcEndY   = vy - ARC_R * Math.sin(rad);

  // SVG arc: sweep-flag=0 (CCW in screen space), large-arc-flag for reflex
  const largeArc = degrees > 180 ? 1 : 0;
  const arcPath = `M ${arcStartX} ${arcStartY} A ${ARC_R} ${ARC_R} 0 ${largeArc} 0 ${arcEndX} ${arcEndY}`;

  // Degree label: midpoint direction at degrees/2, pushed outward
  const midRad = toRad(degrees / 2);
  const LABEL_PUSH = degrees < 30 ? ARC_R + 22 : ARC_R + 18;
  const labelX = vx + LABEL_PUSH * Math.cos(midRad);
  const labelY = vy - LABEL_PUSH * Math.sin(midRad);

  // Right angle: square corner mark instead of arc
  const SQUARE = 14;
  const squarePath = `M ${vx + SQUARE} ${vy} L ${vx + SQUARE} ${vy - SQUARE} L ${vx} ${vy - SQUARE}`;

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      width="100%"
      style={{ maxWidth: '500px' }}
      aria-label={`Angle of ${degrees} degrees`}
    >
      {/* Base ray */}
      <line x1={vx} y1={vy} x2={baseEndX} y2={baseEndY} stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
      {/* Second ray */}
      <line x1={vx} y1={vy} x2={rayEndX} y2={rayEndY} stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
      {/* Vertex dot */}
      <circle cx={vx} cy={vy} r="4" fill="#2563EB" />

      {degrees === 90 ? (
        <path d={squarePath} fill="none" stroke="#2563EB" strokeWidth="2" />
      ) : (
        <path d={arcPath} fill="none" stroke="#2563EB" strokeWidth="1.8" />
      )}

      {/* Degree label */}
      <text
        x={labelX}
        y={labelY}
        fontSize="15"
        fontWeight="700"
        fill="#1E3A8A"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {degrees}°
      </text>
    </svg>
  );
}

// ─── Triangle Perimeter ───────────────────────────────────────────────────────

function TrianglePerimeterDiagram({ sides }: { sides: [number, number, number] }) {
  // sides[0] = bottom (v0-v1), sides[1] = right (v1-v2), sides[2] = left (v0-v2)
  const [sAB, sBC, sAC] = sides;
  const clamp = (v: number) => Math.max(-0.9999, Math.min(0.9999, v));

  // Law of cosines → interior angles
  const cosA = clamp((sAB * sAB + sAC * sAC - sBC * sBC) / (2 * sAB * sAC));
  const cosB = clamp((sAB * sAB + sBC * sBC - sAC * sAC) / (2 * sAB * sBC));
  const α = Math.acos(cosA);
  const β = Math.acos(cosB);
  const γ = Math.PI - α - β;

  const sinγ = Math.sin(γ) || 0.001;
  const AC_rel = Math.sin(β) / sinγ;
  const Cx_u = AC_rel * Math.cos(α);
  const Cy_u = -AC_rel * Math.sin(α);

  const vx_u = [0, 1, Cx_u];
  const vy_u = [0, 0, Cy_u];

  const VW = 400, VH = 280, PAD = 70;
  const availW = VW - 2 * PAD, availH = VH - 2 * PAD;
  const minX_u = Math.min(...vx_u), maxX_u = Math.max(...vx_u);
  const minY_u = Math.min(...vy_u), maxY_u = Math.max(...vy_u);
  const w_u = maxX_u - minX_u || 1, h_u = maxY_u - minY_u || 1;
  const scale = Math.min(availW / w_u, availH / h_u);

  const sx = (x: number) => PAD + (x - minX_u) * scale + (availW - w_u * scale) / 2;
  const sy = (y: number) => PAD + (y - minY_u) * scale + (availH - h_u * scale) / 2;
  const vx = vx_u.map(sx), vy = vy_u.map(sy);
  const pts = vx.map((x, i) => `${x},${vy[i]}`).join(' ');

  const centX = (vx[0] + vx[1] + vx[2]) / 3;
  const centY = (vy[0] + vy[1] + vy[2]) / 3;
  const PUSH = 24;

  // Edge midpoints: AB=sides[0], BC=sides[1], AC=sides[2]
  const edges = [
    { ax: 0, bx: 1 },
    { ax: 1, bx: 2 },
    { ax: 0, bx: 2 },
  ];

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label="Triangle with labeled sides">
      <polygon points={pts} fill="#FFF7ED" stroke="#F97316" strokeWidth="2.5" strokeLinejoin="round" />
      {edges.map(({ ax, bx }, i) => {
        const mx = (vx[ax] + vx[bx]) / 2;
        const my = (vy[ax] + vy[bx]) / 2;
        const dx = mx - centX, dy = my - centY;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        return (
          <text key={i} x={mx + (dx / len) * PUSH} y={my + (dy / len) * PUSH}
            fontSize="14" fontWeight="700" fill="#9A3412"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            textAnchor="middle" dominantBaseline="middle">
            {sides[i]} cm
          </text>
        );
      })}
    </svg>
  );
}

// ─── Triangle Area ────────────────────────────────────────────────────────────

function TriangleAreaDiagram({ base, height }: { base: number; height: number }) {
  const VW = 340, VH = 250;
  const PAD = 50;
  const availW = VW - 2 * PAD, availH = VH - PAD - 60;
  const scale = Math.min(availW / base, availH / height);
  const dispBase = base * scale, dispH = height * scale;

  const baseY = VH - 45;
  const baseLeft = (VW - dispBase) / 2;
  const baseRight = baseLeft + dispBase;
  const apexX = baseLeft + dispBase * 0.42; // slightly off-centre
  const apexY = baseY - dispH;

  const pts = `${baseLeft},${baseY} ${baseRight},${baseY} ${apexX},${apexY}`;
  const SQUARE = 9;

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label={`Triangle base ${base} cm height ${height} cm`}>
      <polygon points={pts} fill="#FFF7ED" stroke="#F97316" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Dashed height line */}
      <line x1={apexX} y1={apexY} x2={apexX} y2={baseY}
        stroke="#2563EB" strokeWidth="1.8" strokeDasharray="5 4" />
      {/* Right-angle mark */}
      <path d={`M ${apexX - SQUARE} ${baseY} L ${apexX - SQUARE} ${baseY - SQUARE} L ${apexX} ${baseY - SQUARE}`}
        fill="none" stroke="#2563EB" strokeWidth="1.5" />
      {/* Base label */}
      <text x={VW / 2} y={baseY + 22} fontSize="14" fontWeight="700" fill="#9A3412"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
        {base} cm
      </text>
      {/* Height label */}
      <text x={apexX + 18} y={(apexY + baseY) / 2} fontSize="14" fontWeight="700" fill="#1E3A8A"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="start" dominantBaseline="middle">
        {height} cm
      </text>
    </svg>
  );
}

// ─── Parallelogram ────────────────────────────────────────────────────────────

function ParallelogramDiagram({ base, height }: { base: number; height: number }) {
  const VW = 360, VH = 230;
  const PAD = 45;
  const SLANT = 38;
  const availW = VW - 2 * PAD - SLANT, availH = VH - PAD - 55;
  const scale = Math.min(availW / base, availH / height);
  const dispBase = base * scale, dispH = height * scale;

  const bly = VH - 45, blx = PAD;
  const brx = blx + dispBase;
  const tly = bly - dispH;
  const tlx = blx + SLANT, trx = brx + SLANT;
  const pts = `${blx},${bly} ${brx},${bly} ${trx},${tly} ${tlx},${tly}`;

  // Dashed height: vertical from tlx down to base
  const SQUARE = 9;

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label={`Parallelogram base ${base} cm height ${height} cm`}>
      <polygon points={pts} fill="#FFF7ED" stroke="#F97316" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Dashed height inside */}
      <line x1={tlx} y1={tly} x2={tlx} y2={bly}
        stroke="#2563EB" strokeWidth="1.8" strokeDasharray="5 4" />
      {/* Right-angle mark */}
      <path d={`M ${tlx - SQUARE} ${bly} L ${tlx - SQUARE} ${bly - SQUARE} L ${tlx} ${bly - SQUARE}`}
        fill="none" stroke="#2563EB" strokeWidth="1.5" />
      {/* Base label */}
      <text x={(blx + brx) / 2} y={bly + 22} fontSize="14" fontWeight="700" fill="#9A3412"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
        {base} cm
      </text>
      {/* Height label */}
      <text x={tlx - 22} y={(tly + bly) / 2} fontSize="14" fontWeight="700" fill="#1E3A8A"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle"
        transform={`rotate(-90, ${tlx - 22}, ${(tly + bly) / 2})`}>
        {height} cm
      </text>
    </svg>
  );
}

// ─── Trapezoid ────────────────────────────────────────────────────────────────

function TrapezoidDiagram({ topBase, bottomBase, height }: { topBase: number; bottomBase: number; height: number }) {
  const VW = 360, VH = 240;
  const PAD = 50;
  const availW = VW - 2 * PAD, availH = VH - PAD - 60;
  const scale = Math.min(availW / bottomBase, availH / height);
  const dispBottom = bottomBase * scale, dispTop = topBase * scale, dispH = height * scale;

  const baseY = VH - 45;
  const cx = VW / 2;
  const blx = cx - dispBottom / 2, brx = cx + dispBottom / 2;
  const tlx = cx - dispTop / 2,   trx = cx + dispTop / 2;
  const topY = baseY - dispH;
  const pts = `${blx},${baseY} ${brx},${baseY} ${trx},${topY} ${tlx},${topY}`;

  // Dashed height on right side
  const hx = brx + 22;
  const SQUARE = 9;

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label={`Trapezoid: top ${topBase} cm, bottom ${bottomBase} cm, height ${height} cm`}>
      <polygon points={pts} fill="#FFF7ED" stroke="#F97316" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Dashed height line */}
      <line x1={hx} y1={baseY} x2={hx} y2={topY}
        stroke="#2563EB" strokeWidth="1.8" strokeDasharray="5 4" />
      {/* Horizontal extension lines to height line */}
      <line x1={brx} y1={baseY} x2={hx} y2={baseY} stroke="#2563EB" strokeWidth="1" strokeDasharray="3 3" />
      <line x1={trx} y1={topY} x2={hx} y2={topY} stroke="#2563EB" strokeWidth="1" strokeDasharray="3 3" />
      {/* Right-angle marks */}
      <path d={`M ${hx - SQUARE} ${baseY} L ${hx - SQUARE} ${baseY - SQUARE} L ${hx} ${baseY - SQUARE}`}
        fill="none" stroke="#2563EB" strokeWidth="1.5" />
      {/* Bottom base label */}
      <text x={cx} y={baseY + 22} fontSize="14" fontWeight="700" fill="#9A3412"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
        {bottomBase} cm
      </text>
      {/* Top base label */}
      <text x={cx} y={topY - 16} fontSize="14" fontWeight="700" fill="#9A3412"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
        {topBase} cm
      </text>
      {/* Height label */}
      <text x={hx + 18} y={(baseY + topY) / 2} fontSize="14" fontWeight="700" fill="#1E3A8A"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="start" dominantBaseline="middle">
        {height} cm
      </text>
    </svg>
  );
}

// ─── Linear Pair ──────────────────────────────────────────────────────────────

function LinearPairDiagram({ knownAngle }: { knownAngle: number }) {
  const VW = 340, VH = 210;

  // Vertex sits lower-centre; horizontal line runs full width
  const vx = VW / 2;
  const vy = VH - 55;

  const LINE_EXT = 130; // how far the straight line extends each side
  const RAY_LEN  = 110;
  const ARC_R    = 44;

  const toRad = (d: number) => (d * Math.PI) / 180;
  const rad = toRad(knownAngle);

  // The transversal ray goes up at `knownAngle` from the right horizontal
  const rayEndX = vx + RAY_LEN * Math.cos(rad);
  const rayEndY = vy - RAY_LEN * Math.sin(rad);

  // Arc for known angle (right side: 0° → knownAngle CCW)
  const arcKnownStart = { x: vx + ARC_R, y: vy };
  const arcKnownEnd   = { x: vx + ARC_R * Math.cos(rad), y: vy - ARC_R * Math.sin(rad) };
  const arcKnownLarge = knownAngle > 180 ? 1 : 0;
  const arcKnown = `M ${arcKnownStart.x} ${arcKnownStart.y} A ${ARC_R} ${ARC_R} 0 ${arcKnownLarge} 0 ${arcKnownEnd.x} ${arcKnownEnd.y}`;

  // Arc for unknown angle (left side: knownAngle → 180° CCW)
  const unknownAngle = 180 - knownAngle;
  const arcUnkStart  = arcKnownEnd; // picks up where known arc ended
  const arcUnkEnd    = { x: vx - ARC_R, y: vy };
  const arcUnkLarge  = unknownAngle > 180 ? 1 : 0;
  const arcUnk = `M ${arcUnkStart.x} ${arcUnkStart.y} A ${ARC_R} ${ARC_R} 0 ${arcUnkLarge} 0 ${arcUnkEnd.x} ${arcUnkEnd.y}`;

  // Label positions: midpoint direction of each angle, pushed outward
  const LABEL_R = ARC_R + 18;
  const knownMidRad = toRad(knownAngle / 2);
  const unknownMidRad = toRad(knownAngle + unknownAngle / 2);
  const knownLabelX = vx + LABEL_R * Math.cos(knownMidRad);
  const knownLabelY = vy - LABEL_R * Math.sin(knownMidRad);
  const unknownLabelX = vx + LABEL_R * Math.cos(unknownMidRad);
  const unknownLabelY = vy - LABEL_R * Math.sin(unknownMidRad);

  // Right angle: square marks instead of arcs
  const SQUARE = 12;
  const knownSquare  = `M ${vx + SQUARE} ${vy} L ${vx + SQUARE} ${vy - SQUARE} L ${vx} ${vy - SQUARE}`;
  // For unknownAngle=90, ray points straight up (knownAngle=90)
  // The left-side square: from left of vertex to below-left of ray
  const unknownSquare = `M ${vx - SQUARE} ${vy} L ${vx - SQUARE} ${vy - SQUARE} L ${vx} ${vy - SQUARE}`;

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      width="100%"
      style={{ maxWidth: '500px' }}
      aria-label={`Linear pair: ${knownAngle}° and unknown angle on a straight line`}
    >
      {/* Straight base line */}
      <line x1={vx - LINE_EXT} y1={vy} x2={vx + LINE_EXT} y2={vy}
        stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Transversal ray */}
      <line x1={vx} y1={vy} x2={rayEndX} y2={rayEndY}
        stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
      {/* Vertex dot */}
      <circle cx={vx} cy={vy} r="4" fill="#2563EB" />

      {/* Known angle arc or square */}
      {knownAngle === 90
        ? <path d={knownSquare} fill="none" stroke="#2563EB" strokeWidth="1.8" />
        : <path d={arcKnown} fill="none" stroke="#2563EB" strokeWidth="1.8" />
      }

      {/* Unknown angle arc or square */}
      {unknownAngle === 90
        ? <path d={unknownSquare} fill="none" stroke="#9333EA" strokeWidth="1.8" />
        : <path d={arcUnk} fill="none" stroke="#9333EA" strokeWidth="1.8" />
      }

      {/* Known angle label */}
      <text x={knownLabelX} y={knownLabelY}
        fontSize="14" fontWeight="700" fill="#1E3A8A"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        textAnchor="middle" dominantBaseline="middle"
      >
        {knownAngle}°
      </text>

      {/* Unknown angle label */}
      <text x={unknownLabelX} y={unknownLabelY}
        fontSize="14" fontWeight="700" fill="#6B21A8"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        textAnchor="middle" dominantBaseline="middle"
      >
        ?°
      </text>
    </svg>
  );
}

// ─── Crossing Lines ───────────────────────────────────────────────────────────

function CrossingLinesDiagram({ knownAngle }: { knownAngle: number }) {
  const VW = 320, VH = 260;
  const cx = VW / 2;
  const cy = VH / 2;
  const ARM = 120; // how far each ray extends from centre
  const ARC_R = 40;

  const toRad = (d: number) => (d * Math.PI) / 180;

  // Line 1: horizontal. Line 2: at knownAngle CCW from positive-x axis.
  // This makes the top-right sector = knownAngle°.
  const rad = toRad(knownAngle);

  // Four endpoints
  const p = [
    { x: cx + ARM, y: cy },                                     // right
    { x: cx - ARM, y: cy },                                     // left
    { x: cx + ARM * Math.cos(rad), y: cy - ARM * Math.sin(rad) }, // upper-line2
    { x: cx - ARM * Math.cos(rad), y: cy + ARM * Math.sin(rad) }, // lower-line2
  ];

  // Four sector mid-angles (CCW from positive-x) and their labels
  const suppAngle = 180 - knownAngle;
  const sectors = [
    { midDeg: knownAngle / 2,              label: `${knownAngle}°`, color: '#1E3A8A', arc: '#2563EB' },
    { midDeg: knownAngle + suppAngle / 2,  label: `${suppAngle}°`,  color: '#78716C', arc: '#A8A29E' },
    { midDeg: 180 + knownAngle / 2,        label: '?°',             color: '#6B21A8', arc: '#9333EA' },
    { midDeg: 360 - suppAngle / 2,         label: `${suppAngle}°`,  color: '#78716C', arc: '#A8A29E' },
  ];

  // Arcs for each sector
  const makeArc = (startDeg: number, endDeg: number, color: string) => {
    const s = toRad(startDeg);
    const e = toRad(endDeg);
    const span = endDeg - startDeg;
    const sx = cx + ARC_R * Math.cos(s);
    const sy = cy - ARC_R * Math.sin(s);
    const ex = cx + ARC_R * Math.cos(e);
    const ey = cy - ARC_R * Math.sin(e);
    const large = span > 180 ? 1 : 0;
    return (
      <path
        key={color + startDeg}
        d={`M ${sx} ${sy} A ${ARC_R} ${ARC_R} 0 ${large} 0 ${ex} ${ey}`}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
      />
    );
  };

  const LABEL_R = ARC_R + 20;

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      width="100%"
      style={{ maxWidth: '500px' }}
      aria-label={`Two crossing lines. Known angle ${knownAngle}°, vertical angle unknown`}
    >
      {/* Line 1: horizontal */}
      <line x1={p[0].x} y1={p[0].y} x2={p[1].x} y2={p[1].y} stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Line 2: angled */}
      <line x1={p[2].x} y1={p[2].y} x2={p[3].x} y2={p[3].y} stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Centre dot */}
      <circle cx={cx} cy={cy} r="4" fill="#475569" />

      {/* Arcs */}
      {makeArc(0, knownAngle, sectors[0].arc)}
      {makeArc(knownAngle, 180, sectors[1].arc)}
      {makeArc(180, 180 + knownAngle, sectors[2].arc)}
      {makeArc(180 + knownAngle, 360, sectors[3].arc)}

      {/* Labels */}
      {sectors.map((s) => {
        const r = toRad(s.midDeg);
        const lx = cx + LABEL_R * Math.cos(r);
        const ly = cy - LABEL_R * Math.sin(r);
        return (
          <text
            key={s.midDeg}
            x={lx} y={ly}
            fontSize="13" fontWeight="700"
            fill={s.color}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            textAnchor="middle" dominantBaseline="middle"
          >
            {s.label}
          </text>
        );
      })}
    </svg>
  );
}

// ─── Complementary Pair ───────────────────────────────────────────────────────

function ComplementaryPairDiagram({ knownAngle }: { knownAngle: number }) {
  const VW = 260, VH = 220;
  const vx = 60, vy = VH - 50;
  const RAY_LEN = 130;
  const ARC_R   = 44;
  const SQUARE  = 14;
  const toRad   = (d: number) => (d * Math.PI) / 180;

  // Base ray: right. Top ray: straight up (90°). Middle ray: at knownAngle.
  const midRad = toRad(knownAngle);
  const midEndX = vx + RAY_LEN * Math.cos(midRad);
  const midEndY = vy - RAY_LEN * Math.sin(midRad);

  // Right-angle square on the 90° corner
  const squarePath = `M ${vx + SQUARE} ${vy} L ${vx + SQUARE} ${vy - SQUARE} L ${vx} ${vy - SQUARE}`;

  // Arc for known angle (0° → knownAngle)
  const a1s = { x: vx + ARC_R, y: vy };
  const a1e = { x: vx + ARC_R * Math.cos(midRad), y: vy - ARC_R * Math.sin(midRad) };
  const arc1 = `M ${a1s.x} ${a1s.y} A ${ARC_R} ${ARC_R} 0 0 0 ${a1e.x} ${a1e.y}`;

  // Arc for unknown angle (knownAngle → 90°)
  const unknownAngle = 90 - knownAngle;
  const topRad = toRad(90);
  const a2e = { x: vx + ARC_R * Math.cos(topRad), y: vy - ARC_R * Math.sin(topRad) };
  const arc2 = `M ${a1e.x} ${a1e.y} A ${ARC_R} ${ARC_R} 0 0 0 ${a2e.x} ${a2e.y}`;

  // Labels
  const LABEL_R = ARC_R + 18;
  const lx1 = vx + LABEL_R * Math.cos(toRad(knownAngle / 2));
  const ly1 = vy - LABEL_R * Math.sin(toRad(knownAngle / 2));
  const lx2 = vx + LABEL_R * Math.cos(toRad(knownAngle + unknownAngle / 2));
  const ly2 = vy - LABEL_R * Math.sin(toRad(knownAngle + unknownAngle / 2));

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label={`Complementary angles: ${knownAngle}° and unknown in a right angle`}>
      {/* Right angle square */}
      <path d={squarePath} fill="none" stroke="#64748B" strokeWidth="1.8" />
      {/* Base ray */}
      <line x1={vx} y1={vy} x2={vx + RAY_LEN} y2={vy} stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Top ray (90°) */}
      <line x1={vx} y1={vy} x2={vx} y2={vy - RAY_LEN} stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Middle ray */}
      <line x1={vx} y1={vy} x2={midEndX} y2={midEndY} stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={vx} cy={vy} r="4" fill="#475569" />
      {/* Arcs */}
      <path d={arc1} fill="none" stroke="#2563EB" strokeWidth="1.8" />
      <path d={arc2} fill="none" stroke="#9333EA" strokeWidth="1.8" />
      {/* Labels */}
      <text x={lx1} y={ly1} fontSize="14" fontWeight="700" fill="#1E3A8A"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
        {knownAngle}°
      </text>
      <text x={lx2} y={ly2} fontSize="14" fontWeight="700" fill="#6B21A8"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
        ?°
      </text>
    </svg>
  );
}

// ─── Angles Around a Point ────────────────────────────────────────────────────

function AnglesAroundPointDiagram({
  angles,
  unknownIndex,
}: {
  angles: [number, number, number, number];
  unknownIndex: number;
}) {
  const VW = 300, VH = 300;
  const cx = VW / 2, cy = VH / 2;
  const RAY_LEN = 110;
  const ARC_R   = 38;
  const LABEL_R = ARC_R + 22;
  const toRad   = (d: number) => (d * Math.PI) / 180;

  // Build cumulative start angles for each sector (starting from 0° = right)
  const starts: number[] = [];
  let cum = 0;
  for (let i = 0; i < 4; i++) { starts.push(cum); cum += angles[i]; }

  const colors = ['#2563EB', '#16A34A', '#D97706', '#DC2626'];
  const labelColors = ['#1E3A8A', '#14532D', '#92400E', '#991B1B'];
  const unknownArc = '#9333EA';
  const unknownLabel = '#6B21A8';

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label="Four angles meeting at a point">
      {/* Rays */}
      {starts.map((startDeg, i) => {
        const r = toRad(startDeg);
        return (
          <line key={i} x1={cx} y1={cy}
            x2={cx + RAY_LEN * Math.cos(r)} y2={cy - RAY_LEN * Math.sin(r)}
            stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        );
      })}
      <circle cx={cx} cy={cy} r="4" fill="#475569" />

      {/* Arcs and labels */}
      {angles.map((ang, i) => {
        const startDeg = starts[i];
        const endDeg   = startDeg + ang;
        const s = toRad(startDeg), e = toRad(endDeg);
        const large = ang > 180 ? 1 : 0;
        const sx = cx + ARC_R * Math.cos(s), sy = cy - ARC_R * Math.sin(s);
        const ex = cx + ARC_R * Math.cos(e), ey = cy - ARC_R * Math.sin(e);
        const arcPath = `M ${sx} ${sy} A ${ARC_R} ${ARC_R} 0 ${large} 0 ${ex} ${ey}`;
        const midRad = toRad(startDeg + ang / 2);
        const lx = cx + LABEL_R * Math.cos(midRad);
        const ly = cy - LABEL_R * Math.sin(midRad);
        const isUnknown = i === unknownIndex;
        return (
          <g key={i}>
            <path d={arcPath} fill="none" stroke={isUnknown ? unknownArc : colors[i]} strokeWidth="1.8" />
            <text x={lx} y={ly} fontSize="13" fontWeight="700"
              fill={isUnknown ? unknownLabel : labelColors[i]}
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              textAnchor="middle" dominantBaseline="middle">
              {isUnknown ? '?°' : `${ang}°`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Parallel Lines ───────────────────────────────────────────────────────────

function ParallelLinesDiagram({
  knownAngle,
  highlight,
}: {
  knownAngle: number;
  highlight: 'alternate-interior' | 'co-interior';
}) {
  const VW = 340, VH = 280;

  // Two parallel horizontal lines
  const y1 = 80,  y2 = 200;
  const x1 = 30,  x2 = 310;

  // Transversal: cuts through at an angle. Anchor at centre.
  const midX = VW / 2;
  const RAD  = ((180 - knownAngle) * Math.PI) / 180; // angle from positive-x
  const T    = 140; // half-length of transversal
  const tx1  = midX - T * Math.cos(RAD);
  const ty1  = (y1 + y2) / 2 - T * Math.sin(RAD);
  const tx2  = midX + T * Math.cos(RAD);
  const ty2  = (y1 + y2) / 2 + T * Math.sin(RAD);

  // Intersection points of transversal with each parallel line
  // Line: y = y_line → t param along transversal
  const tParam = (yLine: number) => (yLine - ty1) / (ty2 - ty1);
  const ixAt   = (yLine: number) => tx1 + tParam(yLine) * (tx2 - tx1);
  const ix1    = ixAt(y1);
  const ix2    = ixAt(y2);

  const ARC_R = 28;
  const toRad = (d: number) => (d * Math.PI) / 180;

  // At each intersection, the transversal goes at angle RAD from positive-x.
  // The parallel lines go at 0°.
  // The four angles at each intersection are: knownAngle (above-right), (180-knownAngle) (above-left),
  // knownAngle (below-left), (180-knownAngle) (below-right).

  // Alternate interior: above-right at intersection 1, below-left at intersection 2 (or vice versa)
  // Co-interior: above-right at intersection 1, above-right at intersection 2 (same side)

  // We label: known at top intersection (below-right = interior-right), and either equal or supplementary at bottom
  // "Interior" angles are between the two parallel lines.

  // Interior angle on the right side of transversal at upper intersection = knownAngle (below right)
  // Alternate interior = same angle at lower intersection on the left (above left) = knownAngle
  // Co-interior = angle at lower intersection on the right (above right) = 180 - knownAngle → ?

  const suppAngle = 180 - knownAngle;
  const unknownAngle = highlight === 'alternate-interior' ? knownAngle : suppAngle;

  // Draw angle arcs at each intersection
  // At upper intersection (ix1, y1): arc below-right of transversal (interior side, right of transversal)
  //   starts at 0° (right along line) going down to transversal direction - knownAngle below horizontal
  //   Actually: the angle below the upper parallel line, to the right of transversal = knownAngle
  //   This spans from 0° down to -(knownAngle) in SVG coords = from 0 to -knownAngle°
  //   In SVG: from angle 0 (right) sweeping CW (positive in SVG) to -RAD direction = knownAngle sweep

  // Simplified: just draw arcs using known geometry
  // Upper intersection: interior angle on right = knownAngle, below the line, right of transversal
  //   Arc from 0 (right along parallel) rotating CW (SVG) by knownAngle → endpoint at transversal going down
  // Lower intersection:
  //   alternate-interior: interior angle on left = knownAngle, above the line, left of transversal
  //   co-interior: interior angle on right = 180-knownAngle, above the line, right of transversal

  const mkArc = (px: number, py: number, startDeg: number, spanDeg: number, color: string) => {
    const s = toRad(startDeg);
    const e = toRad(startDeg + spanDeg);
    const large = Math.abs(spanDeg) > 180 ? 1 : 0;
    const sweep = spanDeg > 0 ? 1 : 0; // 1 = CW in SVG
    const sx = px + ARC_R * Math.cos(s), sy = py + ARC_R * Math.sin(s);
    const ex = px + ARC_R * Math.cos(e), ey = py + ARC_R * Math.sin(e);
    return <path d={`M ${sx} ${sy} A ${ARC_R} ${ARC_R} 0 ${large} ${sweep} ${ex} ${ey}`}
      fill="none" stroke={color} strokeWidth="1.8" />;
  };

  // Transversal angle in SVG coords: from positive-x CW. Going down-left means angle = 180° - knownAngle from +x CCW
  // In SVG y-down: transversal going from upper-right to lower-left
  // Direction vector: (tx2-tx1, ty2-ty1) normalised. In SVG, ty2 > ty1 means going down.
  // Angle of transversal (SVG, CW from +x): atan2(ty2-ty1, tx2-tx1)
  const transAngleSVG = Math.atan2(ty2 - ty1, tx2 - tx1) * 180 / Math.PI; // degrees, CW from +x in SVG

  // Upper intersection, interior-right arc: from transversal-down-direction CW to 0° (right along line)
  // "interior right" = right of transversal, below upper parallel line
  // Transversal going downward at angle: transAngleSVG (CW from +x), so "down" direction = transAngleSVG
  // Interior-right arc sweeps from transAngleSVG back to 0° (right) CCW... this is getting complex.
  // Let me simplify with hardcoded logic:
  //   At upper intersection, interior-right angle = knownAngle
  //   Arc: starts at 0° (right), sweeps CW (positive SVG) by knownAngle, to transversal-down angle
  //   But transversal-down angle = transAngleSVG (pointing from upper to lower)
  // So: startDeg=0, spanDeg=transAngleSVG (if positive, CW)

  // Arc at upper intersection (right of transversal, below line) = starts at 0°, spans to transAngleSVG CW
  const arcUpperSpan = transAngleSVG; // should be positive (CW) if transversal goes down-right
  // Arc at lower intersection depends on highlight:
  //   alternate-interior: left of transversal, above lower line = starts at 180° (left), spans CW by knownAngle
  //   co-interior: right of transversal, above lower line = starts at 0° (right), spans CCW by suppAngle
  //     = starts at 0°, spans CW by -(suppAngle) = CCW

  const labelOffsetUpper = { x: ix1 + (ARC_R + 14) * Math.cos(toRad(arcUpperSpan / 2)), y: y1 + (ARC_R + 14) * Math.sin(toRad(arcUpperSpan / 2)) };

  let arcLower: React.ReactElement;
  let labelLower: { x: number; y: number };

  if (highlight === 'alternate-interior') {
    // Above lower line, left of transversal: from 180° CW by knownAngle
    const startDeg = 180;
    const spanDeg  = knownAngle; // CW sweep
    arcLower = mkArc(ix2, y2, startDeg, spanDeg, '#9333EA');
    const midDeg = startDeg + spanDeg / 2;
    labelLower = { x: ix2 + (ARC_R + 14) * Math.cos(toRad(midDeg)), y: y2 + (ARC_R + 14) * Math.sin(toRad(midDeg)) };
  } else {
    // Above lower line, right of transversal: from 0° CCW by suppAngle = span of -(suppAngle)
    const startDeg = 0;
    const spanDeg  = -suppAngle;
    arcLower = mkArc(ix2, y2, startDeg, spanDeg, '#9333EA');
    const midDeg = startDeg + spanDeg / 2;
    labelLower = { x: ix2 + (ARC_R + 14) * Math.cos(toRad(midDeg)), y: y2 + (ARC_R + 14) * Math.sin(toRad(midDeg)) };
  }

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label={`Parallel lines cut by transversal. ${highlight} angles shown.`}>
      {/* Parallel lines */}
      <line x1={x1} y1={y1} x2={x2} y2={y1} stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1={x1} y1={y2} x2={x2} y2={y2} stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Parallel arrows */}
      <text x={x2 + 6} y={y1 + 5} fontSize="13" fill="#64748B">→</text>
      <text x={x2 + 6} y={y2 + 5} fontSize="13" fill="#64748B">→</text>
      {/* Transversal */}
      <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Intersection dots */}
      <circle cx={ix1} cy={y1} r="3.5" fill="#475569" />
      <circle cx={ix2} cy={y2} r="3.5" fill="#475569" />

      {/* Upper arc (known angle) */}
      {mkArc(ix1, y1, 0, arcUpperSpan, '#2563EB')}
      <text x={labelOffsetUpper.x} y={labelOffsetUpper.y} fontSize="13" fontWeight="700" fill="#1E3A8A"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
        {knownAngle}°
      </text>

      {/* Lower arc (unknown angle) */}
      {arcLower}
      <text x={labelLower.x} y={labelLower.y} fontSize="13" fontWeight="700" fill="#6B21A8"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
        ?°
      </text>
    </svg>
  );
}

// ─── Right Triangle ───────────────────────────────────────────────────────────

function RightTriangleDiagram({ legs, hypotenuse, unknown }: {
  legs: [number, number];
  hypotenuse: number;
  unknown: 'hypotenuse' | 'leg-a' | 'leg-b';
}) {
  const VW = 320, VH = 240;
  const PAD = 55;
  const availW = VW - 2 * PAD, availH = VH - 2 * PAD;
  const scale = Math.min(availW / legs[0], availH / legs[1]);
  const dispA = legs[0] * scale; // horizontal leg
  const dispB = legs[1] * scale; // vertical leg
  const SQUARE = 12;

  // Right angle at bottom-left
  const rx = PAD, ry = VH - PAD;
  const bx = rx + dispA, by = ry;   // bottom-right
  const tx = rx,         ty = ry - dispB; // top-left
  const pts = `${rx},${ry} ${bx},${by} ${tx},${ty}`;

  const hypLen = Math.sqrt(dispA * dispA + dispB * dispB);
  // Outward normal from hypotenuse (upper-right direction)
  const hypNormX = dispB / hypLen, hypNormY = -dispA / hypLen;
  const hypMidX = (bx + tx) / 2, hypMidY = (by + ty) / 2;

  const labelA = unknown === 'leg-a' ? '?' : `${legs[0]}`;
  const labelB = unknown === 'leg-b' ? '?' : `${legs[1]}`;
  const labelH = unknown === 'hypotenuse' ? '?' : `${hypotenuse}`;
  const colA = unknown === 'leg-a' ? '#6B21A8' : '#9A3412';
  const colB = unknown === 'leg-b' ? '#6B21A8' : '#9A3412';
  const colH = unknown === 'hypotenuse' ? '#6B21A8' : '#9A3412';

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label="Right triangle with labeled sides">
      <polygon points={pts} fill="#FFF7ED" stroke="#F97316" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Right-angle mark */}
      <path d={`M ${rx + SQUARE} ${ry} L ${rx + SQUARE} ${ry - SQUARE} L ${rx} ${ry - SQUARE}`}
        fill="none" stroke="#F97316" strokeWidth="1.8" />
      {/* Leg a — below bottom edge */}
      <text x={(rx + bx) / 2} y={ry + 22} fontSize="14" fontWeight="700" fill={colA}
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
        {labelA}
      </text>
      {/* Leg b — left of vertical edge, rotated */}
      <text x={rx - 26} y={(ry + ty) / 2} fontSize="14" fontWeight="700" fill={colB}
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle"
        transform={`rotate(-90, ${rx - 26}, ${(ry + ty) / 2})`}>
        {labelB}
      </text>
      {/* Hypotenuse — offset outward from midpoint */}
      <text x={hypMidX + 22 * hypNormX} y={hypMidY + 22 * hypNormY}
        fontSize="14" fontWeight="700" fill={colH}
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
        {labelH}
      </text>
    </svg>
  );
}

// ─── Rectangle with Diagonal ──────────────────────────────────────────────────

function RectangleDiagonalDiagram({ width, height }: { width: number; height: number }) {
  const VW = 320, VH = 240;
  const PAD = 55;
  const availW = VW - 2 * PAD, availH = VH - 2 * PAD;
  const scale = Math.min(availW / width, availH / height);
  const dispW = width * scale, dispH = height * scale;
  const rx = (VW - dispW) / 2, ry = (VH - dispH) / 2;

  // Diagonal from bottom-left to top-right
  const x1 = rx, y1 = ry + dispH;
  const x2 = rx + dispW, y2 = ry;
  const midX = (x1 + x2) / 2, midY = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const dLen = Math.sqrt(dx * dx + dy * dy);
  // Outward perpendicular (upper-right for this diagonal)
  const normX = -dy / dLen, normY = dx / dLen;

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label={`Rectangle ${width} × ${height} with diagonal`}>
      <rect x={rx} y={ry} width={dispW} height={dispH} fill="#FFF7ED" stroke="#F97316" strokeWidth="2.5" />
      {/* Diagonal */}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2563EB" strokeWidth="2" strokeDasharray="6 4" />
      {/* Width label */}
      <text x={rx + dispW / 2} y={ry + dispH + 22} fontSize="14" fontWeight="700" fill="#9A3412"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
        {width} cm
      </text>
      {/* Height label */}
      <text x={rx - 24} y={ry + dispH / 2} fontSize="14" fontWeight="700" fill="#9A3412"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle"
        transform={`rotate(-90, ${rx - 24}, ${ry + dispH / 2})`}>
        {height} cm
      </text>
      {/* Diagonal label */}
      <text x={midX + 20 * normX} y={midY + 20 * normY} fontSize="14" fontWeight="700" fill="#6B21A8"
        fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
        ?
      </text>
    </svg>
  );
}

// ─── Regular Polygon ──────────────────────────────────────────────────────────

function RegularPolygonDiagram({ sides, angleLabel, showExterior }: { sides: number; angleLabel?: string; showExterior?: boolean }) {
  const VW = 280, VH = 280;
  const cx = VW / 2, cy = VH / 2 + 8;
  const R = sides <= 6 ? 100 : sides <= 9 ? 88 : 78;
  const ARC_R = 24;

  const verts = Array.from({ length: sides }, (_, i) => ({
    x: cx + R * Math.cos((2 * Math.PI * i / sides) - Math.PI / 2),
    y: cy + R * Math.sin((2 * Math.PI * i / sides) - Math.PI / 2),
  }));
  const pts = verts.map(v => `${v.x.toFixed(2)},${v.y.toFixed(2)}`).join(' ');

  // v0 = top vertex, v1 = next CW, vLast = prev CW
  const v0 = verts[0], v1 = verts[1], vLast = verts[sides - 1];

  const norm = (dx: number, dy: number) => { const l = Math.sqrt(dx*dx+dy*dy)||1; return { x: dx/l, y: dy/l }; };
  const dir1 = norm(v1.x - v0.x, v1.y - v0.y);
  const dirL = norm(vLast.x - v0.x, vLast.y - v0.y);

  const arcPt1 = { x: v0.x + ARC_R * dir1.x, y: v0.y + ARC_R * dir1.y };
  const arcPtL = { x: v0.x + ARC_R * dirL.x, y: v0.y + ARC_R * dirL.y };

  // Interior arc: arcPtL → arcPt1, CW (sweep=1), spans interior angle
  const intAngle = (sides - 2) * 180 / sides;
  const intArcPath = `M ${arcPtL.x.toFixed(2)} ${arcPtL.y.toFixed(2)} A ${ARC_R} ${ARC_R} 0 0 1 ${arcPt1.x.toFixed(2)} ${arcPt1.y.toFixed(2)}`;

  // Interior label: midpoint of dir1 and dirL, pushed inward
  const mid = norm(dir1.x + dirL.x, dir1.y + dirL.y);
  const LABEL_R = ARC_R + 16;
  const intLabel = { x: v0.x + LABEL_R * mid.x, y: v0.y + LABEL_R * mid.y };

  // Exterior: extend vLast→v0 past v0
  const EXT = 50;
  const extDir = { x: -dirL.x, y: -dirL.y }; // direction of extension
  const extPt = { x: v0.x + EXT * extDir.x, y: v0.y + EXT * extDir.y };
  const extArcPt = { x: v0.x + ARC_R * extDir.x, y: v0.y + ARC_R * extDir.y };
  const extArcPath = `M ${extArcPt.x.toFixed(2)} ${extArcPt.y.toFixed(2)} A ${ARC_R} ${ARC_R} 0 0 0 ${arcPt1.x.toFixed(2)} ${arcPt1.y.toFixed(2)}`;
  const extMid = norm(extDir.x + dir1.x, extDir.y + dir1.y);
  const extLabel = { x: v0.x + (ARC_R + 18) * extMid.x, y: v0.y + (ARC_R + 18) * extMid.y };

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label={`Regular ${sides}-sided polygon`}>
      <polygon points={pts} fill="#FFF7ED" stroke="#F97316" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Extension line for exterior angle */}
      {showExterior && (
        <line x1={v0.x} y1={v0.y} x2={extPt.x} y2={extPt.y}
          stroke="#F97316" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" />
      )}

      {/* Interior angle arc + label */}
      {angleLabel && !showExterior && (
        <>
          <path d={intArcPath} fill="none" stroke="#2563EB" strokeWidth="1.8" />
          <text x={intLabel.x} y={intLabel.y} fontSize="12" fontWeight="700" fill="#6B21A8"
            fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
            {angleLabel}
          </text>
        </>
      )}

      {/* Exterior angle arc + label */}
      {showExterior && (
        <>
          <path d={extArcPath} fill="none" stroke="#9333EA" strokeWidth="1.8" />
          <text x={extLabel.x} y={extLabel.y} fontSize="12" fontWeight="700" fill="#6B21A8"
            fontFamily="ui-sans-serif, system-ui, sans-serif" textAnchor="middle" dominantBaseline="middle">
            ?°
          </text>
        </>
      )}
    </svg>
  );
}

// ─── Quadrilateral Angles ─────────────────────────────────────────────────────

function QuadrilateralAnglesDiagram({ angles, unknownIndex }: { angles: [number, number, number, number]; unknownIndex: number }) {
  const VW = 320, VH = 260;
  // Fixed slightly-irregular quadrilateral: BL, BR, TR, TL
  const vx = [65, 265, 248, 72];
  const vy = [205, 218, 52, 58];
  const pts = vx.map((x, i) => `${x},${vy[i]}`).join(' ');
  const centX = vx.reduce((s, x) => s + x, 0) / 4;
  const centY = vy.reduce((s, y) => s + y, 0) / 4;
  const PUSH = 30;

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label="Quadrilateral with labeled angles">
      <polygon points={pts} fill="#FFF7ED" stroke="#F97316" strokeWidth="2.5" strokeLinejoin="round" />
      {vx.map((x, i) => {
        const dx = centX - x, dy = centY - vy[i];
        const len = Math.sqrt(dx*dx + dy*dy) || 1;
        const isUnknown = i === unknownIndex;
        return (
          <text key={i}
            x={x + (dx/len) * PUSH} y={vy[i] + (dy/len) * PUSH}
            fontSize="13" fontWeight="700"
            fill={isUnknown ? '#6B21A8' : '#9A3412'}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            textAnchor="middle" dominantBaseline="middle">
            {isUnknown ? '?°' : `${angles[i]}°`}
          </text>
        );
      })}
    </svg>
  );
}

// ─── Coordinate Grid ──────────────────────────────────────────────────────────

function CoordinateGridDiagram({
  points,
  segments = [],
  highlightLine,
}: {
  points: Array<{ x: number; y: number; label?: string; color?: 'blue' | 'purple' | 'orange' }>;
  segments?: Array<{ x1: number; y1: number; x2: number; y2: number; dashed?: boolean }>;
  highlightLine?: 'x-axis' | 'y-axis' | 'y=x';
}) {
  const SIZE = 240;
  const PAD = 28;
  const half = SIZE / 2;
  const usable = half - PAD;

  const maxCoord = Math.max(
    5,
    ...points.flatMap(p => [Math.abs(p.x), Math.abs(p.y)]),
    ...segments.flatMap(s => [Math.abs(s.x1), Math.abs(s.y1), Math.abs(s.x2), Math.abs(s.y2)]),
  );
  const range = maxCoord + 1;
  const scale = usable / range;

  const toX = (x: number) => half + x * scale;
  const toY = (y: number) => half - y * scale;

  const FONT = 'ui-sans-serif, system-ui, sans-serif';
  const COLOR: Record<string, string> = { blue: '#3b82f6', purple: '#7c3aed', orange: '#f97316' };
  const ticks = Array.from({ length: range * 2 + 1 }, (_, i) => i - range);
  const labelStep = range <= 6 ? 1 : 2;
  const labelTicks = ticks.filter(v => v !== 0 && v % labelStep === 0 && Math.abs(v) < range);

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label="Coordinate grid">
      {/* Grid lines */}
      {ticks.map(v => (
        <line key={`gv${v}`} x1={toX(v)} y1={PAD} x2={toX(v)} y2={SIZE - PAD} stroke="#e5e7eb" strokeWidth="0.5" />
      ))}
      {ticks.map(v => (
        <line key={`gh${v}`} x1={PAD} y1={toY(v)} x2={SIZE - PAD} y2={toY(v)} stroke="#e5e7eb" strokeWidth="0.5" />
      ))}

      {/* Highlighted line */}
      {highlightLine === 'x-axis' && (
        <line x1={PAD} y1={half} x2={SIZE - PAD} y2={half} stroke="#3b82f6" strokeWidth="2.5" opacity="0.35" />
      )}
      {highlightLine === 'y-axis' && (
        <line x1={half} y1={PAD} x2={half} y2={SIZE - PAD} stroke="#3b82f6" strokeWidth="2.5" opacity="0.35" />
      )}
      {highlightLine === 'y=x' && (
        <line x1={PAD} y1={SIZE - PAD} x2={SIZE - PAD} y2={PAD} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" />
      )}

      {/* Axes */}
      <line x1={PAD} y1={half} x2={SIZE - PAD} y2={half} stroke="#374151" strokeWidth="1.5" />
      <line x1={half} y1={PAD} x2={half} y2={SIZE - PAD} stroke="#374151" strokeWidth="1.5" />

      {/* Axis number labels */}
      {labelTicks.map(v => (
        <text key={`xl${v}`} x={toX(v)} y={half + 14} textAnchor="middle" fontSize="9" fill="#9ca3af" fontFamily={FONT}>{v}</text>
      ))}
      {labelTicks.map(v => (
        <text key={`yl${v}`} x={half - 13} y={toY(v) + 3} textAnchor="middle" fontSize="9" fill="#9ca3af" fontFamily={FONT}>{v}</text>
      ))}

      {/* Segments */}
      {segments.map((s, i) => (
        <line key={`seg${i}`} x1={toX(s.x1)} y1={toY(s.y1)} x2={toX(s.x2)} y2={toY(s.y2)}
          stroke="#6b7280" strokeWidth="1.5" strokeDasharray={s.dashed ? '5 3' : undefined} />
      ))}

      {/* Points — label only shown if explicitly provided in spec */}
      {points.map((p, i) => {
        const col = p.color ? COLOR[p.color] : '#374151';
        const offY = p.y >= 0 ? -10 : 14;
        return (
          <g key={`pt${i}`}>
            <circle cx={toX(p.x)} cy={toY(p.y)} r={4} fill={col} />
            {p.label !== undefined && (
              <text x={toX(p.x)} y={toY(p.y) + offY} textAnchor="middle" fontSize="10"
                fill={col} fontWeight="bold" fontFamily={FONT}>
                {p.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Cuboid (isometric projection) ────────────────────────────────────────────

function CuboidDiagram({ length: l, width: w, height: h, unknownDimension, lengthLabel, widthLabel, heightLabel }: {
  length: number; width: number; height: number; unknownDimension?: 'length' | 'width' | 'height'; lengthLabel?: string; widthLabel?: string; heightLabel?: string;
}) {
  const VW = 320, VH = 240, PAD = 30;
  const cos30 = Math.sqrt(3) / 2, sin30 = 0.5;

  const totalW = l + w * cos30;
  const totalH = h + w * sin30;
  const scale  = Math.min((VW - 2 * PAD) / totalW, (VH - 2 * PAD) / totalH);

  const usedW = totalW * scale;
  const usedH = totalH * scale;
  // Origin = front-bottom-left (BFL). Leftmost point is BRL = ox - w·cos30·scale.
  const ox = PAD + w * cos30 * scale + (VW - 2 * PAD - usedW) / 2;
  const oy = VH - PAD - (VH - 2 * PAD - usedH) / 2;

  const proj = (x: number, d: number, ht: number) => ({
    x: ox + x * scale - d * cos30 * scale,
    y: oy - ht * scale - d * sin30 * scale,
  });

  const BFL = proj(0, 0, 0); const BFR = proj(l, 0, 0);
  const TFL = proj(0, 0, h); const TFR = proj(l, 0, h);
  const BRL = proj(0, w, 0); const BRR = proj(l, w, 0);
  const TRL = proj(0, w, h); const TRR = proj(l, w, h);

  const p = (v: { x: number; y: number }) => `${v.x.toFixed(1)},${v.y.toFixed(1)}`;
  const poly = (vs: { x: number; y: number }[]) => vs.map(p).join(' ');

  const FONT = 'ui-sans-serif, system-ui, sans-serif';
  const colL = unknownDimension === 'length' ? '#6B21A8' : '#9A3412';
  const colW = unknownDimension === 'width'  ? '#6B21A8' : '#9A3412';
  const colH = unknownDimension === 'height' ? '#6B21A8' : '#9A3412';
  const lblL = unknownDimension === 'length' ? '?' : (lengthLabel ?? `${l}`);
  const lblW = unknownDimension === 'width'  ? '?' : (widthLabel  ?? `${w}`);
  const lblH = unknownDimension === 'height' ? '?' : (heightLabel ?? `${h}`);

  const midFront = { x: (BFL.x + BFR.x) / 2, y: (BFL.y + BFR.y) / 2 };
  const midRight = { x: (BFR.x + BRR.x) / 2, y: (BFR.y + BRR.y) / 2 };
  const midLeft  = { x: (BFL.x + TFL.x) / 2, y: (BFL.y + TFL.y) / 2 };

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label="3D rectangular prism">
      {/* Hidden rear edges */}
      <line x1={p(BRL).split(',')[0]} y1={p(BRL).split(',')[1]} x2={p(TRL).split(',')[0]} y2={p(TRL).split(',')[1]} stroke="#F97316" strokeWidth="1" strokeDasharray="4 3" />
      <line x1={p(BRL).split(',')[0]} y1={p(BRL).split(',')[1]} x2={p(BFL).split(',')[0]} y2={p(BFL).split(',')[1]} stroke="#F97316" strokeWidth="1" strokeDasharray="4 3" />
      <line x1={p(BRL).split(',')[0]} y1={p(BRL).split(',')[1]} x2={p(BRR).split(',')[0]} y2={p(BRR).split(',')[1]} stroke="#F97316" strokeWidth="1" strokeDasharray="4 3" />
      {/* Three visible faces */}
      <polygon points={poly([BFL, BFR, TFR, TFL])} fill="#FFF7ED" stroke="#F97316" strokeWidth="1.8" strokeLinejoin="round" />
      <polygon points={poly([BFR, BRR, TRR, TFR])} fill="#FEF3E8" stroke="#F97316" strokeWidth="1.8" strokeLinejoin="round" />
      <polygon points={poly([TFL, TFR, TRR, TRL])} fill="#FFFBF5" stroke="#F97316" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Dimension labels */}
      <text x={midFront.x} y={midFront.y + 18} textAnchor="middle" fontSize="13" fontWeight="700"
        fill={colL} fontFamily={FONT} dominantBaseline="middle">{lblL}</text>
      <text x={midRight.x + 12} y={midRight.y + 8} textAnchor="start" fontSize="13" fontWeight="700"
        fill={colW} fontFamily={FONT} dominantBaseline="middle">{lblW}</text>
      <text x={midLeft.x - 12} y={midLeft.y} textAnchor="end" fontSize="13" fontWeight="700"
        fill={colH} fontFamily={FONT} dominantBaseline="middle">{lblH}</text>
    </svg>
  );
}

// ─── Cylinder 3D ──────────────────────────────────────────────────────────────

function Cylinder3DDiagram({ radius: r, height: h, unknownDimension, radiusLabel, heightLabel }: {
  radius: number; height: number; unknownDimension?: 'radius' | 'height'; radiusLabel?: string; heightLabel?: string;
}) {
  const VW = 280, VH = 240, PAD = 20;
  const ER = 0.32; // ellipse vertical ratio

  const scale = Math.min(
    (VW / 2 - PAD) / r,
    (VH - 2 * PAD) / (h + 2 * r * ER),
    40,
  );

  const erX   = r * scale;
  const erY   = erX * ER;
  const bodyH = h * scale;
  const cx    = VW / 2;
  const topY  = PAD + (VH - 2 * PAD - bodyH - 2 * erY) / 2 + erY;
  const botY  = topY + bodyH;

  const FONT = 'ui-sans-serif, system-ui, sans-serif';
  const colR = unknownDimension === 'radius' ? '#6B21A8' : '#9A3412';
  const colH = unknownDimension === 'height' ? '#6B21A8' : '#9A3412';
  const lblR = unknownDimension === 'radius' ? '?' : (radiusLabel ?? `${r}`);
  const lblH = unknownDimension === 'height' ? '?' : (heightLabel ?? `${h}`);

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label="3D cylinder">
      {/* Body fill */}
      <rect x={cx - erX} y={topY} width={erX * 2} height={bodyH} fill="#FFF7ED" stroke="none" />
      {/* Side edges */}
      <line x1={cx - erX} y1={topY} x2={cx - erX} y2={botY} stroke="#F97316" strokeWidth="2" />
      <line x1={cx + erX} y1={topY} x2={cx + erX} y2={botY} stroke="#F97316" strokeWidth="2" />
      {/* Bottom ellipse — front arc solid, rear dashed */}
      <path d={`M ${cx - erX} ${botY} A ${erX} ${erY} 0 0 0 ${cx + erX} ${botY}`}
        fill="#FEF3E8" stroke="#F97316" strokeWidth="2" />
      <path d={`M ${cx - erX} ${botY} A ${erX} ${erY} 0 0 1 ${cx + erX} ${botY}`}
        fill="none" stroke="#F97316" strokeWidth="1" strokeDasharray="4 3" />
      {/* Top ellipse */}
      <ellipse cx={cx} cy={topY} rx={erX} ry={erY} fill="#FFFBF5" stroke="#F97316" strokeWidth="2" />
      {/* Radius dashed line on top */}
      <line x1={cx} y1={topY} x2={cx + erX} y2={topY} stroke={colR} strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Labels */}
      <text x={cx + erX / 2} y={topY - erY - 8} textAnchor="middle" fontSize="13" fontWeight="700"
        fill={colR} fontFamily={FONT} dominantBaseline="middle">{lblR}</text>
      <text x={cx - erX - 12} y={(topY + botY) / 2} textAnchor="end" fontSize="13" fontWeight="700"
        fill={colH} fontFamily={FONT} dominantBaseline="middle">{lblH}</text>
    </svg>
  );
}

// ─── Triangular Prism (isometric) ─────────────────────────────────────────────

function TriangularPrismDiagram({ triangleBase: B, triangleHeight: H, apexOffset: ax, length: L, sides }: {
  triangleBase: number; triangleHeight: number; apexOffset: number; length: number; sides?: [number, number, number];
}) {
  const VW = 320, VH = 240, PAD = 36;
  const cos30 = Math.sqrt(3) / 2, sin30 = 0.5;

  // Bounding box of the triangle cross-section
  const minX = Math.min(0, ax);
  const maxX = Math.max(B, ax);
  const triW = maxX - minX;   // true horizontal span
  const triH = H;

  // Total extents including the isometric depth (L extrudes back-right)
  const totalW = triW + L * cos30;
  const totalH = triH + L * sin30;
  const scale = Math.min((VW - 2 * PAD) / totalW, (VH - 2 * PAD) / totalH);

  // SVG origin: bottom-left of the front face
  const ox = PAD + (-minX) * scale + (VW - 2 * PAD - totalW * scale) / 2;
  const oy = PAD + totalH * scale + (VH - 2 * PAD - totalH * scale) / 2;

  // Project: front face (depth=0), back face (depth=L)
  const P = (x: number, y: number, d: number) => ({
    x: ox + x * scale + d * cos30 * scale,
    y: oy - y * scale - d * sin30 * scale,
  });

  // Front triangle vertices
  const fBL = P(0, 0, 0);
  const fBR = P(B, 0, 0);
  const fAP = P(ax, H, 0);

  // Back triangle vertices
  const bBL = P(0, 0, L);
  const bBR = P(B, 0, L);
  const bAP = P(ax, H, L);

  const pt = (v: { x: number; y: number }) => `${v.x},${v.y}`;
  const FONT = 'ui-sans-serif, system-ui, sans-serif';

  // Determine which faces are visible based on apexOffset
  // Front face always visible; bottom rectangular face always visible
  // Right rectangular face visible when apex is not at far right
  const showRightFace = ax <= B;

  // Dimension label positions
  const baseMid = { x: (fBL.x + fBR.x) / 2, y: fBL.y + 18 };
  const heightMid = { x: fAP.x - 18, y: (fAP.y + fBL.y) / 2 };
  const lengthMid = {
    x: (fBR.x + bBR.x) / 2,
    y: (fBR.y + bBR.y) / 2 + 14,
  };

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width: '100%', maxWidth: '500px' }}>
      {/* Bottom rectangular face */}
      <polygon points={`${pt(fBL)} ${pt(fBR)} ${pt(bBR)} ${pt(bBL)}`}
        fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />

      {/* Right rectangular face (slant side) */}
      {showRightFace && (
        <polygon points={`${pt(fBR)} ${pt(fAP)} ${pt(bAP)} ${pt(bBR)}`}
          fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
      )}

      {/* Front triangular face */}
      <polygon points={`${pt(fBL)} ${pt(fBR)} ${pt(fAP)}`}
        fill="#ecfdf5" stroke="#059669" strokeWidth="2" />

      {/* Back triangle — dashed */}
      <polygon points={`${pt(bBL)} ${pt(bBR)} ${pt(bAP)}`}
        fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="4 3" />

      {/* Back edges connecting front to back */}
      <line x1={fBL.x} y1={fBL.y} x2={bBL.x} y2={bBL.y}
        stroke="#6b7280" strokeWidth="1" strokeDasharray="4 3" />

      {/* Height indicator on front face */}
      <line x1={fAP.x} y1={fAP.y} x2={fAP.x} y2={fBL.y}
        stroke="#6b7280" strokeWidth="1" strokeDasharray="3 2" />

      {/* Dimension labels */}
      <text x={baseMid.x} y={baseMid.y} textAnchor="middle" fontSize="12"
        fill="#065f46" fontWeight="bold" fontFamily={FONT}>{B} cm</text>
      <text x={heightMid.x} y={heightMid.y} textAnchor="middle" fontSize="12"
        fill="#065f46" fontWeight="bold" fontFamily={FONT}
        transform={`rotate(-90, ${heightMid.x}, ${heightMid.y})`}>{H} cm</text>
      <text x={lengthMid.x} y={lengthMid.y} textAnchor="middle" fontSize="12"
        fill="#065f46" fontWeight="bold" fontFamily={FONT}>{L} cm</text>

      {/* Side labels if provided (surface area questions) */}
      {sides && (
        <text x={(fBL.x + fAP.x) / 2 - 14} y={(fBL.y + fAP.y) / 2}
          textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily={FONT}
          transform={`rotate(${Math.atan2(fAP.y - fBL.y, fAP.x - fBL.x) * 180 / Math.PI}, ${(fBL.x + fAP.x) / 2 - 14}, ${(fBL.y + fAP.y) / 2})`}>
          {sides[1]} cm
        </text>
      )}
    </svg>
  );
}

// ─── Similar Pair ─────────────────────────────────────────────────────────────

function SimilarPairDiagram({ vertices, scaleFactor: sf, smallLabel, largeLabel }: {
  vertices: Array<{ x: number; y: number }>;
  scaleFactor: number;
  smallLabel?: string;
  largeLabel?: string;
}) {
  const VW = 320, VH = 200, PAD = 28;
  const FONT = 'ui-sans-serif, system-ui, sans-serif';
  const GAP = 24; // gap between the two shapes

  // Bounding box of normalised vertices (may not be exactly 0–1 if shape is irregular)
  const xs = vertices.map(v => v.x);
  const ys = vertices.map(v => v.y);
  const vW = Math.max(...xs) - Math.min(...xs);
  const vH = Math.max(...ys) - Math.min(...ys);

  // Scale both shapes to fit side-by-side in the viewport.
  // Large shape width = sf * small shape width. Total horizontal space = (1 + sf) * shapeW + GAP.
  const maxShapeH = VH - 2 * PAD - 20; // 20px reserved for labels below
  const maxTotalW = VW - 2 * PAD - GAP;
  const unitW = maxTotalW / (vW * (1 + sf));
  const unitH = maxShapeH / vH;
  const unit = Math.min(unitW, unitH);

  const smallW = vW * unit;
  const smallH = vH * unit;
  const largeW = vW * unit * sf;
  const largeH = vH * unit * sf;

  // Vertically centre both shapes relative to the larger one
  const totalH = Math.max(smallH, largeH);
  const originY = PAD + totalH; // bottom of the shapes (SVG y increases downward)

  // Left shape origin (bottom-left of bounding box)
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const smallOriginX = PAD;
  const smallOriginY = originY - (totalH - smallH) / 2;

  const largeOriginX = PAD + smallW + GAP;
  const largeOriginY = originY;

  const toSVG = (v: { x: number; y: number }, ox: number, oy: number, scale: number) => ({
    x: ox + (v.x - minX) * scale,
    y: oy - (v.y - minY) * scale,
  });

  const pts = (ox: number, oy: number, scale: number) =>
    vertices.map(v => {
      const p = toSVG(v, ox, oy, scale);
      return `${p.x},${p.y}`;
    }).join(' ');

  // Representative side: bottom edge (first two vertices, assumed to be base)
  const smallBot = { x: smallOriginX + smallW / 2, y: smallOriginY + 18 };
  const largeBot = { x: largeOriginX + largeW / 2, y: largeOriginY + 18 };

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width: '100%', maxWidth: '500px' }}>
      {/* Small shape */}
      <polygon points={pts(smallOriginX, smallOriginY, unit)}
        fill="#dbeafe" stroke="#2563eb" strokeWidth="1.8" strokeLinejoin="round" />

      {/* Large shape */}
      <polygon points={pts(largeOriginX, largeOriginY, unit * sf)}
        fill="#dbeafe" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />

      {/* Labels */}
      {smallLabel !== undefined && (
        <text x={smallBot.x} y={smallBot.y} textAnchor="middle" fontSize="12"
          fill="#1e3a5f" fontWeight="bold" fontFamily={FONT}>{smallLabel}</text>
      )}
      {largeLabel !== undefined && (
        <text x={largeBot.x} y={largeBot.y} textAnchor="middle" fontSize="12"
          fill="#1e3a5f" fontWeight="bold" fontFamily={FONT}>{largeLabel}</text>
      )}
    </svg>
  );
}

// ─── Renderer ─────────────────────────────────────────────────────────────────

// ─── L-Shape (compound area) ───────────────────────────────────────────────

function LShapeDiagram({ outerWidth: W, outerHeight: H, cutWidth: cw, cutHeight: ch }: {
  outerWidth: number; outerHeight: number; cutWidth: number; cutHeight: number;
}) {
  const VW = 320, VH = 240, PAD = 44;
  const scale = Math.min((VW - 2 * PAD) / W, (VH - 2 * PAD) / H);
  const ox = (VW - W * scale) / 2;
  const oy = (VH - H * scale) / 2;
  const X = (v: number) => ox + v * scale;
  const Y = (v: number) => oy + v * scale;
  const FONT = 'ui-sans-serif, system-ui, sans-serif';

  // L-shape: outer rect with top-right corner cut away
  const pts = [
    [0, 0], [W - cw, 0], [W - cw, ch], [W, ch], [W, H], [0, H],
  ].map(([x, y]) => `${X(x)},${Y(y)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width: '100%', maxWidth: '500px' }}>
      {/* L-shape fill */}
      <polygon points={pts} fill="#dbeafe" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />

      {/* Dashed outline of the cut corner — helps student see what was removed */}
      <rect x={X(W - cw)} y={Y(0)} width={cw * scale} height={ch * scale}
        fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5 3" />

      {/* Outer width — bottom edge */}
      <text x={X(W / 2)} y={Y(H) + 20} textAnchor="middle" fontSize="12"
        fill="#1e3a5f" fontWeight="bold" fontFamily={FONT}>{W} m</text>
      {/* Outer height — left edge, rotated */}
      <text x={X(0) - 20} y={Y(H / 2)} textAnchor="middle" fontSize="12"
        fill="#1e3a5f" fontWeight="bold" fontFamily={FONT}
        transform={`rotate(-90, ${X(0) - 20}, ${Y(H / 2)})`}>{H} m</text>
      {/* Cut width — above the notch step */}
      <text x={X(W - cw / 2)} y={Y(0) - 8} textAnchor="middle" fontSize="11"
        fill="#6b7280" fontFamily={FONT}>{cw} m</text>
      {/* Cut height — right of the notch step */}
      <text x={X(W) + 20} y={Y(ch / 2)} textAnchor="middle" fontSize="11"
        fill="#6b7280" fontFamily={FONT}>{ch} m</text>
    </svg>
  );
}

// ─── Rectangle with hole (shaded region) ──────────────────────────────────────

function RectWithHoleDiagram({ outerWidth: OW, outerHeight: OH, innerWidth: IW, innerHeight: IH }: {
  outerWidth: number; outerHeight: number; innerWidth: number; innerHeight: number;
}) {
  const VW = 320, VH = 240, PAD = 44;
  const scale = Math.min((VW - 2 * PAD) / OW, (VH - 2 * PAD) / OH);
  const ox = (VW - OW * scale) / 2;
  const oy = (VH - OH * scale) / 2;
  const X = (v: number) => ox + v * scale;
  const Y = (v: number) => oy + v * scale;
  const FONT = 'ui-sans-serif, system-ui, sans-serif';

  // Centre the hole inside the outer rect
  const hx = (OW - IW) / 2;
  const hy = (OH - IH) / 2;

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width: '100%', maxWidth: '500px' }}>
      {/* Outer rect — shaded blue */}
      <rect x={X(0)} y={Y(0)} width={OW * scale} height={OH * scale}
        fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      {/* Inner rect — white "hole" with dashed border */}
      <rect x={X(hx)} y={Y(hy)} width={IW * scale} height={IH * scale}
        fill="white" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="5 3" />

      {/* Outer dimensions */}
      <text x={X(OW / 2)} y={Y(OH) + 20} textAnchor="middle" fontSize="12"
        fill="#1e3a5f" fontWeight="bold" fontFamily={FONT}>{OW} cm</text>
      <text x={X(0) - 20} y={Y(OH / 2)} textAnchor="middle" fontSize="12"
        fill="#1e3a5f" fontWeight="bold" fontFamily={FONT}
        transform={`rotate(-90, ${X(0) - 20}, ${Y(OH / 2)})`}>{OH} cm</text>
      {/* Inner dimensions — labelled inside the hole */}
      <text x={X(hx + IW / 2)} y={Y(hy + IH / 2) - 6} textAnchor="middle" fontSize="11"
        fill="#374151" fontFamily={FONT}>{IW} cm</text>
      <text x={X(hx + IW / 2)} y={Y(hy + IH / 2) + 9} textAnchor="middle" fontSize="11"
        fill="#374151" fontFamily={FONT}>{IH} cm</text>
    </svg>
  );
}

// ─── Rhombus ─────────────────────────────────────────────────────────────────

function RhombusDiagram() {
  // A non-square rhombus: wider than tall, all four sides equal
  const VW = 220, VH = 180;
  const pts = `110,18 202,90 110,162 18,90`;
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label="Rhombus">
      <polygon points={pts} fill="#FFF7ED" stroke="#F97316" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Kite ────────────────────────────────────────────────────────────────────

function KiteDiagram() {
  // A kite: top vertex (narrow), two side vertices (middle), bottom vertex (pointed tail)
  // Axis of symmetry runs top-to-bottom; top triangle is shorter than bottom
  const VW = 200, VH = 200;
  const pts = `100,15 165,75 100,185 35,75`;
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ maxWidth: '500px' }}
      aria-label="Kite">
      <polygon points={pts} fill="#FFF7ED" stroke="#F97316" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

export function DiagramRenderer({ spec }: { spec: DiagramSpec }) {
  switch (spec.type) {
    case 'circle':
      return <CircleDiagram radius={spec.radius} showRadius={spec.showRadius} showDiameter={spec.showDiameter} />;
    case 'triangle':
      return <TriangleDiagram angles={spec.angles} showExterior={spec.showExterior} unknownIndex={spec.unknownIndex} unknownIndices={spec.unknownIndices} />;
    case 'rectangle':
      return <RectangleDiagram width={spec.width} height={spec.height} labelDimensions={spec.labelDimensions} unknownDimension={spec.unknownDimension} widthLabel={spec.widthLabel} heightLabel={spec.heightLabel} />;
    case 'triangle-perimeter':
      return <TrianglePerimeterDiagram sides={spec.sides} />;
    case 'triangle-area':
      return <TriangleAreaDiagram base={spec.base} height={spec.height} />;
    case 'parallelogram':
      return <ParallelogramDiagram base={spec.base} height={spec.height} />;
    case 'trapezoid':
      return <TrapezoidDiagram topBase={spec.topBase} bottomBase={spec.bottomBase} height={spec.height} />;
    case 'right-triangle':
      return <RightTriangleDiagram legs={spec.legs} hypotenuse={spec.hypotenuse} unknown={spec.unknown} />;
    case 'rectangle-diagonal':
      return <RectangleDiagonalDiagram width={spec.width} height={spec.height} />;
    case 'regular-polygon':
      return <RegularPolygonDiagram sides={spec.sides} angleLabel={spec.angleLabel} showExterior={spec.showExterior} />;
    case 'quadrilateral-angles':
      return <QuadrilateralAnglesDiagram angles={spec.angles} unknownIndex={spec.unknownIndex} />;
    case 'angle':
      return <AngleDiagram degrees={spec.degrees} />;
    case 'linear-pair':
      return <LinearPairDiagram knownAngle={spec.knownAngle} />;
    case 'crossing-lines':
      return <CrossingLinesDiagram knownAngle={spec.knownAngle} />;
    case 'complementary-pair':
      return <ComplementaryPairDiagram knownAngle={spec.knownAngle} />;
    case 'angles-around-point':
      return <AnglesAroundPointDiagram angles={spec.angles} unknownIndex={spec.unknownIndex} />;
    case 'parallel-lines':
      return <ParallelLinesDiagram knownAngle={spec.knownAngle} highlight={spec.highlight} />;
    case 'coordinate-grid':
      return <CoordinateGridDiagram points={spec.points} segments={spec.segments} highlightLine={spec.highlightLine} />;
    case 'cuboid':
      return <CuboidDiagram length={spec.length} width={spec.width} height={spec.height} unknownDimension={spec.unknownDimension} lengthLabel={spec.lengthLabel} widthLabel={spec.widthLabel} heightLabel={spec.heightLabel} />;
    case 'cylinder-3d':
      return <Cylinder3DDiagram radius={spec.radius} height={spec.height} unknownDimension={spec.unknownDimension} radiusLabel={spec.radiusLabel} heightLabel={spec.heightLabel} />;
    case 'triangular-prism':
      return <TriangularPrismDiagram triangleBase={spec.triangleBase} triangleHeight={spec.triangleHeight} apexOffset={spec.apexOffset} length={spec.length} sides={spec.sides} />;
    case 'similar-pair':
      return <SimilarPairDiagram vertices={spec.vertices} scaleFactor={spec.scaleFactor} smallLabel={spec.smallLabel} largeLabel={spec.largeLabel} />;
    case 'l-shape':
      return <LShapeDiagram outerWidth={spec.outerWidth} outerHeight={spec.outerHeight} cutWidth={spec.cutWidth} cutHeight={spec.cutHeight} />;
    case 'rect-with-hole':
      return <RectWithHoleDiagram outerWidth={spec.outerWidth} outerHeight={spec.outerHeight} innerWidth={spec.innerWidth} innerHeight={spec.innerHeight} />;
    case 'rhombus':
      return <RhombusDiagram />;
    case 'kite':
      return <KiteDiagram />;
    default:
      return null;
  }
}
