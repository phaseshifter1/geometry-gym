import type { Rng } from '../rng';
import type { QuestionFactory } from '../types';

// The Track: Coordinates & Transformations
// Covers: 5.G.A.1, 5.G.A.2, 6.NS.C.6, 8.G.A.1, 8.G.A.3

function dedup(
  correct: string,
  ds: [string, string, string]
): [string, string, string] {
  const seen = new Set([correct]);
  return ds.map((d) => {
    if (!seen.has(d)) { seen.add(d); return d; }
    return d + '*';
  }) as [string, string, string];
}

// ─── Coordinate Plane ─────────────────────────────────────────────────────────

const coordinatePlaneQuestions: QuestionFactory[] = [
  () => ({
    id: 'coordinate-pair-order',
    question: 'In the coordinate pair (x, y), which value do you plot first?',
    correctAnswer: 'x — move horizontally along the x-axis first',
    distractors: [
      'y — move vertically up or down first',
      'Either — the order does not matter',
      'The larger number always goes first',
    ],
    explanation:
      'Always go across first (x), then up or down (y). A memory trick: "Walk before you climb" — horizontal, then vertical.',
    difficulty: 'warm-up',
    standard: '5.G.A.1',
  }),

  () => ({
    id: 'origin-def',
    question: 'The origin on a coordinate plane is the point ___.',
    correctAnswer: '(0, 0) — where the x-axis and y-axis cross',
    distractors: [
      '(1, 1) — the first positive point on the grid',
      '(0, 1) — one unit above the x-axis',
      'The point at the top-right corner of the grid',
    ],
    explanation:
      'The origin is at (0, 0), the intersection of the x-axis and y-axis. It is the starting reference point for all coordinates.',
    difficulty: 'warm-up',
    standard: '5.G.A.1',
  }),

  () => ({
    id: 'quadrant-one',
    question: 'A point in Quadrant I has ___.',
    correctAnswer: 'Both x and y positive (x > 0 and y > 0)',
    distractors: [
      'x negative, y positive',
      'Both x and y negative',
      'x positive, y negative',
    ],
    explanation:
      'Quadrant I is the top-right section. Both coordinates are positive. Moving counter-clockwise: Q I (+,+), Q II (−,+), Q III (−,−), Q IV (+,−).',
    difficulty: 'warm-up',
    standard: '6.NS.C.6',
  }),

  () => ({
    id: 'quadrant-two',
    question: 'A point with a negative x-value and a positive y-value is in Quadrant ___.',
    correctAnswer: 'II',
    distractors: ['I', 'III', 'IV'],
    explanation:
      'Quadrant II is the top-left section: x is negative (left of origin), y is positive (above origin).',
    difficulty: 'main-set',
    standard: '6.NS.C.6',
  }),

  () => ({
    id: 'quadrant-three',
    question: 'A point in Quadrant III has ___.',
    correctAnswer: 'Both x and y negative (x < 0 and y < 0)',
    distractors: [
      'x negative, y positive',
      'Both x and y positive',
      'x positive, y negative',
    ],
    explanation:
      'Quadrant III is the bottom-left. Both x and y are negative — below and to the left of the origin.',
    difficulty: 'main-set',
    standard: '6.NS.C.6',
  }),

  () => ({
    id: 'x-axis-def',
    question: 'The x-axis is ___.',
    correctAnswer: 'The horizontal number line on a coordinate plane',
    distractors: [
      'The vertical number line',
      'The diagonal line through the origin',
      'The line y = x',
    ],
    explanation:
      'The x-axis runs left-right (horizontally). The y-axis runs up-down (vertically). They intersect at the origin.',
    difficulty: 'warm-up',
    standard: '5.G.A.1',
  }),

  () => ({
    id: 'point-on-axis',
    question: 'A point at (0, 5) lies ___.',
    correctAnswer: 'On the y-axis, 5 units above the origin',
    distractors: [
      'On the x-axis, 5 units to the right of the origin',
      'In Quadrant I',
      'At the origin',
    ],
    explanation:
      'When x = 0, the point is on the y-axis. The y-value of 5 tells us it is 5 units above the origin.',
    difficulty: 'main-set',
    standard: '5.G.A.1',
  }),

  () => ({
    id: 'distance-horizontal',
    question: 'Two points share the same y-value. The easiest way to find the distance between them is ___.',
    correctAnswer: 'Subtract the smaller x from the larger x',
    distractors: [
      'Add both x-values together',
      'Use the Pythagorean theorem',
      'Subtract both y-values',
    ],
    explanation:
      'Points on the same horizontal line differ only in their x-values. Distance = |x₂ − x₁|.',
    difficulty: 'main-set',
    standard: '6.NS.C.6',
  }),
];

