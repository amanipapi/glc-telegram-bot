import { handleTelegramUpdate } from "./telegram/router";

export interface Env {
  TELEGRAM_BOT_TOKEN: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  GEMINI_API_KEY: string;
  ADMIN_IDS?: string;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    try {
      if (url.pathname === "/health") return new Response("ok");

      if (url.pathname !== "/telegram" || req.method !== "POST") {
        return new Response("Not found", { status: 404 });
      }

      const update = await req.json();
      console.log("Incoming update:", JSON.stringify(update));

      await handleTelegramUpdate(update, env);
      return new Response("ok");
    } catch (err) {
      console.log("Worker error:", err instanceof Error ? (err.stack || err.message) : String(err));
      // Return 200 so Telegram doesn't keep retrying aggressively
      return new Response("ok");
    }
  },
};
