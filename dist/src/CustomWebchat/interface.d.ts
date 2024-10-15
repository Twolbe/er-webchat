export interface I_MessageText {
    issuer: 'bot';
    text: string;
}
export interface I_MessageAttachment {
    issuer: 'bot';
    attachment: {
        type: 'image';
        payload: {
            src: string;
        };
    };
}
export interface I_MessageQuickReply {
    issuer: 'bot';
    content_type: 'text';
    title: string;
    payload: string | null;
    link: string | null;
}
export interface I_MessageTextWithQuickReplies {
    issuer: 'bot';
    text: string;
    quick_replies: I_MessageQuickReply[];
}
export type I_Response = I_MessageText | I_MessageAttachment | I_MessageTextWithQuickReplies;
export interface I_UserMessage {
    issuer: 'user';
    text: string;
}
export interface I_WebChatMessageBase {
    issuer: 'bot';
    type?: 'text' | 'textWithReplies' | 'attachment';
}
export interface I_WebChatMessageText extends I_WebChatMessageBase {
    type: 'text';
    text: string;
}
export interface I_WebChatMessageAttachment extends I_WebChatMessageBase {
    type: 'attachment';
    attachment: {
        type: 'image';
        payload: {
            src: string;
        };
    };
}
export interface I_WebChatMessageTextWithQuickReplys extends I_WebChatMessageBase {
    type: 'textWithReplies';
    text: string;
    quick_replies: I_MessageQuickReply[];
}
export type I_WebChatMessage = I_WebChatMessageText | I_WebChatMessageAttachment | I_WebChatMessageTextWithQuickReplys | I_UserMessage;
//# sourceMappingURL=interface.d.ts.map