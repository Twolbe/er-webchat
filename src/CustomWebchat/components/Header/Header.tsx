import { useI18N } from "@/CustomWebchat/i18n";
import { KeycloakContext } from "@/index";
import CheckCircleFilled from "@ant-design/icons/CheckCircleOutlined";
import ClearOutlined from "@ant-design/icons/ClearOutlined";
import SyncOutlined from "@ant-design/icons/SyncOutlined";
import Button from "antd/es/button";
import Tooltip from "antd/es/tooltip";
import { useContext } from "react";
import { ButtonTooltip } from "../../helpers";
import "./Header.css";

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
  const { title } = useContext(KeycloakContext);
  const i18n = useI18N();

  return (
    <div className="header-container" style={{ borderRadius }}>
      <div className="webchat-title_status">
        <h3>{title}</h3>
        {connected ? (
          <Tooltip
            title={i18n.online}
            mouseEnterDelay={0.4}
            placement="bottom"
            showArrow={false}
            align={{ offset: [0, -3] }}
          >
            <CheckCircleFilled style={{ color: "#15c3d3" }} />
          </Tooltip>
        ) : (
          <Tooltip
            title={i18n.tryingToReconnect}
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
        <ButtonTooltip title={i18n.clearMessages}>
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
