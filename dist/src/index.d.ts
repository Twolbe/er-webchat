import "antd/es/button/style/css";
import "antd/es/drawer/style/css";
import "antd/es/image/style/css";
import "antd/es/input/style/css";
import "antd/es/modal/style/css";
import "antd/es/spin/style/css";
import "antd/es/tooltip/style/css";
import "./index.less";
export declare const KeycloakContext: import("react").Context<{
    tennant: undefined | string;
    legacyTennant: undefined | boolean;
    getTokens: undefined | (() => {
        access: string;
        refresh?: string;
    });
    url: undefined | string;
    path: string;
    lang: "ru" | "en";
    title: string;
    extraAction: undefined | any;
}>;
/**
 * @param {*} getTokens - function; returns current access and refresh tokens. refresh token is optional
 * @param {*} tennant - client realm in keycloak
 * @param {*} [legacyTennant=false] - if 'true', uses legacy tennant structure in ER<25.3.5. Default 'false'
 * @param {*} url - URL to reach er core: [protocol]://easyreport.mycompany.com. Protocol values (wss | https | ws | http)
 * @param {*} path - path to socket connection. Default '/webhooks/portal/webhook'
 * @param {*} [embed=true] -  webchat on page/over page. Default 'true' (on page)
 * @param {*} [lang='ru'] - language. Default 'ru'
 * @param {*} [title='Easy Report Веб-чат'] - webchat title. Default Easy Report Веб-чат
 * @param {*} extraAction - extra action for header
 */
declare const ERWebChat: ({ getTokens, tennant, legacyTennant, url, path, lang, embed, title, extraAction, }: {
    getTokens: () => {
        access: string;
        refresh?: string;
    };
    tennant: string;
    legacyTennant?: boolean;
    url: string;
    path?: string;
    lang?: "ru" | "en";
    embed?: boolean;
    title?: string;
    extraAction?: any;
}) => import("react/jsx-runtime").JSX.Element;
export default ERWebChat;
//# sourceMappingURL=index.d.ts.map