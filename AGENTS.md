# Geometry Gym — Codex Agent Briefing

Read `CLAUDE.md` first. Everything in that file applies here: vocabulary, tech stack, directory layout, factory system, diagram system, difficulty tiers, database rules, and conventions.

## Session Handoff

`docs/handoff.md` is a running log of session summaries. It is gitignored but readable from the local filesystem.

**At the start of every session:** read the latest entry in `docs/handoff.md` to understand what was done last, what is uncommitted, and what comes next.

**At the end of every session:** prepend a new entry to `docs/handoff.md` covering: what was done, what was committed/pushed, what remains uncommitted, any key decisions, and suggested next steps.

## Codex-specific notes

- Dev server runs on **port 3003** (`npm run dev`)
- Never commit `.claude/settings.local.json` — it is gitignored for a reason
- Schema changes go to Supabase first, code second
- Do not generate or verify correct answers in AI routes — math stays algorithmic
