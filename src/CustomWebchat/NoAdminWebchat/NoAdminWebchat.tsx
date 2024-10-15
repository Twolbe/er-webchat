import { Header } from "../components/Header/Header";
import { Input as WebchatInput } from "../components/Input/Input";
import { WorkArea } from "../components/WorkArea/WorkArea";
import { useContainer } from "../hooks/useContainer";
import useViewport from "../hooks/useViewport";
import { useWebchat } from "../useWebchat";

const NoAdminWebchat = ({ extraAction }: { extraAction?: any }) => {
  const viewport = useViewport();
  const { sock, ms } = useWebchat();

  const Container = useContainer(viewport === "mobile");

  return (
    <Container
      header={
        <Header
          clearHistory={ms.clear}
          extraAction={extraAction}
          connected={sock.ready}
        />
      }
      workArea={
        <WorkArea
          isMin={viewport === "mobile"}
          interactiveContainerType={viewport === "mobile" ? "drawer" : "modal"}
          loading={ms.loading}
          messages={ms.messages}
          sendSocketMessage={sock.sendSocketMessage}
          textAreaRef={ms.textAreaRef}
        />
      }
      input={
        <WebchatInput
          sendSocketMessage={sock.sendSocketMessage}
          messages={ms.messages}
          setResponseStack={ms.setResponses}
          textAreaRef={ms.textAreaRef}
          borderRadius={viewport === "desktop" ? "1rem" : "0rem"}
        />
      }
    />
  );
};

export default NoAdminWebchat;
