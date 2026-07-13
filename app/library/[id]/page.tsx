import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Dumbbell, Clock, ArrowLeft, Lightbulb, Globe, ChevronRight } from 'lucide-react';
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
    <div className="min-h-screen bg-[#111827] text-[#F8FAFC] font-sans">

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-white/95 text-dark backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-dark">Geometry Gym</span>
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
        <Link href="/library" className="mb-8 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/15 hover:text-accent">
          <ArrowLeft className="h-4 w-4" />
          Back to Library
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${meta.color}`}>
              {meta.label}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#CBD5E1]">
              <Clock className="h-3 w-3" />
              {card.readTime} min read
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl">
            {card.title}
          </h1>
        </div>

        {/* Body */}
        <div className="mb-8 space-y-4 rounded-2xl border border-[#D7E2EC] bg-[#F8FAFC] px-6 py-6 shadow-xl shadow-black/20">
          {card.body.map((paragraph, i) => (
            <p key={i} className="text-base leading-relaxed text-dark">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Remember callout */}
        <div className="mb-6 rounded-2xl border border-primary/20 bg-[#FFF7ED] px-6 py-5">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Remember</p>
          </div>
          <p className="text-sm leading-relaxed text-dark">{card.remember}</p>
        </div>

        {/* Real world */}
        <div className="mb-10 rounded-2xl border border-accent/20 bg-[#EAF7FE] px-6 py-5">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-accent-dark" />
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-dark">Real World</p>
          </div>
          <p className="text-sm leading-relaxed text-dark">{card.realWorld}</p>
        </div>

        {/* Practice CTA */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#D7E2EC] bg-[#F3F7FA] p-6 shadow-lg shadow-black/10 sm:flex-row sm:items-center">
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
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">Related concepts</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/library/${rel.id}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-[#D7E2EC] bg-[#F3F7FA] px-4 py-3 shadow-sm transition-all hover:border-accent/60 hover:shadow-md"
                >
                  <div>
                    <p className="text-sm font-semibold text-dark transition-colors group-hover:text-accent-dark">
                      {rel.title}
                    </p>
                    <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {rel.readTime} min
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent-dark" />
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
