# Geometry Gym — Codex Agent Briefing

Read `CLAUDE.md` first. Everything in that file applies here: vocabulary, tech stack, directory layout, factory system, diagram system, difficulty tiers, database rules, and conventions.

## Codex-specific notes

- Dev server runs on **port 3003** (`npm run dev`)
- Never commit `.claude/settings.local.json` — it is gitignored for a reason
- Schema changes go to Supabase first, code second
- Do not generate or verify correct answers in AI routes — math stays algorithmic
