'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Dumbbell, BookOpen, Clock, ChevronRight, Layers, Triangle, Ruler, Box, MapPin, Zap } from 'lucide-react';
import { getAllCards } from '@/lib/library';
import type { TopicId } from '@/lib/problems/types';

const TOPIC_FILTERS: { id: TopicId | 'all'; label: string; icon: React.ElementType }[] = [
  { id: 'all',         label: 'All',                 icon: BookOpen },
  { id: 'foundations', label: 'Foundations',          icon: Layers },
  { id: 'shape-form',  label: 'Shape & Form',         icon: Triangle },
  { id: 'measurement', label: 'The Measurement Room', icon: Ruler },
  { id: 'volume',      label: 'Heavy Lifts',          icon: Box },
  { id: 'coordinates', label: 'The Track',            icon: MapPin },
  { id: 'power',       label: 'Power Movement',       icon: Zap },
];

const TOPIC_COLORS: Record<TopicId, string> = {
  foundations:  'bg-blue-50 text-blue-700 border-blue-200',
  'shape-form': 'bg-purple-50 text-purple-700 border-purple-200',
  measurement:  'bg-green-50 text-green-700 border-green-200',
  volume:       'bg-orange-50 text-orange-700 border-orange-200',
  coordinates:  'bg-pink-50 text-pink-700 border-pink-200',
  power:        'bg-yellow-50 text-yellow-700 border-yellow-200',
};

export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState<TopicId | 'all'>('all');
  const allCards = getAllCards();
  const filtered = activeFilter === 'all'
    ? allCards
    : allCards.filter((c) => c.topic === activeFilter);

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
            <Link href="/" className="text-base font-medium text-muted hover:text-dark transition-colors">
              Home
            </Link>
            <Link
              href="/workout/foundations?mode=practice"
              className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Start Training
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Gym Library</p>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-dark">
            Learn the Concepts
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted">
            Browse short, clear explanations for every geometry concept in the gym.
            Read before you train, or look something up when you get stuck.
          </p>
          <p className="mt-2 text-sm font-medium text-primary">
            {allCards.length} concepts · {allCards.reduce((a, c) => a + c.readTime, 0)} min total
          </p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {TOPIC_FILTERS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                  activeFilter === id
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-white text-muted hover:border-primary/40 hover:text-dark'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Card grid */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((card) => (
            <Link
              key={card.id}
              href={`/library/${card.id}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-white p-6 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${TOPIC_COLORS[card.topic]}`}>
                  {TOPIC_FILTERS.find(f => f.id === card.topic)?.label}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <Clock className="h-3 w-3" />
                  {card.readTime} min
                </span>
              </div>
              <h2 className="text-base font-bold text-dark group-hover:text-primary transition-colors">
                {card.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted line-clamp-2">
                {card.body[0]}
              </p>
              <div className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100 mt-auto">
                Read more <ChevronRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
