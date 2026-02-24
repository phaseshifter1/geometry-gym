import type { Rng } from '../rng';
import type { QuestionFactory } from '../types';

// Shape & Form: Polygons, Triangles, Symmetry
// Covers: 3.G.A.1, 4.G.A.2, 5.G.B.3, 6.G.A.1

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

// ─── Polygons ─────────────────────────────────────────────────────────────────

const polygonQuestions: QuestionFactory[] = [
  () => ({
    id: 'polygon-def',
    question: 'What is a polygon?',
    correctAnswer: 'A closed, flat shape made entirely of straight sides',
    distractors: [
      'Any flat shape, including circles',
      'A 3D solid with flat faces',
      'A shape with exactly four sides',
    ],
    explanation:
      'A polygon is a closed 2D figure with straight sides only. Circles are not polygons because they have a curved edge.',
    difficulty: 'warm-up',
    standard: '3.G.A.1',
  }),

  () => ({
    id: 'circle-not-polygon',
    question: 'Why is a circle NOT a polygon?',
    correctAnswer: 'It has no straight sides',
    distractors: [
      'It is not a closed shape',
      'It has too many sides',
      'It has no angles',
    ],
    explanation:
      'Polygons must be made of straight line segments. A circle has only a curved edge, so it does not qualify.',
    difficulty: 'warm-up',
    standard: '3.G.A.1',
  }),

  () => ({
    id: 'quadrilateral-def',
    question: 'A quadrilateral is any polygon with exactly ___ sides.',
    correctAnswer: '4',
    distractors: ['3', '5', '6'],
    explanation:
      'Quad means four. Squares, rectangles, parallelograms, trapezoids, and rhombuses are all quadrilaterals.',
    difficulty: 'warm-up',
    standard: '3.G.A.1',
  }),

  () => ({
    id: 'hexagon-sides',
    question: 'How many sides does a hexagon have?',
    correctAnswer: '6',
    distractors: ['5', '7', '8'],
    explanation:
      'Hex- means six. A hexagon has 6 sides and 6 angles. Honeycombs are a famous natural example.',
    difficulty: 'warm-up',
    standard: '3.G.A.1',
  }),

  () => ({
    id: 'regular-polygon-def',
    question: 'A regular polygon is one where ___.',
    correctAnswer: 'All sides are equal AND all angles are equal',
    distractors: [
      'All sides are equal but angles can differ',
      'All angles are equal but sides can differ',
      'It has more than 4 sides',
    ],
    explanation:
      'Regular polygons have both equal sides and equal angles. A regular triangle is equilateral; a regular quadrilateral is a square.',
    difficulty: 'main-set',
    standard: '5.G.B.3',
  }),

  () => ({
    id: 'quadrilateral-angles-sum',
    question: 'The four interior angles of any quadrilateral always add up to ___.',
    correctAnswer: '360°',
    distractors: ['180°', '270°', '540°'],
    explanation:
      'Any quadrilateral can be split into 2 triangles (each 180°). So 2 × 180° = 360°.',
    difficulty: 'main-set',
    standard: '5.G.B.3',
  }),

  () => ({
    id: 'parallelogram-def',
    question: 'A parallelogram is a quadrilateral where ___.',
    correctAnswer: 'Both pairs of opposite sides are parallel and equal',
    distractors: [
      'All four sides are equal',
      'All angles are right angles',
      'Only one pair of sides is parallel',
    ],
    explanation:
      'In a parallelogram, opposite sides are both parallel and equal. Rectangles, squares, and rhombuses are all special parallelograms.',
    difficulty: 'main-set',
    standard: '5.G.B.3',
  }),

  () => ({
    id: 'trapezoid-def',
    question: 'A trapezoid has exactly ___ pair(s) of parallel sides.',
    correctAnswer: '1',
    distractors: ['2', '0', '4'],
    explanation:
      'A trapezoid has exactly one pair of parallel sides called bases. The other two sides are not parallel.',
    difficulty: 'main-set',
    standard: '5.G.B.3',
  }),

  () => ({
    id: 'rhombus-def',
    question: 'A rhombus is a quadrilateral where ___.',
    correctAnswer: 'All four sides are equal in length',
    distractors: [
      'All four angles are equal',
      'Opposite sides are equal but not all four',
      'It has exactly one right angle',
    ],
    explanation:
      'A rhombus has four equal sides but its angles are not necessarily 90°. A square is a rhombus whose angles happen to be 90°.',
    difficulty: 'main-set',
    standard: '5.G.B.3',
  }),

  () => ({
    id: 'rectangle-vs-square',
    question: 'Every square is a rectangle, but not every rectangle is a square. Why?',
    correctAnswer: 'A rectangle only requires opposite sides to be equal, not all four sides',
    distractors: [
      'A rectangle has different angles than a square',
      'Squares have more sides than rectangles',
      'Rectangles are not polygons',
    ],
    explanation:
      'A rectangle needs four right angles and two pairs of equal opposite sides. A square adds that all four sides must be equal — making it a special rectangle.',
    difficulty: 'main-set',
    standard: '3.G.A.1',
  }),
];

