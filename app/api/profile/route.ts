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

  if (!user) return NextResponse.json({ interest: null }, { status: 401 });

  const { data } = await supabase
    .from('profiles')
    .select('interest')
    .eq('id', user.id)
    .single();

  return NextResponse.json({ interest: data?.interest ?? null });
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

  const { error } = await supabase.from('profiles').upsert({
    id: user.id,
    interest,
    updated_at: new Date().toISOString(),
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ interest });
}
