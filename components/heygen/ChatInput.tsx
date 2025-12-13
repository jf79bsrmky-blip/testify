"use client";

import { useState, useCallback, KeyboardEvent } from "react";
import { useTextChat } from "./hooks/useTextChat";

export const ChatInput = () => {
  const { sendMessage } = useTextChat();
  const [message, setMessage] = useState("");

  const handleSend = useCallback(() => {
    if (message.trim() === "") {
      return;
    }
    
    const messageText = message.trim();
    console.log('💬 Sending text message:', messageText);
    
    // Send the message to the avatar
    // The SDK will handle adding it to message history via USER_TALKING_MESSAGE event
    // if it triggers that event. If not, we may need to add it manually, but let's
    // test first to see if the SDK handles it automatically.
    sendMessage(messageText);
    setMessage("");
  }, [message, sendMessage]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 items-center w-full">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-1 bg-white text-gray-900 text-sm sm:text-base px-4 py-3 sm:py-2.5 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 min-h-[44px] touch-manipulation"
        autoComplete="off"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 sm:p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center touch-manipulation flex-shrink-0 min-w-[44px] min-h-[44px] shadow-md active:scale-95"
        title="Send message (Enter)"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <svg
          className="w-5 h-5 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
};

