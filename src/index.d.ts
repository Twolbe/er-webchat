declare module "er-webcaht" {
  const ERWebChat: React.FC<{
    getToken: () => string;
    tennant: string;
    lang?: "ru" | "en";
    embed?: boolean;
  }>;
  export = ERWebChat;
}
