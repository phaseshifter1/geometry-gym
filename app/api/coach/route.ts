import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { foundationsKnowledge } from '@/lib/knowledge/foundations';
import { shapeFormKnowledge } from '@/lib/knowledge/shape-form';
import { measurementKnowledge } from '@/lib/knowledge/measurement';
import { volumeKnowledge } from '@/lib/knowledge/volume';
import { coordinatesKnowledge } from '@/lib/knowledge/coordinates';
import { powerKnowledge } from '@/lib/knowledge/power';

export const runtime = 'edge';

// ─── Rate limiting ─────────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  rateLimitMap.set(ip, [...recent, now]);
  return false;
}

// ─── Knowledge lookup ──────────────────────────────────────────────────────────
interface CoachContext {
  question: string;
  studentAnswer: string | null;
  correctAnswer: string;
  explanation: string;
  topic: string;
}

function getKnowledge(topic: string): string {
  switch (topic) {
    case 'foundations':  return foundationsKnowledge;
    case 'shape-form':   return shapeFormKnowledge;
    case 'measurement':  return measurementKnowledge;
    case 'volume':       return volumeKnowledge;
    case 'coordinates':  return coordinatesKnowledge;
    case 'power':        return powerKnowledge;
    default:             return '';
  }
}

// ─── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please wait a moment and try again.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { messages, context }: { messages: UIMessage[]; context?: CoachContext } =
    await req.json();

  const knowledge = context ? getKnowledge(context.topic) : '';

  const knowledgeBlock = knowledge
    ? `\nHere is the reference material for this topic — use it to ground your answers:\n${knowledge}\n`
    : '';

  const contextBlock = context
    ? `
Current question the student is working on:
"${context.question}"

Student's answer: ${context.studentAnswer ?? 'Not answered yet'}
Correct answer: ${context.correctAnswer}
Built-in explanation: ${context.explanation}
`
    : '';

  const systemPrompt = `You are a friendly and encouraging geometry coach at Geometry Gym.
Your job is to help students understand geometry — not just get the right answer, but actually understand the concept behind it.
Keep your language clear and simple. Aim for a 6th grade reading level.
Be patient, warm, and positive. Never make the student feel bad for getting something wrong.
Use short sentences. Use real-world examples when they help.
Keep answers concise — 2 to 4 sentences for simple questions, longer only if the student asks for more detail.
If a student asks something outside of geometry, gently steer them back to the topic at hand.
${knowledgeBlock}${contextBlock}`;

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'),
    system: systemPrompt,
    messages: modelMessages,
    maxOutputTokens: 400,
  });

  return result.toTextStreamResponse();
}
