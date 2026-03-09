import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

export const runtime = 'edge';

// ─── Rate limiting ──────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  rateLimitMap.set(ip, [...recent, now]);
  return false;
}

// ─── Route handler ──────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Too many requests.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { topicLabel }: { topicLabel: string } = await req.json();

  const { text } = await generateText({
    model: anthropic('claude-haiku-4-5-20251001'),
    prompt: `A student just completed a geometry workout on the topic: "${topicLabel}".

Write 2-3 warm, encouraging sentences that connect this topic to real life and why training it matters.
Do not mention their score or performance. Do not say "great job" or use generic praise.
Speak to anyone — you don't know their age or background. Keep it honest, grounded, and briefly inspiring.
Focus on what this kind of thinking unlocks in the real world.
Output plain text only — no markdown, no headers, no bullet points, no formatting of any kind. Just sentences.
    maxOutputTokens: 120,
  });

  return new Response(JSON.stringify({ insight: text }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
