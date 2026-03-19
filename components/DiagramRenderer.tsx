import type { DiagramSpec } from '@/lib/problems/types';

// ─── Circle ──────────────────────────────────────────────────────────────────

function CircleDiagram({ radius, showRadius }: { radius: number; showRadius: boolean }) {
  const cx = 140;
  const cy = 145;
  const svgR = 100; // fixed display radius — actual value shown via label
  const radiusEndX = cx + svgR;

  return (
    <svg
      viewBox="0 0 280 290"
      width="280"
      height="290"
      aria-label={`Circle with radius ${radius} cm`}
    >
      {/* Circle fill */}
      <circle cx={cx} cy={cy} r={svgR} fill="#F0FDF4" stroke="#16A34A" strokeWidth="2.5" />

      {showRadius && (
        <>
          {/* Radius line */}
          <line
            x1={cx} y1={cy}
            x2={radiusEndX} y2={cy}
            stroke="#16A34A"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          {/* Center dot */}
          <circle cx={cx} cy={cy} r="4" fill="#16A34A" />
          {/* Radius label */}
          <text
            x={(cx + radiusEndX) / 2}
            y={cy - 12}
            fontSize="15"
            fill="#14532D"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            textAnchor="middle"
            fontWeight="700"
          >
            r = {radius} cm
          </text>
        </>
      )}
    </svg>
  );
}

// ─── Renderer ─────────────────────────────────────────────────────────────────

export function DiagramRenderer({ spec }: { spec: DiagramSpec }) {
  switch (spec.type) {
    case 'circle':
      return <CircleDiagram radius={spec.radius} showRadius={spec.showRadius} />;
    default:
      return null;
  }
}
