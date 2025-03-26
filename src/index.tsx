import "antd/es/button/style/css";
import ConfigProvider from "antd/es/config-provider";
import "antd/es/drawer/style/css";
import "antd/es/image/style/css";
import "antd/es/input/style/css";
import enUS from "antd/es/locale/en_US";
import ruRU from "antd/es/locale/ru_RU";
import "antd/es/modal/style/css";
import "antd/es/spin/style/css";
import "antd/es/tooltip/style/css";
import { createContext, CSSProperties } from "react";
// import { createRoot } from "react-dom/client";
import { AdminWebchat } from "./CustomWebchat/AdminWebchat/AdminWebchat";
import NoAdminWebchat from "./CustomWebchat/NoAdminWebchat/NoAdminWebchat";
import "./index.less";

// const root = createRoot(document.getElementById("root")!);

export const KeycloakContext = createContext<{
  tennant: undefined | string;
  legacyTennant: undefined | boolean;
  getTokens: undefined | (() => { access: string; refresh?: string });
  url: undefined | string;
  path: string;
  lang: "ru" | "en";
  title: string;
  extraAction: undefined | any;
  background: CSSProperties["background"];
  senderId: string | undefined;
  embed: boolean | undefined;
}>({
  tennant: undefined,
  legacyTennant: false,
  getTokens: undefined,
  url: undefined,
  path: "/webhooks/portal/webhook",
  lang: "ru",
  title: "Easy Report Веб-чат",
  extraAction: undefined,
  background: "#d9d9d9",
  senderId: undefined,
  embed: false,
});

/**
 * @param {*} getTokens - function; returns current access and refresh tokens. refresh token is optional
 * @param {*} tennant - client realm in keycloak
 * @param {*} [legacyTennant=false] - if 'true', uses legacy (ER<25.3.5) tennant structure. Default 'false'
 * @param {*} url - URL to reach er core: [protocol]://easyreport.mycompany.com. Protocol values (wss | https | ws | http)
 * @param {*} path - path to socket connection. Default '/webhooks/portal/webhook'
 * @param {*} [embed=true] -  webchat on page/over page. Default 'true' (on page)
 * @param {*} [lang='ru'] - language. Default 'ru'
 * @param {*} [title='Easy Report Веб-чат'] - webchat title. Default 'Easy Report Веб-чат'
 * @param {*} extraAction - extra action for header
 * @param {*} [background='#d9d9d9'] - background CSS property. Default '#d9d9d9'
 * @param {*} [senderId=undefined] - external value for senderId
 */
const ERWebChat = ({
  getTokens,
  tennant,
  legacyTennant = false,
  url,
  path = "/webhooks/portal/webhook",
  lang = "ru",
  embed = true,
  title = "Easy Report Веб-чат",
  extraAction,
  background = "#d9d9d9",
  senderId,
}: {
  getTokens: () => { access: string; refresh?: string };
  tennant: string;
  legacyTennant?: boolean;
  url: string;
  path?: string;
  lang?: "ru" | "en";
  embed?: boolean;
  title?: string;
  extraAction?: any;
  background?: CSSProperties["background"];
  senderId?: string;
}) => {
  return (
    <ConfigProvider locale={lang === "ru" ? ruRU : enUS}>
      <KeycloakContext.Provider
        value={{
          getTokens,
          tennant,
          legacyTennant,
          url,
          lang,
          path,
          title,
          extraAction,
          background,
          senderId,
          embed,
        }}
      >
        {embed ? (
          <div style={{ height: "100%", display: "flex" }}>
            <NoAdminWebchat extraAction={extraAction} />
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
//   <div style={{ width: "400px", height: "600px" }}>
//     <ERWebChat
//       tennant=""
//       url=""
//       getTokens={() => ({
//         access:
//           "",
//       })}
//       senderId=""
//       embed={true}
//     />
//   </div>
// );
