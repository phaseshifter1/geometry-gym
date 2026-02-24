# Invite-Only Access System

## Status
Planned — not yet implemented.

## Goal
Gate access to Geometry Gym during Beta to a controlled list of testers.
Targeted, revocable, no user accounts required.

## How It Works

### Invite codes
- Plain strings stored in `invites.json` at project root (gitignored)
- You create codes manually (e.g. `gym-beta-lighthouse`) or run `npm run gen-invite`
- One code per tester — makes it easy to track and revoke individually

### User flow
1. User visits any URL → Next.js middleware checks for a valid cookie
2. No cookie → redirected to `/join`
3. User enters their invite code → validated against `invites.json`
4. Valid → cookie set (30-day expiry) → redirected to home
5. Invalid → error message, try again

### Adding / revoking codes
- Add: append a new string to `invites.json`
- Revoke: remove the string — existing cookie for that code becomes invalid on next check
- No server restart needed if codes are read at request time

## Files to Build

| File | Purpose |
|------|---------|
| `invites.json` | Active invite codes (gitignored) |
| `invites.example.json` | Placeholder committed to git |
| `app/join/page.tsx` | Gate page — enter invite code form |
| `middleware.ts` | Intercepts all routes, checks cookie |
| `app/api/join/route.ts` | Validates code, sets cookie |
| `scripts/gen-invite.ts` | CLI to generate a new random code |

## Cookie
- Name: `gg_invite`
- Value: the validated invite code
- Expiry: 30 days
- HttpOnly, SameSite=Lax

## Security notes
- Codes are low-security by design (beta, small group, no sensitive data)
- If a code is shared/leaked, remove it from `invites.json` to revoke all sessions using it
- For tighter control later: move to NextAuth with email allowlist

## Analytics integration (future)
- When a user enters their code, log `invite_code` as an anonymous identifier
- Tie all subsequent events to that identifier for per-tester analytics
