import type { Rng } from '../rng';
import type { QuestionFactory } from '../types';

// Heavy Lifts: Volume & Surface Area (3D shapes)
// Covers: 5.MD.C.3, 5.MD.C.4, 5.MD.C.5, 6.G.A.2, 6.G.A.4, 7.G.B.6

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
    id: 'volume-def',
    question: 'Volume measures ___.',
    correctAnswer: 'The amount of space inside a 3D object',
    distractors: [
      'The total area of all the faces of a 3D object',
      'The distance around the outside of a 3D object',
      'The weight of a 3D object',
    ],
    explanation:
      'Volume tells you how much space a 3D shape occupies or how much it can hold. It is measured in cubic units: cm³, m³, in³, etc.',
    difficulty: 'warm-up',
    standard: '5.MD.C.3',
  }),

  () => ({
    id: 'surface-area-def',
    question: 'Surface area is ___.',
    correctAnswer: 'The total area of all the faces (surfaces) of a 3D shape',
    distractors: [
      'The space inside a 3D shape',
      'The distance around the base of a 3D shape',
      'The area of just the largest face',
    ],
    explanation:
      'Surface area is the total area you would need to wrap all the outside faces of a 3D shape. Measured in square units (cm², m²).',
    difficulty: 'warm-up',
    standard: '6.G.A.4',
  }),

  () => ({
    id: 'volume-units',
    question: 'If a shape\'s dimensions are in centimetres, its volume is measured in ___.',
    correctAnswer: 'Cubic centimetres (cm³)',
    distractors: [
      'Square centimetres (cm²)',
      'Centimetres (cm)',
      'Metres cubed (m³)',
    ],
    explanation:
      'Volume multiplies three lengths together (l × w × h), so the unit gets cubed. Area uses square units; perimeter uses plain units.',
    difficulty: 'warm-up',
    standard: '5.MD.C.3',
  }),

  () => ({
    id: 'volume-rectangular-prism-formula',
    question: 'The volume of a rectangular prism (cuboid) with length l, width w, and height h is ___.',
    correctAnswer: 'V = l × w × h',
    distractors: [
      'V = 2(lw + lh + wh)',
      'V = l + w + h',
      'V = l²h',
    ],
    explanation:
      'Volume = base area × height = (l × w) × h = lwh. Think of stacking layers of unit cubes.',
    difficulty: 'warm-up',
    standard: '5.MD.C.5',
  }),

  () => ({
    id: 'surface-area-cube-formula',
    question: 'A cube has 6 identical square faces. Its surface area with side length s is ___.',
    correctAnswer: 'SA = 6s²',
    distractors: [
      'SA = s³',
      'SA = 4s²',
      'SA = 12s',
    ],
    explanation:
      'Each face of a cube is a square with area s². There are 6 faces, so SA = 6 × s² = 6s².',
    difficulty: 'main-set',
    standard: '6.G.A.4',
  }),

  () => ({
    id: 'volume-cylinder-formula',
    question: 'The volume of a cylinder with base radius r and height h is ___.',
    correctAnswer: 'V = πr²h',
    distractors: [
      'V = 2πrh',
      'V = πrh',
      'V = πr²',
    ],
    explanation:
      'The base of a cylinder is a circle with area πr². Multiply by height h: V = πr²h.',
    difficulty: 'main-set',
    standard: '7.G.B.6',
  }),

  () => ({
    id: 'volume-pyramid-formula',
    question: 'The volume of a pyramid with base area B and height h is ___.',
    correctAnswer: 'V = ⅓ × B × h',
    distractors: [
      'V = B × h',
      'V = ½ × B × h',
      'V = ¼ × B × h',
    ],
    explanation:
      'A pyramid holds exactly one-third the volume of a prism with the same base and height. V = ⅓Bh.',
    difficulty: 'max-out',
    standard: '7.G.B.6',
  }),

  () => ({
    id: 'cube-vs-rectangular-prism',
    question: 'A cube is a special type of rectangular prism. What makes it special?',
    correctAnswer: 'All three dimensions (length, width, height) are equal',
    distractors: [
      'It has only 4 faces',
      'Its base is a triangle',
      'Its faces are all different sizes',
    ],
    explanation:
      'A cube is a rectangular prism where l = w = h. All 6 faces are identical squares.',
    difficulty: 'warm-up',
    standard: '5.MD.C.3',
  }),

  () => ({
    id: 'net-def',
    question: 'A net of a 3D shape is ___.',
    correctAnswer: 'A flat pattern that can be folded up to make the 3D shape',
    distractors: [
      'A 3D model of the shape',
      'A formula for calculating surface area',
      'A cross-section through the middle of the shape',
    ],
    explanation:
      'Nets are flat representations of 3D shapes. Folding a net along its edges produces the 3D figure. They are useful for calculating surface area.',
    difficulty: 'main-set',
    standard: '6.G.A.4',
  }),

  () => ({
    id: 'faces-edges-vertices-cube',
    question: 'A cube has ___ faces, ___ edges, and ___ vertices.',
    correctAnswer: '6 faces, 12 edges, 8 vertices',
    distractors: [
      '4 faces, 6 edges, 4 vertices',
      '6 faces, 8 edges, 12 vertices',
      '8 faces, 12 edges, 6 vertices',
    ],
    explanation:
      'A cube: 6 square faces, 12 straight edges (where faces meet), 8 corners (vertices). Euler\'s formula confirms: F + V − E = 6 + 8 − 12 = 2.',
    difficulty: 'main-set',
    standard: '5.MD.C.3',
  }),
];

