import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

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

  const { topicLabel, interest }: { topicLabel: string; interest?: string | null } =
    await req.json();

  // Sanitise interest before injecting into prompt (defence-in-depth)
  const safeInterest =
    typeof interest === 'string' && interest.trim().length > 0
      ? interest.replace(/[^\w\s.,!?''\-]/g, '').trim().slice(0, 50)
      : null;

  const interestClause = safeInterest
    ? `The student is interested in: "${safeInterest}". You must ground at least one sentence in a specific, concrete example from "${safeInterest}" — not a vague mention, but a real detail (e.g. if football: pitch markings, angles of a pass, the arc of a free kick, field dimensions). Make the connection feel like something only a "${safeInterest}" person would notice.`
    : '';

  const { text } = await generateText({
    model: anthropic('claude-haiku-4-5-20251001'),
    maxOutputTokens: 160,
    temperature: 1,
    prompt: `A student just completed a geometry workout on the topic: "${topicLabel}".
${interestClause}
Write 2-3 warm, encouraging sentences that connect this topic to real life and why training it matters.
Do not mention their score or performance. Do not say "great job" or use generic praise.
Keep it honest, grounded, and briefly inspiring.
Assume a North American audience — for example, "football" means American football (NFL, touchdowns, yard lines), not soccer.
Output plain text only — no markdown, no headers, no bullet points, no formatting of any kind. Just sentences.`,
  });

  return new Response(JSON.stringify({ insight: text }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
