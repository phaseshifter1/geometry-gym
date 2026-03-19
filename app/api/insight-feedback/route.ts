import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const body = await req.json();
  const { topic, interestId, insightText, rating } = body;

  if (typeof topic !== 'string' || typeof insightText !== 'string' || typeof rating !== 'boolean') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { error } = await supabase.from('insight_feedback').insert({
    user_id: user?.id ?? null,
    topic,
    interest_id: interestId ?? null,
    insight_text: insightText,
    rating,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
