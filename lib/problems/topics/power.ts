import type { Rng } from '../rng';
import type { QuestionFactory } from '../types';

// Power Movement: Pythagorean Theorem, Congruence & Similarity
// Covers: 8.G.A.2, 8.G.A.4, 8.G.B.7, 8.G.B.8

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

// ─── Pythagorean Theorem ──────────────────────────────────────────────────────

const pythagoreanQuestions: QuestionFactory[] = [
  () => ({
    id: 'pythagoras-statement',
    question: 'The Pythagorean theorem states that in a right triangle ___.',
    correctAnswer: 'a² + b² = c², where c is the hypotenuse (longest side)',
    distractors: [
      'a + b = c, where c is the hypotenuse',
      'a² + b² = c², where a is the hypotenuse',
      'a² = b² + c², where a is the shortest side',
    ],
    explanation:
      'In any right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c². The hypotenuse is always opposite the right angle.',
    difficulty: 'warm-up',
    standard: '8.G.B.7',
  }),

  () => ({
    id: 'hypotenuse-def',
    question: 'The hypotenuse of a right triangle is ___.',
    correctAnswer: 'The longest side, always opposite the right angle',
    distractors: [
      'Either of the two shorter sides',
      'The side adjacent to the right angle',
      'The side with the longest label',
    ],
    explanation:
      'The hypotenuse is always the side opposite the 90° angle, and it is always the longest side of a right triangle.',
    difficulty: 'warm-up',
    standard: '8.G.B.7',
  }),

  () => ({
    id: 'pythagorean-triple-3-4-5',
    question: 'A right triangle has legs of 3 and 4. What is the length of the hypotenuse?',
    correctAnswer: '5',
    distractors: ['7', '√7', '4.5'],
    explanation:
      'a² + b² = c² → 3² + 4² = 9 + 16 = 25 → c = √25 = 5. The 3-4-5 triangle is the most famous Pythagorean triple.',
    difficulty: 'warm-up',
    standard: '8.G.B.7',
  }),

  () => ({
    id: 'pythagorean-triple-5-12-13',
    question: 'A right triangle has legs of 5 and 12. What is the hypotenuse?',
    correctAnswer: '13',
    distractors: ['17', '√17', '11'],
    explanation:
      '5² + 12² = 25 + 144 = 169 = 13². The hypotenuse is 13. This is the 5-12-13 Pythagorean triple.',
    difficulty: 'main-set',
    standard: '8.G.B.7',
  }),

  () => ({
    id: 'pythagoras-converse',
    question: 'A triangle has sides of 6, 8, and 10. Is it a right triangle?',
    correctAnswer: 'Yes — 6² + 8² = 36 + 64 = 100 = 10²',
    distractors: [
      'No — the sides do not satisfy a² + b² = c²',
      'Only if the angle between 6 and 8 is measured',
      'Yes — but only by coincidence, not the theorem',
    ],
    explanation:
      '6² + 8² = 36 + 64 = 100 = 10². The converse of the Pythagorean theorem says: if a² + b² = c², then it IS a right triangle.',
    difficulty: 'main-set',
    standard: '8.G.B.7',
  }),

  () => ({
    id: 'pythagoras-find-leg',
    question: 'A right triangle has a hypotenuse of 13 and one leg of 5. What is the other leg?',
    correctAnswer: '12',
    distractors: ['8', '√194', '10'],
    explanation:
      'a² + b² = c² → 5² + b² = 13² → 25 + b² = 169 → b² = 144 → b = 12.',
    difficulty: 'main-set',
    standard: '8.G.B.7',
  }),

  () => ({
    id: 'pythagoras-real-world',
    question: 'A ladder leans against a wall. The base is 6 m from the wall, and the wall is 8 m tall. How long is the ladder?',
    correctAnswer: '10 m',
    distractors: ['14 m', '√28 m', '9 m'],
    explanation:
      'The ladder is the hypotenuse. 6² + 8² = 36 + 64 = 100. √100 = 10 m.',
    difficulty: 'main-set',
    standard: '8.G.B.7',
  }),

  () => ({
    id: 'diagonal-rectangle',
    question: 'A rectangle is 3 cm wide and 4 cm tall. What is the length of its diagonal?',
    correctAnswer: '5 cm',
    distractors: ['7 cm', '√7 cm', '6 cm'],
    explanation:
      'The diagonal splits the rectangle into a right triangle with legs 3 and 4. Diagonal = √(3² + 4²) = √25 = 5 cm.',
    difficulty: 'main-set',
    standard: '8.G.B.8',
  }),
];

