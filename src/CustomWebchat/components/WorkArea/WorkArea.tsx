import { KeycloakContext } from "@/index";
import { useContext, useState } from "react";
import { isAttachment, isTextWithReplies } from "../../helpers";
import useAutoScroll from "../../hooks/useAutoScroll";
import { BotMessageAttachment } from "../Messages/BotMessageAttachment/BotMessageAttachment";
import { BotMessageReplies } from "../Messages/BotMessageReplies/BotMessageReplies";
import BotMessageText from "../Messages/BotMessageText/BotMessageText";
import TypingImitation from "../Messages/TypingImitation/TypingImitation";
import UserMessage from "../Messages/UserMessage/UserMessage";
import "./WorkArea.less";

export const WorkArea = ({
  isMin,
  loading,
  messages,
  sendSocketMessage,
  textAreaRef,
  interactiveContainerType = "modal",
}: {
  isMin: boolean;
  loading: boolean;
  messages: any[];
  sendSocketMessage: (value: any) => void;
  textAreaRef: any;
  interactiveContainerType?: "modal" | "drawer";
}) => {
  const { background } = useContext(KeycloakContext);

  const [imageLoadingCounter, setImageLoadingCounter] = useState(0);
  const ref = useAutoScroll(loading, imageLoadingCounter, messages);

  return (
    <div
      ref={ref}
      className="work-area"
      style={{ ...(isMin && { background }) }}
    >
      {messages?.map((message, index) => {
        return message.issuer === "user" ? (
          <UserMessage
            isMin={isMin}
            myKey={`user-${index}`}
            text={message.text}
            key={`user2-${index}`}
          />
        ) : isAttachment(message) ? (
          <BotMessageAttachment
            isMin={isMin}
            myKey={`attachment-${index}`}
            setImageLoadingCounter={setImageLoadingCounter}
            src={message.attachment?.payload?.src}
            textAreaRef={textAreaRef}
            key={`attachment2-${index}`}
          />
        ) : isTextWithReplies(message) ? (
          <BotMessageReplies
            isMin={isMin}
            myKey={`reply-${index}`}
            quickReplies={message.quick_replies}
            text={message.text}
            sendSocketMessage={sendSocketMessage}
            textAreaRef={textAreaRef}
            interactiveContainerType={interactiveContainerType}
            key={`reply2-${index}`}
          />
        ) : (
          <BotMessageText
            isMin={isMin}
            myKey={`text-${index}`}
            text={message.text}
            key={`text2-${index}`}
          />
        );
      })}
      <TypingImitation loading={loading} />
    </div>
  );
};
