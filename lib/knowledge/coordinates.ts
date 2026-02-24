export const coordinatesKnowledge = `
# The Track: Coordinates & Transformations

## The Coordinate Plane

The **coordinate plane** is a flat grid formed by two number lines crossing at right angles:
- The **x-axis** runs horizontally (left–right)
- The **y-axis** runs vertically (up–down)
- They cross at the **origin**, which is the point (0, 0)

Every point on the plane has an address called a **coordinate pair**: (x, y).
- The x-value tells you how far to move left or right from the origin
- The y-value tells you how far to move up or down
- Always go across first (x), then up or down (y). "Walk before you climb."

## The Four Quadrants

The axes divide the plane into four quadrants:
- **Quadrant I** (top right): x positive, y positive (+, +)
- **Quadrant II** (top left): x negative, y positive (−, +)
- **Quadrant III** (bottom left): both negative (−, −)
- **Quadrant IV** (bottom right): x positive, y negative (+, −)

Points on the x-axis have y = 0. Points on the y-axis have x = 0.

## Finding Distance

**Between two points on the same horizontal line** (same y-value): distance = |x₂ − x₁|

**Between two points on the same vertical line** (same x-value): distance = |y₂ − y₁|

**Between any two points** (diagonal): use the Pythagorean theorem — the distance is the hypotenuse of a right triangle.

## Transformations

A **transformation** moves or changes a shape. The original shape is called the **pre-image**; the result is the **image**.

**Rigid transformations (isometries)** preserve the shape's size and proportions — only position or orientation changes:

**Translation (slide)**: Every point moves the same distance in the same direction.
- Moving right → add to x. Moving left → subtract from x.
- Moving up → add to y. Moving down → subtract from y.
- Example: translate (3, 4) right 2, down 5 → (3+2, 4−5) = (5, −1)

**Reflection (flip)**: Every point flips over a mirror line, the same distance on the other side.
- Reflect over the x-axis: (x, y) → (x, −y) — the y flips sign
- Reflect over the y-axis: (x, y) → (−x, y) — the x flips sign
- Example: reflect (4, −3) over the x-axis → (4, 3)

**Rotation (turn)**: Every point turns around a fixed centre point by a given angle.
- The size and shape stay the same, but the orientation changes.
- 90° clockwise: (x, y) → (y, −x)
- 180°: (x, y) → (−x, −y)

**Dilation (scale)**: Stretches or shrinks a shape by a scale factor. This is NOT rigid — the size changes.

## Key Insight

Translations, reflections, and rotations are all rigid — the shape is congruent before and after. Dilation produces a similar (but not necessarily congruent) shape.
`;
