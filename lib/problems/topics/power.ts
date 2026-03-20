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

// Expanded Pythagorean triple pool (base triples × multipliers)
const TRIPLES: [number, number, number][] = [
  [3, 4, 5], [6, 8, 10], [9, 12, 15], [12, 16, 20],
  [5, 12, 13], [10, 24, 26],
  [8, 15, 17], [16, 30, 34],
  [7, 24, 25],
  [20, 21, 29],
];

// Non-right triangles for the converse factory (a² + b² ≠ c²)
const NON_RIGHT: [number, number, number][] = [
  [3, 4, 6], [5, 12, 14], [4, 7, 9], [6, 10, 12], [7, 24, 26], [8, 15, 18],
];

// Non-integer hypotenuse cases: [a, b, a²+b², √(a²+b²) formatted]
const SURD_HYPS: [number, number, number, string][] = [
  [2, 3, 13, '√13 ≈ 3.61'],
  [3, 5, 34, '√34 ≈ 5.83'],
  [4, 5, 41, '√41 ≈ 6.40'],
  [2, 7, 53, '√53 ≈ 7.28'],
  [3, 7, 58, '√58 ≈ 7.62'],
  [4, 7, 65, '√65 ≈ 8.06'],
  [5, 7, 74, '√74 ≈ 8.60'],
  [6, 7, 85, '√85 ≈ 9.22'],
  [1, 5, 26, '√26 ≈ 5.10'],
  [2, 5, 29, '√29 ≈ 5.39'],
];

// Small triples for coordinate distance factory
const COORD_TRIPLES: [number, number, number][] = [
  [3, 4, 5], [6, 8, 10],
];

