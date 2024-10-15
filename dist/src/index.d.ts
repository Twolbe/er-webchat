import "./index.less";
import "antd/es/button/style/css";
import "antd/es/drawer/style/css";
import "antd/es/image/style/css";
import "antd/es/input/style/css";
import "antd/es/modal/style/css";
import "antd/es/spin/style/css";
import "antd/es/tooltip/style/css";
export declare const KeycloakContext: import("react").Context<{
    tennant: undefined | string;
    getTokens: undefined | (() => {
        access: string;
        refresh?: string;
    });
    url: undefined | string;
    path: string;
    lang: "ru" | "en";
}>;
/**
 * @param {*} getTokens - function; returns current access and refresh tokens. refresh token is optional
 * @param {*} tennant - client realm in keycloak
 * @param {*} url - url to reach er core: [protocol]://easyreport.mycompany.com. Protocol values (wss | https | ws | http)
 * @param {*} path - path to socket connection. Default '/webhooks/portal/webhook'
 * @param {*} [embed=true] -  webchat on page/over page. Default 'true' (on page)
 * @param {*} [lang='ru'] - language. Default 'ru'
 */
declare const ERWebChat: ({ getTokens, tennant, url, path, lang, embed, }: {
    getTokens: () => {
        access: string;
        refresh?: string;
    };
    tennant: string;
    url: string;
    path?: string;
    lang?: "ru" | "en";
    embed?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export default ERWebChat;
//# sourceMappingURL=index.d.ts.map