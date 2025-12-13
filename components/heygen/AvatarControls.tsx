"use client";

import React from "react";

import { useVoiceChat } from "./hooks/useVoiceChat";
import { useInterrupt } from "./hooks/useInterrupt";
import { AudioInput } from "./AudioInput";
import { TextInput } from "./TextInput";

export const AvatarControls: React.FC = () => {
  const {
    isVoiceChatLoading,
    isVoiceChatActive,
    startVoiceChat,
    stopVoiceChat,
  } = useVoiceChat();
  const { interrupt } = useInterrupt();

  return (
    <div className="flex flex-col gap-3 relative w-full items-center">
      <div
        className={`bg-zinc-700 rounded-lg p-1 flex gap-1 ${
          isVoiceChatLoading ? "opacity-50" : ""
        }`}
      >
        <button
          className={`rounded-lg p-2 text-sm w-[90px] text-center transition-colors ${
            isVoiceChatActive || isVoiceChatLoading
              ? "bg-zinc-800 text-white"
              : "text-gray-300 hover:text-white"
          }`}
          disabled={isVoiceChatLoading}
          onClick={() => {
            if (!isVoiceChatActive && !isVoiceChatLoading) {
              startVoiceChat();
            }
          }}
        >
          Voice Chat
        </button>
        <button
          className={`rounded-lg p-2 text-sm w-[90px] text-center transition-colors ${
            !isVoiceChatActive && !isVoiceChatLoading
              ? "bg-zinc-800 text-white"
              : "text-gray-300 hover:text-white"
          }`}
          disabled={isVoiceChatLoading}
          onClick={() => {
            if (isVoiceChatActive && !isVoiceChatLoading) {
              stopVoiceChat();
            }
          }}
        >
          Text Chat
        </button>
      </div>
      {isVoiceChatActive || isVoiceChatLoading ? <AudioInput /> : <TextInput />}
      <div className="absolute top-[-70px] right-3">
        <button
          className="bg-zinc-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-zinc-600 transition-colors"
          onClick={interrupt}
        >
          Interrupt
        </button>
      </div>
    </div>
  );
};

