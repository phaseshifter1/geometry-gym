export type DistractorTuple = [string, string, string];

/**
 * Builds the three answer choices that accompany a correct answer.
 *
 * Factories may provide more than three candidates, but this function never
 * invents or decorates an answer. If the factory does not supply three unique,
 * non-empty, incorrect choices, generation fails with the factory's real bug
 * instead of leaking markers such as `*` into the learner experience.
 */
export function buildDistractors(
  correctAnswer: string,
  candidates: readonly string[],
): DistractorTuple {
  const correct = correctAnswer.trim();
  const unique: string[] = [];
  const seen = new Set([correct]);

  for (const candidate of candidates) {
    const value = candidate.trim();
    if (!value || seen.has(value)) continue;
    seen.add(value);
    unique.push(value);
    if (unique.length === 3) return unique as DistractorTuple;
  }

  throw new Error(
    `Expected 3 unique distractors for correct answer "${correctAnswer}", received ${unique.length}.`,
  );
}
