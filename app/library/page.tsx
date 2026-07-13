'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ChevronRight, Layers, Triangle, Ruler, Box, MapPin, Zap } from 'lucide-react';
import { NavBar } from '@/components/NavBar';
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

const FILTER_COLORS: Record<TopicId | 'all', { active: string; inactive: string }> = {
  all: {
    active: 'border-accent bg-accent text-[#0F172A]',
    inactive: 'border-accent/35 bg-accent/10 text-sky-100 hover:border-accent/70 hover:bg-accent/15 hover:text-white',
  },
  foundations: {
    active: 'border-blue-300 bg-blue-300 text-[#0F172A]',
    inactive: 'border-blue-300/35 bg-blue-300/10 text-blue-100 hover:border-blue-300/70 hover:bg-blue-300/15 hover:text-white',
  },
  'shape-form': {
    active: 'border-violet-300 bg-violet-300 text-[#0F172A]',
    inactive: 'border-violet-300/35 bg-violet-300/10 text-violet-100 hover:border-violet-300/70 hover:bg-violet-300/15 hover:text-white',
  },
  measurement: {
    active: 'border-emerald-300 bg-emerald-300 text-[#0F172A]',
    inactive: 'border-emerald-300/35 bg-emerald-300/10 text-emerald-100 hover:border-emerald-300/70 hover:bg-emerald-300/15 hover:text-white',
  },
  volume: {
    active: 'border-orange-300 bg-orange-300 text-[#0F172A]',
    inactive: 'border-orange-300/35 bg-orange-300/10 text-orange-100 hover:border-orange-300/70 hover:bg-orange-300/15 hover:text-white',
  },
  coordinates: {
    active: 'border-pink-300 bg-pink-300 text-[#0F172A]',
    inactive: 'border-pink-300/35 bg-pink-300/10 text-pink-100 hover:border-pink-300/70 hover:bg-pink-300/15 hover:text-white',
  },
  power: {
    active: 'border-amber-300 bg-amber-300 text-[#0F172A]',
    inactive: 'border-amber-300/35 bg-amber-300/10 text-amber-100 hover:border-amber-300/70 hover:bg-amber-300/15 hover:text-white',
  },
};

export default function LibraryPage() {
  const [activeFilter, setActiveFilter] = useState<TopicId | 'all'>('all');
  const allCards = getAllCards();
  const filtered = activeFilter === 'all'
    ? allCards
    : allCards.filter((c) => c.topic === activeFilter);

  return (
    <div className="min-h-screen bg-[#111827] text-[#F8FAFC] font-sans">

      <NavBar />

      {/* Header */}
      <div className="border-b border-[#263241] bg-[#111827]">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <BookOpen className="h-5 w-5 text-accent-dark" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Gym Library</p>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
            Learn the Concepts
          </h1>
          <p className="mt-3 max-w-xl text-base text-[#CBD5E1]">
            Browse short, clear explanations for every geometry concept in the gym.
            Read before you train, or look something up when you get stuck.
          </p>
          <p className="mt-2 text-sm font-medium text-accent">
            {allCards.length} concepts · {allCards.reduce((a, c) => a + c.readTime, 0)} min total
          </p>
        </div>
      </div>

      {/* Filter pills */}
      <div className="border-b border-[#263241] bg-[#121417]">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {TOPIC_FILTERS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                  activeFilter === id
                    ? FILTER_COLORS[id].active
                    : FILTER_COLORS[id].inactive
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
              className="group flex flex-col gap-3 rounded-2xl border border-[#D7E2EC] bg-[#F3F7FA] p-6 shadow-lg shadow-black/10 transition-all hover:border-accent/60 hover:shadow-xl"
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
              <h2 className="text-lg font-bold text-dark transition-colors group-hover:text-accent-dark">
                {card.title}
              </h2>
              <p className="text-[15px] leading-relaxed text-muted line-clamp-2">
                {card.body[0]}
              </p>
              <div className="mt-auto inline-flex w-fit items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-sm font-semibold text-accent-dark opacity-0 transition-opacity group-hover:opacity-100">
                Read more <ChevronRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
