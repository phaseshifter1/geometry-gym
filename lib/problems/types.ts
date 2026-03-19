import type { Rng } from './rng';

export type Difficulty = 'warm-up' | 'main-set' | 'max-out';

// ─── Diagram specs ────────────────────────────────────────────────────────────
// Each variant carries only the parameters already computed by the problem factory.
// The SVG renderer is a pure function: DiagramSpec → SVG. No new numbers invented here.

export type DiagramSpec =
  | { type: 'circle'; radius: number; showRadius: boolean };

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
  choices: string[];    // 4 choices, shuffled
  correctIndex: number; // index into choices[] of the right answer
  explanation: string;
  topic: TopicId;
  difficulty: Difficulty;
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
  standard?: string;
  diagram?: DiagramSpec;
}

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
