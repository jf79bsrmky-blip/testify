"use client";

import { useEffect, useRef } from "react";

import {
  MessageSender,
  useStreamingAvatarContext,
} from "./StreamingAvatarProvider";

// Helper function to format timestamp (in seconds) to MM:SS format
const formatTimestamp = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

interface MessageHistoryProps {
  sessionTime: number;
  // Optional mapping from message ID to the session time (in seconds)
  // when the message was first received
  messageTimes?: Record<string, number>;
}

export const MessageHistory = ({ sessionTime, messageTimes }: MessageHistoryProps) => {
  const { messages } = useStreamingAvatarContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col gap-4 p-4"
    >
      {messages.length === 0 ? (
        <div className="text-center text-gray-400 text-sm py-8 px-4">
          Waiting for conversation to start...
        </div>
      ) : (
        messages.map((message) => {
          // Prefer explicit session-time-per-message if provided,
          // then message.timestamp (if set), otherwise fall back to current session time
          const messageTime =
            (messageTimes && messageTimes[message.id]) ??
            (message.timestamp ?? sessionTime);
          const timestamp = formatTimestamp(messageTime);
          
          return (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.sender === MessageSender.CLIENT ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-3 max-w-[85%] ${
                  message.sender === MessageSender.CLIENT
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm leading-relaxed break-words">{message.content}</p>
              </div>
              <span className="text-xs text-gray-500 mt-1 px-1">
                {timestamp}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
};


