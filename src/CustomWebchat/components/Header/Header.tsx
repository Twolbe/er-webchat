import CheckCircleFilled from "@ant-design/icons/CheckCircleOutlined";
import ClearOutlined from "@ant-design/icons/ClearOutlined";
import SyncOutlined from "@ant-design/icons/SyncOutlined";
import Button from "antd/es/button";
import Tooltip from "antd/es/tooltip";
import { ButtonTooltip } from "../../helpers";
import "./Header.css";
import { useContext } from "react";
import { KeycloakContext } from "@/index";
import WebChatI18N from "@/CustomWebchat/i18n";

interface I_HeaderProps {
  clearHistory: () => void;
  extraAction?: any;
  connected: boolean;
  borderRadius?: string;
}

export const Header = ({
  clearHistory,
  extraAction,
  connected,
  borderRadius = "0rem",
}: I_HeaderProps) => {
  const { lang } = useContext(KeycloakContext);
  return (
    <div className="header-container" style={{ borderRadius }}>
      <div className="webchat-title_status">
        <h3>{WebChatI18N[lang]["webChat/title"]}</h3>
        {connected ? (
          <Tooltip
            title={WebChatI18N[lang]["webChat/online"]}
            mouseEnterDelay={0.4}
            placement="bottom"
            showArrow={false}
            align={{ offset: [0, -3] }}
          >
            <CheckCircleFilled style={{ color: "#15c3d3" }} />
          </Tooltip>
        ) : (
          <Tooltip
            title={WebChatI18N[lang]["webChat/tryingToReconnect"]}
            mouseEnterDelay={0.4}
            placement="bottom"
            showArrow={false}
            align={{ offset: [0, -3] }}
          >
            <SyncOutlined spin style={{ color: "rgb(250, 173, 20)" }} />
          </Tooltip>
        )}
      </div>
      <div>
        <ButtonTooltip title={WebChatI18N[lang]["clearMessages"]}>
          <Button
            className="webchat-button__header"
            type={"text"}
            icon={<ClearOutlined />}
            onClick={() => clearHistory()}
          />
        </ButtonTooltip>
        {extraAction}
      </div>
    </div>
  );
};
