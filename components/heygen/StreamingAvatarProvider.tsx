"use client";

import React, { useRef, useState } from "react";
import StreamingAvatar, {
  ConnectionQuality,
  StreamingTalkingMessageEvent,
  UserTalkingMessageEvent,
} from "@heygen/streaming-avatar";

// Knowledge base ID for YTL LLM (uploaded KBs, not HeyGen KBs)
let globalKnowledgeBaseId: string | undefined = undefined;

export const setKnowledgeBaseId = (id: string | undefined) => {
  globalKnowledgeBaseId = id;
  console.log('📚 Global knowledge base ID set for YTL LLM:', id || 'none');
};

export const getKnowledgeBaseId = (): string | undefined => {
  return globalKnowledgeBaseId;
};

export enum StreamingAvatarSessionState {
  INACTIVE = "inactive",
  CONNECTING = "connecting",
  CONNECTED = "connected",
}

export enum MessageSender {
  CLIENT = "CLIENT",
  AVATAR = "AVATAR",
}

export interface Message {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp?: number; // Session time in seconds when message was created
}

type StreamingAvatarContextProps = {
  avatarRef: React.MutableRefObject<StreamingAvatar | null>;
  basePath?: string;
  isMuted: boolean;
  setIsMuted: (value: boolean) => void;
  isVoiceChatLoading: boolean;
  setIsVoiceChatLoading: (value: boolean) => void;
  isVoiceChatActive: boolean;
  setIsVoiceChatActive: (value: boolean) => void;
  sessionState: StreamingAvatarSessionState;
  setSessionState: (state: StreamingAvatarSessionState) => void;
  stream: MediaStream | null;
  setStream: (stream: MediaStream | null) => void;
  messages: Message[];
  clearMessages: () => void;
  handleUserTalkingMessage: ({
    detail,
  }: {
    detail: UserTalkingMessageEvent;
  }) => void;
  handleStreamingTalkingMessage: ({
    detail,
  }: {
    detail: StreamingTalkingMessageEvent;
  }) => void;
  handleEndMessage: () => void;
  isListening: boolean;
  setIsListening: (value: boolean) => void;
  isUserTalking: boolean;
  setIsUserTalking: (value: boolean) => void;
  isAvatarTalking: boolean;
  setIsAvatarTalking: (value: boolean) => void;
  connectionQuality: ConnectionQuality;
  setConnectionQuality: (value: ConnectionQuality) => void;
};

const StreamingAvatarContext = React.createContext<StreamingAvatarContextProps>(
  {
    avatarRef: { current: null },
    basePath: undefined,
    isMuted: false, // Default to unmuted (mic open)
    setIsMuted: () => {},
    isVoiceChatLoading: false,
    setIsVoiceChatLoading: () => {},
    isVoiceChatActive: false,
    setIsVoiceChatActive: () => {},
    sessionState: StreamingAvatarSessionState.INACTIVE,
    setSessionState: () => {},
    stream: null,
    setStream: () => {},
    messages: [],
    clearMessages: () => {},
    handleUserTalkingMessage: () => {},
    handleStreamingTalkingMessage: () => {},
    handleEndMessage: () => {},
    isListening: false,
    setIsListening: () => {},
    isUserTalking: false,
    setIsUserTalking: () => {},
    isAvatarTalking: false,
    setIsAvatarTalking: () => {},
    connectionQuality: ConnectionQuality.UNKNOWN,
    setConnectionQuality: () => {},
  },
);

const useStreamingAvatarSessionState = () => {
  const [sessionState, setSessionState] = useState(
    StreamingAvatarSessionState.INACTIVE,
  );
  const [stream, setStream] = useState<MediaStream | null>(null);

  return {
    sessionState,
    setSessionState,
    stream,
    setStream,
  };
};

const useStreamingAvatarVoiceChatState = () => {
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted (mic open)
  const [isVoiceChatLoading, setIsVoiceChatLoading] = useState(false);
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false);

  return {
    isMuted,
    setIsMuted,
    isVoiceChatLoading,
    setIsVoiceChatLoading,
    isVoiceChatActive,
    setIsVoiceChatActive,
  };
};

const useStreamingAvatarMessageState = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const currentSenderRef = useRef<MessageSender | null>(null);

  const handleUserTalkingMessage = React.useCallback(
    ({
      detail,
    }: {
      detail: UserTalkingMessageEvent;
    }) => {
      if (currentSenderRef.current === MessageSender.CLIENT) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            ...prev[prev.length - 1],
            content: [prev[prev.length - 1].content, detail.message].join(""),
          },
        ]);
      } else {
        currentSenderRef.current = MessageSender.CLIENT;
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: MessageSender.CLIENT,
            content: detail.message,
          },
        ]);
      }
    },
    [],
  );

  const handleStreamingTalkingMessage = React.useCallback(
    ({
      detail,
    }: {
      detail: StreamingTalkingMessageEvent;
    }) => {
      if (currentSenderRef.current === MessageSender.AVATAR) {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          {
            ...prev[prev.length - 1],
            content: [prev[prev.length - 1].content, detail.message].join(""),
          },
        ]);
      } else {
        currentSenderRef.current = MessageSender.AVATAR;
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: MessageSender.AVATAR,
            content: detail.message,
          },
        ]);
      }
    },
    [],
  );

  const handleEndMessage = React.useCallback(() => {
    currentSenderRef.current = null;
  }, []);

  return {
    messages,
    clearMessages: React.useCallback(() => {
      setMessages([]);
      currentSenderRef.current = null;
    }, []),
    handleUserTalkingMessage,
    handleStreamingTalkingMessage,
    handleEndMessage,
  };
};

const useStreamingAvatarListeningState = () => {
  const [isListening, setIsListening] = useState(false);

  return { isListening, setIsListening };
};

const useStreamingAvatarTalkingState = () => {
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [isAvatarTalking, setIsAvatarTalking] = useState(false);

  return {
    isUserTalking,
    setIsUserTalking,
    isAvatarTalking,
    setIsAvatarTalking,
  };
};

const useStreamingAvatarConnectionQualityState = () => {
  const [connectionQuality, setConnectionQuality] = useState(
    ConnectionQuality.UNKNOWN,
  );

  return { connectionQuality, setConnectionQuality };
};

export const StreamingAvatarProvider = ({
  children,
  basePath,
}: {
  children: React.ReactNode;
  basePath?: string;
}) => {
  const avatarRef = React.useRef<StreamingAvatar>(null);
  const voiceChatState = useStreamingAvatarVoiceChatState();
  const sessionState = useStreamingAvatarSessionState();
  const messageState = useStreamingAvatarMessageState();
  const listeningState = useStreamingAvatarListeningState();
  const talkingState = useStreamingAvatarTalkingState();
  const connectionQualityState = useStreamingAvatarConnectionQualityState();

  React.useEffect(() => {
    console.log('🎭 StreamingAvatarProvider initialized with basePath:', basePath || 'default (https://api.heygen.com)');
  }, [basePath]);

  return (
    <StreamingAvatarContext.Provider
      value={{
        avatarRef,
        basePath,
        ...voiceChatState,
        ...sessionState,
        ...messageState,
        ...listeningState,
        ...talkingState,
        ...connectionQualityState,
      }}
    >
      {children}
    </StreamingAvatarContext.Provider>
  );
};

export const useStreamingAvatarContext = () =>
  React.useContext(StreamingAvatarContext);


