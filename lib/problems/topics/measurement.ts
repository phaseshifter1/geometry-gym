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
      "Perimeter is the total length of a shape's boundary. Add up all the side lengths.",
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
    diagram: { type: 'rectangle' as const, width: 5, height: 3, labelDimensions: true, widthLabel: 'l', heightLabel: 'w' },
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
    diagram: { type: 'rectangle' as const, width: 5, height: 3, labelDimensions: true, widthLabel: 'l', heightLabel: 'w' },
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
    id: 'area-trapezoid-formula',
    question: 'The area of a trapezoid with parallel sides a and b, and height h is ___.',
    correctAnswer: 'A = ½(a + b) × h',
    distractors: ['A = (a + b) × h', 'A = a × b × h', 'A = ½ × a × h'],
    explanation:
      'Average the two parallel sides, then multiply by the height: A = ½(a + b)h.',
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
    const l = rng.intBetween(2, 25);
    const w = rng.intBetween(2, 20);
    const correct = l * w;
    const stem = rng.pick([
      `What is the area of a rectangle with length ${l} cm and width ${w} cm?`,
      `A rectangular panel measures ${l} m long and ${w} m wide. What is its area?`,
      `Find the area of a rectangle that is ${l} cm by ${w} cm.`,
      `A rectangular garden is ${l} m long and ${w} m wide. What is the area?`,
    ]);
    return {
      id: 'area-rect-calc',
      question: stem,
      correctAnswer: `${correct} cm²`,
      distractors: dedup(`${correct} cm²`, [
        `${2 * (l + w)} cm²`,
        `${l + w} cm²`,
        `${(l + 1) * (w + 1)} cm²`,
      ]),
      explanation: `Area = length × width = ${l} × ${w} = ${correct} cm².`,
      difficulty: 'warm-up',
      standard: '3.MD.C.7',
      diagram: { type: 'rectangle' as const, width: l, height: w, labelDimensions: true },
    };
  },

  // Perimeter of rectangle
  (rng: Rng) => {
    const l = rng.intBetween(3, 22);
    const w = rng.intBetween(2, 18);
    const correct = 2 * l + 2 * w;
    const stem = rng.pick([
      `What is the perimeter of a rectangle with length ${l} cm and width ${w} cm?`,
      `A rectangular field is ${l} m long and ${w} m wide. What is its perimeter?`,
      `Find the perimeter of a rectangle measuring ${l} cm by ${w} cm.`,
      `A fence is needed around a rectangle that is ${l} m × ${w} m. What total length of fencing is required?`,
    ]);
    return {
      id: 'perimeter-rect-calc',
      question: stem,
      correctAnswer: `${correct} cm`,
      distractors: dedup(`${correct} cm`, [
        `${l * w} cm`,
        `${l + w} cm`,
        `${2 * l + w} cm`,
      ]),
      explanation: `Perimeter = 2l + 2w = 2(${l}) + 2(${w}) = ${2 * l} + ${2 * w} = ${correct} cm.`,
      difficulty: 'warm-up',
      standard: '3.MD.D.8',
      diagram: { type: 'rectangle' as const, width: l, height: w, labelDimensions: true },
    };
  },

  // Area of square
  (rng: Rng) => {
    const s = rng.intBetween(2, 18);
    const correct = s * s;
    const stem = rng.pick([
      `What is the area of a square with side length ${s} m?`,
      `A square tile has sides of ${s} cm. What is its area?`,
      `Find the area of a square whose sides are ${s} cm long.`,
      `A square courtyard has sides measuring ${s} m. What is its area?`,
    ]);
    return {
      id: 'area-square-calc',
      question: stem,
      correctAnswer: `${correct} m²`,
      distractors: dedup(`${correct} m²`, [
        `${4 * s} m²`,
        `${correct + s} m²`,
        `${(s + 1) * (s + 1)} m²`,
      ]),
      explanation: `Area = s² = ${s}² = ${correct} m².`,
      difficulty: 'warm-up',
      standard: '3.MD.C.7',
      diagram: { type: 'rectangle' as const, width: s, height: s, labelDimensions: true },
    };
  },

  // Perimeter of square
  (rng: Rng) => {
    const s = rng.intBetween(3, 22);
    const correct = 4 * s;
    const stem = rng.pick([
      `What is the perimeter of a square with side length ${s} cm?`,
      `A square garden has sides of ${s} m. What is its perimeter?`,
      `Each side of a square is ${s} cm. What is the total perimeter?`,
      `A square frame has sides of ${s} cm. How long is the total border?`,
    ]);
    return {
      id: 'perimeter-square-calc',
      question: stem,
      correctAnswer: `${correct} cm`,
      distractors: dedup(`${correct} cm`, [
        `${s * s} cm`,
        `${2 * s} cm`,
        `${3 * s} cm`,
      ]),
      explanation: `Perimeter = 4 × side = 4 × ${s} = ${correct} cm.`,
      difficulty: 'warm-up',
      standard: '3.MD.D.8',
      diagram: { type: 'rectangle' as const, width: s, height: s, labelDimensions: true },
    };
  },

  // Perimeter of triangle
  (rng: Rng) => {
    const a = rng.intBetween(3, 13);
    const b = rng.intBetween(3, 13);
    const cMin = Math.abs(a - b) + 1;
    const cMax = Math.min(a + b - 1, 15);
    const c = rng.intBetween(cMin, cMax);
    const correct = a + b + c;
    const stem = rng.pick([
      `A triangle has sides of ${a} cm, ${b} cm, and ${c} cm. What is its perimeter?`,
      `What is the perimeter of a triangle with side lengths ${a} m, ${b} m, and ${c} m?`,
      `Find the perimeter of a triangle whose sides measure ${a} cm, ${b} cm, and ${c} cm.`,
    ]);
    return {
      id: 'perimeter-triangle-calc',
      question: stem,
      correctAnswer: `${correct} cm`,
      distractors: dedup(`${correct} cm`, [
        `${a + b} cm`,
        `${correct + 3} cm`,
        `${Math.max(a, b, c) * 3} cm`,
      ]),
      explanation: `Perimeter = ${a} + ${b} + ${c} = ${correct} cm.`,
      difficulty: 'warm-up',
      standard: '3.MD.D.8',
      diagram: { type: 'triangle-perimeter' as const, sides: [c, b, a] as [number, number, number] },
    };
  },

  // Area of triangle
  (rng: Rng) => {
    const b = rng.intBetween(2, 20) * 2; // even, ensures whole number answer
    const h = rng.intBetween(2, 18);
    const correct = (b * h) / 2;
    const stem = rng.pick([
      `What is the area of a triangle with base ${b} cm and height ${h} cm?`,
      `A triangular sail has a base of ${b} m and a height of ${h} m. What is its area?`,
      `Find the area of a triangle with base ${b} cm and perpendicular height ${h} cm.`,
      `A triangular plot of land has a base of ${b} m and height of ${h} m. What is its area?`,
    ]);
    return {
      id: 'area-triangle-calc',
      question: stem,
      correctAnswer: `${correct} cm²`,
      distractors: dedup(`${correct} cm²`, [
        `${b * h} cm²`,
        `${b + h} cm²`,
        `${correct + b} cm²`,
      ]),
      explanation: `Area = ½ × base × height = ½ × ${b} × ${h} = ${correct} cm².`,
      difficulty: 'main-set',
      standard: '6.G.A.1',
      diagram: { type: 'triangle-area' as const, base: b, height: h },
    };
  },

  // Area of parallelogram
  (rng: Rng) => {
    const b = rng.intBetween(3, 20);
    const h = rng.intBetween(2, 15);
    const correct = b * h;
    const stem = rng.pick([
      `What is the area of a parallelogram with base ${b} cm and perpendicular height ${h} cm?`,
      `A parallelogram has a base of ${b} m and a perpendicular height of ${h} m. What is its area?`,
      `Find the area of a parallelogram with base ${b} cm and height ${h} cm.`,
    ]);
    return {
      id: 'area-parallelogram-calc',
      question: stem,
      correctAnswer: `${correct} cm²`,
      distractors: dedup(`${correct} cm²`, [
        `${Math.floor(b * h / 2)} cm²`,
        `${2 * (b + h)} cm²`,
        `${(b + 1) * h} cm²`,
      ]),
      explanation: `Area = base × perpendicular height = ${b} × ${h} = ${correct} cm². Remember: height must be perpendicular to the base.`,
      difficulty: 'main-set',
      standard: '6.G.A.1',
      diagram: { type: 'parallelogram' as const, base: b, height: h },
    };
  },

  // Area of trapezoid
  (rng: Rng) => {
    const a = rng.intBetween(3, 12);
    const b = rng.intBetween(a + 2, a + 12);
    const h = rng.intBetween(1, 6) * 2; // even height → integer result
    const correct = ((a + b) * h) / 2;
    const stem = rng.pick([
      `A trapezoid has parallel sides of ${a} cm and ${b} cm, and a height of ${h} cm. What is its area?`,
      `What is the area of a trapezoid with parallel sides ${a} m and ${b} m, and height ${h} m?`,
      `Find the area of a trapezoid. Its two parallel sides are ${a} cm and ${b} cm, and its height is ${h} cm.`,
    ]);
    return {
      id: 'area-trapezoid-calc',
      question: stem,
      correctAnswer: `${correct} cm²`,
      distractors: dedup(`${correct} cm²`, [
        `${(a + b) * h} cm²`,
        `${a * b} cm²`,
        `${correct + h} cm²`,
      ]),
      explanation: `Area = ½(a + b) × h = ½(${a} + ${b}) × ${h} = ½ × ${a + b} × ${h} = ${correct} cm².`,
      difficulty: 'main-set',
      standard: '6.G.A.1',
      diagram: { type: 'trapezoid' as const, topBase: a, bottomBase: b, height: h },
    };
  },

  // Missing side from area
  (rng: Rng) => {
    const w = rng.intBetween(3, 15);
    const l = rng.intBetween(4, 22);
    const area = w * l;
    const stem = rng.pick([
      `A rectangle has an area of ${area} cm² and a width of ${w} cm. What is its length?`,
      `A rectangular rug covers ${area} m² and is ${w} m wide. How long is it?`,
      `A rectangular floor has area ${area} cm² and width ${w} cm. What is its length?`,
    ]);
    return {
      id: 'missing-side-area',
      question: stem,
      correctAnswer: `${l} cm`,
      distractors: dedup(`${l} cm`, [
        `${area - w} cm`,
        `${area * w} cm`,
        `${l + 3} cm`,
      ]),
      explanation: `Length = area ÷ width = ${area} ÷ ${w} = ${l} cm.`,
      difficulty: 'main-set',
      standard: '3.MD.C.7',
      diagram: { type: 'rectangle' as const, width: l, height: w, labelDimensions: true, unknownDimension: 'width' as const },
    };
  },

  // Missing side from perimeter
  (rng: Rng) => {
    const l = rng.intBetween(4, 20);
    const w = rng.intBetween(2, 14);
    const p = 2 * l + 2 * w;
    const stem = rng.pick([
      `A rectangle has a perimeter of ${p} cm and a width of ${w} cm. What is its length?`,
      `The perimeter of a rectangle is ${p} m. If the width is ${w} m, what is the length?`,
      `A rectangular room has perimeter ${p} m. One side is ${w} m. How long is the other side?`,
    ]);
    return {
      id: 'missing-side-perimeter',
      question: stem,
      correctAnswer: `${l} cm`,
      distractors: dedup(`${l} cm`, [
        `${p - w} cm`,
        `${Math.floor(p / 2)} cm`,
        `${l + 2} cm`,
      ]),
      explanation: `P = 2l + 2w → ${p} = 2l + ${2 * w} → 2l = ${p - 2 * w} → l = ${l} cm.`,
      difficulty: 'main-set',
      standard: '3.MD.D.8',
      diagram: { type: 'rectangle' as const, width: l, height: w, labelDimensions: true, unknownDimension: 'width' as const },
    };
  },

  // Circumference from radius
  (rng: Rng) => {
    const r = rng.intBetween(2, 15);
    const c = (2 * 3.14 * r).toFixed(2);
    const stem = rng.pick([
      `What is the circumference of a circle with radius ${r} cm? (Use π ≈ 3.14)`,
      `A circular track has a radius of ${r} m. What is its circumference? (Use π ≈ 3.14)`,
      `Find the circumference of a circle with radius ${r} cm. (Use π ≈ 3.14)`,
      `A circular pool has a radius of ${r} m. What is the distance around its edge? (Use π ≈ 3.14)`,
    ]);
    return {
      id: 'circumference-calc',
      question: stem,
      correctAnswer: `≈ ${c} cm`,
      distractors: dedup(`≈ ${c} cm`, [
        `≈ ${(3.14 * r * r).toFixed(2)} cm`,
        `≈ ${(3.14 * r).toFixed(2)} cm`,
        `≈ ${(2 * 3.14 * (r + 1)).toFixed(2)} cm`,
      ]),
      explanation: `C = 2πr ≈ 2 × 3.14 × ${r} = ${c} cm. (Note: πr² = ${(3.14 * r * r).toFixed(2)} cm² is the area.)`,
      difficulty: 'main-set',
      standard: '7.G.B.4',
      diagram: { type: 'circle', radius: r, showRadius: true },
    };
  },

  // Circumference from diameter
  (rng: Rng) => {
    const d = rng.intBetween(2, 12) * 2; // even → integer radius
    const c = (3.14 * d).toFixed(2);
    const stem = rng.pick([
      `What is the circumference of a circle with diameter ${d} cm? (Use π ≈ 3.14)`,
      `A circular pond has a diameter of ${d} m. What is its circumference? (Use π ≈ 3.14)`,
      `A wheel has a diameter of ${d} cm. What is the distance around its rim? (Use π ≈ 3.14)`,
    ]);
    return {
      id: 'circumference-from-diameter',
      question: stem,
      correctAnswer: `≈ ${c} cm`,
      distractors: dedup(`≈ ${c} cm`, [
        `≈ ${(3.14 * d * d).toFixed(2)} cm`,
        `≈ ${(2 * 3.14 * d).toFixed(2)} cm`,
        `≈ ${(3.14 * (d - 2)).toFixed(2)} cm`,
      ]),
      explanation: `C = πd ≈ 3.14 × ${d} = ${c} cm. (Diameter = 2 × radius, so C = πd.)`,
      difficulty: 'main-set',
      standard: '7.G.B.4',
      diagram: { type: 'circle' as const, radius: d / 2, showRadius: false, showDiameter: true },
    };
  },

  // Area of circle from radius
  (rng: Rng) => {
    const r = rng.intBetween(2, 12);
    const area = (3.14 * r * r).toFixed(2);
    const stem = rng.pick([
      `What is the area of a circle with radius ${r} cm? (Use π ≈ 3.14)`,
      `A circular window has a radius of ${r} cm. What is its area? (Use π ≈ 3.14)`,
      `Find the area of a circle with radius ${r} m. (Use π ≈ 3.14)`,
      `A circular lawn has a radius of ${r} m. What is its area? (Use π ≈ 3.14)`,
    ]);
    return {
      id: 'area-circle-calc',
      question: stem,
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

  // Area of circle from diameter
  (rng: Rng) => {
    const d = rng.intBetween(2, 10) * 2; // even → integer radius
    const r = d / 2;
    const area = (3.14 * r * r).toFixed(2);
    const stem = rng.pick([
      `A circle has a diameter of ${d} cm. What is its area? (Use π ≈ 3.14)`,
      `A circular plate has a diameter of ${d} cm. What is its area? (Use π ≈ 3.14)`,
      `What is the area of a circle with diameter ${d} m? (Use π ≈ 3.14)`,
    ]);
    return {
      id: 'area-circle-from-diameter',
      question: stem,
      correctAnswer: `≈ ${area} cm²`,
      distractors: dedup(`≈ ${area} cm²`, [
        `≈ ${(3.14 * d * d).toFixed(2)} cm²`,
        `≈ ${(3.14 * d).toFixed(2)} cm²`,
        `≈ ${(3.14 * (r + 1) * (r + 1)).toFixed(2)} cm²`,
      ]),
      explanation: `Radius = diameter ÷ 2 = ${d} ÷ 2 = ${r} cm. A = πr² ≈ 3.14 × ${r}² = ${area} cm².`,
      difficulty: 'main-set',
      standard: '7.G.B.4',
      diagram: { type: 'circle' as const, radius: r, showRadius: false, showDiameter: true },
    };
  },

  // Compound area (L-shape)
  (rng: Rng) => {
    const W = rng.intBetween(7, 20);
    const H = rng.intBetween(7, 16);
    const w = rng.intBetween(2, W - 3);
    const h = rng.intBetween(2, H - 3);
    const correct = W * H - w * h;
    return {
      id: 'compound-area',
      question: `An L-shaped room has outer dimensions ${W} m × ${H} m, with a rectangular corner of ${w} m × ${h} m cut away. What is the floor area of the L-shape?`,
      correctAnswer: `${correct} m²`,
      distractors: dedup(`${correct} m²`, [
        `${W * H} m²`,
        `${W * H + w * h} m²`,
        `${correct + h} m²`,
      ]),
      explanation: `Whole rectangle = ${W} × ${H} = ${W * H} m². Remove corner: ${W * H} − ${w} × ${h} = ${W * H} − ${w * h} = ${correct} m².`,
      difficulty: 'max-out',
      standard: '6.G.A.1',
      diagram: { type: 'l-shape' as const, outerWidth: W, outerHeight: H, cutWidth: w, cutHeight: h },
    };
  },

  // Area of shaded region
  (rng: Rng) => {
    const L = rng.intBetween(8, 20);
    const W = rng.intBetween(6, 15);
    const l = rng.intBetween(2, L - 4);
    const w = rng.intBetween(2, W - 3);
    const correct = L * W - l * w;
    return {
      id: 'area-shaded-region',
      question: `A large rectangle ${L} cm × ${W} cm has a smaller rectangle ${l} cm × ${w} cm removed from its interior. What is the remaining (shaded) area?`,
      correctAnswer: `${correct} cm²`,
      distractors: dedup(`${correct} cm²`, [
        `${L * W} cm²`,
        `${l * w} cm²`,
        `${correct + l} cm²`,
      ]),
      explanation: `Shaded = large − small = (${L} × ${W}) − (${l} × ${w}) = ${L * W} − ${l * w} = ${correct} cm².`,
      difficulty: 'max-out',
      standard: '6.G.A.1',
      diagram: { type: 'rect-with-hole' as const, outerWidth: L, outerHeight: W, innerWidth: l, innerHeight: w },
    };
  },
];

export const measurementQuestions: QuestionFactory[] = [
  ...staticQuestions,
  ...parameterizedQuestions,
];
