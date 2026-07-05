import type { Rng } from '../rng';
import type { QuestionFactory } from '../types';
import { SHAPE_OBJECTS, LOCATIONS } from '../scenarios';
import { buildNumericDistractors } from '../distractors';

// Foundations: Points, Lines, Segments, Rays, Planes + Angles
// Covers: 4.G.A.1, 4.MD.C.5, 7.G.B.5, 8.G.A.5

function dedup(
  correct: string,
  ds: readonly string[]
): [string, string, string] {
  return buildNumericDistractors(correct, ds);
}

// ─── Real-world line/ray/segment contexts ────────────────────────────────────

const RAY_CONTEXTS = [
  'a beam of light from a flashlight',
  'a ray of sunlight coming through a window',
  'a laser fired from a point on a wall',
  'an arrow leaving a bow — it starts somewhere and keeps going',
];

const SEGMENT_CONTEXTS = [
  'the edge of a ruler',
  'a side of a triangle drawn on paper',
  'a piece of string stretched tightly between two posts',
  'the painted line between two corners of a parking space',
];

const LINE_CONTEXTS = [
  'a straight road stretching in both directions as far as you can see',
  'train tracks extending to the horizon in both directions',
  'the horizon line on a flat plain — it goes on forever each way',
];

const POINT_CONTEXTS = [
  'the tip of a pencil touching paper',
  'the exact location of a city on a map (just the dot, not the city itself)',
  'where two straight roads cross',
];

// ─── Points, Lines, Segments, Rays ────────────────────────────────────────────

