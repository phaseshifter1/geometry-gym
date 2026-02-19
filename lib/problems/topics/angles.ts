import type { Rng } from '../rng';
import type { QuestionFactory } from '../types';

// Ensure distractors are all unique and different from the correct answer.
// If a collision is found, bumps the value by 5 until it's clear.
function dedup(
  correct: string,
  ds: [string, string, string]
): [string, string, string] {
  const seen = new Set([correct]);
  return ds.map((d) => {
    if (!seen.has(d)) {
      seen.add(d);
      return d;
    }
    const n = parseFloat(d);
    if (!isNaN(n)) {
      for (let bump = 5; bump <= 100; bump += 5) {
        const candidate = `${n + bump}°`;
        if (!seen.has(candidate)) {
          seen.add(candidate);
          return candidate;
        }
      }
    }
    return d + '*';
  }) as [string, string, string];
}

// ─── Static conceptual questions ──────────────────────────────────────────────

const staticQuestions: QuestionFactory[] = [
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
      'A right angle is exactly 90°. You can spot one by the small square symbol drawn in the corner — like the corner of a piece of paper.',
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
      'Complementary angles are two angles that together form a right angle. Tip: "C" in complementary comes before "S" in supplementary, just like 90 comes before 180.',
    difficulty: 'warm-up',
    standard: '7.G.B.5',
  }),

  () => ({
    id: 'def-supplementary',
    question: 'Supplementary angles always add up to ___.',
    correctAnswer: '180°',
    distractors: ['90°', '360°', '270°'],
    explanation:
      'Supplementary angles are two angles that together form a straight line (180°).',
    difficulty: 'warm-up',
    standard: '7.G.B.5',
  }),

  () => ({
    id: 'triangle-angle-sum',
    question: 'The three angles inside any triangle always add up to ___.',
    correctAnswer: '180°',
    distractors: ['90°', '270°', '360°'],
    explanation:
      'No matter what triangle you draw — big, small, skinny, or wide — its three angles always total exactly 180°.',
    difficulty: 'warm-up',
    standard: '8.G.A.5',
  }),

  () => ({
    id: 'vertical-angles-def',
    question:
      'When two straight lines cross, the angles directly across from each other are called vertical angles. Vertical angles are always ___.',
    correctAnswer: 'equal to each other',
    distractors: ['supplementary', 'complementary', 'right angles'],
    explanation:
      'Vertical angles are always equal. When two lines cross they form an "X" — the angles opposite each other in that X are always the same size.',
    difficulty: 'main-set',
    standard: '7.G.B.5',
  }),

  () => ({
    id: 'right-angle-real-world',
    question: 'Which type of angle is found at each corner of a square?',
    correctAnswer: 'Right angle (90°)',
    distractors: ['Acute angle', 'Obtuse angle', 'Straight angle'],
    explanation:
      "Every corner of a square is exactly 90° — a right angle. That's part of what makes it a square.",
    difficulty: 'warm-up',
    standard: '4.G.A.1',
  }),

  () => ({
    id: 'triangle-two-obtuse',
    question: 'Can a triangle have two obtuse angles?',
    correctAnswer: 'No — two obtuse angles already add up to more than 180°',
    distractors: [
      'Yes — if both angles are just slightly over 90°',
      'Yes — as long as the third angle is very small',
      'No — triangles can only have acute angles',
    ],
    explanation:
      'Obtuse angles are greater than 90°. Two of them would already exceed 180°, but a triangle\'s angles must total exactly 180°. So two obtuse angles is impossible.',
    difficulty: 'max-out',
    standard: '8.G.A.5',
  }),

  () => ({
    id: 'linear-pair-def',
    question:
      'Two angles that sit next to each other on a straight line are called a linear pair. They always add up to ___.',
    correctAnswer: '180°',
    distractors: ['90°', '360°', '270°'],
    explanation:
      'A linear pair sits on a straight line, and a straight line measures 180°. So the two angles always add up to 180° — they are supplementary.',
    difficulty: 'main-set',
    standard: '7.G.B.5',
  }),

  () => ({
    id: 'full-rotation',
    question: 'A full rotation all the way around a point equals ___.',
    correctAnswer: '360°',
    distractors: ['180°', '90°', '270°'],
    explanation:
      'One complete turn around a point is 360°. Think of a clock hand making one full trip around the face.',
    difficulty: 'warm-up',
    standard: '4.MD.C.5',
  }),

  () => ({
    id: 'reflex-angle-def',
    question: 'An angle greater than 180° but less than 360° is called ___.',
    correctAnswer: 'a reflex angle',
    distractors: ['an obtuse angle', 'a straight angle', 'a complete angle'],
    explanation:
      'A reflex angle is the "long way around" — bigger than a straight line but not a full rotation. They are less common but real.',
    difficulty: 'main-set',
    standard: '4.G.A.1',
  }),

  () => ({
    id: 'same-complement',
    question:
      'Angle A and angle B are both complementary to the same angle. What must be true?',
    correctAnswer: 'Angle A and angle B are equal',
    distractors: [
      'Angle A and angle B add up to 90°',
      'Angle A and angle B add up to 180°',
      'Angle A and angle B are both right angles',
    ],
    explanation:
      'If both A and B are complementary to the same angle, they each equal (90° minus that angle). Since they equal the same thing, they must equal each other.',
    difficulty: 'max-out',
    standard: '7.G.B.5',
  }),

  () => ({
    id: 'parallel-corresponding',
    question:
      'When a straight line crosses two parallel lines, the angles in the same position at each crossing are called corresponding angles. They are ___.',
    correctAnswer: 'always equal',
    distractors: [
      'always supplementary (add up to 180°)',
      'always complementary (add up to 90°)',
      'always right angles',
    ],
    explanation:
      'Corresponding angles sit in matching positions when a line crosses two parallel lines. Because the lines are parallel, the angles are always equal.',
    difficulty: 'max-out',
    standard: '8.G.A.5',
  }),
];

