export type TgUpdate = {
  message?: TgMessage;
  callback_query?: TgCallbackQuery;
};

export type TgMessage = {
  chat: { id: number };
  from: { id: number };
  text?: string;
};

export type TgCallbackQuery = {
  id: string;
  from: { id: number };
  message?: { chat: { id: number } };
  data?: string;
};
