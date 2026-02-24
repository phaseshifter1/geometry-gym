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
      'A translation slides every point of a shape the same distance in the same direction. The shape\'s size and orientation stay the same.',
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
      'A rotation turns every point of a shape around a center point (the pivot) by the same angle. The shape\'s size stays the same.',
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
  }),
];

// ─── Parameterized questions ───────────────────────────────────────────────────

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
    };
  },

  // Translation calculation
  (rng: Rng) => {
    const x = rng.intBetween(-5, 5);
    const y = rng.intBetween(-5, 5);
    const dx = rng.intBetween(-4, 4);
    const dy = rng.intBetween(-4, 4);
    const nx = x + dx;
    const ny = y + dy;
    const dir = (d: number) => d >= 0 ? `${d} right` : `${Math.abs(d)} left`;
    const dirY = (d: number) => d >= 0 ? `${d} up` : `${Math.abs(d)} down`;
    return {
      id: 'translation-calc',
      question: `Point (${x}, ${y}) is translated ${dir(dx)} and ${dirY(dy)}. What are the new coordinates?`,
      correctAnswer: `(${nx}, ${ny})`,
      distractors: dedup(`(${nx}, ${ny})`, [
        `(${nx + 1}, ${ny})`,
        `(${nx}, ${ny + 1})`,
        `(${x - dx}, ${y - dy})`,
      ]),
      explanation: `New x = ${x} + (${dx}) = ${nx}. New y = ${y} + (${dy}) = ${ny}. Result: (${nx}, ${ny}).`,
      difficulty: 'main-set',
      standard: '8.G.A.3',
    };
  },

  // Distance between points on same row/column
  (rng: Rng) => {
    const axis = rng.pick(['x', 'y'] as const);
    const fixed = rng.intBetween(-4, 4);
    const a = rng.intBetween(-6, 2);
    const b = rng.intBetween(a + 2, a + 8);
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
        `${dist - 1} units`,
      ]),
      explanation: `The points share the same ${axis === 'x' ? 'y' : 'x'}-value, so distance = |${b} − (${a})| = ${dist} units.`,
      difficulty: 'main-set',
      standard: '6.NS.C.6',
    };
  },
];

export const coordinatesQuestions: QuestionFactory[] = [
  ...coordinatePlaneQuestions,
  ...transformationsQuestions,
  ...parameterizedQuestions,
];
