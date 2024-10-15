interface I18N {
  en: { [key: string]: string };
  ru: { [key: string]: string };
}

const I18N_ = {
  "webChat/title": ["Easy Report Webchat", "Easy Report Веб-чат"],
  "webChat/online": ["Online", "Онлайн"],
  "webChat/tryingToReconnect": [
    "Trying to reconnect...",
    "Восстановление соединения...",
  ],
  "webChat/inputPlaceholder": ["Write a message...", "Напишите сообщение..."],
  "webChat/dataModel": ["Data model:", "Модель данных:"],
  clearMessages: ["Clear messages", "Очистить сообщения"],
};

const WebChatI18N: I18N = {
  en: {},
  ru: {},
};

Object.entries(I18N_).forEach(([key, [en, ru]]) => {
  WebChatI18N.en[key] = en;
  WebChatI18N.ru[key] = ru;
});

export default WebChatI18N;
