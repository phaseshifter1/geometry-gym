import type { Rng } from './rng';

export type Difficulty = 'warm-up' | 'main-set' | 'max-out' | 'hard';

// ─── Diagram specs ────────────────────────────────────────────────────────────
// Each variant carries only the parameters already computed by the problem factory.
// The SVG renderer is a pure function: DiagramSpec → SVG. No new numbers invented here.

export type DiagramSpec =
  | { type: 'circle'; radius: number; showRadius: boolean; showDiameter?: boolean }
  | { type: 'triangle'; angles: [number, number, number]; showExterior?: number; unknownIndex?: number; unknownIndices?: number[] }
  | { type: 'rectangle'; width: number; height: number; labelDimensions: boolean; unknownDimension?: 'width' | 'height'; widthLabel?: string; heightLabel?: string }
  | { type: 'angle'; degrees: number }
  | { type: 'linear-pair'; knownAngle: number }
  | { type: 'crossing-lines'; knownAngle: number }
  | { type: 'complementary-pair'; knownAngle: number }
  | { type: 'angles-around-point'; angles: [number, number, number, number]; unknownIndex: number }
  | { type: 'parallel-lines'; knownAngle: number; highlight: 'alternate-interior' | 'co-interior' }
  | { type: 'triangle-perimeter'; sides: [number, number, number] }
  | { type: 'triangle-area'; base: number; height: number }
  | { type: 'parallelogram'; base: number; height: number }
  | { type: 'trapezoid'; topBase: number; bottomBase: number; height: number }
  | { type: 'regular-polygon'; sides: number; angleLabel?: string; showExterior?: boolean }
  | { type: 'quadrilateral-angles'; angles: [number, number, number, number]; unknownIndex: number }
  | { type: 'right-triangle'; legs: [number, number]; hypotenuse: number; unknown: 'hypotenuse' | 'leg-a' | 'leg-b' }
  | { type: 'rectangle-diagonal'; width: number; height: number }
  | {
      type: 'coordinate-grid';
      points: Array<{ x: number; y: number; label?: string; color?: 'blue' | 'purple' | 'orange' }>;
      segments?: Array<{ x1: number; y1: number; x2: number; y2: number; dashed?: boolean }>;
      highlightLine?: 'x-axis' | 'y-axis' | 'y=x';
    }
  | { type: 'cuboid'; length: number; width: number; height: number; unknownDimension?: 'length' | 'width' | 'height'; lengthLabel?: string; widthLabel?: string; heightLabel?: string }
  | { type: 'cylinder-3d'; radius: number; height: number; unknownDimension?: 'radius' | 'height'; radiusLabel?: string; heightLabel?: string }
  | { type: 'l-shape'; outerWidth: number; outerHeight: number; cutWidth: number; cutHeight: number }
  | { type: 'rect-with-hole'; outerWidth: number; outerHeight: number; innerWidth: number; innerHeight: number }
  | { type: 'triangular-prism'; triangleBase: number; triangleHeight: number; apexOffset: number; length: number; sides?: [number, number, number] }
  | {
      type: 'similar-pair';
      // Normalised polygon vertices (0–1 range). Renderer scales uniformly to produce two similar shapes.
      vertices: Array<{ x: number; y: number }>;
      scaleFactor: number;
      // Optional labels on the representative side of each shape. Omit for visual-anchor-only questions.
      smallLabel?: string;
      largeLabel?: string;
    }
  | { type: 'rhombus' }
  | { type: 'kite' };

export type TopicId =
  | 'foundations'
  | 'shape-form'
  | 'measurement'
  | 'volume'
  | 'coordinates'
  | 'power';

export interface Problem {
  id: string;
  question: string;
  choices: string[];    // 4 choices, shuffled — unused for angle-draw
  correctIndex: number; // index into choices[] — unused for angle-draw
  correctAnswer: string; // raw answer string — used by angle-draw for target degrees
  explanation: string;
  topic: TopicId;
  difficulty: Difficulty;
  responseFormat: ResponseFormat;
  standard?: string;
  diagram?: DiagramSpec;
}

export interface RawQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  distractors: [string, string, string];
  explanation: string;
  difficulty: Difficulty;
  responseFormat?: ResponseFormat; // defaults to 'multiple-choice' if omitted
  standard?: string;
  diagram?: DiagramSpec;
}

export type ResponseFormat =
  | 'multiple-choice' // default — all existing items
  | 'angle-draw';     // student drags a ray to construct an angle

export type QuestionFactory = (rng: Rng) => RawQuestion;

export const TOPIC_META: Record<TopicId, { label: string; slug: string }> = {
  foundations:  { label: 'Foundations',           slug: 'foundations' },
  'shape-form': { label: 'Shape & Form',           slug: 'shape-form' },
  measurement:  { label: 'The Measurement Room',   slug: 'measurement' },
  volume:       { label: 'Heavy Lifts',            slug: 'volume' },
  coordinates:  { label: 'The Track',              slug: 'coordinates' },
  power:        { label: 'Power Movement',         slug: 'power' },
};

export const SLUG_TO_TOPIC: Record<string, TopicId> = Object.fromEntries(
  Object.entries(TOPIC_META).map(([id, { slug }]) => [slug, id as TopicId])
);
