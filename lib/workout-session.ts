import type { TopicId } from './problems/types';

export interface WorkoutSession {
  topic: TopicId;
  mode: 'daily' | 'practice';
  seed: string;
  currentIndex: number;
  score: number;
  totalQuestions: number;
  startedAt: string;
  completedAt: string | null;
}

const SESSION_PREFIX = 'gg:session:';
const ACTIVE_PREFIX  = 'gg:active:';

function sessionKey(topic: string, mode: string, seed: string): string {
  return `${SESSION_PREFIX}${topic}:${mode}:${seed}`;
}

export function saveSession(session: WorkoutSession): void {
  try {
    const key = sessionKey(session.topic, session.mode, session.seed);
    localStorage.setItem(key, JSON.stringify(session));
    if (session.completedAt) {
      localStorage.removeItem(`${ACTIVE_PREFIX}${session.topic}`);
    } else {
      localStorage.setItem(`${ACTIVE_PREFIX}${session.topic}`, key);
    }
  } catch {
    // localStorage unavailable — silently skip
  }
}

export function loadSession(
  topic: string,
  mode: string,
  seed: string,
): WorkoutSession | null {
  try {
    const raw = localStorage.getItem(sessionKey(topic, mode, seed));
    return raw ? (JSON.parse(raw) as WorkoutSession) : null;
  } catch {
    return null;
  }
}

export function getActiveSession(topic: string): WorkoutSession | null {
  try {
    const key = localStorage.getItem(`${ACTIVE_PREFIX}${topic}`);
    if (!key) return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const session = JSON.parse(raw) as WorkoutSession;
    if (session.completedAt) return null;
    // Expire stale daily sessions
    if (session.mode === 'daily') {
      const today = new Date().toISOString().split('T')[0];
      if (session.seed !== today) {
        localStorage.removeItem(`${ACTIVE_PREFIX}${topic}`);
        return null;
      }
    }
    return session;
  } catch {
    return null;
  }
}

export function getAllActiveSessions(): WorkoutSession[] {
  const sessions: WorkoutSession[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith(ACTIVE_PREFIX)) continue;
      const topic = key.slice(ACTIVE_PREFIX.length) as TopicId;
      const session = getActiveSession(topic);
      if (session) sessions.push(session);
    }
  } catch {
    // localStorage unavailable (SSR)
  }
  return sessions;
}

export function clearActiveSession(topic: string): void {
  try {
    const key = localStorage.getItem(`${ACTIVE_PREFIX}${topic}`);
    if (key) localStorage.removeItem(key);
    localStorage.removeItem(`${ACTIVE_PREFIX}${topic}`);
  } catch {
    // ignore
  }
}