// ─── Parameterized questions ───────────────────────────────────────────────────

const parameterizedQuestions: QuestionFactory[] = [
  // Volume of rectangular prism
  (rng: Rng) => {
    const l = rng.intBetween(2, 10);
    const w = rng.intBetween(2, 8);
    const h = rng.intBetween(2, 7);
    const correct = l * w * h;
    return {
      id: 'volume-rect-prism-calc',
      question: `What is the volume of a rectangular prism with length ${l} cm, width ${w} cm, and height ${h} cm?`,
      correctAnswer: `${correct} cm³`,
      distractors: dedup(`${correct} cm³`, [
        `${l * w + h} cm³`,
        `${2 * (l * w + l * h + w * h)} cm³`,
        `${(l + 1) * w * h} cm³`,
      ]),
      explanation: `Volume = l × w × h = ${l} × ${w} × ${h} = ${correct} cm³.`,
      difficulty: 'warm-up',
      standard: '5.MD.C.5',
    };
  },

  // Surface area of rectangular prism
  (rng: Rng) => {
    const l = rng.intBetween(2, 8);
    const w = rng.intBetween(2, 6);
    const h = rng.intBetween(2, 6);
    const correct = 2 * (l * w + l * h + w * h);
    return {
      id: 'sa-rect-prism-calc',
      question: `What is the surface area of a rectangular prism with length ${l} cm, width ${w} cm, and height ${h} cm?`,
      correctAnswer: `${correct} cm²`,
      distractors: dedup(`${correct} cm²`, [
        `${l * w * h} cm²`,
        `${correct - 2 * w * h} cm²`,
        `${correct + 2 * l} cm²`,
      ]),
      explanation: `SA = 2(lw + lh + wh) = 2(${l * w} + ${l * h} + ${w * h}) = 2 × ${l * w + l * h + w * h} = ${correct} cm².`,
      difficulty: 'main-set',
      standard: '6.G.A.4',
    };
  },

  // Volume of cube
  (rng: Rng) => {
    const s = rng.intBetween(2, 8);
    const correct = s * s * s;
    return {
      id: 'volume-cube-calc',
      question: `What is the volume of a cube with side length ${s} cm?`,
      correctAnswer: `${correct} cm³`,
      distractors: dedup(`${correct} cm³`, [
        `${6 * s * s} cm³`,
        `${s * s} cm³`,
        `${(s + 1) * (s + 1) * (s + 1)} cm³`,
      ]),
      explanation: `Volume = s³ = ${s}³ = ${correct} cm³.`,
      difficulty: 'warm-up',
      standard: '5.MD.C.5',
    };
  },

  // Volume of cylinder
  (rng: Rng) => {
    const r = rng.intBetween(2, 6);
    const h = rng.intBetween(3, 10);
    const vol = (3.14 * r * r * h).toFixed(2);
    return {
      id: 'volume-cylinder-calc',
      question: `What is the volume of a cylinder with radius ${r} cm and height ${h} cm? (Use π ≈ 3.14)`,
      correctAnswer: `≈ ${vol} cm³`,
      distractors: dedup(`≈ ${vol} cm³`, [
        `≈ ${(2 * 3.14 * r * h).toFixed(2)} cm³`,
        `≈ ${(3.14 * r * h).toFixed(2)} cm³`,
        `≈ ${(3.14 * (r + 1) * (r + 1) * h).toFixed(2)} cm³`,
      ]),
      explanation: `V = πr²h ≈ 3.14 × ${r}² × ${h} = 3.14 × ${r * r} × ${h} = ${vol} cm³.`,
      difficulty: 'main-set',
      standard: '7.G.B.6',
    };
  },

  // Missing dimension from volume
  (rng: Rng) => {
    const w = rng.intBetween(2, 6);
    const h = rng.intBetween(2, 6);
    const l = rng.intBetween(3, 10);
    const vol = l * w * h;
    return {
      id: 'missing-dim-volume',
      question: `A rectangular box has volume ${vol} cm³, width ${w} cm, and height ${h} cm. What is its length?`,
      correctAnswer: `${l} cm`,
      distractors: dedup(`${l} cm`, [
        `${vol - w - h} cm`,
        `${vol / (w + h)} cm`,
        `${l + 2} cm`,
      ]),
      explanation: `Length = volume ÷ (width × height) = ${vol} ÷ (${w} × ${h}) = ${vol} ÷ ${w * h} = ${l} cm.`,
      difficulty: 'main-set',
      standard: '5.MD.C.5',
    };
  },
];

export const volumeQuestions: QuestionFactory[] = [
  ...staticQuestions,
  ...parameterizedQuestions,
];
