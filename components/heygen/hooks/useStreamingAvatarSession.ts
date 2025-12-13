"use client";

import { useCallback, useRef } from "react";
import StreamingAvatar, {
  ConnectionQuality,
  StartAvatarRequest,
  StreamingEvents,
} from "@heygen/streaming-avatar";

import {
  StreamingAvatarSessionState,
  useStreamingAvatarContext,
} from "../StreamingAvatarProvider";
import { useVoiceChat } from "./useVoiceChat";
import { useMessageHistory } from "./useMessageHistory";

export const useStreamingAvatarSession = () => {
  const {
    avatarRef,
    basePath,
    sessionState,
    setSessionState,
    stream,
    setStream,
    setIsListening,
    setIsUserTalking,
    setIsAvatarTalking,
    setConnectionQuality,
    handleUserTalkingMessage,
    handleStreamingTalkingMessage,
    handleEndMessage,
    clearMessages,
  } = useStreamingAvatarContext();
  const { stopVoiceChat } = useVoiceChat();

  useMessageHistory();

  const init = useCallback(
    (token: string) => {
      console.log('🔧 Initializing StreamingAvatar with:', {
        tokenLength: token.length,
        tokenPreview: token.substring(0, 20) + '...',
        basePath: basePath || 'default',
      });
      avatarRef.current = new StreamingAvatar({
        token,
        basePath,
      });
      console.log('✅ StreamingAvatar initialized');
      return avatarRef.current;
    },
    [avatarRef, basePath],
  );

  const handleStream = useCallback(
    ({ detail }: { detail: MediaStream }) => {
      console.log('🎥 STREAM_READY event received!', {
        hasStream: !!detail,
        streamId: detail?.id,
        tracks: detail?.getTracks().length,
      });
      setStream(detail);
      setSessionState(StreamingAvatarSessionState.CONNECTED);
      console.log('✅ Session state set to CONNECTED');
    },
    [setSessionState, setStream],
  );

  // Track connection state to handle disconnections properly
  const hasConnectedRef = useRef(false);
  
  const stop = useCallback(async () => {
    hasConnectedRef.current = false;
    avatarRef.current?.off(StreamingEvents.STREAM_READY, handleStream);
    clearMessages();
    stopVoiceChat();
    setIsListening(false);
    setIsUserTalking(false);
    setIsAvatarTalking(false);
    setStream(null);
    await avatarRef.current?.stopAvatar();
    setSessionState(StreamingAvatarSessionState.INACTIVE);
  }, [
    avatarRef,
    clearMessages,
    handleStream,
    setIsAvatarTalking,
    setIsListening,
    setIsUserTalking,
    setSessionState,
    setStream,
    stopVoiceChat,
  ]);
  
  const handleDisconnected = useCallback((event: any) => {
    console.warn('⚠️ STREAM_DISCONNECTED event received:', {
      event,
      hasConnected: hasConnectedRef.current,
      currentState: sessionState,
      hasStream: !!stream,
    });
    
    // Remove the disconnected listener to prevent multiple calls
    avatarRef.current?.off(StreamingEvents.STREAM_DISCONNECTED, handleDisconnected);
    
    // Only stop if we were actually connected
    // If we disconnect before connecting, it might be a configuration or token issue
    if (hasConnectedRef.current) {
      console.log('🛑 Stream was connected, stopping session...');
      stop();
    } else {
      console.error('❌ Stream disconnected before connection was established. This might indicate:');
      console.error('   - Invalid or expired token');
      console.error('   - Configuration error');
      console.error('   - Network connectivity issue');
      console.error('   - Avatar name or settings mismatch');
      
      // Set state to inactive and clear stream without calling full stop
      hasConnectedRef.current = false;
      setSessionState(StreamingAvatarSessionState.INACTIVE);
      setStream(null);
      setIsListening(false);
      setIsUserTalking(false);
      setIsAvatarTalking(false);
    }
  }, [sessionState, stream, stop, setSessionState, setStream, setIsListening, setIsUserTalking, setIsAvatarTalking, avatarRef]);

  const start = useCallback(
    async (config: StartAvatarRequest, token?: string) => {
      console.log('🚀 Starting avatar session...', {
        currentState: sessionState,
        hasAvatarRef: !!avatarRef.current,
        hasToken: !!token,
        config: {
          avatarName: config.avatarName,
          quality: config.quality,
          language: config.language,
          knowledgeId: config.knowledgeId,
        },
      });

      if (sessionState !== StreamingAvatarSessionState.INACTIVE) {
        const errorMsg = `Cannot start avatar: session state is ${sessionState}, expected INACTIVE`;
        console.error('❌', errorMsg);
        throw new Error(errorMsg);
      }

      // Clean up any existing avatar instance first
      if (avatarRef.current) {
        console.log('🧹 Cleaning up existing avatar instance...');
        try {
          await avatarRef.current.stopAvatar().catch(() => {
            // Ignore errors during cleanup
          });
        } catch (e) {
          // Ignore cleanup errors
        }
        avatarRef.current = null;
      }

      if (!token) {
        throw new Error("Token is required to initialize avatar");
      }
      
      console.log('🔧 Initializing new avatar instance...');
      init(token);

      if (!avatarRef.current) {
        throw new Error("Avatar is not initialized");
      }

      const avatar: StreamingAvatar = avatarRef.current;
      console.log('📡 Setting up event listeners...');
      // Reset connection tracking
      hasConnectedRef.current = false;
      
      // Remove any existing listeners first to avoid duplicates
      avatar.off(StreamingEvents.STREAM_READY, handleStream);
      avatar.off(StreamingEvents.STREAM_DISCONNECTED, handleDisconnected);
      
      setSessionState(StreamingAvatarSessionState.CONNECTING);
      
      // Wrap handleStream to track connection
      const handleStreamWithTracking = (event: { detail: MediaStream }) => {
        hasConnectedRef.current = true;
        console.log('✅ Stream connected successfully');
        handleStream(event);
      };
      
      avatar.on(StreamingEvents.STREAM_READY, handleStreamWithTracking);
      avatar.on(StreamingEvents.STREAM_DISCONNECTED, handleDisconnected);
      avatar.on(
        StreamingEvents.CONNECTION_QUALITY_CHANGED,
        ({ detail }: { detail: ConnectionQuality }) =>
          setConnectionQuality(detail),
      );
      avatar.on(StreamingEvents.USER_START, () => {
        setIsUserTalking(true);
      });
      avatar.on(StreamingEvents.USER_STOP, () => {
        setIsUserTalking(false);
      });
      avatar.on(StreamingEvents.AVATAR_START_TALKING, () => {
        setIsAvatarTalking(true);
      });
      avatar.on(StreamingEvents.AVATAR_STOP_TALKING, () => {
        setIsAvatarTalking(false);
      });
      avatar.on(
        StreamingEvents.USER_TALKING_MESSAGE,
        handleUserTalkingMessage,
      );
      avatar.on(
        StreamingEvents.AVATAR_TALKING_MESSAGE,
        handleStreamingTalkingMessage,
      );
      avatar.on(StreamingEvents.USER_END_MESSAGE, handleEndMessage);
      avatar.on(
        StreamingEvents.AVATAR_END_MESSAGE,
        handleEndMessage,
      );

      console.log('🎬 Calling createStartAvatar...');
      try {
        await avatar.createStartAvatar(config);
        console.log('✅ createStartAvatar completed successfully');
      } catch (error) {
        console.error('❌ createStartAvatar failed:', error);
        throw error;
      }

      return avatarRef.current;
    },
    [
      avatarRef,
      handleDisconnected,
      handleEndMessage,
      handleStream,
      handleStreamingTalkingMessage,
      handleUserTalkingMessage,
      init,
      sessionState,
      setConnectionQuality,
      setIsAvatarTalking,
      setIsUserTalking,
      setSessionState,
      stop,
    ],
  );

  return {
    avatarRef,
    sessionState,
    stream,
    initAvatar: init,
    startAvatar: start,
    stopAvatar: stop,
  };
};


