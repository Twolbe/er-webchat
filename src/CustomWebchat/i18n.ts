import { useContext } from "react";
import { KeycloakContext } from "..";

type Translations = {
  [key: string]:
    | readonly string[]
    | ((...args: any[]) => readonly string[])
    | Translations;
};

const translations = {
  online: ["Online", "Онлайн"],
  tryingToReconnect: ["Trying to reconnect...", "Восстановление соединения..."],
  inputPlaceholder: ["Write a message...", "Напишите сообщение..."],
  clearMessages: ["Clear messages", "Очистить сообщения"],
  expandChat: ["Maximize", "На весь экран"],
  compressChat: ["Minimize", "Уменьшить"],
  closeChat: ["Close", "Закрыть"],
} as const satisfies Translations;

const langToIndex = {
  en: 0,
  ru: 1,
} as const;

type ResolvedTranslations<T> = {
  [K in keyof T]: T[K] extends readonly string[]
    ? T[K][number]
    : T[K] extends (...args: infer Args) => readonly string[]
    ? (...args: Args) => string
    : ResolvedTranslations<T[K]>;
};

function resolveTranslations<T extends Translations>(
  obj: T,
  lang: keyof typeof langToIndex
): ResolvedTranslations<T> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value[langToIndex[lang]]];
      }
      if (typeof value === "function") {
        return [
          key,
          (...args: any[]) => {
            const result = value(...args);
            return result[langToIndex[lang]];
          },
        ];
      }
      return [key, resolveTranslations(value as Translations, lang)];
    })
  ) as ResolvedTranslations<T>;
}

export function useI18N() {
  const { lang } = useContext(KeycloakContext);
  return resolveTranslations(translations, lang as keyof typeof langToIndex);
}
