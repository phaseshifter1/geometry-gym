import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { TOPIC_META } from '@/lib/problems/types';
import type { TopicId } from '@/lib/problems/types';
import { InterestField } from '@/components/InterestField';
import { NavBar } from '@/components/NavBar';

interface WorkoutSession {
  id: string;
  topic: string;
  score: number;
  total: number;
  completed_at: string;
}

const ALL_TOPICS = Object.keys(TOPIC_META) as TopicId[];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function ProgressPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/');

  const [{ data }, { data: profileData }] = await Promise.all([
    supabase
      .from('workout_sessions')
      .select('*')
      .order('completed_at', { ascending: false }),
    supabase.from('profiles').select('interest, current_interest_id').eq('id', user.id).single(),
  ]);

  const sessions: WorkoutSession[] = data ?? [];
  const interest: string | null = profileData?.interest ?? null;
  const interestId: string | null = profileData?.current_interest_id ?? null;

  const totalQuestions = sessions.reduce((sum, s) => sum + s.total, 0);
  const totalCorrect = sessions.reduce((sum, s) => sum + s.score, 0);
  const overallAccuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const topicStats = ALL_TOPICS.map((topicId) => {
    const rows = sessions.filter((s) => s.topic === topicId);
    const questions = rows.reduce((sum, s) => sum + s.total, 0);
    const correct = rows.reduce((sum, s) => sum + s.score, 0);
    const accuracy =
      questions > 0 ? Math.round((correct / questions) * 100) : null;
    const lastTrained = rows.length > 0 ? rows[0].completed_at : null;
    return {
      topicId,
      label: TOPIC_META[topicId].label,
      slug: TOPIC_META[topicId].slug,
      sessionCount: rows.length,
      questions,
      correct,
      accuracy,
      lastTrained,
    };
  });

  const topicsExplored = topicStats.filter((t) => t.sessionCount > 0).length;

  return (
    <div className="min-h-screen bg-[#111827] font-sans text-[#F8FAFC]">
      <NavBar />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          Training Log
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#F8FAFC]">
          My Progress
        </h1>
        <p className="mt-2 text-base text-[#CBD5E1]">
          {user.email ?? 'Your workout history'}
        </p>

        {/* Summary row */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#D7E2EC] bg-[#F3F7FA] p-6 text-center shadow-lg shadow-black/10">
            <p className="text-4xl font-extrabold text-primary">
              {totalQuestions}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">
              Questions Answered
            </p>
          </div>
          <div className="rounded-2xl border border-[#D7E2EC] bg-[#F3F7FA] p-6 text-center shadow-lg shadow-black/10">
            <p className="text-4xl font-extrabold text-accent-dark">
              {totalQuestions > 0 ? `${overallAccuracy}%` : '—'}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">
              Overall Accuracy
            </p>
          </div>
          <div className="rounded-2xl border border-[#D7E2EC] bg-[#F3F7FA] p-6 text-center shadow-lg shadow-black/10">
            <p className="text-4xl font-extrabold text-primary">
              {topicsExplored} / {ALL_TOPICS.length}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">
              Topics Explored
            </p>
          </div>
        </div>

        {/* Interests */}
        <div className="mt-4">
          <InterestField initial={interest} initialId={interestId} />
        </div>

        {/* Per-topic table */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-[#F8FAFC]">
            Breakdown by Topic
          </h2>
          <div className="overflow-hidden rounded-2xl border border-[#D7E2EC] bg-[#F8FAFC] shadow-xl shadow-black/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#D7E2EC] bg-[#EAF7FE] text-left text-xs font-semibold uppercase tracking-widest text-accent-dark">
                  <th className="px-5 py-3">Topic</th>
                  <th className="px-5 py-3 text-right">Sessions</th>
                  <th className="px-5 py-3 text-right">Questions</th>
                  <th className="px-5 py-3 text-right">Correct</th>
                  <th className="px-5 py-3 text-right">Accuracy</th>
                  <th className="px-5 py-3 text-right">Last Trained</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D7E2EC]">
                {topicStats.map((t) => (
                  <tr
                    key={t.topicId}
                    className={t.sessionCount === 0 ? 'bg-white/60' : 'bg-white'}
                  >
                    <td className="px-5 py-4 font-medium text-dark">
                      {t.sessionCount > 0 ? (
                        <Link
                          href={`/workout/${t.slug}?mode=practice`}
                          className="hover:text-accent-dark transition-colors"
                        >
                          {t.label}
                        </Link>
                      ) : (
                        t.label
                      )}
                    </td>
                    <td className="px-5 py-4 text-right text-muted">
                      {t.sessionCount > 0 ? t.sessionCount : '—'}
                    </td>
                    <td className="px-5 py-4 text-right text-muted">
                      {t.questions > 0 ? t.questions : '—'}
                    </td>
                    <td className="px-5 py-4 text-right text-muted">
                      {t.correct > 0 ? t.correct : '—'}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold">
                      {t.accuracy !== null ? (
                        <span
                          className={
                            t.accuracy >= 80
                              ? 'text-green-600'
                              : t.accuracy >= 60
                                ? 'text-primary'
                                : 'text-red-500'
                          }
                        >
                          {t.accuracy}%
                        </span>
                      ) : (
                        <span className="text-muted">Not started yet</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right text-muted">
                      {t.lastTrained ? formatDate(t.lastTrained) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {sessions.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-[#D7E2EC] bg-[#F8FAFC] p-12 text-center shadow-xl shadow-black/20">
            <p className="text-lg font-semibold text-dark">
              No workouts yet — go get your first reps in!
            </p>
            <Link
              href="/#topics"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Pick a workout
            </Link>
          </div>
        )}

        {/* Feedback callout */}
        <div className="mt-12 rounded-2xl border border-primary/20 bg-[#FFF7ED] px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-black/20">
          <div>
            <p className="font-bold text-dark">How is Geometry Gym working for you?</p>
            <p className="mt-1 text-sm text-muted">Your feedback shapes what gets built next. It takes 2 minutes.</p>
          </div>
          <Link
            href="/feedback"
            className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Share feedback →
          </Link>
        </div>
      </main>
    </div>
  );
}
