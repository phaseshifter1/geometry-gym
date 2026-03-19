import type { Rng } from '../rng';
import type { QuestionFactory } from '../types';

// The Measurement Room: Area & Perimeter (2D)
// Covers: 3.MD.C.5, 3.MD.C.7, 3.MD.D.8, 6.G.A.1, 7.G.B.4

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

// ─── Static conceptual questions ──────────────────────────────────────────────

const staticQuestions: QuestionFactory[] = [
  () => ({
    id: 'area-def',
    question: 'Area measures ___.',
    correctAnswer: 'The amount of space inside a 2D shape',
    distractors: [
      'The distance around the outside of a shape',
      'The height of a shape',
      'The number of sides a shape has',
    ],
    explanation:
      'Area tells you how much flat surface a shape covers. Always measured in square units: cm², m², in², etc.',
    difficulty: 'warm-up',
    standard: '3.MD.C.5',
  }),

  () => ({
    id: 'perimeter-def',
    question: 'Perimeter measures ___.',
    correctAnswer: 'The total distance around the outside of a shape',
    distractors: [
      'The space inside a shape',
      'The height of a shape',
      'The area in square units',
    ],
    explanation:
      'Perimeter is the total length of a shape\'s boundary. Add up all the side lengths.',
    difficulty: 'warm-up',
    standard: '3.MD.D.8',
  }),

  () => ({
    id: 'area-rectangle-formula',
    question: 'The area of a rectangle is ___.',
    correctAnswer: 'A = length × width',
    distractors: [
      'A = 2 × (length + width)',
      'A = length + width',
      'A = length²',
    ],
    explanation:
      'Multiply the two dimensions: A = l × w. The result is in square units.',
    difficulty: 'warm-up',
    standard: '3.MD.C.7',
  }),

  () => ({
    id: 'perimeter-rectangle-formula',
    question: 'The perimeter of a rectangle with length l and width w is ___.',
    correctAnswer: 'P = 2l + 2w',
    distractors: [
      'P = l × w',
      'P = l + w',
      'P = 4 × (l + w)',
    ],
    explanation:
      'A rectangle has two lengths and two widths. P = l + w + l + w = 2l + 2w.',
    difficulty: 'warm-up',
    standard: '3.MD.D.8',
  }),

  () => ({
    id: 'area-square-formula',
    question: 'The area of a square with side length s is ___.',
    correctAnswer: 'A = s²',
    distractors: ['A = 4s', 'A = 2s', 'A = s³'],
    explanation:
      'Area = side × side = s². "Square units" literally comes from squaring a length.',
    difficulty: 'warm-up',
    standard: '3.MD.C.7',
  }),

  () => ({
    id: 'area-triangle-formula',
    question: 'The area of a triangle with base b and height h is ___.',
    correctAnswer: 'A = ½ × b × h',
    distractors: ['A = b × h', 'A = b + h', 'A = ¼ × b × h'],
    explanation:
      'A triangle is exactly half of a parallelogram with the same base and height. So A = ½bh.',
    difficulty: 'main-set',
    standard: '6.G.A.1',
  }),

  () => ({
    id: 'area-parallelogram-formula',
    question: 'The area of a parallelogram with base b and perpendicular height h is ___.',
    correctAnswer: 'A = b × h',
    distractors: ['A = ½ × b × h', 'A = 2 × (b + h)', 'A = b²'],
    explanation:
      'A parallelogram can be rearranged into a rectangle with the same base and height. A = b × h. Height must be perpendicular to the base.',
    difficulty: 'main-set',
    standard: '6.G.A.1',
  }),

  () => ({
    id: 'area-circle-formula',
    question: 'The area of a circle with radius r is ___.',
    correctAnswer: 'A = πr²',
    distractors: ['A = 2πr', 'A = πd', 'A = πr'],
    explanation:
      'A = πr². The circumference formula (2πr) gives the perimeter, not the area.',
    difficulty: 'main-set',
    standard: '7.G.B.4',
  }),

  () => ({
    id: 'circumference-formula',
    question: 'The circumference of a circle with radius r is ___.',
    correctAnswer: 'C = 2πr',
    distractors: ['C = πr²', 'C = πr', 'C = πd²'],
    explanation:
      'C = 2πr, or equivalently πd where d = 2r. Note: πr² is the area, not circumference.',
    difficulty: 'main-set',
    standard: '7.G.B.4',
  }),

  () => ({
    id: 'area-units',
    question: 'If side lengths are measured in metres, area is measured in ___.',
    correctAnswer: 'Square metres (m²)',
    distractors: ['Metres (m)', 'Cubic metres (m³)', 'Centimetres (cm)'],
    explanation:
      'Area is always in square units — you multiply two lengths, so units get squared. Volume uses cubic units.',
    difficulty: 'warm-up',
    standard: '3.MD.C.5',
  }),

  () => ({
    id: 'same-perimeter-diff-area',
    question: 'Two rectangles can have the same perimeter but different areas. True or false?',
    correctAnswer: 'True',
    distractors: [
      'False — same perimeter always means same area',
      'Only true for squares',
      'Only true for triangles',
    ],
    explanation:
      'A 1×9 rectangle and a 3×7 rectangle both have perimeter 20, but areas of 9 and 21. Perimeter and area are independent.',
    difficulty: 'max-out',
    standard: '3.MD.D.8',
  }),

  () => ({
    id: 'largest-area-fixed-perimeter',
    question: 'Of all rectangles with the same perimeter, which one has the greatest area?',
    correctAnswer: 'The square',
    distractors: [
      'The tallest, narrowest rectangle',
      'The widest, shortest rectangle',
      'They all have the same area',
    ],
    explanation:
      'Among all rectangles with a fixed perimeter, the square encloses the maximum area. This is a classic result called the isoperimetric inequality for rectangles.',
    difficulty: 'max-out',
    standard: '3.MD.D.8',
  }),
];

