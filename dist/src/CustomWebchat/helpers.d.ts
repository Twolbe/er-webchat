import { I_MessageAttachment, I_MessageText, I_MessageTextWithQuickReplies, I_WebChatMessage, I_WebChatMessageAttachment, I_WebChatMessageText, I_WebChatMessageTextWithQuickReplys } from "./interface";
export declare const makeid: (length: number) => string;
export declare const handleBotResponse: (response: I_MessageAttachment | I_MessageTextWithQuickReplies | I_MessageText) => I_WebChatMessageAttachment | I_WebChatMessageText | I_WebChatMessageTextWithQuickReplys;
export declare const isAttachment: (response: any) => response is I_MessageAttachment;
export declare const isTextWithReplies: (response: any) => response is I_MessageTextWithQuickReplies;
export declare const getRepsonsesFromStore: () => I_WebChatMessage[];
export declare const setReponsesToStore: (r: I_WebChatMessage[]) => void;
export declare const ButtonTooltip: ({ children, title }: any) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=helpers.d.ts.map