const pointsLinesQuestions: QuestionFactory[] = [

  // Conceptual: point — varied phrasings
  (rng: Rng) => {
    const questions = [
      'In geometry, a point ___.',
      'Which of these best describes a geometric point?',
      `${rng.pick(POINT_CONTEXTS).charAt(0).toUpperCase() + rng.pick(POINT_CONTEXTS).slice(1)} is an example of what geometric idea?`,
    ];
    return {
      id: 'point-def',
      question: rng.pick(questions),
      correctAnswer: 'Has no size — it marks an exact location in space',
      distractors: [
        'Is a tiny dot with a measurable diameter',
        'Is the same as a short line segment',
        'Has length but no width',
      ],
      explanation:
        'A point is an exact location. It has no length, width, or thickness — just a position. We label it with a capital letter (e.g., point A).',
      difficulty: 'warm-up',
      standard: '4.G.A.1',
    };
  },

  // Conceptual: line — varied phrasings
  (rng: Rng) => {
    const ctx = rng.pick(LINE_CONTEXTS);
    const questions = [
      'A line in geometry ___.',
      `Think of ${ctx}. In geometry this is modelled as a ___`,
      'Which of these best describes a geometric line?',
    ];
    return {
      id: 'line-def',
      question: rng.pick(questions),
      correctAnswer: 'Extends forever in both directions with no endpoints',
      distractors: [
        'Has two endpoints and a fixed length',
        'Starts at a point and goes on forever in one direction',
        'Is a curved path between two points',
      ],
      explanation:
        'A line has no endpoints and goes on forever in both directions. We draw arrows on both ends to show this.',
      difficulty: 'warm-up',
      standard: '4.G.A.1',
    };
  },

  // Conceptual: line segment — varied phrasings
  (rng: Rng) => {
    const ctx = rng.pick(SEGMENT_CONTEXTS);
    const questions = [
      'A line segment ___.',
      `${ctx.charAt(0).toUpperCase() + ctx.slice(1)} is an example of a ___`,
      'Which geometric term describes a straight path between two endpoints?',
    ];
    return {
      id: 'segment-def',
      question: rng.pick(questions),
      correctAnswer: 'Has two endpoints and a definite, measurable length',
      distractors: [
        'Extends forever in both directions',
        'Has one endpoint and goes on forever in one direction',
        'Is a curved path between two points',
      ],
      explanation:
        'A line segment is the piece of a line between two endpoints. Unlike a line, it has a fixed length you can measure.',
      difficulty: 'warm-up',
      standard: '4.G.A.1',
    };
  },

  // Conceptual: ray — varied phrasings
  (rng: Rng) => {
    const ctx = rng.pick(RAY_CONTEXTS);
    const questions = [
      'A ray ___.',
      `${ctx.charAt(0).toUpperCase() + ctx.slice(1)} is a good example of a geometric ___`,
      'Which geometric term has exactly one endpoint and extends forever in one direction?',
    ];
    return {
      id: 'ray-def',
      question: rng.pick(questions),
      correctAnswer: 'Has one endpoint and extends forever in one direction',
      distractors: [
        'Has two endpoints',
        'Extends forever in both directions',
        'Is another name for a line segment',
      ],
      explanation:
        'A ray starts at a fixed point (the endpoint) and shoots off forever in one direction — like a ray of sunlight.',
      difficulty: 'warm-up',
      standard: '4.G.A.1',
    };
  },

  // Parameterized: identify the geometric term from a real-world description
  (rng: Rng) => {
    const type = rng.pick(['ray', 'segment', 'line', 'point'] as const);
    const ctx =
      type === 'ray' ? rng.pick(RAY_CONTEXTS)
      : type === 'segment' ? rng.pick(SEGMENT_CONTEXTS)
      : type === 'line' ? rng.pick(LINE_CONTEXTS)
      : rng.pick(POINT_CONTEXTS);
    const correct =
      type === 'ray' ? 'Ray'
      : type === 'segment' ? 'Line segment'
      : type === 'line' ? 'Line'
      : 'Point';
    return {
      id: 'identify-geometric-term',
      question: `Which geometric term best describes this? "${ctx.charAt(0).toUpperCase() + ctx.slice(1)}."`,
      correctAnswer: correct,
      distractors: dedup(correct, ['Ray', 'Line segment', 'Line', 'Point'].filter(l => l !== correct) as [string, string, string]),
      explanation:
        type === 'ray'
          ? 'A ray has one starting point and extends forever in one direction.'
          : type === 'segment'
          ? 'A line segment has two endpoints and a fixed, measurable length.'
          : type === 'line'
          ? 'A line has no endpoints — it extends forever in both directions.'
          : 'A point marks an exact location with no size.',
      difficulty: 'warm-up',
      standard: '4.G.A.1',
    };
  },

  // Conceptual: parallel lines
  (rng: Rng) => {
    const questions = [
      'Two lines are parallel if they ___.',
      `Railroad tracks are a classic example of parallel lines. They are parallel because they ___.`,
      'Which property defines a pair of parallel lines?',
    ];
    return {
      id: 'parallel-lines-def',
      question: rng.pick(questions),
      correctAnswer: 'Never intersect and are always the same distance apart',
      distractors: [
        'Cross each other at a right angle',
        'Meet at exactly one point',
        'Are the same line',
      ],
      explanation:
        'Parallel lines run side by side and never meet, no matter how far they are extended. Railroad tracks are a classic example.',
      difficulty: 'warm-up',
      standard: '4.G.A.1',
    };
  },

  // Conceptual: perpendicular lines
  (rng: Rng) => {
    const questions = [
      'Two lines are perpendicular if they ___.',
      'The corner of a square has sides that are perpendicular. This means they ___.',
      'Which property defines a pair of perpendicular lines?',
    ];
    return {
      id: 'perpendicular-lines-def',
      question: rng.pick(questions),
      correctAnswer: 'Intersect at exactly 90° (a right angle)',
      distractors: [
        'Never intersect',
        'Are always the same distance apart',
        'Intersect at any angle other than 90°',
      ],
      explanation:
        'Perpendicular lines meet at a right angle (90°). The small square symbol at the intersection shows the right angle.',
      difficulty: 'warm-up',
      standard: '4.G.A.1',
    };
  },

  // Conceptual: plane
  () => ({
    id: 'plane-def',
    question: 'A plane in geometry is ___.',
    correctAnswer: 'A flat, two-dimensional surface that extends forever in all directions',
    distractors: [
      'A solid 3D shape with flat faces',
      'A line that curves around a surface',
      'A point in three-dimensional space',
    ],
    explanation:
      'A plane is perfectly flat and infinite — like an endless sheet of paper. It has length and width but no thickness.',
    difficulty: 'main-set',
    standard: '4.G.A.1',
  }),

  // Conceptual: intersecting lines
  () => ({
    id: 'intersecting-lines',
    question: 'When two distinct lines intersect, they meet at ___.',
    correctAnswer: 'Exactly one point',
    distractors: [
      'Two points',
      'Infinitely many points',
      'A line segment',
    ],
    explanation:
      'Two straight lines can only cross at one point. If they share more than one point, they are actually the same line.',
    difficulty: 'main-set',
    standard: '4.G.A.1',
  }),
];

