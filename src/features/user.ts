import { getSupabase } from "../db/supabase";
import type { Env } from "../index";
import type { Lang } from "../i18n/messages";

export type Mode = "MENU" | "FOUNDATION_QA" | "PRAYER";

export async function ensureUser(env: Env, userId: number) {
  const sb = getSupabase(env);
  await sb.from("users").upsert({ telegram_user_id: userId }, { onConflict: "telegram_user_id" });
}

export async function getUser(env: Env, userId: number): Promise<{ lang: Lang; mode: Mode }> {
  const sb = getSupabase(env);
  const { data } = await sb.from("users").select("lang,mode").eq("telegram_user_id", userId).single();
  return { lang: (data?.lang ?? "am") as Lang, mode: (data?.mode ?? "MENU") as Mode };
}

export async function setLang(env: Env, userId: number, lang: Lang) {
  const sb = getSupabase(env);
  await sb.from("users").update({ lang, mode: "MENU" }).eq("telegram_user_id", userId);
}

export async function setMode(env: Env, userId: number, mode: Mode) {
  const sb = getSupabase(env);
  await sb.from("users").update({ mode }).eq("telegram_user_id", userId);
}