const parameterizedQuestions: QuestionFactory[] = [
  // Find hypotenuse from Pythagorean triple
  (rng: Rng) => {
    const [a, b, c] = rng.pick(TRIPLES);
    const stem = rng.pick([
      `A right triangle has legs of length ${a} and ${b}. What is the length of the hypotenuse?`,
      `In a right triangle, the two legs measure ${a} cm and ${b} cm. Find the hypotenuse.`,
      `What is the hypotenuse of a right triangle with legs ${a} m and ${b} m?`,
    ]);
    return {
      id: 'pythag-find-hyp',
      question: stem,
      correctAnswer: `${c}`,
      distractors: dedup(`${c}`, [
        `${a + b}`,
        `${c + 2}`,
        `${c - 1 < 1 ? c + 3 : c - 1}`,
      ]),
      explanation: `c = √(${a}² + ${b}²) = √(${a * a} + ${b * b}) = √${a * a + b * b} = ${c}.`,
      difficulty: 'main-set',
      standard: '8.G.B.7',
    };
  },

  // Find a leg from Pythagorean triple
  (rng: Rng) => {
    const [a, b, c] = rng.pick(TRIPLES);
    const stem = rng.pick([
      `A right triangle has a hypotenuse of ${c} and one leg of ${a}. What is the other leg?`,
      `In a right triangle, the hypotenuse is ${c} and one leg is ${a}. Find the missing leg.`,
      `A right triangle has legs ${a} and b, and hypotenuse ${c}. What is b?`,
    ]);
    return {
      id: 'pythag-find-leg',
      question: stem,
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
    const sf = rng.intBetween(2, 8);
    const sideA = rng.intBetween(2, 10);
    const sideB = sideA * sf;
    const stem = rng.pick([
      `Two similar rectangles have corresponding sides of ${sideA} cm and ${sideB} cm. What is the scale factor from the smaller to the larger?`,
      `Two similar triangles have a pair of corresponding sides measuring ${sideA} m and ${sideB} m. What is the scale factor (small to large)?`,
      `Shape A has a side of ${sideA} cm. The corresponding side in similar Shape B is ${sideB} cm. What is the scale factor from A to B?`,
    ]);
    return {
      id: 'scale-factor-calc',
      question: stem,
      correctAnswer: `${sf}`,
      distractors: dedup(`${sf}`, [
        `${sideB - sideA}`,
        `${sf + 1}`,
        `${sf - 1 < 1 ? sf + 2 : sf - 1}`,
      ]),
      explanation: `Scale factor = larger ÷ smaller = ${sideB} ÷ ${sideA} = ${sf}.`,
      difficulty: 'main-set',
      standard: '8.G.A.4',
    };
  },

  // Missing side in similar triangles
  (rng: Rng) => {
    const sf = rng.intBetween(2, 6);
    const a = rng.intBetween(2, 10);
    const b = a * sf;
    const x = rng.intBetween(3, 12);
    const y = x * sf;
    const stem = rng.pick([
      `Two similar triangles have corresponding sides ${a} cm and ${b} cm. A side in the smaller triangle is ${x} cm. What is the corresponding side in the larger?`,
      `Triangles P and Q are similar with scale factor ${sf}:1 (Q:P). A side of P is ${x} cm. What is the corresponding side of Q?`,
    ]);
    return {
      id: 'similar-missing-side',
      question: stem,
      correctAnswer: `${y} cm`,
      distractors: dedup(`${y} cm`, [
        `${y + sf} cm`,
        `${x + b - a} cm`,
        `${y - 2 < 1 ? y + 4 : y - 2} cm`,
      ]),
      explanation: `Scale factor = ${b} ÷ ${a} = ${sf}. Corresponding side = ${x} × ${sf} = ${y} cm.`,
      difficulty: 'main-set',
      standard: '8.G.A.4',
    };
  },

  // Converse of Pythagorean theorem
  (rng: Rng) => {
    const isRight = rng.pick([true, false]);
    const [a, b, c] = isRight ? rng.pick(TRIPLES) : rng.pick(NON_RIGHT);
    const sumSq = a * a + b * b;
    const cSq = c * c;
    return {
      id: 'pythag-converse-calc',
      question: `A triangle has sides of length ${a}, ${b}, and ${c}. Is it a right triangle?`,
      correctAnswer: isRight
        ? `Yes — ${a}² + ${b}² = ${sumSq} = ${c}²`
        : `No — ${a}² + ${b}² = ${sumSq} ≠ ${cSq}`,
      distractors: dedup(
        isRight
          ? `Yes — ${a}² + ${b}² = ${sumSq} = ${c}²`
          : `No — ${a}² + ${b}² = ${sumSq} ≠ ${cSq}`,
        isRight
          ? [`No — ${a}² + ${b}² ≠ ${c}²`, 'Only if the angle between the sides is measured', 'Cannot tell without angles']
          : [`Yes — ${a}² + ${b}² = ${c}²`, 'Only if the angle between the sides is measured', 'Cannot tell without angles'],
      ),
      explanation: isRight
        ? `${a}² + ${b}² = ${a * a} + ${b * b} = ${sumSq} = ${c}². Since a² + b² = c², this IS a right triangle.`
        : `${a}² + ${b}² = ${a * a} + ${b * b} = ${sumSq}, but ${c}² = ${cSq}. Since ${sumSq} ≠ ${cSq}, this is NOT a right triangle.`,
      difficulty: 'main-set',
      standard: '8.G.B.7',
    };
  },

  // Diagonal of a rectangle (parameterized)
  (rng: Rng) => {
    const [a, b, c] = rng.pick(TRIPLES);
    const stem = rng.pick([
      `A rectangle is ${a} cm wide and ${b} cm tall. What is the length of its diagonal?`,
      `A rectangular screen measures ${a} cm × ${b} cm. What is the diagonal measurement?`,
      `Find the diagonal of a rectangle with width ${a} m and height ${b} m.`,
    ]);
    return {
      id: 'diagonal-rect-calc',
      question: stem,
      correctAnswer: `${c} cm`,
      distractors: dedup(`${c} cm`, [
        `${a + b} cm`,
        `${c + 2} cm`,
        `${c - 1 < 1 ? c + 3 : c - 1} cm`,
      ]),
      explanation: `Diagonal = √(width² + height²) = √(${a}² + ${b}²) = √(${a * a} + ${b * b}) = √${a * a + b * b} = ${c} cm.`,
      difficulty: 'main-set',
      standard: '8.G.B.8',
    };
  },

  // Pythagorean theorem in real-world contexts
  (rng: Rng) => {
    const [a, b, c] = rng.pick(TRIPLES);
    const scenario = rng.pick([
      {
        q: `A ladder ${c} m long leans against a wall. Its base is ${a} m from the wall. How high up the wall does it reach?`,
        ans: `${b} m`,
        exp: `Height = √(ladder² − base²) = √(${c}² − ${a}²) = √${c * c - a * a} = ${b} m.`,
      },
      {
        q: `A path goes ${a} km east and then ${b} km north. What is the straight-line distance back to the start?`,
        ans: `${c} km`,
        exp: `Distance = √(${a}² + ${b}²) = √(${a * a} + ${b * b}) = √${a * a + b * b} = ${c} km.`,
      },
      {
        q: `A TV screen is ${a} cm wide and ${b} cm tall. What is its diagonal measurement (the advertised size)?`,
        ans: `${c} cm`,
        exp: `Diagonal = √(${a}² + ${b}²) = √${a * a + b * b} = ${c} cm.`,
      },
    ]);
    const correct = scenario.ans;
    return {
      id: 'pythag-real-world-calc',
      question: scenario.q,
      correctAnswer: correct,
      distractors: dedup(correct, [
        `${a + b} ${correct.slice(-2)}`,
        `${c + 3} ${correct.slice(-2)}`,
        `${c - 2 < 1 ? c + 4 : c - 2} ${correct.slice(-2)}`,
      ]),
      explanation: scenario.exp,
      difficulty: 'main-set',
      standard: '8.G.B.7',
    };
  },

  // Perimeter of similar shapes
  (rng: Rng) => {
    const sf = rng.intBetween(2, 5);
    const p1 = rng.intBetween(6, 20);
    const p2 = p1 * sf;
    const stem = rng.pick([
      `Two similar triangles have a scale factor of ${sf} (larger to smaller reversed — small:large = 1:${sf}). The smaller triangle has perimeter ${p1} cm. What is the larger triangle's perimeter?`,
      `Two similar shapes have scale factor 1:${sf}. The smaller perimeter is ${p1} cm. Find the larger perimeter.`,
    ]);
    return {
      id: 'similar-perimeter',
      question: stem,
      correctAnswer: `${p2} cm`,
      distractors: dedup(`${p2} cm`, [
        `${p1 + sf} cm`,
        `${p2 + sf} cm`,
        `${p1 * sf * sf} cm`,
      ]),
      explanation: `Perimeters scale by the same factor as sides. Larger perimeter = ${p1} × ${sf} = ${p2} cm.`,
      difficulty: 'main-set',
      standard: '8.G.A.4',
    };
  },

  // Area ratio of similar shapes
  (rng: Rng) => {
    const sf = rng.intBetween(2, 4);
    const smallAreas = [4, 6, 9, 10, 12, 16, 25];
    const a1 = rng.pick(smallAreas);
    const a2 = a1 * sf * sf;
    const stem = rng.pick([
      `Two similar shapes have a scale factor of ${sf} (small:large = 1:${sf}). The smaller shape has an area of ${a1} cm². What is the area of the larger shape?`,
      `A shape is enlarged by scale factor ${sf}. If the original area is ${a1} cm², what is the new area?`,
    ]);
    return {
      id: 'similar-area-ratio',
      question: stem,
      correctAnswer: `${a2} cm²`,
      distractors: dedup(`${a2} cm²`, [
        `${a1 * sf} cm²`,
        `${a2 + sf} cm²`,
        `${a1 + sf * sf} cm²`,
      ]),
      explanation: `Area scales by the square of the scale factor. New area = ${a1} × ${sf}² = ${a1} × ${sf * sf} = ${a2} cm².`,
      difficulty: 'max-out',
      standard: '8.G.A.4',
    };
  },

  // Scale factor from area ratio
  (rng: Rng) => {
    const sf = rng.intBetween(2, 4);
    const baseSq = rng.intBetween(1, 5) * rng.intBetween(1, 5); // small perfect square
    const a1 = baseSq;
    const a2 = baseSq * sf * sf;
    return {
      id: 'scale-factor-from-areas',
      question: `Two similar shapes have areas ${a1} cm² and ${a2} cm². What is the scale factor from the smaller to the larger?`,
      correctAnswer: `${sf}`,
      distractors: dedup(`${sf}`, [
        `${sf * sf}`,
        `${sf + 1}`,
        `${sf - 1 < 1 ? sf + 2 : sf - 1}`,
      ]),
      explanation: `Area ratio = ${a2} ÷ ${a1} = ${sf * sf} = ${sf}². Scale factor = √${sf * sf} = ${sf}.`,
      difficulty: 'max-out',
      standard: '8.G.A.4',
    };
  },

  // Hypotenuse that is not a whole number (surd form)
  (rng: Rng) => {
    const [a, b, sumSq, result] = rng.pick(SURD_HYPS);
    const stem = rng.pick([
      `A right triangle has legs of ${a} cm and ${b} cm. What is the exact hypotenuse?`,
      `Find the hypotenuse of a right triangle with legs ${a} m and ${b} m. Leave your answer in surd form.`,
    ]);
    return {
      id: 'pythag-find-hyp-surd',
      question: stem,
      correctAnswer: result,
      distractors: dedup(result, [
        `${a + b}`,
        `√${sumSq + 4} ≈ ${Math.sqrt(sumSq + 4).toFixed(2)}`,
        `${a * b}`,
      ]),
      explanation: `c = √(${a}² + ${b}²) = √(${a * a} + ${b * b}) = ${result}.`,
      difficulty: 'max-out',
      standard: '8.G.B.7',
    };
  },

  // Distance between two points on a coordinate grid
  (rng: Rng) => {
    const [a, b, c] = rng.pick(COORD_TRIPLES);
    const x1 = rng.intBetween(-3, 3);
    const y1 = rng.intBetween(-3, 3);
    const sx = rng.pick([-1, 1]);
    const sy = rng.pick([-1, 1]);
    const x2 = x1 + sx * a;
    const y2 = y1 + sy * b;
    return {
      id: 'pythag-distance-coord',
      question: `What is the distance between points (${x1}, ${y1}) and (${x2}, ${y2})?`,
      correctAnswer: `${c} units`,
      distractors: dedup(`${c} units`, [
        `${a + b} units`,
        `${c + 2} units`,
        `${c - 1 < 1 ? c + 3 : c - 1} units`,
      ]),
      explanation: `Horizontal change = |${x2} − ${x1}| = ${a}. Vertical change = |${y2} − ${y1}| = ${b}. Distance = √(${a}² + ${b}²) = √${a * a + b * b} = ${c} units.`,
      difficulty: 'max-out',
      standard: '8.G.B.8',
    };
  },

  // Find original side given scale factor and image side
  (rng: Rng) => {
    const sf = rng.intBetween(2, 6);
    const sideSmall = rng.intBetween(3, 12);
    const sideLarge = sideSmall * sf;
    const stem = rng.pick([
      `Two similar shapes have scale factor 1:${sf} (small:large). The larger shape has a side of ${sideLarge} cm. What is the corresponding side of the smaller shape?`,
      `Shape B is ${sf} times larger than similar Shape A. Shape B has a side of ${sideLarge} cm. What is the corresponding side of Shape A?`,
    ]);
    return {
      id: 'similar-reverse-scale',
      question: stem,
      correctAnswer: `${sideSmall} cm`,
      distractors: dedup(`${sideSmall} cm`, [
        `${sideLarge - sf} cm`,
        `${sideSmall + 2} cm`,
        `${Math.round(sideLarge / (sf + 1))} cm`,
      ]),
      explanation: `Smaller side = larger side ÷ scale factor = ${sideLarge} ÷ ${sf} = ${sideSmall} cm.`,
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
