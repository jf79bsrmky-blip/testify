"use client";

import { useCallback } from "react";

import { useStreamingAvatarContext } from "../StreamingAvatarProvider";

export const useVoiceChat = () => {
  const {
    avatarRef,
    isMuted,
    setIsMuted,
    isVoiceChatActive,
    setIsVoiceChatActive,
    isVoiceChatLoading,
    setIsVoiceChatLoading,
  } = useStreamingAvatarContext();

  const startVoiceChat = useCallback(
    async (isInputAudioMuted: boolean = false) => {
      if (!avatarRef.current) {
        console.warn('⚠️ Cannot start voice chat: avatar not initialized');
        return;
      }
      
      console.log('🎤 Starting voice chat with mute state:', isInputAudioMuted);
      console.log('📊 Avatar ref status:', {
        hasAvatarRef: !!avatarRef.current,
        avatarType: avatarRef.current?.constructor?.name,
      });
      setIsVoiceChatLoading(true);
      
      try {
        // Start voice chat with HeyGen SDK (it will handle microphone permissions)
        console.log('📞 Calling avatarRef.current.startVoiceChat with options:', {
          isInputAudioMuted,
        });
        
        const result = await avatarRef.current?.startVoiceChat({
          isInputAudioMuted,
        });
        
        console.log('📞 startVoiceChat returned:', result);
        
        setIsVoiceChatLoading(false);
        setIsVoiceChatActive(true);
        setIsMuted(isInputAudioMuted);
        console.log('✅ Voice chat started successfully, microphone is', isInputAudioMuted ? 'MUTED' : 'UNMUTED');
      } catch (error) {
        console.error('❌ Failed to start voice chat:', error);
        console.error('Error details:', {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          name: error instanceof Error ? error.name : undefined,
          error: error,
        });
        
        // Provide user-friendly error message
        let userMessage = 'Failed to start microphone. ';
        if (error instanceof Error) {
          if (error.message.includes('permission') || error.message.includes('Permission')) {
            userMessage += 'Please allow microphone access in your browser settings and try again.';
          } else if (error.message.includes('NotAllowedError') || error.name === 'NotAllowedError') {
            userMessage += 'Microphone permission was denied. Please allow access and try again.';
          } else if (error.message.includes('NotFoundError') || error.name === 'NotFoundError') {
            userMessage += 'No microphone found. Please connect a microphone and try again.';
          } else {
            userMessage += error.message;
          }
        } else {
          userMessage += 'Please check your browser console for details.';
        }
        
        setIsVoiceChatLoading(false);
        setIsVoiceChatActive(false);
        
        // Create a new error with user-friendly message
        const userError = new Error(userMessage);
        throw userError;
      }
    },
    [avatarRef, setIsMuted, setIsVoiceChatActive, setIsVoiceChatLoading],
  );

  const stopVoiceChat = useCallback(() => {
    if (!avatarRef.current) return;
    avatarRef.current?.closeVoiceChat();
    setIsVoiceChatActive(false);
    setIsMuted(true);
  }, [avatarRef, setIsMuted, setIsVoiceChatActive]);

  const muteInputAudio = useCallback(() => {
    if (!avatarRef.current) {
      console.warn('⚠️ Cannot mute: avatar not initialized');
      return;
    }
    console.log('🔇 Muting microphone...');
    avatarRef.current?.muteInputAudio();
    setIsMuted(true);
    console.log('✅ Microphone muted');
  }, [avatarRef, setIsMuted]);

  const unmuteInputAudio = useCallback(() => {
    if (!avatarRef.current) {
      console.warn('⚠️ Cannot unmute: avatar not initialized');
      return;
    }
    console.log('🔊 Unmuting microphone...');
    avatarRef.current?.unmuteInputAudio();
    setIsMuted(false);
    console.log('✅ Microphone unmuted');
  }, [avatarRef, setIsMuted]);

  return {
    startVoiceChat,
    stopVoiceChat,
    muteInputAudio,
    unmuteInputAudio,
    isMuted,
    isVoiceChatActive,
    isVoiceChatLoading,
  };
};


