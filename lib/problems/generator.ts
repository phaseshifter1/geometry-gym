import { createRng } from './rng';
import type { Problem, TopicId, RawQuestion } from './types';
import { anglesQuestions } from './topics/angles';

const QUESTIONS_PER_WORKOUT = 10;

function getFactories(topic: TopicId) {
  switch (topic) {
    case 'angles': return anglesQuestions;
    default: return anglesQuestions; // expand as more topics are built
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

export function generateWorkout(topic: TopicId, date: Date): Problem[] {
  const rng = createRng(date, topic);
  const factories = getFactories(topic);

  // Pick QUESTIONS_PER_WORKOUT factories without replacement (sample from bank)
  const selected = rng.sample(factories, Math.min(QUESTIONS_PER_WORKOUT, factories.length));

  // If bank is smaller than needed, pad with repeats
  while (selected.length < QUESTIONS_PER_WORKOUT) {
    selected.push(rng.pick(factories));
  }

  return selected.map((factory) => {
    const raw = factory(rng);
    return buildProblem(raw, topic, (arr) => rng.shuffle(arr));
  });
}
