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

-- ─────────────────────────────────────────────────────────────────────────────
-- Interests table (append-only history of user interests)
-- ─────────────────────────────────────────────────────────────────────────────

create table interests (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade not null,
  value      text not null check (char_length(value) <= 50),
  created_at timestamptz default now()
);

alter table interests enable row level security;

create policy "Users can insert their own interests"
  on interests for insert
  with check (auth.uid() = user_id);

create policy "Users can read their own interests"
  on interests for select
  using (auth.uid() = user_id);

-- Add current_interest_id to profiles (FK to interests — denormalised for fast reads)
alter table profiles
  add column current_interest_id uuid references interests(id);

-- ─────────────────────────────────────────────────────────────────────────────
-- Insight feedback table
-- ─────────────────────────────────────────────────────────────────────────────

create table insight_feedback (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) on delete cascade, -- nullable: guests can rate too
  topic        text not null,
  interest_id  uuid references interests(id),                    -- nullable: no interest set
  insight_text text not null,
  rating       boolean not null,                                  -- true = thumbs up, false = thumbs down
  created_at   timestamptz default now()
);

alter table insight_feedback enable row level security;

create policy "Anyone can insert insight feedback"
  on insight_feedback for insert
  with check (true);

-- Admins query this table directly via service role — no user select policy needed