// ─── Parameterized questions (random numbers each time) ───────────────────────

const parameterizedQuestions: QuestionFactory[] = [
  // Identify: acute angle
  (rng: Rng) => {
    const angle = rng.intBetween(1, 89);
    return {
      id: 'identify-acute',
      question: `An angle measures ${angle}°. What type of angle is it?`,
      correctAnswer: 'Acute',
      distractors: dedup('Acute', ['Obtuse', 'Right', 'Straight']),
      explanation: `${angle}° is less than 90°, so it is an acute angle. Acute angles are always between 0° and 90°.`,
      difficulty: 'warm-up',
      standard: '4.G.A.1',
    };
  },

  // Identify: obtuse angle
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

  // Complementary: find the missing angle
  (rng: Rng) => {
    const a = rng.intBetween(10, 80);
    const correct = 90 - a;
    return {
      id: 'complementary-find',
      question: `Two angles are complementary. One measures ${a}°. What is the other angle?`,
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [
        `${180 - a}°`,
        `${a}°`,
        `${90 + a}°`,
      ]),
      explanation: `Complementary angles add up to 90°. So the missing angle is 90° − ${a}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '7.G.B.5',
    };
  },

  // Supplementary: find the missing angle
  (rng: Rng) => {
    const a = rng.intBetween(10, 170);
    const correct = 180 - a;
    return {
      id: 'supplementary-find',
      question: `Two angles are supplementary. One measures ${a}°. What is the other angle?`,
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [
        `${90 - Math.min(a, 89)}°`,
        `${a}°`,
        `${correct + 20}°`,
      ]),
      explanation: `Supplementary angles add up to 180°. So the missing angle is 180° − ${a}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '7.G.B.5',
    };
  },

  // Vertical angles
  (rng: Rng) => {
    const a = rng.intBetween(20, 160);
    return {
      id: 'vertical-find',
      question: `Two straight lines cross each other. One of the angles formed is ${a}°. What is the angle directly across from it?`,
      correctAnswer: `${a}°`,
      distractors: dedup(`${a}°`, [
        `${180 - a}°`,
        `${90 - Math.min(a, 89)}°`,
        `${360 - a}°`,
      ]),
      explanation: `Vertical angles are always equal. The angle directly across is also ${a}°.`,
      difficulty: 'main-set',
      standard: '7.G.B.5',
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
      distractors: dedup(`${correct}°`, [
        `${90 - Math.min(a, 89)}°`,
        `${a}°`,
        `${correct + 15}°`,
      ]),
      explanation: `Angles on a straight line add up to 180°. So the other angle is 180° − ${a}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '7.G.B.5',
    };
  },

  // Triangle: find the missing angle
  (rng: Rng) => {
    const a = rng.intBetween(20, 80);
    const b = rng.intBetween(20, 180 - a - 20);
    const correct = 180 - a - b;
    return {
      id: 'triangle-missing',
      question: `A triangle has two angles measuring ${a}° and ${b}°. What is the third angle?`,
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [
        `${180 - a}°`,
        `${360 - a - b}°`,
        `${correct + 10}°`,
      ]),
      explanation: `The three angles in a triangle always add up to 180°. Third angle = 180° − ${a}° − ${b}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '8.G.A.5',
    };
  },

  // Right triangle: find the missing angle
  (rng: Rng) => {
    const a = rng.intBetween(10, 80);
    const correct = 90 - a;
    return {
      id: 'right-triangle-missing',
      question: `A right triangle has one angle of 90° and another of ${a}°. What is the third angle?`,
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [
        `${180 - a}°`,
        `${a}°`,
        `${correct + 10}°`,
      ]),
      explanation: `The three angles add up to 180°. One is 90°, one is ${a}°, so the third is 180° − 90° − ${a}° = ${correct}°.`,
      difficulty: 'warm-up',
      standard: '8.G.A.5',
    };
  },
];

export const anglesQuestions: QuestionFactory[] = [
  ...staticQuestions,
  ...parameterizedQuestions,
];
