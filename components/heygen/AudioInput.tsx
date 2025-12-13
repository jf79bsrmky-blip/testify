"use client";

import React from "react";

import { useVoiceChat } from "./hooks/useVoiceChat";
import { useConversationState } from "./hooks/useConversationState";

export const AudioInput: React.FC = () => {
  const { muteInputAudio, unmuteInputAudio, isMuted, isVoiceChatLoading } =
    useVoiceChat();
  const { isUserTalking } = useConversationState();

  const handleMuteClick = () => {
    if (isMuted) {
      unmuteInputAudio();
    } else {
      muteInputAudio();
    }
  };

  return (
    <div>
      <button
        className={`relative p-2 rounded-lg bg-zinc-700 text-white disabled:opacity-50 ${
          isUserTalking && !isMuted ? "ring-2 ring-[#7559FF] ring-offset-2" : ""
        }`}
        disabled={isVoiceChatLoading}
        onClick={handleMuteClick}
      >
        {isUserTalking && !isMuted && (
          <div className="absolute left-0 top-0 rounded-lg border-2 border-[#7559FF] w-full h-full animate-ping" />
        )}
        {isVoiceChatLoading ? (
          <svg
            className="animate-spin"
            fill="none"
            height={20}
            viewBox="0 0 20 20"
            width={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="10"
              cy="10"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="opacity-75"
              d="M10 2a8 8 0 0 1 8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ) : isMuted ? (
          <svg
            fill="none"
            height={20}
            viewBox="0 0 48 48"
            width={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 2c2.75 0 5.24 1.11 7.047 2.905l-2.864 2.793A6 6 0 0 0 18 12v5.633l-3.898 3.803A10.09 10.09 0 0 1 14 20v-8c0-5.523 4.477-10 10-10Z"
              fill="currentColor"
            />
            <path
              clipRule="evenodd"
              d="m18.151 28.112-2.172 2.12A12.945 12.945 0 0 0 24 33c7.18 0 13-5.82 13-13v-1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1c0 8.712-6.554 15.894-15 16.884V42h9a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H13a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h9v-5.116a16.925 16.925 0 0 1-8.904-3.84l-6.185 6.033a1 1 0 0 1-1.414-.017l-1.292-1.324a1 1 0 0 1 .018-1.414l33.642-32.82a1 1 0 0 1 1.415.017l1.291 1.324a1 1 0 0 1-.017 1.414L34 12.651V20c0 5.523-4.477 10-10 10-2.184 0-4.204-.7-5.849-1.888ZM30 16.552l-8.912 8.695A6 6 0 0 0 30 20v-3.447Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            fill="none"
            height={20}
            viewBox="0 0 20 20"
            width={20}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M5.83341 5.00065C5.83341 2.69946 7.6989 0.833984 10.0001 0.833984C12.3013 0.833984 14.1667 2.69946 14.1667 5.00065L14.1667 8.33398C14.1667 10.6352 12.3013 12.5007 10.0001 12.5007C7.6989 12.5007 5.83341 10.6352 5.83341 8.33398L5.83341 5.00065Z"
              fill="currentColor"
              fillRule="evenodd"
            />
            <path
              d="M5.66675 17.5007H9.16675V15.3688C5.64744 14.9564 2.91675 11.9641 2.91675 8.33398V8.16732C2.91675 7.93396 2.91675 7.81729 2.96216 7.72816C3.00211 7.64975 3.06585 7.58601 3.14425 7.54607C3.23338 7.50065 3.35006 7.50065 3.58341 7.50065H3.91675C4.1501 7.50065 4.26678 7.50065 4.35591 7.54607C4.43431 7.58601 4.49805 7.64975 4.538 7.72816C4.58341 7.81729 4.58341 7.93396 4.58341 8.16732V8.33398C4.58341 11.3255 7.00854 13.7507 10.0001 13.7507C12.9916 13.7507 15.4167 11.3255 15.4167 8.33398V8.16732C15.4167 7.93396 15.4167 7.81729 15.4622 7.72816C15.5021 7.64975 15.5659 7.58601 15.6443 7.54607C15.7334 7.50065 15.8501 7.50065 16.0834 7.50065H16.4167C16.6501 7.50065 16.7668 7.50065 16.8559 7.54607C16.9343 7.58601 16.9981 7.64975 17.038 7.72816C17.0834 7.81729 17.0834 7.93396 17.0834 8.16732V8.33398C17.0834 11.9641 14.3527 14.9564 10.8334 15.3688V17.5007L14.3334 17.5007C14.5668 17.5007 14.6834 17.5007 14.7726 17.5461C14.851 17.586 14.9147 17.6498 14.9547 17.7282C15.0001 17.8173 15.0001 17.934 15.0001 18.1673V18.5007C15.0001 18.734 15.0001 18.8507 14.9547 18.9398C14.9147 19.0182 14.851 19.082 14.7726 19.1219C14.6834 19.1673 14.5668 19.1673 14.3334 19.1673L5.66675 19.1673C5.43339 19.1673 5.31672 19.1673 5.22759 19.1219C5.14918 19.082 5.08544 19.0182 5.0455 18.9398C5.00008 18.8507 5.00008 18.734 5.00008 18.5007V18.1673C5.00008 17.934 5.00008 17.8173 5.0455 17.7282C5.08544 17.6498 5.14918 17.586 5.22759 17.5461C5.31672 17.5007 5.43339 17.5007 5.66675 17.5007Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