// ─── Triangles ────────────────────────────────────────────────────────────────

const triangleQuestions: QuestionFactory[] = [
  () => ({
    id: 'equilateral-triangle',
    question: 'An equilateral triangle has all three sides equal. Each of its interior angles measures ___.',
    correctAnswer: '60°',
    distractors: ['90°', '45°', '120°'],
    explanation:
      'All three angles are equal and must sum to 180°. So each angle = 180° ÷ 3 = 60°.',
    difficulty: 'main-set',
    standard: '4.G.A.2',
  }),

  () => ({
    id: 'isosceles-def',
    question: 'An isosceles triangle has ___.',
    correctAnswer: 'Exactly 2 equal sides, and the angles opposite those sides are equal',
    distractors: [
      'All 3 sides equal',
      'No sides equal',
      'One right angle',
    ],
    explanation:
      'Isosceles means two equal sides. The base angles (opposite the equal sides) are always equal to each other.',
    difficulty: 'main-set',
    standard: '4.G.A.2',
  }),

  () => ({
    id: 'scalene-def',
    question: 'A scalene triangle has ___.',
    correctAnswer: 'All three sides different lengths (and all three angles different)',
    distractors: [
      'Two equal sides',
      'All three sides equal',
      'At least one right angle',
    ],
    explanation:
      'In a scalene triangle, no sides are the same length and no angles are equal.',
    difficulty: 'warm-up',
    standard: '4.G.A.2',
  }),

  () => ({
    id: 'right-triangle-def',
    question: 'A right triangle is a triangle that ___.',
    correctAnswer: 'Contains exactly one 90° angle',
    distractors: [
      'Has all angles equal to 60°',
      'Has two 90° angles',
      'Has three equal sides',
    ],
    explanation:
      'A right triangle has exactly one right angle (90°). The other two angles are acute and add up to 90°.',
    difficulty: 'warm-up',
    standard: '4.G.A.2',
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
      'Obtuse angles are each greater than 90°. Two of them exceed 180°, but all three angles must total exactly 180°. Impossible.',
    difficulty: 'max-out',
    standard: '8.G.A.5',
  }),
];

// ─── Symmetry ─────────────────────────────────────────────────────────────────

