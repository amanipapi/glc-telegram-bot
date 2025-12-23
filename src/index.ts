import { handleTelegramUpdate } from "./telegram/router";

export interface Env {
  TELEGRAM_BOT_TOKEN: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  GEMINI_API_KEY: string;
  ADMIN_IDS?: string;
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);

    // Always return a Response (never undefined)
    if (url.pathname === "/health") {
      return new Response("ok");
    }

    if (url.pathname !== "/telegram") {
      return new Response("Not found", { status: 404 });
    }

    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const update = await req.json();
      // Run async work safely; don't block response to Telegram
      ctx.waitUntil(handleTelegramUpdate(update, env));
      return new Response("ok");
    } catch (err) {
      console.log("Worker error:", err instanceof Error ? (err.stack || err.message) : String(err));
      // Return 200 to prevent Telegram retry storms
      return new Response("ok");
    }
  },
};
