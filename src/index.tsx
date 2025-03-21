import "antd/es/button/style";
import ConfigProvider from "antd/es/config-provider";
import "antd/es/drawer/style";
import "antd/es/image/style";
import "antd/es/input/style";
import enUS from "antd/es/locale/en_US";
import ruRU from "antd/es/locale/ru_RU";
import "antd/es/modal/style";
import "antd/es/spin/style";
import "antd/es/tooltip/style";
import { createContext, CSSProperties } from "react";
// import { createRoot } from "react-dom/client";
import { AdminWebchat } from "./CustomWebchat/AdminWebchat/AdminWebchat";
import WebChatI18N from "./CustomWebchat/i18n";
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
}>({
  tennant: undefined,
  legacyTennant: false,
  getTokens: undefined,
  url: undefined,
  path: "/webhooks/portal/webhook",
  lang: "ru",
  title: WebChatI18N.ru["webChat/title"],
  extraAction: undefined,
  background: "#d9d9d9",
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
 */
const ERWebChat = ({
  getTokens,
  tennant,
  legacyTennant = false,
  url,
  path = "/webhooks/portal/webhook",
  lang = "ru",
  embed = true,
  title = WebChatI18N[lang]["webChat/title"],
  extraAction,
  background = "#d9d9d9",
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
}) => {
  return (
    <ConfigProvider
      locale={lang === "ru" ? ruRU : enUS}
      prefixCls="erwc"
      getPopupContainer={(triggerNode) =>
        triggerNode?.closest(".erwc-wrapper") || document.body
      }
    >
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
        }}
      >
        {embed ? (
          <div style={{ height: "100%", display: "flex" }} className="erwc">
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
//   <ERWebChat
//     tennant=""
//     url=""
//     getTokens={() => ({
//       access: "",
//     })}
//   />
// );
