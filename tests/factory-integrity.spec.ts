import { expect, test } from '@playwright/test';
import { buildDistractors } from '../lib/problems/distractors';
import { generateWorkout } from '../lib/problems/generator';

type IntegrityTopic = 'power' | 'coordinates' | 'foundations' | 'shape-form' | 'measurement' | 'volume';

function findFirstInvalidWorkout(topic: IntegrityTopic): string | null {
  for (let seed = 0; seed < 10_000; seed += 1) {
    try {
      const problems = generateWorkout(topic, `integrity-${seed}`);
      for (const problem of problems) {
        if (problem.responseFormat === 'angle-draw') continue;
        const valid = problem.choices.length === 4
          && new Set(problem.choices).size === 4
          && problem.choices.every(choice => choice.trim().length > 0)
          && problem.choices.filter(choice => choice === problem.correctAnswer).length === 1
          && !problem.choices.some(choice => /[\*†]$/.test(choice));

        if (!valid) {
          return `seed=${seed}, id=${problem.id}, choices=${JSON.stringify(problem.choices)}`;
        }
      }
    } catch (error) {
      return `seed=${seed}, generation error=${error instanceof Error ? error.stack : String(error)}`;
    }
  }

  return null;
}

test('buildDistractors returns the first three unique incorrect choices', () => {
  expect(buildDistractors('5', ['5', '7', '7', '4', '', '12'])).toEqual([
    '7',
    '4',
    '12',
  ]);
});

test('buildDistractors rejects an incomplete answer set', () => {
  expect(() => buildDistractors('5', ['5', '7', '7', '4'])).toThrow(
    'Expected 3 unique distractors',
  );
});

test('Power Movement generates only valid multiple-choice answer sets', () => {
  let firstFailure: string | null = null;

  for (let seed = 0; seed < 10_000; seed += 1) {
    const problems = generateWorkout('power', `integrity-${seed}`);

    for (const problem of problems) {
      const valid = problem.choices.length === 4
        && new Set(problem.choices).size === 4
        && problem.choices.every(choice => choice.trim().length > 0)
        && problem.choices.filter(choice => choice === problem.correctAnswer).length === 1
        && !problem.choices.some(choice => /[\*†]$/.test(choice));

      if (!valid) {
        firstFailure = `seed=${seed}, id=${problem.id}, choices=${JSON.stringify(problem.choices)}`;
        break;
      }
    }

    if (firstFailure) break;
  }

  expect(firstFailure).toBeNull();
});

test('Coordinates generates only valid multiple-choice answer sets', () => {
  expect(findFirstInvalidWorkout('coordinates')).toBeNull();
});

for (const [topic, label] of [
  ['foundations', 'Foundations'],
  ['shape-form', 'Shape & Form'],
  ['measurement', 'Measurement'],
  ['volume', 'Volume'],
] as const) {
  test(`${label} generates only valid multiple-choice answer sets`, () => {
    expect(findFirstInvalidWorkout(topic)).toBeNull();
  });
}