// ─── Parameterized questions ───────────────────────────────────────────────────

const parameterizedQuestions: QuestionFactory[] = [
  // Area of rectangle
  (rng: Rng) => {
    const l = rng.intBetween(2, 15);
    const w = rng.intBetween(2, 12);
    const correct = l * w;
    return {
      id: 'area-rect-calc',
      question: `What is the area of a rectangle with length ${l} cm and width ${w} cm?`,
      correctAnswer: `${correct} cm²`,
      distractors: dedup(`${correct} cm²`, [
        `${2 * (l + w)} cm²`,
        `${correct + w} cm²`,
        `${(l + 1) * w} cm²`,
      ]),
      explanation: `Area = length × width = ${l} × ${w} = ${correct} cm².`,
      difficulty: 'warm-up',
      standard: '3.MD.C.7',
    };
  },

  // Perimeter of rectangle
  (rng: Rng) => {
    const l = rng.intBetween(3, 14);
    const w = rng.intBetween(2, 10);
    const correct = 2 * l + 2 * w;
    return {
      id: 'perimeter-rect-calc',
      question: `What is the perimeter of a rectangle with length ${l} cm and width ${w} cm?`,
      correctAnswer: `${correct} cm`,
      distractors: dedup(`${correct} cm`, [
        `${l * w} cm`,
        `${l + w} cm`,
        `${correct + 4} cm`,
      ]),
      explanation: `Perimeter = 2l + 2w = 2(${l}) + 2(${w}) = ${2 * l} + ${2 * w} = ${correct} cm.`,
      difficulty: 'warm-up',
      standard: '3.MD.D.8',
    };
  },

  // Area of square
  (rng: Rng) => {
    const s = rng.intBetween(2, 12);
    const correct = s * s;
    return {
      id: 'area-square-calc',
      question: `What is the area of a square with side length ${s} m?`,
      correctAnswer: `${correct} m²`,
      distractors: dedup(`${correct} m²`, [
        `${4 * s} m²`,
        `${correct + s} m²`,
        `${(s + 1) * (s + 1)} m²`,
      ]),
      explanation: `Area = s² = ${s}² = ${correct} m².`,
      difficulty: 'warm-up',
      standard: '3.MD.C.7',
    };
  },

  // Area of triangle
  (rng: Rng) => {
    const b = rng.intBetween(2, 8) * 2; // even, ensures whole number answer
    const h = rng.intBetween(3, 12);
    const correct = (b * h) / 2;
    return {
      id: 'area-triangle-calc',
      question: `What is the area of a triangle with base ${b} cm and height ${h} cm?`,
      correctAnswer: `${correct} cm²`,
      distractors: dedup(`${correct} cm²`, [
        `${b * h} cm²`,
        `${b + h} cm²`,
        `${correct + h} cm²`,
      ]),
      explanation: `Area = ½ × base × height = ½ × ${b} × ${h} = ${correct} cm².`,
      difficulty: 'main-set',
      standard: '6.G.A.1',
    };
  },

  // Missing side from area
  (rng: Rng) => {
    const w = rng.intBetween(3, 10);
    const l = rng.intBetween(3, 12);
    const area = w * l;
    return {
      id: 'missing-side-area',
      question: `A rectangle has an area of ${area} cm² and a width of ${w} cm. What is its length?`,
      correctAnswer: `${l} cm`,
      distractors: dedup(`${l} cm`, [
        `${area - w} cm`,
        `${area * w} cm`,
        `${l + 3} cm`,
      ]),
      explanation: `Length = area ÷ width = ${area} ÷ ${w} = ${l} cm.`,
      difficulty: 'main-set',
      standard: '3.MD.C.7',
    };
  },

  // Circumference
  (rng: Rng) => {
    const r = rng.intBetween(2, 9);
    const c = (2 * 3.14 * r).toFixed(2);
    return {
      id: 'circumference-calc',
      question: `What is the circumference of a circle with radius ${r} cm? (Use π ≈ 3.14)`,
      correctAnswer: `≈ ${c} cm`,
      distractors: dedup(`≈ ${c} cm`, [
        `≈ ${(3.14 * r * r).toFixed(2)} cm`,
        `≈ ${(3.14 * r).toFixed(2)} cm`,
        `≈ ${(2 * 3.14 * (r + 1)).toFixed(2)} cm`,
      ]),
      explanation: `C = 2πr ≈ 2 × 3.14 × ${r} = ${c} cm. (πr² = ${(3.14 * r * r).toFixed(2)} cm² is the area.)`,
      difficulty: 'main-set',
      standard: '7.G.B.4',
      diagram: { type: 'circle', radius: r, showRadius: true },
    };
  },

  // Area of circle
  (rng: Rng) => {
    const r = rng.intBetween(2, 7);
    const area = (3.14 * r * r).toFixed(2);
    return {
      id: 'area-circle-calc',
      question: `What is the area of a circle with radius ${r} cm? (Use π ≈ 3.14)`,
      correctAnswer: `≈ ${area} cm²`,
      distractors: dedup(`≈ ${area} cm²`, [
        `≈ ${(2 * 3.14 * r).toFixed(2)} cm²`,
        `≈ ${(3.14 * r).toFixed(2)} cm²`,
        `≈ ${(3.14 * (r + 1) * (r + 1)).toFixed(2)} cm²`,
      ]),
      explanation: `A = πr² ≈ 3.14 × ${r}² = 3.14 × ${r * r} = ${area} cm².`,
      difficulty: 'main-set',
      standard: '7.G.B.4',
      diagram: { type: 'circle', radius: r, showRadius: true },
    };
  },
];

export const measurementQuestions: QuestionFactory[] = [
  ...staticQuestions,
  ...parameterizedQuestions,
];