// ─── Angles factories ─────────────────────────────────────────────────────────

const anglesQuestions: QuestionFactory[] = [

  // Conceptual: right angle
  () => ({
    id: 'def-right',
    question: 'An angle measuring exactly 90° is called ___.',
    correctAnswer: 'a right angle',
    distractors: ['an acute angle', 'an obtuse angle', 'a straight angle'],
    explanation:
      'A right angle is exactly 90°. You can spot one by the small square symbol drawn in the corner.',
    difficulty: 'warm-up',
    standard: '4.G.A.1',
  }),

  // Conceptual: straight angle
  () => ({
    id: 'def-straight',
    question: 'An angle measuring exactly 180° looks like ___.',
    correctAnswer: 'a straight line',
    distractors: ['a right angle', 'a full circle', 'an acute angle'],
    explanation:
      'A 180° angle is a straight angle — both rays point in exactly opposite directions, forming a flat line.',
    difficulty: 'warm-up',
    standard: '4.G.A.1',
  }),

  // Conceptual: complementary
  () => ({
    id: 'def-complementary',
    question: 'Complementary angles always add up to ___.',
    correctAnswer: '90°',
    distractors: ['180°', '360°', '45°'],
    explanation:
      'Complementary angles form a right angle together. Tip: "C" comes before "S" — 90 comes before 180.',
    difficulty: 'warm-up',
    standard: '7.G.B.5',
  }),

  // Conceptual: supplementary
  () => ({
    id: 'def-supplementary',
    question: 'Supplementary angles always add up to ___.',
    correctAnswer: '180°',
    distractors: ['90°', '360°', '270°'],
    explanation:
      'Supplementary angles form a straight line (180°) together.',
    difficulty: 'warm-up',
    standard: '7.G.B.5',
  }),

  // Conceptual: triangle angle sum
  () => ({
    id: 'triangle-angle-sum',
    question: 'The three angles inside any triangle always add up to ___.',
    correctAnswer: '180°',
    distractors: ['90°', '270°', '360°'],
    explanation:
      'No matter what triangle — big, small, or skinny — its angles always total exactly 180°.',
    difficulty: 'warm-up',
    standard: '8.G.A.5',
  }),

  // Conceptual: vertical angles
  () => ({
    id: 'vertical-angles-def',
    question:
      'When two straight lines cross, the angles directly across from each other are called vertical angles. They are always ___.',
    correctAnswer: 'equal to each other',
    distractors: ['supplementary', 'complementary', 'right angles'],
    explanation:
      'Vertical angles are always equal. Two lines crossing form an "X" — opposite angles in that X are always the same size.',
    difficulty: 'main-set',
    standard: '7.G.B.5',
  }),

  // Conceptual: full rotation
  () => ({
    id: 'full-rotation',
    question: 'A full rotation all the way around a point equals ___.',
    correctAnswer: '360°',
    distractors: ['180°', '90°', '270°'],
    explanation:
      'One complete turn is 360°. Think of a clock hand making one full trip around the face.',
    difficulty: 'warm-up',
    standard: '4.MD.C.5',
  }),

  // Conceptual: reflex angle
  () => ({
    id: 'reflex-angle-def',
    question: 'An angle greater than 180° but less than 360° is called ___.',
    correctAnswer: 'a reflex angle',
    distractors: ['an obtuse angle', 'a straight angle', 'a complete angle'],
    explanation:
      'A reflex angle is the "long way around" — bigger than a straight line but not a full rotation.',
    difficulty: 'main-set',
    standard: '4.G.A.1',
  }),

  // Conceptual: linear pair
  () => ({
    id: 'linear-pair-def',
    question:
      'Two angles that sit next to each other on a straight line (a linear pair) always add up to ___.',
    correctAnswer: '180°',
    distractors: ['90°', '360°', '270°'],
    explanation:
      'A linear pair sits on a straight line which measures 180°, so the two angles are always supplementary.',
    difficulty: 'main-set',
    standard: '7.G.B.5',
  }),

  // Conceptual: corresponding angles
  () => ({
    id: 'parallel-corresponding',
    question:
      'When a line crosses two parallel lines, the angles in matching positions at each crossing are called corresponding angles. They are ___.',
    correctAnswer: 'always equal',
    distractors: [
      'always supplementary (add up to 180°)',
      'always complementary (add up to 90°)',
      'always right angles',
    ],
    explanation:
      'Corresponding angles sit in matching positions at parallel-line crossings. Because the lines are parallel, these angles are always equal.',
    difficulty: 'max-out',
    standard: '8.G.A.5',
  }),
];