// ─── Transformations ──────────────────────────────────────────────────────────

const transformationsQuestions: QuestionFactory[] = [
  () => ({
    id: 'translation-def',
    question: 'A translation in geometry is ___.',
    correctAnswer: 'Sliding a shape to a new position without rotating or flipping it',
    distractors: [
      'Flipping a shape over a line',
      'Turning a shape around a fixed point',
      'Stretching a shape to make it bigger',
    ],
    explanation:
      "A translation slides every point of a shape the same distance in the same direction. The shape's size and orientation stay the same.",
    difficulty: 'warm-up',
    standard: '8.G.A.1',
  }),

  () => ({
    id: 'reflection-def',
    question: 'A reflection in geometry is ___.',
    correctAnswer: 'Flipping a shape over a line of reflection (mirror line)',
    distractors: [
      'Sliding a shape to a new position',
      'Turning a shape around a fixed point',
      'Enlarging a shape by a scale factor',
    ],
    explanation:
      'A reflection creates a mirror image. Every point flips to the opposite side of the reflection line, the same distance away.',
    difficulty: 'warm-up',
    standard: '8.G.A.1',
  }),

  () => ({
    id: 'rotation-def',
    question: 'A rotation in geometry is ___.',
    correctAnswer: 'Turning a shape around a fixed point by a given angle',
    distractors: [
      'Sliding a shape to a new position',
      'Flipping a shape over a line',
      'Scaling a shape up or down',
    ],
    explanation:
      "A rotation turns every point of a shape around a center point (the pivot) by the same angle. The shape's size stays the same.",
    difficulty: 'warm-up',
    standard: '8.G.A.1',
  }),

  () => ({
    id: 'rigid-transformation-def',
    question: 'A rigid transformation (isometry) is one that ___.',
    correctAnswer: 'Preserves the shape and size — only the position or orientation changes',
    distractors: [
      'Changes the size but not the shape',
      'Changes both the size and the shape',
      'Only works on triangles',
    ],
    explanation:
      'Translations, reflections, and rotations are all rigid (isometric) — they move shapes without changing their dimensions. Dilation (scaling) is not rigid.',
    difficulty: 'main-set',
    standard: '8.G.A.1',
  }),

  () => ({
    id: 'translation-coordinates',
    question: 'Translating point (3, 4) by 2 units right and 3 units down gives ___.',
    correctAnswer: '(5, 1)',
    distractors: ['(1, 7)', '(5, 7)', '(1, 1)'],
    explanation:
      'Right means +2 to x: 3 + 2 = 5. Down means −3 to y: 4 − 3 = 1. New point: (5, 1).',
    difficulty: 'main-set',
    standard: '8.G.A.3',
    diagram: {
      type: 'coordinate-grid' as const,
      points: [{ x: 3, y: 4, color: 'blue' as const }],
    },
  }),

  () => ({
    id: 'reflection-over-x-axis',
    question: 'Reflecting point (4, −3) over the x-axis gives ___.',
    correctAnswer: '(4, 3)',
    distractors: ['(−4, −3)', '(−4, 3)', '(4, −3)'],
    explanation:
      'Reflecting over the x-axis flips the y-value: (x, y) → (x, −y). So (4, −3) → (4, 3).',
    difficulty: 'main-set',
    standard: '8.G.A.3',
    diagram: {
      type: 'coordinate-grid' as const,
      points: [{ x: 4, y: -3, color: 'blue' as const }],
      highlightLine: 'x-axis' as const,
    },
  }),

  () => ({
    id: 'reflection-over-y-axis',
    question: 'Reflecting point (−2, 5) over the y-axis gives ___.',
    correctAnswer: '(2, 5)',
    distractors: ['(−2, −5)', '(2, −5)', '(−2, 5)'],
    explanation:
      'Reflecting over the y-axis flips the x-value: (x, y) → (−x, y). So (−2, 5) → (2, 5).',
    difficulty: 'main-set',
    standard: '8.G.A.3',
    diagram: {
      type: 'coordinate-grid' as const,
      points: [{ x: -2, y: 5, color: 'blue' as const }],
      highlightLine: 'y-axis' as const,
    },
  }),
];

