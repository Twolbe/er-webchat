import { useI18N } from "@/CustomWebchat/i18n";
import SendOutlined from "@ant-design/icons/SendOutlined";
import Button from "antd/es/button";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useState } from "react";
import { I_UserMessage, I_WebChatMessage } from "../../interface";

export const Input = ({
  messages,
  sendSocketMessage,
  setResponseStack,
  textAreaRef,
  borderRadius,
}: {
  sendSocketMessage: (value: any) => void;
  messages: I_WebChatMessage[];
  setResponseStack: any;
  textAreaRef: any;
  borderRadius: string;
}) => {
  const children = useWebchatInput(
    sendSocketMessage,
    messages,
    setResponseStack,
    textAreaRef
  );

  return (
    <div
      key={`webchat-input-${borderRadius}`}
      style={{
        backgroundColor: "white",
        display: "flex",
        alignItems: "flex-end",
        padding: "0.5rem",
        borderRadius,
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        zIndex: "10",
      }}
    >
      {children}
    </div>
  );
};

const useWebchatInput = (
  sendSocketMessage: (value: any) => void,
  messages: I_WebChatMessage[],
  setResponseStack: any,
  textAreaRef: any
) => {
  const i18n = useI18N();
  const [value, setValue] = useState<string | undefined>();

  const sendMyMessage = useCallback(() => {
    if (value) {
      sendSocketMessage(value);
      setResponseStack((prev: any) => [
        ...prev,
        {
          issuer: "user",
          text: value,
        },
      ]);
    }
    setValue(undefined);
  }, [sendSocketMessage, value]); // eslint-disable-line

  function handleKeyDown(event: any) {
    if (event.key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        sendMyMessage();
      }
    }
    if (event.key === "ArrowUp" && !value) {
      const meMessages = messages.filter(
        (message) => message.issuer === "user"
      ) as I_UserMessage[];
      const value = meMessages.at(-1)?.text;
      setValue(value);
      setTimeout(() => {
        if (textAreaRef.current) {
          textAreaRef.current.resizableTextArea.textArea.selectionStart =
            value?.length || 0;
          textAreaRef.current.resizableTextArea.textArea.selectionEnd =
            value?.length || 0;
        }
      }, 20);
    }
  }

  return [
    <TextArea
      key="webchat-textarea"
      ref={textAreaRef}
      autoSize
      placeholder={i18n.inputPlaceholder}
      style={{
        border: "none",
        boxShadow: "none",
      }}
      onKeyDown={handleKeyDown}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />,
    <Button
      type="link"
      icon={<SendOutlined />}
      onClick={sendMyMessage}
      key="webchat-textarea-button"
    />,
  ];
};
