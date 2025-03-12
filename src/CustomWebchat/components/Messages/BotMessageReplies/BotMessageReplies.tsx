import CloseOutlined from "@ant-design/icons/CloseOutlined";
import Button from "antd/es/button";
import Drawer from "antd/es/drawer";
import Modal from "antd/es/modal";
import Spin from "antd/es/spin";

import { useEffect, useState } from "react";
import { I_MessageQuickReply } from "../../../interface";
import s from "./BotMessageReplies.module.css";

export const BotMessageReplies = ({
  isMin,
  myKey,
  quickReplies,
  text,
  sendSocketMessage,
  textAreaRef,
  interactiveContainerType = "modal",
}: {
  isMin: boolean;
  myKey: string | number;
  quickReplies: I_MessageQuickReply[] | I_MessageQuickReply[][];
  text: string;
  sendSocketMessage: (value: string) => void;
  textAreaRef: any;
  interactiveContainerType?: "modal" | "drawer";
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [link, setLink] = useState<string | undefined>();
  const [iframeLoading, setIframeLoading] = useState(false);

  useEffect(() => {
    (modalOpen || drawerOpen) && setIframeLoading(true);
  }, [modalOpen, drawerOpen]);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    textAreaRef.current?.focus();
  };

  const handleQuickReplyClick = (reply: I_MessageQuickReply) => {
    if (reply.payload) {
      sendSocketMessage(reply.payload);
    } else {
      setLink(reply.link!);
      interactiveContainerType === "modal"
        ? setModalOpen(true)
        : setDrawerOpen(true);
    }
  };

  const QuickReplyItem = ({
    reply,
    isLastLine,
    onClick,
  }: {
    reply: I_MessageQuickReply;
    isLastLine: boolean;
    onClick: () => void;
  }) => (
    <div
      className={`${s["bot-message"]} ${s.reply}`}
      style={{
        borderRadius: isLastLine ? ".5rem .5rem 1rem 1rem" : "0.5rem",
      }}
      onClick={onClick}
    >
      {reply.title}
    </div>
  );

  return (
    <div
      key={myKey}
      className={s["wrapper"]}
      style={{
        width: isMin ? "fit-content" : "max-content",
        maxWidth: `${isMin ? "90%" : "70%"}`,
      }}
    >
      <div
        className={s["bot-message"]}
        style={{
          borderRadius: quickReplies.length
            ? "0rem 1rem .5rem .5rem"
            : "0rem 1rem 1rem 1rem",
        }}
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
      {quickReplies?.map((replyLine, i) => {
        const isLastLine = i === quickReplies.length - 1;

        return Array.isArray(replyLine) ? (
          <div className={s["reply-line"]} key={`${myKey}-${i}`}>
            {replyLine.map((reply, j) => (
              <QuickReplyItem
                key={`${myKey}-${i}-${j}`}
                reply={reply}
                isLastLine={isLastLine}
                onClick={() => handleQuickReplyClick(reply)}
              />
            ))}
          </div>
        ) : (
          <QuickReplyItem
            key={`${myKey}-${i}`}
            reply={replyLine}
            isLastLine={isLastLine}
            onClick={() => handleQuickReplyClick(replyLine)}
          />
        );
      })}
      <Modal
        footer={null}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          textAreaRef.current.focus();
        }}
        style={{
          minWidth: "50vw",
        }}
        bodyStyle={{ height: "85vh", padding: 0 }}
        destroyOnClose
        centered
      >
        <iframe
          className={s["iframe"]}
          style={{
            opacity: iframeLoading ? 0 : 1,
          }}
          src={link}
          onLoad={(e) =>
            setTimeout(() => {
              setIframeLoading(false);
            }, 200)
          }
        />
        {iframeLoading && (
          <div className={s["iframe-spinner-container"]}>
            <Spin
              className="iframe-spinner"
              spinning={iframeLoading}
              size="large"
            />
          </div>
        )}
      </Modal>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={handleDrawerClose}
        open={drawerOpen}
        getContainer={false}
        style={{ position: "absolute" }}
        bodyStyle={{ padding: 0, overflowY: "hidden" }}
        contentWrapperStyle={{ height: "90vh" }}
        destroyOnClose
      >
        <Button
          type="text"
          icon={<CloseOutlined />}
          className={s["close-button"]}
          onClick={handleDrawerClose}
        />
        <iframe
          className={s["iframe"]}
          style={{
            opacity: iframeLoading ? 0 : 1,
          }}
          src={link}
          onLoad={(e) =>
            setTimeout(() => {
              setIframeLoading(false);
            }, 200)
          }
        />
        {iframeLoading && (
          <div className={s["iframe-spinner-container"]}>
            <Spin
              className="iframe-spinner"
              spinning={iframeLoading}
              size="large"
            />
          </div>
        )}
      </Drawer>
    </div>
  );
};
