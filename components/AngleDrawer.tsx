'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

const SIZE = 400;           // SVG canvas size (viewBox units)
const CX = SIZE / 2;        // vertex x
const CY = SIZE / 2 + 20;   // vertex y (slightly below centre — gives room for arc label)
const RAY_LEN = 155;        // length of each ray
const HANDLE_R = 18;        // draggable handle radius
const TOLERANCE = 5;        // ±degrees for correct

function polarToCart(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}

function cartToDeg(cx: number, cy: number, px: number, py: number): number {
  const rad = Math.atan2(cy - py, px - cx);
  const deg = (rad * 180) / Math.PI;
  return Math.round(((deg % 360) + 360) % 360);
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const start = polarToCart(cx, cy, r, startDeg);
  const end = polarToCart(cx, cy, r, endDeg);
  const diff = ((endDeg - startDeg) + 360) % 360;
  const largeArc = diff > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

interface AngleDrawerProps {
  targetDegrees: number;
  onSubmit: (correct: boolean, drawnDegrees: number) => void;
  answered: boolean;
  correct: boolean | null;
}

export function AngleDrawer({ targetDegrees, onSubmit, answered, correct }: AngleDrawerProps) {
  // Draggable ray starts at 60° (gives a visible starting angle to drag from)
  const [angleDeg, setAngleDeg] = useState(60);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  const updateAngle = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = SIZE / rect.width;
    const scaleY = SIZE / rect.height;
    const px = (clientX - rect.left) * scaleX;
    const py = (clientY - rect.top) * scaleY;
    const deg = cartToDeg(CX, CY, px, py);
    // Clamp: keep angle between 1° and 358° (prevent 0° — looks like base ray)
    setAngleDeg(Math.max(1, Math.min(358, deg)));
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (answered) return;
    dragging.current = true;
    updateAngle(e.clientX, e.clientY);
  }, [answered, updateAngle]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (answered) return;
    dragging.current = true;
    updateAngle(e.touches[0].clientX, e.touches[0].clientY);
  }, [answered, updateAngle]);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragging.current) return;
      updateAngle(e.clientX, e.clientY);
    }
    function onTouchMove(e: TouchEvent) {
      if (!dragging.current) return;
      e.preventDefault();
      updateAngle(e.touches[0].clientX, e.touches[0].clientY);
    }
    function onUp() { dragging.current = false; }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [updateAngle]);

  function handleReset() {
    if (answered) return;
    setAngleDeg(60);
  }

  function handleSubmit() {
    if (answered) return;
    const diff = Math.abs(angleDeg - targetDegrees);
    const isCorrect = diff <= TOLERANCE || diff >= (360 - TOLERANCE);
    onSubmit(isCorrect, angleDeg);
  }

  // Fixed base ray at 0° (pointing right)
  const baseEnd = polarToCart(CX, CY, RAY_LEN, 0);
  // Draggable ray
  const moveEnd = polarToCart(CX, CY, RAY_LEN, angleDeg);
  // Handle sits at 90% of ray length
  const handle = polarToCart(CX, CY, RAY_LEN * 0.88, angleDeg);
  // Arc label position (midpoint of arc, pushed out)
  const labelAng = angleDeg / 2;
  const labelPos = polarToCart(CX, CY, 52, labelAng);

  // After answer — show target ray
  const targetEnd = polarToCart(CX, CY, RAY_LEN, targetDegrees);

  const arcColor = answered
    ? correct ? '#16a34a' : '#dc2626'
    : '#F97316';

  const handleColor = answered ? '#9ca3af' : '#F97316';

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {/* SVG canvas */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%"
        style={{ maxWidth: '500px' }}
        className="touch-none select-none rounded-xl border border-border bg-surface cursor-crosshair"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* Fixed base ray */}
        <line
          x1={CX} y1={CY}
          x2={baseEnd.x} y2={baseEnd.y}
          stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"
        />

        {/* Arc */}
        <path
          d={arcPath(CX, CY, 36, 0, angleDeg)}
          fill="none"
          stroke={arcColor}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Angle label */}
        <text
          x={labelPos.x} y={labelPos.y}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="13" fontWeight="600"
          fill={arcColor}
        >
          {angleDeg}°
        </text>

        {/* Draggable ray */}
        <line
          x1={CX} y1={CY}
          x2={moveEnd.x} y2={moveEnd.y}
          stroke={answered ? '#9ca3af' : '#1a1a1a'}
          strokeWidth="2.5" strokeLinecap="round"
        />

        {/* Target ray (shown after answer) */}
        {answered && (
          <line
            x1={CX} y1={CY}
            x2={targetEnd.x} y2={targetEnd.y}
            stroke={correct ? '#16a34a' : '#16a34a'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="6 4"
          />
        )}

        {/* Target label (shown after answer, if wrong) */}
        {answered && !correct && (
          <text
            x={polarToCart(CX, CY, RAY_LEN + 14, targetDegrees).x}
            y={polarToCart(CX, CY, RAY_LEN + 14, targetDegrees).y}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="12" fontWeight="600" fill="#16a34a"
          >
            {targetDegrees}°
          </text>
        )}

        {/* Draggable handle */}
        {!answered && (
          <circle
            cx={handle.x} cy={handle.y} r={HANDLE_R}
            fill={handleColor} stroke="white" strokeWidth="2"
            className="cursor-grab active:cursor-grabbing"
          />
        )}

        {/* Vertex dot */}
        <circle cx={CX} cy={CY} r="4" fill="#1a1a1a" />
      </svg>

      {/* Controls */}
      {!answered && (
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-muted hover:text-dark transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
          >
            Lock in {angleDeg}°
          </button>
        </div>
      )}

      {/* Hint text */}
      {!answered && (
        <p className="text-xs text-muted text-center max-w-[240px]">
          Drag the orange handle to set your angle, then lock it in.
        </p>
      )}
    </div>
  );
}
