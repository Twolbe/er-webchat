import CloseOutlined from "@ant-design/icons/CloseOutlined";
import MessageOutlined from "@ant-design/icons/MessageOutlined";
import Button from "antd/es/button";
import "./ToggleButton.css";

export const ToggleButton = ({
  isChatOpen,
  toggleChat,
}: {
  isChatOpen: boolean;
  toggleChat: () => void;
}) => {
  return (
    <div className="toggle-button__container">
      {isChatOpen ? (
        <Button
          className="toggle-button__button"
          icon={<CloseOutlined style={{ fontSize: "1.5rem" }} />}
          shape="circle"
          onClick={toggleChat}
        />
      ) : (
        <Button
          className="toggle-button__button"
          shape="circle"
          icon={<MessageOutlined style={{ fontSize: "1.5rem" }} />}
          onClick={toggleChat}
        />
      )}
    </div>
  );
};
