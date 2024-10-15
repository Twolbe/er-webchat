import Tooltip from "antd/es/tooltip";
import { marked } from "marked";
import {
  I_MessageAttachment,
  I_MessageText,
  I_MessageTextWithQuickReplies,
  I_WebChatMessage,
  I_WebChatMessageAttachment,
  I_WebChatMessageText,
  I_WebChatMessageTextWithQuickReplys,
} from "./interface";

export const makeid = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const handleAttachment = ({
  attachment,
  issuer,
}: I_MessageAttachment): I_WebChatMessageAttachment => ({
  issuer,
  type: "attachment",
  attachment,
});
const handleTextWithQuickReplys = ({
  issuer,
  text: text_,
  quick_replies,
}: I_MessageTextWithQuickReplies): I_WebChatMessageTextWithQuickReplys => ({
  issuer,
  type: "textWithReplies",
  text: marked.parse(text_) as string,
  quick_replies,
});

const handleText = ({
  issuer,
  text: text_,
}: I_MessageText): I_WebChatMessageText => ({
  issuer,
  type: "text",
  text:
    text_.includes("Data model:") || text_.includes("Модель данных:")
      ? text_
      : (marked.parse(text_) as string),
});

export const handleBotResponse = (
  response: I_MessageAttachment | I_MessageTextWithQuickReplies | I_MessageText
):
  | I_WebChatMessageAttachment
  | I_WebChatMessageText
  | I_WebChatMessageTextWithQuickReplys =>
  isAttachment(response)
    ? handleAttachment(response)
    : isTextWithReplies(response)
    ? handleTextWithQuickReplys(response)
    : handleText(response);

export const isAttachment = (response: any): response is I_MessageAttachment =>
  !!response.attachment;
export const isTextWithReplies = (
  response: any
): response is I_MessageTextWithQuickReplies => !!response.quick_replies;

const reponsesStorageKey = "webChatMessages";

export const getRepsonsesFromStore = (): I_WebChatMessage[] =>
  JSON.parse(sessionStorage.getItem(reponsesStorageKey)!)?.slice(-20) || [];

export const setReponsesToStore = (r: I_WebChatMessage[]) =>
  sessionStorage.setItem(reponsesStorageKey, JSON.stringify(r.slice(-20)));

export const ButtonTooltip = ({ children, title }: any) => {
  return (
    <Tooltip
      title={title}
      mouseEnterDelay={0.8}
      placement="bottom"
      showArrow={false}
      align={{ offset: [0, -3] }}
    >
      {children}
    </Tooltip>
  );
};
