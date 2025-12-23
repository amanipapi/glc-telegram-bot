import { getSupabase } from "../db/supabase";
import type { Env } from "../index";

export async function savePrayerRequest(env: Env, userId: number, message: string) {
  const sb = getSupabase(env);
  await sb.from("prayer_requests").insert({
    telegram_user_id: userId,
    message,
    status: "new",
  });
}
