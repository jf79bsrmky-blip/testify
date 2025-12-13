"use client";

import { useMemo } from "react";

import { useVoiceChat } from "./hooks/useVoiceChat";
import { useConversationState } from "./hooks/useConversationState";

export const MicrophoneButton = () => {
  const { muteInputAudio, unmuteInputAudio, isMuted, isVoiceChatLoading } =
    useVoiceChat();
  const { isUserTalking } = useConversationState();

  const label = useMemo(() => {
    if (isVoiceChatLoading) {
      return "Connecting mic…";
    }
    return isMuted ? "Enable Microphone" : "Mute Microphone";
  }, [isMuted, isVoiceChatLoading]);

  const indicatorColor = isVoiceChatLoading
    ? "bg-yellow-400"
    : isMuted
      ? "bg-red-500"
      : "bg-emerald-500";

  const handleClick = () => {
    if (isVoiceChatLoading) return;
    if (isMuted) {
      unmuteInputAudio();
    } else {
      muteInputAudio();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isVoiceChatLoading}
      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 shadow-md ${
        isMuted ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"
      } disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      <span
        className={`relative inline-flex h-3 w-3 rounded-full ${indicatorColor}`}
      >
        {!isMuted && isUserTalking && (
          <span className="absolute inset-0 rounded-full border border-white animate-ping" />
        )}
      </span>
      {label}
    </button>
  );
};


