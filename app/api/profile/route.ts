import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

function sanitizeInterest(raw: string): string {
  return raw
    .replace(/[^\w\s.,!?''\-]/g, '') // strip special chars, keep common punctuation
    .trim()
    .slice(0, 50);
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ interest: null, interestId: null }, { status: 401 });

  const { data } = await supabase
    .from('profiles')
    .select('interest, current_interest_id')
    .eq('id', user.id)
    .single();

  return NextResponse.json({
    interest: data?.interest ?? null,
    interestId: data?.current_interest_id ?? null,
  });
}

export async function PATCH(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const interest =
    typeof body.interest === 'string' && body.interest.trim().length > 0
      ? sanitizeInterest(body.interest)
      : null;

  let interestId: string | null = null;

  if (interest) {
    // Append to interests history
    const { data: inserted, error: insertError } = await supabase
      .from('interests')
      .insert({ user_id: user.id, value: interest })
      .select('id')
      .single();
    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });
    interestId = inserted.id;
  }

  const { error } = await supabase.from('profiles').upsert({
    id: user.id,
    interest,
    current_interest_id: interestId,
    updated_at: new Date().toISOString(),
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ interest, interestId });
}