// ─── Congruence & Similarity ──────────────────────────────────────────────────

const congruenceSimilarityQuestions: QuestionFactory[] = [
  () => ({
    id: 'congruent-def',
    question: 'Two shapes are congruent if they ___.',
    correctAnswer: 'Have exactly the same shape and size',
    distractors: [
      'Have the same shape but different sizes',
      'Have the same area but different shapes',
      'Share at least two equal angles',
    ],
    explanation:
      'Congruent shapes are identical — one can be moved, rotated, or reflected to fit exactly on top of the other. No resizing is needed.',
    difficulty: 'warm-up',
    standard: '8.G.A.2',
  }),

  () => ({
    id: 'similar-def',
    question: 'Two shapes are similar if they ___.',
    correctAnswer: 'Have the same shape (equal angles) but can be different sizes',
    distractors: [
      'Have the same size and shape',
      'Have the same area',
      'Have at least one equal side',
    ],
    explanation:
      'Similar shapes have the same angles and proportional sides, but they do not have to be the same size. Enlarging or shrinking a shape keeps it similar to the original.',
    difficulty: 'warm-up',
    standard: '8.G.A.4',
  }),

  () => ({
    id: 'scale-factor-def',
    question: 'The scale factor between two similar shapes is ___.',
    correctAnswer: 'The ratio of corresponding side lengths',
    distractors: [
      'The difference between corresponding side lengths',
      'The ratio of their areas',
      'The sum of corresponding angles',
    ],
    explanation:
      'Scale factor = (side of new shape) ÷ (corresponding side of original). If the scale factor is 2, every side doubles in length.',
    difficulty: 'main-set',
    standard: '8.G.A.4',
  }),

  () => ({
    id: 'congruent-vs-similar',
    question: 'All congruent shapes are similar, but not all similar shapes are congruent. Why?',
    correctAnswer: 'Congruent shapes have scale factor 1; similar shapes can have any positive scale factor',
    distractors: [
      'Congruent shapes have more sides than similar shapes',
      'Similar shapes must be in the same position; congruent ones can move',
      'Congruent shapes have right angles; similar ones do not',
    ],
    explanation:
      'Congruence is a special case of similarity where the scale factor is exactly 1 — meaning the sizes are equal too.',
    difficulty: 'main-set',
    standard: '8.G.A.4',
  }),

  () => ({
    id: 'sss-congruence',
    question: 'The SSS (Side-Side-Side) congruence rule says two triangles are congruent if ___.',
    correctAnswer: 'All three pairs of corresponding sides are equal',
    distractors: [
      'All three pairs of corresponding angles are equal',
      'Two sides and the angle between them are equal',
      'Two angles and the included side are equal',
    ],
    explanation:
      'SSS: if all three sides of one triangle equal all three sides of another, the triangles are congruent. Angles are determined by the sides.',
    difficulty: 'max-out',
    standard: '8.G.A.2',
  }),

  () => ({
    id: 'aa-similarity',
    question: 'The AA (Angle-Angle) similarity rule says two triangles are similar if ___.',
    correctAnswer: 'Two pairs of corresponding angles are equal',
    distractors: [
      'All three sides are proportional',
      'Two sides are equal',
      'One pair of angles and one pair of sides are equal',
    ],
    explanation:
      'If two angles of one triangle equal two angles of another, the third angles must also be equal (angle sum = 180°). So the triangles are similar.',
    difficulty: 'max-out',
    standard: '8.G.A.4',
  }),
];