const symmetryQuestions: QuestionFactory[] = [
  () => ({
    id: 'line-symmetry-def',
    question: 'A shape has line symmetry (reflective symmetry) when ___.',
    correctAnswer: 'It can be folded along a line so both halves match exactly',
    distractors: [
      'It looks the same when rotated any amount',
      'It has equal side lengths',
      'It has more than 4 sides',
    ],
    explanation:
      'Line symmetry means a mirror line (axis of symmetry) divides the shape into two identical halves that are mirror images of each other.',
    difficulty: 'warm-up',
    standard: '4.G.A.3',
  }),

  () => ({
    id: 'square-lines-of-symmetry',
    question: 'How many lines of symmetry does a square have?',
    correctAnswer: '4',
    distractors: ['2', '1', '8'],
    explanation:
      'A square has 4 lines of symmetry: two through opposite corners (diagonals) and two through the midpoints of opposite sides.',
    difficulty: 'main-set',
    standard: '4.G.A.3',
  }),

  () => ({
    id: 'equilateral-triangle-symmetry',
    question: 'How many lines of symmetry does an equilateral triangle have?',
    correctAnswer: '3',
    distractors: ['1', '2', '6'],
    explanation:
      'Each line of symmetry in an equilateral triangle runs from one vertex to the midpoint of the opposite side — one per vertex, so 3 total.',
    difficulty: 'main-set',
    standard: '4.G.A.3',
  }),

  () => ({
    id: 'rotational-symmetry-def',
    question: 'A shape has rotational symmetry when ___.',
    correctAnswer: 'It looks exactly the same after being rotated by less than 360°',
    distractors: [
      'It can be folded in half',
      'All its sides are equal',
      'It has at least one line of symmetry',
    ],
    explanation:
      'Rotational symmetry means rotating the shape by some angle (less than a full turn) leaves it looking identical. A square has rotational symmetry at 90°, 180°, 270°, and 360°.',
    difficulty: 'main-set',
    standard: '4.G.A.3',
  }),

  () => ({
    id: 'rectangle-lines-of-symmetry',
    question: 'A non-square rectangle has ___ lines of symmetry.',
    correctAnswer: '2',
    distractors: ['4', '1', '0'],
    explanation:
      'A rectangle (that is not a square) has 2 lines of symmetry: one horizontal and one vertical through the midpoints of opposite sides. Its diagonals are NOT lines of symmetry.',
    difficulty: 'main-set',
    standard: '4.G.A.3',
  }),
];

// ─── Parameterized questions ───────────────────────────────────────────────────

const parameterizedQuestions: QuestionFactory[] = [
  // Interior angle sum of polygon
  (rng: Rng) => {
    const n = rng.intBetween(3, 8);
    const names: Record<number, string> = { 3: 'triangle', 4: 'quadrilateral', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon' };
    const correct = (n - 2) * 180;
    return {
      id: 'polygon-angle-sum',
      question: `What is the sum of the interior angles of a ${names[n]}?`,
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [
        `${(n - 1) * 180}°`,
        `${n * 90}°`,
        `${correct - 180}°`,
      ]),
      explanation: `Interior angle sum = (n − 2) × 180°. For n = ${n}: (${n} − 2) × 180° = ${n - 2} × 180° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '6.G.A.1',
    };
  },

  // Each angle in a regular polygon
  (rng: Rng) => {
    const n = rng.intBetween(3, 6);
    const names: Record<number, string> = { 3: 'equilateral triangle', 4: 'square', 5: 'regular pentagon', 6: 'regular hexagon' };
    const sum = (n - 2) * 180;
    const correct = sum / n;
    return {
      id: 'regular-polygon-each-angle',
      question: `Each interior angle of a ${names[n]} measures ___°.`,
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [
        `${correct + 30}°`,
        `${correct - 20}°`,
        `${360 / n}°`,
      ]),
      explanation: `Each angle = (n − 2) × 180° ÷ n = ${sum} ÷ ${n} = ${correct}°.`,
      difficulty: 'max-out',
      standard: '6.G.A.1',
    };
  },

  // Missing triangle angle
  (rng: Rng) => {
    const a = rng.intBetween(20, 80);
    const b = rng.intBetween(20, 180 - a - 20);
    const correct = 180 - a - b;
    return {
      id: 'triangle-missing-angle',
      question: `A triangle has two angles measuring ${a}° and ${b}°. What is the third angle?`,
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [
        `${180 - a}°`,
        `${360 - a - b}°`,
        `${correct + 10}°`,
      ]),
      explanation: `Triangle angles sum to 180°. Third angle = 180° − ${a}° − ${b}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '8.G.A.5',
    };
  },
];

export const shapeFormQuestions: QuestionFactory[] = [
  ...polygonQuestions,
  ...triangleQuestions,
  ...symmetryQuestions,
  ...parameterizedQuestions,
];
