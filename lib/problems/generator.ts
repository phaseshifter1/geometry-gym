import { createRng } from './rng';
import type { Problem, TopicId, RawQuestion } from './types';
import { foundationsQuestions } from './topics/foundations';
import { shapeFormQuestions } from './topics/shape-form';
import { measurementQuestions } from './topics/measurement';
import { volumeQuestions } from './topics/volume';
import { coordinatesQuestions } from './topics/coordinates';
import { powerQuestions } from './topics/power';

const QUESTIONS_PER_WORKOUT = 10;

function getFactories(topic: TopicId) {
  switch (topic) {
    case 'foundations':  return foundationsQuestions;
    case 'shape-form':   return shapeFormQuestions;
    case 'measurement':  return measurementQuestions;
    case 'volume':       return volumeQuestions;
    case 'coordinates':  return coordinatesQuestions;
    case 'power':        return powerQuestions;
  }
}

function buildProblem(
  raw: RawQuestion,
  topic: TopicId,
  shuffleFn: <T>(arr: T[]) => T[]
): Problem {
  const allChoices = [raw.correctAnswer, ...raw.distractors];
  const shuffled = shuffleFn(allChoices);
  const correctIndex = shuffled.indexOf(raw.correctAnswer);

  return {
    id: raw.id,
    question: raw.question,
    choices: shuffled,
    correctIndex,
    explanation: raw.explanation,
    topic,
    difficulty: raw.difficulty,
    standard: raw.standard,
  };
}

export function generateWorkout(topic: TopicId, seed: string, choiceSeed?: string): Problem[] {
  const rng = createRng(`${seed}:${topic}`);
  // Separate RNG for choice order so retries can shuffle choices independently of question seed
  const choiceRng = createRng(`${choiceSeed ?? seed}:${topic}:choices`);
  const factories = getFactories(topic);

  // Pick QUESTIONS_PER_WORKOUT factories without replacement
  const selected = rng.sample(factories, Math.min(QUESTIONS_PER_WORKOUT, factories.length));

  // If bank is smaller than needed, pad with repeats
  while (selected.length < QUESTIONS_PER_WORKOUT) {
    selected.push(rng.pick(factories));
  }

  return selected.map((factory) => {
    const raw = factory(rng);
    return buildProblem(raw, topic, (arr) => choiceRng.shuffle(arr));
  });
}
