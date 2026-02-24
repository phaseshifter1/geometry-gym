import type { Rng } from '../rng';
import type { QuestionFactory } from '../types';

// Foundations: Points, Lines, Rays, Planes + Angles
// Covers: 4.G.A.1, 4.MD.C.5, 7.G.B.5, 8.G.A.5

function dedup(
  correct: string,
  ds: [string, string, string]
): [string, string, string] {
  const seen = new Set([correct]);
  return ds.map((d) => {
    if (!seen.has(d)) { seen.add(d); return d; }
    const n = parseFloat(d);
    if (!isNaN(n)) {
      for (let bump = 5; bump <= 100; bump += 5) {
        const candidate = `${n + bump}°`;
        if (!seen.has(candidate)) { seen.add(candidate); return candidate; }
      }
    }
    return d + '*';
  }) as [string, string, string];
}

// ─── Points, Lines, Segments, Rays ────────────────────────────────────────────

const pointsLinesQuestions: QuestionFactory[] = [
  () => ({
    id: 'point-def',
    question: 'In geometry, a point ___.',
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
  }),

  () => ({
    id: 'line-def',
    question: 'A line in geometry ___.',
    correctAnswer: 'Extends forever in both directions with no endpoints',
    distractors: [
      'Has two endpoints and a fixed length',
      'Starts at a point and goes on forever in one direction',
      'Is a curved path between two points',
    ],
    explanation:
      'A line has no endpoints and goes on forever in both directions. We draw arrows on both ends to show this. It is named by any two points on it, e.g., line AB.',
    difficulty: 'warm-up',
    standard: '4.G.A.1',
  }),

  () => ({
    id: 'segment-def',
    question: 'A line segment ___.',
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
  }),

  () => ({
    id: 'ray-def',
    question: 'A ray ___.',
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
  }),

  () => ({
    id: 'parallel-lines-def',
    question: 'Two lines are parallel if they ___.',
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
  }),

  () => ({
    id: 'perpendicular-lines-def',
    question: 'Two lines are perpendicular if they ___.',
    correctAnswer: 'Intersect at exactly 90° (a right angle)',
    distractors: [
      'Never intersect',
      'Are the same distance apart',
      'Intersect at any angle other than 90°',
    ],
    explanation:
      'Perpendicular lines meet at a right angle (90°). The small square symbol at the intersection shows the right angle.',
    difficulty: 'warm-up',
    standard: '4.G.A.1',
  }),

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

// ─── Angles ────────────────────────────────────────────────────────────────────

const anglesQuestions: QuestionFactory[] = [
  () => ({
    id: 'def-acute',
    question: 'An angle that is less than 90° is called ___.',
    correctAnswer: 'an acute angle',
    distractors: ['an obtuse angle', 'a right angle', 'a straight angle'],
    explanation:
      'Acute angles are greater than 0° and less than 90°. Think of "acute" as sharp — like a pointy corner.',
    difficulty: 'warm-up',
    standard: '4.G.A.1',
  }),

  () => ({
    id: 'def-obtuse',
    question: 'An angle that is greater than 90° but less than 180° is called ___.',
    correctAnswer: 'an obtuse angle',
    distractors: ['an acute angle', 'a right angle', 'a straight angle'],
    explanation:
      'Obtuse angles are wider than a right angle but not quite a straight line. They look like a wide-open book.',
    difficulty: 'warm-up',
    standard: '4.G.A.1',
  }),

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

// ─── Parameterized questions ───────────────────────────────────────────────────

const parameterizedQuestions: QuestionFactory[] = [
  // Identify angle type
  (rng: Rng) => {
    const angle = rng.intBetween(1, 89);
    return {
      id: 'identify-acute',
      question: `An angle measures ${angle}°. What type of angle is it?`,
      correctAnswer: 'Acute',
      distractors: dedup('Acute', ['Obtuse', 'Right', 'Straight']),
      explanation: `${angle}° is less than 90°, so it is an acute angle.`,
      difficulty: 'warm-up',
      standard: '4.G.A.1',
    };
  },

  (rng: Rng) => {
    const angle = rng.intBetween(91, 179);
    return {
      id: 'identify-obtuse',
      question: `An angle measures ${angle}°. What type of angle is it?`,
      correctAnswer: 'Obtuse',
      distractors: dedup('Obtuse', ['Acute', 'Right', 'Straight']),
      explanation: `${angle}° is greater than 90° and less than 180°, so it is an obtuse angle.`,
      difficulty: 'warm-up',
      standard: '4.G.A.1',
    };
  },

  // Complementary
  (rng: Rng) => {
    const a = rng.intBetween(10, 80);
    const correct = 90 - a;
    return {
      id: 'complementary-find',
      question: `Two angles are complementary. One measures ${a}°. What is the other?`,
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [`${180 - a}°`, `${a}°`, `${90 + a}°`]),
      explanation: `Complementary angles add up to 90°. Missing angle = 90° − ${a}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '7.G.B.5',
    };
  },

  // Supplementary
  (rng: Rng) => {
    const a = rng.intBetween(10, 170);
    const correct = 180 - a;
    return {
      id: 'supplementary-find',
      question: `Two angles are supplementary. One measures ${a}°. What is the other?`,
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [`${90 - Math.min(a, 89)}°`, `${a}°`, `${correct + 20}°`]),
      explanation: `Supplementary angles add up to 180°. Missing angle = 180° − ${a}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '7.G.B.5',
    };
  },

  // Vertical angles
  (rng: Rng) => {
    const a = rng.intBetween(20, 160);
    return {
      id: 'vertical-find',
      question: `Two lines cross. One of the angles formed is ${a}°. What is the angle directly across from it?`,
      correctAnswer: `${a}°`,
      distractors: dedup(`${a}°`, [`${180 - a}°`, `${90 - Math.min(a, 89)}°`, `${360 - a}°`]),
      explanation: `Vertical angles are always equal. The angle directly across is also ${a}°.`,
      difficulty: 'main-set',
      standard: '7.G.B.5',
    };
  },

  // Missing triangle angle
  (rng: Rng) => {
    const a = rng.intBetween(20, 80);
    const b = rng.intBetween(20, 180 - a - 20);
    const correct = 180 - a - b;
    return {
      id: 'triangle-missing',
      question: `A triangle has angles of ${a}° and ${b}°. What is the third angle?`,
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [`${180 - a}°`, `${360 - a - b}°`, `${correct + 10}°`]),
      explanation: `Triangle angles sum to 180°. Third angle = 180° − ${a}° − ${b}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '8.G.A.5',
    };
  },

  // Linear pair
  (rng: Rng) => {
    const a = rng.intBetween(20, 160);
    const correct = 180 - a;
    return {
      id: 'linear-pair-find',
      question: `Two angles sit next to each other on a straight line. One measures ${a}°. What is the other?`,
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [`${90 - Math.min(a, 89)}°`, `${a}°`, `${correct + 15}°`]),
      explanation: `Angles on a straight line add up to 180°. Other angle = 180° − ${a}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '7.G.B.5',
    };
  },
];

export const foundationsQuestions: QuestionFactory[] = [
  ...pointsLinesQuestions,
  ...anglesQuestions,
  ...parameterizedQuestions,
];
