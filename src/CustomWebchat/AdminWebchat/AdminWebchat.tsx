import CloseOutlined from "@ant-design/icons/CloseOutlined";
import CompressOutlined from "@ant-design/icons/CompressOutlined";
import ExpandOutlined from "@ant-design/icons/ExpandOutlined";
import Button from "antd/es/button";

import { KeycloakContext } from "@/index";
import { useContext, useEffect, useMemo, useState } from "react";
import { Header } from "../components/Header/Header";
import { Input as WebchatInput } from "../components/Input/Input";
import { WorkArea } from "../components/WorkArea/WorkArea";
import { ButtonTooltip } from "../helpers";
import { useContainer } from "../hooks/useContainer";
import WebChatI18N from "../i18n";
import { useWebchat } from "../useWebchat";
import "./AdminWebchat.css";
import { ToggleButton } from "./ToggleButton/ToggleButton";

export const AdminWebchat = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<"min" | "full">("min");
  const { sock, ms } = useWebchat();
  const { lang } = useContext(KeycloakContext);

  useEffect(() => {
    const handleKeyDown = (event: any) =>
      event.key === "Escape" && size === "full" && setSize("min");

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [size]);

  useEffect(() => {
    !open &&
      setTimeout(() => {
        setSize("min");
      }, 400);
  }, [open]);

  const Container = useContainer(size === "min");

  const extraAction = useMemo(
    () => [
      size === "min" ? (
        <ButtonTooltip
          title={WebChatI18N[lang]["expandChat"]}
          key="min-button-tooltip"
        >
          <Button
            className="webchat-button__header"
            type={"text"}
            icon={<ExpandOutlined />}
            onClick={() => setSize("full")}
            key="min-button-internal"
          />
        </ButtonTooltip>
      ) : (
        <ButtonTooltip
          title={WebChatI18N[lang]["compressChat"]}
          key="full-button-tooltip"
        >
          <Button
            className="webchat-button__header"
            type={"text"}
            icon={<CompressOutlined />}
            onClick={() => setSize("min")}
            key="full-button-internal"
          />
        </ButtonTooltip>
      ),
      <ButtonTooltip
        title={WebChatI18N[lang]["closeChat"]}
        key="close-button-tooltip"
      >
        <Button
          className="webchat-button__header"
          type={"text"}
          icon={<CloseOutlined />}
          onClick={() => setOpen((prev) => !prev)}
          key="close-button-internal"
        />
      </ButtonTooltip>,
    ],
    [size]
  );

  return (
    <div className={`${size === "min" ? "chat erwc" : "chat-fullscreen erwc"}`}>
      <div
        className={`${
          size === "min" ? "chat-window" : "chat-window-fullscreen"
        } ${open ? "open" : "close"}`}
      >
        <Container
          header={
            <Header
              clearHistory={ms.clear}
              extraAction={extraAction}
              connected={sock.ready}
              borderRadius={size === "min" ? "1rem 1rem 0 0" : "0"}
            />
          }
          workArea={
            <WorkArea
              isMin={size === "min"}
              loading={ms.loading}
              messages={ms.messages}
              sendSocketMessage={sock.sendSocketMessage}
              textAreaRef={ms.textAreaRef}
            />
          }
          input={
            <WebchatInput
              messages={ms.messages}
              sendSocketMessage={sock.sendSocketMessage}
              setResponseStack={ms.setResponses}
              textAreaRef={ms.textAreaRef}
              borderRadius={size === "min" ? "0 0 1rem 1rem" : "1rem"}
            />
          }
        />
      </div>
      <ToggleButton
        isChatOpen={open}
        toggleChat={() => setOpen((prev) => !prev)}
      />
    </div>
  );
};
