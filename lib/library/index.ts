import type { TopicId } from '../problems/types';

export interface LibraryCard {
  id: string;
  topic: TopicId;
  title: string;
  body: string[];
  remember: string;
  realWorld: string;
  related: string[];
  readTime: number;
}

const cards: LibraryCard[] = [

  // ─── FOUNDATIONS ───────────────────────────────────────────────────────────

  {
    id: 'what-is-an-angle',
    topic: 'foundations',
    title: 'What Is an Angle?',
    body: [
      'An angle is formed when two rays meet at a shared endpoint called the vertex. Think of it like two arms stretching out from the same shoulder.',
      'We measure angles in degrees (°). A full spin all the way around is 360°. A quarter turn is 90°. A half turn is 180°.',
      'Angles show up everywhere — the corner of a book, the hands of a clock, the slope of a roof. Once you start noticing them, they\'re impossible to miss.',
    ],
    remember: 'The size of an angle depends only on how much the two rays are spread apart — not how long the rays are.',
    realWorld: 'When you open a laptop lid, the angle between the screen and the keyboard changes as you open it wider. At a quarter of the way open, that\'s roughly 45°. Fully flat is 180°.',
    related: ['angle-types', 'complementary-angles', 'supplementary-angles'],
    readTime: 2,
  },

  {
    id: 'angle-types',
    topic: 'foundations',
    title: 'Types of Angles',
    body: [
      'Angles are grouped by their size. Knowing the names makes it faster to describe and reason about shapes.',
      'An acute angle is less than 90° — it looks sharp and pointy. A right angle is exactly 90° — the classic square corner. An obtuse angle is between 90° and 180° — wider and more open. A straight angle is exactly 180° — it looks like a flat line. A reflex angle is between 180° and 360° — it\'s the "long way around".',
    ],
    remember: 'Right angles are marked with a small square in the corner. If you see that symbol, the angle is exactly 90° — no measuring needed.',
    realWorld: 'A slice of pizza is roughly an acute angle. The corner of a room is a right angle. An open door swung almost all the way back creates an obtuse angle.',
    related: ['what-is-an-angle', 'complementary-angles', 'supplementary-angles'],
    readTime: 2,
  },

  {
    id: 'complementary-angles',
    topic: 'foundations',
    title: 'Complementary Angles',
    body: [
      'Two angles are complementary when they add up to exactly 90°. Together they form one right angle.',
      'If you know one of the angles, finding the other is simple subtraction: 90° minus the angle you know.',
    ],
    remember: '"C" in Complementary comes before "S" in Supplementary — just like 90 comes before 180. Complementary = 90°.',
    realWorld: 'If you cut a right-angle corner of a piece of paper diagonally, the two angles you create are complementary — they add back to 90°.',
    related: ['supplementary-angles', 'angle-types', 'what-is-an-angle'],
    readTime: 1,
  },

  {
    id: 'supplementary-angles',
    topic: 'foundations',
    title: 'Supplementary Angles',
    body: [
      'Two angles are supplementary when they add up to exactly 180°. Together they form a straight line.',
      'A linear pair — two angles sitting side by side on a straight line — is always supplementary. If one angle is 120°, the other must be 60°.',
    ],
    remember: 'Supplementary = 180°. Straight line = 180°. The two go hand in hand.',
    realWorld: 'When you open a door, the door and the wall on either side form two angles that add up to 180° — supplementary angles right there in your house.',
    related: ['complementary-angles', 'vertical-angles', 'angle-types'],
    readTime: 1,
  },

  {
    id: 'vertical-angles',
    topic: 'foundations',
    title: 'Vertical Angles',
    body: [
      'When two straight lines cross, they form four angles. The angles directly across from each other are called vertical angles.',
      'Vertical angles are always equal. This isn\'t a coincidence — it\'s a mathematical certainty. If one is 70°, the one directly opposite is also 70°.',
    ],
    remember: 'Vertical angles are the ones across the "X" from each other — not the ones next to each other. The ones next to each other are supplementary.',
    realWorld: 'Look at a road intersection from above — two streets crossing form an X. The matching angles at opposite corners of that X are vertical angles.',
    related: ['supplementary-angles', 'what-is-an-angle', 'parallel-lines'],
    readTime: 2,
  },

  {
    id: 'parallel-lines',
    topic: 'foundations',
    title: 'Parallel & Perpendicular Lines',
    body: [
      'Parallel lines never meet. No matter how far you extend them, they stay the same distance apart — like train tracks running off into the horizon.',
      'Perpendicular lines meet at exactly 90°. The crossing point always forms four right angles.',
      'When a third line crosses two parallel lines, it creates pairs of equal angles. Corresponding angles (in matching positions at each crossing) are always equal. Alternate interior angles (on opposite sides, between the parallel lines) are always equal too.',
    ],
    remember: 'Parallel = never meet. Perpendicular = meet at 90°. These are two very different relationships.',
    realWorld: 'The lines on lined notebook paper are parallel. The margin line crossing them is perpendicular — forming right angles where they meet.',
    related: ['vertical-angles', 'angle-types', 'what-is-an-angle'],
    readTime: 2,
  },

  // ─── SHAPE & FORM ──────────────────────────────────────────────────────────

  {
    id: 'what-is-a-polygon',
    topic: 'shape-form',
    title: 'What Is a Polygon?',
    body: [
      'A polygon is a closed, flat shape with straight sides. "Closed" means the sides connect all the way around — no gaps or open ends.',
      'Triangles, squares, pentagons, and hexagons are all polygons. Circles are not — they have a curved edge instead of straight sides.',
      'The number of sides determines the name. Three sides: triangle. Four sides: quadrilateral. Five: pentagon. Six: hexagon. And so on.',
    ],
    remember: 'Two rules for a polygon: (1) straight sides only, (2) completely closed. Fail either rule and it\'s not a polygon.',
    realWorld: 'A stop sign is a regular octagon — 8 equal sides, 8 equal angles. A yield sign is a triangle. Road signs are basically a geometry lesson.',
    related: ['triangles', 'quadrilaterals', 'interior-angles'],
    readTime: 2,
  },

  {
    id: 'triangles',
    topic: 'shape-form',
    title: 'Types of Triangles',
    body: [
      'Every triangle has 3 sides and 3 angles that always sum to 180°. But within that rule, triangles come in several flavours.',
      'By sides: An equilateral triangle has all three sides equal — and all angles are 60°. An isosceles triangle has exactly two equal sides, and the angles opposite those sides are equal. A scalene triangle has all three sides different.',
      'By angles: An acute triangle has all angles less than 90°. A right triangle has exactly one 90° angle. An obtuse triangle has one angle greater than 90°.',
      'A triangle can be both isosceles and right — these classifications work together, not against each other.',
    ],
    remember: 'Equilateral → all equal. Isosceles → two equal. Scalene → none equal. These describe the sides, not the angles.',
    realWorld: 'A roof truss is often a triangle because triangles are rigid — they don\'t flex or collapse the way rectangles can. Builders love them for strength.',
    related: ['what-is-a-polygon', 'interior-angles', 'symmetry'],
    readTime: 2,
  },

  {
    id: 'quadrilaterals',
    topic: 'shape-form',
    title: 'Quadrilaterals',
    body: [
      'A quadrilateral is any polygon with four sides. The four angles always add up to 360°.',
      'Parallelograms have two pairs of parallel sides. Rectangles are parallelograms with right angles. Rhombuses are parallelograms with all sides equal. Squares are both — right angles AND all sides equal.',
      'Trapezoids have exactly one pair of parallel sides.',
      'The relationships form a family tree: every square is a rectangle and a rhombus, but not every rectangle is a square.',
    ],
    remember: 'Quad = four. All quadrilateral angles add to 360°. A square is the most "special" quadrilateral — it satisfies every rule.',
    realWorld: 'A standard door is a rectangle. A diamond card suit is a rhombus. A ramp cross-section is often a trapezoid. Quadrilaterals are everywhere.',
    related: ['what-is-a-polygon', 'interior-angles', 'symmetry'],
    readTime: 2,
  },

  {
    id: 'interior-angles',
    topic: 'shape-form',
    title: 'Interior Angles of Polygons',
    body: [
      'The interior angles of any polygon always add up to the same total, and it depends only on the number of sides.',
      'The formula is (n − 2) × 180°, where n is the number of sides. A triangle (n=3): (3−2) × 180° = 180°. A quadrilateral (n=4): 360°. Pentagon: 540°. Hexagon: 720°.',
      'For a regular polygon (all sides and angles equal), divide the total by n to get each angle. A regular hexagon: 720° ÷ 6 = 120° per angle.',
    ],
    remember: 'Formula: (n − 2) × 180°. You can always derive it — no need to memorise each shape separately.',
    realWorld: 'Honeybee hives use regular hexagons. Each interior angle is exactly 120°, and three hexagons meeting at a point sum to 360° — which is why they tile perfectly with no gaps.',
    related: ['what-is-a-polygon', 'triangles', 'quadrilaterals'],
    readTime: 2,
  },

  {
    id: 'symmetry',
    topic: 'shape-form',
    title: 'Symmetry',
    body: [
      'A shape has line symmetry (or reflective symmetry) when you can fold it along a line and both halves match exactly. That fold line is called the axis of symmetry or mirror line.',
      'A shape has rotational symmetry when it looks the same after being rotated by less than a full turn. A square looks identical after 90°, 180°, and 270° rotations.',
      'A shape can have one type of symmetry, both, or neither. A scalene triangle has neither. An equilateral triangle has 3 lines of symmetry and rotational symmetry of order 3.',
    ],
    remember: 'Lines of symmetry = fold lines. Rotational symmetry = how many times it looks the same in one full spin.',
    realWorld: 'Butterflies, faces, and leaves often have line symmetry. Snowflakes typically have 6-fold rotational symmetry — they look the same every 60°.',
    related: ['triangles', 'quadrilaterals', 'what-is-a-polygon'],
    readTime: 2,
  },

  // ─── MEASUREMENT ───────────────────────────────────────────────────────────

  {
    id: 'area-vs-perimeter',
    topic: 'measurement',
    title: 'Area vs Perimeter',
    body: [
      'Perimeter is the distance around the outside of a shape. You measure it by adding up all the side lengths. The result is in regular units — centimetres, metres, inches.',
      'Area is the amount of flat space inside a shape. The result is always in square units — cm², m², in². You multiply two lengths, so the unit gets squared too.',
      'These two measurements are completely independent. A shape with a large perimeter can have a tiny area, and vice versa. A 1×9 rectangle and a 3×3 square both have perimeter 20, but their areas are 9 and 9… wait: 1×9 = 9, 3×3 = 9. Try 1×9 vs 5×5: perimeter 20 vs 20, area 9 vs 25. Same perimeter, very different areas.',
    ],
    remember: 'Perimeter = around the outside (plain units). Area = space inside (square units). The ² in cm² is your reminder.',
    realWorld: 'Fencing a garden uses perimeter — you\'re measuring around the edge. Laying turf uses area — you\'re covering the inside. Same garden, two different measurements.',
    related: ['rectangle-area', 'triangle-area', 'circles'],
    readTime: 2,
  },

  {
    id: 'rectangle-area',
    topic: 'measurement',
    title: 'Area & Perimeter of Rectangles',
    body: [
      'For a rectangle with length l and width w: Perimeter = 2l + 2w. Area = l × w.',
      'For a square with side s: Perimeter = 4s. Area = s².',
      'If you know the area and one side, you can find the other: length = area ÷ width.',
    ],
    remember: 'The perimeter formula double-counts both dimensions because rectangles have two of each side: P = 2(l + w).',
    realWorld: 'Buying carpet for a rectangular room — you need area (l × w) to know how many square metres to order. Buying skirting board — you need perimeter.',
    related: ['area-vs-perimeter', 'triangle-area', 'circles'],
    readTime: 1,
  },

  {
    id: 'triangle-area',
    topic: 'measurement',
    title: 'Area of a Triangle',
    body: [
      'The area of a triangle is ½ × base × height.',
      'The height must be perpendicular — straight up from the base at 90°. It\'s not always the slanted side. Sometimes you have to draw a dotted line from the highest point straight down to the base.',
      'Why ½? Because any triangle is exactly half of a rectangle with the same base and height. Cut a rectangle diagonally and you get two identical triangles.',
    ],
    remember: 'A = ½bh. The "½" comes from the fact that a triangle is half a rectangle. If you forget the formula, draw the rectangle around it.',
    realWorld: 'The triangular sails on sailing boats — to find how much fabric is needed, you calculate the area using ½ × base × height.',
    related: ['area-vs-perimeter', 'rectangle-area', 'circles'],
    readTime: 2,
  },

  {
    id: 'circles',
    topic: 'measurement',
    title: 'Circles: Area & Circumference',
    body: [
      'Every circle has a radius (r) — the distance from the centre to the edge — and a diameter (d = 2r) — the distance all the way across.',
      'Circumference (the perimeter of a circle) = 2πr = πd. This is the distance around the outside.',
      'Area = πr². This is the space inside.',
      'π (pi) is approximately 3.14159. It\'s the ratio of any circle\'s circumference to its diameter — always the same for every circle ever.',
    ],
    remember: 'Area uses r² (radius squared). Circumference uses r (radius, not squared). A common mistake is using the area formula when you want circumference and vice versa.',
    realWorld: 'A circular pizza — the circumference tells you how long the crust is. The area tells you how much topping you need. Both use the same radius.',
    related: ['area-vs-perimeter', 'rectangle-area', 'triangle-area'],
    readTime: 2,
  },

  // ─── VOLUME ────────────────────────────────────────────────────────────────

  {
    id: 'volume-vs-surface-area',
    topic: 'volume',
    title: 'Volume vs Surface Area',
    body: [
      'Volume measures how much space is inside a 3D object — how much it can hold. Measured in cubic units: cm³, m³.',
      'Surface area measures the total area of all the outside faces — how much material you\'d need to wrap it. Measured in square units: cm², m².',
      'Think of a cardboard box: the surface area is all the cardboard used to make the box, the volume is how much stuff fits inside.',
    ],
    remember: 'Volume = inside space (cubic units, ³). Surface area = outside faces (square units, ²). The unit tells you which one you\'re dealing with.',
    realWorld: 'A drinks can: volume tells you how many millilitres of liquid it holds. Surface area tells you how much aluminium was needed to make it.',
    related: ['rectangular-prism', 'cylinder-volume', 'nets'],
    readTime: 2,
  },

  {
    id: 'rectangular-prism',
    topic: 'volume',
    title: 'Rectangular Prisms & Cubes',
    body: [
      'A rectangular prism (cuboid) has six rectangular faces. Volume = length × width × height. Surface area = 2(lw + lh + wh) — two of each pair of opposite faces.',
      'A cube is a special rectangular prism where all three dimensions are equal (l = w = h = s). Volume = s³. Surface area = 6s² (six identical square faces).',
      'If you know the volume and two dimensions, you can find the third: missing dimension = volume ÷ (the other two multiplied).',
    ],
    remember: 'Volume = l × w × h. Surface area = 2(lw + lh + wh). The "2" in surface area comes from having two of each face.',
    realWorld: 'A shipping box — the volume tells you if your item fits inside, the surface area tells you how much wrapping paper you need.',
    related: ['volume-vs-surface-area', 'cylinder-volume', 'nets'],
    readTime: 2,
  },

  {
    id: 'cylinder-volume',
    topic: 'volume',
    title: 'Cylinders',
    body: [
      'A cylinder has two circular ends and a curved side. Volume = πr²h — the area of the circular base multiplied by the height.',
      'Think of it as stacking a huge number of very thin circular discs on top of each other until you reach height h.',
    ],
    remember: 'V = πr²h. The πr² part is the circle area formula — you already know that one. Just multiply by height.',
    realWorld: 'A soup can is a cylinder. The volume tells you how much soup fits in it. Use V = πr²h with the radius and height of the can.',
    related: ['volume-vs-surface-area', 'rectangular-prism', 'circles'],
    readTime: 2,
  },

  {
    id: 'nets',
    topic: 'volume',
    title: 'Nets of 3D Shapes',
    body: [
      'A net is what a 3D shape looks like when completely unfolded and laid flat. Every face of the shape appears as a flat polygon in the net.',
      'Folding the net back up along the edges recreates the 3D shape.',
      'Nets are useful for calculating surface area — add up the area of every face shown in the net.',
      'Many nets are possible for the same shape. A cube has 11 different valid nets.',
    ],
    remember: 'A net is just a 3D shape with all its faces "peeled open" and laid flat. If you can fold it up into the shape, it\'s a valid net.',
    realWorld: 'Cereal boxes and packaging are designed using nets. Before a box is folded, it\'s a flat sheet cut in the shape of a net.',
    related: ['volume-vs-surface-area', 'rectangular-prism', 'cylinder-volume'],
    readTime: 2,
  },

  // ─── COORDINATES ───────────────────────────────────────────────────────────

  {
    id: 'coordinate-plane',
    topic: 'coordinates',
    title: 'The Coordinate Plane',
    body: [
      'The coordinate plane is a flat grid made by two number lines crossing at right angles. The horizontal line is the x-axis, the vertical line is the y-axis. They cross at the origin: (0, 0).',
      'Every point has an address — a coordinate pair (x, y). The x tells you how far to move left or right. The y tells you how far to move up or down.',
      'Always read x first, then y. A good memory trick: "Walk before you climb" — go across first (x), then up or down (y).',
    ],
    remember: '(x, y) — x goes across (horizontal), y goes up/down (vertical). Always x first.',
    realWorld: 'A map grid works the same way — you read the column (x) then the row (y) to find a location. "B4" on a board game is just (B, 4) — a coordinate pair.',
    related: ['quadrants', 'plotting-points', 'translations'],
    readTime: 2,
  },

  {
    id: 'quadrants',
    topic: 'coordinates',
    title: 'The Four Quadrants',
    body: [
      'The x and y axes divide the coordinate plane into four sections called quadrants, numbered I through IV going counter-clockwise from the top right.',
      'Quadrant I (top right): both x and y are positive (+, +). Quadrant II (top left): x negative, y positive (−, +). Quadrant III (bottom left): both negative (−, −). Quadrant IV (bottom right): x positive, y negative (+, −).',
      'Points that sit directly on an axis are not in any quadrant. A point with x = 0 is on the y-axis. A point with y = 0 is on the x-axis.',
    ],
    remember: 'Start at Quadrant I (top right, both positive) and go counter-clockwise. The signs follow a pattern: +/+, −/+, −/−, +/−.',
    realWorld: 'Weather maps and GPS systems use coordinate grids. North-East is like Quadrant I — both directions positive. South-West is like Quadrant III.',
    related: ['coordinate-plane', 'plotting-points', 'reflections'],
    readTime: 2,
  },

  {
    id: 'translations',
    topic: 'coordinates',
    title: 'Translations',
    body: [
      'A translation slides every point of a shape the same distance in the same direction. The shape doesn\'t rotate, flip, or resize — it just moves.',
      'To translate a point: moving right adds to x, moving left subtracts from x. Moving up adds to y, moving down subtracts from y.',
      'Example: translate point (3, 4) right 2 and down 5 → (3+2, 4−5) = (5, −1).',
    ],
    remember: 'Right → +x. Left → −x. Up → +y. Down → −y. Apply the same shift to every point in the shape.',
    realWorld: 'Sliding a book across a table is a translation — the book moves but doesn\'t spin or change size.',
    related: ['coordinate-plane', 'reflections', 'rotations'],
    readTime: 2,
  },

  {
    id: 'reflections',
    topic: 'coordinates',
    title: 'Reflections',
    body: [
      'A reflection flips a shape over a mirror line. Every point lands on the opposite side of the line, the same distance away.',
      'Reflecting over the x-axis: (x, y) → (x, −y). The y flips sign, x stays the same.',
      'Reflecting over the y-axis: (x, y) → (−x, y). The x flips sign, y stays the same.',
      'The reflected shape is a mirror image — same size and shape, but flipped.',
    ],
    remember: 'Over the x-axis → flip the y. Over the y-axis → flip the x. The axis you\'re reflecting over stays the same, the other coordinate flips.',
    realWorld: 'A reflection in a still lake — every point above the water appears the same distance below the surface. The waterline is the mirror line.',
    related: ['translations', 'rotations', 'quadrants'],
    readTime: 2,
  },

  {
    id: 'rotations',
    topic: 'coordinates',
    title: 'Rotations',
    body: [
      'A rotation turns every point of a shape around a fixed centre point by a given angle. The size and shape stay the same, just the orientation changes.',
      'Rotating 90° clockwise around the origin: (x, y) → (y, −x). Rotating 180°: (x, y) → (−x, −y). Rotating 270° clockwise (= 90° counter-clockwise): (x, y) → (−y, x).',
      'Translations, reflections, and rotations are all rigid transformations — they preserve size and shape perfectly.',
    ],
    remember: '180° rotation always flips both signs: (x, y) → (−x, −y). It\'s the simplest one to remember.',
    realWorld: 'The hands of a clock rotate around the centre. The minute hand makes a full 360° rotation every hour.',
    related: ['translations', 'reflections', 'coordinate-plane'],
    readTime: 2,
  },

  // ─── POWER ─────────────────────────────────────────────────────────────────

  {
    id: 'pythagorean-theorem',
    topic: 'power',
    title: 'The Pythagorean Theorem',
    body: [
      'In any right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c².',
      'The hypotenuse (c) is the longest side — always opposite the right angle. The other two sides (a and b) are called legs.',
      'To find the hypotenuse: c = √(a² + b²). To find a missing leg: a = √(c² − b²).',
      'This only works for right triangles. If there\'s no right angle, this formula doesn\'t apply.',
    ],
    remember: 'a² + b² = c². The hypotenuse is always c — the longest side, opposite the right angle. The legs are a and b.',
    realWorld: 'Builders use the 3-4-5 rule to check if a corner is truly square: measure 3 units along one wall, 4 units along the other — if the diagonal is exactly 5, the corner is 90°.',
    related: ['pythagorean-triples', 'finding-missing-sides', 'congruence'],
    readTime: 2,
  },

  {
    id: 'pythagorean-triples',
    topic: 'power',
    title: 'Pythagorean Triples',
    body: [
      'A Pythagorean triple is a set of three whole numbers that satisfy a² + b² = c². They produce right triangles with no messy decimals.',
      'The most common ones: 3-4-5, 5-12-13, 8-15-17, 7-24-25.',
      'Any multiple of a triple is also a triple: 6-8-10 is just 3-4-5 doubled. 9-12-15 is 3-4-5 tripled.',
      'Recognising these saves time — when you see sides of 5 and 12, you know the hypotenuse is 13 without any calculation.',
    ],
    remember: '3-4-5 is the most important one. Memorise it. Most exam questions that give clean answers use this triple or a multiple of it.',
    realWorld: 'Ancient Egyptian surveyors used ropes tied with knots at 3, 4, and 5 unit intervals to create perfect right angles when laying out fields and pyramids.',
    related: ['pythagorean-theorem', 'finding-missing-sides', 'congruence'],
    readTime: 2,
  },

  {
    id: 'finding-missing-sides',
    topic: 'power',
    title: 'Finding Missing Sides',
    body: [
      'The Pythagorean theorem can find any missing side of a right triangle, as long as you know the other two.',
      'Finding the hypotenuse (the longest side): c = √(a² + b²). Square both legs, add them, take the square root.',
      'Finding a leg (one of the shorter sides): a = √(c² − b²). Square the hypotenuse, subtract the square of the known leg, take the square root.',
      'The converse also works: if three sides satisfy a² + b² = c², the triangle IS a right triangle. You can use this to verify a right angle.',
    ],
    remember: 'Finding hypotenuse → add the squares. Finding a leg → subtract the squares. Always square first, then take the root at the end.',
    realWorld: 'If a ladder leans against a wall, you know the height of the wall (one leg) and the distance from the wall to the foot of the ladder (other leg) — the Pythagorean theorem tells you exactly how long the ladder needs to be.',
    related: ['pythagorean-theorem', 'pythagorean-triples', 'similarity'],
    readTime: 2,
  },

  {
    id: 'congruence',
    topic: 'power',
    title: 'Congruence',
    body: [
      'Two shapes are congruent if they are exactly the same size and shape. One can be moved, rotated, or reflected to fit perfectly on top of the other — no resizing allowed.',
      'For triangles, there are reliable shortcuts to prove congruence without measuring everything: SSS (all three pairs of sides equal), SAS (two sides and the angle between them), ASA (two angles and the side between them).',
      'Congruent shapes have all corresponding sides equal and all corresponding angles equal.',
    ],
    remember: 'Congruent = identical. Same size, same shape. You can flip or rotate it, but you can\'t resize it.',
    realWorld: 'Mass-produced parts in a factory are congruent — every bolt of the same model is identical in size and shape so they\'re interchangeable.',
    related: ['similarity', 'pythagorean-theorem', 'triangles'],
    readTime: 2,
  },

  {
    id: 'similarity',
    topic: 'power',
    title: 'Similarity',
    body: [
      'Two shapes are similar if they have the same shape but can be different sizes. Their angles are all equal and their sides are proportional.',
      'The scale factor is the ratio of corresponding side lengths. If one triangle has sides 3, 4, 5 and a similar triangle has sides 6, 8, 10 — the scale factor is 2.',
      'For triangles, you only need two pairs of equal angles to prove similarity (AA rule) — the third angle must also match since angles sum to 180°.',
      'Congruent shapes are always similar (scale factor = 1). Similar shapes are not always congruent.',
    ],
    remember: 'Similar = same shape, possibly different size. Congruent = same shape AND same size. Congruence is a special case of similarity.',
    realWorld: 'A map is similar to the real landscape — same shape, massively different size. The scale factor (e.g. 1:50,000) tells you how much smaller the map is.',
    related: ['congruence', 'finding-missing-sides', 'pythagorean-theorem'],
    readTime: 2,
  },

];

export function getAllCards(): LibraryCard[] {
  return cards;
}

export function getCardById(id: string): LibraryCard | undefined {
  return cards.find((c) => c.id === id);
}

export function getCardsByTopic(topic: TopicId): LibraryCard[] {
  return cards.filter((c) => c.topic === topic);
}

export function getRelatedCards(card: LibraryCard): LibraryCard[] {
  return card.related
    .map((id) => cards.find((c) => c.id === id))
    .filter(Boolean) as LibraryCard[];
}
