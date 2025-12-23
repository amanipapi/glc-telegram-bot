import type { Lang } from "../i18n/messages";

export function langKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "አማርኛ", callback_data: "LANG:am" },
        { text: "English", callback_data: "LANG:en" },
      ],
      [
        { text: "Afaan Oromo", callback_data: "LANG:om" },
        { text: "ትግርኛ", callback_data: "LANG:ti" },
      ],
    ],
  };
}

export function mainMenuKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "Church Info", callback_data: "MENU:CHURCH_INFO" }],
      [{ text: "Ministries & Contacts", callback_data: "MENU:MINISTRIES" }],
      [{ text: "Prayer Requests", callback_data: "MENU:PRAYER" }],
      [{ text: "Foundation Classes", callback_data: "MENU:FOUNDATION" }],
      [{ text: "Change Language", callback_data: "MENU:LANG" }],
    ],
  };
}

export function foundationKeyboard(backLabel: string) {
  return {
    inline_keyboard: [
      [{ text: "Foundation 1", callback_data: "FOUND:1" }],
      [{ text: "Foundation 2", callback_data: "FOUND:2" }],
      [{ text: "Foundation Q&A (Ask a Question)", callback_data: "FOUND:QA" }],
      [{ text: backLabel, callback_data: "MENU:BACK" }],
    ],
  };
}

export function qaKeyboard(exitLabel: string, backLabel: string) {
  return {
    inline_keyboard: [
      [{ text: exitLabel, callback_data: "QA:EXIT" }],
      [{ text: backLabel, callback_data: "MENU:FOUNDATION" }],
    ],
  };
}
