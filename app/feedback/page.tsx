'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Dumbbell, MessageSquare, Send } from 'lucide-react';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [love, setLove] = useState('');
  const [hate, setHate] = useState('');
  const [missing, setMissing] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent('Geometry Gym — Beta Feedback');
    const body = encodeURIComponent(
      `Name: ${name || 'Not provided'}\n\n` +
      `What do you love?\n${love || 'Not provided'}\n\n` +
      `What do you hate or find frustrating?\n${hate || 'Not provided'}\n\n` +
      `What's missing?\n${missing || 'Not provided'}\n\n` +
      `Email for follow-up: ${email || 'Not provided'}`
    );
    window.location.href = `mailto:info@phaseshift.io?subject=${subject}&body=${body}`;
  }

  const canSubmit = love.trim() || hate.trim() || missing.trim();

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
          <Link href="/" className="text-base font-medium text-muted hover:text-dark transition-colors">
            Home
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-xl px-6 py-12">

        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Beta Feedback</p>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-dark mb-2">
          Help us build a better math gym
        </h1>
        <p className="text-base text-muted mb-10">
          Tell us what&apos;s working, what isn&apos;t, and what you wish existed.
          Every rep of feedback makes this better.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              Name <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-dark placeholder-muted focus:border-primary focus:outline-none"
            />
          </div>

          {/* What do you love */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              What do you love?
            </label>
            <textarea
              value={love}
              onChange={(e) => setLove(e.target.value)}
              placeholder="What's working well for you?"
              rows={3}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-dark placeholder-muted focus:border-primary focus:outline-none resize-none"
            />
          </div>

          {/* What do you hate */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              What do you hate or find frustrating?
            </label>
            <textarea
              value={hate}
              onChange={(e) => setHate(e.target.value)}
              placeholder="Be honest — we can take it."
              rows={3}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-dark placeholder-muted focus:border-primary focus:outline-none resize-none"
            />
          </div>

          {/* What's missing */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              What&apos;s missing?
            </label>
            <textarea
              value={missing}
              onChange={(e) => setMissing(e.target.value)}
              placeholder="What would make you come back every day?"
              rows={3}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-dark placeholder-muted focus:border-primary focus:outline-none resize-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              Email <span className="font-normal text-muted">(optional — if you&apos;d like a reply)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-dark placeholder-muted focus:border-primary focus:outline-none"
            />
          </div>

          <p className="text-xs text-muted">
            This will open your email client with your feedback pre-filled and ready to send.
          </p>

          <button
            type="submit"
            disabled={!canSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
            Send Feedback
          </button>

        </form>
      </div>
    </div>
  );
}
