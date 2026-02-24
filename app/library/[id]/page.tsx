import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Dumbbell, BookOpen, Clock, ArrowLeft, Lightbulb, Globe, ChevronRight } from 'lucide-react';
import { getCardById, getRelatedCards } from '@/lib/library';
import type { TopicId } from '@/lib/problems/types';

const TOPIC_META: Record<TopicId, { label: string; slug: string; color: string }> = {
  foundations:  { label: 'Foundations',          slug: 'foundations', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  'shape-form': { label: 'Shape & Form',          slug: 'shape-form',  color: 'bg-purple-50 text-purple-700 border-purple-200' },
  measurement:  { label: 'The Measurement Room',  slug: 'measurement', color: 'bg-green-50 text-green-700 border-green-200' },
  volume:       { label: 'Heavy Lifts',           slug: 'volume',      color: 'bg-orange-50 text-orange-700 border-orange-200' },
  coordinates:  { label: 'The Track',             slug: 'coordinates', color: 'bg-pink-50 text-pink-700 border-pink-200' },
  power:        { label: 'Power Movement',        slug: 'power',       color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
};

export default async function CardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = getCardById(id);
  if (!card) notFound();

  const related = getRelatedCards(card);
  const meta = TOPIC_META[card.topic];

  return (
    <div className="min-h-screen bg-white text-dark font-sans">

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold tracking-tight">Geometry Gym</span>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Beta</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/library" className="text-base font-medium text-muted hover:text-dark transition-colors">
              Library
            </Link>
            <Link
              href={`/workout/${meta.slug}?mode=practice`}
              className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Start Training
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-10">

        {/* Breadcrumb */}
        <Link href="/library" className="flex items-center gap-1.5 text-sm text-muted hover:text-dark transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Library
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${meta.color}`}>
              {meta.label}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted">
              <Clock className="h-3 w-3" />
              {card.readTime} min read
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-dark sm:text-4xl">
            {card.title}
          </h1>
        </div>

        {/* Body */}
        <div className="space-y-4 mb-8">
          {card.body.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-dark">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Remember callout */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Remember</p>
          </div>
          <p className="text-sm leading-relaxed text-dark">{card.remember}</p>
        </div>

        {/* Real world */}
        <div className="rounded-2xl border border-border bg-surface px-6 py-5 mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-muted" />
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Real World</p>
          </div>
          <p className="text-sm leading-relaxed text-muted">{card.realWorld}</p>
        </div>

        {/* Practice CTA */}
        <div className="rounded-2xl border border-border bg-white p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-dark">Feeling ready?</p>
            <p className="text-sm text-muted mt-0.5">Put this concept to work with a practice workout.</p>
          </div>
          <Link
            href={`/workout/${meta.slug}?mode=practice`}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Practice this concept
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Related cards */}
        {related.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Related concepts</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/library/${rel.id}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3 transition-all hover:border-primary/40 hover:shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">
                      {rel.title}
                    </p>
                    <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {rel.readTime} min
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted group-hover:text-primary transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
