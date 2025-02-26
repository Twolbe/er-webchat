import ConfigProvider from "antd/es/config-provider";
import enUS from "antd/es/locale/en_US";
import ruRU from "antd/es/locale/ru_RU";
import { createContext } from "react";
import { AdminWebchat } from "./CustomWebchat/AdminWebchat/AdminWebchat";
import NoAdminWebchat from "./CustomWebchat/NoAdminWebchat/NoAdminWebchat";
import "./index.less";
// import { createRoot } from "react-dom/client";
import "antd/es/button/style/css";
import "antd/es/drawer/style/css";
import "antd/es/image/style/css";
import "antd/es/input/style/css";
import "antd/es/modal/style/css";
import "antd/es/spin/style/css";
import "antd/es/tooltip/style/css";
import WebChatI18N from "./CustomWebchat/i18n";

// const root = createRoot(document.getElementById("root")!);

export const KeycloakContext = createContext<{
  tennant: undefined | string;
  getTokens: undefined | (() => { access: string; refresh?: string });
  url: undefined | string;
  path: string;
  lang: "ru" | "en";
  title: string;
}>({
  tennant: undefined,
  getTokens: undefined,
  url: undefined,
  path: "/webhooks/portal/webhook",
  lang: "ru",
  title: WebChatI18N.ru["webChat/title"],
});

/**
 * @param {*} getTokens - function; returns current access and refresh tokens. refresh token is optional
 * @param {*} tennant - client realm in keycloak
 * @param {*} url - url to reach er core: [protocol]://easyreport.mycompany.com. Protocol values (wss | https | ws | http)
 * @param {*} path - path to socket connection. Default '/webhooks/portal/webhook'
 * @param {*} [embed=true] -  webchat on page/over page. Default 'true' (on page)
 * @param {*} [lang='ru'] - language. Default 'ru'
 * @param {*} [title=WebChatI18N[lang]["webChat/title"]] - webchat title. Default WebChatI18N[lang]["webChat/title"]
 */
const ERWebChat = ({
  getTokens,
  tennant,
  url,
  path = "/webhooks/portal/webhook",
  lang = "ru",
  embed = true,
  title = WebChatI18N[lang]["webChat/title"],
}: {
  getTokens: () => { access: string; refresh?: string };
  tennant: string;
  url: string;
  path?: string;
  lang?: "ru" | "en";
  embed?: boolean;
  title?: string;
}) => {
  return (
    <ConfigProvider locale={lang === "ru" ? ruRU : enUS}>
      <KeycloakContext.Provider
        value={{ getTokens, tennant, url, lang, path, title }}
      >
        {embed ? (
          <div style={{ height: "100%", display: "flex" }}>
            <NoAdminWebchat />
          </div>
        ) : (
          <AdminWebchat />
        )}
      </KeycloakContext.Provider>
    </ConfigProvider>
  );
};
export default ERWebChat;
// root.render(
//   <ERWebChat
//     tennant=""
//     url=""
//     getTokens={() => ({ access: "" })}
//   />
// );
