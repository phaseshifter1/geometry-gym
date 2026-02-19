import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';

export const runtime = 'edge';

interface CoachContext {
  question: string;
  studentAnswer: string | null;
  correctAnswer: string;
  explanation: string;
  topic: string;
}

export async function POST(req: Request) {
  const { messages, context }: { messages: UIMessage[]; context?: CoachContext } =
    await req.json();

  const contextBlock = context
    ? `
Current question the student is working on:
"${context.question}"

Student's answer: ${context.studentAnswer ?? 'Not answered yet'}
Correct answer: ${context.correctAnswer}
Built-in explanation: ${context.explanation}
`
    : '';

  const systemPrompt = `You are a friendly and encouraging geometry coach.
Your job is to help students understand geometry — especially angles right now.
Keep your language clear and simple. Aim for a 6th grade reading level.
Be patient, warm, and positive. Never make the student feel bad for getting something wrong.
Use short sentences. Use real-world examples when they help.
Keep answers concise — 2 to 4 sentences for simple questions, longer only if the student asks for more detail.
${contextBlock}`;

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'),
    system: systemPrompt,
    messages: modelMessages,
  });

  return result.toTextStreamResponse();
}
