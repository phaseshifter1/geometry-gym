import type { Rng } from './rng';

export type Difficulty = 'warm-up' | 'main-set' | 'max-out';

export type TopicId =
  | 'angles'
  | 'shapes'
  | 'area-perimeter'
  | 'volume'
  | 'coordinates'
  | 'pythagorean';

export interface Problem {
  id: string;
  question: string;
  choices: string[];    // 4 choices, shuffled
  correctIndex: number; // index into choices[] of the right answer
  explanation: string;
  topic: TopicId;
  difficulty: Difficulty;
  standard?: string;
}

export interface RawQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  distractors: [string, string, string];
  explanation: string;
  difficulty: Difficulty;
  standard?: string;
}

export type QuestionFactory = (rng: Rng) => RawQuestion;

export const TOPIC_META: Record<TopicId, { label: string; slug: string }> = {
  angles:          { label: 'Angles',                   slug: 'angles' },
  shapes:          { label: 'Shapes & Polygons',         slug: 'shapes' },
  'area-perimeter':{ label: 'Area & Perimeter',          slug: 'area-perimeter' },
  volume:          { label: 'Volume & Surface Area',     slug: 'volume' },
  coordinates:     { label: 'The Coordinate Plane',      slug: 'coordinates' },
  pythagorean:     { label: 'The Pythagorean Theorem',   slug: 'pythagorean' },
};

export const SLUG_TO_TOPIC: Record<string, TopicId> = Object.fromEntries(
  Object.entries(TOPIC_META).map(([id, { slug }]) => [slug, id as TopicId])
);
