import { I_WebChatMessage } from "./interface";
export declare const useWebchat: (open?: boolean) => {
    sock: {
        ready: boolean;
        sendSocketMessage: (value: string) => void;
    };
    ms: {
        initMessageSent: boolean;
        clear: () => void;
        loading: boolean;
        messages: (I_WebChatMessage & {
            id?: number;
        })[];
        setResponses: import("react").Dispatch<import("react").SetStateAction<I_WebChatMessage[]>>;
        textAreaRef: import("react").MutableRefObject<any>;
    };
    chat: {
        open: boolean;
        setOpen: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    };
};
//# sourceMappingURL=useWebchat.d.ts.map