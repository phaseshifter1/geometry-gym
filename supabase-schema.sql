-- Geometry Gym — Supabase schema
-- Run this in the Supabase SQL Editor after creating your project.

create table workout_sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade not null,
  topic        text not null,
  score        integer not null,
  total        integer not null,
  completed_at timestamptz default now()
);

alter table workout_sessions enable row level security;

-- Users can insert their own session rows (anon key is sufficient — no service role needed)
create policy "Users can insert their own sessions"
  on workout_sessions for insert
  with check (auth.uid() = user_id);

-- Users can read only their own session rows
create policy "Users can read their own sessions"
  on workout_sessions for select
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- Profiles table (one row per user — stores personalisation preferences)
-- ─────────────────────────────────────────────────────────────────────────────

create table profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  interest    text check (char_length(interest) <= 50),
  updated_at  timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can read their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);
