export interface Rng {
  next: () => number;
  intBetween: (min: number, max: number) => number;
  pick: <T>(arr: T[]) => T;
  shuffle: <T>(arr: T[]) => T[];
  sample: <T>(arr: T[], n: number) => T[];
}

function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function mulberry32(seed: number): () => number {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createRng(date: Date, topic: string): Rng {
  const dateStr = date.toISOString().split('T')[0];
  const seed = hashStr(dateStr + ':' + topic);
  const rand = mulberry32(seed);

  return {
    next: rand,
    intBetween(min, max) {
      return Math.floor(rand() * (max - min + 1)) + min;
    },
    pick<T>(arr: T[]): T {
      return arr[Math.floor(rand() * arr.length)];
    },
    shuffle<T>(arr: T[]): T[] {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    sample<T>(arr: T[], n: number): T[] {
      return this.shuffle(arr).slice(0, n);
    },
  };
}
