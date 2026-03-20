import type { Rng } from '../rng';
import type { QuestionFactory } from '../types';
import { SHAPE_OBJECTS, LOCATIONS } from '../scenarios';

// Shape & Form: Polygons, Triangles, Symmetry
// Covers: 3.G.A.1, 4.G.A.2, 5.G.B.3, 6.G.A.1, 4.G.A.3, 8.G.A.5

function dedup(
  correct: string,
  ds: [string, string, string],
): [string, string, string] {
  const seen = new Set([correct]);
  return ds.map((d) => {
    if (!seen.has(d)) { seen.add(d); return d; }
    return d + '†';
  }) as [string, string, string];
}

// ─── Polygon name/sides lookup ────────────────────────────────────────────────

const POLY_NAMES: Record<number, string> = {
  3: 'triangle', 4: 'quadrilateral', 5: 'pentagon',
  6: 'hexagon', 7: 'heptagon', 8: 'octagon',
  9: 'nonagon', 10: 'decagon', 11: 'hendecagon', 12: 'dodecagon',
};

// ─── Symmetry data ────────────────────────────────────────────────────────────

const LINE_SYMMETRY_DATA = [
  { shape: 'equilateral triangle', lines: 3, hint: 'one from each vertex to the midpoint of the opposite side' },
  { shape: 'square', lines: 4, hint: 'two through opposite vertices and two through midpoints of opposite sides' },
  { shape: 'non-square rectangle', lines: 2, hint: 'one horizontal, one vertical — the diagonals are NOT lines of symmetry' },
  { shape: 'regular pentagon', lines: 5, hint: 'one from each vertex to the midpoint of the opposite side' },
  { shape: 'regular hexagon', lines: 6, hint: 'three through opposite vertices and three through midpoints of opposite sides' },
  { shape: 'non-square rhombus', lines: 2, hint: 'the two diagonals are the lines of symmetry' },
  { shape: 'isosceles (non-equilateral) triangle', lines: 1, hint: 'from the apex vertex to the midpoint of the base only' },
  { shape: 'scalene triangle', lines: 0, hint: 'no two sides or angles are equal, so no fold produces matching halves' },
  { shape: 'non-rectangle parallelogram', lines: 0, hint: 'opposite sides are equal but no straight fold maps one half onto the other' },
  { shape: 'kite', lines: 1, hint: 'the line connecting the two vertex angles (the "spine")' },
  { shape: 'regular octagon', lines: 8, hint: 'four through opposite vertices and four through midpoints of opposite sides' },
];

const ROTATIONAL_DATA = [
  { shape: 'equilateral triangle', order: 3, angle: 120 },
  { shape: 'square', order: 4, angle: 90 },
  { shape: 'non-square rectangle', order: 2, angle: 180 },
  { shape: 'regular pentagon', order: 5, angle: 72 },
  { shape: 'regular hexagon', order: 6, angle: 60 },
  { shape: 'non-square rhombus', order: 2, angle: 180 },
  { shape: 'non-rectangle parallelogram', order: 2, angle: 180 },
  { shape: 'regular octagon', order: 8, angle: 45 },
  { shape: 'scalene triangle', order: 1, angle: 360 },
  { shape: 'kite', order: 1, angle: 360 },
  { shape: 'regular decagon', order: 10, angle: 36 },
];

// ─── Polygon factories ────────────────────────────────────────────────────────