// ─── Parameterized questions ───────────────────────────────────────────────────

// Known Pythagorean triples for clean answers
const TRIPLES: [number, number, number][] = [
  [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15],
];

const parameterizedQuestions: QuestionFactory[] = [
  // Find hypotenuse from a Pythagorean triple
  (rng: Rng) => {
    const [a, b, c] = rng.pick(TRIPLES);
    return {
      id: 'pythag-find-hyp',
      question: `A right triangle has legs of length ${a} and ${b}. What is the length of the hypotenuse?`,
      correctAnswer: `${c}`,
      distractors: dedup(`${c}`, [
        `${a + b}`,
        `${c + 2}`,
        `${Math.round(Math.sqrt(a * a + b * b + 1))}`,
      ]),
      explanation: `c = √(${a}² + ${b}²) = √(${a * a} + ${b * b}) = √${a * a + b * b} = ${c}.`,
      difficulty: 'main-set',
      standard: '8.G.B.7',
    };
  },

  // Find a leg from a Pythagorean triple
  (rng: Rng) => {
    const [a, b, c] = rng.pick(TRIPLES);
    return {
      id: 'pythag-find-leg',
      question: `A right triangle has a hypotenuse of ${c} and one leg of ${a}. What is the other leg?`,
      correctAnswer: `${b}`,
      distractors: dedup(`${b}`, [
        `${c - a}`,
        `${b + 3}`,
        `${b - 2 < 1 ? b + 5 : b - 2}`,
      ]),
      explanation: `b = √(${c}² − ${a}²) = √(${c * c} − ${a * a}) = √${c * c - a * a} = ${b}.`,
      difficulty: 'main-set',
      standard: '8.G.B.7',
    };
  },

  // Scale factor between similar shapes
  (rng: Rng) => {
    const sf = rng.intBetween(2, 5);
    const sideA = rng.intBetween(3, 8);
    const sideB = sideA * sf;
    return {
      id: 'scale-factor-calc',
      question: `Two similar rectangles have corresponding sides of ${sideA} cm and ${sideB} cm. What is the scale factor from the smaller to the larger?`,
      correctAnswer: `${sf}`,
      distractors: dedup(`${sf}`, [
        `${sideB - sideA}`,
        `${sf + 1}`,
        `${sf - 1 < 1 ? sf + 2 : sf - 1}`,
      ]),
      explanation: `Scale factor = larger side ÷ smaller side = ${sideB} ÷ ${sideA} = ${sf}.`,
      difficulty: 'main-set',
      standard: '8.G.A.4',
    };
  },

  // Missing side in similar triangles
  (rng: Rng) => {
    const sf = rng.intBetween(2, 4);
    const a = rng.intBetween(3, 9);
    const b = a * sf;
    const x = rng.intBetween(4, 10);
    const y = x * sf;
    return {
      id: 'similar-missing-side',
      question: `Two similar triangles have corresponding sides ${a} cm and ${b} cm. If a side in the first triangle is ${x} cm, what is the corresponding side in the second?`,
      correctAnswer: `${y} cm`,
      distractors: dedup(`${y} cm`, [
        `${y + sf} cm`,
        `${x + b - a} cm`,
        `${y - 2} cm`,
      ]),
      explanation: `Scale factor = ${b} ÷ ${a} = ${sf}. Corresponding side = ${x} × ${sf} = ${y} cm.`,
      difficulty: 'main-set',
      standard: '8.G.A.4',
    };
  },
];

export const powerQuestions: QuestionFactory[] = [
  ...pythagoreanQuestions,
  ...congruenceSimilarityQuestions,
  ...parameterizedQuestions,
];
