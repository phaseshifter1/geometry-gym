'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RotateCcw, Flame, Dumbbell } from 'lucide-react';
import { getAllActiveSessions } from '@/lib/workout-session';
import { TOPIC_META } from '@/lib/problems/types';
import type { WorkoutSession } from '@/lib/workout-session';

function resumeHref(session: WorkoutSession): string {
  const slug = TOPIC_META[session.topic].slug;
  if (session.mode === 'daily') {
    return `/workout/${slug}?mode=daily`;
  }
  return `/workout/${slug}?mode=practice&seed=${session.seed}`;
}

export function ContinueWorkoutBanner() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);

  useEffect(() => {
    setSessions(getAllActiveSessions());
  }, []);

  if (sessions.length === 0) return null;

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pb-6">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
          Pick up where you left off
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {sessions.map((session) => {
            const label = TOPIC_META[session.topic]?.label ?? session.topic;
            const progress = session.currentIndex;
            const total = session.totalQuestions;
            const pct = Math.round((progress / total) * 100);
            const isDaily = session.mode === 'daily';

            return (
              <div
                key={`${session.topic}:${session.mode}:${session.seed}`}
                className="flex flex-1 items-center justify-between gap-4 rounded-xl border border-primary/20 bg-white px-4 py-3 min-w-[240px]"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${isDaily ? 'bg-primary/10' : 'bg-green-100'}`}>
                    {isDaily
                      ? <Flame className="h-4 w-4 text-primary" />
                      : <Dumbbell className="h-4 w-4 text-green-700" />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">{label}</p>
                    <p className="text-xs text-muted">
                      {isDaily ? 'Daily Workout' : 'Open Gym'} · {progress} of {total} done
                    </p>
                    {/* Progress bar */}
                    <div className="mt-1.5 h-1 w-28 rounded-full bg-gray-100">
                      <div
                        className="h-1 rounded-full bg-primary transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
                <Link
                  href={resumeHref(session)}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-dark whitespace-nowrap"
                >
                  <RotateCcw className="h-3 w-3" />
                  Resume
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
