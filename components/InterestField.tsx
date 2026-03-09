'use client';

import { useState, useEffect, useRef } from 'react';
import { Pencil } from 'lucide-react';

const INTEREST_KEY = 'gg:interest';

export function InterestField({ initial }: { initial: string | null }) {
  const [value, setValue] = useState(initial ?? '');
  const [saved, setSaved] = useState<string | null>(initial);
  const [editing, setEditing] = useState(initial === null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync DB value to localStorage on mount — clear it if no interest is set
  useEffect(() => {
    if (initial) {
      localStorage.setItem(INTEREST_KEY, initial);
    } else {
      localStorage.removeItem(INTEREST_KEY);
    }
  }, [initial]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  async function save() {
    if (value === saved) {
      setEditing(false);
      return;
    }
    setStatus('saving');
    await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interest: value }),
    });
    if (value.trim().length > 0) {
      localStorage.setItem(INTEREST_KEY, value.trim());
    } else {
      localStorage.removeItem(INTEREST_KEY);
    }
    setSaved(value);
    setStatus('saved');
    setEditing(false);
    setTimeout(() => setStatus('idle'), 2000);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
        Your Interest
      </p>

      {editing ? (
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            maxLength={50}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
              if (e.key === 'Escape') { setValue(saved ?? ''); setEditing(false); }
            }}
            placeholder="e.g. football, music, architecture…"
            className="flex-1 rounded-xl border border-border bg-white px-4 py-2 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <span className="text-xs w-12 text-right shrink-0 text-muted">
            {status === 'saving' ? 'Saving…' : ''}
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          {saved ? (
            <p className="text-2xl font-extrabold text-primary capitalize">{saved}</p>
          ) : (
            <p className="text-sm text-muted italic">Not set yet</p>
          )}
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-dark transition-colors shrink-0"
          >
            <Pencil className="h-3.5 w-3.5" />
            {saved ? 'Change' : 'Add'}
          </button>
        </div>
      )}

      {status === 'saved' && !editing && (
        <p className="mt-2 text-xs text-green-600 font-medium">Saved</p>
      )}

      <p className="mt-3 text-xs text-muted">
        Your coach uses this to make post-workout insights more relevant to you.
      </p>
    </div>
  );
}
