import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { KeycloakContext } from "..";
import { getRepsonsesFromStore, setReponsesToStore } from "./helpers";
import { useWs } from "./hooks/useWs";
import { I_WebChatMessage } from "./interface";

export const useWebchat = (open?: boolean) => {
  const { tennant, legacyTennant, getTokens, lang, url, path, senderId } =
    useContext(KeycloakContext);

  const [ready, session_id, responses, setResponses, emit] = useWs(
    url,
    path,
    senderId
  );
  const [messages, setMessages] = useState<
    (I_WebChatMessage & { id?: number })[]
  >([]);

  useEffect(() => {
    setResponses(getRepsonsesFromStore());
  }, []); // eslint-disable-line

  useEffect(() => {
    setReponsesToStore(responses);
  }, [responses]); // eslint-disable-line

  const sendSocketMessage = useCallback(
    (value: string) => {
      if (tennant && getTokens) {
        setLoading(true);
        const { access, refresh } = getTokens();
        emit("user_uttered", {
          message: value,
          customData: {
            language: lang,
            access_token: access,
            refresh_token: refresh || "refresh",
            tennant: legacyTennant
              ? { "tennant/name": tennant, "tennant/slug": tennant }
              : { name: tennant, slug: tennant },
          },
          session_id,
        });
      }
    },
    [tennant, getTokens, session_id, emit]
  );

  const [loading, setLoading] = useState(false);

  // fake-loading
  useEffect(() => {
    if (responses.at(-1)?.issuer === "user") {
      setMessages(responses);
    } else {
      setTimeout(() => {
        setMessages(responses);
        setLoading(false);
      }, 500);
    }
  }, [responses]); // eslint-disable-line

  const [initMessageSent, setInitMessageSent] = useState(false);
  const sendInitMessage = useCallback(() => {
    setInitMessageSent(true);
    sendSocketMessage("/start");
  }, [sendSocketMessage, setInitMessageSent]);

  useEffect(() => {
    ready &&
      (open || open === undefined) &&
      !responses.length &&
      !initMessageSent &&
      sendInitMessage();
    textAreaRef.current?.focus();
  }, [ready, sendSocketMessage, open, responses, initMessageSent]); // eslint-disable-line

  const clear = useCallback(() => {
    sessionStorage.removeItem("webChatMessages");
    setMessages([]);
    setResponses([]);
    sendInitMessage();
  }, [initMessageSent, sendInitMessage]); // eslint-disable-line

  const textAreaRef = useRef<any>(null);

  return {
    sock: { ready, sendSocketMessage },
    ms: {
      initMessageSent,
      clear,
      loading,
      messages,
      setResponses,
      textAreaRef,
    },
  };
};