// ─── Parameterized factories ──────────────────────────────────────────────────

const parameterizedQuestions: QuestionFactory[] = [

  // Unified angle classification — all 5 types
  (rng: Rng) => {
    const type = rng.pick(['acute', 'obtuse', 'right', 'straight', 'reflex'] as const);
    let angle: number;
    if (type === 'acute') angle = rng.intBetween(1, 89);
    else if (type === 'obtuse') angle = rng.intBetween(91, 179);
    else if (type === 'right') angle = 90;
    else if (type === 'straight') angle = 180;
    else angle = rng.intBetween(181, 359);

    const correct =
      type === 'acute' ? 'Acute'
      : type === 'obtuse' ? 'Obtuse'
      : type === 'right' ? 'Right'
      : type === 'straight' ? 'Straight'
      : 'Reflex';

    const questions = [
      `An angle measures ${angle}°. What type of angle is it?`,
      `A corner ${rng.pick(LOCATIONS)} measures ${angle}°. How would you classify this angle?`,
    ];

    return {
      id: 'classify-angle',
      question: rng.pick(questions),
      correctAnswer: correct,
      distractors: dedup(correct, ['Acute', 'Obtuse', 'Right', 'Straight', 'Reflex'].filter(l => l !== correct).slice(0, 3) as [string, string, string]),
      explanation:
        type === 'acute' ? `${angle}° is between 0° and 90° — that's an acute angle.`
        : type === 'obtuse' ? `${angle}° is between 90° and 180° — that's an obtuse angle.`
        : type === 'right' ? `Exactly 90° is the definition of a right angle.`
        : type === 'straight' ? `Exactly 180° forms a straight line — that's a straight angle.`
        : `${angle}° is between 180° and 360° — that's a reflex angle.`,
      difficulty: 'warm-up',
      standard: '4.G.A.1',
      diagram: { type: 'angle' as const, degrees: angle },
    };
  },

  // Complementary — find the missing angle
  (rng: Rng) => {
    const a = rng.intBetween(5, 85);
    const correct = 90 - a;
    const questions = [
      `Two angles are complementary. One measures ${a}°. What is the other?`,
      `An angle of ${a}° and another angle together form a right angle. What is the second angle?`,
      `What angle, paired with ${a}°, gives a sum of 90°?`,
    ];
    return {
      id: 'complementary-find',
      question: rng.pick(questions),
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [`${180 - a}°`, `${a}°`, `${90 + a}°`]),
      explanation: `Complementary angles add up to 90°. Missing angle = 90° − ${a}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '7.G.B.5',
      diagram: { type: 'complementary-pair' as const, knownAngle: a },
    };
  },

  // Supplementary — find the missing angle
  (rng: Rng) => {
    const a = rng.intBetween(10, 170);
    const correct = 180 - a;
    const obj = rng.pick(SHAPE_OBJECTS.rectangle);
    const questions = [
      `Two angles are supplementary. One measures ${a}°. What is the other?`,
      `An angle of ${a}° is formed at one side of a straight line. What is the angle on the other side?`,
      `The side of ${obj} meets a surface at ${a}°. What is the supplementary angle?`,
    ];
    return {
      id: 'supplementary-find',
      question: rng.pick(questions),
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [`${90 - Math.min(a, 89)}°`, `${a}°`, `${correct + 20}°`]),
      explanation: `Supplementary angles add up to 180°. Missing angle = 180° − ${a}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '7.G.B.5',
      diagram: { type: 'linear-pair' as const, knownAngle: a },
    };
  },

  // Vertical angles — find the opposite angle
  (rng: Rng) => {
    const a = rng.intBetween(15, 165);
    const questions = [
      `Two lines cross. One of the angles formed is ${a}°. What is the angle directly across from it?`,
      `Two straight roads intersect, forming an angle of ${a}° in one corner. What is the angle in the opposite corner?`,
      `A pair of lines cross and form a ${a}° angle. What is its vertical angle?`,
    ];
    return {
      id: 'vertical-find',
      question: rng.pick(questions),
      correctAnswer: `${a}°`,
      distractors: dedup(`${a}°`, [`${180 - a}°`, `${90 - Math.min(a, 89)}°`, `${360 - a}°`]),
      explanation: `Vertical angles are always equal. The angle directly across is also ${a}°.`,
      difficulty: 'main-set',
      standard: '7.G.B.5',
      diagram: { type: 'crossing-lines' as const, knownAngle: a },
    };
  },

  // Linear pair — find the adjacent angle on a straight line
  (rng: Rng) => {
    const a = rng.intBetween(15, 165);
    const correct = 180 - a;
    const questions = [
      `Two angles sit next to each other on a straight line. One measures ${a}°. What is the other?`,
      `A line is cut by another line, forming an angle of ${a}° on one side. What is the angle on the other side?`,
    ];
    return {
      id: 'linear-pair-find',
      question: rng.pick(questions),
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [`${90 - Math.min(a, 89)}°`, `${a}°`, `${correct + 15}°`, `${correct - 15}°`]),
      explanation: `Angles on a straight line add up to 180°. Other angle = 180° − ${a}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '7.G.B.5',
      diagram: { type: 'linear-pair' as const, knownAngle: a },
    };
  },

  // Missing triangle angle
  (rng: Rng) => {
    const a = rng.intBetween(15, 100);
    const b = rng.intBetween(15, 180 - a - 15);
    const correct = 180 - a - b;
    const obj = rng.pick(SHAPE_OBJECTS.triangle);
    const questions = [
      `A triangle has angles of ${a}° and ${b}°. What is the third angle?`,
      `Two angles of ${obj} measure ${a}° and ${b}°. What is the missing angle?`,
      `A triangular shape has two angles of ${a}° and ${b}°. Find the third.`,
    ];
    return {
      id: 'triangle-missing',
      question: rng.pick(questions),
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [`${180 - a}°`, `${360 - a - b}°`, `${correct + 10}°`]),
      explanation: `Triangle angles sum to 180°. Third angle = 180° − ${a}° − ${b}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '8.G.A.5',
      diagram: { type: 'triangle' as const, angles: [correct, a, b] as [number, number, number], unknownIndex: 0 },
    };
  },

  // Exterior angle of a triangle
  (rng: Rng) => {
    const a = rng.intBetween(20, 80);
    const b = rng.intBetween(20, 160 - a);
    const c = 180 - a - b;
    const exterior = a + b;
    const questions = [
      `An exterior angle of a triangle equals the sum of the two non-adjacent interior angles. If those angles are ${a}° and ${b}°, what is the exterior angle?`,
      `A triangle has interior angles of ${a}°, ${b}°, and ${c}°. What is the exterior angle at the vertex where the interior angle is ${c}°?`,
      `The angles inside a triangle measure ${a}°, ${b}°, and ${c}°. What is the exterior angle that forms a linear pair with the ${c}° angle?`,
    ];
    return {
      id: 'triangle-exterior-angle',
      question: rng.pick(questions),
      correctAnswer: `${exterior}°`,
      distractors: dedup(`${exterior}°`, [`${c}°`, `${180 - a}°`, `${180 - b}°`]),
      explanation: `The exterior angle of a triangle equals the sum of the two non-adjacent interior angles: ${a}° + ${b}° = ${exterior}°.`,
      difficulty: 'max-out',
      standard: '8.G.A.5',
      diagram: { type: 'triangle' as const, angles: [a, b, c] as [number, number, number], showExterior: 2 },
    };
  },

  // Angles around a point (sum to 360°)
  (rng: Rng) => {
    const a = rng.intBetween(40, 120);
    const b = rng.intBetween(40, Math.min(120, 360 - a - 80));
    const c = rng.intBetween(40, Math.min(120, 360 - a - b - 40));
    const correct = 360 - a - b - c;
    return {
      id: 'angles-around-point',
      question: `Four angles meet at a point. Three of them measure ${a}°, ${b}°, and ${c}°. What is the fourth angle?`,
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [`${180 - a}°`, `${correct + 10}°`, `${360 - a - b}°`]),
      explanation: `Angles around a point always sum to 360°. Fourth angle = 360° − ${a}° − ${b}° − ${c}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '7.G.B.5',
      diagram: { type: 'angles-around-point' as const, angles: [a, b, c, correct] as [number, number, number, number], unknownIndex: 3 },
    };
  },

  // Alternate interior angles (parallel lines)
  (rng: Rng) => {
    const a = rng.intBetween(20, 160);
    const questions = [
      `A transversal crosses two parallel lines. One of the alternate interior angles is ${a}°. What is the other alternate interior angle?`,
      `Two parallel lines are cut by a transversal. If one alternate interior angle is ${a}°, what does the other measure?`,
    ];
    return {
      id: 'alternate-interior-angles',
      question: rng.pick(questions),
      correctAnswer: `${a}°`,
      distractors: dedup(`${a}°`, [`${180 - a}°`, `${a + 10}°`, `${90}°`]),
      explanation: `Alternate interior angles formed by a transversal cutting parallel lines are always equal. Both measure ${a}°.`,
      difficulty: 'max-out',
      standard: '8.G.A.5',
      diagram: { type: 'parallel-lines' as const, knownAngle: a, highlight: 'alternate-interior' },
    };
  },

  // Co-interior (same-side interior) angles — sum to 180°
  (rng: Rng) => {
    const a = rng.intBetween(20, 160);
    const correct = 180 - a;
    return {
      id: 'co-interior-angles',
      question: `A transversal crosses two parallel lines. One of the co-interior (same-side interior) angles is ${a}°. What is the other co-interior angle?`,
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [`${a}°`, `${correct + 10}°`, `${360 - a}°`]),
      explanation: `Co-interior angles (also called same-side interior or consecutive interior angles) add up to 180°. Other angle = 180° − ${a}° = ${correct}°.`,
      difficulty: 'max-out',
      standard: '8.G.A.5',
      diagram: { type: 'parallel-lines' as const, knownAngle: a, highlight: 'co-interior' },
    };
  },
];

// ─── Angle Draw factories ─────────────────────────────────────────────────────
// responseFormat: 'angle-draw' — student drags a ray to construct the angle.
// correctAnswer is the target in degrees (as string). Tolerance: ±5°.
// distractors field is unused but required by RawQuestion type.

const angleDrawQuestions: QuestionFactory[] = [
  // Draw a specific acute angle
  (rng: Rng) => {
    const deg = rng.pick([30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]);
    return {
      id: 'angle-draw-acute',
      question: `Draw an angle of ${deg}°.`,
      correctAnswer: String(deg),
      distractors: ['', '', ''] as [string, string, string],
      explanation: `An angle of ${deg}° is ${deg < 90 ? 'acute' : 'right'} — it opens less than 90°. You were correct if your angle was within 5° of the target.`,
      difficulty: 'warm-up',
      responseFormat: 'angle-draw' as const,
    };
  },
  // Draw a specific obtuse angle
  (rng: Rng) => {
    const deg = rng.pick([100, 110, 115, 120, 125, 130, 135, 140, 150]);
    return {
      id: 'angle-draw-obtuse',
      question: `Draw an angle of ${deg}°.`,
      correctAnswer: String(deg),
      distractors: ['', '', ''] as [string, string, string],
      explanation: `An angle of ${deg}° is obtuse — it opens more than 90° but less than 180°. You were correct if your angle was within 5° of the target.`,
      difficulty: 'main-set',
      responseFormat: 'angle-draw' as const,
    };
  },
  // Draw a right angle
  () => ({
    id: 'angle-draw-right',
    question: 'Draw a right angle (90°).',
    correctAnswer: '90',
    distractors: ['', '', ''] as [string, string, string],
    explanation: 'A right angle is exactly 90°. It forms a perfect corner — like the corner of a square. You were correct if your angle was within 5° of 90°.',
    difficulty: 'warm-up',
    responseFormat: 'angle-draw' as const,
  }),
  // Draw supplement
  (rng: Rng) => {
    const a = rng.pick([30, 40, 45, 50, 55, 60, 65, 70]);
    const sup = 180 - a;
    return {
      id: 'angle-draw-supplement',
      question: `Draw the supplement of ${a}°. (Supplementary angles add up to 180°.)`,
      correctAnswer: String(sup),
      distractors: ['', '', ''] as [string, string, string],
      explanation: `The supplement of ${a}° is 180° − ${a}° = ${sup}°. Supplementary angles together form a straight line.`,
      difficulty: 'main-set',
      responseFormat: 'angle-draw' as const,
    };
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

export const foundationsQuestions: QuestionFactory[] = [
  ...pointsLinesQuestions,
  ...anglesQuestions,
  ...parameterizedQuestions,
  ...angleDrawQuestions,
];
