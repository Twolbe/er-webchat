import "antd/es/button/style";
import "antd/es/drawer/style";
import "antd/es/image/style";
import "antd/es/input/style";
import "antd/es/modal/style";
import "antd/es/spin/style";
import "antd/es/tooltip/style";
import { CSSProperties } from "react";
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
    background: CSSProperties["background"];
}>;
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
declare const ERWebChat: ({ getTokens, tennant, legacyTennant, url, path, lang, embed, title, extraAction, background, }: {
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
    background?: CSSProperties["background"];
}) => import("react/jsx-runtime").JSX.Element;
export default ERWebChat;
//# sourceMappingURL=index.d.ts.map