# Geometry Gym

A safe space to learn, play, and exercise your math muscles. Daily geometry workouts that build real understanding, one problem at a time. No pressure. Just reps.

---

## What It Does

Geometry Gym gives you short, focused geometry workouts. Pick a topic, answer 10 problems, and see how you did. No account required — just show up and train.

- **6 muscle groups** covering all of middle-school geometry (foundations, shape & form, measurement, volume, coordinates, and power movement)
- **Daily Workout** — a fresh set of problems every day, same seed for everyone
- **Open Gym** — random problems any time you want to drill a specific topic
- **AI Coach** — ask questions about any problem mid-workout
- **My Progress** — track accuracy and sessions per topic over time (requires Google sign-in)

---

## Design Principles

- **Guest-first.** No sign-in gate. You train immediately.
- **Gym language, not classroom language.** Problems = Reps. Topics = Muscle Groups. Difficulty = Warm Up / Main Set / Max Out.
- **No grade labels shown to users.** The `standard` field on each problem encodes grade internally (e.g. `4.G.A.1`), but users only see the topic name. You pick what you can handle, not what your grade says.
- **Algorithmic problems.** Every problem is generated from a seed using a deterministic RNG — no AI at problem-generation time. This guarantees correct answers and keeps it free to run.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth + DB | Supabase (Google OAuth + Postgres) |
| AI Coach | Anthropic Claude via AI SDK |
| Deployment | Vercel |

---

## Local Setup

### 1. Clone and install

```bash
git clone https://github.com/phaseshifter1/geometry-gym.git
cd geometry-gym
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. **Authentication → Providers → Google** — enable Google OAuth, paste your Client ID and Client Secret from Google Cloud Console.
3. **Authentication → URL Configuration** — add:
   - Site URL: `http://localhost:3000`
   - Redirect URL: `http://localhost:3000/auth/callback`
4. **SQL Editor** — run the contents of `supabase-schema.sql`.
5. **Project Settings → API** — copy your `URL` and `anon` key.

### 3. Add environment variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

The Anthropic key is only needed for the AI Coach feature. The app works without it — the Coach panel just won't respond.

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
  page.tsx                  Home page
  layout.tsx                Root layout
  workout/[topic]/page.tsx  Workout experience (problems, coach, finished screen)
  progress/page.tsx         My Progress page (requires auth)
  auth/callback/route.ts    OAuth redirect handler
  api/coach/route.ts        AI Coach API route

components/
  NavBar.tsx                Shared top navigation
  SignInButton.tsx          Google sign-in / sign-out button
  ContinueWorkoutBanner.tsx Resume banner for in-progress sessions

lib/
  auth.ts                   useUser() hook + saveWorkoutToDb() helper
  supabase/
    browser.ts              Browser-side Supabase client
    server.ts               Server-side Supabase client (RSC + API routes)
  workout-session.ts        localStorage session persistence
  problems/
    generator.ts            Generates a workout from a topic + seed
    types.ts                TopicId, Problem, TOPIC_META, SLUG_TO_TOPIC
    topics/                 Problem banks per topic

middleware.ts               Refreshes Supabase auth session on every request
supabase-schema.sql         DB schema + RLS policies
```

---

## Auth Flow

1. Guest trains → finishes workout → sees soft prompt: *"Want to save your progress? Sign in with Google."*
2. Clicking **Sign in with Google** starts the OAuth flow.
3. `/auth/callback` exchanges the code for a session cookie and redirects to `/`.
4. On future workouts, if signed in, the session is saved to Supabase silently — no prompt shown again.
5. `/progress` redirects to `/` if not signed in.

---

## Deployment (Vercel)

1. Push to GitHub.
2. [vercel.com/new](https://vercel.com/new) → Import repository → Vercel auto-detects Next.js.
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY`
4. In Supabase, add your production URL to the allowed redirect URLs.
5. Deploy.

---

## Contributing

Issues and pull requests welcome. This is an early-stage project — the most useful contributions right now are:

- New problem sets for existing topics
- Bug reports on incorrect answers or explanations
- Accessibility and mobile UX feedback

---

## License

MIT
