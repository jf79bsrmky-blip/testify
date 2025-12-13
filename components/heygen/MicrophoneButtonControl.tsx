'use client';

import { useVoiceChat } from '@/components/heygen/hooks/useVoiceChat';
import { useState, useEffect } from 'react';

export const MicrophoneButtonControl = () => {
  const { startVoiceChat, stopVoiceChat, isVoiceChatActive } = useVoiceChat();
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const mobile =
      typeof window !== 'undefined' &&
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    setIsMobile(mobile);
  }, []);

  const requestMicPermission = async () => {
    try {
      console.log("🎤 Requesting microphone permission...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Stop immediately → we only needed permission
      stream.getTracks().forEach((t) => t.stop());

      console.log("✅ Microphone permission granted");
      return true;
    } catch (err: any) {
      console.error("❌ Microphone permission denied:", err);
      setError("Microphone access denied. Please enable mic in browser settings.");
      return false;
    }
  };

  const toggleMic = async () => {
    try {
      if (!isVoiceChatActive) {
        console.log("🎤 User tapped → Start requested");

        // -------------------------------
        // 🔥 MOBILE FIX: Ask permission first
        // -------------------------------
        if (isMobile) {
          const allowed = await requestMicPermission();
          if (!allowed) return;
        }

        await startVoiceChat(false);
        setError(null);
        console.log("🎤 Voice chat started");
      } else {
        console.log("🔇 Stopping microphone...");
        await stopVoiceChat();
      }
    } catch (err: any) {
      console.error("❌ Mic start error:", err);
      setError(err.message || "Microphone error");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMic}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-gray-700 hover:bg-gray-600 active:scale-95"
        style={{ WebkitTapHighlightColor: 'transparent' }}
        title={isVoiceChatActive ? 'Mute' : 'Unmute'}
      >
        {/* MIC ON */}
        {!isVoiceChatActive && (
          <svg
            className="w-6 h-6"
            stroke="white"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 1a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10a7 7 0 1 1-14 0" />
          </svg>
        )}

        {/* MIC OFF */}
        {isVoiceChatActive && (
          <svg
            className="w-6 h-6"
            stroke="white"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 9v3a3 3 0 0 0 6 0V9M12 3v2m0 10v6m5-6a5 5 0 0 1-10 0m12-4a9 9 0 0 1-18 0" />
          </svg>
        )}
      </button>

      {/* ERROR BUBBLE */}
      {error && (
        <div className="absolute top-14 right-0 bg-red-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg max-w-[200px]">
          {error}
        </div>
      )}
    </div>
  );
};
