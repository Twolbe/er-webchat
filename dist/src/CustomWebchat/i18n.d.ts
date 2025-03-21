type ResolvedTranslations<T> = {
    [K in keyof T]: T[K] extends readonly string[] ? T[K][number] : T[K] extends (...args: infer Args) => readonly string[] ? (...args: Args) => string : ResolvedTranslations<T[K]>;
};
export declare function useI18N(): ResolvedTranslations<{
    readonly online: readonly ["Online", "Онлайн"];
    readonly tryingToReconnect: readonly ["Trying to reconnect...", "Восстановление соединения..."];
    readonly inputPlaceholder: readonly ["Write a message...", "Напишите сообщение..."];
    readonly clearMessages: readonly ["Clear messages", "Очистить сообщения"];
    readonly expandChat: readonly ["Maximize", "На весь экран"];
    readonly compressChat: readonly ["Minimize", "Уменьшить"];
    readonly closeChat: readonly ["Close", "Закрыть"];
}>;
export {};
//# sourceMappingURL=i18n.d.ts.map