const polygonQuestions: QuestionFactory[] = [

  // Conceptual: what is a polygon — varied phrasings
  (rng: Rng) => {
    const questions = [
      'Which of the following best describes a polygon?',
      `A shape is being used as a tile ${rng.pick(LOCATIONS)}. Which property makes it a polygon?`,
      'What must be true for a shape to be called a polygon?',
    ];
    return {
      id: 'polygon-def',
      question: rng.pick(questions),
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
    };
  },

  // Conceptual: why circle is not a polygon
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

  // Parameterized: name a polygon from its side count (5–10 sides)
  (rng: Rng) => {
    const n = rng.intBetween(5, 10);
    const name = POLY_NAMES[n];
    const obj = rng.pick(SHAPE_OBJECTS[name] ?? ['this shape']);
    const above = POLY_NAMES[n + 1] ?? 'hendecagon';
    const below = POLY_NAMES[n - 1];
    const questions = [
      `A polygon with ${n} sides is called a ___`,
      `${obj.charAt(0).toUpperCase() + obj.slice(1)} is shaped like a polygon with ${n} sides. What is it called?`,
      `What is the name of a polygon that has exactly ${n} sides?`,
    ];
    return {
      id: 'polygon-name-from-sides',
      question: rng.pick(questions),
      correctAnswer: name,
      distractors: dedup(name, [below, above, n === 7 ? 'octagon' : 'heptagon']),
      explanation: `A polygon with ${n} sides is a ${name}. Remembering prefixes helps: penta- (5), hexa- (6), hepta- (7), octa- (8), nona- (9), deca- (10).`,
      difficulty: 'warm-up',
      standard: '3.G.A.1',
    };
  },

  // Parameterized: how many sides does a named polygon have? (5–10)
  (rng: Rng) => {
    const n = rng.intBetween(5, 10);
    const name = POLY_NAMES[n];
    const obj = rng.pick(SHAPE_OBJECTS[name] ?? ['this shape']);
    const questions = [
      `How many sides does a ${name} have?`,
      `${obj.charAt(0).toUpperCase() + obj.slice(1)} has the shape of a ${name}. How many sides does it have?`,
      `A ${name}-shaped tile is used ${rng.pick(LOCATIONS)}. How many sides does the tile have?`,
    ];
    return {
      id: 'polygon-sides-count',
      question: rng.pick(questions),
      correctAnswer: `${n}`,
      distractors: dedup(`${n}`, [`${n - 1}`, `${n + 1}`, `${n + 2}`]),
      explanation: `A ${name} has ${n} sides. Prefix: ${name.slice(0, 4)}- tells you the count.`,
      difficulty: 'warm-up',
      standard: '3.G.A.1',
    };
  },

  // Conceptual: regular polygon definition
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

  // Conceptual: parallelogram
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

  // Conceptual: trapezoid
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

  // Conceptual: rhombus
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

  // Conceptual: rectangle vs square
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

  // Parameterized: interior angle sum of polygon (3–12 sides) with scenarios
  (rng: Rng) => {
    const n = rng.intBetween(3, 12);
    const name = POLY_NAMES[n] ?? `${n}-gon`;
    const correct = (n - 2) * 180;
    const scenarioObj = SHAPE_OBJECTS[name] ? rng.pick(SHAPE_OBJECTS[name]) : null;
    const questions = [
      `What is the sum of the interior angles of a ${name}?`,
      scenarioObj
        ? `${scenarioObj.charAt(0).toUpperCase() + scenarioObj.slice(1)}s are used as tiles ${rng.pick(LOCATIONS)}. Each tile is a ${name}. What do the interior angles add up to?`
        : `A regular ${name} is used in a design. What is the sum of its interior angles?`,
      `Using the formula (n − 2) × 180°, find the interior angle sum of a ${name}.`,
    ];
    return {
      id: 'polygon-angle-sum',
      question: rng.pick(questions),
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [
        `${(n - 1) * 180}°`,
        `${n * 90}°`,
        `${correct + 180}°`,
      ]),
      explanation: `Interior angle sum = (n − 2) × 180°. For a ${name} (n = ${n}): (${n} − 2) × 180° = ${n - 2} × 180° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '6.G.A.1',
    };
  },

  // Parameterized: each angle in a regular polygon (3–10 sides)
  (rng: Rng) => {
    const n = rng.intBetween(3, 10);
    const name = POLY_NAMES[n] ?? `${n}-gon`;
    const sum = (n - 2) * 180;
    const correct = sum / n;
    const obj = SHAPE_OBJECTS[name] ? rng.pick(SHAPE_OBJECTS[name]) : `a regular ${name}`;
    const questions = [
      `Each interior angle of a regular ${name} measures ___°.`,
      `${obj.charAt(0).toUpperCase() + obj.slice(1)} is a regular ${name}. What is the measure of each of its interior angles?`,
      `A regular ${name} tile has equal angles. How large is each one?`,
    ];
    return {
      id: 'regular-polygon-each-angle',
      question: rng.pick(questions),
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

  // Parameterized: exterior angle of a regular polygon
  (rng: Rng) => {
    // Use side counts where 360/n is a whole number
    const validN = [3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24];
    const n = rng.pick(validN.filter(v => v <= 12));
    const name = POLY_NAMES[n] ?? `${n}-gon`;
    const exterior = 360 / n;
    const interior = (n - 2) * 180 / n;
    return {
      id: 'regular-polygon-exterior-angle',
      question: `What is the measure of each exterior angle of a regular ${name}?`,
      correctAnswer: `${exterior}°`,
      distractors: dedup(`${exterior}°`, [
        `${interior}°`,
        `${exterior + 15}°`,
        `${360 / (n + 1)}°`,
      ]),
      explanation: `Each exterior angle of a regular polygon = 360° ÷ n. For a ${name}: 360° ÷ ${n} = ${exterior}°. Note: exterior + interior = 180°.`,
      difficulty: 'max-out',
      standard: '6.G.A.1',
    };
  },

  // Parameterized: find the 4th angle of a quadrilateral
  (rng: Rng) => {
    const a = rng.intBetween(55, 130);
    const b = rng.intBetween(55, Math.min(130, 360 - a - 110));
    const c = rng.intBetween(55, Math.min(130, 360 - a - b - 55));
    const correct = 360 - a - b - c;
    const obj = rng.pick(SHAPE_OBJECTS.rectangle);
    const questions = [
      `A quadrilateral has angles of ${a}°, ${b}°, and ${c}°. What is the fourth angle?`,
      `The corners of ${obj} measure ${a}°, ${b}°, and ${c}°. What is the missing fourth angle?`,
      `Three angles of a quadrilateral are ${a}°, ${b}°, and ${c}°. Find the fourth.`,
    ];
    return {
      id: 'quadrilateral-fourth-angle',
      question: rng.pick(questions),
      correctAnswer: `${correct}°`,
      distractors: dedup(`${correct}°`, [
        `${180 - a}°`,
        `${correct + 10}°`,
        `${360 - a - b}°`,
      ]),
      explanation: `Quadrilateral angles sum to 360°. Fourth angle = 360° − ${a}° − ${b}° − ${c}° = ${correct}°.`,
      difficulty: 'main-set',
      standard: '5.G.B.3',
    };
  },
];

// ─── Triangle factories ───────────────────────────────────────────────────────

const triangleQuestions: QuestionFactory[] = [

  // Conceptual: equilateral triangle angles
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

  // Conceptual: isosceles
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

  // Conceptual: scalene
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

  // Conceptual: right triangle
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

  // Conceptual: can a triangle have two obtuse angles?
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

  // Parameterized: missing triangle angle with real-world scenarios
  (rng: Rng) => {
    const a = rng.intBetween(15, 85);
    const b = rng.intBetween(15, 180 - a - 15);
    const correct = 180 - a - b;
    const obj = rng.pick(SHAPE_OBJECTS.triangle);
    const questions = [
      `A triangle has two angles measuring ${a}° and ${b}°. What is the third angle?`,
      `Two angles of ${obj} measure ${a}° and ${b}°. What is the missing angle?`,
      `In a triangular piece of a design, two angles are ${a}° and ${b}°. Find the third angle.`,
      `Two angles of a triangle measure ${a}° and ${b}°. What must the third angle be?`,
    ];
    return {
      id: 'triangle-missing-angle',
      question: rng.pick(questions),
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

  // Parameterized: classify triangle by its angles (acute / right / obtuse)
  (rng: Rng) => {
    const type = rng.pick(['right', 'obtuse', 'acute'] as const);
    let a: number, b: number, c: number;
    if (type === 'right') {
      a = 90;
      b = rng.intBetween(10, 80);
      c = 90 - b;
    } else if (type === 'obtuse') {
      a = rng.intBetween(91, 150);
      b = rng.intBetween(10, 180 - a - 10);
      c = 180 - a - b;
    } else {
      a = rng.intBetween(10, 89);
      b = rng.intBetween(10, Math.min(89, 180 - a - 10));
      c = 180 - a - b;
      // Ensure all acute
      if (c >= 90) { a = 60; b = 60; c = 60; }
    }
    const correctLabel =
      type === 'right' ? 'Right triangle'
      : type === 'obtuse' ? 'Obtuse triangle'
      : 'Acute triangle';
    return {
      id: 'triangle-type-by-angles',
      question: `A triangle has angles of ${a}°, ${b}°, and ${c}°. What type of triangle is it?`,
      correctAnswer: correctLabel,
      distractors: dedup(correctLabel, ['Right triangle', 'Obtuse triangle', 'Acute triangle'].filter(l => l !== correctLabel) as [string, string, string]),
      explanation:
        type === 'right'
          ? `One angle is exactly 90° — that makes it a right triangle.`
          : type === 'obtuse'
          ? `${a}° is greater than 90°, so this is an obtuse triangle.`
          : `All three angles (${a}°, ${b}°, ${c}°) are less than 90° — that makes it an acute triangle.`,
      difficulty: 'main-set',
      standard: '4.G.A.2',
    };
  },

  // Parameterized: classify triangle by side lengths
  (rng: Rng) => {
    const type = rng.pick(['equilateral', 'isosceles', 'scalene'] as const);
    let sides: [number, number, number];
    if (type === 'equilateral') {
      const s = rng.intBetween(3, 20);
      sides = [s, s, s];
    } else if (type === 'isosceles') {
      const s = rng.intBetween(3, 20);
      let other = rng.intBetween(2, 20);
      while (other === s) other = rng.intBetween(2, 20);
      sides = [s, s, other];
    } else {
      const a = rng.intBetween(3, 15);
      let b = rng.intBetween(3, 15);
      while (b === a) b = rng.intBetween(3, 15);
      let c = rng.intBetween(3, 15);
      while (c === a || c === b) c = rng.intBetween(3, 15);
      sides = [a, b, c];
    }
    const obj = rng.pick(SHAPE_OBJECTS.triangle);
    const questions = [
      `A triangle has sides of ${sides[0]} cm, ${sides[1]} cm, and ${sides[2]} cm. What type of triangle is it?`,
      `The sides of ${obj} measure ${sides[0]} cm, ${sides[1]} cm, and ${sides[2]} cm. Classify the triangle by its sides.`,
    ];
    return {
      id: 'triangle-classify-by-sides',
      question: rng.pick(questions),
      correctAnswer: `${type.charAt(0).toUpperCase() + type.slice(1)} triangle`,
      distractors: dedup(
        `${type.charAt(0).toUpperCase() + type.slice(1)} triangle`,
        ['Equilateral triangle', 'Isosceles triangle', 'Scalene triangle']
          .filter(l => l.toLowerCase() !== `${type} triangle`) as [string, string, string],
      ),
      explanation:
        type === 'equilateral'
          ? `All three sides (${sides[0]} cm) are equal — equilateral triangle.`
          : type === 'isosceles'
          ? `Two sides are equal (${sides[0]} cm and ${sides[1]} cm) — isosceles triangle.`
          : `All three sides (${sides[0]}, ${sides[1]}, ${sides[2]} cm) are different — scalene triangle.`,
      difficulty: 'main-set',
      standard: '4.G.A.2',
    };
  },

  // Parameterized: isosceles triangle — find base angles from apex
  (rng: Rng) => {
    const apex = rng.intBetween(20, 160) % 2 === 0
      ? rng.intBetween(10, 80) * 2
      : rng.intBetween(10, 79) * 2; // ensure even so base = whole number
    const evenApex = apex % 2 === 0 ? apex : apex - 1;
    const base = (180 - evenApex) / 2;
    const questions = [
      `An isosceles triangle has an apex angle of ${evenApex}°. What is each base angle?`,
      `In an isosceles triangle, the angle at the top measures ${evenApex}°. What are the two equal base angles?`,
      `In an isosceles triangle, the angle between the two equal sides is ${evenApex}°. Find each base angle.`,
    ];
    return {
      id: 'isosceles-base-angle',
      question: rng.pick(questions),
      correctAnswer: `${base}°`,
      distractors: dedup(`${base}°`, [
        `${base + 10}°`,
        `${180 - evenApex}°`,
        `${base - 10}°`,
      ]),
      explanation: `Base angles = (180° − ${evenApex}°) ÷ 2 = ${180 - evenApex}° ÷ 2 = ${base}°.`,
      difficulty: 'main-set',
      standard: '4.G.A.2',
    };
  },

  // Parameterized: isosceles triangle — find apex from base angle
  (rng: Rng) => {
    const base = rng.intBetween(10, 80);
    const apex = 180 - 2 * base;
    const questions = [
      `An isosceles triangle has base angles of ${base}° each. What is the apex angle?`,
      `In an isosceles triangle, both base angles measure ${base}°. What is the angle at the top?`,
      `In an isosceles triangle, each of the two equal angles is ${base}°. Find the third angle.`,
    ];
    return {
      id: 'isosceles-apex-angle',
      question: rng.pick(questions),
      correctAnswer: `${apex}°`,
      distractors: dedup(`${apex}°`, [
        `${apex + 10}°`,
        `${2 * base}°`,
        `${apex - 10}°`,
      ]),
      explanation: `Apex = 180° − 2 × ${base}° = 180° − ${2 * base}° = ${apex}°.`,
      difficulty: 'main-set',
      standard: '4.G.A.2',
    };
  },
];

// ─── Symmetry factories ───────────────────────────────────────────────────────

const symmetryQuestions: QuestionFactory[] = [

  // Conceptual: line symmetry definition
  (rng: Rng) => {
    const questions = [
      'A shape has line symmetry (reflective symmetry) when ___.',
      `A shape is being tested for symmetry ${rng.pick(LOCATIONS)}. It has line symmetry when ___.`,
    ];
    return {
      id: 'line-symmetry-def',
      question: rng.pick(questions),
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
    };
  },

  // Conceptual: rotational symmetry definition
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

  // Parameterized: lines of symmetry across many shapes
  (rng: Rng) => {
    const entry = rng.pick(LINE_SYMMETRY_DATA);
    const { shape, lines, hint } = entry;
    const questions = [
      `How many lines of symmetry does a ${shape} have?`,
      `A ${shape} is folded to test for symmetry. How many lines of symmetry does it have?`,
      `A ${shape} is being tested for symmetry ${rng.pick(LOCATIONS)}. How many lines of symmetry does it have?`,
    ];
    // Generate plausible wrong answers
    const wrong1 = lines === 0 ? 1 : lines === 1 ? 0 : lines - 1;
    const wrong2 = lines + 1;
    const wrong3 = lines === 0 ? 2 : lines * 2;
    return {
      id: 'lines-of-symmetry',
      question: rng.pick(questions),
      correctAnswer: `${lines}`,
      distractors: dedup(`${lines}`, [`${wrong1}`, `${wrong2}`, `${wrong3}`]),
      explanation: `A ${shape} has ${lines} line${lines !== 1 ? 's' : ''} of symmetry. ${hint}.`,
      difficulty: 'main-set',
      standard: '4.G.A.3',
    };
  },

  // Parameterized: rotational symmetry order
  (rng: Rng) => {
    const entry = rng.pick(ROTATIONAL_DATA);
    const { shape, order, angle } = entry;
    const questions = [
      `What is the order of rotational symmetry of a ${shape}?`,
      `A ${shape} is spun a full 360°. How many times does it look identical to its starting position?`,
      `A ${shape} is rotated 360°. How many positions look identical? (This is its order of rotational symmetry.)`,
    ];
    const wrong1 = order === 1 ? 2 : order - 1;
    const wrong2 = order + 1;
    const wrong3 = order === 1 ? 4 : order + 2;
    return {
      id: 'rotational-symmetry-order',
      question: rng.pick(questions),
      correctAnswer: `${order}`,
      distractors: dedup(`${order}`, [`${wrong1}`, `${wrong2}`, `${wrong3}`]),
      explanation:
        order === 1
          ? `A ${shape} has rotational symmetry of order 1 — it only looks the same after a full 360° rotation.`
          : `A ${shape} looks identical every ${angle}°. That happens ${order} times in a full 360° rotation — so its order is ${order}.`,
      difficulty: 'main-set',
      standard: '4.G.A.3',
    };
  },
];

// ─── Export ───────────────────────────────────────────────────────────────────

export const shapeFormQuestions: QuestionFactory[] = [
  ...polygonQuestions,
  ...triangleQuestions,
  ...symmetryQuestions,
];
