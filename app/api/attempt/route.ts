import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      topicId,
      itemFamilyId,
      difficulty,
      correct,
      selectedChoiceIndex,
      timeMs,
      coachOpened,
      coachMessageCount,
    } = body;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from('item_attempts').insert({
      user_id:              user?.id ?? null,
      topic:                topicId,
      item_family_id:       itemFamilyId,
      difficulty:           difficulty,
      correct:              correct,
      selected_choice_index: selectedChoiceIndex,
      time_ms:              timeMs ?? null,
      coach_opened:         coachOpened ?? false,
      coach_message_count:  coachMessageCount ?? 0,
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Telemetry must never break the workout — swallow errors silently
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
