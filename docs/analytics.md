# Claude-Powered Analytics

## Status
Planned — not yet implemented.

## Goal
Lightweight product analytics for internal use during Beta.
No dashboards — ask Claude questions about usage in plain English.

## Events to track

| Event | Properties |
|-------|-----------|
| `session_started` | topic, mode, seed, timestamp |
| `question_answered` | topic, question_id, correct, difficulty, time_taken_ms |
| `session_completed` | topic, mode, score, total, duration_ms |
| `coach_opened` | topic, question_id, answered (bool) |
| `coach_message_sent` | topic, message_number |
| `library_card_viewed` | card_id, topic |
| `library_filtered` | filter_topic |

## Architecture

### Storage
- Events written to a Supabase table: `events(id, session_id, event, properties, created_at)`
- `session_id` — anonymous UUID generated on first visit, stored in localStorage
- If invite system is live: tie `session_id` to `invite_code` for per-tester view

### Ingestion
- Client fires events via a lightweight `track(event, props)` helper
- Helper calls `POST /api/analytics` — edge route writes to Supabase
- Fire-and-forget (non-blocking, errors silently swallowed)

### Claude layer (admin page)
- Route: `/admin/analytics` (protected, not in public nav)
- Page fetches aggregate event summaries from Supabase
- Text box: ask Claude a question about your data
- Claude receives a structured summary (counts, breakdowns, drop-off points) + your question
- Returns plain English insight — no charts needed

### Example queries
- "Where are users getting stuck?"
- "Which topic has the lowest completion rate?"
- "How often is Coach being used — and does it correlate with correct answers?"
- "Are users coming back for a second session?"

## Future (post-invite system)
- Per-tester breakdown: "How is tester gym-beta-lighthouse progressing?"
- Show users their own stats on a `/progress` page
- Retention metrics once auth/accounts are in place

## Stack
- Supabase (free tier, Postgres) — event storage
- `@supabase/supabase-js` — client
- Claude (via existing coach API pattern) — analytics queries