// ─── Parameterized questions ───────────────────────────────────────────────────

// Small Pythagorean triples for the distance-on-grid factory
const SMALL_TRIPLES: [number, number, number][] = [
  [3, 4, 5], [6, 8, 10], [5, 12, 13],
];

const parameterizedQuestions: QuestionFactory[] = [
  // Identify quadrant
  (rng: Rng) => {
    const quadrants: [string, string, string, string] = ['I', 'II', 'III', 'IV'];
    const signs: [number, number][] = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
    const qi = rng.intBetween(0, 3);
    const [sx, sy] = signs[qi];
    const x = sx * rng.intBetween(1, 9);
    const y = sy * rng.intBetween(1, 9);
    const correct = `Quadrant ${quadrants[qi]}`;
    const others = quadrants.filter((_, i) => i !== qi).map(q => `Quadrant ${q}`) as [string, string, string];
    return {
      id: 'identify-quadrant',
      question: `In which quadrant does the point (${x}, ${y}) lie?`,
      correctAnswer: correct,
      distractors: dedup(correct, others),
      explanation: `x = ${x} (${x > 0 ? 'positive → right' : 'negative → left'}), y = ${y} (${y > 0 ? 'positive → up' : 'negative → down'}). That puts it in Quadrant ${quadrants[qi]}.`,
      difficulty: 'warm-up',
      standard: '6.NS.C.6',
      diagram: { type: 'coordinate-grid' as const, points: [{ x, y, label: `(${x},${y})`, color: 'blue' as const }] },
    };
  },

  // Translation calculation
  (rng: Rng) => {
    const x = rng.intBetween(-6, 6);
    const y = rng.intBetween(-6, 6);
    const dx = rng.intBetween(-5, 5);
    const dy = rng.intBetween(-5, 5);
    const nx = x + dx;
    const ny = y + dy;
    const dirX = (d: number) => d >= 0 ? `${d} right` : `${Math.abs(d)} left`;
    const dirY = (d: number) => d >= 0 ? `${d} up` : `${Math.abs(d)} down`;
    const stem = rng.pick([
      `Point (${x}, ${y}) is translated ${dirX(dx)} and ${dirY(dy)}. What are the new coordinates?`,
      `A point at (${x}, ${y}) moves ${dirX(dx)} and ${dirY(dy)}. Where does it end up?`,
      `Translate (${x}, ${y}) by (${dx}, ${dy}). What are the new coordinates?`,
    ]);
    return {
      id: 'translation-calc',
      question: stem,
      correctAnswer: `(${nx}, ${ny})`,
      distractors: dedup(`(${nx}, ${ny})`, [
        `(${nx + 1}, ${ny})`,
        `(${nx}, ${ny + 1})`,
        `(${x - dx}, ${y - dy})`,
      ]),
      explanation: `New x = ${x} + (${dx}) = ${nx}. New y = ${y} + (${dy}) = ${ny}. Result: (${nx}, ${ny}).`,
      difficulty: 'main-set',
      standard: '8.G.A.3',
      diagram: {
        type: 'coordinate-grid' as const,
        points: [{ x, y, color: 'blue' as const }],
      },
    };
  },

  // Distance between points on same row/column
  (rng: Rng) => {
    const axis = rng.pick(['x', 'y'] as const);
    const fixed = rng.intBetween(-5, 5);
    const a = rng.intBetween(-7, 2);
    const b = rng.intBetween(a + 2, a + 10);
    const dist = b - a;
    const p1 = axis === 'x' ? `(${a}, ${fixed})` : `(${fixed}, ${a})`;
    const p2 = axis === 'x' ? `(${b}, ${fixed})` : `(${fixed}, ${b})`;
    return {
      id: 'distance-same-axis',
      question: `What is the distance between points ${p1} and ${p2}?`,
      correctAnswer: `${dist} units`,
      distractors: dedup(`${dist} units`, [
        `${dist + 2} units`,
        `${Math.abs(a + b)} units`,
        `${dist - 1 < 0 ? dist + 3 : dist - 1} units`,
      ]),
      explanation: `The points share the same ${axis === 'x' ? 'y' : 'x'}-value, so distance = |${b} − (${a})| = ${dist} units.`,
      difficulty: 'main-set',
      standard: '6.NS.C.6',
      diagram: (() => {
        const [px1, py1, px2, py2] = axis === 'x' ? [a, fixed, b, fixed] : [fixed, a, fixed, b];
        return {
          type: 'coordinate-grid' as const,
          points: [
            { x: px1, y: py1, label: `(${px1},${py1})`, color: 'blue' as const },
            { x: px2, y: py2, label: `(${px2},${py2})`, color: 'blue' as const },
          ],
          segments: [{ x1: px1, y1: py1, x2: px2, y2: py2 }],
        };
      })(),
    };
  },

  // Reflection over x-axis (parameterized)
  (rng: Rng) => {
    const x = rng.intBetween(-7, 7);
    const ySign = rng.pick([-1, 1]);
    const y = ySign * rng.intBetween(1, 7); // nonzero y
    const ny = -y;
    const stem = rng.pick([
      `Point (${x}, ${y}) is reflected over the x-axis. What are the new coordinates?`,
      `Reflect (${x}, ${y}) over the x-axis. Where is the image point?`,
      `What is the image of (${x}, ${y}) after a reflection over the x-axis?`,
    ]);
    return {
      id: 'reflection-x-calc',
      question: stem,
      correctAnswer: `(${x}, ${ny})`,
      distractors: dedup(`(${x}, ${ny})`, [
        `(${-x}, ${y})`,
        `(${-x}, ${ny})`,
        `(${x}, ${y})`,
      ]),
      explanation: `Reflecting over the x-axis: (x, y) → (x, −y). So (${x}, ${y}) → (${x}, ${ny}).`,
      difficulty: 'main-set',
      standard: '8.G.A.3',
      diagram: {
        type: 'coordinate-grid' as const,
        points: [{ x, y, color: 'blue' as const }],
        highlightLine: 'x-axis' as const,
      },
    };
  },

  // Reflection over y-axis (parameterized)
  (rng: Rng) => {
    const xSign = rng.pick([-1, 1]);
    const x = xSign * rng.intBetween(1, 7); // nonzero x
    const y = rng.intBetween(-7, 7);
    const nx = -x;
    const stem = rng.pick([
      `Point (${x}, ${y}) is reflected over the y-axis. What are the new coordinates?`,
      `Reflect (${x}, ${y}) over the y-axis. Where is the image point?`,
      `What is the image of (${x}, ${y}) after a reflection over the y-axis?`,
    ]);
    return {
      id: 'reflection-y-calc',
      question: stem,
      correctAnswer: `(${nx}, ${y})`,
      distractors: dedup(`(${nx}, ${y})`, [
        `(${x}, ${-y})`,
        `(${nx}, ${-y})`,
        `(${x}, ${y})`,
      ]),
      explanation: `Reflecting over the y-axis: (x, y) → (−x, y). So (${x}, ${y}) → (${nx}, ${y}).`,
      difficulty: 'main-set',
      standard: '8.G.A.3',
      diagram: {
        type: 'coordinate-grid' as const,
        points: [{ x, y, color: 'blue' as const }],
        highlightLine: 'y-axis' as const,
      },
    };
  },

  // Rotation 180° about the origin
  (rng: Rng) => {
    const xSign = rng.pick([-1, 1]);
    const ySign = rng.pick([-1, 1]);
    const x = xSign * rng.intBetween(1, 7);
    const y = ySign * rng.intBetween(1, 7);
    return {
      id: 'rotation-180-calc',
      question: `Point (${x}, ${y}) is rotated 180° about the origin. What are the new coordinates?`,
      correctAnswer: `(${-x}, ${-y})`,
      distractors: dedup(`(${-x}, ${-y})`, [
        `(${y}, ${-x})`,
        `(${-y}, ${x})`,
        `(${x}, ${-y})`,
      ]),
      explanation: `A 180° rotation maps (x, y) → (−x, −y). So (${x}, ${y}) → (${-x}, ${-y}).`,
      difficulty: 'main-set',
      standard: '8.G.A.3',
      diagram: {
        type: 'coordinate-grid' as const,
        points: [{ x, y, color: 'blue' as const }],
      },
    };
  },

  // Rotation 90° clockwise about the origin
  (rng: Rng) => {
    const xSign = rng.pick([-1, 1]);
    const ySign = rng.pick([-1, 1]);
    const x = xSign * rng.intBetween(1, 6);
    const y = ySign * rng.intBetween(1, 6);
    const nx = y;   // 90° CW: (x, y) → (y, −x)
    const ny = -x;
    return {
      id: 'rotation-90cw-calc',
      question: `Point (${x}, ${y}) is rotated 90° clockwise about the origin. What are the new coordinates?`,
      correctAnswer: `(${nx}, ${ny})`,
      distractors: dedup(`(${nx}, ${ny})`, [
        `(${-y}, ${x})`,
        `(${-x}, ${-y})`,
        `(${-nx}, ${-ny})`,
      ]),
      explanation: `A 90° clockwise rotation maps (x, y) → (y, −x). So (${x}, ${y}) → (${nx}, ${ny}).`,
      difficulty: 'max-out',
      standard: '8.G.A.3',
      diagram: {
        type: 'coordinate-grid' as const,
        points: [{ x, y, color: 'blue' as const }],
      },
    };
  },

  // Midpoint of two points
  (rng: Rng) => {
    const x1 = rng.intBetween(-4, 4) * 2; // even → integer midpoint
    const x2 = rng.intBetween(-4, 4) * 2;
    const y1 = rng.intBetween(-4, 4) * 2;
    const y2 = rng.intBetween(-4, 4) * 2;
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    return {
      id: 'midpoint-calc',
      question: `What is the midpoint of the segment joining (${x1}, ${y1}) and (${x2}, ${y2})?`,
      correctAnswer: `(${mx}, ${my})`,
      distractors: dedup(`(${mx}, ${my})`, [
        `(${x1 + x2}, ${y1 + y2})`,
        `(${mx + 1}, ${my})`,
        `(${mx}, ${my + 1})`,
      ]),
      explanation: `Midpoint = ((${x1}+${x2})/2, (${y1}+${y2})/2) = (${x1 + x2}/2, ${y1 + y2}/2) = (${mx}, ${my}).`,
      difficulty: 'main-set',
      standard: '6.NS.C.6',
      diagram: {
        type: 'coordinate-grid' as const,
        points: [
          { x: x1, y: y1, label: `(${x1},${y1})`, color: 'blue' as const },
          { x: x2, y: y2, label: `(${x2},${y2})`, color: 'blue' as const },
        ],
        segments: [{ x1, y1, x2, y2 }],
      },
    };
  },

  // Identify which axis a point lies on
  (rng: Rng) => {
    const onYAxis = rng.pick([true, false]);
    const val = rng.pick([-8, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8]);
    const pt = onYAxis ? `(0, ${val})` : `(${val}, 0)`;
    const correct = onYAxis ? 'On the y-axis' : 'On the x-axis';
    const dist = Math.abs(val);
    const dir = onYAxis ? (val > 0 ? 'above' : 'below') : (val > 0 ? 'right of' : 'left of');
    return {
      id: 'point-on-axis-calc',
      question: `The point ${pt} lies ___?`,
      correctAnswer: `${correct}, ${dist} units ${dir} the origin`,
      distractors: dedup(`${correct}, ${dist} units ${dir} the origin`, [
        onYAxis ? `On the x-axis, ${dist} units right of the origin` : `On the y-axis, ${dist} units above the origin`,
        'At the origin (0, 0)',
        `In Quadrant ${onYAxis && val > 0 ? 'I' : onYAxis && val < 0 ? 'III' : val > 0 ? 'IV' : 'II'}`,
      ]),
      explanation: `When one coordinate is 0, the point is on an axis. x = 0 → y-axis; y = 0 → x-axis. The point ${pt} is on the ${onYAxis ? 'y' : 'x'}-axis.`,
      difficulty: 'main-set',
      standard: '5.G.A.1',
      diagram: {
        type: 'coordinate-grid' as const,
        points: [{ x: onYAxis ? 0 : val, y: onYAxis ? val : 0, label: `(${onYAxis ? 0 : val},${onYAxis ? val : 0})`, color: 'blue' as const }],
      },
    };
  },

  // Distance between two points using Pythagorean triple
  (rng: Rng) => {
    const [a, b, c] = rng.pick(SMALL_TRIPLES);
    const x1 = rng.intBetween(-3, 3);
    const y1 = rng.intBetween(-3, 3);
    const sx = rng.pick([-1, 1]);
    const sy = rng.pick([-1, 1]);
    const x2 = x1 + sx * a;
    const y2 = y1 + sy * b;
    return {
      id: 'distance-pythagorean',
      question: `What is the distance between points (${x1}, ${y1}) and (${x2}, ${y2})?`,
      correctAnswer: `${c} units`,
      distractors: dedup(`${c} units`, [
        `${a + b} units`,
        `${c + 2} units`,
        `${Math.round(Math.sqrt(a * a + b * b + 4))} units`,
      ]),
      explanation: `Horizontal distance = |${x2} − ${x1}| = ${a}. Vertical distance = |${y2} − ${y1}| = ${b}. Distance = √(${a}² + ${b}²) = √${a * a + b * b} = ${c} units.`,
      difficulty: 'max-out',
      standard: '8.G.B.8',
      diagram: {
        type: 'coordinate-grid' as const,
        points: [
          { x: x1, y: y1, label: `(${x1},${y1})`, color: 'blue' as const },
          { x: x2, y: y2, label: `(${x2},${y2})`, color: 'blue' as const },
        ],
        segments: [
          { x1, y1, x2, y2 },
          { x1, y1, x2, y2: y1, dashed: true },
          { x1: x2, y1, x2, y2, dashed: true },
        ],
      },
    };
  },

  // Reflection over the line y = x
  (rng: Rng) => {
    const xSign = rng.pick([-1, 1]);
    const ySign = rng.pick([-1, 1]);
    const x = xSign * rng.intBetween(1, 7);
    const y = ySign * rng.intBetween(1, 7);
    return {
      id: 'reflection-y-equals-x',
      question: `Point (${x}, ${y}) is reflected over the line y = x. What are the new coordinates?`,
      correctAnswer: `(${y}, ${x})`,
      distractors: dedup(`(${y}, ${x})`, [
        `(${-x}, ${-y})`,
        `(${-y}, ${x})`,
        `(${x}, ${-y})`,
      ]),
      explanation: `Reflecting over y = x swaps the coordinates: (x, y) → (y, x). So (${x}, ${y}) → (${y}, ${x}).`,
      difficulty: 'max-out',
      standard: '8.G.A.3',
      diagram: {
        type: 'coordinate-grid' as const,
        points: [{ x, y, color: 'blue' as const }],
        highlightLine: 'y=x' as const,
      },
    };
  },
];

export const coordinatesQuestions: QuestionFactory[] = [
  ...coordinatePlaneQuestions,
  ...transformationsQuestions,
  ...parameterizedQuestions,
];
