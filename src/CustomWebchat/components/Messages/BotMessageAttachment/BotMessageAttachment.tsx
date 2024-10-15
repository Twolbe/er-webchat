import ZoomInOutlined from "@ant-design/icons/ZoomInOutlined";
import Image from "antd/es/image";
import { Dispatch, SetStateAction } from "react";
import s from "./BotMessageAttachment.module.css";

export const BotMessageAttachment = ({
  isMin,
  myKey,
  setImageLoadingCounter,
  src,
  textAreaRef,
}: {
  isMin: boolean;
  myKey: string | number;
  setImageLoadingCounter: Dispatch<SetStateAction<number>>;
  src: string;
  textAreaRef: any;
}) => (
  <div
    key={myKey}
    className={s["bot-message"]}
    style={{
      maxWidth: `${isMin ? "90%" : "70%"}`,
    }}
  >
    <Image
      className={s["image"]}
      onLoad={() => setImageLoadingCounter((prev) => prev + 1)}
      preview={{
        mask: <ZoomInOutlined />,
        maskClassName: "image-preview",
        onVisibleChange: () => {
          textAreaRef.current?.focus();
        },
      }}
      src={src}
    />
  </div>
);
