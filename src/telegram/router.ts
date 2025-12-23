import type { Env } from "../index";
import type { TgUpdate } from "./types";
import { tgAnswerCallback, tgSendMessage } from "./api";
import { langKeyboard, mainMenuKeyboard, foundationKeyboard, qaKeyboard } from "./ui";
import { ensureUser, getUser, setLang, setMode } from "../features/user";
import { M, verseText, type Lang } from "../i18n/messages";
import { savePrayerRequest } from "../features/prayer";

export async function handleTelegramUpdate(update: TgUpdate, env: Env) {
  // Callbacks (button presses)
  if (update.callback_query) {
    const cb = update.callback_query;
    const chatId = cb.message?.chat.id;
    const userId = cb.from.id;
    const data = cb.data || "";
    if (!chatId) return;

    await tgAnswerCallback(env, cb.id);
    await ensureUser(env, userId);

    const { lang } = await getUser(env, userId);
    const t = M[lang];

    // Language selection
    if (data.startsWith("LANG:")) {
      const newLang = data.split(":")[1] as Lang;
      await setLang(env, userId, newLang);
      const tt = M[newLang];
      await tgSendMessage(env, chatId, `${tt.welcome}\n\n${verseText[newLang]}\n\n${tt.mainMenu}`, mainMenuKeyboard());
      return;
    }

    // Menu navigation
    if (data === "MENU:LANG") {
      await tgSendMessage(env, chatId, t.pickLang, langKeyboard());
      return;
    }

    if (data === "MENU:FOUNDATION") {
      await tgSendMessage(env, chatId, t.foundationMenu, foundationKeyboard(t.back));
      return;
    }

    if (data === "MENU:PRAYER") {
      await setMode(env, userId, "PRAYER");
      await tgSendMessage(env, chatId, t.prayerPrompt);
      return;
    }

    if (data === "FOUND:QA") {
      await setMode(env, userId, "FOUNDATION_QA");
      await tgSendMessage(env, chatId, t.enterQA, qaKeyboard(t.exit, t.back));
      return;
    }

    if (data === "QA:EXIT") {
      await setMode(env, userId, "MENU");
      await tgSendMessage(env, chatId, t.exitQA, mainMenuKeyboard());
      return;
    }

    if (data === "MENU:BACK") {
      await setMode(env, userId, "MENU");
      await tgSendMessage(env, chatId, t.mainMenu, mainMenuKeyboard());
      return;
    }

    // Placeholders (we'll move these into Supabase config later)
    if (data.startsWith("FOUND:")) {
      await tgSendMessage(env, chatId, "Coming soon.");
      return;
    }

    await tgSendMessage(env, chatId, t.mainMenu, mainMenuKeyboard());
    return;
  }

  // Messages
  if (update.message?.text) {
    const chatId = update.message.chat.id;
    const userId = update.message.from.id;
    const text = update.message.text.trim();

    await ensureUser(env, userId);
    const { lang, mode } = await getUser(env, userId);
    const t = M[lang];

    if (text === "/start") {
      // Show welcome + verse + language picker
      await tgSendMessage(env, chatId, `${t.welcome}\n\n${verseText[lang]}\n\n${t.pickLang}`, langKeyboard());
      return;
    }

    // PRAYER mode: save prayer request as text
    if (mode === "PRAYER") {
      await savePrayerRequest(env, userId, text);
      await setMode(env, userId, "MENU");
      await tgSendMessage(env, chatId, t.prayerSaved, mainMenuKeyboard());
      return;
    }

    // FOUNDATION_QA mode: Phase 6 will handle Q&A pipeline.
    if (mode === "FOUNDATION_QA") {
      await tgSendMessage(env, chatId, t.onlyFoundation, qaKeyboard(t.exit, t.back));
      return;
    }

    // Default: show menu
    await tgSendMessage(env, chatId, t.mainMenu, mainMenuKeyboard());
  }
}
