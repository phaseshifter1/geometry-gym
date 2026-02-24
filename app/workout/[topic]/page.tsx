'use client';

import { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport, type UIMessage } from 'ai';
import {
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  MessageCircle,
  X,
  Send,
  Dumbbell,
  Trophy,
  RotateCcw,
} from 'lucide-react';
import { generateWorkout } from '@/lib/problems/generator';
import { SLUG_TO_TOPIC, TOPIC_META } from '@/lib/problems/types';
import type { Problem, TopicId } from '@/lib/problems/types';
import { saveSession, loadSession, clearActiveSession } from '@/lib/workout-session';

// ─── Coach Panel ──────────────────────────────────────────────────────────────

function CoachPanel({
  problem,
  selectedIndex,
  onClose,
}: {
  problem: Problem;
  selectedIndex: number | null;
  onClose: () => void;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  const context = {
    question: problem.question,
    studentAnswer:
      selectedIndex !== null ? problem.choices[selectedIndex] : null,
    correctAnswer: problem.choices[problem.correctIndex],
    explanation: problem.explanation,
    topic: problem.topic,
  };

  const { messages, sendMessage, status } = useChat({
    transport: new TextStreamChatTransport({
      api: '/api/coach',
      body: { context },
    }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4 text-primary" />
          <span className="font-semibold text-dark">Ask Coach</span>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-muted hover:bg-surface hover:text-dark transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="rounded-xl bg-surface p-4 text-sm text-muted">
            <p className="font-medium text-dark mb-1">Hi! I&apos;m your geometry coach.</p>
            <p>Ask me anything about this question — why an answer is right or wrong, what a term means, or how to think about it.</p>
          </div>
        )}
        {messages.map((m: UIMessage) => {
          const text = m.parts
            .filter((p) => p.type === 'text')
            .map((p) => (p as { type: 'text'; text: string }).text)
            .join('');
          return (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-surface text-dark'
                }`}
              >
                {text}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-surface px-4 py-2.5 text-sm text-muted">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border px-4 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-dark placeholder-muted focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary-dark disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

// ─── Finished Screen ──────────────────────────────────────────────────────────

function FinishedScreen({
  score,
  total,
  topicLabel,
  onRetry,
  onHome,
}: {
  score: number;
  total: number;
  topicLabel: string;
  onRetry: () => void;
  onHome: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const message =
    pct === 100
      ? 'Perfect score! Outstanding work.'
      : pct >= 80
      ? 'Great workout! You nailed most of these.'
      : pct >= 60
      ? 'Solid effort. Keep training and you\'ll get stronger.'
      : 'Good start. Every rep counts — come back tomorrow!';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Trophy className="mb-4 h-16 w-16 text-primary" />
      <h1 className="text-3xl font-extrabold text-dark">Workout Complete!</h1>
      <p className="mt-2 text-6xl font-extrabold text-primary">
        {score}/{total}
      </p>
      <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-muted">
        {topicLabel}
      </p>
      <p className="mx-auto mt-6 max-w-sm text-base text-muted">{message}</p>
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-dark transition-colors hover:bg-surface"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
        <button
          onClick={onHome}
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Back to Home
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Workout Page ────────────────────────────────────────────────────────

function WorkoutPageInner() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = typeof params.topic === 'string' ? params.topic : 'angles';
  const topicId: TopicId = SLUG_TO_TOPIC[slug] ?? 'angles';
  const topicLabel = TOPIC_META[topicId].label;
  const mode = (searchParams.get('mode') ?? 'daily') as 'daily' | 'practice';
  const urlSeed = searchParams.get('seed');

  const dailySeed = new Date().toISOString().split('T')[0];
  const [practiceSeed, setPracticeSeed] = useState(
    () => urlSeed ?? crypto.randomUUID()
  );

  const currentSeed = mode === 'daily' ? dailySeed : practiceSeed;

  const problems: Problem[] = useMemo(() => {
    return generateWorkout(topicId, currentSeed);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, currentSeed]);

  const [startedAt] = useState(() => new Date().toISOString());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [coachOpen, setCoachOpen] = useState(false);

  // Restore session on mount
  useEffect(() => {
    const session = loadSession(topicId, mode, currentSeed);
    if (session && !session.completedAt && session.currentIndex > 0) {
      setCurrentIndex(session.currentIndex);
      setScore(session.score);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const problem = problems[currentIndex];
  const isCorrect = selectedIndex === problem?.correctIndex;

  function handleSelect(idx: number) {
    if (answered) return;
    setSelectedIndex(idx);
    setAnswered(true);
    if (idx === problem.correctIndex) setScore((s) => s + 1);
  }

  function handleNext() {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= problems.length) {
      setFinished(true);
      saveSession({ topic: topicId, mode, seed: currentSeed, currentIndex: nextIndex, score, totalQuestions: problems.length, startedAt, completedAt: new Date().toISOString() });
    } else {
      setCurrentIndex(nextIndex);
      setSelectedIndex(null);
      setAnswered(false);
      setCoachOpen(false);
      saveSession({ topic: topicId, mode, seed: currentSeed, currentIndex: nextIndex, score, totalQuestions: problems.length, startedAt, completedAt: null });
    }
  }

  function handleRetry() {
    clearActiveSession(topicId);
    if (mode === 'practice') setPracticeSeed(crypto.randomUUID());
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setCoachOpen(false);
  }

  if (finished) {
    return (
      <FinishedScreen
        score={score}
        total={problems.length}
        topicLabel={topicLabel}
        onRetry={handleRetry}
        onHome={() => router.push('/')}
      />
    );
  }

  const difficultyLabel: Record<Problem['difficulty'], string> = {
    'warm-up': 'Warm Up',
    'main-set': 'Main Set',
    'max-out': 'Max Out',
  };
  const difficultyColor: Record<Problem['difficulty'], string> = {
    'warm-up': 'text-green-600 bg-green-50',
    'main-set': 'text-primary bg-orange-50',
    'max-out': 'text-red-600 bg-red-50',
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Main content */}
      <div className="flex flex-1 flex-col">

        {/* Top bar */}
        <div className="sticky top-0 z-10 border-b border-border bg-white px-6 py-4">
          <div className="mx-auto flex max-w-2xl items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-dark transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <Dumbbell className="h-4 w-4 text-primary" />
              <span className="font-bold text-dark">Geometry Gym</span>
            </button>
            <div className="text-center">
              <span className="text-sm font-semibold text-dark">{topicLabel}</span>
              <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${mode === 'daily' ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-700'}`}>
                {mode === 'daily' ? 'Daily Workout' : 'Open Gym'}
              </span>
            </div>
            <span className="text-sm text-muted">
              {currentIndex + 1} / {problems.length}
            </span>
          </div>
          {/* Progress bar */}
          <div className="mx-auto mt-3 max-w-2xl">
            <div className="h-1.5 w-full rounded-full bg-surface">
              <div
                className="h-1.5 rounded-full bg-primary transition-all duration-300"
                style={{
                  width: `${((currentIndex + (answered ? 1 : 0)) / problems.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Question card */}
        <div className={`flex flex-1 flex-col items-center px-6 py-10 ${answered ? 'pb-56' : ''}`}>
          <div className="w-full max-w-2xl">

            {/* Difficulty badge */}
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${difficultyColor[problem.difficulty]}`}
            >
              {difficultyLabel[problem.difficulty]}
            </span>

            {/* Question */}
            <h2 className="mt-4 text-xl font-bold leading-snug text-dark sm:text-2xl">
              {problem.question}
            </h2>

            {/* Choices */}
            <div className="mt-6 space-y-3">
              {problem.choices.map((choice, idx) => {
                const isSelected = selectedIndex === idx;
                const isCorrectChoice = idx === problem.correctIndex;

                let style =
                  'border-2 border-b-4 border-gray-200 bg-white text-dark hover:border-primary/40 hover:bg-orange-50 active:translate-y-[2px] active:border-b-2 transition-all duration-75';

                if (answered) {
                  if (isCorrectChoice) {
                    style = 'border-2 border-b-4 border-green-400 bg-green-50 text-green-800';
                  } else if (isSelected && !isCorrectChoice) {
                    style = 'border-2 border-b-4 border-red-400 bg-red-50 text-red-800';
                  } else {
                    style = 'border-2 border-b-4 border-gray-100 bg-white text-dark opacity-40';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={answered}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-5 py-4 text-left text-sm font-medium transition-all ${style}`}
                  >
                    <span>{choice}</span>
                    {answered && isCorrectChoice && (
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                    )}
                    {answered && isSelected && !isCorrectChoice && (
                      <XCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Ask Coach button (before answering) */}
            {!answered && (
              <div className="mt-6">
                <button
                  onClick={() => setCoachOpen((o) => !o)}
                  className="flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask Coach
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Bottom feedback panel */}
      {answered && problem && (
        <div
          style={{ animation: 'slideUp 0.25s ease-out' }}
          className={`fixed bottom-0 left-0 right-0 z-30 px-6 pt-5 pb-8 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] ${
            isCorrect ? 'bg-green-500' : 'bg-red-400'
          }`}
        >
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-2 mb-1">
              {isCorrect
                ? <CheckCircle2 className="h-6 w-6 text-white" />
                : <XCircle className="h-6 w-6 text-white" />
              }
              <span className="text-xl font-extrabold text-white">
                {isCorrect ? 'Correct!' : 'Not quite.'}
              </span>
            </div>
            <p className="text-white/90 text-sm mb-5 leading-relaxed">
              {problem.explanation}
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCoachOpen((o) => !o)}
                className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Ask Coach
              </button>
              <button
                onClick={handleNext}
                className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-extrabold text-base border-b-4 active:translate-y-[2px] active:border-b-2 transition-all duration-75 ${
                  isCorrect
                    ? 'bg-white text-green-600 border-green-200 hover:bg-green-50'
                    : 'bg-white text-red-500 border-red-200 hover:bg-red-50'
                }`}
              >
                {currentIndex + 1 >= problems.length ? 'Finish' : 'Continue'}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coach panel */}
      {coachOpen && problem && (
        <div className="flex w-full max-w-sm flex-col border-l border-border bg-white sm:w-80 fixed right-0 top-0 h-full z-20 shadow-xl">
          <CoachPanel
            problem={problem}
            selectedIndex={selectedIndex}
            onClose={() => setCoachOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

export default function WorkoutPage() {
  return (
    <Suspense>
      <WorkoutPageInner />
    </Suspense>
  );
}
