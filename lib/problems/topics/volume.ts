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
    question: "If a shape's dimensions are in centimetres, its volume is measured in ___.",
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
      "A cube: 6 square faces, 12 straight edges (where faces meet), 8 corners (vertices). Euler's formula confirms: F + V − E = 6 + 8 − 12 = 2.",
    difficulty: 'main-set',
    standard: '5.MD.C.3',
  }),
];

// ─── Parameterized questions ───────────────────────────────────────────────────

// Perfect cube side lengths for the "find side from volume" factory
const CUBE_SIDES = [2, 3, 4, 5, 6, 7];

const parameterizedQuestions: QuestionFactory[] = [
  // Volume of rectangular prism
  (rng: Rng) => {
    const l = rng.intBetween(2, 15);
    const w = rng.intBetween(2, 12);
    const h = rng.intBetween(2, 10);
    const correct = l * w * h;
    const stem = rng.pick([
      `What is the volume of a rectangular prism with length ${l} cm, width ${w} cm, and height ${h} cm?`,
      `A storage box is ${l} cm long, ${w} cm wide, and ${h} cm tall. What is its volume?`,
      `Find the volume of a rectangular prism that is ${l} m × ${w} m × ${h} m.`,
      `A rectangular tank measures ${l} cm × ${w} cm × ${h} cm. What volume does it hold?`,
    ]);
    return {
      id: 'volume-rect-prism-calc',
      question: stem,
      correctAnswer: `${correct} cm³`,
      distractors: dedup(`${correct} cm³`, [
        `${2 * (l * w + l * h + w * h)} cm³`,
        `${l * w + h} cm³`,
        `${(l + 1) * w * h} cm³`,
      ]),
      explanation: `Volume = l × w × h = ${l} × ${w} × ${h} = ${correct} cm³.`,
      difficulty: 'warm-up',
      standard: '5.MD.C.5',
    };
  },

  // Surface area of rectangular prism
  (rng: Rng) => {
    const l = rng.intBetween(2, 12);
    const w = rng.intBetween(2, 10);
    const h = rng.intBetween(2, 8);
    const correct = 2 * (l * w + l * h + w * h);
    const stem = rng.pick([
      `What is the surface area of a rectangular prism with length ${l} cm, width ${w} cm, and height ${h} cm?`,
      `A closed box measures ${l} cm × ${w} cm × ${h} cm. What is its total surface area?`,
      `Find the surface area of a rectangular prism: length ${l} m, width ${w} m, height ${h} m.`,
    ]);
    return {
      id: 'sa-rect-prism-calc',
      question: stem,
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
    const s = rng.intBetween(2, 12);
    const correct = s * s * s;
    const stem = rng.pick([
      `What is the volume of a cube with side length ${s} cm?`,
      `A cubic container has sides of ${s} cm. What is its volume?`,
      `Find the volume of a cube whose edges are each ${s} m long.`,
      `A cube-shaped box has side length ${s} cm. How much can it hold?`,
    ]);
    return {
      id: 'volume-cube-calc',
      question: stem,
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

  // Surface area of cube
  (rng: Rng) => {
    const s = rng.intBetween(2, 10);
    const correct = 6 * s * s;
    const stem = rng.pick([
      `What is the surface area of a cube with side length ${s} cm?`,
      `A cube has edges of ${s} cm. What is its total surface area?`,
      `Find the surface area of a cube with sides of ${s} m.`,
    ]);
    return {
      id: 'sa-cube-calc',
      question: stem,
      correctAnswer: `${correct} cm²`,
      distractors: dedup(`${correct} cm²`, [
        `${s * s * s} cm²`,
        `${4 * s * s} cm²`,
        `${correct + s} cm²`,
      ]),
      explanation: `SA = 6 × s² = 6 × ${s}² = 6 × ${s * s} = ${correct} cm². A cube has 6 identical square faces.`,
      difficulty: 'main-set',
      standard: '6.G.A.4',
    };
  },

  // Volume of cylinder
  (rng: Rng) => {
    const r = rng.intBetween(2, 10);
    const h = rng.intBetween(2, 15);
    const vol = (3.14 * r * r * h).toFixed(2);
    const stem = rng.pick([
      `What is the volume of a cylinder with radius ${r} cm and height ${h} cm? (Use π ≈ 3.14)`,
      `A cylindrical can has radius ${r} cm and height ${h} cm. What is its volume? (Use π ≈ 3.14)`,
      `Find the volume of a cylinder: radius ${r} m, height ${h} m. (Use π ≈ 3.14)`,
      `A cylindrical water tower has a base radius of ${r} m and height of ${h} m. What volume does it hold? (Use π ≈ 3.14)`,
    ]);
    return {
      id: 'volume-cylinder-calc',
      question: stem,
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

  // Surface area of cylinder
  (rng: Rng) => {
    const r = rng.intBetween(2, 8);
    const h = rng.intBetween(2, 12);
    const correct = (2 * 3.14 * r * r + 2 * 3.14 * r * h).toFixed(2);
    const lateral = (2 * 3.14 * r * h).toFixed(2);
    const bases = (2 * 3.14 * r * r).toFixed(2);
    const stem = rng.pick([
      `What is the total surface area of a cylinder with radius ${r} cm and height ${h} cm? (Use π ≈ 3.14)`,
      `A closed cylindrical container has radius ${r} cm and height ${h} cm. What is its surface area? (Use π ≈ 3.14)`,
    ]);
    return {
      id: 'sa-cylinder-calc',
      question: stem,
      correctAnswer: `≈ ${correct} cm²`,
      distractors: dedup(`≈ ${correct} cm²`, [
        `≈ ${(3.14 * r * r * h).toFixed(2)} cm²`,
        `≈ ${lateral} cm²`,
        `≈ ${bases} cm²`,
      ]),
      explanation: `SA = 2πr² + 2πrh ≈ 2(3.14)(${r})² + 2(3.14)(${r})(${h}) = ${bases} + ${lateral} = ${correct} cm². Two circular bases + lateral surface.`,
      difficulty: 'max-out',
      standard: '7.G.B.6',
    };
  },

  // Missing dimension from volume
  (rng: Rng) => {
    const w = rng.intBetween(2, 8);
    const h = rng.intBetween(2, 8);
    const l = rng.intBetween(3, 12);
    const vol = l * w * h;
    const stem = rng.pick([
      `A rectangular box has volume ${vol} cm³, width ${w} cm, and height ${h} cm. What is its length?`,
      `A fish tank has a volume of ${vol} cm³. It is ${w} cm wide and ${h} cm tall. How long is it?`,
      `Volume = ${vol} cm³, width = ${w} cm, height = ${h} cm. What is the length?`,
    ]);
    return {
      id: 'missing-dim-volume',
      question: stem,
      correctAnswer: `${l} cm`,
      distractors: dedup(`${l} cm`, [
        `${vol - w - h} cm`,
        `${Math.round(vol / (w + h))} cm`,
        `${l + 2} cm`,
      ]),
      explanation: `Length = volume ÷ (width × height) = ${vol} ÷ (${w} × ${h}) = ${vol} ÷ ${w * h} = ${l} cm.`,
      difficulty: 'main-set',
      standard: '5.MD.C.5',
    };
  },

  // Missing width from volume
  (rng: Rng) => {
    const l = rng.intBetween(3, 12);
    const w = rng.intBetween(2, 8);
    const h = rng.intBetween(2, 8);
    const vol = l * w * h;
    return {
      id: 'missing-width-volume',
      question: `A rectangular box has volume ${vol} cm³, length ${l} cm, and height ${h} cm. What is its width?`,
      correctAnswer: `${w} cm`,
      distractors: dedup(`${w} cm`, [
        `${vol - l - h} cm`,
        `${Math.round(vol / (l + h))} cm`,
        `${w + 3} cm`,
      ]),
      explanation: `Width = volume ÷ (length × height) = ${vol} ÷ (${l} × ${h}) = ${vol} ÷ ${l * h} = ${w} cm.`,
      difficulty: 'main-set',
      standard: '5.MD.C.5',
    };
  },

  // Volume of triangular prism
  (rng: Rng) => {
    const base = rng.intBetween(2, 8) * 2; // even → integer triangle area
    const triH = rng.intBetween(2, 12);
    const prismL = rng.intBetween(2, 10);
    const correct = (base * triH / 2) * prismL;
    return {
      id: 'volume-triangular-prism',
      question: `A triangular prism has a triangular cross-section with base ${base} cm and height ${triH} cm, and a length of ${prismL} cm. What is its volume?`,
      correctAnswer: `${correct} cm³`,
      distractors: dedup(`${correct} cm³`, [
        `${base * triH * prismL} cm³`,
        `${base * triH / 2 + prismL} cm³`,
        `${correct + base} cm³`,
      ]),
      explanation: `V = (triangle area) × length = (½ × ${base} × ${triH}) × ${prismL} = ${base * triH / 2} × ${prismL} = ${correct} cm³.`,
      difficulty: 'main-set',
      standard: '6.G.A.2',
    };
  },

  // Unit cubes fill a box
  (rng: Rng) => {
    const l = rng.intBetween(2, 8);
    const w = rng.intBetween(2, 7);
    const h = rng.intBetween(2, 6);
    const correct = l * w * h;
    const stem = rng.pick([
      `How many 1 cm³ unit cubes are needed to fill a rectangular box that is ${l} cm × ${w} cm × ${h} cm?`,
      `A box is ${l} cm long, ${w} cm wide, and ${h} cm tall. How many 1 cm³ cubes fit inside?`,
      `A rectangular container measures ${l} cm × ${w} cm × ${h} cm. How many 1 cm³ unit cubes fill it completely?`,
    ]);
    return {
      id: 'unit-cubes-fill',
      question: stem,
      correctAnswer: `${correct} unit cubes`,
      distractors: dedup(`${correct} unit cubes`, [
        `${2 * (l * w + l * h + w * h)} unit cubes`,
        `${l * w + h} unit cubes`,
        `${correct + l} unit cubes`,
      ]),
      explanation: `Each unit cube takes up 1 cm³, so the number of cubes = volume = ${l} × ${w} × ${h} = ${correct}.`,
      difficulty: 'warm-up',
      standard: '5.MD.C.4',
    };
  },

  // Missing height of cylinder given volume
  (rng: Rng) => {
    const r = rng.intBetween(2, 6);
    const h = rng.intBetween(2, 10);
    const vol = (3.14 * r * r * h).toFixed(2);
    return {
      id: 'missing-height-cylinder',
      question: `A cylinder has a volume of ≈ ${vol} cm³ and a base radius of ${r} cm. What is its height? (Use π ≈ 3.14)`,
      correctAnswer: `${h} cm`,
      distractors: dedup(`${h} cm`, [
        `${h + 2} cm`,
        `${h - 1 < 1 ? h + 3 : h - 1} cm`,
        `${Math.round(h * 1.5)} cm`,
      ]),
      explanation: `h = V ÷ (πr²) ≈ ${vol} ÷ (3.14 × ${r}²) = ${vol} ÷ ${(3.14 * r * r).toFixed(2)} ≈ ${h} cm.`,
      difficulty: 'max-out',
      standard: '7.G.B.6',
    };
  },

  // Find side length of cube from volume
  (rng: Rng) => {
    const s = rng.pick(CUBE_SIDES);
    const vol = s * s * s;
    const stem = rng.pick([
      `A cube has a volume of ${vol} cm³. What is the length of one side?`,
      `The volume of a cube is ${vol} m³. What is its side length?`,
      `A cubic container holds ${vol} cm³. What is the length of each edge?`,
    ]);
    return {
      id: 'volume-cube-find-side',
      question: stem,
      correctAnswer: `${s} cm`,
      distractors: dedup(`${s} cm`, [
        `${s + 1} cm`,
        `${Math.round(vol / 6)} cm`,
        `${s * 2} cm`,
      ]),
      explanation: `V = s³ → s = ∛${vol} = ${s} cm. Check: ${s}³ = ${vol} ✓`,
      difficulty: 'max-out',
      standard: '5.MD.C.5',
    };
  },

  // Volume of square pyramid
  (rng: Rng) => {
    const s = rng.intBetween(2, 8);
    const h = rng.intBetween(1, 4) * 3; // multiple of 3 → integer result
    const correct = (s * s * h) / 3;
    const stem = rng.pick([
      `A square pyramid has a square base with side ${s} cm and a height of ${h} cm. What is its volume?`,
      `What is the volume of a pyramid with a ${s} cm × ${s} cm square base and height ${h} cm?`,
    ]);
    return {
      id: 'volume-pyramid-calc',
      question: stem,
      correctAnswer: `${correct} cm³`,
      distractors: dedup(`${correct} cm³`, [
        `${s * s * h} cm³`,
        `${Math.round(s * s * h / 2)} cm³`,
        `${correct + s} cm³`,
      ]),
      explanation: `V = ⅓ × base area × height = ⅓ × ${s}² × ${h} = ⅓ × ${s * s} × ${h} = ${correct} cm³.`,
      difficulty: 'max-out',
      standard: '7.G.B.6',
    };
  },

  // Surface area from face area (cube)
  (rng: Rng) => {
    const s = rng.intBetween(2, 10);
    const faceArea = s * s;
    const correct = 6 * faceArea;
    return {
      id: 'sa-cube-from-face',
      question: `One face of a cube has an area of ${faceArea} cm². What is the total surface area of the cube?`,
      correctAnswer: `${correct} cm²`,
      distractors: dedup(`${correct} cm²`, [
        `${4 * faceArea} cm²`,
        `${5 * faceArea} cm²`,
        `${s * s * s} cm²`,
      ]),
      explanation: `A cube has 6 identical faces. SA = 6 × ${faceArea} = ${correct} cm².`,
      difficulty: 'main-set',
      standard: '6.G.A.4',
    };
  },

  // Wrapping paper (SA real-world context)
  (rng: Rng) => {
    const l = rng.intBetween(3, 14);
    const w = rng.intBetween(2, 10);
    const h = rng.intBetween(2, 8);
    const correct = 2 * (l * w + l * h + w * h);
    const stem = rng.pick([
      `A gift box measures ${l} cm × ${w} cm × ${h} cm. How much wrapping paper (in cm²) is needed to cover all its faces?`,
      `A closed cardboard box is ${l} cm long, ${w} cm wide, and ${h} cm tall. What area of cardboard was used?`,
    ]);
    return {
      id: 'sa-rect-context',
      question: stem,
      correctAnswer: `${correct} cm²`,
      distractors: dedup(`${correct} cm²`, [
        `${l * w * h} cm²`,
        `${correct - 2 * l * w} cm²`,
        `${2 * (l + w + h)} cm²`,
      ]),
      explanation: `SA = 2(lw + lh + wh) = 2(${l * w} + ${l * h} + ${w * h}) = 2 × ${l * w + l * h + w * h} = ${correct} cm².`,
      difficulty: 'main-set',
      standard: '6.G.A.4',
    };
  },

  // Effect of doubling one dimension on volume
  (rng: Rng) => {
    const l = rng.intBetween(3, 10);
    const w = rng.intBetween(2, 8);
    const h = rng.intBetween(2, 8);
    const vOld = l * w * h;
    const vNew = 2 * l * w * h;
    return {
      id: 'volume-length-doubled',
      question: `A rectangular box is ${l} cm × ${w} cm × ${h} cm. If its length is doubled to ${2 * l} cm (width and height unchanged), what is the new volume?`,
      correctAnswer: `${vNew} cm³`,
      distractors: dedup(`${vNew} cm³`, [
        `${vOld} cm³`,
        `${4 * vOld} cm³`,
        `${vOld + l * w * h} cm³`,
      ]),
      explanation: `New volume = ${2 * l} × ${w} × ${h} = ${vNew} cm³. Doubling one dimension doubles the volume: ${vOld} × 2 = ${vNew} cm³.`,
      difficulty: 'max-out',
      standard: '5.MD.C.5',
    };
  },
];

export const volumeQuestions: QuestionFactory[] = [
  ...staticQuestions,
  ...parameterizedQuestions,
];
