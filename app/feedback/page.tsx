'use client';

import { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { NavBar } from '@/components/NavBar';

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
    <div className="min-h-screen bg-[#111827] text-[#F8FAFC] font-sans">

      <NavBar />

      <div className="mx-auto max-w-2xl px-6 py-12">

        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
            <MessageSquare className="h-5 w-5 text-accent-dark" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Beta Feedback</p>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#F8FAFC] mb-2">
          Help us build a better math gym
        </h1>
        <p className="text-base text-[#CBD5E1] mb-10">
          Tell us what&apos;s working, what isn&apos;t, and what you wish existed.
          Every rep of feedback makes this better.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-[#D7E2EC] bg-[#F8FAFC] p-6 shadow-xl shadow-black/20 sm:p-8">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              Name <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-[#D7E2EC] bg-white px-4 py-3 text-sm text-dark placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
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
              className="w-full rounded-xl border border-[#D7E2EC] bg-white px-4 py-3 text-sm text-dark placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
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
              className="w-full rounded-xl border border-[#D7E2EC] bg-white px-4 py-3 text-sm text-dark placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
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
              className="w-full rounded-xl border border-[#D7E2EC] bg-white px-4 py-3 text-sm text-dark placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
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
              className="w-full rounded-xl border border-[#D7E2EC] bg-white px-4 py-3 text-sm text-dark placeholder-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <p className="text-xs text-muted">
            This will open your email client with your feedback pre-filled and ready to send.
          </p>

          <button
            type="submit"
            disabled={!canSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
            Send Feedback
          </button>

        </form>
      </div>
    </div>
  );
}
