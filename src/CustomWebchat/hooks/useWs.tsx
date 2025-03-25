import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { handleBotResponse, makeid } from "../helpers";
import { I_WebChatMessage } from "../interface";

export const useWs = (url: string | undefined, path: string, senderId: string| undefined) => {
  const [isReady, setIsReady] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(senderId);
  const socketRef = useRef<any>(null);
  const [responses, setResponses] = useState<I_WebChatMessage[]>([]);

  useEffect(() => {
    if (url) {
      let session_id = sessionId
      if (!sessionId) {
        session_id = sessionStorage.getItem("web_chat_session_id") || undefined;
        if (!session_id) {
          session_id = makeid(10);
          sessionStorage.setItem("web_chat_session_id", session_id);
        }
      }
      setSessionId(session_id);

      const sock = io(url, {path});

      sock.on("connect", () => {
        setIsReady(true);
        sock.emit("session_request", {
          session_id,
        });
      });
      sock.on("disconnect", () => setIsReady(false));
      sock.on("bot_uttered", (data) =>
        setResponses((prev) => [
          ...prev,
          handleBotResponse({ issuer: "bot", id: prev.length, ...data }),
        ])
      );
      socketRef.current = sock;

      return () => {
        sock.close();
      };
    }
  }, [url]);

  return [
    isReady,
    sessionId,
    responses,
    setResponses,
    socketRef.current?.emit.bind(socketRef.current),
  ] as const;
};
